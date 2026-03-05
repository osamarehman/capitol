"""Shared helpers: API client, content type discovery, backup, schema tools."""
import os
import json
import copy
import time
import difflib
import subprocess
import requests as http_requests
from datetime import datetime
from markupsafe import escape as html_escape
from .config import (
    STRAPI_API_URL, STRAPI_BASE_URL, STRAPI_API_TOKEN,
    PROD_SCHEMA_BASE, BACKUP_DIR, DB_CONTAINER, DB_USER, DB_NAME,
    SAFE_TYPE_TRANSITIONS,
)

# --- Content type cache ---
_ct_cache = {'data': None, 'ts': 0, 'base_path': None}
CT_CACHE_TTL = 60


def strapi_api_request(method, path, params=None, json_data=None, timeout=15):
    url = f"{STRAPI_API_URL}{path}"
    headers = {'Content-Type': 'application/json'}
    if STRAPI_API_TOKEN:
        headers['Authorization'] = f'Bearer {STRAPI_API_TOKEN}'
    try:
        resp = http_requests.request(method, url, headers=headers,
                                     params=params, json=json_data, timeout=timeout)
        resp.raise_for_status()
        if not resp.content:
            return {'error': 'Empty response from Strapi (is the container running?)'}
        return resp.json()
    except http_requests.exceptions.Timeout:
        return {'error': 'API request timed out'}
    except http_requests.exceptions.ConnectionError:
        return {'error': 'Cannot connect to Strapi API'}
    except http_requests.exceptions.HTTPError as e:
        body = ''
        try:
            body = e.response.text[:500]
        except Exception:
            pass
        return {'error': f'API error {e.response.status_code}: {body}'}
    except Exception as e:
        return {'error': str(e)}


def discover_content_types(base_path=PROD_SCHEMA_BASE):
    global _ct_cache
    now = time.time()
    if (_ct_cache['data'] is not None and
            (now - _ct_cache['ts']) < CT_CACHE_TTL and
            _ct_cache.get('base_path') == base_path):
        return _ct_cache['data']
    content_types = []
    if not os.path.isdir(base_path):
        return content_types
    for api_name in sorted(os.listdir(base_path)):
        api_dir = os.path.join(base_path, api_name)
        if not os.path.isdir(api_dir):
            continue
        schema_path = os.path.join(api_dir, 'content-types', api_name, 'schema.json')
        if not os.path.isfile(schema_path):
            continue
        try:
            with open(schema_path, 'r') as f:
                schema = json.load(f)
            info = schema.get('info', {})
            attrs = schema.get('attributes', {})
            content_types.append({
                'api_name': api_name,
                'singular': info.get('singularName', api_name),
                'plural': info.get('pluralName', api_name + 's'),
                'display': info.get('displayName', api_name.replace('-', ' ').title()),
                'description': info.get('description', ''),
                'field_count': len(attrs),
                'schema': schema,
                'schema_path': schema_path,
            })
        except (json.JSONDecodeError, IOError):
            continue
    _ct_cache = {'data': content_types, 'ts': now, 'base_path': base_path}
    return content_types


def get_content_type(api_name, base_path=PROD_SCHEMA_BASE):
    for ct in discover_content_types(base_path):
        if ct['api_name'] == api_name:
            return ct
    return None


def invalidate_ct_cache():
    global _ct_cache
    _ct_cache = {'data': None, 'ts': 0, 'base_path': None}


def create_backup(prefix='strapi-pre-schema'):
    timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
    filename = f'{prefix}-{timestamp}.sql.gz'
    filepath = os.path.join(BACKUP_DIR, filename)
    try:
        result = subprocess.run(
            f'docker exec {DB_CONTAINER} pg_dump -U {DB_USER} -d {DB_NAME} | gzip > "{filepath}"',
            shell=True, capture_output=True, text=True, timeout=300)
        if result.returncode != 0:
            return False, f'Backup failed: {result.stderr}'
        with open(os.path.join(BACKUP_DIR, 'backup.log'), 'a') as log:
            log.write(f"{datetime.now()}: Auto backup {filename} created\n")
        return True, filename
    except Exception as e:
        return False, str(e)


def _camel_to_snake(name):
    """Convert camelCase to snake_case for DB column names."""
    import re as _re
    s1 = _re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return _re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


# Strapi field type -> PostgreSQL column type
_STRAPI_TO_PG = {
    'string': 'varchar(255)',
    'text': 'text',
    'richtext': 'text',
    'customField': 'text',
    'integer': 'integer',
    'float': 'double precision',
    'decimal': 'numeric(10,2)',
    'boolean': 'boolean',
    'date': 'date',
    'datetime': 'timestamp with time zone',
    'email': 'varchar(255)',
    'uid': 'varchar(255)',
    'enumeration': 'varchar(255)',
    'json': 'jsonb',
}


