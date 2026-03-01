"""
Extract measurements from ALL PDF report sources into a unified JSON file.

Sources:
  1. HOVER Beacon 3D+ (481 PDFs) — full: siding, roof, gutter, doors, soffit, facades
  2. GAF QuickMeasure FullReport (~1,513 PDFs) — roof + gutter data
  3. EagleView Premium (from mbox) — roof + gutter data
  4. EagleView QuickSquares (from mbox) — minimal: roof squares + pitch
  5. GAF FullReports extracted from mbox — roof + gutter data
  6. EagleView WallsLite (from mbox) — wall/siding area only

Output: hover_measurements.json

Usage:
    python extract_hover_measurements.py                 # extract all
    python extract_hover_measurements.py --limit=10      # first N PDFs per source
    python extract_hover_measurements.py --verbose        # show per-file details
    python extract_hover_measurements.py --source=hover   # only HOVER PDFs
    python extract_hover_measurements.py --source=gaf     # only GAF QuickMeasure
    python extract_hover_measurements.py --source=mbox    # only mbox-extracted
"""
import json
import os
import re
import sys
from collections import Counter

import pymupdf

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HOVER_DIR = os.path.join(
    SCRIPT_DIR, "mbox", "Siding - Windows - Gutters Data",
    "Siding _ Windows _ Gutters _ Roof",
)
GAF_DIR = os.path.join(SCRIPT_DIR, "quickmeasure_pdfs")
MBOX_EXTRACTED_DIR = os.path.join(SCRIPT_DIR, "mbox_extracted_pdfs")
OUTPUT_JSON = os.path.join(SCRIPT_DIR, "hover_measurements.json")

# City name normalization (truncated / variant -> canonical)
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
    "Ijamsville": "Ijamsville",
    "Mitchellville": "Mitchellville",
    "Washington Grove": "Washington Grove",
}


# ── Helpers ──────────────────────────────────────────────────────────────────

def parse_number(s: str) -> float:
    """Parse '3,595' or '3595' into a float."""
    return float(s.replace(",", ""))


def parse_feet_inches(s: str) -> float:
    """Parse HOVER format like `413' 3"` into total feet (float)."""
    m = re.match(r"([\d,]+)'\s*(\d+)?\"?", s.strip())
    if m:
        feet = parse_number(m.group(1))
        inches = int(m.group(2)) if m.group(2) else 0
        return feet + inches / 12.0
    try:
        return parse_number(s.strip().rstrip("\"'"))
    except ValueError:
        return 0.0


def normalize_city(city: str, state: str) -> tuple[str, str] | None:
    """Normalize city name. Returns None if record should be skipped."""
    key = city.strip()
    if key in CITY_NORMALIZE:
        replacement = CITY_NORMALIZE[key]
        if replacement is None:
            return None
        city = replacement
    if city == "Washington" and state == "MD":
        state = "DC"
    return city, state


def make_empty_record(
    source: str, file: str, street: str, city: str, state: str, zipcode: str,
) -> dict:
    """Create an empty measurement record with all fields initialized."""
    return {
        "source": source,
        "file": file,
        "street": street,
        "city": city,
        "state": state,
        "zip": zipcode,
        "stories": "",
        # Siding
        "siding_sqft": 0.0,
        "siding_squares": 0,
        "siding_other_sqft": 0.0,
        "trim_sqft": 0.0,
        "soffit_sqft": 0.0,
        "material_types": {},
        "eaves_fascia_ft": 0.0,
        # Roof
        "roof_area_sqft": 0.0,
        "roof_squares": 0,
        "roof_facets": 0,
        "ridges_hips_ft": 0.0,
        "ridges_hips_count": 0,
        "valleys_ft": 0.0,
        "valleys_count": 0,
        "rakes_ft": 0.0,
        "eaves_ft": 0.0,
        "drip_edge_ft": 0.0,
        "flashing_ft": 0.0,
        "step_flashing_ft": 0.0,
        # Pitch
        "dominant_pitch": 0,
        "pitch_breakdown": [],
        # Gutters
        "gutter_length_ft": 0.0,
        # Doors
        "entry_doors": 0,
        "sliding_glass_doors": 0,
    }


# ══════════════════════════════════════════════════════════════════════════════
# HOVER EXTRACTION (full data: siding, roof, gutter, doors, soffit, facades)
# ══════════════════════════════════════════════════════════════════════════════

def find_pages_by_header(doc) -> dict[str, list[int]]:
    """Scan all pages and map section headers to page indices."""
    sections: dict[str, list[int]] = {}
    for i in range(len(doc)):
        text = doc[i].get_text()
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        for line in lines[1:5]:
            if line in (
                "SUMMARY", "ROOF SUMMARY", "FOOTPRINT", "SOFFIT",
                "FACADES", "OPENINGS", "ROOF MEASUREMENTS",
                "ROOF FACETS", "ROOF AREA", "ROOF PITCH",
            ):
                sections.setdefault(line, []).append(i)
                break
            if line.startswith("Facades") or line.startswith("Soffit Breakdown"):
                sections.setdefault("FACADES", []).append(i)
                break
    return sections


