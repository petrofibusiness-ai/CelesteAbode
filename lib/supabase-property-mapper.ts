// Utility to map between TypeScript camelCase and Supabase snake_case
import type {
  Property,
  PropertyFloorPlanSlide,
  PropertyLocationAdvantageRow,
} from "@/types/property";
import { normalizeAmenities } from "@/lib/amenity-normalize";
import { normalizeMapLinkFromInput } from "@/lib/map-link-normalize";
import type { PropertyType, LocationCategory, ProjectStatus, Configuration } from "@/lib/property-enums";

// Supabase database schema (snake_case) - legacy `properties_v2` shape (admin migration helpers only)
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
  hero_image_alt?: string | null;
  brochure_url?: string | null;
  images: string[];
  videos?: Array<{
    title: string;
    src: string;
    thumbnail: string;
  }> | null;
  amenities?: string[] | null;
  price_min?: string | number | null; // bigint in DB may be returned as number or string
  price_max?: string | number | null;
  price_unit?: string | null;
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
    configuration: supabaseProp.property_type === 'Commercial' ? null : (supabaseProp.configuration || []),
    sizes: supabaseProp.sizes ?? "",
    description: supabaseProp.description,
    heroImage: supabaseProp.hero_image,
  heroImageAlt: supabaseProp.hero_image_alt || undefined,
    brochureUrl: supabaseProp.brochure_url || undefined,
    images: supabaseProp.images || [],
    videos: supabaseProp.videos || undefined,
    amenities: normalizeAmenities(supabaseProp.amenities),
    priceMin: supabaseProp.price_min != null ? Number(supabaseProp.price_min) : undefined,
    priceMax: supabaseProp.price_max != null ? Number(supabaseProp.price_max) : undefined,
    priceUnit: supabaseProp.price_unit ?? undefined,
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
    sizes: property.sizes ?? "",
    description: property.description,
    hero_image: property.heroImage,
  hero_image_alt: property.heroImageAlt || null,
    brochure_url: property.brochureUrl || null,
    images: property.images || [],
    videos: property.videos || null,
    amenities: (() => {
      const normalized = normalizeAmenities(property.amenities);
      return normalized.length > 0 ? normalized : null;
    })(),
    // bigint columns: number | null only (no empty string)
    price_min: property.priceMin != null && Number.isFinite(property.priceMin) ? property.priceMin : null,
    price_max: property.priceMax != null && Number.isFinite(property.priceMax) ? property.priceMax : null,
    price_unit: (() => {
      const v = property.priceUnit;
      if (v == null || String(v).trim() === "") return null;
      return String(v).trim();
    })(),
    seo: property.seo || null,
    is_published: property.isPublished || false,
  };
}

// --- properties_v3 ---

export interface SupabasePropertyV3 {
  id?: string;
  slug: string;
  project_name: string;
  developer: string;
  locality_id?: string | null;
  location_id?: string | null;
  location: string | null;
  rera_id?: string | null;
  possession_date?: string | null;
  description: string;
  hero_image: string;
  hero_image_alt?: string | null;
  brochure_url?: string | null;
  images: unknown;
  videos?: unknown;
  amenities?: unknown;
  project_snapshot?: unknown;
  why_block?: unknown;
  floor_plans?: unknown;
  location_advantage?: unknown;
  map_link?: string | null;
  seo?: SupabaseProperty["seo"];
  property_type?: PropertyType | null;
  project_status?: ProjectStatus | null;
  is_published: boolean;
  price_min?: string | number | null;
  price_max?: string | number | null;
  price_unit?: string | null;
  inventory_towers?: string;
  created_at?: string;
  updated_at?: string;
}

function parseV3Images(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const item of raw) {
    if (typeof item === "string") {
      const t = item.trim();
      if (t) out.push(t);
      continue;
    }
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const url = o.url ?? o.src ?? o.image;
      if (typeof url === "string" && url.trim()) out.push(url.trim());
    }
  }
  return out;
}

