import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { 
  Home, BookOpen, Calendar, Carrot, Users, Mail,
  AlertCircle, Shield, Cookie, FileText, AlertTriangle,
  Save, Loader2, CheckCircle, XCircle, Menu, X
} from 'lucide-react';
import { FloatingCard } from '../../components/FloatingCard';
import { Button } from '../../components/Button';
import { pagesApi } from '../../utils/api';
import { defaultPageContent } from '../../utils/defaultPageContent';
import { setCachedPage } from '../../utils/siteDataCache';
import { HomePageEditor } from './editors/HomePageEditor';
import { ServicesPageEditor } from './editors/ServicesPageEditor';
import { 
  EventsPageEditor, 
  HorsesPageEditor, 
  AboutPageEditor, 
  ContactPageEditor, 
  LegalPageEditor 
} from './editors/OtherPageEditors';

interface Page {
  id: string;
  label: string;
  icon: any;
  category?: 'main' | 'footer';
}

export function PageEditor() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  
  const pages: Page[] = [
    { id: 'domu', label: 'Domů', icon: Home, category: 'main' },
    { id: 'sluzby', label: 'Služby', icon: BookOpen, category: 'main' },
    { id: 'blog', label: 'Blog', icon: Calendar, category: 'main' },
    { id: 'nasi-kone', label: 'Naši koně', icon: Carrot, category: 'main' },
    { id: 'o-nas', label: 'O nás', icon: Users, category: 'main' },
    { id: 'kontakt', label: 'Kontakt', icon: Mail, category: 'main' },
    { id: 'ochrana', label: 'Ochrana osobních údajů', icon: Shield, category: 'footer' },
    { id: 'cookies', label: 'Cookies', icon: Cookie, category: 'footer' },
    { id: 'podminky', label: 'Obchodní podmínky', icon: FileText, category: 'footer' },
    { id: 'reklamace', label: 'Reklamační řád', icon: AlertTriangle, category: 'footer' },
    { id: '404', label: '404 stránka', icon: AlertCircle, category: 'footer' },
  ];

  const [selectedPageId, setSelectedPageId] = useState(pageParam || 'domu');
  const [pageData, setPageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load page content when page selection changes
  useEffect(() => {
    loadPageContent(selectedPageId);
  }, [selectedPageId]);

  const loadPageContent = async (pageId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await pagesApi.get(pageId);
      
      // If page exists in DB, use it; otherwise use default
      if (response.page) {
        setPageData(response.page);
      } else {
        // Use default content
        const defaultContent = defaultPageContent[pageId] || { id: pageId, label: pageId };
        setPageData(defaultContent);
      }
    } catch (err: any) {
      console.error('Error loading page:', err);
      // On error, use default content
      const defaultContent = defaultPageContent[pageId] || { id: pageId, label: pageId };
      setPageData(defaultContent);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    setError(null);
    
    try {
      // Save to database
      await pagesApi.save(selectedPageId, pageData);
      setCachedPage(selectedPageId, pageData);
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Error saving page:', err);
      setError(err.message || 'Chyba při ukládání stránky');
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePageSelect = (pageId: string) => {
    setSelectedPageId(pageId);
    setSearchParams({ page: pageId });
    setSidebarOpen(false);
  };

  const updateField = (path: string[], value: any) => {
    setPageData((prev: any) => {
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const updateArrayItem = (arrayPath: string[], index: number, field: string, value: any) => {
    setPageData((prev: any) => {
      const newData = { ...prev };
      let current = newData;
      
      for (const key of arrayPath) {
        if (!current[key]) current[key] = [];
        current = current[key];
      }
      
      if (Array.isArray(current) && current[index]) {
        current[index] = { ...current[index], [field]: value };
      }
      
      return newData;
    });
  };

  const addArrayItem = (arrayPath: string[], newItem: any) => {
    setPageData((prev: any) => {
      const newData = { ...prev };
      let current = newData;
      
      for (const key of arrayPath) {
        if (!current[key]) current[key] = [];
        current = current[key];
      }
      
      if (Array.isArray(current)) {
        // Add new item at the beginning of the array instead of the end
        current.unshift({ id: Date.now().toString(), ...newItem });
      }
      
      return newData;
    });
  };

  const setArrayItem = (arrayPath: string[], index: number, newItem: any) => {
    setPageData((prev: any) => {
      const newData = { ...prev };
      let current = newData;

      for (const key of arrayPath) {
        if (!current[key]) current[key] = [];
        current = current[key];
      }

      if (Array.isArray(current)) {
        current[index] = newItem;
      }

      return newData;
    });
  };

  const removeArrayItem = (arrayPath: string[], index: number) => {
    setPageData((prev: any) => {
      const newData = { ...prev };
      let current = newData;
      
      for (const key of arrayPath) {
        current = current[key];
      }
      
      if (Array.isArray(current)) {
        current.splice(index, 1);
      }
      
      return newData;
    });
  };

  const selectedPage = pages.find(p => p.id === selectedPageId);

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] bg-[var(--farm-page-bg)]">
      {/* Mobil: ztmavení pozadí při otevřeném menu stránek */}
      <div
        className={`fixed inset-0 top-16 z-[45] bg-black/40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Left Sidebar - Pages List */}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-50 w-64 max-w-[min(16rem,85vw)] flex-shrink-0 overflow-y-auto border-r border-[var(--farm-neutral-200)] bg-white transition-transform duration-300 ease-out lg:static lg:top-auto lg:z-auto lg:max-w-none lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--farm-neutral-200)] px-2 py-2 lg:hidden">
          <span className="px-2 text-xs font-semibold uppercase tracking-wider text-[var(--farm-secondary-text)]">
            Stránky
          </span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-[var(--farm-primary-text)] hover:bg-[var(--farm-neutral-100)]"
            aria-label="Zavřít menu stránek"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-2">
          {/* Main Pages */}
          <div className="mb-4">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--farm-secondary-text)]">
              Hlavní stránky
            </p>
            {pages.filter(p => p.category === 'main').map(page => (
              <button
                key={page.id}
                onClick={() => handlePageSelect(page.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedPageId === page.id
                    ? 'bg-[var(--farm-accent-green)]/10 text-[var(--farm-accent-green)]'
                    : 'text-[var(--farm-primary-text)] hover:bg-[var(--farm-neutral-100)]'
                }`}
              >
                <page.icon className="w-4 h-4" />
                <span className="text-sm">{page.label}</span>
              </button>
            ))}
          </div>

          {/* Footer Pages */}
          <div>
            <p className="px-3 py-2 text-xs font-semibold text-[var(--farm-secondary-text)] uppercase tracking-wider">
              Právní stránky
            </p>
            {pages.filter(p => p.category === 'footer').map(page => (
              <button
                key={page.id}
                onClick={() => handlePageSelect(page.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedPageId === page.id
                    ? 'bg-[var(--farm-accent-green)]/10 text-[var(--farm-accent-green)]'
                    : 'text-[var(--farm-primary-text)] hover:bg-[var(--farm-neutral-100)]'
                }`}
              >
                <page.icon className="w-4 h-4" />
                <span className="text-sm">{page.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 overflow-y-auto max-lg:pb-10">
        <div className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-4 lg:px-8 lg:py-6">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3 sm:items-center">
              <button
                type="button"
                className="mt-0.5 shrink-0 rounded-lg p-2 text-[var(--farm-primary-text)] hover:bg-[var(--farm-neutral-100)] lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Otevřít menu stránek"
              >
                <Menu className="h-6 w-6" />
              </button>
              {selectedPage && <selectedPage.icon className="mt-1 h-6 w-6 shrink-0 text-[var(--farm-accent-green)] sm:mt-0" />}
              <div className="min-w-0">
                <h1 className="text-xl font-bold text-[var(--farm-primary-text)] sm:text-2xl">
                  {selectedPage?.label}
                </h1>
                <p className="mt-1 text-sm text-[var(--farm-secondary-text)]">
                  Upravte obsah stránky pomocí formulářů
                </p>
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3 sm:ml-auto">
              <Button 
                variant="primary" 
                className="w-full justify-center gap-2 sm:w-auto" 
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
                  <p className="text-sm mt-1">Obsah stránky byl úspěšně aktualizován.</p>
                </div>
              </div>
            </div>
          )}

          {/* Page Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--farm-accent-green)]" />
            </div>
          ) : pageData ? (
            <div className="space-y-6">
              {/* Render different editors based on page type */}
              {selectedPageId === 'domu' && <HomePageEditor data={pageData} updateField={updateField} />}
              {selectedPageId === 'sluzby' && <ServicesPageEditor data={pageData} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} setArrayItem={setArrayItem} removeArrayItem={removeArrayItem} />}
              {selectedPageId === 'blog' && <EventsPageEditor data={pageData} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} setArrayItem={setArrayItem} removeArrayItem={removeArrayItem} />}
              {selectedPageId === 'nasi-kone' && <HorsesPageEditor data={pageData} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} setArrayItem={setArrayItem} removeArrayItem={removeArrayItem} />}
              {selectedPageId === 'o-nas' && <AboutPageEditor data={pageData} updateField={updateField} />}
              {selectedPageId === 'kontakt' && <ContactPageEditor data={pageData} updateField={updateField} />}
              
              {/* Legal pages - structured editor */}
              {['ochrana', 'cookies', 'podminky', 'reklamace'].includes(selectedPageId) && (
                <LegalPageEditor 
                  data={pageData} 
                  updateField={updateField}
                  updateArrayItem={updateArrayItem}
                  addArrayItem={addArrayItem}
                  setArrayItem={setArrayItem}
                  removeArrayItem={removeArrayItem}
                />
              )}
              
              {/* Simple 404 page */}
              {selectedPageId === '404' && (
                <FloatingCard hover={false} adminCompact>
                  <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-6">Obsah stránky 404</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                        Nadpis stránky
                      </label>
                      <input 
                        type="text" 
                        placeholder="Zadejte nadpis stránky" 
                        value={pageData?.title || ''} 
                        onChange={(e) => updateField(['title'], e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                        Zpráva pro uživatele
                      </label>
                      <textarea
                        value={pageData?.content || ''}
                        onChange={(e) => updateField(['content'], e.target.value)}
                        placeholder="Omlouváme se, ale hledaná stránka neexistuje."
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none text-[var(--farm-primary-text)]"
                      />
                    </div>
                  </div>
                </FloatingCard>
              )}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}