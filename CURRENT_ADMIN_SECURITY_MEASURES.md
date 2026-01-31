# Current Admin Panel Security Measures

This document lists all security measures currently implemented in the Celeste Abode admin panel.

**Last Updated:** January 2025  
**Status:** ✅ Production-Ready

---

## 🔐 1. Authentication Security

### 1.1 Supabase Authentication
- **Implementation:** `lib/auth.ts`
- **Features:**
  - Email/password authentication via Supabase Auth
  - Session-based authentication with access and refresh tokens
  - Token validation using Supabase service role client
  - User caching (5-minute TTL) to reduce database calls

### 1.2 Centralized Authentication Guard
- **Implementation:** `lib/admin-auth-guard.ts`
- **Features:**
  - `requireAdminAuth()` function for consistent auth checks
  - Returns proper HTTP 401 with `WWW-Authenticate` header
  - Used across all admin API routes
  - Prevents code execution without authentication

### 1.3 Session Management
- **Implementation:** `lib/auth.ts`
- **Cookie Configuration:**
  - `sb-access-token`: 15-minute expiry, HTTP-only, Secure in production, SameSite: strict
  - `sb-refresh-token`: 24-hour expiry, HTTP-only, Secure in production, SameSite: strict
  - Prevents XSS and CSRF attacks via cookie attributes

### 1.4 Environment Variable Validation
- **Implementation:** `middleware-admin.ts`
- **Feature:** Throws error if `ADMIN_JWT_SECRET` is not set (prevents default secret usage)

---

## 🛡️ 2. Authorization & Access Control

### 2.1 Row Level Security (RLS) Enforcement
- **Implementation:** `lib/supabase-server.ts`
- **Features:**
  - `getSupabaseServerClient()`: Uses user session, respects RLS
  - `getSupabaseAdminClient()`: Service role (ONLY for background jobs)
  - All API routes use user-context client
  - Service role key restricted to trusted processes only

### 2.2 Endpoint Protection
- **Implementation:** All admin API routes
- **Coverage:** 27/27 endpoints require authentication
- **Pattern:** All routes use `requireAdminAuth()` guard

---

## 🔒 3. CSRF Protection

### 3.1 CSRF Token Generation
- **Implementation:** `lib/csrf.ts`
- **Features:**
  - 256-bit (32-byte) random tokens
  - Stored in HTTP-only cookies
  - 24-hour expiration
  - SameSite: strict in production, lax in development

### 3.2 CSRF Token Validation
- **Implementation:** `lib/csrf.ts`
- **Features:**
  - Timing-safe comparison (prevents timing attacks)
  - Validated on all POST, PATCH, DELETE, PUT operations
  - Security event logging on failures

### 3.3 CSRF Token Endpoint
- **Implementation:** `app/api/admin/auth/csrf/route.ts`
- **Feature:** Provides CSRF token to authenticated users

---

## 🚦 4. Rate Limiting

### 4.1 Rate Limit Implementation
- **Implementation:** `lib/rate-limit.ts`
- **Features:**
  - In-memory rate limiting (Redis-ready for scaling)
  - Automatic cleanup of expired entries (every 5 minutes)
  - Per-user or per-IP identification

### 4.2 Rate Limit Configurations
- **Admin Write Operations:** 10 requests/minute
- **Admin Read Operations:** 60 requests/minute
- **File Uploads:** 5 requests/minute
- **Public Routes:** 100 requests/minute

