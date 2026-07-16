import type { Metadata } from "next";
import { IRISH_ETA_1_HERO_IMAGE, IRISH_ETA_1_PROJECT_NAME, IRISH_ETA_1_SLUG } from "@/lib/irish-eta-1-assets";
import { IrishEta1Page } from "@/components/irish-eta-1/irish-eta-1-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

export const metadata: Metadata = {
  title: `${IRISH_ETA_1_PROJECT_NAME} - Pre-Launch 3 & 4 BHK | Celeste Abode`,
  description:
    "Irish Group pre-launch in Sector ETA-1, Greater Noida. 1450–2450 sq ft 3 & 4 BHK. Pre-launch BSP Rs 8,500/sq ft + GST 5%. EOI 25%, 25:25:25:25 plan. Celeste Abode advisory.",
  alternates: { canonical: `${site}/properties-in-greater-noida/${IRISH_ETA_1_SLUG}` },
  openGraph: {
    title: `${IRISH_ETA_1_PROJECT_NAME} | Pre-Launch in Sector ETA-1`,
    description:
      "4 towers, 60,000 sq ft club, 12 ft ceilings. Pre-launch BSP from Rs 8,500/sq ft for early inventory.",
    url: `${site}/properties-in-greater-noida/${IRISH_ETA_1_SLUG}`,
    siteName: "Celeste Abode",
    images: [
      {
        url: IRISH_ETA_1_HERO_IMAGE.startsWith("http")
          ? IRISH_ETA_1_HERO_IMAGE
          : `${site}${IRISH_ETA_1_HERO_IMAGE}`,
        width: 1600,
        height: 900,
        alt: `${IRISH_ETA_1_PROJECT_NAME} pre-launch`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${IRISH_ETA_1_PROJECT_NAME} | Pre-Launch`,
    description: "Sector ETA-1 Greater Noida. Pre-launch BSP Rs 8,500/sq ft + GST. EOI open.",
    images: [
      IRISH_ETA_1_HERO_IMAGE.startsWith("http")
        ? IRISH_ETA_1_HERO_IMAGE
        : `${site}${IRISH_ETA_1_HERO_IMAGE}`,
    ],
  },
};

export default function IrishEta1PropertyPage() {
  return <IrishEta1Page />;
}
