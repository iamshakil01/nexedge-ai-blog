"use client";

import { useState, useEffect } from "react";

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-100 hover:scale-110 focus:outline-none"
          aria-label={`Rate ${s} star`}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2l2.5 7.5H24l-6 4.5 2.5 7.5L14 17.5 7.5 21.5l2.5-7.5L4 9.5h7.5L14 2z"
              fill={s <= (hovered || value) ? "#f59e0b" : "rgba(255,255,255,0.08)"}
              stroke={s <= (hovered || value) ? "#f59e0b" : "rgba(255,255,255,0.15)"}
              strokeWidth="1" style={{ transition: "fill 0.15s ease" }} />
          </svg>
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-xs font-bold" style={{ color: "#f59e0b" }}>
          {["", "Poor", "Fair", "Good", "Great", "Excellent"][value]}
        </span>
      )}
    </div>
  );
}

export default function CommentForm({ slug }) {
  const [user,    setUser]    = useState(null);
  const [checked, setChecked] = useState(false);
  const [rating,  setRating]  = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  // Check if user is logged in
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { setUser(d.user); setChecked(true); })
      .catch(() => setChecked(true));
  }, []);

  const submit = async () => {
    if (!comment.trim() || rating === 0) {
      setError("Please write a review and select a rating.");
      return;
    }
    setError("");
    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, name: user.name, rating, comment }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setRating(0);
      setComment("");
      setTimeout(() => window.location.reload(), 1200);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  // Loading state
  if (!checked) {
    return (
      <div className="rounded-2xl p-8 flex items-center justify-center"
           style={{ background: "var(--bg-surface)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <svg className="animate-spin" width="20" height="20" viewBox="0 0 20 20" fill="none"
             style={{ color: "var(--accent-cyan)" }}>
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
          <path d="M10 2a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  // Not logged in — show login prompt
  if (!user) {
    return (
      <div className="rounded-2xl p-8 text-center"
           style={{
             background: "var(--bg-surface)",
             border: "1px solid rgba(6,182,212,0.12)",
           }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
             style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
               style={{ color: "var(--accent-cyan)" }}>
            <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 19c0-4 4-7 9-7s9 3 9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          Sign in to leave a review
        </h3>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Create a free account to share your thoughts on this article.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href={`/login?from=${encodeURIComponent(window?.location?.pathname || "/blog")}`}
             className="btn-glow px-6 py-2.5 rounded-xl text-sm font-bold inline-block">
            Sign In
          </a>
          <a href="/register"
             className="btn-ghost-custom px-6 py-2.5 rounded-xl text-sm font-bold inline-block">
            Register
          </a>
        </div>
      </div>
    );
  }

  // Logged in — show form
  return (
    <div className="rounded-2xl overflow-hidden"
         style={{ background: "var(--bg-surface)", border: "1px solid rgba(255,255,255,0.07)" }}>

      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3"
           style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
             style={{ background: "linear-gradient(135deg, #0891b2, #2563eb)", color: "#fff" }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            {user.name}
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Leave a review</p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-5">

        {/* Success */}
        {success && (
          <div className="flex items-center gap-3 p-4 rounded-xl"
               style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "#22c55e", flexShrink: 0 }}>
              <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-semibold" style={{ color: "#22c55e" }}>Review submitted! Refreshing...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl"
               style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "var(--accent-rose)", flexShrink: 0 }}>
              <path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <p className="text-sm" style={{ color: "var(--accent-rose)" }}>{error}</p>
          </div>
        )}

        {/* Star rating */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Rating
          </label>
          <StarPicker value={rating} onChange={setRating} />
        </div>

        {/* Comment */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Your Review
          </label>
          <textarea
            className="input-premium resize-none"
            style={{ minHeight: "110px", lineHeight: "1.7" }}
            placeholder="Share your thoughts about this article..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button onClick={submit} disabled={loading || success}
          className="btn-glow w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none">
          {loading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Review
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>

      </div>
    </div>
  );
}
