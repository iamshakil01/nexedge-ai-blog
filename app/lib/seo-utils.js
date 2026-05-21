/**
 * SEO Utility Functions
 * Production-ready helpers for SEO optimization
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Generate SEO-friendly slug from title
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate excerpt from content (plain text or HTML)
 * @param {string} content - HTML or plain text content
 * @param {number} maxLength - Maximum length (default: 160)
 * @param {boolean} isHtml - Whether content contains HTML
 */
export function generateExcerpt(content, maxLength = 160, isHtml = true) {
  if (!content) return '';
  
  let text = content;
  
  // Remove HTML tags if content is HTML
  if (isHtml) {
    text = content
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/&#39;/g, "'")
      .replace(/"/g, '"');
  }
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  // Truncate to max length without cutting words
  if (text.length <= maxLength) return text;
  
  let truncated = text.substring(0, maxLength);
  truncated = truncated.substring(0, Math.min(truncated.length, text.lastIndexOf(' ')));
  
  return truncated + '...';
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Format date for SEO (ISO 8601)
 */
export function formatDateForSEO(date) {
  if (!date) return new Date().toISOString();
  return new Date(date).toISOString();
}

/**
 * Generate reading time estimate
 */
export function calculateReadingTime(content) {
  if (!content) return 1;
  
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  const wordsPerMinute = 200;
  
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate JSON-LD for BlogPosting
 */
export function generateBlogPostingSchema(post) {
  const {
    title,
    slug,
    content,
    excerpt,
    thumbnail,
    publishedDate,
    modifiedDate,
    author,
    category,
    tags = []
  } = post;
  
  const url = getCanonicalUrl(`/blog/${slug}`);
  const mainImage = thumbnail || `${BASE_URL}/favicon.png`;
  const description = excerpt || generateExcerpt(content, 160);
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": mainImage,
    "datePublished": formatDateForSEO(publishedDate),
    "dateModified": formatDateForSEO(modifiedDate || publishedDate),
    "author": {
      "@type": "Person",
      "name": author || "NexEdge-Ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NexEdge-Ai",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleBody": generateExcerpt(content, 500),
    "wordCount": content ? content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0,
    "inLanguage": "en",
    "articleSection": category || "Technology",
    "keywords": tags.length > 0 ? tags.join(', ') : 'AI, technology, machine learning',
    "url": url
  };
}

/**
 * Generate JSON-LD for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NexEdge-Ai",
    "description": "Intelligent Future Solutions — AI & Tech Blog",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "sameAs": [
      "https://twitter.com/nexedgeai",
      "https://github.com/nexedgeai",
      "https://linkedin.com/company/nexedgeai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@nexedge.ai"
    }
  };
}

/**
 * Generate JSON-LD for WebSite
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NexEdge-Ai",
    "description": "Deep dives into artificial intelligence, global tech trends, and the tools shaping tomorrow.",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate JSON-LD for BreadcrumbList
 */
export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? getCanonicalUrl(item.url) : undefined
    }))
  };
}

/**
 * Generate JSON-LD for Article (for blog listing)
 */
export function generateArticleSchema(post) {
  const {
    title,
    slug,
    thumbnail,
    publishedDate,
    author,
    category
  } = post;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "image": thumbnail || `${BASE_URL}/favicon.png`,
    "datePublished": formatDateForSEO(publishedDate),
    "author": {
      "@type": "Person",
      "name": author || "NexEdge-Ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NexEdge-Ai",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    },
    "articleSection": category || "Technology",
    "url": getCanonicalUrl(`/blog/${slug}`)
  };
}

/**
 * Optimize image URL for Next.js Image component
 */
export function optimizeImageUrl(url, width = 800, quality = 75) {
  if (!url) return null;
  
  // If it's already a Cloudinary URL, add transformations
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`);
  }
  
  return url;
}

/**
 * Generate meta tags object for Next.js
 */
export function generateMetaTags({
  title,
  description,
  canonical,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}) {
  const imageUrl = image || `${BASE_URL}/favicon.png`;
  const canonicalUrl = canonical || BASE_URL;
  
  return {
    title,
    description,
    canonical: canonicalUrl,
    openGraph: {
      title,
      description,
      type,
      url: canonicalUrl,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title
      }],
      siteName: 'NexEdge-Ai',
      locale: 'en_US',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      site: '@nexedgeai',
      creator: author ? `@${author.toLowerCase().replace(/\s+/g, '')}` : '@nexedgeai'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    keywords: tags.length > 0 ? tags.join(', ') : 'AI, technology, machine learning, tech blog'
  };
}

/**
 * Validate and sanitize SEO data
 */
export function validateSeoData(data) {
  const validated = { ...data };
  
  // Ensure title length is optimal (50-60 characters)
  if (validated.title && validated.title.length > 60) {
    validated.title = validated.title.substring(0, 57) + '...';
  }
  
  // Ensure description length is optimal (150-160 characters)
  if (validated.description && validated.description.length > 160) {
    validated.description = validated.description.substring(0, 157) + '...';
  }
  
  // Ensure slug is SEO-friendly
  if (validated.slug) {
    validated.slug = generateSlug(validated.slug);
  }
  
  return validated;
}

/**
 * Generate pagination metadata
 */
export function generatePaginationMeta({ page, totalPages, baseUrl }) {
  const meta = {};
  
  if (page > 1) {
    meta.previous = page > 2 
      ? `${baseUrl}?page=${page - 1}`
      : baseUrl;
  }
  
  if (page < totalPages) {
    meta.next = `${baseUrl}?page=${page + 1}`;
  }
  
  return meta;
}

/**
 * Create internal linking suggestions
 */
export function generateInternalLinks(posts, currentSlug, limit = 3) {
  return posts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit)
    .map(post => ({
      slug: post.slug,
      title: post.title,
      url: getCanonicalUrl(`/blog/${post.slug}`),
      category: post.category
    }));
}

export default {
  generateSlug,
  generateExcerpt,
  getCanonicalUrl,
  formatDateForSEO,
  calculateReadingTime,
  generateBlogPostingSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  optimizeImageUrl,
  generateMetaTags,
  validateSeoData,
  generatePaginationMeta,
  generateInternalLinks
};