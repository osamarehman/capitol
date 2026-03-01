"""
Enrich HOA contact info (email/phone) using Perplexity AI web search.

Reads the existing hoa_perplexity_cache.json, identifies HOAs missing email
or phone, batches them by city, calls Perplexity to visit known HOA websites
and extract contact info, merges results, rebuilds HTML, and pushes to Strapi.

Usage:
    python enrich_hoa_contacts.py                        # dry run
    python enrich_hoa_contacts.py --execute              # push to Strapi
    python enrich_hoa_contacts.py --city=Bowie           # single city
    python enrich_hoa_contacts.py --limit=5              # first N cities
    python enrich_hoa_contacts.py --enrich-only          # enrich cache, don't push
    python enrich_hoa_contacts.py --skip-enrich          # use cache as-is, just push
    python enrich_hoa_contacts.py --restore              # restore from backup
"""
import csv
import html as html_module
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

from dotenv import load_dotenv

sys.stdout.reconfigure(encoding="utf-8")

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(SCRIPT_DIR, "migration", ".env"))

STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
PERPLEXITY_API_KEY = os.environ.get("PERPLEXITY_API_KEY", "")

CACHE_FILE = os.path.join(SCRIPT_DIR, "hoa_perplexity_cache.json")

STRAPI_HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0",
}

TITLE_CITY_NORMALIZE = {
    "Ft Washington": ("Fort Washington", "MD"),
    "Mont Village": ("Montgomery Village", "MD"),
    "Mont. Village": ("Montgomery Village", "MD"),
    "Washington, DC": ("Washington", "DC"),
    "DC": ("Washington", "DC"),
}

# CLI args
args = sys.argv[1:]
DRY_RUN = "--execute" not in args
ENRICH_ONLY = "--enrich-only" in args
SKIP_ENRICH = "--skip-enrich" in args
RESTORE_MODE = "--restore" in args
CITY_FILTER = None
LIMIT = None
for arg in args:
    if arg.startswith("--city="):
        CITY_FILTER = arg.split("=", 1)[1]
    elif arg.startswith("--limit="):
        LIMIT = int(arg.split("=", 1)[1])


# ── Strapi helpers ────────────────────────────────────────────────────────────

def strapi_get(path: str) -> dict:
    req = urllib.request.Request(f"{STRAPI_URL}/api/{path}", headers=STRAPI_HEADERS)
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def strapi_put(document_id: str, data: dict) -> dict:
    url = f"{STRAPI_URL}/api/services/{document_id}"
    payload = json.dumps({"data": data}).encode()
    req = urllib.request.Request(url, data=payload, method="PUT", headers=STRAPI_HEADERS)
    resp = urllib.request.urlopen(req, timeout=15)
    return json.loads(resp.read())


def fetch_all_pages() -> list[dict]:
    """Fetch all service pages with title, slug, communityGuidelinesRichText."""
    pages = []
    page = 1
    while True:
        params = urllib.parse.urlencode({
            "fields[0]": "title",
            "fields[1]": "slug",
            "fields[2]": "communityGuidelinesRichText",
            "pagination[page]": str(page),
            "pagination[pageSize]": "100",
        })
        data = strapi_get(f"services?{params}")
        pages.extend(data["data"])
        if page >= data["meta"]["pagination"]["pageCount"]:
            break
        page += 1
    return pages


def extract_city_state(title: str):
    """Extract city and state from page title."""
    parts = [p.strip() for p in title.split(" - ")]
    if len(parts) < 2:
        return None
    city_name = parts[1]
    state_abbr = parts[2] if len(parts) >= 3 else "MD"

    if city_name in TITLE_CITY_NORMALIZE:
        city_name, state_abbr = TITLE_CITY_NORMALIZE[city_name]

    if city_name.lower() in ("maryland", "virginia", "dc"):
        return None

    return city_name, state_abbr


# ── Perplexity API ────────────────────────────────────────────────────────────

