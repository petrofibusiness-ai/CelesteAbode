# Supabase Auth Setup for Admin Panel

This guide explains how to set up Supabase Authentication for the admin panel.

## Overview

The admin panel now uses Supabase Auth instead of simple credential checking. This provides:
- Secure password hashing (no plaintext passwords)
- Session management via Supabase
- Better security practices
- Scalable authentication system

## Prerequisites

1. Supabase project with Auth enabled
2. Environment variables configured

## Step 1: Enable Email Auth in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Providers**
3. Ensure **Email** provider is enabled
4. Configure email settings as needed

## Step 2: Create Admin User

You have two options to create the admin user:

### Option A: Using the Script (Recommended)

1. Make sure your `.env.local` has:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Run the script:
   ```bash
   npx tsx scripts/create-admin-user.ts
   ```

   Or if you have ts-node:
   ```bash
   ts-node scripts/create-admin-user.ts
   ```

### Option B: Using Supabase Dashboard

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: `admin@admin.celesteabode.com`
   - **Password**: `admin123`
   - **Auto Confirm User**: ✅ (check this)
4. Click **Create user**
5. In **User Metadata**, add:
   ```json
   {
     "name": "Admin",
     "role": "admin"
   }
   ```

## Step 3: Login Credentials

After creating the user, you can login with:

- **Login ID**: `admin` (or `admin@admin.celesteabode.com`)
- **Password**: `admin123`

The system will automatically convert `admin` to `admin@admin.celesteabode.com` if no `@` is present.

## Step 4: Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/login`
3. Try logging in with:
   - Login ID: `admin`
   - Password: `admin123`

4. You should be redirected to `/admin` dashboard

## How It Works

### Authentication Flow

1. **Login**: User enters credentials → API calls Supabase `signInWithPassword`
2. **Session**: Supabase returns access token → Stored in HTTP-only cookie
3. **Verification**: Each request checks Supabase session using access token
4. **Logout**: Clears cookies and calls Supabase `signOut`

### Security Features

- ✅ Passwords are hashed by Supabase (never stored in plaintext)
- ✅ Sessions managed by Supabase (secure token-based)
- ✅ HTTP-only cookies (prevents XSS attacks)
- ✅ Secure cookies in production (HTTPS only)
- ✅ Automatic token refresh

## Troubleshooting

### "Invalid credentials" error

- Verify the user exists in Supabase Dashboard
- Check that email is `admin@admin.celesteabode.com`
- Try resetting the password in Supabase Dashboard

### "Supabase environment variables are not set"

- Check your `.env.local` file
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
- Restart your development server after adding env variables

### Session not persisting

- Check browser console for cookie errors
- Verify cookies are being set (check DevTools → Application → Cookies)
- Ensure `sameSite: 'lax'` is working (may need `'none'` for cross-site)

### User creation fails

- Ensure Supabase Auth is enabled
- Check that Email provider is enabled in Supabase Dashboard
- Verify service role key has admin permissions

## Changing Admin Password

To change the admin password:

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Find the admin user (`admin@admin.celesteabode.com`)
3. Click **...** → **Reset password**
4. Or use Supabase Admin API to update password

## Adding More Admin Users

To add additional admin users:

1. Use the script with different email:
   ```typescript
   // Modify scripts/create-admin-user.ts
   const email = 'newadmin@admin.celesteabode.com';
   const password = 'secure-password';
   ```

2. Or create via Supabase Dashboard (same as Option B above)

## API Routes Protection

All admin API routes use `isAuthenticated()` which:
- Checks for Supabase session token
- Verifies token with Supabase
- Returns `true` only if valid session exists

Example:
```typescript
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // ... rest of route
}
```

## Client-Side Protection

The admin layout (`app/admin/layout.tsx`) checks authentication:
- Calls `/api/admin/auth/session` on mount
- Redirects to `/admin/login` if not authenticated
- Shows loading state while checking

