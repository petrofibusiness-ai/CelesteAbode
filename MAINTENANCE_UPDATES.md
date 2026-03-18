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

### Flats in Ghaziabad page
46. **New page:** `/flats-in-ghaziabad` — hero (H1 "Flats in Ghaziabad"), no listing grid, content-only SEO landing with two-column layout on desktop: main content on the left, sticky consultation sidebar on the right.
47. **Content:** 10 SEO blocks covering flats in Ghaziabad for modern living, why work with consultants, Indirapuram-focused section (ready-to-move, 3 BHK, amenities), services for flat buyers, top locations (Indirapuram, Vaishali, Vasundhara), how Celeste Abode helps, why Celeste is trusted, and benefits of professional property dealers; 4 FAQs with full advisory answers; dark CTA.
48. **SEO & nav:** Layout metadata, canonical, Open Graph, Twitter; BreadcrumbSchema, WebPageSchema, FAQPageSchema; sitemap entry (monthly, 0.8); footer "Flats in Ghaziabad" link under Locations.

### Commercial and Residential Property in Lucknow page
49. **New page:** `/commercial-and-residential-property-in-lucknow` — hero (H1 "Invest in Residential and Commercial Property in Lucknow" / second line "with Expert Real Estate Consultants"), no listing grid, content-only SEO landing; two-column layout on desktop with main content on the left and sticky consultation sidebar on the right.
50. **Content:** 10 SEO blocks covering combined residential + commercial narrative: why invest in Lucknow, residential formats (flats, villas, premium projects), commercial formats (office, retail, pre-leased), consulting services, how Celeste Abode helps, and benefits of working with consultants; 4 FAQs with full advisory answers; dark CTA.
51. **SEO & nav:** Layout metadata, canonical, Open Graph, Twitter; BreadcrumbSchema, WebPageSchema, FAQPageSchema; sitemap entry (monthly, 0.8); footer "Commercial & Residential Property in Lucknow" link under Locations.

### Logo & assets (R2)
52. **Logo:** Site logo switched to R2 URL `https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp`; all references updated (header, footer, blog layout, structured data). Local `public/logoceleste.avif` removed; obsolete Cache-Control header for `/logoceleste.avif` removed from `next.config.mjs`.

### Structured data (LocalBusiness / RealEstateAgent)
53. **LocalBusinessSchema:** Updated to RealEstateAgent with direct logo URL, address (Galaxy Blue Sapphire Plaza, Sector 4, Greater Noida West), geo (28.607256, 77.4354391), opening hours Mon–Sat 09:00–18:00, sameAs (Instagram, LinkedIn), priceRange "₹". Description and areaServed (Noida, Greater Noida, Gurugram, Delhi, Ghaziabad, Yamuna Expressway) retained.

### Hero images — location landing pages (R2 webp)
54. **Flats for Sale in Greater Noida:** Hero image (and WebPageSchema image) set to R2 webp: `flat-for-sale-in-greater-noida/flat-for-sale-in-greater-noida.webp`. Replaces local `/GREATER NOIDA.avif`.
55. **Flats for Sale in Noida:** Hero and schema image set to R2 webp: `flat-for-sale-in-noida/flat-for-sale-in-noida.webp`. Replaces local `/NOIDA.avif`.
56. **Residential Property in Noida:** Hero and schema image set to R2 webp: `residential-property-in-noida/residential-property-in-noida.webp`. Replaces local `/NOIDA.avif`.
57. **Commercial Property in Noida:** Hero and schema image set to R2 webp: `commercial-property-in-noida/commercial-property-in-noida.webp`. Replaces local `/NOIDA.avif`.
58. **Flats in Ghaziabad:** Hero and WebPageSchema image set to R2 webp: `flats-in-ghaziabad/flats-in-ghaziabad.webp`. Replaces local `/GHAZIABAD.avif`.
59. **Commercial and Residential Property in Lucknow:** Hero and WebPageSchema image set to R2 webp: `commercial-and-residential-property-in-lucknow/commercial-and-residential-property-in-lucknow.webp`. Replaces local `/LUCKNOW.avif`.

