"use client";

const CATEGORIES = [
  "Artificial Intelligence",
  "Machine Learning",
  "Tech News",
  "Tools & Software",
  "Tutorials",
  "Opinion",
  "General",
];

export default function CategoryField({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-bold uppercase tracking-widest"
             style={{ color: "var(--text-muted)" }}>
        Category
      </label>
      <select
        className="input-premium"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ cursor: "pointer" }}
      >
        <option value="" disabled>Select a category...</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
