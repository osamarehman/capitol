# Schema Markup Deployment — AI Agent Instructions

## Objective

Inject JSON-LD structured data schema markup into each page of the improveitmd.com Webstudio project. Each core page gets a `<script type="application/ld+json">` block in the head section containing the corresponding schema from the `docs/schemas/core/` directory.

## Context

- **Site**: improveitmd.com (Webstudio + React Router SSR)
- **CMS**: Strapi 5 at `https://cms.improveitmd.com`
- **Repo**: `capitol/` — schemas are in `docs/schemas/core/` and `docs/schemas/`
- **Webstudio generated files**: `webstudio/app/__generated__/`
- **Local service pages** (385 pages): Already have `schemaMarkup` field in Strapi, injected via `HtmlEmbed` in the `[services].$slug._index.tsx` template

## Schema Files

### Core Pages (`docs/schemas/core/`)

Each JSON file maps to a specific page. The schema content should be wrapped in a `<script type="application/ld+json">` tag and placed in the page's `<head>` section.

| Schema File | Page Route | Webstudio Generated File |
|---|---|---|
| `home.json` | `/` | `_index.tsx` (via `$.tsx` catch-all) |
| `about.json` | `/about` | `[about]._index.tsx` |
| `team.json` | `/team` | `[team]._index.tsx` |
| `testimonials.json` | `/testimonials` | `[testimonials]._index.tsx` |
| `gallery.json` | `/gallery` | `[gallery]._index.tsx` |
| `contact.json` | `/contact` | `[contact]._index.tsx` |
| `quote.json` | `/quote` | `[quote]._index.tsx` |
| `financing.json` | `/financing` | `[financing]._index.tsx` |
| `warranty.json` | `/warranty` | `[warranty]._index.tsx` |
| `blog.json` | `/blog` | `[blog]._index.tsx` |
| `video_gallery.json` | `/video-gallery` | `[video-gallery]._index.tsx` |
| `roofing.json` | `/roofing` | `[roofing]._index.tsx` |
| `roofing_asphalt.json` | `/roofing/asphalt-roofing` | `[roofing].[asphalt-roofing]._index.tsx` |
| `roofing_metal.json` | `/roofing/metal-roofing` | `[roofing].[metal-roofing]._index.tsx` |
| `roofing_flat.json` | `/roofing/flat-roofing` | `[roofing].[flat-roofing]._index.tsx` |
| `roofing_commercial.json` | `/roofing/commercial-roofing` | `[roofing].[commercial-roofing]._index.tsx` |
| `siding.json` | `/siding` | `[siding]._index.tsx` |
| `siding_james_hardie.json` | `/siding/james-hardie` | `[siding].[james-hardie]._index.tsx` |
| `siding_vinyl.json` | `/siding/vinyl` | `[siding].[vinyl]._index.tsx` |
| `windows.json` | `/windows` | `[windows]._index.tsx` |
| `doors.json` | `/doors` | `[doors]._index.tsx` |
| `gutters.json` | `/gutters` | `[gutters]._index.tsx` |
| `exterior_trim.json` | `/exterior-trim` | `[exterior-trim]._index.tsx` |
| `decks.json` | `/decks-and-patios` | `[decks-and-patios]._index.tsx` |
| `decks_rooftop.json` | `/deck-and-patios/rooftop-deck` | `[deck-and-patios].[rooftop-deck]._index.tsx` |
| `decks_ipe.json` | `/deck-and-patios/ipe-deck-builder` | `[deck-and-patios].[ipe-deck-builder]._index.tsx` |
| `decks_flagstone.json` | `/deck-and-patios/flagstone-patios` | `[deck-and-patios].[flagstone-patios]._index.tsx` |
| `roofing_cost_calculator.json` | `/roofing-cost-calculator` | `[roofing-cost-calculator]._index.tsx` |
| `commercial_roof_calculator.json` | `/commercial-roof-cost-calculator` | `[commercial-roof-cost-calculator]._index.tsx` |
| `service_areas.json` | `/service-areas` | `[service-areas]._index.tsx` |
| `location_bowie.json` | `/locations/bowie` | `[locations].[bowie]._index.tsx` |
| `location_gaithersburg.json` | `/locations/gaithersburg` | `[locations].[gaithersburg]._index.tsx` |
| `location_dc.json` | `/locations/washington-dc` | `[locations].[washington-dc]._index.tsx` |

