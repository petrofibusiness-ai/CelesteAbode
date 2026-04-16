# Website development summary

**For:** Celeste Abode  
**Purpose:** Plain-language record of **what was built or changed**, **on which parts of the site**, and **how much surface area** was involved. Numbers and page names are intentional so you can judge scope and effort without reading code.

---

## Site size at a glance (from `sitemap.txt` + `app/` folder)

### Counts (quick reference)

| Category | Count |
|----------|------:|
| Static pages (listed in `sitemap.txt`) | **22** |
| Blog article URLs (in `sitemap.txt`) | **8** |
| Location hub URLs (in `sitemap.txt`) | **5** |
| Property detail URLs (in `sitemap.txt`) | **27** |
| **Subtotal — public URLs in `sitemap.txt`** | **62** |
| Public pages built in code but **not** in `sitemap.txt` | **2** |
| Admin panel screens | **9** |
| **Total — every page URL in the product** | **73** |

*How the total is calculated:* 62 + 2 + 9 = **73** (indexed public pages + two omitted public URLs + staff-only admin routes). *Sitemap source:* `sitemap.txt`, last export **10 April 2026** (`lastmod` in file).

**What `sitemap.txt` is:** the list of **public URLs** we ask Google to index, generated from the live site (database + blog data). The sections below spell out **which URL is which**—**static** means one fixed address per designed page; **dynamic** means many addresses sharing the same layout (articles, cities, projects).

---

### A. Static pages (fixed URLs in `sitemap.txt`)

**Count: 22 URLs**

These are **not** driven by a database row for “which slug exists.” Each URL is its own designed page (copy and layout live in code). They are “static” in the sense that the **path never changes**—only the content inside may be edited over time.

| # | URL path | Role (plain English) |
|---|----------|----------------------|
| 1 | `/` | Homepage |
| 2 | `/properties` | Main property catalogue (filters + listings) |
| 3 | `/blog` | Blog index (list of articles) |
| 4 | `/request-a-free-consultation` | Book a consultation |
| 5 | `/contact` | Contact |
| 6 | `/advisory-philosophy` | Advisory philosophy |
| 7 | `/real-estate-consulting-services` | Consulting services |
| 8 | `/real-estate-insights` | Insights hub |
| 9–12 | `/villa-in-noida`, `/villas-in-greater-noida`, `/villa-in-noida-extension`, `/buy-villa-in-noida` | Villa-focused landings |
| 13–14 | `/plots-in-noida`, `/plots-in-greater-noida` | Plot-focused landings |
| 15–20 | `/residential-property-in-noida`, `/commercial-property-in-noida`, `/flats-for-sale-in-noida`, `/flats-for-sale-in-greater-noida`, `/flats-in-ghaziabad`, `/commercial-and-residential-property-in-lucknow` | Flagship city / intent landings |
| 21–22 | `/privacy-policy`, `/terms` | Legal |

---

### B. Dynamic pages (many URLs, few templates) — still listed in `sitemap.txt`

**Count: 40 URLs** (each line in the sitemap is still one address a user can open)

**How to read this for a client:** the **design** is reused; the **address** is different for each article, city, or project. When you add a blog post, location, or property in admin (or in blog data), a **new URL** can appear after the next sitemap generation.

#### B1. Blog articles — **8 URLs** (one template: article layout)

| URL path |
|----------|
| `/blog/is-noida-safe-to-buy-property-2026` |
| `/blog/yamuna-expressway-growth-corridor-delhi-ncr` |
| `/blog/noida-vs-greater-noida-investment-2026` |
| `/blog/jewar-airport-ncr-property-buyers-2026` |
| `/blog/forest-walk-villa-ghaziabad-luxury-living-2026` |
| `/blog/upcoming-luxury-projects-noida-greater-noida-2026` |
| `/blog/sobha-rivana-greater-noida-west` |
| `/blog/3bhk-flats-in-greater-noida` |

#### B2. Location hub pages — **5 URLs** (one template: “properties in this city/region”)

