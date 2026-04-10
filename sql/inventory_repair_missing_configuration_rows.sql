-- =============================================================================
-- REPAIR: Inventory UI “lost” projects after configuration rows were deleted
--
-- properties_v2 rows are unchanged; the dashboard view only shows projects that
-- have at least one row in property_listing_configurations. This script adds one
-- blank configuration line for every published property that currently has none.
--
-- Run in Supabase → SQL Editor (safe to run multiple times — INSERT is idempotent).
--
-- NOTE: Previous configuration/price text is NOT recoverable from this repo. If you
-- need old values, use Supabase backups / Point-in-Time Recovery if available.
-- =============================================================================

-- Preview: published projects missing inventory lines (optional — run first to verify count)
-- SELECT p.id, p.slug, p.project_name, p.created_at
-- FROM properties_v2 p
-- WHERE p.is_published = true
--   AND NOT EXISTS (
--     SELECT 1 FROM property_listing_configurations x WHERE x.property_id = p.id
--   )
-- ORDER BY p.created_at DESC;

INSERT INTO property_listing_configurations (property_id, configuration, size_sqft, price_cr, sort_order)
SELECT p.id, '', '', '', 0
FROM properties_v2 p
WHERE p.is_published = true
  AND NOT EXISTS (
    SELECT 1 FROM property_listing_configurations x WHERE x.property_id = p.id
  );
