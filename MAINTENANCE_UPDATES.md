# Website Maintenance & Updates Log

*Monthly log of website updates for client handover. Add new entries under the latest month; keep pointers crisp and development-focused.*

---

## March 2026

*This month's work focused on a new residential-property landing page, improved content UX, and a sticky consultation sidebar to convert readers without breaking the flow.*

### Flats for Sale in Greater Noida page
43. **New page:** `/flats-for-sale-in-greater-noida` — same structure as flats-in-Noida: hero (H1 "Flats for Sale in Greater Noida — Buy Apartments in Greater Noida"), listing (filters + grid, apartments only), gold line, two-column layout with sticky consultation sidebar on the **left** (`lg:grid-cols-[360px_1fr]`).
44. **Content:** 7 SEO blocks — Explore best flats, Apartments for modern living (gated / luxury / affordable), Buy studio apartment (compact for investment, near commercial hubs), BHK flat (1 BHK, 2 & 3 BHK), Top locations (Greater Noida West, Yamuna Expressway), Why buy flats (connectivity, infrastructure, appreciation), Why Celeste Abode (consultants, verified listings, buying assistance); expand/collapse and gold separators; 3 FAQs with full advisory copy; dark CTA "Ready to Buy a Flat in Greater Noida?"
45. **SEO & nav:** Layout metadata, canonical, Open Graph, Twitter; BreadcrumbSchema, WebPageSchema, FAQPageSchema; sitemap entry (monthly, 0.8); footer "Flats for Sale in Greater Noida" under Locations.

### New page & SEO
1. **New page:** `/residential-property-in-noida` — dedicated landing for buying residential property in Noida (apartments, villas, luxury).
2. **Sitemap:** New URL added with monthly change frequency and priority 0.8.
3. **Structured data:** BreadcrumbSchema, WebPageSchema, and FAQPageSchema implemented for the page.
4. **Meta & share:** Canonical URL, Open Graph, and Twitter cards set in layout; meta title and description aligned with H1 and intro.
5. **Footer:** "Residential Property in Noida" link added under the Locations column.

### Hero & above-the-fold
6. **Hero:** Full-viewport hero image; H1 only (no sub-paragraph); single gold highlight on "Residential Property in Noida" for clarity.
7. **Listings:** Residential-only listings (apartments + villas) via API filter; filters and grid placed directly under hero with no extra heading or paragraph.
8. **API:** Search endpoint updated to support `propertyType=residential` (apartments and villas only).

### Content blocks & typography
9. **Content blocks:** 8 SEO sections, each with a centred H2 and one white card; one key phrase per H2 highlighted in gold.
10. **Typography:** Line-height 1.75, max text width 700px, gold drop cap on the first paragraph of each card; content centred within the card.
11. **Card width:** Content cards constrained to `max-w-4xl` for a tighter, editorial feel.
12. **Separators:** Gold gradient lines only between revealed blocks (hidden until those blocks are visible); no line after the FAQ section.

### Expand/collapse UX
13. **Read more:** "Read more" expands blocks in steps; separators appear only for revealed content.
14. **Floating close:** Sticky "Close section" pill (gold, glass style) at bottom-center of viewport when expanded — always visible for quick exit.
15. **On close:** Auto-scroll to the top of the content section when closing, so the user is not left mid-page; inline "Read less" button removed in favour of the floating pill.

### Two-column layout & consultation sidebar (desktop)
16. **Two-column layout:** Main content (SEO blocks + FAQ) on the left; consultation sidebar on the right (360px), desktop only.
17. **Sticky sidebar:** "Tell Us What You Need. We'll Do the Rest." card with subtext: consultants shortlist, verify, and walk you through every option before you visit a single site. Sticks from the "Explore…" H2 down to the last FAQ (stops before footer CTA).
18. **Spacing:** Sidebar uses `top-28`, `max-h-[calc(100vh-8rem)]`, and `my-2` so it does not sit under the header when sticky and the card fits in the viewport with spacing from top and bottom; scrolls inside the card if needed.
19. **FAQ:** Same pattern as property-in pages (centred heading + LocationFAQs); 4 Q&As with schema for rich results.

### Components & code
20. **LocationPropertyFilters:** Optional `hidePropertyType` and `defaultPropertyType` for residential-only pages.
21. **NoidaPropertiesGrid:** Optional `defaultPropertyType` to lock the grid to residential.
22. **SeoBlocksRevealController:** Separators hidden until blocks are revealed; floating Close pill; scroll-to-top on close.
23. **ConsultationSidebar:** New component for the sticky consultation card (headline, short copy, LocationContactForm replaced by ResidentialStickyForm).
24. **ResidentialStickyForm:** Custom sticky form — Name, Phone, Property Type (2 BHK / 3 BHK / 4 BHK+ / Villa / Plot), Your Budget (50L–5 Cr+), Timeline (Ready now / 6 months / 1 year / Researching). Submit: "Request a Callback"; line below: "One call. No obligation." Submits to `/api/location-contact` with message built from dropdowns; success state shows thank-you with 12–24 hour callback note.

### Sidebar variant & headline update
25. **ConsultationSidebar variant:** Optional prop `variant="residential" | "commercial"`; when commercial, renders CommercialStickyForm and commercial subtext; default remains residential.
26. **Sidebar headlines:** Residential: "Get a Verified Shortlist—No Guesswork." Commercial: "Commercial Advice. No Pitch, No Pressure." (replaced single "Tell Us What You Need…" line.)

