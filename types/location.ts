export interface Locality {
  value: string;
  label: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ImageAltTexts {
  hero?: string;
  celesteAbode?: string;
  og?: string;
}

export interface Location {
  id: string;
  slug: string;
  locationName: string;
  heroImage: string;
  heroText: string;
  heroSubtext: string;
  exploreSectionHeading?: string;
  exploreSectionDescription?: string;
  localities: Locality[];
  whyInvestContent: string[]; // Array of paragraphs
  celesteAbodeImage?: string;
  faqs: FAQ[];
  footerCtaHeading?: string;
  footerCtaDescription?: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  imageAltTexts?: ImageAltTexts;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LocationFormData {
  slug: string;
  locationName: string;
  heroImage: string;
  heroText: string;
  heroSubtext: string;
  exploreSectionHeading: string;
  exploreSectionDescription: string;
  localities: Locality[];
  whyInvestContent: string[];
  celesteAbodeImage: string;
  faqs: FAQ[];
  footerCtaHeading: string;
  footerCtaDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  imageAltTexts: ImageAltTexts;
  isPublished: boolean;
}

