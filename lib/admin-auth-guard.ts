// Admin Authentication Guard
// Centralizes authentication check for all admin routes
// Ensures consistent security across all endpoints

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './auth';

export interface AuthResult {
  authenticated: boolean;
  user?: any;
  response?: NextResponse;
}

/**
 * Check if request is authenticated for admin access
 * Returns response object if not authenticated
 * Otherwise returns authenticated user
 */
export async function requireAdminAuth(request: NextRequest): Promise<AuthResult> {
  try {
    const user = await getCurrentUser();
    
    console.log('[DEBUG] Auth check result:', { 
      userExists: !!user,
      userId: user?.id,
      endpoint: request.url,
    });
    
    if (!user) {
      console.log('[DEBUG] No user found - returning 401');
      return {
        authenticated: false,
        response: NextResponse.json(
          { error: 'Unauthorized', message: 'Authentication required' },
          { 
            status: 401,
            headers: {
              'WWW-Authenticate': 'Bearer',
            },
          }
        ),
      };
    }

    return {
      authenticated: true,
      user,
    };
  } catch (error) {
    console.error('[SECURITY] Authentication check failed:', error);
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication failed' },
        { 
          status: 401,
          headers: {
            'WWW-Authenticate': 'Bearer',
          },
        }
      ),
    };
  }
}

/**
 * Wrapper to require authentication on handler
 * Usage: const auth = await requireAdminAuth(request); if (!auth.authenticated) return auth.response;
 */
export async function withAdminAuth<T>(
  handler: (user: any) => Promise<T>,
  user: any
): Promise<T | NextResponse> {
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  return handler(user);
}
