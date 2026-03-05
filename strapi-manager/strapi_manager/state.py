"""Thread-safe shared state for background operations."""
import threading

restore_status = {'active': False, 'step': '', 'error': '', 'done': False}
restore_lock = threading.Lock()

deploy_status = {'active': False, 'step': '', 'error': '', 'done': False}
deploy_lock = threading.Lock()

import_statuses = {}
import_lock = threading.Lock()

# In-memory stores for pending schema changes and CSV imports
pending_changes = {}
pending_imports = {}
