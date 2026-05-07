import Logo from "./Logo/page.jsx";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(6,182,212,0.10)",
      background: "rgba(8,12,20,0.95)",
    }}>
      <div className="max-w-6xl mx-auto px-6 py-14">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          <div className="flex flex-col gap-4">
            <a href="/"><Logo size="sm" /></a>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Intelligent Future Solutions — AI-powered insights for the modern world.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home",     href: "/" },
                { label: "Articles", href: "/blog" },
                { label: "Write",    href: "/admin" },
              ].map((link) => (
                <a key={link.href} href={link.href}
                  style={{ color: "var(--text-secondary)" }}
                  className="text-sm hover:text-white transition-colors duration-200 w-fit">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="section-divider my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} NexEdge AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                 style={{ background: "var(--accent-cyan)" }} />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              All systems operational
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
