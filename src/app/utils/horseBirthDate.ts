/** ISO datum YYYY-MM-DD v JSON stránky „Naši koně“. Legacy pole `age` v CMS při ukládání mizí po doplnění data. */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function normalizeHorseBirthDateInput(v: unknown): string {
  if (typeof v !== 'string' || !ISO_DATE.test(v.trim())) return '';
  return v.trim();
}

/** Text pro stará data (číslo, „8“, „8 let“). */
export function formatLegacyHorseAge(age: unknown): string | null {
  if (age == null || age === '') return null;
  if (typeof age === 'number' && Number.isFinite(age)) return `${age} let`;
  const s = String(age).trim();
  if (!s) return null;
  if (/\blet\b/i.test(s)) return s;
  const n = parseInt(s, 10);
  if (!Number.isNaN(n)) return `${n} let`;
  return s;
}

export function formatHorseBirthDateCs(dateStr: string, style: 'long' | 'short' = 'long'): string | null {
  const norm = normalizeHorseBirthDateInput(dateStr);
  if (!norm) return null;
  const [y, m, d] = norm.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'numeric',
    year: 'numeric',
  }).format(date);
}

export function computeHorseAgeYears(dateStr: string, ref = new Date()): number | null {
  const norm = normalizeHorseBirthDateInput(dateStr);
  if (!norm) return null;
  const [y, m, d] = norm.split('-').map(Number);
  const birth = new Date(y, m - 1, d);
  if (Number.isNaN(birth.getTime())) return null;
  let years = ref.getFullYear() - birth.getFullYear();
  const mo = ref.getMonth() - birth.getMonth();
  if (mo < 0 || (mo === 0 && ref.getDate() < birth.getDate())) years -= 1;
  return Math.max(0, years);
}

/** Karta / seznam: datum narození; bez data legacy `age` (např. „8 let“). */
export function horseLifeSummaryShort(horse: { birthDate?: string; age?: number | string }): string {
  const birth = normalizeHorseBirthDateInput(horse.birthDate);
  if (birth) {
    return formatHorseBirthDateCs(birth, 'short') || birth;
  }
  return formatLegacyHorseAge(horse.age) || '—';
}

/** Modal / detail: datum narození (dlouhý formát); bez data legacy `age`. */
export function horseLifeSummaryDetail(horse: { birthDate?: string; age?: number | string }): string {
  const birth = normalizeHorseBirthDateInput(horse.birthDate);
  if (birth) {
    return formatHorseBirthDateCs(birth, 'long') || birth;
  }
  return formatLegacyHorseAge(horse.age) || '—';
}

/** Hodnota pro <input type="date" />. */
export function horseBirthDateInputValue(horse: { birthDate?: string }): string {
  return normalizeHorseBirthDateInput(horse.birthDate);
}
