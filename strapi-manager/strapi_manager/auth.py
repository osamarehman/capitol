"""Authentication helpers and routes."""
import hashlib
from functools import wraps
from flask import Blueprint, request, redirect, url_for, render_template_string
from .config import DASHBOARD_USERNAME, DASHBOARD_PASSWORD, AUTH_TOKEN_NAME
from .templates import LOGIN_TEMPLATE

auth_bp = Blueprint('auth', __name__)

def _get_secret():
    from flask import current_app
    return current_app.secret_key

def generate_auth_token():
    data = f"{DASHBOARD_USERNAME}:{_get_secret()}:authenticated"
    return hashlib.sha256(data.encode()).hexdigest()

def verify_auth_token(token):
    if not token:
        return False
    return token == generate_auth_token()

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get(AUTH_TOKEN_NAME)
        if not verify_auth_token(token):
            return redirect(url_for('auth.login'))
        return f(*args, **kwargs)
    return decorated_function


@auth_bp.route('/')
def index():
    return redirect(url_for('backups.backups_page'))

@auth_bp.route('/dashboard')
def dashboard_redirect():
    return redirect(url_for('backups.backups_page'))

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    token = request.cookies.get(AUTH_TOKEN_NAME)
    if verify_auth_token(token):
        return redirect(url_for('backups.backups_page'))
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == DASHBOARD_USERNAME and password == DASHBOARD_PASSWORD:
            auth_token = generate_auth_token()
            return f'''<!DOCTYPE html><html><head><title>Logging in...</title></head>
<body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:#0f172a;">
<div style="background:#1e293b;padding:40px;border-radius:12px;text-align:center;border:1px solid #334155;">
<p style="font-size:18px;color:#e2e8f0;">Logging in...</p></div>
<script>(function(){{document.cookie="{AUTH_TOKEN_NAME}={auth_token}; path=/; max-age=86400; SameSite=Lax";
setTimeout(function(){{window.location.replace("/backups");}},100);}})();</script></body></html>'''
        else:
            return render_template_string(LOGIN_TEMPLATE, error='Invalid credentials.')
    return render_template_string(LOGIN_TEMPLATE, error=None)

@auth_bp.route('/logout')
def logout():
    return f'''<!DOCTYPE html><html><head><title>Logging out...</title></head>
<body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:#0f172a;">
<div style="background:#1e293b;padding:40px;border-radius:12px;text-align:center;border:1px solid #334155;">
<p style="font-size:18px;color:#e2e8f0;">Logging out...</p></div>
<script>(function(){{document.cookie="{AUTH_TOKEN_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
setTimeout(function(){{window.location.replace("/login");}},100);}})();</script></body></html>'''
