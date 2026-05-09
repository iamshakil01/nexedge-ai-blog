// SERVER COMPONENT — Fixed comment/review section
// Same design for every article, always at the bottom

import ReviewSummary from "../ReviewSummary/page.jsx";
import CommentList   from "../CommentList/page.jsx";
import CommentForm   from "@/app/components/client/CommentForm/page.jsx";

export default function CommentSection({ slug, comments = [] }) {
  const total  = comments.length;
  const avg    = total
    ? (comments.reduce((s, c) => s + c.rating, 0) / total).toFixed(1)
    : null;

  return (
    <section
      className="mt-20"
      style={{ borderTop: "1px solid rgba(6,182,212,0.10)" }}
      aria-label="Reviews and comments"
    >
      {/* ── Section header ──────────────────────────────────── */}
      <div className="pt-14 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          {/* Label */}
          <div className="tag-pill inline-flex mb-3">Community</div>

          <h2
            className="text-3xl font-black tracking-tight"
            style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Reviews
            {total > 0 && (
              <span className="ml-3 text-xl font-bold" style={{ color: "var(--accent-cyan)" }}>
                ({total})
              </span>
            )}
          </h2>
          <p className="text-sm mt-1.5" style={{ color: "var(--text-muted)" }}>
            Read what others think — or leave your own review below.
          </p>
        </div>

        {/* Average rating badge */}
        {avg && (
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl flex-shrink-0"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <div>
              <p className="text-2xl font-black leading-none" style={{ color: "#f59e0b" }}>
                {avg}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                out of 5
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              {/* Star row */}
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1l1.5 4H13l-4 3 1.5 4L7 9.5 3 12l1.5-4L1 5h4.5L7 1z"
                      fill={s <= Math.round(Number(avg)) ? "#f59e0b" : "rgba(255,255,255,0.1)"}
                      stroke={s <= Math.round(Number(avg)) ? "#f59e0b" : "rgba(255,255,255,0.12)"}
                      strokeWidth="0.5"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {total} {total === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Rating breakdown ─────────────────────────────────── */}
      {total > 0 && (
        <div className="mb-10">
          <ReviewSummary comments={comments} />
        </div>
      )}

      {/* ── Comment list ─────────────────────────────────────── */}
      <div className="mb-10">
        <CommentList comments={comments} />
      </div>

      {/* ── Write a review ───────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(6,182,212,0.04) 0%, rgba(37,99,235,0.03) 100%)",
          border: "1px solid rgba(6,182,212,0.12)",
        }}
      >
        {/* Header bar */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(6,182,212,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.2)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                   style={{ color: "var(--accent-cyan)" }}>
                <path d="M1.5 2.5h11v8H8l-2.5 2.5V10.5h-4v-8z"
                      stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                Write a Review
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Share your honest thoughts about this article
              </p>
            </div>
          </div>

          {/* Star hint */}
          <div className="hidden sm:flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="rgba(245,158,11,0.3)">
                <path d="M6 1l1.2 3.4H11L8.2 6.5l1.1 3.4L6 8 2.7 9.9l1.1-3.4L1 4.4h3.8L6 1z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <CommentForm slug={slug} />
        </div>
      </div>

    </section>
  );
}
