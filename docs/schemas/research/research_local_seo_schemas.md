# Local Seo Schemas

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