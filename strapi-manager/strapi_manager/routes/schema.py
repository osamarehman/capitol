"""Schema management routes: add/modify fields, create new collections."""
import os
import re
import json
import copy
import time
import uuid as uuid_mod
from flask import Blueprint, request, abort, render_template_string
from markupsafe import escape as html_escape
from ..auth import login_required
from ..config import (PROD_SCHEMA_BASE, GIT_SCHEMA_BASE, FIELD_TYPE_CHOICES,
                      SAFE_TYPE_TRANSITIONS)
from ..state import pending_changes
from ..helpers import (discover_content_types, get_content_type, invalidate_ct_cache,
                       create_backup, build_field_definition, generate_schema_diff,
                       diff_preview_html, sync_db_column)
from ..templates import render_page, ERROR_TEMPLATE

schema_bp = Blueprint('schema', __name__)


@schema_bp.route('/schema')
@login_required
def schema_page():
    cts = discover_content_types()
    changes = [(cid, c) for cid, c in pending_changes.items() if time.time() - c.get('ts', 0) < 3600]
    content = render_template_string('''
<div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-white">Schema Management</h2>
    <a href="/schema/new-collection" class="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">+ New Collection</a>
</div>
{% if changes %}
<div class="bg-amber-900/30 border border-amber-600 rounded-lg p-4 mb-6">
    <h3 class="text-amber-400 font-semibold mb-2">Pending Changes ({{ changes|length }})</h3>
    {% for cid, c in changes %}
    <div class="flex items-center justify-between py-2 border-b border-amber-800 last:border-0">
        <span class="text-slate-300 text-sm">{{ c.description }}</span>
        <form method="POST" action="/schema/apply/{{ cid }}" class="inline">
            <input type="hidden" name="target_prod" value="true"><input type="hidden" name="target_git" value="true">
            <button class="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1 rounded">Apply</button>
        </form>
    </div>
    {% endfor %}
</div>
{% endif %}
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
{% for ct in content_types %}
<div class="bg-slate-800 rounded-xl border border-slate-700 p-5">
    <h3 class="text-lg font-semibold text-white mb-1">{{ ct.display }}</h3>
    <p class="text-slate-400 text-sm mb-3">{{ ct.field_count }} fields</p>
    <div class="flex space-x-2">
        <a href="/schema/{{ ct.api_name }}/add-field" class="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded-md">+ Add Field</a>
        <a href="/collections/{{ ct.api_name }}" class="bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium px-3 py-1.5 rounded-md">Modify Fields</a>
    </div>
</div>
{% endfor %}
</div>
''', content_types=cts, changes=changes)
    return render_page('Schema', content, 'schema')


# --- Add field ---

@schema_bp.route('/schema/<api_name>/add-field', methods=['GET', 'POST'])
@login_required
def schema_add_field(api_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)

    if request.method == 'POST':
        field_name = request.form.get('field_name', '').strip()
        field_type = request.form.get('field_type', 'string')

        if not field_name or not re.match(r'^[a-z][a-zA-Z0-9]*$', field_name):
            err = '<div class="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-200 mb-4">Invalid field name. Must be camelCase starting with lowercase letter.</div>'
            return render_page('Add Field', err + _add_field_form(ct), 'schema')

        if field_name in ct['schema'].get('attributes', {}):
            err = f'<div class="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-200 mb-4">Field "{html_escape(field_name)}" already exists.</div>'
            return render_page('Add Field', err + _add_field_form(ct), 'schema')

        field_def = build_field_definition(field_type, request.form)
        new_schema = copy.deepcopy(ct['schema'])
        new_schema['attributes'][field_name] = field_def
        diff = generate_schema_diff(ct['schema'], new_schema)

        change_id = str(uuid_mod.uuid4())
        pending_changes[change_id] = {
            'api_name': api_name, 'old_schema': ct['schema'], 'new_schema': new_schema,
            'description': f'Add field "{field_name}" ({field_type}) to {ct["display"]}',
            'ts': time.time(),
        }
        content = diff_preview_html(ct, diff, change_id, f'Add field "{field_name}" ({field_type})')
        return render_page('Confirm Change', content, 'schema')

    return render_page(f'Add Field: {ct["display"]}', _add_field_form(ct), 'schema')


