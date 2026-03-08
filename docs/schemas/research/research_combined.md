# Schema.org Research Report

Generated: 2026-03-08 21:48

---

## General Best Practices

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

---

## Home Contractor Schemas

**A home contractor/remodeling company homepage should use `HomeAndConstructionBusiness` as the primary @type (a subtype of LocalBusiness), with nested `Service` types for specific offerings like roofing and siding, and separate `LocalBusiness` schemas for each of the 3 office locations.** This structure enhances local SEO, rich snippets, and knowledge graph connections by describing the business, services, locations, and reviews.[1][6][2][3]

### Recommended @types and Structure
- **Primary: `HomeAndConstructionBusiness`** – Describes the overall business providing home services.[1][6][7]
- **Nested: `Service`** – For each offering (e.g., roofing, siding), linked via `hasOfferCatalog` or `makesOffer`.[2]
- **Multiple `LocalBusiness`** – One per office location (Bowie MD, Gaithersburg MD, Washington DC), linked to the main entity via `parentOrganization` or `subOrganization`.[3]
- **Optional enhancements:** `AggregateRating` for 445+ five-star Google reviews; `FAQPage` for common questions; `Organization` for branding/social links.[3][4]

Place all JSON-LD in `<script type="application/ld+json">` tags in the `<head>` of the homepage. Use `@graph` to combine multiple entities without repetition.[3]

### Specific JSON-LD Example for HomeAndConstructionBusiness
Replace placeholders (e.g., company name, addresses, URLs) with real data. This example covers the main business, services, 3 locations as sub-organizations, and reviews.

```
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "name": "Your Company Name",
      "description": "Expert roofing, siding, windows, doors, gutters, exterior trim, and decks in MD and DC.",
      "url": "https://yourwebsite.com",
      "logo": "https://yourwebsite.com/logo.png",
      "telephone": "+1-XXX-XXX-XXXX",
      "email": "info@yourwebsite.com",
      "sameAs": [
        "https://www.facebook.com/yourcompany",
        "https://www.google.com/maps/place/yourcompany"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "445",
        "bestRating": "5",
        "worstRating": "1",
        "reviewAspect": "Google Reviews"
      },
      "areaServed": [
        {
          "@type": "Place",
          "name": "Bowie, MD"
        },
        {
          "@type": "Place",
          "name": "Gaithersburg, MD"
        },
        {
          "@type": "Place",
          "name": "Washington, DC"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Home Remodeling Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Roofing"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Siding"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Windows & Doors"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Gutters"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Exterior Trim"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Decks"
            }
          }
        ]
      },
      "subOrganization": [
        {
          "@type": "LocalBusiness",
          "name": "Your Company - Bowie MD",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Bowie Road",
            "addressLocality": "Bowie",
            "addressRegion": "MD",
            "postalCode": "20715",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 39.0000,
            "longitude": -76.0000
          },
          "telephone": "+1-XXX-XXX-XXXX",
          "openingHours": "Mo-Fr 08:00-17:00"
        },
        {
          "@type": "LocalBusiness",
          "name": "Your Company - Gaithersburg MD",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "456 Gaithersburg Ave",
            "addressLocality": "Gaithersburg",
            "addressRegion": "MD",
            "postalCode": "20878",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 39.1500,
            "longitude": -77.2000
          },
          "telephone": "+1-XXX-XXX-XXXX",
          "openingHours": "Mo-Fr 08:00-17:00"
        },
        {
          "@type": "LocalBusiness",
          "name": "Your Company - Washington DC",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "789 DC Street NW",
            "addressLocality": "Washington",
            "addressRegion": "DC",
            "postalCode": "20001",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.9000,
            "longitude": -77.0400
          },
          "telephone": "+1-XXX-XXX-XXXX",
          "openingHours": "Mo-Fr 08:00-17:00"
        }
      ]
    }
  ]
}
```

Validate with Google's Rich Results Test and Schema Markup Validator. Test for rich snippets like local business listings and service carousels.[1][3]

---

## Service Page Schemas

