"""
Process all roofing/gutter PDFs (GAF QuickMeasure + HOVER) and generate
city-aggregated JSON with H2 headings and paragraphs for service pages.

Sources:
  - quickmeasure_pdfs/  (GAF QuickMeasure PDFs extracted from mbox)
  - mbox/Siding - Windows - Gutters Data/  (HOVER PDFs)
"""
import json
import os
import re
import sys
from collections import defaultdict

import pymupdf

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Normalize truncated / variant city names to canonical form
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
    "United": None,  # skip — partial from "United States"
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
}
GAF_DIR = os.path.join(SCRIPT_DIR, "quickmeasure_pdfs")
HOVER_DIR = os.path.join(
    SCRIPT_DIR, "mbox", "Siding - Windows - Gutters Data",
    "Siding _ Windows _ Gutters _ Roof"
)
OUTPUT_JSON = os.path.join(SCRIPT_DIR, "service_page_data.json")


# ── Parsers ──────────────────────────────────────────────────────────────────

def parse_number(s: str) -> float:
    """Parse '3,595' or '3595' into a float."""
    return float(s.replace(",", ""))


def normalize_city(city: str, state: str) -> tuple[str, str] | None:
    """Normalize city name. Returns None if record should be skipped."""
    key = city.strip()
    if key in CITY_NORMALIZE:
        replacement = CITY_NORMALIZE[key]
        if replacement is None:
            return None
        city = replacement
    # Fix "Washington" with state "MD" -> should be DC
    if city == "Washington" and state == "MD":
        state = "DC"
    return city, state


def parse_feet_inches(s: str) -> float:
    """Parse HOVER format like `413' 3\"` into total feet (float)."""
    m = re.match(r"([\d,]+)'\s*(\d+)?\"?", s.strip())
    if m:
        feet = parse_number(m.group(1))
        inches = int(m.group(2)) if m.group(2) else 0
        return feet + inches / 12.0
    # Fallback: try plain number
    try:
        return parse_number(s.strip().rstrip('"\''))
    except ValueError:
        return 0.0


def extract_gaf(pdf_path: str) -> dict | None:
    """Extract measurements from a GAF QuickMeasure FullReport PDF."""
    try:
        doc = pymupdf.open(pdf_path)
    except Exception:
        return None

    if len(doc) == 0:
        doc.close()
        return None

    text = doc[0].get_text()
    doc.close()

    lines = [l.strip() for l in text.split("\n") if l.strip()]
    if not lines:
        return None

    address_line = lines[0]

    # Parse "2521 Oxon Run Dr, Temple Hills, MD 20748"
    addr_match = re.match(
        r'^(.+),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})', address_line
    )
    if addr_match:
        city = addr_match.group(2).strip()
        state = addr_match.group(3).strip()
    else:
        parts = address_line.rsplit(",", 2)
        if len(parts) >= 3:
            city = parts[-2].strip()
            state_zip = parts[-1].strip().split()
            state = state_zip[0] if state_zip else "Unknown"
        else:
            return None

    data = {
        "source": "gaf",
        "address": address_line,
        "city": city,
        "state": state,
        "roof_area_sqft": 0.0,
        "roof_facets": 0,
        "valleys_ft": 0.0,
        "ridges_hips_ft": 0.0,
        "rakes_ft": 0.0,
        "eaves_ft": 0.0,
        "siding_sqft": 0.0,
        "window_count": 0,
        "window_perimeter_ft": 0.0,
    }

    patterns = {
        "roof_area_sqft": r'Roof\s+Area\s*\n?\s*([\d,]+)\s*sq\s*ft',
        "roof_facets": r'Roof\s+Facets\s*\n?\s*(\d+)',
        "valleys_ft": r'Valleys\s*\n?\s*([\d,]+)\s*ft',
        "ridges_hips_ft": r'Ridges/Hips\s*\n?\s*([\d,]+)\s*ft',
        "rakes_ft": r'Rakes\s*\n?\s*([\d,]+)\s*ft',
        "eaves_ft": r'Eaves\s*\n?\s*([\d,]+)\s*ft',
    }

    for key, pattern in patterns.items():
        match = re.search(pattern, text)
        if match:
            data[key] = parse_number(match.group(1))

    return data


