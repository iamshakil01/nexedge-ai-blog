'use client';

import { useState } from 'react';

/**
 * Newsletter CTA Component
 * High-converting newsletter signup for revenue optimization
 */
export default function NewsletterCTA({ 
  title = "Stay Ahead of the AI Curve",
  subtitle = "Get the latest AI insights delivered to your inbox",
  buttonText = "Subscribe Now",
  placeholder = "Enter your email",
  className = ""
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    // TODO: Connect to your email service (Mailchimp, ConvertKit, etc.)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className={`my-12 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 ${className}`}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-base-content mb-2">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-base-content/70 mb-6">
          {subtitle}
        </p>

        {/* Form */}
        {status === 'success' ? (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-success font-medium">
              🎉 Thanks for subscribing! Check your email for confirmation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              disabled={status === 'loading'}
              className="flex-1 input input-bordered focus:input-primary"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-primary px-6"
            >
              {status === 'loading' ? (
                <span className="loading loading-spinner"></span>
              ) : (
                buttonText
              )}
            </button>
          </form>
        )}

        {/* Privacy note */}
        <p className="text-xs text-base-content/50 mt-4">
          No spam. Unsubscribe anytime. Read our{' '}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

/**
 * Inline Newsletter CTA (for within content)
 */
export function InlineNewsletterCTA() {
  return (
    <div className="my-8 p-6 bg-base-200 rounded-xl border border-base-300">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-base-content mb-1">
            Enjoying this article?
          </h4>
          <p className="text-sm text-base-content/70">
            Get more AI insights delivered to your inbox.
          </p>
        </div>
        <a href="#newsletter" className="btn btn-sm btn-outline btn-primary whitespace-nowrap">
          Subscribe Free
        </a>
      </div>
    </div>
  );
}