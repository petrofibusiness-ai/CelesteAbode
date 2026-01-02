-- STEP 2: Update existing data from "Greater Noida West" to "Greater Noida"
-- Run this AFTER step 1 has completed successfully
-- This must be run in a SEPARATE query execution

-- Update all existing records that have 'Greater Noida West' to 'Greater Noida'
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

-- Verification query (optional - run to check results)
-- SELECT DISTINCT location_category FROM properties ORDER BY location_category;

