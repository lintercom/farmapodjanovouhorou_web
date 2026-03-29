// Simple editors for other page types
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FloatingCard } from '../../../components/FloatingCard';
import { Button } from '../../../components/Button';
import { CmsCollectionEditor } from '../../../components/admin/CmsCollectionEditor';
import { ImageUpload } from '../../../components/admin/ImageUpload';
import {
  CONTACT_TAB_ICON_OPTIONS,
  defaultContactFormContent,
  defaultContactLocation,
  defaultContactReservationTabs,
  defaultContactSection,
} from '../../../utils/contactPageConfig';
import { LinkSelector } from '../../../components/admin/LinkSelector';
import {
  horseLifeSummaryShort,
  normalizeHorseBirthDateInput,
} from '../../../utils/horseBirthDate';
import { CardImagePositionDragEditor } from '../../../components/admin/CardImagePositionDragEditor';
import { getHorseImageFocusForIndex } from '../../../utils/horseCardImage';

function normalizeHorseGalleryFocusForPersist(horseLike: any, targetLen: number): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < targetLen; i++) {
    const row = horseLike.galleryImageFocus?.[i];
    if (row != null && row.x !== undefined && row.x !== '') {
      out.push({
        x: Math.min(100, Math.max(0, Number(row.x))),
        y: Math.min(100, Math.max(0, Number(row.y ?? 50))),
      });
    } else {
      const f = getHorseImageFocusForIndex(horseLike, i);
      out.push({ x: f.x, y: f.y });
    }
  }
  return out;
}

