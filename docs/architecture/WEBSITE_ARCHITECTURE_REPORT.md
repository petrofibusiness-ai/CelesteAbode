# Celeste Abode - Complete Website Architecture Report

**Generated:** 2024-12-19
**Framework:** Next.js 14+ (App Router)
**Database:** Supabase (PostgreSQL)
**Hosting:** Vercel (presumed)
**Email Service:** Nodemailer (Gmail SMTP)

---

## 📊 EXECUTIVE SUMMARY

### Total Pages
- **Static Pages:** 15
- **Dynamic Location Pages:** Unlimited (based on `locations_v2` table)
- **Dynamic Property Pages:** Unlimited (based on `properties_v2` table)
- **Admin Pages:** 6
- **Total Estimated:** 21+ static pages + unlimited dynamic pages

### Forms & Email Integrations
- **Active Forms:** 8
- **Email Endpoints:** 7
- **Form Types:** Contact, Location Contact, Consultation, Advisory Session, Viewing, Chatbot, Segmented Entry, Property Lead

---

## 🗂️ PAGE INVENTORY

### 1. STATIC PAGES (15 pages)

#### Public Pages (13 pages)

1. **Homepage** (`/`)
   - **File:** `app/page.tsx`
   - **Type:** Server Component
   - **Features:**
     - Hero section with video background
     - Properties section
     - Services overview
     - Testimonials
     - CTA sections
     - Segmented entry form (Live/Invest/Signature)
   - **Components Used:**
     - `HeroSection`, `PropertiesSection`, `ServicesSection`, `TestimonialsSection`
     - `SegmentedEntry` (multi-step form)
   - **SEO:** Full metadata, structured data (Organization, WebSite, Service schemas)

2. **Properties Listing** (`/properties`)
   - **File:** `app/properties/page.tsx`
   - **Type:** Client Component (with server-side initial data)
   - **Features:**
     - Advanced filtering (location, property type, project status, configuration)
     - Multi-select location filter
     - Search on button click
     - Pagination (6 properties per page)
     - "View More Properties" button
     - Shows all properties by default
   - **API Endpoints Used:**
     - `/api/properties/all` - Fetch all properties
     - `/api/properties/search` - Search by location
   - **State Management:** React hooks (`useState`, `useEffect`, `useCallback`)
   - **Custom Events:** `properties-filter-change`, `properties-page-loading`

3. **Services** (`/services`)
   - **File:** `app/services/page.tsx`
   - **Type:** Static page
   - **Content:** Service offerings

4. **Contact** (`/contact`)
   - **File:** `app/contact/page.tsx`
   - **Type:** Static page with form
   - **Form:** Contact form (name, email, phone, message)
   - **API:** `/api/contact` (POST)

5. **Philosophy** (`/philosophy`)
   - **File:** `app/philosophy/page.tsx`
   - **Type:** Static page
   - **Content:** Company philosophy and values

6. **Vault** (`/vault`)
   - **File:** `app/vault/page.tsx`
   - **Type:** Static page
   - **Content:** Exclusive content/teaser

7. **Advisory Session** (`/advisory-session`)
   - **File:** `app/advisory-session/page.tsx`
   - **Type:** Static page with form
   - **Form:** Advisory session request form
   - **API:** `/api/advisory-session` (POST)

8. **Privacy Policy** (`/privacy-policy`)
   - **File:** `app/privacy-policy/page.tsx`
   - **Type:** Static page

9. **Terms** (`/terms`)
   - **File:** `app/terms/page.tsx`
   - **Type:** Static page

#### SEO Landing Pages (6 pages)

10. **Villa in Noida** (`/villa-in-noida`)
    - **File:** `app/villa-in-noida/page.tsx`
    - **Type:** Static SEO page
    - **Features:** Internal linking to `/properties`, `/properties-in-noida`, `/services`, `/contact`
    - **Purpose:** SEO optimization for "villa in noida" keyword

11. **Villas in Greater Noida** (`/villas-in-greater-noida`)
    - **File:** `app/villas-in-greater-noida/page.tsx`
    - **Type:** Static SEO page
    - **Features:** Internal linking

12. **Villa in Noida Extension** (`/villa-in-noida-extension`)
    - **File:** `app/villa-in-noida-extension/page.tsx`
    - **Type:** Static SEO page

13. **Buy Villa in Noida** (`/buy-villa-in-noida`)
    - **File:** `app/buy-villa-in-noida/page.tsx`
    - **Type:** Static SEO page

14. **Plots in Noida** (`/plots-in-noida`)
    - **File:** `app/plots-in-noida/page.tsx`
    - **Type:** Static SEO page

