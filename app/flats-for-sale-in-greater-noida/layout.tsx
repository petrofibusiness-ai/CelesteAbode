import { Metadata } from "next";

const TITLE = "Flats for Sale in Greater Noida - Buy Apartments in Greater Noida";
const DESCRIPTION =
  "Find the best flats for sale in Greater Noida. Gated communities, studio apartments, 1 BHK, 2 & 3 BHK flats. Expert consultants, verified listings. Celeste Abode.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "flats for sale in Greater Noida",
    "buy apartments in Greater Noida",
    "1 BHK flat Greater Noida",
    "2 BHK flat Greater Noida",
    "studio apartment Greater Noida",
    "Celeste Abode",
  ],
  authors: [{ name: "Celeste Abode" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.celesteabode.com/flats-for-sale-in-greater-noida",
    siteName: "Celeste Abode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "https://www.celesteabode.com/flats-for-sale-in-greater-noida",
  },
  robots: { index: true, follow: true },
};

export default function FlatsForSaleInGreaterNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
