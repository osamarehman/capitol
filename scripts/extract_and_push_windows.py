"""
Extract window data from HOVER PDFs, aggregate by city, generate HTML tables,
and push to Strapi Windows pages (inspectionRichText field).

Usage:
    python extract_and_push_windows.py                  # dry run
    python extract_and_push_windows.py --execute        # push to Strapi
    python extract_and_push_windows.py --city=Bowie     # single city
    python extract_and_push_windows.py --limit=5        # first N cities
"""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter

import pymupdf
from dotenv import load_dotenv

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(SCRIPT_DIR, "migration", ".env"))

STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

HOVER_DIR = os.path.join(
    SCRIPT_DIR, "mbox", "Siding - Windows - Gutters Data",
    "Siding _ Windows _ Gutters _ Roof",
)

HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}

CITY_NORMALIZE = {
    "Fort": "Fort Washington",
    "Silver": "Silver Spring",
    "Silve": "Silver Spring",
    "Upper": "Upper Marlboro",
    "District": "District Heights",
    "Capitol": "Capitol Heights",
    "German": "Germantown",
    "Temple": "Temple Hills",
    "Hill": "Hillcrest Heights",
    "Wash": "Washington",
    "United": None,
    "Mt Rainier": "Mount Rainier",
    "Bowie Md": "Bowie",
    "Bethesda Md": "Bethesda",
    "Greenbelt Md": "Greenbelt",
    "Gaithersburg Md": "Gaithersburg",
    "District Heights Md": "District Heights",
    "Linthicum Heights Md": "Linthicum Heights",
    "Waldorf Md": "Waldorf",
    "Stevensville Md": "Stevensville",
    "Annapolis Md": "Annapolis",
    "Washington Dc": "Washington",
    "Washington Md": "Washington",
    "Washington Grove": "Washington Grove",
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


# ── PDF extraction ───────────────────────────────────────────────────────────

def normalize_city(city: str, state: str):
    key = city.strip()
    if key in CITY_NORMALIZE:
        replacement = CITY_NORMALIZE[key]
        if replacement is None:
            return None
        city = replacement
    if city == "Washington" and state == "MD":
        state = "DC"
    return city, state


def extract_cover(doc) -> dict:
    text = doc[0].get_text()
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    street, city, state, zipcode = "Unknown", "Unknown", "Unknown", ""

    if len(lines) > 1:
        street = lines[1]

    for line in lines:
        m = re.match(r"^([A-Z][A-Z\s-]+?)\s*,+\s*([A-Z]{2})\s+(\d{5})", line)
        if m:
            city, state, zipcode = m.group(1).strip().title(), m.group(2).strip(), m.group(3).strip()
            break
        m = re.search(r"([A-Za-z][A-Za-z\s-]+?)\s+([A-Z]{2})\s+(\d{5})\s*$", line)
        if m:
            city, state, zipcode = m.group(1).strip().title(), m.group(2).strip(), m.group(3).strip()
            break
        m = re.search(r",\s*([A-Za-z][A-Za-z\s-]+?)\.\.\.", line)
        if m:
            city, state = m.group(1).strip().title(), "MD"
            break
        m = re.match(r"^([A-Za-z][A-Za-z\s-]+?),\s*([A-Z]{2}),\s*\1", line)
        if m:
            city, state = m.group(1).strip().title(), m.group(2).strip()
            break
        m = re.search(r",\s*([A-Za-z][A-Za-z\s-]+?),\s*([A-Z]{2}),\s*USA", line)
        if m:
            city, state = m.group(1).strip().title(), m.group(2).strip()
            break

    return {"street": street, "city": city, "state": state, "zip": zipcode}


def extract_windows_from_pdf(pdf_path: str) -> dict | None:
    """Extract window data from a single HOVER PDF."""
    try:
        doc = pymupdf.open(pdf_path)
    except Exception:
        return None
    if len(doc) == 0:
        doc.close()
        return None

    cover = extract_cover(doc)
    norm = normalize_city(cover["city"], cover["state"])
    if norm is None:
        doc.close()
        return None
    city, state = norm

    window_ids = set()
    window_group_ids = set()
    window_areas = []

    for i in range(len(doc)):
        text = doc[i].get_text()
        lines = [l.strip() for l in text.split("\n") if l.strip()]

        is_openings = False
        for line in lines[1:5]:
            if line == "OPENINGS":
                is_openings = True
                break

        if not is_openings:
            continue

        # Extract individual windows
        for j, line in enumerate(lines):
            if re.match(r"^W-\d+$", line):
                window_ids.add(line)
                # Look for area on nearby lines (format: "12 ft²" or "12 ft")
                for k in range(j + 1, min(j + 4, len(lines))):
                    area_match = re.match(r"^(\d+)\s*ft", lines[k])
                    if area_match:
                        window_areas.append(int(area_match.group(1)))
                        break
            elif re.match(r"^WG-\d+$", line):
                window_group_ids.add(line)

    doc.close()

    if not window_ids:
        return None

    total_area = sum(window_areas)

    # Skip entries with zero meaningful data
    if total_area == 0 and len(window_ids) == 0:
        return None

    return {
        "file": os.path.basename(pdf_path),
        "street": cover["street"],
        "city": city,
        "state": state,
        "zip": cover["zip"],
        "window_count": len(window_ids),
        "window_group_count": len(window_group_ids),
        "total_window_area_sqft": total_area,
    }


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


def fetch_windows_pages() -> list[dict]:
    pages = []
    page = 1
    while True:
        params = urllib.parse.urlencode({
            "filters[slug][$containsi]": "window",
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


def generate_h2_and_paragraph(city: str, state: str, total_windows: int, properties: int) -> tuple[str, str]:
    state_name = {"MD": "Maryland", "VA": "Virginia", "DC": "Washington, DC"}.get(state, state)

    h2 = f"Over {total_windows:,} {city} Windows Serviced: The Authority in Professional Installation"

    prompt = f"""Write one paragraph (3 sentences) for a window replacement company's local service page.

City: {city}
State: {state_name}
Total Windows Serviced: {total_windows:,}
Number of Properties: {properties}

Follow this EXACT style and tone as a reference (adapt for {city}):
"Our team has meticulously inspected or installed thousands of windows across 380 local residences, ensuring every home meets our "Weather-Tight" standards. Our documented service history throughout Bowie, MD proves our expertise in high-performance window replacement and precision window installation. By analyzing the seal integrity and energy efficiency of windows across the city, we provide Bowie homeowners with the specialized local knowledge required to handle Maryland's extreme seasonal shifts."

Rules:
- First sentence: mention inspecting/installing windows across the exact property count, mention "Weather-Tight" in double quotes
- Second sentence: mention documented service history in {city}, {state}, expertise in high-performance window replacement and precision installation
- Third sentence: mention analyzing seal integrity and energy efficiency, provide {city} homeowners with specialized local knowledge for {state_name}'s extreme seasonal shifts
- Use the EXACT number of properties ({properties}) naturally
- Keep it to exactly 3 sentences
- Do NOT use markdown or HTML formatting, just plain text

Output ONLY the paragraph text, nothing else."""

    paragraph = call_claude(prompt)
    if not paragraph:
        paragraph = (
            f'Our team has meticulously inspected or installed thousands of windows '
            f'across {properties} local residences, ensuring every home meets our '
            f'"Weather-Tight" standards. Our documented service history throughout '
            f'{city}, {state} proves our expertise in high-performance window replacement '
            f'and precision window installation. By analyzing the seal integrity and energy '
            f'efficiency of windows across the city, we provide {city} homeowners with the '
            f"specialized local knowledge required to handle {state_name}'s extreme seasonal shifts."
        )

    return h2, paragraph


def generate_notes_batch(city: str, state: str, properties: list[dict]) -> list[str]:
    props_text = ""
    for i, p in enumerate(properties, 1):
        street = re.sub(r"^\d+[A-Za-z]?\s*[-]?\s*", "", p["street"]).strip()
        props_text += (
            f"{i}. {street}: {p['window_count']} windows, "
            f"{p['total_window_area_sqft']} sqft total window area\n"
        )

    prompt = f"""You are writing brief internal inspection notes for our window installation team about properties in {city}, {state}.

Write each note like a crew member jotting down what they noticed on-site. Keep it simple, direct, no filler words.

Think about:
- How many openings this home has and what that means for energy efficiency
- Whether the glass area brings good natural light or increases heat loss
- Sunlight exposure and seasonal temperature impact
- Overall energy profile based on the window count

Keep each note under 20 words. Sound like a real person writing quick field notes, not a marketing brochure.

Properties:
{props_text}

Return ONLY a numbered list, one line per property. Examples:
1. Too many openings on this one — 41 windows means serious heat loss in winter
2. Good natural light with 18 windows, energy efficient layout overall
3. Heavy glass area at 350 sqft, will need high-performance glazing for summer cooling"""

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
    return notes[:len(properties)]


# ── HTML builder ──────────────────────────────────────────────────────────────

def strip_house_number(address: str) -> str:
    return re.sub(r"^\d+[A-Za-z]?\s*[-]?\s*", "", address).strip()


def clean_location(street: str, city: str, state: str, zipcode: str) -> str:
    """Build a clean location string with no double commas."""
    street = strip_house_number(street)
    # Remove trailing commas and clean up double commas from street
    street = re.sub(r",\s*,", ",", street)
    street = street.strip().rstrip(",")
    return f"{street}, {city}, {state} {zipcode}"


def build_windows_table(properties: list[dict], notes: list[str]) -> str:
    rows = []
    for i, p in enumerate(properties):
        location = clean_location(p["street"], p["city"], p["state"], p["zip"])
        note = notes[i] if i < len(notes) else ""
        rows.append(
            f"<tr>"
            f"<td>{location}</td>"
            f"<td>{p['window_count']}</td>"
            f"<td>{p['total_window_area_sqft']:,}</td>"
            f"<td>{note}</td>"
            f"</tr>"
        )

    return (
        '<div class="table-wrapper"><figure class="table">'
        '<table class="warranty-table">'
        "<thead><tr>"
        "<th>Location</th>"
        "<th>Windows</th>"
        "<th>Total Window Area (SqFt)</th>"
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

    # Step 1: Extract window data from HOVER PDFs
    print("Step 1: Extracting window data from HOVER PDFs...")
    pdfs = sorted([
        f for f in os.listdir(HOVER_DIR)
        if f.endswith(".pdf") and not f.startswith("._")
    ])
    print(f"  Found {len(pdfs)} HOVER PDFs")

    all_records = []
    for i, fname in enumerate(pdfs, 1):
        record = extract_windows_from_pdf(os.path.join(HOVER_DIR, fname))
        if record:
            all_records.append(record)
        if i % 100 == 0:
            print(f"  Processed {i}/{len(pdfs)}...")

    print(f"  Extracted window data from {len(all_records)} properties")
    total_windows = sum(r["window_count"] for r in all_records)
    print(f"  Total windows: {total_windows:,}\n")

    # Step 2: Group by city
    print("Step 2: Grouping by city...")
    city_groups: dict[str, list[dict]] = {}
    for r in all_records:
        if r["city"] == "Unknown":
            continue
        key = f"{r['city']}, {r['state']}"
        city_groups.setdefault(key, []).append(r)

    cities = sorted(city_groups.keys())
    print(f"  {len(cities)} cities with window data\n")

    if city_filter:
        cities = [c for c in cities if city_filter.lower() in c.lower()]
        print(f"  Filtered to {len(cities)} cities matching '{city_filter}'\n")

    # Step 3: Fetch Strapi windows pages
    print("Step 3: Fetching Windows pages from Strapi...")
    windows_pages = fetch_windows_pages()
    print(f"  {len(windows_pages)} Windows pages found\n")

    # Build lookup: city -> page
    page_lookup: dict[str, dict] = {}
    for p in windows_pages:
        title = p["title"]
        parts = [x.strip() for x in title.split(" - ")]
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
            lookup_key = f"Washington, DC"
        else:
            lookup_key = f"{city_name}, {state_abbr}"
        page_lookup[lookup_key] = p

    # Step 4: Generate and push
    print("Step 4: Generating tables and pushing to Strapi...\n")
    matched = 0
    pushed = 0
    failed = 0
    no_page = 0
    processed = 0

    if limit:
        cities = cities[:limit]

    for ci, city_state in enumerate(cities, 1):
        properties = city_groups[city_state]
        city = properties[0]["city"]
        state = properties[0]["state"]

        # Find matching Strapi page
        page = page_lookup.get(city_state)
        if not page:
            no_page += 1
            continue

        matched += 1
        processed += 1

        total_win = sum(p["window_count"] for p in properties)
        total_groups = sum(p["window_group_count"] for p in properties)
        total_area = sum(p["total_window_area_sqft"] for p in properties)

        print(f"  [{ci}/{len(cities)}] {page['title']} ({page['documentId']})")
        print(f"    Properties: {len(properties)}, Windows: {total_win}, Area: {total_area:,} sqft")

        # Generate H2 and paragraph
        h2, paragraph = generate_h2_and_paragraph(city, state, total_win, len(properties))
        print(f"    H2: {h2}")

        # Generate notes
        notes = generate_notes_batch(city, state, properties)
        time.sleep(0.3)

        # Build table HTML
        table_html = build_windows_table(properties, notes)
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
    print(f"  Cities with window data: {len(city_groups)}")
    print(f"  Matched to CMS pages:    {matched}")
    print(f"  No CMS page found:       {no_page}")
    print(f"  Pushed/previewed:        {pushed}")
    if failed:
        print(f"  Failed:                  {failed}")
    print(f"  Mode:                    {'DRY RUN' if dry_run else 'LIVE'}")


if __name__ == "__main__":
    main()
