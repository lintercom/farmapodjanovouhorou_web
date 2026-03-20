import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { 
  Home, BookOpen, Calendar, Carrot, Users, Mail,
  AlertCircle, Shield, Cookie, FileText, AlertTriangle,
  Save, Loader2, CheckCircle, XCircle, Database, Upload
} from 'lucide-react';
import { FloatingCard } from '../../components/FloatingCard';
import { Button } from '../../components/Button';
import { pagesApi } from '../../utils/api';
import { defaultPageContent } from '../../utils/defaultPageContent';
import { HomePageEditor } from './editors/HomePageEditor';
import { ServicesPageEditor } from './editors/ServicesPageEditor';
import { 
  EventsPageEditor, 
  HorsesPageEditor, 
  AboutPageEditor, 
  ContactPageEditor, 
  LegalPageEditor 
} from './editors/OtherPageEditors';
import { projectId, publicAnonKey } from '/utils/supabase/info';

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
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [seedMessage, setSeedMessage] = useState('');

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

  const handleSeedData = async () => {
    setIsSeeding(true);
    setSeedStatus('idle');
    setSeedMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-399cd496/seed`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Chyba při nahrávání dat');
      }

      const data = await response.json();
      setSeedStatus('success');
      setSeedMessage(`Úspěšně nahráno ${data.results.length} stránek`);
      
      // Reload current page data
      await loadPageContent(selectedPageId);
      
      setTimeout(() => {
        setSeedStatus('idle');
        setSeedMessage('');
      }, 5000);
    } catch (error: any) {
      console.error('Seed error:', error);
      setSeedStatus('error');
      setSeedMessage(error.message || 'Chyba při nahrávání dat');
    } finally {
      setIsSeeding(false);
    }
  };

  const selectedPage = pages.find(p => p.id === selectedPageId);

  return (
    <div className="min-h-screen bg-[var(--farm-page-bg)] flex">
      {/* Left Sidebar - Pages List */}
      <aside className="w-64 bg-white border-r border-[var(--farm-neutral-200)] flex-shrink-0 overflow-y-auto">
        <nav className="p-2">
          {/* Main Pages */}
          <div className="mb-4">
            <p className="px-3 py-2 text-xs font-semibold text-[var(--farm-secondary-text)] uppercase tracking-wider">
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

          {/* Seed Data Button */}
          <div className="mt-8 p-2">
            <button
              onClick={handleSeedData}
              disabled={isSeeding}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors bg-[var(--farm-accent-green)] text-white hover:bg-[var(--farm-accent-green)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">Nahrávání...</span>
                </>
              ) : seedStatus === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Nahráno</span>
                </>
              ) : seedStatus === 'error' ? (
                <>
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Chyba</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  <span className="text-sm font-medium">Inicializovat data</span>
                </>
              )}
            </button>
            
            {/* Seed Status Message */}
            {seedMessage && (
              <div className={`mt-2 p-2 rounded-lg text-xs ${
                seedStatus === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {seedMessage}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {selectedPage && <selectedPage.icon className="w-6 h-6 text-[var(--farm-accent-green)]" />}
              <div>
                <h1 className="text-2xl font-bold text-[var(--farm-primary-text)]">
                  {selectedPage?.label}
                </h1>
                <p className="text-sm text-[var(--farm-secondary-text)] mt-1">
                  Upravte obsah stránky pomocí formulářů
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
              {selectedPageId === 'domu' && <HomePageEditor data={pageData} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />}
              {selectedPageId === 'sluzby' && <ServicesPageEditor data={pageData} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />}
              {selectedPageId === 'blog' && <EventsPageEditor data={pageData} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />}
              {selectedPageId === 'nasi-kone' && <HorsesPageEditor data={pageData} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />}
              {selectedPageId === 'o-nas' && <AboutPageEditor data={pageData} updateField={updateField} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />}
              {selectedPageId === 'kontakt' && <ContactPageEditor data={pageData} updateField={updateField} />}
              
              {/* Legal pages - structured editor */}
              {['ochrana', 'cookies', 'podminky', 'reklamace'].includes(selectedPageId) && (
                <LegalPageEditor 
                  data={pageData} 
                  updateField={updateField}
                  updateArrayItem={updateArrayItem}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                />
              )}
              
              {/* Simple 404 page */}
              {selectedPageId === '404' && (
                <FloatingCard hover={false}>
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