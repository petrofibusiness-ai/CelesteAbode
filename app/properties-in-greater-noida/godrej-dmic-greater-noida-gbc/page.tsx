import type { Metadata } from "next";
import {
  GODREJ_DMIC_HERO_IMAGE,
  GODREJ_DMIC_PROJECT_NAME,
  GODREJ_DMIC_SLUG,
} from "@/lib/godrej-dmic-assets";
import { GodrejDmicPage } from "@/components/godrej-dmic/godrej-dmic-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";
const path = `/properties-in-greater-noida/${GODREJ_DMIC_SLUG}`;
const heroAbs = GODREJ_DMIC_HERO_IMAGE.startsWith("http")
  ? GODREJ_DMIC_HERO_IMAGE
  : `${site}${GODREJ_DMIC_HERO_IMAGE}`;

export const metadata: Metadata = {
  title: `${GODREJ_DMIC_PROJECT_NAME} - Pre-Launch 1, 2 & 3 BHK | Celeste Abode`,
  description:
    "Global Business City by Godrej. Pre-launch in DMIC Greater Noida. 1, 2 and 3 BHK from Rs 1.35 Cr. EOI registration open. Celeste Abode advisory.",
  keywords: [
    "Global Business City by Godrej",
    "Godrej Global Business City",
    "Godrej Properties Greater Noida pre launch",
    "DMIC Greater Noida",
    "1 BHK Greater Noida Godrej",
    "3 BHK Godrej DMIC",
  ],
  alternates: { canonical: `${site}${path}` },
  openGraph: {
    title: `${GODREJ_DMIC_PROJECT_NAME} | Pre-Launch in DMIC Greater Noida`,
    description:
      "23.2-acre Godrej Properties residential parcel in DMIC Greater Noida. 1, 2 and 3 BHK. EOI from Rs 1.35 Cr.",
    url: `${site}${path}`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: heroAbs,
        width: 1600,
        height: 900,
        alt: "Global Business City by Godrej in DMIC Greater Noida: premium residential apartments by Godrej Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${GODREJ_DMIC_PROJECT_NAME} | Pre-Launch`,
    description: "DMIC Greater Noida. 1, 2 and 3 BHK from Rs 1.35 Cr. EOI open.",
    images: [heroAbs],
  },
};

export default function GodrejDmicPropertyPage() {
  return <GodrejDmicPage />;
}
