'use client';

import { useEffect, useState } from 'react';

/**
 * Reading Progress Indicator
 * Shows reading progress bar at the top of blog posts
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-1">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/**
 * Reading Time Indicator
 * Shows estimated reading time
 */
export function ReadingTime({ content, className = '' }) {
  const getReadingTime = () => {
    if (!content) return 1;
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const wordsPerMinute = 200;
    return Math.ceil(words / wordsPerMinute);
  };

  const minutes = getReadingTime();

  return (
    <div className={`flex items-center gap-2 text-sm text-base-content/60 ${className}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{minutes} min read</span>
    </div>
  );
}

/**
 * Word Count Indicator
 */
export function WordCount({ content, className = '' }) {
  const getWordCount = () => {
    if (!content) return 0;
    const text = content.replace(/<[^>]*>/g, '');
    return text.split(/\s+/).length;
  };

  const count = getWordCount();

  return (
    <div className={`flex items-center gap-2 text-sm text-base-content/60 ${className}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>{count.toLocaleString()} words</span>
    </div>
  );
}