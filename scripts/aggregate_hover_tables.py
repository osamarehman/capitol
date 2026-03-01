"""
Aggregate HOVER measurements by city and generate 4 service-specific HTML tables
(siding, gutter, door, roofing) with H2 headings and marketing paragraphs.

Reads hover_measurements.json, groups by city/state, generates:
  - Table 1 (SIDING): street, city, state, zip, stories, siding_squares, siding_sqft,
                       trim_sqft, soffit_sqft, material_mix, notes
  - Table 2 (GUTTER): street, city, state, zip, stories, gutter_length_ft,
                       eaves_length_ft, roof_pitch, exterior_type
  - Table 3 (DOOR):   street, city, state, zip, entry_doors, sliding_glass_doors
  - Table 4 (ROOFING): street, city, state, zip, stories, roof_squares, dominant_pitch,
                        roof_facets, ridges_hips_ft, valleys_ft, eaves_ft, notes

Output: hover_inspection_data.json

Usage:
    python aggregate_hover_tables.py --skip-ai       # template text only
    python aggregate_hover_tables.py                  # with AI paragraphs + notes
    python aggregate_hover_tables.py --city=Bowie     # single city
    python aggregate_hover_tables.py --limit=5        # first N cities
"""
import json
import os
import re
import sys
import time
import urllib.request

from dotenv import load_dotenv

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(SCRIPT_DIR, "migration", ".env"))

INPUT_JSON = os.path.join(SCRIPT_DIR, "hover_measurements.json")
OUTPUT_JSON = os.path.join(SCRIPT_DIR, "hover_inspection_data.json")

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")


# ── Helpers ──────────────────────────────────────────────────────────────────

def format_number(n) -> str:
    """Format number with commas."""
    return f"{int(n):,}"


def classify_pitch(pitch: int) -> str:
    """Classify roof pitch into water velocity category."""
    if pitch >= 8:
        return "High"
    elif pitch >= 4:
        return "Moderate"
    else:
        return "Low"


def material_mix_str(materials: dict) -> str:
    """Format material types dict as a readable string."""
    if not materials:
        return "N/A"
    parts = []
    for mat, count in sorted(materials.items(), key=lambda x: -x[1]):
        parts.append(f"{mat} ({count})")
    return ", ".join(parts)


def strip_house_number(address: str) -> str:
    """Remove leading house number: '214 Westdale Drive' -> 'Westdale Drive'."""
    return re.sub(r"^\d+[A-Za-z]?\s*[-]?\s*", "", address).strip()


def exterior_type_note(record: dict) -> str:
    """Generate a note about exterior drainage characteristics."""
    valleys = record.get("valleys_count", 0)
    pitches = record.get("pitch_breakdown", [])
    unique_pitches = len(pitches)

    parts = []
    if valleys > 3:
        parts.append(f"{valleys} valleys")
    if unique_pitches > 2:
        parts.append(f"{unique_pitches} pitch planes")

    if parts:
        return f"Complex drainage: {', '.join(parts)}"
    return "Standard drainage"


# ── AI text generation ───────────────────────────────────────────────────────

