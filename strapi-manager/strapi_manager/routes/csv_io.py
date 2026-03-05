"""CSV export and import routes."""
import csv
import io
import time
import threading
import uuid as uuid_mod
from flask import Blueprint, request, redirect, url_for, abort, render_template_string, Response
from markupsafe import escape as html_escape
from ..auth import login_required
from ..config import STRAPI_BASE_URL
from ..state import import_statuses, import_lock, pending_imports
from ..helpers import discover_content_types, get_content_type, strapi_api_request
from ..templates import render_page, ERROR_TEMPLATE

csv_bp = Blueprint('csv', __name__)


@csv_bp.route('/csv')
@login_required
def csv_page():
    cts = discover_content_types()
    content = render_template_string('''
<h2 class="text-2xl font-bold text-white mb-6">CSV Export & Import</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{% for ct in content_types %}
<div class="bg-slate-800 rounded-xl border border-slate-700 p-5">
    <h3 class="text-lg font-semibold text-white mb-3">{{ ct.display }}</h3>
    <div class="flex flex-wrap gap-2">
        <a href="/csv/export/{{ ct.api_name }}" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-md">Export CSV</a>
        <a href="/csv/sample/{{ ct.api_name }}" class="bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium px-3 py-1.5 rounded-md">Sample CSV</a>
        <a href="/csv/import/{{ ct.api_name }}" class="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded-md">Import CSV</a>
    </div>
</div>
{% endfor %}
</div>''', content_types=cts)
    return render_page('CSV', content, 'csv')


@csv_bp.route('/csv/sample/<api_name>')
@login_required
def csv_sample(api_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)
    attrs = ct['schema'].get('attributes', {})
    skip_types = {'customField', 'json', 'relation', 'component', 'dynamiczone'}
    export_fields = [n for n, c in attrs.items() if c.get('type', '') not in skip_types]
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(export_fields)
    # Write one example row with type hints
    hints = []
    for field in export_fields:
        cfg = attrs.get(field, {})
        ft = cfg.get('type', 'string')
        if ft == 'boolean':
            hints.append('true')
        elif ft == 'integer':
            hints.append('0')
        elif ft in ('float', 'decimal'):
            hints.append('0.00')
        elif ft == 'enumeration':
            vals = cfg.get('enum', [])
            hints.append(vals[0] if vals else '')
        elif ft == 'date':
            hints.append('2026-01-01')
        elif ft == 'datetime':
            hints.append('2026-01-01T00:00:00.000Z')
        elif ft == 'media':
            hints.append('https://example.com/image.jpg')
        elif ft == 'uid':
            hints.append('example-slug')
        else:
            hints.append('example text')
    writer.writerow(hints)
    output.seek(0)
    return Response(output.getvalue(), mimetype='text/csv',
                    headers={'Content-Disposition': f'attachment; filename={api_name}-sample.csv'})


@csv_bp.route('/csv/export/<api_name>')
@login_required
def csv_export(api_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)
    attrs = ct['schema'].get('attributes', {})
    skip_types = {'customField', 'json', 'relation', 'component', 'dynamiczone'}
    export_fields = [n for n, c in attrs.items() if c.get('type', '') not in skip_types]

    all_entries = []
    page = 1
    while True:
        resp = strapi_api_request('GET', f"/{ct['plural']}", params={
            'pagination[page]': str(page), 'pagination[pageSize]': '100',
            'sort': 'id:asc', 'populate': '*',
        }, timeout=30)
        if 'error' in resp:
            return render_template_string(ERROR_TEMPLATE, message=f'API error: {resp["error"]}'), 500
        data = resp.get('data', [])
        if not data:
            break
        all_entries.extend(data)
        meta = resp.get('meta', {}).get('pagination', {})
        if page >= meta.get('pageCount', 1):
            break
        page += 1

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['id'] + export_fields)
    for entry in all_entries:
        row = [entry.get('id', '')]
        for field in export_fields:
            val = entry.get(field)
            if isinstance(val, dict) and 'url' in val:
                url = val['url']
                row.append(STRAPI_BASE_URL + url if url.startswith('/') else url)
            elif isinstance(val, list):
                row.append('; '.join(str(v.get('url', v) if isinstance(v, dict) else v) for v in val))
            elif val is None:
                row.append('')
            else:
                row.append(str(val))
        writer.writerow(row)
    output.seek(0)
    return Response(output.getvalue(), mimetype='text/csv',
                    headers={'Content-Disposition': f'attachment; filename={api_name}-export.csv'})


