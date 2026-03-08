"""
Schema Research & Audit Pipeline

1. Research best practices via Perplexity AI (schema.org, Google guidelines)
2. Scrape core pages via Firecrawl to understand content
3. Analyze what schemas each page should have
4. Validate existing schemas against schema.org spec
5. Generate recommendations CSV

Usage:
  python schema_research.py                    # full run (all phases)
  python schema_research.py --research-only    # phase 1: best practices research
  python schema_research.py --scrape-only      # phase 2: scrape pages
  python schema_research.py --analyze-only     # phase 3-5: analyze + validate + recommend
  python schema_research.py --validate-only    # validate existing schemas only
"""
import json
import os
import sys
import time
import csv
import re
import concurrent.futures
from pathlib import Path
from urllib.parse import urlparse

from dotenv import load_dotenv

sys.stdout.reconfigure(encoding="utf-8")

REPO_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(REPO_ROOT / "migration" / ".env")

PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY", "")
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY", "")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

if not PERPLEXITY_API_KEY:
    print("ERROR: PERPLEXITY_API_KEY not set")
    sys.exit(1)

OUTPUT_DIR = REPO_ROOT / "docs" / "schemas" / "research"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SCRAPED_DIR = OUTPUT_DIR / "scraped"
SCRAPED_DIR.mkdir(parents=True, exist_ok=True)

# CLI flags
RESEARCH_ONLY = "--research-only" in sys.argv
SCRAPE_ONLY = "--scrape-only" in sys.argv
ANALYZE_ONLY = "--analyze-only" in sys.argv
VALIDATE_ONLY = "--validate-only" in sys.argv

# ── Core pages to analyze ─────────────────────────────────────────────
CORE_PAGES = {
    "home": "/",
    "about": "/about",
    "team": "/team",
    "testimonials": "/testimonials",
    "gallery": "/gallery",
    "contact": "/contact",
    "quote": "/quote",
    "financing": "/financing",
    "warranty": "/warranty",
    "blog": "/blog",
    "video_gallery": "/video-gallery",
    "roofing": "/roofing",
    "roofing_asphalt": "/roofing/asphalt-roofing",
    "roofing_metal": "/roofing/metal-roofing",
    "roofing_flat": "/roofing/flat-roofing",
    "roofing_commercial": "/roofing/commercial-roofing",
    "siding": "/siding",
    "siding_james_hardie": "/siding/james-hardie",
    "siding_vinyl": "/siding/vinyl",
    "windows": "/windows",
    "doors": "/doors",
    "gutters": "/gutters",
    "exterior_trim": "/exterior-trim",
    "decks": "/decks-and-patios",
    "decks_rooftop": "/deck-and-patios/rooftop-deck",
    "decks_ipe": "/deck-and-patios/ipe-deck-builder",
    "decks_flagstone": "/deck-and-patios/flagstone-patios",
    "roofing_calculator": "/roofing-cost-calculator",
    "commercial_calculator": "/commercial-roof-cost-calculator",
    "service_areas": "/service-areas",
    "location_bowie": "/locations/bowie",
    "location_gaithersburg": "/locations/gaithersburg",
    "location_dc": "/locations/washington-dc",
}

SAMPLE_SERVICE_PAGES = [
    "/services/annapolis-maryland-roofing-company-near-you",
    "/services/annapolis-maryland-siding-contractors-near-you",
    "/services/annapolis-maryland-gutter-guards-gutters-near-you",
]

BASE_URL = "https://www.improveitmd.com"


# ── API Helpers ────────────────────────────────────────────────────────
def perplexity_query(prompt, model="sonar-pro"):
    """Query Perplexity AI for research."""
    import urllib.request

    url = "https://api.perplexity.ai/chat/completions"
    payload = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.1,
    }).encode()

    req = urllib.request.Request(url, data=payload, method="POST")
    req.add_header("Authorization", f"Bearer {PERPLEXITY_API_KEY}")
    req.add_header("Content-Type", "application/json")

    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read())
    return result["choices"][0]["message"]["content"]