15. **Plots in Greater Noida** (`/plots-in-greater-noida`)
    - **File:** `app/plots-in-greater-noida/page.tsx`
    - **Type:** Static SEO page

### 2. DYNAMIC PAGES

#### Location Pages (Unlimited - based on `locations_v2` table)

**Route Pattern:** `/properties-in/[locationCategory]`

**File:** `app/properties-in/[locationCategory]/page.tsx`

**How It Works:**
1. **Server-Side Rendering (SSR):**
   - Fetches location data from `locations_v2` table by slug
   - Validates `is_published = true`
   - Returns 404 if location not found or unpublished

2. **Initial Data Fetching:**
   - Fetches first 6 properties for the location using `location_id`
   - Fetches localities from `localities` table
   - Adds `locationSlug` to each property for URL generation

3. **Components:**
   - `NoidaPropertiesGrid` - Displays properties with pagination
   - `LocationPropertyFilters` - Filter component (locality, property type, project status, configuration)
   - `LocationContactForm` - Location-specific contact form
   - `WhyInvestSection` - Investment rationale content
   - `LocationFAQs` - Location-specific FAQs

4. **Client-Side Features:**
   - **Filtering:** Multi-select locality filter, property type, project status, configuration
   - **Search:** Triggered by button click (not on filter change)
   - **Pagination:** "View More Properties" button loads next 6 properties
   - **Loading States:** Separate states for initial load (`isLoading`) and pagination (`isLoadingMore`)
   - **Custom Events:** `location-filter-change` event dispatched when search button clicked

5. **API Integration:**
   - Uses `/api/properties/search` endpoint for filtered/paginated results
   - Parameters: `location`, `locality[]`, `propertyType`, `projectStatus`, `configuration[]`, `limit`, `offset`

6. **SEO:**
   - Dynamic metadata from location data
   - Open Graph tags
   - Canonical URLs
   - Structured data (CollectionPage schema)

**Example URLs:**
- `/properties-in-noida`
- `/properties-in-greater-noida`
- `/properties-in-gurgaon`

#### Property Detail Pages (Unlimited - based on `properties_v2` table)

**Route Pattern:** `/properties-in/[locationCategory]/[slug]`

**File:** `app/properties-in/[locationCategory]/[slug]/page.tsx`

**How It Works:**
1. **Canonical URL Resolution:**
   - Fetches property by `slug` from `properties_v2`
   - Gets `location_id` from property
   - Fetches location `slug` from `locations_v2` using `location_id`
   - Validates URL `locationCategory` matches database location slug
   - Returns 404 if mismatch (prevents duplicate content)

2. **Property Data:**
   - Full property details from `properties_v2`
   - Images, videos, amenities, pricing, RERA ID
   - Developer information
   - Project status and configuration

3. **Component:**
   - `DynamicPropertyPage` - Full-featured property display component
   - Features:
     - Hero image/video slideshow
     - Image gallery with lightbox
     - Video player
     - Property details (sizes, configurations, amenities)
     - Brochure download
     - Contact forms (property lead form, viewing request)
     - Social sharing
     - Breadcrumbs

4. **Forms:**
   - Property Lead Form → `/api/consultation` (POST)
   - Viewing Request Form → `/api/viewing` (POST)

5. **SEO:**
   - Dynamic metadata from property SEO fields
   - Open Graph tags with property images
   - Canonical URLs
   - Structured data (Article schema, LocalBusiness schema)

**Example URLs:**
- `/properties-in-noida/forest-walk-villa`
- `/properties-in-greater-noida/panchsheel-greens-ii`

### 3. ADMIN PAGES (6 pages)

1. **Admin Dashboard** (`/admin`)
   - **File:** `app/admin/page.tsx`
   - **Auth:** Session-based authentication
   - **Features:** Stats overview, quick actions

2. **Properties List** (`/admin/properties`)
   - **File:** `app/admin/properties/page.tsx`
   - **Features:**
     - List all properties (published + draft)
     - Filter by status
     - Search functionality
     - Link to view property on website
     - Pagination

3. **Create Property** (`/admin/properties/new`)
   - **File:** `app/admin/properties/new/page.tsx`
   - **Features:** Full property creation form

4. **Edit Property** (`/admin/properties/[id]/edit`)
   - **File:** `app/admin/properties/[id]/edit/page.tsx`
   - **Features:** Edit existing property

5. **Locations List** (`/admin/locations`)
   - **File:** `app/admin/locations/page.tsx`
   - **Features:** List all locations

