-- Migration: Update "Greater Noida West" to "Greater Noida" in location_category_enum
-- Run this SQL in your Supabase SQL Editor
-- IMPORTANT: Run STEP 1 first, then STEP 2 in a separate execution
-- PostgreSQL requires new enum values to be committed before they can be used

-- ============================================
-- STEP 1: Add the new enum value first
-- ============================================
-- Run this block FIRST and wait for it to complete
-- Then run STEP 2 in a separate query execution

DO $$ 
BEGIN
  -- Check if the new enum value already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'Greater Noida' 
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'location_category_enum')
  ) THEN
    -- Add the new enum value 'Greater Noida' to the enum type
    ALTER TYPE location_category_enum ADD VALUE 'Greater Noida';
    RAISE NOTICE 'Added "Greater Noida" to location_category_enum';
  ELSE
    RAISE NOTICE '"Greater Noida" already exists in location_category_enum';
  END IF;
END $$;

-- ============================================
-- STEP 2: Update existing data in properties table
-- ============================================
-- IMPORTANT: Run this AFTER STEP 1 has completed successfully
-- Run this in a SEPARATE query execution (new query tab/window)

-- Now update all existing records that have 'Greater Noida West' to 'Greater Noida'
UPDATE properties 
SET location_category = 'Greater Noida'::location_category_enum
WHERE location_category = 'Greater Noida West'::location_category_enum;

-- Show how many records were updated
DO $$
DECLARE
  updated_count INTEGER;
BEGIN
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE 'Updated % records from "Greater Noida West" to "Greater Noida"', updated_count;
END $$;

-- ============================================
-- STEP 3: Remove old enum value (if safe)
-- ============================================
-- WARNING: PostgreSQL doesn't support removing enum values directly
-- The old value 'Greater Noida West' will remain in the enum type but won't be used
-- This is safe and doesn't affect functionality
-- If you want to completely remove it, you would need to:
-- 1. Create a new enum without 'Greater Noida West'
-- 2. Migrate all data
-- 3. Drop old enum and rename new one
-- This is more complex and usually not necessary

-- ============================================
-- VERIFICATION
-- ============================================
-- Run these queries to verify the migration:

-- Check all location_category values in properties table
-- SELECT DISTINCT location_category FROM properties ORDER BY location_category;

-- Check if any properties still have 'Greater Noida West'
-- SELECT COUNT(*) FROM properties WHERE location_category = 'Greater Noida West'::location_category_enum;
-- (Should return 0)

-- Check count of properties with 'Greater Noida'
-- SELECT COUNT(*) FROM properties WHERE location_category = 'Greater Noida'::location_category_enum;

