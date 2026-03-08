# GMB Schema Research: Multi-Location Structured Data Implementation

# JSON-LD LocalBusiness Schema for Multi-Location Home Contractors

## Schema Type Selection

For a home contractor business, use **HomeAndConstructionBusiness** or a more specific type like **RoofingContractor** rather than the generic LocalBusiness[6]. HomeAndConstructionBusiness is a LocalBusiness subtype specifically designed for services around homes and buildings[6]. The search results recommend determining your schema type based on your specific business category rather than using the generic "LocalBusiness"[2].

## Linking to Google Business Profile

Use the **sameAs** property to connect your schema markup to your Google Business Profile[2]. This property accepts an array of URLs pointing to your verified business profiles:

```json
"sameAs": [
  "https://www.google.com/maps/place/[your-business-id]",
  "https://www.facebook.com/your-profile",
  "https://www.twitter.com/your-profile"
]
```

## Single Location vs. Multi-Location Structure

The search results do not provide explicit guidance on structuring multi-location contractor businesses with Organization parent and LocalBusiness children entities. However, based on standard schema.org practices, **individual location pages should each have their own LocalBusiness schema** with specific location details[2].

For your homepage, you have two approaches:
- Implement a single Organization schema for the parent company without LocalBusiness markup
- Use LocalBusiness schema only on individual location pages, where each page represents a specific branch with its own address, phone, and service area

## Core LocalBusiness Properties and Google My Business Field Mapping

The following properties should map from your Google My Business profile to schema.org[2][8]:

| GMB Field | Schema Property | Example |
|-----------|-----------------|---------|
| Business Name | name | "ABC Roofing Services" |
| Address | address (PostalAddress) | streetAddress, addressLocality, addressRegion, postalCode |
| Phone | telephone | "555-123-4567" |
| Hours | openingHours | "Mo,Tu,We,Th,Fr 08:00-17:00" |
| Service Area | areaServed | State or region name |
| Location Coordinates | geo (GeoCoordinates) | latitude, longitude |
| Business Description | description | Service overview |
| Website | url | Homepage or location page URL |
| Rating/Reviews | aggregateRating | ratingValue, reviewCount |

## Extended Example for HomeAndConstructionBusiness

```json
{
  "@context": "https://schema.org/",
  "@type": "RoofingContractor",
  "name": "ABC Roofing Services",
  "url": "https://www.example.com/locations/downtown",
  "telephone": "555-123-4567",
  "email": "contact@example.com",
  "description": "Professional roofing installation and repair services",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Denver",
    "addressRegion": "CO",
    "postalCode": "80202"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "39.7392",
    "longitude": "-104.9903"
  },
  "areaServed": [
    {
      "@type": "State",
      "name": "Colorado"
    },
    {
      "@type": "City",
      "name": "Denver"
    }
  ],
  "openingHours": "Mo,Tu,We,Th,Fr 08:00-17:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156"
  },
  "sameAs": [
    "https://www.google.com/maps/place/[your-business-id]",
    "https://www.facebook.com/abc-roofing"
  ]
}
```

## Key Implementation Guidelines

**Use JSON-LD format**, as it is Google's preferred structured data format and easiest to maintain[7]. Keep all schema data accurate and truthful, marking up only content visible to users on the page[7]. For maximum SEO impact, pair your schema markup with optimized page content[9].