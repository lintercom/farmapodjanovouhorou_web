import { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router';
import { useAdmin } from '../../contexts/AdminContext';
import { LogOut, Settings } from 'lucide-react';
import logoImg from '/logo-placeholder.svg';
import { useGlobalSettings } from '../../hooks/useGlobalSettings';
import { applySeoMetadata } from '../../utils/seo';
import '../../../styles/cms-admin.css';

export function AdminLayout() {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const { settings } = useGlobalSettings();
  const adminLogo = settings?.logo?.trim() ? settings.logo : logoImg;

  useEffect(() => {
    if (!isAuthenticated) {
      // Kontrola, zda session vyprĹˇela
      const sessionExpired = localStorage.getItem('adminSessionExpired');
      if (sessionExpired === 'true') {
        // Odstraníme flag a pĹ™esměrujeme s parametrem
        localStorage.removeItem('adminSessionExpired');
        navigate('/cms-prihlaseni?expired=true');
      } else {
        // Manuální odhláĹˇení
        navigate('/cms-prihlaseni');
      }
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const siteName = settings?.siteName?.trim() || 'Farma pod Janovou horou';

    applySeoMetadata({
      title: `Administrace | ${siteName}`,
      description: 'Administrace webu Farmy pod Janovou horou.',
      canonicalUrl: `${window.location.origin}${window.location.pathname}`,
      siteName,
      robots: 'noindex, nofollow',
      faviconUrl: settings?.favicon?.trim() || undefined,
    });
  }, [settings?.favicon, settings?.siteName]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="cms-admin-scope min-h-screen bg-[var(--farm-page-bg)] pb-[env(safe-area-inset-bottom,0px)]">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--farm-neutral-200)] bg-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex min-h-14 items-center justify-between gap-2 py-2 sm:min-h-16 sm:py-0">
            {/* Logo */}
            <Link to="/admin" className="flex items-center gap-3">
              <img 
                src={adminLogo} 
                alt="Farma pod Janovou horou" 
                className="h-6 w-auto"
              />
              <span className="text-sm font-medium text-[var(--farm-secondary-text)] hidden sm:inline">
                Administrace
              </span>
            </Link>

            {/* Actions */}
            <div className="flex flex-shrink-0 items-center gap-1 sm:gap-3">
              <Link to="/">
                <button className="rounded-lg px-2 py-2 text-[var(--farm-secondary-text)] transition-colors hover:bg-[var(--farm-neutral-100)] hover:text-[var(--farm-primary-text)] sm:px-4">
                  <span className="hidden sm:inline">Zobrazit web</span>
                  <span className="sm:hidden">Web</span>
                </button>
              </Link>

              <Link to="/admin/settings">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--farm-secondary-text)] hover:bg-[var(--farm-neutral-100)] hover:text-[var(--farm-primary-text)] transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Nastavení</span>
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--farm-secondary-text)] hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Odhlásit se</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Outlet />
    </div>
  );
}
