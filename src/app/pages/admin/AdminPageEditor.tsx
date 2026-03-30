import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Carrot, 
  Users, 
  Mail,
  AlertCircle,
  Shield,
  Cookie,
  FileText,
  AlertTriangle,
  Image as ImageIcon,
  Settings,
  Search,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Copy,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Save,
  Loader2
} from 'lucide-react';
import { FloatingCard } from '../../components/FloatingCard';
import { Button } from '../../components/Button';
import { LinkSelector } from '../../components/admin/LinkSelector';
import { pagesApi } from '../../utils/api';
import { defaultPageContent } from '../../utils/defaultPageContent';

interface Page {
  id: string;
  label: string;
  icon: any;
  category?: 'main' | 'footer' | 'system';
}

interface Section {
  id: string;
  name: string;
  type: string;
  isExpanded: boolean;
  isVisible: boolean;
  fields: Field[];
}

interface Field {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'toggle' | 'button';
  value: string | boolean;
}

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
  isActive: boolean;
}

export function AdminPageEditor() {
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  
  const pages: Page[] = [
    // Main pages
    { id: 'domu', label: 'Domů', icon: Home, category: 'main' },
    { id: 'sluzby', label: 'Služby', icon: BookOpen, category: 'main' },
    { id: 'akce', label: 'Akce', icon: Calendar, category: 'main' },
    { id: 'nasi-kone', label: 'Naši koně', icon: Carrot, category: 'main' },
    { id: 'o-nas', label: 'O nás', icon: Users, category: 'main' },
    { id: 'kontakt', label: 'Kontakt', icon: Mail, category: 'main' },
    // Footer pages
    { id: '404', label: '404 stránka', icon: AlertCircle, category: 'footer' },
    { id: 'ochrana', label: 'Ochrana osobních údajů', icon: Shield, category: 'footer' },
    { id: 'cookies', label: 'Cookies', icon: Cookie, category: 'footer' },
    { id: 'podminky', label: 'Obchodní podmínky', icon: FileText, category: 'footer' },
    { id: 'reklamace', label: 'Reklamační řád', icon: AlertTriangle, category: 'footer' },
  ];

  const [selectedPageId, setSelectedPageId] = useState(pageParam || 'sluzby');
  const [showFooterPages, setShowFooterPages] = useState(false);
  const [showSystemPages, setShowSystemPages] = useState(false);

  // Mock sections for demonstration
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'hero',
      name: 'Hero sekce',
      type: 'hero',
      isExpanded: true,
      isVisible: true,
      fields: [
        { id: 'title', label: 'Nadpis', type: 'text', value: 'Naše služby' },
        { id: 'subtitle', label: 'Podnadpis', type: 'textarea', value: 'Objevte naši nabídku' },
        { id: 'image', label: 'Obrázek na pozadí', type: 'image', value: '' },
      ],
    },
  ]);

  // Mock service items for "Služby" page
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([
    {
      id: '1',
      name: 'Tábory',
      description: 'Víkendové a prázdninové tábory pro děti',
      image: '',
      buttonText: 'Zjistit více',
      link: '/sluzby#tabory',
      isActive: true,
    },
    {
      id: '2',
      name: 'Kroužky',
      description: 'Pravidelné kroužky práce s koňmi',
      image: '',
      buttonText: 'Zjistit více',
      link: '/sluzby#krouzky',
      isActive: true,
    },
    {
      id: '3',
      name: 'Vyjížďky',
      description: 'Individuální nebo skupinové vyjížďky',
      image: '',
      buttonText: 'Zjistit více',
      link: '/sluzby#vyjizdy',
      isActive: true,
    },
  ]);

  const toggleSection = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, isExpanded: !s.isExpanded } : s
    ));
  };

  const toggleSectionVisibility = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, isVisible: !s.isVisible } : s
    ));
  };

  const duplicateSection = (id: string) => {
    const section = sections.find(s => s.id === id);
    if (section) {
      const newSection = {
        ...section,
        id: `${id}-copy-${Date.now()}`,
        name: `${section.name} (kopie)`,
      };
      setSections([...sections, newSection]);
    }
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const updateFieldValue = (sectionId: string, fieldId: string, value: string) => {
    setSections(sections.map(s => 
      s.id === sectionId ? {
        ...s,
        fields: s.fields.map(f => 
          f.id === fieldId ? { ...f, value } : f
        )
      } : s
    ));
  };

  const updateServiceItem = (itemId: string, field: keyof ServiceItem, value: any) => {
    setServiceItems(serviceItems.map(item =>
      item.id === itemId ? { ...item, [field]: value } : item
    ));
  };

  const addServiceItem = () => {
    const newItem: ServiceItem = {
      id: Date.now().toString(),
      name: 'Nová služba',
      description: 'Popis služby',
      image: '',
      buttonText: 'Zjistit více',
      link: '',
      isActive: true,
    };
    setServiceItems([...serviceItems, newItem]);
  };

  const duplicateServiceItem = (id: string) => {
    const item = serviceItems.find(i => i.id === id);
    if (item) {
      const newItem = { ...item, id: Date.now().toString(), name: `${item.name} (kopie)` };
      setServiceItems([...serviceItems, newItem]);
    }
  };

  const deleteServiceItem = (id: string) => {
    setServiceItems(serviceItems.filter(i => i.id !== id));
  };

  const selectedPage = pages.find(p => p.id === selectedPageId);
  const isServicesPage = selectedPageId === 'sluzby';
  const isMediaPage = selectedPageId === 'media';

  return (
    <div className="min-h-screen bg-[var(--farm-page-bg)] flex">
      {/* Left Sidebar - Pages List */}
      <aside className="w-64 bg-white border-r border-[var(--farm-neutral-200)] flex-shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-[var(--farm-neutral-200)]">
          <h2 className="font-semibold text-[var(--farm-primary-text)]">Stránky</h2>
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
                onClick={() => setSelectedPageId(page.id)}
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
          <div className="mb-4">
            <button
              onClick={() => setShowFooterPages(!showFooterPages)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[var(--farm-secondary-text)] uppercase tracking-wider hover:text-[var(--farm-primary-text)] transition-colors"
            >
              <span>Patička</span>
              {showFooterPages ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            {showFooterPages && pages.filter(p => p.category === 'footer').map(page => (
              <button
                key={page.id}
                onClick={() => setSelectedPageId(page.id)}
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

          {/* System */}
          <div>
            <button
              onClick={() => setShowSystemPages(!showSystemPages)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[var(--farm-secondary-text)] uppercase tracking-wider hover:text-[var(--farm-primary-text)] transition-colors"
            >
              <span>Systém</span>
              {showSystemPages ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            {showSystemPages && pages.filter(p => p.category === 'system').map(page => (
              <button
                key={page.id}
                onClick={() => setSelectedPageId(page.id)}
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
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {selectedPage && <selectedPage.icon className="w-6 h-6 text-[var(--farm-accent-green)]" />}
              <h1 className="text-2xl font-bold text-[var(--farm-primary-text)]">
                {selectedPage?.label}
              </h1>
            </div>
            <Button variant="primary" className="gap-2">
              <Save className="w-4 h-4" />
              Uložit změny
            </Button>
          </div>

          {/* Media Library View */}
          {isMediaPage ? (
            <FloatingCard adminCompact>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">
                  Knihovna médií
                </h2>
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    placeholder="Hledat obrázky..."
                    className="flex-1 px-4 py-2 rounded-lg border border-[var(--farm-neutral-300)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all"
                  />
                  <Button variant="primary" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Nahrát
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square rounded-xl bg-[var(--farm-neutral-100)] border border-[var(--farm-neutral-300)] flex items-center justify-center group relative overflow-hidden">
                      <ImageIcon className="w-8 h-8 text-[var(--farm-neutral-400)]" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-[var(--farm-neutral-100)] transition-colors">
                          <Eye className="w-4 h-4 text-[var(--farm-primary-text)]" />
                        </button>
                        <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FloatingCard>
          ) : (
            <>
              {/* Sections List (for non-media pages) */}
              <div className="space-y-4 mb-6">
                {sections.map((section) => (
                  <FloatingCard key={section.id} hover={false} adminCompact>
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <button className="cursor-move text-[var(--farm-neutral-400)] hover:text-[var(--farm-primary-text)]">
                          <GripVertical className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="flex items-center gap-2 text-[var(--farm-primary-text)] hover:text-[var(--farm-accent-green)] transition-colors"
                        >
                          {section.isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          <h3 className="font-semibold">{section.name}</h3>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSectionVisibility(section.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            section.isVisible
                              ? 'text-[var(--farm-accent-green)] hover:bg-[var(--farm-accent-green)]/10'
                              : 'text-[var(--farm-neutral-400)] hover:bg-[var(--farm-neutral-100)]'
                          }`}
                          title={section.isVisible ? 'Skrýt sekci' : 'Zobrazit sekci'}
                        >
                          {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => duplicateSection(section.id)}
                          className="p-2 rounded-lg text-[var(--farm-secondary-text)] hover:bg-[var(--farm-neutral-100)] hover:text-[var(--farm-primary-text)] transition-colors"
                          title="Duplikovat sekci"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-2 rounded-lg text-[var(--farm-secondary-text)] hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Smazat sekci"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Section Fields */}
                    {section.isExpanded && (
                      <div className="space-y-4 pt-4 border-t border-[var(--farm-neutral-200)]">
                        {section.fields.map((field) => (
                          <div key={field.id}>
                            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                              {field.label}
                            </label>
                            {field.type === 'text' && (
                              <input
                                type="text"
                                value={field.value as string}
                                onChange={(e) => updateFieldValue(section.id, field.id, e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-[var(--farm-neutral-300)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all"
                              />
                            )}
                            {field.type === 'textarea' && (
                              <textarea
                                value={field.value as string}
                                rows={3}
                                onChange={(e) => updateFieldValue(section.id, field.id, e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-[var(--farm-neutral-300)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none"
                              />
                            )}
                            {field.type === 'image' && (
                              <div className="flex gap-3">
                                <div className="w-32 h-32 rounded-lg bg-[var(--farm-neutral-100)] border border-[var(--farm-neutral-300)] flex items-center justify-center">
                                  <ImageIcon className="w-8 h-8 text-[var(--farm-neutral-400)]" />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Button variant="outline" size="sm">
                                    Vybrat obrázek
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    Odstranit
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </FloatingCard>
                ))}
              </div>

              {/* Service Items (only for Služby page) */}
              {isServicesPage && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[var(--farm-primary-text)]">
                      Seznam služeb
                    </h2>
                    <Button variant="primary" onClick={addServiceItem} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Přidat službu
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {serviceItems.map((item, index) => (
                      <FloatingCard key={item.id} hover={false} adminCompact>
                        <div className="flex items-start gap-4">
                          <button className="cursor-move text-[var(--farm-neutral-400)] hover:text-[var(--farm-primary-text)] mt-2">
                            <GripVertical className="w-5 h-5" />
                          </button>
                          
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-[var(--farm-primary-text)]">
                                Služba #{index + 1}
                              </h3>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-[var(--farm-secondary-text)]">Aktivní</span>
                                  <button
                                    className="relative w-11 h-6 rounded-full transition-colors bg-[var(--farm-accent-green)]"
                                  >
                                    <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-6 translate-y-1 transition-transform" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => duplicateServiceItem(item.id)}
                                  className="p-2 rounded-lg text-[var(--farm-secondary-text)] hover:bg-[var(--farm-neutral-100)] hover:text-[var(--farm-primary-text)] transition-colors"
                                  title="Duplikovat"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteServiceItem(item.id)}
                                  className="p-2 rounded-lg text-[var(--farm-secondary-text)] hover:bg-red-50 hover:text-red-600 transition-colors"
                                  title="Smazat"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                                  Název služby
                                </label>
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => updateServiceItem(item.id, 'name', e.target.value)}
                                  className="w-full px-4 py-2 rounded-lg border border-[var(--farm-neutral-300)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                                  Tlačítko text
                                </label>
                                <input
                                  type="text"
                                  value={item.buttonText}
                                  onChange={(e) => updateServiceItem(item.id, 'buttonText', e.target.value)}
                                  className="w-full px-4 py-2 rounded-lg border border-[var(--farm-neutral-300)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                                Krátký popis
                              </label>
                              <textarea
                                value={item.description}
                                rows={2}
                                onChange={(e) => updateServiceItem(item.id, 'description', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-[var(--farm-neutral-300)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                                  Obrázek
                                </label>
                                <div className="flex gap-2">
                                  <div className="w-20 h-20 rounded-lg bg-[var(--farm-neutral-100)] border border-[var(--farm-neutral-300)] flex items-center justify-center flex-shrink-0">
                                    <ImageIcon className="w-6 h-6 text-[var(--farm-neutral-400)]" />
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <Button variant="outline" size="sm">
                                      Vybrat
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <LinkSelector
                                  label="Odkaz"
                                  value={item.link}
                                  onChange={(v) => updateServiceItem(item.id, 'link', v)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </FloatingCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Section Button */}
              {!isServicesPage && (
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Přidat sekci
                </Button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}