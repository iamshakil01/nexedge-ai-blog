import Logo from "./Logo/page.jsx";

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

        <nav className="flex items-center gap-1">
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
          <a href="/admin"
            className="btn-glow ml-3 px-5 py-2 rounded-lg text-sm inline-flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Write
          </a>
        </nav>

      </div>
    </header>
  );
}
