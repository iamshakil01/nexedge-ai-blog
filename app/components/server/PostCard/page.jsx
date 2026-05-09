"use client";

export default function PostCard({ post, index = 0 }) {
  if (!post) return null;

  const date = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <a
      href={`/blog/${post.slug}`}
      className="glass-card flex flex-col overflow-hidden group cursor-pointer"
      style={{ textDecoration: "none" }}
    >
      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="relative overflow-hidden" style={{ height: "180px" }}>
          <img
            src={post.thumbnail}
            alt={post.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
            className="group-hover:scale-105"
            onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
          />
          {post.category && (
            <span className="absolute top-3 left-3 tag-pill text-xs">
              {post.category}
            </span>
          )}
        </div>
      )}

      {/* Top accent bar — no thumbnail */}
      {!post.thumbnail && (
        <div className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{ background: "linear-gradient(90deg, #06b6d4, #2563eb, transparent)" }} />
      )}

      <div className="p-6 flex flex-col gap-3 flex-grow">

        {/* Category + number */}
        <div className="flex items-center justify-between">
          {post.category && !post.thumbnail ? (
            <span className="tag-pill">{post.category}</span>
          ) : (
            <span className="post-number">#{String(index + 1).padStart(2, "0")}</span>
          )}
          {/* Arrow icon — appears on hover */}
          <div className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
               style={{ background: "rgba(6,182,212,0.15)" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                 style={{ color: "var(--accent-cyan)" }}>
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-cyan-400"
            style={{ color: "var(--text-primary)" }}>
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed line-clamp-3 flex-grow"
           style={{ color: "var(--text-secondary)" }}>
          {post.content.slice(0, 130)}...
        </p>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(6,182,212,0.08)",
                      border: "1px solid rgba(6,182,212,0.18)",
                      color: "var(--text-muted)",
                    }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Date + Read indicator */}
        <div className="flex items-center justify-between mt-1">
          {date && (
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{date}</span>
          )}
          <span className="read-link inline-flex items-center gap-1.5 text-sm font-semibold ml-auto"
                style={{ color: "var(--accent-cyan)" }}>
            Read
            <svg className="read-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

      </div>
    </a>
  );
}
