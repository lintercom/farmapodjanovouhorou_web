import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { readCookieConsent } from '../utils/cookieConsent';
import { trackGa4PageView } from '../utils/analytics/runtime';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Virtuální page view při změně cesty (SPA) — GA4 / dataLayer / Meta Pixel.
 */
export function AnalyticsRouteBridge() {
  const location = useLocation();

  useEffect(() => {
    const path = `${location.pathname}${location.search || ''}`;
    const title = typeof document !== 'undefined' ? document.title : '';

    trackGa4PageView(path, title);

    if (readCookieConsent()?.marketing && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname, location.search]);

  return null;
}
