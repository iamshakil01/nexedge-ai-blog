"use client";

import { useState }       from "react";
import { useRouter }      from "next/navigation";
import TitleField         from "../TitleField/page.jsx";
import ThumbnailField     from "../ThumbnailField/page.jsx";
import ContentField       from "../ContentField/page.jsx";
import CategoryField      from "../CategoryField/page.jsx";
import TagsField          from "../TagsField/page.jsx";
import PublishedDateField from "../PublishedDateField/page.jsx";
import WordCount          from "../WordCount/page.jsx";

export default function EditPostForm({ post = {} }) {
  const router  = useRouter();
  const today   = new Date().toISOString().split("T")[0];

  const [title,         setTitle]         = useState(post.title || "");
  const [thumbnail,     setThumbnail]     = useState(post.thumbnail || "");
  const [content,       setContent]       = useState(post.content || "");
  const [category,      setCategory]      = useState(post.category || "General");
  const [tags,          setTags]          = useState(post.tags || []);
  const [publishedDate, setPublishedDate] = useState(
    post.publishedDate
      ? new Date(post.publishedDate).toISOString().split("T")[0]
      : today
  );
  const [loading,  setLoading]  = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error,    setError]    = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Update ────────────────────────────────────────────────────
  const save = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setError("");
    setLoading(true);

    const res = await fetch(`/api/posts/${post.slug}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, thumbnail, content, category, tags, publishedDate }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push(`/blog/${post.slug}`);
      router.refresh();
    } else {
      setError(data.error || "Failed to update post.");
    }
  };

  // ── Delete ────────────────────────────────────────────────────
  const deletePost = async () => {
    setDeleting(true);
    const res = await fetch(`/api/posts/${post.slug}`, { method: "DELETE" });
    setDeleting(false);

    if (res.ok) {
      router.push("/blog");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to delete post.");
      setShowConfirm(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl"
             style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               style={{ color: "var(--accent-rose)", flexShrink: 0 }}>
            <path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <p className="text-sm" style={{ color: "var(--accent-rose)" }}>{error}</p>
        </div>
      )}

      {/* Form card */}
      <div className="rounded-2xl overflow-hidden"
           style={{
             background: "var(--bg-surface)",
             border: "1px solid rgba(255,255,255,0.07)",
             boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
           }}>

        {/* Card header */}
        <div className="px-8 py-5 flex items-center justify-between"
             style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(244,63,94,0.6)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(251,191,36,0.6)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.6)" }} />
            <span className="ml-3 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              edit — {post.slug}
            </span>
          </div>
          {/* Slug badge */}
          <span className="text-xs font-mono px-2 py-1 rounded-lg"
                style={{ background: "rgba(6,182,212,0.08)", color: "var(--accent-cyan)" }}>
            /blog/{post.slug}
          </span>
        </div>

        <div className="p-8 flex flex-col gap-7">
          <TitleField value={title} onChange={setTitle} />

          <ThumbnailField value={thumbnail} onChange={setThumbnail} />

          <div className="grid sm:grid-cols-2 gap-5">
            <CategoryField value={category} onChange={setCategory} />
            <PublishedDateField value={publishedDate} onChange={setPublishedDate} />
          </div>

          <TagsField value={tags} onChange={setTags} />

          <ContentField value={content} onChange={setContent} />

          <WordCount content={content} />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {/* Save */}
            <button onClick={save} disabled={loading || deleting}
              className="btn-glow flex-1 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none">
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                    <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2 8l4 4 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Save Changes
                </>
              )}
            </button>

            {/* Cancel */}
            <a href={`/blog/${post.slug}`}
               className="btn-ghost-custom flex-1 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              Cancel
            </a>
          </div>
        </div>
      </div>

      {/* Delete section */}
      <div className="rounded-2xl p-6"
           style={{ background: "rgba(244,63,94,0.04)", border: "1px solid rgba(244,63,94,0.15)" }}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
              Delete Article
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              This will permanently delete the post and all its reviews.
            </p>
          </div>
          <button onClick={() => setShowConfirm(true)} disabled={deleting}
            className="px-5 py-2.5 rounded-xl text-sm font-bold flex-shrink-0 transition-all duration-200"
            style={{
              background: "rgba(244,63,94,0.1)",
              border: "1px solid rgba(244,63,94,0.3)",
              color: "var(--accent-rose)",
            }}>
            Delete
          </button>
        </div>
      </div>

      {/* Delete confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
             style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-sm rounded-2xl p-8 flex flex-col gap-5"
               style={{
                 background: "var(--bg-elevated)",
                 border: "1px solid rgba(244,63,94,0.25)",
                 boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
               }}>
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto"
                 style={{ background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.25)" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                   style={{ color: "var(--accent-rose)" }}>
                <path d="M11 8v5M11 15v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-black mb-2" style={{ color: "var(--text-primary)" }}>
                Delete this article?
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>
                  "{post.title}"
                </span>
                {" "}and all its reviews will be permanently deleted. This cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} disabled={deleting}
                className="btn-ghost-custom flex-1 py-3 rounded-xl text-sm font-bold">
                Cancel
              </button>
              <button onClick={deletePost} disabled={deleting}
                className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  background: "rgba(244,63,94,0.15)",
                  border: "1px solid rgba(244,63,94,0.35)",
                  color: "var(--accent-rose)",
                }}>
                {deleting ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                      <path d="M7 2a5 5 0 0 1 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Deleting...
                  </>
                ) : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