| URL path |
|----------|
| `/properties-in-noida` |
| `/properties-in-greater-noida` |
| `/properties-in-yamuna-expressway` |
| `/properties-in-ghaziabad` |
| `/properties-in-lucknow` |

#### B3. Property detail pages — **27 URLs** (one template: single project)

Same pattern for all: `/properties-in-{area}/{project-slug}`.

**By area (from this `sitemap.txt`):**

- **Greater Noida:** 19 project URLs  
- **Noida:** 5 project URLs  
- **Yamuna Expressway:** 2 project URLs  
- **Ghaziabad:** 1 project URL  

The exact slugs match your **published** inventory at export time; open `sitemap.txt` in the project for the full list of links.

---

### C. Public pages in the codebase but **not** in `sitemap.txt`

These folders exist under `app/` with a real `page.tsx`, but they are **deliberately omitted** from the public sitemap (see `app/sitemap.ts` filters). Visitors can still open the URL if they have the link.

| URL path | Folder in project | Why it is not in the sitemap |
|----------|-------------------|------------------------------|
| `/demo-property` | `app/demo-property/` | Internal **layout demo** (Sobha-style preview). Marked **noindex** so it does not compete with real project pages in search. |
| `/ca-internal-inventory-v1` | `app/ca-internal-inventory-v1/` | **Internal / private** listing experience; excluded from the same public sitemap rules as other private inventory paths. |

---

### D. Admin panel (never part of the public sitemap)

**Count: 9 screens** — all under `app/admin/`. Only staff use these; they are not customer marketing URLs.

| URL path | Folder |
|----------|--------|
| `/admin/login` | `app/admin/login/` |
| `/admin` | `app/admin/` |
| `/admin/leads` | `app/admin/leads/` |
| `/admin/locations` | `app/admin/locations/` |
| `/admin/locations/new` | `app/admin/locations/new/` |
| `/admin/locations/{slug}/edit` | `app/admin/locations/[slug]/edit/` |
| `/admin/properties` | `app/admin/properties/` |
| `/admin/properties/new` | `app/admin/properties/new/` |
| `/admin/properties/{id}/edit` | `app/admin/properties/[id]/edit/` |

`{slug}` and `{id}` mean “whatever location or property you opened”—same idea as dynamic public pages, but **password-protected**.

---

### E. How this maps to code (short technical summary)

- **36** files named `page.tsx` under `app/` = **36 route entry points** in the app.
- **Public customer routes:** **24** fixed-path pages + **3** dynamic **templates** (`blog/[slug]`, `properties-in/[locationCategory]`, `properties-in/[locationCategory]/[slug]`) that create **many** URLs.
- **Sitemap today:** **62** public URLs = **22** static + **40** dynamic listings (8 + 5 + 27).
- **Outside sitemap:** **2** public URLs (`demo-property`, `ca-internal-inventory-v1`) + **9** admin URLs → **73** distinct URLs in total (same as the **Counts** table at the top of this section).

When you **publish** a new location, blog post, or property, regenerate or redeploy so **`sitemap.txt`** (or the live `/sitemap.xml`) stays aligned with what Google should crawl.

---

## How to read this

- Work is grouped by **site area** and split across **February 2026** and **March 2026**.
- **“Effort” here means breadth:** number of pages, sections, forms, SEO surfaces, and admin behaviors touched—not billable hours.

---

## February 2026

### Location and buyer landing pages (large build)

This month was primarily **six new public URL experiences**, each with custom copy, layout, SEO setup (page title, description, canonical URL, sharing previews, FAQ markup for Google), footer link under Locations, and sitemap entry.

