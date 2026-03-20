import { Plus, Trash2 } from 'lucide-react';
import { FloatingCard } from '../../../components/FloatingCard';
import { Button } from '../../../components/Button';
import { LinkSelector } from '../../../components/admin/LinkSelector';

export function HomePageEditor({ data, updateField, updateArrayItem, addArrayItem, removeArrayItem }: any) {
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
    </>
  );
}