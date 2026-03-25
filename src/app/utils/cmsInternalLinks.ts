/**
 * Interní odkazy nabízené v CMS — musí odpovídat routám v `routes.ts`.
 * Hodnoty ukládejte jako cesty z kořene webu (např. `/sluzby#tabory`), ne jako samotné `#kotvy`.
 */

export type CmsInternalLinkOption = { value: string; label: string };

export type CmsInternalLinkGroup = {
  id: string;
  label: string;
  options: CmsInternalLinkOption[];
};

export const CMS_INTERNAL_LINK_GROUPS: CmsInternalLinkGroup[] = [
  {
    id: 'pages',
    label: 'Stránky',
    options: [
      { value: '/', label: 'Domů' },
      { value: '/sluzby', label: 'Služby' },
      { value: '/blog', label: 'Blog' },
      { value: '/nasi-kone', label: 'Naši koně' },
      { value: '/o-nas', label: 'O nás' },
      { value: '/kontakt', label: 'Kontakt' },
    ],
  },
  {
    id: 'legal',
    label: 'Právní stránky',
    options: [
      { value: '/ochrana-osobnich-udaju', label: 'Ochrana osobních údajů' },
      { value: '/cookies', label: 'Cookies' },
      { value: '/obchodni-podminky', label: 'Obchodní podmínky' },
      { value: '/reklamacni-rad', label: 'Reklamační řád' },
    ],
  },
  {
    id: 'services-sections',
    label: 'Služby — sekce na stránce',
    options: [
      { value: '/sluzby#tabory', label: 'Tábory' },
      { value: '/sluzby#krouzky', label: 'Kroužky' },
      { value: '/sluzby#vyjizdy', label: 'Jízda na koni / vyjížďky' },
      { value: '/sluzby#akce-na-miru', label: 'Akce na míru' },
    ],
  },
];

/** Staré hodnoty z CMS / šablon → nové funkční cesty */
const LEGACY_CMS_HREF: Record<string, string> = {
  '/akce': '/blog',
  '#tabory': '/sluzby#tabory',
  '#krouzky': '/sluzby#krouzky',
  '#vyjizdy': '/sluzby#vyjizdy',
  '#akce': '/sluzby#akce-na-miru',
  '#akce-na-miru': '/sluzby#akce-na-miru',
  '#kontakt': '/kontakt',
  '#hipoterapie': '/sluzby',
};

let presetValuesCache: Set<string> | null = null;

export function getCmsInternalLinkPresetValues(): Set<string> {
  if (!presetValuesCache) {
    presetValuesCache = new Set(
      CMS_INTERNAL_LINK_GROUPS.flatMap((g) => g.options.map((o) => o.value)),
    );
  }
  return presetValuesCache;
}

/** Odkazy na záložky stránky Kontakt (`/kontakt?tab=slug`) podle dat z CMS. */
export function buildContactReservationTabLinkOptions(
  tabs: Array<{ slug?: string; label?: string; title?: string }> | undefined | null,
): CmsInternalLinkOption[] {
  if (!Array.isArray(tabs) || tabs.length === 0) {
    return [];
  }
  const seen = new Set<string>();
  const out: CmsInternalLinkOption[] = [];
  for (const tab of tabs) {
    const slug = String(tab?.slug ?? '').trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    const label = String(tab.label || tab.title || slug).trim() || slug;
    out.push({
      value: `/kontakt?tab=${encodeURIComponent(slug)}`,
      label,
    });
  }
  return out;
}

/**
 * Pro `<select>`: pokud aktuální hodnota není v předvolbách, zobrazí se prázdná volba (vlastní URL).
 */
export function cmsLinkSelectDisplayedValue(
  raw: string | undefined,
  presets: Set<string> = getCmsInternalLinkPresetValues(),
): string {
  const v = (raw ?? '').trim();
  if (!v) return '';
  return presets.has(v) ? v : '';
}

/** Opraví zastaralé interní odkazy; externí URL a mailto/tel nechá beze změny. */
export function normalizeCmsInternalHref(href: string | undefined | null): string {
  const h = (href ?? '').trim();
  if (!h) return '';
  if (/^https?:\/\//i.test(h) || h.startsWith('mailto:') || h.startsWith('tel:')) {
    return h;
  }
  const mapped = LEGACY_CMS_HREF[h];
  if (mapped) return mapped;
  return h;
}