def call_claude(prompt: str, max_tokens: int = 1500) -> str | None:
    """Call Anthropic Claude API and return text response."""
    if not ANTHROPIC_API_KEY:
        return None

    payload = json.dumps({
        "model": "claude-sonnet-4-20250514",
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
        text = result["content"][0]["text"].strip()
        text = re.sub(r"^```html?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
        return text.strip()
    except Exception as e:
        print(f"    AI ERROR: {e}")
        return None


def generate_ai_notes_batch(
    service_type: str, city: str, state: str, properties: list[dict]
) -> list[str]:
    """Generate per-property notes for a batch of properties in one API call."""
    city_state = f"{city}, {state}"
    props_text = ""
    for i, p in enumerate(properties, 1):
        street = strip_house_number(p["street"])
        if service_type == "siding":
            props_text += (
                f"{i}. {street}: {p['siding_sqft']:.0f} sqft siding, "
                f"{p['trim_sqft']:.0f} sqft trim, {p['soffit_sqft']:.0f} sqft soffit, "
                f"materials: {material_mix_str(p.get('material_types', {}))}\n"
            )
        elif service_type == "roofing":
            props_text += (
                f"{i}. {street}: {p['roof_area_sqft']:.0f} sqft roof ({p['roof_facets']} facets), "
                f"pitch {p['dominant_pitch']}/12, "
                f"{p['ridges_hips_ft']:.0f}ft ridges/hips, {p['valleys_ft']:.0f}ft valleys\n"
            )
        elif service_type == "gutter":
            props_text += (
                f"{i}. {street}: {p['gutter_length_ft']:.0f}ft gutter line, "
                f"pitch {p['dominant_pitch']}/12, {p['eaves_ft']:.0f}ft eaves\n"
            )
        elif service_type == "door":
            props_text += (
                f"{i}. {street}: {p['entry_doors']} entry doors, "
                f"{p['sliding_glass_doors']} sliding glass doors\n"
            )

    prompt = f"""For each numbered property below in {city_state}, write a brief 1-sentence observation
that a home inspector would note based on the {service_type} data. Keep each under 15 words.
Be specific to the numbers — mention notable values, materials, or complexity.
Do NOT use generic phrases like "standard" or "typical".

Properties:
{props_text}

Return ONLY a numbered list matching the input, one line per property. Example format:
1. Large siding area with brick accents requires detailed trim work
2. Multi-material facade increases inspection complexity
"""

    result = call_claude(prompt, max_tokens=2000)
    if not result:
        return [""] * len(properties)

    # Parse numbered list
    notes = []
    lines = result.strip().split("\n")
    for line in lines:
        m = re.match(r"^\d+\.\s*(.+)$", line.strip())
        if m:
            notes.append(m.group(1).strip())

    # Pad if fewer notes returned
    while len(notes) < len(properties):
        notes.append("")

    return notes[:len(properties)]


def generate_ai_paragraph(
    service_type: str, city: str, state: str, stats: dict
) -> str | None:
    """Generate a marketing paragraph for a city + service type."""
    city_state = f"{city}, {state}"

    if service_type == "siding":
        prompt = f"""Write one paragraph (2-3 sentences) for a siding company's local service page in {city_state}.

Data:
- {stats['properties']} properties inspected
- {format_number(stats['total_siding_squares'])} squares of siding measured
- {format_number(stats['total_siding_sqft'])} total square feet of siding
- {format_number(stats['total_soffit_sqft'])} square feet of soffit
- Common materials: {stats.get('common_materials', 'various')}

Emphasize hands-on local inspection experience. Mention the specific numbers naturally.
Tone: professional, trustworthy, local expertise. Do NOT use generic marketing filler.
Output as raw text only (no HTML tags, no markdown). Just the paragraph text."""

    elif service_type == "gutter":
        prompt = f"""Write one paragraph (2-3 sentences) for a gutter company's local service page in {city_state}.

Data:
- {stats['properties']} properties inspected
- {format_number(stats['total_gutter_ft'])} total linear feet of gutter lines measured
- {format_number(stats['total_eaves_ft'])} linear feet of eaves

Emphasize how properly maintained gutters protect against water damage.
Mention the specific numbers naturally.
Tone: professional, trustworthy, local expertise. Do NOT use generic marketing filler.
Output as raw text only (no HTML tags, no markdown). Just the paragraph text."""

    elif service_type == "door":
        prompt = f"""Write one paragraph (2-3 sentences) for a door installation company's local service page in {city_state}.

Data:
- {stats['properties']} properties inspected
- {format_number(stats['total_entry_doors'])} entry doors measured
- {format_number(stats['total_sliding_glass'])} sliding glass doors measured

Emphasize our inspection experience and how proper door installation affects energy efficiency and security.
Mention the specific numbers naturally.
Tone: professional, trustworthy, local expertise. Do NOT use generic marketing filler.
Output as raw text only (no HTML tags, no markdown). Just the paragraph text."""

    elif service_type == "roofing":
        prompt = f"""Write one paragraph (2-3 sentences) for a roofing company's local service page in {city_state}.

Data:
- {stats['properties']} properties inspected
- {format_number(stats['total_roof_squares'])} total squares of roofing inspected
- {format_number(stats['total_facets'])} roof facets
- {format_number(stats['total_valleys_ft'])} feet of valleys
- {format_number(stats['total_ridges_hips_ft'])} feet of ridges and hips

Emphasize hands-on local inspection experience. Mention the specific numbers naturally.
Tone: professional, trustworthy, local expertise. Do NOT use generic marketing filler.
Output as raw text only (no HTML tags, no markdown). Just the paragraph text."""
    else:
        return None

    return call_claude(prompt, max_tokens=500)


# ── Template text (fallback) ────────────────────────────────────────────────

def generate_template_paragraph(
    service_type: str, city: str, state: str, stats: dict
) -> str:
    """Generate template paragraph without AI."""
    cs = f"{city}, {state}"

    if service_type == "siding":
        return (
            f"In {cs}, our certified professionals have conducted comprehensive "
            f"siding inspections on {stats['properties']} properties, measuring "
            f"{format_number(stats['total_siding_sqft'])} square feet of siding facades. "
            f"Our detailed assessments cover materials, trim, soffit, and corner "
            f"measurements to ensure your home's exterior is fully protected."
        )
    elif service_type == "gutter":
        return (
            f"In {cs}, we have inspected and measured "
            f"{format_number(stats['total_gutter_ft'])} linear feet of gutter lines "
            f"across {stats['properties']} properties. Properly maintained gutters are "
            f"essential for directing water away from your foundation, protecting your "
            f"landscaping, siding, and basement from costly water damage."
        )
    elif service_type == "door":
        return (
            f"In {cs}, our inspection team has measured and assessed "
            f"{format_number(stats['total_entry_doors'])} entry doors and "
            f"{format_number(stats['total_sliding_glass'])} sliding glass doors "
            f"across {stats['properties']} properties. Properly installed doors are "
            f"critical to your home's energy efficiency, security, and curb appeal."
        )
    elif service_type == "roofing":
        return (
            f"In {cs}, we have inspected {format_number(stats['total_roof_squares'])} "
            f"squares of roofing across {stats['properties']} properties, covering "
            f"{format_number(stats['total_facets'])} roof facets, "
            f"{format_number(stats['total_valleys_ft'])} feet of valleys, and "
            f"{format_number(stats['total_ridges_hips_ft'])} feet of ridges and hips."
        )
    return ""


# ── H2 headings ─────────────────────────────────────────────────────────────

def generate_h2(service_type: str, city: str, state: str, stats: dict) -> str:
    """Generate H2 heading with exact numbers."""
    cs = f"{city}, {state}"

    if service_type == "siding":
        return (
            f"{format_number(stats['total_siding_squares'])} Squares of "
            f"Siding Inspected in {cs}"
        )
    elif service_type == "gutter":
        return (
            f"{format_number(stats['total_gutter_ft'])} Linear Feet of "
            f"Gutters Inspected in {cs}"
        )
    elif service_type == "door":
        total = stats["total_entry_doors"] + stats["total_sliding_glass"]
        return f"{format_number(total)} Doors Inspected in {cs}"
    elif service_type == "roofing":
        return (
            f"{format_number(stats['total_roof_squares'])} Squares of "
            f"Roofing Inspected in {cs}"
        )
    return ""


# ── HTML table builders ─────────────────────────────────────────────────────

def build_siding_table(properties: list[dict], notes: list[str]) -> str:
    """Build HTML table for siding service."""
    rows = []
    for i, p in enumerate(properties):
        street = strip_house_number(p["street"])
        note = notes[i] if i < len(notes) else ""
        rows.append(
            f"<tr>"
            f"<td>{street}</td>"
            f"<td>{p['city']}</td>"
            f"<td>{p['state']}</td>"
            f"<td>{p['zip']}</td>"
            f"<td>{p['stories'] or 'N/A'}</td>"
            f"<td>{p['siding_squares']}</td>"
            f"<td>{format_number(p['siding_sqft'])}</td>"
            f"<td>{format_number(p['trim_sqft'])}</td>"
            f"<td>{format_number(p['soffit_sqft'])}</td>"
            f"<td>{material_mix_str(p.get('material_types', {}))}</td>"
            f"<td>{note}</td>"
            f"</tr>"
        )

    return (
        "<thead><tr>"
        "<th>Address</th><th>City</th><th>State</th><th>Zip</th>"
        "<th>Stories</th><th>Siding Sq</th><th>Siding SqFt</th>"
        "<th>Trim SqFt</th><th>Soffit SqFt</th><th>Materials</th><th>Notes</th>"
        "</tr></thead>"
        "<tbody>" + "".join(rows) + "</tbody>"
    )


def build_gutter_table(properties: list[dict]) -> str:
    """Build HTML table for gutter service."""
    rows = []
    for p in properties:
        street = strip_house_number(p["street"])
        pitch_label = classify_pitch(p["dominant_pitch"])
        ext_note = exterior_type_note(p)
        rows.append(
            f"<tr>"
            f"<td>{street}</td>"
            f"<td>{p['city']}</td>"
            f"<td>{p['state']}</td>"
            f"<td>{p['zip']}</td>"
            f"<td>{p['stories'] or 'N/A'}</td>"
            f"<td>{p['gutter_length_ft']:.0f}</td>"
            f"<td>{p['eaves_ft']:.0f}</td>"
            f"<td>{p['dominant_pitch']}/12 ({pitch_label})</td>"
            f"<td>{ext_note}</td>"
            f"</tr>"
        )

    return (
        "<thead><tr>"
        "<th>Address</th><th>City</th><th>State</th><th>Zip</th>"
        "<th>Stories</th><th>Gutter Length (ft)</th><th>Eaves (ft)</th>"
        "<th>Roof Pitch</th><th>Drainage Notes</th>"
        "</tr></thead>"
        "<tbody>" + "".join(rows) + "</tbody>"
    )


def build_door_table(properties: list[dict]) -> str:
    """Build HTML table for door service."""
    rows = []
    for p in properties:
        street = strip_house_number(p["street"])
        rows.append(
            f"<tr>"
            f"<td>{street}</td>"
            f"<td>{p['city']}</td>"
            f"<td>{p['state']}</td>"
            f"<td>{p['zip']}</td>"
            f"<td>{p['entry_doors']}</td>"
            f"<td>{p['sliding_glass_doors']}</td>"
            f"</tr>"
        )

    return (
        "<thead><tr>"
        "<th>Address</th><th>City</th><th>State</th><th>Zip</th>"
        "<th>Entry Doors</th><th>Sliding Glass Doors</th>"
        "</tr></thead>"
        "<tbody>" + "".join(rows) + "</tbody>"
    )


def build_roofing_table(properties: list[dict], notes: list[str]) -> str:
    """Build HTML table for roofing service."""
    rows = []
    for i, p in enumerate(properties):
        street = strip_house_number(p["street"])
        note = notes[i] if i < len(notes) else ""
        rows.append(
            f"<tr>"
            f"<td>{street}</td>"
            f"<td>{p['city']}</td>"
            f"<td>{p['state']}</td>"
            f"<td>{p['zip']}</td>"
            f"<td>{p['stories'] or 'N/A'}</td>"
            f"<td>{p['roof_squares']}</td>"
            f"<td>{p['dominant_pitch']}/12</td>"
            f"<td>{p['roof_facets']}</td>"
            f"<td>{p['ridges_hips_ft']:.0f}</td>"
            f"<td>{p['valleys_ft']:.0f}</td>"
            f"<td>{p['eaves_ft']:.0f}</td>"
            f"<td>{note}</td>"
            f"</tr>"
        )

    return (
        "<thead><tr>"
        "<th>Address</th><th>City</th><th>State</th><th>Zip</th>"
        "<th>Stories</th><th>Roof Sq</th><th>Pitch</th>"
        "<th>Facets</th><th>Ridges/Hips (ft)</th><th>Valleys (ft)</th>"
        "<th>Eaves (ft)</th><th>Notes</th>"
        "</tr></thead>"
        "<tbody>" + "".join(rows) + "</tbody>"
    )


def wrap_table_html(h2: str, paragraph: str, table_inner: str) -> str:
    """Wrap table with H2, paragraph, and standard table wrapper."""
    return (
        f'<h2>{h2}</h2>\n'
        f'<p>{paragraph}</p>\n'
        f'<div class="table-wrapper"><figure class="table">'
        f'<table class="warranty-table">'
        f'{table_inner}'
        f'</table></figure></div>'
    )


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    skip_ai = "--skip-ai" in args
    city_filter = None
    limit = None

    for arg in args:
        if arg.startswith("--city="):
            city_filter = arg.split("=", 1)[1]
        elif arg.startswith("--limit="):
            limit = int(arg.split("=")[1])

    # Load measurements
    with open(INPUT_JSON, encoding="utf-8") as f:
        records = json.load(f)

    print(f"Loaded {len(records)} measurement records")

    # Filter out Unknown cities
    records = [r for r in records if r["city"] != "Unknown"]
    print(f"After filtering unknowns: {len(records)}")

    # Group by city, state
    city_groups: dict[str, list[dict]] = {}
    for r in records:
        key = f"{r['city']}, {r['state']}"
        city_groups.setdefault(key, []).append(r)

    cities = sorted(city_groups.keys())
    print(f"Cities: {len(cities)}")

    if city_filter:
        cities = [c for c in cities if city_filter.lower() in c.lower()]
        print(f"Filtered to {len(cities)} cities matching '{city_filter}'")

    if limit:
        cities = cities[:limit]
        print(f"Limited to {limit} cities")

    print()

    if skip_ai:
        print("Skipping AI generation, using templates.\n")
    elif not ANTHROPIC_API_KEY:
        print("WARNING: ANTHROPIC_API_KEY not set, falling back to templates.\n")
        skip_ai = True

    output: dict[str, dict] = {}
    ai_calls = 0
    service_types = ["siding", "gutter", "door", "roofing"]

    for ci, city_state in enumerate(cities, 1):
        properties = city_groups[city_state]
        city = properties[0]["city"]
        state = properties[0]["state"]

        print(f"[{ci}/{len(cities)}] {city_state} ({len(properties)} properties)")

        # Compute aggregate stats
        stats = {
            "properties": len(properties),
            "total_siding_sqft": sum(p["siding_sqft"] for p in properties),
            "total_siding_squares": int(
                sum(p["siding_sqft"] for p in properties) / 100
            ),
            "total_trim_sqft": sum(p["trim_sqft"] for p in properties),
            "total_soffit_sqft": sum(p["soffit_sqft"] for p in properties),
            "total_gutter_ft": sum(p["gutter_length_ft"] for p in properties),
            "total_eaves_ft": sum(p["eaves_ft"] for p in properties),
            "total_entry_doors": sum(p["entry_doors"] for p in properties),
            "total_sliding_glass": sum(
                p["sliding_glass_doors"] for p in properties
            ),
            "total_roof_sqft": sum(p["roof_area_sqft"] for p in properties),
            "total_roof_squares": int(
                sum(p["roof_area_sqft"] for p in properties) / 100
            ),
            "total_facets": sum(p["roof_facets"] for p in properties),
            "total_valleys_ft": int(sum(p["valleys_ft"] for p in properties)),
            "total_ridges_hips_ft": int(
                sum(p["ridges_hips_ft"] for p in properties)
            ),
        }

        # Common materials
        from collections import Counter
        all_mats: Counter = Counter()
        for p in properties:
            for mat, cnt in p.get("material_types", {}).items():
                all_mats[mat] += cnt
        stats["common_materials"] = ", ".join(
            f"{m}" for m, _ in all_mats.most_common(3)
        )

        city_output: dict = {}

        for svc in service_types:
            # Generate H2
            h2 = generate_h2(svc, city, state, stats)

            # Generate paragraph
            if skip_ai:
                paragraph = generate_template_paragraph(svc, city, state, stats)
            else:
                paragraph = generate_ai_paragraph(svc, city, state, stats)
                ai_calls += 1
                if not paragraph:
                    paragraph = generate_template_paragraph(
                        svc, city, state, stats
                    )
                time.sleep(0.3)

            # Generate per-property notes (AI or empty)
            notes: list[str] = []
            if not skip_ai and svc in ("siding", "roofing"):
                notes = generate_ai_notes_batch(svc, city, state, properties)
                ai_calls += 1
                time.sleep(0.3)
            else:
                notes = [""] * len(properties)

            # Build table
            if svc == "siding":
                table_inner = build_siding_table(properties, notes)
            elif svc == "gutter":
                table_inner = build_gutter_table(properties)
            elif svc == "door":
                table_inner = build_door_table(properties)
            elif svc == "roofing":
                table_inner = build_roofing_table(properties, notes)
            else:
                continue

            html = wrap_table_html(h2, paragraph, table_inner)

            city_output[svc] = {
                "h2": h2,
                "paragraph": paragraph,
                "html": html,
                "properties_count": len(properties),
                "stats": {k: v for k, v in stats.items() if not k.startswith("common")},
            }

        output[city_state] = city_output

    # Write output
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\nOutput: {OUTPUT_JSON}")
    print(f"Cities: {len(output)}")
    print(f"Service types per city: {len(service_types)}")
    total_entries = len(output) * len(service_types)
    print(f"Total entries: {total_entries}")
    if not skip_ai:
        print(f"AI calls made: {ai_calls}")


if __name__ == "__main__":
    main()
