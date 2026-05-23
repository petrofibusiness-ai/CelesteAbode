import type { Metadata } from "next";
import { FUSION_VASUNDHARA_HERO_IMAGE } from "@/lib/fusion-vasundhara-assets";
import { FusionVasundharaPage } from "@/components/fusion-vasundhara/fusion-vasundhara-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

export const metadata: Metadata = {
  title: "Fusion Vasundhara Ghaziabad - Pre-Launch 3/3.5/4 BHK | Celeste Abode",
  description:
    "Fusion Vasundhara in Sector 7, Vasundhara Ghaziabad - pre-launch premium apartments with 3, 3.5 and 4 BHK formats. Get brochure support, pricing guidance, and location insights from Celeste Abode.",
  alternates: { canonical: `${site}/properties-in-ghaziabad/fusion-vasundhara` },
  openGraph: {
    title: "Fusion Vasundhara Ghaziabad - Pre-Launch Apartments",
    description:
      "Explore Fusion Vasundhara project snapshot, amenities, location advantage, and consultancy-led guidance for serious buyers in Ghaziabad.",
    url: `${site}/properties-in-ghaziabad/fusion-vasundhara`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: FUSION_VASUNDHARA_HERO_IMAGE,
        width: 1920,
        height: 1080,
        alt: "Fusion Vasundhara, Sector 7 Vasundhara Ghaziabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [FUSION_VASUNDHARA_HERO_IMAGE],
  },
};

export default function FusionVasundharaPropertyPage() {
  return <FusionVasundharaPage />;
}