| Page (visitor path) | What was delivered |
|---------------------|-------------------|
| **Residential property in Noida** | Full-height hero; **live listings** filtered to **residential only** (apartments + villas) with the same filter/grid pattern as other location hubs; **eight** long-form advisory sections in expandable cards; **four** FAQs; desktop **sticky callback** column on the right; callback form fields: name, phone, property type (2 / 3 / 4+ BHK, villa, plot), budget band, timeline. |
| **Commercial property in Noida** | Full-height hero; **seven** advisory sections + **four** FAQs; **no** listing grid in this first pass (content-led commercial story); same two-column + sticky **commercial** callback form (office / retail / mixed-use / other, budget, timeline). |
| **Flats for sale in Noida** | Hero + **apartments-only** listings (filters + grid); **seven** advisory sections; **four** FAQs; sticky residential callback; full SEO + nav wiring. |
| **Flats for sale in Greater Noida** | Same structural depth as Noida flats: hero, **apartments-only** grid, **seven** sections, **three** FAQs, sticky sidebar, SEO + footer + sitemap. |
| **Flats in Ghaziabad** | Hero; **ten** advisory sections (including Indirapuram-focused narrative); **four** FAQs; two-column layout with sticky sidebar; initially **content-first** (listing section completed in March). |
| **Commercial & residential property in Lucknow** | Combined story for both asset types; **ten** sections; **four** FAQs; sticky sidebar; **content-first** in this month (city listing block completed in March). |

**Shared behavior across these pages:** long sections use **step-by-step “read more”** (so pages do not feel like a wall of text); gold visual separators between sections; a **dark call-to-action strip** at the bottom of each (“ready to buy” / “talk to advisor” style, page-specific). Listing pages use the **same search and pagination plumbing** as your dynamic “properties in [area]” pages where applicable.

**Property search API** was extended so “residential” correctly means **apartments + villas only**, matching the residential Noida page.

---

### Homepage (structural and content overhaul)

- **Opening story (Brand intro):** Main heading rewritten to lead with **“Best Real Estate Consultants in Delhi NCR for Smart Property Investment”**; two-column layout (headline left, body right); opening paragraph reordered for stronger hook; **keyword bolding removed** from body for cleaner reading; **removed** the old “Book a free consultation” link from this block.
- **Removed two full sections entirely:** the **“How Property Decisions Should Feel”** block and the **Vault teaser**—so the homepage is shorter and more focused on consulting and listings.
- **New expandable “SEO blocks” region** (five separate articles-in-miniature), placed **after** “Who we serve”: (1) trusted consultant in Noida & NCR, (2) consulting services, (3) consultant for buyers & investors, (4) exploring properties with consultants, (5) how you help buyers choose. Each has a centered heading, optional intro line, and a white content card with sub-headings. **Internal links** were woven in (dozens of links across the five blocks to flats, residential/commercial pages, plots, villas, services, blog, contact, philosophy, etc.). **All five blocks stay in the page for Google**; visibility is controlled so users see one new block at a time.
- **Who we serve:** all **six** buyer cards (first-time buyers, investors, NRIs, corporates, professionals, developers) got **full rewrites**—same cards, deeper advisory copy.
- **Why choose Celeste Abode:** heading changed to **“Why Choose Celeste Abode as Your Real Estate Consultant”**; new intro; all **six** trust pillars rewritten (RERA-first, independence, data, documentation, post-booking, no pressure).
- **Metrics line** under the numbers section updated to state clearly that figures come from **verified transactions**, not estimates.

---

### Header, logo, and social (sitewide chrome)

- **Logo:** single canonical logo URL used across **header, footer, blog shell, and structured data**; old local logo asset retired sitewide.
- **Desktop:** **three** sticky social buttons (**Instagram, LinkedIn, WhatsApp**) fixed on the **left**; **call** and **chatbot** stay on the **right**. **Mobile:** the same three networks appear **inside the menu** in a row under Contact Us.
- **Desktop header:** **phone capsule** (black background, gold border) on the **left**; **Contact Us** capsule on the **right**—**same width and height**; Contact Us label switched to **black text** on gold for readability.

---

### Search engines and business profile data

