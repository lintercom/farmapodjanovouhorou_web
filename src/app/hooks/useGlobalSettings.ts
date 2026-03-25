import { useEffect, useState } from 'react';
import { getCachedSettings, hasCachedSettings, preloadSettings } from '../utils/siteDataCache';

interface GlobalSettings {
  siteName?: string;
  logo?: string;
  heroImage?: string;
  favicon?: string;
  systemEmail?: string;
  phone?: string;
  email?: string;
  address?: string;
  /** Volitelné — mohou zůstat ve starém uložení; SEO řešíte v kódu, RouteSeo má fallbacky. */
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  ogImage?: string;
}

export function useGlobalSettings() {
  const hasCachedData = hasCachedSettings();
  const [settings, setSettings] = useState<GlobalSettings | null>(() => (
    hasCachedData ? getCachedSettings() : null
  ));
  const [isLoading, setIsLoading] = useState(!hasCachedData);

  useEffect(() => {
    let isMounted = true;
    const hasCachedData = hasCachedSettings();

    async function loadSettings() {
      if (!hasCachedData) {
        setIsLoading(true);
      }

      try {
        const cachedSettings = await preloadSettings();
        if (isMounted) {
          setSettings(cachedSettings || null);
        }
      } catch (error) {
        console.error('Error loading global settings:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  return { settings, isLoading };
}