def extract_hover_cover(doc) -> dict:
    """Extract address info from HOVER cover page."""
    text = doc[0].get_text()
    lines = [l.strip() for l in text.split("\n") if l.strip()]

    street = "Unknown"
    city = "Unknown"
    state = "Unknown"
    zipcode = ""

    if len(lines) > 1:
        street = lines[1]

    for line in lines:
        # "WASHINGTON, DC 20017"
        m = re.match(r"^([A-Z][A-Z\s-]+?)\s*,+\s*([A-Z]{2})\s+(\d{5})", line)
        if m:
            city = m.group(1).strip().title()
            state = m.group(2).strip()
            zipcode = m.group(3).strip()
            break

        # "Clinton MD 20735" (no comma)
        m = re.search(
            r"([A-Za-z][A-Za-z\s-]+?)\s+([A-Z]{2})\s+(\d{5})\s*$", line
        )
        if m:
            city = m.group(1).strip().title()
            state = m.group(2).strip()
            zipcode = m.group(3).strip()
            break

        # "1506 Maryland Avenue, Woodbridge..."
        m = re.search(r",\s*([A-Za-z][A-Za-z\s-]+?)\.\.\.", line)
        if m:
            city = m.group(1).strip().title()
            state = "MD"
            break

        # "Bowie, MD, Bowie, MD,..."
        m = re.match(
            r"^([A-Za-z][A-Za-z\s-]+?),\s*([A-Z]{2}),\s*\1", line
        )
        if m:
            city = m.group(1).strip().title()
            state = m.group(2).strip()
            break

        # "Terrace, Potomac, MD, USA,"
        m = re.search(
            r",\s*([A-Za-z][A-Za-z\s-]+?),\s*([A-Z]{2}),\s*USA", line
        )
        if m:
            city = m.group(1).strip().title()
            state = m.group(2).strip()
            break

    return {"street": street, "city": city, "state": state, "zip": zipcode}


def extract_hover_summary(doc, pages: list[int]) -> dict:
    """Extract siding data from SUMMARY page."""
    result = {
        "siding_sqft": 0.0, "siding_other_sqft": 0.0, "trim_sqft": 0.0,
        "openings_count": 0, "openings_perimeter_ft": 0.0, "eaves_fascia_ft": 0.0,
    }
    if not pages:
        return result
    text = doc[pages[0]].get_text()

    m = re.search(r"Facades\s*\n\s*([\d,]+)\s*ft", text)
    if m:
        result["siding_sqft"] = parse_number(m.group(1))
    m = re.search(r"Facades\s*\n\s*[\d,]+\s*ft.\s*\n\s*([\d,]+)\s*ft", text)
    if m:
        result["siding_other_sqft"] = parse_number(m.group(1))
    m = re.search(r"Trims\*?\s*\n\s*([\d,]+)\s*ft", text)
    if m:
        result["trim_sqft"] = parse_number(m.group(1))
    m = re.search(r"Quantity\s*\n\s*(\d+)", text)
    if m:
        result["openings_count"] = int(m.group(1))
    m = re.search(r"Total\s+Perimeter\s*\n\s*(.+?)\s*\n", text)
    if m:
        result["openings_perimeter_ft"] = parse_feet_inches(m.group(1))
    m = re.search(r"Eaves\s+Fascia\s*\n\s*(.+?)\s*\n", text)
    if m:
        result["eaves_fascia_ft"] = parse_feet_inches(m.group(1))
    return result