def _add_field_form(ct):
    type_options = ''.join(f'<option value="{k}">{v}</option>' for k, v in FIELD_TYPE_CHOICES)
    existing = ', '.join(ct['schema'].get('attributes', {}).keys())
    return f'''
<h2 class="text-2xl font-bold text-white mb-6">Add Field to {html_escape(ct["display"])}</h2>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-2xl">
<form method="POST">
    <div class="mb-4">
        <label class="block text-slate-300 text-sm font-medium mb-2">Field Name (camelCase)</label>
        <input type="text" name="field_name" required pattern="^[a-z][a-zA-Z0-9]*$" placeholder="myFieldName"
            class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
        <p class="text-slate-500 text-xs mt-1">Existing: {html_escape(existing)}</p>
    </div>
    <div class="mb-4">
        <label class="block text-slate-300 text-sm font-medium mb-2">Field Type</label>
        <select name="field_type" id="field_type" onchange="toggleOpts()" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm">{type_options}</select>
    </div>
    <div id="opt-enum" class="mb-4 hidden">
        <label class="block text-slate-300 text-sm font-medium mb-2">Enum Values (comma-separated)</label>
        <input type="text" name="enum_values" placeholder="val1, val2, val3" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm">
        <label class="block text-slate-300 text-sm font-medium mt-2 mb-1">Default</label>
        <input type="text" name="enum_default" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm">
    </div>
    <div id="opt-uid" class="mb-4 hidden">
        <label class="block text-slate-300 text-sm font-medium mb-2">Target Field</label>
        <input type="text" name="uid_target" value="title" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm">
    </div>
    <div id="opt-media" class="mb-4 hidden">
        <label class="flex items-center space-x-2 text-slate-300 text-sm">
            <input type="checkbox" name="media_multiple" value="true" class="rounded bg-slate-700 border-slate-600"><span>Allow multiple files</span>
        </label>
    </div>
    <div class="mb-4 flex items-center space-x-4">
        <label class="flex items-center space-x-2 text-slate-300 text-sm">
            <input type="checkbox" name="required" value="true" class="rounded bg-slate-700 border-slate-600"><span>Required</span>
        </label>
        <label class="flex items-center space-x-2 text-slate-300 text-sm">
            <input type="checkbox" name="searchable" value="true" class="rounded bg-slate-700 border-slate-600"><span>Searchable</span>
        </label>
    </div>
    <div class="mb-6">
        <label class="block text-slate-300 text-sm font-medium mb-2">Default Value</label>
        <input type="text" name="default_value" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm">
    </div>
    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg">Preview Change</button>
    <a href="/schema" class="ml-2 text-slate-400 hover:text-white text-sm">Cancel</a>
</form></div>
<script>
function toggleOpts(){{var t=document.getElementById('field_type').value;
document.getElementById('opt-enum').classList.toggle('hidden',t!=='enumeration');
document.getElementById('opt-uid').classList.toggle('hidden',t!=='uid');
document.getElementById('opt-media').classList.toggle('hidden',t!=='media');}}
</script>'''


# --- Modify field ---

