// SERVER COMPONENT — shows average rating + star breakdown bar chart

export default function ReviewSummary({ comments }) {
  if (comments.length === 0) return null;

  const total   = comments.length;
  const avg     = comments.reduce((s, c) => s + c.rating, 0) / total;
  const rounded = Math.round(avg * 10) / 10;

  // count per star 5→1
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: comments.filter((c) => c.rating === star).length,
  }));

  return (
    <div
      className="rounded-2xl p-6 flex flex-col sm:flex-row gap-8 items-center sm:items-start"
      style={{
        background: "rgba(6,182,212,0.05)",
        border: "1px solid rgba(6,182,212,0.15)",
      }}
    >
      {/* Left — big average */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <span
          className="text-6xl font-black"
          style={{ color: "var(--text-primary)" }}
        >
          {rounded}
        </span>
        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg
              key={s}
              width="18" height="18" viewBox="0 0 18 18" fill="none"
            >
              <path
                d="M9 1.5l2 5.5h5.5l-4.5 3.5 1.5 5.5L9 13l-4.5 3 1.5-5.5L1.5 7H7L9 1.5z"
                fill={s <= Math.round(avg) ? "#f59e0b" : "rgba(255,255,255,0.1)"}
                stroke={s <= Math.round(avg) ? "#f59e0b" : "rgba(255,255,255,0.15)"}
                strokeWidth="0.5"
              />
            </svg>
          ))}
        </div>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {total} {total === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* Right — bar breakdown */}
      <div className="flex flex-col gap-2.5 flex-grow w-full">
        {counts.map(({ star, count }) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={star} className="flex items-center gap-3">
              {/* Star label */}
              <div className="flex items-center gap-1 w-10 flex-shrink-0">
                <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
                  {star}
                </span>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="#f59e0b">
                  <path d="M5.5 1l1.2 3.4H10L7.2 6.5l1.1 3.4L5.5 8 2.7 9.9l1.1-3.4L1 4.4h3.3L5.5 1z" />
                </svg>
              </div>

              {/* Bar track */}
              <div
                className="flex-grow h-2 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background: pct > 0
                      ? "linear-gradient(90deg, #0891b2, #38bdf8)"
                      : "transparent",
                  }}
                />
              </div>

              {/* Count */}
              <span
                className="text-xs w-6 text-right flex-shrink-0"
                style={{ color: "var(--text-muted)" }}
              >
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
