# Supabase Setup Guide for Celeste Abode

## Required Supabase Details

Please provide the following information from your Supabase project:

1. **Supabase Project URL**
   - Found in: Supabase Dashboard → Settings → API → Project URL
   - Format: `https://xxxxxxxxxxxxx.supabase.co`

2. **Supabase Anon/Public Key**
   - Found in: Supabase Dashboard → Settings → API → Project API keys → `anon` `public`
   - This is safe to use in client-side code

3. **Supabase Service Role Key** (IMPORTANT: Keep this secret!)
   - Found in: Supabase Dashboard → Settings → API → Project API keys → `service_role` key
   - This bypasses Row Level Security (RLS) - never expose this in client-side code

## Setup Steps

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project (or use existing)
3. Wait for the project to be fully provisioned

### Step 2: Run SQL Script
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `supabase-properties-table.sql`
3. Click "Run" to create the properties table

### Step 3: Add Environment Variables
Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Step 4: Verify Installation
1. Restart your Next.js dev server
2. Try creating a property in the admin panel
3. Check Supabase Dashboard → Table Editor → `properties` to see the data

## Database Schema

The `properties` table includes:
- **Basic Info**: slug, project_name, developer, location, rera_id, status
- **Property Details**: possession_date, unit_types, sizes, description, price
- **Media**: hero_image, brochure_url, images (array), videos (array)
- **SEO**: seo (JSON object with title, description, keywords)
- **Metadata**: is_published, created_at, updated_at

## Security Notes

- The Service Role Key bypasses RLS - it's only used in server-side API routes
- The Anon Key is used for client-side operations (if needed)
- Row Level Security (RLS) is enabled - only published properties are publicly readable
- Admin operations use the Service Role Key which bypasses RLS

## Troubleshooting

**Error: "Supabase not configured"**
- Check that all environment variables are set in `.env.local`
- Restart your dev server after adding environment variables

**Error: "relation 'properties' does not exist"**
- Make sure you ran the SQL script in Supabase SQL Editor

**Error: "permission denied"**
- Check that your Service Role Key is correct
- Verify RLS policies are set up correctly

