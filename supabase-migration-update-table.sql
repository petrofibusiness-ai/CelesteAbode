-- Migration Script: Update Existing Properties Table
-- Use this if you need to modify the table structure after it's been created
-- Run this in Supabase SQL Editor

-- ============================================
-- ADD NEW COLUMNS (if table already exists)
-- ============================================

-- Add a new column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'properties' AND column_name = 'new_column_name'
  ) THEN
    ALTER TABLE properties ADD COLUMN new_column_name TEXT;
  END IF;
END $$;

-- ============================================
-- MODIFY EXISTING COLUMNS
-- ============================================

-- Change column type (example: make a column nullable)
-- ALTER TABLE properties ALTER COLUMN rera_id DROP NOT NULL;

-- Change default value
-- ALTER TABLE properties ALTER COLUMN status SET DEFAULT 'Under Construction';

-- ============================================
-- UPDATE EXISTING DATA WHEN ADDING NEW COLUMNS
-- ============================================

-- Example: If you add a new column and want to set default values for existing rows
-- ALTER TABLE properties ADD COLUMN IF NOT EXISTS new_field TEXT DEFAULT 'default-value';
-- UPDATE properties SET new_field = 'default-value' WHERE new_field IS NULL;

-- ============================================
-- RENAME COLUMNS (if needed)
-- ============================================

-- ALTER TABLE properties RENAME COLUMN old_column_name TO new_column_name;

-- ============================================
-- DROP COLUMNS (be careful!)
-- ============================================

-- ALTER TABLE properties DROP COLUMN IF EXISTS column_to_remove;

-- ============================================
-- UPDATE DATA FOR EXISTING RECORDS
-- ============================================

-- Set default values for existing NULL records
UPDATE properties 
SET status = 'Under Construction' 
WHERE status IS NULL;

UPDATE properties 
SET unit_types = '[]'::jsonb 
WHERE unit_types IS NULL;

UPDATE properties 
SET images = '[]'::jsonb 
WHERE images IS NULL;

UPDATE properties 
SET amenities = '[]'::jsonb 
WHERE amenities IS NULL;

UPDATE properties 
SET videos = '[]'::jsonb 
WHERE videos IS NULL;

UPDATE properties 
SET seo = '{}'::jsonb 
WHERE seo IS NULL;

UPDATE properties 
SET is_published = false 
WHERE is_published IS NULL;

-- ============================================
-- VERIFY TABLE STRUCTURE
-- ============================================

-- View all columns in the properties table
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_name = 'properties'
ORDER BY ordinal_position;

