import "./globals.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { OrganizationSchema, WebSiteSchema } from "./components/seo/JsonLd";

/** @type {import('next').Metadata} */
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "NexEdge-Ai — Intelligent Future Solutions",
    template: "%s | NexEdge-Ai",
  },
  description: "Deep dives into artificial intelligence, global tech trends, and the tools shaping tomorrow.",
  keywords: [
    "AI",
    "artificial intelligence",
    "machine learning",
    "tech blog",
    "NexEdge-Ai",
    "technology",
    "data science",
    "deep learning",
    "neural networks"
  ],
  authors: [{ name: "NexEdge-Ai", url: process.env.NEXT_PUBLIC_BASE_URL }],
  creator: "NexEdge-Ai",
  publisher: "NexEdge-Ai",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "NexEdge-Ai — Intelligent Future Solutions",
    description: "Deep dives into artificial intelligence, global tech trends, and the tools shaping tomorrow.",
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "NexEdge-Ai",
    locale: "en_US",
    images: [
      {
        url: "/og?type=home",
        width: 1200,
        height: 630,
        alt: "NexEdge-Ai - Intelligent Future Solutions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexEdge-Ai — Intelligent Future Solutions",
    description: "Deep dives into artificial intelligence, global tech trends, and the tools shaping tomorrow.",
    images: ["/og?type=home"],
    site: "@nexedgeai",
    creator: "@nexedgeai",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
    types: {
      "application/rss+xml": [
        { url: "feed.xml", title: "NexEdge-Ai RSS Feed" },
      ],
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "208x208" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: "#0a0a0a",
  },
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="dark" lang="en" suppressHydrationWarning>
      <head>
        {/* AdSense Script - Add your AdSense ID to environment variables */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}

        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        
        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Google Fonts - Optimized loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* JSON-LD Structured Data */}
        <OrganizationSchema />
        <WebSiteSchema />
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NZ2FHJS4WX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NZ2FHJS4WX', {
                send_page_view: true,
                anonymize_ip: true
              });
            `,
          }}
        />
        
        {/* Schema.org search action */}
        <link rel="search" type="application/opensearchdescription+xml" title="NexEdge-Ai" href="/opensearch.xml" />
      </head>
      <body
        style={{
          backgroundColor: "var(--bg-base)",
          color: "var(--text-primary)",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
        className="min-h-screen flex flex-col antialiased selection:bg-primary/30 selection:text-primary-content"
      >
        {/* Ambient background effects */}
        <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
        <div className="ambient-glow ambient-glow-2" aria-hidden="true" />

        {/* Main content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow" role="main">
            {children}
          </main>
          <Footer />
        </div>

        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-content focus:rounded-md"
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}