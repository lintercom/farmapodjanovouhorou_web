/** Výchozí kanonická doména (GitHub Pages) — přepište `VITE_SITE_URL` na produkci. */
export const DEFAULT_SITE_URL = 'https://farmapodjanovouhorou.cz';

/**
 * Základ URL webu pro kanonické odkazy a JSON-LD (bez koncového lomítka u cesty base).
 */
export function getSiteBaseUrl(): string {
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
