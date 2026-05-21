'use client';

import { useEffect, useState } from 'react';

/**
 * AdSense Ad Component
 * Professional ad placement with proper spacing and responsive design
 */
export default function AdSense({ 
  slot, 
  format = 'auto', 
  layout = 'in-article',
  className = '',
  fullWidth = false,
  sticky = false 
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Configure AdSense when component mounts
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsLoaded(true);
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [slot]);

  if (!isVisible || !process.env.NEXT_PUBLIC_ADSENSE_ID) return null;

  const baseClasses = `
    my-8 mx-auto
    transition-all duration-300
    ${fullWidth ? 'w-full' : 'max-w-4xl'}
    ${sticky ? 'sticky bottom-0 z-40' : ''}
    ${className}
  `;

  const containerClasses = `
    relative overflow-hidden
    bg-base-200/50 
    rounded-lg 
    border border-base-300
    ${!isLoaded ? 'animate-pulse' : ''}
  `;

  return (
    <div className={baseClasses} aria-label="Advertisement">
      <div className={containerClasses}>
        {/* Ad Label for transparency */}
        <div className="absolute top-2 right-2 text-xs text-base-content/40 bg-base-100/80 px-2 py-1 rounded">
          Advertisement
        </div>

        {/* Ad Slot */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-ad-layout={layout}
          data-full-width-responsive={fullWidth}
        />

        {/* Placeholder while loading */}
        {!isLoaded && (
          <div className="h-32 flex items-center justify-center text-base-content/30">
            <span className="text-sm">Loading advertisement...</span>
          </div>
        )}

        {/* Close button for better UX */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 left-2 text-xs text-base-content/40 hover:text-base-content bg-base-100/80 px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity"
          aria-label="Close advertisement"
        >
          ✕
        </button>
      </div>

      <style jsx>{`
        .adsbygoogle {
          min-height: 100px;
          display: block;
        }
        
        @media (max-width: 640px) {
          .adsbygoogle {
            min-height: 50px;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Horizontal Banner Ad (728x90, 468x60, 320x50)
 */
export function HorizontalAd({ slot, className = '' }) {
  return (
    <AdSense
      slot={slot}
      format="horizontal"
      layout="rectangle"
      fullWidth={false}
      className={className}
    />
  );
}

/**
 * In-Article Ad (responsive)
 */
export function InArticleAd({ slot, className = '' }) {
  return (
    <AdSense
      slot={slot}
      format="fluid"
      layout="in-article"
      fullWidth={true}
      className={className}
    />
  );
}

/**
 * Multiplex Ad (Grid)
 */
export function MultiplexAd({ slot, className = '' }) {
  return (
    <AdSense
      slot={slot}
      format="fluid"
      layout="multiplex"
      fullWidth={true}
      className={className}
    />
  );
}

/**
 * Sticky Footer Ad (Mobile optimized)
 */
export function StickyFooterAd({ slot }) {
  return (
    <AdSense
      slot={slot}
      format="fluid"
      layout="rectangle"
      fullWidth={true}
      sticky={true}
      className="border-t border-base-300"
    />
  );
}

/**
 * Sidebar Ad (300x250, 300x600)
 */
export function SidebarAd({ slot, size = 'medium' }) {
  const height = size === 'large' ? '600px' : '250px';
  
  return (
    <div className="sticky top-24" aria-label="Sidebar advertisement">
      <div className="bg-base-200/50 rounded-lg border border-base-300 p-4">
        <div className="text-xs text-base-content/40 mb-2">Advertisement</div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', height }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot={slot}
          data-ad-format="rectangle"
          data-full-width-responsive={true}
        />
      </div>
    </div>
  );
}