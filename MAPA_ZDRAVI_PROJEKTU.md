# Mapa zdraví projektu (funkce, použití, testy)

Dokument slouží jako **orientační přehled** stavu funkčnosti — není náhrada za produkční monitoring ani penetrační testy.  
Aktualizace podle stavu kódu a **automatického buildu** v repozitáři.

---

## 1. Metodika

| Co bylo provedeno | Popis |
|-------------------|--------|
| **Automatické testy** | V `package.json` **nejsou** skripty `test`, `lint` ani E2E. Jediná spolehlivá automatická kontrola je **`npm run build`** (Vite) — **proběhla úspěšně** při sestavení tohoto dokumentu. |
| **„Používá se“** | Funkce / modul má **ovládání na veřejném webu nebo v CMS** (odkaz, tlačítko, formulář, editor stránky), **nebo** je volaný z aktivního routování (`routes.ts`). |
| **„Nepoužívá se“** | Soubor nebo endpoint **není** napojený na router ani na žádný uživatelsky viditelný tok; jde o **legacy**, šablonu (shadcn/ui) nebo závislost bez importu v aplikaci. |
| **Manuální / integrace** | Chování závisí na **Supabase**, **Resend**, **Reenio** embedu, **GitHub Actions** — bez přístupu k produkčním env nelze z repa stoprocentně ověřit. |

---

## 2. Celkový souhrn

| Oblast | Stav | Poznámka |
|--------|------|----------|
| Produkční build frontendu | ✅ | `npm run build` OK |
| Jednotkové / integrační testy | ❌ | Nejsou nastavené |
| Veřejné routy (`routes.ts`) | ✅ | Konzistentní s prerender seznamem |
| Hlavní CMS (`/admin`) | ✅ | `PageEditor` + `GlobalSettings` |
| Backend Edge Function (API) | ⚠️ | Závislé na deployi Supabase + env |
| Kontaktní e-mail (Resend) | ⚠️ | Vyžaduje `RESEND_API_KEY` na serveru |
| Přihlášení CMS vs. změna hesla | ⚠️ | Viz sekce 6 — **nesoulad** |

---

## 3. Veřejný web — funkce a UI

| Funkce | Ovládání na webu | Stav | Poznámka |
|--------|-------------------|------|----------|
| Domů | Navigace, logo | ✅ | Obsah z CMS + agregace služeb/koní |
| Služby | Navigace + dropdown | ✅ | Kotvy `#tabory` atd. v odkazech |
| Blog | Navigace | ✅ | Události z CMS, modal detailu |
| Naši koně | Navigace | ✅ | |
| O nás | Navigace | ✅ | |
| Kontakt | Navigace, CTA | ✅ | Formulář, záložky, mapa, **Reenio** embed dle CMS |
| GDPR / Cookies / Podmínky / Reklamace | Patička + přímé URL | ✅ | |
| Přihlášení CMS | Odkaz (např. z patičky / známá URL) | ✅ | `/cms-prihlaseni` |
| 404 | Neplatná cesta | ✅ | |
| Cookie lišta | Banner | ✅ | `CookieConsent` |
| SEO / metadata | Automaticky | ✅ | `RouteSeo`, prerender pro statické HTML |

**Rezervace:** na webu není vlastní „BooqMe“ — používá se **vložený Reenio** (URL / iframe / widget) z CMS u kontaktu.

---

## 4. CMS (`/admin`) — co je v routeru a používá se

| Funkce | Ovládání v adminu | Stav |
|--------|-------------------|------|
| Výběr stránky (postranní / mobilní menu) | Ano | ✅ |
| Úprava obsahu stránek (editory) | Ano | ✅ |
| Uložení stránky (`pagesApi.save`) | Tlačítko „Uložit změny“ | ✅ |
| Globální nastavení | Header → Nastavení | ✅ |
| Nahrání obrázků | Editory → `ImageUpload` | ✅ |
| Odhlášení | Header | ✅ |
| Náhled „Zobrazit web“ | Header | ✅ |

**Není v routeru = běžný uživatel CMS to v aplikaci neuvidí:**

| Komponenta / soubor | Stav |
|---------------------|------|
| `AdminPageEditor.tsx` | 📦 Legacy — **není** v `routes.ts` |
| `PageEditorSimple.tsx` | 📦 Legacy — **není** v `routes.ts` |
| `SeedData.tsx` | 📦 **není** v `routes.ts` — seed lze volat jen vlastním napojením / ručním fetch na API |

---

## 5. Backend API (Supabase Edge Function)

Prefix: `/make-server-399cd496/…`

