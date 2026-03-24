export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  featured: boolean;
  views?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  /** Taller hero (full viewport) for flagship project stories */
  heroFullscreen?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Is Investing in Noida Property a Smart Choice in 2026? Expert Guide",
    slug: "is-noida-safe-to-buy-property-2026",
    excerpt:
      "A clear-eyed look at Noida's real estate in 2026: market strength, infrastructure, RERA safety, and how to invest with confidence.",
    category: "Market Analysis",
    readTime: "8 min read",
    date: "January 25, 2026",
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/is_noida_still_a_safe_place.png",
    featured: true,
    views: "1.2K",
    metaTitle: "Is Investing in Noida Property a Smart Choice in 2026? Expert Guide",
    metaDescription: "Planning to buy property in Noida in 2026? Explore safety, infrastructure growth, and market trends to make a smart investment. Connect with experts today.",
    ogImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/is_noida_still_a_safe_place.png",
    ogImageAlt: "Is Investing in Noida Property a Smart Choice in 2026",
  },
  {
    id: 2,
    title: "Why Yamuna Expressway is NCR's Next Real Estate Investment Hotspot",
    slug: "yamuna-expressway-growth-corridor-delhi-ncr",
    excerpt:
      "Explore why Yamuna Expressway is emerging as Delhi NCR's fastest-growing real estate corridor. Discover investment potential and connect with property experts today.",
    category: "Location Intelligence",
    readTime: "9 min read",
    date: "January 29, 2026",
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/yamuna_expressway.png",
    featured: true,
    views: "980",
    metaTitle: "Why Yamuna Expressway is NCR's Next Real Estate Investment Hotspot",
    metaDescription: "Explore why Yamuna Expressway is emerging as Delhi NCR's fastest-growing real estate corridor. Discover investment potential and connect with property experts today.",
    ogImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/yamuna_expressway.png",
    ogImageAlt: "Why Yamuna Expressway is NCR's Next Real Estate Investment Hotspot",
  },
  {
    id: 3,
    title: "Noida or Greater Noida: Which is Better for Property Investment in 2026?",
    slug: "noida-vs-greater-noida-investment-2026",
    excerpt:
      "A clear comparison of Noida and Greater Noida: prices, connectivity, infrastructure, and where to invest for the next 3–5 years.",
    category: "Market Analysis",
    readTime: "10 min read",
    date: "February 3, 2026",
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/noida_vs_greater_noida.png",
    featured: true,
    views: "1.1K",
    metaTitle: "Noida or Greater Noida: Which is Better for Property Investment in 2026?",
    metaDescription: "Compare Noida and Greater Noida property investment opportunities in 2026. Discover prices, infrastructure growth, and ROI potential before buying property.",
    ogImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/blogs_hero_image/noida_vs_greater_noida.png",
    ogImageAlt: "Noida or Greater Noida: Which is Better for Property Investment in 2026?",
  },
  {
    id: 4,
    title: "Jewar Airport Impact on NCR Real Estate: Investment Opportunities 2026",
    slug: "jewar-airport-ncr-property-buyers-2026",
    excerpt:
      "The Noida International Airport at Jewar is reshaping NCR real estate. Here's how it affects prices, which micro-markets benefit, and how to invest without overpaying.",
    category: "Location Intelligence",
    readTime: "9 min read",
    date: "February 9, 2026",
    image: "/YAMUNA.avif",
    featured: true,
    views: "890",
    metaTitle: "Jewar Airport Impact on NCR Real Estate: Investment Opportunities 2026",
    metaDescription: "Discover how Jewar Airport is boosting NCR real estate and creating new investment opportunities. Explore property options and connect with experts today.",
    ogImage: "/YAMUNA.avif",
    ogImageAlt: "Jewar Airport Impact on NCR Real Estate: Investment Opportunities 2026",
  },
  {
    id: 5,
    title: "Forest Walk Villas Ghaziabad: Luxury 4BHK Villa Living on NH-24",
    slug: "forest-walk-villa-ghaziabad-luxury-living-2026",
    excerpt:
      "Discover why Forest Walk Villas on NH24 Ghaziabad is one of the most sought-after places to live in 2026 with unmatched nature, luxury amenities and excellent connectivity.",
    category: "Project Spotlight",
    readTime: "11 min read",
    date: "January 30, 2026",
    image: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/forest-walk-villa/forest-walk-villa_hero.avif",
    featured: true,
    views: "760",
    metaTitle: "Forest Walk Villa Ghaziabad | Luxury 4BHK Villa Living on NH-24",
    metaDescription: "Explore Forest Walk Villa in Ghaziabad, a luxury 4BHK villa township on NH-24 with premium amenities and green living. Discover pricing and connect with property experts today.",
    ogImage: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/forest-walk-villa/forest-walk-villa_hero.avif",
    ogImageAlt: "Forest Walk Villa Ghaziabad | Luxury 4BHK Villa Living on NH-24",
  },
  {
    id: 6,
    title: "Top Upcoming Luxury Real Estate Projects in Noida & Greater Noida for 2026",
    slug: "upcoming-luxury-projects-noida-greater-noida-2026",
    excerpt:
      "A simple, fact‑checked guide to the key upcoming luxury projects in Noida and Greater Noida, how their micro‑markets differ, and what to check before you buy.",
    category: "Project Shortlist",
    readTime: "11 min read",
    date: "March 16, 2026",
    image: "/hero-.avif",
    featured: true,
    views: "0",
    metaTitle: "Upcoming Luxury Projects in Noida & Greater Noida (2026) | Celeste Abode",
    metaDescription:
      "Explore upcoming luxury real estate projects in Noida and Greater Noida, compare key micro‑markets, and see how premium launches stack up for 2026.",
    ogImage: "/hero-.avif",
    ogImageAlt: "Upcoming luxury projects in Noida and Greater Noida",
  },
  {
    id: 7,
    title: "Sobha Rivana Greater Noida West: RERA, Price, Floor Plans & Location (Sector 1)",
    slug: "sobha-rivana-greater-noida-west-rera-sector-1",
    excerpt:
      "Sobha Limited's flagship launch in Sector 1, Greater Noida West. We unpack UP RERA, connectivity, 2/3/4 BHK, amenities, and the price band buyers are hearing in early 2026.",
    category: "Project Spotlight",
    readTime: "9 min read",
    date: "March 22, 2026",
    image:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-entrance.jpg",
    featured: true,
    views: "0",
    heroFullscreen: true,
    metaTitle:
      "Sobha Rivana Greater Noida West | RERA, Price, 2/3/4 BHK Floor Plans, Sector 1 Location",
    metaDescription:
      "Sobha Rivana Greater Noida West (Sector 1): Sobha Limited's premium launch, 2/3/4 BHK, location and amenities, indicative price, UP RERA registration, and how Celeste Abode helps you shortlist and buy with clarity across Delhi NCR.",
    ogImage:
      "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/shobha-rivana/shobha-rivana-entrance.jpg",
    ogImageAlt: "Sobha Rivana Greater Noida West Sector 1 apartments RERA",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const others = blogPosts.filter((p) => p.slug !== currentSlug);
  if (currentSlug === "sobha-rivana-greater-noida-west-rera-sector-1") {
    const prioritySlugs = [
      "upcoming-luxury-projects-noida-greater-noida-2026",
      "noida-vs-greater-noida-investment-2026",
      "jewar-airport-ncr-property-buyers-2026",
      "yamuna-expressway-growth-corridor-delhi-ncr",
    ];
    const picked: BlogPost[] = [];
    for (const s of prioritySlugs) {
      const post = others.find((p) => p.slug === s);
      if (post) picked.push(post);
    }
    const rest = others.filter((p) => !prioritySlugs.includes(p.slug));
    return [...picked, ...rest].slice(0, limit);
  }
  return others.slice(0, limit);
}
