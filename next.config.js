/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images from external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Configure redirects if needed
  async redirects() {
    return [
      // Example: redirect old blog URLs to new structure
      // {
      //   source: '/posts/:slug',
      //   destination: '/blog/:slug',
      //   permanent: true,
      // },
    ];
  },

  // Configure rewrites if needed
  async rewrites() {
    return [
      // Example: rewrite API routes
      // {
      //   source: '/api/:path*',
      //   destination: '/api/:path*',
      // },
    ];
  },

  // Environment variables for client-side
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID,
  },

  // Turbopack configuration for Next.js 16+
  turbopack: {
    resolveAlias: {
      '@': '.',
      '@/components': './app/components',
      '@/lib': './lib',
      '@/api': './app/api',
      '@/styles': './app/globals.css',
    },
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't include certain modules in client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },

  // Compression
  compress: true,

  // Generate source maps in production for debugging
  productionBrowserSourceMaps: false,

  // Output standalone for Docker deployment
  // output: 'standalone',

  // Powered by header
  poweredByHeader: false,
};

module.exports = nextConfig;