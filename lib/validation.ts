// Strict input validation schemas for API endpoints
// Prevents data corruption, payload abuse, and DoS vectors
import {
  PROPERTY_TYPES,
  PROJECT_STATUSES,
  CONFIGURATIONS,
  isValidPropertyType,
  isValidProjectStatus,
  isValidConfiguration,
} from "@/lib/property-enums";

export interface ValidationError {
  field: string;
  message: string;
}

// Maximum limits for JSONB fields
const MAX_ARRAY_SIZE = 100;
const MAX_STRING_LENGTH = 10000;
const MAX_NESTING_DEPTH = 3;

/**
 * Validate JSONB array field
 */
export function validateArray(
  value: any,
  fieldName: string,
  maxSize: number = MAX_ARRAY_SIZE,
  itemValidator?: (item: any, index: number) => string | null
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!Array.isArray(value)) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be an array`,
    });
    return errors;
  }

  if (value.length > maxSize) {
    errors.push({
      field: fieldName,
      message: `${fieldName} cannot exceed ${maxSize} items`,
    });
  }

  if (itemValidator) {
    value.forEach((item, index) => {
      const error = itemValidator(item, index);
      if (error) {
        errors.push({
          field: `${fieldName}[${index}]`,
          message: error,
        });
      }
    });
  }

  return errors;
}

/**
 * Validate string field
 */
export function validateString(
  value: any,
  fieldName: string,
  required: boolean = false,
  maxLength: number = MAX_STRING_LENGTH,
  minLength: number = 0
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    errors.push({
      field: fieldName,
      message: `${fieldName} is required`,
    });
    return errors;
  }

  if (value !== undefined && value !== null) {
    if (typeof value !== 'string') {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be a string`,
      });
      return errors;
    }

    if (value.length > maxLength) {
      errors.push({
        field: fieldName,
        message: `${fieldName} cannot exceed ${maxLength} characters`,
      });
    }

    if (value.length < minLength) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be at least ${minLength} characters`,
      });
    }
  }

  return errors;
}

/**
 * Validate URL field
 */
export function validateUrl(
  value: any,
  fieldName: string,
  required: boolean = false
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    errors.push({
      field: fieldName,
      message: `${fieldName} is required`,
    });
    return errors;
  }

  if (value !== undefined && value !== null && value !== '') {
    if (typeof value !== 'string') {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be a string`,
      });
      return errors;
    }

    try {
      new URL(value);
    } catch {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be a valid URL`,
      });
    }
  }

  return errors;
}

/**
 * Validate JSONB object field
 */
export function validateObject(
  value: any,
  fieldName: string,
  required: boolean = false,
  maxDepth: number = MAX_NESTING_DEPTH,
  depth: number = 0
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (required && (!value || typeof value !== 'object' || Array.isArray(value))) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be an object`,
    });
    return errors;
  }

  if (value !== undefined && value !== null) {
    if (typeof value !== 'object' || Array.isArray(value)) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be an object`,
      });
      return errors;
    }

    if (depth >= maxDepth) {
      errors.push({
        field: fieldName,
        message: `${fieldName} exceeds maximum nesting depth of ${maxDepth}`,
      });
      return errors;
    }

    // Validate object keys and values
    const keys = Object.keys(value);
    if (keys.length > 100) {
      errors.push({
        field: fieldName,
        message: `${fieldName} cannot have more than 100 keys`,
      });
    }

    // Recursively validate nested objects
    for (const key of keys) {
      if (typeof value[key] === 'object' && value[key] !== null && !Array.isArray(value[key])) {
        errors.push(...validateObject(value[key], `${fieldName}.${key}`, false, maxDepth, depth + 1));
      }
    }
  }

  return errors;
}

/**
 * Validate property data structure
 */
export function validatePropertyData(body: any): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required string fields
  errors.push(...validateString(body.slug, 'slug', true, 200, 1));
  errors.push(...validateString(body.projectName, 'projectName', true, 500));
  errors.push(...validateString(body.developer, 'developer', true, 500));
  errors.push(...validateString(body.location, 'location', true, 500));
  errors.push(...validateString(body.sizes, 'sizes', true, 200));
  errors.push(...validateString(body.description, 'description', true, 50000));

  // Optional string fields
  if (body.reraId) {
    errors.push(...validateString(body.reraId, 'reraId', false, 100));
  }
  if (body.heroImageAlt) {
    errors.push(...validateString(body.heroImageAlt, 'heroImageAlt', false, 255));
  }
  if (body.possessionDate) {
    errors.push(...validateString(body.possessionDate, 'possessionDate', false, 100));
  }
  if (body.price) {
    errors.push(...validateString(body.price, 'price', false, 100));
  }

  // URL fields
  errors.push(...validateUrl(body.heroImage, 'heroImage', true));
  if (body.brochureUrl) {
    errors.push(...validateUrl(body.brochureUrl, 'brochureUrl', false));
  }

  // Location ID validation (required) - FK to locations_v2
  if (body.locationId === undefined || body.locationId === null || body.locationId === '') {
    errors.push({ field: 'locationId', message: 'locationId is required' });
  } else {
    if (typeof body.locationId !== 'string') {
      errors.push({ field: 'locationId', message: 'locationId must be a string (UUID)' });
    } else {
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(body.locationId)) {
        errors.push({ field: 'locationId', message: 'locationId must be a valid UUID' });
      }
    }
  }

  // Locality ID validation (optional) - FK to localities
  if (body.localityId !== undefined && body.localityId !== null && body.localityId !== '') {
    if (typeof body.localityId !== 'string') {
      errors.push({ field: 'localityId', message: 'localityId must be a string (UUID)' });
    } else {
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(body.localityId)) {
        errors.push({ field: 'localityId', message: 'localityId must be a valid UUID' });
      }
    }
  }

  if (body.propertyType !== undefined && body.propertyType !== null) {
    if (typeof body.propertyType !== 'string') {
      errors.push({ field: 'propertyType', message: 'propertyType must be a string' });
    } else if (!isValidPropertyType(body.propertyType)) {
      errors.push({ 
        field: 'propertyType', 
        message: `propertyType must be one of: ${PROPERTY_TYPES.join(', ')}` 
      });
    }
  }

  if (body.projectStatus !== undefined && body.projectStatus !== null) {
    if (typeof body.projectStatus !== 'string') {
      errors.push({ field: 'projectStatus', message: 'projectStatus must be a string' });
    } else if (!isValidProjectStatus(body.projectStatus)) {
      errors.push({ 
        field: 'projectStatus', 
        message: `projectStatus must be one of: ${PROJECT_STATUSES.join(', ')}` 
      });
    }
  }

  // Configuration array (enum array) validation
  if (body.configuration !== undefined) {
    errors.push(...validateArray(
      body.configuration,
      'configuration',
      50,
      (item, index) => {
        if (typeof item !== 'string') {
          return `configuration[${index}] must be a string`;
        }
        if (!isValidConfiguration(item)) {
          return `configuration[${index}] must be one of: ${CONFIGURATIONS.join(', ')}`;
        }
        return null;
      }
    ));
  }

  if (body.images !== undefined) {
    errors.push(...validateArray(
      body.images,
      'images',
      MAX_ARRAY_SIZE,
      (item, index) => {
        if (typeof item !== 'string') {
          return `images[${index}] must be a string URL`;
        }
        try {
          new URL(item);
        } catch {
          return `images[${index}] must be a valid URL`;
        }
        return null;
      }
    ));
  }

  if (body.videos !== undefined) {
    errors.push(...validateArray(
      body.videos,
      'videos',
      20, // Lower limit for videos
      (item, index) => {
        if (typeof item !== 'object' || item === null) {
          return `videos[${index}] must be an object`;
        }
        if (!item.src || typeof item.src !== 'string') {
          return `videos[${index}].src is required and must be a string`;
        }
        try {
          new URL(item.src);
        } catch {
          return `videos[${index}].src must be a valid URL`;
        }
        if (item.title && typeof item.title !== 'string') {
          return `videos[${index}].title must be a string`;
        }
        if (item.title && item.title.length > 500) {
          return `videos[${index}].title cannot exceed 500 characters`;
        }
        if (item.thumbnail && typeof item.thumbnail !== 'string') {
          return `videos[${index}].thumbnail must be a string`;
        }
        if (item.thumbnail) {
          try {
            new URL(item.thumbnail);
          } catch {
            return `videos[${index}].thumbnail must be a valid URL`;
          }
        }
        return null;
      }
    ));
  }

  // Amenities validation - required, at least one item
  if (body.amenities === undefined || body.amenities === null) {
    errors.push({ field: 'amenities', message: 'amenities is required' });
  } else {
    if (!Array.isArray(body.amenities)) {
      errors.push({ field: 'amenities', message: 'amenities must be an array' });
    } else {
      if (body.amenities.length === 0) {
        errors.push({ field: 'amenities', message: 'At least one amenity is required' });
      }
      errors.push(...validateArray(
        body.amenities,
        'amenities',
        MAX_ARRAY_SIZE,
        (item, index) => {
          if (typeof item !== 'string') {
            return `amenities[${index}] must be a string`;
          }
          if (item.trim() === '') {
            return `amenities[${index}] cannot be empty`;
          }
          if (item.length > 200) {
            return `amenities[${index}] cannot exceed 200 characters`;
          }
          return null;
        }
      ));
    }
  }

  // SEO object validation
  if (body.seo !== undefined) {
    errors.push(...validateObject(body.seo, 'seo', false, 2));
    if (body.seo && typeof body.seo === 'object') {
      if (body.seo.title && typeof body.seo.title !== 'string') {
        errors.push({ field: 'seo.title', message: 'seo.title must be a string' });
      }
      if (body.seo.title && body.seo.title.length > 200) {
        errors.push({ field: 'seo.title', message: 'seo.title cannot exceed 200 characters' });
      }
      if (body.seo.description && typeof body.seo.description !== 'string') {
        errors.push({ field: 'seo.description', message: 'seo.description must be a string' });
      }
      if (body.seo.description && body.seo.description.length > 500) {
        errors.push({ field: 'seo.description', message: 'seo.description cannot exceed 500 characters' });
      }
    }
  }

  // Boolean field
  if (body.isPublished !== undefined && typeof body.isPublished !== 'boolean') {
    errors.push({
      field: 'isPublished',
      message: 'isPublished must be a boolean',
    });
  }

  return errors;
}

