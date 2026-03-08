import { Metadata } from "next";

const TITLE = "Buy Commercial Property in Noida – Best Commercial Property for Investment";
const DESCRIPTION =
  "Buy commercial property in Noida with expert consultants. Office space, retail, showrooms & high-ROI commercial investment. Verified listings and end-to-end assistance.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "commercial property in Noida",
    "buy commercial property Noida",
    "office space Noida",
    "retail shops Noida",
    "commercial investment Noida",
    "Celeste Abode",
  ],
  authors: [{ name: "Celeste Abode" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.celesteabode.com/commercial-property-in-noida",
    siteName: "Celeste Abode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "https://www.celesteabode.com/commercial-property-in-noida",
  },
  robots: { index: true, follow: true },
};

export default function CommercialPropertyInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