function parseV3Videos(
  raw: unknown
): Array<{ title: string; src: string; thumbnail: string }> | undefined {
  if (!Array.isArray(raw) || raw.length === 0) return undefined;
  const out: Array<{ title: string; src: string; thumbnail: string }> = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const src = typeof o.src === "string" ? o.src : typeof o.url === "string" ? o.url : "";
    if (!src.trim()) continue;
    const title = typeof o.title === "string" ? o.title : "";
    const thumbnail = typeof o.thumbnail === "string" ? o.thumbnail : "";
    out.push({ title, src: src.trim(), thumbnail });
  }
  return out.length ? out : undefined;
}

function parseProjectSnapshot(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const lines: string[] = [];
  for (const item of raw) {
    if (typeof item === "string") {
      const t = item.trim();
      if (t) lines.push(t);
    } else if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const text =
        typeof o.text === "string"
          ? o.text
          : typeof o.label === "string"
            ? o.label
            : typeof o.title === "string"
              ? o.title
              : "";
      const t = text.trim();
      if (t) lines.push(t);
    }
  }
  return lines;
}

function parseWhyBlock(raw: unknown): { title?: string; points: string[] } {
  if (!raw || typeof raw !== "object") return { points: [] };
  const o = raw as Record<string, unknown>;
  const title = typeof o.title === "string" ? o.title.trim() : undefined;
  const rawPoints = o.points ?? o.point;
  const points: string[] = [];
  if (Array.isArray(rawPoints)) {
    for (const p of rawPoints) {
      if (typeof p === "string" && p.trim()) points.push(p.trim());
    }
  }
  return { title: title || undefined, points };
}

function parseFloorPlans(raw: unknown): PropertyFloorPlanSlide[] {
  if (!Array.isArray(raw)) return [];
  const out: PropertyFloorPlanSlide[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const src =
      typeof o.src === "string"
        ? o.src
        : typeof o.url === "string"
          ? o.url
          : typeof o.image === "string"
            ? o.image
            : "";
    if (!src.trim()) continue;
    out.push({
      src: src.trim(),
      alt: typeof o.alt === "string" ? o.alt : undefined,
      label: typeof o.label === "string" ? o.label : typeof o.title === "string" ? o.title : undefined,
      width: typeof o.width === "number" ? o.width : undefined,
      height: typeof o.height === "number" ? o.height : undefined,
    });
  }
  return out;
}

function parseV3AmenitiesRaw(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const strings: string[] = [];
  for (const item of raw) {
    if (typeof item === "string" && item.trim()) {
      strings.push(item.trim());
      continue;
    }
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      const s = o.name ?? o.label ?? o.title;
      if (typeof s === "string" && s.trim()) strings.push(s.trim());
    }
  }
  return strings;
}

function parseLocationAdvantage(raw: unknown): PropertyLocationAdvantageRow[] {
  if (!Array.isArray(raw)) return [];
  const out: PropertyLocationAdvantageRow[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const label = String(o.label ?? o.title ?? o.heading ?? "").trim();
    const text = String(o.text ?? o.description ?? o.body ?? "").trim();
    if (label && text) out.push({ label, text });
  }
  return out;
}

/**
 * Map a `properties_v3` row to the shared `Property` shape used by public pages.
 */
