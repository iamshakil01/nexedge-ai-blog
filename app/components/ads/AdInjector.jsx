import AdSense, { InArticleAd } from './AdSense';

/**
 * Ad Injector Component
 * Strategically places ads within content for maximum revenue while maintaining UX
 */
export default function AdInjector({ 
  content, 
  adSlot, 
  paragraphInterval = 3,
  firstAdAfterParagraph = 2,
  maxAds = 3 
}) {
  if (!content) return null;

  // Parse HTML content and insert ads at strategic positions
  const insertAdsInContent = (htmlContent) => {
    // Create a temporary div to work with HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Get all paragraph elements
    const paragraphs = tempDiv.querySelectorAll('p');
    
    if (paragraphs.length < firstAdAfterParagraph + 2) {
      // Content too short for ads
      return htmlContent;
    }

    let adCount = 0;
    const fragment = document.createDocumentFragment();
    
    paragraphs.forEach((paragraph, index) => {
      // Add the paragraph
      fragment.appendChild(paragraph.cloneNode(true));
      
      // Check if we should insert an ad after this paragraph
      const shouldInsertAd = 
        index >= firstAdAfterParagraph - 1 && 
        (index - (firstAdAfterParagraph - 1)) % paragraphInterval === 0 &&
        adCount < maxAds;
      
      if (shouldInsertAd) {
        // Create ad container
        const adContainer = document.createElement('div');
        adContainer.className = 'my-8 mx-auto max-w-4xl';
        adContainer.setAttribute('data-ad-container', 'true');
        
        // Create ins tag for AdSense
        const insTag = document.createElement('ins');
        insTag.className = 'adsbygoogle';
        insTag.style.display = 'block';
        insTag.setAttribute('data-ad-client', process.env.NEXT_PUBLIC_ADSENSE_ID);
        insTag.setAttribute('data-ad-slot', adSlot);
        insTag.setAttribute('data-ad-format', 'fluid');
        insTag.setAttribute('data-ad-layout-key', '-fb+5w+4e-db+86');
        insTag.setAttribute('data-full-width-responsive', 'true');
        
        // Add ad label
        const labelDiv = document.createElement('div');
        labelDiv.className = 'text-xs text-base-content/40 mb-2 text-center';
        labelDiv.textContent = 'Advertisement';
        
        adContainer.appendChild(labelDiv);
        adContainer.appendChild(insTag);
        fragment.appendChild(adContainer);
        
        adCount++;
      }
    });
    
    // Replace original content with modified content
    tempDiv.innerHTML = '';
    tempDiv.appendChild(fragment);
    
    return tempDiv.innerHTML;
  };

  // For server-side rendering, we'll use a simpler approach
  const injectAdsServerSide = (htmlContent) => {
    const paragraphs = htmlContent.split(/<\/p>/);
    
    if (paragraphs.length < firstAdAfterParagraph + 2) {
      return htmlContent;
    }

    let adCount = 0;
    let result = '';
    
    paragraphs.forEach((paragraph, index) => {
      if (!paragraph.trim()) return;
      
      result += paragraph + '</p>';
      
      const shouldInsertAd = 
        index >= firstAdAfterParagraph - 1 && 
        (index - (firstAdAfterParagraph - 1)) % paragraphInterval === 0 &&
        adCount < maxAds;
      
      if (shouldInsertAd) {
        result += `
          <div class="my-8 mx-auto max-w-4xl" data-ad-container="true">
            <div class="text-xs text-base-content/40 mb-2 text-center">Advertisement</div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${process.env.NEXT_PUBLIC_ADSENSE_ID}"
                 data-ad-slot="${adSlot}"
                 data-ad-format="fluid"
                 data-ad-layout-key="-fb+5w+4e-db+86"
                 data-full-width-responsive="true"></ins>
          </div>
        `;
        adCount++;
      }
    });
    
    return result;
  };

  // Use server-side injection for initial render
  const contentWithAds = injectAdsServerSide(content);

  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: contentWithAds }}
    />
  );
}

/**
 * Ad Placement Helper
 * Returns optimal ad positions based on content length
 */
export function getOptimalAdPositions(contentLength) {
  const positions = [];
  
  // First ad after 2nd paragraph (high visibility)
  if (contentLength > 300) {
    positions.push(2);
  }
  
  // Second ad after 5th paragraph (mid-content)
  if (contentLength > 600) {
    positions.push(5);
  }
  
  // Third ad after 8th paragraph (deep content)
  if (contentLength > 900) {
    positions.push(8);
  }
  
  // Fourth ad after 12th paragraph (long-form content)
  if (contentLength > 1200) {
    positions.push(12);
  }
  
  return positions;
}

/**
 * Calculate optimal number of ads based on content length
 */
export function getOptimalAdCount(contentLength) {
  if (contentLength < 300) return 0;
  if (contentLength < 600) return 1;
  if (contentLength < 900) return 2;
  if (contentLength < 1200) return 3;
  return 4; // Maximum 4 ads for very long content
}