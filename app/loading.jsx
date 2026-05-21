'use client';

/**
 * Global Loading State
 * Shown during page transitions and data fetching
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-50 animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-base-content mb-2">
            Loading...
          </h2>
          <p className="text-sm text-base-content/60">
            Preparing your content
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-base-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-loading"></div>
        </div>

        <style jsx>{`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .animate-loading {
            animation: loading 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
}