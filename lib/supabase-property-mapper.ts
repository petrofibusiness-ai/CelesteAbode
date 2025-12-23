// Utility to map between TypeScript camelCase and Supabase snake_case
import { Property } from "@/types/property";
import { normalizeAmenities } from "@/lib/amenity-normalize";

// Supabase database schema (snake_case)
export interface SupabaseProperty {
  id?: string;
  slug: string;
  project_name: string;
  developer: string;
  location: string;
  rera_id?: string | null;
  status: string;
  possession_date?: string | null;
  unit_types: string[];
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
 */
export function supabaseToProperty(supabaseProp: SupabaseProperty): Property {
  return {
    id: supabaseProp.id,
    slug: supabaseProp.slug,
    projectName: supabaseProp.project_name,
    developer: supabaseProp.developer,
    location: supabaseProp.location,
    reraId: supabaseProp.rera_id || undefined,
    status: supabaseProp.status,
    possessionDate: supabaseProp.possession_date || undefined,
    unitTypes: supabaseProp.unit_types || [],
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
 */
export function propertyToSupabase(property: Omit<Property, "id" | "createdAt" | "updatedAt">): Omit<SupabaseProperty, "id" | "created_at" | "updated_at"> {
  return {
    slug: property.slug,
    project_name: property.projectName,
    developer: property.developer,
    location: property.location,
    rera_id: property.reraId || null,
    status: property.status,
    possession_date: property.possessionDate || null,
    unit_types: property.unitTypes || [],
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

