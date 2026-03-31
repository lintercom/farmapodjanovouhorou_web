import { useMemo } from 'react';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { useContactData } from '../hooks/useContactData';
import { buildWebsiteJsonLd } from '../utils/seo/jsonLd';

/** Strukturovaná data (JSON-LD) pro vyhledávače — bez vizuálního výstupu. */
export function SeoJsonLd() {
  const { settings } = useGlobalSettings();
  const { contactData } = useContactData();

  const json = useMemo(
    () => JSON.stringify(buildWebsiteJsonLd(settings, contactData)),
    [settings, contactData],
  );

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
