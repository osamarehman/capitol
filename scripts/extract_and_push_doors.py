"""
Extract door data from HOVER PDFs, aggregate by city, generate HTML tables,
and push to Strapi Doors pages (inspectionRichText field).

Usage:
    python extract_and_push_doors.py                  # dry run
    python extract_and_push_doors.py --execute        # push to Strapi
    python extract_and_push_doors.py --city=Bowie     # single city
    python extract_and_push_doors.py --limit=5        # first N cities
"""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

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


def extract_doors_from_pdf(pdf_path: str) -> dict | None:
    """Extract door data from a single HOVER PDF."""
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

    # Collect door IDs and dimensions
    entry_doors: dict[str, dict] = {}  # D-1 -> {width, height, area}
    sliding_doors: dict[str, dict] = {}  # SGD-1 -> {width, height, area}

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

        # Try "Entire Doors" section first (has actual dimensions + area)
        in_entire = False
        found_entire = False
        for j, line in enumerate(lines):
            if line == "Entire Doors":
                in_entire = True
                found_entire = True
                continue
            if not in_entire:
                continue
            if line.startswith("Total") or line.startswith("*Total"):
                in_entire = False
                break
            if line.startswith("*"):
                continue
            if line in ("Opening", "Width x Height", "Area"):
                continue

            d_match = re.match(r"^(D-\d+)$", line)
            sgd_match = re.match(r"^(SGD-\d+)$", line)

            if d_match or sgd_match:
                door_id = line
                width, height, area = 0, 0, 0
                if j + 1 < len(lines):
                    dim_match = re.match(r'(\d+)"\s*x\s*(\d+)"', lines[j + 1])
                    if dim_match:
                        width = int(dim_match.group(1))
                        height = int(dim_match.group(2))
                if j + 2 < len(lines):
                    area_match = re.match(r"(\d+)\s*ft", lines[j + 2])
                    if area_match:
                        area = int(area_match.group(1))

                door_data = {"width": width, "height": height, "area": area}
                if d_match:
                    entry_doors[door_id] = door_data
                else:
                    sliding_doors[door_id] = door_data

        # Fallback: parse standard "Doors" section if Entire Doors not found
        if not found_entire or (not entry_doors and not sliding_doors):
            in_std_doors = False
            for j, line in enumerate(lines):
                if line in ("Doors", "Doors (cont.)"):
                    in_std_doors = True
                    continue
                if not in_std_doors:
                    continue
                if line.startswith("*") or line == "Entire Doors":
                    break
                if line in ("Opening", "Width x Height"):
                    continue

                d_match = re.match(r"^(D-\d+)$", line)
                sgd_match = re.match(r"^(SGD-\d+)$", line)

                if d_match or sgd_match:
                    door_id = line
                    width, height = 0, 0
                    if j + 1 < len(lines):
                        dim_match = re.match(r'(\d+)"\s*x\s*(\d+)"', lines[j + 1])
                        if dim_match:
                            width = int(dim_match.group(1))
                            height = int(dim_match.group(2))

                    door_data = {"width": width, "height": height, "area": 0}
                    if d_match and door_id not in entry_doors:
                        entry_doors[door_id] = door_data
                    elif sgd_match and door_id not in sliding_doors:
                        sliding_doors[door_id] = door_data

    doc.close()

    if not entry_doors and not sliding_doors:
        return None

    # D-1 = front door, D-2+ = rear/secondary
    front_count = 1 if "D-1" in entry_doors else 0
    rear_count = max(0, len(entry_doors) - front_count)

    # Compute total area
    total_area = sum(d["area"] for d in entry_doors.values()) + sum(
        d["area"] for d in sliding_doors.values()
    )

    # Find largest door for notes context
    all_doors = list(entry_doors.values()) + list(sliding_doors.values())
    largest = max(all_doors, key=lambda d: d["area"]) if all_doors else None
    largest_desc = ""
    if largest and largest["width"] and largest["height"]:
        largest_desc = f'{largest["width"]}x{largest["height"]}in ({largest["area"]}sqft)'

    # Collect all entry door dimensions for notes
    entry_dims = []
    for did, d in sorted(entry_doors.items()):
        if d["width"] and d["height"]:
            entry_dims.append(f'{d["width"]}x{d["height"]}"')

    sgd_dims = []
    for did, d in sorted(sliding_doors.items()):
        if d["width"] and d["height"]:
            sgd_dims.append(f'{d["width"]}x{d["height"]}"')

    return {
        "file": os.path.basename(pdf_path),
        "street": cover["street"],
        "city": city,
        "state": state,
        "zip": cover["zip"],
        "front_doors": front_count,
        "rear_doors": rear_count,
        "sliding_doors": len(sliding_doors),
        "total_doors": len(entry_doors) + len(sliding_doors),
        "total_area_sqft": total_area,
        "largest_door": largest_desc,
        "entry_dims": entry_dims,
        "sgd_dims": sgd_dims,
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


def fetch_door_pages() -> list[dict]:
    pages = []
    page = 1
    while True:
        params = urllib.parse.urlencode({
            "filters[slug][$containsi]": "door",
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
    city: str, state: str, total_doors: int, properties: int
) -> tuple[str, str]:
    state_name = {"MD": "Maryland", "VA": "Virginia", "DC": "Washington, DC"}.get(
        state, state
    )

    h2 = f"{total_doors:,} Doors Serviced: {city}'s Expert for Entry and Sliding Glass Doors"

    prompt = f"""Write one paragraph (3 sentences) for a door installation company's local service page.

City: {city}
State: {state_name}
Total Doors Serviced: {total_doors:,}
Number of Properties: {properties}

Follow this EXACT style and tone (adapt for {city}):
"Our team has a deep footprint in the Bowie community, with service logs covering 196 entry and sliding glass door projects across 380 properties. This extensive local experience allows us to provide "Secure and Weather-Tight" solutions tailored to Maryland's climate. Whether it's a routine inspection or a full-scale replacement, we bring the data-backed expertise that Bowie homeowners trust."

Rules:
- First sentence: mention deep footprint in the {city} community, service logs covering {total_doors:,} entry and sliding glass door projects across {properties} properties
- Second sentence: mention "Secure and Weather-Tight" in double quotes, tailored to {state_name}'s climate
- Third sentence: mention routine inspection or full-scale replacement, data-backed expertise that {city} homeowners trust
- Keep it to exactly 3 sentences
- Do NOT use markdown or HTML formatting, just plain text

Output ONLY the paragraph text, nothing else."""

    paragraph = call_claude(prompt)
    if not paragraph:
        paragraph = (
            f"Our team has a deep footprint in the {city} community, with service logs "
            f"covering {total_doors:,} entry and sliding glass door projects across "
            f'{properties} properties. This extensive local experience allows us to '
            f'provide "Secure and Weather-Tight" solutions tailored to '
            f"{state_name}'s climate. Whether it's a routine inspection or a full-scale "
            f"replacement, we bring the data-backed expertise that {city} homeowners trust."
        )

    return h2, paragraph


def generate_notes_batch(
    city: str, state: str, properties: list[dict]
) -> list[str]:
    props_text = ""
    for i, p in enumerate(properties, 1):
        street = re.sub(r"^\d+[A-Za-z]?\s*[-]?\s*", "", p["street"]).strip()
        entry_info = f"{p['front_doors']} front + {p['rear_doors']} rear entry doors"
        sgd_info = f"{p['sliding_doors']} sliding glass"
        dims_info = ""
        if p["entry_dims"]:
            dims_info += f" Entry sizes: {', '.join(p['entry_dims'][:3])}."
        if p["sgd_dims"]:
            dims_info += f" SGD sizes: {', '.join(p['sgd_dims'][:2])}."
        if p["largest_door"]:
            dims_info += f" Largest: {p['largest_door']}."

        props_text += (
            f"{i}. {street}: {entry_info}, {sgd_info}. "
            f"Total area: {p['total_area_sqft']} sqft.{dims_info}\n"
        )

    prompt = f"""You are writing brief internal inspection notes for our door installation team about properties in {city}, {state}.

Write each note like a crew member jotting down what they noticed on-site. Keep it simple, direct, no filler words.

Think about:
- How many openings this home has and what that means for energy efficiency
- Whether the sliding glass adds good natural light or increases heat loss
- If oversized entries need better weather sealing
- How many doors total and what that says about the home layout

Keep each note under 20 words. Sound like a real person writing quick field notes, not a marketing brochure.

Properties:
{props_text}

Return ONLY a numbered list, one line per property. Examples:
1. Big front entry with sidelights, two patio sliders — lots of glass to seal up
2. Only one entry door, no sliders — straightforward install, good energy profile
3. Four entry points plus two sliders, this home has heavy airflow and light exposure"""

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

def strip_house_number(address: str) -> str:
    return re.sub(r"^\d+[A-Za-z]?\s*[-]?\s*", "", address).strip()


def clean_location(street: str, city: str, state: str, zipcode: str) -> str:
    street = strip_house_number(street)
    street = re.sub(r",\s*,", ",", street)
    street = street.strip().rstrip(",")
    return f"{street}, {city}, {state} {zipcode}"


def build_doors_table(properties: list[dict], notes: list[str]) -> str:
    rows = []
    for i, p in enumerate(properties):
        location = clean_location(p["street"], p["city"], p["state"], p["zip"])
        note = notes[i] if i < len(notes) else ""
        rows.append(
            f"<tr>"
            f"<td>{location}</td>"
            f"<td>{p['front_doors']}</td>"
            f"<td>{p['rear_doors']}</td>"
            f"<td>{p['sliding_doors']}</td>"
            f"<td>{note}</td>"
            f"</tr>"
        )

    return (
        '<div class="table-wrapper"><figure class="table">'
        '<table class="warranty-table">'
        "<thead><tr>"
        "<th>Location</th>"
        "<th>Front Doors</th>"
        "<th>Rear Doors</th>"
        "<th>Sliding Glass Doors</th>"
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

    # Step 1: Extract door data from HOVER PDFs
    print("Step 1: Extracting door data from HOVER PDFs...")
    pdfs = sorted([
        f for f in os.listdir(HOVER_DIR)
        if f.endswith(".pdf") and not f.startswith("._")
    ])
    print(f"  Found {len(pdfs)} HOVER PDFs")

    all_records = []
    for i, fname in enumerate(pdfs, 1):
        record = extract_doors_from_pdf(os.path.join(HOVER_DIR, fname))
        if record:
            all_records.append(record)
        if i % 100 == 0:
            print(f"  Processed {i}/{len(pdfs)}...")

    print(f"  Extracted door data from {len(all_records)} properties")
    total_doors = sum(r["total_doors"] for r in all_records)
    total_entry = sum(r["front_doors"] + r["rear_doors"] for r in all_records)
    total_sgd = sum(r["sliding_doors"] for r in all_records)
    print(f"  Total doors: {total_doors:,} (entry: {total_entry:,}, sliding: {total_sgd:,})\n")

    # Step 2: Group by city
    print("Step 2: Grouping by city...")
    city_groups: dict[str, list[dict]] = {}
    for r in all_records:
        if r["city"] == "Unknown":
            continue
        key = f"{r['city']}, {r['state']}"
        city_groups.setdefault(key, []).append(r)

    cities = sorted(city_groups.keys())
    print(f"  {len(cities)} cities with door data\n")

    if city_filter:
        cities = [c for c in cities if city_filter.lower() in c.lower()]
        print(f"  Filtered to {len(cities)} cities matching '{city_filter}'\n")

    # Step 3: Fetch Strapi door pages
    print("Step 3: Fetching Doors pages from Strapi...")
    door_pages = fetch_door_pages()
    print(f"  {len(door_pages)} Doors pages found\n")

    # Build lookup: city -> page
    page_lookup: dict[str, dict] = {}
    for p in door_pages:
        title = p["title"]
        parts = [x.strip() for x in title.split(" - ")]
        if parts[0] != "Doors":
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

        total_d = sum(p["total_doors"] for p in properties)

        print(f"  [{ci}/{len(cities)}] {page['title']} ({page['documentId']})")
        print(
            f"    Properties: {len(properties)}, Total doors: {total_d}"
        )

        # Generate H2 and paragraph
        h2, paragraph = generate_h2_and_paragraph(
            city, state, total_d, len(properties)
        )
        print(f"    H2: {h2}")

        # Generate notes
        notes = generate_notes_batch(city, state, properties)
        time.sleep(0.3)

        # Build table HTML
        table_html = build_doors_table(properties, notes)
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
    print(f"  Cities with door data:   {len(city_groups)}")
    print(f"  Matched to CMS pages:    {matched}")
    print(f"  No CMS page found:       {no_page}")
    print(f"  Pushed/previewed:        {pushed}")
    if failed:
        print(f"  Failed:                  {failed}")
    print(f"  Mode:                    {'DRY RUN' if dry_run else 'LIVE'}")


if __name__ == "__main__":
    main()
