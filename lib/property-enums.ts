// Property enum constants - Backend-defined enums for strict validation
// These enums match the database schema exactly

/**
 * Property Type Enum
 * Used in: properties.property_type column
 */
export const PROPERTY_TYPES = [
  'Apartment/Flats',
  'Villas',
  'Plots/Lands',
] as const;

export type PropertyType = typeof PROPERTY_TYPES[number];

/**
 * Location Category Enum
 * Used in: properties.location_category column
 */
export const LOCATION_CATEGORIES = [
  'Noida',
  'Greater Noida West',
  'Yamuna Expressway',
  'Ghaziabad',
  'Lucknow',
  'Gurgaon',
  'Delhi',
  'Pune',
  'Bangalore',
  'Jaipur',
  'Hyderabad',
  'Gujarat',
  'Nainital',
  'Chandigarh',
] as const;

export type LocationCategory = typeof LOCATION_CATEGORIES[number];

/**
 * Project Status Enum
 * Used in: properties.project_status column
 */
export const PROJECT_STATUSES = [
  'New Launch',
  'Under Construction',
  'Ready to Move',
] as const;

export type ProjectStatus = typeof PROJECT_STATUSES[number];

/**
 * Configuration (Unit Types) Enum
 * Used in: properties.configuration column (array)
 */
export const CONFIGURATIONS = [
  '2 BHK',
  '2 BHK + Study',
  '3 BHK',
  '3 BHK + Study',
  '4 BHK',
] as const;

export type Configuration = typeof CONFIGURATIONS[number];

/**
 * Validation helpers
 */
export function isValidPropertyType(value: string): value is PropertyType {
  return PROPERTY_TYPES.includes(value as PropertyType);
}

export function isValidLocationCategory(value: string): value is LocationCategory {
  return LOCATION_CATEGORIES.includes(value as LocationCategory);
}

export function isValidProjectStatus(value: string): value is ProjectStatus {
  return PROJECT_STATUSES.includes(value as ProjectStatus);
}

export function isValidConfiguration(value: string): value is Configuration {
  return CONFIGURATIONS.includes(value as Configuration);
}

