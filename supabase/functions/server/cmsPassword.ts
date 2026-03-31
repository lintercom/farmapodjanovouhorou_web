/**
 * CMS heslo účtu `admin` v KV: ukládá se bcrypt hash, ověření přes bcrypt.compare.
 * Legacy: plain text v DB nebo chybějící záznam (výchozí `admin`) — po úspěšném přihlášení se uloží hash.
 */
import bcrypt from 'npm:bcryptjs@2.4.3';

export const DEFAULT_CMS_ADMIN_PASSWORD = 'admin';
export const BCRYPT_ROUNDS = 12;

export function normalizePasswordInput(s: string): string {
  return s
    .normalize('NFC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim();
}

export function hashAdminPassword(plain: string): string {
  return bcrypt.hashSync(normalizePasswordInput(plain), BCRYPT_ROUNDS);
}

/** Hodnota z JSONB buňky — řetězec (hash nebo legacy plain), případně vnořený objekt. */
export function extractKvPasswordField(raw: unknown): string | null {
  if (raw == null) {
    return null;
  }
  if (typeof raw === 'string') {
    let t = raw.trim();
    if (t.length >= 2 && t.startsWith('"') && t.endsWith('"')) {
      try {
        const inner = JSON.parse(t);
        if (typeof inner === 'string') {
          t = inner.trim();
        }
      } catch {
        /* ponechat t */
      }
    }
    return t.length > 0 ? t : null;
  }
  if (typeof raw === 'object' && raw !== null && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>;
    for (const k of ['password', 'value', 'current'] as const) {
      const inner = extractKvPasswordField(o[k]);
      if (inner) {
        return inner;
      }
    }
  }
  return null;
}

export function isBcryptHash(s: string): boolean {
  return /^\$2[aby]\$\d{2}\$/.test(s);
}

/** Porovnání dvou plain hesel (legacy v KV); výchozí admin bez rozlišení velikosti písmen. */
export function cmsPasswordsPlainMatch(expectedPlain: string, suppliedPlain: string): boolean {
  const e = normalizePasswordInput(expectedPlain);
  const s = normalizePasswordInput(suppliedPlain);
  if (e === s) {
    return true;
  }
  if (e === DEFAULT_CMS_ADMIN_PASSWORD && s.toLowerCase() === DEFAULT_CMS_ADMIN_PASSWORD) {
    return true;
  }
  return false;
}

/**
 * Ověří heslo z formuláře proti hodnotě v KV (bcrypt hash, legacy plain, nebo výchozí admin).
 */
export function verifyAdminPasswordAgainstKv(plain: string, storedRaw: unknown): boolean {
  const p = normalizePasswordInput(plain);
  if (!p) {
    return false;
  }

  const cell = extractKvPasswordField(storedRaw);

  if (cell == null) {
    return cmsPasswordsPlainMatch(DEFAULT_CMS_ADMIN_PASSWORD, p);
  }

  if (isBcryptHash(cell)) {
    try {
      return bcrypt.compareSync(p, cell);
    } catch {
      return false;
    }
  }

  return cmsPasswordsPlainMatch(cell, p);
}

/** True, pokud je vhodné po úspěšném loginu uložit bcrypt místo plain / prázdna. */
export function shouldMigratePasswordToBcrypt(storedRaw: unknown): boolean {
  const cell = extractKvPasswordField(storedRaw);
  if (cell == null) {
    return true;
  }
  return !isBcryptHash(cell);
}
