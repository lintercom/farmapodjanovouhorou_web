import { useEffect, useMemo } from 'react';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { useContactData } from '../hooks/useContactData';
import { useRouteSeoModel } from '../hooks/useRouteSeoModel';
import { applySeoMetadata } from '../utils/seo';
import { buildFullSiteJsonLd } from '../utils/seo/jsonLd';

export function RouteSeo() {
  const metadata = useRouteSeoModel();
  const { settings } = useGlobalSettings();
  const { contactData } = useContactData();

  useEffect(() => {
    applySeoMetadata({
      title: metadata.title,
      description: metadata.description,
      canonicalUrl: metadata.canonicalUrl,
      imageUrl: metadata.imageUrl,
      siteName: metadata.siteName,
      robots: metadata.robots,
      faviconUrl: metadata.faviconUrl,
      includeLocalGeo: metadata.includeLocalGeo,
    });
  }, [metadata]);

  const jsonLd = useMemo(
    () =>
      JSON.stringify(
        buildFullSiteJsonLd(settings, contactData, {
          pathname: metadata.pathname,
          pageTitle: metadata.title,
          pageDescription: metadata.description,
          canonicalUrl: metadata.canonicalUrl,
          indexable: metadata.indexable,
        }),
      ),
    [settings, contactData, metadata],
  );

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />;
}
