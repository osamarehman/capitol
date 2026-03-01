"""
Add &noprof=1 to Google Maps embed URLs in mapSection field.
Updates only pages that have an iframe but are missing noprof=1.
"""
import json
import re
import sys
import time
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding="utf-8")

STRAPI_URL = "https://cms.improveitmd.com"
TOKEN = "77626a0a1961d67057c102d76d1107b2865f546bc3dc681d9693dcf598d67890d10191241805780746fe7b1e211004ee0f1a9a4e6b4bd0e6dee8d47fca9b103902db07d2d336fb85f859a3e41d07917ffb4c24a2cd3980e902ed46a38903c88890b415036a444722eac62af7093cc064ff2777f5cc05b5b808f981f24c55351e"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}

DRY_RUN = "--execute" not in sys.argv


def fetch_pages_needing_update():
    """Fetch all pages with iframe in mapSection but missing noprof=1."""
    pages = []
    page_num = 1
    while True:
        url = (
            f"{STRAPI_URL}/api/services?"
            f"pagination[page]={page_num}&pagination[pageSize]=100"
            f"&fields[0]=title&fields[1]=mapSection&fields[2]=documentId"
        )
        req = urllib.request.Request(url, headers=HEADERS)
        resp = urllib.request.urlopen(req)
        data = json.loads(resp.read())

        for p in data["data"]:
            ms = p.get("mapSection") or ""
            if "iframe" in ms.lower() and "noprof=1" not in ms:
                pages.append(p)

        meta = data["meta"]["pagination"]
        if page_num >= meta["pageCount"]:
            break
        page_num += 1

    return pages


def add_noprof(html: str) -> str:
    """Add &noprof=1 to the Google Maps embed URL in the iframe src."""
    # Match: &ehbc=2E312F (with or without &amp;) and append &noprof=1
    # Handle both &amp; (HTML entity) and & (plain)
    def replacer(match):
        full = match.group(0)
        if "&amp;" in full:
            return full + "&amp;noprof=1"
        else:
            return full + "&noprof=1"

    updated = re.sub(r"&(?:amp;)?ehbc=2E312F", replacer, html, count=1)
    return updated


def push_update(document_id: str, map_section: str) -> bool:
    """PUT updated mapSection to Strapi."""
    url = f"{STRAPI_URL}/api/services/{document_id}"
    payload = json.dumps({"data": {"mapSection": map_section}}).encode("utf-8")
    req = urllib.request.Request(url, data=payload, method="PUT", headers=HEADERS)
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        return resp.status == 200
    except urllib.error.HTTPError as e:
        print(f"    STRAPI ERROR {e.code}: {e.read().decode()[:200]}")
        return False
    except Exception as e:
        print(f"    STRAPI ERROR: {e}")
        return False


def main():
    if DRY_RUN:
        print("=== DRY RUN (use --execute to push) ===\n")
    else:
        print("=== LIVE MODE ===\n")

    pages = fetch_pages_needing_update()
    print(f"Found {len(pages)} pages needing &noprof=1\n")

    success = 0
    errors = 0

    for p in pages:
        title = p["title"]
        doc_id = p["documentId"]
        ms = p["mapSection"]

        updated = add_noprof(ms)

        if updated == ms:
            print(f"  WARNING: No change for: {title}")
            iframe = re.search(r"<iframe[^>]+>", ms)
            if iframe:
                print(f"    {iframe.group()[:200]}")
            errors += 1
            continue

        # Verify noprof=1 is now present
        if "noprof=1" not in updated:
            print(f"  WARNING: noprof=1 still missing after edit: {title}")
            errors += 1
            continue

        if DRY_RUN:
            # Show diff
            old_iframe = re.search(r"<iframe[^>]+>", ms)
            new_iframe = re.search(r"<iframe[^>]+>", updated)
            print(f"  {title}")
            print(f"    BEFORE: {old_iframe.group()[:200] if old_iframe else 'N/A'}")
            print(f"    AFTER:  {new_iframe.group()[:200] if new_iframe else 'N/A'}")
            success += 1
        else:
            ok = push_update(doc_id, updated)
            if ok:
                print(f"  OK: {title}")
                success += 1
            else:
                print(f"  FAILED: {title}")
                errors += 1
            time.sleep(0.3)

    print(f"\nDone: {success} {'would update' if DRY_RUN else 'updated'}, {errors} errors")


if __name__ == "__main__":
    main()