@schema_bp.route('/schema/<api_name>/modify-field/<field_name>', methods=['GET', 'POST'])
@login_required
def schema_modify_field(api_name, field_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)
    attrs = ct['schema'].get('attributes', {})
    if field_name not in attrs:
        abort(404)
    current = attrs[field_name]
    cur_type = current.get('type', 'string')
    if cur_type == 'customField':
        cur_type = 'richtext'

    if request.method == 'POST':
        new_schema = copy.deepcopy(ct['schema'])
        field = new_schema['attributes'][field_name]
        field['required'] = request.form.get('required') == 'true'

        default_val = request.form.get('default_value', '').strip()
        if default_val:
            if cur_type == 'boolean':
                field['default'] = default_val.lower() in ('true', '1', 'yes')
            elif cur_type == 'integer':
                try:
                    field['default'] = int(default_val)
                except ValueError:
                    pass
            elif cur_type in ('float', 'decimal'):
                try:
                    field['default'] = float(default_val)
                except ValueError:
                    pass
            else:
                field['default'] = default_val
        elif 'default' in field:
            del field['default']

        new_type = request.form.get('field_type', cur_type)
        allowed = SAFE_TYPE_TRANSITIONS.get(cur_type, [])
        if new_type != cur_type and new_type in allowed:
            field['type'] = new_type

        if cur_type == 'enumeration':
            new_vals = [v.strip() for v in request.form.get('enum_values', '').split(',') if v.strip()]
            old_vals = current.get('enum', [])
            if all(v in new_vals for v in old_vals):
                field['enum'] = new_vals

        field['searchable'] = request.form.get('searchable') == 'true'

        diff = generate_schema_diff(ct['schema'], new_schema)
        if not diff.strip():
            content = '<div class="bg-amber-900/50 border border-amber-600 rounded-lg p-4 text-amber-200 mb-4">No changes detected.</div>'
            content += f'<a href="/collections/{api_name}" class="text-blue-400 hover:text-blue-300 text-sm">Back to {html_escape(ct["display"])}</a>'
            return render_page('No Changes', content, 'schema')

        change_id = str(uuid_mod.uuid4())
        pending_changes[change_id] = {
            'api_name': api_name, 'old_schema': ct['schema'], 'new_schema': new_schema,
            'description': f'Modify field "{field_name}" in {ct["display"]}', 'ts': time.time(),
        }
        content = diff_preview_html(ct, diff, change_id, f'Modify field "{field_name}"')
        return render_page('Confirm Change', content, 'schema')

    # GET - show form
    allowed_types = SAFE_TYPE_TRANSITIONS.get(cur_type, [])
    type_opts = f'<option value="{html_escape(cur_type)}" selected>{html_escape(cur_type)}</option>'
    for t in allowed_types:
        type_opts += f'<option value="{html_escape(t)}">{html_escape(t)}</option>'

    enum_html = ''
    if cur_type == 'enumeration':
        vals = ', '.join(current.get('enum', []))
        enum_html = f'''<div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Enum Values (can add, not remove)</label>
        <input type="text" name="enum_values" value="{html_escape(vals)}" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm"></div>'''

    default_val = json.dumps(current.get('default', '')) if 'default' in current else ''

    content = f'''
<h2 class="text-2xl font-bold text-white mb-6">Modify Field: {html_escape(field_name)}</h2>
<p class="text-slate-400 mb-4">Collection: {html_escape(ct["display"])}</p>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-2xl">
<form method="POST">
    <div class="mb-4">
        <label class="block text-slate-300 text-sm font-medium mb-2">Field Type</label>
        <select name="field_type" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm">{type_opts}</select>
        <p class="text-slate-500 text-xs mt-1">Only safe type transitions allowed</p>
    </div>
    {enum_html}
    <div class="mb-4 flex items-center space-x-4">
        <label class="flex items-center space-x-2 text-slate-300 text-sm">
            <input type="checkbox" name="required" value="true" {"checked" if current.get("required") else ""} class="rounded bg-slate-700 border-slate-600"><span>Required</span>
        </label>
        <label class="flex items-center space-x-2 text-slate-300 text-sm">
            <input type="checkbox" name="searchable" value="true" {"checked" if current.get("searchable") else ""} class="rounded bg-slate-700 border-slate-600"><span>Searchable</span>
        </label>
    </div>
    <div class="mb-6">
        <label class="block text-slate-300 text-sm font-medium mb-2">Default Value</label>
        <input type="text" name="default_value" value="{html_escape(str(default_val))}" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm">
    </div>
    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg">Preview Change</button>
    <a href="/collections/{api_name}" class="ml-2 text-slate-400 hover:text-white text-sm">Cancel</a>
</form></div>'''
    return render_page(f'Modify: {field_name}', content, 'schema')