- **Bing:** both a **meta-tag** verification and a **`BingSiteAuth.xml` file** were added so you can verify the site in Bing Webmaster Tools.
- **Google-style JSON-LD:** business type set to **real estate agent**; **logo URL**, **full office address** (Galaxy Blue Sapphire Plaza, Sector 4, Greater Noida West), **map coordinates**, **Mon–Sat hours**, **phone in +91 format**, **Instagram + LinkedIn** only in “sameAs”, **price range hint**, **service areas** (Noida, Greater Noida, Gurugram, Delhi, Ghaziabad, Yamuna Expressway, plus later **Lucknow** and **Noida Expressway** alignment).
- **Organization / brand / website** schemas were **aligned** so slogan and descriptions match your main site metadata and hero messaging; **duplicate or unverifiable review stars** removed from brand schema.
- **Central library** for all structured-data helpers was consolidated so **every page type** (home, blog, property, location, FAQs, etc.) pulls from **one consistent implementation**—less drift, easier future edits.

---

### Blog and long-form content

- **Blog index (`/blog`):** new **browser tab title** and **description**; sharing image and alt text set for when the blog link is pasted on social apps.
- **Per-article SEO fields** were added to the content model (`metaTitle`, `metaDescription`, `ogImage`, `ogImageAlt`) so important posts can override defaults.
- **Five existing articles** got **new public titles** and metadata aligned to those titles (topics: **Noida investment in 2026**, **Yamuna Expressway corridor**, **Noida vs Greater Noida**, **Jewar airport impact**, **Forest Walk Villa Ghaziabad**). Banner titles were unified to use the article title consistently.
- **One new flagship article** was published: **upcoming luxury projects in Noida & Greater Noida (2026)**—roughly **1,500–2,000 words**, with **named projects** (e.g. Sobha, Trump Towers Noida, Smart World Elie Saab, CRC Joyous, Eternia, M3M Jacob & Co, Renox Thrive, VVIP, Irish Platinum, and others per your list), **internal links** to each live property URL where the project exists on the site, and **in-article hero images** for those projects. Article hero image treatment was aligned with other landing pages.
- **Article footer lead form** copy updated **for all posts** that use it: heading **“Talk to a real advisor”** with neutral subtext inviting the reader to describe plans so your team can respond with next steps.

---

### Dynamic “properties in [location]” pages

- **Result transparency:** above the grid, visitors now see **“Showing X out of Y properties”**, with **Y** coming from the real total (updates when filters or pagination change).

---

### Admin (internal) and global contact

- **Property editor:** replaced a single vague “price range” with **three fields**—**minimum price**, **maximum price**, and **display price text**—stored cleanly in the database; **numbers** validated end-to-end; rule added: **max cannot be less than min** when both are set.
- **Contact number migration:** old number replaced with **9910906306** across **visible UI** (tel links, WhatsApp `wa.me` links, forms, headers/footers), **email and schema metadata**, and **internal setup docs**—verified so no stale number remained.
- **Sticky landing-page forms:** budget dropdown options on new SEO landings were reset to **premium-aligned bands** (e.g. **1–5 Cr, 5–8 Cr, 8–15 Cr, 15 Cr+**).

---

## March 2026

### Location and buyer pages (depth, parity, and polish)

**A. “Read more” experience rebuilt to match the homepage**

The expandable section controller was **rewritten** (not a small CSS tweak). Changes applied to **all** of these URLs **plus** the dynamic **`/properties-in/[location]`** template:

- `/flats-for-sale-in-noida` (**7** content blocks)  
- `/flats-for-sale-in-greater-noida` (**7**)  
- `/residential-property-in-noida` (**8**)  
- `/commercial-property-in-noida` (**7**)  
- `/flats-in-ghaziabad` (**10**)  
- `/commercial-and-residential-property-in-lucknow` (**10**)  
- Dynamic location pages (variable block count)

**Behavior:** only **one** new block opens per click (was batched before); **paired “Read more” / “Show less”** controls with equal sizing; blur fade above the buttons; **smooth scroll** after collapse so the viewport does not jump (also applied to homepage SEO blocks). Search engines still see **full text** in the page.

