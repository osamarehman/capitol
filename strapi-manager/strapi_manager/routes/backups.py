"""Backup management routes."""
import os
import subprocess
import threading
import time
from datetime import datetime
from flask import Blueprint, request, redirect, url_for, send_file, abort, render_template_string
from werkzeug.utils import secure_filename
from ..auth import login_required
from ..config import BACKUP_DIR, DB_CONTAINER, DB_USER, DB_NAME, STRAPI_CONTAINER
from ..state import restore_status, restore_lock
from ..templates import render_page, ERROR_TEMPLATE

backups_bp = Blueprint('backups', __name__)


def validate_backup_filename(filename):
    safe = secure_filename(filename)
    if not safe or safe != filename:
        return None
    if not safe.endswith('.sql.gz'):
        return None
    full_path = os.path.join(BACKUP_DIR, safe)
    real_path = os.path.realpath(full_path)
    if not real_path.startswith(os.path.realpath(BACKUP_DIR) + os.sep):
        return None
    return real_path


@backups_bp.route('/backups')
@login_required
def backups_page():
    backups = []
    for fname in sorted(os.listdir(BACKUP_DIR), reverse=True):
        if fname.endswith('.sql.gz'):
            fpath = os.path.join(BACKUP_DIR, fname)
            stat = os.stat(fpath)
            size_mb = stat.st_size / (1024 * 1024)
            mtime = datetime.fromtimestamp(stat.st_mtime)
            backups.append({
                'filename': fname,
                'size': f'{size_mb:.2f} MB',
                'date': mtime.strftime('%Y-%m-%d %H:%M:%S'),
            })
    content = render_template_string(BACKUPS_CONTENT, backups=backups, restore_status=restore_status)
    return render_page('Backups', content, 'backups')


@backups_bp.route('/backup/create', methods=['POST'])
@login_required
def backup_create():
    timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
    filename = f'strapi-manual-{timestamp}.sql.gz'
    filepath = os.path.join(BACKUP_DIR, filename)
    try:
        result = subprocess.run(
            f'docker exec {DB_CONTAINER} pg_dump -U {DB_USER} -d {DB_NAME} | gzip > "{filepath}"',
            shell=True, capture_output=True, text=True, timeout=300)
        if result.returncode != 0:
            return render_template_string(ERROR_TEMPLATE, message=f'Backup failed: {result.stderr}'), 500
        with open(os.path.join(BACKUP_DIR, 'backup.log'), 'a') as log:
            log.write(f"{datetime.now()}: Manual backup {filename} created via dashboard\n")
    except subprocess.TimeoutExpired:
        return render_template_string(ERROR_TEMPLATE, message='Backup timed out after 5 minutes.'), 500
    except Exception as e:
        return render_template_string(ERROR_TEMPLATE, message=f'Backup error: {str(e)}'), 500
    return redirect(url_for('backups.backups_page'))


@backups_bp.route('/backup/delete/<filename>', methods=['POST'])
@login_required
def backup_delete(filename):
    filepath = validate_backup_filename(filename)
    if not filepath or not os.path.isfile(filepath):
        abort(404)
    os.remove(filepath)
    with open(os.path.join(BACKUP_DIR, 'backup.log'), 'a') as log:
        log.write(f"{datetime.now()}: Deleted {filename} via dashboard\n")
    return redirect(url_for('backups.backups_page'))


@backups_bp.route('/backup/download/<filename>')
@login_required
def backup_download(filename):
    filepath = validate_backup_filename(filename)
    if not filepath or not os.path.isfile(filepath):
        abort(404)
    return send_file(filepath, as_attachment=True, download_name=filename)


@backups_bp.route('/backup/restore/<filename>', methods=['POST'])
@login_required
def backup_restore(filename):
    filepath = validate_backup_filename(filename)
    if not filepath or not os.path.isfile(filepath):
        abort(404)
    with restore_lock:
        if restore_status['active']:
            return render_template_string(ERROR_TEMPLATE, message='A restore is already in progress.'), 409
        restore_status['active'] = True
        restore_status['step'] = 'Starting restore...'
        restore_status['error'] = ''
        restore_status['done'] = False
    thread = threading.Thread(target=_run_restore, args=(filepath, filename), daemon=True)
    thread.start()
    return redirect(url_for('backups.backups_page'))


