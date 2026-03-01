"""
Restructure tableRichText and inspectionRichText HTML for all local pages.

Pulls existing data from Strapi, transforms the HTML structure to use new
CSS classes and data-label attributes on <td> elements, then pushes back.

Changes:
  tableRichText:
    - Wrap table in <div class="table-wrapper"><figure class="table"><table class="warranty-table">
    - Add data-label="Warranty" to 1st <td>, data-label="Size" to 2nd <td>
  inspectionRichText:
    - Wrap table in <div class="inspection-table-wrapper"><figure class="table"><table class="inspection-table">
    - Add data-label="Roof Sq" to 2nd <td>, data-label="Pitch" to 3rd,
      data-label="Facets" to 4th, data-label="Notes" to 5th

Text content (h2, p) and table data (rows) remain unchanged.

Usage:
    python restructure_table_html.py --dry-run          # preview changes
    python restructure_table_html.py --execute           # push to Strapi
    python restructure_table_html.py --slug=pasadena     # single city
    python restructure_table_html.py --limit=5           # process N pages
    python restructure_table_html.py --restore           # restore from backup
"""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime

from bs4 import BeautifulSoup
from dotenv import load_dotenv

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(SCRIPT_DIR, "migration", ".env"))

STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")

HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}

BACKUP_PATH = os.path.join(
    SCRIPT_DIR,
    f"strapi_table_restructure_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
)

# data-label mappings for tableRichText (warranty table)
# Column index -> data-label value (None means no data-label)
WARRANTY_LABELS = {0: "Warranty", 1: "Size", 2: None}

# data-label mappings for inspectionRichText
# Column index -> data-label value (None means no data-label)
INSPECTION_LABELS = {0: None, 1: "Roof Sq", 2: "Pitch", 3: "Facets", 4: "Notes"}


# ── Strapi API helpers ──────────────────────────────────────────────────────

