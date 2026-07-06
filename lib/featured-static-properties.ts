import { Property } from "@/types/property";

import { FUSION_VASUNDHARA_HERO_IMAGE } from "@/lib/fusion-vasundhara-assets";
import { ACE_PARKWAY_2_0_HERO_IMAGE } from "@/lib/ace-parkway-2-0-assets";
import { KARYAN_RESIDENCES_NH24_HERO_IMAGE } from "@/lib/karyan-residences-nh24-assets";

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
  isPublished: true,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
  locationSlug: "ghaziabad",
};

const KARYAN_RESIDENCES_NH24_FEATURED: Property & { locationSlug: string } = {
  id: "featured-karyan-residences-nh24",
  slug: "karyan-residences-nh24",
  projectName: "Karyan Residences NH-24",
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
  heroImageAlt: "Karyan Residences NH-24 Ghaziabad pre-launch project",
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
  priceUnit: "From Rs 5,900/sq ft*",
  seo: {
    title: "Karyan Residences NH-24 Ghaziabad - Pre-Launch 2 & 3 BHK",
    description:
      "Karyan Group pre-launch on NH-24, Ghaziabad with 2, 2+Study and 3 BHK Mivan-built homes.",
    keywords: "karyan residences nh24, karyan group ghaziabad, nh-24 pre launch, 2 bhk ghaziabad",
    canonical: "/properties-in-ghaziabad/karyan-residences-nh24",
  },
  isPublished: true,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
  locationSlug: "ghaziabad",
};

const ACE_PARKWAY_2_0_FEATURED: Property & { locationSlug: string } = {
  id: "featured-ace-parkway-2-0",
  slug: "ace-parkway-2-0",
  projectName: "Ace Parkway 2.0",
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
  heroImageAlt: "Ace Parkway 2.0 Sector 150 Noida pre-launch project",
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
    title: "Ace Parkway 2.0 Sector 150 Noida - Pre-Launch Ultra-Luxury 3/4/4.5 BHK",
    description:
      "ACE Group Ace Parkway 2.0 in Sector 150, Noida with ultra-luxury 3, 4 and 4.5 BHK homes.",
    keywords: "ace parkway 2.0, sector 150 noida, ace group pre launch, luxury apartments noida",
    canonical: "/properties-in-noida/ace-parkway-2-0",
  },
  isPublished: true,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
  locationSlug: "noida",
};

/** Static property pages with dedicated routes (not only in properties_v2). */
export const FEATURED_STATIC_PROPERTY_PAGES: (Property & { locationSlug: string })[] = [
  FUSION_VASUNDHARA_FEATURED,
  KARYAN_RESIDENCES_NH24_FEATURED,
  ACE_PARKWAY_2_0_FEATURED,
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