def call_perplexity(prompt: str, max_tokens: int = 4000):
    """Call Perplexity AI API for web-grounded research."""
    if not PERPLEXITY_API_KEY:
        print("    ERROR: PERPLEXITY_API_KEY not set")
        return None

    payload = json.dumps({
        "model": "sonar-pro",
        "max_tokens": max_tokens,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a research assistant. Your job is to visit HOA "
                    "websites and extract contact information. Return structured "
                    "JSON data only."
                ),
            },
            {"role": "user", "content": prompt},
        ],
    }).encode()

    req = urllib.request.Request(
        "https://api.perplexity.ai/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
            "Content-Type": "application/json",
        },
    )
    try:
        resp = urllib.request.urlopen(req, timeout=120)
        result = json.loads(resp.read())
        return result["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"    PERPLEXITY ERROR: {e}")
        return None


def parse_json_response(result: str) -> list[dict]:
    """Parse JSON array from Perplexity response, handling edge cases."""
    if not result:
        return []

    cleaned = result.strip()
    cleaned = re.sub(r"^```(?:json)?\s*\n?", "", cleaned)
    cleaned = re.sub(r"\n?```\s*$", "", cleaned)
    cleaned = cleaned.strip()

    # Strategy 1: Direct parse
    try:
        data = json.loads(cleaned)
        if isinstance(data, list):
            return data
    except json.JSONDecodeError:
        pass

    # Strategy 2: Find outermost brackets
    first = result.find("[")
    last = result.rfind("]")
    if first != -1 and last > first:
        try:
            data = json.loads(result[first:last + 1])
            if isinstance(data, list):
                return data
        except json.JSONDecodeError:
            pass

        # Fix trailing commas
        chunk = result[first:last + 1]
        chunk = re.sub(r",\s*([}\]])", r"\1", chunk)
        try:
            data = json.loads(chunk)
            if isinstance(data, list):
                return data
        except json.JSONDecodeError:
            pass

    # Strategy 3: Extract individual JSON objects
    if first != -1:
        chunk = result[first:]
        objects = []
        depth = 0
        obj_start = None
        for i, ch in enumerate(chunk):
            if ch == "{":
                if depth == 0:
                    obj_start = i
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0 and obj_start is not None:
                    try:
                        obj = json.loads(chunk[obj_start:i + 1])
                        objects.append(obj)
                    except json.JSONDecodeError:
                        pass
                    obj_start = None
        if objects:
            return objects

    # Perplexity refused
    refusal_markers = [
        "cannot provide", "I cannot", "I'm unable", "search results do not",
        "don't have", "no specific", "not contain",
    ]
    if any(marker in result.lower() for marker in refusal_markers):
        return []

    print(f"    WARNING: Could not parse response")
    print(f"    Preview: {result[:200]}")
    return []


def enrich_city_contacts(city: str, state: str, hoas: list[dict]) -> list[dict]:
    """Call Perplexity to find missing website/email/phone for HOAs in a city."""
    hoa_lines = []
    for h in hoas:
        name = h.get("name", "Unknown")
        parts = []
        if h.get("website"):
            parts.append(f"website: {h['website']}")
        else:
            parts.append("MISSING website")
        parts.append("has email" if h.get("email") else "MISSING email")
        parts.append("has phone" if h.get("phone") else "MISSING phone")
        hoa_lines.append(f"- {name} | {' | '.join(parts)}")

    hoa_list_text = "\n".join(hoa_lines)

    state_name = {"MD": "Maryland", "VA": "Virginia", "DC": "Washington, DC"}.get(
        state, state
    )

    prompt = f"""I need contact information for these HOA/community associations in {city}, {state_name}.

For each one marked MISSING, please search for their official website URL, contact email, and phone number. Check management company portals (FirstService, Vanguard, CMC, RealManage, etc.), county HOA registries, and community directories. If a website is provided, visit it and extract the email and phone.

HOAs to research:
{hoa_list_text}

For each HOA, return the website, email, and phone you found (or null if not found).

Return ONLY a valid JSON array:
[{{"name": "HOA Name", "website": "https://example.com", "email": "contact@example.com", "phone": "(301) 555-1234"}}]

Include ALL HOAs from the list above, even if you couldn't find info (use null for missing fields)."""

    result = call_perplexity(prompt, max_tokens=6000)
    return parse_json_response(result)


def merge_enriched_data(existing_hoas: list[dict], enriched: list[dict]) -> tuple[list[dict], int, int, int]:
    """Merge enriched contact data into existing HOAs.

    Only overwrites null fields — never erases existing data.
    Returns (merged_hoas, websites_added, emails_added, phones_added).
    """
    enriched_lookup = {}
    for e in enriched:
        name_key = e.get("name", "").lower().strip()
        if name_key:
            enriched_lookup[name_key] = e

    websites_added = 0
    emails_added = 0
    phones_added = 0

    for hoa in existing_hoas:
        name_key = hoa.get("name", "").lower().strip()
        match = enriched_lookup.get(name_key)
        if not match:
            continue

        new_website = match.get("website")
        if new_website and not hoa.get("website"):
            hoa["website"] = new_website
            websites_added += 1

        new_email = match.get("email")
        if new_email and not hoa.get("email"):
            hoa["email"] = new_email
            emails_added += 1

        new_phone = match.get("phone")
        if new_phone and not hoa.get("phone"):
            hoa["phone"] = new_phone
            phones_added += 1

        new_address = match.get("address")
        if new_address and not hoa.get("address"):
            hoa["address"] = new_address

    return existing_hoas, websites_added, emails_added, phones_added


def hoa_has_contact(hoa: dict) -> bool:
    """Return True if an HOA has at least one piece of contact info."""
    return bool(hoa.get("website") or hoa.get("email") or hoa.get("phone"))


def count_missing(hoas: list[dict]) -> tuple[int, int, int]:
    """Count HOAs missing website, email, phone."""
    return (
        sum(1 for h in hoas if not h.get("website")),
        sum(1 for h in hoas if not h.get("email")),
        sum(1 for h in hoas if not h.get("phone")),
    )


# ── Cache management ──────────────────────────────────────────────────────────

def load_cache() -> dict:
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache: dict):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)


