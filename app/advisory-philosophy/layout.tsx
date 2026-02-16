import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Real Estate Advisory Philosophy",
  description:
    "See how Celeste Abode protects buyers with independent advice, RERA-first due diligence, and data-backed decision frameworks—not sales pressure.",
  keywords: [
    "real estate advisory philosophy",
    "independent property advisory",
    "transparent real estate consulting",
    "client first property guidance",
    "RERA-first advisory approach",
  ],
  openGraph: {
    title: "Our Real Estate Advisory Philosophy",
    description:
      "See how Celeste Abode protects buyers with independent advice, RERA-first due diligence, and data-backed decision frameworks—not sales pressure.",
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
      "See how Celeste Abode protects buyers with independent advice, RERA-first due diligence, and data-backed decision frameworks—not sales pressure.",
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

