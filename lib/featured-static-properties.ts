import { Property } from "@/types/property";

import { FUSION_VASUNDHARA_HERO_IMAGE } from "@/lib/fusion-vasundhara-assets";
import { ACE_PARKWAY_2_0_HERO_IMAGE, ACE_SECTOR_150_PROJECT_NAME, ACE_SECTOR_150_SLUG } from "@/lib/ace-parkway-2-0-assets";
import { KARYAN_NH24_PROJECT_NAME, KARYAN_NH24_SLUG, KARYAN_RESIDENCES_NH24_HERO_IMAGE } from "@/lib/karyan-residences-nh24-assets";
import {
  IRISH_ETA_1_HERO_IMAGE,
  IRISH_ETA_1_PROJECT_NAME,
  IRISH_ETA_1_SLUG,
} from "@/lib/irish-eta-1-assets";

const FUSION_VASUNDHARA_FEATURED: Property & { locationSlug: string } = {
  id: "featured-fusion-vasundhara",
  slug: "fusion-vasundhara",
  projectName: "Fusion Vasundhara",
  developer: "Fusion Group",
  location: "Sector 7, Vasundhara, Ghaziabad",
  locationCategory: null,
  locationId: null,
  localityId: null,
  propertyType: "Apartment/Flats",
  reraId: "Details awaited",
  projectStatus: "New Launch",
  possessionDate: "",
  configuration: ["3 BHK", "4 BHK"],
  sizes: "Approx 1850 - 2570 sq ft",
  description:
    "Pre-launch premium apartments in Vasundhara, Ghaziabad with 3, 3.5 and 4 BHK formats.",
  heroImage: FUSION_VASUNDHARA_HERO_IMAGE,
  heroImageAlt: "Fusion Vasundhara Ghaziabad pre-launch project",
  brochureUrl: "",
  images: [FUSION_VASUNDHARA_HERO_IMAGE],
  amenities: [
    "Luxury clubhouse",
    "Landscaped greens",
    "Sports and wellness zones",
    "Security systems",
  ],
  priceMin: null,
  priceMax: null,
  priceUnit: "From Rs 8,945/sq ft*",
  seo: {
    title: "Fusion Vasundhara Ghaziabad - Pre-Launch 3/3.5/4 BHK",
    description:
      "Fusion Vasundhara in Sector 7, Ghaziabad with premium 3, 3.5 and 4 BHK homes.",
    keywords: "fusion vasundhara, ghaziabad, pre launch apartments",
    canonical: "/properties-in-ghaziabad/fusion-vasundhara",
  },
  featured: true,
  isPublished: true,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
  locationSlug: "ghaziabad",
};

const KARYAN_RESIDENCES_NH24_FEATURED: Property & { locationSlug: string } = {
  id: "featured-karyan-residences-nh24",
  slug: KARYAN_NH24_SLUG,
  projectName: KARYAN_NH24_PROJECT_NAME,
  developer: "Karyan Group",
  location: "NH-24, Ghaziabad",
  locationCategory: null,
  locationId: null,
  localityId: null,
  propertyType: "Apartment/Flats",
  reraId: "Pre-launch, details awaited",
  projectStatus: "New Launch",
  possessionDate: "",
  configuration: ["2 BHK", "2 BHK + Study", "3 BHK"],
  sizes: "1000 - 1400 sq ft",
  description:
    "Pre-launch 2, 2+Study and 3 BHK apartments on NH-24, Ghaziabad by Karyan Group. Mivan construction, 8.5 acres, 10 towers.",
  heroImage: KARYAN_RESIDENCES_NH24_HERO_IMAGE,
  heroImageAlt: "Karyan NH-24 Ghaziabad pre-launch residential project",
  brochureUrl: "",
  images: [KARYAN_RESIDENCES_NH24_HERO_IMAGE],
  amenities: [
    "Grand luxury clubhouse",
    "Swimming pool",
    "Gymnasium",
    "Landscaped greens",
    "Sports and recreation",
    "24x7 security",
  ],
  priceMin: null,
  priceMax: null,
  priceUnit: "From Rs 6,400/sq ft*",
  seo: {
    title: "Karyan NH-24 Ghaziabad - Pre-Launch 2 & 3 BHK",
    description:
      "Karyan Group pre-launch on NH-24, Ghaziabad with 2, 2+Study and 3 BHK Mivan-built homes.",
    keywords: "karyan nh24 ghaziabad, karyan group ghaziabad, nh-24 pre launch, 2 bhk ghaziabad",
    canonical: `/properties-in-ghaziabad/${KARYAN_NH24_SLUG}`,
  },
  featured: false,
  isPublished: true,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
  locationSlug: "ghaziabad",
};

