"""Extract PDF attachments from GAF QuickMeasure mbox file."""
import mailbox
import os
import re
import sys
import email.utils

MBOX_PATH = os.path.join(os.path.dirname(__file__), "GAF Quickmeasure.mbox")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "quickmeasure_pdfs")


def sanitize_filename(name: str) -> str:
    """Remove characters not allowed in filenames."""
    return re.sub(r'[<>:"/\\|?*]', '_', name).strip('. ')


def extract_address_from_subject(subject: str) -> str | None:
    """Extract the address portion from a GAF QuickMeasure subject line."""
    match = re.search(r'GAF QuickMeasure\s*\|\s*(.+)', subject)
    return match.group(1).strip() if match else None


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    mbox = mailbox.mbox(MBOX_PATH)
    total_emails = 0
    total_pdfs = 0
    skipped = 0

    print(f"Parsing mbox: {MBOX_PATH}")
    print(f"Output dir:   {OUTPUT_DIR}\n")

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

                # Build a descriptive filename: date_address_originalname.pdf
                safe_address = sanitize_filename(address)
                if date_prefix:
                    out_name = f"{date_prefix}_{safe_address}_{sanitize_filename(filename)}"
                else:
                    out_name = f"{safe_address}_{sanitize_filename(filename)}"

                # Ensure .pdf extension
                if not out_name.lower().endswith(".pdf"):
                    out_name += ".pdf"

                out_path = os.path.join(OUTPUT_DIR, out_name)

                # Handle duplicates
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

        if pdf_count > 0:
            print(f"  [{total_emails:3d}] {pdf_count} PDF(s) from: {subject}")

        # Progress indicator every 50 emails
        if total_emails % 50 == 0:
            print(f"  ... processed {total_emails} emails so far ({total_pdfs} PDFs extracted)")

    print(f"\nDone!")
    print(f"  Emails processed: {total_emails}")
    print(f"  PDFs extracted:   {total_pdfs}")
    print(f"  Skipped (empty):  {skipped}")
    print(f"  Output directory:  {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
