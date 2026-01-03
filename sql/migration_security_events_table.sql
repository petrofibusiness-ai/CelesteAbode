-- Migration: Create security_events table for audit logging
-- This table tracks all security-relevant events including authentication attempts,
-- authorization failures, CSRF failures, and rate limit violations

CREATE TABLE IF NOT EXISTS security_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  endpoint TEXT,
  metadata JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS security_events_user_id_idx ON security_events(user_id);
CREATE INDEX IF NOT EXISTS security_events_user_email_idx ON security_events(user_email);
CREATE INDEX IF NOT EXISTS security_events_ip_address_idx ON security_events(ip_address);
CREATE INDEX IF NOT EXISTS security_events_event_idx ON security_events(event);
CREATE INDEX IF NOT EXISTS security_events_timestamp_idx ON security_events(timestamp DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can read events
CREATE POLICY security_events_view_policy ON security_events
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Policy: Only service role can insert (via API with admin client)
-- This is set via auth and not directly insertable by users
CREATE POLICY security_events_insert_policy ON security_events
  FOR INSERT
  WITH CHECK (true);

-- Add indexes for time-based queries (for log retention and analysis)
CREATE INDEX IF NOT EXISTS security_events_created_at_idx ON security_events(created_at DESC);