def extract_hover_roof_summary(doc, pages: list[int]) -> dict:
    """Extract roof data from ROOF SUMMARY page."""
    result = {
        "roof_area_sqft": 0.0, "roof_facets": 0,
        "ridges_hips_ft": 0.0, "ridges_hips_count": 0,
        "valleys_ft": 0.0, "valleys_count": 0,
        "rakes_ft": 0.0, "rakes_count": 0,
        "eaves_ft": 0.0, "eaves_count": 0,
        "drip_edge_ft": 0.0, "flashing_ft": 0.0, "step_flashing_ft": 0.0,
    }
    if not pages:
        return result
    text = doc[pages[0]].get_text()

    m = re.search(r"Roof\s+Facets\s*\n\s*([\d,]+)\s*ft", text)
    if m:
        result["roof_area_sqft"] = parse_number(m.group(1))
    m = re.search(r"Roof\s+Facets\s*\n\s*[\d,]+\s*ft.\s*\n\s*(\d+)", text)
    if m:
        result["roof_facets"] = int(m.group(1))
    m = re.search(r"Ridges\s*/\s*Hips\s*\n\s*-\s*\n\s*(\d+)\s*\n\s*(.+?)$", text, re.M)
    if m:
        result["ridges_hips_count"] = int(m.group(1))
        result["ridges_hips_ft"] = parse_feet_inches(m.group(2))
    m = re.search(r"Valleys\s*\n\s*-\s*\n\s*(\d+)\s*\n\s*(.+?)$", text, re.M)
    if m:
        result["valleys_count"] = int(m.group(1))
        result["valleys_ft"] = parse_feet_inches(m.group(2))
    m = re.search(r"Rakes\s*\n\s*-\s*\n\s*(\d+)\s*\n\s*(.+?)$", text, re.M)
    if m:
        result["rakes_count"] = int(m.group(1))
        result["rakes_ft"] = parse_feet_inches(m.group(2))
    m = re.search(r"Eaves\s*\n\s*-\s*\n\s*(\d+)\s*\n\s*(.+?)$", text, re.M)
    if m:
        result["eaves_count"] = int(m.group(1))
        result["eaves_ft"] = parse_feet_inches(m.group(2))
    m = re.search(r"Drip\s+Edge.*?\n\s*-\s*\n\s*-\s*\n\s*(.+?)$", text, re.M)
    if m:
        result["drip_edge_ft"] = parse_feet_inches(m.group(1))
    m = re.search(r"(?<!Step\s)Flashing\s*\n\s*-\s*\n\s*(\d+)\s*\n\s*(.+?)$", text, re.M)
    if m:
        result["flashing_ft"] = parse_feet_inches(m.group(2))
    m = re.search(r"Step\s+Flashing\s*\n\s*-\s*\n\s*(\d+)\s*\n\s*(.+?)$", text, re.M)
    if m:
        result["step_flashing_ft"] = parse_feet_inches(m.group(2))
    return result


def extract_hover_footprint(doc, pages: list[int]) -> dict:
    result = {"stories": "", "footprint_sqft": 0.0}
    if not pages:
        return result
    text = doc[pages[0]].get_text()
    m = re.search(r"Number\s+of\s+Stories:\s*(.+?)$", text, re.M)
    if m:
        result["stories"] = m.group(1).strip()
    m = re.search(r"Footprint\s+Area:\s*([\d,]+)\s*ft", text)
    if m:
        result["footprint_sqft"] = parse_number(m.group(1))
    return result


def extract_hover_soffit(doc, pages: list[int]) -> dict:
    result = {"soffit_sqft": 0.0}
    if not pages:
        return result
    for pg_idx in pages:
        text = doc[pg_idx].get_text()
        m = re.search(r"Totals\s*\n\s*.+?\n\s*([\d,]+)\s*ft", text)
        if m:
            result["soffit_sqft"] = parse_number(m.group(1))
            break
    return result


def extract_hover_facades(doc, pages: list[int]) -> dict:
    facade_ids: dict[str, set[str]] = {}
    prefix_map = {
        "SI": "Siding", "BR": "Brick", "WR": "Wrap",
        "ST": "Stone", "STU": "Stucco", "ME": "Metal",
        "WO": "Wood", "VI": "Vinyl", "FC": "Fiber Cement",
    }
    if not pages:
        return {"material_types": {}}
    for pg_idx in pages:
        text = doc[pg_idx].get_text()
        for line in text.split("\n"):
            line = line.strip()
            m = re.match(r"^(SI|BR|WR|ST|STU|ME|WO|VI|FC)-(\d+)$", line)
            if m:
                mat = prefix_map.get(m.group(1), "Other")
                facade_ids.setdefault(mat, set()).add(line)
    return {"material_types": {mat: len(ids) for mat, ids in facade_ids.items()}}


def extract_hover_doors(doc, pages: list[int]) -> dict:
    entry_ids: set[str] = set()
    sgd_ids: set[str] = set()
    if not pages:
        return {"entry_doors": 0, "sliding_glass_doors": 0}
    for pg_idx in pages:
        text = doc[pg_idx].get_text()
        if "Doors" not in text:
            continue
        for line in text.split("\n"):
            line = line.strip()
            if re.match(r"^D-\d+$", line):
                entry_ids.add(line)
            elif re.match(r"^SGD-\d+$", line):
                sgd_ids.add(line)
    return {"entry_doors": len(entry_ids), "sliding_glass_doors": len(sgd_ids)}


def extract_hover_pitch(doc, pages: list[int]) -> list[dict]:
    pitches: list[dict] = []
    if not pages:
        return pitches
    text = doc[pages[0]].get_text()
    for m in re.finditer(r"(\d+)\s*/\s*12\s*\n\s*([\d,]+)\s*ft.\s*\n\s*([\d.]+)%", text):
        pitches.append({
            "pitch": int(m.group(1)),
            "area_sqft": parse_number(m.group(2)),
            "percentage": float(m.group(3)),
        })
    return pitches


