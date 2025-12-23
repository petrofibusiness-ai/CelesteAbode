// Production monitoring, error logging, and performance metrics
// Makes the system operable, observable, and safe in production

export interface PerformanceMetric {
  endpoint: string;
  method: string;
  duration: number;
  statusCode: number;
  userId?: string;
  timestamp: string;
}

export interface ErrorLog {
  endpoint: string;
  method: string;
  error: string;
  stack?: string;
  userId?: string;
  requestBody?: any;
  timestamp: string;
}

/**
 * Log performance metric
 */
export function logPerformanceMetric(metric: Omit<PerformanceMetric, 'timestamp'>): void {
  const fullMetric: PerformanceMetric = {
    ...metric,
    timestamp: new Date().toISOString(),
  };

  // In production, send to external monitoring service (e.g., Sentry, DataDog, etc.)
  // For now, log to console with structured format
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with external monitoring service
    console.log('[PERFORMANCE]', JSON.stringify(fullMetric));
  } else {
    console.log(`[PERF] ${metric.method} ${metric.endpoint} - ${metric.duration}ms - ${metric.statusCode}`);
  }
}

/**
 * Log error with context
 */
export function logError(error: Omit<ErrorLog, 'timestamp'>): void {
  const fullError: ErrorLog = {
    ...error,
    timestamp: new Date().toISOString(),
  };

  // In production, send to external error tracking service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with external error tracking (e.g., Sentry)
    console.error('[ERROR]', JSON.stringify(fullError));
  } else {
    console.error(`[ERROR] ${error.method} ${error.endpoint}:`, error.error);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}

/**
 * Track slow queries (queries taking longer than threshold)
 */
export function trackSlowQuery(
  query: string,
  duration: number,
  threshold: number = 5000 // 5 seconds
): void {
  if (duration > threshold) {
    console.warn(`[SLOW_QUERY] Query took ${duration}ms (threshold: ${threshold}ms):`, query);
    // In production, send to monitoring service
  }
}

/**
 * Health check endpoint data
 */
export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    database: 'ok' | 'error';
    r2: 'ok' | 'error';
    auth: 'ok' | 'error';
  };
  metrics: {
    uptime: number;
    memoryUsage: NodeJS.MemoryUsage;
  };
}

/**
 * Get system health status
 */
export async function getHealthCheck(): Promise<HealthCheck> {
  const checks: {
    database: 'ok' | 'error';
    r2: 'ok' | 'error';
    auth: 'ok' | 'error';
  } = {
    database: 'ok',
    r2: 'ok',
    auth: 'ok',
  };

  // Check database connection
  try {
    const { getSupabaseServerClient } = await import('./supabase-server');
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.from('properties').select('id').limit(1);
    if (error) {
      checks.database = 'error';
    }
  } catch {
    checks.database = 'error';
  }

  // Check R2 configuration
  try {
    if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
      checks.r2 = 'error';
    }
  } catch {
    checks.r2 = 'error';
  }

  // Check auth configuration
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      checks.auth = 'error';
    }
  } catch {
    checks.auth = 'error';
  }

  const status = 
    checks.database === 'ok' && checks.r2 === 'ok' && checks.auth === 'ok'
      ? 'healthy'
      : checks.database === 'ok' || checks.r2 === 'ok' || checks.auth === 'ok'
      ? 'degraded'
      : 'unhealthy';

  return {
    status,
    timestamp: new Date().toISOString(),
    checks,
    metrics: {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    },
  };
}