# ── HTML builder (reused from research_and_push_hoa.py) ──────────────────────

def escape_html(text: str) -> str:
    return html_module.escape(text)


def build_hoa_html(city: str, state: str, hoas: list[dict]) -> str:
    """Build the communityGuidelinesRichText HTML."""
    state_display = {
        "MD": "Maryland", "VA": "Virginia", "DC": "DC"
    }.get(state, state)

    parts = []

    parts.append(
        f"<h2>HOA &amp; Community Association Links — "
        f"{escape_html(city)}, {state_display}</h2>"
    )
    parts.append(
        f"<p>Many {escape_html(city)} neighborhoods are governed by homeowner or "
        f"community associations that enforce architectural and exterior improvement "
        f"guidelines. To make things easier for you, we've gathered direct links to "
        f"local HOA and community association websites below — along with phone numbers "
        f"and emails where publicly available — so you can quickly locate your "
        f"association and review their requirements.</p>"
    )
    parts.append(
        f"<h3>{escape_html(city)} HOA &amp; Community Association Websites</h3>"
    )

    # All HOAs should have at least one contact field after cleanup
    display_hoas = hoas

    for hoa in display_hoas:
        name = hoa.get("name", "Unknown Association")
        website = hoa.get("website")
        email = hoa.get("email")
        phone = hoa.get("phone")
        address = hoa.get("address")

        parts.append(f"<h4>{escape_html(name)}</h4>")

        lines = []

        if website:
            lines.append(
                f'<strong>Website:</strong> <a href="{escape_html(website)}" '
                f'target="_blank" rel="noopener noreferrer">'
                f"{escape_html(website)}</a>"
            )
        else:
            lines.append(
                "<strong>Website:</strong> <i>No public website listed</i>"
            )

        if email:
            lines.append(
                f'<strong>Email:</strong> <a href="mailto:{escape_html(email)}">'
                f"{escape_html(email)}</a>"
            )
        else:
            lines.append(
                "<strong>Email:</strong> <i>No public email listed — "
                "try contacting via website.</i>"
            )

        if phone:
            phone_digits = re.sub(r"\D", "", phone)
            lines.append(
                f'<strong>Phone:</strong> <a href="tel:{phone_digits}">'
                f"{escape_html(phone)}</a>"
            )
        else:
            lines.append(
                "<strong>Phone:</strong> <i>No public phone listed — "
                "email is best.</i>"
            )

        if address:
            lines.append(
                f"<strong>Mailing Address:</strong> {escape_html(address)}"
            )
        else:
            lines.append(
                "<strong>Mailing Address:</strong> <i>No public mailing "
                "address listed.</i>"
            )

        parts.append(f"<p>\n{'<br>\n'.join(lines)}\n</p>")

    parts.append("<hr>")
    parts.append(
        "<h3>\u26a0\ufe0f Important \u2014 Check With Your HOA Before Starting</h3>"
    )
    parts.append(
        "<p>If your home is located in an HOA or community association, it is "
        "very important to contact your association and obtain their current "
        "exterior and architectural guidelines before starting any project.</p>"
    )
    parts.append(
        "<p>Capitol Improvements does not interpret, modify, or override HOA "
        "rules. Once you provide your association's guidelines, we will recommend "
        "materials and systems that comply so your project can move forward "
        "smoothly and without delays.</p>"
    )

    return "\n".join(parts)


