-- Migration: Add enum columns to properties table
-- Run this SQL in your Supabase SQL Editor
-- This adds: property_type, location_category, project_status, and updates configuration

-- ============================================
-- CREATE ENUM TYPES
-- ============================================

-- Property Type Enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_type_enum') THEN
    CREATE TYPE property_type_enum AS ENUM (
      'Apartment/Flats',
      'Villas',
      'Plots/Lands'
    );
  END IF;
END $$;

-- Location Category Enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'location_category_enum') THEN
    CREATE TYPE location_category_enum AS ENUM (
      'Noida',
      'Greater Noida West',
      'Yamuna Expressway',
      'Ghaziabad',
      'Lucknow',
      'Gurgaon',
      'Delhi',
      'Pune',
      'Bangalore',
      'Jaipur',
      'Hyderabad',
      'Gujarat',
      'Nainital',
      'Chandigarh'
    );
  END IF;
END $$;

-- Project Status Enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_status_enum') THEN
    CREATE TYPE project_status_enum AS ENUM (
      'New Launch',
      'Under Construction',
      'Ready to Move'
    );
  END IF;
END $$;

-- Configuration Enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'configuration_enum') THEN
    CREATE TYPE configuration_enum AS ENUM (
      '2 BHK',
      '2 BHK + Study',
      '3 BHK',
      '3 BHK + Study',
      '4 BHK'
    );
  END IF;
END $$;

-- ============================================
-- ADD COLUMNS TO PROPERTIES TABLE
-- ============================================

-- Add property_type column
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'properties' AND column_name = 'property_type'
  ) THEN
    ALTER TABLE properties 
    ADD COLUMN property_type property_type_enum;
  END IF;
END $$;

-- Add location_category column (replace existing if it exists)
DO $$ 
BEGIN
  -- Drop existing location_category if it exists (with old constraint)
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'properties' AND column_name = 'location_category'
  ) THEN
    ALTER TABLE properties DROP COLUMN location_category;
  END IF;
  
  -- Add new location_category with enum type
  ALTER TABLE properties 
  ADD COLUMN location_category location_category_enum;
END $$;

-- Add project_status column
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'properties' AND column_name = 'project_status'
  ) THEN
    ALTER TABLE properties 
    ADD COLUMN project_status project_status_enum;
  END IF;
END $$;

-- Convert unit_types from JSONB to configuration enum array
-- This preserves existing data by converting it
DO $$ 
DECLARE
  v_column_type text;
BEGIN
  -- Check if unit_types column exists and get its type
  SELECT data_type INTO v_column_type
  FROM information_schema.columns
  WHERE table_name = 'properties' AND column_name = 'unit_types';
  
  IF v_column_type = 'jsonb' THEN
    -- Step 1: Add temporary column with enum array type
    ALTER TABLE properties 
    ADD COLUMN configuration_new configuration_enum[] DEFAULT ARRAY[]::configuration_enum[];
    
    -- Step 2: Migrate data from JSONB to enum array
    -- Only migrate values that match the enum (safe conversion)
    UPDATE properties 
    SET configuration_new = ARRAY(
      SELECT DISTINCT value::text::configuration_enum
      FROM jsonb_array_elements_text(unit_types) AS value
      WHERE value::text IN ('2 BHK', '2 BHK + Study', '3 BHK', '3 BHK + Study', '4 BHK')
    )
    WHERE unit_types IS NOT NULL 
      AND unit_types != '[]'::jsonb
      AND jsonb_array_length(unit_types) > 0;
    
    -- Step 3: Drop old column
    ALTER TABLE properties DROP COLUMN unit_types;
    
    -- Step 4: Rename new column to configuration
    ALTER TABLE properties RENAME COLUMN configuration_new TO configuration;
    
  ELSIF v_column_type IS NULL THEN
    -- Column doesn't exist, create it
    ALTER TABLE properties 
    ADD COLUMN configuration configuration_enum[] DEFAULT ARRAY[]::configuration_enum[];
  END IF;
END $$;

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_location_category ON properties(location_category);
CREATE INDEX IF NOT EXISTS idx_properties_project_status ON properties(project_status);
CREATE INDEX IF NOT EXISTS idx_properties_configuration ON properties USING GIN(configuration);

-- ============================================
-- ADD COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON COLUMN properties.property_type IS 'Type of property: Apartment/Flats, Villas, or Plots/Lands';
COMMENT ON COLUMN properties.location_category IS 'Location category for filtering properties by region';
COMMENT ON COLUMN properties.project_status IS 'Current status of the project: New Launch, Under Construction, or Ready to Move';
COMMENT ON COLUMN properties.configuration IS 'Array of unit configurations (multiple selectable): 2 BHK, 2 BHK + Study, 3 BHK, 3 BHK + Study, 4 BHK';

-- ============================================
-- OPTIONAL: Migrate existing status to project_status
-- ============================================
-- If you want to populate project_status from existing status column:
-- 
-- UPDATE properties 
-- SET project_status = CASE 
--   WHEN status ILIKE '%new launch%' THEN 'New Launch'::project_status_enum
--   WHEN status ILIKE '%under construction%' THEN 'Under Construction'::project_status_enum
--   WHEN status ILIKE '%ready to move%' OR status ILIKE '%ready%' THEN 'Ready to Move'::project_status_enum
--   ELSE NULL
-- END
-- WHERE project_status IS NULL;

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