For individual service pages on a roofing/siding/windows contractor website, use **Service schema as the primary @type**, with optional Product schema for material-specific pages, and connect them to the parent organization via the **provider** property.

## Recommended Schema Structure

**Service** is the best fit for service pages like "Asphalt Shingle Roofing" or "James Hardie Siding Installation."[4][5] This schema type allows you to define the specific service offered, who provides it, and where it's available.[5] You can use **additionalType** to explicitly categorize the service (for example, linking to a Wikipedia page on roofing or siding installation).[5]

**Product schema** can supplement Service schema on pages emphasizing specific materials or products, but Service should remain primary for pages focused on the service itself rather than the product.[7]

## Key Properties for Service Pages

**provider**: Link to your organization's LocalBusiness or Organization schema. This connects the individual service page to your parent business entity.[5] This is essential for maintaining NAP (name, address, phone) consistency across your site.

**areaServed**: Specify the geographic areas where you offer the service (cities, counties, or regions).[5] This helps search engines understand your service coverage.

**additionalType**: Use a Wikidata or Wikipedia link to define the service more explicitly.[5] For example, link to https://en.wikipedia.org/wiki/Roofing for a roofing service page.

**serviceOutput**: Define what the service produces.[5] For roofing installation, this might be "installed roof" or "weather-protected structure."

**hasOfferCatalog**: Use this property to group related services or materials under a catalog structure. For a contractor offering multiple roofing types, you could create an OfferCatalog containing individual Offer objects for each material option (asphalt shingles, metal roofing, etc.).[2]

**brand**: Include this if the page emphasizes a specific brand (e.g., "James Hardie Siding Installation").[2] Link to the brand's Organization schema or include the brand name as text.

## AggregateRating on Service Pages

**Do not** create separate AggregateRating for each service page unless you have genuine, compliant reviews specifically for that service.[1] Instead, use a single AggregateRating on your main business location page that reflects overall company reviews.[1] If individual services have distinct review sets, you may include service-specific ratings, but this should be based on actual review data, not duplicated from the company level.

## Example Structure

A service page for "Asphalt Shingle Roofing" would include:

- **@type**: "Service"
- **name**: "Asphalt Shingle Roofing Installation"
- **provider**: Reference to your LocalBusiness schema (by @id or nested object)
- **areaServed**: ["City, State", "County, State"]
- **additionalType**: "https://en.wikipedia.org/wiki/Roofing"
- **serviceOutput**: "Installed asphalt shingle roof"
- **brand**: "Your Company Name" or specific material brand
- **hasOfferCatalog**: (Optional) Link to an OfferCatalog containing pricing tiers or material options

For a material-focused page like "James Hardie Siding," you could add Product schema alongside Service schema, with the Product's **brand** property set to "James Hardie" and the Service's **provider** pointing to your business.

## Connection to Parent Organization

Each service page's **provider** property should reference your main LocalBusiness schema using either:

- An **@id** reference (e.g., `"provider": {"@id": "#organization"}`)
- A nested LocalBusiness object with consistent NAP data[1]

This ensures search engines understand that all services belong to the same business entity, improving local visibility and map accuracy.[1]

---

## Local Seo Schemas

**For city-specific service pages like "Roofing Company Near You in Annapolis MD," the best schema.org structured data starts with **LocalBusiness** (using a specific subtype like RoofingContractor if available) on each page to maximize local search visibility, combined with **Service**, **Review**, **AggregateRating**, and **FAQPage** schemas.[1][3][7]**

### Recommended Schemas for Maximum Local Visibility
- **LocalBusiness**: Essential for all local pages; signals business details like name, address (NAP), phone, hours, and location to search engines, enabling rich results and better local rankings. Use the most specific subtype (e.g., schema.org/RoofingContractor) over generic LocalBusiness for precision.[1][2][3][7]
- **Service**: Marks up the specific service (e.g., roofing) with properties like serviceType, provider (link to LocalBusiness), and description; aids indexing and relevance despite no rich results.[1]
- **Review and AggregateRating**: Display star ratings and reviews in search results if visible on the page; boosts credibility and clicks in local searches. Follow Google's guidelines for compliance.[1][3][5]
- **FAQPage**: Structures FAQ sections for rich results, answering common local queries (e.g., "roofing costs in Annapolis"), increasing visibility and reducing support needs.[1][2][3][5]
- **Supporting schemas**: Add Organization on parent/homepage for brand consistency, geo for coordinates, hasMap for Google Maps link, and breadcrumb for navigation.[1][3][4]

