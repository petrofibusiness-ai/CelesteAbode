import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Residential & Investment Properties in Delhi NCR",
  description:
    "Explore verified apartments, villas, and plots in Noida, Greater Noida, and Yamuna Expressway. Compare RERA status, builder credibility, and location fundamentals before you shortlist.",
  keywords: [
    "properties in Delhi NCR",
    "verified properties Noida",
    "properties in Greater Noida",
    "Yamuna Expressway properties",
    "RERA verified residential properties",
    "investment properties NCR",
  ],
  openGraph: {
    title: "Luxury Residential & Investment Properties in Delhi NCR",
    description:
      "Explore verified apartments, villas, and plots in Noida, Greater Noida, and Yamuna Expressway. Compare RERA status, builder credibility, and location fundamentals before you shortlist.",
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
      "Explore verified apartments, villas, and plots in Noida, Greater Noida, and Yamuna Expressway. Compare RERA status, builder credibility, and location fundamentals before you shortlist.",
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

