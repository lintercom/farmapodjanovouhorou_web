/**
 * Účet správce webu v CMS: uživatelské jméno je vždy `admin`, heslo je v KV (Edge Function)
 * nebo výchozí `admin`, dokud ho správce nezmění v nastavení.
 *
 * Přihlášení vývojáře: Supabase Auth (e-mail + heslo účtu vytvořeného v Supabase Dashboard).
 * Toto heslo z CMS měnit nejde — mění se jen v Supabase nebo v kódu projektu.
 */
export const CMS_ADMIN_USERNAME = 'admin';

/** Výchozí heslo, dokud není v KV jiné; používá se jen jako fallback, když API verify-cms-login není dostupné. */
export const CMS_DEFAULT_PASSWORD = 'admin';
