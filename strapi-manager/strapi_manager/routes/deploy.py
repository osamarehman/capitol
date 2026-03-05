"""Deploy routes: direct Docker rebuild and git push."""
import time
import threading
import subprocess
import requests as http_requests
from flask import Blueprint, request, redirect, url_for, render_template_string
from ..auth import login_required
from ..config import STRAPI_BASE_URL, DOCKER_COMPOSE_DIR
from ..state import deploy_status, deploy_lock, pending_changes
from ..helpers import create_backup
from ..templates import render_page, ERROR_TEMPLATE

deploy_bp = Blueprint('deploy', __name__)


@deploy_bp.route('/deploy')
@login_required
def deploy_page():
    changes = [(cid, c) for cid, c in pending_changes.items() if time.time() - c.get('ts', 0) < 3600]
    health = 'unknown'
    try:
        r = http_requests.get(f'{STRAPI_BASE_URL}/_health', timeout=5)
        health = 'healthy' if r.status_code == 204 or r.ok else f'status {r.status_code}'
    except Exception:
        health = 'unreachable'

    content = render_template_string(DEPLOY_CONTENT, changes=changes, health=health)
    return render_page('Deploy', content, 'deploy')


@deploy_bp.route('/deploy/direct', methods=['POST'])
@login_required
def deploy_direct():
    with deploy_lock:
        if deploy_status['active']:
            return render_template_string(ERROR_TEMPLATE, message='A deploy is already in progress.'), 409
        deploy_status.update(active=True, step='Starting direct deploy...', error='', done=False)
    threading.Thread(target=_run_deploy_direct, daemon=True).start()
    return redirect(url_for('deploy.deploy_page'))


@deploy_bp.route('/deploy/restart', methods=['POST'])
@login_required
def deploy_restart():
    with deploy_lock:
        if deploy_status['active']:
            return render_template_string(ERROR_TEMPLATE, message='A deploy is already in progress.'), 409
        deploy_status.update(active=True, step='Starting quick restart...', error='', done=False)
    threading.Thread(target=_run_deploy_restart, daemon=True).start()
    return redirect(url_for('deploy.deploy_page'))


@deploy_bp.route('/deploy/git', methods=['POST'])
@login_required
def deploy_git():
    commit_msg = request.form.get('commit_msg', 'Update Strapi schema via CMS Manager')
    with deploy_lock:
        if deploy_status['active']:
            return render_template_string(ERROR_TEMPLATE, message='A deploy is already in progress.'), 409
        deploy_status.update(active=True, step='Starting git deploy...', error='', done=False)
    threading.Thread(target=_run_deploy_git, args=(commit_msg,), daemon=True).start()
    return redirect(url_for('deploy.deploy_page'))


def _clear_deploy_status():
    time.sleep(60)
    with deploy_lock:
        deploy_status.update(active=False, done=False, step='', error='')


def _run_deploy_restart():
    def update(step):
        with deploy_lock:
            deploy_status['step'] = step
    try:
        update('Creating pre-restart backup...')
        ok, msg = create_backup('strapi-pre-restart')
        if not ok:
            raise RuntimeError(f'Backup failed: {msg}')

        update('Restarting Strapi container...')
        r = subprocess.run(['docker', 'compose', '-f', 'docker-compose.prod.yml', 'restart', 'strapi'],
                          capture_output=True, text=True, timeout=120, cwd=DOCKER_COMPOSE_DIR)
        if r.returncode != 0:
            raise RuntimeError(f'docker compose restart failed: {r.stderr}')

        update('Waiting for health check...')
        healthy = False
        for i in range(6):
            time.sleep(10)
            update(f'Health check attempt {i+1}/6...')
            try:
                resp = http_requests.get('http://127.0.0.1:1337/_health', timeout=5)
                if resp.status_code == 204 or resp.ok:
                    healthy = True
                    break
            except Exception:
                pass

        if healthy:
            update('Restart completed! Strapi is healthy.')
        else:
            update('Restart completed but health check did not pass. Check container logs.')
        with deploy_lock:
            deploy_status['done'] = True
    except Exception as e:
        with deploy_lock:
            deploy_status['error'] = str(e)
            deploy_status['step'] = f'Error: {e}'
            deploy_status['done'] = True
    finally:
        threading.Thread(target=_clear_deploy_status, daemon=True).start()


