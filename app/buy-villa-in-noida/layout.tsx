import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Villa in Noida – Premium Homes for Refined Living",
  description:
    "Planning to buy a villa in Noida? Compare RERA-verified options by sector, budget, and possession timeline—with support on legal checks and negotiations.",
  keywords: [
    "buy villa in Noida",
    "Noida villas for sale",
    "RERA verified villas Noida",
    "independent villas Noida",
    "villa buying advisory Noida",
  ],
  openGraph: {
    title: "Buy Villa in Noida – Premium Homes for Refined Living",
    description:
      "Planning to buy a villa in Noida? Compare RERA-verified options by sector, budget, and possession timeline—with support on legal checks and negotiations.",
    url: "https://www.celesteabode.com/buy-villa-in-noida",
    siteName: "Celeste Abode",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Villa in Noida – Premium Homes for Refined Living",
    description:
      "Planning to buy a villa in Noida? Compare RERA-verified options by sector, budget, and possession timeline—with support on legal checks and negotiations.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/buy-villa-in-noida",
  },
};

export default function BuyVillaInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
