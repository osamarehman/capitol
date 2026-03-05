"""API status endpoints for AJAX polling."""
from flask import Blueprint, request, jsonify
from ..auth import login_required
from ..state import restore_status, restore_lock, deploy_status, deploy_lock, import_statuses, import_lock

api_bp = Blueprint('api', __name__)


@api_bp.route('/api/status')
@login_required
def api_status():
    with restore_lock:
        return jsonify({
            'active': restore_status['active'],
            'step': restore_status['step'],
            'error': restore_status['error'],
            'done': restore_status['done'],
        })


@api_bp.route('/api/deploy-status')
@login_required
def api_deploy_status():
    with deploy_lock:
        return jsonify({
            'active': deploy_status['active'],
            'step': deploy_status['step'],
            'error': deploy_status['error'],
            'done': deploy_status['done'],
        })


@api_bp.route('/api/import-status')
@login_required
def api_import_status():
    import_id = request.args.get('id', '')
    with import_lock:
        s = import_statuses.get(import_id, {})
        return jsonify({
            'active': s.get('active', False),
            'step': s.get('step', ''),
            'error': s.get('error', ''),
            'done': s.get('done', False),
            'created': s.get('created', 0),
            'updated': s.get('updated', 0),
            'skipped': s.get('skipped', 0),
            'failed': s.get('failed', 0),
        })
