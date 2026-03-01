"""
Push HOVER inspection HTML tables to Strapi inspectionRichText field.

Reads hover_inspection_data.json, matches to CMS pages by serviceType + city,
and pushes the HTML (H2 + paragraph + table) to the inspectionRichText field.

Usage:
    python push_hover_inspections.py                      # dry run (default)
    python push_hover_inspections.py --execute            # push to Strapi
    python push_hover_inspections.py --limit=5            # process N pages
    python push_hover_inspections.py --city=Bowie         # single city
    python push_hover_inspections.py --service=siding     # single service type
    python push_hover_inspections.py --restore            # restore from backup
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

STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")

HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}

INPUT_JSON = os.path.join(SCRIPT_DIR, "hover_inspection_data.json")
BACKUP_PATH = os.path.join(SCRIPT_DIR, "strapi_inspectionRichText_backup.json")

# Map CMS serviceType values to our data keys
SERVICE_TYPE_MAP = {
    "roofing": "roofing",
    "siding": "siding",
    "gutter": "gutter",
    "door": "door",
}

# City name aliases: CMS title city -> measurement city
CITY_ALIASES = {
    "Ft Washington": "Fort Washington",
    "Ft Meade": "Fort Meade",
    "Mont Village": "Montgomery Village",
    "Mont. Village": "Montgomery Village",
    "Mt Airy": "Mount Airy",
}

# Normalize city from page title (same as update_strapi_tables.py)
TITLE_CITY_NORMALIZE = {
    "Ft Washington": ("Fort Washington", "MD"),
    "Mont Village": ("Montgomery Village", "MD"),
    "Mont. Village": ("Montgomery Village", "MD"),
    "Washington, DC": ("Washington", "DC"),
    "DC": ("Washington", "DC"),
    "Upper Marlboro MD": ("Upper Marlboro", "MD"),
}


# ── Strapi API helpers ──────────────────────────────────────────────────────

def strapi_get(path: str) -> dict:
    """GET from Strapi API."""
    req = urllib.request.Request(
        f"{STRAPI_URL}/api/{path}", headers=HEADERS
    )
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def strapi_put(document_id: str, data: dict) -> dict:
    """PUT to Strapi API."""
    url = f"{STRAPI_URL}/api/services/{document_id}"
    payload = json.dumps({"data": data}).encode()
    req = urllib.request.Request(
        url, data=payload, method="PUT", headers=HEADERS
    )
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def fetch_all_pages() -> list[dict]:
    """Fetch all service pages with inspectionRichText and title."""
    pages = []
    page = 1
    while True:
        params = urllib.parse.urlencode({
            "fields[0]": "title",
            "fields[1]": "slug",
            "fields[2]": "inspectionRichText",
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


# ── Title parsing ───────────────────────────────────────────────────────────

def parse_title(title: str) -> tuple[str, str, str] | None:
    """Parse 'Service - City - ST' into (service_type, city, state).

    Returns the service_type as our key (roofing/siding/gutter/door).
    """
    parts = [p.strip() for p in title.split(" - ")]
    if len(parts) >= 3:
        service_label, city, state = parts[0], parts[1], parts[2]
    elif len(parts) == 2:
        service_label, city, state = parts[0], parts[1], "MD"
    else:
        return None

    # Normalize city name variants
    if city in TITLE_CITY_NORMALIZE:
        city, state = TITLE_CITY_NORMALIZE[city]

    # Map service label to our key
    service_map = {
        "Roofing": "roofing",
        "Siding": "siding",
        "Gutters": "gutter",
        "Doors": "door",
        "Flat Roofing": "roofing",
        "Commercial Roofing": "roofing",
    }

    service_type = service_map.get(service_label)
    if not service_type:
        return None

    return service_type, city, state


# ── Backup / Restore ───────────────────────────────────────────────────────

def backup_pages(pages: list[dict]):
    """Save current inspectionRichText data to backup file."""
    backup = []
    for p in pages:
        irt = p.get("inspectionRichText") or ""
        backup.append({
            "documentId": p["documentId"],
            "title": p["title"],
            "slug": p.get("slug", ""),
            "inspectionRichText": irt,
        })

    with open(BACKUP_PATH, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"Backup saved: {BACKUP_PATH} ({len(backup)} pages)")


def restore_from_backup():
    """Restore inspectionRichText from backup JSON."""
    if not os.path.exists(BACKUP_PATH):
        print(f"No backup found at {BACKUP_PATH}")
        sys.exit(1)

    with open(BACKUP_PATH, encoding="utf-8") as f:
        backup = json.load(f)

    print(f"Restoring {len(backup)} pages from backup...")
    restored = 0
    failed = 0

    for i, entry in enumerate(backup, 1):
        doc_id = entry["documentId"]
        try:
            strapi_put(doc_id, {
                "inspectionRichText": entry["inspectionRichText"]
            })
            print(f"  [{i}/{len(backup)}] Restored: {entry['title']}")
            restored += 1
        except Exception as e:
            print(f"  [{i}/{len(backup)}] FAILED: {entry['title']} — {e}")
            failed += 1
        time.sleep(0.2)

    print(f"\nRestore complete! Restored: {restored}, Failed: {failed}")


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    dry_run = "--execute" not in args
    restore = "--restore" in args
    city_filter = None
    service_filter = None
    limit = None

    for arg in args:
        if arg.startswith("--city="):
            city_filter = arg.split("=", 1)[1]
        elif arg.startswith("--service="):
            service_filter = arg.split("=", 1)[1]
        elif arg.startswith("--limit="):
            limit = int(arg.split("=")[1])

    if restore:
        restore_from_backup()
        return

    if dry_run:
        print("=== DRY RUN (use --execute to push to Strapi) ===\n")
    else:
        print("=== LIVE MODE: pushing to Strapi ===\n")

    # Load inspection data
    if not os.path.exists(INPUT_JSON):
        print(f"Input not found: {INPUT_JSON}")
        print("Run aggregate_hover_tables.py first.")
        sys.exit(1)

    with open(INPUT_JSON, encoding="utf-8") as f:
        inspection_data = json.load(f)

    print(f"Loaded inspection data: {len(inspection_data)} cities")

    # Fetch all Strapi pages
    print("Fetching all pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  Total pages: {len(all_pages)}")

    # Backup before making changes
    if not dry_run:
        backup_pages(all_pages)
        print()

    # Match pages to inspection data
    matched = 0
    skipped = 0
    pushed = 0
    failed = 0
    no_data = 0
    processed = 0

    for p in all_pages:
        title = p["title"]
        doc_id = p["documentId"]

        parsed = parse_title(title)
        if not parsed:
            skipped += 1
            continue

        service_type, city, state = parsed

        # Apply filters
        if city_filter and city_filter.lower() not in city.lower():
            continue
        if service_filter and service_filter != service_type:
            continue

        if limit and processed >= limit:
            break

        # Resolve city alias
        resolved_city = CITY_ALIASES.get(city, city)
        city_key = f"{resolved_city}, {state}"

        # Find in inspection data
        city_data = inspection_data.get(city_key)
        if not city_data:
            no_data += 1
            continue

        service_data = city_data.get(service_type)
        if not service_data:
            no_data += 1
            continue

        # Skip entries where the key stat for this service type is zero
        stats = service_data.get("stats", {})
        skip_zero = False
        if service_type == "siding" and not stats.get("total_siding_sqft"):
            skip_zero = True
        elif service_type == "gutter" and not stats.get("total_gutter_ft") and not stats.get("total_eaves_ft"):
            skip_zero = True
        elif service_type == "door" and not stats.get("total_entry_doors") and not stats.get("total_sliding_glass"):
            skip_zero = True
        elif service_type == "roofing" and not stats.get("total_roof_sqft"):
            skip_zero = True

        if skip_zero:
            no_data += 1
            continue

        html = service_data["html"]
        matched += 1
        processed += 1

        if dry_run:
            h2_preview = service_data["h2"][:80]
            print(f"  [{processed}] MATCH: {title}")
            print(f"       H2: {h2_preview}")
            print(f"       HTML length: {len(html)}")
            pushed += 1
        else:
            try:
                strapi_put(doc_id, {"inspectionRichText": html})
                print(f"  [{processed}] PUSHED: {title}")
                pushed += 1
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
    print(f"  Total CMS pages:     {len(all_pages)}")
    print(f"  Skipped (no match):  {skipped}")
    print(f"  No data available:   {no_data}")
    print(f"  Matched with data:   {matched}")
    print(f"  Pushed/previewed:    {pushed}")
    if failed:
        print(f"  Failed:              {failed}")
    print(f"  Mode:                {'DRY RUN' if dry_run else 'LIVE'}")


if __name__ == "__main__":
    main()
