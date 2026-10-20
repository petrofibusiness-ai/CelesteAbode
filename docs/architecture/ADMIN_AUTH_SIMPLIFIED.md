# Simplified Admin Authentication

## Changes Made

1. **Removed JWT**: No more JWT tokens, using simple session cookies
2. **Username/Password**: Changed from email to username
3. **Client-Side Layout**: Admin layout is now client-side to avoid compilation issues
4. **Simple Session**: Uses a simple "authenticated" cookie value

## Default Credentials

- **Username**: `admin` (or set `ADMIN_USERNAME` in `.env.local`)
- **Password**: set `ADMIN_PASSWORD` in `.env.local` to a strong unique value

## Environment Variables

Add to `.env.local`:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

If not set, the old notes described a weak default. Do not rely on a default password. Set both values in `.env.local`.

## How It Works

1. User enters username and password on `/admin/login`
2. Server validates against environment variables
3. If valid, sets a simple `admin-session` cookie with value "authenticated"
4. All admin routes check for this cookie
5. Logout deletes the cookie

## Fixed Issues

- ✅ Removed JWT dependency (no more `jose` library needed)
- ✅ Fixed compilation loop by making layout client-side
- ✅ Login page now accessible without redirects
- ✅ Simplified authentication flow

## Security Note

This is a simplified authentication for development/testing. For production, consider:
- Adding rate limiting
- Using proper session management
- Adding CSRF protection
- Implementing proper password hashing if storing in database

