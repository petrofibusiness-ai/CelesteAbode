import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Advisory Session - Personalized Property Consultation",
  description:
    "Book a 1:1 advisory session to discuss budget, location options, builder risk, and investment strategy across Noida, Greater Noida, and Yamuna Expressway.",
  keywords: [
    "book property advisory session",
    "real estate consultation booking",
    "one to one property consultation",
    "investment strategy consultation NCR",
  ],
  openGraph: {
    title: "Request Advisory Session - Personalized Property Consultation",
    description:
      "Book a 1:1 advisory session to discuss budget, location options, builder risk, and investment strategy across Noida, Greater Noida, and Yamuna Expressway.",
    url: "https://www.celesteabode.com/advisory-session",
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Request Advisory Session - Personalized Property Consultation",
    description:
      "Book a 1:1 advisory session to align budget, micro-market options, and risk before you invest.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/advisory-session",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AdvisorySessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

