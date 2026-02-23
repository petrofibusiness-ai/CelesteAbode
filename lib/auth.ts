// Supabase Authentication for admin panel
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { getSupabaseAdminClient } from './supabase-server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
}

// Token validation cache (5 minute TTL)
interface CachedUser {
  user: AdminUser;
  expiresAt: number;
}

const userCache = new Map<string, CachedUser>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get Supabase client for server-side operations
 */
function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not set');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Authenticate user with email and password using Supabase Auth
 */
export async function authenticateUser(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user || !data.session) {
      return { success: false, error: 'Authentication failed' };
    }

    // Set session cookies with reduced lifetimes for enhanced security
    const cookieStore = await cookies();
    cookieStore.set('sb-access-token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Stronger than 'lax' - prevents cross-site cookie sending
      maxAge: 60 * 60 * 2, // 2 hours - access token
      path: '/',
    });
    cookieStore.set('sb-refresh-token', data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day - refresh token expiry
      path: '/',
    });

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || email,
        name: data.user.user_metadata?.name || 'Admin',
      },
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

/**
 * Get current authenticated user from Supabase session
 * Uses caching to minimize database calls
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;

    if (!accessToken) {
      return null;
    }

    // Check cache first
    const cached = userCache.get(accessToken);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.user;
    }

    // Use service role client to verify the token (only for auth verification)
    const supabaseAdmin = getSupabaseAdminClient();
    
    // Verify the user using the access token
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (error || !user) {
      // Remove from cache if invalid
      userCache.delete(accessToken);
      return null;
    }

    const adminUser: AdminUser = {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || 'Admin',
    };

    // Cache the result
    userCache.set(accessToken, {
      user: adminUser,
      expiresAt: Date.now() + CACHE_TTL,
    });

    // Clean up expired entries periodically
    if (userCache.size > 1000) {
      const now = Date.now();
      for (const [key, value] of userCache.entries()) {
        if (value.expiresAt < now) {
          userCache.delete(key);
        }
      }
    }

    return adminUser;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

/**
 * Check if user is authenticated (for API routes)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('sb-access-token');
    cookieStore.delete('sb-refresh-token');
    
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

/**
 * Create admin user in Supabase (use this once to create the admin user)
 * This should be run server-side with service role key (background job)
 */
export async function createAdminUser(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name: 'Admin',
        role: 'admin',
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Create admin user error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create admin user',
    };
  }
}
