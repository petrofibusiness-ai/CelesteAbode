import type { Metadata } from "next";
import { KARYAN_NH24_PROJECT_NAME, KARYAN_NH24_SLUG, KARYAN_RESIDENCES_NH24_HERO_IMAGE } from "@/lib/karyan-residences-nh24-assets";
import { KaryanResidencesNh24Page } from "@/components/karyan-residences-nh24/karyan-residences-nh24-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

export const metadata: Metadata = {
  title: `${KARYAN_NH24_PROJECT_NAME} - Pre-Launch 2 & 3 BHK | Celeste Abode`,
  description:
    "Karyan Group pre-launch on NH-24, Ghaziabad. 2, 2+Study and 3 BHK apartments with Mivan construction from Rs 5,900/sq ft. EOI Rs 5 Lakh, 25x4 payment plan. Brochure and allotment guidance from Celeste Abode.",
  alternates: { canonical: `${site}/properties-in-ghaziabad/${KARYAN_NH24_SLUG}` },
  openGraph: {
    title: `${KARYAN_NH24_PROJECT_NAME} | Pre-Launch on NH-24, Ghaziabad`,
    description:
      "Early-mover opportunity: 10 towers across 8.5 acres, Mivan-built homes, luxury clubhouse, and pre-launch BSP from Rs 5,900/sq ft.",
    url: `${site}/properties-in-ghaziabad/${KARYAN_NH24_SLUG}`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: KARYAN_RESIDENCES_NH24_HERO_IMAGE,
        width: 1600,
        height: 900,
        alt: `${KARYAN_NH24_PROJECT_NAME} pre-launch`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [KARYAN_RESIDENCES_NH24_HERO_IMAGE],
  },
};

export default function KaryanResidencesNh24PropertyPage() {
  return <KaryanResidencesNh24Page />;
}
