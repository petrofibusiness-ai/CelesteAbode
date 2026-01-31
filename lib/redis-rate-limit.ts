// Distributed rate limiting using Redis/Upstash
// Replaces in-memory rate limiting for multi-instance deployments

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  burst?: number; // Allow burst of requests at start of window
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  error?: string;
}

// Redis client (Upstash or Redis)
let redisClient: any = null;

/**
 * Initialize Redis client
 * Supports Upstash REST API or standard Redis
 */
async function getRedisClient() {
  if (redisClient) return redisClient;

  const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.REDIS_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    // Fallback to in-memory if Redis not configured
    console.warn("[RATE_LIMIT] Redis not configured, falling back to in-memory store");
    return null;
  }

  try {
    // Use Upstash REST API if URL contains 'upstash'
    if (redisUrl.includes('upstash')) {
      const { Redis } = await import('@upstash/redis');
      redisClient = new Redis({
        url: redisUrl,
        token: redisToken,
      });
    } else {
      // Standard Redis client
      const Redis = (await import('ioredis')).default;
      redisClient = new Redis(redisUrl, {
        password: redisToken,
      });
    }
    return redisClient;
  } catch (error) {
    console.error("[RATE_LIMIT] Failed to initialize Redis:", error);
    return null;
  }
}

// Fallback in-memory store (for development or when Redis unavailable)
const inMemoryStore = new Map<string, { count: number; resetTime: number; burstUsed: number }>();

/**
 * Check rate limit with burst support
 */
export async function checkDistributedRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { maxRequests, windowMs, burst = 0 } = config;
  const now = Date.now();
  const key = `ratelimit:${identifier}`;
  const burstKey = `ratelimit:burst:${identifier}`;

  const redis = await getRedisClient();

  if (!redis) {
    // Fallback to in-memory
    return checkInMemoryRateLimit(identifier, config);
  }

  try {
    // Use Redis pipeline for atomic operations
    const pipeline = redis.pipeline();

    // Get current count and reset time
    pipeline.get(key);
    pipeline.get(`${key}:reset`);

    // Check burst limit if configured
    if (burst > 0) {
      pipeline.get(burstKey);
    }

    const results = await pipeline.exec();

    const currentCount = parseInt(results[0][1] || '0', 10);
    const resetTime = parseInt(results[1][1] || '0', 10);
    const burstUsed = burst > 0 ? parseInt(results[2]?.[1] || '0', 10) : 0;

    // If window expired, reset
    if (now > resetTime) {
      const newResetTime = now + windowMs;
      const newBurstLimit = burst > 0 ? burst : 0;

      await redis
        .pipeline()
        .set(key, '1', 'PX', windowMs) // Set with expiration
        .set(`${key}:reset`, newResetTime.toString(), 'PX', windowMs)
        .set(burstKey, '0', 'PX', windowMs)
        .exec();

      return {
        success: true,
        remaining: maxRequests - 1,
        resetTime: newResetTime,
      };
    }

    // Check burst limit first (if configured)
    if (burst > 0 && burstUsed < burst) {
      // Allow burst request
      await redis.incr(burstKey);
      await redis.expire(burstKey, Math.floor(windowMs / 1000));

      return {
        success: true,
        remaining: maxRequests - currentCount,
        resetTime,
      };
    }

    // Check regular limit
    if (currentCount >= maxRequests) {
      return {
        success: false,
        remaining: 0,
        resetTime,
        error: `Rate limit exceeded. Maximum ${maxRequests} requests per ${windowMs / 1000} seconds.`,
      };
    }

    // Increment counter
    await redis.incr(key);
    await redis.expire(key, Math.floor(windowMs / 1000));

    return {
      success: true,
      remaining: maxRequests - currentCount - 1,
      resetTime,
    };
  } catch (error) {
    console.error("[RATE_LIMIT] Redis error, falling back to in-memory:", error);
    return checkInMemoryRateLimit(identifier, config);
  }
}

/**
 * In-memory fallback rate limiting
 */
function checkInMemoryRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowMs, burst = 0 } = config;
  const now = Date.now();
  const entry = inMemoryStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    // Create new window
    inMemoryStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
      burstUsed: 0,
    });

    // Cleanup old entries periodically
    if (inMemoryStore.size > 10000) {
      for (const [key, value] of inMemoryStore.entries()) {
        if (now > value.resetTime) {
          inMemoryStore.delete(key);
        }
      }
    }

    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    };
  }

  // Check burst limit
  if (burst > 0 && entry.burstUsed < burst) {
    entry.burstUsed++;
    return {
      success: true,
      remaining: maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  // Check regular limit
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
 * Route-specific rate limit configurations
 */
export const DISTRIBUTED_RATE_LIMITS = {
  // Property creation - allow burst for batch uploads
  PROPERTY_CREATE: {
    maxRequests: 5,
    windowMs: 60 * 1000, // 1 minute
    burst: 3, // Allow 3 rapid requests at start
  },
  PROPERTY_UPDATE: {
    maxRequests: 10,
    windowMs: 60 * 1000,
    burst: 5,
  },
  // Upload URL generation - higher limit for batch
  UPLOAD_URL_GENERATE: {
    maxRequests: 50, // Generate URLs for 50 files
    windowMs: 60 * 1000,
    burst: 20, // Allow 20 rapid URL generations
  },
  // Admin reads
  ADMIN_READ: {
    maxRequests: 100,
    windowMs: 60 * 1000,
    burst: 30,
  },
  // Metadata validation
  METADATA_VALIDATE: {
    maxRequests: 20,
    windowMs: 60 * 1000,
    burst: 10,
  },
} as const;

