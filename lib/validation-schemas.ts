// Input validation schemas for admin panel
// Uses Zod for type-safe schema validation

import { z } from 'zod';

// ============= Common Schemas =============

export const UUIDSchema = z.string().uuid('Invalid UUID format');
export const EmailSchema = z.string().email('Invalid email format').max(255);
export const SlugSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens');
export const PositiveIntSchema = z.number().int().positive();
export const URLSchema = z.string().url('Invalid URL format').max(2048);

// ============= Lead Schemas =============

export const LeadFilterSchema = z.object({
  status: z
    .enum(['all', 'new', 'contacted', 'qualified', 'converted', 'rejected', 'lost'])
    .optional()
    .default('all'),
  formType: z
    .enum(['all', 'contact', 'viewing', 'location-contact', 'advisory-session', 'chatbot', 'segmented-entry', 'property-inquiry', 'quote'])
    .optional()
    .default('all'),
  page: z.number().int().min(1).max(10000).default(1),
  limit: z.number().int().min(1).max(100).default(50),
  // Allow cache-busting timestamp used by admin refresh button
  t: z.number().optional(),
  _t: z.number().optional(),
});

export const UpdateLeadSchema = z.object({
  id: UUIDSchema,
  status: z
    .enum(['new', 'contacted', 'qualified', 'converted', 'rejected'])
    .optional(),
  notes: z.string().max(5000).optional(),
});

export type LeadFilter = z.infer<typeof LeadFilterSchema>;
export type UpdateLead = z.infer<typeof UpdateLeadSchema>;

// ============= Property Schemas =============

export const PropertyFilterSchema = z.object({
  page: z.number().int().min(1).max(10000).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  search: z.string().max(255).optional(),
  published: z.boolean().optional(),
  // Allow cache-busting query param used by admin UI refresh button
  t: z.number().optional(),
  _t: z.number().optional(),
});

export const PropertyDataSchema = z.object({
  name: z.string().min(1).max(500),
  slug: SlugSchema,
  description: z.string().max(5000).optional(),
  price: z.number().nonnegative().optional(),
  location: z.string().max(500).optional(),
  images: z
    .array(z.object({
      url: URLSchema,
      alt: z.string().max(255).optional(),
    }))
    .optional(),
  heroImageUrl: URLSchema.optional(),
  is_published: z.boolean().default(false),
});

export type PropertyFilter = z.infer<typeof PropertyFilterSchema>;
export type PropertyData = z.infer<typeof PropertyDataSchema>;

// ============= Location Schemas =============

export const LocationDataSchema = z.object({
  name: z.string().min(1).max(255),
  slug: SlugSchema,
  description: z.string().max(5000).optional(),
  heroImageUrl: URLSchema.optional(),
  localities: z
    .array(
      z.object({
        name: z.string().min(1).max(255),
        description: z.string().max(1000).optional(),
      })
    )
    .optional(),
});

export type LocationData = z.infer<typeof LocationDataSchema>;

// ============= File Upload Schemas =============

export const ImageUploadSchema = z.object({
  propertySlug: z.string().max(255),
  isHero: z.enum(['true', 'false']).optional(),
});

export const VideoUploadSchema = z.object({
  propertySlug: z.string().max(255),
});

export const PDFUploadSchema = z.object({
  propertySlug: z.string().max(255),
  docType: z.enum(['brochure', 'specification', 'legal']).optional(),
});

export type ImageUpload = z.infer<typeof ImageUploadSchema>;
export type VideoUpload = z.infer<typeof VideoUploadSchema>;
export type PDFUpload = z.infer<typeof PDFUploadSchema>;

// ============= Utility Functions =============

/**
 * Parse and validate query parameters
 * Returns parsed data or throws validation error
 */
export function validateQueryParams<T extends z.ZodSchema>(
  schema: T,
  params: Record<string, string | string[] | null | undefined>
): z.infer<T> {
  // Convert query params to appropriate types
  const converted: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    // Skip undefined and null values - let Zod use schema defaults
    if (value === undefined || value === null) continue;

    // Try to parse as number (only if it's a valid number string)
    if (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value))) {
      converted[key] = Number(value);
    } else if (value === 'true') {
      converted[key] = true;
    } else if (value === 'false') {
      converted[key] = false;
    } else {
      converted[key] = value;
    }
  }

  return schema.parse(converted);
}

/**
 * Validate and parse JSON body
 */
export function validateJSONBody<T extends z.ZodSchema>(
  schema: T,
  body: unknown
): z.infer<T> {
  return schema.parse(body);
}
