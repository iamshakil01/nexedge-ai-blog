// EDIT POST PAGE — /admin/edit/[slug]
// Protected by proxy.js — admin only

import EditPostForm from "@/app/components/client/EditPostForm/page.jsx";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

async function getPost(slug) {
  const res = await fetch(`${BASE}/api/posts`, { cache: "no-store" });
  if (!res.ok) return null;
  const posts = await res.json();
  return posts.find((p) => p.slug === slug) ?? null;
}

export default async function EditPage({ params }) {
  const { slug } = await params;

  // Server-side auth check
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/login");

  const post = await getPost(slug);
  if (!post) redirect("/blog");

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="tag-pill inline-flex mb-5">Edit Article</div>
        <h1 className="text-4xl font-black tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}>
          Edit <span className="gradient-text">Article</span>
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Make changes and save — updates are live immediately.
        </p>
        <div className="shimmer-line mt-6 max-w-xs" />
      </div>

      <EditPostForm post={post} />
    </div>
  );
}
