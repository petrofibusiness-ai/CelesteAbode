import type { Metadata } from "next";

// Export title and description as constants for reuse in components
export const homepageTitle = "Trusted Real Estate Consultant for Properties in Delhi NCR";
export const homepageH1 = "Trusted Real Estate Consultant for Properties in Delhi NCR";
export const homepageDescription = "Independent real estate consulting in Delhi NCR for buyers and investors seeking RERA-safe, data-led property decisions across Noida and Yamuna Expressway.";
export const homepageHeroSubtext = "Independent real estate advisory services focused on clarity, compliance, and long-term value.";

export const homepageMetadata: Metadata = {
  title: homepageTitle,
  description: homepageDescription,
  keywords: [
    "trusted real estate consultant Delhi NCR",
    "independent property advisory Noida",
    "RERA-safe property decisions",
    "data-led real estate consulting",
    "Noida and Yamuna Expressway property advisory",
  ],
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: "https://www.celesteabode.com",
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.celesteabode.com/propertyhero.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode - Luxury Real Estate Consulting in NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: ["https://www.celesteabode.com/propertyhero.avif"],
    creator: "@celesteabode",
  },
  alternates: {
    canonical: "https://www.celesteabode.com",
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
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Noida",
    "geo.position": "28.5355;77.3910",
    "ICBM": "28.5355, 77.3910",
  },
};

