import { Outlet, useLocation } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';
import { useEffect, useLayoutEffect, useState } from 'react';
import { SiteLoadingScreen } from '../components/SiteLoadingScreen';
import { preloadRouteData } from '../utils/preloadRouteData';

export function Root() {
  const location = useLocation();
  const [isRouteReady, setIsRouteReady] = useState(false);

  useEffect(() => {
    // Set document language to Czech
    document.documentElement.lang = 'cs';
  }, []);

  useLayoutEffect(() => {
    let isActive = true;

    setIsRouteReady(false);

    preloadRouteData(location.pathname).finally(() => {
      if (isActive) {
        setIsRouteReady(true);
      }
    });

    return () => {
      isActive = false;
    };
  }, [location.pathname]);

  if (!isRouteReady) {
    return <SiteLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[var(--farm-page-bg)]">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}