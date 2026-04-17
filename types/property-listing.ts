/**
 * One ops line = project (from properties_v2) + configuration + size + price (Cr).
 * `configuration` lives only in `property_listing_configurations` (what you quote on calls).
 */
export interface PropertyInventoryRow {
  /** Set by GET /api/property-listings: serial for this project on the current page (global across all pages). */
  propertySerial?: number;
  /** line id (`property_listing_configurations.id`); omitted when the project has no config rows yet */
  id?: string;
  propertyId: string;
  slug: string;
  projectName: string;
  locationLabel: string;
  locationId: string | null;
  localityId: string | null;
  heroImage: string;
  heroImageAlt?: string;
  /** Ops dashboard: tower count (digits only in UI). From `properties_v2.inventory_towers`. */
  inventoryTowers?: string;
  /** Ops dashboard: free-text possession line. From `properties_v2.possession_date`. */
  possessionDate?: string;
  /** e.g. 2 BHK, 3 BHK + Study — ops text */
  configuration: string;
  sizeSqft: string;
  priceCr: string;
  sortOrder: number;
  locationSlug: string;
}

/**
 * Lightweight DTO for public property listing cards (no full Property payload).
 * @deprecated Inventory UI uses {@link PropertyInventoryRow}; kept for legacy format helpers.
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
