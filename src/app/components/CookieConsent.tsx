import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { X } from 'lucide-react';
import { Button } from './Button';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show modal after a brief delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(necessaryOnly);
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setIsVisible(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-scale-in pointer-events-auto">
        {!showSettings ? (
          // Main Cookie Consent View
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--farm-primary-text)] mb-4">
              Používáme cookies
            </h2>
            <p className="text-[var(--farm-secondary-text)] leading-relaxed mb-8">
              Používáme cookies ke zlepšení našich webových stránek, analýze návštěvnosti a personalizaci obsahu. Více informací naleznete v našich{' '}
              <Link 
                to="/cookies" 
                className="text-[var(--farm-accent-green)] hover:underline"
                onClick={() => setIsVisible(false)}
              >
                zásadách cookies
              </Link>.
            </p>

            <div className="flex flex-col gap-3">
              <Button 
                variant="primary" 
                onClick={handleAcceptAll}
                className="w-full justify-center"
              >
                Přijmout vše
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleAcceptNecessary}
                className="w-full justify-center"
              >
                Pouze nezbytné
              </Button>
              
              <button
                onClick={() => setShowSettings(true)}
                className="text-[var(--farm-secondary-text)] hover:text-[var(--farm-primary-text)] hover:underline transition-all text-sm py-2 self-start"
              >
                Nastavení cookies
              </button>
            </div>
          </div>
        ) : (
          // Cookie Settings View
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--farm-primary-text)]">
                Nastavení cookies
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 rounded-full hover:bg-[var(--farm-neutral-100)] flex items-center justify-center transition-colors"
                aria-label="Zavřít nastavení"
              >
                <X className="w-5 h-5 text-[var(--farm-secondary-text)]" />
              </button>
            </div>

            <p className="text-[var(--farm-secondary-text)] text-sm mb-6 leading-relaxed">
              Vyberte kategorie cookies, které chcete povolit. Nezbytné cookies nelze zakázat.
            </p>

            <div className="space-y-5 mb-8">
              {/* Necessary Cookies */}
              <div className="pb-5 border-b border-[var(--farm-neutral-200)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[var(--farm-primary-text)]">
                    Nezbytné cookies
                  </h3>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="sr-only"
                    />
                    <div className="w-11 h-6 bg-[var(--farm-accent-green)] rounded-full opacity-50 cursor-not-allowed">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-6 translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[var(--farm-secondary-text)] leading-relaxed">
                  Tyto cookies jsou nezbytné pro správné fungování webu a nelze je zakázat. Zahrnují základní funkce jako zabezpečení a dostupnost.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="pb-5 border-b border-[var(--farm-neutral-200)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[var(--farm-primary-text)]">
                    Analytické cookies
                  </h3>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className="relative"
                    aria-label="Přepnout analytické cookies"
                  >
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      preferences.analytics 
                        ? 'bg-[var(--farm-accent-green)]' 
                        : 'bg-[var(--farm-neutral-300)]'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-md transform translate-y-1 transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </button>
                </div>
                <p className="text-sm text-[var(--farm-secondary-text)] leading-relaxed">
                  Analytické cookies nám pomáhají pochopit, jak návštěvníci používají naše stránky, abychom je mohli zlepšovat.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[var(--farm-primary-text)]">
                    Marketingové cookies
                  </h3>
                  <button
                    onClick={() => togglePreference('marketing')}
                    className="relative"
                    aria-label="Přepnout marketingové cookies"
                  >
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      preferences.marketing 
                        ? 'bg-[var(--farm-accent-green)]' 
                        : 'bg-[var(--farm-neutral-300)]'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-md transform translate-y-1 transition-transform ${
                        preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                  </button>
                </div>
                <p className="text-sm text-[var(--farm-secondary-text)] leading-relaxed">
                  Marketingové cookies sledují vaši aktivitu napříč webovými stránkami, aby vám mohly být zobrazeny relevantní reklamy.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                variant="primary" 
                onClick={handleSaveSettings}
                className="w-full justify-center"
              >
                Uložit nastavení
              </Button>
              
              <button
                onClick={() => setShowSettings(false)}
                className="text-[var(--farm-secondary-text)] hover:text-[var(--farm-primary-text)] transition-colors text-sm py-2"
              >
                Zpět
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}