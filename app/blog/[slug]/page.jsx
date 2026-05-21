import {
  generateMetaTags,
  generateExcerpt,
  getCanonicalUrl,
  calculateReadingTime,
  generateBlogPostingSchema,
  generateInternalLinks,
} from "@/app/lib/seo-utils";
import {
  BlogPostingSchema,
  BreadcrumbSchema,
  OrganizationSchema,
  WebSiteSchema,
} from "@/app/components/seo/JsonLd";
import Breadcrumb from "@/app/components/seo/Breadcrumb";
import ReadingProgress from "@/app/components/seo/ReadingProgress";
import { ReadingTime, WordCount } from "@/app/components/seo/ReadingProgress";
import InternalLinks from "@/app/components/seo/InternalLinks";
import ArticleView from "@/app/components/server/ArticleView/page.jsx";
import NotFoundView from "@/app/components/server/NotFoundView/page.jsx";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Get post by slug
 */
async function getPostBySlug(slug) {
  try {
    const res = await fetch(`${BASE}/api/posts`, { cache: "no-store" });
    if (!res.ok) return null;
    const posts = await res.json();
    return posts.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}

/**
 * Get comments for post
 */
async function getComments(slug) {
  try {
    const res = await fetch(
      `${BASE}/api/comments?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Get all posts for related articles
 */
async function getAllPosts() {
  try {
    const res = await fetch(`${BASE}/api/posts`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

/**
 * Generate dynamic metadata for blog posts
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.title;
  const description =
    post.excerpt || generateExcerpt(post.content, 160);
  const image = post.thumbnail || `${BASE}/og?title=${encodeURIComponent(title)}`;
  const canonical = getCanonicalUrl(`/blog/${slug}`);
  const publishedTime = new Date(post.publishedDate || post.createdAt).toISOString();
  const modifiedTime = new Date(post.modifiedDate || post.publishedDate || post.createdAt).toISOString();

  return generateMetaTags({
    title,
    description,
    canonical,
    image,
    type: "article",
    publishedTime,
    modifiedTime,
    author: post.author,
    section: post.category,
    tags: post.tags || [],
  });
}

/**
 * Blog Post Page Component
 */
export default async function PostPage({ params }) {
  const { slug } = await params;

  const [post, comments, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getComments(slug),
    getAllPosts(),
  ]);

  if (!post) return <NotFoundView />;

  // Prepare data for structured data
  const canonical = getCanonicalUrl(`/blog/${slug}`);
  const publishedTime = new Date(post.publishedDate || post.createdAt).toISOString();
  const modifiedTime = new Date(post.modifiedDate || post.publishedDate || post.createdAt).toISOString();
  const readingTime = calculateReadingTime(post.content);

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ];

  // Related posts for internal linking
  const relatedPosts = generateInternalLinks(allPosts, slug, 3);

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* JSON-LD Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />
      <BlogPostingSchema post={post} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumb />

        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          {post.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                {post.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70 mb-6">
            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span>{post.author}</span>
              </div>
            )}

            {/* Date */}
            <time dateTime={publishedTime}>
              {new Date(post.publishedDate || post.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>

            {/* Reading Time */}
            <ReadingTime content={post.content} />

            {/* Word Count */}
            <WordCount content={post.content} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => {
                const tagSlug = tag
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "");
                return (
                  <a
                    key={tag}
                    href={`/tag/${tagSlug}`}
                    className="px-3 py-1 text-xs bg-base-200 hover:bg-secondary hover:text-secondary-content rounded-full transition-colors"
                  >
                    #{tag}
                  </a>
                );
              })}
            </div>
          )}

          {/* Featured Image */}
          {post.thumbnail && (
            <figure className="mb-8">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-auto rounded-xl shadow-lg"
                loading="eager"
              />
              <figcaption className="text-sm text-base-content/60 mt-2 text-center">
                {post.title}
              </figcaption>
            </figure>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-xl text-base-content/80 mb-8 leading-relaxed">
              {post.excerpt}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <ArticleView post={post} comments={comments} />
        </div>

        {/* Post Footer */}
        <footer className="border-t border-base-300 pt-8">
          {/* Share and Related Links could go here */}
        </footer>

        {/* Related Articles - Internal Linking */}
        {relatedPosts.length > 0 && (
          <InternalLinks
            posts={relatedPosts}
            currentSlug={slug}
            title="Related Articles"
          />
        )}
      </article>

      {/* Additional Structured Data for Comments */}
      {comments && comments.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DiscussionForumPosting",
              url: canonical,
              name: post.title,
              description: generateExcerpt(post.content, 160),
              articleBody: generateExcerpt(post.content, 500),
              comment: comments.slice(0, 5).map((comment) => ({
                "@type": "Comment",
                author: comment.author || "Anonymous",
                dateCreated: new Date(comment.createdAt).toISOString(),
                text: comment.content,
              })),
            }),
          }}
        />
      )}
    </>
  );
}