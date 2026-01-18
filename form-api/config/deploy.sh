#!/bin/bash
# Deployment script for Form Submission API

set -e

echo "=========================================="
echo "Deploying Form Submission API"
echo "=========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root or with sudo"
    exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Project root: $PROJECT_ROOT"
echo ""

# Install Python dependencies
echo "Installing Python dependencies..."
apt-get update -qq
apt-get install -y python3-flask python3-flask-cors > /dev/null 2>&1
echo "✓ Dependencies installed"

# Install systemd service
echo ""
echo "Installing systemd service..."
cp "$SCRIPT_DIR/form-api.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable form-api
echo "✓ Service installed and enabled"

# Check if Caddy config needs updating
echo ""
echo "Checking Caddy configuration..."
if grep -q "forms.improveitmd.com" /etc/caddy/Caddyfile; then
    echo "✓ Caddy already configured for forms.improveitmd.com"
else
    echo "⚠ Caddy not configured. Please add the configuration from:"
    echo "  $SCRIPT_DIR/caddy.conf"
    echo "  to /etc/caddy/Caddyfile"
fi

# Start/Restart the service
echo ""
echo "Starting Form API service..."
systemctl restart form-api
sleep 2

# Check service status
if systemctl is-active --quiet form-api; then
    echo "✓ Form API service is running"
else
    echo "✗ Form API service failed to start"
    systemctl status form-api --no-pager
    exit 1
fi

# Reload Caddy if configured
if grep -q "forms.improveitmd.com" /etc/caddy/Caddyfile; then
    echo ""
    echo "Reloading Caddy..."
    systemctl reload caddy
    echo "✓ Caddy reloaded"
fi

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo ""
echo "Service status:"
systemctl status form-api --no-pager | head -10
echo ""
echo "Access points:"
echo "  Dashboard: https://forms.improveitmd.com/dashboard"
echo "  API: https://forms.improveitmd.com/api/submit"
echo ""
echo "Logs:"
echo "  journalctl -u form-api -f"
echo ""
