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
  description: "Explore all articles and posts on SheraShop. Stay updated with the latest shopping tips, product reviews, and lifestyle content.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
  },
  openGraph: {
    title: "SheraShop Blog",
    description: "Explore all articles and posts on SheraShop.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SheraShop Blog",
    description: "Stay updated with the latest shopping tips and product reviews.",
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
