"use client";

// Shows Edit + Delete buttons on article page — admin only
// Checks auth client-side so server component stays clean

import { useState, useEffect } from "react";

export default function ArticleActions({ slug }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { if (d.user?.role === "admin") setIsAdmin(true); })
      .catch(() => {});
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="flex items-center gap-2 mb-8 p-4 rounded-xl"
         style={{
           background: "rgba(6,182,212,0.05)",
           border: "1px solid rgba(6,182,212,0.12)",
         }}>
      <div className="flex items-center gap-1.5 mr-2">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-cyan)" }} />
        <span className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--accent-cyan)" }}>
          Admin
        </span>
      </div>

      <div className="h-4 w-px mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />

      {/* Edit button */}
      <a href={`/admin/edit/${slug}`}
         className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
         style={{
           background: "rgba(6,182,212,0.08)",
           border: "1px solid rgba(6,182,212,0.2)",
           color: "var(--accent-cyan)",
         }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M9 2l2 2-7 7H2V9l7-7z" stroke="currentColor" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Edit
      </a>

      {/* Delete — links to edit page where delete confirm modal is */}
      <a href={`/admin/edit/${slug}#delete`}
         className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
         style={{
           background: "rgba(244,63,94,0.08)",
           border: "1px solid rgba(244,63,94,0.2)",
           color: "var(--accent-rose)",
         }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M2 3.5h9M5 3.5V2h3v1.5M5.5 6v4M7.5 6v4M3 3.5l.5 7.5h6L10 3.5"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Delete
      </a>
    </div>
  );
}
