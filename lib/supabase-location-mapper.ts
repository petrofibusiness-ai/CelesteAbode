import { Location } from "@/types/location";

// Supabase uses snake_case, TypeScript uses camelCase - matches locations_v2 table
export interface SupabaseLocation {
  id: string;
  slug: string;
  location_name: string;
  hero_image: string;
  hero_text: string;
  hero_subtext: string;
  explore_section_heading?: string;
  explore_section_description?: string;
  // Note: localities field removed - now in separate localities table
  why_invest_content: string[];
  celeste_abode_image?: string;
  faqs: Array<{ id: string; question: string; answer: string }>;
  footer_cta_heading?: string;
  footer_cta_description?: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  og_image?: string;
  og_title?: string;
  og_description?: string;
  image_alt_texts?: {
    hero?: string;
    celeste_abode?: string;
    og?: string;
  };
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export function supabaseToLocation(supabaseLocation: SupabaseLocation): Location {
  return {
    id: supabaseLocation.id,
    slug: supabaseLocation.slug,
    locationName: supabaseLocation.location_name,
    heroImage: supabaseLocation.hero_image,
    heroText: supabaseLocation.hero_text,
    heroSubtext: supabaseLocation.hero_subtext,
    exploreSectionHeading: supabaseLocation.explore_section_heading,
    exploreSectionDescription: supabaseLocation.explore_section_description,
    localities: [], // Deprecated - localities now in separate table, fetch separately if needed
    whyInvestContent: supabaseLocation.why_invest_content || [],
    celesteAbodeImage: supabaseLocation.celeste_abode_image,
    faqs: supabaseLocation.faqs || [],
    footerCtaHeading: supabaseLocation.footer_cta_heading,
    footerCtaDescription: supabaseLocation.footer_cta_description,
    metaTitle: supabaseLocation.meta_title,
    metaDescription: supabaseLocation.meta_description,
    metaKeywords: supabaseLocation.meta_keywords || [],
    ogImage: supabaseLocation.og_image,
    ogTitle: supabaseLocation.og_title,
    ogDescription: supabaseLocation.og_description,
    imageAltTexts: supabaseLocation.image_alt_texts,
    isPublished: supabaseLocation.is_published,
    createdAt: supabaseLocation.created_at,
    updatedAt: supabaseLocation.updated_at,
  };
}

export function locationToSupabase(location: Partial<Location>): Partial<SupabaseLocation> {
  const result: Partial<SupabaseLocation> = {};

  if (location.slug !== undefined) result.slug = location.slug;
  if (location.locationName !== undefined) result.location_name = location.locationName;
  if (location.heroImage !== undefined) result.hero_image = location.heroImage;
  if (location.heroText !== undefined) result.hero_text = location.heroText;
  if (location.heroSubtext !== undefined) result.hero_subtext = location.heroSubtext;
  if (location.exploreSectionHeading !== undefined) result.explore_section_heading = location.exploreSectionHeading;
  if (location.exploreSectionDescription !== undefined) result.explore_section_description = location.exploreSectionDescription;
  // Note: localities field removed - now in separate localities table
  if (location.whyInvestContent !== undefined) result.why_invest_content = location.whyInvestContent;
  if (location.celesteAbodeImage !== undefined) result.celeste_abode_image = location.celesteAbodeImage;
  if (location.faqs !== undefined) result.faqs = location.faqs;
  if (location.footerCtaHeading !== undefined) result.footer_cta_heading = location.footerCtaHeading;
  if (location.footerCtaDescription !== undefined) result.footer_cta_description = location.footerCtaDescription;
  if (location.metaTitle !== undefined) result.meta_title = location.metaTitle;
  if (location.metaDescription !== undefined) result.meta_description = location.metaDescription;
  if (location.metaKeywords !== undefined) result.meta_keywords = location.metaKeywords;
  if (location.ogImage !== undefined) result.og_image = location.ogImage;
  if (location.ogTitle !== undefined) result.og_title = location.ogTitle;
  if (location.ogDescription !== undefined) result.og_description = location.ogDescription;
  if (location.imageAltTexts !== undefined) result.image_alt_texts = location.imageAltTexts;
  if (location.isPublished !== undefined) result.is_published = location.isPublished;

  return result;
}

