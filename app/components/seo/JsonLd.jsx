/**
 * JSON-LD Structured Data Component
 * Renders schema.org structured data for SEO
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * BlogPosting Schema Component
 * Use this on individual blog post pages
 */
export function BlogPostingSchema({ post }) {
  if (!post) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.content?.substring(0, 160).replace(/<[^>]*>/g, ''),
    "image": post.thumbnail || `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.png`,
    "datePublished": new Date(post.publishedDate || post.createdAt).toISOString(),
    "dateModified": new Date(post.modifiedDate || post.publishedDate || post.createdAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || "NexEdge-Ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NexEdge-Ai",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`
    },
    "articleSection": post.category || "Technology",
    "keywords": post.tags?.join(', ') || 'AI, technology, machine learning',
    "url": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`,
    "wordCount": post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0,
    "inLanguage": "en"
  };

  return <JsonLd data={schema} />;
}

/**
 * Organization Schema Component
 * Use this on the homepage or in the root layout
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NexEdge-Ai",
    "description": "Intelligent Future Solutions — AI & Tech Blog",
    "url": process.env.NEXT_PUBLIC_BASE_URL,
    "logo": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
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

  return <JsonLd data={schema} />;
}

/**
 * WebSite Schema Component
 * Use this on the homepage
 */
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NexEdge-Ai",
    "description": "Deep dives into artificial intelligence, global tech trends, and the tools shaping tomorrow.",
    "url": process.env.NEXT_PUBLIC_BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return <JsonLd data={schema} />;
}

/**
 * BreadcrumbList Schema Component
 * Use this on pages with breadcrumb navigation
 */
export function BreadcrumbSchema({ items }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.url}` : undefined
    }))
  };

  return <JsonLd data={schema} />;
}

/**
 * Article Schema Component (for blog listing pages)
 */
export function ArticleSchema({ post }) {
  if (!post) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.thumbnail || `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.png`,
    "datePublished": new Date(post.publishedDate || post.createdAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || "NexEdge-Ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NexEdge-Ai",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`
      }
    },
    "articleSection": post.category || "Technology",
    "url": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`
  };

  return <JsonLd data={schema} />;
}