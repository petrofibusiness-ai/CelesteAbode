// Audit logging for all Create/Update/Delete operations
// Enables incident investigation, accountability, and rollback

import { getSupabaseAdminClient } from './supabase-server';

export interface AuditLogEntry {
  table_name: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  record_id: string;
  user_id: string;
  user_email?: string;
  changes?: Record<string, any>; // For UPDATE operations
  old_values?: Record<string, any>; // For UPDATE/DELETE operations
  new_values?: Record<string, any>; // For CREATE/UPDATE operations
  ip_address?: string;
  user_agent?: string;
  timestamp: string;
}

/**
 * Log an audit entry
 * Uses admin client to ensure logs cannot be bypassed
 */
export async function logAuditEntry(entry: Omit<AuditLogEntry, 'timestamp'>): Promise<void> {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    
    await supabaseAdmin.from('audit_logs').insert({
      table_name: entry.table_name,
      operation: entry.operation,
      record_id: entry.record_id,
      user_id: entry.user_id,
      user_email: entry.user_email,
      changes: entry.changes || null,
      old_values: entry.old_values || null,
      new_values: entry.new_values || null,
      ip_address: entry.ip_address || null,
      user_agent: entry.user_agent || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Log to console if database logging fails
    // In production, also send to external logging service
    console.error('Failed to write audit log:', error);
    console.error('Audit entry:', entry);
  }
}

/**
 * Get client IP and user agent from request
 */
export function getRequestMetadata(request: Request): {
  ip_address?: string;
  user_agent?: string;
} {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp;
  const userAgent = request.headers.get('user-agent');

  return {
    ip_address: ip || undefined,
    user_agent: userAgent || undefined,
  };
}

