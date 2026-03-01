"""
Replace generic core service links with local page links in:
  - servicesTitleDescription
  - servicesModal1-6
  - servicesModalDesc1-6

Core links replaced (exact path only, not sub-paths):
  /roofing        → local roofing page
  /siding         → local siding page
  /windows        → local window page
  /gutters        → local gutter page
  /doors          → local door page
  /decks-and-patios → local deck page

Sub-service links (e.g. /roofing/asphalt-roofing, /siding/vinyl) are kept as-is.
Already-localized links (e.g. /services/crofton-maryland-...) are kept as-is.

Usage:
  python fix_service_links.py                   # dry run
  python fix_service_links.py --execute         # push changes
  python fix_service_links.py --city=Bowie      # single city
  python fix_service_links.py --backup-only     # just backup
"""
import json
import os
import re
import sys
import time
from collections import defaultdict
from pathlib import Path

import requests
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding="utf-8")

load_dotenv(Path(__file__).parent / "migration" / ".env")

STRAPI_URL = os.getenv("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.getenv("STRAPI_API_TOKEN", "")
HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
}

DRY_RUN = "--execute" not in sys.argv
BACKUP_ONLY = "--backup-only" in sys.argv
CITY_FILTER = None
for arg in sys.argv:
    if arg.startswith("--city="):
        CITY_FILTER = arg.split("=", 1)[1]

# Core link path → service type mapping
CORE_LINK_MAP = {
    "/roofing": "roofing",
    "/siding": "siding",
    "/windows": "window",
    "/gutters": "gutter",
    "/doors": "door",
    "/decks-and-patios": "deck",
}

# City name normalization — merge these into a canonical key
CITY_ALIASES = {
    "Ft Washington": "Fort Washington",
    "Fort Washington": "Fort Washington",
    "Ft Meade": "Fort Meade",
    "Fort Meade": "Fort Meade",
    "Mt Airy": "Mount Airy",
    "Mount Airy": "Mount Airy",
    "Mont. Village": "Montgomery Village",
    "Mont Village": "Montgomery Village",
    "Montgomery Village": "Montgomery Village",
    "Mclean": "McLean",
    "McLean": "McLean",
    "Upper Marlboro MD": "Upper Marlboro",
    "Upper Marlboro": "Upper Marlboro",
    "DC": "Washington, DC",
    "Washington, DC": "Washington, DC",
}

# Fields to process
TEXT_FIELDS = (
    ["servicesTitleDescription"]
    + [f"servicesModal{i}" for i in range(1, 7)]
    + [f"servicesModalDesc{i}" for i in range(1, 7)]
)


def fetch_all_pages():
    """Fetch all pages with all relevant fields."""
    all_pages = []
    page = 1
    field_list = ["title", "slug", "serviceType", "documentId"] + TEXT_FIELDS
    while True:
        params = {
            "pagination[pageSize]": 100,
            "pagination[page]": page,
        }
        for i, f in enumerate(field_list):
            params[f"fields[{i}]"] = f
        resp = requests.get(f"{STRAPI_URL}/api/services", params=params, headers=HEADERS)
        resp.raise_for_status()
        data = resp.json()
        all_pages.extend(data["data"])
        if page >= data["meta"]["pagination"]["pageCount"]:
            break
        page += 1
    return all_pages


def parse_city(title):
    """Extract city name from title."""
    if "Washington, DC" in title:
        return "Washington, DC"
    parts = [p.strip() for p in title.split(" - ")]
    if len(parts) >= 2:
        return parts[1]
    return ""


def normalize_city(city):
    """Get canonical city name."""
    return CITY_ALIASES.get(city, city)


def build_city_service_map(pages):
    """Build {canonical_city: {service_type: slug}} mapping."""
    city_services = defaultdict(dict)
    for p in pages:
        city_raw = parse_city(p["title"])
        city = normalize_city(city_raw)
        svc = p.get("serviceType", "") or ""
        slug = p.get("slug", "") or ""
        if city and svc and slug:
            city_services[city][svc] = slug
    return dict(city_services)


