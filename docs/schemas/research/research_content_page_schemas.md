# Content Page Schemas

### 1. About page - company history, founding story
**Ideal @type:** `AboutPage` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `Organization` or `HomeAndConstructionBusiness` (with `foundingDate`, `founder`, `description` for history/story)[2][4]  
- `breadcrumb`: `BreadcrumbList`[1]  
- `primaryImageOfPage`: `ImageObject` (company photo)[1]

### 2. Team page - employees with roles
**Ideal @type:** `ProfilePage` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `ItemList` of `Person` (with `name`, `jobTitle`, `worksFor` linking to `Organization`)[1][4]  
- `breadcrumb`: `BreadcrumbList`[1]  
- `primaryImageOfPage`: `ImageObject` (team photos)[1]

### 3. Testimonials page - customer reviews (445+ five-star reviews)
**Ideal @type:** `WebPage` (with `Review` collection)[1]  
**Key properties:**  
- `mainEntity`: `ItemList` of `Review` (with `reviewRating` as `Rating`, `author` as `Person`, `reviewBody`, `reviewRating.value` for stars)[1]  
- `aggregateRating`: `AggregateRating` (e.g., `ratingValue: 5`, `reviewCount: 445`)[1]  
- `breadcrumb`: `BreadcrumbList`[1]

### 4. Gallery page - project photos
**Ideal @type:** `CollectionPage` or `ImageGallery` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `ItemList` of `ImageObject` (with `contentUrl`, `caption` for projects)[1]  
- `primaryImageOfPage`: `ImageObject` (featured project)[1]  
- `breadcrumb`: `BreadcrumbList`[1]

### 5. Blog page - articles about home improvement
**Ideal @type:** `CollectionPage` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `ItemList` of `BlogPosting` (with `headline`, `datePublished`, `author`, `image`)[1]  
- `breadcrumb`: `BreadcrumbList`[1]  
- `keywords`: Text (e.g., "home improvement")[1]

### 6. Video gallery - YouTube videos of projects
**Ideal @type:** `CollectionPage` (subtype of WebPage)[1][3]  
**Key properties:**  
- `mainEntity`: `ItemList` of `VideoObject` (with `name`, `thumbnailUrl`, `contentUrl` from YouTube, `description`)[1]  
- `video`: `VideoObject` (embedded videos)[1]  
- `breadcrumb`: `BreadcrumbList`[1]

### 7. Contact page - phone, email, form
**Ideal @type:** `ContactPage` (subtype of WebPage)[1][3][7]  
**Key properties:**  
- `mainEntity`: `Organization` or `HomeAndConstructionBusiness` (with `telephone`, `email`, `contactPoint` as `ContactPoint`, `address` as `PostalAddress`)[1][2]  
- `breadcrumb`: `BreadcrumbList`[1]  
- `potentialAction`: `ContactAction` (for form)[1]

### 8. Financing page - payment options ($99/mo)
**Ideal @type:** `WebPage` (financial services focus)[1]  
**Key properties:**  
- `mainEntity`: `Service` or `Offer` (with `name: "Financing"`, `priceSpecification` as `PriceSpecification` e.g., `price: "99"`, `priceCurrency: "USD"`, `eligibleDuration` for monthly)[2][5]  
- `provider`: `HomeAndConstructionBusiness`[2]  
- `breadcrumb`: `BreadcrumbList`[1]

### 9. Warranty page - warranty information
**Ideal @type:** `WebPage`[1]  
**Key properties:**  
- `mainEntity`: `WarrantyPromise` (with `name`, `description`, `warrantyScope`, `durationOfWarranty`)[1]  
- `offeredBy`: `HomeAndConstructionBusiness`[2]  
- `breadcrumb`: `BreadcrumbList`[1]

### 10. Cost calculator pages - interactive tools
**Ideal @type:** `WebPage`[1]  
**Key properties:**  
- `mainEntity`: `WebApplication` (with `name`, `description`, `offers` linking to `Service`, `featureList` for calculator functions)[3]  
- `provider`: `HomeAndConstructionBusiness`[2]  
- `breadcrumb`: `BreadcrumbList`[1]

All pages should include site-wide `Organization` or `HomeAndConstructionBusiness` in the header (with `name`, `address`, `telephone`, `makesOffer` as `Service` list) and common `WebPage` properties like `url`, `mainEntityOfPage`[1][2]. Use JSON-LD format.[6]