import type { Metadata } from "next";

// Export title and description as constants for reuse in components
export const homepageTitle = "Best Property Consultant in Noida | Real Estate Consultants Delhi NCR";
export const homepageH1 = "Trusted Real Estate Consultant for Properties in Delhi NCR";
export const homepageDescription = "Celeste Abode is a trusted real estate consultant in Noida offering expert property consulting services across Delhi NCR for residential and commercial investments.";
export const homepageHeroSubtext = "Independent real estate advisory services focused on clarity, compliance, and long-term value.";

// Home hero image URL for OG/Twitter
const homeHeroImage = "https://www.celesteabode.com/propertyhero.avif";

export const homepageMetadata: Metadata = {
  title: homepageTitle,
  description: homepageDescription,
  keywords: [
    "best property consultant Noida",
    "real estate consultants Delhi NCR",
    "property consulting services",
    "residential property investment",
    "commercial property investment",
    "trusted real estate consultant",
  ],
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: "https://www.celesteabode.com/",
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: homeHeroImage,
        width: 1200,
        height: 630,
        alt: "Best Property Consultant in Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: [
      {
        url: homeHeroImage,
        alt: "Best Property Consultant in Noida",
      },
    ],
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
    "geo.position": "28.6076655;77.4354885",
    "ICBM": "28.6076655, 77.4354885",
  },
};

