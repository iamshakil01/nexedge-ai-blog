export default function HeroSection() {
  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-28 pb-24">

      {/* Grid lines */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
      }} />

      <div className="relative text-center max-w-4xl mx-auto">

        <div className="inline-flex items-center gap-2.5 mb-8 tag-pill">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--accent-cyan)" }} />
          Intelligent Future Solutions · AI &amp; Tech Blog
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05] mb-7"
            style={{ color: "var(--text-primary)" }}>
          The Future of
          <br />
          <span className="gradient-text">AI Starts Here</span>
        </h1>

        <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-12"
           style={{ color: "var(--text-secondary)" }}>
          Deep dives into artificial intelligence, global tech trends,
          and the tools shaping tomorrow.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/blog"
             className="btn-glow px-9 py-3.5 rounded-xl text-base inline-flex items-center gap-2.5">
            Explore Articles
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/admin"
             className="btn-ghost-custom px-9 py-3.5 rounded-xl text-base inline-flex items-center gap-2.5">
            Start Writing
          </a>
        </div>

      </div>
    </section>
  );
}
