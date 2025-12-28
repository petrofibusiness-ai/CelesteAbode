// Utility to generate property URLs with the new location-based structure
import { Property } from "@/types/property";
import { locationCategoryToSlug } from "@/lib/location-slug";

/**
 * Generate the property URL using the new location-based structure
 * Format: /properties-in-{location-slug}/{property-slug}
 * 
 * @param property - Property object with slug and either locationSlug or locationCategory
 * @returns The full URL path for the property
 */
export function getPropertyUrl(property: { 
  slug: string; 
  locationSlug?: string | null;
  locationCategory?: string | null;
}): string {
  const { slug, locationSlug, locationCategory } = property;
  
  if (!slug) {
    return "/properties";
  }

  // Prefer locationSlug (from database) over locationCategory (deprecated)
  let finalLocationSlug: string | null = null;
  
  if (locationSlug) {
    // Use location slug directly from database (preferred)
    finalLocationSlug = locationSlug;
  } else if (locationCategory) {
    // Fallback to converting locationCategory to slug (for backward compatibility)
    finalLocationSlug = locationCategoryToSlug(locationCategory);
  }
  
  // If no location slug, property cannot have a canonical URL
  if (!finalLocationSlug) {
    // Return a path that will 404 - this ensures invalid properties don't get wrong URLs
    return `/properties-in-invalid/${slug}`;
  }
  
  return `/properties-in-${finalLocationSlug}/${slug}`;
}

/**
 * Generate the full absolute URL for a property
 * 
 * @param property - Property object with slug and either locationSlug or locationCategory
 * @returns The full absolute URL
 */
export function getPropertyAbsoluteUrl(property: { 
  slug: string; 
  locationSlug?: string | null;
  locationCategory?: string | null;
}): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (typeof window !== 'undefined' ? window.location.origin : "https://www.celesteabode.com");
  
  return `${siteUrl}${getPropertyUrl(property)}`;
}

