"""
Clean up recentProjectDescription formatting across all Strapi local pages.

Cleanup rules:
  1. Plain text (no HTML) → wrap in <p>
  2. Strip empty id/id="" attributes from all tags
  3. Strip style="" attributes from all tags
  4. Strip data-* attributes from all tags
  5. Strip w-richtext-* and Webflow class attributes
  6. Replace &nbsp; with regular space
  7. Remove zero-width characters (U+200D, U+200B, U+FEFF)
  8. Remove empty <p> spacers (<p>‍</p>, <p></p>, <p> </p>)
  9. Remove empty headings (<h2>‍</h2>, <h3>‍</h3>)
 10. Convert <br><br> inside <p> to </p><p> (proper paragraph breaks)
 11. Remove trailing <br> at end of paragraphs
 12. Unwrap bare <div style="..."> wrappers (keep inner content)
 13. Keep <figure>, <figcaption>, <img> (actual content)
 14. Keep <hr> as-is (only 1 page, intentional divider)
 15. Trim whitespace

Usage:
  python clean_recent_project.py                 # dry run
  python clean_recent_project.py --execute       # push changes
  python clean_recent_project.py --city=Bowie    # single city
  python clean_recent_project.py --backup-only   # just backup
"""
import json
import os
import re
import sys
import time
from pathlib import Path

import requests
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding="utf-8")

load_dotenv(Path(__file__).parent / "migration" / ".env")

STRAPI_URL = os.getenv("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.getenv("STRAPI_API_TOKEN", "")
HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
}

DRY_RUN = "--execute" not in sys.argv
BACKUP_ONLY = "--backup-only" in sys.argv
CITY_FILTER = None
for arg in sys.argv:
    if arg.startswith("--city="):
        CITY_FILTER = arg.split("=", 1)[1]


def fetch_all_pages():
    """Fetch all pages with recentProjectDescription."""
    all_pages = []
    page = 1
    while True:
        resp = requests.get(f"{STRAPI_URL}/api/services", params={
            "fields[0]": "title",
            "fields[1]": "recentProjectDescription",
            "fields[2]": "documentId",
            "pagination[pageSize]": 100,
            "pagination[page]": page,
        }, headers=HEADERS)
        resp.raise_for_status()
        data = resp.json()
        all_pages.extend(data["data"])
        if page >= data["meta"]["pagination"]["pageCount"]:
            break
        page += 1
    return all_pages


def clean_html(html):
    """Apply all cleanup rules to HTML content."""
    if not html or not html.strip():
        return html

    text = html

    # 1. If plain text (no HTML tags at all), wrap in <p>
    if "<" not in text:
        return f"<p>{text.strip()}</p>"

    # --- Attribute cleanup ---

    # 2. Strip empty id attributes: id="" or id='' or bare id (no value)
    # Handle id="" and id=''
    text = re.sub(r'\s+id\s*=\s*"[^"]*"', '', text)
    text = re.sub(r"\s+id\s*=\s*'[^']*'", '', text)
    # Handle bare id with no value: <p id> or <p id >
    text = re.sub(r'\s+id(?=\s*>|\s+[a-zA-Z])', '', text)

    # 3. Strip style attributes
    text = re.sub(r'\s+style\s*=\s*"[^"]*"', '', text)
    text = re.sub(r"\s+style\s*=\s*'[^']*'", '', text)

    # 4. Strip data-* attributes
    text = re.sub(r'\s+data-[\w-]+\s*=\s*"[^"]*"', '', text)
    text = re.sub(r"\s+data-[\w-]+\s*=\s*'[^']*'", '', text)
    # Handle data-* without value
    text = re.sub(r'\s+data-[\w-]+(?=\s*>|\s+[a-zA-Z])', '', text)

    # 5. Strip Webflow class attributes (w-richtext-*, but keep non-webflow classes)
    # Remove entire class attr if it only contains w-richtext classes
    def clean_class(match):
        classes = match.group(1).strip()
        non_wf = [c for c in classes.split() if not c.startswith("w-richtext")]
        if not non_wf:
            return ""
        return f' class="{" ".join(non_wf)}"'
    text = re.sub(r'\s+class\s*=\s*"([^"]*)"', clean_class, text)

    # --- Content cleanup ---

    # 6. Replace &nbsp; with regular space
    text = text.replace("&nbsp;", " ")
    text = text.replace("\u00a0", " ")

    # 7. Remove zero-width characters
    text = text.replace("\u200d", "")  # zero-width joiner
    text = text.replace("\u200b", "")  # zero-width space
    text = text.replace("\ufeff", "")  # BOM

    # 8. Remove empty <p> spacers
    # <p>‍</p>, <p></p>, <p> </p>, <p>&nbsp;</p>
    text = re.sub(r"<p[^>]*>\s*</p>", "", text)

    # 9. Remove empty headings
    text = re.sub(r"<h[1-6][^>]*>\s*</h[1-6]>", "", text)

    # 10. Convert <br><br> to </p><p> (proper paragraph breaks)
    # Handle variations: <br><br>, <br/><br/>, <br /><br />
    text = re.sub(r"<br\s*/?\s*>\s*<br\s*/?\s*>", "</p><p>", text)

    # 11. Remove trailing <br> at end of paragraphs (before </p>)
    text = re.sub(r"\s*<br\s*/?\s*>\s*</p>", "</p>", text)

    # 12. Unwrap bare <div> wrappers that just add styling
    # Remove opening <div ...> and closing </div> but keep inner content
    # Only for divs that are NOT inside <figure>
    # Simple approach: remove <div> tags that aren't part of a figure
    def unwrap_divs(html):
        # Don't touch divs inside <figure>
        # Remove standalone <div ...> and </div> tags
        # But preserve <div> inside <figure> (used for images)
        parts = re.split(r"(<figure.*?</figure>)", html, flags=re.DOTALL)
        result = []
        for i, part in enumerate(parts):
            if part.startswith("<figure"):
                result.append(part)
            else:
                # Remove bare divs outside figure
                cleaned = re.sub(r"<div[^>]*>", "", part)
                cleaned = cleaned.replace("</div>", "")
                result.append(cleaned)
        return "".join(result)

    text = unwrap_divs(text)

    # --- Final cleanup ---

    # 13. Second pass: remove empty <p> tags created by br→p conversion or div unwrapping
    text = re.sub(r"<p[^>]*>\s*</p>", "", text)

    # Clean up multiple consecutive empty lines / whitespace
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Remove leading/trailing whitespace
    text = text.strip()

    return text


