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

/** Location advantage row (properties_v3.location_advantage JSON). */
export interface PropertyLocationAdvantageRow {
  label: string;
  text: string;
}

export interface Property {
  id?: string;
  slug: string; // URL-friendly identifier (e.g., "forest-walk-villa")
  projectName: string;
  developer: string;
  location: string; // Denormalized text field
  /** Resolved `locations_v2.slug` for public URLs (`/properties-in-{slug}/...`). */
  locationSlug?: string;
  locationCategory?: LocationCategory | null; // Deprecated - use locationId instead
  locationId?: string | null; // FK to locations_v2
  localityId?: string | null; // FK to localities
  propertyType?: PropertyType | null; // Type of property (enum)
  reraId?: string;
  projectStatus?: ProjectStatus | null; // Current project status (enum)
  possessionDate?: string;
  /** Legacy `properties_v2` only; optional for v3 (configurations come from inventory dashboard). */
  configuration?: Configuration[] | null;
  /** Legacy `properties_v2`; optional for v3. */
  sizes?: string;
  description: string;
  heroImage: string; // URL to hero image
  heroImageAlt?: string; // Optional alt text for hero image
  brochureUrl?: string; // Cloudflare PDF URL
  images: string[]; // Array of image URLs (Cloudinary)
  videos?: Array<{
    title: string;
    src: string;
    thumbnail: string;
  }>;
  amenities?: string[]; // Optional amenities list
  /** properties_v3.project_snapshot — highlight bullets */
  projectSnapshot?: string[];
  /** properties_v3.why_block — section title + bullet points */
  whyBlock?: { title?: string; points: string[] };
  /** properties_v3.floor_plans — public R2 URL of floor plan PDF */
  floorPlanUrl?: string | null;
  /** properties_v3.location_advantage */
  locationAdvantage?: PropertyLocationAdvantageRow[];
  /** properties_v3.map_link — maps embed URL for iframe src (saved normalized from URL or pasted iframe HTML) */
  mapLink?: string | null;
  priceMin?: number | null; // Min price (bigint)
  priceMax?: number | null; // Max price (bigint)
  priceUnit?: string | null; // Display price (text)
  seo?: PropertySEO; // Optional SEO fields
  featured: boolean; // Whether the property should be prioritized in listings
  isPublished: boolean; // Whether the property is live
  createdAt?: string;
  updatedAt?: string;
  /**
   * Set only on GET /api/admin/properties for messaging: inventory lines from
   * `property_inventory_dashboard_rows` (same source as `property_listing_configurations`).
   */
  messagingInventoryLines?: Array<{
    configuration: string;
    sizeSqft: string;
    priceCr: string;
  }>;
}

export interface PropertyFormData extends Omit<Property, 'id' | 'createdAt' | 'updatedAt'> {
  // Form-specific fields
  heroImageFile?: File;
  brochureFile?: File;
  imageFiles?: File[];
  videoFiles?: File[];
}

