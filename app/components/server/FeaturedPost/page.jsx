// SERVER COMPONENT — Featured/latest post, large card

export default function FeaturedPost({ post }) {
  if (!post) return null;

  const date = post.publishedDate || post.createdAt
    ? new Date(post.publishedDate || post.createdAt).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : null;

  const readTime = Math.max(1, Math.ceil(post.content.split(" ").length / 200));

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">

      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-grow" style={{ background: "rgba(6,182,212,0.2)" }} />
        <span className="tag-pill">Featured</span>
        <div className="h-px flex-grow" style={{ background: "rgba(6,182,212,0.2)" }} />
      </div>

      <a href={`/blog/${post.slug}`}
         className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
         style={{
           background: "var(--bg-surface)",
           border: "1px solid rgba(6,182,212,0.10)",
           boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
         }}>

        <div className="grid md:grid-cols-2 gap-0">

          {/* Thumbnail */}
          <div className="relative overflow-hidden"
               style={{ minHeight: "280px", background: "var(--bg-elevated)" }}>
            {post.thumbnail ? (
              <img src={post.thumbnail} alt={post.title}
                   style={{ width: "100%", height: "100%", objectFit: "cover",
                            transition: "transform 0.5s ease" }}
                   className="group-hover:scale-105 absolute inset-0" />
            ) : (
              /* Placeholder when no thumbnail */
              <div className="absolute inset-0 flex items-center justify-center"
                   style={{
                     background: "linear-gradient(135deg, rgba(8,145,178,0.15), rgba(37,99,235,0.10))",
                   }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
                     style={{ color: "rgba(6,182,212,0.3)" }}>
                  <path d="M8 16h48M8 32h32M8 48h40" stroke="currentColor"
                        strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 md:hidden"
                 style={{ background: "linear-gradient(to top, var(--bg-surface) 0%, transparent 60%)" }} />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col justify-center gap-4">

            <div className="flex items-center gap-3 flex-wrap">
              {post.category && <span className="tag-pill">{post.category}</span>}
              {date && (
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{date}</span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-black leading-tight transition-colors duration-200 group-hover:text-cyan-400"
                style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>
              {post.title}
            </h2>

            <p className="text-sm leading-relaxed line-clamp-3"
               style={{ color: "var(--text-secondary)" }}>
              {post.content.slice(0, 200)}...
            </p>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(6,182,212,0.07)",
                          border: "1px solid rgba(6,182,212,0.15)",
                          color: "var(--text-muted)",
                        }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 pt-2"
                 style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                     style={{ background: "linear-gradient(135deg, #0891b2, #2563eb)", color: "#fff" }}>
                  N
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  NexEdge AI
                </span>
              </div>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>·</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {readTime} min read
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group-hover:text-cyan-400"
                    style={{ color: "var(--accent-cyan)" }}>
                Read Article
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>

          </div>
        </div>
      </a>
    </section>
  );
}