### Hero — full viewport (property-in pages)
60. **Property-in hero height:** All property-in and location landing hero sections use full viewport height. Dynamic `properties-in/[locationCategory]` hero updated from `min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen` to `min-h-screen` at all breakpoints so the hero image is always full viewport. Static pages (residential/commercial property in Noida, flats for sale in Noida/Greater Noida, flats in Ghaziabad, commercial-and-residential in Lucknow) already used `min-h-screen`.

### Search engine verification
61. **Bing Webmaster verification:** Meta tag `<meta name="msvalidate.01" content="B8F3AC31F09EF60F080EB603250077D8" />` added to `app/layout.tsx` under Search Engine Verification comment block.
62. **BingSiteAuth.xml:** Created `public/BingSiteAuth.xml` with Bing verification code for file-based verification method (alternative to meta tag).

### Structured data — alignment & cleanup
63. **OrganizationSchema:** Phone format updated to `+91 9818735258`; sameAs restricted to Instagram and LinkedIn only (removed Facebook, Twitter); Lucknow added to areaServed.
64. **LocalBusinessSchema:** Added `addressRegion: "Uttar Pradesh"`; geo coordinates aligned to `28.6076655, 77.4354885` (same as metadata.ts); added `Noida Expressway` and `Lucknow` to areaServed.
65. **BrandSchema:** sameAs restricted to Instagram and LinkedIn; aggregateRating removed (no verified reviews to display).
66. **Slogan & description alignment:** All schemas (Organization, WebSite, LocalBusiness, Brand) and `public/llms.txt` updated to use canonical slogan and description matching `app/metadata.ts` and homepage hero copy.
67. **Shared structured-data helpers:** Centralised all JSON-LD helpers in `lib/structured-data.tsx` (Organization, LocalBusiness, WebSite, Brand, Property, FAQPage, ItemList, CollectionPage, Service, Article, WebPage, LocationPage, Blog) so all pages reuse a single, consistent schema implementation.

### Homepage refactor — Brand Intro section
67. **H2 updated:** Changed from "Real Estate Consulting Built for Delhi NCR Property Decisions" to "Best Real Estate Consultants in Delhi NCR for Smart Property Investment".
68. **Two-column layout:** Left column (lg:col-span-5) contains H2 only; right column (lg:col-span-7) contains two paragraphs. Content reordered — strong opener ("Most buyers in the NCR commit...") moved to first position.
69. **SEO bolding removed:** All `<span>` keyword bolding removed from body text for cleaner reading.
70. **CTA removed:** "Book a free consultation" link and ArrowRight icon removed from Brand Intro.
71. **Proof strip — full width:** 3-item KPI strip (No developer tie-ups, RERA-verified shortlists only, Involved from visit to possession) moved outside two-column grid to span full container width with border-top separator.
72. **KPI layout:** Title on one line, description on line below (not inline with em-dash); proper vertical alignment with icon.

### Homepage refactor — sections removed
73. **PropertyEvaluationSection removed:** "How Property Decisions Should Feel" section and component completely removed from homepage (`app/page.tsx` and `components/property-evaluation-section.tsx` deleted).
74. **VaultTeaser removed:** Celeste Abode Vault teaser section removed from homepage.

### Homepage refactor — SEO blocks section
75. **New component:** `components/homepage-seo-blocks.tsx` — 5 SEO content blocks placed after Who We Serve (Buyer Types) section.
76. **Block structure:** Each block has centered H2 (with gold keyword highlight), optional subtext paragraph, and white card with H3 sub-sections and body content.
77. **Block order:** (1) Trusted Property Consultant in Noida & Delhi NCR, (2) Our Real Estate Consulting Services in Delhi NCR, (3) Best Real Estate Property Consultant in Noida for Buyers & Investors, (4) Explore Properties with Real Estate Consultants in Delhi NCR, (5) How Our Property Consultants Help You Buy the Right Property.
78. **Progressive expand:** Block 1 always visible; "Read More" reveals one block at a time with blur overlay above button; "Show Less" collapses all blocks back to initial state.
79. **Button layout:** Equal-width buttons (w-40/w-44); "Read More" on left, "Show Less" on right; subtle hover transitions.
80. **Blur overlay:** Gradient blur (`bg-gradient-to-t from-background via-background/80 to-transparent`, height 64) positioned above buttons when content is collapsed.
81. **Fade animation:** New blocks appear with `animate-fadeIn` (0.4s ease-out, translateY 12px → 0) defined in `app/globals.css`.
82. **Internal linking:** 1–3 internal links per sub-section, naturally embedded within sentences (not at end); links to `/flats-for-sale-in-noida`, `/commercial-property-in-noida`, `/plots-in-noida`, `/residential-property-in-noida`, `/villa-in-noida`, `/properties`, `/advisory-session`, `/real-estate-consulting-services`, `/real-estate-insights`, `/flats-for-sale-in-greater-noida`, `/flats-in-ghaziabad`, `/commercial-and-residential-property-in-lucknow`, `/advisory-philosophy`, `/contact`.
83. **SEO fix — content in page source:** All 5 blocks always rendered in DOM; visibility controlled via CSS (`opacity-0 max-h-0 overflow-hidden invisible` vs `opacity-100 max-h-[5000px] visible`) instead of conditional rendering. Ensures search engines see all content on first crawl.