def _run_deploy_direct():
    def update(step):
        with deploy_lock:
            deploy_status['step'] = step
    try:
        update('Creating pre-deploy backup...')
        ok, msg = create_backup('strapi-pre-deploy')
        if not ok:
            raise RuntimeError(f'Backup failed: {msg}')

        update('Stopping containers...')
        r = subprocess.run(['docker', 'compose', '-f', 'docker-compose.prod.yml', 'down'],
                          capture_output=True, text=True, timeout=120, cwd=DOCKER_COMPOSE_DIR)
        if r.returncode != 0:
            raise RuntimeError(f'docker compose down failed: {r.stderr}')

        update('Building containers (this may take several minutes)...')
        r = subprocess.run(['docker', 'compose', '-f', 'docker-compose.prod.yml', 'build', '--no-cache'],
                          capture_output=True, text=True, timeout=600, cwd=DOCKER_COMPOSE_DIR)
        if r.returncode != 0:
            raise RuntimeError(f'docker compose build failed: {r.stderr[:500]}')

        update('Starting containers...')
        r = subprocess.run(['docker', 'compose', '-f', 'docker-compose.prod.yml', 'up', '-d'],
                          capture_output=True, text=True, timeout=120, cwd=DOCKER_COMPOSE_DIR)
        if r.returncode != 0:
            raise RuntimeError(f'docker compose up failed: {r.stderr}')

        update('Waiting for health check...')
        healthy = False
        for i in range(6):
            time.sleep(10)
            update(f'Health check attempt {i+1}/6...')
            try:
                resp = http_requests.get('http://127.0.0.1:1337/_health', timeout=5)
                if resp.status_code == 204 or resp.ok:
                    healthy = True
                    break
            except Exception:
                pass

        if healthy:
            update('Deploy completed successfully! Strapi is healthy.')
        else:
            update('Deploy completed but health check did not pass. Check container logs.')
        with deploy_lock:
            deploy_status['done'] = True
    except Exception as e:
        with deploy_lock:
            deploy_status['error'] = str(e)
            deploy_status['step'] = f'Error: {e}'
            deploy_status['done'] = True
    finally:
        threading.Thread(target=_clear_deploy_status, daemon=True).start()


def _run_deploy_git(commit_msg):
    def update(step):
        with deploy_lock:
            deploy_status['step'] = step
    try:
        update('Creating pre-deploy backup...')
        ok, msg = create_backup('strapi-pre-deploy')
        if not ok:
            raise RuntimeError(f'Backup failed: {msg}')

        update('Staging changes...')
        r = subprocess.run(['git', 'add', 'strapi/src/api/'],
                          capture_output=True, text=True, timeout=30, cwd='/root/capitol')
        if r.returncode != 0:
            raise RuntimeError(f'git add failed: {r.stderr}')

        update('Committing...')
        r = subprocess.run(['git', 'commit', '-m', commit_msg],
                          capture_output=True, text=True, timeout=30, cwd='/root/capitol')
        if r.returncode != 0:
            if 'nothing to commit' in r.stdout:
                update('No changes to commit.')
                with deploy_lock:
                    deploy_status['done'] = True
                return
            raise RuntimeError(f'git commit failed: {r.stderr}')

        update('Pushing to origin/main...')
        r = subprocess.run(['git', 'push', 'origin', 'main'],
                          capture_output=True, text=True, timeout=60, cwd='/root/capitol')
        if r.returncode != 0:
            raise RuntimeError(f'git push failed: {r.stderr}')

        update('Git deploy completed! Changes pushed to main.')
        with deploy_lock:
            deploy_status['done'] = True
    except Exception as e:
        with deploy_lock:
            deploy_status['error'] = str(e)
            deploy_status['step'] = f'Error: {e}'
            deploy_status['done'] = True
    finally:
        threading.Thread(target=_clear_deploy_status, daemon=True).start()


