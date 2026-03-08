# Schema Validation Report

Generated: 2026-03-08 21:54

## Schema Validation Summary

| File | Status | Issues Found | Fixes Needed |
|------|--------|--------------|--------------|
| about.json | ✓ | None | None |
| blog.json | ✓ | None | None |
| commercial_roof_calculator.json | ✓ | None | None |
| contact.json | ✓ | None | None |
| decks.json | ✓ | None | None |
| decks_flagstone.json | ✓ | None | None |
| decks_ipe.json | ✓ | None | None |
| decks_rooftop.json | ✓ | None | None |
| doors.json | ✓ | None | None |
| exterior_trim.json | ✓ | None | None |
| financing.json | ✓ | None | None |
| gallery.json | ✓ | None | None |
| gutters.json | ✓ | None | None |
| home.json | ⚠ | Minor inconsistencies | Update employee references |
| location_bowie.json | ✓ | None | None |
| location_dc.json | ✓ | None | None |
| location_gaithersburg.json | ✓ | None | None |
| quote.json | ✓ | None | None |
| roofing.json | ✓ | None | None |
| roofing_asphalt.json | ✓ | None | None |
| roofing_commercial.json | ✓ | None | None |
| roofing_cost_calculator.json | ✓ | None | None |
| roofing_flat.json | ✓ | None | None |
| roofing_metal.json | ✓ | None | None |
| service_areas.json | ⚠ | Non-standard type | Replace ServiceArea with valid types |
| siding.json | ✓ | None | None |
| siding_james_hardie.json | ✓ | None | None |
| siding_vinyl.json | ✓ | None | None |
| team.json | ✓ | None | None |
| testimonials.json | ✓ | None | None |
| video_gallery.json | ✓ | None | None |
| warranty.json | ✓ | None | None |
| windows.json | ✓ | None | None |

## Detailed Issues

### home.json (⚠ Minor Issues)

**Issues Found:**
1. Employee references in subOrganization array don't match the defined Person @ids exactly
2. Minor inconsistency in jobTitle descriptions between locations

**Fixes Needed:**
```json
// In Gaithersburg branch, update employee reference:
"employee": {
  "@type": "Person",
  "@id": "https://www.improveitmd.com/#lancejewell", // Add @id for consistency
  "name": "Lance Jewell",
  "jobTitle": "Branch Manager & Project Consultant"
}

// In DC branch, update employee reference:
"employee": {
  "@type": "Person",
  "@id": "https://www.improveitmd.com/#austinjewell", // Add @id for consistency
  "name": "Austin Jewell",
  "jobTitle": "Branch Manager & Project Consultant"
}
```

### service_areas.json (⚠ Non-standard Type)

**Issues Found:**
1. `ServiceArea` is not a valid schema.org type
2. The structure attempts to define geographic coverage but uses an invalid type

**Fixes Needed:**
```json
// Replace ServiceArea with a valid approach:
"mainEntity": {
  "@type": "ItemList",
  "name": "Capitol Improvements Service Coverage",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "State",
        "name": "Maryland",
        "containedInPlace": { "@type": "Country", "name": "United States" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "State",
        "name": "Virginia",
        "containedInPlace": { "@type": "Country", "name": "United States" }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "AdministrativeArea",
        "name": "District of Columbia",
        "containedInPlace": { "@type": "Country", "name": "United States" }
      }
    }
  ]
}
```

## Overall Assessment

✅ **Strengths:**
- Excellent consistent @id pattern across all files
- Proper @graph structure usage
- All URLs are properly formatted
- Good use of areaServed properties
- Comprehensive service markup
- No deprecated types or properties used

✅ **Google Rich Results Compatibility:**
- All schemas would likely pass Google's Rich Results Test
- Proper structured data for local business listings
- Good service and organization markup

The schemas are very well-structured overall with only minor issues that don't affect functionality but should be addressed for consistency and standards compliance.