**B. Dynamic location pages visually aligned with homepage**

For **`/properties-in/[location]`** only: wider content container, card shadow and border matched to homepage cards, padding tiers on cards, paragraph line-height and color matched, gold divider width matched. **Static** landings (flats/residential/commercial URLs above) **kept** their tighter editorial width on purpose.

**C. Hero and imagery**

- **Six** static landings received **new cloud-hosted hero images** (webp) with matching **sharing image** metadata: Greater Noida flats, Noida flats, residential Noida, commercial Noida, Ghaziabad flats, Lucknow combined page.
- **All** property-in and location heroes moved to **full screen height** on every screen size (including dynamic location pages).

**D. Listing sections brought up to the same standard as “properties in …”**

- **Commercial property in Noida:** after the hero, a **commercial-only** listing block (filters + grid + empty state linking to Noida properties hub).
- **Commercial & residential Lucknow:** **Lucknow-scoped** listings with **property type filter visible**; empty state points to Lucknow hub.
- **Flats in Ghaziabad:** **Ghaziabad apartments-only** grid with the same pattern as other flats pages; empty state points to Ghaziabad hub.
- **Residential Noida, flats Noida, flats Greater Noida:** listing stack already live—March work included **count parity**, server-side totals, and anchor placement for filters/grid consistency.

**E. Page-specific SEO titles and social cards**

Dedicated **tab titles** and **Open Graph / Twitter** image+alt were set for: residential Noida, commercial Noida, Noida flats, Greater Noida flats, Ghaziabad flats, Lucknow combined page—so each link preview is **unique** and accurate when shared.

**F. Copy and facts refresh**

- **Greater Noida flats** and **Ghaziabad flats:** advisory sections and FAQs rewritten for **clearer sentences**, **internal links** to related hubs, removal of **outdated dated stats**; airport framing updated for **2026**; footer and microcopy cleaned (e.g. punctuation consistency).
- **FAQ sets** on residential, commercial, and Noida flats pages were expanded or replaced with **full advisory answers** (pricing bands, sector choice, investment framing, safe-buying checklist, and how Celeste Abode fits in).

**G. Dynamic location page fixes**

- **Hero text** layout widened so long headlines wrap cleanly on two lines.
- **SEO block container** width tuned to reduce excess side margins.
- **Technical fix:** hero HTML structure adjusted so **headings are valid** for both users and Google (removed nested-heading issues that could cause display glitches).

---

### Homepage (motion, social proof, Instagram, routing)

- **Trust KPIs** moved from a thin strip into a **three-card band** (black background, gold icons): no developer tie-ups, RERA-verified shortlists, involved through possession—with **desktop motion** (cards enter from left/center/right).
- **Brand intro** copy refined again; **one key sentence** given stronger emphasis (“if something fails our checks, you hear that first”).
- **Google reviews widget:** initialization simplified and stabilized; **loading state** improved so the block appears as one smooth unit instead of “assembling” on slow networks; later **rebuilt** to a lean embed-only version; **hydration fix** so server and browser HTML stay in sync (avoids flicker/errors).
- **Instagram:** section added, then expanded from **three** embeds to a **ten-reel** carousel; desktop shows **three at a time**; mobile layout and arrows refined; **embed reliability** improved (re-processing when slides change); **carousel arrows** z-index fixed so they do not slide **under** the fixed header.
- **Final section order:** Hero → brand intro → why choose → advisory services → trusted developers → metrics → buyer types → five SEO blocks → testimonials → Instagram → footer CTA → footer.
- **Sitewide consultation URL:** new page **`/request-a-free-consultation`**; **old `/advisory-session` route removed**; **hero CTA**, services sticky button, philosophy links, sitemap, and **`sitemap.txt`** updated; consultation page **metadata** refreshed for Delhi NCR intent. Secondary hero button label set to **“Book a Free Consultation”** with **matching pill widths** on mobile and desktop.
- **Quality pass:** homepage SEO block text rewritten; **FAQs** deduplicated (removed from inside SEO blocks, owned in one data file); **homepage FAQ answers** shortened and clarified; **“near me” spam phrases** removed; **Who we serve** and **Why choose** sections got line-level polish; **heading levels** repaired for accessibility and SEO hierarchy.

