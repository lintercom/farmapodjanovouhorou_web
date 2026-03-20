import { Plus, Trash2 } from 'lucide-react';
import { FloatingCard } from '../../../components/FloatingCard';
import { Button } from '../../../components/Button';
import { ImageUpload } from '../../../components/admin/ImageUpload';
import { LinkSelector } from '../../../components/admin/LinkSelector';

export function ServicesPageEditor({ data, updateField, updateArrayItem, addArrayItem, removeArrayItem }: any) {
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--farm-primary-text)]">Seznam služeb</h3>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => addArrayItem(['services'], { 
              title: 'Nová služba', 
              description: '', 
              image: '',
              details: [],
              buttonText: 'Zjistit více',
              buttonLink: '/kontakt'
            })}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Přidat službu
          </Button>
        </div>
        <div className="space-y-6">
          {data?.services?.map((service: any, index: number) => (
            <div key={service.id || index} className="p-6 border-2 border-[var(--farm-border)] rounded-2xl bg-[var(--farm-section-alt-bg)]">
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-semibold text-[var(--farm-primary-text)] text-lg">Služba #{index + 1}</h4>
                <button
                  onClick={() => removeArrayItem(['services'], index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">ID služby (pro odkazy)</label>
                  <input
                    type="text"
                    placeholder="např. tabory, vyjizky, hipoterapie"
                    value={service.id || ''}
                    onChange={(e) => updateArrayItem(['services'], index, 'id', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Název služby</label>
                  <input
                    type="text"
                    placeholder="Název služby"
                    value={service.title || ''}
                    onChange={(e) => updateArrayItem(['services'], index, 'title', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Popis služby</label>
                  <textarea
                    placeholder="Popis služby"
                    value={service.description || ''}
                    onChange={(e) => updateArrayItem(['services'], index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all resize-none bg-white text-[var(--farm-primary-text)]"
                  />
                </div>
                <ImageUpload
                  label="Obrázek služby"
                  value={service.image || ''}
                  onChange={(url) => updateArrayItem(['services'], index, 'image', url)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">Text tlačítka</label>
                    <input
                      type="text"
                      placeholder="Text tlačítka"
                      value={service.buttonText || ''}
                      onChange={(e) => updateArrayItem(['services'], index, 'buttonText', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)]"
                    />
                  </div>
                  <LinkSelector
                    label="Odkaz tlačítka"
                    value={service.buttonLink || ''}
                    onChange={(value) => updateArrayItem(['services'], index, 'buttonLink', value)}
                  />
                </div>

                {/* Details */}
                <div className="mt-4 p-4 bg-white rounded-xl border border-[var(--farm-border)]">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-[var(--farm-primary-text)]">Detaily služby</h5>
                    <button
                      onClick={() => {
                        const newDetails = [...(service.details || []), { title: '', description: '' }];
                        updateArrayItem(['services'], index, 'details', newDetails);
                      }}
                      className="text-sm px-3 py-1.5 rounded-lg bg-[var(--farm-accent-green)] text-white hover:bg-[var(--farm-accent-green)]/90 transition-colors"
                    >
                      + Přidat detail
                    </button>
                  </div>
                  <div className="space-y-2">
                    {service.details?.map((detail: any, detailIndex: number) => (
                      <div key={detailIndex} className="flex gap-2 p-2 bg-[var(--farm-section-alt-bg)] rounded-lg">
                        <input
                          type="text"
                          placeholder="Nadpis"
                          value={detail.title || ''}
                          onChange={(e) => {
                            const newDetails = [...service.details];
                            newDetails[detailIndex].title = e.target.value;
                            updateArrayItem(['services'], index, 'details', newDetails);
                          }}
                          className="flex-1 px-3 py-2 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-sm bg-white text-[var(--farm-primary-text)]"
                        />
                        <input
                          type="text"
                          placeholder="Popis"
                          value={detail.description || ''}
                          onChange={(e) => {
                            const newDetails = [...service.details];
                            newDetails[detailIndex].description = e.target.value;
                            updateArrayItem(['services'], index, 'details', newDetails);
                          }}
                          className="flex-1 px-3 py-2 rounded-lg border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all text-sm bg-white text-[var(--farm-primary-text)]"
                        />
                        <button
                          onClick={() => {
                            const newDetails = service.details.filter((_: any, i: number) => i !== detailIndex);
                            updateArrayItem(['services'], index, 'details', newDetails);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
      </FloatingCard>
    </>
  );
}