def build_minimal_html(city: str, state: str) -> str:
    """Build minimal HTML for cities with no HOA data."""
    state_display = {
        "MD": "Maryland", "VA": "Virginia", "DC": "DC"
    }.get(state, state)

    parts = []
    parts.append(
        f"<h2>HOA &amp; Community Association Links — "
        f"{escape_html(city)}, {state_display}</h2>"
    )
    parts.append(
        f"<p>Many {escape_html(city)} neighborhoods are governed by homeowner or "
        f"community associations that enforce architectural and exterior improvement "
        f"guidelines. To make things easier for you, we've gathered direct links to "
        f"local HOA and community association websites below — along with phone numbers "
        f"and emails where publicly available — so you can quickly locate your "
        f"association and review their requirements.</p>"
    )
    parts.append("<hr>")
    parts.append(
        "<h3>\u26a0\ufe0f Important \u2014 Check With Your HOA Before Starting</h3>"
    )
    parts.append(
        "<p>If your home is located in an HOA or community association, it is "
        "very important to contact your association and obtain their current "
        "exterior and architectural guidelines before starting any project.</p>"
    )
    parts.append(
        "<p>Capitol Improvements does not interpret, modify, or override HOA "
        "rules. Once you provide your association's guidelines, we will recommend "
        "materials and systems that comply so your project can move forward "
        "smoothly and without delays.</p>"
    )
    return "\n".join(parts)


# ── Backup / Restore ─────────────────────────────────────────────────────────

def create_backup(pages):
    """Save communityGuidelinesRichText backup with timestamp."""
    ts = time.strftime("%Y%m%d")
    backup_path = os.path.join(SCRIPT_DIR, f"hoa_community_guidelines_backup_{ts}.json")
    backup = []
    for p in pages:
        backup.append({
            "documentId": p["documentId"],
            "title": p.get("title", ""),
            "slug": p.get("slug", ""),
            "communityGuidelinesRichText": p.get("communityGuidelinesRichText", ""),
        })
    with open(backup_path, "w", encoding="utf-8") as f:
        json.dump(backup, f, indent=2, ensure_ascii=False)
    print(f"  Backup saved to {backup_path} ({len(backup)} pages)\n")
    return backup_path


def restore_from_backup():
    """Restore communityGuidelinesRichText from most recent backup."""
    import glob
    backups = sorted(
        glob.glob(os.path.join(SCRIPT_DIR, "hoa_community_guidelines_backup_*.json")),
        reverse=True,
    )
    if not backups:
        print("ERROR: No backup files found")
        return

    backup_path = backups[0]
    print(f"Restoring from {backup_path}...")

    with open(backup_path, "r", encoding="utf-8") as f:
        backup = json.load(f)

    restored = 0
    failed = 0
    for entry in backup:
        try:
            strapi_put(
                entry["documentId"],
                {"communityGuidelinesRichText": entry.get("communityGuidelinesRichText", "")},
            )
            restored += 1
            print(f"  OK: {entry.get('title', entry['documentId'])}")
        except Exception as e:
            failed += 1
            print(f"  FAILED: {entry.get('title', '')}: {e}")
        time.sleep(0.1)

    print(f"\nRestored: {restored}, Failed: {failed}")


# ── CSV report ────────────────────────────────────────────────────────────────

