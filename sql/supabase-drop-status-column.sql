-- Migration: Drop status column from properties table
-- Run this SQL in your Supabase SQL Editor
-- This removes the legacy status column since we're now using project_status enum

-- ============================================
-- DROP STATUS COLUMN
-- ============================================

-- Drop the status column if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'properties' AND column_name = 'status'
  ) THEN
    ALTER TABLE properties DROP COLUMN status;
    RAISE NOTICE 'Dropped status column from properties table';
  ELSE
    RAISE NOTICE 'status column does not exist, skipping';
  END IF;
END $$;

-- ============================================
-- DROP STATUS INDEX IF EXISTS
-- ============================================

-- Drop index on status if it exists
DROP INDEX IF EXISTS idx_properties_status;

-- ============================================
-- VERIFY THE CHANGES
-- ============================================

-- View all columns in the properties table
SELECT 
  column_name, 
  data_type,
  udt_name,
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_name = 'properties'
ORDER BY ordinal_position;

