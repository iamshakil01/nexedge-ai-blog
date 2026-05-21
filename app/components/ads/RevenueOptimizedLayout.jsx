import NewsletterCTA, { InlineNewsletterCTA } from './NewsletterCTA';
import { HorizontalAd, InArticleAd, SidebarAd, StickyFooterAd } from './AdSense';

/**
 * Revenue Optimized Layout Component
 * Premium blog layout optimized for both user experience and maximum AdSense revenue
 */
export default function RevenueOptimizedLayout({ 
  children, 
  sidebar = true,
  showNewsletterCTA = true,
  showRelatedPosts = true,
  relatedPosts = []
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <main className="flex-1 lg:max-w-[70%]">
          {children}
          
          {/* Inline Newsletter CTA within content */}
          {showNewsletterCTA && <InlineNewsletterCTA />}
          
          {/* Related Posts Section */}
          {showRelatedPosts && relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-base-300">
              <h2 className="text-2xl font-bold text-base-content mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post, index) => (
                  <article 
                    key={index}
                    className="card bg-base-100 shadow-md hover:shadow-xl transition-all"
                  >
                    {post.thumbnail && (
                      <figure className="px-4 pt-4">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="rounded-lg h-32 w-full object-cover"
                          loading="lazy"
                        />
                      </figure>
                    )}
                    <div className="card-body p-4">
                      <h3 className="font-bold text-base line-clamp-2">
                        <a href={`/blog/${post.slug}`} className="hover:text-primary">
                          {post.title}
                        </a>
                      </h3>
                      <time className="text-xs text-base-content/60">
                        {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        {sidebar && (
          <aside className="lg:w-80 space-y-8">
            {/* Sidebar Ad */}
            <SidebarAd slot="1234567890" size="medium" />
            
            {/* Popular Posts Widget */}
            <div className="bg-base-100 rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg text-base-content mb-4">
                Popular Articles
              </h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((_, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary font-bold text-lg">0{i + 1}</span>
                    <a href="#" className="text-sm text-base-content hover:text-primary line-clamp-2">
                      Sample popular article title {i + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Sidebar Widget */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
              <h3 className="font-bold text-lg text-base-content mb-2">
                Newsletter
              </h3>
              <p className="text-sm text-base-content/70 mb-4">
                Get AI insights delivered weekly.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="input input-sm input-bordered w-full mb-2"
              />
              <button className="btn btn-primary btn-sm w-full">
                Subscribe
              </button>
            </div>

            {/* Categories Widget */}
            <div className="bg-base-100 rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg text-base-content mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {['AI & Machine Learning', 'Data Science', 'Tech Trends', 'Tutorials'].map((cat) => (
                  <li key={cat}>
                    <a href="#" className="flex justify-between text-sm text-base-content hover:text-primary">
                      <span>{cat}</span>
                      <span className="text-base-content/50">({Math.floor(Math.random() * 20) + 5})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Ad */}
      <div className="mt-12">
        <HorizontalAd slot="0987654321" />
      </div>
    </div>
  );
}

/**
 * Blog Post Layout (Optimized for Ad Revenue)
 */
export function BlogPostLayout({ children, sidebar = true }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Article Content */}
        <article className="flex-1 lg:max-w-[70%]">
          {children}
          
          {/* Mid-content Newsletter CTA */}
          <NewsletterCTA 
            title="Enjoying this article?"
            subtitle="Join 10,000+ AI enthusiasts getting our weekly insights."
            buttonText="Subscribe Free"
          />
        </article>

        {/* Sidebar with Ads */}
        {sidebar && (
          <aside className="lg:w-80 space-y-8">
            {/* Top Sidebar Ad */}
            <SidebarAd slot="1111111111" size="large" />
            
            {/* Table of Contents (if needed) */}
            <div className="bg-base-100 rounded-lg shadow-md p-4 sticky top-24">
              <h3 className="font-bold text-base-content mb-3">In This Article</h3>
              <ul className="text-sm space-y-2 text-base-content/70">
                <li><a href="#" className="hover:text-primary">Introduction</a></li>
                <li><a href="#" className="hover:text-primary">Key Concepts</a></li>
                <li><a href="#" className="hover:text-primary">Implementation</a></li>
                <li><a href="#" className="hover:text-primary">Conclusion</a></li>
              </ul>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Ad after content */}
      <div className="mt-12">
        <HorizontalAd slot="2222222222" />
      </div>
    </div>
  );
}

/**
 * Homepage Layout (Optimized for Ad Revenue)
 */
export function HomepageLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner Ad */}
      <div className="mb-8">
        <HorizontalAd slot="3333333333" />
      </div>

      {/* Main Content */}
      {children}

      {/* Mid-page Ad */}
      <div className="my-12">
        <MultiplexAd slot="4444444444" />
      </div>

      {/* Bottom Ad */}
      <div className="mt-12 mb-8">
        <HorizontalAd slot="5555555555" />
      </div>

      {/* Sticky Footer Ad (Mobile) */}
      <div className="lg:hidden">
        <StickyFooterAd slot="6666666666" />
      </div>
    </div>
  );
}