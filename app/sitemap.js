/**
 * Enhanced Dynamic Sitemap
 * Includes posts, categories, tags, and static pages
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Get all unique categories from posts
 */
async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`);
    if (!res.ok) return [];
    
    const posts = await res.json();
    const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
    return categories;
  } catch {
    return [];
  }
}

/**
 * Get all unique tags from posts
 */
async function getTags() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`);
    if (!res.ok) return [];
    
    const posts = await res.json();
    const tags = [...new Set(posts.flatMap(post => post.tags || []))];
    return tags;
  } catch {
    return [];
  }
}

/**
 * Get all posts for sitemap
 */
async function getPosts() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

/**
 * Generate priority based on content type
 */
function getPriority(type) {
  switch (type) {
    case 'home':
      return 1.0;
    case 'blog':
      return 0.9;
    case 'category':
      return 0.8;
    case 'tag':
      return 0.7;
    case 'post':
      return 0.8;
    default:
      return 0.5;
  }
}

/**
 * Generate change frequency based on content type
 */
function getChangeFrequency(type) {
  switch (type) {
    case 'home':
      return 'daily';
    case 'blog':
      return 'daily';
    case 'category':
      return 'weekly';
    case 'tag':
      return 'weekly';
    case 'post':
      return 'monthly';
    default:
      return 'weekly';
  }
}

/**
 * Main sitemap generation function
 */
export default async function sitemap() {
  const currentDate = new Date().toISOString();
  
  // Static routes
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: getChangeFrequency('home'),
      priority: getPriority('home'),
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: getChangeFrequency('blog'),
      priority: getPriority('blog'),
    },
    {
      url: `${BASE_URL}/admin`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.1,
    },
  ];

  // Get dynamic routes
  const [posts, categories, tags] = await Promise.all([
    getPosts(),
    getCategories(),
    getTags()
  ]);

  // Post routes
  const postRoutes = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedDate || post.publishedDate || post.createdAt).toISOString(),
    changeFrequency: getChangeFrequency('post'),
    priority: getPriority('post'),
  }));

  // Category routes
  const categoryRoutes = categories.map(category => {
    const categorySlug = category
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    return {
      url: `${BASE_URL}/category/${categorySlug}`,
      lastModified: currentDate,
      changeFrequency: getChangeFrequency('category'),
      priority: getPriority('category'),
    };
  });

  // Tag routes
  const tagRoutes = tags.map(tag => {
    const tagSlug = tag
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    return {
      url: `${BASE_URL}/tag/${tagSlug}`,
      lastModified: currentDate,
      changeFrequency: getChangeFrequency('tag'),
      priority: getPriority('tag'),
    };
  });

  // Combine all routes
  return [
    ...staticRoutes,
    ...postRoutes,
    ...categoryRoutes,
    ...tagRoutes,
  ];
}