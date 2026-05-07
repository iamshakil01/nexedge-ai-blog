"use client";

export default function WordCount({ content }) {
  if (!content) return null;

  const words    = content.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
      <span>{words} words</span>
      <span>·</span>
      <span>~{readTime} min read</span>
    </div>
  );
}
