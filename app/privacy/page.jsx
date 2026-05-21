import Link from 'next/link';

/**
 * Privacy Policy Page
 * Required for AdSense approval and GDPR compliance
 */
export const metadata = {
  title: 'Privacy Policy - NexEdge-Ai',
  description: 'Learn how NexEdge-Ai collects, uses, and protects your personal information. Our privacy policy explains your rights and how we comply with GDPR and CCPA.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          Privacy Policy
        </h1>
        
        <p className="text-base-content/70 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <section className="mb-12">
          <h2>1. Introduction</h2>
          <p>
            Welcome to NexEdge-Ai. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section className="mb-12">
          <h2>2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            We collect information you voluntarily provide when you:
          </p>
          <ul>
            <li>Subscribe to our newsletter</li>
            <li>Leave comments on blog posts</li>
            <li>Contact us through forms</li>
          </ul>
          <p>
            This may include your name, email address, and any other information you choose to provide.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect:
          </p>
          <ul>
            <li>IP address and browser type</li>
            <li>Operating system</li>
            <li>Pages viewed and time spent</li>
            <li>Referring website</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>3. How We Use Your Information</h2>
          <p>We use collected information for:</p>
          <ul>
            <li>Sending newsletters and updates (with your consent)</li>
            <li>Improving our website and content</li>
            <li>Analyzing usage patterns</li>
            <li>Responding to your inquiries</li>
            <li>Displaying relevant advertisements</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>4. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to:
          </p>
          <ul>
            <li>Remember your preferences</li>
            <li>Understand how you use our site</li>
            <li>Serve relevant advertisements</li>
            <li>Analyze traffic and usage</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling cookies may affect some functionality.
          </p>
        </section>

        <section className="mb-12">
          <h2>5. Third-Party Services</h2>
          <p>We may use third-party services including:</p>
          <ul>
            <li><strong>Google Analytics</strong> - For website analytics</li>
            <li><strong>Google AdSense</strong> - For displaying advertisements</li>
            <li><strong>Cloudinary</strong> - For image hosting</li>
          </ul>
          <p>
            These services may collect information about your interactions with our website. Please review their privacy policies for more information.
          </p>
        </section>

        <section className="mb-12">
          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="mb-12">
          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>8. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section className="mb-12">
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-12">
          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>Email: privacy@nexedge.ai</li>
            <li>Website: <Link href="/" className="text-primary hover:underline">{process.env.NEXT_PUBLIC_BASE_URL}</Link></li>
          </ul>
        </section>
      </article>
    </div>
  );
}