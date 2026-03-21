import { pagesApi, settingsApi } from './api';

const pageCache = new Map<string, any | null>();
const pageRequests = new Map<string, Promise<any | null>>();

let settingsCache: any | null = null;
let hasSettingsCache = false;
let settingsRequest: Promise<any | null> | null = null;

export function hasCachedPage(pageId: string) {
  return pageCache.has(pageId);
}

export function getCachedPage(pageId: string) {
  return pageCache.get(pageId) ?? null;
}

export async function preloadPage(pageId: string) {
  if (pageCache.has(pageId)) {
    return pageCache.get(pageId) ?? null;
  }

  const existingRequest = pageRequests.get(pageId);
  if (existingRequest) {
    return existingRequest;
  }

  const request = pagesApi
    .get(pageId)
    .then((response) => {
      const page = response?.page ?? null;
      pageCache.set(pageId, page);
      return page;
    })
    .finally(() => {
      pageRequests.delete(pageId);
    });

  pageRequests.set(pageId, request);
  return request;
}

export function setCachedPage(pageId: string, page: any) {
  pageCache.set(pageId, page ?? null);
}

export function invalidatePageCache(pageId: string) {
  pageCache.delete(pageId);
  pageRequests.delete(pageId);
}

export function hasCachedSettings() {
  return hasSettingsCache;
}

export function getCachedSettings() {
  return settingsCache;
}

export async function preloadSettings() {
  if (hasSettingsCache) {
    return settingsCache;
  }

  if (settingsRequest) {
    return settingsRequest;
  }

  settingsRequest = settingsApi
    .get()
    .then((response) => {
      settingsCache = response?.settings ?? null;
      hasSettingsCache = true;
      return settingsCache;
    })
    .finally(() => {
      settingsRequest = null;
    });

  return settingsRequest;
}

export function setCachedSettings(settings: any) {
  settingsCache = settings ?? null;
  hasSettingsCache = true;
}

export function invalidateSettingsCache() {
  settingsCache = null;
  hasSettingsCache = false;
  settingsRequest = null;
}
