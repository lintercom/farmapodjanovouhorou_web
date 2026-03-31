import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { preloadPage } from '../utils/siteDataCache';
import { defaultPageContent } from '../utils/defaultPageContent';
import { resolveCmsImageUrl } from '../utils/media';
import { applySeoMetadata } from '../utils/seo';
import { getSiteBaseUrl } from '../utils/siteUrl';
import { SEO_DEFAULT_DESCRIPTION } from '../utils/seo/regional';

interface RouteSeoConfig {
  pageId?: string;
  fallbackTitle: string;
  fallbackDescription: string;
  noindex?: boolean;
}

const DEFAULT_SITE_NAME = 'Farma pod Janovou horou';
const DEFAULT_DESCRIPTION = SEO_DEFAULT_DESCRIPTION;

const PUBLIC_ROUTE_SEO: Record<string, RouteSeoConfig> = {
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

function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '');
}

function toAbsoluteUrl(value?: string) {
  if (!value || typeof window === 'undefined') {
    return '';
  }

  try {
    return new URL(value, window.location.origin).toString();
  } catch {
    return value;
  }
}

export function RouteSeo() {
  const location = useLocation();
  const { settings } = useGlobalSettings();
  const pathname = normalizePathname(location.pathname);
  const routeConfig = PUBLIC_ROUTE_SEO[pathname];
  const [pageData, setPageData] = useState<any | null>(null);

  useEffect(() => {
    let isActive = true;

    if (!routeConfig?.pageId) {
      setPageData(null);
      return () => {
        isActive = false;
      };
    }

    const fallbackData = defaultPageContent[routeConfig.pageId] ?? null;
    setPageData(fallbackData);

    preloadPage(routeConfig.pageId)
      .then((data) => {
        if (isActive && data) {
          setPageData(data);
        }
      })
      .catch(() => {
        if (isActive) {
          setPageData(fallbackData);
        }
      });

    return () => {
      isActive = false;
    };
  }, [routeConfig?.pageId]);

  const metadata = useMemo(() => {
    const siteName = settings?.siteName?.trim() || DEFAULT_SITE_NAME;
    const defaultMetaTitle = settings?.defaultMetaTitle?.trim() || siteName;
    const defaultMetaDescription = settings?.defaultMetaDescription?.trim() || DEFAULT_DESCRIPTION;
    const imageUrl = toAbsoluteUrl(
      resolveCmsImageUrl(settings?.ogImage, settings?.heroImage, '/hero-placeholder.svg')
    );

    const fallbackTitle = routeConfig?.fallbackTitle || 'Stránka nenalezena';
    const contentTitle =
      pageData?.title?.trim?.() ||
      pageData?.hero?.title?.trim?.() ||
      fallbackTitle ||
      defaultMetaTitle;
    const contentDescription =
      pageData?.hero?.subtitle?.trim?.() ||
      routeConfig?.fallbackDescription ||
      defaultMetaDescription;

    const pageTitle =
      pathname === '/'
        ? defaultMetaTitle
        : `${contentTitle} | ${siteName}`;

    const noindex = routeConfig?.noindex || !routeConfig;

    return {
      title: pageTitle,
      description: contentDescription,
      canonicalUrl: new URL(
        pathname === '/' ? '' : pathname.replace(/^\/+/, ''),
        `${getSiteBaseUrl()}/`
      ).toString(),
      imageUrl,
      siteName,
      robots: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
      faviconUrl: toAbsoluteUrl(settings?.favicon),
      includeLocalGeo: !noindex,
    };
  }, [pageData, pathname, routeConfig, settings]);

  useEffect(() => {
    applySeoMetadata(metadata);
  }, [metadata]);

  return null;
}
