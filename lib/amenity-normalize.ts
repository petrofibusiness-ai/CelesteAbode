import { SORTED_AMENITIES } from "./amenity-list";

/**
 * Normalize amenity name to match predefined list (case-insensitive matching)
 * This ensures consistency between stored values and predefined amenities
 */
export function normalizeAmenityName(amenity: string): string | null {
  if (!amenity || typeof amenity !== "string") return null;
  
  const trimmed = amenity.trim();
  if (!trimmed) return null;
  
  const lowerTrimmed = trimmed.toLowerCase();
  
  // Try exact match first (case-insensitive)
  const exactMatch = SORTED_AMENITIES.find(
    (a) => a.toLowerCase() === lowerTrimmed
  );
  if (exactMatch) return exactMatch;
  
  // Try partial match (contains)
  const partialMatch = SORTED_AMENITIES.find((a) =>
    a.toLowerCase().includes(lowerTrimmed) ||
    lowerTrimmed.includes(a.toLowerCase())
  );
  if (partialMatch) return partialMatch;
  
  // If no match found, return the original (capitalized)
  // This allows custom amenities while still trying to match predefined ones
  return trimmed
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Normalize an array of amenities
 * Removes duplicates, empty strings, and normalizes names
 */
export function normalizeAmenities(amenities: string[] | null | undefined): string[] {
  if (!amenities || !Array.isArray(amenities)) return [];
  
  const normalized = amenities
    .map(normalizeAmenityName)
    .filter((a): a is string => a !== null);
  
  // Remove duplicates (case-insensitive)
  const unique = Array.from(
    new Set(normalized.map((a) => a.toLowerCase()))
  ).map((lowercase) => {
    const original = normalized.find(
      (a) => a.toLowerCase() === lowercase
    );
    return original || lowercase;
  });
  
  return unique;
}

/**
 * Check if an amenity is in the predefined list
 */
export function isPredefinedAmenity(amenity: string): boolean {
  if (!amenity) return false;
  return SORTED_AMENITIES.some(
    (a) => a.toLowerCase() === amenity.toLowerCase()
  );
}

