"""
Revert only the H2 + paragraph in tableRichText back to originals from backup,
while keeping the current production table (with Address column) intact.

Reads original H2/paragraph from strapi_tableRichText_backup.json and combines
with the current table from production Strapi.

Usage:
  python revert_h2_paragraph.py --dry-run          # preview changes
  python revert_h2_paragraph.py --slug=bowie        # single city filter
  python revert_h2_paragraph.py --limit=5           # first N pages only
  python revert_h2_paragraph.py                     # apply all changes
"""
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime

from dotenv import load_dotenv

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(SCRIPT_DIR, "migration", ".env"))

STRAPI_URL = os.environ["STRAPI_URL"]
STRAPI_TOKEN = os.environ["STRAPI_API_TOKEN"]
HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}

BACKUP_PATH = os.path.join(SCRIPT_DIR, "strapi_tableRichText_backup.json")
TABLE_MARKER = '<div class="table-wrapper">'


# ── Strapi API helpers ────────────────────────────────────────────────────────

def strapi_get(path: str) -> dict:
    """GET from Strapi API."""
    req = urllib.request.Request(
        f"{STRAPI_URL}/api/{path}", headers=HEADERS
    )
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())


def strapi_put(document_id: str, data: dict) -> dict:
    """PUT to Strapi API."""
    url = f"{STRAPI_URL}/api/services/{document_id}"
    payload = json.dumps({"data": data}).encode()
    req = urllib.request.Request(url, data=payload, method="PUT", headers=HEADERS)
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())


def fetch_all_pages() -> list[dict]:
    """Fetch all service pages with tableRichText."""
    pages = []
    page = 1
    while True:
        params = urllib.parse.urlencode({
            "fields[0]": "title",
            "fields[1]": "slug",
            "fields[2]": "tableRichText",
            "fields[3]": "documentId",
            "pagination[page]": str(page),
            "pagination[pageSize]": "100",
        })
        data = strapi_get(f"services?{params}")
        pages.extend(data["data"])
        meta = data["meta"]["pagination"]
        if page >= meta["pageCount"]:
            break
        page += 1
    return pages


# ── Core logic ────────────────────────────────────────────────────────────────

def extract_h2_paragraph(html: str) -> str | None:
    """Extract everything before the table-wrapper div (the h2 + paragraph)."""
    idx = html.find(TABLE_MARKER)
    if idx < 0:
        return None
    return html[:idx]


def extract_table(html: str) -> str | None:
    """Extract everything from the table-wrapper div onward (the table)."""
    idx = html.find(TABLE_MARKER)
    if idx < 0:
        # Try alternate markers
        for marker in ["<div class='table-wrapper'>", "<table"]:
            idx = html.find(marker)
            if idx >= 0:
                break
    if idx < 0:
        return None
    return html[idx:]


def save_dated_backup(pages: list[dict]):
    """Save a fresh dated backup of current production data."""
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    path = os.path.join(SCRIPT_DIR, f"strapi_tableRichText_backup_{ts}.json")
    backup = []
    for p in pages:
        trt = p.get("tableRichText") or ""
        if trt:
            backup.append({
                "documentId": p["documentId"],
                "title": p["title"],
                "slug": p.get("slug", ""),
                "tableRichText": trt,
            })
    with open(path, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"Pre-revert backup saved: {path} ({len(backup)} pages)")


def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    slug_filter = None
    limit = None
    for a in args:
        if a.startswith("--slug="):
            slug_filter = a.split("=", 1)[1]
        elif a.startswith("--limit="):
            limit = int(a.split("=", 1)[1])

    # Load original backup (source of truth for h2 + paragraph)
    if not os.path.exists(BACKUP_PATH):
        print(f"Backup not found: {BACKUP_PATH}")
        sys.exit(1)

    with open(BACKUP_PATH, encoding="utf-8") as f:
        backup_entries = json.load(f)

    backup_by_id = {e["documentId"]: e for e in backup_entries}
    print(f"Loaded backup: {len(backup_by_id)} pages")

    # Fetch current production pages
    print("Fetching current pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  Total pages: {len(all_pages)}")

    pages_with_table = [
        p for p in all_pages
        if (p.get("tableRichText") or "").strip()
    ]
    print(f"  Pages with tableRichText: {len(pages_with_table)}")

    # Save a dated backup before making changes
    if not dry_run:
        save_dated_backup(all_pages)

    # Process
    updated = 0
    skipped = 0
    failed = 0
    processed = 0

    for p in pages_with_table:
        title = p["title"]
        doc_id = p["documentId"]
        current_html = p["tableRichText"]

        # Apply slug filter
        if slug_filter and slug_filter.lower() not in title.lower():
            continue

        # Apply limit
        if limit and processed >= limit:
            break
        processed += 1

        # Find this page in the original backup
        backup_entry = backup_by_id.get(doc_id)
        if not backup_entry:
            print(f"  SKIP (not in backup): {title}")
            skipped += 1
            continue

        backup_html = backup_entry["tableRichText"]

        # Extract original h2+p from backup
        original_h2p = extract_h2_paragraph(backup_html)
        if original_h2p is None:
            print(f"  SKIP (no table marker in backup): {title}")
            skipped += 1
            continue

        # Extract current table from production
        current_table = extract_table(current_html)
        if current_table is None:
            print(f"  SKIP (no table in current): {title}")
            skipped += 1
            continue

        # Combine: backup h2+p + current table
        new_html = original_h2p + current_table

        # Check if Address column exists in current table
        has_address = "<th>Address</th>" in current_table

        if dry_run:
            # Show preview
            h2_preview = original_h2p[:100].replace("\n", " ")
            print(f"  [DRY-RUN] {title}")
            print(f"    Original H2+P: {h2_preview}...")
            print(f"    Table has Address column: {has_address}")
            updated += 1
        else:
            try:
                strapi_put(doc_id, {"tableRichText": new_html})
                print(f"  Updated: {title} (Address col: {has_address})")
                updated += 1
            except urllib.error.HTTPError as e:
                print(f"  FAILED: {title} — HTTP {e.code}")
                failed += 1
            except Exception as e:
                print(f"  FAILED: {title} — {e}")
                failed += 1
            time.sleep(0.2)

    print(f"\nDone! Updated: {updated}, Skipped: {skipped}, Failed: {failed}")
    if dry_run:
        print("(Dry run — no changes made)")


if __name__ == "__main__":
    main()
