import BlogHeader from "@/app/components/server/BlogHeader/page";
import PostGrid from "@/app/components/server/PostGrid/page";
import { generateMetaTags, generateExcerpt, getCanonicalUrl } from "@/app/lib/seo-utils";
import { OrganizationSchema, WebSiteSchema, BreadcrumbSchema } from "@/app/components/seo/JsonLd";
import Breadcrumb from "@/app/components/seo/Breadcrumb";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Pagination settings
const POSTS_PER_PAGE = 9;

/**
 * Get all posts
 */
async function getPosts() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Get all categories
 */
async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, { cache: "no-store" });
    if (!res.ok) return [];
    const posts = await res.json();
    return [...new Set(posts.map(post => post.category).filter(Boolean))];
  } catch {
    return [];
  }
}

/**
 * Generate dynamic metadata for blog page
 */
export const metadata = generateMetaTags({
  title: "Blog - All Articles",
  description: "Explore all AI articles and posts on NexEdge-Ai. Stay updated with the latest machine learning, data science, and technology news.",
  canonical: getCanonicalUrl("/blog"),
  type: "website",
  tags: ["blog", "articles", "AI", "technology", "machine learning"],
});

/**
 * Blog Page Component with Pagination
 */
export default async function BlogPage({ searchParams }) {
  const { page = 1, category } = await searchParams;
  const currentPage = Math.max(1, parseInt(page));
  
  const [allPosts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  // Filter by category if specified
  let filteredPosts = allPosts;
  if (category) {
    const categorySlug = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    filteredPosts = allPosts.filter(post => 
      post.category?.toLowerCase() === categorySlug.toLowerCase()
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  if (category) {
    breadcrumbItems.push({ name: category, url: `/blog?category=${category}` });
  }

  if (currentPage > 1) {
    breadcrumbItems.push({ name: `Page ${currentPage}`, url: `/blog?page=${currentPage}` });
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* JSON-LD Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Blog Header */}
      <BlogHeader />

      {/* Category Filter */}
      {categories.length > 0 && (
        <nav className="mb-8" aria-label="Category filter">
          <div className="flex flex-wrap gap-2">
            <a
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !category ? 'btn btn-primary' : 'btn btn-outline btn-sm'
              }`}
            >
              All
            </a>
            {categories.map(cat => {
              const catSlug = cat
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');
              
              return (
                <a
                  key={cat}
                  href={`/blog?category=${catSlug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === catSlug ? 'btn btn-primary' : 'btn btn-outline btn-sm'
                  }`}
                >
                  {cat}
                </a>
              );
            })}
          </div>
        </nav>
      )}

      {/* Posts Grid */}
      <PostGrid posts={paginatedPosts} />

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center mt-12" aria-label="Blog pagination">
          <div className="join">
            {/* Previous Button */}
            {currentPage > 1 ? (
              <a
                href={category 
                  ? `/blog?page=${currentPage - 1}&category=${category}`
                  : `/blog?page=${currentPage - 1}`
                }
                className="join-item btn btn-outline"
                aria-label="Previous page"
              >
                «
              </a>
            ) : (
              <button className="join-item btn btn-outline btn-disabled">»</button>
            )}

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <a
                key={pageNum}
                href={category
                  ? `/blog?page=${pageNum}&category=${category}`
                  : `/blog?page=${pageNum}`
                }
                className={`join-item btn ${
                  currentPage === pageNum ? 'btn-primary' : 'btn-outline'
                }`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </a>
            ))}

            {/* Next Button */}
            {currentPage < totalPages ? (
              <a
                href={category
                  ? `/blog?page=${currentPage + 1}&category=${category}`
                  : `/blog?page=${currentPage + 1}`
                }
                className="join-item btn btn-outline"
                aria-label="Next page"
              >
                »
              </a>
            ) : (
              <button className="join-item btn btn-outline btn-disabled">«</button>
            )}
          </div>
        </nav>
      )}

      {/* Results Info */}
      <div className="text-center mt-8 text-sm text-base-content/60">
        <p>
          Showing {startIndex + 1}-{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} articles
        </p>
      </div>

      {/* SEO Content */}
      <section className="mt-16 pt-8 border-t border-base-300" aria-label="About our blog">
        <h2 className="text-2xl font-bold text-base-content mb-4">
          About NexEdge-Ai Blog
        </h2>
        <p className="text-base-content/70 mb-4">
          Welcome to the NexEdge-Ai blog, your go-to source for the latest insights in artificial intelligence, 
          machine learning, and technology trends. Our expert writers deliver in-depth analysis, tutorials, 
          and breaking news to keep you at the forefront of innovation.
        </p>
        <p className="text-base-content/70">
          Whether you're interested in AI research, practical tutorials, or industry analysis, 
          you'll find comprehensive coverage across all our categories. Subscribe to our RSS feed 
          to stay updated with new content.
        </p>
      </section>
    </div>
  );
}