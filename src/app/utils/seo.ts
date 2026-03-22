export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
  siteName: string;
  robots?: string;
  faviconUrl?: string;
}

function upsertMeta(selector: { name?: string; property?: string }, content: string) {
  if (!content) {
    return;
  }

  const attrName = selector.name ? 'name' : 'property';
  const attrValue = selector.name ?? selector.property;

  if (!attrValue) {
    return;
  }

  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  if (!href) {
    return;
  }

  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

export function applySeoMetadata(metadata: SeoMetadata) {
  if (typeof document === 'undefined') {
    return;
  }

  document.title = metadata.title;

  upsertMeta({ name: 'description' }, metadata.description);
  upsertMeta({ name: 'robots' }, metadata.robots || 'index, follow, max-image-preview:large');
  upsertMeta({ property: 'og:type' }, 'website');
  upsertMeta({ property: 'og:title' }, metadata.title);
  upsertMeta({ property: 'og:description' }, metadata.description);
  upsertMeta({ property: 'og:url' }, metadata.canonicalUrl);
  upsertMeta({ property: 'og:site_name' }, metadata.siteName);
  upsertMeta({ name: 'twitter:card' }, metadata.imageUrl ? 'summary_large_image' : 'summary');
  upsertMeta({ name: 'twitter:title' }, metadata.title);
  upsertMeta({ name: 'twitter:description' }, metadata.description);

  if (metadata.imageUrl) {
    upsertMeta({ property: 'og:image' }, metadata.imageUrl);
    upsertMeta({ name: 'twitter:image' }, metadata.imageUrl);
  }

  upsertLink('canonical', metadata.canonicalUrl);

  if (metadata.faviconUrl) {
    upsertLink('icon', metadata.faviconUrl);
  }
}