# --- Delete field ---

@schema_bp.route('/schema/<api_name>/delete-field/<field_name>', methods=['GET', 'POST'])
@login_required
def schema_delete_field(api_name, field_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)
    attrs = ct['schema'].get('attributes', {})
    if field_name not in attrs:
        abort(404)

    if request.method == 'POST':
        new_schema = copy.deepcopy(ct['schema'])
        del new_schema['attributes'][field_name]
        diff = generate_schema_diff(ct['schema'], new_schema)

        change_id = str(uuid_mod.uuid4())
        pending_changes[change_id] = {
            'api_name': api_name, 'old_schema': ct['schema'], 'new_schema': new_schema,
            'description': f'Delete field "{field_name}" from {ct["display"]}',
            'ts': time.time(),
        }
        content = diff_preview_html(ct, diff, change_id, f'Delete field "{field_name}"')
        return render_page('Confirm Deletion', content, 'schema')

    cur_config = attrs[field_name]
    from ..helpers import get_field_type_display
    type_display = get_field_type_display(cur_config)
    content = f'''
<h2 class="text-2xl font-bold text-white mb-2">Delete Field: <span class="text-red-400">{html_escape(field_name)}</span></h2>
<p class="text-slate-400 mb-6">Collection: {html_escape(ct["display"])}</p>
<div class="bg-red-900/30 border border-red-600 rounded-lg p-4 mb-6">
    <p class="text-red-200 font-semibold mb-2">Warning: This will permanently remove this field from the schema.</p>
    <p class="text-red-300 text-sm">Existing data in this field will become orphaned in the database. A backup will be created before applying.</p>
</div>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-2xl mb-6">
    <table class="w-full text-sm">
        <tr><td class="text-slate-400 py-1 pr-4">Field Name</td><td class="text-white font-mono">{html_escape(field_name)}</td></tr>
        <tr><td class="text-slate-400 py-1 pr-4">Type</td><td class="text-slate-300">{type_display}</td></tr>
        <tr><td class="text-slate-400 py-1 pr-4">Required</td><td class="text-slate-300">{"Yes" if cur_config.get("required") else "No"}</td></tr>
    </table>
</div>
<form method="POST">
    <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg"
            onclick="return confirm('Are you sure you want to delete the field \\'{html_escape(field_name)}\\'? This cannot be undone.');">
        Preview Deletion</button>
    <a href="/collections/{api_name}" class="ml-2 text-slate-400 hover:text-white text-sm">Cancel</a>
</form>'''
    return render_page(f'Delete: {field_name}', content, 'schema')


# --- Rename field ---

