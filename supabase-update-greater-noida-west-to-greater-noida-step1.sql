-- STEP 1: Add "Greater Noida" to location_category_enum
-- Run this FIRST in Supabase SQL Editor
-- Wait for it to complete, then run step 2

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

