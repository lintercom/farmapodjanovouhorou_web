import { Plus, Trash2 } from 'lucide-react';
import { FloatingCard } from '../../../components/FloatingCard';
import { Button } from '../../../components/Button';
import { ImageUpload } from '../../../components/admin/ImageUpload';
import { CmsCollectionEditor } from '../../../components/admin/CmsCollectionEditor';
import { LinkSelector } from '../../../components/admin/LinkSelector';
import { CardImagePositionDragEditor } from '../../../components/admin/CardImagePositionDragEditor';

export function ServicesPageEditor({ data, updateField, addArrayItem, setArrayItem, removeArrayItem }: any) {
  const services = data?.services || [];

  const createService = () => ({
    id: '',
    title: 'Nová služba',
    description: '',
    image: '',
    cardImageFocusX: 50,
    cardImageFocusY: 50,
    details: [],
    buttonText: 'Zjistit více',
    buttonLink: '/kontakt',
  });

  const saveService = (draft: any, editingIndex: number | null) => {
    if (editingIndex === null) {
      addArrayItem(['services'], draft);
      return;
    }

    setArrayItem(['services'], editingIndex, draft);
  };

  return (
    <>
      {/* Hero Section */}
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Hero sekce</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nadpis"
            value={data?.hero?.title || ''}
            onChange={(e) => updateField(['hero', 'title'], e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
          />
          <textarea
            placeholder="Podnadpis"
            value={data?.hero?.subtitle || ''}
            onChange={(e) => updateField(['hero', 'subtitle'], e.target.value)}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]"
          />
        </div>
      </FloatingCard>

      {/* Services List */}
      <FloatingCard hover={false}>
        <CmsCollectionEditor
          title="Seznam služeb"
          addLabel="Přidat službu"
          items={services}
          createItem={createService}
          getItemTitle={(service: any, index) => service.title || `Služba #${index + 1}`}
          getItemSubtitle={(service: any) => service.description || 'Bez popisu'}
          emptyStateText="Zatím jste nepřidali žádnou službu."
          dialogTitle={{
            create: 'Přidat službu',
            edit: 'Upravit službu',
          }}
          onSaveItem={saveService}
          onDeleteItem={(index) => removeArrayItem(['services'], index)}
          renderForm={({ draft, setDraft }) => (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">ID služby (pro odkazy)</label>
                <input
                  type="text"
                  placeholder="např. tabory, vyjizky, hipoterapie"
                  value={draft.id || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, id: e.target.value } : prev)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Název služby</label>
                <input
                  type="text"
                  placeholder="Název služby"
                  value={draft.title || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, title: e.target.value } : prev)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Popis služby</label>
                <textarea
                  placeholder="Popis služby"
                  value={draft.description || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, description: e.target.value } : prev)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none bg-white text-[var(--farm-primary-text)]"
                />
              </div>

              <ImageUpload
                label="Obrázek služby"
                value={draft.image || ''}
                onChange={(url) => setDraft((prev) => prev ? { ...prev, image: url } : prev)}
              />

              {String(draft.image || '').trim() ? (
                <div className="rounded-2xl border border-[var(--farm-border)] bg-white p-4">
                  <label className="mb-1 block text-sm font-medium text-[var(--farm-primary-text)]">
                    Náhled v kartě (poměr 4∶3)
                  </label>
                  <p className="mb-3 text-xs text-[var(--farm-secondary-text)]">
                    Tahem myši posuňte snímek jako v karuselu na úvodní stránce a u obrázku služby na stránce Služby.
                  </p>
                  <div className="mb-2">
                    <CardImagePositionDragEditor
                      previewAspect="4/3"
                      imageSrc={String(draft.image || '').trim()}
                      draft={draft}
                      setDraft={setDraft}
                    />
                  </div>
                  <button
                    type="button"
                    className="text-xs font-medium text-[var(--farm-accent-green)] hover:text-[var(--farm-primary)]"
                    onClick={() =>
                      setDraft((prev) =>
                        prev ? { ...prev, cardImageFocusX: 50, cardImageFocusY: 50 } : prev
                      )
                    }
                  >
                    Obnovit střed (50 % / 50 %)
                  </button>
                </div>
              ) : null}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Text tlačítka</label>
                  <input
                    type="text"
                    placeholder="Text tlačítka"
                    value={draft.buttonText || ''}
                    onChange={(e) => setDraft((prev) => prev ? { ...prev, buttonText: e.target.value } : prev)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                  />
                </div>

                <LinkSelector
                  label="Odkaz tlačítka"
                  value={draft.buttonLink || ''}
                  onChange={(value) => setDraft((prev) => prev ? { ...prev, buttonLink: value } : prev)}
                />
              </div>

              <div className="rounded-2xl border border-[var(--farm-border)] bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h5 className="font-medium text-[var(--farm-primary-text)]">Detaily služby</h5>
                  <button
                    type="button"
                    onClick={() => setDraft((prev) => prev ? {
                      ...prev,
                      details: [...(prev.details || []), { title: '', description: '' }],
                    } : prev)}
                    className="rounded-lg bg-[var(--farm-accent-green)] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[var(--farm-accent-green)]/90"
                  >
                    + Přidat detail
                  </button>
                </div>

                <div className="space-y-3">
                  {(draft.details || []).map((detail: any, detailIndex: number) => (
                    <div key={detailIndex} className="rounded-xl bg-[var(--farm-section-alt-bg)] p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--farm-primary-text)]">Detail #{detailIndex + 1}</span>
                        <button
                          type="button"
                          onClick={() => setDraft((prev) => prev ? {
                            ...prev,
                            details: (prev.details || []).filter((_: any, idx: number) => idx !== detailIndex),
                          } : prev)}
                          className="p-2 text-red-600 transition-colors hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <input
                          type="text"
                          placeholder="Nadpis"
                          value={detail.title || ''}
                          onChange={(e) => setDraft((prev) => {
                            if (!prev) return prev;
                            const details = [...(prev.details || [])];
                            details[detailIndex] = { ...details[detailIndex], title: e.target.value };
                            return { ...prev, details };
                          })}
                          className="w-full px-3 py-2.5 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-sm bg-white text-[var(--farm-primary-text)]"
                        />
                        <input
                          type="text"
                          placeholder="Popis"
                          value={detail.description || ''}
                          onChange={(e) => setDraft((prev) => {
                            if (!prev) return prev;
                            const details = [...(prev.details || [])];
                            details[detailIndex] = { ...details[detailIndex], description: e.target.value };
                            return { ...prev, details };
                          })}
                          className="w-full px-3 py-2.5 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-sm bg-white text-[var(--farm-primary-text)]"
                        />
                      </div>
                    </div>
                  ))}

                  {(!draft.details || draft.details.length === 0) && (
                    <div className="rounded-xl border-2 border-dashed border-[var(--farm-border)] py-6 text-center text-sm text-[var(--farm-secondary-text)]">
                      Zatím nejsou přidané žádné detaily služby.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      </FloatingCard>
    </>
  );
}
