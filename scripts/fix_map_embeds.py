"""
Fix mapSection field across all Strapi local pages.

Issues found:
  - 43 pages: empty mapSection (need full content + iframe)
  - 19 pages: old map mid (need new mid + city coords)
  -  1 page:  new mid but missing coordinates
  -  3 pages: HTML-encoded &amp; in iframe src

Usage:
  python fix_map_embeds.py                    # dry run
  python fix_map_embeds.py --execute          # push changes
  python fix_map_embeds.py --backup-only      # just create backup
  python fix_map_embeds.py --city=Bowie       # single city
"""
import csv
import json
import os
import re
import sys
import time
from collections import Counter, defaultdict
from pathlib import Path

import requests
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding="utf-8")

load_dotenv(Path(__file__).parent / "migration" / ".env")

STRAPI_URL = os.getenv("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.getenv("STRAPI_API_TOKEN", "")
ANTHROPIC_KEY = os.getenv("ANTHROPIC_API_KEY", "")

HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
}

NEW_MAP_MID = "10zevQxZd3uDXmovt2-bhd4AVDeVb0Rg"
IFRAME_TEMPLATE = (
    '<div class="responsive-map">\n'
    '    <iframe style="border-width:0;" '
    'src="https://www.google.com/maps/d/u/0/embed?mid={mid}&ehbc=2E312F&noprof=1&ll={lat},{lng}&z={zoom}" '
    'width="640" height="480" frameborder="0"></iframe>\n'
    '</div>'
)

DRY_RUN = "--execute" not in sys.argv
BACKUP_ONLY = "--backup-only" in sys.argv
CITY_FILTER = None
for arg in sys.argv:
    if arg.startswith("--city="):
        CITY_FILTER = arg.split("=", 1)[1]

# Service type descriptions for H2
SERVICE_DESC = {
    "Roofing": "Roof Replacements",
    "Siding": "Siding Installations",
    "Windows": "Window Replacements",
    "Gutters": "Gutter Installations",
    "Doors": "Door Replacements",
    "Deck Builder": "Deck Builds",
    "Deck Builders": "Deck Builds",
    "Commercial Roofing": "Commercial Roof Replacements",
    "Flat Roofing": "Flat Roof Replacements",
    "Patio & Hardscapes": "Patio & Hardscape Projects",
}

# Title normalization for city extraction
TITLE_CITY_NORMALIZE = {
    "Ft Washington": "Fort Washington",
    "Ft Meade": "Fort Meade",
    "Mt Airy": "Mount Airy",
    "Mont. Village": "Montgomery Village",
    "Mont Village": "Montgomery Village",
}

# State full names
STATE_MAP = {
    "MD": "Maryland",
    "VA": "Virginia",
    "DC": "District of Columbia",
}


def fetch_all_pages():
    """Fetch all service pages from Strapi."""
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


