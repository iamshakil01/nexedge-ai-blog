"use client";

export default function FormCardHeader() {
  return (
    <div
      className="px-8 py-5 flex items-center gap-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* macOS-style traffic light dots */}
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(244,63,94,0.6)" }} />
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(251,191,36,0.6)" }} />
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.6)" }} />
      <span className="ml-3 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        new-article.md
      </span>
    </div>
  );
}
