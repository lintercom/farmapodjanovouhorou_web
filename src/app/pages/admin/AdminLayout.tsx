import { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router';
import { useAdmin } from '../../contexts/AdminContext';
import { LogOut, Settings } from 'lucide-react';
import logoImg from '/logo-placeholder.svg';
import { useGlobalSettings } from '../../hooks/useGlobalSettings';

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--farm-page-bg)]">
      {/* Admin Header */}
      <header className="bg-white border-b border-[var(--farm-neutral-200)] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
            <div className="flex items-center gap-3">
              <Link to="/">
                <button className="px-4 py-2 rounded-lg text-[var(--farm-secondary-text)] hover:bg-[var(--farm-neutral-100)] hover:text-[var(--farm-primary-text)] transition-colors">
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
