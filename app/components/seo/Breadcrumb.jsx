'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BreadcrumbSchema } from './JsonLd';

/**
 * Breadcrumb Navigation Component
 * Provides hierarchical navigation and SEO benefits
 */
export default function Breadcrumb({ className = '' }) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = [
    {
      name: 'Home',
      url: '/',
      isLast: pathSegments.length === 0
    }
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    // Format segment name for display
    let displayName = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Special cases
    if (segment === 'blog') displayName = 'Blog';
    if (segment === 'category') displayName = 'Categories';
    if (segment === 'tag') displayName = 'Tags';
    
    breadcrumbItems.push({
      name: displayName,
      url: currentPath,
      isLast
    });
  });

  // Prepare data for JSON-LD
  const schemaItems = breadcrumbItems.map(item => ({
    name: item.name,
    url: item.url
  }));

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`breadcrumb ${className}`}
    >
      <BreadcrumbSchema items={schemaItems} />
      
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <li 
            key={item.url} 
            className="flex items-center"
            aria-current={item.isLast ? 'page' : undefined}
          >
            {index > 0 && (
              <span 
                className="mx-2 text-gray-400"
                aria-hidden="true"
              >
                /
              </span>
            )}
            
            {item.isLast ? (
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.url}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
      
      <style jsx>{`
        .breadcrumb {
          margin-bottom: 1rem;
        }
        
        @media (max-width: 640px) {
          .breadcrumb {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </nav>
  );
}

/**
 * Simple Breadcrumb Component (for static usage)
 */
export function SimpleBreadcrumb({ items = [], className = '' }) {
  const schemaItems = items.map(item => ({
    name: item.name,
    url: item.url
  }));

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`breadcrumb ${className}`}
    >
      <BreadcrumbSchema items={schemaItems} />
      
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li 
            key={item.url} 
            className="flex items-center"
            aria-current={item.isLast ? 'page' : undefined}
          >
            {index > 0 && (
              <span 
                className="mx-2 text-gray-400"
                aria-hidden="true"
              >
                /
              </span>
            )}
            
            {item.isLast ? (
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.url}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}