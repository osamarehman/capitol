# General Best Practices

Google actively uses schema types like **Organization**, **LocalBusiness**, **Article**, **Product**, **FAQPage**, **BreadcrumbList**, and **Review** for rich results in search, with LocalBusiness particularly emphasized for business visibility.[1][3][5]

### 1. Schema Types Google Actively Uses for Rich Results
Google prioritizes types eligible for rich snippets, knowledge panels, and carousels:
- **Core types**: Organization (site-wide branding), Article (content pages), BreadcrumbList (navigation).[3]
- **Business/content**: LocalBusiness, Product, FAQPage, Review (for stars/ratings).[1][5]
- Actionable: Start with Organization on homepage, then page-specific types like LocalBusiness for contact pages. Validate eligibility via Google's Rich Results Test.[1][3]

### 2. Number of JSON-LD Blocks per Page
No strict limit exists, but use **1-5 blocks** maximum to avoid performance issues; consolidate into a single `@graph` array for multiple entities (e.g., Organization + LocalBusiness + BreadcrumbList).[2][5]
- Exceed 5 risks parsing overhead and page speed penalties on mobile.[5]
- Actionable: Prioritize 2-3 high-impact types per page; nest related entities inline rather than separate scripts.[2]

### 3. Placement: <head> or <body>?
Place JSON-LD in the **<head>** for fastest crawler processing, though it works in <body>; Google processes both.[3]
- Actionable: Use `<head>` on static sites; for frameworks like Next.js, employ Script components for automatic <head> insertion. Avoid blocking render paths.[3][5]

### 4. Most Impactful Schema Types for Local Service Businesses
**LocalBusiness** tops the list for maps, hours, and reviews; pair with Organization (branding), FAQPage (services), and Review (ratings).[1][3][5]
- Enhances local pack visibility and knowledge graph connections.
- Actionable: Include `address`, `geoCoordinates`, `telephone`, `openingHours`; link to sameAs (social profiles, Google Business Profile) for entity authority.[1][5]

### 5. Common Mistakes to Avoid
- Inaccurate/outdated data (e.g., wrong hours) risks penalties.[1]
- Overly complex/heavy schemas slowing page speed; lazy-load non-core ones.[5]
- No validation: Always test with Google Rich Results Test and Schema Markup Validator pre/post-deployment.[1][3]
- Skipping monitoring: Check Google Search Console's Structured Data report weekly for errors/impressions.[1][3]
- Actionable: Use native JSON types (numbers/booleans), descriptive properties, and progressive rollout (Organization first).[2][5]

### 6. @graph vs. Separate Script Tags: Crawling Impact
**@graph** (single script with array of nodes) is more efficient for crawling than multiple `<script type="application/ld+json">` tags, reducing HTML bloat and parse time.[2]
- Separate tags work but fragment data; crawlers handle both equally well if valid.
- Actionable: Use `@graph` for 2+ entities:
  ```
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {"@type": "Organization", ...},
      {"@type": "LocalBusiness", ...}
    ]
  }
  </script>
  ```
  Nest inline for related entities; cache contexts if remote.[2][5]

**Overall Actionable Steps**:
1. Generate/validate via tools like Google's tester.[1][3]
2. Implement progressively: Organization > LocalBusiness > content types.[3][5]
3. Monitor Search Console; update dynamically for changes (e.g., hours).[1][5]
4. Prioritize accuracy over volume for 2025-2026 SEO gains.[1][3][5]