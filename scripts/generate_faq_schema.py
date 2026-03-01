"""
Generate FAQ schema markup (JSON-LD) for Strapi service pages.

Fetches all service pages, extracts FAQ Q&A pairs from faqsRichText HTML,
generates FAQPage JSON-LD schema markup, and pushes to the schemaMarkup field.

LocalBusiness schema is already handled in the project's custom code,
so this script only generates FAQPage structured data.

Usage:
    python generate_faq_schema.py                    # dry run (default)
    python generate_faq_schema.py --execute          # generate + push to Strapi
    python generate_faq_schema.py --limit=5          # process N pages
    python generate_faq_schema.py --slug=bowie       # filter by slug
    python generate_faq_schema.py --restore          # restore from backup
"""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser

from dotenv import load_dotenv

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(SCRIPT_DIR, "migration", ".env"))

STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")

HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}

BACKUP_PATH = os.path.join(SCRIPT_DIR, "strapi_schemaMarkup_backup.json")
OUTPUT_LOG = os.path.join(SCRIPT_DIR, "faq_schema_push_log.json")


# ── HTML parsing ──────────────────────────────────────────────────────────


class HTMLStripper(HTMLParser):
    """Strip HTML tags, returning plain text."""

    def __init__(self):
        super().__init__()
        self.result = []
        self.skip = False

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip = True

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip = False

    def handle_data(self, data):
        if not self.skip:
            self.result.append(data)

    def get_text(self):
        return "".join(self.result).strip()


def strip_html(html: str) -> str:
    """Remove HTML tags and return plain text."""
    if not html:
        return ""
    s = HTMLStripper()
    s.feed(html)
    text = s.get_text()
    text = text.replace("\xa0", " ").replace("&nbsp;", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_faq_pairs(html: str) -> list[dict]:
    """Extract Q&A pairs from FAQ rich text HTML.

    Questions are in <h3 class="faqs-question">
    Answers are in <p class="faqs-answer">
    """
    if not html:
        return []

    questions = re.findall(
        r'<h3[^>]*class="faqs-question"[^>]*>(.*?)</h3>', html, re.DOTALL
    )
    answers = re.findall(
        r'<p[^>]*class="faqs-answer"[^>]*>(.*?)</p>', html, re.DOTALL
    )

    pairs = []
    for q, a in zip(questions, answers):
        q_text = strip_html(q).strip()
        # Strip trailing "Learn more." links from answers
        a_clean = re.sub(r'<a[^>]*>Learn more\.?</a>', '', a)
        a_text = strip_html(a_clean).strip()
        if q_text and a_text:
            pairs.append({"question": q_text, "answer": a_text})

    return pairs


def parse_title(title: str) -> tuple[str, str, str] | None:
    """Parse 'Service - City - ST' into (service_label, city, state)."""
    parts = [p.strip() for p in title.split(" - ")]
    if len(parts) >= 3:
        return parts[0], parts[1], parts[2]
    elif len(parts) == 2:
        return parts[0], parts[1], "MD"
    return None


# ── Strapi API helpers ────────────────────────────────────────────────────


def strapi_get(path: str) -> dict:
    """GET from Strapi API."""
    req = urllib.request.Request(f"{STRAPI_URL}/api/{path}", headers=HEADERS)
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def strapi_put(document_id: str, data: dict) -> dict:
    """PUT to Strapi API."""
    url = f"{STRAPI_URL}/api/services/{document_id}"
    payload = json.dumps({"data": data}).encode()
    req = urllib.request.Request(url, data=payload, method="PUT", headers=HEADERS)
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def fetch_all_pages() -> list[dict]:
    """Fetch all service pages with FAQ and schema fields."""
    pages = []
    page = 1
    while True:
        params = urllib.parse.urlencode({
            "fields[0]": "title",
            "fields[1]": "slug",
            "fields[2]": "faqsRichText",
            "fields[3]": "schemaMarkup",
            "fields[4]": "documentId",
            "pagination[page]": str(page),
            "pagination[pageSize]": "100",
        })
        data = strapi_get(f"services?{params}")
        pages.extend(data["data"])
        meta = data["meta"]["pagination"]
        if page >= meta["pageCount"]:
            break
        page += 1
    return pages


# ── Schema generation ─────────────────────────────────────────────────────


def generate_faq_schema(faq_pairs: list[dict]) -> dict:
    """Generate FAQPage JSON-LD schema from Q&A pairs."""
    faq_entities = []
    for pair in faq_pairs:
        faq_entities.append({
            "@type": "Question",
            "name": pair["question"],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": pair["answer"],
            },
        })

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq_entities,
    }


# ── Backup / Restore ──────────────────────────────────────────────────────


