import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from '/logo-placeholder.svg';
import { useGlobalSettings } from '../hooks/useGlobalSettings';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { settings } = useGlobalSettings();
  const navLogo = settings?.logo?.trim() ? settings.logo : logoImage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change and scroll to top
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      Link.to(path);
    }
  };

  return (
    <>
      {/* Desktop & Mobile Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 overflow-visible bg-white/95 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'shadow-[var(--farm-shadow-md)]' : ''}`}
      >
        <div className="mx-auto max-w-7xl overflow-visible px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between overflow-visible lg:justify-start">
            {/* Spacer for mobile symmetry - same width as hamburger button */}
            <div className="lg:hidden w-10"></div>

            {/* Left Navigation - Desktop only */}
            <div className="hidden lg:flex items-center justify-between gap-4 flex-1 pr-8">
              <Link
                to="/"
                className="px-4 py-2 text-[var(--farm-text-primary)] hover:text-[var(--farm-primary)] hover:bg-[var(--farm-primary-light)] rounded-full transition-all duration-200 whitespace-nowrap"
              >
                Domů
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link
                  to="/sluzby"
                  className="px-4 py-2 text-[var(--farm-text-primary)] hover:text-[var(--farm-primary)] hover:bg-[var(--farm-primary-light)] rounded-full transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
                >
                  Služby
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </Link>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-[var(--farm-shadow-lg)] py-2 overflow-hidden"
                    >
                      <Link
                        to="/sluzby"
                        className="block px-4 py-3 text-[var(--farm-text-primary)] hover:bg-[var(--farm-primary-light)] hover:text-[var(--farm-primary)] transition-colors duration-200 font-semibold"
                      >
                        Všechny služby
                      </Link>
                      <div className="border-t border-[var(--farm-border-light)] my-2" />
                      <Link
                        to="/sluzby#tabory"
                        className="block px-4 py-3 text-[var(--farm-text-primary)] hover:bg-[var(--farm-primary-light)] hover:text-[var(--farm-primary)] transition-colors duration-200"
                      >
                        Tábory
                      </Link>
                      <Link
                        to="/sluzby#krouzky"
                        className="block px-4 py-3 text-[var(--farm-text-primary)] hover:bg-[var(--farm-primary-light)] hover:text-[var(--farm-primary)] transition-colors duration-200"
                      >
                        Kroužky
                      </Link>
                      <Link
                        to="/sluzby#vyjizdy"
                        className="block px-4 py-3 text-[var(--farm-text-primary)] hover:bg-[var(--farm-primary-light)] hover:text-[var(--farm-primary)] transition-colors duration-200"
                      >
                        Vyjížďky
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/blog"
                className="px-4 py-2 text-[var(--farm-text-primary)] hover:text-[var(--farm-primary)] hover:bg-[var(--farm-primary-light)] rounded-full transition-all duration-200 whitespace-nowrap"
              >
                Blog
              </Link>
            </div>

            {/* Center Logo — mobil: po scrollu / otevřeném menu vycentrováno v h-20; velké logo jen mírný posun dolů (desktop ponecháno) */}
            <div
              className={`pointer-events-none absolute left-1/2 top-0 z-[60] flex -translate-x-1/2 justify-center lg:pointer-events-auto lg:relative lg:left-auto lg:top-auto lg:z-auto lg:h-auto lg:w-auto lg:max-w-none lg:translate-x-0 lg:flex-none lg:items-center ${
                isScrolled || isMobileMenuOpen
                  ? 'max-lg:h-20 max-lg:items-center max-lg:w-max max-lg:max-w-[min(300px,calc(100vw-5rem))]'
                  : 'max-lg:items-start'
              }`}
            >
              <Link
                to="/"
                className="pointer-events-auto flex items-center justify-center"
              >
                <img
                  src={navLogo}
                  alt="Farma pod Janovou horou"
                  className={`w-auto max-w-[min(300px,calc(100vw-3rem))] object-contain transition-all duration-300 lg:max-w-none ${
                    !isScrolled && !isMobileMenuOpen
                      ? 'max-lg:translate-y-0 lg:translate-y-[30px]'
                      : 'translate-y-0'
                  }`}
                  style={{
                    height: !isScrolled && !isMobileMenuOpen ? '135px' : '68px',
                  }}
                />
              </Link>
            </div>

            {/* Right Navigation - Desktop only */}
            <div className="hidden lg:flex items-center justify-between gap-4 flex-1 pl-8">
              <Link
                to="/nasi-kone"
                className="px-4 py-2 text-[var(--farm-text-primary)] hover:text-[var(--farm-primary)] hover:bg-[var(--farm-primary-light)] rounded-full transition-all duration-200 whitespace-nowrap"
              >
                Naši koně
              </Link>
              <Link
                to="/o-nas"
                className="px-4 py-2 text-[var(--farm-text-primary)] hover:text-[var(--farm-primary)] hover:bg-[var(--farm-primary-light)] rounded-full transition-all duration-200 whitespace-nowrap"
              >
                O nás
              </Link>
              <Link
                to="/kontakt"
                className="px-4 py-2 bg-[var(--farm-primary)] text-white hover:bg-[var(--farm-primary-hover)] rounded-full transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                Kontakt
              </Link>
            </div>

            {/* Mobile menu button - positioned on the right */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-[var(--farm-primary-light)] transition-colors duration-200 z-10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--farm-text-primary)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--farm-text-primary)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-[var(--farm-border-light)]"
            >
              <div className="px-4 py-6 space-y-2">
                <Link
                  to="/"
                  className="block px-4 py-3 text-[var(--farm-text-primary)] hover:bg-[var(--farm-primary-light)] hover:text-[var(--farm-primary)] rounded-xl transition-all duration-200"
                >
                  Domů
                </Link>

                <div>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-[var(--farm-text-primary)] hover:bg-[var(--farm-primary-light)] hover:text-[var(--farm-primary)] rounded-xl transition-all duration-200"
                  >
                    <span>Služby</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-2 space-y-1"
                      >
                        <Link
                          to="/sluzby"
                          className="block px-4 py-2 text-[var(--farm-text-primary)] hover:text-[var(--farm-primary)] hover:bg-[var(--farm-primary-light)] rounded-lg transition-all duration-200 font-semibold"
                        >
                          Všechny služby
                        </Link>
                        <div className="border-t border-[var(--farm-border-light)] my-2" />
                        <Link
                          to="/sluzby#tabory"
                          className="block px-4 py-2 text-[var(--farm-text-secondary)] hover:text-[var(--farm-primary)] hover:bg-[var(--farm-primary-light)] rounded-lg transition-all duration-200"
                        >
                          Tábory
                        </Link>
                        <Link
                          to="/sluzby#krouzky"
                          className="block px-4 py-2 text-[var(--farm-text-secondary)] hover:text-[var(--farm-primary)] hover:bg-[var(--farm-primary-light)] rounded-lg transition-all duration-200"
                        >
                          Kroužky
                        </Link>
                        <Link
                          to="/sluzby#vyjizdy"
                          className="block px-4 py-2 text-[var(--farm-text-secondary)] hover:text-[var(--farm-primary)] hover:bg-[var(--farm-primary-light)] rounded-lg transition-all duration-200"
                        >
                          Vyjížďky
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/blog"
                  className="block px-4 py-3 text-[var(--farm-text-primary)] hover:bg-[var(--farm-primary-light)] hover:text-[var(--farm-primary)] rounded-xl transition-all duration-200"
                >
                  Blog
                </Link>
                <Link
                  to="/nasi-kone"
                  className="block px-4 py-3 text-[var(--farm-text-primary)] hover:bg-[var(--farm-primary-light)] hover:text-[var(--farm-primary)] rounded-xl transition-all duration-200"
                >
                  Naši koně
                </Link>
                <Link
                  to="/o-nas"
                  className="block px-4 py-3 text-[var(--farm-text-primary)] hover:bg-[var(--farm-primary-light)] hover:text-[var(--farm-primary)] rounded-xl transition-all duration-200"
                >
                  O nás
                </Link>
                <Link
                  to="/kontakt"
                  className="block px-4 py-3 bg-[var(--farm-primary)] text-white hover:bg-[var(--farm-primary-hover)] rounded-full transition-all duration-200 text-center mt-4"
                >
                  Kontakt
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

