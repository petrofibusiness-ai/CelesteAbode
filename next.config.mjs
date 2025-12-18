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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75, 80, 85, 90, 95],
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
        ],
      },
    ];
  },
  // Experimental features for better performance
  // Note: optimizeCss requires 'critters' package - disabled to avoid build errors
  // experimental: {
  //   optimizeCss: true,
  // },
  // Redirects from numeric project URLs to slug-based URLs
  async redirects() {
    return [
      {
        source: '/projects/1',
        destination: '/projects/arihant-abode',
        permanent: true,
      },
      {
        source: '/projects/2',
        destination: '/projects/spring-elmas',
        permanent: true,
      },
      {
        source: '/projects/3',
        destination: '/projects/eternia-residences',
        permanent: true,
      },
      {
        source: '/projects/4',
        destination: '/projects/rg-pleiaddes',
        permanent: true,
      },
      {
        source: '/projects/5',
        destination: '/projects/irish-platinum',
        permanent: true,
      },
      {
        source: '/projects/6',
        destination: '/projects/elite-x',
        permanent: true,
      },
      {
        source: '/projects/7',
        destination: '/projects/ace-hanei',
        permanent: true,
      },
      {
        source: '/projects/8',
        destination: '/projects/the-brook-and-rivulet',
        permanent: true,
      },
      {
        source: '/projects/9',
        destination: '/projects/renox-thrive',
        permanent: true,
      },
      {
        source: '/projects/10',
        destination: '/projects/civitech-strings',
        permanent: true,
      },
      {
        source: '/projects/11',
        destination: '/projects/forest-walk-villa',
        permanent: true,
      },
      {
        source: '/projects/12',
        destination: '/projects/vvip',
        permanent: true,
      },
      {
        source: '/projects/13',
        destination: '/projects/panchsheel-greens-ii',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
