"""
Update Strapi local-page tableRichText fields:
  1. Back up all current data to a JSON file
  2. Replace the top H2 + paragraph with generated text (per service type)
  3. Add a "Street" column to the warranty table using jobs_processed.csv

Only updates pages that already have a non-empty tableRichText.

Usage:
  python update_strapi_tables.py --dry-run          # preview changes
  python update_strapi_tables.py                     # apply changes
  python update_strapi_tables.py --slug=bowie        # single city
  python update_strapi_tables.py --restore           # restore from backup
"""
import csv
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict

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

SERVICE_DATA_PATH = os.path.join(SCRIPT_DIR, "service_page_data.json")
JOBS_CSV_PATH = os.path.join(SCRIPT_DIR, "jobs_processed.csv")
BACKUP_PATH = os.path.join(SCRIPT_DIR, "strapi_tableRichText_backup.json")

# Map page title prefix → service_page_data.json key
SERVICE_TYPE_MAP = {
    "Roofing": "roof",
    "Gutters": "gutters",
    "Siding": "siding",
    "Windows": "windows",
    "Doors": "windows",  # doors share windows/doors text
    "Deck Builder": None,  # no measurement data for decks
    "Deck Builders": None,
    "Flat Roofing": "roof",
    "Commercial Roofing": "roof",
    "Patio & Hardscapes": None,
}

STATE_NAME_TO_ABBR = {
    "Maryland": "MD",
    "Virginia": "VA",
    "District of Columbia": "DC",
    "Delaware": "DE",
    "Pennsylvania": "PA",
    "West Virginia": "WV",
}

# Normalize city names from page titles to match service_page_data.json keys
TITLE_CITY_NORMALIZE = {
    "Ft Washington": ("Fort Washington", "MD"),
    "Mont Village": ("Montgomery Village", "MD"),
    "Mont. Village": ("Montgomery Village", "MD"),
    "Washington, DC": ("Washington", "DC"),
    "DC": ("Washington", "DC"),
    "Upper Marlboro MD": ("Upper Marlboro", "MD"),
}


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


# ── Street extraction ─────────────────────────────────────────────────────────

def load_addresses_by_city(csv_path: str) -> dict[str, list[str]]:
    """Load unique addresses (street + state, no house number) grouped by 'City, ST'.
    Example: '214 Westdale Drive' in Waldorf, Maryland → 'Westdale Drive, Maryland'
    """
    addresses: dict[str, list[str]] = defaultdict(list)
    seen: dict[str, set] = defaultdict(set)

    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            address = row.get("address", "").strip()
            city = row.get("city", "").strip()
            state_full = row.get("state", "").strip()

            if not address or not city:
                continue

            state_abbr = STATE_NAME_TO_ABBR.get(state_full, state_full)
            if not state_abbr:
                state_abbr = "DC" if city.lower() == "washington" else "MD"

            # Use full state name if available, otherwise abbreviation
            state_display = state_full if state_full else state_abbr

            street = strip_house_number(address)
            if not street:
                continue

            full_addr = f"{street}, {state_display}"
            key = f"{city}, {state_abbr}"
            if full_addr not in seen[key]:
                seen[key].add(full_addr)
                addresses[key].append(full_addr)

    return dict(addresses)


def strip_house_number(address: str) -> str:
    """Remove leading house number from address.
    '214 Westdale Drive' → 'Westdale Drive'
    '4120 13th Place Northeast' → '13th Place Northeast'
    """
    # Remove leading digits (and optional dash/letter suffix like "123A" or "123-B")
    result = re.sub(r'^\d+[A-Za-z]?\s*[-]?\s*', '', address).strip()
    return result


# ── HTML manipulation ─────────────────────────────────────────────────────────

def parse_title(title: str) -> tuple[str, str, str] | None:
    """Parse 'Service - City - ST' into (service_type, city, state).
    Applies city name normalization for variants."""
    parts = [p.strip() for p in title.split(" - ")]
    if len(parts) >= 3:
        service_type, city, state = parts[0], parts[1], parts[2]
    elif len(parts) == 2:
        service_type, city, state = parts[0], parts[1], "MD"
    else:
        return None

    # Normalize city name variants
    if city in TITLE_CITY_NORMALIZE:
        city, state = TITLE_CITY_NORMALIZE[city]

    return service_type, city, state


def build_new_html(
    old_html: str,
    new_h2: str,
    new_paragraph: str,
    city_addresses: list[str],
) -> str:
    """Replace the H2+P at the top, add Street column to the table."""
    # Split into top text and table
    # Find where the table wrapper or <table starts
    table_start = -1
    for marker in ['<div class="table-wrapper">', "<div class='table-wrapper'>", "<table"]:
        idx = old_html.find(marker)
        if idx >= 0:
            table_start = idx
            break

    if table_start < 0:
        # No table found — just replace everything with new text
        return f"<h2>{new_h2}</h2><p>{new_paragraph}</p>"

    table_html = old_html[table_start:]

    # Add Address column to the table
    table_html = add_address_column(table_html, city_addresses)

    return f"<h2>{new_h2}</h2><p>{new_paragraph}</p>{table_html}"


