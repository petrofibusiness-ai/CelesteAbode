import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Residential Projects NCR | Premium Real Estate Projects Noida | Celeste Abode",
  description:
    "Curated residential & investment properties in Delhi NCR. Verified projects across Noida, Greater Noida, Yamuna Expressway—evaluated for legality & long-term suitability.",
  keywords: [
    "properties Delhi NCR",
    "verified properties Noida",
    "residential projects Greater Noida",
    "investment properties Yamuna Expressway",
    "curated properties Ghaziabad",
    "RERA registered properties NCR",
    "luxury apartments Noida",
    "ready to move properties Greater Noida",
    "premium properties Yamuna Expressway",
    "property investment Delhi NCR",
    "NCR real estate",
    "properties in Noida",
    "properties in Greater Noida",
    "properties Yamuna Expressway",
    "properties Ghaziabad",
    "2 BHK Noida",
    "3 BHK Greater Noida",
    "4 BHK Yamuna Expressway",
    "apartments Delhi NCR",
    "villas Noida",
  ],
  openGraph: {
    title: "Luxury Residential Projects NCR | Premium Real Estate Projects Noida | Celeste Abode",
    description:
      "Curated residential & investment properties in Delhi NCR. Verified projects across Noida, Greater Noida, Yamuna Expressway—evaluated for legality & long-term suitability.",
    url: "https://www.celesteabode.com/properties",
    siteName: "Celeste Abode",
    images: [
      {
        url: "/hero-.avif",
        width: 1200,
        height: 630,
        alt: "Verified Properties in Delhi NCR - Celeste Abode",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verified Properties Delhi NCR | Noida, Greater Noida",
    description:
      "Curated residential & investment properties in Delhi NCR. Verified projects across Noida, Greater Noida, Yamuna Expressway—evaluated for legality & long-term suitability.",
    images: ["/hero-.avif"],
  },
  alternates: {
    canonical: "https://www.celesteabode.com/properties",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

