# Centralized Lead Management System

## Overview

This document describes the centralized lead management system that stores all form submissions in the database while maintaining email notifications via Gmail SMTP. This ensures no leads are lost even if email delivery fails.

## Database Setup

### 1. Create Leads Table

Run the SQL file in your Supabase SQL Editor:

```bash
sql/supabase-leads-table.sql
```

This creates a `leads` table with:
- Contact information (name, email, phone)
- Form source tracking (form type, source, page URL)
- Property/location context
- Form-specific data (stored as JSONB)
- Lead status and notes
- Email delivery tracking

## Architecture

### Lead Flow

1. **Form Submission** → User submits any form on the website
2. **API Endpoint** → Form API route receives the submission
3. **Database Storage** → Lead is stored in `leads` table (primary storage)
4. **Email Notification** → Email is sent via Gmail SMTP (notification only)
5. **Status Update** → Email delivery status is updated in database

### Key Features

- **Dual Storage**: Leads stored in DB + Email sent (both happen independently)
- **Email Failure Handling**: If email fails, lead is still stored in DB
- **Status Tracking**: Track email delivery status
- **Admin Dashboard**: View and manage all leads in admin panel

## Updated API Endpoints

All form API endpoints have been updated to store leads:

1. **`/api/contact`** - Contact form & Segmented entry form
2. **`/api/viewing`** - Property viewing requests
3. **`/api/location-contact`** - Location-specific contact forms
4. **`/api/advisory-session`** - Advisory session requests
5. **`/api/chatbot`** - Chatbot form submissions

### How It Works

Each endpoint now:
1. Validates and sanitizes input
2. Stores lead in database using `storeLead()` from `lib/lead-service.ts`
3. Sends email using existing email service
4. Updates lead email status after email attempt

## Admin Panel

### Access Leads

Navigate to: `/admin/leads`

### Features

- **View All Leads**: See all form submissions in one place
- **Filter by Status**: New, Contacted, Qualified, Converted, Lost
- **Filter by Form Type**: Contact, Viewing, Location Contact, Advisory Session, Chatbot, Homepage Entry
- **Search**: Search by name, email, phone, property name, location
- **Status Management**: Update lead status with dropdown
- **Notes**: Add/edit notes for each lead
- **Expandable Details**: View full form data and metadata
- **Email Status**: See if email was sent successfully

### Lead Statuses

- **New**: Just received, not yet contacted
- **Contacted**: Initial contact made
- **Qualified**: Lead meets qualification criteria
- **Converted**: Lead converted to customer
- **Lost**: Lead is no longer viable

## Form Types

| Form Type | Source | Description |
|-----------|--------|-------------|
| `contact` | Contact page | General contact form |
| `viewing` | Property pages | Property viewing requests |
| `location-contact` | Location pages | Location-specific inquiries |
| `advisory-session` | Advisory page | Advisory session requests |
| `chatbot` | Website chatbot | Chatbot interactions |
| `segmented-entry` | Homepage | Homepage segmented entry form |

## Database Schema

### Leads Table

```sql
leads (
  id UUID PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  form_type TEXT NOT NULL,
  form_source TEXT,
  page_url TEXT,
  property_name TEXT,
  property_location TEXT,
  property_slug TEXT,
  location_slug TEXT,
  form_data JSONB,
  lead_score TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMPTZ,
  email_error TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  client_ip TEXT
)
```

## API Reference

### Store Lead (Internal)

```typescript
import { storeLead } from '@/lib/lead-service';

const result = await storeLead({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+919876543210',
  formType: 'contact',
  formSource: 'contact-page',
  pageUrl: '/contact',
  formData: { message: 'Hello' },
  clientIP: '127.0.0.1',
});
```

### Admin API

**GET `/api/admin/leads`**
- Query params: `status`, `formType`, `page`, `limit`
- Returns: List of leads with pagination

**PATCH `/api/admin/leads`**
- Body: `{ id, status?, notes? }`
- Updates lead status and/or notes

## Benefits

1. **No Lost Leads**: All leads stored in database regardless of email status
2. **Email Backup**: Gmail SMTP still works for notifications
3. **Centralized Management**: All leads in one admin dashboard
4. **Better Tracking**: See which forms generate most leads
5. **Status Management**: Track lead progression through sales funnel
6. **Search & Filter**: Quickly find specific leads
7. **Notes**: Add context and follow-up information

## Email vs Database

- **Database**: Primary storage - always stores leads
- **Email**: Notification system - may fail but doesn't affect lead storage

If email fails:
- Lead is still stored in database
- `email_sent` = `false`
- `email_error` contains error message
- Admin can see failed emails in dashboard

## Next Steps

1. Run the SQL migration to create the `leads` table
2. Test form submissions to verify leads are stored
3. Check admin panel to view leads
4. Monitor email delivery status
5. Use status management to track lead progression

