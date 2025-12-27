// Utility to convert location category enum values to URL-safe slugs
import { LOCATION_CATEGORIES, type LocationCategory } from "@/lib/property-enums";

/**
 * Convert a location category to a URL-safe slug
 * Examples:
 * - "Greater Noida West" → "greater-noida-west"
 * - "Yamuna Expressway" → "yamuna-expressway"
 * - "Noida" → "noida"
 * 
 * This function validates against the enum and converts the value to a slug
 */
export function locationCategoryToSlug(locationCategory: LocationCategory | string | null | undefined): string | null {
  if (!locationCategory) {
    return null;
  }

  // Convert to string and trim
  const categoryStr = String(locationCategory).trim();
  
  if (!categoryStr) {
    return null;
  }

  // Check if it's a valid enum value (case-insensitive match)
  const validCategory = LOCATION_CATEGORIES.find(
    (cat) => cat.toLowerCase() === categoryStr.toLowerCase()
  );

  // Use the enum value if found, otherwise use the provided value
  const valueToConvert = validCategory || categoryStr;

  return valueToConvert
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove special characters
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Convert a URL slug back to location category enum value
 * Examples:
 * - "greater-noida-west" → "Greater Noida West"
 * - "yamuna-expressway" → "Yamuna Expressway"
 * - "noida" → "Noida"
 */
export function slugToLocationCategory(slug: string): LocationCategory | null {
  if (!slug) {
    return null;
  }

  // Normalize the slug
  const normalizedSlug = slug.toLowerCase().trim();

  // Find matching location category
  const match = LOCATION_CATEGORIES.find(
    (category) => locationCategoryToSlug(category) === normalizedSlug
  );

  return match || null;
}

/**
 * Get all valid location category slugs
 */
export function getAllLocationCategorySlugs(): string[] {
  return LOCATION_CATEGORIES.map((category) => locationCategoryToSlug(category)!).filter(Boolean);
}

