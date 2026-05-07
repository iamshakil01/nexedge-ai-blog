"use client";

import { useState }      from "react";
import SuccessBanner     from "../SuccessBanner/page.jsx";
import FormCardHeader    from "../FormCardHeader/page.jsx";
import TitleField        from "../TitleField/page.jsx";
import ContentField      from "../ContentField/page.jsx";
import SlugPreview       from "../SlugPreview/page.jsx";
import WordCount         from "../WordCount/page.jsx";
import SubmitButton      from "../SubmitButton/page.jsx";

export default function PublishForm() {
  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const slug = title.toLowerCase().replace(/ /g, "-");

  const submit = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    setSuccess(false);

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, content }),
    });

    setLoading(false);
    setSuccess(true);
    setTitle("");
    setContent("");
  };

  return (
    <>
      {/* Success banner — shown after publish */}
      {success && <SuccessBanner />}

      {/* Form card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Terminal-style card top bar */}
        <FormCardHeader />

        <div className="p-8 flex flex-col gap-7">
          {/* Title input */}
          <TitleField value={title} onChange={setTitle} />

          {/* Content textarea */}
          <ContentField value={content} onChange={setContent} />

          {/* Slug preview — visible when title is typed */}
          <SlugPreview title={title} />

          {/* Word count + read time — visible when content is typed */}
          <WordCount content={content} />

          {/* Publish button */}
          <SubmitButton
            loading={loading}
            disabled={loading || !title.trim() || !content.trim()}
            onClick={submit}
          />
        </div>
      </div>

      {/* Tip text */}
      <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
        Your article will be live immediately after publishing.
      </p>
    </>
  );
}
