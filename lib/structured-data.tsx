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
      url: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
      width: 170,
      height: 156
    },
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
    slogan: "Independent real estate advisory services focused on clarity, compliance, and long-term value.",
    description:
      "Independent real estate consulting in Delhi NCR for buyers and investors seeking RERA-safe, data-led property decisions across Noida and Yamuna Expressway.",
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
      streetAddress: "615, 6th Floor, Galaxy Blue Sapphire Plaza",
      addressLocality: "Sector 4, Greater Noida (West)",
      addressRegion: "Uttar Pradesh",
      postalCode: "201309",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 9818735258",
      contactType: "Customer Service",
      areaServed: ["IN"],
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/celesteabode/",
      "https://www.linkedin.com/company/celeste-abode/",
    ],
    areaServed: [
      { "@type": "City", "name": "Noida" },
      { "@type": "City", "name": "Greater Noida" },
      { "@type": "City", "name": "Gurugram" },
      { "@type": "City", "name": "Delhi" },
      { "@type": "City", "name": "Ghaziabad" },
      { "@type": "City", "name": "Lucknow" },
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
  priceMin,
  priceMax,
  priceUnit,
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
  priceMin?: number | null;
  priceMax?: number | null;
  priceUnit?: string | null;
  priceCurrency?: string;
  address: string;
  developer: string;
  reraId?: string;
  configuration?: string[];
  area: string;
  status: string;
  url: string;
}) {

  // Build base schema
  const additionalProps: Array<{ "@type": string; name: string; value: string }> = [
    { "@type": "PropertyValue", name: "Location", value: address },
    { "@type": "PropertyValue", name: "Developer", value: developer },
    ...(reraId ? [{ "@type": "PropertyValue" as const, name: "RERA ID", value: reraId }] : []),
    {
      "@type": "PropertyValue",
      name: "Unit Types",
      value: configuration && configuration.length > 0 ? configuration.join(", ") : "Not specified",
    },
    { "@type": "PropertyValue", name: "Area", value: area },
    { "@type": "PropertyValue", name: "Status", value: status },
  ];
  if (priceUnit && priceUnit.trim() !== "") {
    additionalProps.push({ "@type": "PropertyValue", name: "Display Price", value: priceUnit.trim() });
  }

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: name,
    description: description,
    image: image.startsWith("http") ? image : `https://www.celesteabode.com${image}`,
    url: url,
    brand: { "@type": "Brand", name: developer },
    additionalProperty: additionalProps,
  };

  // Add offers only if priceMin exists (numeric for schema)
  const min = priceMin ? Number(priceMin) : null;
  const max = priceMax ? Number(priceMax) : null;
  
  if (min && max) {
    schema.offers = {
      "@type": "AggregateOffer",
      lowPrice: min,
      highPrice: max,
      priceCurrency: priceCurrency,
      availability:
        status === "Ready to Move"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      url: url,
    };
  } else if (min) {
    schema.offers = {
      "@type": "Offer",
      price: min,
      priceCurrency: priceCurrency,
      availability:
        status === "Ready to Move"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      url: url,
    };
  }

  return (
    <Script
      id="property-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQPage Schema (JSON-LD only – do not duplicate with microdata on same page)
export function FAQPageSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const validFaqs = faqs.filter(
    (faq) => typeof faq.question === "string" && faq.question.trim() !== "" && typeof faq.answer === "string" && faq.answer.trim() !== ""
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.trim(),
      },
    })),
  };

  return (
    <script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// LocalBusiness Schema (RealEstateAgent)
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Celeste Abode",
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
    "@id": "https://www.celesteabode.com/#localbusiness",
    url: "https://www.celesteabode.com/",
    telephone: "+91 9818735258",
    priceRange: "₹",
    description:
      "Independent real estate consulting in Delhi NCR for buyers and investors seeking RERA-safe, data-led property decisions across Noida and Yamuna Expressway.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "615, 6th Floor, Galaxy Blue Sapphire Plaza, Sector 4",
      addressLocality: "Greater Noida (West)",
      addressRegion: "Uttar Pradesh",
      postalCode: "201309",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6076655,
      longitude: 77.4354885,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      { "@type": "City", name: "Noida" },
      { "@type": "City", name: "Greater Noida" },
      { "@type": "City", name: "Gurugram" },
      { "@type": "City", name: "Delhi" },
      { "@type": "City", name: "Ghaziabad" },
      { "@type": "City", name: "Lucknow" },
      { "@type": "AdministrativeArea", name: "Yamuna Expressway" },
      { "@type": "AdministrativeArea", name: "Noida Expressway" },
    ],
    sameAs: [
      "https://www.instagram.com/celesteabode/",
      "https://www.linkedin.com/company/celeste-abode/",
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
    description: "Independent real estate consulting in Delhi NCR for buyers and investors seeking RERA-safe, data-led property decisions across Noida and Yamuna Expressway.",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Celeste Abode",
      "@id": "https://www.celesteabode.com/#organization",
      logo: {
        "@type": "ImageObject",
        url: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
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
    slogan: "Independent real estate advisory services focused on clarity, compliance, and long-term value.",
    description: "Independent real estate consulting in Delhi NCR for buyers and investors seeking RERA-safe, data-led property decisions across Noida and Yamuna Expressway.",
    logo: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
    url: "https://www.celesteabode.com",
    sameAs: [
      "https://www.instagram.com/celesteabode/",
      "https://www.linkedin.com/company/celeste-abode/",
    ],
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
        url: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
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

// WebPage Schema – for static location/SEO pages (e.g. villa-in-noida-extension, plots-in-noida)
export function WebPageSchema({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  const baseUrl = "https://www.celesteabode.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    url: url.startsWith("http") ? url : `${baseUrl}${url}`,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Celeste Abode",
      "@id": `${baseUrl}/#organization`,
      logo: {
        "@type": "ImageObject",
        url: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
      },
    },
    ...(image && {
      image: image.startsWith("http") ? image : `${baseUrl}${image}`,
    }),
  };

  return (
    <script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Location Page Schema – for dynamic location pages (e.g. /properties-in-noida)
export function LocationPageSchema({
  name,
  description,
  url,
  image,
  locationName,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  locationName: string;
}) {
  const baseUrl = "https://www.celesteabode.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    url: url.startsWith("http") ? url : `${baseUrl}${url}`,
    inLanguage: "en-IN",
    about: {
      "@type": "Place",
      name: locationName,
    },
    publisher: {
      "@type": "Organization",
      name: "Celeste Abode",
      "@id": `${baseUrl}/#organization`,
      logo: {
        "@type": "ImageObject",
        url: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
      },
    },
    ...(image && {
      image: image.startsWith("http") ? image : `${baseUrl}${image}`,
    }),
  };

  return (
    <Script
      id="location-page-schema"
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
