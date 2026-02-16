import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Real Estate Consulting in India",
  description:
    "Buy luxury apartments, flats & villas in Noida, Gurgaon, Delhi NCR, Ghaziabad, and Lucknow with Celeste Abode – India's trusted AI-driven real estate advisory. Expert property consultation, investment advisory, and NRI services.",
  keywords: [
    "real estate consulting India",
    "property advisory Delhi NCR",
    "luxury apartments Noida",
    "property investment advisory India",
  ],
  openGraph: {
    title: "AI-Powered Real Estate Consulting in India",
    description:
      "Buy luxury apartments, flats & villas in Noida, Gurgaon, Delhi NCR, Ghaziabad, and Lucknow with Celeste Abode – India's trusted AI-driven real estate advisory.",
    url: "https://www.celesteabode.com",
    siteName: "Celeste Abode",
    images: [
      {
        url: "/hero.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode - AI-Powered Real Estate Consulting",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Real Estate Consulting in India",
    description:
      "Buy luxury apartments, flats & villas in Noida, Gurgaon, Delhi NCR, Ghaziabad, and Lucknow with Celeste Abode.",
    images: ["/hero.avif"],
  },
  alternates: {
    canonical: "https://www.celesteabode.com",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

