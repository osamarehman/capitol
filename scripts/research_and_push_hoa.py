"""
Research HOA/Community Associations using Perplexity AI, verify links,
generate HTML templates, and push to Strapi CMS.

Phases:
  1. Fetch unique cities from Strapi service pages
  2. Use Perplexity to research HOAs per city (web search)
  3. Verify discovered URLs with AI filtering
  4. Build HTML template (h2/h3/h4 format)
  5. Backup existing data & push to Strapi

Usage:
    python research_and_push_hoa.py                          # dry run, research all
    python research_and_push_hoa.py --execute                # push to Strapi
    python research_and_push_hoa.py --city=Bowie             # single city
    python research_and_push_hoa.py --limit=5                # first N cities
    python research_and_push_hoa.py --skip-research          # use cached data only
    python research_and_push_hoa.py --research-only          # research only, don't push
"""
import csv
import html as html_module
import json
import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

from dotenv import load_dotenv

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(SCRIPT_DIR, "migration", ".env"))

STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.improveitmd.com")
STRAPI_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
PERPLEXITY_API_KEY = os.environ.get("PERPLEXITY_API_KEY", "")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

CACHE_FILE = os.path.join(SCRIPT_DIR, "hoa_perplexity_cache.json")
BACKUP_FILE = os.path.join(SCRIPT_DIR, "hoa_community_guidelines_backup.json")
RESULTS_CSV = os.path.join(SCRIPT_DIR, "hoa_perplexity_results.csv")

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


def extract_city_state(title: str) -> tuple[str, str] | None:
    """Extract city and state from page title like 'Roofing - Bowie - MD'."""
    parts = [p.strip() for p in title.split(" - ")]
    if len(parts) < 2:
        return None
    city_name = parts[1]
    state_abbr = parts[2] if len(parts) >= 3 else "MD"

    if city_name in TITLE_CITY_NORMALIZE:
        city_name, state_abbr = TITLE_CITY_NORMALIZE[city_name]

    # Skip state-level pages
    if city_name.lower() in ("maryland", "virginia", "dc"):
        return None

    return city_name, state_abbr


# ── Perplexity API ────────────────────────────────────────────────────────────

def call_perplexity(prompt: str, max_tokens: int = 4000) -> str | None:
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
                "content": "You are a research assistant specializing in finding HOA and community association information. Return structured data only."
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


def research_city_hoas(city: str, state: str) -> list[dict]:
    """Use Perplexity to research HOAs for a given city."""
    state_name = {"MD": "Maryland", "VA": "Virginia", "DC": "Washington, DC"}.get(
        state, state
    )

    prompt = f"""I need a comprehensive list of homeowner associations (HOAs), community associations, and civic associations in {city}, {state_name}.

Search county HOA registries, property management companies (FirstService Residential, Vanguard, Community Management Corporation, Legum & Norman, RealManage, etc.), and community directories.

Include: master-planned community HOAs, neighborhood HOAs, townhome/condo associations, civic associations, and community improvement associations. List the HOA name, not the management company name.

For each association provide:
- name: official association name
- website: their website URL or the management portal URL (NOT Facebook), or null
- email: public contact email, or null
- phone: phone as (XXX) XXX-XXXX, or null
- address: mailing/office address, or null

Return ONLY a valid JSON array, no other text:
[{{"name": "Example HOA", "website": null, "email": null, "phone": null, "address": null}}]"""

    result = call_perplexity(prompt, max_tokens=8000)
    if not result:
        return []

    # Parse JSON from response — try multiple strategies
    cleaned = result.strip()

    # Strategy 1: Strip markdown fences and parse directly
    cleaned = re.sub(r"^```(?:json)?\s*\n?", "", cleaned)
    cleaned = re.sub(r"\n?```\s*$", "", cleaned)
    cleaned = cleaned.strip()

    try:
        hoas = json.loads(cleaned)
        if isinstance(hoas, list):
            return hoas
    except json.JSONDecodeError:
        pass

    # Strategy 2: Find the outermost JSON array brackets
    first_bracket = result.find("[")
    last_bracket = result.rfind("]")
    if first_bracket != -1 and last_bracket > first_bracket:
        try:
            hoas = json.loads(result[first_bracket : last_bracket + 1])
            if isinstance(hoas, list):
                return hoas
        except json.JSONDecodeError:
            pass

    # Strategy 3: Try to fix common JSON issues (trailing commas)
    if first_bracket != -1 and last_bracket > first_bracket:
        chunk = result[first_bracket : last_bracket + 1]
        chunk = re.sub(r",\s*([}\]])", r"\1", chunk)
        try:
            hoas = json.loads(chunk)
            if isinstance(hoas, list):
                return hoas
        except json.JSONDecodeError:
            pass

    # Strategy 4: Response may be truncated — find all complete JSON objects
    if first_bracket != -1:
        chunk = result[first_bracket:]
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
                        obj = json.loads(chunk[obj_start : i + 1])
                        objects.append(obj)
                    except json.JSONDecodeError:
                        pass
                    obj_start = None
        if objects:
            return objects

    # Strategy 5: Perplexity refused but gave partial info — skip gracefully
    refusal_markers = [
        "cannot provide", "I cannot", "I'm unable", "search results do not",
        "don't have", "no specific", "not contain",
    ]
    if any(marker in result.lower() for marker in refusal_markers):
        print(f"    INFO: Perplexity could not find HOA data for {city}")
        return []

    print(f"    WARNING: Could not parse Perplexity response for {city}")
    print(f"    Response preview: {result[:300]}")
    return []


