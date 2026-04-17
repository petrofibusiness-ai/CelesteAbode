-- Incremental: list ALL published properties on the inventory dashboard, even when
-- they have zero rows in property_listing_configurations (line_id will be NULL).
-- Safe to run multiple times.

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
FROM properties_v2 p
LEFT JOIN property_listing_configurations c ON c.property_id = p.id
WHERE p.is_published = true;

COMMENT ON VIEW property_inventory_dashboard_rows IS
  'Flattened ops lines for GET /api/property-listings; published projects only; line_id null when no PLC rows.';
