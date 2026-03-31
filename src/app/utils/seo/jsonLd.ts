import type { ContactData } from '../../hooks/useContactData';
import { getSiteBaseUrl } from '../siteUrl';
import { resolveCmsImageUrl } from '../media';
import { SEO_GEO_LAT, SEO_GEO_LON } from './regional';

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

/**
 * Schema.org Organization + LocalBusiness + WebSite pro Google / Seznam (Firma.cz, výsledky vyhledávání).
 */
export function buildWebsiteJsonLd(settings: GlobalSettingsLite | null, contact: ContactData): object {
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

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': orgId,
        name: siteName,
        url: base,
        telephone: contact.phone,
        email: contact.email,
        image: imageUrl || undefined,
        address: {
          '@type': 'PostalAddress',
          streetAddress: contact.address,
          addressLocality: contact.city,
          postalCode: contact.postalCode.replace(/\s/g, ''),
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
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: base,
        name: siteName,
        inLanguage: 'cs-CZ',
        publisher: { '@id': orgId },
      },
    ],
  };
}
