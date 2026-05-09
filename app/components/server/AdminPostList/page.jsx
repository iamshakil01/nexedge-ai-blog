// SERVER COMPONENT — list of all posts for admin dashboard

export default function AdminPostList({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <div className="mt-16">
      <div className="shimmer-line mb-10" />

      <div className="mb-6">
        <h2 className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
          All Articles
          <span className="ml-3 text-base font-bold" style={{ color: "var(--accent-cyan)" }}>
            ({posts.length})
          </span>
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Click Edit to modify any article.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {posts.map((post) => {
          const date = (post.publishedDate || post.createdAt)
            ? new Date(post.publishedDate || post.createdAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })
            : null;

          return (
            <div key={post._id}
                 className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                 style={{
                   background: "var(--bg-surface)",
                   border: "1px solid rgba(255,255,255,0.06)",
                 }}>

              {/* Thumbnail */}
              {post.thumbnail ? (
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                     style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <img src={post.thumbnail} alt={post.title}
                       style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center"
                     style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.15)" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                       style={{ color: "var(--accent-cyan)" }}>
                    <path d="M3 5h14M3 10h9M3 15h11" stroke="currentColor"
                          strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              )}

              {/* Info */}
              <div className="flex-grow min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>
                  {post.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  {post.category && (
                    <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(6,182,212,0.08)",
                            border: "1px solid rgba(6,182,212,0.15)",
                            color: "var(--accent-cyan)",
                          }}>
                      {post.category}
                    </span>
                  )}
                  {date && (
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{date}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a href={`/blog/${post.slug}`}
                   className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                   style={{
                     background: "rgba(255,255,255,0.04)",
                     border: "1px solid rgba(255,255,255,0.08)",
                     color: "var(--text-secondary)",
                   }}>
                  View
                </a>
                <a href={`/admin/edit/${post.slug}`}
                   className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                   style={{
                     background: "rgba(6,182,212,0.08)",
                     border: "1px solid rgba(6,182,212,0.2)",
                     color: "var(--accent-cyan)",
                   }}>
                  Edit
                </a>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
