/**
 * Error logging utility for production
 * Centralized error logging with optional integration to monitoring services
 */

interface ErrorLog {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  timestamp: string;
  url?: string;
  userAgent?: string;
  userId?: string;
}

/**
 * Log error to console and optionally to monitoring service
 */
export function logError(
  error: Error | string,
  context?: Record<string, unknown>
): void {
  const errorLog: ErrorLog = {
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'string' ? undefined : error.stack,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
  };

  // Always log to console
  console.error('Error logged:', errorLog);

  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with error monitoring service
    // Examples: Sentry, LogRocket, Datadog, etc.
    
    // Example Sentry integration:
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: context });
    // }
    
    // Example: Send to custom API endpoint
    // fetch('/api/log-error', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorLog),
    // }).catch(() => {
    //   // Silently fail if error logging fails
    // });
  }
}

/**
 * Log warning
 */
export function logWarning(
  message: string,
  context?: Record<string, unknown>
): void {
  const warningLog: ErrorLog = {
    message,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  };

  console.warn('Warning logged:', warningLog);

  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to monitoring service if needed
  }
}

/**
 * Log info (for debugging in development)
 */
export function logInfo(
  message: string,
  context?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === 'development') {
    console.info('Info:', { message, context, timestamp: new Date().toISOString() });
  }
}