def replace_core_links(html, city_slugs):
    """Replace core service links with local page links.

    Only replaces exact matches like href="/roofing" — NOT sub-paths
    like href="/roofing/asphalt-roofing".

    Also handles:
      - Full URLs: https://www.improveitmd.com/decks-and-patios
      - Already-localized links are left alone
    """
    if not html:
        return html

    def replacer(match):
        full_match = match.group(0)
        href_val = match.group(1)

        # Strip full domain if present
        clean = href_val
        if clean.startswith("https://www.improveitmd.com"):
            clean = clean.replace("https://www.improveitmd.com", "")
        elif clean.startswith("http://www.improveitmd.com"):
            clean = clean.replace("http://www.improveitmd.com", "")

        # Skip already-localized links
        if clean.startswith("/services/"):
            return full_match

        # Check if this is an exact core link (not a sub-path)
        if clean in CORE_LINK_MAP:
            svc_type = CORE_LINK_MAP[clean]
            if svc_type in city_slugs:
                new_href = f"/services/{city_slugs[svc_type]}"
                return f'href="{new_href}"'

        return full_match

    # Match href="..." patterns
    updated = re.sub(r'href="([^"]*)"', replacer, html)
    return updated


def push_update(document_id, data_dict):
    """PUT updates to Strapi."""
    url = f"{STRAPI_URL}/api/services/{document_id}"
    resp = requests.put(url, json={"data": data_dict}, headers=HEADERS, timeout=15)
    if resp.status_code == 200:
        return True
    print(f"    STRAPI ERROR {resp.status_code}: {resp.text[:200]}")
    return False


def main():
    if BACKUP_ONLY:
        print("=== BACKUP ONLY MODE ===\n")
    elif DRY_RUN:
        print("=== DRY RUN (use --execute to push) ===\n")
    else:
        print("=== LIVE MODE ===\n")

    # 1. Fetch all pages
    print("Fetching all pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  Found {len(all_pages)} pages\n")

    # 2. Build city → services mapping
    city_map = build_city_service_map(all_pages)
    print(f"  Cities with local pages: {len(city_map)}")

    # 3. Backup
    backup_path = Path(__file__).parent / "service_links_backup.json"
    print(f"  Creating backup at {backup_path}...")
    backup = {}
    for p in all_pages:
        entry = {
            "title": p["title"],
            "documentId": p["documentId"],
        }
        for f in TEXT_FIELDS:
            entry[f] = p.get(f, "")
        backup[p["documentId"]] = entry
    with open(backup_path, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"  Backed up {len(backup)} pages\n")

    if BACKUP_ONLY:
        print("Done. Backup saved.")
        return

    # 4. Process each page
    if CITY_FILTER:
        filter_lower = CITY_FILTER.lower()
        pages_to_process = [p for p in all_pages if filter_lower in p["title"].lower()]
        print(f"  Filtered to city: {CITY_FILTER} ({len(pages_to_process)} pages)\n")
    else:
        pages_to_process = all_pages

    success = 0
    skipped = 0
    errors = 0
    total_links_replaced = 0

    for p in pages_to_process:
        title = p["title"]
        doc_id = p["documentId"]
        city_raw = parse_city(title)
        city = normalize_city(city_raw)

        city_slugs = city_map.get(city, {})
        if not city_slugs:
            skipped += 1
            continue

        # Process each text field
        updates = {}
        page_replacements = 0

        for field in TEXT_FIELDS:
            original = p.get(field, "") or ""
            if not original:
                continue

            updated = replace_core_links(original, city_slugs)
            if updated != original:
                updates[field] = updated
                # Count replacements
                old_links = re.findall(r'href="([^"]*)"', original)
                new_links = re.findall(r'href="([^"]*)"', updated)
                for ol, nl in zip(old_links, new_links):
                    if ol != nl:
                        page_replacements += 1

        if not updates:
            skipped += 1
            continue

        total_links_replaced += page_replacements

        if DRY_RUN:
            print(f"  {title} ({page_replacements} links)")
            for field, new_val in updates.items():
                orig = p.get(field, "") or ""
                old_hrefs = re.findall(r'href="([^"]*)"', orig)
                new_hrefs = re.findall(r'href="([^"]*)"', new_val)
                for oh, nh in zip(old_hrefs, new_hrefs):
                    if oh != nh:
                        print(f"    {field}: {oh} → {nh}")
            success += 1
        else:
            ok = push_update(doc_id, updates)
            if ok:
                print(f"  OK: {title} ({page_replacements} links)")
                success += 1
            else:
                print(f"  FAILED: {title}")
                errors += 1
            time.sleep(0.2)

    print(f"\n=== SUMMARY ===")
    action = "would update" if DRY_RUN else "updated"
    print(f"  {action}: {success} pages")
    print(f"  links replaced: {total_links_replaced}")
    print(f"  skipped (no changes): {skipped}")
    print(f"  errors: {errors}")


if __name__ == "__main__":
    main()