@schema_bp.route('/schema/<api_name>/rename-field/<field_name>', methods=['GET', 'POST'])
@login_required
def schema_rename_field(api_name, field_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)
    attrs = ct['schema'].get('attributes', {})
    if field_name not in attrs:
        abort(404)

    if request.method == 'POST':
        new_name = request.form.get('new_name', '').strip()
        if not new_name or not re.match(r'^[a-z][a-zA-Z0-9]*$', new_name):
            err = '<div class="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-200 mb-4">Invalid field name. Must be camelCase starting with lowercase letter.</div>'
            return render_page(f'Rename: {field_name}', err + _rename_field_form(ct, field_name), 'schema')
        if new_name == field_name:
            err = '<div class="bg-amber-900/50 border border-amber-600 rounded-lg p-4 text-amber-200 mb-4">New name is the same as the current name.</div>'
            return render_page(f'Rename: {field_name}', err + _rename_field_form(ct, field_name), 'schema')
        if new_name in attrs:
            err = f'<div class="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-200 mb-4">Field "{html_escape(new_name)}" already exists.</div>'
            return render_page(f'Rename: {field_name}', err + _rename_field_form(ct, field_name), 'schema')

        new_schema = copy.deepcopy(ct['schema'])
        # Preserve field order: rebuild attributes dict with new name in same position
        new_attrs = {}
        for k, v in new_schema['attributes'].items():
            if k == field_name:
                new_attrs[new_name] = v
            else:
                new_attrs[k] = v
        new_schema['attributes'] = new_attrs

        # Update UID targetField references if any field points to the renamed field
        for fname, fconf in new_schema['attributes'].items():
            if fconf.get('type') == 'uid' and fconf.get('targetField') == field_name:
                fconf['targetField'] = new_name

        diff = generate_schema_diff(ct['schema'], new_schema)
        change_id = str(uuid_mod.uuid4())
        pending_changes[change_id] = {
            'api_name': api_name, 'old_schema': ct['schema'], 'new_schema': new_schema,
            'description': f'Rename field "{field_name}" to "{new_name}" in {ct["display"]}',
            'ts': time.time(),
        }
        content = diff_preview_html(ct, diff, change_id, f'Rename field "{field_name}" &rarr; "{new_name}"')
        return render_page('Confirm Rename', content, 'schema')

    return render_page(f'Rename: {field_name}', _rename_field_form(ct, field_name), 'schema')


def _rename_field_form(ct, field_name):
    return f'''
<h2 class="text-2xl font-bold text-white mb-2">Rename Field: <span class="text-amber-400">{html_escape(field_name)}</span></h2>
<p class="text-slate-400 mb-6">Collection: {html_escape(ct["display"])}</p>
<div class="bg-amber-900/30 border border-amber-600 rounded-lg p-4 mb-6">
    <p class="text-amber-200 text-sm">Renaming a field changes only the schema key. The database column name is NOT automatically renamed.
    Strapi will treat this as a new field &mdash; existing data will remain in the old column.</p>
</div>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-2xl">
<form method="POST">
    <div class="mb-4">
        <label class="block text-slate-300 text-sm font-medium mb-2">Current Name</label>
        <input type="text" value="{html_escape(field_name)}" disabled
            class="w-full bg-slate-600 border border-slate-500 rounded-lg px-4 py-2 text-slate-400 text-sm">
    </div>
    <div class="mb-6">
        <label class="block text-slate-300 text-sm font-medium mb-2">New Name (camelCase)</label>
        <input type="text" name="new_name" required pattern="^[a-z][a-zA-Z0-9]*$" placeholder="newFieldName" autofocus
            class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
    </div>
    <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-lg">Preview Rename</button>
    <a href="/collections/{ct["api_name"]}" class="ml-2 text-slate-400 hover:text-white text-sm">Cancel</a>
</form></div>'''


# --- Apply schema change ---

