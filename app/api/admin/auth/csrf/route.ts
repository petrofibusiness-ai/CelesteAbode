import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { generateCSRFToken } from '@/lib/csrf';
import { cookies } from 'next/headers';

const CSRF_COOKIE_NAME = '__csrf_token';

/**
 * GET /api/admin/auth/csrf
 * Returns a CSRF token for authenticated admin users
 * Returns existing token if available, otherwise generates a new one
 * The token is stored in an HTTP-only cookie and also returned in the response
 */
export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if token already exists in cookie
    const cookieStore = await cookies();
    const existingToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

    if (existingToken) {
      // Return existing token
      return NextResponse.json({ csrfToken: existingToken });
    }

    // Generate and return new CSRF token
    // The token is automatically stored in an HTTP-only cookie by generateCSRFToken
    const token = await generateCSRFToken();

    return NextResponse.json({ csrfToken: token });
  } catch (error) {
    console.error('[INTERNAL] CSRF token generation error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'An error occurred while generating CSRF token' },
      { status: 500 }
    );
  }
}
