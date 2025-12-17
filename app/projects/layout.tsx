import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Residential Projects NCR | Premium Real Estate Projects Noida | Celeste Abode",
  description:
    "Explore curated luxury residential projects in NCR, premium real estate projects in Noida, high-end residential projects in Delhi NCR, luxury apartments in Greater Noida, and premium homes near Yamuna Expressway. Celeste Abode presents handpicked luxury real estate projects.",
  keywords: [
    // Project & Inventory Discovery Keywords (Projects Page Focus)
    "luxury residential projects NCR",
    "premium real estate projects Noida",
    "high end residential projects Delhi NCR",
    "luxury apartments Greater Noida",
    "premium homes near Yamuna Expressway",
    "curated luxury real estate projects NCR",
    
    // Additional Project Keywords
    "luxury projects Noida",
    "properties Greater Noida",
    "real estate projects Delhi NCR",
    "apartments Yamuna Expressway",
    "investment properties Noida",
    "ready to move apartments",
    "luxury apartments Greater Noida West",
    "property projects Noida",
    "residential projects Delhi NCR",
    "premium apartments Noida",
  ],
  openGraph: {
    title: "Luxury Residential Projects NCR | Premium Real Estate Projects Noida | Celeste Abode",
    description:
      "Explore curated luxury residential projects in NCR, premium real estate projects in Noida, high-end residential projects in Delhi NCR, and luxury apartments in Greater Noida.",
    url: "https://www.celesteabode.com/projects",
    siteName: "Celeste Abode",
    images: [
      {
        url: "/hero-.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode Projects - Luxury Properties in Delhi NCR",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Residential Projects NCR | Premium Real Estate Projects Noida",
    description:
      "Explore curated luxury residential projects in NCR, premium real estate projects in Noida, and high-end residential projects in Delhi NCR.",
    images: ["/hero-.avif"],
  },
  alternates: {
    canonical: "https://www.celesteabode.com/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

