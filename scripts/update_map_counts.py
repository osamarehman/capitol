"""
Update mapSection H2 job counts across all Strapi local pages.

Compares the number shown in the H2 (e.g. "📍 434+ Bowie Homeowners…") with
actual totals from jobs_processed copy.csv and updates where they differ.

Usage:
    python update_map_counts.py                    # dry run
    python update_map_counts.py --execute          # push changes
    python update_map_counts.py --city=Bowie       # single city
    python update_map_counts.py --limit=3          # first N pages
    python update_map_counts.py --restore          # restore from backup
"""
import csv
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

TITLE_CITY_NORMALIZE = {
    "Ft Washington": "Fort Washington",
    "Ft Meade": "Fort Meade",
    "Mt Airy": "Mount Airy",
    "Mont. Village": "Montgomery Village",
    "Mont Village": "Montgomery Village",
}

# CLI args
DRY_RUN = "--execute" not in sys.argv
RESTORE_MODE = "--restore" in sys.argv
CITY_FILTER = None
LIMIT = None
for arg in sys.argv:
    if arg.startswith("--city="):
        CITY_FILTER = arg.split("=", 1)[1]
    elif arg.startswith("--limit="):
        LIMIT = int(arg.split("=", 1)[1])


def fetch_all_pages():
    """Fetch all service pages with title, mapSection, documentId."""
    all_pages = []
    page = 1
    while True:
        resp = requests.get(f"{STRAPI_URL}/api/services", params={
            "fields[0]": "title",
            "fields[1]": "mapSection",
            "fields[2]": "documentId",
            "pagination[pageSize]": 100,
            "pagination[page]": page,
        }, headers=HEADERS)
        resp.raise_for_status()
        data = resp.json()
        all_pages.extend(data["data"])
        if page >= data["meta"]["pagination"]["pageCount"]:
            break
        page += 1
    return all_pages


