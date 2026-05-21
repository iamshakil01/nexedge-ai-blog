import { generateMetaTags, generateExcerpt, getCanonicalUrl } from '@/app/lib/seo-utils';
import { BreadcrumbSchema, OrganizationSchema, WebSiteSchema } from '@/app/components/seo/JsonLd';
import Breadcrumb from '@/app/components/seo/Breadcrumb';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Get posts by category
 */
async function getPostsByCategory(category) {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, { cache: 'no-store' });
    if (!res.ok) return [];
    
    const posts = await res.json();
    const categorySlug = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return posts.filter(post => 
      post.category?.toLowerCase() === categorySlug.toLowerCase()
    );
  } catch {
    return [];
  }
}

/**
 * Get all categories for navigation
 */
async function getAllCategories() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, { cache: 'no-store' });
    if (!res.ok) return [];
    
    const posts = await res.json();
    return [...new Set(posts.map(post => post.category).filter(Boolean))];
  } catch {
    return [];
  }
}

/**
 * Generate static params for all categories
 */
export async function generateStaticParams() {
  const categories = await getAllCategories();
  
  return categories.map(category => ({
    category: category
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }));
}

/**
 * Generate dynamic metadata for category pages
 */
export async function generateMetadata({ params }) {
  const { category } = await params;
  const categoryName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const description = `Explore all ${categoryName} articles on NexEdge-Ai. Stay updated with the latest insights, trends, and news in ${categoryName}.`;
  const canonical = getCanonicalUrl(`/category/${category}`);
  const image = `${BASE_URL}/og?title=${encodeURIComponent(categoryName)}&type=category`;
  
  return generateMetaTags({
    title: `${categoryName} Articles - NexEdge-Ai`,
    description,
    canonical,
    image,
    type: 'website',
    tags: [categoryName, 'articles', 'blog']
  });
}

/**
 * Category Page Component
 */
export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const posts = await getPostsByCategory(category);
  const canonical = getCanonicalUrl(`/category/${category}`);
  
  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Categories', url: '/blog' },
    { name: categoryName, url: `/category/${category}` }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* JSON-LD Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb />
      
      {/* Category Header */}
      <header className="mb-12">
        <div className="text-center">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary bg-primary/10 rounded-full">
            Category
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            {categoryName}
          </h1>
          
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Explore all {categoryName} articles. {posts.length} {posts.length === 1 ? 'article' : 'articles'} available.
          </p>
        </div>
      </header>
      
      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={post._id || post.slug}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {post.thumbnail && (
                <figure className="px-6 pt-6">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="rounded-xl h-48 w-full object-cover"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </figure>
              )}
              
              <div className="card-body">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-primary badge-sm">
                    {post.category}
                  </span>
                  {post.tags && post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="badge badge-ghost badge-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="card-title text-xl font-bold">
                  <a 
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </a>
                </h2>
                
                <p className="text-base-content/70 line-clamp-3">
                  {post.excerpt || generateExcerpt(post.content, 150)}
                </p>
                
                <div className="card-actions justify-between items-center mt-4">
                  <time className="text-sm text-base-content/60">
                    {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                  
                  <a 
                    href={`/blog/${post.slug}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No Articles Found
          </h2>
          <p className="text-base-content/70">
            There are no articles in this category yet. Check back soon!
          </p>
          <a href="/blog" className="btn btn-primary mt-6">
            Browse All Articles
          </a>
        </div>
      )}
      
      {/* Category Navigation */}
      <nav className="mt-16 pt-8 border-t border-base-300" aria-label="Category navigation">
        <h2 className="text-2xl font-bold text-base-content mb-6">
          Explore Other Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {(await getAllCategories()).map(cat => {
            const catSlug = cat
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '');
            
            return (
              <a
                key={cat}
                href={`/category/${catSlug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === categoryName
                    ? 'btn btn-primary'
                    : 'btn btn-outline btn-sm'
                }`}
              >
                {cat}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}