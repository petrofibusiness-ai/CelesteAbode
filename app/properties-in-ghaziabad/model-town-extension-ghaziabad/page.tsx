import type { Metadata } from "next";
import {
  MODEL_TOWN_EXTENSION_HERO_ALT,
  MODEL_TOWN_EXTENSION_HERO_IMAGE,
  MODEL_TOWN_EXTENSION_PROJECT_NAME,
  MODEL_TOWN_EXTENSION_SLUG,
} from "@/lib/model-town-extension-assets";
import { ModelTownExtensionPage } from "@/components/model-town-extension/model-town-extension-page";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.celesteabode.com";
const path = `/properties-in-ghaziabad/${MODEL_TOWN_EXTENSION_SLUG}`;
const heroAbs = MODEL_TOWN_EXTENSION_HERO_IMAGE.startsWith("http")
  ? MODEL_TOWN_EXTENSION_HERO_IMAGE
  : `${site}${MODEL_TOWN_EXTENSION_HERO_IMAGE}`;

export const metadata: Metadata = {
  title: `${MODEL_TOWN_EXTENSION_PROJECT_NAME} Ghaziabad - GDA Plots on GT Road | Celeste Abode`,
  description:
    "Model Town Extension by Radhabrij Realty near Choudhary More, GT Road, Ghaziabad. GDA-approved gated plots from 109 to 360 sq yd. From Rs 1.36 Cr. Registry within 90 days. Celeste Abode advisory.",
  keywords: [
    "Model Town Extension Ghaziabad",
    "Model Town Extension GT Road",
    "Radhabrij Realty plots",
    "GDA approved plots Ghaziabad",
    "plots near Choudhary More",
    "Old Arya Nagar plots",
  ],
  alternates: { canonical: `${site}${path}` },
  openGraph: {
    title: `${MODEL_TOWN_EXTENSION_PROJECT_NAME} | GDA Plots on GT Road, Ghaziabad`,
    description:
      "Gated GDA-approved residential plots near Choudhary More, GT Road. 109 to 360 sq yd. From Rs 1.36 Cr. Registry within 90 days.",
    url: `${site}${path}`,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: heroAbs,
        secureUrl: heroAbs,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: MODEL_TOWN_EXTENSION_HERO_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${MODEL_TOWN_EXTENSION_PROJECT_NAME} | GDA Plots, Ghaziabad`,
    description: "Near Choudhary More, GT Road. Gated plots from Rs 1.36 Cr. Registry within 90 days.",
    images: [
      {
        url: heroAbs,
        alt: MODEL_TOWN_EXTENSION_HERO_ALT,
      },
    ],
  },
};

export default function ModelTownExtensionPropertyPage() {
  return <ModelTownExtensionPage />;
}