### Homepage refactor — Who We Serve (Buyer Types)
84. **Content updated:** All 6 buyer type descriptions (First-Time Home Buyers, Property Investors, NRIs & Overseas Buyers, Corporate Organisations, Working Professionals, Real Estate Developers) rewritten with full advisory copy emphasizing verification, due diligence, and Celeste Abode's process.

### Homepage refactor — Why Clients Trust section
85. **H2 updated:** Changed from "Why Clients Trust Celeste Abode" to "Why Choose Celeste Abode as Your Real Estate Consultant".
86. **Intro updated:** New paragraph emphasizing verification process before site visits.
87. **Trust pillars updated:** All 6 cards rewritten with new titles and content: (1) RERA Verification First, (2) Independent Advisory, (3) Market Data, Not Assumptions, (4) Full Documentation Support, (5) Post-Booking Involvement, (6) No Pressure, No Pitch.

### Homepage refactor — Value Propositions section
88. **Description updated:** Changed to "Every number here comes from verified transactions across Noida, Greater Noida, and Delhi NCR. No projections, no estimations."

### Technical SEO documentation
89. **New file:** `TECHNICAL_SEO_STATIC_PAGES.txt` created — comprehensive record of technical SEO for all static pages (Home, Services, Philosophy, About, Contact, Terms, Privacy, Blog, Properties, Advisory Session, Location pages). Documents meta title/description, canonical, Open Graph, Twitter cards, structured data schemas, and internal linking for each page.

### Read More component refactor — all landing pages
90. **SeoBlocksRevealController redesigned:** Component completely rewritten to match homepage SEO blocks UX. New features: progressive reveal (one block at a time), blur overlay above buttons, side-by-side Read More / Show Less buttons with equal widths (w-40/w-44), fade animation (`fadeInUp`) for newly revealed blocks.
91. **Floating pill removed:** Old floating "Close section" pill replaced with inline "Show Less" button next to "Read More". Cleaner, more intuitive UX.
92. **Button styling:** Both buttons use identical sizing and rounded-full styling. "Show Less" gets gold border styling when at last block; otherwise gray border with gold hover effect.
93. **All pages updated:** Changed `initialVisible={2} step={2}` to `initialVisible={1} step={1}` on all landing pages for progressive reveal:
    - `/flats-for-sale-in-noida` (7 blocks)
    - `/flats-for-sale-in-greater-noida` (7 blocks)
    - `/residential-property-in-noida` (8 blocks)
    - `/commercial-property-in-noida` (7 blocks)
    - `/flats-in-ghaziabad` (10 blocks)
    - `/commercial-and-residential-property-in-lucknow` (10 blocks)
    - `/properties-in/[locationCategory]` (dynamic, variable blocks)
94. **SEO preserved:** All content remains in DOM via CSS visibility control; search engines see all content on first crawl.