def add_address_column(table_html: str, addresses: list[str]) -> str:
    """Add an 'Address' column to the warranty table."""
    if not addresses:
        return table_html

    # Add header
    table_html = table_html.replace(
        "<th>Warranty Type</th>",
        "<th>Address</th><th>Warranty Type</th>",
        1,
    )

    # Add address data to each body row
    rows = list(re.finditer(r'<tr><td>', table_html))
    result_parts = []
    last_end = 0
    addr_idx = 0

    for match in rows:
        start = match.start()
        result_parts.append(table_html[last_end:start])
        addr = addresses[addr_idx % len(addresses)]
        result_parts.append(f"<tr><td>{addr}</td><td>")
        last_end = match.end()
        addr_idx += 1

    result_parts.append(table_html[last_end:])
    return "".join(result_parts)


# ── Backup / Restore ─────────────────────────────────────────────────────────

def backup_pages(pages: list[dict]):
    """Save current tableRichText data to backup file."""
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

    with open(BACKUP_PATH, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"Backup saved: {BACKUP_PATH} ({len(backup)} pages)")


def restore_from_backup():
    """Restore tableRichText from backup JSON."""
    if not os.path.exists(BACKUP_PATH):
        print(f"No backup found at {BACKUP_PATH}")
        sys.exit(1)

    with open(BACKUP_PATH, encoding="utf-8") as f:
        backup = json.load(f)

    print(f"Restoring {len(backup)} pages from backup...")
    for i, entry in enumerate(backup, 1):
        doc_id = entry["documentId"]
        try:
            strapi_put(doc_id, {"tableRichText": entry["tableRichText"]})
            print(f"  [{i}/{len(backup)}] Restored: {entry['title']}")
        except Exception as e:
            print(f"  [{i}/{len(backup)}] FAILED: {entry['title']} — {e}")
        time.sleep(0.2)

    print("Restore complete!")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    restore = "--restore" in args
    slug_filter = None
    for a in args:
        if a.startswith("--slug="):
            slug_filter = a.split("=", 1)[1]

    if restore:
        restore_from_backup()
        return

    # Load generated service data
    with open(SERVICE_DATA_PATH, encoding="utf-8") as f:
        service_data = json.load(f)

    # Load streets by city
    addresses_by_city = load_addresses_by_city(JOBS_CSV_PATH)

    # Fetch all pages
    print("Fetching all pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  Total pages: {len(all_pages)}")

    # Filter to pages with tableRichText
    pages_with_table = [
        p for p in all_pages
        if (p.get("tableRichText") or "").strip()
    ]
    print(f"  Pages with tableRichText: {len(pages_with_table)}")

    # Backup before making changes
    if not dry_run:
        backup_pages(all_pages)

    # Process each page
    updated = 0
    skipped = 0
    no_data = 0

    for p in pages_with_table:
        title = p["title"]
        doc_id = p["documentId"]
        old_html = p["tableRichText"]

        # Apply slug filter
        if slug_filter and slug_filter.lower() not in title.lower():
            continue

        parsed = parse_title(title)
        if not parsed:
            print(f"  SKIP (can't parse title): {title}")
            skipped += 1
            continue

        service_type, city, state = parsed

        # Get the JSON key for this service type
        data_key = SERVICE_TYPE_MAP.get(service_type)
        if data_key is None:
            skipped += 1
            continue

        # Find city in service_page_data.json
        city_key = f"{city}, {state}"
        city_data = service_data["cities"].get(city_key)
        if not city_data:
            no_data += 1
            continue

        service_section = city_data.get(data_key)
        if not service_section:
            no_data += 1
            continue

        new_h2 = service_section["h2"]
        new_paragraph = service_section["paragraph"]

        # Get streets for this city
        city_addresses = addresses_by_city.get(city_key, [])

        new_html = build_new_html(old_html, new_h2, new_paragraph, city_addresses)

        if dry_run:
            # Show preview
            preview_h2 = new_h2[:80]
            addr_count = len(city_addresses)
            print(f"  [DRY-RUN] {title}")
            print(f"    H2: {preview_h2}")
            print(f"    Addresses available: {addr_count}")
            updated += 1
        else:
            try:
                strapi_put(doc_id, {"tableRichText": new_html})
                print(f"  Updated: {title}")
                updated += 1
            except urllib.error.HTTPError as e:
                print(f"  FAILED: {title} — HTTP {e.code}")
            except Exception as e:
                print(f"  FAILED: {title} — {e}")
            time.sleep(0.2)

    print(f"\nDone! Updated: {updated}, Skipped: {skipped}, No data: {no_data}")
    if dry_run:
        print("(Dry run — no changes made)")


if __name__ == "__main__":
    main()
