/**
 * Měřicí skripty podle souhlasu (cookies). ID v .env — viz .env.example.
 */
import { readCookieConsent, type CookieConsentPreferences } from '../cookieConsent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    seznam_retargeting_id?: number;
    rc?: { conversionHit: (conf: SeznamConversionConf) => void };
  }
}

export interface SeznamConversionConf {
  id: number;
  value?: number | null;
  orderId?: string;
  zboziType?: string;
  zboziId?: string;
  consent: 0 | 1;
}

let ga4ShellInitialized = false;
let ga4ConfigLoaded = false;
let gtmScriptLoaded = false;
let metaPixelInitialized = false;
let seznamRcPromise: Promise<void> | null = null;

function envTrim(key: string): string | undefined {
  const v = import.meta.env[key as keyof ImportMetaEnv];
  return typeof v === 'string' && v.trim() ? v.trim() : undefined;
}

function ensureDataLayer(): unknown[] {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function pushConsentDataLayer(consent: CookieConsentPreferences | null) {
  const dl = ensureDataLayer();
  const analytics = consent?.analytics === true;
  const marketing = consent?.marketing === true;
  dl.push({
    event: 'fpjh_cookie_consent',
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
    fpjh_analytics: analytics,
    fpjh_marketing: marketing,
  });
}

function injectScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(s);
  });
}

