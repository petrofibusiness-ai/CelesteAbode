// Utility to map between TypeScript camelCase and Supabase snake_case
import { Property } from "@/types/property";
import { normalizeAmenities } from "@/lib/amenity-normalize";
import type { PropertyType, LocationCategory, ProjectStatus, Configuration } from "@/lib/property-enums";

// Supabase database schema (snake_case) - matches properties_v2 table
export interface SupabaseProperty {
  id?: string;
  slug: string;
  project_name: string;
  developer: string;
  location: string;
  location_id?: string | null; // FK to locations_v2
  locality_id?: string | null; // FK to localities
  property_type?: PropertyType | null;
  rera_id?: string | null;
  project_status?: ProjectStatus | null;
  possession_date?: string | null;
  configuration?: Configuration[] | null; // Enum array
  sizes: string;
  description: string;
  hero_image: string;
  brochure_url?: string | null;
  images: string[];
  videos?: Array<{
    title: string;
    src: string;
    thumbnail: string;
  }> | null;
  amenities?: string[] | null;
  price?: string | null;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    canonical?: string;
  } | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Convert Supabase property (snake_case) to TypeScript Property (camelCase)
 * Note: locationCategory is kept for backward compatibility but is deprecated.
 * Use locationId and derive locationCategory from locations_v2 if needed.
 */
export function supabaseToProperty(supabaseProp: SupabaseProperty): Property {
  return {
    id: supabaseProp.id,
    slug: supabaseProp.slug,
    projectName: supabaseProp.project_name,
    developer: supabaseProp.developer,
    location: supabaseProp.location,
    locationCategory: undefined, // Deprecated - use locationId instead
    locationId: supabaseProp.location_id || undefined,
    localityId: supabaseProp.locality_id || undefined,
    propertyType: supabaseProp.property_type || undefined,
    reraId: supabaseProp.rera_id || undefined,
    projectStatus: supabaseProp.project_status || undefined,
    possessionDate: supabaseProp.possession_date || undefined,
    configuration: supabaseProp.configuration || (supabaseProp.property_type === 'Commercial' ? undefined : []),
    sizes: supabaseProp.sizes,
    description: supabaseProp.description,
    heroImage: supabaseProp.hero_image,
    brochureUrl: supabaseProp.brochure_url || undefined,
    images: supabaseProp.images || [],
    videos: supabaseProp.videos || undefined,
    amenities: normalizeAmenities(supabaseProp.amenities),
    price: supabaseProp.price || undefined,
    seo: supabaseProp.seo || undefined,
    isPublished: supabaseProp.is_published,
    createdAt: supabaseProp.created_at,
    updatedAt: supabaseProp.updated_at,
  };
}

/**
 * Convert TypeScript Property (camelCase) to Supabase property (snake_case)
 * Note: locationCategory is ignored - use locationId instead
 */
export function propertyToSupabase(property: Omit<Property, "id" | "createdAt" | "updatedAt">): Omit<SupabaseProperty, "id" | "created_at" | "updated_at"> {
  return {
    slug: property.slug,
    project_name: property.projectName,
    developer: property.developer,
    location: property.location,
    location_id: (property as any).locationId || null,
    locality_id: (property as any).localityId || null,
    property_type: property.propertyType || null,
    rera_id: property.reraId || null,
    project_status: property.projectStatus || null,
    possession_date: property.possessionDate || null,
    configuration: property.propertyType === 'Commercial' ? null : (property.configuration && property.configuration.length > 0 ? property.configuration : null),
    sizes: property.sizes,
    description: property.description,
    hero_image: property.heroImage,
    brochure_url: property.brochureUrl || null,
    images: property.images || [],
    videos: property.videos || null,
    amenities: (() => {
      const normalized = normalizeAmenities(property.amenities);
      return normalized.length > 0 ? normalized : null;
    })(),
    price: property.price || null,
    seo: property.seo || null,
    is_published: property.isPublished || false,
  };
}

