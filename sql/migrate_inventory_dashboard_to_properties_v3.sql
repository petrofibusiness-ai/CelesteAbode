-- Run in Supabase SQL Editor after `properties_v3` is the canonical projects table and
-- `property_listing_configurations.property_id` values point at `properties_v3.id` rows.
--
-- 1) Fix FK on configuration lines (constraint name may differ — check:
--    SELECT conname FROM pg_constraint WHERE conrelid = 'property_listing_configurations'::regclass;)
-- 2) Recreate `property_inventory_dashboard_rows` so it reads from `properties_v3`.

-- Step A: foreign key → properties_v3
ALTER TABLE property_listing_configurations
  DROP CONSTRAINT IF EXISTS property_listing_configurations_property_id_fkey;

ALTER TABLE property_listing_configurations
  ADD CONSTRAINT property_listing_configurations_property_id_fkey
  FOREIGN KEY (property_id) REFERENCES properties_v3 (id) ON DELETE CASCADE;

-- Step B: dashboard view (matches column layout expected by the app)
DROP VIEW IF EXISTS property_inventory_dashboard_rows;

CREATE VIEW property_inventory_dashboard_rows AS
SELECT
  c.id AS line_id,
  p.id AS property_id,
  c.configuration AS configuration_label,
  c.size_sqft,
  c.price_cr,
  COALESCE(c.sort_order, 0) AS sort_order,
  c.created_at AS line_created_at,
  p.slug,
  p.project_name,
  p.location AS location_label,
  p.location_id,
  p.locality_id,
  p.hero_image,
  p.hero_image_alt,
  p.possession_date,
  p.inventory_towers,
  p.created_at AS property_created_at
FROM properties_v3 p
LEFT JOIN property_listing_configurations c ON c.property_id = p.id
WHERE p.is_published = true;

COMMENT ON VIEW property_inventory_dashboard_rows IS
  'Flattened ops lines; published projects from properties_v3; line_id null when no PLC rows.';
