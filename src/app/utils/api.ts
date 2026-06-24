import { projectId, publicAnonKey } from '/utils/supabase/info';
import { CMS_DEFAULT_PASSWORD } from './cmsCredentials';
import { normalizePasswordForCms } from './passwordNormalize';
import { fixMojibakeDeep } from './encoding';

export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-399cd496`;

/**
 * Ověří heslo správce přes Edge Function `verify-cms-login`.
 * Pokud endpoint není nasazený (404/405) nebo síť selže, použije se výhradně výchozí heslo
 * (stejné chování jako před zavedením API), aby přihlášení nebylo závislé na redeploy.
 */
export async function verifyCmsAdminPassword(password: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/verify-cms-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ password: normalizePasswordForCms(password) }),
    });
    if (res.ok) {
      return true;
    }
    if (res.status === 404 || res.status === 405) {
      return password === CMS_DEFAULT_PASSWORD;
    }
    return false;
  } catch {
    return password === CMS_DEFAULT_PASSWORD;
  }
}

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const rawError = await response.text().catch(() => '');

    try {
      const parsedError = JSON.parse(rawError);
      throw new Error(parsedError.error || `HTTP chyba: ${response.status}`);
    } catch {
      const fallbackMessage = rawError.trim();
      throw new Error(fallbackMessage || `HTTP chyba: ${response.status}`);
    }
  }

  const payload = await response.json();
  return fixMojibakeDeep(payload);
}

// Pages API
export const pagesApi = {
  // Get all pages metadata
  getAll: () => apiCall('/pages'),

  // Get specific page content
  get: (pageId: string) => apiCall(`/pages/${pageId}`),

  // Save/update page content
  save: (pageId: string, data: any) => 
    apiCall(`/pages/${pageId}`, { method: 'PUT', body: data }),
};

// Global settings API
export const settingsApi = {
  get: () => apiCall('/settings'),
  save: (settings: any) => apiCall('/settings', { method: 'POST', body: { settings } }),
};

// Contact form API
export const contactApi = {
  sendMessage: (message: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) => apiCall('/contact-message', { method: 'POST', body: message }),
};