def _run_restore(filepath, filename):
    def update_step(step):
        with restore_lock:
            restore_status['step'] = step
    try:
        update_step('Stopping Strapi...')
        r = subprocess.run(['docker', 'stop', STRAPI_CONTAINER], capture_output=True, text=True, timeout=60)
        if r.returncode != 0:
            raise RuntimeError(f'Failed to stop Strapi: {r.stderr}')
        update_step('Dropping and recreating database...')
        drop_sql = f"DROP DATABASE IF EXISTS {DB_NAME}; CREATE DATABASE {DB_NAME} OWNER {DB_USER};"
        r = subprocess.run(['docker', 'exec', DB_CONTAINER, 'psql', '-U', DB_USER, '-d', 'postgres', '-c', drop_sql],
                          capture_output=True, text=True, timeout=30)
        if r.returncode != 0:
            raise RuntimeError(f'Failed to recreate database: {r.stderr}')
        update_step(f'Restoring from {filename}...')
        r = subprocess.run(f'gunzip -c "{filepath}" | docker exec -i {DB_CONTAINER} psql -U {DB_USER} -d {DB_NAME}',
                          shell=True, capture_output=True, text=True, timeout=600)
        if r.returncode != 0:
            raise RuntimeError(f'psql restore failed: {r.stderr[:500]}')
        update_step('Starting Strapi...')
        r = subprocess.run(['docker', 'start', STRAPI_CONTAINER], capture_output=True, text=True, timeout=60)
        if r.returncode != 0:
            raise RuntimeError(f'Failed to start Strapi: {r.stderr}')
        update_step('Restore completed successfully!')
        with restore_lock:
            restore_status['done'] = True
        with open(os.path.join(BACKUP_DIR, 'backup.log'), 'a') as log:
            log.write(f"{datetime.now()}: Restored from {filename} via dashboard\n")
    except Exception as e:
        with restore_lock:
            restore_status['error'] = str(e)
            restore_status['step'] = f'Error: {e}'
            restore_status['done'] = True
        try:
            subprocess.run(['docker', 'start', STRAPI_CONTAINER], capture_output=True, timeout=60)
        except Exception:
            pass
    finally:
        def clear_status():
            time.sleep(30)
            with restore_lock:
                restore_status['active'] = False
                restore_status['done'] = False
                restore_status['step'] = ''
                restore_status['error'] = ''
        threading.Thread(target=clear_status, daemon=True).start()


BACKUPS_CONTENT = '''
<div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-white">Database Backups</h2>
    <form method="POST" action="/backup/create" class="inline" onsubmit="return confirm('Create a new backup now?');">
        <button type="submit" class="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">+ New Backup</button>
    </form>
</div>
<div id="restore-banner" class="mb-6 {{ '' if restore_status.active else 'hidden' }}">
    <div class="bg-amber-900/50 border border-amber-600 rounded-lg px-6 py-4">
        <div class="flex items-center space-x-3">
            <svg class="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
            <span class="text-amber-200 font-medium" id="restore-step">{{ restore_status.step }}</span>
        </div>
    </div>
</div>
<div id="error-banner" class="mb-6 hidden"><div class="bg-red-900/50 border border-red-500 rounded-lg px-6 py-4"><span class="text-red-200 font-medium" id="error-message"></span></div></div>
<div id="success-banner" class="mb-6 hidden"><div class="bg-green-900/50 border border-green-500 rounded-lg px-6 py-4"><span class="text-green-200 font-medium" id="success-message"></span></div></div>
<div class="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden">
    <div class="px-6 py-4 border-b border-slate-700"><h3 class="text-lg font-semibold text-white">All Backups ({{ backups|length }})</h3></div>
    {% if backups %}
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead><tr class="text-left text-sm text-slate-400 border-b border-slate-700">
                <th class="px-6 py-3 font-medium">Filename</th><th class="px-6 py-3 font-medium">Size</th>
                <th class="px-6 py-3 font-medium">Date</th><th class="px-6 py-3 font-medium text-right">Actions</th>
            </tr></thead>
            <tbody class="divide-y divide-slate-700">
                {% for b in backups %}
                <tr class="hover:bg-slate-700/50 transition-colors">
                    <td class="px-6 py-4"><span class="text-white font-mono text-sm">{{ b.filename }}</span></td>
                    <td class="px-6 py-4 text-slate-300 text-sm">{{ b.size }}</td>
                    <td class="px-6 py-4 text-slate-300 text-sm">{{ b.date }}</td>
                    <td class="px-6 py-4 text-right space-x-2">
                        <a href="/backup/download/{{ b.filename }}" class="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors">Download</a>
                        <form method="POST" action="/backup/restore/{{ b.filename }}" class="inline" onsubmit="return confirm('RESTORE from {{ b.filename }}?');">
                            <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors">Restore</button>
                        </form>
                        <form method="POST" action="/backup/delete/{{ b.filename }}" class="inline" onsubmit="return confirm('Delete {{ b.filename }}?');">
                            <button type="submit" class="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors">Delete</button>
                        </form>
                    </td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
    {% else %}
    <div class="px-6 py-12 text-center"><p class="text-slate-400">No backups found.</p></div>
    {% endif %}
</div>
<script>
(function(){
    var banner=document.getElementById('restore-banner'),stepEl=document.getElementById('restore-step'),
        errBanner=document.getElementById('error-banner'),errMsg=document.getElementById('error-message'),
        okBanner=document.getElementById('success-banner'),okMsg=document.getElementById('success-message');
    function poll(){fetch('/api/status').then(function(r){return r.json();}).then(function(d){
        if(d.active){banner.classList.remove('hidden');stepEl.textContent=d.step;
            if(d.error){banner.classList.add('hidden');errBanner.classList.remove('hidden');errMsg.textContent=d.error;}
            else if(d.done){banner.classList.add('hidden');okBanner.classList.remove('hidden');okMsg.textContent=d.step;setTimeout(function(){location.reload();},3000);}
        }else{banner.classList.add('hidden');}}).catch(function(){});}
    setInterval(poll,2000);
})();
</script>'''