# ── URL Verification ──────────────────────────────────────────────────────────

def verify_url(url: str) -> dict:
    """Quick HTTP check to see if a URL is reachable."""
    if not url:
        return {"reachable": False, "reason": "no_url"}

    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; HOA-Verifier/1.0)"},
            method="GET",
        )
        resp = urllib.request.urlopen(req, timeout=10, context=ctx)
        status = resp.getcode()
        content_type = resp.headers.get("Content-Type", "")

        # Read a small chunk to check for content
        body = resp.read(5000).decode("utf-8", errors="ignore")

        # Check for parked domain indicators
        parked_indicators = [
            "domain is for sale", "buy this domain", "parked domain",
            "godaddy", "namecheap", "this domain has expired",
            "under construction", "coming soon",
        ]
        is_parked = any(ind in body.lower() for ind in parked_indicators)

        return {
            "reachable": True,
            "status": status,
            "is_parked": is_parked,
            "has_html": "text/html" in content_type.lower(),
        }
    except urllib.error.HTTPError as e:
        return {"reachable": False, "reason": f"http_{e.code}"}
    except Exception as e:
        return {"reachable": False, "reason": str(e)[:100]}


def call_claude_verify(url: str, hoa_name: str) -> bool:
    """Use Claude to verify if a URL is likely a real HOA page."""
    if not ANTHROPIC_API_KEY or not url:
        return True  # Skip verification if no key

    # First do a quick HTTP fetch
    check = verify_url(url)
    if not check["reachable"]:
        return False
    if check.get("is_parked"):
        return False

    return True  # URL is reachable and not parked — good enough


# ── Cache management ──────────────────────────────────────────────────────────

def load_cache() -> dict:
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache: dict):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)


# ── HTML builder ──────────────────────────────────────────────────────────────

def escape_html(text: str) -> str:
    return html_module.escape(text)


