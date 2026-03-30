import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import {
  Save,
  Loader2,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Pencil,
  Settings2,
  Palette,
  Shield,
} from 'lucide-react';
import { FloatingCard } from '../../components/FloatingCard';
import { Button } from '../../components/Button';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { settingsApi } from '../../utils/api';
import { setCachedSettings } from '../../utils/siteDataCache';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';

/** Ukládá se do KV — odpovídá tomu, co web skutečně používá (logo, hero, favicon, název, e-maily, kontakt). */
export interface GlobalSettingsData {
  siteName: string;
  logo: string;
  heroImage: string;
  favicon: string;
  systemEmail: string;
  phone: string;
  email: string;
  address: string;
}

const DEFAULT_SETTINGS: GlobalSettingsData = {
  siteName: 'Farma pod Janovou horou',
  logo: '',
  heroImage: '',
  favicon: '',
  systemEmail: 'info@farma.cz',
  phone: '+420 123 456 789',
  email: 'info@farma.cz',
  address: 'Pod Janovou horou 123, 123 45 Vesnice',
};

function mergeSettingsFromApi(raw: Record<string, unknown> | null | undefined): GlobalSettingsData {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_SETTINGS };
  }
  const r = raw as Record<string, string>;
  return {
    siteName: String(r.siteName ?? DEFAULT_SETTINGS.siteName),
    logo: String(r.logo ?? DEFAULT_SETTINGS.logo),
    heroImage: String(r.heroImage ?? DEFAULT_SETTINGS.heroImage),
    favicon: String(r.favicon ?? DEFAULT_SETTINGS.favicon),
    systemEmail: String(r.systemEmail ?? DEFAULT_SETTINGS.systemEmail),
    phone: String(r.phone ?? DEFAULT_SETTINGS.phone),
    email: String(r.email ?? DEFAULT_SETTINGS.email),
    address: String(r.address ?? DEFAULT_SETTINGS.address),
  };
}

type SectionId = 'general' | 'design' | 'security' | null;

const modalContentClass =
  'max-h-[min(90dvh,100vh-0.5rem)] w-[calc(100vw-0.75rem)] max-w-[calc(100vw-0.75rem)] overflow-hidden rounded-2xl border border-[var(--farm-border)] bg-[var(--farm-page-bg)] p-0 shadow-[var(--farm-shadow-xl)] lg:max-h-[90vh] lg:w-full lg:max-w-2xl lg:rounded-[2rem] [&>button]:top-3 [&>button]:right-3 [&>button]:rounded-full [&>button]:border [&>button]:border-[var(--farm-border)] [&>button]:bg-white [&>button]:p-2 [&>button]:text-[var(--farm-primary-text)] [&>button]:opacity-100 [&>button]:shadow-sm [&>button]:transition-colors [&>button]:hover:bg-[var(--farm-primary-light)] lg:[&>button]:top-5 lg:[&>button]:right-5';

