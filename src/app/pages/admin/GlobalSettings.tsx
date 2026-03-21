import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Save, Loader2, CheckCircle, XCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { FloatingCard } from '../../components/FloatingCard';
import { Button } from '../../components/Button';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { setCachedSettings } from '../../utils/siteDataCache';

interface GlobalSettingsData {
  // Obecné
  siteName: string;
  logo: string;
  heroImage: string;
  favicon: string;
  systemEmail: string;
  
  // Kontaktní údaje
  phone: string;
  email: string;
  address: string;
  
  // SEO
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  ogImage: string;
  
  // Design
  primaryColor: string;
  secondaryColor: string;
  font: string;
}

export function GlobalSettings() {
  const [settings, setSettings] = useState<GlobalSettingsData>({
    siteName: 'Farma pod Janovou horou',
    logo: '',
    heroImage: '',
    favicon: '',
    systemEmail: 'info@farma.cz',
    phone: '+420 123 456 789',
    email: 'info@farma.cz',
    address: 'Pod Janovou horou 123, 123 45 Vesnice',
    defaultMetaTitle: 'Farma pod Janovou horou',
    defaultMetaDescription: 'Farma pro rodiny s dětmi - koně, hipoterapie, tábory a vyjížďky',
    ogImage: '',
    primaryColor: '#2D5016',
    secondaryColor: '#8B4513',
    font: 'Lora'
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
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

  // Load settings
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-399cd496/settings`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Nepodařilo se načíst nastavení');
      }

      const data = await response.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (err: any) {
      console.error('Error loading settings:', err);
      setError(err.message || 'Chyba při načítání nastavení');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-399cd496/settings`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ settings }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Nepodařilo se uložit nastavení');
      }

      setSaveStatus('success');
      setCachedSettings(settings);
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message || 'Chyba při ukládání nastavení');
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError(null);
    setPasswordStatus('idle');

    // Validation
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

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-399cd496/change-password`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Nepodařilo se změnit heslo');
      }

      setPasswordStatus('success');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Error changing password:', err);
      setPasswordError(err.message || 'Chyba při změně hesla');
      setPasswordStatus('error');
    }
  };

  const updateSetting = (field: keyof GlobalSettingsData, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--farm-accent-green)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--farm-page-bg)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--farm-primary-text)]">
              Globální nastavení
            </h1>
            <p className="text-sm text-[var(--farm-secondary-text)] mt-1">
              Upravte obecná nastavení webu
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin">
              <Button 
                variant="outline" 
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Zpět
              </Button>
            </Link>
            <Button 
              variant="primary" 
              className="gap-2" 
              onClick={handleSave}
              disabled={isSaving}
            >
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

        {/* Error Message */}
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

        {/* Success Message */}
        {saveStatus === 'success' && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Úspěšně uloženo</p>
                <p className="text-sm mt-1">Nastavení byla úspěšně aktualizována.</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* 1. Obecné */}
          <FloatingCard hover={false}>
            <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">1️⃣ Obecné</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                  Název webu
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => updateSetting('siteName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                  placeholder="Farma pod Janovou horou"
                />
              </div>
              
              <ImageUpload
                label="Logo"
                value={settings.logo}
                onChange={(url) => updateSetting('logo', url)}
              />

              <ImageUpload
                label="Výchozí hero obrázek"
                value={settings.heroImage}
                onChange={(url) => updateSetting('heroImage', url)}
              />
              
              <ImageUpload
                label="Favicon"
                value={settings.favicon}
                onChange={(url) => updateSetting('favicon', url)}
              />
              
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                  E-mail pro systémové zprávy
                </label>
                <input
                  type="email"
                  value={settings.systemEmail}
                  onChange={(e) => updateSetting('systemEmail', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                  placeholder="info@farma.cz"
                />
              </div>
            </div>
          </FloatingCard>

          {/* 2. SEO */}
          <FloatingCard hover={false}>
            <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">2️⃣ SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                  Defaultní meta title
                </label>
                <input
                  type="text"
                  value={settings.defaultMetaTitle}
                  onChange={(e) => updateSetting('defaultMetaTitle', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                  placeholder="Farma pod Janovou horou"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                  Defaultní meta description
                </label>
                <textarea
                  value={settings.defaultMetaDescription}
                  onChange={(e) => updateSetting('defaultMetaDescription', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none bg-white text-[var(--farm-primary-text)]"
                  placeholder="Farma pro rodiny s dětmi - koně, hipoterapie, tábory a vyjížďky"
                />
              </div>
              
              <ImageUpload
                label="OG image (pro sociální sítě)"
                value={settings.ogImage}
                onChange={(url) => updateSetting('ogImage', url)}
              />
            </div>
          </FloatingCard>

          {/* 3. Design */}
          <FloatingCard hover={false}>
            <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">3️⃣ Design</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                  Primární barva
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => updateSetting('primaryColor', e.target.value)}
                    className="h-12 w-20 rounded-xl border border-[var(--farm-border)] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => updateSetting('primaryColor', e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                    placeholder="#2D5016"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                  Sekundární barva
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                    className="h-12 w-20 rounded-xl border border-[var(--farm-border)] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                    placeholder="#8B4513"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                  Font
                </label>
                <select
                  value={settings.font}
                  onChange={(e) => updateSetting('font', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)] cursor-pointer"
                >
                  <option value="Lora">Lora (aktuální)</option>
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>
            </div>
          </FloatingCard>

          {/* 4. Účet uživatele */}
          <FloatingCard hover={false}>
            <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">4️⃣ Změna hesla</h3>
            
            {passwordError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{passwordError}</p>
                </div>
              </div>
            )}

            {passwordStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Heslo bylo úspěšně změněno</p>
                </div>
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
                    onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                    placeholder="••••••••"
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
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                    placeholder="••••••••"
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
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                    placeholder="••••••••"
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

              <Button
                variant="secondary"
                onClick={handlePasswordChange}
                className="w-full"
              >
                Změnit heslo
              </Button>
            </div>
          </FloatingCard>
        </div>
      </div>
    </div>
  );
}