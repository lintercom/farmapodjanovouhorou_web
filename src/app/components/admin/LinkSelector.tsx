import { useEffect, useMemo, useState } from 'react';
import { pagesApi } from '../../utils/api';
import {
  CMS_INTERNAL_LINK_GROUPS,
  type CmsInternalLinkGroup,
  buildContactReservationTabLinkOptions,
  cmsLinkSelectDisplayedValue,
} from '../../utils/cmsInternalLinks';

interface LinkSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  /**
   * Aktuální karty / záložky kontaktu z editoru (včetně neuložených).
   * Když je předané, nepoužije se načtení z API pro tuto skupinu odkazů.
   */
  contactReservationTabs?: Array<{ slug?: string; label?: string; title?: string }>;
}

export function LinkSelector({
  value,
  onChange,
  label,
  className = '',
  contactReservationTabs,
}: LinkSelectorProps) {
  const [fetchedReservationTabs, setFetchedReservationTabs] = useState<
    Array<{ slug?: string; label?: string; title?: string }>
  >([]);

  useEffect(() => {
    if (contactReservationTabs !== undefined) {
      return;
    }

    let cancelled = false;
    pagesApi
      .get('kontakt')
      .then((res) => {
        if (cancelled) return;
        const tabs = res?.page?.reservationTabs;
        setFetchedReservationTabs(Array.isArray(tabs) ? tabs : []);
      })
      .catch(() => {
        if (!cancelled) setFetchedReservationTabs([]);
      });

    return () => {
      cancelled = true;
    };
  }, [contactReservationTabs]);

  const contactTabOptions = useMemo(() => {
    const source = contactReservationTabs !== undefined ? contactReservationTabs : fetchedReservationTabs;
    return buildContactReservationTabLinkOptions(source);
  }, [contactReservationTabs, fetchedReservationTabs]);

  const linkGroups: CmsInternalLinkGroup[] = useMemo(() => {
    const out: CmsInternalLinkGroup[] = [];
    for (const group of CMS_INTERNAL_LINK_GROUPS) {
      out.push(group);
      if (group.id === 'pages' && contactTabOptions.length > 0) {
        out.push({
          id: 'contact-tabs-from-cms',
          label: 'Kontakt — záložky (karty)',
          options: contactTabOptions,
        });
      }
    }
    return out;
  }, [contactTabOptions]);

  const presets = useMemo(() => {
    const s = new Set<string>();
    for (const g of linkGroups) {
      for (const o of g.options) {
        s.add(o.value);
      }
    }
    return s;
  }, [linkGroups]);

  const selectValue = cmsLinkSelectDisplayedValue(value, presets);
  const trimmed = (value ?? '').trim();
  const showCustomHint = Boolean(trimmed && !presets.has(trimmed));

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-[var(--farm-secondary-text)] mb-1.5">
          {label}
        </label>
      )}
      <select
        value={selectValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-[var(--farm-border)] focus:border-[var(--farm-accent-green)] focus:ring-2 focus:ring-[var(--farm-accent-green)]/20 focus:outline-none transition-all bg-white text-[var(--farm-primary-text)] cursor-pointer"
      >
        <option value="">— Vyberte odkaz —</option>
        {linkGroups.map((group) => (
          <optgroup key={group.id} label={group.label}>
            {group.options.map((link) => (
              <option key={`${group.id}:${link.value}`} value={link.value}>
                {link.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {showCustomHint ? (
        <p className="mt-1.5 text-xs text-[var(--farm-secondary-text)]">
          Aktuálně uložený vlastní odkaz:{' '}
          <span className="font-mono text-[var(--farm-primary-text)] break-all">{trimmed}</span>
        </p>
      ) : null}
    </div>
  );
}
