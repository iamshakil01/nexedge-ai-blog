"use client";

export default function TitleField({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        Title
      </label>
      <input
        type="text"
        className="input-premium"
        placeholder="Write a compelling headline..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
