import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Real Estate Consultation Noida",
  description:
    "Talk to a Celeste Abode advisor for Noida, Greater Noida, and Yamuna Expressway properties. Get curated shortlists, transparent guidance, and faster decision support.",
  keywords: [
    "contact real estate advisor Noida",
    "property consultation Delhi NCR",
    "Celeste Abode contact",
    "real estate office Noida sector 62",
  ],
  openGraph: {
    title: "Contact Us - Real Estate Consultation Noida",
    description:
      "Talk to a Celeste Abode advisor for Noida, Greater Noida, and Yamuna Expressway properties. Get curated shortlists and transparent guidance.",
    url: "https://www.celesteabode.com/contact",
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - Real Estate Consultation Noida",
    description:
      "Speak with an advisor for curated property shortlists and clear, transparent decision support.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