def load_city_coords():
    """Load city coordinates from jobs CSV and existing good pages."""
    coords = {}

    # From jobs_city_totals.csv
    csv_path = Path(__file__).parent / "jobs_city_totals.csv"
    if csv_path.exists():
        with open(csv_path, "r", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                city = row.get("city", "").strip()
                lat = row.get("latitude", "").strip()
                lng = row.get("longitude", "").strip()
                if city and lat and lng:
                    coords[city.lower()] = (lat, lng)

    return coords


def load_job_counts():
    """Load per-city per-service job counts from jobs_processed.csv."""
    trade_map = {
        "ROOFING": "Roofing",
        "SIDING": "Siding",
        "WINDOWS": "Windows",
        "GUTTERS": "Gutters",
        "DOORS": "Doors",
        "DECKING": "Deck Builder",
        "DECK": "Deck Builder",
    }

    counts = defaultdict(lambda: defaultdict(int))
    totals = defaultdict(int)

    csv_path = Path(__file__).parent / "jobs_processed.csv"
    if csv_path.exists():
        with open(csv_path, "r", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                city = row.get("city", "").strip()
                trade = row.get("tradeName", "").upper().strip()
                if not city:
                    continue
                totals[city.lower()] += 1
                for key, svc in trade_map.items():
                    if key in trade:
                        counts[city.lower()][svc] += 1
                        break

    return counts, totals


def parse_title(title):
    """Extract service type, city, state from title like 'Roofing - Bowie - MD'."""
    # Handle "Washington, DC" specially
    if "Washington, DC" in title:
        service = title.split(" - ")[0].strip()
        return service, "Washington", "DC"

    parts = [p.strip() for p in title.split(" - ")]
    if len(parts) >= 3:
        service = parts[0]
        city = parts[1]
        state = parts[2]
        return service, city, state
    elif len(parts) == 2:
        # State-level pages like "Roofing - Maryland" or "Doors - Virginia"
        service = parts[0]
        loc = parts[1]
        if loc in ("Maryland", "Virginia", "DC"):
            return service, loc, loc
        # e.g. "Deck Builder - Upper Marlboro MD"
        m = re.match(r"(.+?)\s+(MD|VA|DC)$", loc)
        if m:
            return service, m.group(1).strip(), m.group(2)
        return service, loc, ""
    return parts[0] if parts else "", "", ""


def get_city_key(city):
    """Normalize city name for lookup."""
    normalized = TITLE_CITY_NORMALIZE.get(city, city)
    return normalized.lower()


def get_coords_for_page(title, city_coords, all_coords_from_pages):
    """Get lat/lng for a page title."""
    service, city, state = parse_title(title)
    city_key = get_city_key(city)

    # Try from CSV first
    if city_key in city_coords:
        return city_coords[city_key]

    # Try from existing good pages
    if city_key in all_coords_from_pages:
        return all_coords_from_pages[city_key]

    # Hardcoded fallbacks for special cases
    fallbacks = {
        "washington, dc": ("38.898941", "-76.938428"),
        "dc": ("38.898941", "-76.938428"),
        "maryland": ("38.9072", "-77.0369"),
        "virginia": ("38.85", "-77.25"),
        "district of columbia": ("38.898941", "-76.938428"),
    }
    if city_key in fallbacks:
        return fallbacks[city_key]

    return None


def extract_coords_from_pages(pages):
    """Extract city->coords mapping from pages that already have good map embeds."""
    coords = {}
    for p in pages:
        ms = p.get("mapSection", "") or ""
        if not ms or NEW_MAP_MID not in ms:
            continue
        iframes = re.findall(r'<iframe[^>]*src=["\']([^"\']+)["\'][^>]*>', ms)
        if not iframes:
            continue
        src = iframes[0]
        ll_match = re.search(r"ll=([^&]+)", src)
        z_match = re.search(r"[&?]z=([^&\"]+)", src)
        if ll_match:
            lat_lng = ll_match.group(1)
            parts_title = parse_title(p["title"])
            city_key = get_city_key(parts_title[1])
            if city_key not in coords:
                lat, lng = lat_lng.split(",", 1) if "," in lat_lng else (lat_lng, "")
                coords[city_key] = (lat, lng)
    return coords


def build_iframe(lat, lng, zoom="12"):
    """Build the standard iframe HTML."""
    return IFRAME_TEMPLATE.format(
        mid=NEW_MAP_MID, lat=lat, lng=lng, zoom=zoom
    )


def fix_old_mid_page(html, lat, lng):
    """Replace old/bad iframe with clean new one, keeping H2 and paragraph."""
    new_iframe = build_iframe(lat, lng)
    # Try to replace the responsive-map div
    updated = re.sub(
        r'<div\s+class="responsive-map"[^>]*>.*?</div>',
        new_iframe,
        html,
        flags=re.DOTALL,
    )
    if updated != html:
        return updated

    # Fallback: replace just the iframe tag and wrap in div
    new_tag = (
        f'<iframe style="border-width:0;" '
        f'src="https://www.google.com/maps/d/u/0/embed?mid={NEW_MAP_MID}'
        f'&ehbc=2E312F&noprof=1&ll={lat},{lng}&z=12" '
        f'width="640" height="480" frameborder="0"></iframe>'
    )
    updated = re.sub(
        r'<iframe[^>]*>.*?</iframe>',
        new_tag,
        html,
        flags=re.DOTALL,
    )
    return updated


def fix_missing_coords(html, lat, lng):
    """Add &ll=LAT,LNG&z=12 to an iframe that's missing coordinates."""
    def add_coords(match):
        src = match.group(0)
        # Add before the closing quote
        if "&ll=" not in src and "&amp;ll=" not in src:
            src = src.rstrip('"\'')
            src += f"&ll={lat},{lng}&z=12"
        return src

    return re.sub(
        r'src="https://www\.google\.com/maps/d/[^"]*"',
        add_coords,
        html,
    )


def fix_html_encoding(html):
    """Fix &amp; encoding in iframe src."""
    def fix_src(match):
        src = match.group(1)
        fixed = src.replace("&amp;", "&")
        return f'src="{fixed}"'

    return re.sub(
        r'src="(https://www\.google\.com/maps/d/[^"]*)"',
        fix_src,
        html,
    )


def generate_map_content(title, city, state, service, job_count, lat, lng):
    """Use Claude to generate H2 + paragraph, then append iframe."""
    state_full = STATE_MAP.get(state, state)
    svc_desc = SERVICE_DESC.get(service, service)
    # Display name for city (e.g., "Washington, DC" not "Washington")
    display_city = "Washington, DC" if city == "Washington" and state == "DC" else city

    prompt = f"""Write a single paragraph (3-4 sentences) for a home improvement company's local service page map section.

City: {city}, {state_full}
Service: {svc_desc}
Job count: {job_count}

The paragraph should:
- Start with "Each pin represents a {city} homeowner"
- Mention 3-4 specific neighborhoods/areas in {city}
- Reference the service type naturally
- Mention HOA guidelines if relevant
- Be professional, factual, and specific to {city}

Return ONLY the paragraph text, no HTML tags."""

    try:
        resp = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": ANTHROPIC_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            json={
                "model": "claude-haiku-4-5-20251001",
                "max_tokens": 300,
                "messages": [{"role": "user", "content": prompt}],
            },
            timeout=30,
        )
        resp.raise_for_status()
        paragraph = resp.json()["content"][0]["text"].strip()
    except Exception as e:
        print(f"    AI generation failed for {title}: {e}")
        paragraph = (
            f"Each pin represents a {city} homeowner who trusted us with their "
            f"{svc_desc.lower()}. We've served families across {city}, {state_full} "
            f"with expert guidance and honest recommendations."
        )

    h2_text = (
        f"\U0001f4cd {job_count}+ {display_city} Homeowners Have Trusted Us for "
        f"{svc_desc}, Expert Guidance, and Honest Recommendations"
    )

    iframe_html = build_iframe(lat, lng)

    html = (
        f"<h2>\n    {h2_text}\n</h2>\n"
        f"<p>{paragraph}</p>\n"
        f"{iframe_html}"
    )
    return html


