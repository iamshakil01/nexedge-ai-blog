const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Dynamic robots.txt generation
 * Provides crawl directives for search engines
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/blog/',
          '/category/',
          '/tag/',
          '/sitemap.xml',
          '/feed.xml'
        ],
        disallow: [
          '/admin/',
          '/login/',
          '/register/',
          '/api/',
          '/_next/',
          '/*.json',
          '/*.js'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/blog/',
          '/category/',
          '/tag/'
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/login/',
          '/register/'
        ],
        crawlDelay: 0
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/blog/',
          '/category/',
          '/tag/'
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/login/',
          '/register/'
        ]
      },
      {
        userAgent: 'Slurp',
        allow: [
          '/',
          '/blog/',
          '/category/',
          '/tag/'
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/login/',
          '/register/'
        ],
        crawlDelay: 1
      }
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/feed.xml`
    ]
  };
}