def export_enrichment_report(cache: dict, report_path: str):
    """Export enrichment report CSV showing before/after for each HOA."""
    rows = []
    for city_key, data in sorted(cache.items()):
        city_state = data.get("city_state", city_key)
        for hoa in data.get("hoas", []):
            rows.append({
                "city": city_state,
                "hoa_name": hoa.get("name", ""),
                "website": hoa.get("website", ""),
                "email": hoa.get("email", ""),
                "phone": hoa.get("phone", ""),
                "address": hoa.get("address", ""),
            })

    with open(report_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f, fieldnames=["city", "hoa_name", "website", "email", "phone", "address"],
        )
        writer.writeheader()
        writer.writerows(rows)
    print(f"  Exported {len(rows)} entries to {report_path}")


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    if RESTORE_MODE:
        print("=== RESTORE MODE ===\n")
        restore_from_backup()
        return

    if ENRICH_ONLY:
        print("=== ENRICH ONLY (no Strapi updates) ===\n")
    elif DRY_RUN and not SKIP_ENRICH:
        print("=== DRY RUN (use --execute to push to Strapi) ===\n")
    elif SKIP_ENRICH:
        print(f"=== SKIP ENRICH — {'DRY RUN' if DRY_RUN else 'LIVE'} push ===\n")
    else:
        print("=== LIVE MODE: enriching + pushing to Strapi ===\n")

    # Step 1: Load cache and analyze gaps
    print("Step 1: Loading HOA cache...")
    cache = load_cache()
    print(f"  {len(cache)} cities in cache\n")

    total_hoas = 0
    missing_website = 0
    missing_email = 0
    missing_phone = 0
    cities_needing_enrichment = []

    for city_key, data in sorted(cache.items()):
        hoas = data.get("hoas", [])
        city_missing = False
        for hoa in hoas:
            total_hoas += 1
            if not hoa.get("website"):
                missing_website += 1
                city_missing = True
            if not hoa.get("email"):
                missing_email += 1
                city_missing = True
            if not hoa.get("phone"):
                missing_phone += 1
                city_missing = True
        if city_missing:
            cities_needing_enrichment.append(city_key)

    print(f"  Total HOAs: {total_hoas}")
    print(f"  Missing website: {missing_website} ({missing_website * 100 // max(total_hoas, 1)}%)")
    print(f"  Missing email: {missing_email} ({missing_email * 100 // max(total_hoas, 1)}%)")
    print(f"  Missing phone: {missing_phone} ({missing_phone * 100 // max(total_hoas, 1)}%)")
    print(f"  Cities needing enrichment: {len(cities_needing_enrichment)}\n")

    # Apply filters
    cities_to_process = cities_needing_enrichment

    if CITY_FILTER:
        cities_to_process = [c for c in cities_to_process if CITY_FILTER.lower() in c.lower()]
        print(f"  Filtered to {len(cities_to_process)} cities matching '{CITY_FILTER}'\n")

    if LIMIT:
        cities_to_process = cities_to_process[:LIMIT]
        print(f"  Limited to {LIMIT} cities\n")

    # Step 2: Enrich via Perplexity (up to 3 passes per city)
    MAX_PASSES = 3

    if not SKIP_ENRICH:
        print(f"Step 2: Enriching contacts via Perplexity (up to {MAX_PASSES} passes)...\n")
        total_websites_added = 0
        total_emails_added = 0
        total_phones_added = 0
        enriched_cities = 0

        for ci, city_key in enumerate(cities_to_process, 1):
            data = cache[city_key]
            city_state = data.get("city_state", city_key)
            hoas = data.get("hoas", [])

            mw, me, mp = count_missing(hoas)
            if mw == 0 and me == 0 and mp == 0:
                continue

            cs_parts = city_state.split(", ")
            city_name = cs_parts[0] if cs_parts else city_key
            state = cs_parts[1] if len(cs_parts) > 1 else "MD"

            print(f"  [{ci}/{len(cities_to_process)}] {city_state} "
                  f"({len(hoas)} HOAs — {mw} no website, {me} no email, {mp} no phone)")

            city_ws = 0
            city_em = 0
            city_ph = 0

            for attempt in range(1, MAX_PASSES + 1):
                # Only send HOAs still missing something
                hoas_to_enrich = [
                    h for h in hoas
                    if not h.get("website") or not h.get("email") or not h.get("phone")
                ]
                if not hoas_to_enrich:
                    break

                if attempt > 1:
                    print(f"    pass {attempt}/{MAX_PASSES} "
                          f"({len(hoas_to_enrich)} HOAs still incomplete)...")

                enriched = enrich_city_contacts(city_name, state, hoas_to_enrich)

                if not enriched:
                    print(f"    pass {attempt}: no data returned, stopping")
                    break

                hoas, ws, em, ph = merge_enriched_data(hoas, enriched)
                city_ws += ws
                city_em += em
                city_ph += ph

                # Stop retrying if this pass added nothing new
                if ws == 0 and em == 0 and ph == 0:
                    if attempt > 1:
                        print(f"    pass {attempt}: no new info, stopping")
                    break

                if attempt < MAX_PASSES:
                    time.sleep(2)

            # Save after all passes for this city
            cache[city_key]["hoas"] = hoas
            cache[city_key]["enriched_at"] = time.strftime("%Y-%m-%dT%H:%M:%S")
            save_cache(cache)

            total_websites_added += city_ws
            total_emails_added += city_em
            total_phones_added += city_ph
            if city_ws or city_em or city_ph:
                enriched_cities += 1
            print(f"    +{city_ws} websites, +{city_em} emails, +{city_ph} phones")

            time.sleep(2)

        print(f"\n  Enrichment complete:")
        print(f"    Cities enriched: {enriched_cities}")
        print(f"    Websites added: {total_websites_added}")
        print(f"    Emails added: {total_emails_added}")
        print(f"    Phones added: {total_phones_added}")
    else:
        print("Step 2: Skipped (--skip-enrich)")

    # Step 2b: Remove HOAs with zero contact info from cache
    print("\n  Cleaning up HOAs with no contact info...")
    removed_total = 0
    for city_key in list(cache.keys()):
        hoas = cache[city_key].get("hoas", [])
        before = len(hoas)
        hoas = [h for h in hoas if hoa_has_contact(h)]
        removed = before - len(hoas)
        if removed:
            cache[city_key]["hoas"] = hoas
            removed_total += removed
    if removed_total:
        save_cache(cache)
    print(f"  Removed {removed_total} HOAs with no website/email/phone\n")

    # Export enrichment report
    report_path = os.path.join(SCRIPT_DIR, "hoa_enrichment_report.csv")
    export_enrichment_report(cache, report_path)

    if ENRICH_ONLY:
        print("\nEnrich-only mode — stopping before Strapi updates.")
        return

    # Step 3: Fetch pages and push updated HTML
    print("\nStep 3: Fetching all service pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  {len(all_pages)} total pages\n")

    # Group pages by city
    city_pages: dict[str, list[dict]] = {}
    city_info: dict[str, tuple[str, str]] = {}

    for p in all_pages:
        result = extract_city_state(p.get("title", ""))
        if not result:
            continue
        city_name, state_abbr = result
        ck = city_name.lower()
        city_pages.setdefault(ck, []).append(p)
        city_info[ck] = (city_name, state_abbr)

    # Step 4: Backup
    print("Step 4: Creating backup...")
    create_backup(all_pages)

    # Step 5: Build HTML and push
    print("Step 5: Building HTML and pushing to Strapi...\n")

    cities_to_push = sorted(cache.keys())
    if CITY_FILTER:
        cities_to_push = [c for c in cities_to_push if CITY_FILTER.lower() in c.lower()]
    if LIMIT:
        cities_to_push = cities_to_push[:LIMIT]

    pushed = 0
    failed = 0
    skipped_no_pages = 0

    for ci, city_key in enumerate(cities_to_push, 1):
        data = cache[city_key]
        hoas = data.get("hoas", [])
        pages = city_pages.get(city_key, [])

        if not pages:
            skipped_no_pages += 1
            continue

        city_name, state = city_info.get(city_key, (city_key, "MD"))

        if not hoas:
            html_content = build_minimal_html(city_name, state)
        else:
            html_content = build_hoa_html(city_name, state, hoas)

        print(f"  [{ci}/{len(cities_to_push)}] {city_name}, {state}: "
              f"{len(hoas)} HOAs, {len(pages)} pages")

        for page in pages:
            if DRY_RUN:
                pushed += 1
                continue

            try:
                strapi_put(
                    page["documentId"],
                    {"communityGuidelinesRichText": html_content},
                )
                pushed += 1
            except Exception as e:
                err_msg = str(e)[:200]
                print(f"    FAILED {page.get('title', '')}: {err_msg}")
                failed += 1
            time.sleep(0.1)

    # Summary
    print(f"\n{'=' * 60}")
    print("SUMMARY")
    print(f"{'=' * 60}")
    print(f"  Cities in cache:       {len(cache)}")
    print(f"  Cities pushed:         {len(cities_to_push) - skipped_no_pages}")
    print(f"  Pages {'previewed' if DRY_RUN else 'pushed'}:       {pushed}")
    if failed:
        print(f"  Failed:                {failed}")
    print(f"  Mode:                  {'DRY RUN' if DRY_RUN else 'LIVE'}")


if __name__ == "__main__":
    main()
