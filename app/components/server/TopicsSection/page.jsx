// SERVER COMPONENT — Topics/Categories browse section
// Hover effects via CSS only (no event handlers)

const topics = [
  { name: "Artificial Intelligence", icon: "🤖", color: "#06b6d4" },
  { name: "Machine Learning",        icon: "🧠", color: "#38bdf8" },
  { name: "Tech News",               icon: "📡", color: "#2563eb" },
  { name: "Tools & Software",        icon: "🛠️", color: "#0891b2" },
  { name: "Tutorials",               icon: "📚", color: "#6366f1" },
  { name: "Opinion",                 icon: "💡", color: "#8b5cf6" },
];

export default function TopicsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">

      <div className="shimmer-line mb-16" />

      <div className="text-center mb-10">
        <div className="tag-pill inline-flex mb-4">Browse by Topic</div>
        <h2 className="text-3xl font-black"
            style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>
          What are you interested in?
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {topics.map((topic) => (
          <a key={topic.name}
             href="/blog"
             className="topic-card group flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
             style={{
               background: "var(--bg-surface)",
               border: "1px solid rgba(255,255,255,0.06)",
               "--topic-color": topic.color,
             }}>
            <span className="text-2xl">{topic.icon}</span>
            <span className="text-xs font-semibold leading-tight"
                  style={{ color: "var(--text-secondary)" }}>
              {topic.name}
            </span>
          </a>
        ))}
      </div>

    </section>
  );
}
