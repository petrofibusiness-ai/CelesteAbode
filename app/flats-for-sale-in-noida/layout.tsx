import { Metadata } from "next";

const TITLE = "Flats for Sale in Noida - Buy the Best Flats in Noida";
const DESCRIPTION =
  "Find the best flats for sale in Noida. Ready to move, under construction & new launch 2 BHK, 3 BHK flats. Expert consultants, verified listings. Celeste Abode.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "flats for sale in Noida",
    "buy flats in Noida",
    "2 BHK flat Noida",
    "3 BHK flat Noida",
    "apartments in Noida",
    "Celeste Abode",
  ],
  authors: [{ name: "Celeste Abode" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.celesteabode.com/flats-for-sale-in-noida",
    siteName: "Celeste Abode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "https://www.celesteabode.com/flats-for-sale-in-noida",
  },
  robots: { index: true, follow: true },
};

export default function FlatsForSaleInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