### Using serviceArea, areaServed, and geo Properties
- **serviceArea or areaServed**: Specify the targeted city/region (e.g., "Annapolis, MD" or ZIP code) in LocalBusiness or Service schema to associate services with the local area, improving relevance in city-specific searches.[1][3]
- **geo**: Include latitude/longitude coordinates of the business or service location for precise geographic targeting.[3]
Place these in the LocalBusiness block on each city page to tie content to the target location.[3]

### LocalBusiness on Each Page vs. Referencing Parent
Implement a full **LocalBusiness schema on every city-specific page** with location-tailored details (e.g., city in address, serviceArea), rather than just referencing the parent—this ensures each page ranks independently for local queries. Use parent Organization schema for overarching brand info, and link via "parentOrganization" if needed. Minimum: homepage, contact, about, and all individual location/service pages.[3][4][5]

### How FAQPage Helps Local Pages
FAQPage schema on local service pages enables expandable rich results in SERPs, capturing queries like "best roofing in Annapolis," expanding real estate, and positioning the business as a local authority while driving clicks.[1][2][3][5]

### Review and AggregateRating on Local Pages
Yes, add these if reviews are displayed on the page; they trigger star ratings in local search results, enhancing trust signals and CTR. AggregateRating summarizes multiple reviews; use Review for individuals. Ensure authenticity to avoid penalties.[1][3][5]

**Implementation tips**: Use JSON-LD format, validate with Google's Rich Results Test, and ensure NAP consistency across pages/Google Business Profile. Focus on key pages; avoid over-marking.[1][3][4]

---

## Location Page Schemas

**Location/branch pages for a roofing contractor with physical offices should use `@type: "RoofingContractor"` (a subtype of LocalBusiness) to specify the business type while including location-specific details like address, phone, team, and reviews.** This is more precise than generic LocalBusiness or broader HomeAndConstructionBusiness, as RoofingContractor directly matches the industry.[7]

