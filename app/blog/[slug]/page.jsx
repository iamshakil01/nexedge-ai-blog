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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.title;
  const description = post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, '');
  const image = post.thumbnail || "/favicon.png";

  return {
    title,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
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
