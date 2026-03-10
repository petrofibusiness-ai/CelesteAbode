import { Metadata } from "next";

const TITLE = "Flats in Ghaziabad - Buy Flat in Ghaziabad with Verified Listings";
const DESCRIPTION =
  "Buy flats in Ghaziabad with trusted real estate consultants. Indirapuram, Vaishali, Vasundhara. Verified listings, expert due diligence, and end-to-end buying assistance.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "flats in Ghaziabad",
    "flat in Ghaziabad for sale",
    "flat for sale in Indirapuram Ghaziabad",
    "3 BHK flats in Indirapuram Ghaziabad",
    "flats in Vaishali Ghaziabad",
    "flats in Vasundhara Ghaziabad",
    "Celeste Abode",
  ],
  authors: [{ name: "Celeste Abode" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.celesteabode.com/flats-in-ghaziabad",
    siteName: "Celeste Abode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "https://www.celesteabode.com/flats-in-ghaziabad",
  },
  robots: { index: true, follow: true },
};

export default function FlatsInGhaziabadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

