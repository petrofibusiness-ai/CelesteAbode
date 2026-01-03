import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';
import {
  canAttemptLogin,
  recordFailedLoginAttempt,
  recordSuccessfulLogin,
  getRemainingAttempts,
  getLockoutTimeRemaining,
} from '@/lib/auth-rate-limit';
import { logSecurityEvent, getClientIP, getUserAgent } from '@/lib/security-events';
import { validateJSONBody } from '@/lib/validation-schemas';
import { z } from 'zod';

const LoginSchema = z.object({
  username: z.string().min(1).max(255),
  password: z.string().min(1).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(
      request.headers.get('x-forwarded-for'),
      request.headers.get('x-real-ip')
    );
    const userAgent = getUserAgent(request.headers.get('user-agent'));

    // Parse and validate input
    let loginData;
    try {
      const body = await request.json();
      loginData = validateJSONBody(LoginSchema, body);
    } catch (error) {
      await logSecurityEvent('INVALID_INPUT', {
        ip,
        userAgent,
        endpoint: '/api/admin/auth/login',
        metadata: { error: 'Invalid login request format' },
      });

      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const { username, password } = loginData;

    // Rate limiting check - use IP + username as identifier
    const rateLimitKey = `${ip}:${username}`;

    if (!canAttemptLogin(rateLimitKey)) {
      const timeRemaining = getLockoutTimeRemaining(rateLimitKey);
      const minutesRemaining = Math.ceil(timeRemaining / 1000 / 60);

      await logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        userEmail: username,
        ip,
        userAgent,
        endpoint: '/api/admin/auth/login',
        metadata: { reason: 'Too many failed login attempts' },
      });

      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please try again in ${minutesRemaining} minutes.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(timeRemaining / 1000).toString(),
          },
        }
      );
    }

    // Use username as email (Supabase Auth uses email)
    const email = username.includes('@')
      ? username
      : `${username}@admin.celesteabode.com`;

    // Authenticate with Supabase
    const result = await authenticateUser(email, password);

    if (!result.success) {
      // Record failed attempt
      recordFailedLoginAttempt(rateLimitKey);
      const remaining = getRemainingAttempts(rateLimitKey);

      await logSecurityEvent('LOGIN_FAILED', {
        userEmail: username,
        ip,
        userAgent,
        endpoint: '/api/admin/auth/login',
        metadata: {
          reason: result.error || 'Invalid credentials',
          remainingAttempts: remaining,
        },
      });

      return NextResponse.json(
        { error: result.error || 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Clear rate limit on successful login
    recordSuccessfulLogin(rateLimitKey);

    // Log successful login
    await logSecurityEvent('LOGIN_SUCCESS', {
      userId: result.user?.id,
      userEmail: email,
      ip,
      userAgent,
      endpoint: '/api/admin/auth/login',
    });

    return NextResponse.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    console.error('[INTERNAL] Login error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
