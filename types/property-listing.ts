/**
 * Lightweight DTO for public property listing cards (no full Property payload).
 */
export interface PropertyListingItem {
  id: string;
  slug: string;
  projectName: string;
  /** Denormalized display line (city / area text from properties_v2.location) */
  locationLabel: string;
  locationId: string | null;
  localityId: string | null;
  propertyType: string | null;
  heroImage: string;
  heroImageAlt?: string;
  priceMin?: number | null;
  priceMax?: number | null;
  priceUnit?: string | null;
  /** Full sizes line from properties_v2.sizes */
  sizes: string;
  /** Normalized amenity labels for display (full list, not card-truncated). */
  amenities: string[];
  highlights: string[];
  locationSlug: string;
}

export interface PropertyListingLocationOption {
  id: string;
  slug: string;
  name: string;
}

export interface PropertyListingLocalityOption {
  id: string;
  slug: string;
  name: string;
}
