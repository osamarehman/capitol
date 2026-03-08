# Location Page Schemas

**Location/branch pages for a roofing contractor with physical offices should use `@type: "RoofingContractor"` (a subtype of LocalBusiness) to specify the business type while including location-specific details like address, phone, team, and reviews.** This is more precise than generic LocalBusiness or broader HomeAndConstructionBusiness, as RoofingContractor directly matches the industry.[7]

### Recommended Schema Structure for Each Branch Page
Use JSON-LD in the `<head>` or `<script>` tag. Each branch is a **LocalBusiness** subtype with its own `@id` (e.g., URL fragment), linking bidirectionally to the parent company.

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://example.com/locations/bowie-md/#branch",
  "name": "Bowie MD Branch",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Bowie",
    "addressRegion": "MD",
    "postalCode": "20715",
    "addressCountry": "US"
  },
  "telephone": "+1-301-555-0123",
  "url": "https://example.com/locations/bowie-md/",
  "parentOrganization": {
    "@id": "https://example.com/#organization",
    "@type": "RoofingContractor",
    "name": "Your Company Name"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "employee": [ /* Array of Person schemas for team members */ ],
  "aggregateRating": { /* From reviews */ }
}
```

On the **main company page**, define the parent and list branches reciprocally:
```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://example.com/#organization",
  "name": "Your Company Name",
  "url": "https://example.com/",
  "logo": "https://example.com/logo.png",
  "subOrganization": [
    {
      "@id": "https://example.com/locations/bowie-md/#branch",
      "@type": "RoofingContractor"
    },
    {
      "@id": "https://example.com/locations/gaithersburg-md/#branch",
      "@type": "RoofingContractor"
    },
    {
      "@id": "https://example.com/locations/washington-dc/#branch",
      "@type": "RoofingContractor"
    }
  ]
}
```
This creates a strong bidirectional link: branch **parentOrganization** points to company; company **subOrganization** lists branches.[1][2][3][4]

### parentOrganization vs. subOrganization
- **parentOrganization** (on branch): "This branch's parentOrganization **is** the main company." Points upward to the larger entity.[1][2]
- **subOrganization** (on parent): "The main company's subOrganization **is** this branch." Points downward to subsidiaries/branches; inverse of parentOrganization.[1][3]
Use both for reciprocal relationships, strengthening entity connections.[4]

### department vs. subOrganization
**subOrganization** fits branches (semi-independent offices with own phone/address).[3][8]  
**department** is for internal units within one location (e.g., "Sales Department"), not physical branches.[3]

### OpeningHoursSpecification Structure
Use an array of objects, one per day/group. Specify `dayOfWeek` (array for multiples), `opens`, `closes`. Handles exceptions (e.g., holidays) with `validFrom`/`validThrough`. Example above covers Mon-Fri and Saturday; omit closed days or add `"closed": "true"`.[7]