function initGa4Shell(measurementId: string) {
  if (ga4ShellInitialized) {
    return;
  }
  ga4ShellInitialized = true;

  ensureDataLayer();
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });

  void injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`).then(() => {
    window.gtag!('js', new Date());
    window.gtag!('config', measurementId, {
      anonymize_ip: true,
      send_page_view: false,
    });
    ga4ConfigLoaded = true;
    applyGa4Consent(readCookieConsent());
  });
}

function applyGa4Consent(consent: CookieConsentPreferences | null) {
  if (!window.gtag) {
    return;
  }
  const analytics = consent?.analytics === true;
  const marketing = consent?.marketing === true;
  window.gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  });
}

function initGtm(containerId: string) {
  if (gtmScriptLoaded || document.querySelector('script[src*="googletagmanager.com/gtm.js?id="]')) {
    return;
  }
  ensureDataLayer();
  const w = window as Window & Record<string, unknown>;
  w.dataLayer!.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const first = document.getElementsByTagName('script')[0];
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
  first.parentNode!.insertBefore(s, first);
  gtmScriptLoaded = true;
}

function initMetaPixel(pixelId: string) {
  if (metaPixelInitialized || typeof window.fbq === 'function') {
    metaPixelInitialized = true;
    return;
  }

  const fbqFn = function (...args: unknown[]) {
    const n = fbqFn as unknown as {
      callMethod?: (...a: unknown[]) => void;
      queue: unknown[];
    };
    if (n.callMethod) {
      n.callMethod.apply(fbqFn, args);
    } else {
      n.queue.push(args);
    }
  };
  const n = fbqFn as unknown as {
    push: typeof fbqFn;
    loaded: boolean;
    version: string;
    queue: unknown[];
  };
  n.push = fbqFn;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];

  window.fbq = fbqFn;
  window._fbq = fbqFn;

  const t = document.createElement('script');
  t.async = true;
  t.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const s0 = document.getElementsByTagName('script')[0];
  s0.parentNode!.insertBefore(t, s0);

  window.fbq('init', pixelId);
  metaPixelInitialized = true;
}

function loadSeznamRc(): Promise<void> {
  if (seznamRcPromise) {
    return seznamRcPromise;
  }
  if (typeof window.rc?.conversionHit === 'function') {
    seznamRcPromise = Promise.resolve();
    return seznamRcPromise;
  }
  if (document.querySelector('script[src*="c.seznam.cz/js/rc.js"]')) {
    seznamRcPromise = Promise.resolve();
    return seznamRcPromise;
  }

  seznamRcPromise = new Promise((resolve, reject) => {
    const rtId = envTrim('VITE_SEZNAM_RETARGETING_ID');
    if (rtId && /^\d+$/.test(rtId)) {
      window.seznam_retargeting_id = Number(rtId);
    }
    const s = document.createElement('script');
    s.src = 'https://c.seznam.cz/js/rc.js';
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => {
      seznamRcPromise = null;
      reject(new Error('Seznam rc.js failed to load'));
    };
    document.body.appendChild(s);
  });
  return seznamRcPromise;
}

/** Jednou při startu: dataLayer / GA4 shell s default consent denied. */
export function bootstrapAnalyticsShell() {
  const gtmId = envTrim('VITE_GTM_CONTAINER_ID');
  const gaId = envTrim('VITE_GA_MEASUREMENT_ID');

  if (gtmId) {
    ensureDataLayer();
    pushConsentDataLayer(null);
    return;
  }

  if (gaId) {
    initGa4Shell(gaId);
  }
}

/** Po mountu a při změně souhlasu. */
export function syncAnalyticsScripts() {
  const consent = readCookieConsent();
  pushConsentDataLayer(consent);

  const gtmId = envTrim('VITE_GTM_CONTAINER_ID');
  const gaId = envTrim('VITE_GA_MEASUREMENT_ID');
  const pixelId = envTrim('VITE_META_PIXEL_ID');

  const allowAnalytics = consent?.analytics === true;
  const allowMarketing = consent?.marketing === true;

  if (gtmId && (allowAnalytics || allowMarketing)) {
    initGtm(gtmId);
  }

  if (gaId && window.gtag) {
    applyGa4Consent(consent);
  }

  if (allowMarketing && pixelId) {
    initMetaPixel(pixelId);
  }

  if (allowMarketing) {
    void loadSeznamRc().catch(() => {});
  }
}

export function trackGa4PageView(pagePath: string, pageTitle?: string) {
  const consent = readCookieConsent();
  if (!consent?.analytics) {
    return;
  }

  const gtmId = envTrim('VITE_GTM_CONTAINER_ID');
  const gaId = envTrim('VITE_GA_MEASUREMENT_ID');
  const title = pageTitle ?? document.title;

  ensureDataLayer();
  window.dataLayer!.push({
    event: 'fpjh_page_view',
    page_path: pagePath,
    page_title: title,
  });

  if (!gtmId && gaId && window.gtag && ga4ConfigLoaded) {
    window.gtag('config', gaId, {
      page_path: pagePath,
      page_title: title,
    });
  }
}

export function trackSklikConversion(
  conf: Omit<SeznamConversionConf, 'consent'> & { consent?: 0 | 1 },
) {
  const consent = readCookieConsent();
  const marketing = consent?.marketing === true;
  const c = conf.consent !== undefined ? conf.consent : marketing ? 1 : 0;
  if (c !== 1) {
    return;
  }
  void loadSeznamRc()
    .then(() => {
      if (typeof window.rc?.conversionHit === 'function') {
        window.rc.conversionHit({
          id: conf.id,
          value: conf.value ?? null,
          orderId: conf.orderId,
          zboziType: conf.zboziType,
          zboziId: conf.zboziId,
          consent: 1,
        });
      }
    })
    .catch(() => {});
}

export type UiEngagementType = 'button_click' | 'link_click' | 'field_focus' | 'field_change';

export interface UiEngagementPayload {
  type: UiEngagementType;
  /** Krátký popis bez citlivých údajů (text tlačítka, typ pole, …) */
  label: string;
  href?: string | null;
  fieldKey?: string | null;
}

/**
 * Mikrokonverze / zapojení UI — pro GA4 (a GTM přes dataLayer) a volitelně Meta Custom.
 * Nevolá se bez souhlasu s analytikou nebo marketingem.
 */
export function trackUiEngagement(payload: UiEngagementPayload) {
  const consent = readCookieConsent();
  const analytics = consent?.analytics === true;
  const marketing = consent?.marketing === true;
  if (!analytics && !marketing) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  const page_path = `${window.location.pathname}${window.location.search || ''}`;
  const label = payload.label.trim().slice(0, 120);
  const dlPayload: Record<string, unknown> = {
    event: 'fpjh_ui_engagement',
    ui_type: payload.type,
    ui_label: label || 'unknown',
    page_path,
  };
  if (payload.href) {
    dlPayload.link_url = payload.href.slice(0, 500);
  }
  if (payload.fieldKey) {
    dlPayload.field_key = payload.fieldKey.slice(0, 80);
  }

  if (analytics) {
    ensureDataLayer();
    window.dataLayer!.push(dlPayload);
    const gtmId = envTrim('VITE_GTM_CONTAINER_ID');
    const gaId = envTrim('VITE_GA_MEASUREMENT_ID');
    if (!gtmId && gaId && window.gtag) {
      const g: Record<string, string | undefined> = {
        ui_type: payload.type,
        ui_label: label || 'unknown',
      };
      if (payload.href) {
        g.link_url = payload.href.slice(0, 500);
      }
      if (payload.fieldKey) {
        g.field_key = payload.fieldKey.slice(0, 80);
      }
      window.gtag('event', 'fpjh_ui_engagement', g);
    }
  }

  if (marketing && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'FpjhUiEngagement', {
      ui_type: payload.type,
      ui_label: label || 'unknown',
    });
  }
}

export function trackContactFormLead(options?: { transactionId?: string }) {
  const consent = readCookieConsent();

  if (consent?.analytics) {
    ensureDataLayer();
    window.dataLayer!.push({
      event: 'generate_lead',
      lead_method: 'contact_form',
    });
    const gtmId = envTrim('VITE_GTM_CONTAINER_ID');
    const gaId = envTrim('VITE_GA_MEASUREMENT_ID');
    if (!gtmId && gaId && window.gtag) {
      window.gtag('event', 'generate_lead', { method: 'contact_form' });
    }
  }

  const convIdStr = envTrim('VITE_SKLIK_CONVERSION_ID');
  if (consent?.marketing && convIdStr && /^\d+$/.test(convIdStr)) {
    trackSklikConversion({
      id: Number(convIdStr),
      value: null,
      orderId: options?.transactionId ?? `lead-${Date.now()}`,
    });
  }

  if (consent?.marketing && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }
}
