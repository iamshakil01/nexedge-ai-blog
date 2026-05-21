import Link from 'next/link';

/**
 * About Page
 * Required for AdSense approval - establishes credibility and trust
 */
export const metadata = {
  title: 'About NexEdge-Ai - AI & Technology Blog',
  description: 'Learn about NexEdge-Ai, your trusted source for AI insights, machine learning tutorials, and technology trends. Discover our mission and expert team.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          About NexEdge-Ai
        </h1>

        <div className="mb-12">
          <p className="text-xl text-base-content/80 leading-relaxed">
            NexEdge-Ai is your premier destination for cutting-edge insights into artificial intelligence, 
            machine learning, and the technologies shaping our future.
          </p>
        </div>

        <section className="mb-12">
          <h2>Our Mission</h2>
          <p>
            At NexEdge-Ai, we believe that understanding AI and emerging technologies should be accessible 
            to everyone. Our mission is to demystify complex technical concepts and provide actionable 
            insights that help developers, business leaders, and tech enthusiasts stay ahead of the curve.
          </p>
        </section>

        <section className="mb-12">
          <h2>What We Cover</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="font-bold text-lg mb-2">🤖 AI & Machine Learning</h3>
              <p className="text-base-content/70 text-sm">
                Deep dives into neural networks, NLP, computer vision, and the latest AI breakthroughs.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="font-bold text-lg mb-2">📊 Data Science</h3>
              <p className="text-base-content/70 text-sm">
                Practical tutorials on data analysis, visualization, and statistical modeling.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="font-bold text-lg mb-2">🚀 Tech Trends</h3>
              <p className="text-base-content/70 text-sm">
                Analysis of emerging technologies and their impact on business and society.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="font-bold text-lg mb-2">🛠️ Tutorials</h3>
              <p className="text-base-content/70 text-sm">
                Step-by-step guides for implementing AI solutions and best practices.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Why Trust Us?</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-primary font-bold">✓</span>
              <div>
                <strong>Expert Writers</strong>
                <p className="text-base-content/70">
                  Our content is created by experienced AI researchers, data scientists, and tech journalists 
                  with proven track records in the industry.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-primary font-bold">✓</span>
              <div>
                <strong>Research-Backed</strong>
                <p className="text-base-content/70">
                  Every article is thoroughly researched and fact-checked against peer-reviewed papers, 
                  official documentation, and industry reports.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-primary font-bold">✓</span>
              <div>
                <strong>Practical Focus</strong>
                <p className="text-base-content/70">
                  We focus on actionable insights that you can apply immediately in your projects, 
                  business, or career.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-primary font-bold">✓</span>
              <div>
                <strong>Community Driven</strong>
                <p className="text-base-content/70">
                  We listen to our readers and create content based on your questions, challenges, 
                  and interests.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="text-center p-6 bg-base-100 rounded-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold mb-2">Accuracy</h4>
              <p className="text-sm text-base-content/70">
                We prioritize factual accuracy over clickbait.
              </p>
            </div>
            <div className="text-center p-6 bg-base-100 rounded-lg">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="font-bold mb-2">Innovation</h4>
              <p className="text-sm text-base-content/70">
                We cover cutting-edge developments first.
              </p>
            </div>
            <div className="text-center p-6 bg-base-100 rounded-lg">
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="font-bold mb-2">Community</h4>
              <p className="text-sm text-base-content/70">
                We serve our readers, not just advertisers.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Get In Touch</h2>
          <p>
            We love hearing from our readers! Whether you have questions, suggestions, or want to 
            contribute, we'd be happy to connect.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a 
              href="mailto:hello@nexedge.ai" 
              className="btn btn-outline"
            >
              Email Us
            </a>
            <Link href="/contact" className="btn btn-outline">
              Contact Form
            </Link>
            <a 
              href="https://twitter.com/nexedgeai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Follow on Twitter
            </a>
          </div>
        </section>

        <section className="mb-12">
          <h2>Stay Updated</h2>
          <p>
            Join thousands of AI enthusiasts who receive our weekly newsletter with the latest 
            insights, tutorials, and industry news.
          </p>
          <div className="mt-6">
            <Link href="/#newsletter" className="btn btn-primary">
              Subscribe to Newsletter
            </Link>
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-base-300">
          <p className="text-center text-base-content/60 text-sm">
            Thank you for being part of the NexEdge-Ai community. Together, we're exploring 
            the future of technology.
          </p>
        </div>
      </article>
    </div>
  );
}