/**
 * Environment variable validation for production
 * Ensures all required environment variables are present
 */

interface EnvConfig {
  // Email Configuration
  EMAIL_USER?: string;
  EMAIL_PASS?: string;
  ADMIN_EMAIL?: string;
  
  // Public Configuration
  NEXT_PUBLIC_APP_EMAIL?: string;
  NEXT_PUBLIC_SALES_PHONE?: string;
  
  // Cloudinary (optional)
  CLOUDINARY_URL?: string;
  
  // Node Environment
  NODE_ENV: string;
}

/**
 * Validate required environment variables
 * Throws error if critical variables are missing in production
 */
export function validateEnv(): void {
  const requiredInProduction = [
    'EMAIL_USER',
    'EMAIL_PASS',
    'ADMIN_EMAIL',
  ];

  const missing: string[] = [];

  if (process.env.NODE_ENV === 'production') {
    for (const key of requiredInProduction) {
      if (!process.env[key]) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables in production: ${missing.join(', ')}`
      );
    }
  }
}

/**
 * Get environment variable with fallback
 */
export function getEnv(key: keyof EnvConfig, fallback?: string): string {
  const value = process.env[key];
  if (!value && fallback) {
    return fallback;
  }
  if (!value && process.env.NODE_ENV === 'production') {
    console.warn(`Environment variable ${key} is not set`);
  }
  return value || '';
}

/**
 * Validate email configuration
 */
export function validateEmailConfig(): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!process.env.EMAIL_USER) {
    errors.push('EMAIL_USER is not set');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.EMAIL_USER)) {
    errors.push('EMAIL_USER is not a valid email address');
  }

  if (!process.env.EMAIL_PASS) {
    errors.push('EMAIL_PASS is not set');
  }

  if (!process.env.ADMIN_EMAIL) {
    errors.push('ADMIN_EMAIL is not set');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.ADMIN_EMAIL)) {
    errors.push('ADMIN_EMAIL is not a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

