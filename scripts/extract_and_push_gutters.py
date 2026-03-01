"""
Transform gutter inspection tables for Strapi Gutters pages.
Reads from hover_measurements.json, merges location fields, removes 0-data entries,
generates H2/paragraph/notes via AI, and pushes to Strapi.

Usage:
    python extract_and_push_gutters.py                  # dry run
    python extract_and_push_gutters.py --execute        # push to Strapi
    python extract_and_push_gutters.py --city=Bowie     # single city
    python extract_and_push_gutters.py --limit=5        # first N cities
"""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

from dotenv import load_dotenv

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(SCRIPT_DIR, "migration", ".env"))

STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

MEASUREMENTS_JSON = os.path.join(SCRIPT_DIR, "hover_measurements.json")
BACKUP_FILE = os.path.join(SCRIPT_DIR, "gutter_inspection_backup.json")

HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}

CITY_NORMALIZE = {
    "Fort": "Fort Washington", "Silver": "Silver Spring",
    "Silve": "Silver Spring", "Upper": "Upper Marlboro",
    "District": "District Heights", "Capitol": "Capitol Heights",
    "German": "Germantown", "Temple": "Temple Hills",
    "Hill": "Hillcrest Heights", "Wash": "Washington",
    "United": None, "Mt Rainier": "Mount Rainier",
    "Bowie Md": "Bowie", "Bethesda Md": "Bethesda",
    "Greenbelt Md": "Greenbelt", "Gaithersburg Md": "Gaithersburg",
    "District Heights Md": "District Heights",
    "Linthicum Heights Md": "Linthicum Heights",
    "Waldorf Md": "Waldorf", "Stevensville Md": "Stevensville",
    "Annapolis Md": "Annapolis", "Washington Dc": "Washington",
    "Washington Md": "Washington", "Washington Grove": "Washington Grove",
}

TITLE_CITY_NORMALIZE = {
    "Ft Washington": ("Fort Washington", "MD"),
    "Mont Village": ("Montgomery Village", "MD"),
    "Mont. Village": ("Montgomery Village", "MD"),
    "Washington, DC": ("Washington", "DC"),
    "DC": ("Washington", "DC"),
}

CITY_ALIASES = {
    "Ft Washington": "Fort Washington",
    "Mont Village": "Montgomery Village",
    "Mont. Village": "Montgomery Village",
    "Mt Airy": "Mount Airy",
}


# ── Helpers ──────────────────────────────────────────────────────────────────

def classify_pitch(pitch: int) -> str:
    if pitch >= 8:
        return "High"
    elif pitch >= 4:
        return "Moderate"
    else:
        return "Low"


def strip_house_number(address: str) -> str:
    return re.sub(r"^\d+[A-Za-z]?\s*[-]?\s*", "", address).strip()


def clean_location(street: str, city: str, state: str, zipcode: str) -> str:
    street = strip_house_number(street)
    street = re.sub(r",\s*,", ",", street)
    street = street.strip().rstrip(",")
    return f"{street}, {city}, {state} {zipcode}"


# ── Strapi helpers ────────────────────────────────────────────────────────────

def strapi_get(path: str) -> dict:
    req = urllib.request.Request(f"{STRAPI_URL}/api/{path}", headers=HEADERS)
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def strapi_put(document_id: str, data: dict) -> dict:
    url = f"{STRAPI_URL}/api/services/{document_id}"
    payload = json.dumps({"data": data}).encode()
    req = urllib.request.Request(url, data=payload, method="PUT", headers=HEADERS)
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def fetch_gutter_pages() -> list[dict]:
    pages = []
    page = 1
    while True:
        params = urllib.parse.urlencode({
            "filters[slug][$containsi]": "gutter",
            "fields[0]": "title",
            "fields[1]": "slug",
            "fields[2]": "inspectionRichText",
            "pagination[page]": str(page),
            "pagination[pageSize]": "100",
        })
        data = strapi_get(f"services?{params}")
        pages.extend(data["data"])
        if page >= data["meta"]["pagination"]["pageCount"]:
            break
        page += 1
    return pages


