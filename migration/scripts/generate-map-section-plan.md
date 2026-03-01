# Map Section Content Generation Plan

## Objective
Generate dynamic `mapSection` rich text content for each local page in Strapi, using:
- Job counts from CSV data
- City-specific neighborhoods and context
- Dynamic Google Maps iframe with correct lat/long
- Claude API (Opus 4.5) for generating relevant content

## Template Structure
```html
<h2>
    📍 {X}+ {City} Homeowners Have Trusted Us for {Service Label}, Expert Guidance, and Honest Recommendations
</h2>
<p>
    {Claude-generated paragraph about the city, neighborhoods, home styles, HOA considerations, etc.}
</p>
<div class="responsive-map">
    <iframe style="border-width:0;" src="https://www.google.com/maps/d/u/0/embed?mid=10zevQxZd3uDXmovt2-bhd4AVDeVb0Rg&ehbc=2E312F&noprof=1&ll={LAT},{LONG}&z=12" width="640" height="480" frameborder="0"></iframe>
</div>
```

## Data Sources

### 1. Jobs CSV (`jobs_aggregated_by_city.csv`)
- `city`, `state`, `tradeName`, `jobCount`, `latitude`, `longitude`
- Trade names: ROOFING, SIDING, GUTTERS, DOORS, WINDOWS, BATH REMODEL, DECKING, SOFFIT/FASCIA/TRIM, REPAIRS, OTHER

### 2. Webflow Services Data (`services-full.json`)
- 385 local pages with `name`, `slug`
- Page name format: `{Service} - {City} - {State}` (e.g., "Roofing - Bowie - MD")

### 3. Strapi ID Mappings (`services-ids.json`)
- Maps Webflow IDs to Strapi document IDs

## Service Label Mapping

| CSV Trade Name | Page Service | Display Label |
|----------------|--------------|---------------|
| ROOFING | Roofing | Roof Replacements |
| SIDING | Siding | Siding Installations |
| GUTTERS | Gutters | Gutter Installations |
| DOORS | Doors | Door Replacements |
| WINDOWS | Windows | Window Replacements |
| DECKING | Deck Builder | Deck Builds |
| SOFFIT, FASCIA & TRIM | Exterior Trim | Trim Work |
| BATH REMODEL | - | Bathroom Remodels |
| REPAIRS | - | Home Repairs |
| OTHER | - | Home Improvements |

## Processing Steps

### Step 1: Build City-Service Job Count Map
```
For each row in jobs_aggregated_by_city.csv:
  - Key: "{city}|{state}|{service}"
  - Value: { jobCount, latitude, longitude }
```

### Step 2: Parse Local Page Info
```
For each page in services-full.json:
  - Extract city from page name
  - Extract service type from page name/slug
  - Match to job data
```

### Step 3: Generate Content with Claude API
```
Prompt to Claude:
- City name, state
- Service type
- Job count
- Request: Generate a paragraph about serving this city
  - Mention 2-3 real neighborhoods
  - Reference home styles common in the area
  - Mention HOA/community considerations if applicable
  - Keep similar length to template (~100-150 words)
```

### Step 4: Build HTML and Update Strapi
```
- Construct the mapSection HTML with template
- Replace placeholders with dynamic values
- Update Strapi via REST API
```

## Edge Cases

1. **Pages without matching job data**: Use city-level aggregate or default to nearby city
2. **Multiple service types per city**: Match based on page slug/name
3. **Missing lat/long**: Use city center coordinates from geocoding
4. **State-level pages** (e.g., "maryland-roofing"): Aggregate all MD jobs

## Implementation Files

1. `generate-map-sections.ts` - Main script
2. Uses existing:
   - `jobs_aggregated_by_city.csv`
   - `services-full.json`
   - `services-ids.json`

## API Keys Required
- `STRAPI_TOKEN` (already in .env)
- Claude API key (need to add or use existing `@anthropic-ai/sdk`)

## Estimated Scope
- 385 local pages to process
- ~385 Claude API calls (can batch/parallelize)
- Rate limiting: 50-100 requests per minute
