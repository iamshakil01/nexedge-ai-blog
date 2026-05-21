import Link from 'next/link';

/**
 * Terms of Service Page
 * Required for AdSense approval
 */
export const metadata = {
  title: 'Terms of Service - NexEdge-Ai',
  description: 'Read the terms of service for NexEdge-Ai. Learn about your rights and responsibilities when using our website.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          Terms of Service
        </h1>
        
        <p className="text-base-content/70 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <section className="mb-12">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using NexEdge-Ai, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section className="mb-12">
          <h2>2. Use of Website</h2>
          <p>
            You may use our website for personal, non-commercial purposes. You agree not to:
          </p>
          <ul>
            <li>Use the website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of the website</li>
            <li>Reproduce, duplicate, or copy content without permission</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>3. Content</h2>
          <p>
            All content on this website, including articles, images, and graphics, is protected by copyright. You may not reproduce, distribute, or create derivative works without our explicit written permission.
          </p>
        </section>

        <section className="mb-12">
          <h2>4. User Comments</h2>
          <p>
            Users may leave comments on our blog posts. You agree not to post:
          </p>
          <ul>
            <li>Defamatory, obscene, or offensive content</li>
            <li>Content that violates any laws</li>
            <li>Spam or promotional content</li>
            <li>Malicious code or links</li>
          </ul>
          <p>
            We reserve the right to remove any comments that violate these terms.
          </p>
        </section>

        <section className="mb-12">
          <h2>5. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content or practices of these external sites.
          </p>
        </section>

        <section className="mb-12">
          <h2>6. Limitation of Liability</h2>
          <p>
            NexEdge-Ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website.
          </p>
        </section>

        <section className="mb-12">
          <h2>7. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.
          </p>
        </section>

        <section className="mb-12">
          <h2>8. Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:legal@nexedge.ai" className="text-primary hover:underline">
              legal@nexedge.ai
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}