def extract_hover_full(pdf_path: str, verbose: bool = False) -> dict | None:
    """Extract all measurements from a single HOVER PDF."""
    try:
        doc = pymupdf.open(pdf_path)
    except Exception:
        return None
    if len(doc) == 0:
        doc.close()
        return None

    sections = find_pages_by_header(doc)
    cover = extract_hover_cover(doc)
    summary = extract_hover_summary(doc, sections.get("SUMMARY", []))
    roof = extract_hover_roof_summary(doc, sections.get("ROOF SUMMARY", []))
    footprint = extract_hover_footprint(doc, sections.get("FOOTPRINT", []))
    soffit = extract_hover_soffit(doc, sections.get("SOFFIT", []))
    facades = extract_hover_facades(doc, sections.get("FACADES", []))
    doors = extract_hover_doors(doc, sections.get("OPENINGS", []))
    pitches = extract_hover_pitch(doc, sections.get("ROOF PITCH", []))
    doc.close()

    norm = normalize_city(cover["city"], cover["state"])
    if norm is None:
        return None
    city, state = norm

    siding_sqft = summary["siding_sqft"]
    dominant_pitch = 0
    if pitches:
        dominant_pitch = max(pitches, key=lambda p: p["percentage"])["pitch"]

    record = make_empty_record(
        "hover", os.path.basename(pdf_path),
        cover["street"], city, state, cover["zip"],
    )
    record.update({
        "stories": footprint["stories"],
        "siding_sqft": siding_sqft,
        "siding_squares": round(siding_sqft / 100, 1) if siding_sqft else 0,
        "siding_other_sqft": summary["siding_other_sqft"],
        "trim_sqft": summary["trim_sqft"],
        "soffit_sqft": soffit["soffit_sqft"],
        "material_types": facades["material_types"],
        "eaves_fascia_ft": summary["eaves_fascia_ft"],
        "roof_area_sqft": roof["roof_area_sqft"],
        "roof_squares": round(roof["roof_area_sqft"] / 100, 1) if roof["roof_area_sqft"] else 0,
        "roof_facets": roof["roof_facets"],
        "ridges_hips_ft": roof["ridges_hips_ft"],
        "ridges_hips_count": roof["ridges_hips_count"],
        "valleys_ft": roof["valleys_ft"],
        "valleys_count": roof["valleys_count"],
        "rakes_ft": roof["rakes_ft"],
        "eaves_ft": roof["eaves_ft"],
        "drip_edge_ft": roof["drip_edge_ft"],
        "flashing_ft": roof["flashing_ft"],
        "step_flashing_ft": roof["step_flashing_ft"],
        "dominant_pitch": dominant_pitch,
        "pitch_breakdown": pitches,
        "gutter_length_ft": summary["eaves_fascia_ft"] or roof["eaves_ft"],
        "entry_doors": doors["entry_doors"],
        "sliding_glass_doors": doors["sliding_glass_doors"],
    })

    if verbose:
        mat_str = ", ".join(f"{k}({v})" for k, v in record["material_types"].items())
        print(
            f"  [HOVER] {record['file']}: {city}, {state} | "
            f"siding={siding_sqft:.0f} roof={roof['roof_area_sqft']:.0f} "
            f"eaves={roof['eaves_ft']:.0f} doors={doors['entry_doors']}+{doors['sliding_glass_doors']}sgd "
            f"mat=[{mat_str}]"
        )
    return record


# ══════════════════════════════════════════════════════════════════════════════
# GAF QUICKMEASURE EXTRACTION (roof + gutter data only)
# ══════════════════════════════════════════════════════════════════════════════

