import { Outlet } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';
import { useEffect } from 'react';

export function Root() {
  useEffect(() => {
    // Set document language to Czech
    document.documentElement.lang = 'cs';
  }, []);

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