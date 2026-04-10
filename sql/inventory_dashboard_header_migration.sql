-- Incremental: run if you already applied property_listing_configurations.sql before
-- possession_date + inventory_towers were added to the dashboard view.
-- Safe to run multiple times.

ALTER TABLE properties_v2 ADD COLUMN IF NOT EXISTS inventory_towers TEXT NOT NULL DEFAULT '';

DROP VIEW IF EXISTS property_inventory_dashboard_rows;

CREATE VIEW property_inventory_dashboard_rows AS
SELECT
  c.id AS line_id,
  c.property_id,
  c.configuration AS configuration_label,
  c.size_sqft,
  c.price_cr,
  c.sort_order,
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
FROM property_listing_configurations c
INNER JOIN properties_v2 p ON p.id = c.property_id
WHERE p.is_published = true;

COMMENT ON VIEW property_inventory_dashboard_rows IS
  'Flattened ops lines for GET /api/property-listings (no filters).';