6. **Create/Edit Location** (`/admin/locations/new`, `/admin/locations/[slug]/edit`)
   - **Files:** `app/admin/locations/new/page.tsx`, `app/admin/locations/[slug]/edit/page.tsx`
   - **Features:** Location management forms

---

## 📧 FORMS & EMAIL INTEGRATIONS

### Active Forms (8 forms)

1. **Contact Form** (`/contact`)
   - **Component:** `components/contact-popup.tsx` or inline form
   - **API Endpoint:** `/api/contact` (POST)
   - **Fields:** firstName, lastName, email, phone, message
   - **Email Type:** `contact`
   - **Validation:** Name, email, phone format, message length (10-5000 chars)
   - **Rate Limiting:** 10 requests per 60 seconds per IP

2. **Location Contact Form** (on location pages)
   - **Component:** `components/location-contact-form.tsx`
   - **API Endpoint:** `/api/location-contact` (POST)
   - **Fields:** name, phone, message, location, locationDisplayName
   - **Email Type:** `contact` (with location context)
   - **Special:** Uses placeholder email `location-form-{location}@celesteabode.com`

3. **Property Lead Form** (on property detail pages)
   - **Component:** `components/property-lead-form.tsx` or `components/dynamic-property-page.tsx`
   - **API Endpoint:** `/api/consultation` (POST)
   - **Fields:** firstName, lastName, email, phone, budget, propertyType, timeline, location, message
   - **Email Type:** `consultation`
   - **Confirmation Email:** Yes (sent to client)

4. **Viewing Request Form** (on property detail pages)
   - **Component:** `components/dynamic-property-page.tsx`
   - **API Endpoint:** `/api/viewing` (POST)
   - **Fields:** firstName, lastName, email, phone, preferredDate, preferredTime, propertyTitle, propertyLocation, message
   - **Email Type:** `viewing`
   - **Confirmation Email:** Yes (sent to client)

5. **Advisory Session Form** (`/advisory-session`)
   - **Component:** Inline form on page
   - **API Endpoint:** `/api/advisory-session` (POST)
   - **Fields:** firstName, lastName, email, phone, budget, propertyType, timeline, location, message
   - **Email Type:** `advisory-session`
   - **Confirmation Email:** Yes (sent to client)

6. **Consultation Form** (general)
   - **Component:** `components/consultation-popup.tsx`
   - **API Endpoint:** `/api/consultation` (POST)
   - **Fields:** Same as advisory session
   - **Email Type:** `consultation`
   - **Confirmation Email:** Yes

7. **Segmented Entry Form** (homepage)
   - **Component:** `components/segmented-entry/SegmentedEntry.tsx`
   - **API Endpoint:** `/api/contact` (POST with `formType: 'segmented-entry'`)
   - **Fields:** intent (live/invest/signature), firstName, lastName, email, phone, formData, emailContent
   - **Email Type:** `segmented-entry`
   - **Special:** Multi-step form with intent selection

8. **Chatbot Form** (website chatbot)
   - **Component:** `components/chatbot.tsx`
   - **API Endpoint:** `/api/chatbot` (POST)
   - **Fields:** firstName, lastName (optional), phone, chatbotUserIntent, chatbotPropertyType, chatbotPreferredLocation, chatbotBudgetRange, chatbotBhkPreference, chatbotCommercialUse, chatbotTimeline, chatbotLeadScore, chatbotWantsVirtualTour, chatbotWantsShortlist, chatbotWantsBestProjects, chatbotWantsExpertCall, chatbotContactPreference, chatbotClientEmail, chatbotSource, chatbotTimestamp
   - **Email Type:** `chatbot`
   - **Special:** Email optional, comprehensive lead scoring data

### Email Service Architecture

**File:** `lib/email-service.ts`

**Email Provider:** Nodemailer with Gmail SMTP

**Configuration:**
- **SMTP Host:** smtp.gmail.com
- **Port:** 465 (SSL)
- **Authentication:** Gmail App Password
- **Connection Pooling:** Yes (max 5 connections, 100 messages, rate limit: 5 emails/second)
- **Retry Logic:** 3 attempts with exponential backoff (1s, 2s, 4s)

**Email Templates:**
1. **Contact Email Template** - Standard contact form submission
2. **Segmented Entry Email Template** - Intent-based inquiry (Live/Invest/Signature)
3. **Viewing Email Template** - Property viewing request with date/time
4. **Advisory/Consultation Email Template** - Budget, property type, timeline, location
5. **Chatbot Email Template** - Comprehensive lead data with preferences and scoring
6. **Confirmation Email Template** - Auto-reply to clients (for advisory, consultation, viewing)