@csv_bp.route('/csv/import/<api_name>')
@login_required
def csv_import_form(api_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)
    content = render_template_string('''
<h2 class="text-2xl font-bold text-white mb-6">Import CSV: {{ ct.display }}</h2>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-xl">
    <form method="POST" action="/csv/import/{{ ct.api_name }}/preview" enctype="multipart/form-data">
        <label class="block text-slate-300 text-sm font-medium mb-2">Select CSV file</label>
        <input type="file" name="csv_file" accept=".csv" required
            class="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 mb-4">
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Preview Import</button>
    </form>
</div>''', ct=ct)
    return render_page(f'Import: {ct["display"]}', content, 'csv')


@csv_bp.route('/csv/import/<api_name>/preview', methods=['POST'])
@login_required
def csv_import_preview(api_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)
    f = request.files.get('csv_file')
    if not f:
        return redirect(url_for('csv.csv_import_form', api_name=api_name))
    try:
        text = f.read().decode('utf-8-sig')
        reader = csv.DictReader(io.StringIO(text))
        rows = list(reader)
        csv_columns = reader.fieldnames or []
    except Exception as e:
        return render_template_string(ERROR_TEMPLATE, message=f'CSV parse error: {e}'), 400

    attrs = ct['schema'].get('attributes', {})
    matched = [c for c in csv_columns if c in attrs or c == 'id']
    unmatched = [c for c in csv_columns if c not in attrs and c != 'id']

    slug_conflicts = 0
    if 'slug' in matched and rows:
        slugs = [r.get('slug', '') for r in rows if r.get('slug')]
        if slugs:
            resp = strapi_api_request('GET', f"/{ct['plural']}", params={
                'pagination[pageSize]': '1', 'filters[slug][$in]': ','.join(slugs[:100])
            })
            if 'error' not in resp:
                slug_conflicts = resp.get('meta', {}).get('pagination', {}).get('total', 0)

    import_id = str(uuid_mod.uuid4())
    pending_imports[import_id] = {
        'api_name': api_name, 'rows': rows, 'columns': matched, 'ts': time.time()
    }
    preview_rows = rows[:10]

    content = render_template_string('''
<h2 class="text-2xl font-bold text-white mb-6">Import Preview: {{ ct.display }}</h2>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div><span class="text-slate-400 text-sm">Total rows:</span> <span class="text-white">{{ total_rows }}</span></div>
        <div><span class="text-slate-400 text-sm">Matched columns:</span> <span class="text-green-400">{{ matched|length }}</span></div>
        <div><span class="text-slate-400 text-sm">Unmatched columns:</span> <span class="{{ 'text-amber-400' if unmatched else 'text-slate-500' }}">{{ unmatched|length }}</span></div>
        <div><span class="text-slate-400 text-sm">Slug conflicts:</span> <span class="{{ 'text-amber-400' if slug_conflicts else 'text-slate-500' }}">{{ slug_conflicts }}</span></div>
    </div>
    {% if unmatched %}<p class="text-amber-400 text-sm mb-2">Unmatched: {{ unmatched|join(', ') }}</p>{% endif %}
</div>
<div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-6">
    <div class="overflow-x-auto"><table class="w-full text-sm">
        <thead><tr class="border-b border-slate-700">{% for c in matched %}<th class="px-3 py-2 text-slate-400 font-medium">{{ c }}</th>{% endfor %}</tr></thead>
        <tbody>{% for row in preview_rows %}<tr class="border-b border-slate-700">{% for c in matched %}<td class="px-3 py-2 text-slate-300">{{ row.get(c, '')|truncate(40) }}</td>{% endfor %}</tr>{% endfor %}</tbody>
    </table></div>
    {% if total_rows > 10 %}<p class="px-4 py-2 text-slate-400 text-sm">Showing first 10 of {{ total_rows }} rows</p>{% endif %}
</div>
<form method="POST" action="/csv/import/{{ ct.api_name }}/execute">
    <input type="hidden" name="import_id" value="{{ import_id }}">
    <div class="mb-4">
        <label class="block text-slate-300 text-sm font-medium mb-2">Conflict mode</label>
        <select name="conflict_mode" class="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm">
            <option value="skip">Skip existing (by slug)</option>
            <option value="update">Update existing (by slug)</option>
            <option value="create">Create all new</option>
        </select>
    </div>
    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
            onclick="return confirm('Import {{ total_rows }} rows?');">Execute Import</button>
</form>''', ct=ct, matched=matched, unmatched=unmatched, total_rows=len(rows),
            slug_conflicts=slug_conflicts, preview_rows=preview_rows, import_id=import_id)
    return render_page(f'Import Preview: {ct["display"]}', content, 'csv')


