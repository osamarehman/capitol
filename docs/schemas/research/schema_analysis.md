# Schema Analysis & Recommendations

Generated: 2026-03-08 21:50

# Schema.org Analysis for improveitmd.com

## Overall Schema Strategy Issues

1. **Global Product Schema Problem**: Every page has a generic `Product` schema that's irrelevant to most pages - this should be removed site-wide
2. **Missing Core Schemas**: No `Organization` or `BreadcrumbList` schemas anywhere
3. **Inconsistent Location Schemas**: Location pages need standardized `LocalBusiness` schemas
4. **No Review Integration**: 445+ five-star reviews aren't leveraged in schema markup

---

## Page-by-Page Analysis

### 1. HOME (https://improveitmd.com/)
**Priority: HIGH**

**Should Have:**
- `HomeAndConstructionBusiness` (primary)
- `Organization` (site-wide branding)
- Multiple `LocalBusiness` (3 locations)
- `AggregateRating` (445+ reviews)
- `BreadcrumbList`

**Prepared Schema Review:**
✅ `HomeAndConstructionBusiness` is correct @type
❌ Missing key properties:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "445"
},
"hasOfferCatalog": [
  {"@type": "Service", "name": "Roofing"},
  {"@type": "Service", "name": "Siding"}
]
```

**Additional Schemas Needed:**
- `Organization` for branding/social
- `BreadcrumbList` for navigation
- Remove irrelevant `Product` schemas

### 2. ABOUT (https://improveitmd.com/about)
**Priority: LOW**

**Should Have:** `AboutPage`, `BreadcrumbList`
**Prepared Schema:** ✅ `AboutPage` is appropriate
**Issues:** Remove global `Product` schema

### 3. TESTIMONIALS (https://improveitmd.com/testimonials)
**Priority: MEDIUM**

**Should Have:**
- `Review` schemas for individual testimonials
- `AggregateRating` summary
- `BreadcrumbList`

**Prepared Schema:** `WebPage` is too generic
**Better Approach:**
```json
{
  "@type": "Review",
  "reviewRating": {"@type": "Rating", "ratingValue": "5"},
  "author": {"@type": "Person", "name": "Customer Name"},
  "reviewBody": "Review text..."
}
```

### 4. CONTACT (https://improveitmd.com/contact)
**Priority: HIGH**

**Should Have:**
- `ContactPage`
- Three `LocalBusiness` schemas (one per location)
- `BreadcrumbList`

**Prepared Schema:** ✅ `ContactPage` correct
**Missing:** Individual location schemas with full contact details

### 5. ROOFING (https://improveitmd.com/roofing)
**Priority: HIGH**

**Should Have:** `Service` (primary), `BreadcrumbList`, `FAQPage`
**Prepared Schema:** ✅ `Service` is correct
**Missing Properties:**
```json
"serviceType": "Roofing Services",
"areaServed": ["Maryland", "Washington DC", "Virginia"],
"provider": {"@id": "#organization"}
```

### 6. SERVICE PAGES (Asphalt, Metal, Flat Roofing, Siding, etc.)
**Priority: MEDIUM-HIGH**

**All Should Have:**
- `Service` (primary)
- `BreadcrumbList`
- Optional: `Product` for material-specific pages

**Issues:** Current `VideoObject` on asphalt page needs proper video properties
**Missing:** Service area and provider connections

### 7. LOCATION PAGES (Bowie, Gaithersburg, DC)
**Priority: HIGH**

**Should Have:**
- `LocalBusiness` or `HomeAndConstructionBusiness`
- `AggregateRating`
- `BreadcrumbList`

**Current Issues:**
- Bowie: Has `RoofingContractor` - should be `LocalBusiness`
- Gaithersburg: Has `SidingContractor` - should be `LocalBusiness`
- Inconsistent schemas across locations

**Better Structure:**
```json
{
  "@type": "LocalBusiness",
  "additionalType": "HomeAndConstructionBusiness",
  "name": "Capitol Improvements - Bowie",
  "address": {...},
  "aggregateRating": {...}
}
```

### 8. GALLERY/VIDEO GALLERY
**Priority: LOW**

**Gallery:** ✅ `ImageGallery` appropriate
**Video Gallery:** ✅ `CollectionPage` works
**Missing:** Individual `ImageObject`/`VideoObject` for each item

### 9. CALCULATORS (Roofing Cost, Commercial)
**Priority: LOW**

**Current:** No schemas prepared
**Should Have:** `WebApplication` or `SoftwareApplication`
**Rationale:** Cost calculators are interactive tools

### 10. SERVICE AREA & CITY PAGES
**Priority: MEDIUM**

**Service Areas Page:** ✅ `WebPage` appropriate
**Individual City Pages:** No schemas prepared - should have `Service` with specific `areaServed`

---

## Priority Recommendations

### HIGH Priority (Immediate Impact)
1. **Homepage**: Add `Organization`, `AggregateRating`, remove `Product`
2. **Location Pages**: Standardize to `LocalBusiness` schemas
3. **Contact Page**: Add individual location `LocalBusiness` schemas
4. **Main Service Pages**: Complete `Service` schemas with all properties

### MEDIUM Priority (Next Phase)
1. **Testimonials**: Individual `Review` schemas
2. **BreadcrumbList**: Add to all pages
3. **Service Subpages**: Complete `Service` schemas
4. **City-Specific Service Pages**: Add `Service` schemas

### LOW Priority (Future Enhancement)
1. **FAQPage**: Add to relevant service pages
2. **Video/Image Objects**: Individual media items
3. **WebApplication**: Calculator pages

### Global Fixes Needed
1. Remove all irrelevant `Product` schemas
2. Add consistent `BreadcrumbList` across site
3. Create site-wide `Organization` schema
4. Leverage 445+ reviews in `AggregateRating` schemas

This schema strategy will significantly improve local SEO visibility and rich snippet opportunities for Capitol Improvements.