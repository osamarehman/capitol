from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import sqlite3
from datetime import datetime
import json
from urllib.parse import urlparse

app = Flask(__name__)

# Allowed domains for form submissions
ALLOWED_DOMAINS = [
    'improveitmd.com',
    'v2.improveitmd.com',
    'www.improveitmd.com',
    'www.v2.improveitmd.com'
]

# Configure CORS to only allow requests from specified domains
cors_origins = [
    f'https://{domain}' for domain in ALLOWED_DOMAINS
] + [
    f'http://{domain}' for domain in ALLOWED_DOMAINS
]

CORS(app, resources={
    r"/api/*": {
        "origins": cors_origins,
        "methods": ["POST", "GET", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

DATABASE = 'form_submissions.db'

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
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def get_db_connection():
    """Get a database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/submit', methods=['POST'])
def submit_form():
    """
    Handle form submission data from the frontend

    Expected JSON payload:
    {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "message": "Hello, this is a test message"
    }

    Additional fields will be stored in additional_data as JSON
    """
    try:
        # Validate origin domain
        origin = request.headers.get('Origin') or request.headers.get('Referer')

        if not is_allowed_domain(origin):
            return jsonify({
                'error': 'Unauthorized domain',
                'message': 'Form submissions are only accepted from authorized domains'
            }), 403

        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Extract standard fields
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        message = data.get('message', '')

        # Store any additional fields as JSON
        standard_fields = {'name', 'email', 'phone', 'message'}
        additional_data = {k: v for k, v in data.items() if k not in standard_fields}
        additional_data_json = json.dumps(additional_data) if additional_data else None

        # Insert into database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO submissions (name, email, phone, message, additional_data)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, email, phone, message, additional_data_json))
        conn.commit()
        submission_id = cursor.lastrowid
        conn.close()

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

@app.route('/dashboard')
def dashboard():
    """Display a dashboard with all submissions"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM submissions ORDER BY submitted_at DESC')
    submissions = cursor.fetchall()
    conn.close()

    # Convert to list of dicts for easier template rendering
    submissions_list = []
    for row in submissions:
        submission = dict(row)
        # Parse additional_data if present
        if submission['additional_data']:
            try:
                submission['additional_data'] = json.loads(submission['additional_data'])
            except:
                submission['additional_data'] = {}
        else:
            submission['additional_data'] = {}
        submissions_list.append(submission)

    html_template = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form Submissions Dashboard</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }

            .container {
                max-width: 1400px;
                margin: 0 auto;
            }

            .header {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                margin-bottom: 30px;
            }

            h1 {
                color: #333;
                font-size: 2.5em;
                margin-bottom: 10px;
            }

            .stats {
                display: flex;
                gap: 20px;
                margin-top: 20px;
                flex-wrap: wrap;
            }

            .stat-card {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 10px;
                flex: 1;
                min-width: 200px;
            }

            .stat-card h3 {
                font-size: 0.9em;
                opacity: 0.9;
                margin-bottom: 10px;
            }

            .stat-card .number {
                font-size: 2.5em;
                font-weight: bold;
            }

            .submissions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 20px;
            }

            .submission-card {
                background: white;
                border-radius: 15px;
                padding: 25px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                transition: transform 0.3s, box-shadow 0.3s;
            }

            .submission-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 40px rgba(0,0,0,0.3);
            }

            .submission-header {
                border-bottom: 2px solid #667eea;
                padding-bottom: 15px;
                margin-bottom: 15px;
            }

            .submission-id {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.85em;
                font-weight: bold;
            }

            .submission-date {
                color: #666;
                font-size: 0.9em;
                margin-top: 10px;
            }

            .field {
                margin-bottom: 15px;
            }

            .field-label {
                color: #667eea;
                font-weight: 600;
                font-size: 0.85em;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
            }

            .field-value {
                color: #333;
                font-size: 1em;
                word-break: break-word;
            }

            .additional-data {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                margin-top: 15px;
            }

            .additional-data-title {
                color: #764ba2;
                font-weight: 600;
                font-size: 0.85em;
                text-transform: uppercase;
                margin-bottom: 10px;
            }

            .additional-field {
                margin-bottom: 8px;
                font-size: 0.9em;
            }

            .empty-state {
                background: white;
                border-radius: 15px;
                padding: 60px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }

            .empty-state h2 {
                color: #667eea;
                margin-bottom: 10px;
            }

            .empty-state p {
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📋 Form Submissions Dashboard</h1>
                <div class="stats">
                    <div class="stat-card">
                        <h3>Total Submissions</h3>
                        <div class="number">{{ submissions|length }}</div>
                    </div>
                </div>
            </div>

            {% if submissions %}
            <div class="submissions-grid">
                {% for submission in submissions %}
                <div class="submission-card">
                    <div class="submission-header">
                        <span class="submission-id">#{{ submission.id }}</span>
                        <div class="submission-date">{{ submission.submitted_at }}</div>
                    </div>

                    {% if submission.name %}
                    <div class="field">
                        <div class="field-label">Name</div>
                        <div class="field-value">{{ submission.name }}</div>
                    </div>
                    {% endif %}

                    {% if submission.email %}
                    <div class="field">
                        <div class="field-label">Email</div>
                        <div class="field-value">{{ submission.email }}</div>
                    </div>
                    {% endif %}

                    {% if submission.phone %}
                    <div class="field">
                        <div class="field-label">Phone</div>
                        <div class="field-value">{{ submission.phone }}</div>
                    </div>
                    {% endif %}

                    {% if submission.message %}
                    <div class="field">
                        <div class="field-label">Message</div>
                        <div class="field-value">{{ submission.message }}</div>
                    </div>
                    {% endif %}

                    {% if submission.additional_data %}
                    <div class="additional-data">
                        <div class="additional-data-title">Additional Data</div>
                        {% for key, value in submission.additional_data.items() %}
                        <div class="additional-field">
                            <strong>{{ key }}:</strong> {{ value }}
                        </div>
                        {% endfor %}
                    </div>
                    {% endif %}
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
    </body>
    </html>
    '''

    return render_template_string(html_template, submissions=submissions_list)

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
    app.run(host='0.0.0.0', port=5000, debug=True)