@schema_bp.route('/schema/apply/<change_id>', methods=['POST'])
@login_required
def schema_apply(change_id):
    change = pending_changes.get(change_id)
    if not change:
        return render_template_string(ERROR_TEMPLATE, message='Change not found or expired.'), 404

    ok, backup_name = create_backup('strapi-pre-schema')
    if not ok:
        return render_template_string(ERROR_TEMPLATE, message=f'Pre-schema backup failed: {backup_name}'), 500

    api_name = change['api_name']
    schema_json = json.dumps(change['new_schema'], indent=2) + '\n'
    targets_written = []

    if request.form.get('target_prod') == 'true':
        prod_path = os.path.join(PROD_SCHEMA_BASE, api_name, 'content-types', api_name, 'schema.json')
        os.makedirs(os.path.dirname(prod_path), exist_ok=True)
        with open(prod_path, 'w') as f:
            f.write(schema_json)
        targets_written.append('Production')

    if request.form.get('target_git') == 'true':
        git_path = os.path.join(GIT_SCHEMA_BASE, api_name, 'content-types', api_name, 'schema.json')
        os.makedirs(os.path.dirname(git_path), exist_ok=True)
        with open(git_path, 'w') as f:
            f.write(schema_json)
        targets_written.append('Git')

    # Sync DB columns for added/removed/renamed fields
    db_notes = []
    old_attrs = set((change.get('old_schema') or {}).get('attributes', {}).keys())
    new_attrs = set(change['new_schema'].get('attributes', {}).keys())
    added_fields = new_attrs - old_attrs
    removed_fields = old_attrs - new_attrs

    # Detect rename: exactly one added + one removed = likely rename
    rename_detected = (len(added_fields) == 1 and len(removed_fields) == 1
                       and 'Rename' in change.get('description', ''))
    if rename_detected:
        old_name = removed_fields.pop()
        new_name = added_fields.pop()
        ok, msg = sync_db_column(change['new_schema'], new_name,
                                 {'old_name': old_name}, action='rename')
        db_notes.append(f'Rename column: {msg}')
    else:
        for field_name in added_fields:
            field_config = change['new_schema']['attributes'][field_name]
            ok, msg = sync_db_column(change['new_schema'], field_name, field_config, action='add')
            db_notes.append(f'Add column: {msg}')
        for field_name in removed_fields:
            field_config = (change.get('old_schema') or {}).get('attributes', {}).get(field_name, {})
            ok, msg = sync_db_column(change['new_schema'], field_name, field_config, action='drop')
            db_notes.append(f'Drop column: {msg}')

    invalidate_ct_cache()
    del pending_changes[change_id]
    targets_str = ' & '.join(targets_written) if targets_written else 'None'
    db_notes_html = '<br>'.join(html_escape(n) for n in db_notes) if db_notes else 'No DB changes needed'

    content = f'''
<div class="bg-green-900/50 border border-green-500 rounded-lg p-6 mb-6">
    <h3 class="text-green-400 font-semibold text-lg mb-2">Schema Change Applied</h3>
    <p class="text-slate-300">{html_escape(change["description"])}</p>
    <p class="text-slate-400 text-sm mt-2">Backup: {html_escape(backup_name)}</p>
    <p class="text-slate-400 text-sm">Written to: {html_escape(targets_str)}</p>
    <p class="text-slate-400 text-sm mt-1">DB: {db_notes_html}</p>
</div>
<div class="bg-amber-900/30 border border-amber-600 rounded-lg p-4 mb-6">
    <p class="text-amber-200 text-sm">Restart Strapi for changes to take effect.</p>
</div>
<div class="flex space-x-3">
    <a href="/schema" class="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg">Back to Schema</a>
    <a href="/deploy" class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">Restart / Deploy</a>
</div>'''
    return render_page('Change Applied', content, 'schema')


# --- New collection ---

