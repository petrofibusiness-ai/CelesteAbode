# Admin Panel Setup Guide

This guide will help you set up the Celeste Abode Admin Panel for managing property pages dynamically.

## Prerequisites

1. **Supabase Account**: For database and file storage (Cloudflare R2)
2. **Cloudinary Account**: For image and video hosting
3. **Environment Variables**: Configure all required credentials

## Phase 1: Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key from Settings → API

### 2. Create Properties Table

Run this SQL in Supabase SQL Editor:

```sql
-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  project_name TEXT NOT NULL,
  developer TEXT NOT NULL,
  location TEXT NOT NULL,
  rera_id TEXT,
  status TEXT NOT NULL,
  possession_date TEXT,
  unit_types TEXT[] DEFAULT '{}',
  sizes TEXT NOT NULL,
  description TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  brochure_url TEXT,
  images TEXT[] DEFAULT '{}',
  videos JSONB DEFAULT '[]',
  amenities TEXT[] DEFAULT '{}',
  price TEXT,
  seo JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_published ON properties(is_published);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access (adjust based on your auth setup)
-- For now, we'll use service role key for admin operations
-- In production, implement proper RLS policies
```

### 3. Create Storage Bucket

1. Go to Storage in Supabase dashboard
2. Create a bucket named `Celesta_Abode` (or match your existing bucket name)
3. Make it public for brochure downloads
4. Set up CORS if needed

## Phase 2: Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Admin Authentication
ADMIN_EMAIL=admin@celesteabode.com
ADMIN_PASSWORD=your-secure-password
ADMIN_JWT_SECRET=your-random-secret-key-min-32-chars

# Cloudinary Configuration
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Generate JWT Secret

```bash
# Generate a secure random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Phase 3: Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret from Dashboard
3. Add them to `.env.local`

## Phase 4: File Upload Configuration

### Cloudflare R2 (via Supabase Storage)

- PDFs (brochures) are uploaded to Supabase Storage bucket `Celesta_Abode`
- The URL pattern matches: `https://[project].supabase.co/storage/v1/object/public/Celesta_Abode/[filename]`

### Cloudinary

- Images and videos are uploaded to Cloudinary
- Folder structure: `celeste-abode/properties/` for images, `celeste-abode/properties/videos/` for videos

## Phase 5: Testing

1. Start the development server: `npm run dev`
2. Navigate to `/admin/login`
3. Login with your admin credentials
4. Create a test property to verify:
   - Database connection
   - File uploads (PDF, images, videos)
   - Property creation
   - Dynamic page generation

## Phase 6: Dynamic Page Generation

The admin panel creates properties in the database. To generate dynamic pages:

1. Create a dynamic route: `app/projects/[slug]/page.tsx`
2. Fetch property data from Supabase based on slug
3. Render using the same structure as `forest-walk-villa/page.tsx`

## Security Notes

1. **Never commit `.env.local`** to version control
2. Use strong passwords for admin accounts
3. Rotate JWT secrets regularly
4. Implement rate limiting on upload endpoints
5. Validate all file uploads (type, size)
6. Use RLS policies in Supabase for production

## Next Steps

- [ ] Set up Supabase database
- [ ] Configure environment variables
- [ ] Test file uploads
- [ ] Create first property via admin panel
- [ ] Implement dynamic page generation
- [ ] Set up sitemap auto-generation
- [ ] Add SEO management features