def backup_pages(pages: list[dict]):
    """Save current schemaMarkup data to backup file."""
    backup = []
    for p in pages:
        backup.append({
            "documentId": p["documentId"],
            "title": p["title"],
            "slug": p.get("slug", ""),
            "schemaMarkup": p.get("schemaMarkup") or "",
        })

    with open(BACKUP_PATH, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"Backup saved: {BACKUP_PATH} ({len(backup)} pages)")


def restore_from_backup():
    """Restore schemaMarkup from backup JSON."""
    if not os.path.exists(BACKUP_PATH):
        print(f"No backup found at {BACKUP_PATH}")
        sys.exit(1)

    with open(BACKUP_PATH, encoding="utf-8") as f:
        backup = json.load(f)

    print(f"Restoring {len(backup)} pages from backup...")
    restored = 0
    failed = 0

    for i, entry in enumerate(backup, 1):
        doc_id = entry["documentId"]
        try:
            strapi_put(doc_id, {"schemaMarkup": entry["schemaMarkup"]})
            print(f"  [{i}/{len(backup)}] Restored: {entry['title']}")
            restored += 1
        except Exception as e:
            print(f"  [{i}/{len(backup)}] FAILED: {entry['title']} — {e}")
            failed += 1
        time.sleep(0.2)

    print(f"\nRestore complete! Restored: {restored}, Failed: {failed}")


# ── Main ──────────────────────────────────────────────────────────────────


def main():
    args = sys.argv[1:]
    dry_run = "--execute" not in args
    restore = "--restore" in args
    slug_filter = None
    limit = None

    for arg in args:
        if arg.startswith("--slug="):
            slug_filter = arg.split("=", 1)[1].lower()
        elif arg.startswith("--limit="):
            limit = int(arg.split("=")[1])

    if restore:
        restore_from_backup()
        return

    if dry_run:
        print("=== DRY RUN (use --execute to push to Strapi) ===\n")
    else:
        print("=== LIVE MODE: generating + pushing to Strapi ===\n")

    # Fetch all pages
    print("Fetching all pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  Total pages: {len(all_pages)}")

    # Backup before making changes (live mode only)
    if not dry_run:
        backup_pages(all_pages)
        print()

    processed = 0
    pushed = 0
    skipped = 0
    failed = 0
    log = []

    for p in all_pages:
        title = p["title"]
        slug = p.get("slug", "")
        doc_id = p["documentId"]
        faq_html = p.get("faqsRichText") or ""

        # Apply slug filter
        if slug_filter and slug_filter not in slug.lower():
            continue

        # Apply limit
        if limit and processed >= limit:
            break

        # Parse title for service/city/state
        parsed = parse_title(title)
        if not parsed:
            skipped += 1
            continue

        service_label, city, state = parsed

        # Extract FAQ pairs
        faq_pairs = extract_faq_pairs(faq_html)
        if not faq_pairs:
            skipped += 1
            continue

        # Generate FAQPage schema wrapped in script tags
        schema = generate_faq_schema(faq_pairs)
        schema_json = (
            '<script type="application/ld+json">\n'
            + json.dumps(schema, indent=2)
            + "\n</script>"
        )

        processed += 1

        # Preview or push
        if dry_run:
            faq_count = len(faq_pairs)
            print(f"  [{processed}] {title}")
            print(f"       FAQs: {faq_count} | JSON size: {len(schema_json)} bytes")
            pushed += 1
        else:
            try:
                strapi_put(doc_id, {"schemaMarkup": schema_json})
                print(f"  [{processed}] PUSHED: {title}")
                pushed += 1
            except urllib.error.HTTPError as e:
                body = e.read().decode()[:200]
                print(f"  [{processed}] FAILED: {title} — HTTP {e.code}: {body}")
                failed += 1
            except Exception as e:
                print(f"  [{processed}] FAILED: {title} — {e}")
                failed += 1
            time.sleep(0.2)

        log.append({
            "title": title,
            "slug": slug,
            "documentId": doc_id,
            "service": service_label,
            "city": city,
            "state": state,
            "faqCount": len(faq_pairs),
            "status": "pushed" if not dry_run and pushed > 0 else "dry_run" if dry_run else "failed",
            "schemaMarkup": schema_json,
        })

    # Save log
    with open(OUTPUT_LOG, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    print(f"\n{'=' * 60}")
    print("SUMMARY")
    print(f"{'=' * 60}")
    print(f"  Total CMS pages:       {len(all_pages)}")
    print(f"  Skipped (no FAQ/title): {skipped}")
    print(f"  Processed:             {processed}")
    print(f"  Pushed/previewed:      {pushed}")
    if failed:
        print(f"  Failed:                {failed}")
    print(f"  Mode:                  {'DRY RUN' if dry_run else 'LIVE'}")
    print(f"  Log saved:             {OUTPUT_LOG}")


if __name__ == "__main__":
    main()
