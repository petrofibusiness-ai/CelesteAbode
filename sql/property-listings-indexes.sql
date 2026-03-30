-- =============================================================================
-- Property listing performance indexes (PostgreSQL / Supabase)
-- =============================================================================
--
-- 1) Will this break existing queries?
--    No. Indexes are additive: SELECT/UPDATE/DELETE/JOIN semantics stay the same.
--    The planner may choose a new index for some queries (usually faster). Nothing
--    in application SQL needs to change. If an index name or column is wrong for
--    your schema, CREATE INDEX itself can error — fix the DDL, not the app.
--
-- 2) Supabase SQL Editor error: "CREATE INDEX CONCURRENTLY cannot run inside a
--    transaction block"
--    The dashboard wraps statements in a transaction. CONCURRENTLY is forbidden
--    there. Use the block below WITHOUT CONCURRENTLY (recommended for Supabase UI).
--
--    For very large tables in production, you can instead run each CONCURRENTLY
--    statement alone from psql with autocommit (one statement per connection),
--    or use a migration pipeline that does not wrap DDL in a transaction.
--
-- Assumes: properties_v2 (is_published, location_id, locality_id, property_type,
--          price_min, created_at, …), localities, locations_v2 with the columns below.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Run this in Supabase SQL Editor (no CONCURRENTLY)
-- -----------------------------------------------------------------------------

-- Primary filter: published + optional location / locality
CREATE INDEX IF NOT EXISTS idx_properties_v2_list_location
  ON properties_v2 (is_published, location_id)
  WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_properties_v2_list_locality
  ON properties_v2 (is_published, locality_id)
  WHERE is_published = true;

-- Future filters (price, type) — partial indexes
CREATE INDEX IF NOT EXISTS idx_properties_v2_list_type
  ON properties_v2 (is_published, property_type)
  WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_properties_v2_price_min
  ON properties_v2 (is_published, price_min)
  WHERE is_published = true;

-- Stable sort for pagination (newest first)
CREATE INDEX IF NOT EXISTS idx_properties_v2_created_desc
  ON properties_v2 (created_at DESC)
  WHERE is_published = true;

-- Localities: by location + published
CREATE INDEX IF NOT EXISTS idx_localities_location_published
  ON localities (location_id, is_published)
  WHERE is_published = true;

-- Locations: published + slug
CREATE INDEX IF NOT EXISTS idx_locations_v2_published_slug
  ON locations_v2 (is_published, slug)
  WHERE is_published = true;

-- -----------------------------------------------------------------------------
-- Optional: production / psql — one statement per execution, outside a txn
-- (Replace above or run only if you need non-blocking builds on huge tables.)
-- -----------------------------------------------------------------------------
--
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_properties_v2_list_location
--   ON properties_v2 (is_published, location_id)
--   WHERE is_published = true;
--
-- (repeat for each index, one at a time)
