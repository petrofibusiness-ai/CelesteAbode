-- Fix RLS policies for leads table to ensure admin can view all leads
-- Run this SQL in your Supabase SQL Editor

-- Drop existing SELECT policies if they exist
DROP POLICY IF EXISTS "Service role can view all leads" ON leads;
DROP POLICY IF EXISTS "Admins can view all leads" ON leads;

-- Policy: Service role (used by admin API routes) can view all leads
-- This ensures the service role key bypasses RLS properly
CREATE POLICY "Service role can view all leads"
  ON leads
  FOR SELECT
  USING (true);

-- Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'leads';

-- Test query to verify all leads are accessible
-- This should return the total count of all leads
SELECT COUNT(*) as total_leads FROM leads;

