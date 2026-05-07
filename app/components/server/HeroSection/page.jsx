// SERVER COMPONENT — Homepage hero with animated badge + bold headline

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">

      {/* Background grid */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 30%, transparent 100%)",
      }} />

      {/* Radial glow center */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
           style={{
             width: "800px", height: "400px",
             background: "radial-gradient(ellipse at center top, rgba(6,182,212,0.10) 0%, transparent 70%)",
           }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">

        {/* Live badge */}
        <div className="inline-flex items-center gap-2 mb-8 tag-pill">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "var(--accent-cyan)" }} />
            <span className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "var(--accent-cyan)" }} />
          </span>
          AI &amp; Tech · Intelligent Future Solutions
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.02] mb-6"
            style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>
          Explore the
          <br />
          <span className="gradient-text">Future of AI</span>
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
           style={{ color: "var(--text-secondary)" }}>
          In-depth articles on artificial intelligence, machine learning,
          and the tools redefining how we work and think.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/blog"
             className="btn-glow px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
            Read Latest Articles
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/register"
             className="btn-ghost-custom px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
            Join the Community
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Scroll to explore
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               style={{ color: "var(--text-muted)" }} className="animate-bounce">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

      </div>
    </section>
  );
}
