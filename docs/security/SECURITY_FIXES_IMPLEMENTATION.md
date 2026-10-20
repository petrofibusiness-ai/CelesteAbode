# Security Fixes Implementation Guide

## Overview
This guide documents all security fixes that have been implemented to address the vulnerabilities identified in `ADMIN_PANEL_SECURITY_ISSUES.md`.

## Files Created

### 1. CSRF Protection ([lib/csrf.ts](lib/csrf.ts))
- **Purpose**: Prevents Cross-Site Request Forgery attacks
- **Features**:
  - Generates random 256-bit CSRF tokens
  - Stores tokens in HTTP-only cookies
  - Implements timing-safe token comparison
  - Automatic token expiration (24 hours)
  - Token validation for all state-changing operations

### 2. Security Events Logger ([lib/security-events.ts](lib/security-events.ts))
- **Purpose**: Comprehensive audit logging of security-relevant events
- **Features**:
  - Logs authentication attempts (success/failure)
  - Tracks authorization failures
  - Records CSRF violations
  - Monitors rate limit violations
  - Extracts client IP (handles proxies)
  - Stores metadata for incident investigation
  - Fallback to console/external logging if database fails

### 3. Authentication Rate Limiting ([lib/auth-rate-limit.ts](lib/auth-rate-limit.ts))
- **Purpose**: Prevents brute-force attacks on login endpoint
- **Features**:
  - Tracks login attempts by IP + username
  - Limits to 5 attempts per 5-minute window
  - Automatic 15-minute lockout after threshold
  - In-memory store (Redis-ready for scaling)
  - Automatic cleanup of expired entries
  - Functions to check, record, and query attempt status

### 4. Input Validation Schemas ([lib/validation-schemas.ts](lib/validation-schemas.ts))
- **Purpose**: Type-safe input validation using Zod
- **Features**:
  - Comprehensive schemas for all admin endpoints
  - Lead filtering and updates
  - Property CRUD operations
  - File upload parameters
  - Utility functions for query and JSON body validation
  - Prevents injection attacks and data corruption

### 5. File Upload Validator ([lib/file-upload-validator.ts](lib/file-upload-validator.ts))
- **Purpose**: Secure file upload validation
- **Features**:
  - Size validation with configurable limits
  - MIME type verification
  - Magic number signature verification
  - Filename sanitization (prevents directory traversal)
  - Pre-configured for images, videos, and PDFs
  - Prevents malicious file uploads

## Files Modified

### 1. Middleware ([middleware-admin.ts](middleware-admin.ts))
**Critical Fix**: Hardcoded JWT secret
- **Before**: `const secretKey = process.env.ADMIN_JWT_SECRET || 'your-secret-key-change-in-production'`
- **After**: Throws error if environment variable not set
- **Impact**: Prevents authentication bypass via default secret

### 2. Auth Library ([lib/auth.ts](lib/auth.ts))
**High Priority Fix**: Token Lifetimes
- **Access Token**: Changed from 7 days → 15 minutes
- **Refresh Token**: Changed from 30 days → 1 day
- **Cookie SameSite**: Changed from 'lax' → 'strict'
- **Impact**: Reduces exposure window for compromised tokens

### 3. Login Route ([app/api/admin/auth/login/route.ts](app/api/admin/auth/login/route.ts))
**Enhanced with**:
- Rate limiting (5 attempts per 5 minutes)
- Input validation (Zod schemas)
- Security event logging
- Detailed error information (generic to client, detailed internally)
- IP extraction from forwarded headers
- Better error handling

### 4. Leads Route ([app/api/admin/leads/route.ts](app/api/admin/leads/route.ts))
**Enhanced with**:
- CSRF token validation (PATCH)
- Input validation (query parameters & body)
- Security event logging
- Authentication check
- Generic error responses
- Comprehensive error logging

### 5. Properties Route ([app/api/admin/properties/route.ts](app/api/admin/properties/route.ts))
**Enhanced with**:
- CSRF token validation (POST)
- Input validation (query parameters & body)
- Security event logging
- Better error messages
- Proper error response handling

### 6. Image Upload Route ([app/api/admin/upload/image/route.ts](app/api/admin/upload/image/route.ts))
**Enhanced with**:
- CSRF token validation
- File validation (size, type, content)
- Filename sanitization
- Signature verification
- Security event logging
- Generic error responses

### 7. Video Upload Route ([app/api/admin/upload/video/route.ts](app/api/admin/upload/video/route.ts))
**Enhanced with**:
- CSRF token validation
- Enhanced file validation (size, type, signature)
- Filename sanitization
- Security event logging
- Better error handling

### 8. Next.js Config ([next.config.mjs](next.config.mjs))
**Added Security Headers**:
- `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
- `X-Frame-Options: DENY` (clickjacking protection)
- `X-XSS-Protection: 1; mode=block` (XSS protection)
- `Referrer-Policy: strict-origin-when-cross-origin` (prevents referrer leakage)
- `Permissions-Policy` (disables geolocation, microphone, camera)
- `Strict-Transport-Security` (HSTS - forces HTTPS)

## Database Migrations

### Security Events Table ([sql/migration_security_events_table.sql](sql/migration_security_events_table.sql))
Must be run in Supabase to enable security logging:

1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Paste the migration SQL
5. Execute

This creates:
- `security_events` table with proper indexes
- RLS policies for access control
- Columns for audit trail: user, IP, endpoint, event type, metadata, timestamp

## Environment Variables Required

Ensure these are set in your environment:

```env
# CRITICAL - Required for admin panel to start
ADMIN_JWT_SECRET=your-random-32-character-secret-here

