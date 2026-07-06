import type { Metadata } from "next";
import { ACE_PARKWAY_2_0_HERO_IMAGE } from "@/lib/ace-parkway-2-0-assets";
import { AceParkway20Page } from "@/components/ace-parkway-2-0/ace-parkway-2-0-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

export const metadata: Metadata = {
  title: "Ace Parkway 2.0 Sector 150 Noida - Pre-Launch Ultra-Luxury 3/4/4.5 BHK | Celeste Abode",
  description:
    "ACE Group pre-launch at Ace Parkway 2.0, Sector 150 Noida. Ultra-luxury 3, 4 and 4.5 BHK homes from Rs 16,995/sq ft. EOI open. Brochure and allotment guidance from Celeste Abode.",
  alternates: { canonical: `${site}/properties-in-noida/ace-parkway-2-0` },
  openGraph: {
    title: "Ace Parkway 2.0 | Pre-Launch Ultra-Luxury in Sector 150, Noida",
    description:
      "Approx 790 residences across 15 acres. 11 towers, central green, grand clubhouse, and pre-launch BSP from Rs 16,995/sq ft.",
    url: `${site}/properties-in-noida/ace-parkway-2-0`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: ACE_PARKWAY_2_0_HERO_IMAGE.startsWith("http")
          ? ACE_PARKWAY_2_0_HERO_IMAGE
          : `${site}${ACE_PARKWAY_2_0_HERO_IMAGE}`,
        width: 1600,
        height: 900,
        alt: "Ace Parkway 2.0, Sector 150 Noida pre-launch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      ACE_PARKWAY_2_0_HERO_IMAGE.startsWith("http")
        ? ACE_PARKWAY_2_0_HERO_IMAGE
        : `${site}${ACE_PARKWAY_2_0_HERO_IMAGE}`,
    ],
  },
};

export default function AceParkway20PropertyPage() {
  return <AceParkway20Page />;
}