### Commercial property page (no listing)
27. **New page:** `/commercial-property-in-noida` — hero with H1 (gold "Commercial Property in Noida"), 7 SEO blocks (Explore best commercial, Expert consultants, For every business need, Top locations, Why invest, How experts help, Why Celeste Abode), 4 FAQs, dark CTA ("Talk to a Commercial Advisor"). No property grid; same two-column layout and expand/collapse as residential.
28. **CommercialStickyForm:** Name, Phone, Property Type (Office Space / Retail & Showroom / Mixed-use / Other), Budget, Timeline; same "Request a Callback" / "One call. No obligation."; posts to `/api/location-contact`; used on commercial page via sidebar variant.
29. **Commercial SEO & nav:** Layout metadata, canonical, Open Graph, Twitter; BreadcrumbSchema, WebPageSchema, FAQPageSchema; sitemap entry (monthly, 0.8); footer "Commercial Property in Noida" under Locations.

### FAQ content updates
30. **Residential FAQs:** All four answers updated to full advisory copy — Noida good for most NCR buyers (location qualifier), price band Rs 4,500–15,000 per sq ft and mid-segment detail, sector choice by buyer type (150 / 75–78 / Greater Noida West), safe purchase steps (RERA, delivery record, agreement review, mutation; Celeste Abode role).
31. **Commercial FAQs:** All four answers updated to full advisory copy — yield vs residential and vacant-risk qualifier, price by asset/zone (Expressway office, retail, Noida Extension entry), location by objective (Expressway / 62 & 18 / Extension), safe purchase (RERA, plan/use category, builder clauses, actual occupancy; Celeste Abode role).

### Flats for sale in Noida page
32. **New page:** `/flats-for-sale-in-noida` — same structure as residential: hero (H1 "Flats for Sale in Noida — Buy the Best Flats in Noida"), then listing (filters + grid), then content. Listing shows flats only via `defaultPropertyType="apartments"` (Apartment/Flats); hidePropertyType; initial fetch and search API filter to apartments only.
33. **Sidebar on left:** Two-column layout uses `lg:grid-cols-[360px_1fr]` with ConsultationSidebar in the first column (left), content in the second. Same sticky form as residential (variant="residential"); only column order differs from residential/commercial pages.
34. **Content:** 7 SEO blocks (Find best flats for modern living, Buy with expert consultants, 2 BHK for sale, 3 BHK for sale, Top locations, Why buy flats in Noida, Why Celeste Abode); expand/collapse and gold separators as on residential; 4 FAQs with FAQPageSchema; dark CTA "Ready to Buy a Flat in Noida?"
35. **Flats SEO & nav:** Layout metadata, canonical, Open Graph, Twitter; BreadcrumbSchema, WebPageSchema, FAQPageSchema; sitemap entry (monthly, 0.8); footer "Flats for Sale in Noida" under Locations.
36. **Flats FAQs:** All four answers updated to full advisory copy — average price by sector/config (Greater Noida West 2 BHK, mid-Noida, Expressway 3 BHK), best sector by goal (budget/families/investors/premium), investment case (127% rise, fundamentals, zone/developer selection), how to choose (RERA, delivery record, payment milestones, site visit, agreement review, title/approvals, comparables; Celeste Abode checks).

### Social media integration (sticky + mobile menu)
37. **Desktop — left-side sticky:** Instagram, LinkedIn, and WhatsApp buttons added as a sticky vertical stack on the **left** side of the viewport, vertically centered (`fixed left-4 sm:left-6 top-1/2 -translate-y-1/2`). Order top to bottom: Instagram (gradient brand colors), LinkedIn (#0A66C2), WhatsApp (#25D366). Links: instagram.com/celesteabode, linkedin.com/company/celeste-abode, wa.me/919818735258. **Hidden on mobile** (`hidden md:flex`).
38. **Desktop — right-side unchanged:** Call (green, tel link) and Chatbot (Property Advisor) buttons remain sticky on the right corner; no social icons on the right.
39. **Mobile — in menu bar:** On viewports below `md`, the three social links (Instagram, LinkedIn, WhatsApp) appear **inside the header mobile menu**, directly **below "Contact Us"**, in a **horizontal row** with brand-colored circular icons. Tapping a link opens the target and closes the menu. Implemented in `components/header.tsx` (mobile nav) and `components/chatbot.tsx` (desktop sticky left stack).

### Header capsules (desktop)
40. **Phone capsule — left:** Desktop-only capsule on the **left** side of the header: mobile number (+91 9818735258) in a **black background**, **gold border** (`border-2 border-[#CBB27A]`), rounded-full, `tel:` link. Not shown on mobile.
41. **Capsule width and height:** Both header capsules (phone left, Contact Us right) use the **same width** (`w-[180px] min-w-[180px]`) and **same height** (`h-10` = 40px); content centered with flex. Contact Us capsule remains gold gradient on the right.
42. **Contact Us capsule — black text:** "Contact Us" label in the right capsule changed from white to **black text** (`text-black`) for contrast on the gold gradient background.

---

## How to use this doc

- **Each month:** Add a new `## Month YYYY` section at the top (above the previous month).
- **One line per change:** Short, actionable; no long paragraphs.
- **Group by type:** e.g. New page & SEO, Hero & above-the-fold, Content blocks, UX, Layout, Components.
- **Client-ready:** Focus on what changed from a user/product perspective; avoid internal ticket IDs unless the client uses them.