def claude_query(prompt, system="You are a schema.org expert and SEO specialist."):
    """Query Claude for analysis."""
    import urllib.request

    url = "https://api.anthropic.com/v1/messages"
    payload = json.dumps({
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 4096,
        "system": system,
        "messages": [{"role": "user", "content": prompt}],
    }).encode()

    req = urllib.request.Request(url, data=payload, method="POST")
    req.add_header("x-api-key", ANTHROPIC_API_KEY)
    req.add_header("Content-Type", "application/json")
    req.add_header("anthropic-version", "2023-06-01")

    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read())
    return result["content"][0]["text"]


def firecrawl_scrape(url):
    """Scrape a single page via Firecrawl."""
    import urllib.request

    api_url = "https://api.firecrawl.dev/v1/scrape"
    payload = json.dumps({
        "url": url,
        "formats": ["markdown", "rawHtml"],
        "onlyMainContent": False,
        "includeTags": ["script[type='application/ld+json']", "title", "meta"],
    }).encode()

    req = urllib.request.Request(api_url, data=payload, method="POST")
    req.add_header("Authorization", f"Bearer {FIRECRAWL_API_KEY}")
    req.add_header("Content-Type", "application/json")

    with urllib.request.urlopen(req, timeout=60) as resp:
        result = json.loads(resp.read())
    return result.get("data", {})


# ── Phase 1: Research Best Practices ──────────────────────────────────
def research_best_practices():
    """Use Perplexity to research schema.org best practices."""
    print("\n" + "=" * 70)
    print("PHASE 1: Researching Schema Best Practices via Perplexity")
    print("=" * 70)

    queries = {
        "general_best_practices": """
What are the current best practices for implementing schema.org structured data (JSON-LD) on business websites in 2025-2026?
Focus on:
1. Which schema types does Google actively use for rich results?
2. How many JSON-LD blocks can/should be on a single page?
3. Should schemas be in the <head> or <body>?
4. What are the most impactful schema types for local service businesses?
5. Common mistakes to avoid
6. How does @graph vs separate script tags affect crawling?
Provide specific actionable guidance.
""",

        "home_contractor_schemas": """
What schema.org structured data should a home contractor/remodeling company website have on its HOMEPAGE?
The company does roofing, siding, windows, doors, gutters, exterior trim, and decks.
They have 3 office locations (Bowie MD, Gaithersburg MD, Washington DC).
They have 445+ five-star reviews across Google.
What @types should be used? How should they be structured?
Include specific JSON-LD examples for a HomeAndConstructionBusiness.
""",

        "service_page_schemas": """
What schema.org structured data should individual SERVICE PAGES have for a roofing/siding/windows contractor?
For example: a page about "Asphalt Shingle Roofing" or "James Hardie Siding Installation"
What @types work best? Should we use Service, Product, or both?
How should we connect service pages to the parent organization?
Should each service page have its own AggregateRating?
Include examples of hasOfferCatalog, brand, and provider properties.
""",

        "local_seo_schemas": """
What schema.org structured data is best for LOCAL SEO service pages?
Context: A contractor has 385 city-specific pages like "Roofing Company Near You in Annapolis MD"
Each page targets a specific city + service combination.
What schemas maximize local search visibility?
How should serviceArea, areaServed, and geo properties be used?
Should each local page have a LocalBusiness schema or reference the parent?
How do FAQPage schemas help local pages?
What about Review and AggregateRating on local pages?
""",

        "location_page_schemas": """
What schema.org structured data should LOCATION/BRANCH PAGES have?
Context: A contractor with 3 physical offices (Bowie MD, Gaithersburg MD, Washington DC)
Each location has its own phone, address, team member, and reviews.
Should they use LocalBusiness, RoofingContractor, or HomeAndConstructionBusiness?
How to properly use parentOrganization and subOrganization?
What about department vs subOrganization?
How should OpeningHoursSpecification be structured?
""",

        "content_page_schemas": """
What schema.org structured data should these types of pages have for a contractor website?
1. About page - company history, founding story
2. Team page - employees with roles
3. Testimonials page - customer reviews (445+ five-star reviews)
4. Gallery page - project photos
5. Blog page - articles about home improvement
6. Video gallery - YouTube videos of projects
7. Contact page - phone, email, form
8. Financing page - payment options ($99/mo)
9. Warranty page - warranty information
10. Cost calculator pages - interactive tools

For each, specify the ideal @type and key properties.
""",

        "validation_and_testing": """
How to validate and test schema.org structured data in 2025-2026?
1. What tools should be used? (Google Rich Results Test, Schema Markup Validator, etc.)
2. What are the most common validation errors?
3. How to test if schemas are actually generating rich results?
4. What Google Search Console reports show schema status?
5. How long does it typically take for Google to recognize new schemas?
6. Are there any schema types Google has deprecated recently?
7. What's the difference between schema.org validation and Google's validation?
""",
    }

    results = {}
    for key, query in queries.items():
        print(f"\n  Researching: {key}...")
        try:
            result = perplexity_query(query)
            results[key] = result
            print(f"    ✓ Got {len(result)} chars")

            # Save individual result
            (OUTPUT_DIR / f"research_{key}.md").write_text(
                f"# {key.replace('_', ' ').title()}\n\n{result}",
                encoding="utf-8"
            )
            time.sleep(1)  # rate limit
        except Exception as e:
            print(f"    ✗ Error: {e}")
            results[key] = f"ERROR: {e}"

    # Save combined research
    combined = "# Schema.org Research Report\n\n"
    combined += f"Generated: {time.strftime('%Y-%m-%d %H:%M')}\n\n"
    for key, content in results.items():
        combined += f"---\n\n## {key.replace('_', ' ').title()}\n\n{content}\n\n"

    (OUTPUT_DIR / "research_combined.md").write_text(combined, encoding="utf-8")
    print(f"\n  ✓ Research saved to {OUTPUT_DIR}/research_combined.md")
    return results


