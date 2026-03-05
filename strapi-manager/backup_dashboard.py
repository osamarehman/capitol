#!/usr/bin/env python3
"""Thin wrapper — launches the Strapi Manager package."""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from strapi_manager.app import create_app
from strapi_manager.config import BACKUP_DIR

if __name__ == '__main__':
    os.makedirs(BACKUP_DIR, exist_ok=True)
    app = create_app()
    app.run(host='127.0.0.1', port=5001, debug=False)
