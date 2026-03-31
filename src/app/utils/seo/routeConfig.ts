import { SEO_DEFAULT_DESCRIPTION } from './regional';

export interface RouteSeoConfig {
  pageId?: string;
  fallbackTitle: string;
  fallbackDescription: string;
  noindex?: boolean;
}

export const DEFAULT_SITE_NAME = 'Farma pod Janovou horou';
const DEFAULT_DESCRIPTION = SEO_DEFAULT_DESCRIPTION;

/** Veřejné routy s výchozími SEO texty — sdílené RouteSeo + JSON-LD. */
export const PUBLIC_ROUTE_SEO: Record<string, RouteSeoConfig> = {
  '/': {
    pageId: 'domu',
    fallbackTitle: DEFAULT_SITE_NAME,
    fallbackDescription: DEFAULT_DESCRIPTION,
  },
  '/sluzby': {
    pageId: 'sluzby',
    fallbackTitle: 'Naše služby',
    fallbackDescription:
      'Jezdecké tábory, kroužky, vyjížďky a akce na míru ve Vizovicích ve Zlínském kraji — vhodné i pro návštěvníky ze Zlína a okolí.',
  },
  '/blog': {
    pageId: 'blog',
    fallbackTitle: 'Blog',
    fallbackDescription:
      'Novinky a články z farmy ve Vizovicích ve Zlínském kraji — koně, tábory, kroužky a život na Janově hoře.',
  },
  '/nasi-kone': {
    pageId: 'nasi-kone',
    fallbackTitle: 'Naši koně',
    fallbackDescription: `Koně naší farmy ve Vizovicích ve Zlínském kraji — seznamte se s jejich povahou, příběhy a zaměřením.`,
  },
  '/o-nas': {
    pageId: 'o-nas',
    fallbackTitle: 'O nás',
    fallbackDescription: `Příběh farmy ve Vizovicích ve Zlínském kraji, chov koní a přístup k dětem v přírodě pod Janovou horou.`,
  },
  '/kontakt': {
    pageId: 'kontakt',
    fallbackTitle: 'Kontakt',
    fallbackDescription: `Kontakt a rezervace — Farma pod Janovou horou ve Vizovicích ve Zlínském kraji. Tábory, kroužky, dárkové poukazy.`,
  },
  '/ochrana-osobnich-udaju': {
    pageId: 'ochrana',
    fallbackTitle: 'Ochrana osobních údajů',
    fallbackDescription: 'Zpracování osobních údajů — Farma pod Janovou horou, Vizovice, Zlínský kraj.',
  },
  '/cookies': {
    pageId: 'cookies',
    fallbackTitle: 'Cookies',
    fallbackDescription: 'Cookies na webu farmy ve Vizovicích ve Zlínském kraji — přehled a nastavení.',
  },
  '/obchodni-podminky': {
    pageId: 'podminky',
    fallbackTitle: 'Obchodní podmínky',
    fallbackDescription: 'Obchodní podmínky Farmy pod Janovou horou, Vizovice — rezervace služeb a poukazů.',
  },
  '/reklamacni-rad': {
    pageId: 'reklamace',
    fallbackTitle: 'Reklamační řád',
    fallbackDescription: 'Reklamační řád farmy ve Vizovicích — postup řešení reklamací a stížností.',
  },
  '/cms-prihlaseni': {
    fallbackTitle: 'CMS přihlášení',
    fallbackDescription: 'Přihlášení do administrace webu.',
    noindex: true,
  },
};

/** Názvy pro BreadcrumbList (viditelná navigace na webu). */
export const BREADCRUMB_LABELS: Record<string, string> = {
  '/': 'Domů',
  '/sluzby': 'Naše služby',
  '/blog': 'Blog',
  '/nasi-kone': 'Naši koně',
  '/o-nas': 'O nás',
  '/kontakt': 'Kontakt',
  '/ochrana-osobnich-udaju': 'Ochrana osobních údajů',
  '/cookies': 'Cookies',
  '/obchodni-podminky': 'Obchodní podmínky',
  '/reklamacni-rad': 'Reklamační řád',
};

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '');
}

/** Položky pro schema.org BreadcrumbList (absolutní URL). */
export function buildBreadcrumbTrail(
  pathname: string,
  siteBase: string,
): Array<{ name: string; item: string }> {
  const normalized = normalizePathname(pathname);
  const root = siteBase.endsWith('/') ? siteBase : `${siteBase}/`;
  const items: Array<{ name: string; item: string }> = [];

  items.push({
    name: BREADCRUMB_LABELS['/'] || 'Domů',
    item: new URL('', root).toString(),
  });

  if (normalized === '/') {
    return items;
  }

  const segments = normalized.split('/').filter(Boolean);
  let pathAcc = '';
  for (const seg of segments) {
    pathAcc += `/${seg}`;
    const name = BREADCRUMB_LABELS[pathAcc] || seg;
    const rel = pathAcc.replace(/^\/+/, '');
    items.push({
      name,
      item: new URL(rel, root).toString(),
    });
  }

  return items;
}
