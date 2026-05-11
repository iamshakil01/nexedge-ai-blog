import ReviewSummary    from "../ReviewSummary/page.jsx";
import CommentList      from "../CommentList/page.jsx";
import CommentForm      from "@/app/components/client/CommentForm/page.jsx";
import ArticleActions   from "@/app/components/client/ArticleActions/page.jsx";
import ArticleContent   from "../ArticleContent/page.jsx";
import CommentSection   from "../CommentSection/page.jsx";
import Script from "next/script";

export default function ArticleView({ post, comments = [] }) {
  if (!post) return null;

  const readTime  = Math.max(1, Math.ceil((post.content || "").split(" ").length / 200));
  const avgRating = comments.length
    ? (comments.reduce((s, c) => s + c.rating, 0) / comments.length).toFixed(1)
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    "image": post.thumbnail || "/favicon.png",
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "NexEdge-Ai",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.png`,
      },
    },
  };

  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Admin actions — edit / delete (visible to admin only) */}
      <ArticleActions slug={post.slug} />

      {/* Back */}
      <a href="/blog"
         className="inline-flex items-center gap-2 text-sm font-medium mb-12 transition-all duration-200 group"
         style={{ color: "var(--text-muted)" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
             className="group-hover:-translate-x-1 transition-transform duration-200">
          <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to all articles
      </a>

      {/* Header */}
      <header className="mb-12">
        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="rounded-2xl overflow-hidden mb-8"
               style={{ height: "320px", border: "1px solid rgba(6,182,212,0.1)" }}>
            <img
              src={post.thumbnail}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Category + tags row */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {post.category && (
            <span className="tag-pill">{post.category}</span>
          )}
          {post.tags?.map((tag) => (
            <span key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(6,182,212,0.06)",
                    border: "1px solid rgba(6,182,212,0.15)",
                    color: "var(--text-muted)",
                  }}>
              #{tag}
            </span>
          ))}
        </div>

        <div className="tag-pill inline-flex mb-6">Article</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-8"
            style={{ color: "var(--text-primary)" }}>
          {post.title}
        </h1>

        {/* Meta bar */}
        <div className="flex items-center gap-4 py-4 px-5 rounded-xl flex-wrap"
             style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(6,182,212,0.08)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
               style={{ background: "rgba(6,182,212,0.12)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                 style={{ color: "var(--accent-cyan)" }}>
              <circle cx="7" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M1.5 12c0-2.5 2.5-4 5.5-4s5.5 1.5 5.5 4"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>NexEdge AI</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {(post.publishedDate || post.createdAt)
                ? new Date(post.publishedDate || post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                : "Published"}
            </p>
          </div>

          <div className="ml-auto h-6 w-px" style={{ background: "rgba(255,255,255,0.08)" }}/>

          <div className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ color: "var(--text-muted)" }}>
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6.5 3.5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{readTime} min read</span>
          </div>

          {avgRating && (
            <>
              <div className="h-6 w-px" style={{ background: "rgba(255,255,255,0.08)" }}/>
              <div className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="#f59e0b">
                  <path d="M6.5 1l1.5 4H12L8.5 7.5l1.5 4L6.5 9.5 3 11.5l1.5-4L1 5h4L6.5 1z"/>
                </svg>
                <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>{avgRating}</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>({comments.length})</span>
              </div>
            </>
          )}
        </div>
      </header>

      <div className="shimmer-line mb-12"/>
      <ArticleContent content={post.content} />
      <div className="shimmer-line mt-16 mb-12"/>

      {/* Footer row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--accent-cyan)" }}>
              <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9 3 11.5l1.5-4L1 5h4.5L7 1z"
                    stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Thanks for reading.</p>
        </div>
        <a href="/blog"
           className="btn-ghost-custom px-6 py-2.5 rounded-xl text-sm inline-flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          More Articles
        </a>
      </div>

      {/* ── Comment Section — fixed design for all articles ── */}
      <CommentSection slug={post.slug} comments={comments} />

    </div>
    </>
  );
}