const ACE_PARKWAY_2_0_FEATURED: Property & { locationSlug: string } = {
  id: "featured-ace-parkway-2-0",
  slug: ACE_SECTOR_150_SLUG,
  projectName: ACE_SECTOR_150_PROJECT_NAME,
  developer: "ACE Group",
  location: "Sector 150, Noida",
  locationCategory: null,
  locationId: null,
  localityId: null,
  propertyType: "Apartment/Flats",
  reraId: "Registration in process",
  projectStatus: "New Launch",
  possessionDate: "",
  configuration: ["3 BHK", "4 BHK", "4.5 BHK"],
  sizes: "1900 - 4400 sq ft",
  description:
    "Pre-launch ultra-luxury 3, 4 and 4.5 BHK apartments in Sector 150, Noida by ACE Group. 15 acres, 11 towers, approx 790 units.",
  heroImage: ACE_PARKWAY_2_0_HERO_IMAGE,
  heroImageAlt: "Ace Sector 150 Noida pre-launch ultra-luxury project",
  brochureUrl: "",
  images: [ACE_PARKWAY_2_0_HERO_IMAGE],
  amenities: [
    "Grand clubhouse",
    "Expansive central green",
    "Swimming pool",
    "Gymnasium",
    "Sports and recreation",
    "24x7 security",
  ],
  priceMin: null,
  priceMax: null,
  priceUnit: "From Rs 16,995/sq ft*",
  seo: {
    title: "Ace Sector 150 Noida - Pre-Launch Ultra-Luxury 3/4/4.5 BHK",
    description:
      "ACE Group pre-launch in Sector 150, Noida with ultra-luxury 3, 4 and 4.5 BHK homes.",
    keywords: "ace sector 150 noida, ace group pre launch, sector 150 noida, luxury apartments noida",
    canonical: `/properties-in-noida/${ACE_SECTOR_150_SLUG}`,
  },
  featured: false,
  isPublished: true,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
  locationSlug: "noida",
};

const IRISH_ETA_1_FEATURED: Property & { locationSlug: string } = {
  id: "featured-irish-eta-1",
  slug: IRISH_ETA_1_SLUG,
  projectName: IRISH_ETA_1_PROJECT_NAME,
  developer: "Irish Group",
  location: "Sector ETA-1, Greater Noida",
  locationCategory: null,
  locationId: null,
  localityId: null,
  propertyType: "Apartment/Flats",
  reraId: "Pre-launch, details awaited",
  projectStatus: "New Launch",
  possessionDate: "",
  configuration: ["3 BHK", "3 BHK + Study", "4 BHK"],
  sizes: "1450 - 2450 sq ft",
  description:
    "Pre-launch 3 and 4 BHK apartments in Sector ETA-1, Greater Noida by Irish Group. 4 towers, 60,000 sq ft club.",
  heroImage: IRISH_ETA_1_HERO_IMAGE,
  heroImageAlt: "Irish ETA-1 Greater Noida pre-launch residential project",
  brochureUrl: "",
  images: [IRISH_ETA_1_HERO_IMAGE],
  amenities: [
    "60,000 sq ft clubhouse",
    "12 ft flat ceilings",
    "8 ft wide balconies",
    "Double-height AC lobby",
  ],
  priceMin: null,
  priceMax: null,
  priceUnit: "From Rs 8,500/sq ft*",
  seo: {
    title: "Irish ETA-1 Greater Noida - Pre-Launch 3 & 4 BHK",
    description:
      "Irish Group pre-launch in Sector ETA-1, Greater Noida. 1450–2450 sq ft. BSP from Rs 8,500/sq ft + GST.",
    keywords:
      "irish eta 1 greater noida, irish group pre launch, eta 1 apartments, 3 bhk greater noida pre launch",
    canonical: `/properties-in-greater-noida/${IRISH_ETA_1_SLUG}`,
  },
  featured: true,
  isPublished: true,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
  locationSlug: "greater-noida",
};

/** Static property pages with dedicated routes (not only in properties_v2). */
export const FEATURED_STATIC_PROPERTY_PAGES: (Property & { locationSlug: string })[] = [
  FUSION_VASUNDHARA_FEATURED,
  KARYAN_RESIDENCES_NH24_FEATURED,
  ACE_PARKWAY_2_0_FEATURED,
  IRISH_ETA_1_FEATURED,
];

export function getFeaturedStaticPropertiesForLocation(locationSlug: string): (Property & { locationSlug: string })[] {
  return FEATURED_STATIC_PROPERTY_PAGES.filter((p) => p.locationSlug === locationSlug);
}

export function getFeaturedStaticPropertySitemapPaths(): { url: string; lastModified: Date }[] {
  return FEATURED_STATIC_PROPERTY_PAGES.map((property) => ({
    url: `/properties-in-${property.locationSlug}/${property.slug}`,
    lastModified: new Date(property.updatedAt ?? property.createdAt ?? Date.now()),
  }));
}

/** Dedicated hardcoded property pages (not in properties_v3). */
export function getFeaturedStaticPropertyPageCount(): number {
  return FEATURED_STATIC_PROPERTY_PAGES.length;
}

export function getPublishedFeaturedStaticPropertyPageCount(): number {
  return FEATURED_STATIC_PROPERTY_PAGES.filter((p) => p.isPublished).length;
}

/** Slugs on the dedicated pre-launch catalog (not general new-launch DB listings). */
export const PRE_LAUNCH_PROPERTY_SLUGS = [
  "fusion-vasundhara",
  KARYAN_NH24_SLUG,
  ACE_SECTOR_150_SLUG,
  IRISH_ETA_1_SLUG,
] as const;

export function isPreLaunchPropertySlug(slug: string): boolean {
  return (PRE_LAUNCH_PROPERTY_SLUGS as readonly string[]).includes(slug);
}

export function getPublishedPreLaunchStaticProperties(): (Property & { locationSlug: string })[] {
  return FEATURED_STATIC_PROPERTY_PAGES.filter(
    (property) => property.isPublished && isPreLaunchPropertySlug(property.slug)
  );
}

export function getPreLaunchStaticSlugs(): Set<string> {
  return new Set(PRE_LAUNCH_PROPERTY_SLUGS);
}

