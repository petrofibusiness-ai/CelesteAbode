-- Leads table for Celeste Abode centralized lead management
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  
  -- Form Source Information
  form_type TEXT NOT NULL, -- 'contact', 'viewing', 'location-contact', 'advisory-session', 'chatbot', 'segmented-entry'
  form_source TEXT, -- Specific source like 'properties-page', 'location-page', 'homepage', etc.
  page_url TEXT, -- URL where the form was submitted
  
  -- Property/Location Context (optional)
  property_name TEXT,
  property_location TEXT,
  property_slug TEXT,
  location_slug TEXT,
  
  -- Form-Specific Data (stored as JSONB for flexibility)
  form_data JSONB DEFAULT '{}'::jsonb, -- All form-specific fields stored here
  
  -- Lead Metadata
  lead_score TEXT, -- 'High', 'Medium', 'Low' (from chatbot)
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'lost'
  notes TEXT, -- Admin notes
  
  -- Email Status
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMPTZ,
  email_error TEXT, -- Store error if email fails
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Client IP (for tracking and rate limiting)
  client_ip TEXT
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_leads_form_type ON leads(form_type);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_email_sent ON leads(email_sent);

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_leads_status_created ON leads(status, created_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row update
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_leads_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view leads (handled via service role key in API routes)
-- Public can insert leads (for form submissions)
CREATE POLICY "Public can insert leads"
  ON leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated admins can view leads
-- Note: This will be enforced via service role key in admin API routes
-- For direct database access, you may want to add more specific policies

-- Add comments for documentation
COMMENT ON TABLE leads IS 'Centralized lead management table for all form submissions';
COMMENT ON COLUMN leads.form_type IS 'Type of form: contact, viewing, location-contact, advisory-session, chatbot, segmented-entry';
COMMENT ON COLUMN leads.form_data IS 'JSONB object containing form-specific fields (varies by form type)';
COMMENT ON COLUMN leads.lead_score IS 'Lead quality score (High/Medium/Low) - primarily from chatbot';
COMMENT ON COLUMN leads.status IS 'Lead status: new, contacted, qualified, converted, lost';

