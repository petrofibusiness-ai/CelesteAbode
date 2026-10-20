# Admin Panel Security Issues & Recommendations

## Overview
This document outlines identified security vulnerabilities and risks in the admin panel implementation, along with recommended mitigations and best practices.

---

## Critical Issues

### 1. **Hardcoded Default JWT Secret**
**Severity: CRITICAL**

**Location:** [middleware-admin.ts](middleware-admin.ts#L5)

**Issue:**
```typescript
const secretKey = process.env.ADMIN_JWT_SECRET || 'your-secret-key-change-in-production';
```

The fallback secret key is hardcoded and exposes the entire admin panel to unauthorized access if the environment variable is not set.

**Impact:**
- Anyone knowing this default secret can forge JWT tokens
- Complete bypass of authentication mechanisms
- Unauthorized access to all admin resources

**Recommended Fix:**
```typescript
const secretKey = process.env.ADMIN_JWT_SECRET;
if (!secretKey) {
  throw new Error('ADMIN_JWT_SECRET environment variable is not set. Admin panel cannot start.');
}
```

**Action Items:**
- Ensure `ADMIN_JWT_SECRET` is set in all environments (development, staging, production)
- Use a strong, randomly generated secret (minimum 32 characters)
- Rotate secrets periodically (quarterly recommended)
- Never commit secrets to version control

---

### 2. **Missing CSRF Protection on State-Changing Operations**
**Severity: CRITICAL**

**Location:** Multiple API routes ([app/api/admin/properties/route.ts](app/api/admin/properties/route.ts), [app/api/admin/locations/route.ts](app/api/admin/locations/route.ts), [app/api/admin/leads/route.ts](app/api/admin/leads/route.ts))

**Issue:**
- POST, PATCH, DELETE operations lack CSRF token validation
- No `X-CSRF-Token` header validation
- No SameSite cookie restrictions beyond `sameSite: 'lax'`

**Impact:**
- Attackers can trick authenticated admins into making unintended state changes
- Property data can be modified without explicit authorization
- Leads can be marked as processed when they shouldn't be
- Locations can be deleted or modified

**Recommended Fix:**

1. Implement CSRF token generation and validation:
```typescript
// lib/csrf.ts
import { createHash, randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export async function generateCSRFToken(): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const cookieStore = await cookies();
  
  cookieStore.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  
  return token;
}

export async function verifyCSRFToken(token: string): Promise<boolean> {
  const cookieStore = await cookies();
  const storedToken = cookieStore.get('csrf-token')?.value;
  
  return storedToken === token;
}
```

2. Update all state-changing endpoints:
```typescript
// Before processing POST/PATCH/DELETE requests
const csrfToken = request.headers.get('x-csrf-token');
if (!csrfToken || !(await verifyCSRFToken(csrfToken))) {
  return NextResponse.json(
    { error: 'CSRF token validation failed' },
    { status: 403 }
  );
}
```

3. Enhance cookie security:
```typescript
cookieStore.set('sb-access-token', data.session.access_token, {
  httpOnly: true,
  secure: true, // Always true in production
  sameSite: 'strict', // Stronger than 'lax'
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
});
```

**Action Items:**
- Implement CSRF token middleware immediately
- Update all POST/PATCH/DELETE routes with token validation
- Use `sameSite: 'strict'` instead of `'lax'`
- Test CSRF protection with automated security tests

---

### 3. **Weak Authentication Token Lifetime**
**Severity: HIGH**

**Location:** [lib/auth.ts](lib/auth.ts#L51-L69)

**Issue:**
- Access tokens valid for 7 days (excessive for admin operations)
- Refresh tokens valid for 30 days (should be shorter)
- No token rotation mechanism
- No per-session limits

**Impact:**
- Compromised token remains valid for extended period
- Increased window for token theft attacks
- No ability to revoke sessions immediately

**Recommended Fix:**

```typescript
// Reduce token lifetimes
cookieStore.set('sb-access-token', data.session.access_token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 15, // 15 minutes
  path: '/',
});
cookieStore.set('sb-refresh-token', data.session.refresh_token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24, // 1 day
  path: '/',
});
```

**Action Items:**
- Implement automatic token refresh mechanism
- Add token rotation on each successful refresh
- Implement session tracking database
- Enable immediate session revocation capability
- Consider per-IP session binding

---

## High Severity Issues

### 4. **Insufficient Input Validation on User Inputs**
**Severity: HIGH**

**Location:** [app/api/admin/leads/route.ts](app/api/admin/leads/route.ts#L8-L30), [app/api/admin/properties/route.ts](app/api/admin/properties/route.ts#L141-L150)

**Issue:**
- Query parameters (`status`, `formType`) accepted without type validation
- No length restrictions on input fields
- Missing regex validation for email-like fields
- No sanitization of user-provided data

**Impact:**
- NoSQL injection attacks possible
- Resource exhaustion through oversized inputs
- Data integrity issues
- Unexpected application behavior

**Recommended Fix:**

```typescript
// lib/validation.ts
import { z } from 'zod';

export const LeadFilterSchema = z.object({
  status: z.enum(['all', 'new', 'contacted', 'qualified', 'converted', 'rejected']).optional(),
  formType: z.enum(['all', 'contact', 'property-inquiry', 'quote']).optional(),
  page: z.number().int().min(1).max(10000).default(1),
  limit: z.number().int().min(1).max(100).default(50),
});

export const UpdateLeadSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'rejected']).optional(),
  notes: z.string().max(5000).optional(),
});

// Usage in route handler
const validation = LeadFilterSchema.safeParse({
  status: request.nextUrl.searchParams.get('status'),
  formType: request.nextUrl.searchParams.get('formType'),
  page: parseInt(request.nextUrl.searchParams.get('page') || '1'),
  limit: parseInt(request.nextUrl.searchParams.get('limit') || '50'),
});

if (!validation.success) {
  return NextResponse.json(
    { error: 'Invalid input parameters', details: validation.error.flatten() },
    { status: 400 }
  );
}
```

**Action Items:**
- Implement Zod or similar schema validation for all inputs
- Create comprehensive input validation schemas
- Add length/size limits to all string inputs
- Implement whitelist validation for enums
- Test with malicious input payloads

---

### 5. **No Rate Limiting on Authentication Endpoints**
**Severity: HIGH**

**Location:** [app/api/admin/auth/login/route.ts](app/api/admin/auth/login/route.ts)

**Issue:**
- Login endpoint has no rate limiting
- No brute-force protection
- No account lockout mechanism
- No failed attempt tracking

**Impact:**
- Password brute-force attacks possible
- Dictionary attacks against known usernames
- Denial of service through repeated login attempts
- No audit trail of failed attempts

**Recommended Fix:**

```typescript
// lib/auth-rate-limit.ts
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

export async function checkLoginRateLimit(identifier: string): Promise<boolean> {
  const now = Date.now();
  const entry = loginAttempts.get(identifier);

  if (!entry) {
    loginAttempts.set(identifier, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }

  if (now > entry.resetTime) {
    loginAttempts.set(identifier, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) {
    return false; // Rate limited
  }

  entry.count++;
  return true;
}

// In login route
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { username, password } = await request.json();

  if (!checkLoginRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many failed login attempts. Try again later.' },
      { status: 429 }
    );
  }

  // Rest of authentication logic...
}
```

**Action Items:**
- Implement rate limiting on `/api/admin/auth/login`
- Track failed attempts by IP and username
- Lock accounts after 5 failed attempts for 15 minutes
- Log all failed authentication attempts
- Send email alerts on suspicious activities

---

### 6. **Excessive Admin Client Permissions**
**Severity: HIGH**

**Location:** [app/api/admin/properties/route.ts](app/api/admin/properties/route.ts#L47), [app/api/admin/leads/route.ts](app/api/admin/leads/route.ts#L3)

**Issue:**
- Admin client used for READ operations (not just WRITE)
- Bypasses RLS (Row Level Security) policies unnecessarily
- No scope limiting on admin operations
- Can access data beyond what admin should see

**Impact:**
- Violates principle of least privilege
- Potential for reading sensitive user data
- Difficult to audit what admin accessed
- Increased risk if token is compromised

**Recommended Fix:**

```typescript
// Only use admin client for operations that truly require it
// Use regular authenticated client for reads with RLS

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use regular client (respects RLS)
  const supabase = getSupabaseServerClient(request);
  
  // Let RLS enforce what this admin can see
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
}
```

**Action Items:**
- Review all admin client usages
- Replace with regular authenticated client where possible
- Document why admin client is needed for each endpoint
- Implement RLS policies for admin users
- Add scope-based permissions to admin roles

---

## Medium Severity Issues

### 7. **Insufficient Logging of Security Events**
**Severity: MEDIUM**

**Location:** [lib/audit-log.ts](lib/audit-log.ts), various route handlers

**Issue:**
- No logging of authentication events (success/failure)
- No logging of authorization failures
- Rate limit violations not logged
- CSRF failures not logged
- No structured logging format
- Failed attempts are not tracked

**Impact:**
- Cannot investigate security breaches
- No visibility into attack patterns
- Compliance/audit trail gaps
- Cannot detect compromised accounts

**Recommended Fix:**

```typescript
// lib/security-events.ts
export async function logSecurityEvent(
  event: 'login_success' | 'login_failed' | 'auth_failed' | 'csrf_failed' | 'rate_limit_exceeded',
  details: {
    userId?: string;
    email?: string;
    ip: string;
    userAgent: string;
    metadata?: Record<string, any>;
  }
): Promise<void> {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    
    await supabaseAdmin.from('security_events').insert({
      event,
      user_id: details.userId || null,
      user_email: details.email || null,
      ip_address: details.ip,
      user_agent: details.userAgent,
      metadata: details.metadata || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Send to external logging service (Sentry, DataDog, etc.)
    console.error('[SECURITY] Failed to log event:', event, error);
  }
}

// Usage in login
if (!result.success) {
  await logSecurityEvent('login_failed', {
    email: username,
    ip: request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
  });
  
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
```

**Action Items:**
- Create security events logging table
- Log all authentication attempts (success/failure)
- Log authorization failures
- Log rate limit violations
- Implement log retention policy (90 days minimum)
- Set up alerts for suspicious patterns

---

### 8. **Missing Security Headers**
**Severity: MEDIUM**

**Location:** Next.js configuration, API routes

**Issue:**
- No Content-Security-Policy (CSP) header
- No X-Frame-Options to prevent clickjacking
- No X-Content-Type-Options
- No Strict-Transport-Security (HSTS)
- No Referrer-Policy

**Impact:**
- Clickjacking attacks possible
- XSS vulnerabilities not mitigated
- MIME-type sniffing attacks
- Man-in-the-middle attacks in development
- Information leakage through referrer headers

**Recommended Fix:**

```typescript
// next.config.mjs
export default {
  async headers() {
    return [
      {
        source: '/api/admin/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

// Content-Security-Policy (more complex, use middleware)
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );
  }
  
  return response;
}
```

**Action Items:**
- Add security headers middleware
- Implement Content-Security-Policy
- Add HSTS preload directive
- Remove `unsafe-inline` from CSP once possible
- Test headers with security scanning tools

---

### 9. **No File Upload Security Validation**
**Severity: MEDIUM**

**Location:** [app/api/admin/upload/image/route.ts](app/api/admin/upload/image/route.ts), [app/api/admin/upload/pdf/route.ts](app/api/admin/upload/pdf/route.ts), [app/api/admin/upload/video/route.ts](app/api/admin/upload/video/route.ts)

**Issue:**
- Only MIME type validation (can be spoofed)
- No file content/magic number verification
- No filename sanitization
- File size limits not consistently applied
- No antivirus/malware scanning
- No rate limiting on uploads

**Impact:**
- Malicious files can be uploaded (e.g., executable disguised as image)
- Zip bombs and resource exhaustion
- Filename-based attacks
- Storage abuse

**Recommended Fix:**

```typescript
// lib/file-upload-validator.ts
import { promises as fs } from 'fs';
import fileType from 'file-type';

export async function validateUploadedFile(
  file: File,
  allowedMimes: string[],
  maxSize: number
): Promise<{ valid: boolean; error?: string }> {
  // Check file size
  if (file.size > maxSize) {
    return { valid: false, error: `File exceeds maximum size of ${maxSize} bytes` };
  }

  // Check MIME type
  if (!allowedMimes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type' };
  }

  // Verify actual file type via magic bytes
  const buffer = await file.arrayBuffer();
  const detected = await fileType.fromBuffer(buffer);
  
  if (!detected || !allowedMimes.includes(detected.mime)) {
    return { valid: false, error: 'File content does not match declared type' };
  }

  return { valid: true };
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .substring(0, 255);
}

// Usage in upload route
const validation = await validateUploadedFile(file, ['image/jpeg', 'image/png'], 5 * 1024 * 1024);
if (!validation.valid) {
  return NextResponse.json({ error: validation.error }, { status: 400 });
}

const sanitizedFilename = sanitizeFilename(file.name);
```

**Action Items:**
- Implement file content validation via magic bytes
- Add filename sanitization
- Enforce consistent file size limits
- Scan uploads with antivirus API (ClamAV, VirusTotal)
- Add upload rate limiting per user
- Store files outside webroot

---

## Low Severity Issues

### 10. **Insufficient Error Handling Details**
**Severity: LOW**

**Location:** Multiple route handlers

**Issue:**
- Generic error messages hide implementation details (good)
- BUT: Console errors still leak sensitive information
- Stack traces exposed in logs
- Detailed Supabase errors returned to client in some cases

**Impact:**
- Information disclosure in development/logs
- Attackers can learn about system internals
- May violate data privacy regulations

**Recommended Fix:**

```typescript
// Never return detailed errors to client
export async function PATCH(request: NextRequest) {
  try {
    // Operations...
  } catch (error) {
    // Log detailed error internally only
    console.error('[INTERNAL] Property update failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    // Send generic error to client
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
```

**Action Items:**
- Audit all error responses for information disclosure
- Implement structured logging with levels
- Send detailed errors to external logging only
- Implement error monitoring (Sentry)
- Test error responses in production-like environment

---

## Implementation Checklist

### Immediate (Week 1)
- [ ] Address hardcoded JWT secret
- [ ] Implement CSRF token validation
- [ ] Add rate limiting to login endpoint
- [ ] Add authentication security headers

### Short-term (Week 2-3)
- [ ] Reduce token lifetimes
- [ ] Implement comprehensive input validation
- [ ] Add security event logging
- [ ] File upload validation improvements

### Medium-term (Month 1)
- [ ] Complete security headers implementation
- [ ] Implement antivirus scanning for uploads
- [ ] Set up error monitoring
- [ ] Conduct security audit

### Long-term (Ongoing)
- [ ] Implement OAuth2 for admin authentication
- [ ] Add multi-factor authentication (MFA)
- [ ] Quarterly security testing
- [ ] Regular dependency updates
- [ ] Penetration testing

---

## Testing & Validation

### Security Testing Checklist
```bash
# Test CSRF protection
curl -X POST http://localhost:3000/api/admin/properties \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}' \
  # Should fail without CSRF token

# Test rate limiting
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/admin/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"test","password":"wrong"}'
done
# Should return 429 after 5 attempts

# Test input validation
curl http://localhost:3000/api/admin/leads?limit=999999
# Should be rejected or clamped to max 100

# Test authentication
curl http://localhost:3000/api/admin/properties
# Should return 401 without token
```

### Automated Security Testing
- Implement OWASP ZAP scanning in CI/CD
- Use ESLint security plugins
- Regular dependency vulnerability scanning (Snyk, npm audit)

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security)
- [Supabase Security Documentation](https://supabase.com/docs/guides/platform#security)

---

## Version History
- **v1.0** (2026-01-03): Initial security assessment document created
