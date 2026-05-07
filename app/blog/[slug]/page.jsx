import ArticleView  from "@/app/components/server/ArticleView/page.jsx";
import NotFoundView from "@/app/components/server/NotFoundView/page.jsx";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

async function getPostBySlug(slug) {
  const res = await fetch(`${BASE}/api/posts`, { cache: "no-store" });
  if (!res.ok) return null;
  const posts = await res.json();
  return posts.find((p) => p.slug === slug) ?? null;
}

async function getComments(slug) {
  const res = await fetch(
    `${BASE}/api/comments?slug=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  const [post, comments] = await Promise.all([
    getPostBySlug(slug),
    getComments(slug),
  ]);

  if (!post) return <NotFoundView />;

  return <ArticleView post={post} comments={comments} />;
}