function HorseGalleryFocusSection({
  draft,
  setDraft,
}: {
  draft: any;
  setDraft: (fn: (prev: any) => any) => void;
}) {
  const filledSlots = (draft.images || [])
    .map((u: string, i: number) => (String(u || '').trim() ? i : -1))
    .filter((i: number) => i >= 0);
  const [focusSlot, setFocusSlot] = useState(0);
  if (filledSlots.length === 0) return null;

  const activeSlot = filledSlots.includes(focusSlot) ? focusSlot : filledSlots[0];
  const imageSrc = String(draft.images[activeSlot] || '').trim();

  return (
    <div className="rounded-2xl border border-[var(--farm-border)] bg-white p-4">
      <label className="mb-1 block text-sm font-medium text-[var(--farm-primary-text)]">
        Výřez fotek (karta a modal)
      </label>
      <p className="mb-3 text-xs text-[var(--farm-secondary-text)]">
        Tahem myši posuňte snímek uvnitř rámečku. První fotka má stejný výřez jako karta koně na úvodu a v seznamu.
        U dalších fotek se ohnisko projeví v modálním okně (celý snímek, zarovnání podle středu výřezu).
      </p>
      {filledSlots.length > 1 ? (
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-[var(--farm-secondary-text)]">
            Upravovaná fotka
          </label>
          <select
            value={activeSlot}
            onChange={(e) => setFocusSlot(Number(e.target.value))}
            className="w-full max-w-xs rounded-lg border border-[var(--farm-border)] bg-white px-3 py-2 text-sm text-[var(--farm-primary-text)] focus:border-[var(--farm-accent-green)] focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)]/20"
          >
            {filledSlots.map((i) => (
              <option key={i} value={i}>
                Fotografie {i + 1}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="mb-4">
        <CardImagePositionDragEditor
          key={activeSlot}
          previewAspect="5/6"
          imageSrc={imageSrc}
          draft={{
            cardImageFocusX: getHorseImageFocusForIndex(draft, activeSlot).x,
            cardImageFocusY: getHorseImageFocusForIndex(draft, activeSlot).y,
          }}
          setDraft={(fn) =>
            setDraft((prev) => {
              if (!prev) return prev;
              const slot = activeSlot;
              const virtual = {
                ...prev,
                cardImageFocusX: getHorseImageFocusForIndex(prev, slot).x,
                cardImageFocusY: getHorseImageFocusForIndex(prev, slot).y,
              };
              const merged = fn(virtual);
              if (!merged) return prev;
              const nx = Math.min(100, Math.max(0, Number(merged.cardImageFocusX ?? 50)));
              const ny = Math.min(100, Math.max(0, Number(merged.cardImageFocusY ?? 50)));
              const len = prev.images?.length ?? 0;
              const base = normalizeHorseGalleryFocusForPersist(prev, len);
              base[slot] = { x: nx, y: ny };
              const out: any = { ...prev, galleryImageFocus: base };
              if (slot === 0) {
                out.cardImageFocusX = nx;
                out.cardImageFocusY = ny;
              }
              return out;
            })
          }
        />
      </div>
      <button
        type="button"
        className="mt-1 text-xs font-medium text-[var(--farm-accent-green)] hover:text-[var(--farm-primary)]"
        onClick={() =>
          setDraft((prev) => {
            if (!prev) return prev;
            const slot = activeSlot;
            const len = prev.images?.length ?? 0;
            const base = normalizeHorseGalleryFocusForPersist(prev, len);
            base[slot] = { x: 50, y: 50 };
            const out: any = { ...prev, galleryImageFocus: base };
            if (slot === 0) {
              out.cardImageFocusX = 50;
              out.cardImageFocusY = 50;
            }
            return out;
          })
        }
      >
        Obnovit střed této fotky (50 % / 50 %)
      </button>
    </div>
  );
}

// Events Page Editor
export function EventsPageEditor({ data, updateField, addArrayItem, setArrayItem, removeArrayItem }: any) {
  const events = data?.events || [];

  const createEvent = () => ({
    title: 'Nový článek',
    description: '',
    fullDescription: '',
    image: '',
  });

  const saveEvent = (draft: any, editingIndex: number | null) => {
    if (editingIndex === null) {
      addArrayItem(['events'], draft);
      return;
    }

    setArrayItem(['events'], editingIndex, draft);
  };

  return (
    <>
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Hero sekce</h3>
        <div className="space-y-4">
          <input type="text" value={data?.hero?.title || ''} onChange={(e) => updateField(['hero', 'title'], e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" />
          <textarea value={data?.hero?.subtitle || ''} onChange={(e) => updateField(['hero', 'subtitle'], e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]" />
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <CmsCollectionEditor
          title="Příspěvky"
          addLabel="Přidat článek"
          items={events}
          createItem={createEvent}
          getItemTitle={(event: any, index) => event.title || `Článek #${index + 1}`}
          getItemSubtitle={(event: any) => event.description || 'Bez úvodního textu'}
          emptyStateText="Zatím jste nepřidali žádný článek."
          dialogTitle={{ create: 'Přidat článek', edit: 'Upravit článek' }}
          dialogDescription="Vyplňte článek v modalu a do seznamu se přidá až po uložení."
          onSaveItem={saveEvent}
          onDeleteItem={(index) => removeArrayItem(['events'], index)}
          renderForm={({ draft, setDraft }) => (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Název článku</label>
                <input
                  type="text"
                  placeholder="Název článku"
                  value={draft.title || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, title: e.target.value } : prev)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Krátký úvod (perex)</label>
                <textarea
                  placeholder="Krátký úvodní text článku"
                  value={draft.description || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, description: e.target.value } : prev)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white resize-none text-[var(--farm-primary-text)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Hlavní obsah článku</label>
                <textarea
                  placeholder="Hlavní obsah článku"
                  value={draft.fullDescription || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, fullDescription: e.target.value } : prev)}
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white resize-none text-[var(--farm-primary-text)]"
                />
              </div>

              <ImageUpload
                label="Obrázek článku"
                value={draft.image || ''}
                onChange={(url) => setDraft((prev) => prev ? { ...prev, image: url } : prev)}
              />
            </div>
          )}
        />
      </FloatingCard>
    </>
  );
}

// Horses Page Editor
export function HorsesPageEditor({ data, updateField, addArrayItem, setArrayItem, removeArrayItem }: any) {
  const horses = data?.horses || [];

  const createHorse = () => ({
    name: 'Nový kůň',
    breed: '',
    birthDate: '',
    color: '',
    temperament: '',
    description: '',
    specialSkills: [],
    images: [],
    galleryImageFocus: [],
    cardImageFocusX: 50,
    cardImageFocusY: 50,
  });

  const saveHorse = (draft: any, editingIndex: number | null) => {
    const birthDate = normalizeHorseBirthDateInput(draft.birthDate);
    const payload: any = { ...draft };
    if (birthDate) {
      payload.birthDate = birthDate;
      delete payload.age;
    } else {
      delete payload.birthDate;
      if (payload.age === '' || payload.age === undefined) delete payload.age;
    }

    const imgs = payload.images || [];
    payload.galleryImageFocus = normalizeHorseGalleryFocusForPersist(payload, imgs.length);
    if (imgs.length > 0 && payload.galleryImageFocus[0]) {
      payload.cardImageFocusX = payload.galleryImageFocus[0].x;
      payload.cardImageFocusY = payload.galleryImageFocus[0].y;
    }

    if (editingIndex === null) {
      addArrayItem(['horses'], payload);
      return;
    }

    setArrayItem(['horses'], editingIndex, payload);
  };

  return (
    <>
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Hero sekce</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis</label>
            <input 
              type="text" 
              placeholder="Naši koně"
              value={data?.hero?.title || ''} 
              onChange={(e) => updateField(['hero', 'title'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Podnadpis</label>
            <textarea 
              placeholder="Seznamte se s našimi čtyřnohými přáteli"
              value={data?.hero?.subtitle || ''} 
              onChange={(e) => updateField(['hero', 'subtitle'], e.target.value)} 
              rows={2} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]" 
            />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <CmsCollectionEditor
          title="Naši koně"
          addLabel="Přidat koně"
          items={horses}
          createItem={createHorse}
          getItemTitle={(horse: any, index) => horse.name || `Kůň #${index + 1}`}
          getItemSubtitle={(horse: any) => {
            const life = horseLifeSummaryShort(horse);
            return horse.breed ? `${horse.breed}${life !== '—' ? `, ${life}` : ''}` : 'Bez plemene';
          }}
          emptyStateText="Zatím jste nepřidali žádné koně."
          dialogTitle={{ create: 'Přidat koně', edit: 'Upravit koně' }}
          dialogDescription="Vyplňte data koně v modalu. Do seznamu se propíšou až po uložení."
          onSaveItem={saveHorse}
          onDeleteItem={(index) => removeArrayItem(['horses'], index)}
          renderForm={({ draft, setDraft }) => (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Jméno</label>
                  <input
                    type="text"
                    placeholder="Běluška"
                    value={draft.name || ''}
                    onChange={(e) => setDraft((prev) => prev ? { ...prev, name: e.target.value } : prev)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Plemeno</label>
                  <input
                    type="text"
                    placeholder="Welsh Pony"
                    value={draft.breed || ''}
                    onChange={(e) => setDraft((prev) => prev ? { ...prev, breed: e.target.value } : prev)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                    Datum narození
                  </label>
                  <input
                    type="date"
                    value={normalizeHorseBirthDateInput(draft.birthDate) || ''}
                    onChange={(e) =>
                      setDraft((prev) =>
                        prev ? { ...prev, birthDate: e.target.value || '' } : prev
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                  />
                  {draft.age != null && draft.age !== '' && !normalizeHorseBirthDateInput(draft.birthDate) ? (
                    <p className="mt-1.5 text-xs text-[var(--farm-secondary-text)]">
                      V datech je ještě staré pole „věk“ ({String(draft.age)}). Po uložení s vyplněným datem se věk z JSON odstraní.
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Barva</label>
                  <input
                    type="text"
                    placeholder="Bílá"
                    value={draft.color || ''}
                    onChange={(e) => setDraft((prev) => prev ? { ...prev, color: e.target.value } : prev)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Povaha</label>
                <input
                  type="text"
                  placeholder="Klidná, trpělivá, laskavá"
                  value={draft.temperament || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, temperament: e.target.value } : prev)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Popis</label>
                <textarea
                  placeholder="Podrobný popis koně..."
                  value={draft.description || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, description: e.target.value } : prev)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]"
                />
              </div>

              <div className="rounded-2xl border border-[var(--farm-border)] bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <label className="block text-sm font-medium text-[var(--farm-primary-text)]">
                    Galerie obrázků ({draft.images?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft((prev) => {
                        if (!prev) return prev;
                        const nextImages = [...(prev.images || []), ''];
                        const prevG = normalizeHorseGalleryFocusForPersist(prev, prev.images?.length ?? 0);
                        prevG.push({ x: 50, y: 50 });
                        return { ...prev, images: nextImages, galleryImageFocus: prevG };
                      })
                    }
                    className="flex items-center gap-2 rounded-lg bg-[var(--farm-accent-green)] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[var(--farm-primary)]"
                  >
                    <Plus className="w-4 h-4" />
                    Přidat obrázek
                  </button>
                </div>

                {draft.images && draft.images.length > 0 ? (
                  <div className="space-y-3">
                    {draft.images.map((imageUrl: string, imgIndex: number) => (
                      <div key={imgIndex} className="flex items-start gap-3 rounded-xl border border-[var(--farm-border)] bg-[var(--farm-section-alt-bg)] p-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={`${draft.name || 'Kůň'} - obrázek ${imgIndex + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=100&q=80';
                              }}
                            />
                          ) : null}
                        </div>
                        <div className="flex-1">
                          <label className="mb-1 block text-xs text-[var(--farm-secondary-text)]">Obrázek #{imgIndex + 1}</label>
                          <ImageUpload
                            value={imageUrl}
                            onChange={(url) => setDraft((prev) => {
                              if (!prev) return prev;
                              const images = [...(prev.images || [])];
                              images[imgIndex] = url;
                              return { ...prev, images };
                            })}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setDraft((prev) => {
                              if (!prev) return prev;
                              const nextImages = (prev.images || []).filter((_: string, idx: number) => idx !== imgIndex);
                              const oldG = normalizeHorseGalleryFocusForPersist(prev, prev.images?.length ?? 0);
                              const nextG = oldG.filter((_, i) => i !== imgIndex);
                              return { ...prev, images: nextImages, galleryImageFocus: nextG };
                            })
                          }
                          className="flex-shrink-0 p-2 text-red-600 transition-colors hover:bg-red-50 rounded-lg"
                          title="Odebrat obrázek"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-[var(--farm-border)] py-6 text-center">
                    <p className="mb-2 text-sm text-[var(--farm-secondary-text)]">Zatím žádné obrázky</p>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft((prev) => {
                          if (!prev) return prev;
                          const nextImages = [''];
                          return {
                            ...prev,
                            images: nextImages,
                            galleryImageFocus: normalizeHorseGalleryFocusForPersist(
                              { ...prev, images: nextImages },
                              1
                            ),
                          };
                        })
                      }
                      className="text-sm font-medium text-[var(--farm-accent-green)] hover:text-[var(--farm-primary)]"
                    >
                      + Přidat první obrázek
                    </button>
                  </div>
                )}
              </div>

              <HorseGalleryFocusSection draft={draft} setDraft={setDraft} />
            </div>
          )}
        />
      </FloatingCard>
    </>
  );
}

// About Page Editor
export function AboutPageEditor({ data, updateField, addArrayItem, setArrayItem, removeArrayItem }: any) {
  const values = data?.values || [];
  const team = data?.team || [];
  const directions = data?.location?.directions || [];

  const saveValue = (draft: any, editingIndex: number | null) => {
    if (editingIndex === null) {
      addArrayItem(['values'], draft);
      return;
    }

    setArrayItem(['values'], editingIndex, draft);
  };

  const saveTeamMember = (draft: any, editingIndex: number | null) => {
    if (editingIndex === null) {
      addArrayItem(['team'], draft);
      return;
    }

    setArrayItem(['team'], editingIndex, draft);
  };

  const saveDirection = (draft: any, editingIndex: number | null) => {
    if (editingIndex === null) {
      addArrayItem(['location', 'directions'], draft);
      return;
    }

    setArrayItem(['location', 'directions'], editingIndex, draft);
  };

  return (
    <>
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Hero sekce</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis</label>
            <input 
              type="text" 
              placeholder="O nás"
              value={data?.hero?.title || ''} 
              onChange={(e) => updateField(['hero', 'title'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Podnadpis</label>
            <textarea 
              placeholder="Poznejte náš příběh a hodnoty..."
              value={data?.hero?.subtitle || ''} 
              onChange={(e) => updateField(['hero', 'subtitle'], e.target.value)} 
              rows={2} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]" 
            />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Náš příběh</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
              Nadpis sekce
            </label>
            <input 
              type="text" 
              placeholder="Náš příběh" 
              value={data?.story?.title || ''} 
              onChange={(e) => updateField(['story', 'title'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
              Text příběhu (3 odstavce oddělené prázdným řádkem)
            </label>
            <textarea
              value={data?.story?.content || ''}
              onChange={(e) => updateField(['story', 'content'], e.target.value)}
              placeholder="První odstavec o vzniku farmy...&#10;&#10;Druhý odstavec o vizi...&#10;&#10;Třetí odstavec o současnosti..."
              rows={12}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
              URL obrázku
            </label>
            <ImageUpload
              value={data?.story?.image || ''}
              onChange={(value) => updateField(['story', 'image'], value)}
            />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-2">Sekce Naše hodnoty</h3>
          <p className="text-sm text-[var(--farm-secondary-text)]">Nadpis a popis celé sekce</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis sekce</label>
            <input 
              type="text" 
              placeholder="Naše hodnoty"
              value={data?.valuesSection?.title || ''} 
              onChange={(e) => updateField(['valuesSection', 'title'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Podnadpis sekce</label>
            <input 
              type="text" 
              placeholder="Principy, kterými se řídíme každý den"
              value={data?.valuesSection?.subtitle || ''} 
              onChange={(e) => updateField(['valuesSection', 'subtitle'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <CmsCollectionEditor
          title="Hodnoty (jednotlivé karty)"
          addLabel="Přidat hodnotu"
          items={values}
          createItem={() => ({ icon: 'Heart', title: '', description: '' })}
          getItemTitle={(value: any, index) => value.title || `Hodnota #${index + 1}`}
          getItemSubtitle={(value: any) => value.description || 'Bez popisu'}
          emptyStateText="Zatím žádné hodnoty."
          dialogTitle={{ create: 'Přidat hodnotu', edit: 'Upravit hodnotu' }}
          onSaveItem={saveValue}
          onDeleteItem={(index) => removeArrayItem(['values'], index)}
          renderForm={({ draft, setDraft }) => (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                  Ikona (Heart, Users, Leaf, Award)
                </label>
                <input
                  type="text"
                  placeholder="Heart"
                  value={draft.icon || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, icon: e.target.value } : prev)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                />
                <p className="mt-1 text-xs text-[var(--farm-secondary-text)]">
                  Dostupné: Heart, Users, Leaf, Award, Star, Shield, Zap
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis</label>
                <input
                  type="text"
                  placeholder="Láska ke koním"
                  value={draft.title || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, title: e.target.value } : prev)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Popis</label>
                <textarea
                  placeholder="Popis hodnoty..."
                  value={draft.description || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, description: e.target.value } : prev)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]"
                />
              </div>
            </div>
          )}
        />
      </FloatingCard>

      <FloatingCard hover={false}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-2">Sekce Náš tým</h3>
          <p className="text-sm text-[var(--farm-secondary-text)]">Nadpis a popis celé sekce</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis sekce</label>
            <input 
              type="text" 
              placeholder="Náš tým"
              value={data?.teamSection?.title || ''} 
              onChange={(e) => updateField(['teamSection', 'title'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Podnadpis sekce</label>
            <input 
              type="text" 
              placeholder="Lidé, kteří se starají o vaše děti a naše koně"
              value={data?.teamSection?.subtitle || ''} 
              onChange={(e) => updateField(['teamSection', 'subtitle'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <CmsCollectionEditor
          title="Členové týmu"
          addLabel="Přidat člena týmu"
          items={team}
          createItem={() => ({ name: '', role: '', description: '', photo: '' })}
          getItemTitle={(member: any, index) => member.name || `Člen týmu #${index + 1}`}
          getItemSubtitle={(member: any) => member.role || 'Bez pozice'}
          emptyStateText="Zatím žádní členové týmu."
          dialogTitle={{ create: 'Přidat člena týmu', edit: 'Upravit člena týmu' }}
          onSaveItem={saveTeamMember}
          onDeleteItem={(index) => removeArrayItem(['team'], index)}
          renderForm={({ draft, setDraft }) => (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Jméno</label>
                <input
                  type="text"
                  placeholder="Jana a Petr Nováčkovi"
                  value={draft.name || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, name: e.target.value } : prev)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Pozice</label>
                <input
                  type="text"
                  placeholder="Majitelé a zakladatelé"
                  value={draft.role || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, role: e.target.value } : prev)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Popis</label>
                <textarea
                  placeholder="Vedou farmu s láskou a zkušenostmi..."
                  value={draft.description || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, description: e.target.value } : prev)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">URL fotky (volitelné)</label>
                <ImageUpload
                  value={draft.photo || ''}
                  onChange={(value) => setDraft((prev) => prev ? { ...prev, photo: value } : prev)}
                />
              </div>
            </div>
          )}
        />
      </FloatingCard>

      <FloatingCard hover={false}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-2">Sekce Naše lokalita</h3>
          <p className="text-sm text-[var(--farm-secondary-text)]">Informace o umístění farmy</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis sekce</label>
            <input 
              type="text" 
              placeholder="Naše lokalita"
              value={data?.location?.title || ''} 
              onChange={(e) => updateField(['location', 'title'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Popis lokality (2 odstavce)</label>
            <textarea 
              placeholder="První odstavec o lokalitě...&#10;&#10;Druhý odstavec o dostupnosti..."
              value={data?.location?.description || ''} 
              onChange={(e) => updateField(['location', 'description'], e.target.value)} 
              rows={5} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">URL obrázku</label>
            <ImageUpload
              value={data?.location?.image || ''}
              onChange={(value) => updateField(['location', 'image'], value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis "Jak se k nám dostat"</label>
            <input 
              type="text" 
              placeholder="Jak se k nám dostat"
              value={data?.location?.directionsTitle || ''} 
              onChange={(e) => updateField(['location', 'directionsTitle'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <CmsCollectionEditor
          title="Dopravní instrukce"
          addLabel="Přidat instrukci"
          items={directions}
          createItem={() => ({ text: '' })}
          getItemTitle={(direction: any, index) => direction.text || `Instrukce #${index + 1}`}
          emptyStateText="Zatím žádné instrukce."
          dialogTitle={{ create: 'Přidat instrukci', edit: 'Upravit instrukci' }}
          dialogClassName="sm:max-w-2xl"
          onSaveItem={saveDirection}
          onDeleteItem={(index) => removeArrayItem(['location', 'directions'], index)}
          renderForm={({ draft, setDraft }) => (
            <div>
              <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Instrukce</label>
              <textarea
                placeholder="Z Liberce po silnici směr Bedřichov"
                value={draft.text || ''}
                onChange={(e) => setDraft((prev) => prev ? { ...prev, text: e.target.value } : prev)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]"
              />
            </div>
          )}
        />
      </FloatingCard>
    </>
  );
}

// Contact Page Editor
export function ContactPageEditor({ data, updateField }: any) {
  const reservationTabs = Array.isArray(data?.reservationTabs)
    ? data.reservationTabs
    : defaultContactReservationTabs;
  const contactSection = {
    ...defaultContactSection,
    ...(data?.contactSection ?? {}),
  };
  const contactForm = {
    ...defaultContactFormContent,
    ...(data?.contactForm ?? {}),
  };
  const location = {
    ...defaultContactLocation,
    ...(data?.location ?? {}),
    directions: Array.isArray(data?.location?.directions)
      ? data.location.directions
      : defaultContactLocation.directions,
  };

  const createReservationTab = () => ({
    id: String(Date.now()),
    slug: '',
    label: 'Nová karta',
    title: 'Nová karta',
    icon: 'MessageCircle',
    type: 'embed',
    description: '',
    helperText: '',
    reenioUrl: '',
    embedHeight: 1100,
    buttonText: '',
    buttonLink: '',
    openInNewTab: false,
  });

  const saveReservationTab = (draft: any, editingIndex: number | null) => {
    const nextTabs = editingIndex === null
      ? [...reservationTabs, draft]
      : reservationTabs.map((tab: any, index: number) => (index === editingIndex ? draft : tab));

    updateField(['reservationTabs'], nextTabs);
  };

  const deleteReservationTab = (indexToRemove: number) => {
    updateField(
      ['reservationTabs'],
      reservationTabs.filter((_: any, index: number) => index !== indexToRemove),
    );
  };

  const saveDirection = (draft: any, editingIndex: number | null) => {
    const nextDirections = editingIndex === null
      ? [...location.directions, draft]
      : location.directions.map((direction: any, index: number) => (index === editingIndex ? draft : direction));

    updateField(['location', 'directions'], nextDirections);
  };

  const deleteDirection = (indexToRemove: number) => {
    updateField(
      ['location', 'directions'],
      location.directions.filter((_: any, index: number) => index !== indexToRemove),
    );
  };

  return (
    <>
      <FloatingCard hover={false}>
        <h3 className="mb-4 text-lg font-semibold text-[var(--farm-primary-text)]">Hero sekce</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nadpis"
            value={data?.hero?.title || 'Kontakt a rezervace'}
            onChange={(e) => updateField(['hero', 'title'], e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
          />
          <textarea
            placeholder="Podnadpis"
            value={data?.hero?.subtitle || 'Napište nám nebo se rovnou přihlaste na naše aktivity'}
            onChange={(e) => updateField(['hero', 'subtitle'], e.target.value)}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]"
          />
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <CmsCollectionEditor
          title="Karty a rezervační záložky"
          addLabel="Přidat kartu"
          items={reservationTabs}
          createItem={createReservationTab}
          getItemTitle={(tab: any, index) => tab.label || tab.title || `Karta #${index + 1}`}
          getItemSubtitle={(tab: any) => {
            if (tab.type === 'contact') return 'Typ: Kontakt';
            if (tab.type === 'embed') return `Typ: Vložený formulář${tab.reenioUrl ? ' (URL vyplněna)' : ''}`;
            return 'Typ: Informační karta';
          }}
          emptyStateText="Zatím nejsou přidané žádné karty."
          dialogTitle={{ create: 'Přidat kartu', edit: 'Upravit kartu' }}
          onSaveItem={saveReservationTab}
          onDeleteItem={deleteReservationTab}
          renderForm={({ draft, setDraft }) => (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Text na kartě</label>
                  <input
                    type="text"
                    placeholder="Např. Rezervace tábora"
                    value={draft.label || ''}
                    onChange={(e) => setDraft((prev) => (prev ? { ...prev, label: e.target.value } : prev))}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Slug do URL</label>
                  <input
                    type="text"
                    placeholder="Např. tabor"
                    value={draft.slug || ''}
                    onChange={(e) => setDraft((prev) => (prev ? { ...prev, slug: e.target.value } : prev))}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Nadpis po rozkliknutí</label>
                  <input
                    type="text"
                    placeholder="Nadpis obsahu"
                    value={draft.title || ''}
                    onChange={(e) => setDraft((prev) => (prev ? { ...prev, title: e.target.value } : prev))}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Ikona</label>
                  <select
                    value={draft.icon || 'MessageCircle'}
                    onChange={(e) => setDraft((prev) => (prev ? { ...prev, icon: e.target.value } : prev))}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                  >
                    {CONTACT_TAB_ICON_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Typ karty</label>
                <select
                  value={draft.type || 'embed'}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev
                        ? {
                            ...prev,
                            type: e.target.value,
                          }
                        : prev,
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                >
                  <option value="embed">Vložený formulář</option>
                  <option value="content">Informační karta</option>
                  <option value="contact">Kontaktní sekce</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Popis / úvodní text</label>
                <textarea
                  placeholder="Krátký text pod nadpisem"
                  value={draft.description || ''}
                  onChange={(e) => setDraft((prev) => (prev ? { ...prev, description: e.target.value } : prev))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Pomocný text</label>
                <textarea
                  placeholder="Např. Zatím nás prosím kontaktujte na e-mailu nebo telefonu."
                  value={draft.helperText || ''}
                  onChange={(e) => setDraft((prev) => (prev ? { ...prev, helperText: e.target.value } : prev))}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]"
                />
              </div>

              {draft.type === 'embed' ? (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Reenio URL, iframe embed nebo widget snippet</label>
                    <textarea
                      placeholder="Vložte odkaz na formulář, iframe kód nebo snippet s div + script z Reenia"
                      value={draft.reenioUrl || ''}
                      onChange={(e) => setDraft((prev) => (prev ? { ...prev, reenioUrl: e.target.value } : prev))}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Výška vloženého formuláře (px)</label>
                    <input
                      type="number"
                      min="500"
                      step="10"
                      value={draft.embedHeight || 1100}
                      onChange={(e) =>
                        setDraft((prev) => (prev ? { ...prev, embedHeight: Number(e.target.value) || 1100 } : prev))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                    />
                  </div>
                </>
              ) : null}

              {draft.type === 'content' ? (
                <div className="rounded-2xl border border-[var(--farm-border)] bg-white p-4 space-y-4">
                  <LinkSelector
                    label="Časté interní odkazy (volitelné)"
                    value={draft.buttonLink || ''}
                    onChange={(v) => setDraft((prev) => (prev ? { ...prev, buttonLink: v } : prev))}
                    contactReservationTabs={reservationTabs}
                  />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Text tlačítka</label>
                      <input
                        type="text"
                        placeholder="Např. Objednat poukaz"
                        value={draft.buttonText || ''}
                        onChange={(e) => setDraft((prev) => (prev ? { ...prev, buttonText: e.target.value } : prev))}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">URL tlačítka</label>
                      <input
                        type="text"
                        placeholder="Např. /kontakt nebo https://…"
                        value={draft.buttonLink || ''}
                        onChange={(e) => setDraft((prev) => (prev ? { ...prev, buttonLink: e.target.value } : prev))}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-3 text-sm text-[var(--farm-primary-text)]">
                    <input
                      type="checkbox"
                      checked={Boolean(draft.openInNewTab)}
                      onChange={(e) => setDraft((prev) => (prev ? { ...prev, openInNewTab: e.target.checked } : prev))}
                      className="h-4 w-4 rounded border-[var(--farm-border)] text-[var(--farm-accent-green)] focus:ring-[var(--farm-accent-green)]"
                    />
                    Otevírat odkaz v novém okně
                  </label>
                </div>
              ) : null}

              {draft.type === 'contact' ? (
                <div className="rounded-2xl border border-[var(--farm-border)] bg-white p-4 text-sm text-[var(--farm-secondary-text)]">
                  Tato karta zobrazí hlavní kontaktní informace a formulář „Napište nám“.
                </div>
              ) : null}
            </div>
          )}
        />
      </FloatingCard>

      <FloatingCard hover={false}>
        <h3 className="mb-4 text-lg font-semibold text-[var(--farm-primary-text)]">Kontaktní údaje</h3>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Telefon</label>
            <input
              type="tel"
              placeholder="+420 777 666 555"
              value={data?.contactData?.phone || ''}
              onChange={(e) => updateField(['contactData', 'phone'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">E-mail</label>
            <input
              type="email"
              placeholder="info@farma.cz"
              value={data?.contactData?.email || ''}
              onChange={(e) => updateField(['contactData', 'email'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Ulice a číslo popisné</label>
            <input
              type="text"
              placeholder="Janova Hora 466"
              value={data?.contactData?.address || ''}
              onChange={(e) => updateField(['contactData', 'address'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">PSČ</label>
              <input
                type="text"
                placeholder="763 12"
                value={data?.contactData?.postalCode || ''}
                onChange={(e) => updateField(['contactData', 'postalCode'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Město</label>
              <input
                type="text"
                placeholder="Vizovice"
                value={data?.contactData?.city || ''}
                onChange={(e) => updateField(['contactData', 'city'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <h3 className="mb-4 text-lg font-semibold text-[var(--farm-primary-text)]">Levá karta kontaktu</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Nadpis sekce</label>
            <input
              type="text"
              value={contactSection.title}
              onChange={(e) => updateField(['contactSection', 'title'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Titulek sociálních sítí</label>
            <input
              type="text"
              value={contactSection.socialTitle}
              onChange={(e) => updateField(['contactSection', 'socialTitle'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Popisek telefonu</label>
            <input
              type="text"
              value={contactSection.phoneLabel}
              onChange={(e) => updateField(['contactSection', 'phoneLabel'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Popisek e-mailu</label>
            <input
              type="text"
              value={contactSection.emailLabel}
              onChange={(e) => updateField(['contactSection', 'emailLabel'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Popisek adresy</label>
            <input
              type="text"
              value={contactSection.addressLabel}
              onChange={(e) => updateField(['contactSection', 'addressLabel'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Popisek otevírací doby</label>
            <input
              type="text"
              value={contactSection.openingHoursLabel}
              onChange={(e) => updateField(['contactSection', 'openingHoursLabel'], e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <h3 className="mb-4 text-lg font-semibold text-[var(--farm-primary-text)]">Otevírací doba a sociální sítě</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Pracovní dny (Po - Pá)</label>
              <input
                type="text"
                placeholder="Po - Pá: 14:00 - 18:00"
                value={data?.contactData?.openingHours?.weekdays || ''}
                onChange={(e) => updateField(['contactData', 'openingHours', 'weekdays'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Víkend (So - Ne)</label>
              <input
                type="text"
                placeholder="So - Ne: 9:00 - 17:00"
                value={data?.contactData?.openingHours?.weekend || ''}
                onChange={(e) => updateField(['contactData', 'openingHours', 'weekend'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Facebook URL</label>
              <input
                type="url"
                placeholder="https://facebook.com/vase-stranka"
                value={data?.contactData?.socialMedia?.facebook || ''}
                onChange={(e) => updateField(['contactData', 'socialMedia', 'facebook'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Instagram URL</label>
              <input
                type="url"
                placeholder="https://instagram.com/vase-stranka"
                value={data?.contactData?.socialMedia?.instagram || ''}
                onChange={(e) => updateField(['contactData', 'socialMedia', 'instagram'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <h3 className="mb-4 text-lg font-semibold text-[var(--farm-primary-text)]">Nezisková sekce a formulář</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Nadpis neziskové sekce</label>
              <input
                type="text"
                value={contactSection.nonprofitTitle}
                onChange={(e) => updateField(['contactSection', 'nonprofitTitle'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Popisek čísla účtu</label>
              <input
                type="text"
                value={contactSection.nonprofitAccountLabel}
                onChange={(e) => updateField(['contactSection', 'nonprofitAccountLabel'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
          </div>
          <textarea
            value={contactSection.nonprofitDescription}
            onChange={(e) => updateField(['contactSection', 'nonprofitDescription'], e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]"
          />
          <input
            type="text"
            value={contactSection.nonprofitAccountNumber}
            onChange={(e) => updateField(['contactSection', 'nonprofitAccountNumber'], e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Nadpis formuláře</label>
              <input
                type="text"
                value={contactForm.title}
                onChange={(e) => updateField(['contactForm', 'title'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Text tlačítka</label>
              <input
                type="text"
                value={contactForm.submitLabel}
                onChange={(e) => updateField(['contactForm', 'submitLabel'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
          </div>

          <textarea
            value={contactForm.successMessage}
            onChange={(e) => updateField(['contactForm', 'successMessage'], e.target.value)}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              value={contactForm.nameLabel}
              onChange={(e) => updateField(['contactForm', 'nameLabel'], e.target.value)}
              placeholder="Popisek pole jméno"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
            <input
              type="text"
              value={contactForm.namePlaceholder}
              onChange={(e) => updateField(['contactForm', 'namePlaceholder'], e.target.value)}
              placeholder="Placeholder jméno"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
            <input
              type="text"
              value={contactForm.emailLabel}
              onChange={(e) => updateField(['contactForm', 'emailLabel'], e.target.value)}
              placeholder="Popisek pole e-mail"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
            <input
              type="text"
              value={contactForm.emailPlaceholder}
              onChange={(e) => updateField(['contactForm', 'emailPlaceholder'], e.target.value)}
              placeholder="Placeholder e-mail"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
            <input
              type="text"
              value={contactForm.phoneLabel}
              onChange={(e) => updateField(['contactForm', 'phoneLabel'], e.target.value)}
              placeholder="Popisek pole telefon"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
            <input
              type="text"
              value={contactForm.phonePlaceholder}
              onChange={(e) => updateField(['contactForm', 'phonePlaceholder'], e.target.value)}
              placeholder="Placeholder telefon"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
            <input
              type="text"
              value={contactForm.messageLabel}
              onChange={(e) => updateField(['contactForm', 'messageLabel'], e.target.value)}
              placeholder="Popisek pole zpráva"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
            <input
              type="text"
              value={contactForm.messagePlaceholder}
              onChange={(e) => updateField(['contactForm', 'messagePlaceholder'], e.target.value)}
              placeholder="Placeholder zpráva"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <h3 className="mb-4 text-lg font-semibold text-[var(--farm-primary-text)]">Mapa a navigace</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Nadpis mapové sekce</label>
              <input
                type="text"
                value={location.title}
                onChange={(e) => updateField(['location', 'title'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Nadpis instrukcí</label>
              <input
                type="text"
                value={location.directionsTitle}
                onChange={(e) => updateField(['location', 'directionsTitle'], e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
              />
            </div>
          </div>

          <textarea
            value={location.description}
            onChange={(e) => updateField(['location', 'description'], e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              value={location.mapCardTitle}
              onChange={(e) => updateField(['location', 'mapCardTitle'], e.target.value)}
              placeholder="Titulek na mapě"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
            <input
              type="text"
              value={location.mapCardAddress}
              onChange={(e) => updateField(['location', 'mapCardAddress'], e.target.value)}
              placeholder="Adresa na mapě"
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">
              Embed mapy
            </label>
            <input
              type="text"
              value={location.mapEmbedUrl}
              onChange={(e) => updateField(['location', 'mapEmbedUrl'], e.target.value)}
              placeholder='<iframe style="border:none" src="https://mapy.com/s/bopocejamo" width="400" height="280" frameborder="0"></iframe>'
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]"
            />
            <p className="mt-2 text-xs text-[var(--farm-secondary-text)]">
              Vložte buď samotnou URL, nebo celý iframe kód z mapy. Odkaz pro tlačítko na webu se vezme automaticky z tohoto pole.
            </p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <CmsCollectionEditor
          title="Instrukce k dopravě"
          addLabel="Přidat instrukci"
          items={location.directions}
          createItem={() => ({ id: String(Date.now()), text: '' })}
          getItemTitle={(direction: any, index) => direction.text || `Instrukce #${index + 1}`}
          emptyStateText="Zatím nejsou přidané žádné instrukce."
          dialogTitle={{ create: 'Přidat instrukci', edit: 'Upravit instrukci' }}
          dialogClassName="sm:max-w-2xl"
          onSaveItem={saveDirection}
          onDeleteItem={deleteDirection}
          renderForm={({ draft, setDraft }) => (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--farm-secondary-text)]">Instrukce</label>
              <textarea
                value={draft.text || ''}
                onChange={(e) => setDraft((prev) => (prev ? { ...prev, text: e.target.value } : prev))}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]"
              />
            </div>
          )}
        />
      </FloatingCard>
    </>
  );
}

// Legal Page Editor
export function LegalPageEditor({ data, updateField, addArrayItem, setArrayItem, removeArrayItem }: any) {
  const sections = data?.sections || [];

  const createSection = () => ({
    id: String(Date.now()),
    title: '',
    content: '',
    list: [],
    subsections: [],
  });

  const saveSection = (draft: any, editingIndex: number | null) => {
    if (editingIndex === null) {
      addArrayItem(['sections'], draft);
      return;
    }

    setArrayItem(['sections'], editingIndex, draft);
  };

  return (
    <>
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-6">Hlavní nadpis</h3>
        <div>
          <label className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
            Nadpis stránky
          </label>
          <input 
            type="text" 
            placeholder="Zadejte nadpis stránky" 
            value={data?.title || ''} 
            onChange={(e) => updateField(['title'], e.target.value)} 
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-4 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-[var(--farm-primary-text)]" 
          />
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <CmsCollectionEditor
          title="Sekce obsahu"
          addLabel="Přidat sekci"
          items={sections}
          createItem={createSection}
          getItemTitle={(section: any, index) => section.title || `Sekce #${index + 1}`}
          getItemSubtitle={(section: any) => section.content || 'Bez textu sekce'}
          emptyStateText="Zatím nejsou přidané žádné sekce."
          dialogTitle={{ create: 'Přidat sekci', edit: 'Upravit sekci' }}
          dialogDescription="V modalu můžete upravit obsah sekce, odrážky i podsekce."
          onSaveItem={saveSection}
          onDeleteItem={(index) => removeArrayItem(['sections'], index)}
          renderForm={({ draft, setDraft }) => (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis sekce</label>
                <input
                  type="text"
                  placeholder="např. Správce osobních údajů"
                  value={draft.title || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, title: e.target.value } : prev)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Text sekce</label>
                <textarea
                  placeholder="Hlavní text sekce. Nové řádky oddělte prázdným řádkem pro odstavce. Použijte **text** pro tučné písmo."
                  value={draft.content || ''}
                  onChange={(e) => setDraft((prev) => prev ? { ...prev, content: e.target.value } : prev)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white resize-none text-[var(--farm-primary-text)]"
                />
                <p className="mt-1 text-xs text-[var(--farm-secondary-text)]">
                  Používejte `\n\n` pro nový odstavec a `**text**` pro tučné písmo.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--farm-border)] bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)]">Seznam (odrážky)</label>
                  <button
                    type="button"
                    onClick={() => setDraft((prev) => prev ? { ...prev, list: [...(prev.list || []), ''] } : prev)}
                    className="text-sm text-[var(--farm-accent-green)] hover:underline"
                  >
                    + Přidat položku
                  </button>
                </div>
                <div className="space-y-2">
                  {(draft.list || []).map((item: string, listIndex: number) => (
                    <div key={listIndex} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Položka seznamu"
                        value={item}
                        onChange={(e) => setDraft((prev) => {
                          if (!prev) return prev;
                          const list = [...(prev.list || [])];
                          list[listIndex] = e.target.value;
                          return { ...prev, list };
                        })}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none text-sm bg-white text-[var(--farm-primary-text)]"
                      />
                      <button
                        type="button"
                        onClick={() => setDraft((prev) => prev ? {
                          ...prev,
                          list: (prev.list || []).filter((_: string, idx: number) => idx !== listIndex),
                        } : prev)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--farm-border)] bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)]">Podsekce</label>
                  <button
                    type="button"
                    onClick={() => setDraft((prev) => prev ? {
                      ...prev,
                      subsections: [...(prev.subsections || []), { title: '', content: '', list: [] }],
                    } : prev)}
                    className="text-sm text-[var(--farm-accent-green)] hover:underline"
                  >
                    + Přidat podsekci
                  </button>
                </div>

                <div className="space-y-3">
                  {(draft.subsections || []).map((subsection: any, subsectionIndex: number) => (
                    <div key={subsectionIndex} className="rounded-xl border border-[var(--farm-border)] bg-[var(--farm-section-alt-bg)] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--farm-primary-text)]">Podsekce #{subsectionIndex + 1}</span>
                        <button
                          type="button"
                          onClick={() => setDraft((prev) => prev ? {
                            ...prev,
                            subsections: (prev.subsections || []).filter((_: any, idx: number) => idx !== subsectionIndex),
                          } : prev)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nadpis podsekce"
                          value={subsection.title || ''}
                          onChange={(e) => setDraft((prev) => {
                            if (!prev) return prev;
                            const subsections = [...(prev.subsections || [])];
                            subsections[subsectionIndex] = {
                              ...subsections[subsectionIndex],
                              title: e.target.value,
                            };
                            return { ...prev, subsections };
                          })}
                          className="w-full px-3 py-2.5 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none text-sm bg-white text-[var(--farm-primary-text)]"
                        />
                        <textarea
                          placeholder="Text podsekce"
                          value={subsection.content || ''}
                          onChange={(e) => setDraft((prev) => {
                            if (!prev) return prev;
                            const subsections = [...(prev.subsections || [])];
                            subsections[subsectionIndex] = {
                              ...subsections[subsectionIndex],
                              content: e.target.value,
                            };
                            return { ...prev, subsections };
                          })}
                          rows={3}
                          className="w-full px-3 py-2.5 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none text-sm bg-white resize-none text-[var(--farm-primary-text)]"
                        />

                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs text-[var(--farm-secondary-text)]">Seznam v podsekci</span>
                            <button
                              type="button"
                              onClick={() => setDraft((prev) => {
                                if (!prev) return prev;
                                const subsections = [...(prev.subsections || [])];
                                const subsectionDraft = subsections[subsectionIndex] || {};
                                subsections[subsectionIndex] = {
                                  ...subsectionDraft,
                                  list: [...(subsectionDraft.list || []), ''],
                                };
                                return { ...prev, subsections };
                              })}
                              className="text-xs text-[var(--farm-accent-green)] hover:underline"
                            >
                              + Položka
                            </button>
                          </div>

                          <div className="space-y-2">
                            {(subsection.list || []).map((item: string, listIndex: number) => (
                              <div key={listIndex} className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Položka"
                                  value={item}
                                  onChange={(e) => setDraft((prev) => {
                                    if (!prev) return prev;
                                    const subsections = [...(prev.subsections || [])];
                                    const subsectionDraft = { ...(subsections[subsectionIndex] || {}) };
                                    const list = [...(subsectionDraft.list || [])];
                                    list[listIndex] = e.target.value;
                                    subsections[subsectionIndex] = { ...subsectionDraft, list };
                                    return { ...prev, subsections };
                                  })}
                                  className="flex-1 px-3 py-2 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none text-sm bg-white text-[var(--farm-primary-text)]"
                                />
                                <button
                                  type="button"
                                  onClick={() => setDraft((prev) => {
                                    if (!prev) return prev;
                                    const subsections = [...(prev.subsections || [])];
                                    const subsectionDraft = { ...(subsections[subsectionIndex] || {}) };
                                    subsectionDraft.list = (subsectionDraft.list || []).filter((_: string, idx: number) => idx !== listIndex);
                                    subsections[subsectionIndex] = subsectionDraft;
                                    return { ...prev, subsections };
                                  })}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        />
      </FloatingCard>
    </>
  );
}