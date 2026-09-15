import type { Metadata } from "next";
import {
  SG_NAKSHATRA_HERO_IMAGE,
  SG_NAKSHATRA_PROJECT_NAME,
  SG_NAKSHATRA_RERA_ID,
  SG_NAKSHATRA_SLUG,
} from "@/lib/sg-nakshatra-assets";
import { SgNakshatraPage } from "@/components/sg-nakshatra/sg-nakshatra-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";
const path = `/properties-in-ghaziabad/${SG_NAKSHATRA_SLUG}`;
const heroAbs = SG_NAKSHATRA_HERO_IMAGE.startsWith("http")
  ? SG_NAKSHATRA_HERO_IMAGE
  : `${site}${SG_NAKSHATRA_HERO_IMAGE}`;

export const metadata: Metadata = {
  title: `${SG_NAKSHATRA_PROJECT_NAME} Siddharth Vihar - Pre-Launch 3 & 4 BHK | Celeste Abode`,
  description:
    `SG Nakshatra by SG Group in Siddharth Vihar, NH-24, Ghaziabad. Pre-launch 3 and 4 BHK from Rs 8,899/sq ft plus PLC and GST. EOI Rs 12 Lakh. UP RERA ${SG_NAKSHATRA_RERA_ID}. Celeste Abode advisory.`,
  keywords: [
    "SG Nakshatra",
    "SG Nakshatra Siddharth Vihar",
    "SG Nakshatra Ghaziabad",
    "SG Group NH-24",
    "3 BHK Siddharth Vihar",
    "4 BHK NH-24 Ghaziabad pre launch",
    "UPRERAPRJ437430",
  ],
  alternates: { canonical: `${site}${path}` },
  openGraph: {
    title: `${SG_NAKSHATRA_PROJECT_NAME} | Pre-Launch on NH-24, Ghaziabad`,
    description:
      "3 and 4 BHK high-rise in Siddharth Vihar. Pre-launch BSP from Rs 8,899/sq ft. EOI Rs 12 Lakh.",
    url: `${site}${path}`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: heroAbs,
        width: 1600,
        height: 900,
        alt: "SG Nakshatra high-rise, podium-based residences in Siddharth Vihar, NH-24, Ghaziabad, by SG Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SG_NAKSHATRA_PROJECT_NAME} | Pre-Launch`,
    description: "Siddharth Vihar, NH-24, Ghaziabad. Pre-launch BSP Rs 8,899/sq ft. EOI Rs 12 Lakh.",
    images: [heroAbs],
  },
};

export default function SgNakshatraPropertyPage() {
  return <SgNakshatraPage />;
}