### 4.3 Rate Limit Headers
- **Implementation:** All rate-limited routes
- **Headers:** `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **Response:** HTTP 429 on limit exceeded

---

## 📝 5. Input Validation & Sanitization

### 5.1 Input Sanitization
- **Implementation:** `lib/security.ts`
- **Functions:**
  - `sanitizeInput()`: Removes HTML tags, JavaScript protocols, event handlers
  - `sanitizeHTML()`: Removes scripts, iframes, event handlers
  - Length limits: 10,000 chars for input, 50,000 for HTML

### 5.2 Field Validation
- **Implementation:** `lib/security.ts`
- **Validators:**
  - `isValidEmail()`: Email format validation
  - `isValidPhone()`: Indian phone number validation (10-12 digits)
  - `isValidName()`: Name format validation (alphabetical, 2-50 chars)

### 5.3 Property Data Validation
- **Implementation:** `lib/validation.ts`
- **Features:**
  - Strict schema validation for all property fields
  - Array size limits (100 items max, 20 for videos)
  - String length limits (10,000 characters)
  - Object nesting depth limits (3 levels)
  - URL validation for all image/video URLs
  - UUID format validation for foreign keys
  - Enum validation for property types, statuses, configurations

### 5.4 JSON Body Validation
- **Implementation:** `lib/validation-schemas.ts`
- **Feature:** Zod-based type-safe validation for all admin endpoints

---

## 📤 6. File Upload Security

### 6.1 File Type Validation
- **Implementation:** `lib/file-upload-validator.ts`
- **Features:**
  - MIME type whitelist validation
  - File extension validation
  - Magic number (file signature) verification
  - Prevents file type spoofing

### 6.2 File Size Limits
- **Images:** 10 MB maximum
- **Videos:** 500 MB maximum
- **PDFs:** 50 MB maximum
- **Minimum:** 100 bytes (prevents empty files)

### 6.3 Filename Sanitization
- **Implementation:** `lib/file-upload-validator.ts`
- **Features:**
  - Removes path components (prevents directory traversal)
  - Removes special characters
  - Limits filename length (255 characters)
  - Removes multiple/leading dots

### 6.4 Upload Endpoint Security
- **Implementation:** `app/api/admin/upload/*/route.ts`
- **Features:**
  - Authentication required
  - CSRF token validation
  - Security event logging on failures
  - Rate limiting (5 uploads/minute)

---

## 🗄️ 7. Database & Query Security

### 7.1 Parameterized Queries
- **Implementation:** Supabase client (all routes)
- **Feature:** All queries use Supabase's parameterized query system (prevents SQL injection)

### 7.2 Query Timeouts
- **Implementation:** All API routes
- **Timeouts:**
  - Admin routes: 30 seconds
  - Public routes: 10 seconds
- **Feature:** Prevents resource exhaustion from long-running queries

### 7.3 Column Selection
- **Implementation:** All query routes
- **Feature:** Select only required columns (not `SELECT *`)

### 7.4 Row Level Security
- **Implementation:** Supabase RLS policies
- **Feature:** Database-level access control enforced via RLS

---

## 🌐 8. Network & Transport Security

### 8.1 HTTPS Enforcement
- **Implementation:** `lib/auth.ts`, `lib/csrf.ts`
- **Feature:** Secure cookies only in production (`secure: true`)

### 8.2 Security Headers
- **Implementation:** `next.config.mjs`
- **Headers:**
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: geolocation=(), microphone=(), camera=()`

### 8.3 Cookie Security
- **Implementation:** All cookie-setting code
- **Attributes:**
  - `httpOnly: true` (prevents JavaScript access)
  - `secure: true` (HTTPS only in production)
  - `sameSite: 'strict'` (prevents cross-site requests)

---

## 📊 9. Logging & Monitoring

### 9.1 Security Event Logging
- **Implementation:** `lib/security-events.ts`
- **Event Types:**
  - `LOGIN_SUCCESS`
  - `LOGIN_FAILED`
  - `AUTH_FAILED`
  - `CSRF_FAILED`
  - `RATE_LIMIT_EXCEEDED`
  - `INVALID_INPUT`
  - `UNAUTHORIZED_ACCESS`
  - `FILE_UPLOAD_FAILED`
  - `LOGOUT`

### 9.2 Audit Logging
- **Implementation:** `lib/audit-log.ts`
- **Features:**
  - Logs all CREATE, UPDATE, DELETE operations
  - Records user ID, email, IP address, user agent
  - Stores old/new values for UPDATE operations
  - Timestamp for all operations

### 9.3 Logging Metadata
- **Implementation:** `lib/security-events.ts`, `lib/audit-log.ts`
- **Captured Data:**
  - User ID and email
  - IP address (handles proxies via X-Forwarded-For)
  - User agent
  - Endpoint/operation
  - Timestamp
  - Metadata (error details, etc.)

---

## 🏗️ 10. Infrastructure & Deployment Security

### 10.1 Environment Variable Security
- **Implementation:** All environment variable usage
- **Features:**
  - No hardcoded secrets
  - Validation on startup (throws error if missing)
  - Service role key restricted to admin client only

### 10.2 Error Handling
- **Implementation:** All API routes
- **Features:**
  - Generic error messages to clients (no stack traces)
  - Detailed logging server-side
  - Proper HTTP status codes

### 10.3 Query Optimization
- **Implementation:** All database queries
- **Features:**
  - COUNT operations instead of fetching all rows
  - Selected columns only
  - Pagination on list endpoints
  - Composite indexes for common queries

---

## 🖥️ 11. Frontend Admin UI Security

### 11.1 Client-Side Validation
- **Implementation:** Admin form components
- **Feature:** Input validation before submission (UX + security)

### 11.2 CSRF Token Handling
- **Implementation:** Admin frontend
- **Feature:** CSRF token included in all state-changing requests

### 11.3 Session Management
- **Implementation:** Admin frontend
- **Feature:** Automatic redirect to login on 401 responses

---

## 📈 12. Performance & Scalability Security

### 12.1 Auth Token Caching
- **Implementation:** `lib/auth.ts`
- **Feature:** 5-minute cache for user validation (reduces DB calls)

### 12.2 Rate Limit Store Cleanup
- **Implementation:** `lib/rate-limit.ts`
- **Feature:** Automatic cleanup of expired rate limit entries

### 12.3 Query Timeout Protection
- **Implementation:** All API routes
- **Feature:** Prevents resource exhaustion from slow queries

---

## ✅ Security Coverage Summary

| Security Area | Status | Implementation |
|---------------|--------|----------------|
| Authentication | ✅ Complete | Supabase Auth + Centralized Guard |
| Authorization | ✅ Complete | RLS + User Context Clients |
| CSRF Protection | ✅ Complete | Token-based with timing-safe comparison |
| Rate Limiting | ✅ Complete | Per-route-type limits |
| Input Validation | ✅ Complete | Multi-layer validation |
| File Upload Security | ✅ Complete | Type, size, content validation |
| SQL Injection Prevention | ✅ Complete | Parameterized queries |
| XSS Prevention | ✅ Complete | Input sanitization + React escaping |
| Session Security | ✅ Complete | Secure, HTTP-only cookies |
| Audit Logging | ✅ Complete | Full CUD operation logging |
| Security Event Logging | ✅ Complete | Comprehensive event tracking |
| Transport Security | ✅ Complete | HTTPS + Security headers |

---

## 📝 Notes

- All security measures are production-ready
- Rate limiting uses in-memory store (consider Redis for multi-instance deployments)
- File upload validation includes magic number verification
- All admin endpoints (27/27) require authentication
- CSRF protection on all state-changing operations
- Comprehensive logging for incident investigation