def strapi_get(path: str) -> dict:
    req = urllib.request.Request(
        f"{STRAPI_URL}/api/{path}", headers=HEADERS
    )
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def strapi_put(document_id: str, data: dict) -> dict:
    url = f"{STRAPI_URL}/api/services/{document_id}"
    payload = json.dumps({"data": data}).encode()
    req = urllib.request.Request(
        url, data=payload, method="PUT", headers=HEADERS
    )
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def fetch_all_pages() -> list[dict]:
    """Fetch all service pages with both rich text fields."""
    pages = []
    page = 1
    while True:
        params = urllib.parse.urlencode({
            "fields[0]": "title",
            "fields[1]": "slug",
            "fields[2]": "tableRichText",
            "fields[3]": "inspectionRichText",
            "fields[4]": "documentId",
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


# ── HTML transformation ─────────────────────────────────────────────────────

def transform_table_richtext(html: str) -> str | None:
    """Transform tableRichText to new structure with warranty-table class."""
    if not html or not html.strip():
        return None

    soup = BeautifulSoup(html, "html.parser")

    # Find the table element
    table = soup.find("table")
    if not table:
        return None

    # Extract pre-table content (h2, p, etc.)
    pre_table_elements = []
    for el in soup.children:
        if el == table or (hasattr(el, 'find') and el.find("table")):
            break
        if hasattr(el, 'name') and el.name in ("h2", "h3", "p"):
            pre_table_elements.append(str(el))
        elif isinstance(el, str) and el.strip():
            continue

    # Also check if h2/p are siblings before figure/div wrappers
    if not pre_table_elements:
        for el in soup.children:
            if hasattr(el, 'name'):
                if el.name in ("h2", "h3", "p"):
                    pre_table_elements.append(str(el))
                elif el.name in ("figure", "div", "table"):
                    break

    # Clear existing classes from table
    table.attrs = {}
    table["class"] = ["warranty-table"]

    # Add data-label attributes to body rows
    tbody = table.find("tbody")
    if tbody:
        for tr in tbody.find_all("tr"):
            tds = tr.find_all("td")
            for i, td in enumerate(tds):
                # Remove any existing data-label
                if "data-label" in td.attrs:
                    del td["data-label"]
                label = WARRANTY_LABELS.get(i)
                if label:
                    td["data-label"] = label

    # Build new structure
    table_html = str(table)
    pre_html = "\n".join(pre_table_elements)

    new_html = f"""{pre_html}
<div class="table-wrapper">
    <figure class="table">
        {table_html}
    </figure>
</div>"""

    return new_html.strip()


def transform_inspection_richtext(html: str) -> str | None:
    """Transform inspectionRichText to new structure with inspection-table class."""
    if not html or not html.strip():
        return None

    soup = BeautifulSoup(html, "html.parser")

    # Find the table element
    table = soup.find("table")
    if not table:
        return None

    # Extract pre-table content (h2, p, etc.)
    pre_table_elements = []
    for el in soup.children:
        if el == table or (hasattr(el, 'find') and el.find("table")):
            break
        if hasattr(el, 'name') and el.name in ("h2", "h3", "p"):
            pre_table_elements.append(str(el))

    if not pre_table_elements:
        for el in soup.children:
            if hasattr(el, 'name'):
                if el.name in ("h2", "h3", "p"):
                    pre_table_elements.append(str(el))
                elif el.name in ("figure", "div", "table"):
                    break

    # Clear existing classes from table
    table.attrs = {}
    table["class"] = ["inspection-table"]

    # Add data-label attributes to body rows
    tbody = table.find("tbody")
    if tbody:
        for tr in tbody.find_all("tr"):
            tds = tr.find_all("td")
            for i, td in enumerate(tds):
                # Remove any existing data-label
                if "data-label" in td.attrs:
                    del td["data-label"]
                label = INSPECTION_LABELS.get(i)
                if label:
                    td["data-label"] = label

    # Build new structure
    table_html = str(table)
    pre_html = "\n".join(pre_table_elements)

    new_html = f"""{pre_html}
<div class="inspection-table-wrapper">
    <figure class="table">
        {table_html}
    </figure>
</div>"""

    return new_html.strip()


# ── Backup / Restore ────────────────────────────────────────────────────────

def backup_pages(pages: list[dict], backup_path: str):
    """Save current data to backup file."""
    backup = []
    for p in pages:
        entry = {
            "documentId": p["documentId"],
            "title": p["title"],
            "slug": p.get("slug", ""),
        }
        trt = p.get("tableRichText") or ""
        irt = p.get("inspectionRichText") or ""
        if trt or irt:
            entry["tableRichText"] = trt
            entry["inspectionRichText"] = irt
            backup.append(entry)

    with open(backup_path, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"Backup saved: {backup_path} ({len(backup)} pages)")
    return backup_path


def restore_from_backup():
    """Restore from the most recent backup file."""
    # Find latest backup
    backups = sorted(
        [f for f in os.listdir(SCRIPT_DIR) if f.startswith("strapi_table_restructure_backup_")],
        reverse=True,
    )
    if not backups:
        print("No backup files found!")
        sys.exit(1)

    backup_file = os.path.join(SCRIPT_DIR, backups[0])
    print(f"Restoring from: {backup_file}")

    with open(backup_file, encoding="utf-8") as f:
        backup = json.load(f)

    print(f"Restoring {len(backup)} pages...")
    restored = 0
    failed = 0

    for i, entry in enumerate(backup, 1):
        doc_id = entry["documentId"]
        update_data = {}
        if entry.get("tableRichText"):
            update_data["tableRichText"] = entry["tableRichText"]
        if entry.get("inspectionRichText"):
            update_data["inspectionRichText"] = entry["inspectionRichText"]

        if not update_data:
            continue

        try:
            strapi_put(doc_id, update_data)
            print(f"  [{i}/{len(backup)}] Restored: {entry['title']}")
            restored += 1
        except Exception as e:
            print(f"  [{i}/{len(backup)}] FAILED: {entry['title']} — {e}")
            failed += 1
        time.sleep(0.2)

    print(f"\nRestore complete! Restored: {restored}, Failed: {failed}")


# ── Main ────────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    dry_run = "--execute" not in args
    restore = "--restore" in args
    slug_filter = None
    limit = None

    for arg in args:
        if arg.startswith("--slug="):
            slug_filter = arg.split("=", 1)[1]
        elif arg.startswith("--limit="):
            limit = int(arg.split("=", 1)[1])

    if restore:
        restore_from_backup()
        return

    if dry_run:
        print("=== DRY RUN (use --execute to push to Strapi) ===\n")
    else:
        print("=== LIVE MODE: pushing to Strapi ===\n")

    # Fetch all pages
    print("Fetching all pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  Total pages: {len(all_pages)}")

    # Count pages with content
    pages_with_table = sum(1 for p in all_pages if (p.get("tableRichText") or "").strip())
    pages_with_inspection = sum(1 for p in all_pages if (p.get("inspectionRichText") or "").strip())
    print(f"  Pages with tableRichText: {pages_with_table}")
    print(f"  Pages with inspectionRichText: {pages_with_inspection}")
    print()

    # Backup before making changes
    if not dry_run:
        backup_pages(all_pages, BACKUP_PATH)
        print()

    # Process pages
    table_updated = 0
    table_skipped = 0
    inspection_updated = 0
    inspection_skipped = 0
    failed = 0
    processed = 0

    for p in all_pages:
        title = p["title"]
        doc_id = p["documentId"]
        slug = p.get("slug", "")

        # Apply filters
        if slug_filter and slug_filter.lower() not in slug.lower() and slug_filter.lower() not in title.lower():
            continue

        old_table = (p.get("tableRichText") or "").strip()
        old_inspection = (p.get("inspectionRichText") or "").strip()

        if not old_table and not old_inspection:
            continue

        if limit and processed >= limit:
            break

        processed += 1
        update_data = {}

        # Transform tableRichText
        if old_table:
            new_table = transform_table_richtext(old_table)
            if new_table:
                update_data["tableRichText"] = new_table
                table_updated += 1
            else:
                table_skipped += 1

        # Transform inspectionRichText
        if old_inspection:
            new_inspection = transform_inspection_richtext(old_inspection)
            if new_inspection:
                update_data["inspectionRichText"] = new_inspection
                inspection_updated += 1
            else:
                inspection_skipped += 1

        if not update_data:
            continue

        if dry_run:
            fields = ", ".join(update_data.keys())
            print(f"  [{processed}] {title}")
            print(f"       Fields: {fields}")
            if "tableRichText" in update_data:
                preview = update_data["tableRichText"][:120].replace("\n", " ")
                print(f"       tableRichText preview: {preview}...")
            if "inspectionRichText" in update_data:
                preview = update_data["inspectionRichText"][:120].replace("\n", " ")
                print(f"       inspectionRichText preview: {preview}...")
        else:
            try:
                strapi_put(doc_id, update_data)
                fields = ", ".join(update_data.keys())
                print(f"  [{processed}] PUSHED: {title} ({fields})")
            except urllib.error.HTTPError as e:
                body = e.read().decode()[:200]
                print(f"  [{processed}] FAILED: {title} — HTTP {e.code}: {body}")
                failed += 1
            except Exception as e:
                print(f"  [{processed}] FAILED: {title} — {e}")
                failed += 1
            time.sleep(0.2)

    print(f"\n{'=' * 60}")
    print("SUMMARY")
    print(f"{'=' * 60}")
    print(f"  Total pages:                  {len(all_pages)}")
    print(f"  Processed:                    {processed}")
    print(f"  tableRichText transformed:    {table_updated}")
    print(f"  tableRichText skipped:        {table_skipped}")
    print(f"  inspectionRichText transformed: {inspection_updated}")
    print(f"  inspectionRichText skipped:   {inspection_skipped}")
    if failed:
        print(f"  Failed:                       {failed}")
    print(f"  Mode: {'DRY RUN' if dry_run else 'LIVE'}")
    if not dry_run:
        print(f"  Backup: {BACKUP_PATH}")


if __name__ == "__main__":
    main()
