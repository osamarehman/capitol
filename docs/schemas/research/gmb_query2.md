# GMB Schema Research: Multiple LocalBusiness Schemas Per Page

**Yes, a website can have multiple LocalBusiness JSON-LD schemas on a single page for different branch locations, typically structured under a parent Organization with each branch as a subOrganization.**[1][6]

Google recommends this hierarchical approach for multi-location businesses: use one parent **Organization** schema linked to individual **LocalBusiness** schemas (or subtypes like CafeOrCoffeeShop) via subOrganization and parentOrganization properties, especially on homepages or location-listing pages without dedicated per-location pages.[1][6][7] For 2025, priorities include individual landing pages per branch with unique, localized content, title tags, city-specific keywords, embedded maps, and LocalBusiness schema on each; separate verified Google Business Profiles per physical location (not one shared profile); and enhanced LocalBusiness properties like service radius, business attributes (e.g., wheelchair accessible), payment methods, and opening hours variations.[3][4][8] Bulk verification is available for 10+ locations via Google Business Profile.[3]

**Each location page should only include its own LocalBusiness schema** (ideally as the primary markup for that page), not all locations, to help search engines associate the page precisely with one physical site and boost local pack visibilityâ€”though a sitewide parent Organization can appear on all pages if needed.[1][3][5]

**Department vs. subOrganization for branch offices**: Use **subOrganization** for distinct physical branches (e.g., separate coffee shops under one brand, each with its own address).[1] Reserve **department** for units within the *same physical building* (e.g., a pharmacy inside a department store).[1]

**Real-world examples**:
- **Reval Cafe** (Estonian coffee chain): Parent Organization for the brand, with subOrganization LocalBusiness schemas for branches like Kumu and Telliskivi, each including address, phone, and hoursâ€”implemented on separate location pages or a single locations page.[1]
- Multi-location clinics or retail stores: Individual landing pages per branch with LocalBusiness schema, unique meta tags, staff details, and Google Maps; parent Organization on homepage linking all via subOrganization.[3]