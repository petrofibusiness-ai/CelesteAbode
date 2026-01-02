# Dynamic Location Pages Architecture

## Overview

This document describes the architecture and implementation of the dynamic location pages system for Celeste Abode. This system allows administrators to create and manage location-specific property pages dynamically through the admin panel, eliminating the need for hardcoded pages.

## Architecture

### Database Schema

**Table: `locations`**

The locations table stores all configuration and content for location-specific pages.

```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,                    -- URL slug (e.g., "noida", "greater-noida")
  location_name TEXT NOT NULL,                   -- Display name (e.g., "Noida")
  hero_image TEXT NOT NULL,                      -- Hero section image URL (Cloudflare R2)
  hero_text TEXT NOT NULL,                       -- Hero heading text
  hero_subtext TEXT NOT NULL,                    -- Hero subheading text
  explore_section_heading TEXT,                  -- "Explore Our Curated Collection" heading
  explore_section_description TEXT,              -- Explore section description
  localities JSONB,                              -- Array of {value, label} objects for filter
  why_invest_content JSONB,                      -- Array of paragraph strings
  celeste_abode_image TEXT,                     -- Celeste Abode section image (defaults to hero)
  faqs JSONB,                                   -- Array of {id, question, answer} objects
  footer_cta_heading TEXT,                      -- Footer CTA heading
  footer_cta_description TEXT,                 -- Footer CTA description
  meta_title TEXT NOT NULL,                     -- SEO meta title
  meta_description TEXT NOT NULL,               -- SEO meta description
  meta_keywords TEXT[],                         -- SEO keywords array
  og_image TEXT,                                -- Open Graph image
  og_title TEXT,                                -- Open Graph title
  og_description TEXT,                          -- Open Graph description
  image_alt_texts JSONB,                        -- {hero, celeste_abode, og} alt texts
  is_published BOOLEAN DEFAULT false,           -- Publication status
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### File Structure

```
app/
├── api/
│   ├── admin/
│   │   ├── locations/
│   │   │   ├── route.ts                    # GET (list), POST (create)
│   │   │   └── [slug]/
│   │   │       └── route.ts              # GET, PUT, DELETE by slug
│   │   └── upload/
│   │       └── location-image/
│   │           └── route.ts               # Image upload for locations
│   └── locations/
│       └── [slug]/
│           └── route.ts                   # Public API for location data
├── admin/
│   └── locations/
│       ├── page.tsx                        # Locations list page
│       ├── new/
│       │   └── page.tsx                    # Create new location
│       └── [slug]/
│           └── edit/
│               └── page.tsx                # Edit location
└── properties-in-[location]/
    ├── page.tsx                            # Dynamic location page
    └── not-found.tsx                       # 404 page for invalid locations

components/
├── admin/
│   └── location-form.tsx                   # Location form component
├── location-contact-form.tsx               # Contact form for location pages
├── location-faqs.tsx                       # Dynamic FAQ component
├── location-property-filters.tsx           # Property filters with localities
└── why-invest-section.tsx                  # "Why Invest" section component

types/
└── location.ts                             # TypeScript interfaces