def load_job_totals():
    """Load per-city total job counts from 'jobs_processed copy.csv'."""
    totals = defaultdict(int)
    csv_path = Path(__file__).parent / "jobs_processed copy.csv"
    if not csv_path.exists():
        print(f"  ERROR: {csv_path} not found")
        return totals

    with open(csv_path, "r", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            city = row.get("city", "").strip()
            if city:
                totals[city.lower()] += 1

    return totals


def parse_title(title):
    """Extract service, city, state from title like 'Roofing - Bowie - MD'."""
    if "Washington, DC" in title:
        service = title.split(" - ")[0].strip()
        return service, "Washington", "DC"

    parts = [p.strip() for p in title.split(" - ")]
    if len(parts) >= 3:
        return parts[0], parts[1], parts[2]
    elif len(parts) == 2:
        service = parts[0]
        loc = parts[1]
        if loc in ("Maryland", "Virginia", "DC"):
            return service, loc, loc
        m = re.match(r"(.+?)\s+(MD|VA|DC)$", loc)
        if m:
            return service, m.group(1).strip(), m.group(2)
        return service, loc, ""
    return parts[0] if parts else "", "", ""


def get_city_key(city):
    """Normalize city name for lookup."""
    normalized = TITLE_CITY_NORMALIZE.get(city, city)
    return normalized.lower()


def extract_h2_count(map_section):
    """Extract the job count number from the H2 in mapSection.
    Returns (count_int, match_object) or (None, None)."""
    if not map_section:
        return None, None

    # Find the H2 tag content
    h2_match = re.search(r"<h2[^>]*>(.*?)</h2>", map_section, re.DOTALL)
    if not h2_match:
        return None, None

    h2_text = h2_match.group(1)

    # Find the first number (the job count) — may have + suffix
    num_match = re.search(r"(\d+)\+?", h2_text)
    if not num_match:
        return None, None

    count = int(num_match.group(1))
    return count, h2_match


def replace_h2_count(map_section, new_count):
    """Replace only the job count number in the H2, preserving everything else.

    Handles both formats and normalizes to "N+" style:
      - "📍 434+ Bowie…"      → keeps "N+"
      - "📍 Over 220 Bowie…"  → converts to "N+"
    """
    def replace_in_h2(h2_match):
        h2_full = h2_match.group(0)
        # Try "N+" format first
        updated = re.sub(r"(\d+)(\+)", f"{new_count}\\2", h2_full, count=1)
        if updated != h2_full:
            return updated
        # Try "Over N" format — replace with "N+" style
        updated = re.sub(r"Over\s+\d+", f"{new_count}+", h2_full, count=1, flags=re.IGNORECASE)
        if updated != h2_full:
            return updated
        return h2_full

    return re.sub(r"<h2[^>]*>.*?</h2>", replace_in_h2, map_section, count=1, flags=re.DOTALL)


def push_update(document_id, map_section):
    """PUT updated mapSection to Strapi."""
    url = f"{STRAPI_URL}/api/services/{document_id}"
    resp = requests.put(url, json={"data": {"mapSection": map_section}}, headers=HEADERS, timeout=15)
    if resp.status_code == 200:
        return True
    print(f"    STRAPI ERROR {resp.status_code}: {resp.text[:200]}")
    return False


def create_backup(pages):
    """Save mapSection backup with timestamp."""
    ts = time.strftime("%Y%m%d")
    backup_path = Path(__file__).parent / f"map_section_count_backup_{ts}.json"
    backup = {}
    for p in pages:
        backup[p["documentId"]] = {
            "title": p["title"],
            "documentId": p["documentId"],
            "mapSection": p.get("mapSection", ""),
        }
    with open(backup_path, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"  Backup saved to {backup_path} ({len(backup)} pages)\n")
    return backup_path


def restore_from_backup():
    """Restore mapSection from most recent backup."""
    backups = sorted(Path(__file__).parent.glob("map_section_count_backup_*.json"), reverse=True)
    if not backups:
        print("ERROR: No backup files found")
        return

    backup_path = backups[0]
    print(f"Restoring from {backup_path}...")

    with open(backup_path, "r", encoding="utf-8") as f:
        backup = json.load(f)

    restored = 0
    failed = 0
    for doc_id, entry in backup.items():
        ok = push_update(doc_id, entry["mapSection"])
        if ok:
            restored += 1
            print(f"  OK: {entry['title']}")
        else:
            failed += 1
            print(f"  FAILED: {entry['title']}")
        time.sleep(0.3)

    print(f"\nRestored: {restored}, Failed: {failed}")


def main():
    if RESTORE_MODE:
        print("=== RESTORE MODE ===\n")
        restore_from_backup()
        return

    if DRY_RUN:
        print("=== DRY RUN (use --execute to push) ===\n")
    else:
        print("=== LIVE MODE ===\n")

    # 1. Fetch all pages
    print("Fetching all pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  Found {len(all_pages)} pages\n")

    # 2. Load job totals
    print("Loading job totals from CSV...")
    job_totals = load_job_totals()
    print(f"  {len(job_totals)} cities, {sum(job_totals.values())} total jobs\n")

    # 3. Backup
    print("Creating backup...")
    create_backup(all_pages)

    # 4. Compare and update
    print("Comparing H2 counts with CSV totals...\n")

    updated = 0
    skipped = 0
    no_h2 = 0
    no_csv = 0
    matched = 0
    errors = 0

    pages_to_process = all_pages

    # Apply city filter
    if CITY_FILTER:
        filter_lower = CITY_FILTER.lower()
        pages_to_process = [p for p in pages_to_process if filter_lower in p["title"].lower()]
        print(f"  Filtered to {len(pages_to_process)} pages matching '{CITY_FILTER}'\n")

    if LIMIT:
        pages_to_process = pages_to_process[:LIMIT]
        print(f"  Limited to {LIMIT} pages\n")

    for p in pages_to_process:
        title = p["title"]
        map_section = p.get("mapSection", "") or ""
        service, city, state = parse_title(title)
        city_key = get_city_key(city)

        # Skip state-level pages
        if city.lower() in ("maryland", "virginia", "dc"):
            skipped += 1
            continue

        # Extract current count from H2
        current_count, h2_match = extract_h2_count(map_section)
        if current_count is None:
            no_h2 += 1
            continue

        # Look up CSV count
        csv_count = job_totals.get(city_key, 0)
        if csv_count == 0:
            no_csv += 1
            continue

        # Compare
        if current_count == csv_count:
            matched += 1
            continue

        # Build updated mapSection
        new_map_section = replace_h2_count(map_section, csv_count)

        if new_map_section == map_section:
            print(f"  WARNING: regex didn't change anything for {title}")
            errors += 1
            continue

        if DRY_RUN:
            print(f"  {title}")
            print(f"    {current_count} → {csv_count}")
            updated += 1
        else:
            ok = push_update(p["documentId"], new_map_section)
            if ok:
                print(f"  OK: {title}  ({current_count} → {csv_count})")
                updated += 1
            else:
                print(f"  FAILED: {title}")
                errors += 1
            time.sleep(0.3)

    # Summary
    action = "would update" if DRY_RUN else "updated"
    print(f"\n{'=' * 50}")
    print("SUMMARY")
    print(f"{'=' * 50}")
    print(f"  {action}:     {updated}")
    print(f"  already correct: {matched}")
    print(f"  no H2 count:     {no_h2}")
    print(f"  no CSV data:     {no_csv}")
    print(f"  skipped:         {skipped}")
    if errors:
        print(f"  errors:          {errors}")


if __name__ == "__main__":
    main()
