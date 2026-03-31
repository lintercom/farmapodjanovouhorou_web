import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useGlobalSettings } from './useGlobalSettings';
import { preloadPage } from '../utils/siteDataCache';
import { defaultPageContent } from '../utils/defaultPageContent';
import { resolveCmsImageUrl } from '../utils/media';
import { getSiteBaseUrl } from '../utils/siteUrl';
import { SEO_DEFAULT_DESCRIPTION } from '../utils/seo/regional';
import { DEFAULT_SITE_NAME, normalizePathname, PUBLIC_ROUTE_SEO } from '../utils/seo/routeConfig';

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

export interface RouteSeoModel {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  siteName: string;
  robots: string;
  faviconUrl: string;
  includeLocalGeo: boolean;
  pathname: string;
  indexable: boolean;
}

export function useRouteSeoModel(): RouteSeoModel {
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

  return useMemo(() => {
    const siteName = settings?.siteName?.trim() || DEFAULT_SITE_NAME;
    const defaultMetaTitle = settings?.defaultMetaTitle?.trim() || siteName;
    const defaultMetaDescription = settings?.defaultMetaDescription?.trim() || SEO_DEFAULT_DESCRIPTION;
    const imageUrl = toAbsoluteUrl(
      resolveCmsImageUrl(settings?.ogImage, settings?.heroImage, '/hero-placeholder.svg'),
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
      pathname === '/' ? defaultMetaTitle : `${contentTitle} | ${siteName}`;

    const noindex = routeConfig?.noindex || !routeConfig;

    return {
      title: pageTitle,
      description: contentDescription,
      canonicalUrl: new URL(
        pathname === '/' ? '' : pathname.replace(/^\/+/, ''),
        `${getSiteBaseUrl()}/`,
      ).toString(),
      imageUrl,
      siteName,
      robots: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
      faviconUrl: toAbsoluteUrl(settings?.favicon),
      includeLocalGeo: !noindex,
      pathname,
      indexable: !noindex,
    };
  }, [pageData, pathname, routeConfig, settings]);
}