### Property-in dynamic pages — card width & styling aligned to homepage
95. **Container width:** Changed wrapper from `max-w-4xl` to `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for dynamic `properties-in/[locationCategory]` pages only.
96. **Card styling:** Updated to match homepage — `shadow-lg` (from `shadow-xl`), `border-gray-100` (from `border-gray-200`), padding `p-6 sm:p-8 md:p-10 lg:p-12`.
97. **Content width:** Removed `max-w-[700px] mx-auto` constraint; content now spans full card width with `w-full max-w-none` matching homepage.
98. **Typography:** Updated to homepage content class — `text-gray-700`, `leading-[1.8]`, full-width paragraphs and H3s via Tailwind child selectors.
99. **Separator styling:** Changed to match homepage — `w-32 md:w-48 h-px` gold gradient line.
100. **Static landing pages unchanged:** Pages like `/flats-for-sale-in-noida`, `/residential-property-in-noida`, etc. retain their `max-w-4xl` wrapper and original styling.

### Show Less — smooth scroll fix
101. **Production-ready collapse:** Fixed "Show Less" jarring scroll behavior. Now: (1) collapses content first, (2) waits 350ms for animation, (3) scrolls smoothly to section top with 100px header offset using `window.scrollTo()` instead of `scrollIntoView()`.
102. **Applied to both:** Fix applied to `SeoBlocksRevealController` (landing pages) and `HomepageSeoBlocks` (homepage).

### Homepage SEO blocks — styling refinements
103. **H2 font weight:** Changed from `font-bold` (700) to `font-semibold` (600) on all 5 SEO block headings to match Brand Intro section styling.
104. **Button spacing:** Reduced bottom margin below Read More/Show Less buttons from `mb-12 md:mb-16` (48px/64px) to `mb-3` (12px) for tighter layout.

### Homepage metadata — SEO update
105. **Meta title:** Changed to "Best Property Consultant in Noida | Real Estate Consultants Delhi NCR".
106. **Meta description:** Changed to "Celeste Abode is a trusted real estate consultant in Noida offering expert property consulting services across Delhi NCR for residential and commercial investments."
107. **OG tags:** Updated title, description, url (`https://www.celesteabode.com/`), image (`propertyhero.avif`), and image:alt ("Best Property Consultant in Noida").
108. **Twitter tags:** Updated title, description, image, and added image:alt ("Best Property Consultant in Noida").
109. **Keywords:** Updated to focus on "best property consultant Noida", "real estate consultants Delhi NCR", "property consulting services", "residential/commercial property investment".

### Landing pages metadata — SEO update (OG & Twitter images added)
110. **`/residential-property-in-noida`:** Title: "Residential Property in Noida | Buy Home & Property for Sale". OG/Twitter image: page hero webp, alt: "Property in Noida".
111. **`/commercial-property-in-noida`:** Title: "Commercial Property for Sale in Noida | Trusted Property Consultants". OG/Twitter image: page hero webp, alt: "Commercial Property for Sale in Noida".
112. **`/flats-for-sale-in-noida`:** Title: "Buy 2 & 3 BHK Flats for Sale in Noida | Best Property Consultants". OG/Twitter image: page hero webp, alt: "Flats for Sale in Noida - 2 & 3 BHK Apartments".
113. **`/flats-for-sale-in-greater-noida`:** Title: "Flats for Sale in Greater Noida | Buy 1/2/3 Bhk Flats & Apartments". OG/Twitter image: page hero webp, alt: "Flats for Sale in Greater Noida - 1/2/3 BHK Apartments".
114. **`/flats-in-ghaziabad`:** Title: "Buy Flats for Sale in Ghaziabad with Best Property Consultants". OG/Twitter image: page hero webp, alt: "Flats for Sale in Ghaziabad".
115. **`/commercial-and-residential-property-in-lucknow`:** Title: "Commercial Property for Sale in Lucknow | Best Property Consultant". OG/Twitter image: page hero webp, alt: "Commercial Property for Sale in Lucknow".

### Brand Intro — styling refinements
116. **Proof strip margin:** Reduced top margin from ~88-104px to ~44-52px. Changed grid `mb-12 md:mb-16` → `mb-6 md:mb-8` and proof strip `pt-10` → `pt-5`. Items now feel attached to content above.
117. **Key line highlight:** Added `font-semibold text-[#2B3035]` to "if something fails our checks, you hear that first." — gives reader's eye an entry point and emphasizes key differentiator.

