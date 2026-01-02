# Troubleshooting: Leads Not Saving to Database

## Common Issues and Solutions

### 1. **Leads Table Doesn't Exist** ⚠️ MOST COMMON

**Symptom:** Leads are not appearing in the database, but forms submit successfully.

**Solution:**
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the entire contents of `sql/supabase-leads-table.sql`
4. Click "Run" to execute the SQL
5. Verify the table was created by checking the "Table Editor" section

**Verify Table Exists:**
```sql
SELECT * FROM leads LIMIT 1;
```

### 2. **RLS Policies Blocking Inserts**

**Symptom:** Error messages like "new row violates row-level security policy"

**Solution:**
The SQL file includes a policy that allows public inserts:
```sql
CREATE POLICY "Public can insert leads"
  ON leads
  FOR INSERT
  WITH CHECK (true);
```

If you're still getting RLS errors:
1. Check if RLS is enabled: `ALTER TABLE leads ENABLE ROW LEVEL SECURITY;`
2. Verify the policy exists: Check Supabase Dashboard → Authentication → Policies
3. The admin client uses service role key which bypasses RLS, so this shouldn't be an issue

### 3. **Check Server Logs**

**How to Debug:**
1. Check your Next.js server console/logs
2. Look for error messages starting with:
   - `"Error storing lead in database:"`
   - `"Failed to store lead in database:"`
   - `"Exception storing lead:"`

**Common Error Messages:**

**Table doesn't exist:**
```
Error: relation "public.leads" does not exist
```
→ Solution: Run the SQL migration file

**Column doesn't exist:**
```
Error: column "form_type" does not exist
```
→ Solution: Check that all columns match the SQL schema

**Permission denied:**
```
Error: permission denied for table leads
```
→ Solution: Check RLS policies and service role key

### 4. **Verify Environment Variables**

Make sure these are set in your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Required for admin operations
```

### 5. **Test Lead Storage Directly**

Create a test API route to verify:

```typescript
// app/api/test-lead/route.ts
import { storeLead } from '@/lib/lead-service';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await storeLead({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '+919876543210',
    formType: 'contact',
    formSource: 'test',
  });

  return NextResponse.json(result);
}
```

Visit `/api/test-lead` and check:
- If `success: true` → Lead storage works
- If `success: false` → Check the error message

### 6. **Check Database Connection**

Verify Supabase connection:
1. Go to Supabase Dashboard → Settings → API
2. Verify your `NEXT_PUBLIC_SUPABASE_URL` matches
3. Verify your `SUPABASE_SERVICE_ROLE_KEY` is correct (not the anon key!)

### 7. **Verify Form Submissions Are Calling storeLead**

Check that form API endpoints are actually calling `storeLead()`:
1. Add a `console.log` before `storeLead()` call
2. Submit a form
3. Check server logs to see if the log appears

### 8. **Check Browser Console**

Even though lead storage happens server-side, check browser console for:
- Network errors (500, 400 responses)
- Form submission errors

## Step-by-Step Debugging Checklist

- [ ] Leads table exists in Supabase (check Table Editor)
- [ ] SQL migration file has been run successfully
- [ ] Environment variables are set correctly
- [ ] Service role key is correct (not anon key)
- [ ] Server logs show no errors when submitting forms
- [ ] Test API route (`/api/test-lead`) returns success
- [ ] Form submissions are reaching the API endpoints
- [ ] `storeLead()` function is being called (check logs)

## Quick Fix Commands

**If table doesn't exist:**
```sql
-- Run this in Supabase SQL Editor
\i sql/supabase-leads-table.sql
```

**If you need to recreate the table:**
```sql
-- Drop and recreate (WARNING: This deletes all existing leads!)
DROP TABLE IF EXISTS leads CASCADE;
-- Then run the full SQL from supabase-leads-table.sql
```

**Check if leads are being inserted:**
```sql
SELECT COUNT(*) FROM leads;
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;
```

## Still Not Working?

1. **Enable verbose logging:**
   - Check `lib/lead-service.ts` - errors are logged with `console.error`
   - Check server console when submitting forms

2. **Test with a simple insert:**
   ```sql
   INSERT INTO leads (first_name, last_name, phone, form_type)
   VALUES ('Test', 'User', '+919876543210', 'contact');
   ```
   If this fails, there's a database/permission issue.

3. **Check Supabase logs:**
   - Go to Supabase Dashboard → Logs
   - Look for errors related to the `leads` table

4. **Verify the code is deployed:**
   - If using production, make sure latest code is deployed
   - Check that `lib/lead-service.ts` exists in production