def extract_gaf(pdf_path: str, verbose: bool = False) -> dict | None:
    """Extract measurements from a GAF QuickMeasure FullReport PDF."""
    try:
        doc = pymupdf.open(pdf_path)
    except Exception:
        return None
    if len(doc) == 0:
        doc.close()
        return None

    text = doc[0].get_text()
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    if not lines:
        doc.close()
        return None

    address_line = lines[0]

    # Parse "16810 Federal Hill Ct, Bowie, MD 20716"
    addr_match = re.match(
        r"^(.+),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})", address_line
    )
    if addr_match:
        street = addr_match.group(1).strip()
        city = addr_match.group(2).strip()
        state = addr_match.group(3).strip()
        zipcode = addr_match.group(4).strip()
    else:
        parts = address_line.rsplit(",", 2)
        if len(parts) >= 3:
            street = parts[0].strip()
            city = parts[-2].strip()
            state_zip = parts[-1].strip().split()
            state = state_zip[0] if state_zip else "Unknown"
            zipcode = state_zip[1] if len(state_zip) > 1 else ""
        else:
            doc.close()
            return None

    norm = normalize_city(city, state)
    if norm is None:
        doc.close()
        return None
    city, state = norm

    record = make_empty_record("gaf", os.path.basename(pdf_path), street, city, state, zipcode)

    # Page 0 measurements
    patterns = {
        "roof_area_sqft": r"Roof\s+Area\s*\n?\s*([\d,]+)\s*sq\s*ft",
        "roof_facets": r"Roof\s+Facets\s*\n?\s*(\d+)",
        "valleys_ft": r"Valleys\s*\n?\s*([\d,]+)\s*ft",
        "rakes_ft": r"Rakes\s*\n?\s*([\d,]+)\s*ft",
        "eaves_ft": r"Eaves\s*\n?\s*([\d,]+)\s*ft",
    }
    for key, pattern in patterns.items():
        m = re.search(pattern, text)
        if m:
            record[key] = parse_number(m.group(1))

    # Ridges/Hips — may be combined or separate
    m = re.search(r"Ridges/Hips\s*\n?\s*([\d,]+)\s*ft", text)
    if m:
        record["ridges_hips_ft"] = parse_number(m.group(1))

    # Predominant pitch from page 0
    m = re.search(r"Predominant\s+Pitch\s*\n?\s*(\d+)\s*/\s*12", text)
    if m:
        record["dominant_pitch"] = int(m.group(1))

    # Try to get detailed data from Summary page (usually page 6-7)
    for pg_idx in range(min(10, len(doc))):
        pg_text = doc[pg_idx].get_text()
        if "Summary" in pg_text and "Pitch" in pg_text and "Area" in pg_text:
            # Pitch breakdown: "Pitch\n0\n4\n6\n...\nArea\n66\n296\n..."
            # Or: "5/12\n2228.7\n100%"
            for pm in re.finditer(
                r"(\d+)/12\s*\n\s*([\d,.]+)\s*\n\s*(\d+)%", pg_text
            ):
                record["pitch_breakdown"].append({
                    "pitch": int(pm.group(1)),
                    "area_sqft": float(pm.group(2).replace(",", "")),
                    "percentage": float(pm.group(3)),
                })

            # Separate Hips and Ridges
            m = re.search(r"Hips\s*\n\s*([\d,]+)\s*ft", pg_text)
            hips = parse_number(m.group(1)) if m else 0
            m = re.search(r"Ridges\s*\n\s*([\d,]+)\s*ft", pg_text)
            ridges = parse_number(m.group(1)) if m else 0
            if ridges or hips:
                record["ridges_hips_ft"] = ridges + hips

            # Drip Edge
            m = re.search(r"Drip\s+Edge\s*\n\s*([\d,]+)\s*ft", pg_text)
            if m:
                record["drip_edge_ft"] = parse_number(m.group(1))

            break

    doc.close()

    # Compute derived fields
    if record["roof_area_sqft"]:
        record["roof_squares"] = round(record["roof_area_sqft"] / 100, 1)
    record["gutter_length_ft"] = record["eaves_ft"]

    if verbose:
        print(
            f"  [GAF] {record['file']}: {city}, {state} | "
            f"roof={record['roof_area_sqft']:.0f} eaves={record['eaves_ft']:.0f} "
            f"pitch={record['dominant_pitch']}/12"
        )
    return record


# ══════════════════════════════════════════════════════════════════════════════
# EAGLEVIEW EXTRACTION (Premium reports + QuickSquares + WallsLite)
# ══════════════════════════════════════════════════════════════════════════════

def parse_eagleview_address(text: str) -> tuple[str, str, str, str] | None:
    """Parse address from EagleView page 0 or page 1.
    Returns (street, city, state, zip) or None.
    """
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    for line in lines:
        # "11901 Wimbleton St, Upper Marlboro, MD 20774-1618"
        m = re.match(
            r"^(.+),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})(?:-\d{4})?", line
        )
        if m:
            return (
                m.group(1).strip(),
                m.group(2).strip(),
                m.group(3).strip(),
                m.group(4).strip(),
            )
        # "11901 Wimbleton St, Upper Marlboro, MD 20774"
        m = re.match(
            r"^(.+),\s*([^,]+),\s*\s*([A-Z]{2})\s+(\d{5})", line
        )
        if m:
            return (
                m.group(1).strip(),
                m.group(2).strip(),
                m.group(3).strip(),
                m.group(4).strip(),
            )
        # "2718 Arcola Ave, Silver Spring,MD 20902-2604" (no space before state)
        m = re.match(
            r"^(.+),\s*([^,]+),\s*([A-Z]{2})\s*(\d{5})", line
        )
        if m:
            return (
                m.group(1).strip(),
                m.group(2).strip(),
                m.group(3).strip(),
                m.group(4).strip(),
            )
    return None


