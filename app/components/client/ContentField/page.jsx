"use client";

export default function ContentField({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        Content
      </label>
      <textarea
        className="input-premium resize-y"
        style={{ minHeight: "220px", lineHeight: "1.8" }}
        placeholder="Tell your story..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