lib/
└── supabase-location-mapper.ts             # Data mapper (camelCase ↔ snake_case)
```

## Components

### 1. Admin Panel

#### Location Form (`components/admin/location-form.tsx`)

A comprehensive form component for creating and editing location pages.

**Features:**
- **Basic Information**: Slug, location name
- **Hero Section**: Image upload, text, subtext
- **Explore Section**: Heading and description
- **Localities Management**: Add/remove localities with value and label inputs
- **Why Invest Content**: Add/remove paragraphs
- **Celeste Abode Section**: Image upload (defaults to hero image)
- **FAQs**: Add/remove FAQ items with question and answer
- **Footer CTA**: Heading and description
- **SEO Settings**: Meta title, description, keywords, OG tags, alt texts
- **Publish Toggle**: Control publication status

**Image Upload:**
- Uses Cloudflare R2 storage
- Uploads to: `{location-slug}/{location-slug}_hero.{ext}` or `{location-slug}/{location-slug}_celeste-abode.{ext}`
- Supports hero and celeste-abode image types

#### Admin Pages

- **`/admin/locations`**: List all locations with publish/unpublish toggle
- **`/admin/locations/new`**: Create new location page
- **`/admin/locations/[slug]/edit`**: Edit existing location page

### 2. Dynamic Location Page

#### Route: `app/properties-in-[location]/page.tsx`

A server component that dynamically generates location pages based on the slug.

**Flow:**
1. Extracts `location` slug from URL params
2. Fetches location data from Supabase (published only)
3. Fetches initial 6 properties for that location
4. Renders all sections with dynamic content

**Sections:**
- **Hero Section**: Full viewport with location-specific image, text, and subtext
- **Properties Grid**: Shows properties filtered by location with pagination
- **Property Filters**: Multi-select locality filter, property type, status, configuration
- **Why Invest Section**: Dynamic paragraphs explaining location benefits
- **Celeste Abode Section**: Brand section with image
- **FAQ Section**: Dynamic FAQs (if any)
- **Footer CTA**: Location-specific contact form

**SEO:**
- Dynamic metadata generation
- Open Graph tags
- Canonical URLs
- Structured data support

### 3. Reusable Components

#### `LocationFAQs` (`components/location-faqs.tsx`)
- Client component for FAQ accordion
- Accepts `faqs` array prop
- Animated expand/collapse

#### `WhyInvestSection` (`components/why-invest-section.tsx`)
- Server component for "Why Invest" content
- Accepts `location` prop
- Renders paragraphs in styled card

#### `LocationContactForm` (`components/location-contact-form.tsx`)
- Generalized contact form for location pages
- Accepts `location` and `locationDisplayName` props
- Submits to `/api/location-contact` endpoint

#### `LocationPropertyFilters` (`components/location-property-filters.tsx`)
- Multi-select filter component
- Supports localities (multi-select), property type, status, configuration
- Responsive design (desktop: 4 filters in line, mobile: 2x2 grid)

## API Routes

### Admin Routes (Protected)

#### `GET /api/admin/locations`
- Lists all locations (admin only)
- Returns array of location objects

#### `POST /api/admin/locations`
- Creates new location
- Validates required fields
- Returns created location

#### `GET /api/admin/locations/[slug]`
- Gets single location by slug (admin only)
- Returns location object

#### `PUT /api/admin/locations/[slug]`
- Updates location by slug
- Partial updates supported
- Returns updated location

#### `DELETE /api/admin/locations/[slug]`
- Deletes location by slug
- Returns success status

#### `POST /api/admin/upload/location-image`
- Uploads hero or celeste-abode image to R2
- Requires: `file`, `locationSlug`, `imageType`
- Returns: `{url, key}`

### Public Routes

#### `GET /api/locations/[slug]`
- Gets published location data
- Used for client-side fetching if needed
- Returns location object

## Data Flow

### Creating a Location Page

```
1. Admin fills form in /admin/locations/new
   ↓
2. Uploads hero image → R2 → Returns URL
   ↓
3. Fills all fields (localities, FAQs, content, SEO)
   ↓
4. Submits form → POST /api/admin/locations
   ↓
5. API validates → Saves to Supabase
   ↓
6. Location page available at /properties-in-[slug]
```

### Rendering a Location Page

```
1. User visits /properties-in-[location]
   ↓
2. Next.js extracts slug from params
   ↓
3. Server fetches location from Supabase (published only)
   ↓
4. Fetches initial properties for that location
   ↓
5. Generates metadata dynamically
   ↓
