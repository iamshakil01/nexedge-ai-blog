"use client";

import { useState, useRef } from "react";

export default function ThumbnailField({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState("");
  const [dragging,  setDragging]  = useState(false);
  const inputRef = useRef(null);

  const upload = async (file) => {
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError("");
    setUploading(true);

    const form = new FormData();
    form.append("file", file);

    const res  = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();

    setUploading(false);

    if (res.ok) {
      onChange(data.url);
    } else {
      setError(data.error || "Upload failed.");
    }
  };

  const handleFile = (e) => upload(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    upload(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  const clear = () => { onChange(""); setError(""); };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-bold uppercase tracking-widest"
             style={{ color: "var(--text-muted)" }}>
        Thumbnail Image
      </label>

      {/* Preview — shown when URL exists */}
      {value ? (
        <div className="relative rounded-xl overflow-hidden"
             style={{ height: "200px", border: "1px solid rgba(6,182,212,0.2)" }}>
          <img src={value} alt="Thumbnail"
               style={{ width: "100%", height: "100%", objectFit: "cover" }} />

          {/* Overlay actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity duration-200"
               style={{ background: "rgba(0,0,0,0.55)" }}>
            <button type="button" onClick={() => inputRef.current?.click()}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{
                background: "rgba(6,182,212,0.9)",
                color: "#fff",
              }}>
              Replace
            </button>
            <button type="button" onClick={clear}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{
                background: "rgba(244,63,94,0.9)",
                color: "#fff",
              }}>
              Remove
            </button>
          </div>

          {/* Cloudinary badge */}
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg text-xs font-medium"
               style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.7)" }}>
            ☁ Cloudinary
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="relative flex flex-col items-center justify-center gap-3 rounded-xl cursor-pointer transition-all duration-200"
          style={{
            height: "160px",
            border: `2px dashed ${dragging ? "var(--accent-cyan)" : "rgba(6,182,212,0.25)"}`,
            background: dragging ? "rgba(6,182,212,0.06)" : "rgba(8,12,20,0.5)",
          }}
        >
          {uploading ? (
            <>
              <svg className="animate-spin" width="28" height="28" viewBox="0 0 28 28" fill="none"
                   style={{ color: "var(--accent-cyan)" }}>
                <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2.5" opacity="0.25"/>
                <path d="M14 3a11 11 0 0 1 11 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <p className="text-sm font-medium" style={{ color: "var(--accent-cyan)" }}>
                Uploading to Cloudinary...
              </p>
            </>
          ) : (
            <>
              {/* Upload icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                   style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                     style={{ color: "var(--accent-cyan)" }}>
                  <path d="M11 14V4M7 8l4-4 4 4" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 16v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Click to upload or drag & drop
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  PNG, JPG, WEBP · Max 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {/* Manual URL input */}
      <div className="flex items-center gap-2">
        <div className="flex-grow h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>or paste URL</span>
        <div className="flex-grow h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      <input
        type="url"
        className="input-premium"
        placeholder="https://example.com/image.jpg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Error */}
      {error && (
        <p className="text-xs" style={{ color: "var(--accent-rose)" }}>⚠ {error}</p>
      )}
    </div>
  );
}