---

### Main property catalogue (`/properties`)

- Replaced infinite **“load more”** with **numbered pagination** (**6 properties per page**), page numbers with ellipses, animated grid transition, and a **loading overlay** while fetching.
- On page change, the browser **scrolls to the filter/search area** (not only the grid) so context is preserved.
- **API** extended to return accurate **total counts** for filtered views, including **residential** filtering.

---

### Admin panel (scale and permissions)

- **`/admin/properties`:** **numbered pages** of **20** properties; header shows **total count**; full-page load first visit, **spinner overlay** on page change; after delete/publish/refresh, **current page reloads**; if the last item on a page is deleted, page index **clamps** so you never land on an empty page.
- **Two access tiers:** **`support@celesteabode.com`** = full admin (dashboard, locations, properties, leads). **Any other** logged-in admin = **leads only**—middleware and layout **redirect** them away from properties/locations; sidebar **hides** those items.
- **Search engine exclusion:** admin HTML responses get **noindex** headers/meta so internal tools do not rank in Google.

---

### Blog (heavy article surgery)

- **3 BHK Greater Noida guide (`/blog/3bhk-flats-in-greater-noida`):** removed redundant carousel; **one** main project carousel redesigned (centered slides, snap scroll, overlay arrows on all breakpoints, taller cards, spacing); **section order** changed so the project carousel sits **above** the quick snapshot; **mid-page CTA** trimmed to avoid repetition; **new imagery** (e.g. city/metro figure, Sobha-related figure) placed after key sections; **meta title** spelling fixed to **“3 BHK”**; **hero subline** customized; **share images** use per-post OG image when set; **permanent redirect** from old slug **`/blog/three-bhk-flats-greater-noida-2026`**; **property URL fixes** and **redirect rules** in site config for mismatched slugs (e.g. Kviraaj Mayfair, Smart World Elie Saab naming).
- **Sobha Rivana article:** **one canonical URL** enforced; **two legacy blog URLs** permanently redirect to it with **noindex on the old URLs** so Google consolidates signals; **internal links** site-wide pointed at the canonical path.

---

### Consultation page and small sitewide SEO hygiene

- **`/request-a-free-consultation`:** budget control rebuilt as **crore-only** choices from **₹1 Cr** upward (**six** bands up to **₹10 Cr+**); labels flow through to **notification emails**; legacy keys kept only where old forms still need them.
- **Favicon / manifest paths** fixed so browser tabs and Google’s result icon stay consistent.
- **404 pages** for missing property/location/blog slugs now share **consistent titles and descriptions** instead of conflicting “not found” wording.

---

### Internal demo (not marketing)

- **`/demo-property`:** full **Sobha Rivana–style** layout trial (hero, gallery, highlights, map, sticky enquiry, footer CTA)—**robots: noindex**, **not** in public sitemap. For **internal** sales/design reference only.

---

## Quick map: where to look on the live site

| You care about… | Where it lives |
|-----------------|----------------|
| Six flagship landings (Noida residential/commercial, flats Noida/GN, Ghaziabad, Lucknow) | Dedicated URLs + Locations footer |
| Homepage story, SEO blocks, reviews, Instagram | `/` |
| All listings browsing | `/properties` and `/properties-in/...` |
| Long articles | `/blog` and individual post URLs |
| Lead capture | Sticky sidebars on landings, article forms, `/request-a-free-consultation` |
| Team operations | `/admin` (role-based) |

---

## Note for your team

This document is **client-facing**: it describes **deliverables and surfaces**, not source files. Keep a separate **developer changelog** if you need line-by-line history.