### Recommended Schema Structure for Each Branch Page
Use JSON-LD in the `<head>` or `<script>` tag. Each branch is a **LocalBusiness** subtype with its own `@id` (e.g., URL fragment), linking bidirectionally to the parent company.

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://example.com/locations/bowie-md/#branch",
  "name": "Bowie MD Branch",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Bowie",
    "addressRegion": "MD",
    "postalCode": "20715",
    "addressCountry": "US"
  },
  "telephone": "+1-301-555-0123",
  "url": "https://example.com/locations/bowie-md/",
  "parentOrganization": {
    "@id": "https://example.com/#organization",
    "@type": "RoofingContractor",
    "name": "Your Company Name"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "employee": [ /* Array of Person schemas for team members */ ],
  "aggregateRating": { /* From reviews */ }
}
```

On the **main company page**, define the parent and list branches reciprocally:
```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://example.com/#organization",
  "name": "Your Company Name",
  "url": "https://example.com/",
  "logo": "https://example.com/logo.png",
  "subOrganization": [
    {
      "@id": "https://example.com/locations/bowie-md/#branch",
      "@type": "RoofingContractor"
    },
    {
      "@id": "https://example.com/locations/gaithersburg-md/#branch",
      "@type": "RoofingContractor"
    },
    {
      "@id": "https://example.com/locations/washington-dc/#branch",
      "@type": "RoofingContractor"
    }
  ]
}
```
This creates a strong bidirectional link: branch **parentOrganization** points to company; company **subOrganization** lists branches.[1][2][3][4]

### parentOrganization vs. subOrganization
- **parentOrganization** (on branch): "This branch's parentOrganization **is** the main company." Points upward to the larger entity.[1][2]
- **subOrganization** (on parent): "The main company's subOrganization **is** this branch." Points downward to subsidiaries/branches; inverse of parentOrganization.[1][3]
Use both for reciprocal relationships, strengthening entity connections.[4]

### department vs. subOrganization
**subOrganization** fits branches (semi-independent offices with own phone/address).[3][8]  
**department** is for internal units within one location (e.g., "Sales Department"), not physical branches.[3]

### OpeningHoursSpecification Structure
Use an array of objects, one per day/group. Specify `dayOfWeek` (array for multiples), `opens`, `closes`. Handles exceptions (e.g., holidays) with `validFrom`/`validThrough`. Example above covers Mon-Fri and Saturday; omit closed days or add `"closed": "true"`.[7]

---

## Content Page Schemas

### 1. About page - company history, founding story
**Ideal @type:** `AboutPage` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `Organization` or `HomeAndConstructionBusiness` (with `foundingDate`, `founder`, `description` for history/story)[2][4]  
- `breadcrumb`: `BreadcrumbList`[1]  
- `primaryImageOfPage`: `ImageObject` (company photo)[1]

### 2. Team page - employees with roles
**Ideal @type:** `ProfilePage` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `ItemList` of `Person` (with `name`, `jobTitle`, `worksFor` linking to `Organization`)[1][4]  
- `breadcrumb`: `BreadcrumbList`[1]  
- `primaryImageOfPage`: `ImageObject` (team photos)[1]

### 3. Testimonials page - customer reviews (445+ five-star reviews)
**Ideal @type:** `WebPage` (with `Review` collection)[1]  
**Key properties:**  
- `mainEntity`: `ItemList` of `Review` (with `reviewRating` as `Rating`, `author` as `Person`, `reviewBody`, `reviewRating.value` for stars)[1]  
- `aggregateRating`: `AggregateRating` (e.g., `ratingValue: 5`, `reviewCount: 445`)[1]  
- `breadcrumb`: `BreadcrumbList`[1]

### 4. Gallery page - project photos
**Ideal @type:** `CollectionPage` or `ImageGallery` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `ItemList` of `ImageObject` (with `contentUrl`, `caption` for projects)[1]  
- `primaryImageOfPage`: `ImageObject` (featured project)[1]  
- `breadcrumb`: `BreadcrumbList`[1]

### 5. Blog page - articles about home improvement
**Ideal @type:** `CollectionPage` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `ItemList` of `BlogPosting` (with `headline`, `datePublished`, `author`, `image`)[1]  
- `breadcrumb`: `BreadcrumbList`[1]  
- `keywords`: Text (e.g., "home improvement")[1]

### 6. Video gallery - YouTube videos of projects
**Ideal @type:** `CollectionPage` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `ItemList` of `VideoObject` (with `name`, `thumbnailUrl`, `contentUrl` from YouTube, `description`)[1]  
- `video`: `VideoObject` (embedded videos)[1]  
- `breadcrumb`: `BreadcrumbList`[1]

### 7. Contact page - phone, email, form
**Ideal @type:** `ContactPage` (subtype of WebPage)[1][3][7]  
**Key properties:**  
- `mainEntity`: `Organization` or `HomeAndConstructionBusiness` (with `telephone`, `email`, `contactPoint` as `ContactPoint`, `address` as `PostalAddress`)[1][2]  
- `breadcrumb`: `BreadcrumbList`[1]  
- `potentialAction`: `ContactAction` (for form)[1]

### 8. Financing page - payment options ($99/mo)
**Ideal @type:** `WebPage` (financial services focus)[1]  
**Key properties:**  
- `mainEntity`: `Service` or `Offer` (with `name: "Financing"`, `priceSpecification` as `PriceSpecification` e.g., `price: "99"`, `priceCurrency: "USD"`, `eligibleDuration` for monthly)[2][5]  
- `provider`: `HomeAndConstructionBusiness`[2]  
- `breadcrumb`: `BreadcrumbList`[1]

### 9. Warranty page - warranty information
**Ideal @type:** `WebPage`[1]  
**Key properties:**  
- `mainEntity`: `WarrantyPromise` (with `name`, `description`, `warrantyScope`, `durationOfWarranty`)[1]  
- `offeredBy`: `HomeAndConstructionBusiness`[2]  
- `breadcrumb`: `BreadcrumbList`[1]

### 10. Cost calculator pages - interactive tools
**Ideal @type:** `WebPage`[1]  
**Key properties:**  
- `mainEntity`: `WebApplication` (with `name`, `description`, `offers` linking to `Service`, `featureList` for calculator functions)[3]  
- `provider`: `HomeAndConstructionBusiness`[2]  
- `breadcrumb`: `BreadcrumbList`[1]

All pages should include site-wide `Organization` or `HomeAndConstructionBusiness` in the header (with `name`, `address`, `telephone`, `makesOffer` as `Service` list) and common `WebPage` properties like `url`, `mainEntityOfPage`[1][2]. Use JSON-LD format.[6]

---

## Validation And Testing

### 1. Tools for Validating and Testing Schema.org Structured Data
Use the **Schema.org Markup Validator** (validator.schema.org) as the primary tool for comprehensive syntax, semantic, and Schema.org compliance checks across JSON-LD, Microdata, and RDFa formats.[1][2][3][5][7] Complement it with **Google Rich Results Test** for verifying eligibility for Google's rich results and enhanced SERP features.[1][2][3][5][6] Additional tools include TestSprite (AI-powered with IDE/CI/CD integration and auto-fixes), SEMrush Structured Data Checker, Screaming Frog Schema Analyzer, Classy Schema Viewer, and ITS Schema Markup Validator for advanced monitoring, batch processing, and JavaScript-rendered schema support.[1][2]

Adopt a multi-tool strategy: Start with Schema.org Validator for baseline syntax/semantics, then Google Rich Results Test for search engine compatibility, and third-party tools for ongoing automation.[1][2]

### 2. Most Common Validation Errors
Common errors include syntax issues like missing commas, unclosed brackets, or invalid properties; missing required properties for schema types; improper nesting or relationship structures; data type inconsistencies; and formatting errors in JSON-LD, Microdata, or RDFa.[1][5] Other frequent issues are compatibility problems with search engine requirements and warnings for optional but recommended properties that affect rich results eligibility.[1][4]

### 3. Testing if Schemas Generate Rich Results
Test rich results eligibility using **Google Rich Results Test** by entering a URL or pasting code to preview enhanced SERP features, identify errors, and confirm markup renders correctly.[1][2][3][5][6] Monitor live performance by checking if pages appear with rich results in Google Search and using validation tools to ensure no critical errors.[1] For comprehensive checks, combine with Schema.org Validator and third-party tools that simulate rich result previews.[2][4]

### 4. Google Search Console Reports for Schema Status
**Enhancements reports** in Google Search Console track structured data performance, showing rich results eligibility, errors, warnings, and pages with valid/invalid schema.[1] Use the **Structured Data** or **Rich Results** sections for ongoing monitoring of implementation status and performance metrics.[1]

### 5. Time for Google to Recognize New Schemas
Search results do not specify exact timelines, but monitoring via Google Search Console typically shows recognition within days to weeks after crawling, depending on crawl frequency and site authority. Retest with Google Rich Results Test immediately and track Enhancements reports for updates.[1] (Inference based on standard SEO practices; no direct 2025-2026 data provided.)

### 6. Recently Deprecated Schema Types by Google
Search results do not mention specific schema types deprecated by Google in 2025-2026. The Schema.org Validator supports all types, including those not eligible for Google's rich results, indicating focus remains on comprehensive vocabulary without noted recent deprecations.[1][3]

### 7. Difference Between Schema.org Validation and Google's Validation
**Schema.org validation** (via Schema.org Markup Validator) checks broad compliance with Schema.org vocabulary, syntax, semantics, and all types/properties without search engine restrictions—ideal for generic accuracy.[1][2][3] **Google's validation** (Rich Results Test) focuses on Google-specific requirements for rich results eligibility, flagging issues for enhanced SERPs but excluding non-supported schema types.[1][3][5][6] Schema.org is the "gold standard" for standards; Google's is narrower for SEO optimization.[1]

