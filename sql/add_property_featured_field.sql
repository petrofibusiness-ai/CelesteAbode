-- Add featured flag for properties_v3 listing priority.
-- Existing and future properties default to non-featured.

ALTER TABLE properties_v3
  ADD COLUMN IF NOT EXISTS featured boolean;

UPDATE properties_v3
SET featured = false
WHERE featured IS NULL;

ALTER TABLE properties_v3
  ALTER COLUMN featured SET DEFAULT false,
  ALTER COLUMN featured SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_properties_v3_featured_created
  ON properties_v3 (featured DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_properties_v3_published_featured_created
  ON properties_v3 (is_published, featured DESC, created_at DESC)
  WHERE is_published = true;
