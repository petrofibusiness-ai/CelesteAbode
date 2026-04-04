import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // REWRITE: Convert hyphenated public URL to internal route format
  // Public: /properties-in-{locationCategory}/{slug} (property page)
  // Internal: /properties-in/{locationCategory}/{slug}
  const hyphenatedRouteMatch = pathname.match(/^\/properties-in-([^/]+)\/([^/]+)$/);
  if (hyphenatedRouteMatch) {
    const [, locationCategory, slug] = hyphenatedRouteMatch;
    // Rewrite to internal route format
    const rewriteUrl = new URL(
      `/properties-in/${locationCategory}/${slug}`,
      request.url
    );
    // Preserve query string
    rewriteUrl.search = request.nextUrl.search;
    return NextResponse.rewrite(rewriteUrl);
  }

  // REWRITE: Convert hyphenated location-only URL to internal route format
  // Public: /properties-in-{locationCategory} (location page)
  // Internal: /properties-in/{locationCategory}
  const locationOnlyMatch = pathname.match(/^\/properties-in-([^/]+)$/);
  if (locationOnlyMatch) {
    const [, locationCategory] = locationOnlyMatch;
    // Rewrite to internal route format
    const rewriteUrl = new URL(
      `/properties-in/${locationCategory}`,
      request.url
    );
    // Preserve query string
    rewriteUrl.search = request.nextUrl.search;
    return NextResponse.rewrite(rewriteUrl);
  }

  // BLOCK invalid property routes: /properties-in/{slug} (missing location category)
  // This should only be accessible via rewrite, not directly
  if (pathname.startsWith('/properties-in/') && pathname !== '/properties-in') {
    const segments = pathname.split('/').filter(Boolean);
    // If it's not the internal route format (exactly 3 segments: properties-in, locationCategory, slug)
    // or if it's the old invalid format (2 segments: properties-in, slug)
    if (segments.length === 2 && segments[0] === 'properties-in') {
      // Invalid: /properties-in/{slug} - missing location category
      return NextResponse.json(
        { error: 'Not Found' },
        { status: 404 }
      );
    }
  }

  const response = NextResponse.next();

  // Security Headers - Minimal to avoid breaking Next.js
  const securityHeaders = {
    // XSS Protection
    'X-Content-Type-Options': 'nosniff',
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Permissions Policy (formerly Feature-Policy)
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // CRITICAL: Block search engines from indexing admin pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  }

  // Private internal inventory (no login) — do not index or cache publicly
  if (pathname === '/ca-internal-inventory-v1' || pathname.startsWith('/ca-internal-inventory-v1/')) {
    response.headers.set(
      'X-Robots-Tag',
      'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate'
    );
    response.headers.set('Cache-Control', 'private, no-store, must-revalidate');
  }

  // HSTS (HTTP Strict Transport Security) - only in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};

