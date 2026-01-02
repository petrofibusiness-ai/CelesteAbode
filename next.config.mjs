/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production: Enable strict checks (disable only if absolutely necessary)
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV !== 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== 'production',
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes - reduced for mobile performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Mobile-optimized quality settings - lower quality for faster LCP
    qualities: [60, 65, 70, 75, 80, 85, 90, 95],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize for mobile and desktop performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Modern JavaScript target - configured via .browserslistrc
  // SWC minification is enabled by default in Next.js 15
  // Target modern browsers to avoid unnecessary polyfills
  // Next.js respects browserslist configuration automatically
  // Optimize bundle size
  experimental: {
    optimizePackageImports: [
      'framer-motion', 
      'lucide-react', 
      '@radix-ui/react-accordion', 
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
    ],
  },
  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for security
  reactStrictMode: true, // Enable React strict mode
  // Headers configuration (additional to middleware)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/propertyhero.avif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logoceleste.avif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Experimental features for better performance
  // Note: optimizeCss requires 'critters' package - disabled to avoid build errors
  // experimental: {
  //   optimizeCss: true,
  // },
  // Redirects from /projects to /properties and numeric project URLs to slug-based URLs
  async redirects() {
    return [
      // Redirect main projects page to properties page
      {
        source: '/projects',
        destination: '/properties',
        permanent: true,
      },
      // Redirect individual project pages to property pages
      {
        source: '/projects/:slug',
        destination: '/properties/:slug',
        permanent: true,
      },
      {
        source: '/projects/1',
        destination: '/properties/arihant-abode',
        permanent: true,
      },
      {
        source: '/projects/2',
        destination: '/properties/spring-elmas',
        permanent: true,
      },
      {
        source: '/projects/3',
        destination: '/properties/eternia-residences',
        permanent: true,
      },
      {
        source: '/projects/4',
        destination: '/properties/rg-pleiaddes',
        permanent: true,
      },
      {
        source: '/projects/5',
        destination: '/properties/irish-platinum',
        permanent: true,
      },
      {
        source: '/projects/6',
        destination: '/properties/elite-x',
        permanent: true,
      },
      {
        source: '/projects/7',
        destination: '/properties/ace-hanei',
        permanent: true,
      },
      {
        source: '/projects/8',
        destination: '/properties/the-brook-and-rivulet',
        permanent: true,
      },
      {
        source: '/projects/9',
        destination: '/properties/renox-thrive',
        permanent: true,
      },
      {
        source: '/projects/10',
        destination: '/properties/civitech-strings',
        permanent: true,
      },
      {
        source: '/projects/11',
        destination: '/properties/forest-walk-villa',
        permanent: true,
      },
      {
        source: '/projects/12',
        destination: '/properties/vvip',
        permanent: true,
      },
      {
        source: '/projects/13',
        destination: '/properties/panchsheel-greens-ii',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
