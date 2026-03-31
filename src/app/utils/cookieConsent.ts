export const COOKIE_CONSENT_STORAGE_KEY = 'cookieConsent';

/** Po uložení souhlasu z cookie lišty — poslouchejte pro načtení analytických skriptů. */
export const COOKIE_CONSENT_CHANGE_EVENT = 'fpjh:cookie-consent-change';

export interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function readCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<CookieConsentPreferences>;
    return {
      necessary: parsed.necessary !== false,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

export function dispatchCookieConsentChange() {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT));
}
