import "./globals.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default:  "SheraShop — Your Ultimate Shopping Destination",
    template: "%s | SheraShop",
  },
  description: "Discover the best products, deals, and shopping tips at SheraShop. Your go-to blog for all things shopping and lifestyle.",
  keywords:    ["shopping", "deals", "products", "lifestyle", "blog", "SheraShop"],
  authors:     [{ name: "SheraShop Team" }],
  icons: {
    icon:       [{ url: "/favicon.png", type: "image/png", sizes: "208x208" }],
    shortcut:   "/favicon.png",
    apple:      "/favicon.png",
  },
  openGraph: {
    title:       "SheraShop — Your Ultimate Shopping Destination",
    description: "Discover the best products, deals, and shopping tips at SheraShop. Your go-to blog for all things shopping and lifestyle.",
    type:        "website",
    images:      [{ url: "/favicon.png", width: 208, height: 208, alt: "SheraShop" }],
  },
  twitter: {
    card:        "summary",
    title:       "SheraShop",
    description: "Your Ultimate Shopping Destination — Deals & Lifestyle Blog",
    images:      ["/favicon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="dark" lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NZ2FHJS4WX" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NZ2FHJS4WX');
          `,
        }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)", fontFamily: "'Inter', system-ui, sans-serif" }}
        className="min-h-screen flex flex-col antialiased"
      >
        <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
        <div className="ambient-glow ambient-glow-2" aria-hidden="true" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