def sync_db_column(schema, field_name, field_config, action='add'):
    """Add or drop a DB column for a schema field. Returns (ok, message)."""
    table_name = schema.get('collectionName')
    if not table_name:
        return False, 'No collectionName in schema'
    col_name = _camel_to_snake(field_name)
    field_type = field_config.get('type', 'string')
    # Media fields use a link table, not a column
    if field_type == 'media':
        return True, 'Media fields use link tables (no column needed)'
    pg_type = _STRAPI_TO_PG.get(field_type, 'text')
    if action == 'add':
        sql = f'ALTER TABLE {table_name} ADD COLUMN IF NOT EXISTS {col_name} {pg_type};'
    elif action == 'drop':
        sql = f'ALTER TABLE {table_name} DROP COLUMN IF EXISTS {col_name};'
    elif action == 'rename':
        # field_config should have 'old_name' for rename
        old_col = _camel_to_snake(field_config.get('old_name', field_name))
        sql = f'ALTER TABLE {table_name} RENAME COLUMN {old_col} TO {col_name};'
    else:
        return False, f'Unknown action: {action}'
    try:
        result = subprocess.run(
            ['docker', 'exec', DB_CONTAINER, 'psql', '-U', DB_USER, '-d', DB_NAME, '-c', sql],
            capture_output=True, text=True, timeout=30)
        if result.returncode != 0:
            return False, f'DB error: {result.stderr.strip()}'
        return True, f'Column {col_name} {action}ed on table {table_name}'
    except Exception as e:
        return False, str(e)


def build_field_definition(field_type, form_data):
    field = {}
    if field_type == 'string':
        field = {'type': 'string'}
    elif field_type == 'text':
        field = {'type': 'text'}
    elif field_type == 'richtext':
        field = {'type': 'customField', 'customField': 'plugin::ckeditor5.CKEditor',
                 'options': {'preset': 'defaultHtml'}}
    elif field_type == 'integer':
        field = {'type': 'integer'}
    elif field_type == 'float':
        field = {'type': 'float'}
    elif field_type == 'decimal':
        field = {'type': 'decimal'}
    elif field_type == 'boolean':
        field = {'type': 'boolean', 'default': False}
    elif field_type == 'date':
        field = {'type': 'date'}
    elif field_type == 'datetime':
        field = {'type': 'datetime'}
    elif field_type == 'email':
        field = {'type': 'email'}
    elif field_type == 'json':
        field = {'type': 'json'}
    elif field_type == 'uid':
        target = form_data.get('uid_target', 'title')
        field = {'type': 'uid', 'targetField': target, 'searchable': True}
    elif field_type == 'enumeration':
        values = [v.strip() for v in form_data.get('enum_values', '').split(',') if v.strip()]
        field = {'type': 'enumeration', 'enum': values}
        default = form_data.get('enum_default', '').strip()
        if default and default in values:
            field['default'] = default
    elif field_type == 'media':
        multiple = form_data.get('media_multiple') == 'true'
        field = {'type': 'media', 'multiple': multiple,
                 'required': False, 'allowedTypes': ['images']}
    else:
        field = {'type': 'string'}

    field['required'] = form_data.get('required') == 'true'

    default_val = form_data.get('default_value', '').strip()
    if default_val and field_type not in ('richtext', 'media', 'json', 'uid'):
        if field_type == 'boolean':
            field['default'] = default_val.lower() in ('true', '1', 'yes')
        elif field_type == 'integer':
            try:
                field['default'] = int(default_val)
            except ValueError:
                pass
        elif field_type in ('float', 'decimal'):
            try:
                field['default'] = float(default_val)
            except ValueError:
                pass
        elif field_type != 'enumeration':
            field['default'] = default_val

    if form_data.get('searchable') == 'true' and field_type in ('string', 'text', 'email'):
        field['searchable'] = True
    return field


def generate_schema_diff(old_schema, new_schema):
    old_lines = json.dumps(old_schema, indent=2).splitlines()
    new_lines = json.dumps(new_schema, indent=2).splitlines()
    diff = list(difflib.unified_diff(old_lines, new_lines,
                                     fromfile='current', tofile='modified', lineterm=''))
    return '\n'.join(diff)


