import { normalizeAmenities } from "@/lib/amenity-normalize";

const MAX = 3;

/**
 * Build 2–3 short bullets for listing cards from amenities, sizes, and type.
 */
export function buildPropertyListingHighlights(input: {
  amenities?: string[] | null;
  sizes?: string | null;
  propertyType?: string | null;
}): string[] {
  const out: string[] = [];
  const amenities = normalizeAmenities(input.amenities);
  for (const a of amenities) {
    if (out.length >= MAX) break;
    if (a?.trim()) out.push(a.trim());
  }
  if (out.length < MAX && input.sizes?.trim()) {
    out.push(input.sizes.trim());
  }
  if (out.length < MAX && input.propertyType?.trim()) {
    out.push(input.propertyType.trim());
  }
  return out.slice(0, MAX);
}
