import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { readCookieConsent } from '../utils/cookieConsent';
import { trackUiEngagement } from '../utils/analytics/runtime';

function inNoTrackSubtree(el: Element | null): boolean {
  return !!el?.closest('[data-no-track]');
}

function normalizeText(el: HTMLElement): string {
  return (el.textContent || '').replace(/\s+/g, ' ').trim();
}

function getClickableFromTarget(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof HTMLElement)) {
    return null;
  }
  const el = target.closest(
    'button, [role="button"], [role="tab"], input[type="submit"], input[type="button"], input[type="reset"], a[href]',
  ) as HTMLElement | null;
  if (!el || inNoTrackSubtree(el)) {
    return null;
  }

  if (el.getAttribute('aria-disabled') === 'true') {
    return null;
  }
  if (el instanceof HTMLButtonElement && el.disabled) {
    return null;
  }
  if (el instanceof HTMLInputElement) {
    if (!['submit', 'button', 'reset'].includes(el.type)) {
      return null;
    }
    if (el.disabled) {
      return null;
    }
  }

  return el;
}

function clickLabel(el: HTMLElement): string {
  const explicit = el.getAttribute('data-track');
  if (explicit?.trim()) {
    return explicit.trim().slice(0, 120);
  }

  const aria = el.getAttribute('aria-label')?.trim() || el.getAttribute('title')?.trim();
  if (aria) {
    return aria.slice(0, 120);
  }

  if (el instanceof HTMLAnchorElement) {
    const t = normalizeText(el);
    if (t) {
      return t.slice(0, 120);
    }
    try {
      const u = new URL(el.href, window.location.origin);
      if (u.protocol === 'tel:') {
        return 'tel_link';
      }
      if (u.protocol === 'mailto:') {
        return 'mailto_link';
      }
      const path = u.pathname + u.search;
      return path.length > 100 ? `${path.slice(0, 97)}…` : path || 'link';
    } catch {
      return 'link';
    }
  }

  const t = normalizeText(el);
  if (t) {
    return t.slice(0, 120);
  }
  return el.tagName.toLowerCase();
}

function sanitizeHrefForAnalytics(href: string): string {
  try {
    const u = new URL(href, window.location.origin);
    if (u.origin === window.location.origin) {
      return `${u.pathname}${u.search}`.slice(0, 500);
    }
    return `${u.origin}${u.pathname}`.slice(0, 500);
  } catch {
    return href.slice(0, 200);
  }
}

function fieldKey(
  el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
): string {
  const track = el.getAttribute('data-track')?.trim();
  if (track) {
    return `track:${track}`.slice(0, 80);
  }
  const name = (el.name || '').trim();
  const id = (el.id || '').trim();
  const type = el instanceof HTMLInputElement ? el.type : el.tagName.toLowerCase();
  if (name) {
    return `${name}_${type}`.slice(0, 80);
  }
  if (id) {
    return `${id}_${type}`.slice(0, 80);
  }
  return `field_${type}`.slice(0, 80);
}

function fieldPrivacyLabel(
  el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
): string {
  const t = el.getAttribute('data-track')?.trim();
  if (t) {
    return `field:${t}`.slice(0, 120);
  }
  if (el instanceof HTMLInputElement) {
    if (el.type === 'email') {
      return 'field_email';
    }
    if (el.type === 'tel') {
      return 'field_phone';
    }
    if (el.type === 'password') {
      return 'field_password';
    }
  }
  return `field:${fieldKey(el)}`.slice(0, 120);
}

function isTrackableField(
  el: EventTarget | null,
): el is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement {
  if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement) && !(el instanceof HTMLSelectElement)) {
    return false;
  }
  if (inNoTrackSubtree(el)) {
    return false;
  }
  if (el instanceof HTMLInputElement) {
    if (['hidden', 'submit', 'button', 'reset', 'image', 'file'].includes(el.type)) {
      return false;
    }
    if (el.disabled) {
      return false;
    }
  }
  if ((el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) && el.disabled) {
    return false;
  }
  return true;
}

/**
 * Delegované měření kliků (tlačítka, odkazy, submit) a polí (první fokus, změna výběru).
 * Vyloučit z měření: obalit prvek `data-no-track` (např. interní CMS náhled).
 */
export function EngagementTracker() {
  const location = useLocation();
  const focusedOnce = useRef(new Set<string>());

  useEffect(() => {
    focusedOnce.current.clear();
  }, [location.pathname]);

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const consent = readCookieConsent();
      if (!consent?.analytics && !consent?.marketing) {
        return;
      }

      const el = getClickableFromTarget(e.target);
      if (!el) {
        return;
      }

      if (el instanceof HTMLInputElement && ['submit', 'button', 'reset'].includes(el.type)) {
        const label = clickLabel(el);
        trackUiEngagement({
          type: 'button_click',
          label: label || `input_${el.type}`,
          fieldKey: fieldKey(el),
        });
        return;
      }

      const label = clickLabel(el);
      const href =
        el instanceof HTMLAnchorElement && el.href ? sanitizeHrefForAnalytics(el.href) : undefined;

      trackUiEngagement({
        type: el instanceof HTMLAnchorElement ? 'link_click' : 'button_click',
        label,
        href: href || null,
      });
    };

    const onFocusInCapture = (e: FocusEvent) => {
      const consent = readCookieConsent();
      if (!consent?.analytics && !consent?.marketing) {
        return;
      }

      const t = e.target;
      if (!isTrackableField(t)) {
        return;
      }

      const key = `${location.pathname}|${fieldKey(t)}`;
      if (focusedOnce.current.has(key)) {
        return;
      }
      focusedOnce.current.add(key);

      trackUiEngagement({
        type: 'field_focus',
        label: fieldPrivacyLabel(t),
        fieldKey: fieldKey(t),
      });
    };

    const onChangeCapture = (e: Event) => {
      const consent = readCookieConsent();
      if (!consent?.analytics && !consent?.marketing) {
        return;
      }

      const t = e.target;
      if (inNoTrackSubtree(t as Element)) {
        return;
      }

      if (t instanceof HTMLSelectElement && !t.disabled) {
        trackUiEngagement({
          type: 'field_change',
          label: fieldPrivacyLabel(t),
          fieldKey: fieldKey(t),
        });
        return;
      }

      if (t instanceof HTMLInputElement && !t.disabled && ['checkbox', 'radio'].includes(t.type)) {
        trackUiEngagement({
          type: 'field_change',
          label: `${fieldPrivacyLabel(t)}_${t.checked ? 'on' : 'off'}`,
          fieldKey: fieldKey(t),
        });
      }
    };

    document.addEventListener('click', onClickCapture, true);
    document.addEventListener('focusin', onFocusInCapture, true);
    document.addEventListener('change', onChangeCapture, true);

    return () => {
      document.removeEventListener('click', onClickCapture, true);
      document.removeEventListener('focusin', onFocusInCapture, true);
      document.removeEventListener('change', onChangeCapture, true);
    };
  }, [location.pathname]);

  return null;
}
