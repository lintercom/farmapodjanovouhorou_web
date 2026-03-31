/** Sjednocení hesla před odesláním na server (Unicode NFC, odstranění zero-width znaků). */
export function normalizePasswordForCms(s: string): string {
  return s.normalize('NFC').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}
