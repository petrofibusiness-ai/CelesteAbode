import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Residential & Investment Properties in Delhi NCR",
  description:
    "Explore verified residential and investment properties in Delhi NCR across Noida, Greater Noida, and Yamuna Expressway—curated for compliance, location strength, and long-term value.",
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
    title: "Luxury Residential & Investment Properties in Delhi NCR",
    description:
      "Explore verified residential and investment properties in Delhi NCR across Noida, Greater Noida, and Yamuna Expressway—curated for compliance, location strength, and long-term value.",
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
    title: "Luxury Residential & Investment Properties in Delhi NCR",
    description:
      "Explore verified residential and investment properties in Delhi NCR across Noida, Greater Noida, and Yamuna Expressway—curated for compliance, location strength, and long-term value.",
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

