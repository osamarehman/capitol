"""
Extract roofing and gutter measurements from GAF QuickMeasure FullReport PDFs.
Aggregates by city and generates service page text.
"""
import csv
import os
import re
import sys
from collections import defaultdict

import pymupdf

PDF_DIR = os.path.join(os.path.dirname(__file__), "quickmeasure_pdfs")
OUTPUT_CSV = os.path.join(os.path.dirname(__file__), "quickmeasure_measurements.csv")
OUTPUT_TEXT = os.path.join(os.path.dirname(__file__), "quickmeasure_service_page_text.txt")


def parse_number(s: str) -> float:
    """Parse a number string like '3,595' into a float."""
    return float(s.replace(",", ""))


def extract_measurements(pdf_path: str) -> dict | None:
    """Extract key measurements from page 1 of a FullReport PDF."""
    try:
        doc = pymupdf.open(pdf_path)
    except Exception as e:
        print(f"  ERROR opening {pdf_path}: {e}")
        return None

    if len(doc) == 0:
        return None

    text = doc[0].get_text()
    doc.close()

    # Extract address from first line
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    if not lines:
        return None

    address_line = lines[0]

    # Parse city, state, zip from address
    # Format: "16810 Federal Hill Ct, Bowie, MD 20716"
    addr_match = re.match(r'^(.+),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})', address_line)
    if addr_match:
        street = addr_match.group(1).strip()
        city = addr_match.group(2).strip()
        state = addr_match.group(3).strip()
        zipcode = addr_match.group(4).strip()
    else:
        # Try simpler pattern
        parts = address_line.rsplit(",", 2)
        if len(parts) >= 2:
            city = parts[-2].strip() if len(parts) >= 3 else "Unknown"
            state_zip = parts[-1].strip().split()
            state = state_zip[0] if state_zip else "Unknown"
            street = parts[0].strip()
            zipcode = state_zip[1] if len(state_zip) > 1 else ""
        else:
            return None

    data = {
        "address": address_line,
        "street": street,
        "city": city,
        "state": state,
        "zip": zipcode,
        "roof_area_sqft": 0,
        "roof_facets": 0,
        "valleys_ft": 0,
        "ridges_hips_ft": 0,
        "rakes_ft": 0,
        "eaves_ft": 0,
        "drip_ft": 0,
    }

    # Extract measurements using regex
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


def main():
    # Collect all FullReport PDFs
    pdf_files = sorted([
        f for f in os.listdir(PDF_DIR)
        if f.endswith("_FullReport.pdf")
    ])

    print(f"Found {len(pdf_files)} FullReport PDFs\n")

    all_records = []
    errors = 0

    for i, fname in enumerate(pdf_files, 1):
        path = os.path.join(PDF_DIR, fname)
        data = extract_measurements(path)
        if data:
            all_records.append(data)
            if i % 50 == 0:
                print(f"  Processed {i}/{len(pdf_files)}...")
        else:
            errors += 1
            print(f"  SKIP: {fname}")

    print(f"\nExtracted data from {len(all_records)} reports ({errors} errors)")

    # --- Write raw CSV ---
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "address", "city", "state", "zip",
            "roof_area_sqft", "roof_facets", "valleys_ft",
            "ridges_hips_ft", "rakes_ft", "eaves_ft",
        ])
        writer.writeheader()
        for r in all_records:
            writer.writerow({k: r[k] for k in writer.fieldnames})

    print(f"CSV written: {OUTPUT_CSV}")

    # --- Aggregate by city, state ---
    city_data = defaultdict(lambda: {
        "properties": 0,
        "roof_area_sqft": 0,
        "roof_squares": 0,
        "valleys_ft": 0,
        "ridges_hips_ft": 0,
        "eaves_ft": 0,
        "facets": 0,
    })

    for r in all_records:
        key = f"{r['city']}, {r['state']}"
        d = city_data[key]
        d["properties"] += 1
        d["roof_area_sqft"] += r["roof_area_sqft"]
        d["roof_squares"] += r["roof_area_sqft"] / 100  # 1 square = 100 sq ft
        d["valleys_ft"] += r["valleys_ft"]
        d["ridges_hips_ft"] += r["ridges_hips_ft"]
        d["eaves_ft"] += r["eaves_ft"]
        d["facets"] += r["roof_facets"]

    # --- Generate service page text ---
    with open(OUTPUT_TEXT, "w", encoding="utf-8") as f:
        # Overall totals
        total_props = len(all_records)
        total_squares = sum(d["roof_squares"] for d in city_data.values())
        total_eaves = sum(d["eaves_ft"] for d in city_data.values())

        f.write("=" * 80 + "\n")
        f.write("OVERALL TOTALS\n")
        f.write("=" * 80 + "\n")
        f.write(f"Total Properties Inspected: {total_props}\n")
        f.write(f"Total Roof Squares: {total_squares:,.0f}\n")
        f.write(f"Total Linear Feet of Gutters (Eaves): {total_eaves:,.0f}\n\n")

        # Per-city text
        for city_state in sorted(city_data.keys()):
            d = city_data[city_state]
            squares = int(d["roof_squares"])
            eaves = int(d["eaves_ft"])
            props = d["properties"]

            f.write("=" * 80 + "\n")
            f.write(f"CITY: {city_state} ({props} properties)\n")
            f.write("=" * 80 + "\n\n")

            # --- ROOF ---
            f.write("--- ROOF SERVICE PAGE ---\n\n")
            f.write(f"H2: We Have Inspected Over {squares:,} Squares of Roofing in {city_state}.\n\n")
            f.write(
                f"Paragraph: In {city_state}, we have inspected, repaired, and serviced "
                f"{squares:,} squares of roofing across {props} properties, "
                f"all representing our commitment to solving roof issues for real homeowners. "
                f"Our inspections have covered {int(d['facets']):,} roof facets, "
                f"{int(d['valleys_ft']):,} feet of valleys, and "
                f"{int(d['ridges_hips_ft']):,} feet of ridges and hips.\n\n"
            )

            # --- GUTTERS ---
            f.write("--- GUTTER SERVICE PAGE ---\n\n")
            f.write(f"H2: We Have Inspected Over {eaves:,} Linear Feet of Gutters in {city_state}.\n\n")
            f.write(
                f"Paragraph: In {city_state}, we have inspected, repaired, and serviced "
                f"{eaves:,} linear feet of gutters across {props} properties. "
                f"Gutters are essential to keeping water moving away from your home "
                f"and are an affordable way to prevent water damage near your foundation. "
                f"Properly maintained gutters protect your landscaping, siding, and "
                f"basement from costly water-related issues.\n\n"
            )

    print(f"Service page text written: {OUTPUT_TEXT}")

    # Print summary to console
    print(f"\n{'City':<35} {'Props':>6} {'Squares':>8} {'Eaves ft':>10}")
    print("-" * 65)
    for city_state in sorted(city_data.keys()):
        d = city_data[city_state]
        print(f"{city_state:<35} {d['properties']:>6} {int(d['roof_squares']):>8,} {int(d['eaves_ft']):>10,}")


if __name__ == "__main__":
    main()
