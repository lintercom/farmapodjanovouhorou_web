import { useState, useEffect } from 'react';
import { getCachedPage, hasCachedPage, preloadPage } from '../utils/siteDataCache';

export function usePageData(pageId: string) {
  const hasCachedData = hasCachedPage(pageId);
  const [data, setData] = useState<any>(() => (hasCachedData ? getCachedPage(pageId) : null));
  const [isLoading, setIsLoading] = useState(!hasCachedData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const hasCachedData = hasCachedPage(pageId);

    const loadData = async () => {
      if (!hasCachedData) {
        setIsLoading(true);
      }
      setError(null);
      try {
        const page = await preloadPage(pageId);
        if (isMounted) {
          setData(page);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
        console.error(`Error loading page data for ${pageId}:`, err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [pageId]);

  return { data, isLoading, error };
}