def extract_eagleview_premium(pdf_path: str, verbose: bool = False) -> dict | None:
    """Extract from EagleView Premium Report (has REPORT SUMMARY page)."""
    try:
        doc = pymupdf.open(pdf_path)
    except Exception:
        return None
    if len(doc) == 0:
        doc.close()
        return None

    # Parse address from page 0 or 1
    addr = None
    for pg_idx in range(min(2, len(doc))):
        addr = parse_eagleview_address(doc[pg_idx].get_text())
        if addr:
            break
    if not addr:
        doc.close()
        return None

    street, city, state, zipcode = addr
    norm = normalize_city(city, state)
    if norm is None:
        doc.close()
        return None
    city, state = norm

    record = make_empty_record(
        "eagleview", os.path.basename(pdf_path), street, city, state, zipcode,
    )

    # Find REPORT SUMMARY or summary page with "Total Roof Facets"
    for pg_idx in range(len(doc)):
        text = doc[pg_idx].get_text()
        if "Total Roof Facets" not in text:
            continue

        # Parse summary fields
        m = re.search(r"Total Roof Area\s*[=:]\s*([\d,]+)\s*sq\s*ft", text)
        if m:
            record["roof_area_sqft"] = parse_number(m.group(1))
        m = re.search(r"Total Roof Facets\s*[=:]\s*(\d+)", text)
        if m:
            record["roof_facets"] = int(m.group(1))
        m = re.search(r"Predominant Pitch\s*[=:]\s*(\d+)/12", text)
        if m:
            record["dominant_pitch"] = int(m.group(1))
        m = re.search(r"Number of Stories\s*[=:]*\s*(.+?)$", text, re.M)
        if m:
            record["stories"] = m.group(1).strip()
        m = re.search(r"Total Ridges/Hips\s*[=:]\s*([\d,]+)\s*ft", text)
        if m:
            record["ridges_hips_ft"] = parse_number(m.group(1))
        m = re.search(r"Total Valleys\s*[=:]\s*([\d,]+)\s*ft", text)
        if m:
            record["valleys_ft"] = parse_number(m.group(1))
        m = re.search(r"Total Rakes\s*[=:]\s*([\d,]+)\s*ft", text)
        if m:
            record["rakes_ft"] = parse_number(m.group(1))
        m = re.search(r"Total Eaves\s*[=:]\s*([\d,]+)\s*ft", text)
        if m:
            record["eaves_ft"] = parse_number(m.group(1))

        # Pitch breakdown: "5/12\n2228.7\n100%"
        for pm in re.finditer(
            r"(\d+)/12\s*\n\s*([\d,.]+)\s*\n\s*(\d+)%", text
        ):
            area = float(pm.group(2).replace(",", ""))
            record["pitch_breakdown"].append({
                "pitch": int(pm.group(1)),
                "area_sqft": area,
                "percentage": float(pm.group(3)),
            })

        # Fallback: Waste table "Area (sq ft)\n2,229\n..."
        if not record["roof_area_sqft"]:
            m = re.search(r"Area\s*\(sq\s*ft\)\s*\n\s*([\d,]+)", text)
            if m:
                record["roof_area_sqft"] = parse_number(m.group(1))

        break

    doc.close()

    if record["roof_area_sqft"]:
        record["roof_squares"] = round(record["roof_area_sqft"] / 100, 1)
    record["gutter_length_ft"] = record["eaves_ft"]

    # Skip if no useful data extracted
    if not record["roof_area_sqft"] and not record["roof_facets"]:
        return None

    if verbose:
        print(
            f"  [EV-Premium] {record['file']}: {city}, {state} | "
            f"roof={record['roof_area_sqft']:.0f} eaves={record['eaves_ft']:.0f} "
            f"facets={record['roof_facets']} pitch={record['dominant_pitch']}/12"
        )
    return record


def extract_eagleview_quicksquares(pdf_path: str, verbose: bool = False) -> dict | None:
    """Extract from EagleView QuickSquares (minimal: squares + pitch)."""
    try:
        doc = pymupdf.open(pdf_path)
    except Exception:
        return None
    if len(doc) == 0:
        doc.close()
        return None

    # QuickSquares usually page 0 has address, page 1 has data
    text = ""
    for i in range(len(doc)):
        text += doc[i].get_text() + "\n"

    # Parse address
    addr = parse_eagleview_address(text)
    if not addr:
        doc.close()
        return None

    street, city, state, zipcode = addr
    norm = normalize_city(city, state)
    if norm is None:
        doc.close()
        return None
    city, state = norm

    record = make_empty_record(
        "eagleview_qs", os.path.basename(pdf_path), street, city, state, zipcode,
    )

    # "Roof #1 Area:   40 Squares"
    m = re.search(r"Roof\s*#?\d*\s*Area:\s*(\d+)\s*Squares", text)
    if m:
        record["roof_squares"] = int(m.group(1))
        record["roof_area_sqft"] = int(m.group(1)) * 100

    # "Predominant Pitch:   8"
    m = re.search(r"Predominant\s+Pitch:\s*(\d+)", text)
    if m:
        record["dominant_pitch"] = int(m.group(1))

    doc.close()

    if not record["roof_area_sqft"]:
        return None

    if verbose:
        print(
            f"  [EV-QS] {record['file']}: {city}, {state} | "
            f"squares={record['roof_squares']} pitch={record['dominant_pitch']}/12"
        )
    return record


