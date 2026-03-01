"""Extract PDF attachments from ALL mbox files in the mbox/ directory.

Scans recursively for .mbox files and extracts all PDF attachments into
a single output directory (quickmeasure_pdfs/).
"""
import mailbox
import os
import re
import email.utils
import sys


MBOX_DIR = os.path.join(os.path.dirname(__file__), "mbox")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "quickmeasure_pdfs")


def sanitize_filename(name: str) -> str:
    """Remove characters not allowed in filenames."""
    return re.sub(r'[<>:"/\\|?*]', '_', name).strip('. ')


def extract_address_from_subject(subject: str) -> str | None:
    """Extract address from GAF QuickMeasure or Fwd: GAF QuickMeasure subjects."""
    match = re.search(r'GAF QuickMeasure\s*\|\s*(.+)', subject)
    return match.group(1).strip() if match else None


def find_mbox_files(root: str) -> list[str]:
    """Find all .mbox files recursively, excluding macOS resource forks."""
    mbox_files = []
    for dirpath, _, filenames in os.walk(root):
        for f in filenames:
            if f.endswith(".mbox") and not f.startswith("._"):
                mbox_files.append(os.path.join(dirpath, f))
    return mbox_files


def process_mbox(mbox_path: str, seen_keys: set) -> tuple[int, int, int]:
    """Process a single mbox file. Returns (emails, pdfs_extracted, skipped)."""
    print(f"\n--- Processing: {mbox_path}")
    try:
        mbox = mailbox.mbox(mbox_path)
    except Exception as e:
        print(f"  ERROR opening mbox: {e}")
        return 0, 0, 0

    total_emails = 0
    total_pdfs = 0
    skipped = 0

    for i, message in enumerate(mbox):
        total_emails += 1
        subject = message.get("Subject", "(no subject)")
        date_str = message.get("Date", "")
        date_tuple = email.utils.parsedate(date_str)
        date_prefix = ""
        if date_tuple:
            date_prefix = f"{date_tuple[0]:04d}-{date_tuple[1]:02d}-{date_tuple[2]:02d}"

        address = extract_address_from_subject(subject) or f"email_{i}"

        pdf_count = 0
        for part in message.walk():
            content_type = part.get_content_type()
            filename = part.get_filename()

            if content_type == "application/pdf" or (filename and filename.lower().endswith(".pdf")):
                if filename is None:
                    filename = f"attachment_{pdf_count}.pdf"

                safe_address = sanitize_filename(address)
                if date_prefix:
                    out_name = f"{date_prefix}_{safe_address}_{sanitize_filename(filename)}"
                else:
                    out_name = f"{safe_address}_{sanitize_filename(filename)}"

                if not out_name.lower().endswith(".pdf"):
                    out_name += ".pdf"

                # Deduplicate across mbox files using (date, address, filename) as key
                dedup_key = (date_prefix, safe_address, sanitize_filename(filename))
                if dedup_key in seen_keys:
                    skipped += 1
                    continue
                seen_keys.add(dedup_key)

                out_path = os.path.join(OUTPUT_DIR, out_name)

                # Handle filename collisions
                if os.path.exists(out_path):
                    base, ext = os.path.splitext(out_path)
                    n = 1
                    while os.path.exists(f"{base}_{n}{ext}"):
                        n += 1
                    out_path = f"{base}_{n}{ext}"

                payload = part.get_payload(decode=True)
                if payload:
                    with open(out_path, "wb") as f:
                        f.write(payload)
                    pdf_count += 1
                    total_pdfs += 1
                else:
                    skipped += 1

        if total_emails % 100 == 0:
            print(f"  ... processed {total_emails} emails ({total_pdfs} PDFs extracted)")

    print(f"  Done: {total_emails} emails, {total_pdfs} PDFs extracted, {skipped} skipped")
    return total_emails, total_pdfs, skipped


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    mbox_files = find_mbox_files(MBOX_DIR)
    print(f"Found {len(mbox_files)} mbox files:")
    for f in mbox_files:
        print(f"  {f}")

    if not mbox_files:
        print("No mbox files found!")
        sys.exit(1)

    grand_emails = 0
    grand_pdfs = 0
    grand_skipped = 0
    seen_keys: set = set()

    for mbox_path in mbox_files:
        emails, pdfs, skipped = process_mbox(mbox_path, seen_keys)
        grand_emails += emails
        grand_pdfs += pdfs
        grand_skipped += skipped

    print(f"\n{'='*60}")
    print(f"TOTAL: {grand_emails} emails processed")
    print(f"TOTAL: {grand_pdfs} PDFs extracted")
    print(f"TOTAL: {grand_skipped} skipped (duplicates/empty)")
    print(f"Output: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
