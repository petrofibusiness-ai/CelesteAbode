// CSRF Token protection for admin panel
// Prevents Cross-Site Request Forgery attacks on state-changing operations

import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

const CSRF_COOKIE_NAME = '__csrf_token';
const CSRF_TOKEN_LENGTH = 32; // 256 bits
const CSRF_TOKEN_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Generate a new CSRF token and store it in an HTTP-only cookie
 */
export async function generateCSRFToken(): Promise<string> {
  const token = randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
  const cookieStore = await cookies();

  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: CSRF_TOKEN_MAX_AGE,
    path: '/',
  });

  return token;
}

/**
 * Verify CSRF token from request header against stored token
 * Should be called on all POST, PATCH, DELETE, PUT operations
 */
export async function verifyCSRFToken(token: string | null): Promise<boolean> {
  if (!token) {
    return false;
  }

  const cookieStore = await cookies();
  const storedToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (!storedToken) {
    return false;
  }

  // Use timing-safe comparison to prevent timing attacks
  return constantTimeCompare(token, storedToken);
}

/**
 * Timing-safe string comparison
 * Prevents timing attacks that could leak token information
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Clear CSRF token (on logout)
 */
export async function clearCSRFToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CSRF_COOKIE_NAME);
}