def extract_eagleview_wallslite(pdf_path: str, verbose: bool = False) -> dict | None:
    """Extract wall area from EagleView WallsLite report."""
    try:
        doc = pymupdf.open(pdf_path)
    except Exception:
        return None
    if len(doc) == 0:
        doc.close()
        return None

    # Address from page 0
    addr = parse_eagleview_address(doc[0].get_text())
    if not addr:
        doc.close()
        return None

    street, city, state, zipcode = addr
    norm = normalize_city(city, state)
    if norm is None:
        doc.close()
        return None
    city, state = norm

    record = make_empty_record(
        "eagleview_walls", os.path.basename(pdf_path), street, city, state, zipcode,
    )

    # Sum wall areas from all elevation pages
    total_wall_area = 0.0
    for pg_idx in range(len(doc)):
        text = doc[pg_idx].get_text()
        if "Elevation Details" not in text and "Wall Area" not in text:
            continue
        # Wall areas appear as numbers in the table, e.g. "208.0\n345.6"
        # The "Wall Area" column header is followed by wall area values
        for m in re.finditer(r"\n(\d+\.\d+)\n", text):
            total_wall_area += float(m.group(1))

    doc.close()

    if total_wall_area > 0:
        record["siding_sqft"] = total_wall_area
        record["siding_squares"] = round(total_wall_area / 100, 1)

    if not record["siding_sqft"]:
        return None

    if verbose:
        print(
            f"  [EV-Walls] {record['file']}: {city}, {state} | "
            f"siding={record['siding_sqft']:.0f}sqft"
        )
    return record


def classify_and_extract_mbox_pdf(pdf_path: str, verbose: bool = False) -> dict | None:
    """Classify an mbox-extracted PDF and extract with the right parser."""
    fname = os.path.basename(pdf_path)

    # GAF Full Report
    if "Full Report" in fname or "FullReport" in fname:
        return extract_gaf(pdf_path, verbose)

    # Skip PropertyOwner reports (no measurement data)
    if "PropertyOwner" in fname or "Property Owner" in fname:
        return None

    # Skip non-measurement reports
    if "QuickSquaresEC" in fname or "EC2DPrePitch" in fname:
        return None
    if "Neighbor_Notice" in fname or "residence" in fname:
        return None
    if "Pre-" in fname:
        return None

    # QuickSquares report
    if "QuickSquares" in fname:
        return extract_eagleview_quicksquares(pdf_path, verbose)

    # WallsLite report
    if "WallsLite" in fname:
        return extract_eagleview_wallslite(pdf_path, verbose)

    # Numeric filename = EagleView report — need to check content
    try:
        doc = pymupdf.open(pdf_path)
    except Exception:
        return None
    if len(doc) == 0:
        doc.close()
        return None

    # Check for WallsLite
    is_walls = False
    has_summary = False
    is_qs = False
    for pg_idx in range(min(3, len(doc))):
        t = doc[pg_idx].get_text()
        if "WallsLite" in t:
            is_walls = True
            break
        if "QuickSquares" in t:
            is_qs = True
            break
    if not is_walls and not is_qs:
        for pg_idx in range(len(doc)):
            if "Total Roof Facets" in doc[pg_idx].get_text():
                has_summary = True
                break
    doc.close()

    if is_walls:
        return extract_eagleview_wallslite(pdf_path, verbose)
    elif is_qs:
        return extract_eagleview_quicksquares(pdf_path, verbose)
    elif has_summary:
        return extract_eagleview_premium(pdf_path, verbose)

    return None


# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

def collect_hover_pdfs() -> list[str]:
    if not os.path.isdir(HOVER_DIR):
        return []
    return sorted([
        os.path.join(HOVER_DIR, f)
        for f in os.listdir(HOVER_DIR)
        if f.endswith(".pdf") and not f.startswith("._")
    ])


def collect_gaf_pdfs() -> list[str]:
    if not os.path.isdir(GAF_DIR):
        return []
    return sorted([
        os.path.join(GAF_DIR, f)
        for f in os.listdir(GAF_DIR)
        if f.endswith("_FullReport.pdf") and not f.startswith("._")
    ])


def collect_mbox_pdfs() -> list[str]:
    if not os.path.isdir(MBOX_EXTRACTED_DIR):
        return []
    return sorted([
        os.path.join(MBOX_EXTRACTED_DIR, f)
        for f in os.listdir(MBOX_EXTRACTED_DIR)
        if (f.endswith(".pdf") or f.endswith(".PDF")) and not f.startswith("._")
    ])