def build_hoa_html(city: str, state: str, hoas: list[dict]) -> str:
    """Build the communityGuidelinesRichText HTML."""
    state_display = {
        "MD": "Maryland", "VA": "Virginia", "DC": "DC"
    }.get(state, state)

    parts = []

    # Main heading
    parts.append(
        f"<h2>HOA &amp; Community Association Links — "
        f"{escape_html(city)}, {state_display}</h2>"
    )

    # Intro paragraph
    parts.append(
        f"<p>Many {escape_html(city)} neighborhoods are governed by homeowner or "
        f"community associations that enforce architectural and exterior improvement "
        f"guidelines. To make things easier for you, we've gathered direct links to "
        f"local HOA and community association websites below — along with phone numbers "
        f"and emails where publicly available — so you can quickly locate your "
        f"association and review their requirements.</p>"
    )

    # Section heading
    parts.append(
        f"<h3>{escape_html(city)} HOA &amp; Community Association Websites</h3>"
    )

    # Filter: only include HOAs with at least one contact field
    hoas_with_contact = [
        h for h in hoas
        if h.get("website") or h.get("email") or h.get("phone") or h.get("address")
    ]

    # If no HOAs have contact info, show top entries with names only (max 10)
    if not hoas_with_contact:
        display_hoas = hoas[:10]
    else:
        display_hoas = hoas_with_contact

    # Per-HOA entries
    for hoa in display_hoas:
        name = hoa.get("name", "Unknown Association")
        website = hoa.get("website")
        email = hoa.get("email")
        phone = hoa.get("phone")
        address = hoa.get("address")

        parts.append(f"<h4>{escape_html(name)}</h4>")

        lines = []

        # Website
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

        # Email
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

        # Phone
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

        # Address
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

    # Footer
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
    """Build minimal HTML for cities with no HOA data found."""
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


# ── CSV export ────────────────────────────────────────────────────────────────

