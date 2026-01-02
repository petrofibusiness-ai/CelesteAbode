-- Properties table for Celeste Abode admin panel
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  project_name TEXT NOT NULL,
  developer TEXT NOT NULL,
  location TEXT NOT NULL,
  rera_id TEXT,
  status TEXT NOT NULL DEFAULT 'Under Construction',
  possession_date TEXT,
  unit_types JSONB DEFAULT '[]'::jsonb,
  sizes TEXT NOT NULL,
  description TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  brochure_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  videos JSONB DEFAULT '[]'::jsonb,
  amenities JSONB DEFAULT '[]'::jsonb,
  price TEXT,
  seo JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);

-- Create index on is_published for filtering published properties
CREATE INDEX IF NOT EXISTS idx_properties_is_published ON properties(is_published);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row update
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) - Optional, but recommended
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published properties only
CREATE POLICY "Public can view published properties"
  ON properties
  FOR SELECT
  USING (is_published = true);

-- Policy: Admin can do everything (this will be handled by service role key in API routes)
-- Note: Service role key bypasses RLS, so these policies are mainly for direct database access

-- Add comments for documentation
COMMENT ON TABLE properties IS 'Stores property listings for Celeste Abode website';
COMMENT ON COLUMN properties.slug IS 'URL-friendly identifier (e.g., "forest-walk-villa")';
COMMENT ON COLUMN properties.unit_types IS 'Array of unit types (e.g., ["4 BHK + 5T Villas"])';
COMMENT ON COLUMN properties.images IS 'Array of image URLs from Cloudflare R2';
COMMENT ON COLUMN properties.videos IS 'Array of video objects with title, src, and thumbnail';
COMMENT ON COLUMN properties.amenities IS 'Array of amenity strings';
COMMENT ON COLUMN properties.seo IS 'SEO metadata object with title, description, keywords, etc.';

