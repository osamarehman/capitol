#!/usr/bin/env python3
"""
Lightweight webhook server to trigger Webstudio deploys.
Listens on port 9000, validates secret token, runs deploy.sh in background.
"""

import hashlib
import hmac
import json
import os
import subprocess
import threading
import time
from http.server import HTTPServer, BaseHTTPRequestHandler

DEPLOY_SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "deploy.sh")
DEPLOY_SECRET = os.environ.get("DEPLOY_SECRET", "")
PORT = int(os.environ.get("DEPLOY_PORT", "9000"))
LOG_FILE = "/var/log/webstudio-deploy.log"

# Track deploy state
deploy_state = {
    "status": "idle",  # idle, running, success, failed
    "started_at": None,
    "finished_at": None,
    "triggered_by": None,
    "logs": [],
    "step": None,
}

# Deploy step patterns to detect progress
STEP_PATTERNS = [
    ("Installing webstudio CLI", "install_cli"),
    ("Syncing project data", "sync"),
    ("Building project", "build_assets"),
    ("Optimizing assets", "optimize"),
    ("Building Docker image", "docker_build"),
    ("Deploying container", "deploy"),
    ("Waiting for health check", "health_check"),
    ("Deploy successful", "done"),
    ("ERROR:", "error"),
]


def run_deploy(triggered_by="webhook"):
    """Run deploy.sh in background thread, capturing live output."""
    deploy_state["status"] = "running"
    deploy_state["started_at"] = time.strftime("%Y-%m-%d %H:%M:%S")
    deploy_state["finished_at"] = None
    deploy_state["triggered_by"] = triggered_by
    deploy_state["logs"] = []
    deploy_state["step"] = "starting"

    def add_log(line):
        ts = time.strftime("%H:%M:%S")
        deploy_state["logs"].append(f"[{ts}] {line}")
        # Keep last 200 lines
        if len(deploy_state["logs"]) > 200:
            deploy_state["logs"] = deploy_state["logs"][-200:]
        # Detect current step
        for pattern, step in STEP_PATTERNS:
            if pattern in line:
                deploy_state["step"] = step
                break

    try:
        process = subprocess.Popen(
            ["bash", DEPLOY_SCRIPT],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
        for line in process.stdout:
            line = line.rstrip()
            if line:
                add_log(line)
        process.wait(timeout=600)

        if process.returncode == 0:
            deploy_state["status"] = "success"
            deploy_state["step"] = "done"
        else:
            deploy_state["status"] = "failed"
            deploy_state["step"] = "error"
            add_log(f"Process exited with code {process.returncode}")
    except subprocess.TimeoutExpired:
        deploy_state["status"] = "failed"
        deploy_state["step"] = "error"
        add_log("Deploy timed out after 600s")
        process.kill()
    except Exception as e:
        deploy_state["status"] = "failed"
        deploy_state["step"] = "error"
        add_log(f"Exception: {e}")
    finally:
        deploy_state["finished_at"] = time.strftime("%Y-%m-%d %H:%M:%S")


class WebhookHandler(BaseHTTPRequestHandler):
    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path.startswith("/deploy/status"):
            # Parse ?since=N to only return new logs
            since = 0
            if "?since=" in self.path:
                try:
                    since = int(self.path.split("?since=")[1])
                except ValueError:
                    pass

            response = {
                "status": deploy_state["status"],
                "started_at": deploy_state["started_at"],
                "finished_at": deploy_state["finished_at"],
                "triggered_by": deploy_state["triggered_by"],
                "step": deploy_state["step"],
                "logs": deploy_state["logs"][since:],
                "log_offset": len(deploy_state["logs"]),
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            return

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self._cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps({"service": "webstudio-deploy", "status": "ok"}).encode())

    def do_POST(self):
        if self.path != "/deploy/trigger":
            self.send_response(404)
            self.end_headers()
            return

        # Read body
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length) if content_length > 0 else b""

        # Validate auth
        auth = self.headers.get("Authorization", "")
        token = auth.replace("Bearer ", "") if auth.startswith("Bearer ") else ""

        if not DEPLOY_SECRET:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self._cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"error": "DEPLOY_SECRET not configured"}).encode())
            return

        if not hmac.compare_digest(token, DEPLOY_SECRET):
            self.send_response(403)
            self.send_header("Content-Type", "application/json")
            self._cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Invalid token"}).encode())
            return

        # Check if already running
        if deploy_state["status"] == "running":
            self.send_response(409)
            self.send_header("Content-Type", "application/json")
            self._cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({
                "error": "Deploy already in progress",
                "started_at": deploy_state["started_at"],
            }).encode())
            return

        # Trigger deploy in background
        thread = threading.Thread(target=run_deploy, args=("webhook",), daemon=True)
        thread.start()

        self.send_response(202)
        self.send_header("Content-Type", "application/json")
        self._cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps({
            "message": "Deploy triggered",
            "status_url": "/deploy/status",
        }).encode())

    def log_message(self, format, *args):
        with open(LOG_FILE, "a") as f:
            f.write(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] webhook: {format % args}\n")


if __name__ == "__main__":
    if not DEPLOY_SECRET:
        print("ERROR: Set DEPLOY_SECRET environment variable")
        exit(1)

    server = HTTPServer(("127.0.0.1", PORT), WebhookHandler)
    print(f"Deploy webhook listening on 127.0.0.1:{PORT}")
    server.serve_forever()