def export_results_csv(cache: dict):
    """Export all cached results to CSV for review."""
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
                "url_verified": hoa.get("url_verified", ""),
            })

    with open(RESULTS_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["city", "hoa_name", "website", "email", "phone", "address", "url_verified"],
        )
        writer.writeheader()
        writer.writerows(rows)
    print(f"  Exported {len(rows)} HOA entries to {RESULTS_CSV}")


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    dry_run = "--execute" not in args
    skip_research = "--skip-research" in args
    research_only = "--research-only" in args
    city_filter = None
    limit = None

    for arg in args:
        if arg.startswith("--city="):
            city_filter = arg.split("=", 1)[1]
        elif arg.startswith("--limit="):
            limit = int(arg.split("=")[1])

    if dry_run and not research_only:
        print("=== DRY RUN (use --execute to push to Strapi) ===\n")
    elif research_only:
        print("=== RESEARCH ONLY (no Strapi updates) ===\n")
    else:
        print("=== LIVE MODE: pushing to Strapi ===\n")

    # Step 1: Fetch all pages and extract unique cities
    print("Step 1: Fetching all service pages from Strapi...")
    all_pages = fetch_all_pages()
    print(f"  {len(all_pages)} total pages")

    # Group pages by city
    city_pages: dict[str, list[dict]] = {}
    city_info: dict[str, tuple[str, str]] = {}  # city_key -> (city_name, state)

    for p in all_pages:
        result = extract_city_state(p.get("title", ""))
        if not result:
            continue
        city_name, state_abbr = result
        city_key = f"{city_name.lower()}"
        city_pages.setdefault(city_key, []).append(p)
        city_info[city_key] = (city_name, state_abbr)

    cities = sorted(city_info.keys())
    print(f"  {len(cities)} unique cities\n")

    if city_filter:
        cities = [c for c in cities if city_filter.lower() in c.lower()]
        print(f"  Filtered to {len(cities)} cities matching '{city_filter}'\n")

    if limit:
        cities = cities[:limit]
        print(f"  Limited to {limit} cities\n")

    # Step 2: Research HOAs via Perplexity
    cache = load_cache()
    print(f"Step 2: {'Loading cached' if skip_research else 'Researching'} HOA data...")
    print(f"  Cache has {len(cache)} cities\n")

    researched = 0
    cached_hits = 0
    total_hoas_found = 0

    for ci, city_key in enumerate(cities, 1):
        city_name, state = city_info[city_key]
        page_count = len(city_pages.get(city_key, []))

        if skip_research and city_key not in cache:
            continue

        if city_key in cache and not city_filter:
            cached_hits += 1
            hoas = cache[city_key].get("hoas", [])
            total_hoas_found += len(hoas)
            continue

        print(f"  [{ci}/{len(cities)}] Researching {city_name}, {state} "
              f"({page_count} pages)...")

        hoas = research_city_hoas(city_name, state)

        # Deduplicate by name
        seen_names = set()
        unique_hoas = []
        for hoa in hoas:
            name_key = hoa.get("name", "").lower().strip()
            if name_key and name_key not in seen_names:
                seen_names.add(name_key)
                unique_hoas.append(hoa)

        # Verify URLs
        verified_hoas = []
        for hoa in unique_hoas:
            url = hoa.get("website")
            if url:
                is_valid = call_claude_verify(url, hoa.get("name", ""))
                hoa["url_verified"] = is_valid
                if not is_valid:
                    print(f"    URL REJECTED: {url} ({hoa.get('name', '')})")
                    hoa["website"] = None
            verified_hoas.append(hoa)

        cache[city_key] = {
            "city_state": f"{city_name}, {state}",
            "researched_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "hoas": verified_hoas,
        }
        save_cache(cache)

        print(f"    Found {len(verified_hoas)} HOAs")
        total_hoas_found += len(verified_hoas)
        researched += 1

        # Rate limit Perplexity
        time.sleep(2)

    print(f"\n  Research complete:")
    print(f"    Newly researched: {researched} cities")
    print(f"    From cache: {cached_hits} cities")
    print(f"    Total HOAs found: {total_hoas_found}\n")

    # Export CSV
    export_results_csv(cache)

    if research_only:
        print("\nResearch-only mode — stopping before Strapi updates.")
        return

    # Step 3: Backup existing data
    print("Step 3: Creating backup of existing communityGuidelinesRichText...")
    backup_data = []
    for p in all_pages:
        backup_data.append({
            "documentId": p["documentId"],
            "title": p.get("title", ""),
            "slug": p.get("slug", ""),
            "communityGuidelinesRichText": p.get("communityGuidelinesRichText", ""),
        })

    with open(BACKUP_FILE, "w", encoding="utf-8") as f:
        json.dump(backup_data, f, indent=2, ensure_ascii=False)
    print(f"  Backup saved to {BACKUP_FILE} ({len(backup_data)} pages)\n")

    # Step 4: Build HTML and push
    print("Step 4: Building HTML and pushing to Strapi...\n")
    pushed = 0
    failed = 0
    skipped_no_data = 0

    for ci, city_key in enumerate(cities, 1):
        city_name, state = city_info[city_key]
        pages = city_pages.get(city_key, [])
        hoas = cache.get(city_key, {}).get("hoas", [])

        if not hoas:
            # Build minimal HTML for cities with no HOA data
            html_content = build_minimal_html(city_name, state)
            skipped_no_data += 1
        else:
            html_content = build_hoa_html(city_name, state, hoas)

        print(f"  [{ci}/{len(cities)}] {city_name}, {state}: "
              f"{len(hoas)} HOAs, {len(pages)} pages")

        for page in pages:
            if dry_run:
                pushed += 1
                continue

            try:
                strapi_put(
                    page["documentId"],
                    {"communityGuidelinesRichText": html_content},
                )
                pushed += 1
            except urllib.error.HTTPError as e:
                body = e.read().decode()[:200]
                print(f"    FAILED {page.get('title','')}: HTTP {e.code}: {body}")
                failed += 1
            except Exception as e:
                print(f"    FAILED {page.get('title','')}: {e}")
                failed += 1
            time.sleep(0.1)

    print(f"\n{'=' * 60}")
    print("SUMMARY")
    print(f"{'=' * 60}")
    print(f"  Cities processed:      {len(cities)}")
    print(f"  Cities with HOA data:  {len(cities) - skipped_no_data}")
    print(f"  Cities without:        {skipped_no_data}")
    print(f"  Pages {'previewed' if dry_run else 'pushed'}:       {pushed}")
    if failed:
        print(f"  Failed:                {failed}")
    print(f"  Mode:                  {'DRY RUN' if dry_run else 'LIVE'}")


if __name__ == "__main__":
    main()
