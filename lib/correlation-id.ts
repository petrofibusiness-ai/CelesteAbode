// Correlation ID utilities for request tracking
// Enables tracing requests across multiple services

/**
 * Generate correlation ID for request tracking
 */
export function generateCorrelationId(): string {
  return crypto.randomUUID();
}

/**
 * Extract correlation ID from request headers
 */
export function getCorrelationId(request: Request): string {
  return (
    request.headers.get('x-correlation-id') ||
    request.headers.get('x-request-id') ||
    generateCorrelationId()
  );
}

/**
 * Add correlation ID to response headers
 */
export function addCorrelationIdHeader(
  headers: Headers,
  correlationId: string
): void {
  headers.set('X-Correlation-ID', correlationId);
}

/**
 * Structured logging with correlation ID
 */
export function logWithCorrelation(
  level: 'info' | 'warn' | 'error',
  message: string,
  correlationId: string,
  metadata?: Record<string, any>
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    correlationId,
    ...metadata,
  };

  if (level === 'error') {
    console.error(`[${correlationId}]`, logEntry);
  } else if (level === 'warn') {
    console.warn(`[${correlationId}]`, logEntry);
  } else {
    console.log(`[${correlationId}]`, logEntry);
  }
}

