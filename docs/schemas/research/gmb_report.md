# GMB Multi-Location Schema Research Report

Generated: 2026-03-08

## Key Findings

### 1. Schema Type Selection
- **RoofingContractor** is the best primary type — it's a direct subclass of `HomeAndConstructionBusiness` and aligns with Google's GBP "Roofing contractor" category
- **SidingContractor does NOT exist** in schema.org — use `RoofingContractor` for all locations since roofing is the primary service
- Avoid `GeneralContractor` (too generic) and `LocalBusiness` (lacks specialty)

### 2. Multi-Location Structure
- **Homepage**: Parent `HomeAndConstructionBusiness` with `subOrganization` references to each branch
- **Location pages**: Each gets its own `RoofingContractor` schema with only that location's data
- Use `subOrganization` (not `department`) for separate physical branches
- Use `parentOrganization` on each branch to link back to the parent

### 3. Connecting to Google Business Profile
- Use `sameAs` property with GMB CID URL: `https://maps.google.com/?cid=YOUR_CID`
- Include other verified profiles (Facebook, Instagram, Yelp) in `sameAs` array
- Use `hasMap` with the Google Maps place URL

### 4. AggregateRating
- Valid on `LocalBusiness`/`RoofingContractor` schemas
- Include `bestRating: "5"` and `worstRating: "1"` for explicit 5-star scale
- Will appear in knowledge panels but **won't produce star snippets** for LocalBusiness (Google's self-serving reviews policy)
- Keep values synced with actual GBP review counts

### 5. Essential Properties per Location
| Property | Purpose |
|----------|---------|
| `@type` | `RoofingContractor` |
| `name` | Branch-specific business name |
| `url` | Location page URL |
| `telephone` | Branch phone number |
| `email` | Contact email |
| `address` | Full PostalAddress |
| `geo` | GeoCoordinates (lat/lng) |
| `hasMap` | Google Maps URL |
| `openingHoursSpecification` | Structured hours |
| `areaServed` | Cities/states served by this branch |
| `hasOfferCatalog` | Service catalog |
| `employee` | Branch manager with @id |
| `parentOrganization` | @id ref to parent org |
| `sameAs` | Social profiles + GMB CID |
| `aggregateRating` | Rating with bestRating/worstRating |
| `image` | Business logo/photo |

### 6. No Duplicate Penalties
- No penalties for having business schemas across multiple pages if each represents a valid entity
- Each page's schema should match that page's specific location
- Consistency across schemas boosts local signals

## Changes Applied to Schemas

### Location Schemas (All 3)
- Added `geo` (GeoCoordinates)
- Added `hasMap` (Google Maps URL)
- Added `openingHoursSpecification` (M-F 8-5, Sat 9-2)
- Added `areaServed` with specific cities per branch
- Added `hasOfferCatalog` with all 6 service types
- Added `sameAs` with social profiles
- Added `email`, `image`, `description`
- Added `bestRating`/`worstRating` to AggregateRating
- Added `@id` to all employee Person entities
- **Fixed**: Gaithersburg `SidingContractor` → `RoofingContractor`

### home.json
- **Fixed**: Gaithersburg subOrganization `SidingContractor` → `RoofingContractor`
- **Fixed**: Added `@id` to Lance Jewell and Austin Jewell employee references

### service_areas.json
- **Fixed**: Invalid `ServiceArea` type → `ItemList` with `ListItem` elements

## TODO: GMB CID URLs
To complete the `sameAs` integration, find the Google CID for each location:
1. Search for the business on Google Maps
2. Copy the CID from the URL (format: `https://maps.google.com/?cid=XXXXXXXXXX`)
3. Add to each location schema's `sameAs` array

The CID URLs can also be found in Google Business Profile Manager under each location's details.
