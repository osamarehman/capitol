# Home Contractor Schemas

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