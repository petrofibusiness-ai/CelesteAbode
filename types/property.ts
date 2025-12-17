// Property types for admin panel

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
  location: string;
  reraId?: string;
  status: string; // e.g., "Under Construction", "Ready to Move"
  possessionDate?: string;
  unitTypes: string[]; // e.g., ["4 BHK + 5T Villas"]
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

