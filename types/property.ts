// Property types for admin panel
import type { PropertyType, LocationCategory, ProjectStatus, Configuration } from "@/lib/property-enums";

export interface PropertyMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface PropertySEO {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export interface Property {
  id?: string;
  slug: string; // URL-friendly identifier (e.g., "forest-walk-villa")
  projectName: string;
  developer: string;
  location: string; // Denormalized text field
  locationCategory?: LocationCategory | null; // Deprecated - use locationId instead
  locationId?: string | null; // FK to locations_v2
  localityId?: string | null; // FK to localities
  propertyType?: PropertyType | null; // Type of property (enum)
  reraId?: string;
  projectStatus?: ProjectStatus | null; // Current project status (enum)
  possessionDate?: string;
  configuration: Configuration[] | null; // Array of unit configurations (enum array) - null for Commercial properties
  sizes: string; // e.g., "163 sq. yd - 238 sq. yd"
  description: string;
  heroImage: string; // URL to hero image
  brochureUrl?: string; // Cloudflare PDF URL
  images: string[]; // Array of image URLs (Cloudinary)
  videos?: Array<{
    title: string;
    src: string;
    thumbnail: string;
  }>;
  amenities?: string[]; // Optional amenities list
  price?: string; // Optional price range
  seo?: PropertySEO; // Optional SEO fields
  isPublished: boolean; // Whether the property is live
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyFormData extends Omit<Property, 'id' | 'createdAt' | 'updatedAt'> {
  // Form-specific fields
  heroImageFile?: File;
  brochureFile?: File;
  imageFiles?: File[];
  videoFiles?: File[];
}

