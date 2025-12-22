// Rate limiting middleware for API routes
// Prevents rapid repeated DB hits, accidental infinite loops, and malicious hammering

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (for single-instance deployments)
// For production with multiple instances, use Redis or similar
const rateLimitStore: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const key in rateLimitStore) {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  identifier?: string; // Custom identifier (defaults to IP + user ID)
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  error?: string;
}

/**
 * Check rate limit for a request
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowMs } = config;
  const now = Date.now();
  const key = identifier;

  const entry = rateLimitStore[key];

  if (!entry || entry.resetTime < now) {
    // Create new window
    rateLimitStore[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    };
  }

  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      error: `Rate limit exceeded. Maximum ${maxRequests} requests per ${windowMs / 1000} seconds.`,
    };
  }

  entry.count++;
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get rate limit identifier from request
 */
export function getRateLimitIdentifier(
  request: Request,
  userId?: string
): string {
  // Use user ID if available, otherwise use IP
  if (userId) {
    return `user:${userId}`;
  }

  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';

  return `ip:${ip}`;
}

/**
 * Rate limit configurations for different route types
 */
export const RATE_LIMITS = {
  // Admin routes - stricter limits
  ADMIN_WRITE: {
    maxRequests: 10,
    windowMs: 60 * 1000, // 10 requests per minute
  },
  ADMIN_READ: {
    maxRequests: 60,
    windowMs: 60 * 1000, // 60 requests per minute
  },
  // Upload routes - very strict
  UPLOAD: {
    maxRequests: 5,
    windowMs: 60 * 1000, // 5 uploads per minute
  },
  // Public routes - more lenient
  PUBLIC: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 100 requests per minute
  },
} as const;

