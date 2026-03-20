// Simple editors for other page types
import { Plus, Trash2 } from 'lucide-react';
import { FloatingCard } from '../../../components/FloatingCard';
import { Button } from '../../../components/Button';
import { ImageUpload } from '../../../components/admin/ImageUpload';

// Events Page Editor
export function EventsPageEditor({ data, updateField, updateArrayItem, addArrayItem, removeArrayItem }: any) {
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)]">Příspěvky</h3>
          <Button variant="primary" size="sm" onClick={() => addArrayItem(['events'], { title: 'Nový článek', description: '', fullDescription: '', images: [] })} className="gap-2">
            <Plus className="w-4 h-4" />Přidat
          </Button>
        </div>
        <div className="space-y-4">
          {data?.events?.map((event: any, index: number) => (
            <div key={event.id || index} className="p-6 border-2 border-[var(--farm-border)] rounded-2xl bg-[var(--farm-section-alt-bg)]">
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-semibold text-[var(--farm-primary-text)]">Článek #{index + 1}</h4>
                <button onClick={() => removeArrayItem(['events'], index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Název článku</label>
                  <input type="text" placeholder="Název článku" value={event.title || ''} onChange={(e) => updateArrayItem(['events'], index, 'title', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-sm bg-white text-[var(--farm-primary-text)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Krátký úvod (perex)</label>
                  <textarea placeholder="Krátký úvodní text článku" value={event.description || ''} onChange={(e) => updateArrayItem(['events'], index, 'description', e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-sm bg-white resize-none text-[var(--farm-primary-text)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Hlavní obsah článku</label>
                  <textarea placeholder="Hlavní obsah článku" value={event.fullDescription || ''} onChange={(e) => updateArrayItem(['events'], index, 'fullDescription', e.target.value)} rows={6} className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-sm bg-white resize-none text-[var(--farm-primary-text)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">URL obrázku</label>
                  <ImageUpload
                    value={event.image || ''}
                    onChange={(url) => updateArrayItem(['events'], index, 'image', url)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </FloatingCard>
    </>
  );
}

// Horses Page Editor
export function HorsesPageEditor({ data, updateField, updateArrayItem, addArrayItem, removeArrayItem }: any) {
  // Helper function to add image to horse gallery
  const addImageToHorse = (horseIndex: number) => {
    const currentImages = data?.horses?.[horseIndex]?.images || [];
    const updatedImages = [...currentImages, ''];
    updateArrayItem(['horses'], horseIndex, 'images', updatedImages);
  };

  // Helper function to update specific image in horse gallery
  const updateHorseImage = (horseIndex: number, imageIndex: number, url: string) => {
    const currentImages = data?.horses?.[horseIndex]?.images || [];
    const updatedImages = [...currentImages];
    updatedImages[imageIndex] = url;
    updateArrayItem(['horses'], horseIndex, 'images', updatedImages);
  };

  // Helper function to remove image from horse gallery
  const removeHorseImage = (horseIndex: number, imageIndex: number) => {
    const currentImages = data?.horses?.[horseIndex]?.images || [];
    const updatedImages = currentImages.filter((_: any, idx: number) => idx !== imageIndex);
    updateArrayItem(['horses'], horseIndex, 'images', updatedImages);
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)]">Naši koně</h3>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => addArrayItem(['horses'], { 
              name: 'Nový kůň', 
              breed: '', 
              age: '', 
              color: '', 
              temperament: '', 
              description: '', 
              specialSkills: [], 
              images: [] 
            })} 
            className="gap-2"
          >
            <Plus className="w-4 h-4" />Přidat koně
          </Button>
        </div>
        <div className="space-y-6">
          {data?.horses?.map((horse: any, index: number) => (
            <div key={horse.id || index} className="p-6 border-2 border-[var(--farm-border)] rounded-2xl bg-[var(--farm-section-alt-bg)]">
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-semibold text-lg text-[var(--farm-primary-text)]">{horse.name || `Kůň #${index + 1}`}</h4>
                <button 
                  onClick={() => removeArrayItem(['horses'], index)} 
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Jméno</label>
                    <input 
                      type="text" 
                      placeholder="Běluška" 
                      value={horse.name || ''} 
                      onChange={(e) => updateArrayItem(['horses'], index, 'name', e.target.value)} 
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Plemeno</label>
                    <input 
                      type="text" 
                      placeholder="Welsh Pony" 
                      value={horse.breed || ''} 
                      onChange={(e) => updateArrayItem(['horses'], index, 'breed', e.target.value)} 
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Věk</label>
                    <input 
                      type="text" 
                      placeholder="8 let" 
                      value={horse.age || ''} 
                      onChange={(e) => updateArrayItem(['horses'], index, 'age', e.target.value)} 
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Barva</label>
                    <input 
                      type="text" 
                      placeholder="Bílá" 
                      value={horse.color || ''} 
                      onChange={(e) => updateArrayItem(['horses'], index, 'color', e.target.value)} 
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Povaha</label>
                  <input 
                    type="text" 
                    placeholder="Klidná, trpělivá, laskavá" 
                    value={horse.temperament || ''} 
                    onChange={(e) => updateArrayItem(['horses'], index, 'temperament', e.target.value)} 
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Popis</label>
                  <textarea 
                    placeholder="Podrobný popis koně..." 
                    value={horse.description || ''} 
                    onChange={(e) => updateArrayItem(['horses'], index, 'description', e.target.value)} 
                    rows={3} 
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]" 
                  />
                </div>

                {/* Gallery Section */}
                <div className="pt-4 border-t-2 border-[var(--farm-border)]">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-[var(--farm-primary-text)]">
                      Galerie obrázků ({horse.images?.length || 0})
                    </label>
                    <button
                      onClick={() => addImageToHorse(index)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[var(--farm-accent-green)] text-white rounded-lg hover:bg-[var(--farm-primary)] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Přidat obrázek
                    </button>
                  </div>

                  {horse.images && horse.images.length > 0 ? (
                    <div className="space-y-3">
                      {horse.images.map((imageUrl: string, imgIndex: number) => (
                        <div key={imgIndex} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[var(--farm-border)]">
                          <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                            {imageUrl && (
                              <img 
                                src={imageUrl} 
                                alt={`${horse.name} - obrázek ${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=100&q=80';
                                }}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <label className="block text-xs text-[var(--farm-secondary-text)] mb-1">
                              Obrázek #{imgIndex + 1}
                            </label>
                            <ImageUpload
                              value={imageUrl}
                              onChange={(url) => updateHorseImage(index, imgIndex, url)}
                            />
                          </div>
                          <button
                            onClick={() => removeHorseImage(index, imgIndex)}
                            className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Odebrat obrázek"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-white rounded-lg border-2 border-dashed border-[var(--farm-border)]">
                      <p className="text-sm text-[var(--farm-secondary-text)] mb-2">
                        Zatím žádné obrázky
                      </p>
                      <button
                        onClick={() => addImageToHorse(index)}
                        className="text-sm text-[var(--farm-accent-green)] hover:text-[var(--farm-primary)] font-medium"
                      >
                        + Přidat první obrázek
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {(!data?.horses || data.horses.length === 0) && (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-[var(--farm-border)]">
              <p className="text-[var(--farm-secondary-text)] mb-4">
                Zatím jste nepřidali žádné koně
              </p>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => addArrayItem(['horses'], { 
                  name: 'Nový kůň', 
                  breed: '', 
                  age: '', 
                  color: '', 
                  temperament: '', 
                  description: '', 
                  specialSkills: [], 
                  images: [] 
                })}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Přidat prvního koně
              </Button>
            </div>
          )}
        </div>
      </FloatingCard>
    </>
  );
}

// About Page Editor
export function AboutPageEditor({ data, updateField, updateArrayItem, addArrayItem, removeArrayItem }: any) {
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)]">Hodnoty (jednotlivé karty)</h3>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => addArrayItem(['values'], { icon: 'Heart', title: '', description: '' })} 
            className="gap-2"
          >
            <Plus className="w-4 h-4" />Přidat hodnotu
          </Button>
        </div>
        <div className="space-y-4">
          {data?.values?.map((value: any, index: number) => (
            <div key={index} className="p-5 border-2 border-[var(--farm-border)] rounded-xl bg-[var(--farm-section-alt-bg)]">
              <div className="flex justify-between mb-4">
                <h4 className="font-semibold text-[var(--farm-primary-text)]">Hodnota #{index + 1}</h4>
                <button 
                  onClick={() => removeArrayItem(['values'], index)} 
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
                    Ikona (Heart, Users, Leaf, Award)
                  </label>
                  <input 
                    type="text" 
                    placeholder="Heart" 
                    value={value.icon || ''} 
                    onChange={(e) => updateArrayItem(['values'], index, 'icon', e.target.value)} 
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
                  />
                  <p className="text-xs text-[var(--farm-secondary-text)] mt-1">
                    Dostupné: Heart, Users, Leaf, Award, Star, Shield, Zap
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis</label>
                  <input 
                    type="text" 
                    placeholder="Láska ke koním" 
                    value={value.title || ''} 
                    onChange={(e) => updateArrayItem(['values'], index, 'title', e.target.value)} 
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Popis</label>
                  <textarea 
                    placeholder="Popis hodnoty..." 
                    value={value.description || ''} 
                    onChange={(e) => updateArrayItem(['values'], index, 'description', e.target.value)} 
                    rows={2} 
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]" 
                  />
                </div>
              </div>
            </div>
          ))}
          {(!data?.values || data.values.length === 0) && (
            <div className="text-center py-8 bg-white rounded-xl border-2 border-dashed border-[var(--farm-border)]">
              <p className="text-sm text-[var(--farm-secondary-text)]">Zatím žádné hodnoty</p>
            </div>
          )}
        </div>
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)]">Členové týmu</h3>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => addArrayItem(['team'], { name: '', role: '', description: '', photo: '' })} 
            className="gap-2"
          >
            <Plus className="w-4 h-4" />Přidat člena týmu
          </Button>
        </div>
        <div className="space-y-4">
          {data?.team?.map((member: any, index: number) => (
            <div key={index} className="p-5 border-2 border-[var(--farm-border)] rounded-xl bg-[var(--farm-section-alt-bg)]">
              <div className="flex justify-between mb-4">
                <h4 className="font-semibold text-[var(--farm-primary-text)]">{member.name || `Člen týmu #${index + 1}`}</h4>
                <button 
                  onClick={() => removeArrayItem(['team'], index)} 
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Jméno</label>
                  <input 
                    type="text" 
                    placeholder="Jana a Petr Nováčkovi" 
                    value={member.name || ''} 
                    onChange={(e) => updateArrayItem(['team'], index, 'name', e.target.value)} 
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Pozice</label>
                  <input 
                    type="text" 
                    placeholder="Majitelé a zakladatelé" 
                    value={member.role || ''} 
                    onChange={(e) => updateArrayItem(['team'], index, 'role', e.target.value)} 
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Popis</label>
                  <textarea 
                    placeholder="Vedou farmu s láskou a zkušenostmi..." 
                    value={member.description || ''} 
                    onChange={(e) => updateArrayItem(['team'], index, 'description', e.target.value)} 
                    rows={2} 
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white resize-none text-[var(--farm-primary-text)]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">URL fotky (volitelné)</label>
                  <ImageUpload
                    value={member.photo || ''}
                    onChange={(value) => updateArrayItem(['team'], index, 'photo', value)}
                  />
                </div>
              </div>
            </div>
          ))}
          {(!data?.team || data.team.length === 0) && (
            <div className="text-center py-8 bg-white rounded-xl border-2 border-dashed border-[var(--farm-border)]">
              <p className="text-sm text-[var(--farm-secondary-text)]">Zatím žádní členové týmu</p>
            </div>
          )}
        </div>
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)]">Dopravní instrukce</h3>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => addArrayItem(['location', 'directions'], { text: '' })} 
            className="gap-2"
          >
            <Plus className="w-4 h-4" />Přidat instrukci
          </Button>
        </div>
        <div className="space-y-3">
          {data?.location?.directions?.map((direction: any, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <input 
                type="text" 
                placeholder="Z Liberce po silnici směr Bedřichov" 
                value={direction.text || ''} 
                onChange={(e) => updateArrayItem(['location', 'directions'], index, 'text', e.target.value)} 
                className="flex-1 px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none bg-white text-[var(--farm-primary-text)]" 
              />
              <button 
                onClick={() => removeArrayItem(['location', 'directions'], index)} 
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {(!data?.location?.directions || data.location.directions.length === 0) && (
            <div className="text-center py-6 bg-white rounded-lg border-2 border-dashed border-[var(--farm-border)]">
              <p className="text-sm text-[var(--farm-secondary-text)]">Zatím žádné instrukce</p>
            </div>
          )}
        </div>
      </FloatingCard>
    </>
  );
}

// Contact Page Editor
export function ContactPageEditor({ data, updateField }: any) {
  return (
    <>
      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Hero sekce</h3>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Nadpis" 
            value={data?.hero?.title || 'Kontakt'} 
            onChange={(e) => updateField(['hero', 'title'], e.target.value)} 
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
          />
          <textarea 
            placeholder="Podnadpis" 
            value={data?.hero?.subtitle || 'Máte dotazy? Rádi vám zodpovíme. Ozvěte se nám a domluvíme se!'} 
            onChange={(e) => updateField(['hero', 'subtitle'], e.target.value)} 
            rows={2} 
            className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none resize-none text-[var(--farm-primary-text)]" 
          />
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Kontaktní údaje</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Telefon</label>
            <input 
              type="tel" 
              placeholder="+420 777 666 555" 
              value={data?.contactData?.phone || ''} 
              onChange={(e) => updateField(['contactData', 'phone'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">E-mail</label>
            <input 
              type="email" 
              placeholder="info@farma.cz" 
              value={data?.contactData?.email || ''} 
              onChange={(e) => updateField(['contactData', 'email'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Ulice a číslo popisné</label>
            <input 
              type="text" 
              placeholder="Janův důl 123" 
              value={data?.contactData?.address || ''} 
              onChange={(e) => updateField(['contactData', 'address'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">PSČ</label>
              <input 
                type="text" 
                placeholder="468 11" 
                value={data?.contactData?.postalCode || ''} 
                onChange={(e) => updateField(['contactData', 'postalCode'], e.target.value)} 
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Město</label>
              <input 
                type="text" 
                placeholder="Janov nad Nisou" 
                value={data?.contactData?.city || ''} 
                onChange={(e) => updateField(['contactData', 'city'], e.target.value)} 
                className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
              />
            </div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Otevírací doba</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Pracovní dny (Po - Pá)</label>
            <input 
              type="text" 
              placeholder="Po - Pá: 14:00 - 18:00" 
              value={data?.contactData?.openingHours?.weekdays || ''} 
              onChange={(e) => updateField(['contactData', 'openingHours', 'weekdays'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Víkend (So - Ne)</label>
            <input 
              type="text" 
              placeholder="So - Ne: 9:00 - 17:00" 
              value={data?.contactData?.openingHours?.weekend || ''} 
              onChange={(e) => updateField(['contactData', 'openingHours', 'weekend'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard hover={false}>
        <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">Sociální sítě</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Facebook URL</label>
            <input 
              type="url" 
              placeholder="https://facebook.com/vase-stranka" 
              value={data?.contactData?.socialMedia?.facebook || ''} 
              onChange={(e) => updateField(['contactData', 'socialMedia', 'facebook'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Instagram URL</label>
            <input 
              type="url" 
              placeholder="https://instagram.com/vase-stranka" 
              value={data?.contactData?.socialMedia?.instagram || ''} 
              onChange={(e) => updateField(['contactData', 'socialMedia', 'instagram'], e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-[var(--farm-primary-text)]" 
            />
          </div>
        </div>
      </FloatingCard>
    </>
  );
}

// Legal Page Editor
export function LegalPageEditor({ data, updateField, updateArrayItem, addArrayItem, removeArrayItem }: any) {
  // Helper to add list item to a section
  const addListItem = (sectionIndex: number) => {
    const currentList = data?.sections?.[sectionIndex]?.list || [];
    const updatedList = [...currentList, ''];
    updateArrayItem(['sections'], sectionIndex, 'list', updatedList);
  };

  // Helper to update specific list item in a section
  const updateListItem = (sectionIndex: number, listIndex: number, value: string) => {
    const currentList = [...(data?.sections?.[sectionIndex]?.list || [])];
    currentList[listIndex] = value;
    updateArrayItem(['sections'], sectionIndex, 'list', currentList);
  };

  // Helper to remove list item from a section
  const removeListItem = (sectionIndex: number, listIndex: number) => {
    const currentList = [...(data?.sections?.[sectionIndex]?.list || [])];
    currentList.splice(listIndex, 1);
    updateArrayItem(['sections'], sectionIndex, 'list', currentList);
  };

  // Helper to add subsection
  const addSubsection = (sectionIndex: number) => {
    const currentSubsections = data?.sections?.[sectionIndex]?.subsections || [];
    const updatedSubsections = [...currentSubsections, { title: '', content: '' }];
    updateArrayItem(['sections'], sectionIndex, 'subsections', updatedSubsections);
  };

  // Helper to update subsection
  const updateSubsection = (sectionIndex: number, subsectionIndex: number, field: string, value: any) => {
    const currentSubsections = [...(data?.sections?.[sectionIndex]?.subsections || [])];
    currentSubsections[subsectionIndex] = {
      ...currentSubsections[subsectionIndex],
      [field]: value
    };
    updateArrayItem(['sections'], sectionIndex, 'subsections', currentSubsections);
  };

  // Helper to remove subsection
  const removeSubsection = (sectionIndex: number, subsectionIndex: number) => {
    const currentSubsections = [...(data?.sections?.[sectionIndex]?.subsections || [])];
    currentSubsections.splice(subsectionIndex, 1);
    updateArrayItem(['sections'], sectionIndex, 'subsections', currentSubsections);
  };

  // Helper for subsection list items
  const addSubsectionListItem = (sectionIndex: number, subsectionIndex: number) => {
    const currentSubsections = [...(data?.sections?.[sectionIndex]?.subsections || [])];
    const currentList = currentSubsections[subsectionIndex]?.list || [];
    currentSubsections[subsectionIndex] = {
      ...currentSubsections[subsectionIndex],
      list: [...currentList, '']
    };
    updateArrayItem(['sections'], sectionIndex, 'subsections', currentSubsections);
  };

  const updateSubsectionListItem = (sectionIndex: number, subsectionIndex: number, listIndex: number, value: string) => {
    const currentSubsections = [...(data?.sections?.[sectionIndex]?.subsections || [])];
    const currentList = [...(currentSubsections[subsectionIndex]?.list || [])];
    currentList[listIndex] = value;
    currentSubsections[subsectionIndex] = {
      ...currentSubsections[subsectionIndex],
      list: currentList
    };
    updateArrayItem(['sections'], sectionIndex, 'subsections', currentSubsections);
  };

  const removeSubsectionListItem = (sectionIndex: number, subsectionIndex: number, listIndex: number) => {
    const currentSubsections = [...(data?.sections?.[sectionIndex]?.subsections || [])];
    const currentList = [...(currentSubsections[subsectionIndex]?.list || [])];
    currentList.splice(listIndex, 1);
    currentSubsections[subsectionIndex] = {
      ...currentSubsections[subsectionIndex],
      list: currentList
    };
    updateArrayItem(['sections'], sectionIndex, 'subsections', currentSubsections);
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)]">Sekce obsahu</h3>
          <Button
            variant="primary"
            size="sm"
            onClick={() => addArrayItem(['sections'], { id: String(Date.now()), title: '', content: '' })}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Přidat sekci
          </Button>
        </div>
        
        <div className="space-y-6">
          {data?.sections?.map((section: any, sectionIndex: number) => (
            <div key={section.id || sectionIndex} className="p-6 border-2 border-[var(--farm-border)] rounded-2xl bg-[var(--farm-section-alt-bg)]">
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-semibold text-[var(--farm-primary-text)]">Sekce #{sectionIndex + 1}</h4>
                <button
                  onClick={() => removeArrayItem(['sections'], sectionIndex)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Nadpis sekce</label>
                  <input
                    type="text"
                    placeholder="např. Správce osobních údajů"
                    value={section.title || ''}
                    onChange={(e) => updateArrayItem(['sections'], sectionIndex, 'title', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-sm bg-white text-[var(--farm-primary-text)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Text sekce</label>
                  <textarea
                    placeholder="Hlavní text sekce. Nové řádky oddělte prázdným řádkem pro odstavce. Použijte **text** pro tučné písmo."
                    value={section.content || ''}
                    onChange={(e) => updateArrayItem(['sections'], sectionIndex, 'content', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-sm bg-white resize-none text-[var(--farm-primary-text)]"
                  />
                  <p className="mt-1 text-xs text-[var(--farm-secondary-text)]">
                    💡 Tip: Používejte \n\n pro nový odstavec, ** ** pro tučné písmo
                  </p>
                </div>

                {/* List items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)]">Seznam (odrážky)</label>
                    <button
                      onClick={() => addListItem(sectionIndex)}
                      className="text-xs text-[var(--farm-accent-green)] hover:underline"
                    >
                      + Přidat položku
                    </button>
                  </div>
                  {section.list?.map((item: string, listIndex: number) => (
                    <div key={listIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Položka seznamu"
                        value={item}
                        onChange={(e) => updateListItem(sectionIndex, listIndex, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-sm bg-white text-[var(--farm-primary-text)]"
                      />
                      <button
                        onClick={() => removeListItem(sectionIndex, listIndex)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subsections */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)]">Podsekce</label>
                    <button
                      onClick={() => addSubsection(sectionIndex)}
                      className="text-xs text-[var(--farm-accent-green)] hover:underline"
                    >
                      + Přidat podsekci
                    </button>
                  </div>
                  {section.subsections?.map((subsection: any, subsectionIndex: number) => (
                    <div key={subsectionIndex} className="p-4 mb-3 border border-[var(--farm-border)] rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-[var(--farm-secondary-text)]">Podsekce #{subsectionIndex + 1}</span>
                        <button
                          onClick={() => removeSubsection(sectionIndex, subsectionIndex)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nadpis podsekce"
                          value={subsection.title || ''}
                          onChange={(e) => updateSubsection(sectionIndex, subsectionIndex, 'title', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-sm bg-white text-[var(--farm-primary-text)]"
                        />
                        <textarea
                          placeholder="Text podsekce"
                          value={subsection.content || ''}
                          onChange={(e) => updateSubsection(sectionIndex, subsectionIndex, 'content', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-sm bg-white resize-none text-[var(--farm-primary-text)]"
                        />
                        
                        {/* Subsection list */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[var(--farm-secondary-text)]">Seznam v podsekci</span>
                            <button
                              onClick={() => addSubsectionListItem(sectionIndex, subsectionIndex)}
                              className="text-xs text-[var(--farm-accent-green)] hover:underline"
                            >
                              + Položka
                            </button>
                          </div>
                          {subsection.list?.map((item: string, listIndex: number) => (
                            <div key={listIndex} className="flex gap-2 mb-2">
                              <input
                                type="text"
                                placeholder="Položka"
                                value={item}
                                onChange={(e) => updateSubsectionListItem(sectionIndex, subsectionIndex, listIndex, e.target.value)}
                                className="flex-1 px-2 py-1.5 rounded border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:outline-none text-xs bg-white text-[var(--farm-primary-text)]"
                              />
                              <button
                                onClick={() => removeSubsectionListItem(sectionIndex, subsectionIndex, listIndex)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FloatingCard>
    </>
  );
}