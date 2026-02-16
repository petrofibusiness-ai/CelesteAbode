import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Villa in Noida – Discover Elegant Living",
  description:
    "Shortlist luxury villas in Noida sectors 44, 47, 93, and 150. Evaluate builder credibility, location strength, and resale potential with data-backed advisory.",
  keywords: [
    "villa in Noida",
    "luxury villas Noida",
    "Noida villa sectors 44 47 93 150",
    "RERA verified villas Noida",
    "buy villa in Noida",
  ],
  openGraph: {
    title: "Luxury Villa in Noida – Discover Elegant Living",
    description:
      "Shortlist luxury villas in Noida sectors 44, 47, 93, and 150. Evaluate builder credibility, location strength, and resale potential with data-backed advisory.",
    url: "https://www.celesteabode.com/villa-in-noida",
    siteName: "Celeste Abode",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Villa in Noida – Discover Elegant Living",
    description:
      "Shortlist Noida villas by sector, budget, and builder track record with transparent, data-backed guidance.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/villa-in-noida",
  },
};

export default function VillaInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

