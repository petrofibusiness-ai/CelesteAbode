import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // When a parent folder has another lockfile, Next may infer the wrong root; pin the app directory.
  outputFileTracingRoot: path.join(__dirname),
  // Production: Enable strict checks (disable only if absolutely necessary)
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV !== 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== 'production',
  },
  compress: true,
  poweredByHeader: false,
  // API route body size limit (only for metadata endpoints, not file uploads)
  // Large files bypass API routes via signed URLs
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Safe limit for metadata only
    },
    responseLimit: '8mb',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes - reduced for mobile performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Mobile-optimized quality settings - lower quality for faster LCP
    qualities: [60, 65, 70, 75, 80, 85, 90, 95],
    minimumCacheTTL: 3600, // 1 hour cache for dynamic property images (reduced from 1 year)
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
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      // Admin panel - enhanced security headers
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, must-revalidate'
          },
        ],
      },
      // API admin routes - strict security
      {
        source: '/api/admin/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, must-revalidate'
          },
        ],
      },
      {
        source: '/propertyhero.avif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      // Admin API routes - NO CACHING (removed to prevent stale data)
      // All admin routes use route-level headers for authoritative control
      // Immutable Asset Caching
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
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
      // Services, Philosophy, Vault: old URLs → new slugs
      { source: '/services', destination: '/real-estate-consulting-services', permanent: true },
      { source: '/philosophy', destination: '/advisory-philosophy', permanent: true },
      { source: '/vault', destination: '/real-estate-insights', permanent: true },
      // Redirect main projects page to properties page
      {
        source: '/projects',
        destination: '/properties',
        permanent: true,
      },
      // Specific project redirects (must come before generic /projects/:slug so they take precedence)
      // 1 - Greater Noida
      { source: '/projects/1', destination: '/properties-in-greater-noida/arihant-abode', permanent: true },
      { source: '/projects/arihant-abode', destination: '/properties-in-greater-noida/arihant-abode', permanent: true },
      // 2 - Greater Noida (already set)
      { source: '/projects/2', destination: '/properties-in-greater-noida/spring-elmas', permanent: true },
      { source: '/projects/spring-elmas', destination: '/properties-in-greater-noida/spring-elmas', permanent: true },
      // 3 - Greater Noida
      { source: '/projects/3', destination: '/properties-in-greater-noida/eternia-residences', permanent: true },
      { source: '/projects/eternia-residences', destination: '/properties-in-greater-noida/eternia-residences', permanent: true },
      // 4 - Greater Noida (already set)
      { source: '/projects/4', destination: '/properties-in-greater-noida/rg-pleiaddes', permanent: true },
      { source: '/projects/rg-pleiaddes', destination: '/properties-in-greater-noida/rg-pleiaddes', permanent: true },
      // 5 - Greater Noida
      { source: '/projects/5', destination: '/properties-in-greater-noida/irish-platinum', permanent: true },
      { source: '/projects/irish-platinum', destination: '/properties-in-greater-noida/irish-platinum', permanent: true },
      // 6 - Yamuna Expressway
      { source: '/projects/6', destination: '/properties-in-yamuna-expressway/elite-x', permanent: true },
      { source: '/projects/elite-x', destination: '/properties-in-yamuna-expressway/elite-x', permanent: true },
      // 7 - Greater Noida
      { source: '/projects/7', destination: '/properties-in-greater-noida/ace-hanei', permanent: true },
      { source: '/projects/ace-hanei', destination: '/properties-in-greater-noida/ace-hanei', permanent: true },
      // 8 - Greater Noida
      { source: '/projects/8', destination: '/properties-in-greater-noida/the-brook-and-rivulet', permanent: true },
      { source: '/projects/the-brook-and-rivulet', destination: '/properties-in-greater-noida/the-brook-and-rivulet', permanent: true },
      // 9 - Greater Noida
      { source: '/projects/9', destination: '/properties-in-greater-noida/renox-thrive', permanent: true },
      { source: '/projects/renox-thrive', destination: '/properties-in-greater-noida/renox-thrive', permanent: true },
      // 10 - Greater Noida
      { source: '/projects/10', destination: '/properties-in-greater-noida/civitech-strings', permanent: true },
      { source: '/projects/civitech-strings', destination: '/properties-in-greater-noida/civitech-strings', permanent: true },
      // 11 - Ghaziabad
      { source: '/projects/11', destination: '/properties-in-ghaziabad/forest-walk-villa', permanent: true },
      { source: '/projects/forest-walk-villa', destination: '/properties-in-ghaziabad/forest-walk-villa', permanent: true },
      // 12 - Greater Noida
      { source: '/projects/12', destination: '/properties-in-greater-noida/vvip', permanent: true },
      { source: '/projects/vvip', destination: '/properties-in-greater-noida/vvip', permanent: true },
      // 13 - Greater Noida
      { source: '/projects/13', destination: '/properties-in-greater-noida/panchsheel-greens-ii', permanent: true },
      { source: '/projects/panchsheel-greens-ii', destination: '/properties-in-greater-noida/panchsheel-greens-ii', permanent: true },
      // Fallback: any other /projects/:slug -> /properties/:slug
      {
        source: '/projects/:slug',
        destination: '/properties/:slug',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