**Email Flow:**
1. Form submission → API route validation
2. Sanitization and security checks
3. Rate limiting check
4. Email service call with form data
5. Admin email sent (to `ADMIN_EMAIL` env var)
6. Confirmation email sent to client (for certain form types)
7. Response returned to client

**Environment Variables:**
- `EMAIL_USER` - Gmail address for sending
- `EMAIL_PASS` - Gmail App Password
- `ADMIN_EMAIL` - Recipient email address (defaults to `EMAIL_USER`)

---

## 🗄️ DATABASE ARCHITECTURE

### Supabase Tables

#### 1. `properties_v2` Table

**Purpose:** Stores all property listings

**Key Columns:**
- `id` (UUID, Primary Key)
- `slug` (TEXT, Unique, Not Null) - URL-friendly identifier
- `project_name` (TEXT, Not Null)
- `developer` (TEXT, Not Null)
- `location` (TEXT) - Denormalized text field
- `location_id` (UUID, FK to `locations_v2.id`) - **Source of truth for location**
- `locality_id` (UUID, FK to `localities.id`)
- `property_type` (ENUM) - apartment, villa, plot, commercial, investment
- `project_status` (ENUM) - Under Construction, Ready to Move, Pre-Launch
- `configuration` (TEXT[]) - Array of configurations (1BHK, 2BHK, 3BHK, 4BHK, 5BHK+)
- `rera_id` (TEXT)
- `possession_date` (TEXT)
- `sizes` (TEXT) - e.g., "163 sq. yd - 238 sq. yd"
- `description` (TEXT)
- `hero_image` (TEXT) - Cloudinary URL
- `brochure_url` (TEXT) - Cloudflare R2 URL
- `images` (TEXT[]) - Array of Cloudinary URLs
- `videos` (JSONB) - Array of {title, src, thumbnail}
- `amenities` (TEXT[])
- `price` (TEXT)
- `seo` (JSONB) - {title, description, keywords, ogImage, canonical}
- `is_published` (BOOLEAN, Default: false)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**Indexes:**
- `idx_properties_slug` - Fast slug lookups
- `idx_properties_is_published` - Filter published properties
- `idx_properties_created_at` - Sorting by creation date
- `idx_properties_location_id` - Location-based queries

**Relationships:**
- Many-to-One with `locations_v2` (via `location_id`)
- Many-to-One with `localities` (via `locality_id`)

#### 2. `locations_v2` Table

**Purpose:** Stores location page configurations

**Key Columns:**
- `id` (UUID, Primary Key)
- `slug` (TEXT, Unique, Not Null) - URL slug (e.g., "noida", "greater-noida")
- `location_name` (TEXT, Not Null) - Display name
- `hero_image` (TEXT, Not Null) - Cloudflare R2 URL
- `hero_text` (TEXT, Not Null) - Hero heading
- `hero_subtext` (TEXT, Not Null) - Hero subheading
- `explore_section_heading` (TEXT) - Default: "Explore Our Curated Collection"
- `explore_section_description` (TEXT)
- `localities` (JSONB) - Array of {value, label} objects (deprecated, use `localities` table)
- `why_invest_content` (JSONB) - Array of paragraph strings
- `celeste_abode_image` (TEXT) - Cloudflare R2 URL
- `faqs` (JSONB) - Array of {id, question, answer} objects
- `footer_cta_heading` (TEXT)
- `footer_cta_description` (TEXT)
- `meta_title` (TEXT, Not Null)
- `meta_description` (TEXT, Not Null)
- `meta_keywords` (TEXT[])
- `og_image` (TEXT)
- `og_title` (TEXT)
- `og_description` (TEXT)
- `image_alt_texts` (JSONB) - {hero, celesteAbode, og}
- `is_published` (BOOLEAN, Default: false)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**Indexes:**
- `idx_locations_slug` - Fast slug lookups
- `idx_locations_is_published` - Filter published locations

**Relationships:**
- One-to-Many with `properties_v2` (via `location_id`)

#### 3. `localities` Table

**Purpose:** Stores locality/sub-location data

**Key Columns:**
- `id` (UUID, Primary Key)
- `location_id` (UUID, FK to `locations_v2.id`)
- `slug` (TEXT, Unique, Not Null)
- `name` (TEXT, Not Null)
- `is_published` (BOOLEAN, Default: false)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**Relationships:**
- Many-to-One with `locations_v2` (via `location_id`)
- One-to-Many with `properties_v2` (via `locality_id`)

### Data Flow for Dynamic Pages

#### Location Page Data Flow:

```
1. User visits /properties-in-noida
   ↓
2. Next.js SSR: app/properties-in/[locationCategory]/page.tsx
   ↓
3. Fetch location from locations_v2 WHERE slug = 'noida' AND is_published = true
   ↓
4. If not found → 404
   ↓
5. Fetch localities from localities WHERE location_id = location.id
   ↓
6. Fetch first 6 properties from properties_v2 WHERE location_id = location.id AND is_published = true
   ↓
7. Add locationSlug to each property
   ↓
8. Render page with initial data
   ↓
9. Client-side: User applies filters and clicks search
   ↓
10. Dispatch 'location-filter-change' event
    ↓
11. NoidaPropertiesGrid listens to event
    ↓
12. Call /api/properties/search with filters
    ↓
13. Update properties state
    ↓
14. User clicks "View More Properties"
    ↓
15. Call /api/properties/search with offset
    ↓
16. Append new properties to existing list
```

#### Property Detail Page Data Flow:

```
1. User visits /properties-in-noida/forest-walk-villa
   ↓
2. Next.js SSR: app/properties-in/[locationCategory]/[slug]/page.tsx
   ↓
3. resolveCanonicalProperty():
   a. Fetch property from properties_v2 WHERE slug = 'forest-walk-villa' AND is_published = true
   b. Get location_id from property
   c. Fetch location from locations_v2 WHERE id = location_id
   d. Get location slug from location
   e. Validate URL locationCategory matches database location slug
   f. If mismatch → 404 (prevents duplicate content)
   ↓
4. If valid → Render DynamicPropertyPage component
   ↓
5. Client-side: User interacts with forms, gallery, etc.
```

---

## 🔌 API ROUTES

### Public API Routes (12 routes)

#### Properties API

1. **GET `/api/properties`**
   - **Purpose:** Fetch all published properties
   - **File:** `app/api/properties/route.ts`
   - **Query Params:** None
   - **Response:** Array of properties with `locationSlug` added
   - **Rate Limiting:** Yes
   - **Caching:** Public cache, 60s s-maxage, 300s stale-while-revalidate

2. **GET `/api/properties/all`**
   - **Purpose:** Fetch all properties with pagination and filters
   - **File:** `app/api/properties/all/route.ts`
   - **Query Params:**
     - `limit` (default: 6, max: 100)
     - `offset` (default: 0)
     - `propertyType` (optional)
     - `projectStatus` (optional)
     - `configuration[]` (optional, multiple)
   - **Response:** `{properties, total, hasMore, limit, offset}`
   - **Special:** Fetches `limit + 1` to determine `hasMore` accurately
   - **Rate Limiting:** Yes

3. **GET `/api/properties/search`**
   - **Purpose:** Search properties by location and filters
   - **File:** `app/api/properties/search/route.ts`
   - **Query Params:**
     - `location` (required) - Location slug
     - `locality[]` (optional, multiple)
     - `propertyType` (optional)
     - `projectStatus` (optional)
     - `configuration[]` (optional, multiple)
     - `limit` (default: 6)
     - `offset` (default: 0)
   - **Response:** `{properties, hasMore}`
   - **Special:** Fetches `limit + 1` to determine `hasMore` accurately
   - **Rate Limiting:** Yes

4. **GET `/api/properties/[slug]`**
   - **Purpose:** Get single property by slug
   - **File:** `app/api/properties/[slug]/route.ts`
   - **Response:** Single property object
   - **Rate Limiting:** Yes

5. **GET `/api/properties/by-location/[category]`**
   - **Purpose:** Get properties by location category (legacy endpoint)
   - **File:** `app/api/properties/by-location/[category]/route.ts`
   - **Query Params:** `limit`, `offset`
   - **Response:** `{properties, hasMore}`

#### Locations API

6. **GET `/api/locations/[slug]`**
   - **Purpose:** Get location data by slug
   - **File:** `app/api/locations/[slug]/route.ts`
   - **Response:** Location object

#### Form Submission APIs

7. **POST `/api/contact`**
   - **Purpose:** Handle contact form and segmented entry form
   - **File:** `app/api/contact/route.ts`
   - **Body:** 
     - Standard: `{firstName, lastName, email, phone, message}`
     - Segmented: `{formType: 'segmented-entry', intent, firstName, lastName, email, phone, formData, emailContent}`
   - **Rate Limiting:** 10 requests per 60 seconds per IP
   - **Email:** Sends via `sendFormSubmissionEmail`

8. **POST `/api/location-contact`**
   - **Purpose:** Handle location-specific contact form
   - **File:** `app/api/location-contact/route.ts`
   - **Body:** `{name, phone, message, location, locationDisplayName}`
   - **Rate Limiting:** 10 requests per 60 seconds per IP
   - **Email:** Sends via `sendFormSubmissionEmail` (type: 'contact')