def extract_hover(pdf_path: str) -> dict | None:
    """Extract measurements from a HOVER Complete Measurements PDF."""
    try:
        doc = pymupdf.open(pdf_path)
    except Exception:
        return None

    if len(doc) == 0:
        doc.close()
        return None

    # Page 1: address info
    p1_text = doc[0].get_text()
    p1_lines = [l.strip() for l in p1_text.split("\n") if l.strip()]

    # Typical lines: "Complete Measurements", "1437 Monroe Street Northeast",
    #                "WASHINGTON, DC 20017"
    city = "Unknown"
    state = "Unknown"

    for line in p1_lines:
        # Format 1: "WASHINGTON, DC 20017" or "BOWIE , MD 20720"
        m = re.match(r'^([A-Z][A-Z\s-]+?)\s*,\s*([A-Z]{2})\s+\d{5}', line)
        if m:
            city = m.group(1).strip().title()
            state = m.group(2).strip()
            break

        # Format 2: "Clinton MD 20735" or "Bethesda MD 20814" (no comma)
        m = re.search(r'([A-Za-z][A-Za-z\s-]+?)\s+([A-Z]{2})\s+(\d{5})\s*$', line)
        if m:
            city = m.group(1).strip().title()
            state = m.group(2).strip()
            break

        # Format 3: truncated "1506 Maryland Avenue, Woodbridge..."
        m = re.search(r',\s*([A-Za-z][A-Za-z\s-]+?)\.\.\.', line)
        if m:
            city = m.group(1).strip().title()
            state = "MD"  # default for this dataset
            break

    address_line = p1_lines[1] if len(p1_lines) > 1 else "Unknown"

    # Find ROOF SUMMARY page (usually page 3) and SUMMARY page (page 2, siding)
    roof_text = ""
    summary_text = ""
    for pg_i in range(min(6, len(doc))):
        t = doc[pg_i].get_text()
        if "ROOF SUMMARY" in t:
            roof_text = t
        if "SUMMARY" in t and "Siding" in t and "Facades" in t:
            summary_text = t

    doc.close()

    if not roof_text and not summary_text:
        return None

    data = {
        "source": "hover",
        "address": address_line,
        "city": city,
        "state": state,
        "roof_area_sqft": 0.0,
        "roof_facets": 0,
        "valleys_ft": 0.0,
        "ridges_hips_ft": 0.0,
        "rakes_ft": 0.0,
        "eaves_ft": 0.0,
        "siding_sqft": 0.0,
        "window_count": 0,
        "window_perimeter_ft": 0.0,
    }

    # HOVER format: "Roof Facets\n3502 ft²\n22\n-"
    area_match = re.search(r'Roof\s+Facets\s*\n\s*([\d,]+)\s*ft', roof_text)
    if area_match:
        data["roof_area_sqft"] = parse_number(area_match.group(1))

    facets_match = re.search(r'Roof\s+Facets\s*\n\s*[\d,]+\s*ft.\s*\n\s*(\d+)', roof_text)
    if facets_match:
        data["roof_facets"] = int(facets_match.group(1))

    # "Ridges / Hips\n-\n16\n239' 2\""
    rh_match = re.search(r"Ridges\s*/\s*Hips\s*\n\s*-\s*\n\s*\d+\s*\n\s*(.+?)$", roof_text, re.M)
    if rh_match:
        data["ridges_hips_ft"] = parse_feet_inches(rh_match.group(1))

    # "Valleys\n-\n3\n48' 5\""
    val_match = re.search(r"Valleys\s*\n\s*-\s*\n\s*\d+\s*\n\s*(.+?)$", roof_text, re.M)
    if val_match:
        data["valleys_ft"] = parse_feet_inches(val_match.group(1))

    # "Rakes\n-\n5\n53' 4\""
    rakes_match = re.search(r"Rakes\s*\n\s*-\s*\n\s*\d+\s*\n\s*(.+?)$", roof_text, re.M)
    if rakes_match:
        data["rakes_ft"] = parse_feet_inches(rakes_match.group(1))

    # "Eaves\n-\n21\n413' 3\""
    eaves_match = re.search(r"Eaves\s*\n\s*-\s*\n\s*\d+\s*\n\s*(.+?)$", roof_text, re.M)
    if eaves_match:
        data["eaves_ft"] = parse_feet_inches(eaves_match.group(1))

    # ── Siding data from SUMMARY page ──
    if summary_text:
        # "Facades\n2751 ft²\n496 ft²" → siding facades area
        siding_match = re.search(r'Facades\s*\n\s*([\d,]+)\s*ft', summary_text)
        if siding_match:
            data["siding_sqft"] = parse_number(siding_match.group(1))

        # "Openings\nSiding\nOther\nQuantity\n34\n"
        win_match = re.search(r'Openings\s*\nSiding\s*\nOther\s*\nQuantity\s*\n\s*(\d+)', summary_text)
        if win_match:
            data["window_count"] = int(win_match.group(1))

        # "Total Perimeter\n792'\n" (window/opening perimeter)
        perim_match = re.search(r"Total\s+Perimeter\s*\n\s*(.+?)\s*\n", summary_text)
        if perim_match:
            data["window_perimeter_ft"] = parse_feet_inches(perim_match.group(1))

    return data


