import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Philosophy - Trust, Transparency & Transformation | Celeste Abode",
  description:
    "Discover Celeste Abode's philosophy: Trust, Transparency, and Transformation. Evidence-driven real estate consulting that prioritizes your goals over sales pressure. Learn about our non-negotiables and standards.",
  keywords: [
    // Trust & Positioning Keywords (About / Philosophy Page)
    "trusted real estate advisors NCR",
    "independent real estate advisory India",
    "client first real estate consulting",
    "transparent property advisory services",
    "research based real estate advisory",
    
    // Additional Philosophy Keywords
    "real estate philosophy",
    "property consulting ethics",
    "transparent real estate",
    "evidence-based property advice",
    "real estate trust",
    "property consulting standards",
    "ethical real estate",
    "trustworthy property advisor",
  ],
  openGraph: {
    title: "Our Philosophy - Trust, Transparency & Transformation | Celeste Abode",
    description:
      "Evidence-driven real estate consulting that prioritizes your goals over sales pressure. Discover our philosophy of Trust, Transparency, and Transformation.",
    url: "https://www.celesteabode.com/philosophy",
    siteName: "Celeste Abode",
    images: [
      {
        url: "/TRUSTTRANIMAGE.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode Philosophy - Trust, Transparency, Transformation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Philosophy - Trust, Transparency & Transformation",
    description:
      "Evidence-driven real estate consulting that prioritizes your goals over sales pressure.",
    images: ["/TRUSTTRANIMAGE.avif"],
  },
  alternates: {
    canonical: "https://www.celesteabode.com/philosophy",
  },
};

export default function PhilosophyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