def diff_summary(original, cleaned):
    """Generate a brief summary of changes."""
    changes = []

    if "<" not in original and "<p>" in cleaned:
        changes.append("wrapped in <p>")

    orig_ids = len(re.findall(r'\bid\s*=', original))
    clean_ids = len(re.findall(r'\bid\s*=', cleaned))
    if orig_ids > clean_ids:
        changes.append(f"removed {orig_ids - clean_ids} id attrs")

    orig_styles = len(re.findall(r'style\s*=', original))
    clean_styles = len(re.findall(r'style\s*=', cleaned))
    if orig_styles > clean_styles:
        changes.append(f"removed {orig_styles - clean_styles} style attrs")

    orig_data = len(re.findall(r'data-\w+', original))
    clean_data = len(re.findall(r'data-\w+', cleaned))
    if orig_data > clean_data:
        changes.append(f"removed {orig_data - clean_data} data-* attrs")

    if "&nbsp;" in original and "&nbsp;" not in cleaned:
        count = original.count("&nbsp;")
        changes.append(f"replaced {count} &nbsp;")

    if "\u200d" in original and "\u200d" not in cleaned:
        changes.append("removed zero-width chars")

    orig_empty_p = len(re.findall(r"<p[^>]*>\s*[\u200d\u200b]?\s*</p>", original))
    if orig_empty_p:
        changes.append(f"removed {orig_empty_p} empty <p>")

    orig_br2 = len(re.findall(r"<br\s*/?\s*>\s*<br\s*/?\s*>", original))
    if orig_br2:
        changes.append(f"converted {orig_br2} <br><br>")

    if "<div" in original and "<div" not in cleaned:
        changes.append("unwrapped <div>")

    orig_classes = len(re.findall(r'w-richtext', original))
    if orig_classes:
        changes.append(f"stripped {orig_classes} Webflow classes")

    return ", ".join(changes) if changes else "no changes"


def push_update(document_id, value):
    """PUT updated recentProjectDescription to Strapi."""
    url = f"{STRAPI_URL}/api/services/{document_id}"
    resp = requests.put(
        url,
        json={"data": {"recentProjectDescription": value}},
        headers=HEADERS,
        timeout=15,
    )
    if resp.status_code == 200:
        return True
    print(f"    STRAPI ERROR {resp.status_code}: {resp.text[:200]}")
    return False


def main():
    if BACKUP_ONLY:
        print("=== BACKUP ONLY MODE ===\n")
    elif DRY_RUN:
        print("=== DRY RUN (use --execute to push) ===\n")
    else:
        print("=== LIVE MODE ===\n")

    # 1. Fetch all pages
    print("Fetching all pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  Found {len(all_pages)} pages\n")

    # 2. Backup
    backup_path = Path(__file__).parent / "recent_project_backup.json"
    print(f"Creating backup at {backup_path}...")
    backup = {}
    for p in all_pages:
        backup[p["documentId"]] = {
            "title": p["title"],
            "documentId": p["documentId"],
            "recentProjectDescription": p.get("recentProjectDescription", ""),
        }
    with open(backup_path, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"  Backed up {len(backup)} pages\n")

    if BACKUP_ONLY:
        print("Done. Backup saved.")
        return

    # 3. Filter
    if CITY_FILTER:
        filter_lower = CITY_FILTER.lower()
        pages = [p for p in all_pages if filter_lower in p["title"].lower()]
        print(f"  Filtered to city: {CITY_FILTER} ({len(pages)} pages)\n")
    else:
        pages = all_pages

    # 4. Process
    success = 0
    skipped = 0
    errors = 0

    for p in pages:
        title = p["title"]
        doc_id = p["documentId"]
        original = p.get("recentProjectDescription", "") or ""

        if not original.strip():
            skipped += 1
            continue

        cleaned = clean_html(original)

        if cleaned == original:
            skipped += 1
            continue

        summary = diff_summary(original, cleaned)

        if DRY_RUN:
            print(f"  {title}: {summary}")
            success += 1
        else:
            ok = push_update(doc_id, cleaned)
            if ok:
                print(f"  OK: {title} ({summary})")
                success += 1
            else:
                print(f"  FAILED: {title}")
                errors += 1
            time.sleep(0.2)

    print(f"\n=== SUMMARY ===")
    action = "would clean" if DRY_RUN else "cleaned"
    print(f"  {action}: {success}")
    print(f"  skipped (empty/no changes): {skipped}")
    print(f"  errors: {errors}")


if __name__ == "__main__":
    main()
