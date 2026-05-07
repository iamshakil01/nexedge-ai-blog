// SERVER COMPONENT — Bottom CTA / community join section

export default function CtaBanner() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-28">
      <div className="relative rounded-2xl overflow-hidden"
           style={{
             background: "linear-gradient(135deg, rgba(8,145,178,0.12) 0%, rgba(37,99,235,0.08) 60%, rgba(13,18,32,0.98) 100%)",
             border: "1px solid rgba(6,182,212,0.18)",
           }}>

        {/* Top glow */}
        <div aria-hidden="true" className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none"
             style={{
               width: "500px", height: "200px",
               background: "radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 70%)",
               filter: "blur(40px)",
             }} />

        {/* Decorative grid */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-30"
             style={{
               backgroundImage: "linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)",
               backgroundSize: "40px 40px",
             }} />

        <div className="relative px-8 py-16 md:py-20 text-center">

          <div className="tag-pill inline-flex mb-6">Join the Community</div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5"
              style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Stay ahead of the
            <br />
            <span className="gradient-text">AI curve</span>
          </h2>

          <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
            Create a free account to leave reviews, join discussions,
            and get the most out of NexEdge AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/register"
               className="btn-glow px-10 py-3.5 rounded-xl text-base font-bold inline-flex items-center gap-2">
              Create Free Account
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/blog"
               className="btn-ghost-custom px-10 py-3.5 rounded-xl text-base font-bold">
              Browse Articles
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
            Free forever · No spam · Cancel anytime
          </p>

        </div>
      </div>
    </section>
  );
}
