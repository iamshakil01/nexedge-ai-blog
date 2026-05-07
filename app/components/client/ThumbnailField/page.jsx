"use client";

export default function ThumbnailField({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-bold uppercase tracking-widest"
             style={{ color: "var(--text-muted)" }}>
        Thumbnail Image URL
      </label>
      <input
        type="url"
        className="input-premium"
        placeholder="https://example.com/image.jpg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* Live preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden"
             style={{ border: "1px solid rgba(6,182,212,0.15)", height: "160px" }}>
          <img
            src={value}
            alt="Thumbnail preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <div className="absolute inset-0 flex items-center justify-center"
               style={{ background: "rgba(6,182,212,0.05)" }}>
          </div>
        </div>
      )}
    </div>
  );
}
