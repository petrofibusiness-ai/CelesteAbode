-- Add location_category field to properties table
-- Run this SQL in your Supabase SQL Editor

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS location_category TEXT 
CHECK (location_category IN ('noida', 'greater-noida', 'yamuna-expressway', 'ghaziabad') OR location_category IS NULL);

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_properties_location_category ON properties(location_category);

-- Add comment for documentation
COMMENT ON COLUMN properties.location_category IS 'Category for location-based filtering: noida, greater-noida, yamuna-expressway, or ghaziabad';


