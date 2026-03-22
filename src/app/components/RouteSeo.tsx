import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { preloadPage } from '../utils/siteDataCache';
import { defaultPageContent } from '../utils/defaultPageContent';
import { resolveCmsImageUrl } from '../utils/media';
import { applySeoMetadata } from '../utils/seo';

interface RouteSeoConfig {
  pageId?: string;
  fallbackTitle: string;
  fallbackDescription: string;
  noindex?: boolean;
}

const DEFAULT_SITE_NAME = 'Farma pod Janovou horou';
const DEFAULT_DESCRIPTION = 'Rodinná farma zaměřená na práci s dětmi a koňmi. Nabízíme jezdecké kroužky, tábory a vyjížďky v krásné přírodě.';
const DEFAULT_SITE_URL = 'https://lintercom.github.io/farmapodjanovouhorou_web';

const PUBLIC_ROUTE_SEO: Record<string, RouteSeoConfig> = {
  '/': {
    pageId: 'domu',
    fallbackTitle: DEFAULT_SITE_NAME,
    fallbackDescription: DEFAULT_DESCRIPTION,
  },
  '/sluzby': {
    pageId: 'sluzby',
    fallbackTitle: 'Naše služby',
    fallbackDescription: 'Prohlédněte si jezdecké tábory, kroužky, vyjížďky i akce na míru pro děti i dospělé.',
  },
  '/blog': {
    pageId: 'blog',
    fallbackTitle: 'Blog',
    fallbackDescription: 'Přečtěte si novinky z farmy, články o koních, táborech a našem každodenním životě.',
  },
  '/nasi-kone': {
    pageId: 'nasi-kone',
    fallbackTitle: 'Naši koně',
    fallbackDescription: 'Seznamte se s koňmi z naší farmy a poznejte jejich povahu, příběhy a zaměření.',
  },
  '/o-nas': {
    pageId: 'o-nas',
    fallbackTitle: 'O nás',
    fallbackDescription: 'Poznejte příběh farmy, naše hodnoty, tým a přístup k dětem i koním.',
  },
  '/kontakt': {
    pageId: 'kontakt',
    fallbackTitle: 'Kontakt',
    fallbackDescription: 'Kontaktujte Farmu pod Janovou horou, rezervujte tábory, kroužky nebo dárkové poukazy.',
  },
  '/ochrana-osobnich-udaju': {
    pageId: 'ochrana',
    fallbackTitle: 'Ochrana osobních údajů',
    fallbackDescription: 'Informace o zpracování osobních údajů na webu Farmy pod Janovou horou.',
  },
  '/cookies': {
    pageId: 'cookies',
    fallbackTitle: 'Cookies',
    fallbackDescription: 'Přehled používaných cookies a informací o jejich zpracování na tomto webu.',
  },
  '/obchodni-podminky': {
    pageId: 'podminky',
    fallbackTitle: 'Obchodní podmínky',
    fallbackDescription: 'Obchodní podmínky Farmy pod Janovou horou pro rezervace služeb a poukazů.',
  },
  '/reklamacni-rad': {
    pageId: 'reklamace',
    fallbackTitle: 'Reklamační řád',
    fallbackDescription: 'Podmínky reklamací a postup řešení stížností na webu Farmy pod Janovou horou.',
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

function getSiteBaseUrl() {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
  if (configuredSiteUrl) {
    return configuredSiteUrl.replace(/\/+$/, '');
  }

  if (typeof window === 'undefined') {
    return DEFAULT_SITE_URL;
  }

  const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  if (isLocalPreview) {
    return DEFAULT_SITE_URL;
  }

  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${window.location.origin}${basePath}`;
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

    return {
      title: pageTitle,
      description: contentDescription,
      canonicalUrl: new URL(
        pathname === '/' ? '' : pathname.replace(/^\/+/, ''),
        `${getSiteBaseUrl()}/`
      ).toString(),
      imageUrl,
      siteName,
      robots: routeConfig?.noindex || !routeConfig
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large',
      faviconUrl: toAbsoluteUrl(settings?.favicon),
    };
  }, [pageData, pathname, routeConfig, settings]);

  useEffect(() => {
    applySeoMetadata(metadata);
  }, [metadata]);

  return null;
}
