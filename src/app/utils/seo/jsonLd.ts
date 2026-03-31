import type { ContactData } from '../../hooks/useContactData';
import { getSiteBaseUrl } from '../siteUrl';
import { resolveCmsImageUrl } from '../media';
import { SEO_GEO_LAT, SEO_GEO_LON } from './regional';
import { buildBreadcrumbTrail } from './routeConfig';

interface GlobalSettingsLite {
  siteName?: string;
  heroImage?: string;
  ogImage?: string;
  logo?: string;
}

function toAbsoluteUrl(href: string): string {
  if (!href) {
    return '';
  }
  try {
    return new URL(href, `${getSiteBaseUrl()}/`).toString();
  } catch {
    return href;
  }
}

/** Odpovídá kotvám na `/sluzby` a výchozímu obsahu služeb v CMS. */
const FARM_MAIN_SERVICES: ReadonlyArray<{ name: string; path: string }> = [
  { name: 'Jezdecké tábory', path: '/sluzby#tabory' },
  { name: 'Jezdecké kroužky', path: '/sluzby#krouzky' },
  { name: 'Jízda na koni / vyjížďky', path: '/sluzby#vyjizdy' },
  { name: 'Akce na míru', path: '/sluzby#akce-na-miru' },
];

export interface FullJsonLdPageContext {
  pathname: string;
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
  indexable: boolean;
}

/**
 * Schema.org graf: Organization + LocalBusiness, WebSite, nabídka služeb,
 * na indexovatelných veřejných stránkách též WebPage + BreadcrumbList.
 */
export function buildFullSiteJsonLd(
  settings: GlobalSettingsLite | null,
  contact: ContactData,
  page: FullJsonLdPageContext,
): object {
  const base = getSiteBaseUrl();
  const siteName = settings?.siteName?.trim() || 'Farma pod Janovou horou';
  const rawImg = resolveCmsImageUrl(
    settings?.ogImage,
    settings?.heroImage,
    settings?.logo?.trim() ? settings.logo : '/logo-placeholder.svg',
  );
  const imageUrl = rawImg ? toAbsoluteUrl(rawImg) : '';

  const sameAs = [contact.socialMedia?.facebook, contact.socialMedia?.instagram].filter(
    (u): u is string => typeof u === 'string' && u.startsWith('http'),
  );

  const orgId = `${base}#organization`;
  const websiteId = `${base}#website`;
  const postal = (contact.postalCode || '').replace(/\s/g, '');

  const makesOffer = FARM_MAIN_SERVICES.map((s) => ({
    '@type': 'Offer' as const,
    itemOffered: {
      '@type': 'Service' as const,
      name: s.name,
      url: toAbsoluteUrl(s.path.replace(/^\//, '')),
    },
  }));

  const graph: object[] = [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': orgId,
      name: siteName,
      url: base,
      telephone: contact.phone || undefined,
      email: contact.email || undefined,
      image: imageUrl || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: contact.address || undefined,
        addressLocality: contact.city || undefined,
        ...(postal ? { postalCode: postal } : {}),
        addressRegion: 'Zlínský kraj',
        addressCountry: 'CZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SEO_GEO_LAT,
        longitude: SEO_GEO_LON,
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Zlínský kraj' },
        { '@type': 'City', name: 'Vizovice' },
        { '@type': 'City', name: 'Zlín' },
      ],
      makesOffer,
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: base,
      name: siteName,
      inLanguage: 'cs-CZ',
      publisher: { '@id': orgId },
      potentialAction: {
        '@type': 'ContactAction',
        target: toAbsoluteUrl('kontakt'),
      },
    },
  ];

  if (page.indexable) {
    const webpageId = `${page.canonicalUrl}#webpage`;
    const breadcrumbId = `${page.canonicalUrl}#breadcrumb`;
    const isBlogIndex = page.pathname === '/blog';

    graph.push({
      '@type': isBlogIndex ? ['WebPage', 'CollectionPage'] : 'WebPage',
      '@id': webpageId,
      url: page.canonicalUrl,
      name: page.pageTitle,
      description: page.pageDescription,
      inLanguage: 'cs-CZ',
      isPartOf: { '@id': websiteId },
      about: { '@id': orgId },
      breadcrumb: { '@id': breadcrumbId },
      ...(imageUrl ? { primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl } } : {}),
    });

    const trail = buildBreadcrumbTrail(page.pathname, base);
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: trail.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.name,
        item: t.item,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
