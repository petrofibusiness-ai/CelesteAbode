import type { Metadata } from "next";
import { SobhaRivanaDemoPage } from "@/components/demo-property/sobha-rivana-demo-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";

export const metadata: Metadata = {
  title: "Sobha Rivana — Property page layout demo | Celeste Abode",
  description:
    "Preview layout: Sobha Rivana ultra-luxury 2–4 BHK in Sector 1 Greater Noida West — RERA, developer story, highlights, location, and NCR project discovery.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${site}/demo-property` },
  openGraph: {
    title: "Sobha Rivana — layout demo",
    description:
      "High-converting property page structure preview for Celeste Abode — hero with project facts, Sobha story, highlights, and location.",
    url: `${site}/demo-property`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
  },
};

export default function DemoPropertyPage() {
  return <SobhaRivanaDemoPage />;
}
