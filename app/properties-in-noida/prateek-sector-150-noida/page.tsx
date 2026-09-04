import type { Metadata } from "next";
import {
  PRATEEK_SECTOR_150_HERO_IMAGE,
  PRATEEK_SECTOR_150_PROJECT_NAME,
  PRATEEK_SECTOR_150_SLUG,
} from "@/lib/prateek-sector-150-assets";
import { PrateekSector150Page } from "@/components/prateek-sector-150/prateek-sector-150-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

export const metadata: Metadata = {
  title: `${PRATEEK_SECTOR_150_PROJECT_NAME} - Pre-Launch 3 & 4 BHK | Celeste Abode`,
  description:
    "Prateek Group pre-launch in Sector 150, Noida. Art Deco 2.0 high-rise. 3 and 4 BHK + servant from Rs 16,500/sq ft. EOI Rs 10 Lakh. Official name and RERA awaited. Celeste Abode advisory.",
  alternates: { canonical: `${site}/properties-in-noida/${PRATEEK_SECTOR_150_SLUG}` },
  openGraph: {
    title: `${PRATEEK_SECTOR_150_PROJECT_NAME} | Pre-Launch on Noida Expressway`,
    description:
      "Ultra-luxury 3 and 4 BHK + servant. Art Deco 2.0. Pre-launch BSP from Rs 16,500/sq ft. EOI open.",
    url: `${site}/properties-in-noida/${PRATEEK_SECTOR_150_SLUG}`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: PRATEEK_SECTOR_150_HERO_IMAGE.startsWith("http")
          ? PRATEEK_SECTOR_150_HERO_IMAGE
          : `${site}${PRATEEK_SECTOR_150_HERO_IMAGE}`,
        width: 1600,
        height: 900,
        alt: `${PRATEEK_SECTOR_150_PROJECT_NAME} pre-launch`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRATEEK_SECTOR_150_PROJECT_NAME} | Pre-Launch`,
    description: "Sector 150, Noida. Pre-launch BSP Rs 16,500/sq ft. EOI Rs 10 Lakh. Art Deco 2.0.",
    images: [
      PRATEEK_SECTOR_150_HERO_IMAGE.startsWith("http")
        ? PRATEEK_SECTOR_150_HERO_IMAGE
        : `${site}${PRATEEK_SECTOR_150_HERO_IMAGE}`,
    ],
  },
};

export default function PrateekSector150PropertyPage() {
  return <PrateekSector150Page />;
}
