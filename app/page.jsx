// HOME PAGE — fetches latest posts, composes all sections

import HeroSection from "./components/server/HeroSection/page.jsx";
import FeaturedPost from "./components/server/FeaturedPost/page.jsx";
import RecentPosts from "./components/server/RecentPosts/page.jsx";
import TopicsSection from "./components/server/TopicsSection/page.jsx";
import CtaBanner from "./components/server/CtaBanner/page.jsx";
import { OrganizationSchema, WebSiteSchema } from "./components/seo/JsonLd";
import { generateMetaTags, getCanonicalUrl } from "./lib/seo-utils";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
 * Generate dynamic metadata for homepage
 */
export const metadata = generateMetaTags({
  title: "NexEdge-Ai — Intelligent Future Solutions",
  description: "Deep dives into artificial intelligence, global tech trends, and the tools shaping tomorrow.",
  canonical: getCanonicalUrl("/"),
  image: `${BASE_URL}/og?type=home`,
  type: "website",
  tags: ["AI", "artificial intelligence", "machine learning", "tech blog", "technology"],
});

/**
 * Generate JSON-LD for homepage
 */
function HomepageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "NexEdge-Ai — Intelligent Future Solutions",
    "description": "Deep dives into artificial intelligence, global tech trends, and the tools shaping tomorrow.",
    "url": BASE_URL,
    "publisher": {
      "@type": "Organization",
      "name": "NexEdge-Ai",
      "url": BASE_URL,
      "logo": `${BASE_URL}/logo.png`,
      "sameAs": [
        "https://twitter.com/nexedgeai",
        "https://github.com/nexedgeai",
        "https://linkedin.com/company/nexedgeai",
      ],
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Homepage Component
 */
export default async function HomePage() {
  const posts = await getPosts();

  // Featured = latest post, Recent = next 6
  const featured = posts[0] ?? null;
  const recent = posts.slice(1, 7);

  // Get unique categories for topics section
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];

  return (
    <div className="relative overflow-hidden">
      {/* JSON-LD Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />
      <HomepageJsonLd />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Featured post — latest article, large card */}
      <FeaturedPost post={featured} />

      {/* 3. Recent posts grid */}
      <RecentPosts posts={recent} />

      {/* 4. Topics / categories */}
      <TopicsSection categories={categories} />

      {/* 5. CTA — join community */}
      <CtaBanner />

      {/* Additional SEO Content */}
      <section className="max-w-6xl mx-auto px-6 py-16" aria-label="About NexEdge-Ai">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>About NexEdge-Ai</h2>
          <p>
            NexEdge-Ai is your premier destination for cutting-edge insights into artificial intelligence, 
            machine learning, and the technologies shaping our future. Our expert team delivers in-depth 
            analysis, tutorials, and the latest news from the world of AI and technology.
          </p>
          <p>
            Whether you're a seasoned developer, a business leader, or simply curious about AI, 
            our content is designed to inform, educate, and inspire. Stay ahead of the curve with 
            NexEdge-Ai.
          </p>
        </div>
      </section>

      {/* FAQ Section for Rich Snippets */}
      <section className="max-w-6xl mx-auto px-6 py-16" aria-label="Frequently Asked Questions">
        <h2 className="text-3xl font-bold text-base-content mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <FAQItem
            question="What is NexEdge-Ai?"
            answer="NexEdge-Ai is a leading technology blog focused on artificial intelligence, machine learning, and emerging tech trends. We provide expert analysis, tutorials, and insights for developers and tech enthusiasts."
          />
          <FAQItem
            question="What topics do you cover?"
            answer="We cover a wide range of topics including AI, machine learning, deep learning, natural language processing, computer vision, data science, and the latest technology trends shaping our future."
          />
          <FAQItem
            question="How often do you publish new content?"
            answer="We publish new articles regularly, covering the latest developments in AI and technology. Subscribe to our RSS feed or newsletter to stay updated with our newest content."
          />
          <FAQItem
            question="Can I contribute to NexEdge-Ai?"
            answer="Yes! We welcome contributions from experts in the field. If you have valuable insights to share about AI or technology, please reach out to our editorial team."
          />
        </div>
      </section>
    </div>
  );
}

/**
 * FAQ Item Component with Schema.org markup
 */
function FAQItem({ question, answer }) {
  return (
    <details className="mb-4 group">
      <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
        <span className="text-base-content">{question}</span>
        <span className="transition group-open:rotate-180">
          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
        </span>
      </summary>
      <p className="text-base-content/70 mt-3 p-4">{answer}</p>
    </details>
  );
}