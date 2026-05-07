const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2l2 6h6l-5 3.5 2 6L11 14l-5 3.5 2-6L3 8h6l2-6z"
              stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AI-Focused Content",
    desc:  "Every article covers real AI tools, trends, and strategies you can apply today.",
    color: "#06b6d4",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 6v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Real-Time Publishing",
    desc:  "Powered by MongoDB — publish a post and it's live instantly, no rebuilds needed.",
    color: "#38bdf8",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16M3 11h10M3 17h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Clean Reading",
    desc:  "A distraction-free experience that puts the content front and center, always.",
    color: "#2563eb",
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">

      <div className="text-center mb-16">
        <div className="tag-pill inline-flex mb-5">Why NexEdge AI</div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}>
          Built for the
          <br />
          <span className="gradient-text">AI generation</span>
        </h2>
        <p className="text-lg max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
          Premium content on the technologies defining our future.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {features.map((f) => (
          <div key={f.title} className="glass-card p-7 flex flex-col gap-5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{ background: `${f.color}15`, border: `1px solid ${f.color}25`, color: f.color }}>
              {f.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