def categorize_pages(pages):
    """Categorize pages by issue type."""
    empty = []
    bad_iframe = []  # old mid, missing coords, or HTML-encoded — all get iframe rebuilt
    good = []

    for p in pages:
        ms = p.get("mapSection", "") or ""

        if not ms.strip():
            empty.append(p)
            continue

        iframes = re.findall(r'<iframe[^>]*src=["\']([^"\']+)["\'][^>]*>', ms)
        if not iframes:
            empty.append(p)  # Has content but no iframe
            continue

        src = iframes[0]
        is_old_mid = NEW_MAP_MID not in src
        has_html_encoding = "&amp;" in src
        missing_coords = "&ll=" not in src and "&amp;ll=" not in src

        if is_old_mid or has_html_encoding or missing_coords:
            reason = []
            if is_old_mid:
                reason.append("old_mid")
            if has_html_encoding:
                reason.append("html_encoded")
            if missing_coords:
                reason.append("no_coords")
            p["_fix_reason"] = "+".join(reason)
            bad_iframe.append(p)
        else:
            good.append(p)

    return {
        "empty": empty,
        "bad_iframe": bad_iframe,
        "good": good,
    }


def push_update(document_id, map_section):
    """PUT updated mapSection to Strapi."""
    url = f"{STRAPI_URL}/api/services/{document_id}"
    resp = requests.put(url, json={"data": {"mapSection": map_section}}, headers=HEADERS, timeout=15)
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

    # 2. Backup
    backup_path = Path(__file__).parent / "map_section_backup.json"
    print(f"Creating backup at {backup_path}...")
    backup = {}
    for p in all_pages:
        backup[p["documentId"]] = {
            "title": p["title"],
            "documentId": p["documentId"],
            "mapSection": p.get("mapSection", ""),
        }
    with open(backup_path, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"  Backed up {len(backup)} pages\n")

    if BACKUP_ONLY:
        print("Done. Backup saved.")
        return

    # 3. Load reference data
    print("Loading reference data...")
    city_coords = load_city_coords()
    job_counts, job_totals = load_job_counts()
    page_coords = extract_coords_from_pages(all_pages)
    print(f"  City coords from CSV: {len(city_coords)}")
    print(f"  City coords from pages: {len(page_coords)}")
    print(f"  Job counts: {len(job_counts)} cities\n")

    # 4. Categorize
    cats = categorize_pages(all_pages)
    print(f"=== Page Categories ===")
    print(f"  Good (no fix needed):  {len(cats['good'])}")
    print(f"  Bad iframe (rebuild):  {len(cats['bad_iframe'])}")
    print(f"  Empty mapSection:      {len(cats['empty'])}")
    print()

    if cats["bad_iframe"]:
        reasons = Counter(p.get("_fix_reason", "?") for p in cats["bad_iframe"])
        for reason, cnt in reasons.most_common():
            print(f"    {reason}: {cnt}")
        print()

    # Apply city filter
    if CITY_FILTER:
        filter_lower = CITY_FILTER.lower()
        for key in cats:
            cats[key] = [p for p in cats[key] if filter_lower in p["title"].lower()]
        print(f"  Filtered to city: {CITY_FILTER}")
        total = sum(len(v) for v in cats.values())
        print(f"  Pages matching: {total}\n")

    success = 0
    errors = 0
    skipped = 0

    # 5. Fix bad iframe pages — rebuild the iframe div with correct URL
    if cats["bad_iframe"]:
        print(f"\n--- Fixing {len(cats['bad_iframe'])} BAD IFRAME pages ---")
        for p in cats["bad_iframe"]:
            title = p["title"]
            reason = p.get("_fix_reason", "?")
            service, city, state = parse_title(title)
            coords = get_coords_for_page(title, city_coords, page_coords)

            if not coords:
                print(f"  SKIP (no coords): {title}")
                skipped += 1
                continue

            lat, lng = coords
            # Replace the entire iframe div with a clean one
            updated = fix_old_mid_page(p["mapSection"], lat, lng)

            if updated == p["mapSection"]:
                print(f"  WARNING: No change for {title}")
                errors += 1
                continue

            if DRY_RUN:
                old_iframe = re.search(r'src="([^"]*)"', p["mapSection"])
                new_iframe = re.search(r'src="([^"]*)"', updated)
                print(f"  [{reason}] {title}")
                print(f"    OLD: {old_iframe.group(1)[:120] if old_iframe else 'N/A'}")
                print(f"    NEW: {new_iframe.group(1)[:120] if new_iframe else 'N/A'}")
                success += 1
            else:
                ok = push_update(p["documentId"], updated)
                if ok:
                    print(f"  OK [{reason}]: {title}")
                    success += 1
                else:
                    print(f"  FAILED: {title}")
                    errors += 1
                time.sleep(0.3)

    # 6. Fill empty pages
    if cats["empty"]:
        print(f"\n--- Generating content for {len(cats['empty'])} EMPTY pages ---")
        for p in cats["empty"]:
            title = p["title"]
            service, city, state = parse_title(title)
            coords = get_coords_for_page(title, city_coords, page_coords)

            if not coords:
                print(f"  SKIP (no coords): {title}")
                skipped += 1
                continue

            lat, lng = coords
            city_key = get_city_key(city)
            svc_key = service

            # Get job count
            count = job_counts.get(city_key, {}).get(svc_key, 0)
            if count == 0:
                count = job_totals.get(city_key, 0)
            if count == 0:
                count = 5  # minimum fallback

            content = generate_map_content(title, city, state, service, count, lat, lng)

            if DRY_RUN:
                preview = content[:200].replace('\n', '\\n')
                print(f"  {title} ({count} jobs, coords={lat},{lng})")
                print(f"    Preview: {preview}...")
                success += 1
            else:
                ok = push_update(p["documentId"], content)
                if ok:
                    print(f"  OK: {title} ({count} jobs)")
                    success += 1
                else:
                    print(f"  FAILED: {title}")
                    errors += 1
                time.sleep(1)  # slower for AI-generated content

    # Summary
    print(f"\n=== SUMMARY ===")
    action = "would fix" if DRY_RUN else "fixed"
    print(f"  {action}: {success}")
    print(f"  errors:  {errors}")
    print(f"  skipped: {skipped}")


if __name__ == "__main__":
    main()
