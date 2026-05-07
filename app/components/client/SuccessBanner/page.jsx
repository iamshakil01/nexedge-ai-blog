"use client";

export default function SuccessBanner() {
  return (
    <div
      className="flex items-center gap-4 p-5 rounded-xl mb-8"
      style={{
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.2)",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(34,197,94,0.15)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "#22c55e" }}>
          <path
            d="M3 8l4 4 6-7"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="font-bold text-sm" style={{ color: "#22c55e" }}>
          Article published!
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          Your post is now live on the blog.
        </p>
      </div>
      <a href="/blog" className="ml-auto text-xs font-semibold" style={{ color: "#22c55e" }}>
        View →
      </a>
    </div>
  );
}
