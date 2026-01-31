// Optimized validation for large payloads
// Splits validation into lightweight and heavy layers

import { z } from "zod";

/**
 * Lightweight validation - checks structure only
 * Used for draft creation and initial validation
 */
export const LightweightPropertySchema = z.object({
  slug: z.string().min(1).max(200),
  projectName: z.string().min(1).max(500),
  developer: z.string().min(1).max(500),
  location: z.string().min(1).max(500),
  locationId: z.string().uuid(),
  localityId: z.string().uuid().optional().nullable(),
  sizes: z.string().min(1).max(200),
  description: z.string().min(1).max(50000),
  amenities: z.array(z.string()).min(1).max(100),
});

/**
 * Media validation - separate from main payload
 * Validates media arrays without deep parsing
 */
export const MediaValidationSchema = z.object({
  heroImage: z.string().url().optional(),
  brochureUrl: z.string().url().optional().nullable(),
  images: z.array(z.string().url()).max(100).optional(),
  videos: z.array(z.object({
    title: z.string().max(500),
    src: z.string().url(),
    thumbnail: z.string().url().optional(),
  })).max(20).optional(),
});

/**
 * Fast validation - structure only, no deep checks
 */
export function validateLightweight(data: unknown): {
  valid: boolean;
  errors?: z.ZodError;
} {
  try {
    LightweightPropertySchema.parse(data);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error };
    }
    return { valid: false };
  }
}

/**
 * Validate media separately (called after uploads)
 */
export function validateMedia(data: unknown): {
  valid: boolean;
  errors?: z.ZodError;
} {
  try {
    MediaValidationSchema.parse(data);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error };
    }
    return { valid: false };
  }
}

/**
 * Validate array size without parsing contents
 */
export function validateArraySize(
  value: unknown,
  fieldName: string,
  maxSize: number
): { valid: boolean; error?: string } {
  if (!Array.isArray(value)) {
    return { valid: false, error: `${fieldName} must be an array` };
  }
  if (value.length > maxSize) {
    return {
      valid: false,
      error: `${fieldName} cannot exceed ${maxSize} items`,
    };
  }
  return { valid: true };
}

/**
 * Validate string length without parsing
 */
export function validateStringLength(
  value: unknown,
  fieldName: string,
  maxLength: number
): { valid: boolean; error?: string } {
  if (typeof value !== 'string') {
    return { valid: false, error: `${fieldName} must be a string` };
  }
  if (value.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} cannot exceed ${maxLength} characters`,
    };
  }
  return { valid: true };
}