# ── Phase 2: Scrape Pages ─────────────────────────────────────────────
def scrape_pages():
    """Scrape core pages via Firecrawl to understand content."""
    print("\n" + "=" * 70)
    print("PHASE 2: Scraping Core Pages via Firecrawl")
    print("=" * 70)

    if not FIRECRAWL_API_KEY:
        print("  ✗ FIRECRAWL_API_KEY not set, skipping scrape")
        return {}

    all_pages = {**CORE_PAGES}
    for i, path in enumerate(SAMPLE_SERVICE_PAGES):
        all_pages[f"service_sample_{i+1}"] = path

    scraped = {}
    for key, path in all_pages.items():
        url = f"{BASE_URL}{path}"
        slug = key
        cache_path = SCRAPED_DIR / f"{slug}.json"

        # Skip if already scraped
        if cache_path.exists():
            print(f"  [cached] {slug}")
            scraped[key] = json.loads(cache_path.read_text(encoding="utf-8"))
            continue

        print(f"  Scraping: {url}...")
        try:
            data = firecrawl_scrape(url)
            scraped[key] = {
                "url": url,
                "title": data.get("metadata", {}).get("title", ""),
                "description": data.get("metadata", {}).get("description", ""),
                "markdown": data.get("markdown", "")[:3000],  # first 3000 chars
                "raw_html_snippet": extract_schemas_from_html(data.get("rawHtml", "")),
            }
            cache_path.write_text(json.dumps(scraped[key], indent=2), encoding="utf-8")
            print(f"    ✓ {scraped[key]['title'][:60]}")
            time.sleep(0.5)
        except Exception as e:
            print(f"    ✗ Error: {e}")
            scraped[key] = {"url": url, "error": str(e)}

    print(f"\n  ✓ Scraped {len(scraped)} pages")
    return scraped


def extract_schemas_from_html(html):
    """Extract JSON-LD blocks from raw HTML."""
    if not html:
        return []
    pattern = r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>'
    matches = re.findall(pattern, html, re.DOTALL | re.IGNORECASE)
    schemas = []
    for match in matches:
        try:
            parsed = json.loads(match.strip())
            schemas.append(parsed)
        except json.JSONDecodeError:
            schemas.append({"_raw": match.strip()[:500]})
    return schemas


