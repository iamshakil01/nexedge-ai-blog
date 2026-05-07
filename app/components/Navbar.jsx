import Logo       from "./Logo/page.jsx";
import NavActions from "./client/NavActions/page.jsx";

export default function Navbar() {
  return (
    <header
      style={{
        background: "rgba(8,12,20,0.80)",
        borderBottom: "1px solid rgba(6,182,212,0.10)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        <a href="/" className="flex items-center">
          <Logo />
        </a>

        <div className="flex items-center gap-1">
          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-1 mr-2">
            <a href="/"
               style={{ color: "var(--text-secondary)" }}
               className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-all duration-200 hover:text-white">
              Home
            </a>
            <a href="/blog"
               style={{ color: "var(--text-secondary)" }}
               className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-all duration-200 hover:text-white">
              Articles
            </a>
          </nav>

          {/* Auth actions — client component */}
          <NavActions />
        </div>

      </div>
    </header>
  );
}