@schema_bp.route('/schema/new-collection', methods=['GET', 'POST'])
@login_required
def schema_new_collection():
    if request.method == 'POST':
        display_name = request.form.get('display_name', '').strip()
        singular = request.form.get('singular_name', '').strip()
        plural = request.form.get('plural_name', '').strip()
        draft_publish = request.form.get('draft_and_publish') == 'true'

        if not display_name or not singular or not plural:
            err = '<div class="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-200 mb-4">All name fields are required.</div>'
            return render_page('New Collection', err + _new_collection_form(), 'schema')
        if not re.match(r'^[a-z][a-z0-9-]*$', singular):
            err = '<div class="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-200 mb-4">Singular name must be lowercase with hyphens only.</div>'
            return render_page('New Collection', err + _new_collection_form(), 'schema')

        field_names = request.form.getlist('field_names[]')
        field_types = request.form.getlist('field_types[]')
        attributes = {}
        for fn, ft in zip(field_names, field_types):
            fn = fn.strip()
            if not fn:
                continue
            attributes[fn] = build_field_definition(ft, {'required': 'false'})

        schema = {
            'kind': 'collectionType',
            'collectionName': singular.replace('-', '_') + 's',
            'info': {'singularName': singular, 'pluralName': plural, 'displayName': display_name},
            'options': {'draftAndPublish': draft_publish},
            'pluginOptions': {},
            'attributes': attributes,
        }

        api_id = f'api::{singular}.{singular}'
        bp = {
            'controller': f"import {{ factories }} from '@strapi/strapi';\n\nexport default factories.createCoreController('{api_id}');\n",
            'router': f"import {{ factories }} from '@strapi/strapi';\n\nexport default factories.createCoreRouter('{api_id}');\n",
            'service': f"import {{ factories }} from '@strapi/strapi';\n\nexport default factories.createCoreService('{api_id}');\n",
        }

        change_id = str(uuid_mod.uuid4())
        pending_changes[change_id] = {
            'api_name': singular, 'new_schema': schema, 'old_schema': None,
            'description': f'Create new collection "{display_name}"',
            'ts': time.time(), 'is_new_collection': True, 'boilerplate': bp,
        }

        schema_pretty = json.dumps(schema, indent=2)
        content = f'''
<h2 class="text-2xl font-bold text-white mb-6">Confirm New Collection</h2>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-4 mb-6">
    <h3 class="text-white font-semibold mb-2">schema.json</h3>
    <pre class="text-sm text-green-400 overflow-x-auto">{html_escape(schema_pretty)}</pre>
</div>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-4 mb-6">
    <h3 class="text-white font-semibold mb-2">Files to create</h3>
    <ul class="text-slate-300 text-sm space-y-1">
        <li>src/api/{html_escape(singular)}/content-types/{html_escape(singular)}/schema.json</li>
        <li>src/api/{html_escape(singular)}/controllers/{html_escape(singular)}.ts</li>
        <li>src/api/{html_escape(singular)}/routes/{html_escape(singular)}.ts</li>
        <li>src/api/{html_escape(singular)}/services/{html_escape(singular)}.ts</li>
    </ul>
</div>
<form method="POST" action="/schema/apply-new/{change_id}">
    <div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Write to:</label>
        <label class="flex items-center space-x-2 text-slate-300 text-sm mb-1">
            <input type="checkbox" name="target_prod" value="true" checked class="rounded bg-slate-700 border-slate-600"><span>Production</span></label>
        <label class="flex items-center space-x-2 text-slate-300 text-sm">
            <input type="checkbox" name="target_git" value="true" checked class="rounded bg-slate-700 border-slate-600"><span>Git repo</span></label>
    </div>
    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg"
            onclick="return confirm('Create collection? A backup will be created first.');">Create Collection</button>
    <a href="/schema" class="ml-2 text-slate-400 hover:text-white text-sm">Cancel</a>
</form>'''
        return render_page('Confirm New Collection', content, 'schema')

    return render_page('New Collection', _new_collection_form(), 'schema')


