// Authentication Rate Limiting
// Prevents brute-force attacks on login endpoint
// Tracks failed attempts by IP and email

interface LoginAttempt {
  count: number;
  resetTime: number;
  locked?: boolean;
}

// In-memory store for login attempts
// For production with multiple instances, use Redis
const loginAttempts = new Map<string, LoginAttempt>();

// Configuration
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Clean up expired entries every 10 minutes
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of loginAttempts.entries()) {
    if (value.resetTime < now) {
      loginAttempts.delete(key);
    }
  }
}, 10 * 60 * 1000);

/**
 * Check if login attempt is allowed for this identifier
 * Identifier can be IP address or email
 */
export function canAttemptLogin(identifier: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(identifier);

  // No entry - first attempt or expired entry
  if (!entry) {
    return true;
  }

  // Entry expired, allow login attempt
  if (now > entry.resetTime) {
    loginAttempts.delete(identifier);
    return true;
  }

  // Still within window, check if locked
  if (entry.locked) {
    return false;
  }

  // Within window but under limit
  return entry.count < MAX_LOGIN_ATTEMPTS;
}

/**
 * Record a failed login attempt
 * Returns true if account should be locked
 */
export function recordFailedLoginAttempt(identifier: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(identifier);

  if (!entry) {
    // First attempt
    loginAttempts.set(identifier, {
      count: 1,
      resetTime: now + ATTEMPT_WINDOW_MS,
      locked: false,
    });
    return false;
  }

  // Entry expired, reset
  if (now > entry.resetTime) {
    loginAttempts.set(identifier, {
      count: 1,
      resetTime: now + ATTEMPT_WINDOW_MS,
      locked: false,
    });
    return false;
  }

  // Increment count
  entry.count++;

  // Lock account after MAX_LOGIN_ATTEMPTS
  if (entry.count >= MAX_LOGIN_ATTEMPTS) {
    entry.locked = true;
    entry.resetTime = now + LOCKOUT_DURATION_MS; // Extend lockout duration
    return true;
  }

  return false;
}

/**
 * Record a successful login - clear attempts
 */
export function recordSuccessfulLogin(identifier: string): void {
  loginAttempts.delete(identifier);
}

/**
 * Get remaining attempts before lockout
 */
export function getRemainingAttempts(identifier: string): number {
  const entry = loginAttempts.get(identifier);

  if (!entry) {
    return MAX_LOGIN_ATTEMPTS;
  }

  const now = Date.now();
  if (now > entry.resetTime) {
    return MAX_LOGIN_ATTEMPTS;
  }

  return Math.max(0, MAX_LOGIN_ATTEMPTS - entry.count);
}

/**
 * Get time until lockout expires (in milliseconds)
 * Returns 0 if not locked or expired
 */
export function getLockoutTimeRemaining(identifier: string): number {
  const entry = loginAttempts.get(identifier);

  if (!entry || !entry.locked) {
    return 0;
  }

  const remaining = entry.resetTime - Date.now();
  return remaining > 0 ? remaining : 0;
}
