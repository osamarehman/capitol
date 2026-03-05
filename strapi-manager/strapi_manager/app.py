#!/usr/bin/env python3
"""
Strapi CMS Manager for backup.improveitmd.com
Entry point — creates Flask app, registers all blueprints.
"""
import os
from flask import Flask
from werkzeug.middleware.proxy_fix import ProxyFix
from .config import BACKUP_DIR
from .auth import auth_bp
from .routes import all_blueprints


def create_app():
    app = Flask(__name__)
    app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'change-this-backup-secret-key')
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

    # Register blueprints
    app.register_blueprint(auth_bp)
    for bp in all_blueprints:
        app.register_blueprint(bp)

    return app


if __name__ == '__main__':
    os.makedirs(BACKUP_DIR, exist_ok=True)
    app = create_app()
    app.run(host='127.0.0.1', port=5001, debug=False)
