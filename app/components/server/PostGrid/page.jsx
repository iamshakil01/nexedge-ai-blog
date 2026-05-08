import PostCard from "../PostCard/page.jsx";

export default function PostGrid({ posts = [] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center justify-center py-32 gap-6 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
             style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
               style={{ color: "var(--accent-cyan)" }}>
            <path d="M14 4v20M4 14h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            No articles yet
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Be the first to publish something great.
          </p>
          <a href="/admin" className="btn-glow px-7 py-2.5 rounded-xl text-sm inline-block">
            Write First Article
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((post, i) => (
        <PostCard key={post._id} post={post} index={i} />
      ))}
    </div>
  );
}
