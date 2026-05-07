"use client";

export default function PublishedDateField({ value, onChange }) {
  // Default to today
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-bold uppercase tracking-widest"
             style={{ color: "var(--text-muted)" }}>
        Published Date
      </label>
      <input
        type="date"
        className="input-premium"
        value={value || today}
        max={today}
        onChange={(e) => onChange(e.target.value)}
        style={{ colorScheme: "dark" }}
      />
    </div>
  );
}
