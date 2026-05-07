import BlogHeader from "@/app/components/server/BlogHeader/page";
import PostGrid   from "@/app/components/server/PostGrid/page";

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <BlogHeader />
      <PostGrid posts={posts} />
    </div>
  );
}
