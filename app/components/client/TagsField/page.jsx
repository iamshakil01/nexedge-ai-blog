"use client";

import { useState } from "react";

export default function TagsField({ value, onChange }) {
  const [input, setInput] = useState("");

  // value is an array of tag strings
  const tags = Array.isArray(value) ? value : [];

  const addTag = () => {
    const tag = input.trim();
    if (!tag || tags.includes(tag) || tags.length >= 8) return;
    onChange([...tags, tag]);
    setInput("");
  };

  const removeTag = (tag) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-bold uppercase tracking-widest"
             style={{ color: "var(--text-muted)" }}>
        Tags
        <span className="ml-2 normal-case font-normal" style={{ color: "var(--text-muted)" }}>
          (press Enter or comma to add, max 8)
        </span>
      </label>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-2 min-h-[44px] px-4 py-3 rounded-xl"
           style={{
             background: "rgba(8,12,20,0.85)",
             border: "1px solid var(--border-muted)",
           }}>
        {tags.map((tag) => (
          <span key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(6,182,212,0.12)",
                  border: "1px solid rgba(6,182,212,0.25)",
                  color: "var(--accent-cyan)",
                }}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:opacity-70 transition-opacity leading-none"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          className="flex-grow bg-transparent outline-none text-sm min-w-[120px]"
          style={{ color: "var(--text-primary)" }}
          placeholder={tags.length === 0 ? "e.g. AI, ChatGPT, Tools..." : ""}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
        />
      </div>
    </div>
  );
}
