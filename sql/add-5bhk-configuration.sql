-- Migration: Add '5 BHK' to configuration_enum
-- Run this SQL in your Supabase SQL Editor
-- This adds '5 BHK' as a new option to the configuration enum

-- ============================================
-- ADD '5 BHK' TO CONFIGURATION ENUM
-- ============================================

-- Add '5 BHK' to the existing configuration_enum type
-- Note: ALTER TYPE ... ADD VALUE must be run in a transaction block
DO $$ 
BEGIN
  -- Check if '5 BHK' already exists in the enum
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_enum 
    WHERE enumlabel = '5 BHK' 
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'configuration_enum')
  ) THEN
    -- Add '5 BHK' to the enum
    ALTER TYPE configuration_enum ADD VALUE IF NOT EXISTS '5 BHK';
  END IF;
END $$;

-- ============================================
-- UPDATE COLUMN COMMENT
-- ============================================

COMMENT ON COLUMN properties.configuration IS 'Array of unit configurations (multiple selectable): 2 BHK, 2 BHK + Study, 3 BHK, 3 BHK + Study, 4 BHK, 5 BHK';

-- ============================================
-- VERIFY THE CHANGE
-- ============================================

-- View all values in the configuration_enum type
SELECT 
  enumlabel AS configuration_value,
  enumsortorder
FROM pg_enum
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'configuration_enum')
ORDER BY enumsortorder;
