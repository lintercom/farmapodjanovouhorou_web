import { preloadPage, preloadSettings } from './siteDataCache';

const routePageMap: Record<string, string[]> = {
  '/': ['domu', 'sluzby', 'nasi-kone', 'kontakt'],
  '/sluzby': ['sluzby', 'kontakt'],
  '/blog': ['blog', 'kontakt'],
  '/nasi-kone': ['nasi-kone', 'kontakt'],
  '/o-nas': ['o-nas', 'kontakt'],
  '/kontakt': ['kontakt'],
  '/ochrana-osobnich-udaju': ['ochrana', 'kontakt'],
  '/cookies': ['cookies', 'kontakt'],
  '/obchodni-podminky': ['podminky', 'kontakt'],
  '/reklamacni-rad': ['reklamace', 'kontakt'],
  '/cms-prihlaseni': ['kontakt'],
};

export async function preloadRouteData(pathname: string) {
  const pageIds = routePageMap[pathname] ?? ['kontakt'];

  await Promise.all([
    preloadSettings().catch(() => null),
    ...pageIds.map((pageId) => preloadPage(pageId).catch(() => null)),
  ]);
}
