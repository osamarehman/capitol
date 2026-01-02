To create a Product Requirements Document (PRD) for your website concept, here's a clear structure addressing the core features, user journey, and potential future enhancements you described.

## Purpose

Enable users who click a Facebook ad to land on a website where they can input their address. After doing so, the site will show their home using Google Street View. Optionally, the system could later support images from Apple, Zillow, or other sources, and trigger post-sale/post-lead actions like sending postcards to those who do not convert.

## Core User Flow

1. **Ad Click Landing:**  
User clicks a Facebook ad and lands on the address input page.
2. **Address Submission:**  
User enters their home address into a form field.
3. **Street View Display:**  
The site displays the Google Street View image of the address when available.
4. **Notification/Conversion Tracking:**  
If the user does not purchase or convert, trigger a sequence to send a follow-up postcard.

## Key Product Requirements

### Landing and Address Input
- Responsive, fast-loading landing page directly linked from Facebook ads.
- User-friendly address entry form with real-time suggestions/autocomplete (Google Places API).
- Clear and concise headline ("See your home on Google Street View!" or similar).

### Street View Integration
- Fetch and display Street View imagery for the entered address using the [Google Street View API].
- Graceful fallback if Street View imagery is unavailable (show error message or map).
- Optional toggle or onboarding step for showing how public data of their house appears online.

### Post-Entry Flow
- Display messaging around home visibility (e.g., "Your home is visible online!").
- Optional: Educate about public data access and privacy options.

### Conversion and Postcard Follow-up
- Track conversions (form submission/purchase).
- When a visitor does not convert, trigger automated postcard dispatch using the existing backend automation workflow.
- Seamless handoff between site and postcard automation (e.g., integrate via webhook, API, or existing CRM system).

### Future Enhancements (Next Phase)
- Integrate additional map/imagery sources (Apple Maps Look Around, Zillow, etc.).
- Scan and aggregate availability of images from multiple platforms; display results or badges ("Visible on: Google, Apple, Zillow").
- Customize follow-up messaging or offers based on visibility status.

## Technical Considerations

- **Google Street View**: Most robust for initial launch; Apple and Zillow APIs have varying levels of public accessibility and developer support.
- **Address Autocomplete**: Use Google Places or similar for best user experience.
- **Privacy/Ethics**: Clearly inform users what data is being shown and its public availability.
- **Tracking and Analytics**: Implement event tracking for user interactions to optimize ad and postcard campaigns.

## Optional Table: Overview of Image Providers

| Provider    | Feature Name       | Availability         | API Access         | Next Steps             |
|-------------|-------------------|----------------------|--------------------|------------------------|
| Google      | Street View        | Global (most areas)  | Yes (Paid)         | Primary integration    |
| Apple       | Look Around        | Limited cities/US/EU | Limited (Private)  | Assess developer access|
| Zillow      | Property Photos    | US only, limited     | No direct images   | Explore scraping/data  |

This structure gives stakeholders and developers clear requirements, technical expectations, and a logical roadmap for expanding capabilities in phases. Each step supports conversion tracking and post-lead engagement, as planned.

***
https://developers.google.com/maps/documentation/streetview/overview