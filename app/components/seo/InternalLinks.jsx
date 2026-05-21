import Link from 'next/link';

/**
 * Internal Links Component
 * Displays related posts for better internal linking and SEO
 */
export default function InternalLinks({ posts, currentSlug, title = 'Related Articles' }) {
  if (!posts || posts.length === 0) return null;

  // Filter out current post and limit to 3
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-base-300" aria-label="Related articles">
      <h2 className="text-2xl font-bold text-base-content mb-6">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <article 
            key={post._id || post.slug}
            className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {post.thumbnail && (
              <figure className="px-4 pt-4">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="rounded-lg h-32 w-full object-cover"
                  loading={index < 1 ? 'eager' : 'lazy'}
                />
              </figure>
            )}
            
            <div className="card-body p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary badge-xs">
                  {post.category}
                </span>
              </div>
              
              <h3 className="font-bold text-base line-clamp-2">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              
              <time className="text-xs text-base-content/60">
                {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Category Links Component
 * Displays links to category pages
 */
export function CategoryLinks({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <nav className="mb-8" aria-label="Category navigation">
      <h3 className="text-lg font-bold text-base-content mb-4">
        Explore Categories
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const categorySlug = category
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
          
          return (
            <Link
              key={category}
              href={`/category/${categorySlug}`}
              className="px-3 py-1 text-sm bg-base-200 hover:bg-primary hover:text-primary-content rounded-full transition-colors"
            >
              {category}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/**
 * Tag Links Component
 * Displays links to tag pages
 */
export function TagLinks({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <nav className="mb-8" aria-label="Tag navigation">
      <h3 className="text-lg font-bold text-base-content mb-4">
        Popular Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => {
          const tagSlug = tag
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
          
          return (
            <Link
              key={tag}
              href={`/tag/${tagSlug}`}
              className="px-3 py-1 text-sm bg-base-200 hover:bg-secondary hover:text-secondary-content rounded-full transition-colors"
            >
              #{tag}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/**
 * Table of Contents Component
 * Generates a table of contents from heading elements
 */
export function TableOfContents({ headings }) {
  if (!headings || headings.length === 0) return null;

  return (
    <nav className="mb-8 p-4 bg-base-200 rounded-lg" aria-label="Table of contents">
      <h3 className="text-lg font-bold text-base-content mb-4">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => {
          const id = heading.text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          
          const paddingLeft = heading.level === 2 ? 'pl-0' : heading.level === 3 ? 'pl-4' : 'pl-8';
          
          return (
            <li key={index} className={paddingLeft}>
              <a
                href={`#${id}`}
                className="text-sm text-base-content/70 hover:text-primary transition-colors block py-1"
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}