6. Renders page with all dynamic content
```

## Key Features

### 1. Image Management
- **Hero Image**: Required, uploaded to R2
- **Celeste Abode Image**: Optional, defaults to hero image if not provided
- **OG Image**: Optional, defaults to hero image
- **Alt Texts**: Configurable for SEO

### 2. Localities Management
- **Multi-select dropdown** in property filters
- **Admin can add** localities with:
  - Value: URL-friendly identifier (e.g., "sector-62")
  - Label: Display name (e.g., "Sector 62")
- **Validation**: Prevents duplicates, requires both fields

### 3. Content Management
- **Why Invest**: Multiple paragraphs (array)
- **FAQs**: Dynamic Q&A pairs
- **SEO**: Full control over meta tags, OG tags, keywords

### 4. Property Filtering
- Properties are filtered by `location_category` field
- Falls back to location name matching if category not set
- Supports pagination (6 properties per load)

## Security

### Authentication
- All admin routes require authentication via `getCurrentUser()`
- Public routes use admin client to bypass RLS for published content

### Data Validation
- Server-side validation for all inputs
- Slug validation (lowercase, hyphens only)
- Image URL validation
- Required field validation

### Row Level Security (RLS)
- Locations table has RLS enabled
- Public can only view published locations
- Admin operations use service role key (bypasses RLS)

## SEO Optimization

### Dynamic Metadata
- Meta title, description, keywords per location
- Open Graph tags for social sharing
- Canonical URLs
- Image alt texts for accessibility

### Structured Data
- Ready for schema markup integration
- Location-specific content for better indexing

## Migration from Static to Dynamic

### Before
- Hardcoded pages: `/properties-in-noida`, `/properties-in-greater-noida`, etc.
- Static content in page files
- Manual updates required for each location

### After
- Single dynamic route: `/properties-in-[location]`
- Content managed through admin panel
- Easy to add new locations without code changes

## Usage Example

### Creating a New Location Page

1. **Navigate to Admin Panel**
   ```
   /admin/locations/new
   ```

2. **Fill Basic Information**
   - Slug: `greater-noida`
   - Location Name: `Greater Noida`

3. **Upload Hero Image**
   - Click "Upload Hero Image"
   - Image uploaded to R2 automatically

4. **Add Hero Content**
   - Hero Text: `Premium Properties in Greater Noida`
   - Hero Subtext: `Curated residential opportunities...`

5. **Add Localities**
   - Click "Add Locality"
   - Enter Value: `sector-omega`
   - Enter Label: `Sector Omega`
   - Click "Add Locality" button

6. **Add Why Invest Content**
   - Click "Add Paragraph"
   - Enter paragraph text
   - Repeat for multiple paragraphs

7. **Add FAQs**
   - Click "Add FAQ"
   - Enter question and answer
   - Repeat for multiple FAQs

8. **Configure SEO**
   - Meta Title: `Properties in Greater Noida | Celeste Abode`
   - Meta Description: `Discover premium properties...`
   - Add keywords
   - Set OG image and tags

9. **Publish**
   - Check "Publish this location page"
   - Click "Create Location"

10. **Page Available**
    - Page accessible at: `/properties-in-greater-noida`
    - All sections render with dynamic content

## Technical Details

### Image Upload Flow

```typescript
1. User selects image file
2. File stored temporarily in component state
3. On form submit:
   a. Upload to R2 via /api/admin/upload/location-image
   b. Returns public URL
   c. URL saved to form data
4. Form data submitted to API
5. URL stored in database
```

### Data Mapping

**TypeScript (camelCase) ↔ Supabase (snake_case)**

- `locationName` ↔ `location_name`
- `heroImage` ↔ `hero_image`
- `whyInvestContent` ↔ `why_invest_content`
- etc.

Mapper functions handle conversion automatically.

### Pagination

- Initial load: 6 properties
- "View More" button loads 6 more
- Uses `/api/properties/by-location/[category]` endpoint
- Efficient: Fetches `limit + 1` to determine `hasMore` without count query

## Future Enhancements

1. **Bulk Import**: Import locations from CSV
2. **Templates**: Save location page templates
3. **Analytics**: Track page views per location
4. **A/B Testing**: Test different content variations
5. **Multi-language**: Support for multiple languages per location

## Dependencies

- **Next.js 14+**: App Router, Server Components
- **Supabase**: Database and storage
- **Cloudflare R2**: Image storage
- **Framer Motion**: Animations
- **Radix UI**: Checkbox component
- **Tailwind CSS**: Styling

## Environment Variables

Required for image uploads:
```
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

## Database Migration

Run the SQL migration file to create the locations table:

```bash
# In Supabase SQL Editor
supabase-locations-table.sql
```

## Testing Checklist

- [ ] Create new location page
- [ ] Upload hero image
- [ ] Add localities
- [ ] Add FAQs
- [ ] Add "Why Invest" content
- [ ] Configure SEO settings
- [ ] Publish location
- [ ] Verify page renders at `/properties-in-[slug]`
- [ ] Test property filtering
- [ ] Test contact form submission
- [ ] Edit existing location
- [ ] Delete location
- [ ] Verify 404 for invalid slugs

## Notes

- The old static `/properties-in-noida` page still exists but can be migrated to use the dynamic system
- All location pages follow the same structure and styling
- Content is fully customizable through the admin panel
- SEO is optimized per location with unique meta tags and content