# ── Main ─────────────────────────────────────────────────────────────────────

def collect_gaf_pdfs() -> list[str]:
    """Collect GAF QuickMeasure FullReport PDFs."""
    if not os.path.isdir(GAF_DIR):
        print(f"GAF directory not found: {GAF_DIR}")
        return []
    return sorted([
        os.path.join(GAF_DIR, f)
        for f in os.listdir(GAF_DIR)
        if f.endswith("_FullReport.pdf") and not f.startswith("._")
    ])


def collect_hover_pdfs() -> list[str]:
    """Collect HOVER PDFs."""
    if not os.path.isdir(HOVER_DIR):
        print(f"HOVER directory not found: {HOVER_DIR}")
        return []
    return sorted([
        os.path.join(HOVER_DIR, f)
        for f in os.listdir(HOVER_DIR)
        if f.endswith(".pdf") and not f.startswith("._")
    ])


def format_number(n: int) -> str:
    """Format number with commas: 12345 -> '12,345'."""
    return f"{n:,}"


def round_to_nearest(n: float, nearest: int = 100) -> int:
    """Round down to nearest hundred for display (e.g. 1,234 -> 1,200).
    For values < nearest, returns the raw int value."""
    rounded = int(n // nearest) * nearest
    return rounded if rounded > 0 else int(n)


def main():
    gaf_files = collect_gaf_pdfs()
    hover_files = collect_hover_pdfs()

    print(f"Found {len(gaf_files)} GAF QuickMeasure FullReport PDFs")
    print(f"Found {len(hover_files)} HOVER PDFs")
    print()

    all_records: list[dict] = []
    errors = 0

    # Process GAF
    for i, path in enumerate(gaf_files, 1):
        data = extract_gaf(path)
        if data:
            all_records.append(data)
        else:
            errors += 1
        if i % 100 == 0:
            print(f"  GAF: {i}/{len(gaf_files)}...")

    print(f"  GAF: extracted {sum(1 for r in all_records if r['source'] == 'gaf')} records ({errors} errors)")

    # Process HOVER
    hover_errors = 0
    for i, path in enumerate(hover_files, 1):
        data = extract_hover(path)
        if data:
            all_records.append(data)
        else:
            hover_errors += 1
        if i % 100 == 0:
            print(f"  HOVER: {i}/{len(hover_files)}...")

    errors += hover_errors
    print(f"  HOVER: extracted {sum(1 for r in all_records if r['source'] == 'hover')} records ({hover_errors} errors)")
    print(f"\nTotal records: {len(all_records)} ({errors} total errors)")

    # ── Aggregate by city, state ──
    city_agg = defaultdict(lambda: {
        "properties": 0,
        "roof_area_sqft": 0.0,
        "roof_facets": 0,
        "valleys_ft": 0.0,
        "ridges_hips_ft": 0.0,
        "rakes_ft": 0.0,
        "eaves_ft": 0.0,
        "siding_sqft": 0.0,
        "window_count": 0,
        "window_perimeter_ft": 0.0,
    })

    for r in all_records:
        result = normalize_city(r["city"], r["state"])
        if result is None:
            continue
        city, state = result
        key = f"{city}, {state}"
        d = city_agg[key]
        d["properties"] += 1
        d["roof_area_sqft"] += r["roof_area_sqft"]
        d["roof_facets"] += r["roof_facets"]
        d["valleys_ft"] += r["valleys_ft"]
        d["ridges_hips_ft"] += r["ridges_hips_ft"]
        d["rakes_ft"] += r["rakes_ft"]
        d["eaves_ft"] += r["eaves_ft"]
        d["siding_sqft"] += r.get("siding_sqft", 0.0)
        d["window_count"] += r.get("window_count", 0)
        d["window_perimeter_ft"] += r.get("window_perimeter_ft", 0.0)

    # ── Build JSON output ──
    output = {"cities": {}}

    for city_state in sorted(city_agg.keys()):
        d = city_agg[city_state]
        squares = round_to_nearest(d["roof_area_sqft"] / 100)
        eaves = round_to_nearest(d["eaves_ft"])
        siding = round_to_nearest(d["siding_sqft"])
        windows = int(d["window_count"])
        props = d["properties"]

        output["cities"][city_state] = {
            "properties_inspected": props,
            "roof": {
                "total_squares": int(d["roof_area_sqft"] / 100),
                "total_facets": int(d["roof_facets"]),
                "total_valleys_ft": int(d["valleys_ft"]),
                "total_ridges_hips_ft": int(d["ridges_hips_ft"]),
                "h2": f"We Have Inspected Over {format_number(squares)} Squares of Roofing in {city_state}.",
                "paragraph": (
                    f"In {city_state} we have inspected, repaired, and serviced "
                    f"{format_number(int(d['roof_area_sqft'] / 100))} squares all representing "
                    f"our service to solving roof issues for real owners. "
                    f"Our inspections have covered {format_number(int(d['roof_facets']))} roof facets, "
                    f"{format_number(int(d['valleys_ft']))} feet of valleys, and "
                    f"{format_number(int(d['ridges_hips_ft']))} feet of ridges and hips."
                ),
            },
            "gutters": {
                "total_eaves_ft": int(d["eaves_ft"]),
                "h2": f"We Have Inspected Over {format_number(eaves)} Linear Feet of Gutter in {city_state}.",
                "paragraph": (
                    f"In {city_state} we have inspected, repaired, and serviced "
                    f"{format_number(int(d['eaves_ft']))} linear feet of gutters. "
                    f"Gutters are important to keep the water moving away from your home "
                    f"and an affordable way to prevent water issues near the foundations. "
                    f"Properly maintained gutters protect your landscaping, siding, and "
                    f"basement from costly water-related issues."
                ),
            },
            "siding": {
                "total_sqft": int(d["siding_sqft"]),
                "h2": f"We Have Inspected Over {format_number(siding)} Square Feet of Siding in {city_state}.",
                "paragraph": (
                    f"In {city_state} we have inspected, repaired, and serviced "
                    f"{format_number(int(d['siding_sqft']))} square feet of siding across "
                    f"{props} properties. Our siding inspections cover facade assessments, "
                    f"trim evaluations, and corner measurements to ensure your home's "
                    f"exterior is protected from the elements."
                ),
            },
            "windows": {
                "total_count": windows,
                "total_perimeter_ft": int(d["window_perimeter_ft"]),
                "h2": f"We Have Inspected Over {format_number(round_to_nearest(windows))} Windows and Doors in {city_state}.",
                "paragraph": (
                    f"In {city_state} we have inspected, repaired, and serviced "
                    f"{format_number(windows)} windows and doors across "
                    f"{props} properties, covering {format_number(int(d['window_perimeter_ft']))} "
                    f"linear feet of openings. Properly sealed windows and doors are essential "
                    f"to energy efficiency and protecting your home from water intrusion."
                ),
            },
        }

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\nJSON written: {OUTPUT_JSON}")
    print(f"\n{'City':<30} {'Props':>5} {'Sq':>7} {'Eaves':>8} {'Siding':>8} {'Win':>5}")
    print("-" * 68)
    for city_state in sorted(city_agg.keys()):
        d = city_agg[city_state]
        print(
            f"{city_state:<30} {d['properties']:>5} "
            f"{int(d['roof_area_sqft']/100):>7,} "
            f"{int(d['eaves_ft']):>8,} "
            f"{int(d['siding_sqft']):>8,} "
            f"{int(d['window_count']):>5}"
        )


if __name__ == "__main__":
    main()