export function GlobalSettings() {
  const [settings, setSettings] = useState<GlobalSettingsData>({ ...DEFAULT_SETTINGS });
  const [generalDraft, setGeneralDraft] = useState<Pick<
    GlobalSettingsData,
    'siteName' | 'systemEmail' | 'phone' | 'email' | 'address'
  > | null>(null);
  const [designDraft, setDesignDraft] = useState<Pick<GlobalSettingsData, 'logo' | 'heroImage' | 'favicon'> | null>(
    null,
  );

  const [openSection, setOpenSection] = useState<SectionId>(null);

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await settingsApi.get();
      if (data?.settings) {
        setSettings(mergeSettingsFromApi(data.settings));
      } else {
        setSettings({ ...DEFAULT_SETTINGS });
      }
    } catch (err: any) {
      console.error('Error loading settings:', err);
      setError(err.message || 'Chyba při načítání nastavení');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    setError(null);

    try {
      await settingsApi.save(settings);
      setCachedSettings(settings);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message || 'Chyba při ukládání nastavení');
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const openGeneral = () => {
    setGeneralDraft({
      siteName: settings.siteName,
      systemEmail: settings.systemEmail,
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
    });
    setOpenSection('general');
  };

  const saveGeneralModal = () => {
    if (!generalDraft) return;
    setSettings((s) => ({ ...s, ...generalDraft }));
    setOpenSection(null);
    setGeneralDraft(null);
  };

  const openDesign = () => {
    setDesignDraft({
      logo: settings.logo,
      heroImage: settings.heroImage,
      favicon: settings.favicon,
    });
    setOpenSection('design');
  };

  const saveDesignModal = () => {
    if (!designDraft) return;
    setSettings((s) => ({ ...s, ...designDraft }));
    setOpenSection(null);
    setDesignDraft(null);
  };

  const openSecurity = () => {
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordError(null);
    setPasswordStatus('idle');
    setOpenSection('security');
  };

  const handlePasswordChange = async () => {
    setPasswordError(null);
    setPasswordStatus('idle');

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Vyplňte všechna pole');
      setPasswordStatus('error');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Nová hesla se neshodují');
      setPasswordStatus('error');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Nové heslo musí mít alespoň 6 znaků');
      setPasswordStatus('error');
      return;
    }

    setPasswordSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-399cd496/change-password`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Nepodařilo se změnit heslo');
      }

      setPasswordStatus('success');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => {
        setPasswordStatus('idle');
        setOpenSection(null);
      }, 1500);
    } catch (err: any) {
      console.error('Error changing password:', err);
      setPasswordError(err.message || 'Chyba při změně hesla');
      setPasswordStatus('error');
    } finally {
      setPasswordSubmitting(false);
    }
  };

  const sectionCards: {
    id: Exclude<SectionId, null>;
    title: string;
    description: string;
    icon: typeof Settings2;
    onOpen: () => void;
  }[] = [
    {
      id: 'general',
      title: 'Obecné',
      description: 'Název webu, systémový e-mail a kontaktní údaje pro backend / šablony.',
      icon: Settings2,
      onOpen: openGeneral,
    },
    {
      id: 'design',
      title: 'Design',
      description: 'Logo, výchozí hero obrázek a favicon — to, co se skutečně načítá na veřejném webu.',
      icon: Palette,
      onOpen: openDesign,
    },
    {
      id: 'security',
      title: 'Bezpečnost',
      description: 'Změna hesla k administraci.',
      icon: Shield,
      onOpen: openSecurity,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--farm-accent-green)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--farm-page-bg)] px-3 py-8 max-lg:pb-12 sm:px-4 lg:px-4 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-[var(--farm-primary-text)] lg:text-2xl">Globální nastavení</h1>
            <p className="mt-1 text-sm text-[var(--farm-secondary-text)]">
              Upravte sekce v dialozích a změny odešlete tlačítkem „Uložit změny“.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:w-auto">
            <Link to="/admin" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full gap-2 sm:w-auto">
                <ArrowLeft className="w-4 h-4" />
                Zpět
              </Button>
            </Link>
            <Button variant="primary" className="w-full gap-2 sm:w-auto" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ukládání...
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Uloženo
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <XCircle className="w-4 h-4" />
                  Chyba
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Uložit změny
                </>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Chyba</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {saveStatus === 'success' && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Úspěšně uloženo</p>
                <p className="text-sm mt-1">Nastavení byla uložena na server.</p>
              </div>
            </div>
          </div>
        )}

        <FloatingCard hover={false} adminCompact className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-1">Přehled sekcí</h2>
          <p className="text-sm text-[var(--farm-secondary-text)]">
            SEO meta tagy a strukturovaná data jsou řešené v kódu (komponenta RouteSeo a stránky). Zde je pouze obsah,
            který CMS skutečně používá.
          </p>
        </FloatingCard>

        <div className="space-y-4">
          {sectionCards.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="rounded-2xl border border-[var(--farm-border)] bg-white p-4 shadow-[var(--farm-shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--farm-shadow-md)] lg:rounded-3xl lg:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="flex min-w-0 gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--farm-primary-light)] text-[var(--farm-primary)] sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-[var(--farm-primary-text)] lg:text-lg">{section.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--farm-secondary-text)]">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={section.onOpen}
                    className="inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--farm-primary)]/20 bg-[var(--farm-primary-light)] px-4 py-2.5 text-sm font-medium text-[var(--farm-primary-text)] shadow-sm transition-all duration-300 hover:border-[var(--farm-primary)]/35 hover:bg-white hover:shadow-[var(--farm-shadow-sm)] sm:w-auto sm:rounded-full lg:hover:-translate-y-0.5"
                  >
                    <Pencil className="w-4 h-4" />
                    Upravit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Obecné */}
        <Dialog
          open={openSection === 'general'}
          onOpenChange={(open) => {
            if (!open) {
              setOpenSection(null);
              setGeneralDraft(null);
            }
          }}
        >
          <DialogContent className={modalContentClass}>
            <div className="flex max-h-[90vh] flex-col">
              <DialogHeader className="border-b border-[var(--farm-border)] bg-white/80 px-4 py-4 pr-14 text-left backdrop-blur-sm lg:px-6 lg:py-5 lg:pr-16">
                <div className="mb-3 inline-flex w-fit rounded-full bg-[var(--farm-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--farm-primary)]">
                  Globální nastavení
                </div>
                <DialogTitle className="text-2xl text-[var(--farm-primary-text)]">Obecné</DialogTitle>
                <DialogDescription className="text-[var(--farm-secondary-text)]">
                  Základní údaje webu a kontakty. Podrobné údaje na stránce Kontakt upravujte v editoru stránky Kontakt.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(244,252,241,0.35))] px-4 py-4 lg:px-6 lg:py-5">
                {generalDraft && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                        Název webu
                      </label>
                      <input
                        type="text"
                        value={generalDraft.siteName}
                        onChange={(e) => setGeneralDraft((d) => (d ? { ...d, siteName: e.target.value } : d))}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                        E-mail pro systémové zprávy
                      </label>
                      <input
                        type="email"
                        value={generalDraft.systemEmail}
                        onChange={(e) => setGeneralDraft((d) => (d ? { ...d, systemEmail: e.target.value } : d))}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                        Telefon (globální)
                      </label>
                      <input
                        type="text"
                        value={generalDraft.phone}
                        onChange={(e) => setGeneralDraft((d) => (d ? { ...d, phone: e.target.value } : d))}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                        E-mail (globální)
                      </label>
                      <input
                        type="email"
                        value={generalDraft.email}
                        onChange={(e) => setGeneralDraft((d) => (d ? { ...d, email: e.target.value } : d))}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                        Adresa (řádek)
                      </label>
                      <input
                        type="text"
                        value={generalDraft.address}
                        onChange={(e) => setGeneralDraft((d) => (d ? { ...d, address: e.target.value } : d))}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter className="flex flex-col gap-2 border-t border-[var(--farm-border)] bg-white/90 px-4 py-3 backdrop-blur-sm max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-between sm:px-6 sm:py-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpenSection(null);
                    setGeneralDraft(null);
                  }}
                  className="border-[var(--farm-border)]"
                >
                  Zrušit
                </Button>
                <Button type="button" variant="primary" onClick={saveGeneralModal}>
                  Použít v nastavení
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Design */}
        <Dialog
          open={openSection === 'design'}
          onOpenChange={(open) => {
            if (!open) {
              setOpenSection(null);
              setDesignDraft(null);
            }
          }}
        >
          <DialogContent className={modalContentClass}>
            <div className="flex max-h-[90vh] flex-col">
              <DialogHeader className="border-b border-[var(--farm-border)] bg-white/80 px-4 py-4 pr-14 text-left backdrop-blur-sm lg:px-6 lg:py-5 lg:pr-16">
                <div className="mb-3 inline-flex w-fit rounded-full bg-[var(--farm-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--farm-primary)]">
                  Globální nastavení
                </div>
                <DialogTitle className="text-2xl text-[var(--farm-primary-text)]">Design</DialogTitle>
                <DialogDescription className="text-[var(--farm-secondary-text)]">
                  Logo a favicon se zobrazují v hlavičce a patičce, výchozí hero jako pozadí hero sekcí tam, kde stránka
                  nemá vlastní obrázek. Barvy písma a paletu webu určuje soubor theme.css v projektu — v CMS je neupravujte.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(244,252,241,0.35))] px-4 py-4 lg:px-6 lg:py-5">
                {designDraft && (
                  <div className="space-y-4">
                    <ImageUpload
                      label="Logo"
                      value={designDraft.logo}
                      onChange={(url) => setDesignDraft((d) => (d ? { ...d, logo: url } : d))}
                    />
                    <ImageUpload
                      label="Výchozí hero obrázek"
                      value={designDraft.heroImage}
                      onChange={(url) => setDesignDraft((d) => (d ? { ...d, heroImage: url } : d))}
                    />
                    <ImageUpload
                      label="Favicon"
                      value={designDraft.favicon}
                      onChange={(url) => setDesignDraft((d) => (d ? { ...d, favicon: url } : d))}
                    />
                  </div>
                )}
              </div>
              <DialogFooter className="flex flex-col gap-2 border-t border-[var(--farm-border)] bg-white/90 px-4 py-3 backdrop-blur-sm max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-between sm:px-6 sm:py-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpenSection(null);
                    setDesignDraft(null);
                  }}
                  className="border-[var(--farm-border)]"
                >
                  Zrušit
                </Button>
                <Button type="button" variant="primary" onClick={saveDesignModal}>
                  Použít v nastavení
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Bezpečnost */}
        <Dialog
          open={openSection === 'security'}
          onOpenChange={(open) => {
            if (!open) setOpenSection(null);
          }}
        >
          <DialogContent className={modalContentClass}>
            <div className="flex max-h-[90vh] flex-col">
              <DialogHeader className="border-b border-[var(--farm-border)] bg-white/80 px-4 py-4 pr-14 text-left backdrop-blur-sm lg:px-6 lg:py-5 lg:pr-16">
                <div className="mb-3 inline-flex w-fit rounded-full bg-[var(--farm-primary-light)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--farm-primary)]">
                  Globální nastavení
                </div>
                <DialogTitle className="text-2xl text-[var(--farm-primary-text)]">Bezpečnost</DialogTitle>
                <DialogDescription className="text-[var(--farm-secondary-text)]">
                  Změna hesla pro přístup do administrace.
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(244,252,241,0.35))] px-4 py-4 lg:px-6 lg:py-5">
                {passwordError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                    {passwordError}
                  </div>
                )}
                {passwordStatus === 'success' && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm">
                    Heslo bylo úspěšně změněno.
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                      Staré heslo
                    </label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? 'text' : 'password'}
                        value={passwordData.oldPassword}
                        onChange={(e) => setPasswordData((p) => ({ ...p, oldPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--farm-secondary-text)] hover:text-[var(--farm-primary-text)]"
                      >
                        {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                      Nové heslo
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData((p) => ({ ...p, newPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--farm-secondary-text)] hover:text-[var(--farm-primary-text)]"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                      Potvrzení nového hesla
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData((p) => ({ ...p, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--farm-secondary-text)] hover:text-[var(--farm-primary-text)]"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col gap-2 border-t border-[var(--farm-border)] bg-white/90 px-4 py-3 backdrop-blur-sm max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-between sm:px-6 sm:py-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenSection(null)}
                  className="border-[var(--farm-border)]"
                >
                  Zavřít
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handlePasswordChange}
                  disabled={passwordSubmitting}
                  className="gap-2"
                >
                  {passwordSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Změnit heslo
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