### Service Area Pages (`docs/schemas/`)

These are schema **templates** for the 385 local service pages. They are already managed via Strapi's `schemaMarkup` text field on the `local-page` content type and injected dynamically by the `[services].$slug._index.tsx` template. **Do NOT manually inject these — they are handled by the CMS.**

- `gutters.json` — pattern for gutter service pages
- `siding.json` — pattern for siding service pages
- `doors.json` — pattern for door service pages
- `windows.json` — pattern for window service pages
- `decks.json` — pattern for deck service pages

## How to Inject Schemas into Webstudio Pages

### Option A: Via Webstudio Designer (Preferred)

For each core page listed above:

1. Open the page in Webstudio designer
2. Add an `HtmlEmbed` component inside the page's `<head>` section (or at the top of the body with `clientOnly={true}`)
3. Set the code to:
   ```html
   <script type="application/ld+json">
   {PASTE THE JSON CONTENT FROM THE CORRESPONDING SCHEMA FILE}
   </script>
   ```
4. Set `clientOnly={true}` to avoid hydration mismatches
5. Publish the page

### Option B: Direct File Edit (Quick Deploy)

For each mapping in the table above, edit the corresponding `.tsx` file in `webstudio/app/__generated__/`:

1. Read the schema JSON from the corresponding file in `docs/schemas/core/`
2. Find the first `HtmlEmbed` in the page component (usually near the top, after imports)
3. Add a new `HtmlEmbed` component right after the opening of the Page component:

```tsx
<HtmlEmbed
code={`<script type="application/ld+json">
${JSON.stringify(schemaContent)}
</script>`}
clientOnly={true}
className={`w-html-embed`} />
```

**IMPORTANT**:
- Always use `clientOnly={true}` to prevent React hydration mismatches
- The schema JSON must be valid — test with https://validator.schema.org/
- Do NOT add schemas to the `[services].$slug._index.tsx` template — those come from Strapi dynamically

### Option C: Via Strapi API (For Pages with CMS Integration)

If a page fetches data from Strapi and has a `schemaMarkup` field:

```bash
# Example: Update schema for a Strapi content type
curl -X PUT "https://cms.improveitmd.com/api/{content-type}/{documentId}" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "schemaMarkup": "<script type=\"application/ld+json\">\n{...schema JSON...}\n</script>"
    }
  }'
```

## Validation

After deploying schemas:

1. Visit each page and check the HTML source for `<script type="application/ld+json">`
2. Test with Google's Rich Results Test: https://search.google.com/test/rich-results
3. Test with Schema.org validator: https://validator.schema.org/

## Schema Types Reference

| Schema Type | Used On |
|---|---|
| `HomeAndConstructionBusiness` | Home page |
| `RoofingContractor` / `SidingContractor` | Location pages |
| `AboutPage` | About, Team |
| `ContactPage` | Contact |
| `WebPage` | Quote, Financing, Warranty, Service Areas |
| `Service` | All service pages (roofing, siding, windows, doors, gutters, exterior trim, decks) |
| `WebApplication` | Calculator pages |
| `ImageGallery` | Gallery |
| `Blog` | Blog index |
| `CollectionPage` | Video gallery |
| `AggregateRating` | Testimonials (embedded) |

## Post-Deploy: Schema Audit CSV

After all schemas are set, run a scrape of all pages to generate an audit CSV with columns:
- Page Title
- Page URL
- Business Schema (yes/no)
- Service Schema (yes/no)
- Review/Rating Schema (yes/no)
- FAQ Schema (yes/no)
- Other Schema Types

This can be done with a script that fetches each page, extracts `<script type="application/ld+json">` blocks, and categorizes the `@type` values found.
