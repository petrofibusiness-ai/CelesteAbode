// Cache revalidation utilities for on-demand cache invalidation
// Ensures fresh data after admin mutations

import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Revalidate all property-related caches (for bulk operations)
 */
export async function revalidateAllPropertyCaches() {
  try {
    // Revalidate all property pages
    revalidatePath('/properties', 'layout');
    revalidatePath('/properties-in-greater-noida', 'layout');
    revalidatePath('/properties-in-ghaziabad', 'layout');
    revalidatePath('/properties-in-yamuna-expressway', 'layout');
    revalidatePath('/properties-in-noida', 'layout');
    
    // Revalidate all property tags
    revalidateTag('properties');
    
    console.log('[CACHE_REVALIDATION] Revalidated all property caches');
  } catch (error) {
    console.error('[CACHE_REVALIDATION] Error revalidating all caches:', error);
  }
}

/**
 * Revalidate property-related caches after mutations
 */
export async function revalidatePropertyCaches(propertySlug: string, locationSlug?: string) {
  try {
    // Revalidate the specific property page
    const propertyPath = locationSlug 
      ? `/properties-in-${locationSlug}/${propertySlug}`
      : `/properties/${propertySlug}`;
    
    revalidatePath(propertyPath);
    
    // Revalidate property listing pages
    revalidatePath('/properties');
    revalidatePath('/properties-in-greater-noida');
    revalidatePath('/properties-in-ghaziabad');
    revalidatePath('/properties-in-yamuna-expressway');
    revalidatePath('/properties-in-noida');
    
    // Revalidate API routes using tags
    revalidateTag('properties');
    revalidateTag(`property-${propertySlug}`);
    
    if (locationSlug) {
      revalidateTag(`location-${locationSlug}`);
      revalidatePath(`/properties-in-${locationSlug}`);
    }
    
    console.log(`[CACHE_REVALIDATION] Revalidated caches for property: ${propertySlug}`);
  } catch (error) {
    console.error('[CACHE_REVALIDATION] Error revalidating caches:', error);
    // Don't throw - cache revalidation failure shouldn't break the mutation
  }
}

/**
 * Revalidate property API routes
 */
export async function revalidatePropertyAPIs() {
  try {
    revalidateTag('api-properties');
    revalidateTag('api-properties-search');
    revalidateTag('api-properties-all');
    
    console.log('[CACHE_REVALIDATION] Revalidated property API caches');
  } catch (error) {
    console.error('[CACHE_REVALIDATION] Error revalidating API caches:', error);
  }
}

