import { useEffect, useState } from 'react';
import { settingsApi } from '../utils/api';

interface GlobalSettings {
  siteName?: string;
  logo?: string;
  heroImage?: string;
  favicon?: string;
  systemEmail?: string;
  phone?: string;
  email?: string;
  address?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  ogImage?: string;
  primaryColor?: string;
  secondaryColor?: string;
  font?: string;
}

export function useGlobalSettings() {
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        const response = await settingsApi.get();
        if (isMounted) {
          setSettings(response?.settings || null);
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