# ── Phase 3: Analyze & Recommend ──────────────────────────────────────
def analyze_and_recommend(research=None, scraped=None):
    """Use Claude to analyze pages and recommend optimal schemas."""
    print("\n" + "=" * 70)
    print("PHASE 3: Analyzing Pages & Generating Recommendations")
    print("=" * 70)

    if not ANTHROPIC_API_KEY:
        print("  ✗ ANTHROPIC_API_KEY not set, skipping analysis")
        return

    # Load research if not passed
    if not research:
        combined_path = OUTPUT_DIR / "research_combined.md"
        if combined_path.exists():
            research_text = combined_path.read_text(encoding="utf-8")[:8000]
        else:
            research_text = "No research available."
    else:
        research_text = "\n".join(f"## {k}\n{v[:1500]}" for k, v in research.items())[:8000]

    # Load scraped data if not passed
    if not scraped:
        scraped = {}
        for f in SCRAPED_DIR.glob("*.json"):
            scraped[f.stem] = json.loads(f.read_text(encoding="utf-8"))

    # Load existing schemas
    schema_dir = REPO_ROOT / "docs" / "schemas" / "core"
    existing_schemas = {}
    for f in schema_dir.glob("*.json"):
        existing_schemas[f.stem] = json.loads(f.read_text(encoding="utf-8"))

    # Build page summaries for Claude
    page_summaries = []
    for key, data in scraped.items():
        if "error" in data:
            continue
        existing = existing_schemas.get(key, {})
        existing_types = []
        if "@graph" in existing:
            for item in existing["@graph"]:
                t = item.get("@type", "unknown")
                existing_types.append(t if isinstance(t, str) else ", ".join(t))

        live_schemas = data.get("raw_html_snippet", [])
        live_types = []
        for s in live_schemas:
            if isinstance(s, dict) and "@type" in s:
                t = s["@type"]
                live_types.append(t if isinstance(t, str) else ", ".join(t))

        page_summaries.append(
            f"- **{key}** ({data.get('url', '')})\n"
            f"  Title: {data.get('title', 'N/A')[:80]}\n"
            f"  Description: {data.get('description', 'N/A')[:120]}\n"
            f"  Live schemas: {', '.join(live_types) or 'Product only (old global)'}\n"
            f"  Prepared schemas: {', '.join(existing_types) or 'NONE'}\n"
        )

    prompt = f"""You are a schema.org expert reviewing a home contractor website (improveitmd.com).

## Research on Best Practices
{research_text[:4000]}

## Current Pages & Schemas
{chr(10).join(page_summaries)}

## Business Context
- Capitol Improvements: roofing, siding, windows, doors, gutters, exterior trim, decks
- 3 locations: Bowie MD (HQ), Gaithersburg MD, Washington DC
- 445+ five-star Google reviews
- GAF Master Elite, James Hardie Preferred, TimberTech Platinum certified
- 385 local service pages (city-specific) already have Service schemas in Strapi CMS
- Founded 2010, family-owned

## Task
For each page, provide:
1. What schemas it SHOULD have (based on best practices research)
2. Review the prepared schema — is the @type correct? Are key properties missing?
3. What additional schema types would improve SEO (e.g. BreadcrumbList, FAQPage, Review)?
4. Priority rating (High/Medium/Low) for impact on search visibility
5. Any issues or improvements needed

Format as a structured analysis. Be specific about missing properties and provide brief JSON snippets for anything important that's missing.

Also flag any overall issues with our schema strategy.
"""

    print("  Sending to Claude for analysis...")
    try:
        analysis = claude_query(prompt)
        (OUTPUT_DIR / "schema_analysis.md").write_text(
            f"# Schema Analysis & Recommendations\n\n"
            f"Generated: {time.strftime('%Y-%m-%d %H:%M')}\n\n{analysis}",
            encoding="utf-8"
        )
        print(f"  ✓ Analysis saved ({len(analysis)} chars)")
    except Exception as e:
        print(f"  ✗ Error: {e}")
        analysis = ""

    return analysis


