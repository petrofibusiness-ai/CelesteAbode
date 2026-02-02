import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Real Estate Advisory Philosophy",
  description:
    "Our real estate advisory philosophy is built on independence, regulatory clarity, and disciplined decision-making—designed to protect long-term client interests.",
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
    title: "Our Real Estate Advisory Philosophy",
    description:
      "Our real estate advisory philosophy is built on independence, regulatory clarity, and disciplined decision-making—designed to protect long-term client interests.",
    url: "https://www.celesteabode.com/advisory-philosophy",
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
    title: "Our Real Estate Advisory Philosophy",
    description:
      "Our real estate advisory philosophy is built on independence, regulatory clarity, and disciplined decision-making—designed to protect long-term client interests.",
    images: ["/TRUSTTRANIMAGE.avif"],
  },
  alternates: {
    canonical: "https://www.celesteabode.com/advisory-philosophy",
  },
};

export default function PhilosophyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