### Blog metadata — SEO update
118. **Blog listing page (`/blog`):** Title: "Real Estate Blogs | Property Investment Guides & Market Insights". Description updated. OG/Twitter image: propertyhero.avif, alt: "Real Estate Blogs".
119. **Blog data structure:** Added `metaTitle`, `metaDescription`, `ogImage`, `ogImageAlt` fields to BlogPost type for custom SEO per article.
120. **`generateMetadata` updated:** Blog pages now use custom meta fields if available, with fallback to title/excerpt.

### Blog titles & banners updated (title = meta title)
121. **`/blog/is-noida-safe-to-buy-property-2026`:** "Is Investing in Noida Property a Smart Choice in 2026? Expert Guide"
122. **`/blog/yamuna-expressway-growth-corridor-delhi-ncr`:** "Why Yamuna Expressway is NCR's Next Real Estate Investment Hotspot"
123. **`/blog/noida-vs-greater-noida-investment-2026`:** "Noida or Greater Noida: Which is Better for Property Investment in 2026?"
124. **`/blog/jewar-airport-ncr-property-buyers-2026`:** "Jewar Airport Impact on NCR Real Estate: Investment Opportunities 2026"
125. **`/blog/forest-walk-villa-ghaziabad-luxury-living-2026`:** "Forest Walk Villa Ghaziabad: Luxury Villa Investment on NH-24"
126. **Banner consistency:** Removed special-case override for Forest Walk Villa; all blogs now use `post.title` for H1 banner.

### Property-in pages — hero & SEO block width
127. **Hero content width:** Increased hero text container from `max-w-4xl` to `max-w-5xl` on `properties-in/[locationCategory]` so H1 lines fit properly in two lines.
128. **SEO block container:** Reduced SEO blocks wrapper from `max-w-7xl` to `max-w-6xl` on property-in dynamic pages to remove excess left/right white space around cards.

### Property-in hero — hydration fix
129. **Hero markup:** Hero text and subtext wrappers changed from `<h1>` and `<p>` to `<div>` because DB `heroText`/`heroSubtext` already contain `<h1>`/`<p>` tags. Prevents invalid nested headings and hydration mismatch. H1 remains in page source (inside injected HTML).

### Homepage — KPI cards section
130. **New component:** `components/kpi-cards.tsx` — three trust cards (No developer tie-ups, RERA-verified shortlists only, Involved from visit to possession) with black background, golden gradient icons and titles, gray description text.
131. **Placement:** KPI cards placed directly after BrandIntro on homepage; reduced BrandIntro bottom padding and KPI section top padding so cards read as the “banner” under the intro.
132. **Proof strip removed:** The three-item proof strip (icon + title + description) removed from BrandIntro; KPI cards now carry that content in card form.
133. **Animation:** Desktop animation — left card enters from left (x: -80 → 0), center card scales in (scale 0.92 → 1), right card enters from right (x: 80 → 0). Stagger 0.12s, ease [0.25, 0.1, 0.25, 1].

### Homepage — Brand Intro copy & highlights
134. **Para 1 (buyer pain):** New copy — “Buying property in the NCR means navigating title irregularities, developers with delayed delivery records, and circle rate revisions… discoveries made after the decision is already done.” No highlights (plain text).
135. **Para 2 (Celeste positioning):** New copy — “That is exactly what Celeste Abode, your trusted real estate consultant in NCR, was built to prevent…” with verification and “If something fails our checks, you hear that first.” Only two highlights: gold for “Celeste Abode, your trusted real estate consultant in NCR”; black bold for “If something fails our checks, you hear that first.”

### Admin panel — property price fields (bigint + validation)
136. **Price fields replaced:** Single "Price Range" field removed; replaced with **Min Price**, **Max Price**, and **Display Price**. Stored in `properties_v2` as `price_min` (bigint), `price_max` (bigint), and `price_unit` (text). Empty values are persisted as NULL (no empty string for bigint columns).
137. **Types and validation:** `priceMin` and `priceMax` are typed and handled as **numbers** (bigint) across the app: `types/property.ts`, `lib/supabase-property-mapper.ts`, `lib/validation-schemas.ts`, `lib/validation.ts`, admin POST/PATCH/draft routes, and `lib/structured-data.tsx` (PropertySchema). Display price (`priceUnit`) remains text. API and Zod schemas coerce string input from the client to number where needed.
138. **Max ≥ min check:** When both min and max are set, **max price must be greater than or equal to min price**. Enforced in: PropertyDataSchema and draft schema (Zod refine), `validatePropertyData` (PATCH), and admin form (client-side validation, error under Max Price, Save disabled until valid). If either value is NULL, the comparison is not applied.