# Existing variables (ensure they're set)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

To generate a strong secret:
```bash
# Linux/Mac
openssl rand -hex 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Python
python -c "import secrets; print(secrets.token_hex(32))"
```

## Implementation Checklist

### Phase 1: Immediate (Critical Issues)
- [x] Remove hardcoded JWT secret fallback
- [x] Create CSRF protection utilities
- [x] Create auth rate limiting utilities
- [x] Add security event logging

### Phase 2: High Priority (This Week)
- [x] Implement CSRF validation on all state-changing routes
- [x] Add input validation schemas
- [x] Update login route with rate limiting and logging
- [x] Update all upload routes with file validation

### Phase 3: Medium Priority (This Month)
- [x] Add security headers to Next.js config
- [x] Improve file upload validation
- [x] Fix error handling and information disclosure
- [x] Reduce token lifetimes

### Phase 4: Production Deployment
- [ ] Set `ADMIN_JWT_SECRET` environment variable
- [ ] Run security_events table migration in Supabase
- [ ] Test rate limiting with automated tests
- [ ] Verify CSRF protection works in production
- [ ] Monitor security_events table for suspicious activity
- [ ] Set up log retention policy (90 days minimum)

## Testing Security Fixes

### 1. Test CSRF Protection
```bash
# Should fail without CSRF token
curl -X PATCH http://localhost:3000/api/admin/leads \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=valid_token" \
  -d '{"id":"123","status":"contacted"}'

# Should work with CSRF token
# Get token from cookie first, then include in header
curl -X PATCH http://localhost:3000/api/admin/leads \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: token_from_cookie" \
  -H "Cookie: sb-access-token=valid_token" \
  -d '{"id":"123","status":"contacted"}'
```

### 2. Test Rate Limiting
```bash
# Try 6 failed login attempts (should lock out on 6th)
for i in {1..6}; do
  echo "Attempt $i:"
  curl -X POST http://localhost:3000/api/admin/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"test","password":"wrong"}'
  echo ""
done

# 6th attempt should return 429 Too Many Requests
```

### 3. Test Input Validation
```bash
# Invalid status - should be rejected
curl http://localhost:3000/api/admin/leads?status=invalid

# Oversized limit - should be clamped or rejected
curl http://localhost:3000/api/admin/leads?limit=999999

# Missing authentication - should return 401
curl http://localhost:3000/api/admin/properties
```

### 4. Test File Upload Validation
```bash
# Try uploading a text file as image - should fail
curl -F "file=@document.txt" \
     -F "propertySlug=test" \
     http://localhost:3000/api/admin/upload/image

# Try oversized file - should fail
curl -F "file=@large-video.mp4" \
     -F "propertySlug=test" \
     http://localhost:3000/api/admin/upload/video
```

### 5. Check Security Headers
```bash
# Should include all security headers
curl -I http://localhost:3000/admin/dashboard

# Look for:
# - X-Content-Type-Options: nosniff
# - X-Frame-Options: DENY
# - X-XSS-Protection: 1; mode=block
# - Strict-Transport-Security: ...
# - Content-Security-Policy: ...
```

## Monitoring and Maintenance

### Log Analysis
Query security events:
```sql
-- Recent failed login attempts
SELECT * FROM security_events 
WHERE event = 'LOGIN_FAILED' 
AND timestamp > NOW() - INTERVAL '24 hours'
ORDER BY timestamp DESC;

-- CSRF violations
SELECT * FROM security_events 
WHERE event = 'CSRF_FAILED' 
ORDER BY timestamp DESC LIMIT 10;

-- Rate limit exceeded
SELECT ip_address, user_email, COUNT(*) 
FROM security_events 
WHERE event = 'RATE_LIMIT_EXCEEDED' 
AND timestamp > NOW() - INTERVAL '1 hour'
GROUP BY ip_address, user_email;
```

### Log Retention
Implement automatic cleanup:
```sql
-- Delete events older than 90 days (run weekly)
DELETE FROM security_events 
WHERE created_at < NOW() - INTERVAL '90 days';
```

### Set Up Alerts
Consider setting up alerts for:
- Multiple failed login attempts from same IP
- CSRF violations
- Unusual file upload attempts
- Rapid requests from same user

## Next Steps

1. **Set Environment Variables**: Configure `ADMIN_JWT_SECRET`
2. **Run Migrations**: Execute `migration_security_events_table.sql`
3. **Test Thoroughly**: Use testing checklist above
4. **Deploy**: Push to production
5. **Monitor**: Watch security_events table for suspicious activity
6. **Plan Additional Security**: 
   - Implement OAuth2 for admin auth
   - Add multi-factor authentication (MFA)
   - Set up intrusion detection
   - Regular penetration testing

## Quick Reference

### Critical Files Modified
1. `middleware-admin.ts` - JWT secret validation
2. `lib/auth.ts` - Token lifetime reduction
3. `app/api/admin/auth/login/route.ts` - Rate limiting
4. `next.config.mjs` - Security headers
5. All upload routes - File validation

### New Security Utilities
1. `lib/csrf.ts` - CSRF token management
2. `lib/security-events.ts` - Audit logging
3. `lib/auth-rate-limit.ts` - Brute-force protection
4. `lib/validation-schemas.ts` - Input validation
5. `lib/file-upload-validator.ts` - File upload security

### Status
✅ All security issues from `ADMIN_PANEL_SECURITY_ISSUES.md` have been addressed with code implementations.
