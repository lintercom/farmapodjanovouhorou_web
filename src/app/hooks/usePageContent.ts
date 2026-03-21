import { useState, useEffect } from 'react';
import { defaultPageContent } from '../utils/defaultPageContent';
import { getCachedPage, hasCachedPage, preloadPage } from '../utils/siteDataCache';

export function usePageContent(pageId: string) {
  const hasCachedData = hasCachedPage(pageId);
  const [content, setContent] = useState<any>(() => {
    if (!hasCachedData) {
      return null;
    }

    return getCachedPage(pageId) || defaultPageContent[pageId] || {};
  });
  const [isLoading, setIsLoading] = useState(!hasCachedData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const hasCachedData = hasCachedPage(pageId);

    const loadContent = async () => {
      if (!hasCachedData) {
        setIsLoading(true);
      }
      setError(null);

      try {
        const page = await preloadPage(pageId);
        
        if (isMounted) {
          if (page) {
            setContent(page);
          } else {
            // Use default content if not found in database
            setContent(defaultPageContent[pageId] || {});
          }
        }
      } catch (err: any) {
        console.error(`Error loading page ${pageId}:`, err);
        
        if (isMounted) {
          // On error, use default content
          setContent(defaultPageContent[pageId] || {});
          // Don't set error to avoid showing error message to users
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [pageId]);

  return { content, isLoading, error };
}