export function supabaseV3ToProperty(row: SupabasePropertyV3): Property {
  const images = parseV3Images(row.images);
  const loc = row.location?.trim() ? row.location.trim() : "";
  return {
    id: row.id,
    slug: row.slug ?? "",
    projectName: row.project_name ?? "",
    developer: row.developer ?? "",
    location: loc,
    locationId: row.location_id || undefined,
    localityId: row.locality_id || undefined,
    propertyType: row.property_type || undefined,
    reraId: row.rera_id?.trim() || undefined,
    projectStatus: row.project_status || undefined,
    possessionDate: row.possession_date || undefined,
    configuration: null,
    sizes: "",
    description: typeof row.description === "string" ? row.description : "",
    heroImage: typeof row.hero_image === "string" ? row.hero_image : "",
    heroImageAlt: row.hero_image_alt || undefined,
    brochureUrl: row.brochure_url || undefined,
    images,
    videos: parseV3Videos(row.videos),
    amenities: normalizeAmenities(parseV3AmenitiesRaw(row.amenities)),
    projectSnapshot: parseProjectSnapshot(row.project_snapshot),
    whyBlock: parseWhyBlock(row.why_block),
    floorPlans: parseFloorPlans(row.floor_plans),
    locationAdvantage: parseLocationAdvantage(row.location_advantage),
    mapLink: normalizeMapLinkFromInput(row.map_link) ?? null,
    priceMin: row.price_min != null ? Number(row.price_min) : undefined,
    priceMax: row.price_max != null ? Number(row.price_max) : undefined,
    priceUnit: row.price_unit ?? undefined,
    seo: row.seo || undefined,
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Map admin `Property` payload to `properties_v3` row (insert/update).
 */
export function propertyToSupabaseV3(
  property: Omit<Property, "id" | "createdAt" | "updatedAt">
): Omit<SupabasePropertyV3, "id" | "created_at" | "updated_at"> {
  const amenitiesNorm = normalizeAmenities(property.amenities);
  const snapshot = (property.projectSnapshot || [])
    .map((s) => String(s).trim())
    .filter((s) => s.length > 0);
  const why = property.whyBlock;
  const points = (why?.points || []).map((p) => String(p).trim()).filter((p) => p.length > 0);
  const why_block: Record<string, unknown> = {};
  if (why?.title?.trim()) why_block.title = why.title.trim();
  if (points.length > 0) why_block.points = points;

  const floor_plans = (property.floorPlans || [])
    .filter((fp) => fp.src && String(fp.src).trim())
    .map((fp) => {
      const row: Record<string, unknown> = { src: fp.src.trim() };
      if (fp.label?.trim()) row.label = fp.label.trim();
      if (fp.alt?.trim()) row.alt = fp.alt.trim();
      if (fp.width != null && Number.isFinite(fp.width)) row.width = fp.width;
      if (fp.height != null && Number.isFinite(fp.height)) row.height = fp.height;
      return row;
    });

  const location_advantage = (property.locationAdvantage || [])
    .filter((r) => r.label?.trim() && r.text?.trim())
    .map((r) => ({ label: r.label.trim(), text: r.text.trim() }));

  const videos =
    property.videos && property.videos.length > 0
      ? property.videos
          .filter((v) => v.src?.trim())
          .map((v) => ({
            title: v.title?.trim() || "",
            src: v.src.trim(),
            thumbnail: v.thumbnail?.trim() || "",
          }))
      : [];

  return {
    slug: property.slug.trim().toLowerCase(),
    project_name: property.projectName.trim(),
    developer: property.developer.trim(),
    location: property.location?.trim() ? property.location.trim() : null,
    location_id: property.locationId ?? null,
    locality_id: property.localityId ?? null,
    rera_id: property.reraId?.trim() || null,
    possession_date: property.possessionDate?.trim() || null,
    description: property.description.trim(),
    hero_image: property.heroImage.trim(),
    hero_image_alt: property.heroImageAlt?.trim() || null,
    brochure_url: property.brochureUrl?.trim() || null,
    images: property.images || [],
    videos,
    amenities: amenitiesNorm.length > 0 ? amenitiesNorm : [],
    project_snapshot: snapshot,
    why_block,
    floor_plans,
    location_advantage,
    map_link:
      property.mapLink != null && String(property.mapLink).trim() !== ""
        ? normalizeMapLinkFromInput(property.mapLink) ?? null
        : null,
    seo: property.seo && Object.keys(property.seo).length > 0 ? property.seo : {},
    property_type: property.propertyType ?? null,
    project_status: property.projectStatus ?? null,
    is_published: Boolean(property.isPublished),
    price_min:
      property.priceMin != null && Number.isFinite(Number(property.priceMin))
        ? Number(property.priceMin)
        : null,
    price_max:
      property.priceMax != null && Number.isFinite(Number(property.priceMax))
        ? Number(property.priceMax)
        : null,
    price_unit:
      property.priceUnit != null && String(property.priceUnit).trim() !== ""
        ? String(property.priceUnit).trim()
        : null,
    inventory_towers: "",
  };
}

