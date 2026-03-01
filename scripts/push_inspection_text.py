"""
Push AI-generated inspection text to Strapi inspectionRichText field.

Reads QuickMeasure measurement data, matches to CMS pages by city + serviceType,
generates polished copy via Anthropic Claude, and pushes to Strapi.

Usage:
    python push_inspection_text.py                    # dry run (default)
    python push_inspection_text.py --execute          # actually push to Strapi
    python push_inspection_text.py --limit=5          # process only 5 pages
    python push_inspection_text.py --city="Bowie"     # single city
    python push_inspection_text.py --skip-ai          # skip AI, use template text
"""
import csv
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from collections import defaultdict
from dotenv import load_dotenv

# Load env from migration/.env
load_dotenv(os.path.join(os.path.dirname(__file__), "migration", ".env"))

STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

CSV_PATH = os.path.join(os.path.dirname(__file__), "quickmeasure_measurements.csv")
PAGES_DUMP = os.path.join(os.path.dirname(__file__), "strapi_pages_dump.json")
OUTPUT_LOG = os.path.join(os.path.dirname(__file__), "inspection_text_push_log.json")

# City name normalization: CMS name -> measurement name
CITY_ALIASES = {
    "Ft Washington": "Fort Washington",
    "Ft Meade": "Fort Meade",
    "Mont Village": "Montgomery Village",
}

HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}


def load_measurements() -> dict:
    """Load and aggregate measurements by city, state."""
    city_data = defaultdict(lambda: {
        "properties": 0,
        "roof_area_sqft": 0,
        "roof_squares": 0,
        "valleys_ft": 0,
        "ridges_hips_ft": 0,
        "rakes_ft": 0,
        "eaves_ft": 0,
        "facets": 0,
    })

    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            key = f"{row['city']}, {row['state']}"
            d = city_data[key]
            d["properties"] += 1
            d["roof_area_sqft"] += float(row["roof_area_sqft"])
            d["roof_squares"] += float(row["roof_area_sqft"]) / 100
            d["valleys_ft"] += float(row["valleys_ft"])
            d["ridges_hips_ft"] += float(row["ridges_hips_ft"])
            d["rakes_ft"] += float(row["rakes_ft"])
            d["eaves_ft"] += float(row["eaves_ft"])
            d["facets"] += int(float(row["roof_facets"]))

    return dict(city_data)


def resolve_city(cms_city: str) -> str:
    """Resolve CMS city name to measurement city name."""
    return CITY_ALIASES.get(cms_city, cms_city)


def build_roof_stats_summary(data: dict) -> str:
    """Build a stats string for roofing, omitting zero values."""
    parts = []
    if data["facets"] > 0:
        parts.append(f"{int(data['facets']):,} roof facets")
    if data["valleys_ft"] > 0:
        parts.append(f"{int(data['valleys_ft']):,} feet of valleys")
    if data["ridges_hips_ft"] > 0:
        parts.append(f"{int(data['ridges_hips_ft']):,} feet of ridges and hips")
    if data["rakes_ft"] > 0:
        parts.append(f"{int(data['rakes_ft']):,} feet of rakes")
    return ", ".join(parts) if parts else ""


def generate_template_text(service_type: str, city: str, state: str, data: dict) -> str:
    """Generate template text without AI (fallback)."""
    city_state = f"{city}, {state}"

    if service_type == "roofing":
        squares = int(data["roof_squares"])
        props = data["properties"]
        stats = build_roof_stats_summary(data)
        h2 = f"We Have Inspected Over {squares:,} Squares of Roofing in {city_state}"
        para = (
            f"In {city_state}, we have inspected, repaired, and serviced "
            f"{squares:,} squares of roofing across {props} properties, "
            f"all representing our commitment to solving roof issues for real homeowners."
        )
        if stats:
            para += f" Our inspections have covered {stats}."
        return f"<h2>{h2}</h2>\n<p>{para}</p>"

    elif service_type == "gutter":
        eaves = int(data["eaves_ft"])
        props = data["properties"]
        h2 = f"We Have Inspected Over {eaves:,} Linear Feet of Gutters in {city_state}"
        para = (
            f"In {city_state}, we have inspected, repaired, and serviced "
            f"{eaves:,} linear feet of gutters across {props} properties. "
            f"Gutters are essential to keeping water moving away from your home "
            f"and are an affordable way to prevent water damage near your foundation. "
            f"Properly maintained gutters protect your landscaping, siding, and "
            f"basement from costly water-related issues."
        )
        return f"<h2>{h2}</h2>\n<p>{para}</p>"

    return ""


