import { Outlet, useLocation } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';
import { useEffect, useLayoutEffect, useState } from 'react';
import { SiteLoadingScreen } from '../components/SiteLoadingScreen';
import { preloadRouteData } from '../utils/preloadRouteData';
import { RouteSeo } from '../components/RouteSeo';
import { ScrollToTopFab } from '../components/ScrollToTopFab';

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

  useEffect(() => {
    document.body.dataset.routeReady = isRouteReady ? 'true' : 'false';

    return () => {
      delete document.body.dataset.routeReady;
    };
  }, [isRouteReady]);

  if (!isRouteReady) {
    return (
      <>
        <RouteSeo />
        <SiteLoadingScreen />
      </>
    );
  }

  return (
    <>
      <RouteSeo />
      <div className="min-h-screen min-w-0 bg-[var(--farm-page-bg)]">
        <Navigation />
        <main className="min-w-0">
          <Outlet />
        </main>
        <Footer />
        <ScrollToTopFab />
        <CookieConsent />
      </div>
    </>
  );
}