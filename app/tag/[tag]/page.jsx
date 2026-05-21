import { generateMetaTags, generateExcerpt, getCanonicalUrl } from '@/app/lib/seo-utils';
import { BreadcrumbSchema, OrganizationSchema, WebSiteSchema } from '@/app/components/seo/JsonLd';
import Breadcrumb from '@/app/components/seo/Breadcrumb';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Get posts by tag
 */
async function getPostsByTag(tag) {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, { cache: 'no-store' });
    if (!res.ok) return [];
    
    const posts = await res.json();
    const tagSlug = tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return posts.filter(post => 
      post.tags && post.tags.some(t => 
        t.toLowerCase() === tagSlug.toLowerCase()
      )
    );
  } catch {
    return [];
  }
}

/**
 * Get all tags for navigation
 */
async function getAllTags() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, { cache: 'no-store' });
    if (!res.ok) return [];
    
    const posts = await res.json();
    return [...new Set(posts.flatMap(post => post.tags || []).filter(Boolean))];
  } catch {
    return [];
  }
}

/**
 * Generate static params for all tags
 */
export async function generateStaticParams() {
  const tags = await getAllTags();
  
  return tags.map(tag => ({
    tag: tag
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }));
}

/**
 * Generate dynamic metadata for tag pages
 */
export async function generateMetadata({ params }) {
  const { tag } = await params;
  const tagName = tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const description = `Explore all articles tagged with ${tagName} on NexEdge-Ai. Find the latest insights and tutorials about ${tagName}.`;
  const canonical = getCanonicalUrl(`/tag/${tag}`);
  const image = `${BASE_URL}/og?title=${encodeURIComponent(tagName)}&type=tag`;
  
  return generateMetaTags({
    title: `${tagName} - NexEdge-Ai`,
    description,
    canonical,
    image,
    type: 'website',
    tags: [tagName, 'articles', 'blog']
  });
}

/**
 * Tag Page Component
 */
export default async function TagPage({ params }) {
  const { tag } = await params;
  const tagName = tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const posts = await getPostsByTag(tag);
  const allTags = await getAllTags();
  const canonical = getCanonicalUrl(`/tag/${tag}`);
  
  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Tags', url: '/blog' },
    { name: tagName, url: `/tag/${tag}` }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* JSON-LD Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb />
      
      {/* Tag Header */}
      <header className="mb-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-semibold text-secondary bg-secondary/10 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Tag
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            #{tagName}
          </h1>
          
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Explore all articles tagged with {tagName}. {posts.length} {posts.length === 1 ? 'article' : 'articles'} found.
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
                  <span className="badge badge-secondary badge-sm">
                    {post.category}
                  </span>
                  {post.tags && post.tags.slice(0, 2).map(postTag => (
                    <span key={postTag} className="badge badge-ghost badge-sm">
                      {postTag}
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
                    className="btn btn-sm btn-outline btn-secondary"
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
          <div className="text-6xl mb-4">🏷️</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No Articles Found
          </h2>
          <p className="text-base-content/70">
            There are no articles with this tag yet. Check back soon!
          </p>
          <a href="/blog" className="btn btn-primary mt-6">
            Browse All Articles
          </a>
        </div>
      )}
      
      {/* Tag Cloud */}
      <nav className="mt-16 pt-8 border-t border-base-300" aria-label="Tag navigation">
        <h2 className="text-2xl font-bold text-base-content mb-6">
          Popular Tags
        </h2>
        <div className="flex flex-wrap gap-3">
          {allTags.map(t => {
            const tSlug = t
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '');
            
            const postCount = posts.filter(p => 
              p.tags && p.tags.some(tag => 
                tag.toLowerCase() === t.toLowerCase()
              )
            ).length;
            
            return (
              <a
                key={t}
                href={`/tag/${tSlug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  t === tagName
                    ? 'btn btn-secondary'
                    : 'btn btn-outline btn-sm'
                }`}
              >
                #{t}
                {postCount > 0 && (
                  <span className="ml-1 opacity-70">({postCount})</span>
                )}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}