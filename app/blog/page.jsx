import BlogHeader from "@/app/components/server/BlogHeader/page";
import PostGrid   from "@/app/components/server/PostGrid/page";

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = {
  title: "Blog",
  description: "Explore all AI articles and posts on NexEdge-Ai. Stay updated with the latest machine learning, data science, and technology news.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
  },
  openGraph: {
    title: "NexEdge-Ai Blog",
    description: "Explore all AI articles and posts on NexEdge-Ai.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "NexEdge-Ai Blog",
    description: "Stay updated with the latest AI insights and technology news.",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <BlogHeader />
      <PostGrid posts={posts} />
    </div>
  );
}
