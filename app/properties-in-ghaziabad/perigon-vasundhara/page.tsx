import type { Metadata } from "next";
import {
  PERIGON_VASUNDHARA_HERO_IMAGE,
  PERIGON_VASUNDHARA_PROJECT_NAME,
  PERIGON_VASUNDHARA_SLUG,
} from "@/lib/perigon-vasundhara-assets";
import { PerigonVasundharaPage } from "@/components/perigon-vasundhara/perigon-vasundhara-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";
const path = `/properties-in-ghaziabad/${PERIGON_VASUNDHARA_SLUG}`;
const heroAbs = PERIGON_VASUNDHARA_HERO_IMAGE.startsWith("http")
  ? PERIGON_VASUNDHARA_HERO_IMAGE
  : `${site}${PERIGON_VASUNDHARA_HERO_IMAGE}`;

export const metadata: Metadata = {
  title: `${PERIGON_VASUNDHARA_PROJECT_NAME} Ghaziabad - Pre-Launch 3 & 4 BHK | Celeste Abode`,
  description:
    "Perigon Vasundhara in Sector 4, Ghaziabad. Pre-launch 3 and 4 BHK from Rs 8,999/sq ft. EOI open. Official name and RERA awaited. Celeste Abode advisory.",
  keywords: [
    "Perigon Vasundhara",
    "Perigon Vasundhara Ghaziabad",
    "Vasundhara Ghaziabad pre launch",
    "Sector 4 Vasundhara apartments",
    "3 BHK Vasundhara",
    "4 BHK Vasundhara Ghaziabad",
  ],
  alternates: { canonical: `${site}${path}` },
  openGraph: {
    title: `${PERIGON_VASUNDHARA_PROJECT_NAME} | Pre-Launch in Sector 4 Vasundhara`,
    description:
      "3 and 4 BHK high-rise in Vasundhara, Ghaziabad. Pre-launch BSP from Rs 8,999/sq ft. EOI open.",
    url: `${site}${path}`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: heroAbs,
        width: 1600,
        height: 900,
        alt: `${PERIGON_VASUNDHARA_PROJECT_NAME} pre-launch in Sector 4, Vasundhara, Ghaziabad`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERIGON_VASUNDHARA_PROJECT_NAME} | Pre-Launch`,
    description: "Sector 4, Vasundhara, Ghaziabad. Pre-launch BSP Rs 8,999/sq ft. EOI open.",
    images: [heroAbs],
  },
};

export default function PerigonVasundharaPropertyPage() {
  return <PerigonVasundharaPage />;
}