9. **POST `/api/consultation`**
   - **Purpose:** Handle consultation requests
   - **File:** `app/api/consultation/route.ts`
   - **Body:** `{firstName, lastName, email, phone, budget, propertyType, timeline, location, message}`
   - **Rate Limiting:** Yes
   - **Email:** Sends via `sendFormSubmissionEmail` (type: 'consultation')
   - **Confirmation:** Yes (sends confirmation email to client)

10. **POST `/api/advisory-session`**
    - **Purpose:** Handle advisory session requests
    - **File:** `app/api/advisory-session/route.ts`
    - **Body:** Same as consultation
    - **Rate Limiting:** Yes
    - **Email:** Sends via `sendFormSubmissionEmail` (type: 'advisory-session')
    - **Confirmation:** Yes

11. **POST `/api/viewing`**
    - **Purpose:** Handle property viewing requests
    - **File:** `app/api/viewing/route.ts`
    - **Body:** `{firstName, lastName, email, phone, preferredDate, preferredTime, propertyTitle, propertyLocation, message}`
    - **Rate Limiting:** Yes
    - **Email:** Sends via `sendFormSubmissionEmail` (type: 'viewing')
    - **Confirmation:** Yes

12. **POST `/api/chatbot`**
    - **Purpose:** Handle chatbot lead submissions
    - **File:** `app/api/chatbot/route.ts`
    - **Body:** Comprehensive chatbot data (see Chatbot Form section)
    - **Rate Limiting:** Yes
    - **Email:** Sends via `sendFormSubmissionEmail` (type: 'chatbot')
    - **Special:** Email optional, comprehensive lead data

#### Utility APIs

13. **GET `/api/health`**
    - **Purpose:** Health check endpoint
    - **File:** `app/api/health/route.ts`

14. **GET `/api/brochure-download`**
    - **Purpose:** Proxy brochure downloads (Cloudflare R2)
    - **File:** `app/api/brochure-download/route.ts`
    - **Query Params:** `url` (Cloudflare R2 URL)

15. **GET `/api/brochure-download/proxy`**
    - **Purpose:** Alternative brochure proxy
    - **File:** `app/api/brochure-download/proxy/route.ts`


### Admin API Routes (13 routes)

#### Authentication

1. **POST `/api/admin/auth/login`**
   - **Purpose:** Admin login
   - **File:** `app/api/admin/auth/login/route.ts`
   - **Auth:** Session-based

2. **POST `/api/admin/auth/logout`**
   - **Purpose:** Admin logout
   - **File:** `app/api/admin/auth/logout/route.ts`

3. **GET `/api/admin/auth/session`**
   - **Purpose:** Check admin session
   - **File:** `app/api/admin/auth/session/route.ts`

#### Properties Management

4. **GET `/api/admin/properties`**
   - **Purpose:** List all properties (admin)
   - **File:** `app/api/admin/properties/route.ts`
   - **Query Params:** `page`, `limit`
   - **Response:** Paginated properties (published + draft)
   - **Rate Limiting:** Yes

5. **POST `/api/admin/properties`**
   - **Purpose:** Create new property
   - **File:** `app/api/admin/properties/route.ts`
   - **Auth:** Required

6. **GET `/api/admin/properties/[id]`**
   - **Purpose:** Get single property (admin)
   - **File:** `app/api/admin/properties/[id]/route.ts`

7. **PUT `/api/admin/properties/[id]`**
   - **Purpose:** Update property
   - **File:** `app/api/admin/properties/[id]/route.ts`

8. **DELETE `/api/admin/properties/[id]`**
   - **Purpose:** Delete property
   - **File:** `app/api/admin/properties/[id]/route.ts`

9. **GET `/api/admin/properties/check-slug`**
   - **Purpose:** Check if slug is available
   - **File:** `app/api/admin/properties/check-slug/route.ts`
   - **Query Params:** `slug`

#### Locations Management

10. **GET `/api/admin/locations`**
    - **Purpose:** List all locations (admin)
    - **File:** `app/api/admin/locations/route.ts`

11. **POST `/api/admin/locations`**
    - **Purpose:** Create new location
    - **File:** `app/api/admin/locations/route.ts`

12. **GET `/api/admin/locations/[slug]`**
    - **Purpose:** Get single location (admin)
    - **File:** `app/api/admin/locations/[slug]/route.ts`

13. **PUT `/api/admin/locations/[slug]`**
    - **Purpose:** Update location
    - **File:** `app/api/admin/locations/[slug]/route.ts`

