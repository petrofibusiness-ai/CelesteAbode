-- SQL Examples for Updating Properties in Supabase
-- Use these queries in Supabase SQL Editor to update existing property records

-- ============================================
-- UPDATE SINGLE PROPERTY BY ID
-- ============================================

-- Update a specific property by ID
UPDATE properties
SET 
  project_name = 'Updated Project Name',
  developer = 'Updated Developer',
  location = 'Updated Location',
  status = 'Ready to Move',
  price = '₹3 Cr - ₹5 Cr',
  is_published = true
WHERE id = 'your-property-id-here';

-- ============================================
-- UPDATE PROPERTY BY SLUG
-- ============================================

-- Update property by slug (useful if you know the URL slug)
UPDATE properties
SET 
  project_name = 'FOREST WALK VILLA',
  description = 'Updated description here...',
  hero_image = 'https://your-r2-url.com/forest-walk-villa/forest-walk-villa_hero.jpg'
WHERE slug = 'forest-walk-villa';

-- ============================================
-- UPDATE MULTIPLE FIELDS
-- ============================================

-- Update multiple fields at once
UPDATE properties
SET 
  project_name = 'New Project Name',
  developer = 'New Developer Name',
  location = 'New Location',
  rera_id = 'UPRERAPRJ658961/08/2025',
  status = 'Under Construction',
  possession_date = 'June 2027',
  sizes = '163 sq. yd - 238 sq. yd',
  price = '₹2.5 Cr - ₹4 Cr',
  description = 'Updated property description...',
  unit_types = '["4 BHK + 5T Villas", "5 BHK Villas"]'::jsonb,
  amenities = '["Swimming Pool", "Gym", "Park"]'::jsonb,
  images = '["https://url1.com/image1.jpg", "https://url2.com/image2.jpg"]'::jsonb,
  seo = '{"title": "SEO Title", "description": "SEO Description", "keywords": "keyword1, keyword2"}'::jsonb,
  is_published = true
WHERE slug = 'your-slug-here';

-- ============================================
-- UPDATE ARRAY FIELDS (unit_types, images, amenities, videos)
-- ============================================

-- Add to existing array (unit_types)
UPDATE properties
SET unit_types = unit_types || '["New Unit Type"]'::jsonb
WHERE id = 'your-property-id-here';

-- Replace entire array (images)
UPDATE properties
SET images = '["https://new-image1.jpg", "https://new-image2.jpg"]'::jsonb
WHERE slug = 'your-slug-here';

-- Update videos array
UPDATE properties
SET videos = '[
  {
    "title": "Property Tour",
    "src": "https://video-url.mp4",
    "thumbnail": "https://thumbnail-url.jpg"
  }
]'::jsonb
WHERE id = 'your-property-id-here';

-- ============================================
-- UPDATE SEO OBJECT
-- ============================================

-- Update SEO metadata
UPDATE properties
SET seo = '{
  "title": "Custom SEO Title",
  "description": "Custom SEO Description for search engines",
  "keywords": "luxury villa, noida, residential property",
  "ogImage": "https://og-image-url.jpg",
  "canonical": "https://yoursite.com/projects/property-slug"
}'::jsonb
WHERE slug = 'your-slug-here';

-- ============================================
-- BULK UPDATES
-- ============================================

-- Update all unpublished properties to published
UPDATE properties
SET is_published = true
WHERE is_published = false;

-- Update status for all properties
UPDATE properties
SET status = 'Ready to Move'
WHERE status = 'Under Construction';

-- ============================================
-- CONDITIONAL UPDATES
-- ============================================

-- Update only if certain condition is met
UPDATE properties
SET price = '₹3 Cr - ₹5 Cr'
WHERE slug = 'forest-walk-villa' 
  AND price IS NULL;

-- ============================================
-- VIEW EXISTING DATA BEFORE UPDATING
-- ============================================

-- View all properties
SELECT * FROM properties ORDER BY created_at DESC;

-- View specific property by slug
SELECT * FROM properties WHERE slug = 'forest-walk-villa';

-- View property by ID
SELECT * FROM properties WHERE id = 'your-property-id-here';

-- View only published properties
SELECT * FROM properties WHERE is_published = true;

-- ============================================
-- NOTES
-- ============================================
-- 1. The updated_at timestamp is automatically updated by the trigger
-- 2. Always use WHERE clause to avoid updating all records
-- 3. Test with SELECT first to see what you're updating
-- 4. JSONB fields (unit_types, images, videos, amenities, seo) need proper JSON format
-- 5. Use single quotes for JSON strings, double quotes inside JSON