def generate_ai_text(service_type: str, city: str, state: str, data: dict) -> str:
    """Use Claude to generate polished inspection text as HTML."""
    city_state = f"{city}, {state}"

    if service_type == "roofing":
        squares = int(data["roof_squares"])
        props = data["properties"]
        stats = build_roof_stats_summary(data)
        prompt = f"""Write a short, compelling service page section for a roofing company's local page in {city_state}.

Data from our GAF QuickMeasure inspections:
- {props} properties inspected in {city_state}
- {squares:,} total squares of roofing inspected
{f'- Additional details: {stats}' if stats else ''}

Requirements:
- Write one H2 heading that highlights the total squares inspected (use the exact number {squares:,})
- Write one paragraph (2-3 sentences) that emphasizes our hands-on experience inspecting and servicing roofs for real homeowners in {city_state}
- Mention the number of squares and properties naturally
- Tone: professional, trustworthy, local expertise
- Do NOT use generic filler — keep it specific to the data
- Output as raw HTML: one <h2> tag and one <p> tag, nothing else
- Do NOT wrap in code blocks or markdown"""

    elif service_type == "gutter":
        eaves = int(data["eaves_ft"])
        props = data["properties"]
        prompt = f"""Write a short, compelling service page section for a gutter company's local page in {city_state}.

Data from our GAF QuickMeasure inspections:
- {props} properties inspected in {city_state}
- {eaves:,} total linear feet of gutters (eave lines) measured

Requirements:
- Write one H2 heading that highlights the total linear feet of gutters inspected (use the exact number {eaves:,})
- Write one paragraph (2-3 sentences) about our gutter inspection experience in {city_state}
- Mention how properly maintained gutters protect the home from water damage near the foundation, landscaping, and siding
- Tone: professional, trustworthy, local expertise
- Do NOT use generic filler — keep it specific to the data
- Output as raw HTML: one <h2> tag and one <p> tag, nothing else
- Do NOT wrap in code blocks or markdown"""
    else:
        return ""

    payload = json.dumps({
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 500,
        "messages": [{"role": "user", "content": prompt}],
    }).encode()

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=payload,
        headers={
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
        },
    )

    try:
        resp = urllib.request.urlopen(req, timeout=30)
        result = json.loads(resp.read())
        text = result["content"][0]["text"].strip()
        # Clean up any accidental markdown code fences
        text = re.sub(r'^```html?\s*', '', text)
        text = re.sub(r'\s*```$', '', text)
        return text.strip()
    except Exception as e:
        print(f"    AI ERROR: {e}")
        return generate_template_text(service_type, city, state, data)


def push_to_strapi(document_id: str, html: str, dry_run: bool) -> bool:
    """Push inspectionRichText to a Strapi page."""
    if dry_run:
        return True

    url = f"{STRAPI_URL}/api/services/{document_id}"
    payload = json.dumps({"data": {"inspectionRichText": html}}).encode()

    req = urllib.request.Request(url, data=payload, method="PUT", headers=HEADERS)

    try:
        resp = urllib.request.urlopen(req, timeout=15)
        return resp.status == 200
    except urllib.error.HTTPError as e:
        print(f"    STRAPI ERROR {e.code}: {e.read().decode()[:200]}")
        return False
    except Exception as e:
        print(f"    STRAPI ERROR: {e}")
        return False


def main():
    args = sys.argv[1:]
    dry_run = "--execute" not in args
    skip_ai = "--skip-ai" in args
    limit = None
    city_filter = None

    for arg in args:
        if arg.startswith("--limit="):
            limit = int(arg.split("=")[1])
        elif arg.startswith("--city="):
            city_filter = arg.split("=", 1)[1]

    if dry_run:
        print("=== DRY RUN (use --execute to push to Strapi) ===\n")
    else:
        print("=== LIVE MODE: pushing to Strapi ===\n")

    if skip_ai:
        print("Skipping AI generation, using templates.\n")

    # Load data
    measurements = load_measurements()
    print(f"Loaded measurements for {len(measurements)} cities")

    with open(PAGES_DUMP) as f:
        pages = json.load(f)
    print(f"Loaded {len(pages)} CMS pages\n")

    # Filter to roofing + gutter pages
    target_pages = [
        p for p in pages
        if p.get("serviceType") in ("roofing", "gutter")
        and p.get("city")
        and (city_filter is None or p["city"].lower() == city_filter.lower())
    ]

    print(f"Target pages (roofing + gutter): {len(target_pages)}")
    if limit:
        target_pages = target_pages[:limit]
        print(f"Limited to {limit} pages")
    print()

    log = []
    matched = 0
    skipped = 0
    pushed = 0
    ai_calls = 0

    for i, page in enumerate(target_pages, 1):
        title = page["title"]
        doc_id = page["documentId"]
        service_type = page["serviceType"]
        city = page["city"]
        state = page["state"]

        resolved_city = resolve_city(city)
        key = f"{resolved_city}, {state}"

        if key not in measurements:
            print(f"  [{i}] SKIP (no data): {title}")
            skipped += 1
            log.append({"title": title, "status": "skipped", "reason": "no measurement data"})
            continue

        data = measurements[key]
        matched += 1

        # Generate text
        if skip_ai:
            html = generate_template_text(service_type, city, state, data)
        else:
            html = generate_ai_text(service_type, city, state, data)
            ai_calls += 1
            time.sleep(0.5)  # rate limit

        # Push to Strapi
        success = push_to_strapi(doc_id, html, dry_run)
        if success:
            pushed += 1
            status = "pushed" if not dry_run else "dry_run"
        else:
            status = "error"

        print(f"  [{i}] {status.upper()}: {title}")
        if dry_run:
            # Show preview of generated text
            preview = html[:150].replace("\n", " ")
            print(f"       {preview}...")

        log.append({
            "title": title,
            "documentId": doc_id,
            "serviceType": service_type,
            "city": city,
            "state": state,
            "status": status,
            "html": html,
        })

    # Save log
    with open(OUTPUT_LOG, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"  Total target pages: {len(target_pages)}")
    print(f"  Matched with data:  {matched}")
    print(f"  Skipped (no data):  {skipped}")
    print(f"  Pushed/generated:   {pushed}")
    if not skip_ai:
        print(f"  AI calls made:      {ai_calls}")
    print(f"  Mode:               {'DRY RUN' if dry_run else 'LIVE'}")
    print(f"  Log saved:          {OUTPUT_LOG}")


if __name__ == "__main__":
    main()
