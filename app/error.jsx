'use client';

import { useEffect } from 'react';

/**
 * Global Error Boundary
 * Handles uncaught errors gracefully with SEO-friendly error page
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application Error:', error);
    
    // Could send to error tracking service here
    // if (process.env.NODE_ENV === 'production') {
    //   sendToErrorTracking(error);
    // }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-error/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-error"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-base-content mb-4">
          Oops!
        </h1>
        <p className="text-lg text-base-content/70 mb-8">
          Something went wrong. We're working on fixing it.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="mb-8 p-4 bg-base-200 rounded-lg text-left">
            <p className="text-sm text-base-content/60 font-mono">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn btn-primary"
          >
            Try Again
          </button>
          <a
            href="/"
            className="btn btn-outline"
          >
            Go Home
          </a>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-base-content/50">
          <p>If the problem persists, please contact support.</p>
        </div>
      </div>
    </div>
  );
}