14. **GET `/api/admin/locations/list`**
    - **Purpose:** Get locations list (simplified)
    - **File:** `app/api/admin/locations/list/route.ts`

#### Localities Management

15. **GET `/api/admin/localities/by-location/[locationId]`**
    - **Purpose:** Get localities for a location
    - **File:** `app/api/admin/localities/by-location/[locationId]/route.ts`

#### File Upload

16. **POST `/api/admin/upload/image`**
    - **Purpose:** Upload image to Cloudinary
    - **File:** `app/api/admin/upload/image/route.ts`
    - **Storage:** Cloudinary

17. **POST `/api/admin/upload/location-image`**
    - **Purpose:** Upload location image to Cloudflare R2
    - **File:** `app/api/admin/upload/location-image/route.ts`
    - **Storage:** Cloudflare R2

18. **POST `/api/admin/upload/video`**
    - **Purpose:** Upload video to Cloudinary
    - **File:** `app/api/admin/upload/video/route.ts`
    - **Storage:** Cloudinary

19. **POST `/api/admin/upload/pdf`**
    - **Purpose:** Upload PDF brochure to Cloudflare R2
    - **File:** `app/api/admin/upload/pdf/route.ts`
    - **Storage:** Cloudflare R2

#### Stats

20. **GET `/api/admin/stats`**
    - **Purpose:** Get admin dashboard statistics
    - **File:** `app/api/admin/stats/route.ts`

---

## 🏗️ ARCHITECTURE OVERVIEW

### Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **File Storage:**
  - **Images/Videos:** Cloudinary
  - **PDFs:** Cloudflare R2
- **Email:** Nodemailer (Gmail SMTP)
- **Authentication:** Session-based (admin)
- **Deployment:** Vercel (presumed)

### Key Architectural Patterns

1. **Server-Side Rendering (SSR):**
   - All dynamic pages use Next.js App Router SSR
   - Initial data fetched on server
   - SEO-optimized metadata generated server-side

2. **Client-Side State Management:**
   - React hooks (`useState`, `useEffect`, `useCallback`)
   - Custom events for inter-component communication
   - No global state management library (Redux/Zustand)

3. **Data Fetching Strategy:**
   - **Initial Load:** Server-side (SSR)
   - **Subsequent Loads:** Client-side API calls
   - **Pagination:** Offset-based with `hasMore` flag
   - **Race Condition Prevention:** `AbortController` for request cancellation

4. **URL Structure:**
   - **Static Pages:** `/page-name`
   - **Location Pages:** `/properties-in-[location-slug]`
   - **Property Pages:** `/properties-in-[location-slug]/[property-slug]`
   - **Admin:** `/admin/*`

5. **Canonical URL Resolution:**
   - Database is source of truth for location-property relationships
   - URL validation ensures canonical URLs
   - 404 returned for mismatched URLs (prevents duplicate content)

6. **Security:**
   - Input sanitization on all forms
   - Rate limiting on API routes
   - Session-based admin authentication
   - SQL injection prevention (Supabase parameterized queries)
   - XSS prevention (input sanitization)

### File Structure

```
app/
├── (homepage)/          # Homepage route group
├── (main)/             # Main layout group
│   └── layout.tsx
├── admin/              # Admin pages
│   ├── layout.tsx
│   ├── page.tsx
│   ├── properties/
│   └── locations/
├── api/                # API routes
│   ├── admin/
│   ├── properties/
│   ├── locations/
│   └── [form-endpoints]
├── properties-in/      # Dynamic location & property pages
│   └── [locationCategory]/
│       ├── page.tsx    # Location page
│       └── [slug]/
│           └── page.tsx  # Property page
├── [static-pages]/     # Static pages
└── layout.tsx          # Root layout

components/
├── admin/              # Admin components
├── ui/                 # shadcn/ui components
├── [feature-components]  # Feature-specific components
└── [form-components]   # Form components

lib/
├── supabase-server.ts  # Supabase admin client
├── supabase.ts         # Supabase client
├── email-service.ts    # Email service
├── property-url.ts     # URL generation utilities
├── [mappers]           # Database mappers
└── [utilities]         # Utility functions

types/
├── property.ts         # Property types
└── location.ts         # Location types
```

---

## 🔍 SEO IMPLEMENTATION

### Sitemap (`app/sitemap.ts`)

**Type:** Dynamic sitemap generation

**Includes:**
1. **Static Pages:** 13 pages (home, properties, services, contact, etc.)
2. **Location Pages:** All published locations from `locations_v2`
3. **Property Pages:** All published properties from `properties_v2` with resolved location slugs

