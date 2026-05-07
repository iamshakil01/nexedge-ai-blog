// SERVER COMPONENT — 404 article not found view

export default function NotFoundView() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-36 text-center">

      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
        style={{
          background: "rgba(244,63,94,0.1)",
          border: "1px solid rgba(244,63,94,0.2)",
        }}
      >
        <svg
          width="32" height="32" viewBox="0 0 32 32" fill="none"
          style={{ color: "var(--accent-rose)" }}
        >
          <path
            d="M16 10v8M16 22v2"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <h1 className="text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
        Article Not Found
      </h1>
      <p className="text-lg mb-10" style={{ color: "var(--text-secondary)" }}>
        This article doesn't exist or may have been removed.
      </p>
      <a href="/blog" className="btn-glow px-8 py-3 rounded-xl text-sm inline-block">
        ← Back to Articles
      </a>

    </div>
  );
}
