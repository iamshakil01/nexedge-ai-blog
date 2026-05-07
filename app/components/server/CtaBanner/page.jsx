export default function CtaBanner() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-28">
      <div className="relative rounded-2xl overflow-hidden p-14 text-center" style={{
        background: "linear-gradient(135deg, rgba(8,145,178,0.14) 0%, rgba(37,99,235,0.08) 50%, rgba(13,18,32,0.95) 100%)",
        border: "1px solid rgba(6,182,212,0.20)",
      }}>

        {/* Glow orb */}
        <div aria-hidden="true"
             className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
             style={{
               background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
               filter: "blur(50px)",
             }} />

        <div className="relative">
          <div className="tag-pill inline-flex mb-6">Start Reading</div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5"
              style={{ color: "var(--text-primary)" }}>
            Ready to explore AI?
          </h2>

          <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
            Browse our full collection of AI and tech articles — curated for curious minds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/blog"
               className="btn-glow px-10 py-3.5 rounded-xl text-base inline-flex items-center gap-2">
              Browse All Articles
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/admin" className="btn-ghost-custom px-10 py-3.5 rounded-xl text-base">
              Publish Your Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
