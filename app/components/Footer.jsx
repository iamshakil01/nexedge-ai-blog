import Logo from "./Logo/page.jsx";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Articles", href: "/blog" },
  { label: "Register", href: "/register" },
  { label: "Sign In",  href: "/login" },
];

const TOPIC_LINKS = [
  { label: "Artificial Intelligence", href: "/blog" },
  { label: "Machine Learning",        href: "/blog" },
  { label: "Tech News",               href: "/blog" },
  { label: "Tools & Software",        href: "/blog" },
  { label: "Tutorials",               href: "/blog" },
  { label: "Opinion",                 href: "/blog" },
];

const SOCIAL_LINKS = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M12.6 1h2.4L9.7 6.8 16 15h-4.5l-3.8-5-4.4 5H.9l5.7-6.5L0 1h4.6l3.4 4.6L12.6 1zm-.8 12.6h1.3L4.3 2.3H2.9l8.9 11.3z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 1.1C0 .5.5 0 1.1 0h13.8C15.5 0 16 .5 16 1.1v13.8c0 .6-.5 1.1-1.1 1.1H1.1C.5 16 0 15.5 0 14.9V1.1zM4.8 13.4V6.2H2.4v7.2h2.4zM3.6 5.2c.8 0 1.3-.6 1.3-1.3C4.9 3.2 4.4 2.6 3.6 2.6c-.8 0-1.3.6-1.3 1.3 0 .7.5 1.3 1.3 1.3zm9.8 8.2v-4c0-2.1-.5-3.8-3-3.8-1.2 0-2 .7-2.4 1.3h-.1V6.2H5.6v7.2H8V9.8c0-1 .2-2 1.5-2 1.2 0 1.2 1.1 1.2 2v3.6h2.7z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/iamshakil01/nexedge-ai-blog",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.6 0 0 3.6 0 8c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4C13.7 14.5 16 11.5 16 8c0-4.4-3.6-8-8-8z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M15.8 4.8s-.2-1.3-.8-1.9c-.7-.8-1.6-.8-2-.8C11.1 2 8 2 8 2s-3.1 0-5 .1c-.4 0-1.3 0-2 .8-.6.6-.8 1.9-.8 1.9S0 6.2 0 7.6v1.3c0 1.4.2 2.8.2 2.8s.2 1.3.8 1.9c.7.8 1.7.7 2.2.8C4.8 14.5 8 14.5 8 14.5s3.1 0 5-.1c.4 0 1.3 0 2-.8.6-.6.8-1.9.8-1.9s.2-1.4.2-2.8V7.6c0-1.4-.2-2.8-.2-2.8zM6.4 10.3V5.7l5.2 2.3-5.2 2.3z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(6,182,212,0.08)",
      background: "rgba(6,9,16,0.98)",
    }}>

      {/* ── Main footer content ──────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <a href="/"><Logo size="sm" /></a>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Intelligent Future Solutions — deep dives into AI, machine learning,
              and the tools shaping tomorrow.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label}
                   href={s.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label={s.label}
                   className="social-icon w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest"
               style={{ color: "var(--accent-cyan)" }}>
              Navigation
            </p>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}
                   className="text-sm w-fit transition-colors duration-200 hover:text-white"
                   style={{ color: "var(--text-secondary)" }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 — Topics */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest"
               style={{ color: "var(--accent-cyan)" }}>
              Topics
            </p>
            <div className="flex flex-col gap-2.5">
              {TOPIC_LINKS.map((link) => (
                <a key={link.label} href={link.href}
                   className="text-sm w-fit transition-colors duration-200 hover:text-white"
                   style={{ color: "var(--text-secondary)" }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 — About / tagline */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest"
               style={{ color: "var(--accent-cyan)" }}>
              About
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              NexEdge AI is a premium blog platform focused on making
              cutting-edge AI knowledge accessible to everyone.
            </p>

            {/* Status badge */}
            <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg w-fit"
                 style={{
                   background: "rgba(16,185,129,0.07)",
                   border: "1px solid rgba(16,185,129,0.18)",
                 }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ background: "#10b981" }} />
                <span className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: "#10b981" }} />
              </span>
              <span className="text-xs font-medium" style={{ color: "#10b981" }}>
                All systems operational
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} NexEdge AI. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <a key={item} href="#"
                 className="text-xs transition-colors duration-200 hover:text-white"
                 style={{ color: "var(--text-muted)" }}>
                {item}
              </a>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}
