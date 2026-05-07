import "./globals.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export const metadata = {
  title: "NexEdge AI — Intelligent Future Solutions",
  description: "Deep dives into artificial intelligence, global tech trends, and the tools shaping tomorrow.",
  keywords: "AI, artificial intelligence, technology, machine learning, blog",
  openGraph: {
    title: "NexEdge AI",
    description: "Intelligent Future Solutions — AI & Tech Blog",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="dark" lang="en">
      <head>
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