def main():
    args = sys.argv[1:]
    verbose = "--verbose" in args
    source_filter = None
    limit = None
    for arg in args:
        if arg.startswith("--limit="):
            limit = int(arg.split("=")[1])
        elif arg.startswith("--source="):
            source_filter = arg.split("=", 1)[1].lower()

    all_records: list[dict] = []
    source_stats: dict[str, dict] = {}

    # ── HOVER PDFs ──
    if source_filter in (None, "hover"):
        hover_files = collect_hover_pdfs()
        if limit:
            hover_files = hover_files[:limit]
        print(f"HOVER PDFs: {len(hover_files)}")
        ok, err = 0, 0
        for i, path in enumerate(hover_files, 1):
            record = extract_hover_full(path, verbose)
            if record:
                all_records.append(record)
                ok += 1
            else:
                err += 1
            if not verbose and i % 100 == 0:
                print(f"  HOVER: {i}/{len(hover_files)}...")
        print(f"  HOVER: {ok} extracted, {err} errors")
        source_stats["hover"] = {"ok": ok, "err": err}

    # ── GAF QuickMeasure FullReports ──
    if source_filter in (None, "gaf"):
        gaf_files = collect_gaf_pdfs()
        if limit:
            gaf_files = gaf_files[:limit]
        print(f"\nGAF QuickMeasure FullReports: {len(gaf_files)}")
        ok, err = 0, 0
        for i, path in enumerate(gaf_files, 1):
            record = extract_gaf(path, verbose)
            if record:
                all_records.append(record)
                ok += 1
            else:
                err += 1
            if not verbose and i % 200 == 0:
                print(f"  GAF: {i}/{len(gaf_files)}...")
        print(f"  GAF: {ok} extracted, {err} errors")
        source_stats["gaf"] = {"ok": ok, "err": err}

    # ── Mbox-extracted PDFs ──
    if source_filter in (None, "mbox"):
        mbox_files = collect_mbox_pdfs()
        if limit:
            mbox_files = mbox_files[:limit]
        print(f"\nMbox-extracted PDFs: {len(mbox_files)}")
        ok, err, skip = 0, 0, 0
        for i, path in enumerate(mbox_files, 1):
            record = classify_and_extract_mbox_pdf(path, verbose)
            if record:
                all_records.append(record)
                ok += 1
            elif record is None:
                # Could be skipped (PropertyOwner, etc.) or error
                skip += 1
            else:
                err += 1
            if not verbose and i % 500 == 0:
                print(f"  Mbox: {i}/{len(mbox_files)}...")
        print(f"  Mbox: {ok} extracted, {skip} skipped/errors")
        source_stats["mbox"] = {"ok": ok, "skip": skip}

    # ── Deduplicate by address ──
    print(f"\nTotal records before dedup: {len(all_records)}")
    seen_addresses: dict[str, dict] = {}
    deduped: list[dict] = []
    dupes = 0

    for r in all_records:
        # Create a dedup key from normalized address
        addr_key = f"{r['street'].lower().strip()}|{r['city'].lower()}|{r['state']}"
        if addr_key in seen_addresses:
            existing = seen_addresses[addr_key]
            # Prefer HOVER (most data) > EagleView Premium > GAF > QuickSquares > WallsLite
            source_priority = {
                "hover": 5, "eagleview": 4, "gaf": 3,
                "eagleview_qs": 2, "eagleview_walls": 1,
            }
            if source_priority.get(r["source"], 0) > source_priority.get(existing["source"], 0):
                # Replace with higher-priority source
                seen_addresses[addr_key] = r
                deduped = [d for d in deduped if d is not existing]
                deduped.append(r)
            else:
                dupes += 1
        else:
            seen_addresses[addr_key] = r
            deduped.append(r)

    print(f"Duplicates removed: {dupes}")
    print(f"Final records: {len(deduped)}")

    # Write JSON
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(deduped, f, indent=2, ensure_ascii=False)

    print(f"\nOutput: {OUTPUT_JSON}")

    # Summary by source
    source_counts = Counter(r["source"] for r in deduped)
    print(f"\nBy source:")
    for src, cnt in sorted(source_counts.items()):
        print(f"  {src}: {cnt}")

    # Summary by city
    city_counts = Counter(f"{r['city']}, {r['state']}" for r in deduped)
    print(f"\nCities: {len(city_counts)}")
    print(f"\n{'City':<35} {'Count':>5}")
    print("-" * 42)
    for city_state, count in sorted(city_counts.items(), key=lambda x: -x[1])[:30]:
        print(f"{city_state:<35} {count:>5}")
    if len(city_counts) > 30:
        print(f"  ... and {len(city_counts) - 30} more cities")


if __name__ == "__main__":
    main()
