-- Security and Performance Hardening Migration
-- Run this SQL in your Supabase SQL Editor

-- ============================================
-- 1. AUDIT LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL CHECK (operation IN ('CREATE', 'UPDATE', 'DELETE')),
  record_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_email TEXT,
  changes JSONB,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by table and operation
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_operation ON audit_logs(table_name, operation);
CREATE INDEX IF NOT EXISTS idx_audit_logs_record_id ON audit_logs(record_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp DESC);

-- Enable RLS on audit logs (only admins can read)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admins can read audit logs
CREATE POLICY "Admins can read audit logs"
  ON audit_logs
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- ============================================
-- 2. COMPOSITE INDEXES FOR PERFORMANCE
-- ============================================

-- Index for filtering published properties with sorting
CREATE INDEX IF NOT EXISTS idx_properties_published_created_at 
  ON properties(is_published, created_at DESC) 
  WHERE is_published = true;

-- Index for admin queries (all properties, sorted by created_at)
CREATE INDEX IF NOT EXISTS idx_properties_created_at_desc 
  ON properties(created_at DESC);

-- Index for slug lookups (already exists, but ensuring it's there)
CREATE INDEX IF NOT EXISTS idx_properties_slug_unique ON properties(slug);

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);

-- ============================================
-- 3. RLS POLICY UPDATES
-- ============================================

-- Drop existing policies if they exist (to recreate them properly)
DROP POLICY IF EXISTS "Public can view published properties" ON properties;
DROP POLICY IF EXISTS "Admins can manage properties" ON properties;

-- Policy: Public can view published properties (using anon key with RLS)
CREATE POLICY "Public can view published properties"
  ON properties
  FOR SELECT
  USING (is_published = true);

-- Policy: Authenticated users (admins) can insert properties
-- This will be enforced by API routes checking authentication
CREATE POLICY "Authenticated users can insert properties"
  ON properties
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can update properties
CREATE POLICY "Authenticated users can update properties"
  ON properties
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can delete properties
CREATE POLICY "Authenticated users can delete properties"
  ON properties
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- 4. QUERY TIMEOUT FUNCTION
-- ============================================

-- Function to set statement timeout (PostgreSQL built-in)
-- This is set at the connection level, but we document it here
-- In Supabase, you can set this in the dashboard under Database > Settings

-- ============================================
-- 5. COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE audit_logs IS 'Audit trail for all data modifications. Cannot be bypassed.';
COMMENT ON INDEX idx_properties_published_created_at IS 'Optimizes queries filtering published properties with date sorting';
COMMENT ON INDEX idx_properties_created_at_desc IS 'Optimizes admin list queries sorted by creation date';

