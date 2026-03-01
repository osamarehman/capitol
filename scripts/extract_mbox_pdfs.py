"""
Extract PDF attachments from .mbox email archives.

Scans all .mbox files under mbox/ and extracts PDF attachments to mbox_extracted_pdfs/.
Skips PDFs that are already in quickmeasure_pdfs/ or the HOVER directory.
Categorizes extracted PDFs by type (GAF QuickMeasure, EagleView, HOVER, other).

Usage:
    python extract_mbox_pdfs.py                  # extract all
    python extract_mbox_pdfs.py --dry-run        # just count, don't extract
    python extract_mbox_pdfs.py --limit=50       # first N emails per mbox
"""
import email
import email.header
import hashlib
import mailbox
import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MBOX_DIR = os.path.join(SCRIPT_DIR, "mbox")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "mbox_extracted_pdfs")

# Existing PDF directories to check for duplicates
QUICKMEASURE_DIR = os.path.join(SCRIPT_DIR, "quickmeasure_pdfs")
HOVER_DIR = os.path.join(
    SCRIPT_DIR, "mbox", "Siding - Windows - Gutters Data",
    "Siding _ Windows _ Gutters _ Roof",
)


def find_mbox_files(root: str) -> list[str]:
    """Recursively find all .mbox files, skipping macOS resource forks."""
    mbox_files = []
    for dirpath, _dirnames, filenames in os.walk(root):
        for fn in filenames:
            if fn.endswith(".mbox") and not fn.startswith("._"):
                mbox_files.append(os.path.join(dirpath, fn))
    return sorted(mbox_files)


def get_existing_pdf_hashes() -> set[str]:
    """Compute MD5 hashes of all existing PDFs to detect duplicates."""
    hashes = set()
    for pdf_dir in [QUICKMEASURE_DIR, HOVER_DIR]:
        if not os.path.isdir(pdf_dir):
            continue
        for fn in os.listdir(pdf_dir):
            if fn.endswith(".pdf") and not fn.startswith("._"):
                path = os.path.join(pdf_dir, fn)
                try:
                    h = hashlib.md5(open(path, "rb").read()).hexdigest()
                    hashes.add(h)
                except Exception:
                    pass
    return hashes


def sanitize_filename(name: str) -> str:
    """Make a filename safe for the filesystem."""
    # Remove or replace problematic characters
    name = re.sub(r'[<>:"/\\|?*]', '_', name)
    name = name.strip('. ')
    if len(name) > 200:
        name = name[:200]
    return name


def decode_header(raw: str) -> str:
    """Decode RFC 2047 encoded email header."""
    if not raw:
        return ""
    parts = email.header.decode_header(raw)
    decoded = []
    for data, charset in parts:
        if isinstance(data, bytes):
            decoded.append(data.decode(charset or "utf-8", errors="replace"))
        else:
            decoded.append(data)
    return " ".join(decoded)


def categorize_pdf(filename: str, subject: str) -> str:
    """Categorize a PDF by its filename/subject."""
    fn_lower = filename.lower()
    subj_lower = subject.lower()

    if "full report" in fn_lower or "fullreport" in fn_lower:
        if "gaf" in subj_lower or "quickmeasure" in subj_lower:
            return "gaf_quickmeasure"
        return "gaf_quickmeasure"  # Full Report naming pattern is GAF

    if "propertyowner" in fn_lower or "property owner" in fn_lower:
        return "gaf_propertyowner"

    if "eagleview" in subj_lower or re.match(r"^\d{8}\.PDF$", filename):
        return "eagleview"

    if "hover" in subj_lower or "complete measurements" in fn_lower:
        return "hover"

    return "other"


def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    limit = None
    for arg in args:
        if arg.startswith("--limit="):
            limit = int(arg.split("=")[1])

    # Find all mbox files
    mbox_files = find_mbox_files(MBOX_DIR)
    print(f"Found {len(mbox_files)} .mbox files:")
    for f in mbox_files:
        rel = os.path.relpath(f, SCRIPT_DIR)
        size_mb = os.path.getsize(f) / (1024 * 1024)
        print(f"  {rel} ({size_mb:.0f} MB)")
    print()

    if not dry_run:
        os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Build hash set of existing PDFs
    print("Hashing existing PDFs for dedup...")
    existing_hashes = get_existing_pdf_hashes()
    print(f"  {len(existing_hashes)} existing PDF hashes\n")

    # Also track hashes of PDFs we extract (to avoid dups across mbox files)
    extracted_hashes: set[str] = set()

    total_emails = 0
    total_pdfs = 0
    total_new = 0
    total_dups = 0
    category_counts: dict[str, int] = {}

    for mbox_path in mbox_files:
        rel = os.path.relpath(mbox_path, SCRIPT_DIR)
        print(f"Processing: {rel}")

        try:
            mbox = mailbox.mbox(mbox_path)
        except Exception as e:
            print(f"  ERROR opening: {e}")
            continue

        msg_count = 0
        pdf_count = 0

        for msg in mbox:
            msg_count += 1
            total_emails += 1

            if limit and msg_count > limit:
                break

            subject = decode_header(msg.get("Subject", ""))

            if not msg.is_multipart():
                continue

            for part in msg.walk():
                fn = part.get_filename()
                if not fn or not fn.lower().endswith(".pdf"):
                    continue

                fn = decode_header(fn)
                pdf_data = part.get_payload(decode=True)
                if not pdf_data:
                    continue

                total_pdfs += 1
                pdf_count += 1

                # Check for duplicate
                pdf_hash = hashlib.md5(pdf_data).hexdigest()
                if pdf_hash in existing_hashes or pdf_hash in extracted_hashes:
                    total_dups += 1
                    continue

                extracted_hashes.add(pdf_hash)
                total_new += 1

                cat = categorize_pdf(fn, subject)
                category_counts[cat] = category_counts.get(cat, 0) + 1

                if not dry_run:
                    safe_name = sanitize_filename(fn)
                    # Add hash prefix to prevent name collisions
                    out_name = f"{pdf_hash[:8]}_{safe_name}"
                    out_path = os.path.join(OUTPUT_DIR, out_name)
                    with open(out_path, "wb") as f:
                        f.write(pdf_data)

            if msg_count % 200 == 0:
                print(f"  {msg_count} emails, {pdf_count} PDFs...")

        mbox.close()
        print(f"  Done: {msg_count} emails, {pdf_count} PDFs")

    print(f"\n{'=' * 50}")
    print("SUMMARY")
    print(f"{'=' * 50}")
    print(f"  Total emails scanned:  {total_emails}")
    print(f"  Total PDF attachments: {total_pdfs}")
    print(f"  Duplicates skipped:    {total_dups}")
    print(f"  New PDFs extracted:    {total_new}")
    print(f"\nBy category:")
    for cat, count in sorted(category_counts.items()):
        print(f"  {cat}: {count}")

    if dry_run:
        print("\n(Dry run — no files written)")
    else:
        print(f"\nExtracted to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
