from flask import Flask, request, jsonify, render_template_string, redirect, url_for, make_response, Response
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
import sqlite3
from datetime import datetime, timedelta
import json
import os
import hashlib
import csv
import io
import requests
from urllib.parse import urlparse
from functools import wraps
import threading

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'change-this-to-a-random-secret-key-in-production')

# Handle reverse proxy headers (X-Forwarded-*)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

# Dashboard authentication credentials
DASHBOARD_USERNAME = os.environ.get('DASHBOARD_USERNAME', 'admin')
DASHBOARD_PASSWORD = os.environ.get('DASHBOARD_PASSWORD', 'improveit2026')


# Simple token-based auth (bypasses Flask session which has issues through Cloudflare)
AUTH_TOKEN_NAME = 'auth_token'

def generate_auth_token():
    """Generate a simple auth token based on username and secret"""
    secret = app.secret_key
    data = f"{DASHBOARD_USERNAME}:{secret}:authenticated"
    return hashlib.sha256(data.encode()).hexdigest()

def verify_auth_token(token):
    """Verify the auth token"""
    if not token:
        return False
    expected = generate_auth_token()
    return token == expected

# Allowed domains for form submissions
ALLOWED_DOMAINS = [
    'improveitmd.com',
    'v2.improveitmd.com',
    'www.improveitmd.com',
    'www.v2.improveitmd.com'
]

# Configure CORS - TEMPORARILY allowing all origins for debugging
# Original restricted config commented out below
# cors_origins = [
#     f'https://{domain}' for domain in ALLOWED_DOMAINS
# ] + [
#     f'http://{domain}' for domain in ALLOWED_DOMAINS
# ]

CORS(app, resources={
    r"/api/*": {
        "origins": "*",  # TEMPORARY: Allow all origins for debugging
        "methods": ["POST", "GET", "OPTIONS"],
        "allow_headers": ["Content-Type", "X-Requested-With", "Accept", "Origin"]
    }
})

DATABASE = 'form_submissions.db'

# Default status options (will be stored in database)
DEFAULT_STATUSES = [
    {'name': 'new', 'color': '#1976d2', 'order': 1},
    {'name': 'contacted', 'color': '#f57c00', 'order': 2},
    {'name': 'qualified', 'color': '#388e3c', 'order': 3},
    {'name': 'converted', 'color': '#7b1fa2', 'order': 4},
    {'name': 'archived', 'color': '#757575', 'order': 5},
]

def is_allowed_domain(origin):
    """
    Check if the request origin is from an allowed domain

    Args:
        origin: The origin header from the request

    Returns:
        bool: True if the domain is allowed, False otherwise
    """
    if not origin:
        return False

    try:
        parsed = urlparse(origin)
        domain = parsed.netloc.lower()

        # Remove port if present
        if ':' in domain:
            domain = domain.split(':')[0]

        # Check if domain matches any allowed domain
        for allowed in ALLOWED_DOMAINS:
            if domain == allowed.lower() or domain.endswith('.' + allowed.lower()):
                return True

        return False
    except Exception:
        return False

def init_db():
    """Initialize the database with the submissions table"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            message TEXT,
            additional_data TEXT,
            status TEXT DEFAULT 'new',
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

    # Migration: Add status column if it doesn't exist
    cursor.execute("PRAGMA table_info(submissions)")
    columns = [col[1] for col in cursor.fetchall()]
    if 'status' not in columns:
        cursor.execute("ALTER TABLE submissions ADD COLUMN status TEXT DEFAULT 'new'")
        cursor.execute("UPDATE submissions SET status = 'new' WHERE status IS NULL")
        conn.commit()

    # Migration: Add form_name and page_url columns for filtering
    if 'form_name' not in columns:
        cursor.execute("ALTER TABLE submissions ADD COLUMN form_name TEXT DEFAULT 'default'")
        conn.commit()
    if 'page_url' not in columns:
        cursor.execute("ALTER TABLE submissions ADD COLUMN page_url TEXT")
        conn.commit()
    # Migration: Add form_data column to store all fields as JSON
    if 'form_data' not in columns:
        cursor.execute("ALTER TABLE submissions ADD COLUMN form_data TEXT")
        # Migrate existing data: combine existing fields into form_data JSON
        cursor.execute("SELECT id, name, email, phone, message, additional_data FROM submissions WHERE form_data IS NULL")
        rows = cursor.fetchall()
        for row in rows:
            form_data = {}
            if row[1]: form_data['name'] = row[1]
            if row[2]: form_data['email'] = row[2]
            if row[3]: form_data['phone'] = row[3]
            if row[4]: form_data['message'] = row[4]
            if row[5]:
                try:
                    additional = json.loads(row[5])
                    form_data.update(additional)
                except:
                    pass
            cursor.execute("UPDATE submissions SET form_data = ? WHERE id = ?", (json.dumps(form_data), row[0]))
        conn.commit()

    # Create statuses table for custom pipeline stages
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS statuses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            color TEXT DEFAULT '#667eea',
            display_order INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

    # Seed default statuses if table is empty
    cursor.execute('SELECT COUNT(*) FROM statuses')
    if cursor.fetchone()[0] == 0:
        for status in DEFAULT_STATUSES:
            cursor.execute(
                'INSERT INTO statuses (name, color, display_order) VALUES (?, ?, ?)',
                (status['name'], status['color'], status['order'])
            )
        conn.commit()

    # Create notification_settings table for email notifications
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS notification_settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            setting_key TEXT UNIQUE NOT NULL,
            setting_value TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

    # Seed default notification settings if not exists
    default_settings = [
        ('n8n_webhook_email', ''),
        ('n8n_webhook_sheets', ''),
        ('notification_emails', ''),
        ('notify_on_new_lead', 'true'),
        ('notify_on_status_change', 'false'),
    ]
    for key, value in default_settings:
        cursor.execute(
            'INSERT OR IGNORE INTO notification_settings (setting_key, setting_value) VALUES (?, ?)',
            (key, value)
        )
    conn.commit()

    conn.close()


def get_statuses():
    """Get all statuses ordered by display_order"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM statuses ORDER BY display_order ASC')
    statuses = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return statuses

def get_db_connection():
    """Get a database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def format_datetime(value):
    """Format datetime string to human-readable format"""
    if not value:
        return ''
    try:
        if isinstance(value, str):
            # Parse the datetime string
            dt = datetime.strptime(value[:19], '%Y-%m-%d %H:%M:%S')
        else:
            dt = value
        # Format: Jan 18, 2026 at 1:54 PM
        return dt.strftime('%b %d, %Y at %-I:%M %p')
    except:
        return value

# Register the filter with Jinja
app.jinja_env.filters['humandate'] = format_datetime


def get_notification_settings():
    """Get all notification settings as a dictionary"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT setting_key, setting_value FROM notification_settings')
    settings = {row['setting_key']: row['setting_value'] for row in cursor.fetchall()}
    conn.close()
    return settings


