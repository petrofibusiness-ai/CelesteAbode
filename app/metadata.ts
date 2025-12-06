import type { Metadata } from "next";

export const homepageMetadata: Metadata = {
  title: "Luxury Real Estate Consulting NCR | Strategic Property Investment Advisory | Celeste Abode",
  description: "Premium real estate consulting in Noida, Gurugram & Delhi NCR. Data-driven property investment advisory with RERA compliance. Expert guidance for luxury apartments.",
  keywords: [
    // Primary Keywords
    "luxury real estate consulting NCR",
    "strategic property investment advisory",
    "data-driven real estate consulting",
    "RERA compliant property advisory",
    "property investment consultant NCR",
    
    // Location-based Keywords
    "real estate consultant Noida",
    "property advisor Gurugram",
    "luxury property consultant Delhi NCR",
    "Yamuna Expressway property investment",
    "Greater Noida real estate advisor",
    "Noida Expressway property consultant",
    "Gurugram property investment advisory",
    "Delhi NCR real estate consulting",
    "Ghaziabad property advisor",
    
    // Service-based Keywords
    "bespoke lifestyle curation",
    "investment security NCR",
    "property ROI strategy",
    "signature residences NCR",
    "high-value property investment",
    "AI-powered property intelligence",
    "luxury apartment consultant",
    "villa investment advisory",
    "ready to move property NCR",
    "pre-launch property investment",
    
    // NRI & Specialized Services
    "NRI property services NCR",
    "global Indian property investment",
    "remote property management",
    "end-to-end transaction security",
    "legal property verification NCR",
    
    // Market-specific
    "Jewar Airport property investment",
    "Noida Sector 62 property",
    "luxury real estate NCR",
    "premium property advisory India",
    "real estate market intelligence",
  ],
  openGraph: {
    title: "Luxury Real Estate Consulting NCR | Strategic Property Investment Advisory | Celeste Abode",
    description: "Premium real estate consulting in Noida, Gurugram, and Delhi NCR. Data-driven property investment advisory with RERA compliance and strategic intelligence.",
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
    title: "Luxury Real Estate Consulting NCR | Celeste Abode",
    description: "Premium real estate consulting in Noida, Gurugram, and Delhi NCR. Strategic property investment advisory with data-driven intelligence.",
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

