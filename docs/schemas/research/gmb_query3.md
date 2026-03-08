# GMB Schema Research: Schema Types for Roofing/Siding Contractors

**RoofingContractor** is the best primary schema.org type for roofing contractors with Google Business Profile (GBP), as it is a specific subclass of **HomeAndConstructionBusiness** and aligns directly with Google's recommended GBP primary category of "Roofing contractor" for optimal local search visibility.[1][2][5][6] For siding services, add **SidingContractor** (also under HomeAndConstructionBusiness) as a secondary type if applicable, but prioritize specificity over broader types like **GeneralContractor** or **HomeAndConstructionBusiness** to match service focus and avoid diluting relevance.[1][5][6]

### Comparison of Schema Types
| Type                  | Hierarchy Path                          | Best For Roofing/Siding Contractors? | GBP Alignment & Notes |
|-----------------------|-----------------------------------------|--------------------------------------|-----------------------|
| **RoofingContractor** | LocalBusiness > HomeAndConstructionBusiness > RoofingContractor[1][2] | Yes, primary choice for roofing. Specific and precise.[1][5][6] | Matches GBP "Roofing contractor" primary category exactly for local pack ranking.[3][4][5][6] |
| **HomeAndConstructionBusiness** | LocalBusiness > HomeAndConstructionBusiness[1][2] | Secondary or parent; less specific. | Broader GBP fit but not as targeted as RoofingContractor; use if multi-service.[5] |
| **GeneralContractor** | LocalBusiness > HomeAndConstructionBusiness > GeneralContractor (implied)[6] | Avoid as primary; too generic. | GBP secondary only if diversified (e.g., 20% non-roofing); Google advises fewest categories.[5][6] |
| **LocalBusiness**    | Organization/Place > LocalBusiness[1][8][9] | Fallback/base for all; always include. | GBP foundation, but lacks specialty; enhances with children like RoofingContractor.[8][9] |

**Google's Usage**: Google recognizes **LocalBusiness** and its subclasses (e.g., **RoofingContractor**) for rich results like local packs, knowledge panels, and map visibility, pulling from GBP data like categories, reviews, and service areas.[3][4][5][6][8][9] **Organization** supports admin details (e.g., logo, contact) but defers to **LocalBusiness** for local SEO; no evidence of penalties for rich results using these, but specificity improves AI trust and map rankings.[5][10]

### Structuring AggregateRating for GMB Review Counts
Use **AggregateRating** under the **LocalBusiness**/**RoofingContractor** schema to mirror GBP stars/reviews:
- Set `ratingValue` to the exact average (e.g., 4.7).
- Set `reviewCount` to total GBP reviews.
- Nest under `aggregateRating` property; include `bestRating: 5` and `worstRating: 1` for 5-star scale.
```
{
  "@type": "RoofingContractor",
  "name": "Your Roofing Co",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "123",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```
This syncs with GBP for knowledge panels; update dynamically to match.[1][5][8]

**No penalties for duplicate schemas** across pages (e.g., homepage, contact, locations) if each represents a valid entityâ€”Google processes primary signals without deduplication issues, boosting local signals when consistent.[7][8][9] Use `sameAs` to link GBP URL and avoid thin content.