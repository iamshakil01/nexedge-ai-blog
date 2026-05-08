"use client";

export default function SlugPreview({ title }) {
  if (!title) return null;

  const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: "rgba(6,182,212,0.06)",
        border: "1px solid rgba(6,182,212,0.15)",
      }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
           style={{ color: "var(--accent-cyan)", flexShrink: 0 }}>
        <path d="M1 6.5h11M7 2l4 4.5L7 11" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div>
        <span className="text-xs font-bold uppercase tracking-widest mr-2"
              style={{ color: "var(--text-muted)" }}>
          URL:
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--accent-cyan)" }}>
          /blog/{slug}
        </span>
      </div>
    </div>
  );
}
