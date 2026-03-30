import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { 
  Home, BookOpen, Calendar, Carrot, Users, Mail,
  Shield, Cookie, FileText, AlertTriangle,
  Save, Loader2
} from 'lucide-react';
import { FloatingCard } from '../../components/FloatingCard';
import { Button } from '../../components/Button';
import { pagesApi } from '../../utils/api';
import { defaultPageContent } from '../../utils/defaultPageContent';
import { setCachedPage } from '../../utils/siteDataCache';

interface Page {
  id: string;
  label: string;
  icon: any;
  category?: 'main' | 'footer';
}

export function PageEditorSimple() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  
  const pages: Page[] = [
    { id: 'domu', label: 'Domů', icon: Home, category: 'main' },
    { id: 'sluzby', label: 'Služby', icon: BookOpen, category: 'main' },
    { id: 'akce', label: 'Akce', icon: Calendar, category: 'main' },
    { id: 'nasi-kone', label: 'Naši koně', icon: Carrot, category: 'main' },
    { id: 'o-nas', label: 'O nás', icon: Users, category: 'main' },
    { id: 'kontakt', label: 'Kontakt', icon: Mail, category: 'main' },
    { id: 'ochrana', label: 'Ochrana osobních údajů', icon: Shield, category: 'footer' },
    { id: 'cookies', label: 'Cookies', icon: Cookie, category: 'footer' },
    { id: 'podminky', label: 'Obchodní podmínky', icon: FileText, category: 'footer' },
    { id: 'reklamace', label: 'Reklamační řád', icon: AlertTriangle, category: 'footer' },
    { id: '404', label: '404 stránka', icon: Home, category: 'footer' },
  ];

  const [selectedPageId, setSelectedPageId] = useState(pageParam || 'domu');
  const [pageContent, setPageContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

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
        setPageContent(JSON.stringify(response.page, null, 2));
      } else {
        // Use default content
        const defaultContent = defaultPageContent[pageId] || { id: pageId, label: pageId };
        setPageContent(JSON.stringify(defaultContent, null, 2));
      }
    } catch (err: any) {
      console.error('Error loading page:', err);
      // On error (like 404), use default content
      const defaultContent = defaultPageContent[pageId] || { id: pageId, label: pageId };
      setPageContent(JSON.stringify(defaultContent, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    setError(null);
    
    try {
      // Validate JSON
      const parsedContent = JSON.parse(pageContent);
      
      // Save to database
      await pagesApi.save(selectedPageId, parsedContent);
      setCachedPage(selectedPageId, parsedContent);
      
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

  const selectedPage = pages.find(p => p.id === selectedPageId);

  return (
    <div className="min-h-screen bg-[var(--farm-page-bg)] flex">
      {/* Left Sidebar - Pages List */}
      <aside className="w-64 bg-white border-r border-[var(--farm-neutral-200)] flex-shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-[var(--farm-neutral-200)]">
          <h2 className="font-semibold text-[var(--farm-primary-text)]">Editor stránek</h2>
        </div>
        
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
                  Upravte obsah stránky v JSON formátu
                </p>
              </div>
            </div>
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
                  <p className="text-sm mt-1">Obsah stránky byl úspěšně aktualizován v databázi.</p>
                </div>
              </div>
            </div>
          )}

          {/* JSON Editor */}
          <FloatingCard hover={false} adminCompact>
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--farm-accent-green)]" />
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-2">
                    Obsah stránky (JSON)
                  </h2>
                  <p className="text-sm text-[var(--farm-secondary-text)]">
                    Upravte data stránky v JSON formátu. Ujistěte se, že formát je platný před uložením.
                  </p>
                </div>
                <textarea
                  value={pageContent}
                  onChange={(e) => setPageContent(e.target.value)}
                  className="w-full h-[600px] px-4 py-3 font-mono text-sm rounded-lg border border-[var(--farm-neutral-300)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none bg-[var(--farm-neutral-50)]"
                  spellCheck={false}
                />
              </div>
            )}
          </FloatingCard>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="font-semibold text-blue-900 mb-2">Nápověda</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Data musí být ve validním JSON formátu</li>
              <li>• Každá stránka má vlastní strukturu dat</li>
              <li>• Po uložení se změny projeví okamžitě na webu</li>
              <li>• Pokud stránka není v databázi, použije se výchozí obsah</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}