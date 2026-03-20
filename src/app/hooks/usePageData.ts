import { useState, useEffect } from 'react';
import { pagesApi } from '../utils/api';

export function usePageData(pageId: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await pagesApi.get(pageId);
        if (response.page) {
          setData(response.page);
        }
      } catch (err) {
        setError(err as Error);
        console.error(`Error loading page data for ${pageId}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [pageId]);

  return { data, isLoading, error };
}
