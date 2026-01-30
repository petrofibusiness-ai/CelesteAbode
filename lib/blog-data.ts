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
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Is Noida Still a Safe Place to Buy Property in 2026?",
    slug: "is-noida-safe-to-buy-property-2026",
    excerpt:
      "A clear-eyed look at Noida's real estate in 2026: market strength, infrastructure, RERA safety, and how to invest with confidence.",
    category: "Market Analysis",
    readTime: "8 min read",
    date: "January 30, 2026",
    image: "/NOIDA.avif",
    featured: true,
    views: "1.2K",
  },
  {
    id: 2,
    title: "Yamuna Expressway: The Next Growth Corridor of Delhi NCR",
    slug: "yamuna-expressway-growth-corridor-delhi-ncr",
    excerpt:
      "Why the Yamuna Expressway has become Delhi NCR's most talked-about growth corridor: infrastructure, price momentum, and how to invest wisely.",
    category: "Location Intelligence",
    readTime: "9 min read",
    date: "January 30, 2026",
    image: "/YAMUNA.avif",
    featured: true,
    views: "980",
  },
  {
    id: 3,
    title: "Noida vs Greater Noida: Investment Analysis 2026",
    slug: "noida-vs-greater-noida-investment-2026",
    excerpt:
      "A clear comparison of Noida and Greater Noida: prices, connectivity, infrastructure, and where to invest for the next 3–5 years.",
    category: "Market Analysis",
    readTime: "10 min read",
    date: "January 30, 2026",
    image: "/GREATER NOIDA.avif",
    featured: true,
    views: "1.1K",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
