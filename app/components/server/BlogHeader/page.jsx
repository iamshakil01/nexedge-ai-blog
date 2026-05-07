export default function BlogHeader() {
  return (
    <div className="mb-16">
      <div className="tag-pill inline-flex mb-5">All Articles</div>
      <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}>
        The <span className="gradient-text">Archive</span>
      </h1>
      <p className="text-lg max-w-lg" style={{ color: "var(--text-secondary)" }}>
        Every AI insight, tech deep-dive, and story — all in one place.
      </p>
      <div className="shimmer-line mt-8 max-w-xs" />
    </div>
  );
}
