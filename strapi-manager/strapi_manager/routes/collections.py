"""Collection browser routes."""
import json
from flask import Blueprint, abort, render_template_string
from ..auth import login_required
from ..helpers import discover_content_types, get_content_type, get_field_type_display, strapi_api_request
from ..templates import render_page

collections_bp = Blueprint('collections', __name__)


@collections_bp.route('/collections')
@login_required
def collections_page():
    cts = discover_content_types()
    for ct in cts:
        resp = strapi_api_request('GET', f"/{ct['plural']}", params={'pagination[pageSize]': '1'})
        if 'error' not in resp:
            ct['entry_count'] = resp.get('meta', {}).get('pagination', {}).get('total', '?')
        else:
            ct['entry_count'] = '?'
    content = render_template_string('''
<h2 class="text-2xl font-bold text-white mb-6">Content Types</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{% for ct in content_types %}
<div class="bg-slate-800 rounded-xl border border-slate-700 p-5 hover:border-blue-500 transition-colors">
    <h3 class="text-lg font-semibold text-white mb-1">{{ ct.display }}</h3>
    <p class="text-slate-400 text-sm mb-3">{{ ct.description[:80] if ct.description else 'No description' }}</p>
    <div class="flex items-center space-x-4 text-sm text-slate-300 mb-4">
        <span class="bg-slate-700 px-2 py-0.5 rounded">/api/{{ ct.plural }}</span>
        <span>{{ ct.field_count }} fields</span>
        <span>{{ ct.entry_count }} entries</span>
    </div>
    <a href="/collections/{{ ct.api_name }}" class="text-blue-400 hover:text-blue-300 text-sm font-medium">View Details &rarr;</a>
</div>
{% endfor %}
</div>''', content_types=cts)
    return render_page('Collections', content, 'collections')


@collections_bp.route('/collections/<api_name>')
@login_required
def collection_detail(api_name):
    ct = get_content_type(api_name)
    if not ct:
        abort(404)
    attrs = ct['schema'].get('attributes', {})
    fields = []
    for name, config in attrs.items():
        fields.append({
            'name': name,
            'type_display': get_field_type_display(config),
            'required': config.get('required', False),
            'default': json.dumps(config.get('default', '')) if 'default' in config else '-',
            'options': ', '.join(config.get('enum', [])) if config.get('type') == 'enumeration' else '',
        })
    content = render_template_string('''
<div class="flex items-center justify-between mb-6">
    <div>
        <h2 class="text-2xl font-bold text-white">{{ ct.display }}</h2>
        <p class="text-slate-400 text-sm">{{ ct.description }}</p>
    </div>
    <div class="flex space-x-2">
        <a href="/data/{{ ct.api_name }}" class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">Browse Data</a>
        <a href="/schema/{{ ct.api_name }}/add-field" class="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">+ Add Field</a>
    </div>
</div>
<div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-6">
    <div class="px-6 py-4 border-b border-slate-700"><h3 class="text-lg font-semibold text-white">Fields ({{ fields|length }})</h3></div>
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead><tr class="text-left text-sm text-slate-400 border-b border-slate-700">
                <th class="px-6 py-3">Name</th><th class="px-6 py-3">Type</th><th class="px-6 py-3">Required</th>
                <th class="px-6 py-3">Default</th><th class="px-6 py-3">Options</th><th class="px-6 py-3">Actions</th>
            </tr></thead>
            <tbody class="divide-y divide-slate-700">
            {% for f in fields %}
            <tr class="hover:bg-slate-700/50">
                <td class="px-6 py-3 text-white font-mono text-sm">{{ f.name }}</td>
                <td class="px-6 py-3 text-slate-300 text-sm">{{ f.type_display }}</td>
                <td class="px-6 py-3 text-sm">{% if f.required %}<span class="text-green-400">Yes</span>{% else %}<span class="text-slate-500">No</span>{% endif %}</td>
                <td class="px-6 py-3 text-slate-300 text-sm font-mono">{{ f.default }}</td>
                <td class="px-6 py-3 text-slate-400 text-sm">{{ f.options[:60] }}</td>
                <td class="px-6 py-3 whitespace-nowrap">
                    <a href="/schema/{{ ct.api_name }}/modify-field/{{ f.name }}" class="text-blue-400 hover:text-blue-300 text-sm">Modify</a>
                    <a href="/schema/{{ ct.api_name }}/rename-field/{{ f.name }}" class="text-amber-400 hover:text-amber-300 text-sm ml-2">Rename</a>
                    <a href="/schema/{{ ct.api_name }}/delete-field/{{ f.name }}" class="text-red-400 hover:text-red-300 text-sm ml-2">Delete</a>
                </td>
            </tr>
            {% endfor %}
            </tbody>
        </table>
    </div>
</div>
<details class="bg-slate-800 rounded-xl border border-slate-700 p-5">
    <summary class="text-white font-semibold cursor-pointer">Raw Schema JSON</summary>
    <pre class="mt-4 text-sm text-slate-300 overflow-x-auto">{{ schema_json }}</pre>
</details>''', ct=ct, fields=fields, schema_json=json.dumps(ct['schema'], indent=2))
    return render_page(ct['display'], content, 'collections')
