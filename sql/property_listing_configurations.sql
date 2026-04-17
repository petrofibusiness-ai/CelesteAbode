-- =============================================================================
-- Ops inventory (clean install): Excel-style data — one project, many sub-lines.
-- Each row = one line: configuration (2 BHK, 3 BHK + Study, …) + size (sq ft) + price (Cr).
-- Linked to properties_v2 for project name, location, hero image, public URL only.
--
-- Run once in Supabase SQL Editor. Destroys any previous property_listing_configurations data.
-- After run: Settings → API → reload schema (or wait) so PostgREST sees the table.
-- =============================================================================

DROP VIEW IF EXISTS property_inventory_dashboard_rows;

DROP TABLE IF EXISTS property_listing_configurations CASCADE;

CREATE TABLE property_listing_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties_v2 (id) ON DELETE CASCADE,
  configuration TEXT NOT NULL DEFAULT '',
  size_sqft TEXT NOT NULL DEFAULT '',
  price_cr TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_plc_property_id ON property_listing_configurations (property_id);
CREATE INDEX idx_plc_property_sort ON property_listing_configurations (property_id, sort_order, id);

-- Header fields for ops inventory (tower count); possession uses existing column.
ALTER TABLE properties_v2 ADD COLUMN IF NOT EXISTS inventory_towers TEXT NOT NULL DEFAULT '';

CREATE OR REPLACE FUNCTION update_property_listing_configurations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_property_listing_configurations_updated_at
  BEFORE UPDATE ON property_listing_configurations
  FOR EACH ROW
  EXECUTE FUNCTION update_property_listing_configurations_updated_at();

ALTER TABLE property_listing_configurations ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE property_listing_configurations IS
  'Ops: sub-rows per project — configuration label, super area, price in Cr. API uses service role.';

-- Dashboard API: all published projects; LEFT JOIN so projects with zero config lines still appear.
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

-- One blank line per published project so the team can fill Excel-style sub-rows.
INSERT INTO property_listing_configurations (property_id, configuration, size_sqft, price_cr, sort_order)
SELECT p.id, '', '', '', 0
FROM properties_v2 p
WHERE p.is_published = true
  AND NOT EXISTS (
    SELECT 1 FROM property_listing_configurations x WHERE x.property_id = p.id
  );
