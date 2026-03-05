"""Data viewer routes."""
from flask import Blueprint, request, abort, render_template_string
from markupsafe import escape as html_escape
from ..auth import login_required
from ..helpers import (discover_content_types, get_content_type, strapi_api_request,
                       select_display_columns, format_cell_value)
from ..templates import render_page

data_bp = Blueprint('data', __name__)


@data_bp.route('/data')
@login_required
def data_page():
    cts = discover_content_types()
    content = render_template_string('''
<h2 class="text-2xl font-bold text-white mb-6">Browse Data</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{% for ct in content_types %}
<a href="/data/{{ ct.api_name }}" class="bg-slate-800 rounded-xl border border-slate-700 p-5 hover:border-blue-500 transition-colors block">
    <h3 class="text-lg font-semibold text-white mb-1">{{ ct.display }}</h3>
    <p class="text-slate-400 text-sm">{{ ct.field_count }} fields</p>
</a>
{% endfor %}
</div>''', content_types=cts)
    return render_page('Data', content, 'data')


@data_bp.route('/data/<api_name>')
@login_required
def data_browse(api_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)
    page = request.args.get('page', '1')
    page_size = request.args.get('pageSize', '25')
    sort = request.args.get('sort', 'createdAt:desc')
    search = request.args.get('search', '')

    params = {
        'pagination[page]': page, 'pagination[pageSize]': page_size,
        'sort': sort, 'populate': '*',
    }
    if search:
        attrs = ct['schema'].get('attributes', {})
        search_field = 'title' if 'title' in attrs else next(
            (k for k, v in attrs.items() if v.get('type') == 'string'), None)
        if search_field:
            params[f'filters[{search_field}][$containsi]'] = search

    resp = strapi_api_request('GET', f"/{ct['plural']}", params=params)
    if 'error' in resp:
        content = f'<div class="bg-red-900/50 border border-red-500 rounded-lg p-6 text-red-200">{html_escape(resp["error"])}</div>'
        return render_page('Data', content, 'data')

    entries = resp.get('data', [])
    meta = resp.get('meta', {}).get('pagination', {})
    cur_page = meta.get('page', 1)
    page_count = meta.get('pageCount', 1)
    total = meta.get('total', 0)

    columns = select_display_columns(ct['schema'])
    attrs = ct['schema'].get('attributes', {})

    # Build table rows
    rows_html = []
    for entry in entries:
        cells = [f'<td class="px-4 py-3 text-slate-400 text-sm">{entry.get("id","")}</td>']
        for col in columns:
            val = entry.get(col)
            cfg = attrs.get(col, {'type': 'string'})
            cells.append(f'<td class="px-4 py-3 text-sm text-slate-200">{format_cell_value(val, cfg)}</td>')
        rows_html.append('<tr class="hover:bg-slate-700/50 border-b border-slate-700 text-slate-200">' + ''.join(cells) + '</tr>')

    # Build header
    header_cells = '<th class="px-4 py-3 text-slate-400 font-medium text-sm">ID</th>'
    for col in columns:
        asc_link = f'?page=1&pageSize={page_size}&sort={col}:asc&search={html_escape(search)}'
        header_cells += f'<th class="px-4 py-3 text-slate-400 font-medium text-sm"><a href="{asc_link}" class="hover:text-white">{html_escape(col)}</a></th>'

    empty_row = '<tr><td colspan="99" class="px-6 py-12 text-center text-slate-400">No entries found.</td></tr>'
    tbody = ''.join(rows_html) if rows_html else empty_row

    # Pagination links
    prev_link = ''
    if cur_page > 1:
        prev_link = f'<a href="?page={cur_page-1}&pageSize={page_size}&sort={sort}&search={html_escape(search)}" class="bg-slate-700 hover:bg-slate-600 text-white text-sm px-3 py-1.5 rounded-md">&larr; Previous</a>'
    next_link = ''
    if cur_page < page_count:
        next_link = f'<a href="?page={cur_page+1}&pageSize={page_size}&sort={sort}&search={html_escape(search)}" class="bg-slate-700 hover:bg-slate-600 text-white text-sm px-3 py-1.5 rounded-md">Next &rarr;</a>'

    content = f'''
<div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-white">{html_escape(ct["display"])} <span class="text-slate-400 text-lg">({total} entries)</span></h2>
    <a href="/data" class="text-blue-400 hover:text-blue-300 text-sm">&larr; All Collections</a>
</div>
<form method="GET" class="mb-4 flex space-x-2">
    <input type="hidden" name="pageSize" value="{html_escape(page_size)}">
    <input type="hidden" name="sort" value="{html_escape(sort)}">
    <input type="text" name="search" value="{html_escape(search)}" placeholder="Search..."
        class="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">Search</button>
</form>
<div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead><tr class="border-b border-slate-700">{header_cells}</tr></thead>
            <tbody>{tbody}</tbody>
        </table>
    </div>
</div>
<div class="flex items-center justify-between mt-4">
    <div class="text-slate-400 text-sm">Page {cur_page} of {page_count}</div>
    <div class="flex space-x-2">{prev_link}{next_link}</div>
</div>'''
    return render_page(f'Data: {ct["display"]}', content, 'data')
