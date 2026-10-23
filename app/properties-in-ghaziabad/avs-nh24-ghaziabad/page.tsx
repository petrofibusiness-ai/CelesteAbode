import type { Metadata } from "next";
import {
  AVS_NH24_HERO_ALT,
  AVS_NH24_HERO_IMAGE,
  AVS_NH24_PROJECT_NAME,
  AVS_NH24_SLUG,
} from "@/lib/avs-nh24-assets";
import { AvsNh24Page } from "@/components/avs-nh24/avs-nh24-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";
const path = `/properties-in-ghaziabad/${AVS_NH24_SLUG}`;
const heroAbs = AVS_NH24_HERO_IMAGE.startsWith("http")
  ? AVS_NH24_HERO_IMAGE
  : `${site}${AVS_NH24_HERO_IMAGE}`;

export const metadata: Metadata = {
  title: `${AVS_NH24_PROJECT_NAME} | 3 & 4 BHK in Ghaziabad | Celeste Abode`,
  description:
    "3 and 4 BHK on NH-24, Ghaziabad. From Rs 5,999/sq ft. EOI from Rs 5 Lakh.",
  keywords: [
    "AVS Group Pre Launch",
    "3 BHK NH-24 Ghaziabad",
    "4 BHK Crossing Republik",
    "AVS Group Ghaziabad",
  ],
  alternates: { canonical: `${site}${path}` },
  openGraph: {
    title: `${AVS_NH24_PROJECT_NAME} | 3 & 4 BHK on NH-24, Ghaziabad`,
    description:
      "3 and 4 BHK on NH-24, Ghaziabad. From Rs 5,999/sq ft. EOI from Rs 5 Lakh.",
    url: `${site}${path}`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: heroAbs,
        width: 1600,
        height: 900,
        alt: AVS_NH24_HERO_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${AVS_NH24_PROJECT_NAME} | NH-24, Ghaziabad`,
    description: "Crossing Republik, NH-24, Ghaziabad. 3 and 4 BHK from Rs 5,999/sq ft. EOI from Rs 5 Lakh.",
    images: [heroAbs],
  },
};

export default function AvsNh24PropertyPage() {
  return <AvsNh24Page />;
}