def update_notification_setting(key, value):
    """Update a notification setting"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'UPDATE notification_settings SET setting_value = ?, updated_at = CURRENT_TIMESTAMP WHERE setting_key = ?',
        (value, key)
    )
    conn.commit()
    conn.close()


def send_to_n8n(webhook_url, payload):
    """Send payload to an n8n webhook URL. Returns True on success."""
    if not webhook_url:
        return False
    try:
        resp = requests.post(webhook_url, json=payload, timeout=10)
        resp.raise_for_status()
        return True
    except Exception as e:
        print(f"n8n webhook error: {e}")
        return False


def build_webhook_payload(submission_data, form_name, submission_id=None):
    """Build the standard webhook payload sent to n8n."""
    settings = get_notification_settings()
    return {
        'submission_id': submission_id,
        'form_name': form_name,
        'submitted_at': datetime.utcnow().isoformat(),
        'notification_emails': settings.get('notification_emails', ''),
        'fields': {k: v for k, v in submission_data.items()
                   if k.lower() not in ('form_name', 'formname', 'page_url', 'pageurl')},
    }


def send_n8n_notifications(submission_data, form_name, submission_id):
    """Send new-lead notifications to n8n email + sheets webhooks in background threads."""
    settings = get_notification_settings()
    if settings.get('notify_on_new_lead', 'false') != 'true':
        return

    payload = build_webhook_payload(submission_data, form_name, submission_id)

    email_url = settings.get('n8n_webhook_email', '')
    sheets_url = settings.get('n8n_webhook_sheets', '')

    if email_url:
        threading.Thread(target=send_to_n8n, args=(email_url, payload)).start()
    if sheets_url:
        threading.Thread(target=send_to_n8n, args=(sheets_url, payload)).start()


def send_status_change_notification(submission_id, old_status, new_status):
    """Send status-change notification to n8n email webhook in a background thread."""
    settings = get_notification_settings()
    if settings.get('notify_on_status_change', 'false') != 'true':
        return

    email_url = settings.get('n8n_webhook_email', '')
    if not email_url:
        return

    payload = {
        'submission_id': submission_id,
        'event': 'status_change',
        'old_status': old_status,
        'new_status': new_status,
        'changed_at': datetime.utcnow().isoformat(),
        'notification_emails': settings.get('notification_emails', ''),
    }

    threading.Thread(target=send_to_n8n, args=(email_url, payload)).start()


def login_required(f):
    """Decorator to require login for dashboard access"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get(AUTH_TOKEN_NAME)
        if not verify_auth_token(token):
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/submit', methods=['POST', 'GET'])
def submit_form():
    """
    Handle form submission data from the frontend

    Supports multiple formats:
    - JSON (application/json)
    - Form URL encoded (application/x-www-form-urlencoded)
    - Multipart form data (multipart/form-data)
    - GET query parameters

    Expected fields:
    {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "message": "Hello, this is a test message"
    }

    Additional fields will be stored in additional_data as JSON
    """
    try:
        # Parse data from multiple formats
        data = {}

        # Try JSON first
        if request.is_json:
            data = request.get_json() or {}

        # Try form data (both urlencoded and multipart)
        if not data and request.form:
            data = request.form.to_dict()

        # Try GET query parameters
        if not data and request.args:
            data = request.args.to_dict()

        # If still no data, try to parse raw body as JSON
        if not data and request.data:
            try:
                data = json.loads(request.data)
            except:
                pass

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Create case-insensitive lookup for fields
        data_lower = {k.lower(): v for k, v in data.items()}

        # Extract form_name and page_url for filtering
        form_name = (data_lower.get('form_name', '') or
                     data_lower.get('formname', '') or
                     data_lower.get('form', '') or
                     'default')
        page_url = (data_lower.get('page_url', '') or
                    data_lower.get('pageurl', '') or
                    data_lower.get('page_referrer', '') or
                    data_lower.get('page', '') or
                    request.headers.get('Referer', ''))

        # Extract standard fields for legacy compatibility (case-insensitive)
        name = data_lower.get('name', '') or data_lower.get('fullname', '') or data_lower.get('full_name', '')
        email = data_lower.get('email', '') or data_lower.get('emailaddress', '') or data_lower.get('email_address', '')
        phone = data_lower.get('phone', '') or data_lower.get('phonenumber', '') or data_lower.get('phone_number', '') or data_lower.get('tel', '')
        message = data_lower.get('message', '') or data_lower.get('comments', '') or data_lower.get('comment', '') or data_lower.get('notes', '')

        # Store ALL form data as JSON (preserving original field names)
        form_data_json = json.dumps(data)

        # Insert into database with all fields
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO submissions (name, email, phone, message, form_data, form_name, page_url, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'new')
        ''', (name, email, phone, message, form_data_json, form_name, page_url))
        conn.commit()
        submission_id = cursor.lastrowid
        conn.close()

        # Send n8n webhook notifications (email + sheets)
        send_n8n_notifications(data, form_name, submission_id)

        return jsonify({
            'success': True,
            'message': 'Form submission received successfully',
            'submission_id': submission_id
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/submissions', methods=['GET'])
def get_submissions():
    """Get all submissions (for API access)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM submissions ORDER BY submitted_at DESC')
        submissions = cursor.fetchall()
        conn.close()

        # Convert to list of dicts
        result = []
        for row in submissions:
            submission = dict(row)
            # Parse additional_data if present
            if submission['additional_data']:
                submission['additional_data'] = json.loads(submission['additional_data'])
            result.append(submission)

        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/submissions/<int:submission_id>', methods=['DELETE'])
@login_required
def delete_submission(submission_id):
    """Delete a submission by ID"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM submissions WHERE id = ?', (submission_id,))
        if cursor.rowcount == 0:
            conn.close()
            return jsonify({'error': 'Submission not found'}), 404
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': f'Submission {submission_id} deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/submissions/<int:submission_id>/status', methods=['PUT', 'POST'])
@login_required
def update_submission_status(submission_id):
    """Update the status of a submission"""
    try:
        data = request.get_json() or {}
        new_status = data.get('status') or request.form.get('status')

        if not new_status:
            return jsonify({'error': 'Status is required'}), 400

        # Validate against database statuses
        valid_statuses = [s['name'] for s in get_statuses()]
        if new_status not in valid_statuses:
            return jsonify({'error': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Get current status for notification
        cursor.execute('SELECT status FROM submissions WHERE id = ?', (submission_id,))
        row = cursor.fetchone()
        if not row:
            conn.close()
            return jsonify({'error': 'Submission not found'}), 404

        old_status = row['status'] or 'new'

        cursor.execute('UPDATE submissions SET status = ? WHERE id = ?', (new_status, submission_id))
        conn.commit()
        conn.close()

        # Send notification if status actually changed
        if old_status != new_status:
            send_status_change_notification(submission_id, old_status, new_status)

        return jsonify({'success': True, 'message': f'Status updated to {new_status}'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============ Status Management API ============

@app.route('/api/statuses', methods=['GET'])
@login_required
def list_statuses():
    """Get all statuses"""
    return jsonify(get_statuses()), 200


@app.route('/api/statuses', methods=['POST'])
@login_required
def create_status():
    """Create a new status"""
    try:
        data = request.get_json() or {}
        name = data.get('name', '').strip().lower()
        color = data.get('color', '#667eea')

        if not name:
            return jsonify({'error': 'Status name is required'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Get max order
        cursor.execute('SELECT MAX(display_order) FROM statuses')
        max_order = cursor.fetchone()[0] or 0

        cursor.execute(
            'INSERT INTO statuses (name, color, display_order) VALUES (?, ?, ?)',
            (name, color, max_order + 1)
        )
        conn.commit()
        status_id = cursor.lastrowid
        conn.close()

        return jsonify({
            'success': True,
            'message': f'Status "{name}" created',
            'status': {'id': status_id, 'name': name, 'color': color, 'display_order': max_order + 1}
        }), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Status with this name already exists'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/statuses/<int:status_id>', methods=['PUT'])
@login_required
def update_status(status_id):
    """Update a status"""
    try:
        data = request.get_json() or {}
        name = data.get('name', '').strip().lower()
        color = data.get('color')
        display_order = data.get('display_order')

        conn = get_db_connection()
        cursor = conn.cursor()

        # Get current status
        cursor.execute('SELECT name FROM statuses WHERE id = ?', (status_id,))
        current = cursor.fetchone()
        if not current:
            conn.close()
            return jsonify({'error': 'Status not found'}), 404

        old_name = current['name']

        # Update status
        updates = []
        params = []
        if name:
            updates.append('name = ?')
            params.append(name)
        if color:
            updates.append('color = ?')
            params.append(color)
        if display_order is not None:
            updates.append('display_order = ?')
            params.append(display_order)

        if updates:
            params.append(status_id)
            cursor.execute(f'UPDATE statuses SET {", ".join(updates)} WHERE id = ?', params)

            # If name changed, update all submissions with old status name
            if name and name != old_name:
                cursor.execute('UPDATE submissions SET status = ? WHERE status = ?', (name, old_name))

            conn.commit()

        conn.close()
        return jsonify({'success': True, 'message': 'Status updated'}), 200
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Status with this name already exists'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/statuses/<int:status_id>', methods=['DELETE'])
@login_required
def delete_status(status_id):
    """Delete a status (moves submissions to 'new')"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Get status name
        cursor.execute('SELECT name FROM statuses WHERE id = ?', (status_id,))
        status = cursor.fetchone()
        if not status:
            conn.close()
            return jsonify({'error': 'Status not found'}), 404

        # Don't allow deleting 'new' status
        if status['name'] == 'new':
            conn.close()
            return jsonify({'error': 'Cannot delete the "new" status'}), 400

        # Move all submissions with this status to 'new'
        cursor.execute('UPDATE submissions SET status = ? WHERE status = ?', ('new', status['name']))

        # Delete the status
        cursor.execute('DELETE FROM statuses WHERE id = ?', (status_id,))
        conn.commit()
        conn.close()

        return jsonify({'success': True, 'message': f'Status deleted. Submissions moved to "new"'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/statuses/reorder', methods=['POST'])
@login_required
def reorder_statuses():
    """Reorder statuses"""
    try:
        data = request.get_json() or {}
        order = data.get('order', [])  # List of status IDs in new order

        conn = get_db_connection()
        cursor = conn.cursor()

        for idx, status_id in enumerate(order):
            cursor.execute('UPDATE statuses SET display_order = ? WHERE id = ?', (idx + 1, status_id))

        conn.commit()
        conn.close()

        return jsonify({'success': True, 'message': 'Statuses reordered'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============ Bulk Operations & Export/Import ============

@app.route('/api/submissions/bulk-delete', methods=['POST'])
@login_required
def bulk_delete_submissions():
    """Delete multiple submissions by IDs"""
    try:
        data = request.get_json() or {}
        ids = data.get('ids', [])

        if not ids:
            return jsonify({'error': 'No IDs provided'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        placeholders = ','.join('?' * len(ids))
        cursor.execute(f'DELETE FROM submissions WHERE id IN ({placeholders})', ids)
        deleted_count = cursor.rowcount

        conn.commit()
        conn.close()

        return jsonify({'success': True, 'message': f'{deleted_count} submissions deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/submissions/delete-all', methods=['POST'])
@login_required
def delete_all_submissions():
    """Delete all submissions"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM submissions')
        deleted_count = cursor.rowcount
        conn.commit()
        conn.close()

        return jsonify({'success': True, 'message': f'{deleted_count} submissions deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/submissions/export', methods=['GET'])
@login_required
def export_submissions_csv():
    """Export all submissions to CSV"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM submissions ORDER BY submitted_at DESC')
        submissions = cursor.fetchall()
        conn.close()

        # Collect all unique field names from form_data
        all_fields = set()
        parsed_submissions = []
        for row in submissions:
            submission = dict(row)
            if submission.get('form_data'):
                try:
                    submission['form_data'] = json.loads(submission['form_data'])
                    all_fields.update(submission['form_data'].keys())
                except:
                    submission['form_data'] = {}
            else:
                submission['form_data'] = {}
            parsed_submissions.append(submission)

        # Define CSV columns
        base_columns = ['id', 'submitted_at', 'form_name', 'page_url', 'status']
        field_columns = sorted(all_fields)
        all_columns = base_columns + field_columns

        # Create CSV
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(all_columns)

        for sub in parsed_submissions:
            row = [
                sub.get('id', ''),
                sub.get('submitted_at', ''),
                sub.get('form_name', ''),
                sub.get('page_url', ''),
                sub.get('status', ''),
            ]
            for field in field_columns:
                row.append(sub.get('form_data', {}).get(field, ''))
            writer.writerow(row)

        output.seek(0)
        return Response(
            output.getvalue(),
            mimetype='text/csv',
            headers={'Content-Disposition': f'attachment; filename=submissions_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'}
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/submissions/import', methods=['POST'])
@login_required
def import_submissions_csv():
    """Import submissions from CSV"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'File must be a CSV'}), 400

        # Read CSV
        stream = io.StringIO(file.stream.read().decode('utf-8'))
        reader = csv.DictReader(stream)

        conn = get_db_connection()
        cursor = conn.cursor()

        imported_count = 0
        base_fields = ['id', 'submitted_at', 'form_name', 'page_url', 'status', 'name', 'email', 'phone', 'message']

        for row in reader:
            # Extract base fields
            form_name = row.get('form_name', 'imported')
            page_url = row.get('page_url', '')
            status = row.get('status', 'new')
            name = row.get('name', '')
            email = row.get('email', '')
            phone = row.get('phone', '')
            message = row.get('message', '')

            # Build form_data from remaining fields
            form_data = {}
            for key, value in row.items():
                if key not in base_fields and value:
                    form_data[key] = value
            # Also add standard fields to form_data
            if name: form_data['name'] = name
            if email: form_data['email'] = email
            if phone: form_data['phone'] = phone
            if message: form_data['message'] = message

            cursor.execute('''
                INSERT INTO submissions (name, email, phone, message, form_data, form_name, page_url, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (name, email, phone, message, json.dumps(form_data), form_name, page_url, status))
            imported_count += 1

        conn.commit()
        conn.close()

        return jsonify({'success': True, 'message': f'{imported_count} submissions imported'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============ Notification Settings API ============

@app.route('/api/settings/notifications', methods=['GET'])
@login_required
def get_notification_settings_api():
    """Get notification settings"""
    settings = get_notification_settings()
    return jsonify(settings), 200


@app.route('/api/settings/notifications', methods=['POST'])
@login_required
def update_notification_settings_api():
    """Update notification settings"""
    try:
        data = request.get_json() or {}

        allowed_keys = [
            'n8n_webhook_email', 'n8n_webhook_sheets',
            'notification_emails', 'notify_on_new_lead', 'notify_on_status_change'
        ]

        for key in allowed_keys:
            if key in data:
                update_notification_setting(key, str(data[key]))

        return jsonify({'success': True, 'message': 'Settings updated'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/settings/notifications/test', methods=['POST'])
@login_required
def test_webhook():
    """Send a test payload to the n8n email webhook"""
    try:
        settings = get_notification_settings()
        webhook_url = settings.get('n8n_webhook_email', '')
        if not webhook_url:
            return jsonify({'error': 'No email webhook URL configured.'}), 400

        payload = {
            'submission_id': 0,
            'form_name': '__test__',
            'submitted_at': datetime.utcnow().isoformat(),
            'notification_emails': settings.get('notification_emails', ''),
            'fields': {'message': 'This is a test webhook from the Form Submissions Dashboard.'},
        }

        success = send_to_n8n(webhook_url, payload)
        if success:
            return jsonify({'success': True, 'message': 'Test webhook sent successfully'}), 200
        else:
            return jsonify({'error': 'Failed to reach n8n webhook. Check the URL.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login page for dashboard access"""
    # Check if already logged in via cookie
    token = request.cookies.get(AUTH_TOKEN_NAME)
    if verify_auth_token(token):
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if username == DASHBOARD_USERNAME and password == DASHBOARD_PASSWORD:
            # Generate auth token
            auth_token = generate_auth_token()

            # Use JavaScript redirect to set cookie client-side
            # This bypasses Cloudflare Worker cookie stripping
            html = f'''
            <!DOCTYPE html>
            <html>
            <head>
                <title>Logging in...</title>
                <meta http-equiv="refresh" content="1;url=/dashboard">
            </head>
            <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:#f8fafc;">
                <div style="background:white;padding:40px;border-radius:12px;text-align:center;border:1px solid #e2e8f0;">
                    <p style="font-size:18px;color:#1e293b;">Logging in...</p>
                </div>
            <script>
                (function() {{
                    document.cookie = "auth_token={auth_token}; path=/; max-age=3600; SameSite=Lax";
                    setTimeout(function() {{
                        window.location.replace("/dashboard");
                    }}, 100);
                }})();
            </script>
            </body>
            </html>
            '''
            return html
        else:
            error = 'Invalid credentials. Please try again.'
            return render_template_string(get_login_template(), error=error)

    return render_template_string(get_login_template())

@app.route('/logout')
def logout():
    """Logout and clear auth cookie"""
    html = '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Logging out...</title>
        <meta http-equiv="refresh" content="1;url=/login">
    </head>
    <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:#f8fafc;">
        <div style="background:white;padding:40px;border-radius:12px;text-align:center;border:1px solid #e2e8f0;">
            <p style="font-size:18px;color:#1e293b;">Logging out...</p>
        </div>
    <script>
        (function() {
            document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            setTimeout(function() {
                window.location.replace("/login");
            }, 100);
        })();
    </script>
    </body>
    </html>
    '''
    return html

@app.route('/dashboard')
@login_required
def dashboard():
    """Display a dashboard with all submissions"""
    # Get filter parameters
    form_filter = request.args.get('form', 'all')
    page_filter = request.args.get('page', 'all')

    conn = get_db_connection()
    cursor = conn.cursor()

    # Get unique form names for filter dropdown
    cursor.execute('SELECT DISTINCT form_name FROM submissions WHERE form_name IS NOT NULL ORDER BY form_name')
    form_names = [row[0] for row in cursor.fetchall() if row[0]]

    # Get unique page URLs for filter dropdown
    cursor.execute('SELECT DISTINCT page_url FROM submissions WHERE page_url IS NOT NULL AND page_url != "" ORDER BY page_url')
    page_urls = [row[0] for row in cursor.fetchall() if row[0]]

    # Build query with filters
    query = 'SELECT * FROM submissions WHERE 1=1'
    params = []
    if form_filter and form_filter != 'all':
        query += ' AND form_name = ?'
        params.append(form_filter)
    if page_filter and page_filter != 'all':
        query += ' AND page_url = ?'
        params.append(page_filter)
    query += ' ORDER BY submitted_at DESC'

    cursor.execute(query, params)
    submissions = cursor.fetchall()
    conn.close()

    # Convert to list of dicts and collect all unique field names
    submissions_list = []
    all_field_names = set()
    # Fields to exclude from dynamic columns (shown in fixed columns or meta fields)
    excluded_fields = {'form_name', 'formname', 'form', 'page_url', 'pageurl', 'page_referrer', 'page'}

    for row in submissions:
        submission = dict(row)
        # Parse form_data (all dynamic fields)
        if submission.get('form_data'):
            try:
                submission['form_data'] = json.loads(submission['form_data'])
                # Collect field names (excluding meta fields)
                for key in submission['form_data'].keys():
                    if key.lower() not in excluded_fields:
                        all_field_names.add(key)
            except:
                submission['form_data'] = {}
        else:
            submission['form_data'] = {}
        # Parse additional_data for backward compatibility
        if submission.get('additional_data'):
            try:
                submission['additional_data'] = json.loads(submission['additional_data'])
            except:
                submission['additional_data'] = {}
        else:
            submission['additional_data'] = {}
        submissions_list.append(submission)

    # Sort field names for consistent ordering (prioritize common fields)
    priority_fields = ['name', 'Name', 'fullname', 'full_name', 'email', 'Email', 'phone', 'Phone', 'tel', 'message', 'Message']
    sorted_fields = []
    for pf in priority_fields:
        if pf in all_field_names:
            sorted_fields.append(pf)
            all_field_names.discard(pf)
    sorted_fields.extend(sorted(all_field_names))

    html_template = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form Submissions Dashboard</title>
        <style>
            :root {
                --bg-primary: #f8fafc;
                --bg-secondary: #ffffff;
                --text-primary: #1e293b;
                --text-secondary: #64748b;
                --text-muted: #94a3b8;
                --border-color: #e2e8f0;
                --accent-primary: #3b82f6;
                --accent-success: #10b981;
                --accent-warning: #f59e0b;
                --accent-danger: #ef4444;
                --accent-purple: #8b5cf6;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: var(--bg-primary);
                min-height: 100vh;
                padding: 15px;
                color: var(--text-primary);
            }
            .container { max-width: 1600px; margin: 0 auto; }
            .header {
                background: var(--bg-secondary);
                padding: 15px 20px;
                border-radius: 12px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                border: 1px solid var(--border-color);
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
            }
            .header-left h1 { color: var(--text-primary); font-size: 1.4em; }
            .header-right { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
            .filter-select {
                padding: 8px 12px;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                font-size: 0.85em;
                background: var(--bg-secondary);
                color: var(--text-primary);
                cursor: pointer;
            }
            .filter-select:focus { outline: none; border-color: var(--accent-primary); }
            .view-toggle { display: flex; background: var(--bg-primary); border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color); }
            .view-btn {
                padding: 8px 12px;
                border: none;
                background: transparent;
                cursor: pointer;
                font-size: 0.8em;
                font-weight: 500;
                transition: all 0.2s;
                color: var(--text-secondary);
            }
            .view-btn.active { background: var(--accent-primary); color: white; }
            .btn {
                padding: 8px 16px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 500;
                font-size: 0.85em;
                border: none;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn-primary { background: var(--accent-primary); color: white; }
            .btn-primary:hover { background: #2563eb; }
            .btn-success { background: var(--accent-success); color: white; }
            .btn-success:hover { background: #059669; }
            .btn-danger { background: var(--accent-danger); color: white; }
            .btn-danger:hover { background: #dc2626; }
            .btn-secondary { background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); }
            .btn-secondary:hover { background: var(--border-color); }
            .btn-outline { background: transparent; color: var(--accent-primary); border: 1px solid var(--accent-primary); }
            .btn-outline:hover { background: var(--accent-primary); color: white; }
            .stats { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px; }
            .stat-card {
                background: var(--bg-secondary);
                padding: 12px 18px;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                border: 1px solid var(--border-color);
                text-align: center;
                min-width: 70px;
                flex: 1;
            }
            .stat-card h3 { font-size: 0.65em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 3px; }
            .stat-card .number { font-size: 1.5em; font-weight: bold; color: var(--accent-primary); }

            /* Toolbar */
            .toolbar {
                background: var(--bg-secondary);
                padding: 12px 16px;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
            }
            .toolbar-left { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
            .toolbar-right { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
            .selected-count { font-size: 0.85em; color: var(--text-secondary); margin-right: 10px; }
            .file-input { display: none; }

            /* Table/Sheet View - Google Sheets Style */
            .table-wrapper {
                background: var(--bg-secondary);
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                border: 1px solid var(--border-color);
                overflow: hidden;
                position: relative;
            }
            .table-container {
                overflow-x: auto;
                overflow-y: auto;
                max-height: calc(100vh - 320px);
                -webkit-overflow-scrolling: touch;
            }
            .data-table {
                border-collapse: separate;
                border-spacing: 0;
                font-size: 0.85em;
                min-width: max-content;
            }
            .data-table th {
                background: #1e293b;
                color: white;
                padding: 12px 15px;
                text-align: left;
                font-weight: 600;
                font-size: 0.75em;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                position: sticky;
                top: 0;
                white-space: nowrap;
                z-index: 10;
                border-right: 1px solid #334155;
            }
            .data-table td {
                padding: 10px 15px;
                border-bottom: 1px solid var(--border-color);
                border-right: 1px solid var(--border-color);
                vertical-align: middle;
                background: var(--bg-secondary);
                white-space: nowrap;
                max-width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .data-table td.cell-wrap {
                white-space: normal;
                word-break: break-word;
            }
            .data-table tr:hover td { background: var(--bg-primary); }
            .data-table a { color: var(--accent-primary); text-decoration: none; }
            .data-table a:hover { text-decoration: underline; }

            /* Checkbox column */
            .data-table th.col-checkbox,
            .data-table td.col-checkbox {
                width: 40px;
                min-width: 40px;
                text-align: center;
            }
            .data-table input[type="checkbox"] {
                width: 16px;
                height: 16px;
                cursor: pointer;
                accent-color: var(--accent-primary);
            }

            /* Fixed columns on the right (Status & Actions) */
            .data-table th.col-fixed-right,
            .data-table td.col-fixed-right {
                position: sticky;
                right: 0;
                z-index: 5;
                background: var(--bg-secondary);
                min-width: 80px;
                width: 80px;
            }
            .data-table th.col-fixed-right {
                background: #1e293b;
                z-index: 15;
            }
            .data-table th.col-fixed-right-2,
            .data-table td.col-fixed-right-2 {
                position: sticky;
                right: 80px;
                z-index: 6;
                background: var(--bg-secondary);
                box-shadow: -3px 0 6px rgba(0,0,0,0.08);
                min-width: 110px;
                width: 110px;
            }
            .data-table th.col-fixed-right-2 {
                background: #1e293b;
                z-index: 16;
            }
            .data-table tr:hover td.col-fixed-right,
            .data-table tr:hover td.col-fixed-right-2 { background: var(--bg-primary); }

            /* Fixed ID column on the left */
            .data-table th.col-fixed-left,
            .data-table td.col-fixed-left {
                position: sticky;
                left: 40px;
                z-index: 5;
                background: var(--bg-secondary);
                box-shadow: 2px 0 5px rgba(0,0,0,0.05);
            }
            .data-table th.col-fixed-left {
                background: #1e293b;
                z-index: 15;
            }
            .data-table tr:hover td.col-fixed-left { background: var(--bg-primary); }

            /* Fixed checkbox column */
            .data-table th.col-checkbox,
            .data-table td.col-checkbox {
                position: sticky;
                left: 0;
                z-index: 5;
                background: var(--bg-secondary);
            }
            .data-table th.col-checkbox {
                background: #1e293b;
                z-index: 15;
            }
            .data-table tr:hover td.col-checkbox { background: var(--bg-primary); }

            .cell-empty { color: var(--text-muted); font-style: italic; }

            /* Card View */
            .submissions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 15px;
            }
            .submission-card {
                background: var(--bg-secondary);
                border-radius: 8px;
                padding: 18px;
                border: 1px solid var(--border-color);
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            .submission-header {
                border-bottom: 2px solid var(--accent-primary);
                padding-bottom: 12px;
                margin-bottom: 12px;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 10px;
            }
            .submission-id {
                display: inline-block;
                background: var(--accent-primary);
                color: white;
                padding: 4px 12px;
                border-radius: 15px;
                font-size: 0.8em;
                font-weight: bold;
            }
            .form-badge {
                display: inline-block;
                background: #ecfdf5;
                color: #059669;
                padding: 3px 8px;
                border-radius: 6px;
                font-size: 0.7em;
                font-weight: 600;
                margin-left: 5px;
            }
            .submission-date { color: var(--text-secondary); font-size: 0.8em; margin-top: 5px; }
            .delete-btn {
                background: var(--accent-danger);
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.75em;
            }
            .delete-btn:hover { background: #dc2626; }
            .field { margin-bottom: 10px; }
            .field-label { color: var(--accent-primary); font-weight: 600; font-size: 0.7em; text-transform: uppercase; margin-bottom: 2px; }
            .field-value { color: var(--text-primary); font-size: 0.9em; word-break: break-word; }
            .field-value a { color: var(--accent-primary); text-decoration: none; }

            /* Status styles */
            .status-badge {
                display: inline-block;
                padding: 3px 8px;
                border-radius: 6px;
                font-size: 0.7em;
                font-weight: 600;
                text-transform: uppercase;
            }
            .status-new { background: #dbeafe; color: #1d4ed8; }
            .status-contacted { background: #fef3c7; color: #b45309; }
            .status-qualified { background: #d1fae5; color: #047857; }
            .status-converted { background: #ede9fe; color: #7c3aed; }
            .status-archived { background: #f1f5f9; color: #64748b; }
            .status-section { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-color); display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
            .status-select {
                padding: 4px 8px;
                border: 1px solid var(--border-color);
                border-radius: 4px;
                font-size: 0.75em;
                cursor: pointer;
                background: var(--bg-secondary);
            }

            .empty-state {
                background: var(--bg-secondary);
                border-radius: 8px;
                padding: 40px 20px;
                text-align: center;
                border: 1px solid var(--border-color);
            }
            .empty-state h2 { color: var(--text-primary); margin-bottom: 10px; font-size: 1.3em; }
            .empty-state p { color: var(--text-secondary); }

            /* Toast */
            .toast {
                position: fixed;
                bottom: 15px;
                right: 15px;
                left: auto;
                min-width: 300px;
                background: #1e293b;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                display: none;
                z-index: 1000;
                text-align: center;
            }
            .toast.success { background: var(--accent-success); }
            .toast.error { background: var(--accent-danger); }
            .hidden { display: none !important; }

            /* Modal */
            .modal-overlay {
                display: none;
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            .modal-overlay.active { display: flex; }
            .modal {
                background: var(--bg-secondary);
                border-radius: 12px;
                padding: 24px;
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
            }
            .modal h2 { margin-bottom: 20px; color: var(--text-primary); font-size: 1.25em; }
            .modal-section { margin-bottom: 20px; }
            .modal-section h3 { font-size: 0.85em; color: var(--text-secondary); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .form-group { margin-bottom: 16px; }
            .form-group label { display: block; font-weight: 500; margin-bottom: 6px; color: var(--text-primary); font-size: 0.9em; }
            .form-group input, .form-group select, .form-group textarea {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                font-size: 0.9em;
                background: var(--bg-secondary);
                color: var(--text-primary);
            }
            .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
                outline: none;
                border-color: var(--accent-primary);
            }
            .form-group small { display: block; margin-top: 4px; color: var(--text-muted); font-size: 0.8em; }
            .form-row { display: flex; gap: 12px; }
            .form-row .form-group { flex: 1; }
            .toggle-group { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-color); }
            .toggle-group:last-child { border-bottom: none; }
            .toggle-label { font-size: 0.9em; color: var(--text-primary); }
            .toggle-switch {
                position: relative;
                width: 44px;
                height: 24px;
            }
            .toggle-switch input { opacity: 0; width: 0; height: 0; }
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: var(--border-color);
                transition: 0.3s;
                border-radius: 24px;
            }
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: 0.3s;
                border-radius: 50%;
            }
            .toggle-switch input:checked + .toggle-slider { background-color: var(--accent-primary); }
            .toggle-switch input:checked + .toggle-slider:before { transform: translateX(20px); }
            .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); }

            /* Mobile responsive */
            @media (max-width: 768px) {
                body { padding: 10px; }
                .header { padding: 12px 15px; }
                .header-left h1 { font-size: 1.2em; }
                .header-right { width: 100%; justify-content: space-between; }
                .toolbar { flex-direction: column; align-items: stretch; }
                .toolbar-left, .toolbar-right { width: 100%; justify-content: center; }
                .stats { gap: 8px; }
                .stat-card { padding: 10px 12px; min-width: 60px; }
                .stat-card .number { font-size: 1.3em; }
                .submissions-grid { grid-template-columns: 1fr; }
                .submission-card { padding: 15px; }
                .view-toggle { display: none; }
                #table-view { display: none !important; }
                #card-view { display: grid !important; }
            }
            @media (max-width: 480px) {
                .header-left h1 { font-size: 1em; }
                .filter-select { padding: 6px 10px; font-size: 0.8em; }
                .btn { padding: 6px 12px; font-size: 0.8em; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="header-left">
                    <h1>Form Submissions</h1>
                </div>
                <div class="header-right">
                    <select class="filter-select" id="formFilter" onchange="applyFilters()">
                        <option value="all" {% if form_filter == 'all' %}selected{% endif %}>All Forms</option>
                        {% for form_name in form_names %}
                        <option value="{{ form_name }}" {% if form_filter == form_name %}selected{% endif %}>{{ form_name }}</option>
                        {% endfor %}
                    </select>
                    <select class="filter-select" id="pageFilter" onchange="applyFilters()">
                        <option value="all" {% if page_filter == 'all' %}selected{% endif %}>All Pages</option>
                        {% for page_url in page_urls %}
                        <option value="{{ page_url }}" {% if page_filter == page_url %}selected{% endif %} title="{{ page_url }}">{{ page_url|truncate(30) }}</option>
                        {% endfor %}
                    </select>
                    <div class="view-toggle">
                        <button class="view-btn active" id="btn-table" onclick="setView('table')">Table</button>
                        <button class="view-btn" id="btn-cards" onclick="setView('cards')">Cards</button>
                    </div>
                    <a href="/pipeline" class="btn btn-success">Pipeline</a>
                    <button class="btn btn-secondary" onclick="openSettingsModal()">Settings</button>
                    <a href="/logout" class="btn btn-secondary">Logout</a>
                </div>
            </div>

            <!-- Toolbar -->
            <div class="toolbar">
                <div class="toolbar-left">
                    <span class="selected-count" id="selectedCount">0 selected</span>
                    <button class="btn btn-danger" id="deleteSelectedBtn" onclick="deleteSelected()" disabled>Delete Selected</button>
                    <button class="btn btn-danger" onclick="deleteAll()">Delete All</button>
                </div>
                <div class="toolbar-right">
                    <button class="btn btn-outline" onclick="exportCSV()">Export CSV</button>
                    <label class="btn btn-outline" style="cursor:pointer;">
                        Import CSV
                        <input type="file" class="file-input" accept=".csv" onchange="importCSV(this)">
                    </label>
                </div>
            </div>

            <div class="stats">
                <div class="stat-card"><h3>Total</h3><div class="number">{{ submissions|length }}</div></div>
                <div class="stat-card"><h3>New</h3><div class="number">{{ submissions|selectattr('status', 'equalto', 'new')|list|length + submissions|selectattr('status', 'equalto', none)|list|length }}</div></div>
                <div class="stat-card"><h3>Contacted</h3><div class="number">{{ submissions|selectattr('status', 'equalto', 'contacted')|list|length }}</div></div>
                <div class="stat-card"><h3>Qualified</h3><div class="number">{{ submissions|selectattr('status', 'equalto', 'qualified')|list|length }}</div></div>
                <div class="stat-card"><h3>Converted</h3><div class="number">{{ submissions|selectattr('status', 'equalto', 'converted')|list|length }}</div></div>
            </div>

            {% if submissions %}
            <!-- Table View - Google Sheets Style -->
            <div class="table-wrapper" id="table-view">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th class="col-checkbox"><input type="checkbox" id="selectAll" onchange="toggleSelectAll(this)"></th>
                                <th class="col-fixed-left">ID</th>
                                <th>Date</th>
                                <th>Form</th>
                                {% for field in field_names %}
                                <th>{{ field }}</th>
                                {% endfor %}
                                <th class="col-fixed-right-2">Status</th>
                                <th class="col-fixed-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {% for submission in submissions %}
                            <tr id="row-{{ submission.id }}">
                                <td class="col-checkbox"><input type="checkbox" class="row-checkbox" value="{{ submission.id }}" onchange="updateSelectedCount()"></td>
                                <td class="col-fixed-left"><strong>#{{ submission.id }}</strong></td>
                                <td>{{ submission.submitted_at|humandate }}</td>
                                <td><span class="form-badge">{{ submission.form_name or 'default' }}</span></td>
                                {% for field in field_names %}
                                <td>
                                    {% set value = submission.form_data.get(field, '') %}
                                    {% if value %}
                                        {% if 'email' in field|lower %}
                                            <a href="mailto:{{ value }}">{{ value }}</a>
                                        {% elif 'phone' in field|lower or 'tel' in field|lower %}
                                            <a href="tel:{{ value }}">{{ value }}</a>
                                        {% elif 'url' in field|lower or (value|string).startswith('http') %}
                                            <a href="{{ value }}" target="_blank">{{ value|truncate(40) }}</a>
                                        {% else %}
                                            {{ value }}
                                        {% endif %}
                                    {% else %}
                                        <span class="cell-empty">-</span>
                                    {% endif %}
                                </td>
                                {% endfor %}
                                <td class="col-fixed-right-2">
                                    <select class="status-select" onchange="updateStatus({{ submission.id }}, this.value, 'row')">
                                        {% for status in statuses %}
                                        <option value="{{ status.name }}" {% if submission.status == status.name or (not submission.status and status.name == 'new') %}selected{% endif %}>{{ status.name|capitalize }}</option>
                                        {% endfor %}
                                    </select>
                                </td>
                                <td class="col-fixed-right"><button class="delete-btn" onclick="deleteSubmission({{ submission.id }}, 'row')">Delete</button></td>
                            </tr>
                            {% endfor %}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Card View -->
            <div class="submissions-grid hidden" id="card-view">
                {% for submission in submissions %}
                <div class="submission-card" id="card-{{ submission.id }}">
                    <div class="submission-header">
                        <div>
                            <span class="submission-id">#{{ submission.id }}</span>
                            <span class="form-badge">{{ submission.form_name or 'default' }}</span>
                            <div class="submission-date">{{ submission.submitted_at|humandate }}</div>
                        </div>
                        <button class="delete-btn" onclick="deleteSubmission({{ submission.id }}, 'card')">Delete</button>
                    </div>
                    {% if submission.form_data %}
                        {% for key, value in submission.form_data.items() %}
                        <div class="field">
                            <div class="field-label">{{ key }}</div>
                            <div class="field-value">
                                {% if 'email' in key|lower %}
                                    <a href="mailto:{{ value }}">{{ value }}</a>
                                {% elif 'phone' in key|lower or 'tel' in key|lower %}
                                    <a href="tel:{{ value }}">{{ value }}</a>
                                {% elif 'url' in key|lower or 'http' in value|string|lower %}
                                    <a href="{{ value }}" target="_blank">{{ value }}</a>
                                {% else %}
                                    {{ value }}
                                {% endif %}
                            </div>
                        </div>
                        {% endfor %}
                    {% else %}
                        {% if submission.name %}<div class="field"><div class="field-label">Name</div><div class="field-value">{{ submission.name }}</div></div>{% endif %}
                        {% if submission.email %}<div class="field"><div class="field-label">Email</div><div class="field-value"><a href="mailto:{{ submission.email }}">{{ submission.email }}</a></div></div>{% endif %}
                        {% if submission.phone %}<div class="field"><div class="field-label">Phone</div><div class="field-value"><a href="tel:{{ submission.phone }}">{{ submission.phone }}</a></div></div>{% endif %}
                        {% if submission.message %}<div class="field"><div class="field-label">Message</div><div class="field-value">{{ submission.message }}</div></div>{% endif %}
                    {% endif %}
                    <div class="status-section">
                        <span class="status-badge status-{{ submission.status or 'new' }}">{{ submission.status or 'new' }}</span>
                        <select class="status-select" onchange="updateStatus({{ submission.id }}, this.value, 'card')">
                            {% for status in statuses %}
                            <option value="{{ status.name }}" {% if submission.status == status.name or (not submission.status and status.name == 'new') %}selected{% endif %}>{{ status.name|capitalize }}</option>
                            {% endfor %}
                        </select>
                    </div>
                </div>
                {% endfor %}
            </div>
            {% else %}
            <div class="empty-state">
                <h2>No submissions yet</h2>
                <p>Submissions will appear here once users start submitting forms</p>
            </div>
            {% endif %}
        </div>

        <div id="toast" class="toast"></div>

        <script>
            function applyFilters() {
                const formValue = document.getElementById('formFilter').value;
                const pageValue = document.getElementById('pageFilter').value;
                let url = '/dashboard?';
                const params = [];
                if (formValue && formValue !== 'all') {
                    params.push('form=' + encodeURIComponent(formValue));
                }
                if (pageValue && pageValue !== 'all') {
                    params.push('page=' + encodeURIComponent(pageValue));
                }
                window.location.href = '/dashboard?' + params.join('&');
            }

            function setView(view) {
                const tableView = document.getElementById('table-view');
                const cardView = document.getElementById('card-view');
                const btnTable = document.getElementById('btn-table');
                const btnCards = document.getElementById('btn-cards');

                if (view === 'table') {
                    tableView.classList.remove('hidden');
                    cardView.classList.add('hidden');
                    btnTable.classList.add('active');
                    btnCards.classList.remove('active');
                } else {
                    tableView.classList.add('hidden');
                    cardView.classList.remove('hidden');
                    btnTable.classList.remove('active');
                    btnCards.classList.add('active');
                }
                localStorage.setItem('dashboardView', view);
            }

            // Load saved view preference (only on desktop)
            if (window.innerWidth > 768) {
                const savedView = localStorage.getItem('dashboardView') || 'table';
                setView(savedView);
            }

            function showToast(message, type) {
                const toast = document.getElementById('toast');
                toast.textContent = message;
                toast.className = 'toast ' + type;
                toast.style.display = 'block';
                setTimeout(() => { toast.style.display = 'none'; }, 3000);
            }

            function deleteSubmission(id, viewType) {
                if (!confirm('Are you sure you want to delete submission #' + id + '?')) return;
                fetch('/api/submissions/' + id, { method: 'DELETE', credentials: 'same-origin' })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('row-' + id)?.remove();
                        document.getElementById('card-' + id)?.remove();
                        showToast('Submission deleted', 'success');
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error deleting submission', 'error'));
            }

            function updateStatus(id, status, viewType) {
                fetch('/api/submissions/' + id + '/status', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin',
                    body: JSON.stringify({ status: status })
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        const card = document.getElementById('card-' + id);
                        if (card) {
                            const badge = card.querySelector('.status-badge');
                            if (badge) {
                                badge.className = 'status-badge status-' + status;
                                badge.textContent = status;
                            }
                        }
                        showToast('Status updated to ' + status, 'success');
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error updating status', 'error'));
            }

            // Bulk selection functions
            function toggleSelectAll(checkbox) {
                const checkboxes = document.querySelectorAll('.row-checkbox');
                checkboxes.forEach(cb => cb.checked = checkbox.checked);
                updateSelectedCount();
            }

            function updateSelectedCount() {
                const checkboxes = document.querySelectorAll('.row-checkbox:checked');
                const count = checkboxes.length;
                document.getElementById('selectedCount').textContent = count + ' selected';
                document.getElementById('deleteSelectedBtn').disabled = count === 0;
            }

            function getSelectedIds() {
                const checkboxes = document.querySelectorAll('.row-checkbox:checked');
                return Array.from(checkboxes).map(cb => parseInt(cb.value));
            }

            function deleteSelected() {
                const ids = getSelectedIds();
                if (ids.length === 0) return;
                if (!confirm('Are you sure you want to delete ' + ids.length + ' selected submissions?')) return;

                fetch('/api/submissions/bulk-delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin',
                    body: JSON.stringify({ ids: ids })
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        ids.forEach(id => {
                            document.getElementById('row-' + id)?.remove();
                            document.getElementById('card-' + id)?.remove();
                        });
                        updateSelectedCount();
                        showToast(data.message, 'success');
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error deleting submissions', 'error'));
            }

            function deleteAll() {
                if (!confirm('Are you sure you want to delete ALL submissions? This cannot be undone.')) return;
                if (!confirm('This will permanently delete all data. Are you absolutely sure?')) return;

                fetch('/api/submissions/delete-all', {
                    method: 'POST',
                    credentials: 'same-origin'
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showToast(data.message, 'success');
                        setTimeout(() => location.reload(), 1000);
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error deleting submissions', 'error'));
            }

            function exportCSV() {
                window.location.href = '/api/submissions/export';
            }

            function importCSV(input) {
                if (!input.files || !input.files[0]) return;

                const formData = new FormData();
                formData.append('file', input.files[0]);

                fetch('/api/submissions/import', {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: formData
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showToast(data.message, 'success');
                        setTimeout(() => location.reload(), 1000);
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error importing CSV', 'error'));

                input.value = '';
            }

            // Settings modal functions
            function openSettingsModal() {
                document.getElementById('settingsModal').classList.add('active');
                loadNotificationSettings();
            }

            function closeSettingsModal() {
                document.getElementById('settingsModal').classList.remove('active');
            }

            function loadNotificationSettings() {
                fetch('/api/settings/notifications', { credentials: 'same-origin' })
                .then(r => r.json())
                .then(settings => {
                    document.getElementById('webhookEmail').value = settings.n8n_webhook_email || '';
                    document.getElementById('webhookSheets').value = settings.n8n_webhook_sheets || '';
                    document.getElementById('notificationEmails').value = settings.notification_emails || '';
                    document.getElementById('notifyNewLead').checked = settings.notify_on_new_lead === 'true';
                    document.getElementById('notifyStatusChange').checked = settings.notify_on_status_change === 'true';
                })
                .catch(() => showToast('Error loading settings', 'error'));
            }

            function saveNotificationSettings() {
                const settings = {
                    n8n_webhook_email: document.getElementById('webhookEmail').value,
                    n8n_webhook_sheets: document.getElementById('webhookSheets').value,
                    notification_emails: document.getElementById('notificationEmails').value,
                    notify_on_new_lead: document.getElementById('notifyNewLead').checked ? 'true' : 'false',
                    notify_on_status_change: document.getElementById('notifyStatusChange').checked ? 'true' : 'false'
                };

                fetch('/api/settings/notifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin',
                    body: JSON.stringify(settings)
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showToast('Settings saved', 'success');
                        closeSettingsModal();
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error saving settings', 'error'));
            }

            function testWebhook() {
                showToast('Sending test webhook...', 'success');
                fetch('/api/settings/notifications/test', {
                    method: 'POST',
                    credentials: 'same-origin'
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showToast(data.message, 'success');
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error sending test webhook', 'error'));
            }

            // Close modal on overlay click
            document.querySelectorAll('.modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) overlay.classList.remove('active');
                });
            });
        </script>

        <!-- Settings Modal -->
        <div class="modal-overlay" id="settingsModal">
            <div class="modal">
                <h2>Settings</h2>

                <div class="modal-section">
                    <h3>Email Notifications</h3>
                    <div class="form-group">
                        <label>Notification Recipients</label>
                        <input type="text" id="notificationEmails" placeholder="email1@example.com, email2@example.com">
                        <small>Comma-separated list of email addresses</small>
                    </div>
                    <div class="toggle-group">
                        <span class="toggle-label">Notify on new lead</span>
                        <label class="toggle-switch">
                            <input type="checkbox" id="notifyNewLead">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="toggle-group">
                        <span class="toggle-label">Notify on status change</span>
                        <label class="toggle-switch">
                            <input type="checkbox" id="notifyStatusChange">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div class="modal-section">
                    <h3>n8n Webhook URLs</h3>
                    <div class="form-group">
                        <label>Email Webhook URL</label>
                        <input type="url" id="webhookEmail" placeholder="https://n8n.improveitmd.com/webhook/...">
                        <small>n8n workflow webhook that sends email notifications</small>
                    </div>
                    <div class="form-group">
                        <label>Google Sheets Webhook URL</label>
                        <input type="url" id="webhookSheets" placeholder="https://n8n.improveitmd.com/webhook/...">
                        <small>n8n workflow webhook that logs to Google Sheets</small>
                    </div>
                </div>

                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="testWebhook()">Test Webhook</button>
                    <button class="btn btn-secondary" onclick="closeSettingsModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="saveNotificationSettings()">Save Settings</button>
                </div>
            </div>
        </div>
    </body>
    </html>
    '''

    statuses = get_statuses()
    return render_template_string(html_template, submissions=submissions_list, form_names=form_names, form_filter=form_filter, page_urls=page_urls, page_filter=page_filter, field_names=sorted_fields, statuses=statuses)


@app.route('/pipeline')
@login_required
def pipeline():
    """Pipeline/Kanban view for lead management"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM submissions ORDER BY submitted_at DESC')
    submissions = cursor.fetchall()
    conn.close()

    # Convert to list of dicts
    submissions_list = []
    for row in submissions:
        submission = dict(row)
        if submission.get('form_data'):
            try:
                submission['form_data'] = json.loads(submission['form_data'])
            except:
                submission['form_data'] = {}
        else:
            submission['form_data'] = {}
        submissions_list.append(submission)

    statuses = get_statuses()

    # Group submissions by status
    submissions_by_status = {s['name']: [] for s in statuses}
    for sub in submissions_list:
        status = sub.get('status') or 'new'
        if status in submissions_by_status:
            submissions_by_status[status].append(sub)
        else:
            submissions_by_status['new'].append(sub)

    pipeline_template = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pipeline - Lead Management</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 15px;
            }
            .container { max-width: 100%; margin: 0 auto; }
            .header {
                background: white;
                padding: 15px 20px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
            }
            .header h1 { color: #333; font-size: 1.4em; }
            .header-right { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
            .btn {
                padding: 8px 16px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.85em;
                cursor: pointer;
                border: none;
            }
            .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
            .btn-secondary { background: #f0f0f0; color: #333; }
            .btn-success { background: #28a745; color: white; }

            /* Pipeline columns */
            .pipeline {
                display: flex;
                gap: 15px;
                overflow-x: auto;
                padding-bottom: 15px;
                -webkit-overflow-scrolling: touch;
            }
            .pipeline-column {
                min-width: 280px;
                max-width: 320px;
                flex-shrink: 0;
                background: rgba(255,255,255,0.95);
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                max-height: calc(100vh - 150px);
            }
            .column-header {
                padding: 15px;
                border-bottom: 3px solid;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 12px 12px 0 0;
            }
            .column-title {
                font-weight: 700;
                text-transform: uppercase;
                font-size: 0.85em;
                letter-spacing: 0.5px;
            }
            .column-count {
                background: rgba(0,0,0,0.1);
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 0.8em;
                font-weight: 600;
            }
            .column-body {
                padding: 10px;
                overflow-y: auto;
                flex: 1;
                min-height: 200px;
            }
            .column-body.drag-over {
                background: rgba(102, 126, 234, 0.1);
            }

            /* Lead cards */
            .lead-card {
                background: white;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                cursor: grab;
                transition: transform 0.2s, box-shadow 0.2s;
                border-left: 4px solid #667eea;
            }
            .lead-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            }
            .lead-card.dragging {
                opacity: 0.5;
                cursor: grabbing;
            }
            .lead-card-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 8px;
            }
            .lead-id {
                font-size: 0.7em;
                color: #666;
                background: #f0f0f0;
                padding: 2px 6px;
                border-radius: 4px;
            }
            .lead-date { font-size: 0.7em; color: #999; }
            .lead-name { font-weight: 600; font-size: 0.95em; color: #333; margin-bottom: 4px; }
            .lead-contact { font-size: 0.8em; color: #667eea; }
            .lead-contact a { color: inherit; text-decoration: none; }
            .lead-contact a:hover { text-decoration: underline; }
            .lead-fields { margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee; }
            .lead-field { font-size: 0.75em; color: #666; margin-bottom: 3px; }
            .lead-field strong { color: #333; }

            /* Modal */
            .modal-overlay {
                display: none;
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            .modal-overlay.active { display: flex; }
            .modal {
                background: white;
                border-radius: 12px;
                padding: 25px;
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
            }
            .modal h2 { margin-bottom: 20px; color: #333; }
            .form-group { margin-bottom: 15px; }
            .form-group label { display: block; font-weight: 600; margin-bottom: 5px; color: #333; font-size: 0.9em; }
            .form-group input, .form-group select {
                width: 100%;
                padding: 10px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1em;
            }
            .form-group input:focus, .form-group select:focus {
                outline: none;
                border-color: #667eea;
            }
            .color-preview {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                border: 2px solid #e0e0e0;
                cursor: pointer;
            }
            .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }

            /* Status list in modal */
            .status-list { margin-top: 15px; }
            .status-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 8px;
                margin-bottom: 8px;
            }
            .status-color {
                width: 20px;
                height: 20px;
                border-radius: 4px;
            }
            .status-name { flex: 1; font-weight: 500; }
            .status-actions { display: flex; gap: 5px; }
            .status-actions button {
                padding: 4px 8px;
                font-size: 0.75em;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .btn-edit { background: #ffc107; color: #333; }
            .btn-delete { background: #dc3545; color: white; }

            .toast {
                position: fixed;
                bottom: 15px;
                right: 15px;
                left: 15px;
                background: #333;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                display: none;
                z-index: 1001;
                text-align: center;
            }
            .toast.success { background: #28a745; }
            .toast.error { background: #dc3545; }

            @media (max-width: 768px) {
                .pipeline-column { min-width: 260px; }
                .header h1 { font-size: 1.2em; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Lead Pipeline</h1>
                <div class="header-right">
                    <a href="/dashboard" class="btn btn-secondary">Dashboard</a>
                    <button class="btn btn-success" onclick="openStatusModal()">+ Add Status</button>
                    <button class="btn btn-primary" onclick="openManageModal()">Manage Statuses</button>
                    <a href="/logout" class="btn btn-secondary">Logout</a>
                </div>
            </div>

            <div class="pipeline">
                {% for status in statuses %}
                <div class="pipeline-column" data-status="{{ status.name }}">
                    <div class="column-header" style="border-color: {{ status.color }}; background: {{ status.color }}15;">
                        <span class="column-title" style="color: {{ status.color }};">{{ status.name }}</span>
                        <span class="column-count" style="color: {{ status.color }};">{{ submissions_by_status[status.name]|length }}</span>
                    </div>
                    <div class="column-body" data-status="{{ status.name }}"
                         ondragover="handleDragOver(event)"
                         ondragleave="handleDragLeave(event)"
                         ondrop="handleDrop(event, '{{ status.name }}')">
                        {% for lead in submissions_by_status[status.name] %}
                        <div class="lead-card" draggable="true" data-id="{{ lead.id }}"
                             ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)"
                             style="border-left-color: {{ status.color }};">
                            <div class="lead-card-header">
                                <span class="lead-id">#{{ lead.id }}</span>
                                <span class="lead-date">{{ lead.submitted_at|humandate }}</span>
                            </div>
                            {% if lead.form_data %}
                                {% set name_val = lead.form_data.get('Name') or lead.form_data.get('name') or lead.form_data.get('fullname') or '' %}
                                {% set phone_val = lead.form_data.get('Phone') or lead.form_data.get('phone') or lead.form_data.get('tel') or '' %}
                                {% set email_val = lead.form_data.get('Email') or lead.form_data.get('email') or '' %}
                                {% if name_val %}<div class="lead-name">{{ name_val }}</div>{% endif %}
                                <div class="lead-contact">
                                    {% if phone_val %}<a href="tel:{{ phone_val }}">{{ phone_val }}</a>{% endif %}
                                    {% if phone_val and email_val %} &middot; {% endif %}
                                    {% if email_val %}<a href="mailto:{{ email_val }}">{{ email_val }}</a>{% endif %}
                                </div>
                                <div class="lead-fields">
                                    {% for key, value in lead.form_data.items() %}
                                        {% if key|lower not in ['name', 'phone', 'email', 'tel', 'fullname'] and value %}
                                        <div class="lead-field"><strong>{{ key }}:</strong> {{ value|truncate(50) }}</div>
                                        {% endif %}
                                    {% endfor %}
                                </div>
                            {% else %}
                                {% if lead.name %}<div class="lead-name">{{ lead.name }}</div>{% endif %}
                                <div class="lead-contact">
                                    {% if lead.phone %}<a href="tel:{{ lead.phone }}">{{ lead.phone }}</a>{% endif %}
                                    {% if lead.phone and lead.email %} &middot; {% endif %}
                                    {% if lead.email %}<a href="mailto:{{ lead.email }}">{{ lead.email }}</a>{% endif %}
                                </div>
                            {% endif %}
                        </div>
                        {% endfor %}
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>

        <!-- Add Status Modal -->
        <div class="modal-overlay" id="addStatusModal">
            <div class="modal">
                <h2>Add New Status</h2>
                <div class="form-group">
                    <label>Status Name</label>
                    <input type="text" id="newStatusName" placeholder="e.g., follow-up, negotiating">
                </div>
                <div class="form-group">
                    <label>Color</label>
                    <input type="color" id="newStatusColor" value="#667eea" class="color-preview">
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="closeModal('addStatusModal')">Cancel</button>
                    <button class="btn btn-primary" onclick="createStatus()">Create Status</button>
                </div>
            </div>
        </div>

        <!-- Manage Statuses Modal -->
        <div class="modal-overlay" id="manageModal">
            <div class="modal">
                <h2>Manage Statuses</h2>
                <p style="color:#666;font-size:0.9em;margin-bottom:15px;">Drag to reorder. The "new" status cannot be deleted.</p>
                <div class="status-list" id="statusList">
                    {% for status in statuses %}
                    <div class="status-item" data-id="{{ status.id }}">
                        <div class="status-color" style="background: {{ status.color }};"></div>
                        <span class="status-name">{{ status.name }}</span>
                        <div class="status-actions">
                            <button class="btn-edit" onclick="editStatus({{ status.id }}, '{{ status.name }}', '{{ status.color }}')">Edit</button>
                            {% if status.name != 'new' %}
                            <button class="btn-delete" onclick="deleteStatus({{ status.id }}, '{{ status.name }}')">Delete</button>
                            {% endif %}
                        </div>
                    </div>
                    {% endfor %}
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="closeModal('manageModal')">Close</button>
                </div>
            </div>
        </div>

        <!-- Edit Status Modal -->
        <div class="modal-overlay" id="editStatusModal">
            <div class="modal">
                <h2>Edit Status</h2>
                <input type="hidden" id="editStatusId">
                <div class="form-group">
                    <label>Status Name</label>
                    <input type="text" id="editStatusName" placeholder="Status name">
                </div>
                <div class="form-group">
                    <label>Color</label>
                    <input type="color" id="editStatusColor" class="color-preview">
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="closeModal('editStatusModal')">Cancel</button>
                    <button class="btn btn-primary" onclick="updateStatusDetails()">Save Changes</button>
                </div>
            </div>
        </div>

        <div id="toast" class="toast"></div>

        <script>
            let draggedCard = null;

            function handleDragStart(e) {
                draggedCard = e.target;
                e.target.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
            }

            function handleDragEnd(e) {
                e.target.classList.remove('dragging');
                document.querySelectorAll('.column-body').forEach(col => col.classList.remove('drag-over'));
            }

            function handleDragOver(e) {
                e.preventDefault();
                e.currentTarget.classList.add('drag-over');
            }

            function handleDragLeave(e) {
                e.currentTarget.classList.remove('drag-over');
            }

            function handleDrop(e, newStatus) {
                e.preventDefault();
                e.currentTarget.classList.remove('drag-over');

                const leadId = e.dataTransfer.getData('text/plain');
                if (!leadId || !draggedCard) return;

                // Move card visually
                e.currentTarget.appendChild(draggedCard);

                // Update status via API
                fetch('/api/submissions/' + leadId + '/status', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin',
                    body: JSON.stringify({ status: newStatus })
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showToast('Moved to ' + newStatus, 'success');
                        updateColumnCounts();
                    } else {
                        showToast('Error: ' + data.error, 'error');
                        location.reload();
                    }
                })
                .catch(() => {
                    showToast('Error updating status', 'error');
                    location.reload();
                });
            }

            function updateColumnCounts() {
                document.querySelectorAll('.pipeline-column').forEach(col => {
                    const count = col.querySelector('.column-body').children.length;
                    col.querySelector('.column-count').textContent = count;
                });
            }

            function openStatusModal() {
                document.getElementById('newStatusName').value = '';
                document.getElementById('newStatusColor').value = '#667eea';
                document.getElementById('addStatusModal').classList.add('active');
            }

            function openManageModal() {
                document.getElementById('manageModal').classList.add('active');
            }

            function closeModal(id) {
                document.getElementById(id).classList.remove('active');
            }

            function createStatus() {
                const name = document.getElementById('newStatusName').value.trim();
                const color = document.getElementById('newStatusColor').value;

                if (!name) {
                    showToast('Please enter a status name', 'error');
                    return;
                }

                fetch('/api/statuses', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin',
                    body: JSON.stringify({ name, color })
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showToast('Status created!', 'success');
                        setTimeout(() => location.reload(), 500);
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error creating status', 'error'));
            }

            function editStatus(id, name, color) {
                document.getElementById('editStatusId').value = id;
                document.getElementById('editStatusName').value = name;
                document.getElementById('editStatusColor').value = color;
                closeModal('manageModal');
                document.getElementById('editStatusModal').classList.add('active');
            }

            function updateStatusDetails() {
                const id = document.getElementById('editStatusId').value;
                const name = document.getElementById('editStatusName').value.trim();
                const color = document.getElementById('editStatusColor').value;

                fetch('/api/statuses/' + id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin',
                    body: JSON.stringify({ name, color })
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showToast('Status updated!', 'success');
                        setTimeout(() => location.reload(), 500);
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error updating status', 'error'));
            }

            function deleteStatus(id, name) {
                if (!confirm('Delete "' + name + '"? All leads will be moved to "new".')) return;

                fetch('/api/statuses/' + id, {
                    method: 'DELETE',
                    credentials: 'same-origin'
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showToast('Status deleted', 'success');
                        setTimeout(() => location.reload(), 500);
                    } else {
                        showToast('Error: ' + data.error, 'error');
                    }
                })
                .catch(() => showToast('Error deleting status', 'error'));
            }

            function showToast(message, type) {
                const toast = document.getElementById('toast');
                toast.textContent = message;
                toast.className = 'toast ' + type;
                toast.style.display = 'block';
                setTimeout(() => { toast.style.display = 'none'; }, 3000);
            }

            // Close modal on overlay click
            document.querySelectorAll('.modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) overlay.classList.remove('active');
                });
            });
        </script>
    </body>
    </html>
    '''

    return render_template_string(pipeline_template, statuses=statuses, submissions_by_status=submissions_by_status)


def get_login_template():
    """Return the login page HTML template"""
    return '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard Login</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background: #f8fafc;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .login-container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                border: 1px solid #e2e8f0;
                padding: 40px;
                width: 100%;
                max-width: 400px;
            }

            h1 {
                color: #1e293b;
                margin-bottom: 10px;
                font-size: 1.75em;
            }

            .subtitle {
                color: #64748b;
                margin-bottom: 30px;
                font-size: 0.9em;
            }

            .form-group {
                margin-bottom: 20px;
            }

            label {
                display: block;
                color: #1e293b;
                font-weight: 500;
                margin-bottom: 8px;
                font-size: 0.9em;
            }

            input {
                width: 100%;
                padding: 12px;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                font-size: 1em;
                transition: border-color 0.3s;
            }

            input:focus {
                outline: none;
                border-color: #3b82f6;
            }

            button {
                width: 100%;
                padding: 14px;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 1em;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
            }

            button:hover {
                background: #2563eb;
            }

            button:active {
                transform: translateY(0);
            }

            .error {
                background: #fef2f2;
                color: #dc2626;
                padding: 12px;
                border-radius: 6px;
                margin-bottom: 20px;
                border-left: 4px solid #dc2626;
            }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h1>Dashboard Login</h1>
            <p class="subtitle">Form Submissions Dashboard</p>

            {% if error %}
            <div class="error">{{ error }}</div>
            {% endif %}

            <form method="POST">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required autofocus>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    </body>
    </html>
    '''

@app.route('/')
def home():
    """Home endpoint with API documentation"""
    return jsonify({
        'message': 'Form Submission API',
        'endpoints': {
            'POST /api/submit': 'Submit a new form',
            'GET /api/submissions': 'Get all submissions (JSON)',
            'GET /dashboard': 'View dashboard (HTML)'
        }
    })

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=False)
