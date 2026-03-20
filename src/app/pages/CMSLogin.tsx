import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { FloatingCard } from '../components/FloatingCard';
import { Button } from '../components/Button';
import { Lock, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export function CMSLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get('expired') === 'true';
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pokud je uživatel již přihlášený, přesměruj ho do CMS
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin?page=domu');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Prosím vyplňte všechna pole');
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay for better UX
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/admin?page=domu');
      } else {
        setError('Nesprávné přihlašovací údaje');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--farm-page-bg)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 mb-4"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--farm-primary-text)] mb-3">
            Přihlášení do administrace
          </h1>
          <p className="text-[var(--farm-secondary-text)] leading-relaxed">
            Zabezpečený přístup do administračního systému Farmy pod Janovou horou.
          </p>
        </div>

        {/* Session Expired Notice */}
        {sessionExpired && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm mb-6 animate-fade-in">
            <p className="font-medium mb-1">Vaše přihlášení vypršelo</p>
            <p className="text-amber-700">Z bezpečnostních důvodů jste byli odhlášeni po 30 minutách neaktivity. Prosím přihlaste se znovu.</p>
          </div>
        )}

        {/* Login Card */}
        <FloatingCard hover={false} className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2"
              >
                Uživatelské jméno
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-[var(--farm-text-primary)] ${
                  error && !username
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-[var(--farm-neutral-300)] focus:border-[var(--farm-accent-green)] focus:ring-[var(--farm-accent-green)]/20'
                } focus:outline-none focus:ring-4 transition-all`}
                placeholder="Zadejte uživatelské jméno"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2"
              >
                Heslo
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-[var(--farm-text-primary)] ${
                  error && !password
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-[var(--farm-neutral-300)] focus:border-[var(--farm-accent-green)] focus:ring-[var(--farm-accent-green)]/20'
                } focus:outline-none focus:ring-4 transition-all`}
                placeholder="Zadejte heslo"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !username || !password}
              className="w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Přihlašuji...' : 'Přihlásit se'}
            </Button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-[var(--farm-secondary-text)] hover:text-[var(--farm-accent-green)] transition-colors"
              >
                Zapomenuté heslo?
              </button>
            </div>
          </form>
        </FloatingCard>

        {/* Back Button */}
        <Link to="/">
          <Button 
            variant="outline" 
            className="w-full justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na hlavní stránku
          </Button>
        </Link>

        {/* Security Notice */}
        <p className="text-center text-xs text-[var(--farm-secondary-text)] mt-6">
          Přístup je chráněn šifrovaným připojením. Vaše přihlašovací údaje jsou v bezpečí.
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}