"use client";

import { useState }        from "react";
import SuccessBanner       from "../SuccessBanner/page.jsx";
import FormCardHeader      from "../FormCardHeader/page.jsx";
import TitleField          from "../TitleField/page.jsx";
import ThumbnailField      from "../ThumbnailField/page.jsx";
import ContentField        from "../ContentField/page.jsx";
import CategoryField       from "../CategoryField/page.jsx";
import TagsField           from "../TagsField/page.jsx";
import PublishedDateField  from "../PublishedDateField/page.jsx";
import SlugPreview         from "../SlugPreview/page.jsx";
import WordCount           from "../WordCount/page.jsx";
import SubmitButton        from "../SubmitButton/page.jsx";

export default function PublishForm() {
  const today = new Date().toISOString().split("T")[0];

  const [title,         setTitle]         = useState("");
  const [thumbnail,     setThumbnail]     = useState("");
  const [content,       setContent]       = useState("");
  const [category,      setCategory]      = useState("General");
  const [tags,          setTags]          = useState([]);
  const [publishedDate, setPublishedDate] = useState(today);
  const [loading,       setLoading]       = useState(false);
  const [success,       setSuccess]       = useState(false);
  const [error,         setError]         = useState("");

  const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const submit = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setError("");
    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        thumbnail,
        content,
        category,
        tags,
        publishedDate,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setTitle("");
      setThumbnail("");
      setContent("");
      setCategory("General");
      setTags([]);
      setPublishedDate(today);
    } else {
      setError(data.error || "Something went wrong.");
    }
  };

  return (
    <>
      {success && <SuccessBanner />}

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-6"
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

        <FormCardHeader />

        <div className="p-8 flex flex-col gap-7">

          {/* Row 1: Title */}
          <TitleField value={title} onChange={setTitle} />

          {/* Row 2: Thumbnail URL */}
          <ThumbnailField value={thumbnail} onChange={setThumbnail} />

          {/* Row 3: Category + Published Date side by side */}
          <div className="grid sm:grid-cols-2 gap-5">
            <CategoryField value={category} onChange={setCategory} />
            <PublishedDateField value={publishedDate} onChange={setPublishedDate} />
          </div>

          {/* Row 4: Tags */}
          <TagsField value={tags} onChange={setTags} />

          {/* Row 5: Content */}
          <ContentField value={content} onChange={setContent} />

          {/* Slug preview */}
          <SlugPreview title={title} />

          {/* Word count */}
          <WordCount content={content} />

          {/* Submit */}
          <SubmitButton
            loading={loading}
            disabled={loading || !title.trim() || !content.trim()}
            onClick={submit}
          />

        </div>
      </div>

      <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
        Your article will be live immediately after publishing.
      </p>
    </>
  );
}
