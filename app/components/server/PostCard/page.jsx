export default function PostCard({ post, index }) {
  return (
    <article className="glass-card flex flex-col overflow-hidden group">

      {/* Top accent bar */}
      <div className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: "linear-gradient(90deg, #06b6d4, #2563eb, transparent)" }} />

      <div className="p-6 flex flex-col gap-4 flex-grow">

        <div className="flex items-center justify-between">
          <span className="post-number">#{String(index + 1).padStart(2, "0")}</span>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
               style={{ background: "rgba(6,182,212,0.15)" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                 style={{ color: "var(--accent-cyan)" }}>
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h2 className="text-lg font-bold leading-snug line-clamp-2 transition-colors duration-200"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={(e) => {}}
        >
          <span className="group-hover:[color:var(--accent-cyan)] transition-colors duration-200">
            {post.title}
          </span>
        </h2>

        <p className="text-sm leading-relaxed line-clamp-3 flex-grow"
           style={{ color: "var(--text-secondary)" }}>
          {post.content.slice(0, 130)}...
        </p>

        <a href={`/blog/${post.slug}`}
           className="read-link mt-2 inline-flex items-center gap-2 text-sm font-semibold"
           style={{ color: "var(--accent-cyan)" }}>
          Read Article
          <svg className="read-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

      </div>
    </article>
  );
}