@schema_bp.route('/schema/apply-new/<change_id>', methods=['POST'])
@login_required
def schema_apply_new(change_id):
    change = pending_changes.get(change_id)
    if not change or not change.get('is_new_collection'):
        return render_template_string(ERROR_TEMPLATE, message='Change not found or expired.'), 404

    ok, backup_name = create_backup('strapi-pre-schema')
    if not ok:
        return render_template_string(ERROR_TEMPLATE, message=f'Backup failed: {backup_name}'), 500

    api_name = change['api_name']
    schema_json = json.dumps(change['new_schema'], indent=2) + '\n'
    bp = change['boilerplate']
    targets_written = []

    for target_key, base_path in [('target_prod', PROD_SCHEMA_BASE), ('target_git', GIT_SCHEMA_BASE)]:
        if request.form.get(target_key) != 'true':
            continue
        base = os.path.join(base_path, api_name)
        ct_dir = os.path.join(base, 'content-types', api_name)
        os.makedirs(ct_dir, exist_ok=True)
        with open(os.path.join(ct_dir, 'schema.json'), 'w') as f:
            f.write(schema_json)
        for sub, fn, content in [('controllers', f'{api_name}.ts', bp['controller']),
                                  ('routes', f'{api_name}.ts', bp['router']),
                                  ('services', f'{api_name}.ts', bp['service'])]:
            sub_dir = os.path.join(base, sub)
            os.makedirs(sub_dir, exist_ok=True)
            with open(os.path.join(sub_dir, fn), 'w') as f:
                f.write(content)
        targets_written.append('Production' if target_key == 'target_prod' else 'Git')

    invalidate_ct_cache()
    del pending_changes[change_id]
    targets_str = ' & '.join(targets_written) if targets_written else 'None'

    content = f'''
<div class="bg-green-900/50 border border-green-500 rounded-lg p-6 mb-6">
    <h3 class="text-green-400 font-semibold text-lg mb-2">Collection Created</h3>
    <p class="text-slate-300">{html_escape(change["description"])}</p>
    <p class="text-slate-400 text-sm mt-2">Backup: {html_escape(backup_name)}</p>
    <p class="text-slate-400 text-sm">Written to: {html_escape(targets_str)}</p>
</div>
<div class="flex space-x-3">
    <a href="/schema" class="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg">Back to Schema</a>
    <a href="/deploy" class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">Deploy Changes</a>
</div>'''
    return render_page('Collection Created', content, 'schema')


def _new_collection_form():
    type_options = ''.join(f'<option value="{k}">{v}</option>' for k, v in FIELD_TYPE_CHOICES)
    uid_selected = type_options.replace('value="uid"', 'value="uid" selected')
    return f'''
<h2 class="text-2xl font-bold text-white mb-6">Create New Collection</h2>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-2xl">
<form method="POST">
    <div class="mb-4"><label class="block text-slate-300 text-sm font-medium mb-2">Display Name</label>
        <input type="text" name="display_name" required placeholder="My Collection" id="dn" oninput="autoN()"
            class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm"></div>
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div><label class="block text-slate-300 text-sm font-medium mb-2">Singular</label>
            <input type="text" name="singular_name" required id="sn" pattern="^[a-z][a-z0-9-]*$" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm"></div>
        <div><label class="block text-slate-300 text-sm font-medium mb-2">Plural</label>
            <input type="text" name="plural_name" required id="pn" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm"></div>
    </div>
    <div class="mb-6"><label class="flex items-center space-x-2 text-slate-300 text-sm">
        <input type="checkbox" name="draft_and_publish" value="true" checked class="rounded bg-slate-700 border-slate-600"><span>Enable Draft & Publish</span></label></div>
    <div class="border-t border-slate-700 pt-4 mb-4">
        <h3 class="text-white font-semibold mb-3">Fields</h3>
        <div id="fl">
            <div class="flex space-x-2 mb-2"><input type="text" name="field_names[]" value="title" class="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">
                <select name="field_types[]" class="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">{type_options}</select></div>
            <div class="flex space-x-2 mb-2"><input type="text" name="field_names[]" value="slug" class="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">
                <select name="field_types[]" class="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">{uid_selected}</select></div>
        </div>
        <button type="button" onclick="addF()" class="text-blue-400 hover:text-blue-300 text-sm mt-2">+ Add Field</button>
    </div>
    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg">Preview Collection</button>
    <a href="/schema" class="ml-2 text-slate-400 hover:text-white text-sm">Cancel</a>
</form></div>
<script>
function autoN(){{var d=document.getElementById('dn').value,s=d.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
document.getElementById('sn').value=s;document.getElementById('pn').value=s+'s';}}
function addF(){{var l=document.getElementById('fl'),r=document.createElement('div');r.className='flex space-x-2 mb-2';
r.innerHTML='<input type="text" name="field_names[]" placeholder="fieldName" class="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">'
+'<select name="field_types[]" class="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">{type_options}</select>'
+'<button type="button" onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-300 px-2">&times;</button>';l.appendChild(r);}}
</script>'''