@csv_bp.route('/csv/import/<api_name>/execute', methods=['POST'])
@login_required
def csv_import_execute(api_name):
    import_id = request.form.get('import_id', '')
    conflict_mode = request.form.get('conflict_mode', 'skip')
    imp = pending_imports.get(import_id)
    if not imp:
        return render_template_string(ERROR_TEMPLATE, message='Import session expired. Please re-upload.'), 400

    with import_lock:
        import_statuses[import_id] = {
            'active': True, 'step': 'Starting...', 'error': '', 'done': False,
            'created': 0, 'updated': 0, 'skipped': 0, 'failed': 0,
        }
    thread = threading.Thread(target=_run_import,
                              args=(import_id, api_name, imp['rows'], imp['columns'], conflict_mode), daemon=True)
    thread.start()

    content = f'''
<h2 class="text-2xl font-bold text-white mb-6">Importing...</h2>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-6">
    <div class="flex items-center space-x-3">
        <svg class="animate-spin h-5 w-5 text-blue-400" id="imp-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
        <span class="text-white" id="import-step">Starting...</span>
    </div>
    <div class="mt-4 text-sm text-slate-400" id="import-counts"></div>
</div>
<script>
(function(){{
    var s=document.getElementById('import-step'),c=document.getElementById('import-counts'),sp=document.getElementById('imp-spin');
    function p(){{fetch('/api/import-status?id={import_id}').then(function(r){{return r.json();}}).then(function(d){{
        s.textContent=d.step;c.textContent='Created: '+d.created+' | Updated: '+d.updated+' | Skipped: '+d.skipped+' | Failed: '+d.failed;
        if(d.done){{s.textContent=d.error?'Error: '+d.error:'Import complete!';sp.style.display='none';}}}}).catch(function(){{}});}};
    setInterval(p,1500);
}})();
</script>'''
    return render_page('Importing', content, 'csv')


def _run_import(import_id, api_name, rows, columns, conflict_mode):
    ct = get_content_type(api_name)
    if not ct:
        with import_lock:
            import_statuses[import_id]['error'] = 'Content type not found'
            import_statuses[import_id]['done'] = True
        return

    plural = ct['plural']
    attrs = ct['schema'].get('attributes', {})
    status = import_statuses[import_id]

    def update(step):
        with import_lock:
            status['step'] = step

    try:
        for i, row in enumerate(rows):
            update(f'Processing row {i+1} of {len(rows)}...')
            entry_data = {}
            for col in columns:
                if col == 'id':
                    continue
                val = row.get(col, '')
                if not val:
                    continue
                cfg = attrs.get(col, {})
                ft = cfg.get('type', 'string')
                if ft == 'boolean':
                    entry_data[col] = val.lower() in ('true', '1', 'yes')
                elif ft == 'integer':
                    try:
                        entry_data[col] = int(val)
                    except ValueError:
                        continue
                elif ft in ('float', 'decimal'):
                    try:
                        entry_data[col] = float(val)
                    except ValueError:
                        continue
                elif ft == 'media':
                    continue
                else:
                    entry_data[col] = val

            slug = entry_data.get('slug', '')
            if conflict_mode in ('skip', 'update') and slug:
                check = strapi_api_request('GET', f'/{plural}', params={
                    'filters[slug][$eq]': slug, 'pagination[pageSize]': '1'
                })
                existing = check.get('data', [])
                if existing:
                    if conflict_mode == 'skip':
                        with import_lock:
                            status['skipped'] += 1
                        continue
                    elif conflict_mode == 'update':
                        doc_id = existing[0].get('documentId', existing[0].get('id'))
                        resp = strapi_api_request('PUT', f'/{plural}/{doc_id}', json_data={'data': entry_data})
                        with import_lock:
                            if 'error' in resp:
                                status['failed'] += 1
                            else:
                                status['updated'] += 1
                        continue

            resp = strapi_api_request('POST', f'/{plural}', json_data={'data': entry_data})
            with import_lock:
                if 'error' in resp:
                    status['failed'] += 1
                else:
                    status['created'] += 1

        update('Import complete!')
        with import_lock:
            status['done'] = True
    except Exception as e:
        with import_lock:
            status['error'] = str(e)
            status['done'] = True
