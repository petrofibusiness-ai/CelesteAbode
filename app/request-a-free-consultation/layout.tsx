import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Free Consultation - Personalized Property Consultation",
  description:
    "Request a 1:1 free consultation to discuss budget, location options, builder risk, and investment strategy across Noida, Greater Noida, and Yamuna Expressway.",
  keywords: [
    "book property advisory session",
    "real estate consultation booking",
    "one to one property consultation",
    "free consultation NCR",
    "investment strategy consultation NCR",
  ],
  openGraph: {
    title: "Request a Free Consultation - Personalized Property Consultation",
    description:
      "Request a 1:1 free consultation to discuss budget, location options, builder risk, and investment strategy across Noida, Greater Noida, and Yamuna Expressway.",
    url: "https://www.celesteabode.com/request-a-free-consultation",
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Request a Free Consultation - Personalized Property Consultation",
    description:
      "Request a 1:1 free consultation to align budget, micro-market options, and risk before you invest.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/request-a-free-consultation",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RequestAFreeConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

