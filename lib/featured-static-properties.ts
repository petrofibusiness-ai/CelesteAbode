import { Property } from "@/types/property";

import { FUSION_VASUNDHARA_HERO_IMAGE } from "@/lib/fusion-vasundhara-assets";

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

export function getFeaturedStaticPropertiesForLocation(locationSlug: string): (Property & { locationSlug: string })[] {
  if (locationSlug === "ghaziabad") {
    return [FUSION_VASUNDHARA_FEATURED];
  }
  return [];
}

