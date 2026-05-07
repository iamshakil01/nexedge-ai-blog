// SERVER COMPONENT — Recent posts grid (excludes featured post)

import PostCard from "../PostCard/page.jsx";

export default function RecentPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">

      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black" style={{
            color: "var(--text-primary)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Recent Articles
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Latest from the NexEdge AI team
          </p>
        </div>
        <a href="/blog"
           className="btn-ghost-custom px-5 py-2 rounded-xl text-sm inline-flex items-center gap-2 flex-shrink-0">
          View All
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} />
        ))}
      </div>

    </section>
  );
}
