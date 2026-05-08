// SERVER COMPONENT — renders list of comments

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60)   return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M6.5 1l1.5 4H12L8.5 7.5l1.5 4L6.5 9.5 3 11.5l1.5-4L1 5h4L6.5 1z"
            fill={s <= rating ? "#f59e0b" : "rgba(255,255,255,0.1)"}
            stroke={s <= rating ? "#f59e0b" : "rgba(255,255,255,0.12)"}
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </div>
  );
}

export default function CommentList({ comments = [] }) {
  if (!comments || comments.length === 0) {
    return (
      <div
        className="flex flex-col items-center py-14 gap-3 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
             style={{ color: "var(--text-muted)", opacity: 0.4 }}>
          <path d="M6 8h24v16H20l-4 4v-4H6V8z"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinejoin="round"/>
        </svg>
        <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          No reviews yet. Be the first!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {comments.map((c, i) => (
        <div
          key={i}
          className="rounded-2xl p-5 flex flex-col gap-3"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Top row — avatar + name + time */}
          <div className="flex items-center gap-3">
            {/* Avatar initials */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-black"
              style={{
                background: `hsl(${(c.name.charCodeAt(0) * 37) % 360}, 60%, 25%)`,
                color: `hsl(${(c.name.charCodeAt(0) * 37) % 360}, 80%, 75%)`,
                border: `1px solid hsl(${(c.name.charCodeAt(0) * 37) % 360}, 60%, 35%)`,
              }}
            >
              {c.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-grow">
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {c.name}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {timeAgo(c.createdAt)}
              </p>
            </div>

            {/* Star rating */}
            <StarRow rating={c.rating} />
          </div>

          {/* Comment text */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {c.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
