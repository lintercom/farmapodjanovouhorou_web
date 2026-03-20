import { useState, useEffect } from 'react';
import { pagesApi } from '../utils/api';
import { defaultPageContent } from '../utils/defaultPageContent';

export function usePageContent(pageId: string) {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await pagesApi.get(pageId);
        
        if (isMounted) {
          if (response.page) {
            setContent(response.page);
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