DEPLOY_CONTENT = '''
<h2 class="text-2xl font-bold text-white mb-6">Deploy</h2>
<div id="deploy-banner" class="mb-6 hidden">
    <div class="bg-amber-900/50 border border-amber-600 rounded-lg px-6 py-4">
        <div class="flex items-center space-x-3">
            <svg class="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
            <span class="text-amber-200 font-medium" id="deploy-step">Deploying...</span>
        </div>
    </div>
</div>
<div id="deploy-error" class="mb-6 hidden"><div class="bg-red-900/50 border border-red-500 rounded-lg px-6 py-4"><span class="text-red-200" id="deploy-err-msg"></span></div></div>
<div id="deploy-ok" class="mb-6 hidden"><div class="bg-green-900/50 border border-green-500 rounded-lg px-6 py-4"><span class="text-green-200" id="deploy-ok-msg"></span></div></div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <div class="bg-slate-800 rounded-xl border border-green-700 p-6">
        <h3 class="text-white font-semibold mb-2">Quick Restart</h3>
        <p class="text-sm text-slate-400 mb-4">Health: <span class="{{ 'text-green-400' if health == 'healthy' else 'text-amber-400' }}">{{ health }}</span></p>
        <form method="POST" action="/deploy/restart" onsubmit="return confirm('Restart Strapi? Schema changes will take effect immediately.');">
            <button type="submit" class="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Restart Strapi</button>
        </form>
        <p class="text-slate-500 text-xs mt-2">Restarts container to pick up schema changes (fast, ~30s)</p>
    </div>
    <div class="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 class="text-white font-semibold mb-2">Full Rebuild</h3>
        <p class="text-sm text-slate-400 mb-4">Rebuild Docker image from scratch</p>
        <form method="POST" action="/deploy/direct" onsubmit="return confirm('Full rebuild? This will take several minutes.');">
            <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Docker Rebuild</button>
        </form>
        <p class="text-slate-500 text-xs mt-2">Full image rebuild (slow, use for Dockerfile/dependency changes)</p>
    </div>
    <div class="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 class="text-white font-semibold mb-2">Git Deploy</h3>
        <p class="text-sm text-slate-400 mb-4">Push to main branch to trigger CI/CD</p>
        <form method="POST" action="/deploy/git" onsubmit="return confirm('Commit and push to main?');">
            <input type="text" name="commit_msg" placeholder="Commit message" value="Update Strapi schema via CMS Manager"
                class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm mb-2">
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Git Deploy (Push to Main)</button>
        </form>
    </div>
</div>
{% if changes %}
<div class="bg-amber-900/30 border border-amber-600 rounded-lg p-4">
    <h3 class="text-amber-400 font-semibold mb-2">Unapplied Pending Changes ({{ changes|length }})</h3>
    <p class="text-slate-400 text-sm">Apply them from the Schema page first.</p>
</div>
{% endif %}
<script>
(function(){
    var b=document.getElementById('deploy-banner'),s=document.getElementById('deploy-step'),
        ed=document.getElementById('deploy-error'),em=document.getElementById('deploy-err-msg'),
        od=document.getElementById('deploy-ok'),om=document.getElementById('deploy-ok-msg');
    function p(){fetch('/api/deploy-status').then(function(r){return r.json();}).then(function(d){
        if(d.active){b.classList.remove('hidden');s.textContent=d.step;
            if(d.error){b.classList.add('hidden');ed.classList.remove('hidden');em.textContent=d.error;}
            else if(d.done){b.classList.add('hidden');od.classList.remove('hidden');om.textContent=d.step;}}
    }).catch(function(){});}
    setInterval(p,2000);
})();
</script>'''