# ── Phase 4: Validate Schemas ─────────────────────────────────────────
def validate_schemas():
    """Validate all schema files against schema.org spec using Claude."""
    print("\n" + "=" * 70)
    print("PHASE 4: Validating Schemas")
    print("=" * 70)

    schema_dir = REPO_ROOT / "docs" / "schemas" / "core"
    issues = []

    schemas_text = ""
    for f in sorted(schema_dir.glob("*.json")):
        content = f.read_text(encoding="utf-8")
        schemas_text += f"\n### {f.name}\n```json\n{content}\n```\n"

    prompt = f"""Validate these JSON-LD schemas against schema.org specification.

For each schema file, check:
1. Is the @type valid and appropriate for the page?
2. Are all properties valid for that @type? (flag any non-existent properties)
3. Are required/recommended properties missing?
4. Is the @id pattern correct and consistent?
5. Are URLs properly formatted?
6. Is the @graph structure correct?
7. Would Google's Rich Results Test accept this?
8. Any deprecated types or properties?

{schemas_text}

Return a table with columns: File, Status (✓/⚠/✗), Issues Found, Fixes Needed
Then a detailed section for any files with issues.
"""

    print("  Validating with Claude...")
    try:
        result = claude_query(prompt)
        (OUTPUT_DIR / "schema_validation.md").write_text(
            f"# Schema Validation Report\n\n"
            f"Generated: {time.strftime('%Y-%m-%d %H:%M')}\n\n{result}",
            encoding="utf-8"
        )
        print(f"  ✓ Validation saved ({len(result)} chars)")
        return result
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return ""


# ── Phase 5: Generate Final CSV ───────────────────────────────────────
def generate_recommendations_csv(analysis=""):
    """Generate a recommendations CSV from analysis."""
    print("\n" + "=" * 70)
    print("PHASE 5: Generating Recommendations CSV")
    print("=" * 70)

    schema_dir = REPO_ROOT / "docs" / "schemas" / "core"
    csv_path = OUTPUT_DIR / "schema_recommendations.csv"

    rows = []
    for key, path in CORE_PAGES.items():
        schema_file = schema_dir / f"{key}.json"
        has_prepared = schema_file.exists()
        prepared_types = ""

        if has_prepared:
            data = json.loads(schema_file.read_text(encoding="utf-8"))
            types = []
            for item in data.get("@graph", []):
                t = item.get("@type", "")
                types.append(t if isinstance(t, str) else "+".join(t))
            prepared_types = ", ".join(types)

        rows.append({
            "Page": key,
            "URL": f"{BASE_URL}{path}",
            "Schema File": f"{key}.json" if has_prepared else "MISSING",
            "Prepared @types": prepared_types,
            "Live Status": "Not deployed",
            "Priority": "High" if key in [
                "home", "roofing", "siding", "windows", "doors", "gutters",
                "contact", "testimonials", "location_bowie", "location_gaithersburg", "location_dc"
            ] else "Medium",
            "Additional Recommended": "BreadcrumbList" if path.count("/") > 1 else "",
        })

    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    print(f"  ✓ CSV saved to {csv_path} ({len(rows)} pages)")


# ── Main ──────────────────────────────────────────────────────────────
def main():
    print("=" * 70)
    print("  Schema Research & Audit Pipeline")
    print("  improveitmd.com")
    print("=" * 70)

    research = None
    scraped = None

    if VALIDATE_ONLY:
        validate_schemas()
        return

    if not ANALYZE_ONLY:
        if not SCRAPE_ONLY:
            research = research_best_practices()

        if not RESEARCH_ONLY:
            scraped = scrape_pages()

    if RESEARCH_ONLY or SCRAPE_ONLY:
        return

    # Phase 3-5
    analysis = analyze_and_recommend(research, scraped)
    validate_schemas()
    generate_recommendations_csv(analysis)

    print("\n" + "=" * 70)
    print("  COMPLETE — Output files:")
    print("=" * 70)
    for f in sorted(OUTPUT_DIR.glob("*")):
        if f.is_file():
            size = f.stat().st_size
            print(f"  {f.name:40s} {size:>8,} bytes")
    print()


if __name__ == "__main__":
    main()
