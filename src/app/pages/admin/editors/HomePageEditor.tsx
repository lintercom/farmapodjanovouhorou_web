import { FloatingCard } from '../../../components/FloatingCard';
import { LinkSelector } from '../../../components/admin/LinkSelector';
import { CmsCollectionEditor } from '../../../components/admin/CmsCollectionEditor';

function truncatePreview(text: string, maxLen: number) {
  const t = (text || '').trim().replace(/\s+/g, ' ');
  if (!t) return undefined;
  return t.length <= maxLen ? t : `${t.slice(0, maxLen).trim()}…`;
}

export function HomePageEditor({ data, updateField }: any) {
  const testimonialsItems = Array.isArray(data?.testimonials?.items) ? data.testimonials.items : [];
  const faqItems = Array.isArray(data?.faq?.items) ? data.faq.items : [];

  const setTestimonialsItems = (items: any[]) => {
    updateField(['testimonials', 'items'], items);
  };

  const setFaqItems = (items: any[]) => {
    updateField(['faq', 'items'], items);
  };

  const createTestimonial = () => ({
    id: String(Date.now()),
    rating: 5,
    text: '',
    authorName: '',
    authorRole: '',
    authorInitials: '',
  });

  const saveTestimonial = (draft: any, editingIndex: number | null) => {
    if (editingIndex === null) {
      setTestimonialsItems([...testimonialsItems, draft]);
      return;
    }
    const next = [...testimonialsItems];
    next[editingIndex] = draft;
    setTestimonialsItems(next);
  };

  const createFaqItem = () => ({
    id: String(Date.now()),
    question: '',
    answer: '',
  });

  const saveFaqItem = (draft: any, editingIndex: number | null) => {
    if (editingIndex === null) {
      setFaqItems([...faqItems, draft]);
      return;
    }
    const next = [...faqItems];
    next[editingIndex] = draft;
    setFaqItems(next);
  };

  return (
    <>
      {/* Hero Section */}
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Hero sekce</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
              Hlavní nadpis
            </label>
            <input
              type="text"
              value={data?.hero?.title || ''}
              onChange={(e) => updateField(['hero', 'title'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
              Podnadpis
            </label>
            <textarea
              value={data?.hero?.subtitle || ''}
              onChange={(e) => updateField(['hero', 'subtitle'], e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none text-[var(--farm-primary-text)]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                Text primárního tlačítka
              </label>
              <input
                type="text"
                value={data?.hero?.buttonText || ''}
                onChange={(e) => updateField(['hero', 'buttonText'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]"
              />
            </div>
            <LinkSelector
              label="Odkaz primárního tlačítka"
              value={data?.hero?.buttonLink || ''}
              onChange={(value) => updateField(['hero', 'buttonLink'], value)}
            />
            <div>
              <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                Text sekundárního tlačítka
              </label>
              <input
                type="text"
                value={data?.hero?.secondaryButtonText || ''}
                onChange={(e) => updateField(['hero', 'secondaryButtonText'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]"
              />
            </div>
            <LinkSelector
              label="Odkaz sekundárního tlačítka"
              value={data?.hero?.secondaryButtonLink || ''}
              onChange={(value) => updateField(['hero', 'secondaryButtonLink'], value)}
            />
          </div>
        </div>
      </FloatingCard>

      {/* Dárkový poukaz */}
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Dárkový poukaz</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">Nadpis</label>
            <input
              type="text"
              value={data?.giftCard?.title || ''}
              onChange={(e) => updateField(['giftCard', 'title'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">Podnadpis</label>
            <textarea
              value={data?.giftCard?.subtitle || ''}
              onChange={(e) => updateField(['giftCard', 'subtitle'], e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none text-[var(--farm-primary-text)]"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">Text tlačítka</label>
              <input
                type="text"
                value={data?.giftCard?.buttonText || ''}
                onChange={(e) => updateField(['giftCard', 'buttonText'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]"
              />
            </div>
            <LinkSelector
              label="Odkaz tlačítka"
              value={data?.giftCard?.buttonLink || ''}
              onChange={(value) => updateField(['giftCard', 'buttonLink'], value)}
            />
          </div>
        </div>
      </FloatingCard>

      {/* Reference */}
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Co o nás říkají</h3>
        <p className="text-sm text-[var(--farm-secondary-text)] mb-6">
          Nadpis a podnadpis celé sekce upravíte zde; jednotlivé reference přidávejte a upravujte v dialogu níže.
        </p>
        <div className="space-y-4 mb-8 pb-8 border-b border-[var(--farm-border)]">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">Nadpis sekce</label>
            <input
              type="text"
              value={data?.testimonials?.title || ''}
              onChange={(e) => updateField(['testimonials', 'title'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">Podnadpis sekce</label>
            <textarea
              value={data?.testimonials?.subtitle || ''}
              onChange={(e) => updateField(['testimonials', 'subtitle'], e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none text-[var(--farm-primary-text)]"
            />
          </div>
        </div>

        <CmsCollectionEditor
          title="Reference"
          addLabel="Přidat referenci"
          items={testimonialsItems}
          createItem={createTestimonial}
          getItemTitle={(item: any) => item.authorName?.trim() || 'Bez jména'}
          getItemSubtitle={(item: any) =>
            truncatePreview(item.authorRole || item.text || '', 160)
          }
          emptyStateText="Zatím nemáte žádnou referenci. Přidejte první pomocí tlačítka výše."
          dialogTitle={{ create: 'Přidat referenci', edit: 'Upravit referenci' }}
          dialogDescription="Vyplňte údaje o autorovi a text doporučení. Po uložení se změny promítnou na domovskou stránku."
          dialogClassName="sm:max-w-2xl"
          onSaveItem={saveTestimonial}
          onDeleteItem={(index) =>
            setTestimonialsItems(testimonialsItems.filter((_: any, i: number) => i !== index))
          }
          renderForm={({ draft, setDraft }) => (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Iniciály</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={draft.authorInitials || ''}
                    onChange={(e) =>
                      setDraft((prev) => (prev ? { ...prev, authorInitials: e.target.value } : prev))
                    }
                    className="w-full rounded-xl border border-[var(--farm-border)] bg-white px-4 py-3 text-[var(--farm-primary-text)] focus:border-[var(--farm-accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)]/20"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Jméno</label>
                  <input
                    type="text"
                    value={draft.authorName || ''}
                    onChange={(e) =>
                      setDraft((prev) => (prev ? { ...prev, authorName: e.target.value } : prev))
                    }
                    className="w-full rounded-xl border border-[var(--farm-border)] bg-white px-4 py-3 text-[var(--farm-primary-text)] focus:border-[var(--farm-accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)]/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">
                  Role / popis
                </label>
                <input
                  type="text"
                  value={draft.authorRole || ''}
                  onChange={(e) =>
                    setDraft((prev) => (prev ? { ...prev, authorRole: e.target.value } : prev))
                  }
                  className="w-full rounded-xl border border-[var(--farm-border)] bg-white px-4 py-3 text-[var(--farm-primary-text)] focus:border-[var(--farm-accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">
                  Hodnocení (1–5)
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={draft.rating ?? 5}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev
                        ? {
                            ...prev,
                            rating: Math.min(5, Math.max(1, Number(e.target.value) || 5)),
                          }
                        : prev,
                    )
                  }
                  className="w-full max-w-[8rem] rounded-xl border border-[var(--farm-border)] bg-white px-4 py-3 text-[var(--farm-primary-text)] focus:border-[var(--farm-accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">
                  Text reference
                </label>
                <textarea
                  value={draft.text || ''}
                  onChange={(e) =>
                    setDraft((prev) => (prev ? { ...prev, text: e.target.value } : prev))
                  }
                  rows={5}
                  className="w-full resize-none rounded-xl border border-[var(--farm-border)] bg-white px-4 py-3 text-[var(--farm-primary-text)] focus:border-[var(--farm-accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)]/20"
                />
              </div>
            </div>
          )}
        />
      </FloatingCard>

      {/* FAQ */}
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Často kladené dotazy</h3>
        <p className="text-sm text-[var(--farm-secondary-text)] mb-6">
          Záhlaví sekce upravíte zde; jednotlivé otázky přidávejte a upravujte v dialogu níže.
        </p>
        <div className="space-y-4 mb-8 pb-8 border-b border-[var(--farm-border)]">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">Nadpis sekce</label>
            <input
              type="text"
              value={data?.faq?.title || ''}
              onChange={(e) => updateField(['faq', 'title'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">Podnadpis sekce</label>
            <textarea
              value={data?.faq?.subtitle || ''}
              onChange={(e) => updateField(['faq', 'subtitle'], e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none text-[var(--farm-primary-text)]"
            />
          </div>
        </div>

        <CmsCollectionEditor
          title="Otázky a odpovědi"
          addLabel="Přidat otázku"
          items={faqItems}
          createItem={createFaqItem}
          getItemTitle={(item: any) => item.question?.trim() || 'Bez otázky'}
          getItemSubtitle={(item: any) => truncatePreview(item.answer || '', 200)}
          emptyStateText="Zatím nemáte žádnou otázku. Přidejte první pomocí tlačítka výše."
          dialogTitle={{ create: 'Přidat otázku', edit: 'Upravit otázku' }}
          dialogDescription="Zadejte znění otázky a odpověď pro rozbalovací blok na webu."
          dialogClassName="sm:max-w-2xl"
          onSaveItem={saveFaqItem}
          onDeleteItem={(index) => setFaqItems(faqItems.filter((_: any, i: number) => i !== index))}
          renderForm={({ draft, setDraft }) => (
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Otázka</label>
                <input
                  type="text"
                  value={draft.question || ''}
                  onChange={(e) =>
                    setDraft((prev) => (prev ? { ...prev, question: e.target.value } : prev))
                  }
                  className="w-full rounded-xl border border-[var(--farm-border)] bg-white px-4 py-3 text-[var(--farm-primary-text)] focus:border-[var(--farm-accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Odpověď</label>
                <textarea
                  value={draft.answer || ''}
                  onChange={(e) =>
                    setDraft((prev) => (prev ? { ...prev, answer: e.target.value } : prev))
                  }
                  rows={8}
                  className="w-full resize-none rounded-xl border border-[var(--farm-border)] bg-white px-4 py-3 text-[var(--farm-primary-text)] focus:border-[var(--farm-accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)]/20"
                />
              </div>
            </div>
          )}
        />
      </FloatingCard>
    </>
  );
}
