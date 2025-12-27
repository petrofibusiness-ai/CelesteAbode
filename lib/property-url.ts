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

  // Debug: Always log in development to help diagnose issues
  console.log(`[getPropertyUrl] Property ${slug}:`, {
    locationCategory,
    rawValue: property.locationCategory,
    type: typeof locationCategory,
    isNull: locationCategory === null,
    isUndefined: locationCategory === undefined,
    testSlug: locationCategoryToSlug(locationCategory as any)
  });

  // Convert location category to slug
  // Handle case where locationCategory might be in different formats
  const categoryValue = locationCategory || null;
  const locationCategorySlug = locationCategoryToSlug(categoryValue as any);
  
  // If no location category slug, use "unknown" (will 404 in new route)
  // This should not happen if locationCategory is required, but handle gracefully
  if (!locationCategorySlug) {
    console.error(`[getPropertyUrl] Property ${slug} has no valid locationCategory.`, {
      locationCategory,
      categoryValue,
      slugResult: locationCategoryToSlug(categoryValue as any),
      propertyKeys: Object.keys(property)
    });
    return `/properties-in-unknown/${slug}`;
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

