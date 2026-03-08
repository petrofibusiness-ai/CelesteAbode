# Website Maintenance & Updates Log

*Monthly log of website updates for client handover. Add new entries under the latest month; keep pointers crisp and development-focused.*

---

## March 2026

*This month’s work focused on a new residential-property landing page, improved content UX, and a sticky consultation sidebar to convert readers without breaking the flow.*

### New page & SEO
1. **New page:** `/residential-property-in-noida` — dedicated landing for buying residential property in Noida (apartments, villas, luxury).
2. **Sitemap:** New URL added with monthly change frequency and priority 0.8.
3. **Structured data:** BreadcrumbSchema, WebPageSchema, and FAQPageSchema implemented for the page.
4. **Meta & share:** Canonical URL, Open Graph, and Twitter cards set in layout; meta title and description aligned with H1 and intro.
5. **Footer:** “Residential Property in Noida” link added under the Locations column.

### Hero & above-the-fold
6. **Hero:** Full-viewport hero image; H1 only (no sub-paragraph); single gold highlight on “Residential Property in Noida” for clarity.
7. **Listings:** Residential-only listings (apartments + villas) via API filter; filters and grid placed directly under hero with no extra heading or paragraph.
8. **API:** Search endpoint updated to support `propertyType=residential` (apartments and villas only).

### Content blocks & typography
9. **Content blocks:** 8 SEO sections, each with a centred H2 and one white card; one key phrase per H2 highlighted in gold.
10. **Typography:** Line-height 1.75, max text width 700px, gold drop cap on the first paragraph of each card; content centred within the card.
11. **Card width:** Content cards constrained to `max-w-4xl` for a tighter, editorial feel.
12. **Separators:** Gold gradient lines only between revealed blocks (hidden until those blocks are visible); no line after the FAQ section.

### Expand/collapse UX
13. **Read more:** “Read more” expands blocks in steps; separators appear only for revealed content.
14. **Floating close:** Sticky “Close section” pill (gold, glass style) at bottom-center of viewport when expanded — always visible for quick exit.
15. **On close:** Auto-scroll to the top of the content section when closing, so the user is not left mid-page; inline “Read less” button removed in favour of the floating pill.

### Two-column layout & consultation sidebar (desktop)
16. **Two-column layout:** Main content (SEO blocks + FAQ) on the left; consultation sidebar on the right (360px), desktop only.
17. **Sticky sidebar:** “Tell Us What You Need. We'll Do the Rest.” card with subtext: consultants shortlist, verify, and walk you through options before site visits. Sticks from the “Explore…” H2 down to the last FAQ (stops before footer CTA).
18. **Sidebar fit:** Uses `top-28`, `max-h-[calc(100vh-8rem)]`, and `my-2` so the card fits in the viewport with spacing from top and bottom; scrolls inside the card if needed.
19. **FAQ:** Same pattern as property-in pages (centred heading + LocationFAQs); 4 Q&As with schema for rich results.

### Components & code
20. **LocationPropertyFilters:** Optional `hidePropertyType` and `defaultPropertyType` for residential-only pages.
21. **NoidaPropertiesGrid:** Optional `defaultPropertyType` to lock the grid to residential.
22. **SeoBlocksRevealController:** Separators hidden until blocks are revealed; floating Close pill; scroll-to-top on close.
23. **ConsultationSidebar:** Renders headline, subtext, and **ResidentialStickyForm** (no longer LocationContactForm).
24. **ResidentialStickyForm:** Custom sticky form — Name, Phone, Property Type (2 BHK / 3 BHK / 4 BHK+ / Villa / Plot), Your Budget (50L–5 Cr+), Timeline (Ready now / 6 months / 1 year / Researching). Submit: “Request a Callback”; line below: “One call. No obligation.” Submits to `/api/location-contact` with message built from dropdowns; success state shows thank-you with 12–24 hour callback note.

---

## How to use this doc

- **Each month:** Add a new `## Month YYYY` section at the top (above the previous month).
- **One line per change:** Short, actionable; no long paragraphs.
- **Group by type:** e.g. New page & SEO, Hero & above-the-fold, Content blocks, UX, Layout, Components.
- **Client-ready:** Focus on what changed from a user/product perspective; avoid internal ticket IDs unless the client uses them.