**Generation Logic:**
- Fetches published locations
- Fetches published properties with `location_id`
- Resolves location slugs for properties
- Generates canonical URLs: `/properties-in-{location-slug}/{property-slug}`
- Filters out properties without valid location slugs

### Robots.txt (`app/robots.ts`)

**Configuration:**
- Allows all search engines
- Blocks `/admin/*` routes
- Blocks `/api/*` routes (except public endpoints)
- References sitemap URL
- Supports multiple user agents (Google, Bing, Yandex, Baidu)

### Structured Data

**Schemas Implemented:**
1. **Organization Schema** - Company information
2. **WebSite Schema** - Website search functionality
3. **Service Schema** - Service offerings
4. **Article Schema** - Property pages
5. **CollectionPage Schema** - Location pages
6. **LocalBusiness Schema** - Business information
7. **BreadcrumbSchema** - Navigation breadcrumbs
8. **ItemListSchema** - Property listings
9. **FAQPageSchema** - FAQ sections

**File:** `lib/structured-data.tsx`

### Meta Tags

**Dynamic Meta Tags:**
- Title, description, keywords
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card tags
- Canonical URLs
- Robots directives
- Author, creator, publisher tags

---

## 📦 DEPENDENCIES & INTEGRATIONS

### Core Dependencies

- `next` - Next.js framework
- `react` - React library
- `typescript` - TypeScript
- `tailwindcss` - CSS framework
- `@supabase/supabase-js` - Supabase client
- `nodemailer` - Email service
- `lucide-react` - Icons
- `@radix-ui/*` - UI primitives (via shadcn/ui)

### External Services

1. **Supabase:**
   - Database (PostgreSQL)
   - Authentication (admin)
   - Storage (Cloudflare R2 integration)

2. **Cloudinary:**
   - Image hosting
   - Video hosting
   - Image transformations

3. **Cloudflare R2:**
   - PDF brochure storage
   - Location images

4. **Gmail SMTP:**
   - Email delivery

---

## 🚀 PERFORMANCE OPTIMIZATIONS

1. **Image Optimization:**
   - Next.js Image component with lazy loading
   - Cloudinary transformations
   - Responsive image sizes

2. **API Caching:**
   - Public API routes use `Cache-Control` headers
   - `s-maxage=60, stale-while-revalidate=300`

3. **Pagination:**
   - Offset-based pagination
   - Fetches `limit + 1` to determine `hasMore` without count query
   - Prevents unnecessary data fetching

4. **Race Condition Prevention:**
   - `AbortController` for request cancellation
   - Prevents stale data from overwriting fresh data

5. **Code Splitting:**
   - Next.js automatic code splitting
   - Dynamic imports for heavy components

---

## 🔐 SECURITY MEASURES

1. **Input Validation:**
   - All form inputs sanitized
   - Email format validation
   - Phone format validation
   - Name format validation
   - Message length validation

2. **Rate Limiting:**
   - IP-based rate limiting on form submissions
   - Prevents spam and abuse

3. **SQL Injection Prevention:**
   - Supabase parameterized queries
   - No raw SQL queries

4. **XSS Prevention:**
   - Input sanitization
   - React automatic escaping

5. **Authentication:**
   - Session-based admin authentication
   - Protected admin routes

6. **Email Security:**
   - Input sanitization before email sending
   - Email injection prevention
   - Reply-to address validation

---

## 📈 MONITORING & LOGGING

1. **Error Logging:**
   - Console error logging
   - Error details logged with stack traces
   - Timestamp and client IP logged

2. **Email Verification:**
   - Email configuration verification endpoint
   - Connection testing

3. **Health Checks:**
   - `/api/health` endpoint for monitoring

---

## 🎯 KEY FEATURES

1. **Dynamic Content Management:**
   - Admin panel for properties and locations
   - No code changes needed for new content

2. **SEO Optimization:**
   - Dynamic sitemap
   - Structured data
   - Meta tags
   - Canonical URLs

3. **Advanced Filtering:**
   - Multi-select filters
   - Search on button click
   - Pagination

4. **Lead Generation:**
   - Multiple form types
   - Email notifications
   - Confirmation emails

5. **Performance:**
   - SSR for SEO
   - Client-side filtering
   - Optimized images
   - API caching

---

## 📝 NOTES

- All dynamic pages are generated server-side for SEO
- Property URLs are canonicalized based on database relationships
- Forms use rate limiting to prevent abuse
- Email service uses connection pooling for performance
- Admin panel requires authentication
- All file uploads go through validation and sanitization

---

**End of Report**