def select_display_columns(schema, max_cols=6):
    attrs = schema.get('attributes', {})
    selected = []
    for f in ['title', 'name', 'displayName', 'slug']:
        if f in attrs and f not in selected:
            selected.append(f)
    skip_types = {'customField', 'media', 'json', 'relation', 'component', 'dynamiczone'}
    for name, config in attrs.items():
        if name in selected or len(selected) >= max_cols:
            break
        if config.get('type', '') not in skip_types:
            selected.append(name)
    return selected[:max_cols]


def get_field_type_display(config):
    ft = config.get('type', 'unknown')
    if ft == 'customField':
        cf = config.get('customField', '')
        if 'ckeditor' in cf.lower():
            return 'Rich text (CKEditor)'
        return f'Custom: {cf}'
    if ft == 'uid':
        target = config.get('targetField', '')
        return f'UID &rarr; {target}' if target else 'UID'
    if ft == 'enumeration':
        return f'Enum ({len(config.get("enum", []))} values)'
    if ft == 'media':
        return 'Media (multiple)' if config.get('multiple') else 'Media (single)'
    return ft.capitalize()


def format_cell_value(value, field_config):
    if value is None:
        return '<span class="text-slate-500 italic">null</span>'
    ft = field_config.get('type', 'string')
    if ft == 'boolean':
        if value:
            return '<span class="bg-green-600 text-white text-xs px-2 py-0.5 rounded">true</span>'
        return '<span class="bg-slate-600 text-slate-300 text-xs px-2 py-0.5 rounded">false</span>'
    if ft == 'enumeration':
        return f'<span class="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded">{html_escape(str(value))}</span>'
    if ft == 'media':
        if isinstance(value, dict):
            url = value.get('url', '')
            if url:
                full_url = STRAPI_BASE_URL + url if url.startswith('/') else url
                return f'<img src="{html_escape(full_url)}" class="h-8 w-8 object-cover rounded" alt="media">'
        if isinstance(value, list) and value:
            return f'<span class="text-slate-400">({len(value)} files)</span>'
        return '<span class="text-slate-400">(media)</span>'
    if ft == 'customField':
        return '<span class="text-slate-400 italic">(rich text)</span>'
    if ft in ('datetime', 'date'):
        s = str(value)
        return str(html_escape(s[:19].replace('T', ' ') if len(s) > 19 else s))
    s = str(value)
    if len(s) > 80:
        return str(html_escape(s[:80])) + '&hellip;'
    return str(html_escape(s))


def diff_preview_html(ct, diff, change_id, description):
    """Render a schema diff preview with apply form."""
    diff_lines = []
    for line in diff.split('\n'):
        if line.startswith('+') and not line.startswith('+++'):
            diff_lines.append(f'<span class="diff-add">{html_escape(line)}</span>')
        elif line.startswith('-') and not line.startswith('---'):
            diff_lines.append(f'<span class="diff-del">{html_escape(line)}</span>')
        elif line.startswith('@@'):
            diff_lines.append(f'<span class="diff-hdr">{html_escape(line)}</span>')
        else:
            diff_lines.append(str(html_escape(line)))
    diff_html = '\n'.join(diff_lines)
    return f'''
<h2 class="text-2xl font-bold text-white mb-2">Confirm Schema Change</h2>
<p class="text-slate-400 mb-6">{html_escape(description)} on <strong>{html_escape(ct["display"])}</strong></p>
<div class="bg-slate-800 rounded-xl border border-slate-700 p-4 mb-6">
    <h3 class="text-white font-semibold mb-2">Diff Preview</h3>
    <pre class="text-sm overflow-x-auto leading-relaxed">{diff_html}</pre>
</div>
<form method="POST" action="/schema/apply/{change_id}">
    <div class="mb-4">
        <label class="block text-slate-300 text-sm font-medium mb-2">Write to:</label>
        <label class="flex items-center space-x-2 text-slate-300 text-sm mb-1">
            <input type="checkbox" name="target_prod" value="true" checked class="rounded bg-slate-700 border-slate-600">
            <span>Production ({html_escape(PROD_SCHEMA_BASE)})</span>
        </label>
        <label class="flex items-center space-x-2 text-slate-300 text-sm">
            <input type="checkbox" name="target_git" value="true" checked class="rounded bg-slate-700 border-slate-600">
            <span>Git repo ({html_escape(str(os.path.dirname(PROD_SCHEMA_BASE).replace("opt/strapi-build", "root/capitol")))})</span>
        </label>
    </div>
    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg"
            onclick="return confirm('Apply this schema change? A backup will be created first.');">Apply Change</button>
    <a href="/schema" class="ml-2 text-slate-400 hover:text-white text-sm">Cancel</a>
</form>'''
