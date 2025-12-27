// Utility to generate property URLs with the new location-based structure
import { Property } from "@/types/property";
import { locationCategoryToSlug } from "@/lib/location-slug";

/**
 * Generate the property URL using the new location-based structure
 * Format: /properties-in-{location-category}/{property-slug}
 * 
 * @param property - Property object with slug and locationCategory
 * @returns The full URL path for the property
 */
export function getPropertyUrl(property: { slug: string; locationCategory?: string | null }): string {
  const { slug, locationCategory } = property;
  
  if (!slug) {
    return "/properties";
  }

  // Convert location category to slug
  const locationCategorySlug = locationCategoryToSlug(locationCategory);
  
  // If no location category slug, property cannot have a canonical URL
  // This should not happen if locationCategory is required, but handle gracefully
  if (!locationCategorySlug) {
    // Return a path that will 404 - this ensures invalid properties don't get wrong URLs
    return `/properties-in-invalid/${slug}`;
  }
  
  return `/properties-in-${locationCategorySlug}/${slug}`;
}

/**
 * Generate the full absolute URL for a property
 * 
 * @param property - Property object with slug and locationCategory
 * @returns The full absolute URL
 */
export function getPropertyAbsoluteUrl(property: { slug: string; locationCategory?: string | null }): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (typeof window !== 'undefined' ? window.location.origin : "https://www.celesteabode.com");
  
  return `${siteUrl}${getPropertyUrl(property)}`;
}