| Endpoint | Použití z frontendu | Stav |
|----------|---------------------|------|
| `GET /health` | Volitelné (monitoring) | ✅ (kód) |
| `GET/PUT /pages`, `GET/PUT /pages/:id` | `pagesApi` | ✅ |
| `GET/POST /settings` | `settingsApi` | ✅ |
| `POST /upload-image` | `ImageUpload` | ✅ |
| `POST /contact-message` | Kontaktní formulář | ✅ (vyžaduje Resend + e-mail v CMS/nastavení) |
| `POST /change-password` | Globální nastavení | ⚠️ viz sekce 6 |
| `POST /seed` | Pouze pokud někdo zavolá URL (SeedData není v routeru) | 🔧 |
| `DELETE /images/:filename` | **Není** volání v `src` | 📦 API existuje, UI mazání souboru přes něj **nepoužívá** |

---

## 6. Známé rizika / nesoulady v logice

| Téma | Závažnost | Popis |
|------|-----------|--------|
| Přihlášení CMS | ⚠️ | `AdminContext` přijímá pevně **`admin` / `admin`**. Endpoint **`change-password`** ukládá heslo do KV — **přihlášení tento údaj nečte**. Po změně hesla v nastavení se tedy přihlašovací dialog **nemění** podle serveru. |
| Kontaktní formulář | ⚠️ | Bez `RESEND_API_KEY` na Edge Function **odešle chybu**; bez vyplněného cílového e-mailu v CMS/nastavení také. |
| Signed URL obrázků | ⚠️ | Odkazy mají dlouhou platnost; po smazání objektu ve Storage může zůstat neplatný odkaz v obsahu, dokud se obsah v CMS neupraví. |

---

## 7. „Nepoužívá se“ v aplikaci (kód / závislosti)

**Komponenty bez importu v produkčních stránkách (mimo vlastní soubor):**

| Položka | Poznámka |
|---------|----------|
| `HomeCMS.tsx` | Alternativní domovská stránka — **není** v `routes.ts` |
| `RichTextEditor.tsx` (TipTap) | Připravený editor — **nikde se neimportuje** |
| `handleNavigation` v `Navigation.tsx` | Definováno, **nikde nevoláno** (mrtvý kód) |

**UI kit (shadcn) — často bez použití v business logice:**

| Modul | Typické použití v projektu |
|-------|----------------------------|
| `chart.tsx` + `recharts` | 📦 Součást UI knihovny, **žádná stránka** v `src/app/pages` je neimportuje |
| `sonner.tsx` (Toaster) | 📦 **není** přidaný do `App.tsx` / rootu |
| `drawer.tsx` (vaul) | 📦 Pouze definice komponenty |

**NPM závislosti v `package.json` bez odpovídajícího importu v `src` (při rychlé kontrole):**

- `@mui/material`, `@mui/icons-material`
- `react-quill`

Zmenšují zbytečně `node_modules`; do produkčního bundlu se dostanou jen pokud je někde importujete (aktuálně **ne**).

**Playwright:** v `devDependencies` pro **`prerender.mjs`**, ne pro CI testy proti běžící aplikaci.

---

## 8. Nasazení a statický výstup

| Krok | Stav | Poznámka |
|------|------|----------|
| GitHub Actions → Pages | ✅ (konfigurace) | `.github/workflows/deploy-pages.yml` |
| `npm run prerender` | ✅ (skript) | Vyžaduje úspěšný build + běh preview; v CI součást pipeline |

Úspěch deploye na GitHubu závisí na **Secrets / oprávněních** repa — z repa nelze ověřit poslední zelený běh.

---

## 9. Legenda stavů v tabulkách

| Symbol | Význam |
|--------|--------|
| ✅ | V kódu napojeno na aktivní tok nebo build projde; očekávané chování při správném prostředí |
| ⚠️ | Funguje jen částečně, nebo závisí na konfiguraci / je známý nesoulad |
| ❌ | Chybí automatizované testy nebo funkce není dostupná koncovému uživateli |
| 📦 | Kód nebo API existuje, ale **není** v běžném UI / routeru |
| 🔧 | Nástroj pro vývojáře (konzole, ruční API) |

---

## 10. Doporučení pro další zdraví projektu

1. **Sjednotit autentizaci CMS** — buď ověřování proti API + session, nebo odstranit zavádějící `change-password` v KV.  
2. **Přidat minimální testy** — např. Vitest na `parseReenioEmbedConfig`, `cmsInternalLinks`, nebo Playwright smoke na `/` + `/admin` (s mock auth).  
3. **Vyčistit závislosti** — odstranit MUI, pokud se neplánuje použití; zvážit odstranění nepoužívaných UI modulů nebo jejich použití.  
4. **Napojit nebo odstranit** `DELETE /images`, `SeedData` route, `HomeCMS`, `RichTextEditor` podle záměru produktu.

---

*Tento dokument vygenerováno jako statická analýza repozitáře + úspěšný `npm run build`. Pro produkční „zelenou“ stavbu ověřte také Actions, Supabase dashboard a Resend.*
