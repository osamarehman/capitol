# Service Page Schemas

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