# ── AI generation ─────────────────────────────────────────────────────────────

def call_claude(prompt: str, max_tokens: int = 500) -> str | None:
    if not ANTHROPIC_API_KEY:
        return None
    payload = json.dumps({
        "model": "claude-haiku-4-5-20251001",
        "max_tokens": max_tokens,
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
        resp = urllib.request.urlopen(req, timeout=60)
        result = json.loads(resp.read())
        return result["content"][0]["text"].strip()
    except Exception as e:
        print(f"    AI ERROR: {e}")
        return None


def generate_h2_and_paragraph(
    city: str, state: str, total_gutter_ft: int, properties: int
) -> tuple[str, str]:
    state_name = {"MD": "Maryland", "VA": "Virginia", "DC": "Washington, DC"}.get(
        state, state
    )

    h2 = f"{total_gutter_ft:,} Linear Feet of {city} Gutters Serviced: Your Local Gutter Protection Experts"

    prompt = f"""Write one paragraph (3 sentences) for a gutter installation company's local service page.

City: {city}
State: {state_name}
Total Linear Feet of Gutters Serviced: {total_gutter_ft:,}
Number of Properties: {properties}

Follow this EXACT style and tone (adapt for {city}):
"Our team has inspected and serviced thousands of linear feet of gutter systems across 380 local residences, ensuring every home meets our "Weather-Tight" standards for proper water management. Our documented service history throughout Bowie, MD proves our expertise in gutter installation, repair, and seamless gutter replacement. By analyzing the drainage capacity, roof pitch, and eaves configuration across the city, we provide Bowie homeowners with the specialized local knowledge required to handle Maryland's heavy seasonal rainfall."

Rules:
- First sentence: mention inspecting/servicing gutter systems across the exact property count, mention "Weather-Tight" in double quotes, mention proper water management
- Second sentence: mention documented service history in {city}, {state}, expertise in gutter installation, repair, and seamless replacement
- Third sentence: mention analyzing drainage capacity, roof pitch, eaves configuration, provide {city} homeowners with specialized local knowledge for {state_name}'s heavy seasonal rainfall
- Use the EXACT number of properties ({properties}) naturally
- Keep it to exactly 3 sentences
- Do NOT use markdown or HTML formatting, just plain text

Output ONLY the paragraph text, nothing else."""

    paragraph = call_claude(prompt)
    if not paragraph:
        paragraph = (
            f'Our team has inspected and serviced thousands of linear feet of gutter '
            f'systems across {properties} local residences, ensuring every home meets our '
            f'"Weather-Tight" standards for proper water management. Our documented service '
            f'history throughout {city}, {state} proves our expertise in gutter installation, '
            f'repair, and seamless gutter replacement. By analyzing the drainage capacity, '
            f'roof pitch, and eaves configuration across the city, we provide {city} homeowners '
            f"with the specialized local knowledge required to handle {state_name}'s heavy "
            f'seasonal rainfall.'
        )

    return h2, paragraph


def generate_notes_batch(
    city: str, state: str, properties: list[dict]
) -> list[str]:
    props_text = ""
    for i, p in enumerate(properties, 1):
        street = strip_house_number(p["street"])
        pitch = p.get("dominant_pitch", 0)
        pitch_label = classify_pitch(pitch)
        gutter_ft = p.get("gutter_length_ft", 0)
        eaves_ft = p.get("eaves_ft", 0)
        valleys = p.get("valleys_count", 0)
        props_text += (
            f"{i}. {street}: {gutter_ft:.0f}ft gutter line, {eaves_ft:.0f}ft eaves, "
            f"pitch {pitch}/12 ({pitch_label}), {valleys} valleys\n"
        )

    prompt = f"""You are writing brief internal inspection notes for our gutter installation team about properties in {city}, {state}.

Write each note like a crew member jotting down what they noticed on-site. Keep it simple, direct, no filler words.

Think about:
- How steep the pitch is and what that means for water velocity hitting the gutters
- Whether the gutter run is long enough or if there might be overflow points
- Number of valleys — more valleys means more concentrated water flow
- Whether the eaves length suggests adequate or insufficient gutter coverage
- Drainage complexity based on the overall roof layout

Keep each note under 20 words. Sound like a real person writing quick field notes, not a marketing brochure.

Properties:
{props_text}

Return ONLY a numbered list, one line per property. Examples:
1. Steep pitch at 8/12, water's coming down fast — oversized gutters recommended here
2. Long gutter run at 180ft with 4 valleys, heavy concentration points to watch
3. Low pitch, slow drainage — debris buildup likely, needs regular cleanout schedule"""

    result = call_claude(prompt, max_tokens=2000)
    if not result:
        return [""] * len(properties)

    notes = []
    for line in result.strip().split("\n"):
        m = re.match(r"^\d+\.\s*(.+)$", line.strip())
        if m:
            notes.append(m.group(1).strip())
    while len(notes) < len(properties):
        notes.append("")
    return notes[: len(properties)]


# ── HTML builder ──────────────────────────────────────────────────────────────

def build_gutter_table(properties: list[dict], notes: list[str]) -> str:
    rows = []
    for i, p in enumerate(properties):
        location = clean_location(p["street"], p["city"], p["state"], p["zip"])
        pitch = p.get("dominant_pitch", 0)
        pitch_label = classify_pitch(pitch)
        gutter_ft = p.get("gutter_length_ft", 0)
        eaves_ft = p.get("eaves_ft", 0)
        note = notes[i] if i < len(notes) else ""
        rows.append(
            f"<tr>"
            f"<td>{location}</td>"
            f"<td>{gutter_ft:.0f}</td>"
            f"<td>{eaves_ft:.0f}</td>"
            f"<td>{pitch}/12 ({pitch_label})</td>"
            f"<td>{note}</td>"
            f"</tr>"
        )

    return (
        '<div class="table-wrapper"><figure class="table">'
        '<table class="warranty-table">'
        "<thead><tr>"
        "<th>Location</th>"
        "<th>Gutter Length (ft)</th>"
        "<th>Eaves (ft)</th>"
        "<th>Roof Pitch</th>"
        "<th>Notes</th>"
        "</tr></thead>"
        "<tbody>" + "".join(rows) + "</tbody>"
        "</table></figure></div>"
    )


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    dry_run = "--execute" not in args
    city_filter = None
    limit = None

    for arg in args:
        if arg.startswith("--city="):
            city_filter = arg.split("=", 1)[1]
        elif arg.startswith("--limit="):
            limit = int(arg.split("=")[1])

    if dry_run:
        print("=== DRY RUN (use --execute to push to Strapi) ===\n")
    else:
        print("=== LIVE MODE: pushing to Strapi ===\n")

    # Step 1: Fetch current gutter pages and create backup
    print("Step 1: Fetching Gutter pages from Strapi and creating backup...")
    gutter_pages = fetch_gutter_pages()
    print(f"  {len(gutter_pages)} Gutter pages found")

    # Backup current data
    backup_data = []
    for p in gutter_pages:
        backup_data.append({
            "documentId": p["documentId"],
            "title": p["title"],
            "slug": p.get("slug", ""),
            "inspectionRichText": p.get("inspectionRichText", ""),
        })
    with open(BACKUP_FILE, "w", encoding="utf-8") as f:
        json.dump(backup_data, f, indent=2, ensure_ascii=False)
    print(f"  Backup saved to {BACKUP_FILE}")

    populated = sum(1 for p in gutter_pages if p.get("inspectionRichText"))
    print(f"  Pages with existing inspectionRichText: {populated}")
    print(f"  Pages without: {len(gutter_pages) - populated}\n")

    # Step 2: Load measurement data
    print("Step 2: Loading measurement data from hover_measurements.json...")
    with open(MEASUREMENTS_JSON, encoding="utf-8") as f:
        all_records = json.load(f)
    print(f"  {len(all_records)} total measurement records loaded")

    # Filter to records with gutter data (gutter_length_ft > 0)
    gutter_records = [
        r for r in all_records
        if r.get("gutter_length_ft", 0) > 0 and r["city"] != "Unknown"
    ]
    print(f"  {len(gutter_records)} records with gutter data (gutter_length_ft > 0)")

    total_gutter_ft = sum(r["gutter_length_ft"] for r in gutter_records)
    print(f"  Total gutter length: {total_gutter_ft:,.0f} ft\n")

    # Step 3: Group by city
    print("Step 3: Grouping by city...")
    city_groups: dict[str, list[dict]] = {}
    for r in gutter_records:
        key = f"{r['city']}, {r['state']}"
        city_groups.setdefault(key, []).append(r)

    cities = sorted(city_groups.keys())
    print(f"  {len(cities)} cities with gutter data\n")

    if city_filter:
        cities = [c for c in cities if city_filter.lower() in c.lower()]
        print(f"  Filtered to {len(cities)} cities matching '{city_filter}'\n")

    # Build page lookup
    page_lookup: dict[str, dict] = {}
    for p in gutter_pages:
        title = p["title"]
        parts = [x.strip() for x in title.split(" - ")]
        if parts[0] != "Gutters":
            continue
        if len(parts) >= 3:
            city_name, state_abbr = parts[1], parts[2]
        elif len(parts) == 2:
            city_name, state_abbr = parts[1], "MD"
        else:
            continue

        if city_name in TITLE_CITY_NORMALIZE:
            city_name, state_abbr = TITLE_CITY_NORMALIZE[city_name]
        if city_name in CITY_ALIASES:
            city_name = CITY_ALIASES[city_name]

        if city_name == "Washington" and state_abbr in ("DC",):
            lookup_key = "Washington, DC"
        else:
            lookup_key = f"{city_name}, {state_abbr}"
        page_lookup[lookup_key] = p

    # Step 4: Generate and push
    print("Step 4: Generating tables and pushing to Strapi...\n")
    matched = 0
    pushed = 0
    failed = 0
    no_page = 0

    if limit:
        cities = cities[:limit]

    for ci, city_state in enumerate(cities, 1):
        properties = city_groups[city_state]
        city = properties[0]["city"]
        state = properties[0]["state"]

        page = page_lookup.get(city_state)
        if not page:
            no_page += 1
            continue

        matched += 1

        total_ft = int(sum(p["gutter_length_ft"] for p in properties))

        print(f"  [{ci}/{len(cities)}] {page['title']} ({page['documentId']})")
        print(
            f"    Properties: {len(properties)}, Total gutter length: {total_ft:,} ft"
        )

        # Generate H2 and paragraph
        h2, paragraph = generate_h2_and_paragraph(
            city, state, total_ft, len(properties)
        )
        print(f"    H2: {h2}")

        # Generate notes
        notes = generate_notes_batch(city, state, properties)
        time.sleep(0.3)

        # Build table HTML
        table_html = build_gutter_table(properties, notes)
        final_html = f"<h2>{h2}</h2>\n<p>{paragraph}</p>\n{table_html}"

        if dry_run:
            print(f"    (dry run - skipped)\n")
            pushed += 1
            continue

        try:
            strapi_put(page["documentId"], {"inspectionRichText": final_html})
            print(f"    PUSHED\n")
            pushed += 1
        except urllib.error.HTTPError as e:
            body = e.read().decode()[:200]
            print(f"    FAILED: HTTP {e.code}: {body}\n")
            failed += 1
        except Exception as e:
            print(f"    FAILED: {e}\n")
            failed += 1
        time.sleep(0.2)

    print(f"\n{'=' * 60}")
    print("SUMMARY")
    print(f"{'=' * 60}")
    print(f"  Cities with gutter data: {len(city_groups)}")
    print(f"  Matched to CMS pages:    {matched}")
    print(f"  No CMS page found:       {no_page}")
    print(f"  Pushed/previewed:        {pushed}")
    if failed:
        print(f"  Failed:                  {failed}")
    print(f"  Mode:                    {'DRY RUN' if dry_run else 'LIVE'}")


if __name__ == "__main__":
    main()
