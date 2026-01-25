import type { Metadata } from "next";

// Export title and description as constants for reuse in components
export const homepageTitle = "Trusted Real Estate Consultant for Properties in Delhi NCR | Celeste Abode";
export const homepageH1 = "Trusted Real Estate Consultant for Properties in Delhi NCR";
export const homepageDescription = "Guiding confident property decisions across Noida, Greater Noida, and Yamuna Expressway through data-backed analysis, RERA discipline, and local market expertise.";

export const homepageMetadata: Metadata = {
  keywords: [
    // Core Business Keywords
    "real estate consultant Delhi NCR",
    "property consultant Noida",
    "real estate consulting firm",
    "property investment advisory NCR",
    "luxury real estate consultant",
    
    // Location-Focused Keywords
    "real estate consultant Noida",
    "property advisor Greater Noida",
    "Yamuna Expressway property consultant",
    "Delhi NCR real estate advisory",
    
    // Service Keywords
    "property investment consultant",
    "real estate advisory services",
    "RERA compliant property advisory",
    "data-driven real estate consulting",
    
    // NRI & Investor Keywords
    "NRI real estate advisory India",
    "property investment for NRIs NCR",
    "overseas property consultant India",

    // Trust & Quality Keywords
    "trusted real estate consultant",
    "independent property advisory",
    "transparent real estate consulting",
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

