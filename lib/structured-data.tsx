import Script from "next/script";

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    "@id": "https://www.celesteabode.com/#organization",
    name: "Celeste Abode",
    legalName: "Celeste Abode Private Limited",
    alternateName: ["Celeste Abode", "Celeste Abode Real Estate", "Celeste Abode Private Limited"],
    url: "https://www.celesteabode.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.celesteabode.com/logoceleste.avif",
      width: 170,
      height: 156
    },
    image: "https://www.celesteabode.com/logoceleste.avif",
    slogan: "The Convergence of Data Intelligence and Luxury Living",
    description:
      "Independent real estate advisory providing compliant, data-backed property guidance across Delhi NCR. We help buyers, investors, and NRIs make informed property decisions in Noida, Greater Noida, and Yamuna Expressway through RERA compliance, market intelligence, and transparent advisory services.",
    foundingDate: "2024",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "10-50"
    },
    knowsAbout: [
      "Real Estate Advisory",
      "Property Investment Advisory",
      "Data-Driven Property Intelligence",
      "RERA Compliance",
      "Real Estate Market Analysis",
      "Property ROI Strategy",
      "NRI Property Services",
      "Delhi NCR Real Estate",
      "Luxury Real Estate Consulting",
      "Property Portfolio Advisory",
      "High-Value Property Investment",
      "Bespoke Lifestyle Curation",
      "End-to-End Transaction Security"
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "716, Tower A, Ithum",
      addressLocality: "Sector 62",
      addressRegion: "Noida",
      postalCode: "201309",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9818735258",
      contactType: "Customer Service",
      areaServed: ["IN"],
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/celesteabode",
      "https://www.linkedin.com/company/celesteabode",
      "https://twitter.com/celesteabode",
      "https://www.instagram.com/celesteabode",
    ],
    areaServed: [
      { "@type": "City", "name": "Noida" },
      { "@type": "City", "name": "Greater Noida" },
      { "@type": "City", "name": "Gurugram" },
      { "@type": "City", "name": "Delhi" },
      { "@type": "City", "name": "Ghaziabad" },
      { "@type": "AdministrativeArea", "name": "Yamuna Expressway" },
      { "@type": "AdministrativeArea", "name": "Noida Expressway" }
    ],
    priceRange: "₹50 Lakhs - ₹5 Crores",
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList Schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product/Property Schema
export function PropertySchema({
  name,
  description,
  image,
  price,
  priceCurrency = "INR",
  address,
  developer,
  reraId,
  configuration,
  area,
  status,
  url,
}: {
  name: string;
  description: string;
  image: string;
  price?: string;
  priceCurrency?: string;
  address: string;
  developer: string;
  reraId?: string;
  configuration?: string[];
  area: string;
  status: string;
  url: string;
}) {
  // Prepare offers object - only include price if it exists
  const offers: any = {
    "@type": "Offer",
    availability: status === "Ready to Move" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    url: url,
  };

  // Only add price if it exists and is not empty
  if (price && price.trim() !== "") {
    offers.price = price.replace(/[^\d.]/g, "");
    offers.priceCurrency = priceCurrency;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    image: image.startsWith("http") ? image : `https://www.celesteabode.com${image}`,
    brand: {
      "@type": "Brand",
      name: developer,
    },
    offers: offers,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Location",
        value: address,
      },
      {
        "@type": "PropertyValue",
        name: "Developer",
        value: developer,
      },
      ...(reraId
        ? [
            {
              "@type": "PropertyValue",
              name: "RERA ID",
              value: reraId,
            },
          ]
        : []),
      {
        "@type": "PropertyValue",
        name: "Unit Types",
        value: configuration && configuration.length > 0 ? configuration.join(", ") : "Not specified",
      },
      {
        "@type": "PropertyValue",
        name: "Area",
        value: area,
      },
      {
        "@type": "PropertyValue",
        name: "Status",
        value: status,
      },
    ],
  };

  return (
    <Script
      id="property-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQPage Schema
export function FAQPageSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// LocalBusiness Schema
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Celeste Abode",
    image: "https://www.celesteabode.com/logoceleste.avif",
    "@id": "https://www.celesteabode.com",
    url: "https://www.celesteabode.com",
    telephone: "+91-9818735258",
    priceRange: "₹50 Lakhs - ₹5 Crores",
    description: "Celeste Abode - Premium luxury real estate advisory in NCR. Real estate investment advisory services, property portfolio advisory, and high-value property investment advisory. Expert real estate consultants in Noida, Greater Noida, Gurugram, Yamuna Expressway, and Delhi NCR.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "716, Tower A, Ithum",
      addressLocality: "Sector 62",
      addressRegion: "Uttar Pradesh",
      postalCode: "201309",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5355,
      longitude: 77.3910,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Noida",
      },
      {
        "@type": "City",
        name: "Greater Noida",
      },
      {
        "@type": "City",
        name: "Gurugram",
      },
      {
        "@type": "City",
        name: "Delhi",
      },
      {
        "@type": "City",
        name: "Ghaziabad",
      },
      {
        "@type": "City",
        name: "Yamuna Expressway",
      },
    ],
    serviceType: [
      "Luxury Real Estate Advisory",
      "Real Estate Investment Advisory Services",
      "Property Portfolio Advisory Services",
      "Real Estate Transaction Consulting",
      "End-to-End Property Advisory",
      "Personalized Real Estate Advisory",
      "Strategic Property Investment Planning",
      "Residential Real Estate Advisory",
      "NRI Real Estate Advisory",
      "High-Value Property Investment Advisory",
      "Luxury Real Estate Consulting",
      "Strategic Property Investment Advisory",
      "Data-Driven Property Intelligence",
      "RERA Compliant Property Advisory",
      "Bespoke Lifestyle Curation",
      "Investment Security Services",
      "NRI Property Services",
      "End-to-End Transaction Security",
    ],
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Celeste Abode",
    alternateName: "Celeste Abode Real Estate Consulting",
    url: "https://www.celesteabode.com",
    description: "Trusted real estate advisory providing compliant, data-backed property guidance across Delhi NCR. Expert property consultants in Noida, Greater Noida, Gurugram, and Yamuna Expressway.",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Celeste Abode",
      "@id": "https://www.celesteabode.com/#organization",
      logo: {
        "@type": "ImageObject",
        url: "https://www.celesteabode.com/logoceleste.avif",
        width: 170,
        height: 156
      }
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.celesteabode.com/properties?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Brand Schema for enhanced LLM recognition
export function BrandSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: "Celeste Abode",
    alternateName: ["Celeste Abode Real Estate", "Celeste Abode Private Limited"],
    slogan: "The Convergence of Data Intelligence and Luxury Living",
    description: "Celeste Abode - Premium luxury real estate advisory brand specializing in real estate investment advisory services, property portfolio advisory, high-value property investment advisory, and personalized real estate advisory in Delhi NCR.",
    logo: "https://www.celesteabode.com/logoceleste.avif",
    url: "https://www.celesteabode.com",
    sameAs: [
      "https://www.facebook.com/celesteabode",
      "https://www.linkedin.com/company/celesteabode",
      "https://twitter.com/celesteabode",
      "https://www.instagram.com/celesteabode"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2500",
      bestRating: "5",
      worstRating: "1"
    }
  };

  return (
    <Script
      id="brand-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ItemList Schema for Properties Collection Page
export function ItemListSchema({
  items,
  name,
  description,
  url,
}: {
  items: Array<{
    name: string;
    url: string;
    image?: string;
    description?: string;
  }>;
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    description: description,
    url: url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.name,
        url: item.url,
        ...(item.image && {
          image: item.image.startsWith("http") ? item.image : `https://www.celesteabode.com${item.image}`,
        }),
        ...(item.description && { description: item.description }),
      },
    })),
  };

  return (
    <Script
      id="itemlist-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// CollectionPage Schema for Properties Page
export function CollectionPageSchema({
  name,
  description,
  url,
  image,
  mainEntity,
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  mainEntity: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: name,
    description: description,
    url: url,
    image: image.startsWith("http") ? image : `https://www.celesteabode.com${image}`,
    inLanguage: "en-IN",
    mainEntity: {
      "@id": mainEntity,
    },
    publisher: {
      "@type": "Organization",
      name: "Celeste Abode",
      "@id": "https://www.celesteabode.com/#organization",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.celesteabode.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Properties",
          item: "https://www.celesteabode.com/properties",
        },
      ],
    },
  };

  return (
    <Script
      id="collectionpage-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema for AI understanding
export function ServiceSchema({
  name,
  description,
  serviceType,
  areaServed,
  provider,
}: {
  name: string;
  description: string;
  serviceType: string;
  areaServed: string[];
  provider?: {
    name: string;
    url: string;
  };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    serviceType: serviceType,
    areaServed: areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    ...(provider && {
      provider: {
        "@type": "Organization",
        name: provider.name,
        url: provider.url,
      },
    }),
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema for blog/content pages (if needed in future)
export function ArticleSchema({
  headline,
  description,
  image,
  author,
  datePublished,
  dateModified,
  url,
}: {
  headline: string;
  description: string;
  image?: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    description: description,
    ...(image && {
      image: image.startsWith("http") ? image : `https://www.celesteabode.com${image}`,
    }),
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Celeste Abode",
      "@id": "https://www.celesteabode.com/#organization",
      logo: {
        "@type": "ImageObject",
        url: "https://www.celesteabode.com/logoceleste.avif",
      },
    },
    datePublished: datePublished,
    ...(dateModified && { dateModified: dateModified }),
    url: url,
    inLanguage: "en-IN",
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Blog Page Schema
export function BlogPageSchema({
  name,
  description,
  url,
  publisher,
}: {
  name: string;
  description: string;
  url: string;
  publisher: {
    name: string;
    logo: string;
  };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: name,
    description: description,
    url: url,
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      "@id": "https://www.celesteabode.com/#organization",
      logo: {
        "@type": "ImageObject",
        url: publisher.logo,
      },
    },
    inLanguage: "en-IN",
    about: {
      "@type": "Thing",
      name: "Real Estate",
    },
  };

  return (
    <Script
      id="blog-page-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

