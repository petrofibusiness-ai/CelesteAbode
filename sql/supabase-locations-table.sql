-- Locations table for Celeste Abode admin panel
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  location_name TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  hero_text TEXT NOT NULL,
  hero_subtext TEXT NOT NULL,
  explore_section_heading TEXT DEFAULT 'Explore Our Curated Collection',
  explore_section_description TEXT DEFAULT 'RERA-compliant projects with verified credentials and transparent documentation',
  localities JSONB DEFAULT '[]'::jsonb,
  why_invest_content JSONB DEFAULT '[]'::jsonb,
  celeste_abode_image TEXT,
  faqs JSONB DEFAULT '[]'::jsonb,
  footer_cta_heading TEXT DEFAULT 'Ready to Find Your Home',
  footer_cta_description TEXT,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  meta_keywords TEXT[] DEFAULT '{}',
  og_image TEXT,
  og_title TEXT,
  og_description TEXT,
  image_alt_texts JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);

-- Create index on is_published for filtering published locations
CREATE INDEX IF NOT EXISTS idx_locations_is_published ON locations(is_published);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_locations_created_at ON locations(created_at DESC);

-- Trigger to automatically update updated_at on row update
CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published locations only
CREATE POLICY "Public can view published locations"
  ON locations
  FOR SELECT
  USING (is_published = true);

-- Add comments for documentation
COMMENT ON TABLE locations IS 'Stores location pages for Celeste Abode website';
COMMENT ON COLUMN locations.slug IS 'URL-friendly identifier (e.g., "noida", "greater-noida")';
COMMENT ON COLUMN locations.localities IS 'Array of locality objects with value and label';
COMMENT ON COLUMN locations.why_invest_content IS 'Array of paragraph strings for why invest section';
COMMENT ON COLUMN locations.faqs IS 'Array of FAQ objects with question and answer';
COMMENT ON COLUMN locations.image_alt_texts IS 'Object with alt text for different images (hero, celeste_abode, etc.)';

