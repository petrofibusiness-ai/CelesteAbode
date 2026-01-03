// Security Events Logging
// Logs authentication, authorization, and security-relevant events
// Enables incident investigation and anomaly detection

import { getSupabaseAdminClient } from './supabase-server';

export type SecurityEventType =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'AUTH_FAILED'
  | 'CSRF_FAILED'
  | 'RATE_LIMIT_EXCEEDED'
  | 'INVALID_INPUT'
  | 'UNAUTHORIZED_ACCESS'
  | 'FILE_UPLOAD_FAILED'
  | 'LOGOUT';

export interface SecurityEventDetails {
  userId?: string;
  userEmail?: string;
  ip: string;
  userAgent: string;
  endpoint?: string;
  metadata?: Record<string, any>;
}

/**
 * Log a security-relevant event
 * Uses admin client to ensure logs cannot be bypassed via RLS
 */
export async function logSecurityEvent(
  event: SecurityEventType,
  details: SecurityEventDetails
): Promise<void> {
  try {
    const supabaseAdmin = getSupabaseAdminClient();

    const timestamp = new Date().toISOString();

    // Log to database
    await supabaseAdmin.from('security_events').insert({
      event,
      user_id: details.userId || null,
      user_email: details.userEmail || null,
      ip_address: details.ip,
      user_agent: details.userAgent,
      endpoint: details.endpoint || null,
      metadata: details.metadata || null,
      timestamp,
    });

    // Also log to console for real-time monitoring
    console.log(`[SECURITY] ${event}`, {
      userId: details.userId,
      email: details.userEmail,
      ip: details.ip,
      endpoint: details.endpoint,
      timestamp,
    });
  } catch (error) {
    // If database logging fails, log to console and external service
    console.error('[SECURITY] Failed to write security event:', {
      event,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    // In production, send to external monitoring service (Sentry, DataDog, etc.)
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to external logging service
      // Example: sendToSentry({ message: 'Security event logging failed', event, error });
    }
  }
}

/**
 * Extract IP address from request
 * Handles proxies and load balancers
 */
export function getClientIP(
  forwardedFor?: string | null,
  clientIP?: string | null
): string {
  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }
  return clientIP || 'unknown';
}

/**
 * Extract user agent from request
 */
export function getUserAgent(userAgent?: string | null): string {
  return userAgent || 'unknown';
}
