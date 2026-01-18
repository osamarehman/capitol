# Form Submission API

A Python Flask application that handles form submissions from improveitmd.com domains, stores them in SQLite, and provides a dashboard for viewing submissions.

## Features

- **REST API** endpoint to receive form submissions
- **Domain-restricted** security (only accepts from authorized domains)
- **SQLite database** for local storage
- **Web dashboard** to view all submissions
- **CORS configured** for frontend integration
- **Flexible data handling** - stores standard fields (name, email, phone, message) and any additional custom fields
- **Ready for extensions** - Google Sheets integration, email notifications, webhooks

## Architecture

```
Internet (improveitmd.com, v2.improveitmd.com)
    ↓
forms.improveitmd.com (HTTPS via Caddy)
    ↓
Flask Application (Port 5000)
    ↓
SQLite Database (form_submissions.db)
```

## Quick Start

### 1. Deploy to Server

```bash
cd /root/capitol/form-api
sudo ./config/deploy.sh
```

This will:
- Install Python dependencies
- Set up systemd service
- Start the application
- Configure Caddy (if needed)

### 2. Access the Dashboard

Visit: `https://forms.improveitmd.com/dashboard`

## API Endpoints

### POST /api/submit

Submit a new form with data.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Hello, this is my message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submission received successfully",
  "submission_id": 1
}
```

**Errors:**
- `403 Forbidden` - Request from unauthorized domain
- `400 Bad Request` - No data provided
- `500 Internal Server Error` - Server error

### GET /api/submissions

Get all submissions as JSON (for integrations).

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Hello!",
    "additional_data": {},
    "submitted_at": "2026-01-18 12:00:00"
  }
]
```

### GET /dashboard

View all submissions in a beautiful web interface.

## Security

### Authorized Domains

The API only accepts form submissions from:
- `improveitmd.com`
- `v2.improveitmd.com`
- `www.improveitmd.com`
- `www.v2.improveitmd.com`

To add more domains, edit `app.py` and update the `ALLOWED_DOMAINS` list:

```python
ALLOWED_DOMAINS = [
    'improveitmd.com',
    'v2.improveitmd.com',
    'your-new-domain.com',  # Add here
]
```

## Frontend Integration

### Vanilla JavaScript

```javascript
async function submitForm(formData) {
  try {
    const response = await fetch('https://forms.improveitmd.com/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    const result = await response.json();
    console.log('Success:', result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  await submitForm({
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value
  });

  alert('Form submitted successfully!');
});
```

### React

```jsx
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://forms.improveitmd.com/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Submission failed');

      alert('Form submitted successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      alert('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## Database Schema

```sql
CREATE TABLE submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    additional_data TEXT,  -- JSON for custom fields
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Management

### View Logs

```bash
# Real-time logs
journalctl -u form-api -f

# Last 100 lines
journalctl -u form-api -n 100
```

### Restart Service

```bash
systemctl restart form-api
```

### Database Backup

```bash
# Manual backup
cp /root/form_submissions.db /root/backups/form_submissions.db.$(date +%Y%m%d)

# Automated backups (add to crontab)
0 2 * * * cp /root/form_submissions.db /root/backups/form_submissions.db.$(date +\%Y\%m\%d)
```

### Query Database

```bash
# View recent submissions
sqlite3 /root/form_submissions.db "SELECT * FROM submissions ORDER BY submitted_at DESC LIMIT 10;"

# Count total submissions
sqlite3 /root/form_submissions.db "SELECT COUNT(*) FROM submissions;"

# Search by email
sqlite3 /root/form_submissions.db "SELECT * FROM submissions WHERE email LIKE '%@example.com%';"
```

## Future Extensions

### Google Sheets Integration

See `integrations/google_sheets.py` for a starter template to automatically send submissions to Google Sheets.

**Setup:**
1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create Service Account
4. Download credentials
5. Update environment variables
6. Modify `app.py` to call `send_to_sheets()` after saving to database

### Email Notifications

Add email notifications when new submissions arrive:

```python
import smtplib
from email.mime.text import MIMEText

def send_email_notification(submission):
    msg = MIMEText(f"New form submission from {submission['name']}")
    msg['Subject'] = 'New Form Submission'
    msg['From'] = 'noreply@improveitmd.com'
    msg['To'] = 'admin@improveitmd.com'

    # Send via SMTP
```

### Webhooks

Trigger external services when forms are submitted:

```python
import requests

def trigger_webhook(submission):
    requests.post('https://your-webhook-url.com', json=submission)
```

## Testing

Run the test suite:

```bash
cd /root/capitol/form-api
python3 tests/test_api.py
```

## Troubleshooting

### Service Not Running

```bash
systemctl status form-api
journalctl -u form-api -n 50
```

### 403 Forbidden Errors

- Verify the Origin header is from an allowed domain
- Check `ALLOWED_DOMAINS` in `app.py`
- View logs: `journalctl -u form-api -f`

### Database Locked

```bash
# Check if database file is accessible
ls -l /root/form_submissions.db

# Ensure proper permissions
chmod 644 /root/form_submissions.db
```

## Configuration

### Environment Variables

Currently all configuration is in `app.py`. For production, consider:

```bash
# Create .env file
DATABASE=/var/lib/form-api/submissions.db
ALLOWED_DOMAINS=improveitmd.com,v2.improveitmd.com
```

### Production Considerations

For production deployment with higher traffic:

1. **Use Gunicorn** instead of Flask development server:
   ```bash
   apt-get install python3-gunicorn
   gunicorn -w 4 -b 127.0.0.1:5000 app:app
   ```

2. **Rate Limiting**: Add rate limiting to prevent abuse

3. **Database**: Consider PostgreSQL for better concurrency

4. **Monitoring**: Set up monitoring and alerts

## Support

For issues:
1. Check logs: `journalctl -u form-api -f`
2. Verify DNS: `dig forms.improveitmd.com`
3. Test locally: `curl http://localhost:5000/`
4. Check Caddy: `systemctl status caddy`

## License

Internal use for ImproveItMD projects.