### Homepage — Testimonials & Google Reviews widget
139. **Elfsight reliability:** Simplified Elfsight Google Reviews widget init logic (single, debounced init + proper `elfsight:ready` cleanup) to fix intermittent "widget not showing" issues and added a graceful fallback when reviews fail to load.
140. **Smoother load:** Updated testimonials section to show a premium loading animation and then fade/slide in the reviews card as one unit so users don’t see the widget building in parts on slower networks.

### Homepage — Instagram & header tweaks
141. **Instagram section:** Added `InstagramEmbedsSection` to the homepage with three Instagram reels displayed side by side on desktop and as a swipeable carousel on mobile. Includes a “Follow us on Instagram” kicker and linked handle `@celesteabode`.
142. **Instagram styling:** Created luxury-styled cards (rounded, bordered, subtle shadow) for the embeds, using the shared `Carousel` component and a CSS-only fade-in for the iframe so loading looks smooth.
143. **Header phone cleanup:** Removed the desktop phone capsule and the phone link from the mobile menu footer; the main header CTAs are now navigation and the “Contact Us” capsule on the right.
144. **Sticky social icons:** Updated the desktop sticky icons so Instagram, Facebook and LinkedIn are in a bottom-left vertical stack; WhatsApp and Call buttons are in a bottom-right vertical stack above the chatbot trigger, with even spacing.

### Blog — Upcoming luxury projects article
145. **New blog post:** Added `upcoming-luxury-projects-noida-greater-noida-2026` under `/blog`, with metadata configured via `lib/blog-data.ts` and a new content component `UpcomingLuxuryProjectsNoidaGreaterNoidaContent`.
146. **Content & SEO:** Wrote a 1500–2000 word article in simple language covering Sobha (Noida Extension), Trump Towers Noida, Smart World Elie Saab, CRC Joyous, Eternia Residences, M3M Jacob & Co, Renox Thrive, VVIP Sector 12, VVIP Yamuna Expressway and Irish Platinum. Clear H1/H2/H3 structure, internal links to each live property page, and corridor links for “properties in Noida”, “properties in Greater Noida” and “properties on Yamuna Expressway”.
147. **In-article hero images:** For each project with a live property page, added a 16:9 hero image block using the same R2 assets (`trump-towers-noida`, `smart-world-es-residencies`, `jacob-and-co`, `crc-joyous`, `renox-thrive`, `eternia-residences`, `vvip`, `irish-platium`, `vvip-yamuna-expressway`), with keyword-based alt text and consistent layout.
148. **Blog hero image:** Updated the blog hero for this article to use `/hero-.avif` from `public`, aligned bottom within the full-height hero container for consistency with other landing pages.
149. **Article lead form copy:** Updated `ArticleLeadForm` copy used on all blog posts: heading “Talk to a real advisor” and neutral subtext inviting readers to share what they are planning so advisors can respond with clear next steps, project ideas and checks — suitable for investment, guidance and project-spotlight articles.

### Technical SEO — favicon + 404 metadata consistency
150. **SERP favicon fix:** Corrected `site.webmanifest` icon paths to point to `/favicon_celeste/...` assets and added `metadata.icons` in `app/layout.tsx` so crawlers and browsers consistently pick up the site icon (tab, PWA, and Google SERP).
151. **404 meta consistency:** Standardised “not found” metadata across the site so all 404s return the same title + description as `app/not-found.tsx` (fixed for `properties-in/[locationCategory]`, `properties-in/[locationCategory]/[slug]`, and `blog/[slug]` where missing slugs previously returned “Location/Property/Article Not Found”).

---

## How to use this doc

- **Each month:** Add a new `## Month YYYY` section at the top (above the previous month).
- **One line per change:** Short, actionable; no long paragraphs.
- **Group by type:** e.g. New page & SEO, Hero & above-the-fold, Content blocks, UX, Layout, Components.
- **Client-ready:** Focus on what changed from a user/product perspective; avoid internal ticket IDs unless the client uses them.
