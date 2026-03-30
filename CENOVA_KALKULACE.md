# Cenová kalkulace projektu — web + CMS (podle PROJECT_MAP.md)

Orientační **odhad nákladů na vývoj** odpovídající popsanému rozsahu v [PROJECT_MAP.md](./PROJECT_MAP.md). Jedná se o **rekonstrukční kalkulaci** („kolik by stálo stejné řešení vyvinout znovu“), nikoli o fakturovanou částku mezi stranami.

| Parametr | Hodnota |
|----------|---------|
| Měna | **Kč** (bez DPH) |
| Typ odhadu | hrubý, pro plánování rozpočtu |
| Základ | moduly a technologie z mapy projektu |

---

## 1. Analýza, architektura a informační struktura

| Položka | Popis | Částka (Kč) |
|---------|--------|-------------|
| 1.1 | Návrh architektury (SPA + headless CMS, Supabase), routování, mapování `pageId`, dokumentace rozhodnutí | 12 000 |
| 1.2 | Sladění s obsahem (stránky hlavní vs. patička, právní texty) | 6 000 |

**Mezisoučet části 1:** **18 000 Kč**

---

## 2. Vzhled a design systém

| Položka | Popis | Částka (Kč) |
|---------|--------|-------------|
| 2.1 | Design tokeny (`theme.css`), barvy, stíny, sémantické proměnné | 14 000 |
| 2.2 | Typografie (Plus Jakarta Sans, Lora), Tailwind, základní UI kit (Radix + vlastní komponenty) | 18 000 |
| 2.3 | Veřejný layout — navigace, patička, cookie lišta, loading stav, konzistence sekcí | 16 000 |
| 2.4 | Vzhled administrace (sticky header, karty, modaly v souladu s webem) | 12 000 |

**Mezisoučet části 2:** **60 000 Kč**

---

## 3. Veřejný web — stránky a šablony

| Položka | Popis | Částka (Kč) |
|---------|--------|-------------|
| 3.1 | Domů — hero, karusely/sekce, FAQ, reference, napojení na data ze služeb a koní | 28 000 |
| 3.2 | Služby, Blog (události + modal), Naši koně, O nás | 32 000 |
| 3.3 | Kontakt — záložky, mapa, vlastní obsah + vložení Reenio (widget / iframe / odkaz) | 22 000 |
| 3.4 | Právní stránky (GDPR, cookies, obchodní podmínky, reklamační řád) + 404 | 14 000 |
| 3.5 | Přihlášení do CMS (veřejná routa), chybové stavy, responzivita napříč stránkami | 8 000 |

**Mezisoučet části 3:** **104 000 Kč**

---

## 4. CMS a administrace

| Položka | Popis | Částka (Kč) |
|---------|--------|-------------|
| 4.1 | Autentizace, session, timeout, ochrana `/admin` | 10 000 |
| 4.2 | `PageEditor` — výběr stránek, načtení/uložení, stav ukládání | 14 000 |
| 4.3 | Specializované editory (domů, služby, blog, koně, o nás, kontakt vč. Reenio polí, právní, 404) | 42 000 |
| 4.4 | Sdílené admin komponenty (`ImageUpload`, `LinkSelector`, kolekce, bohatý text kde je potřeba) | 18 000 |
| 4.5 | Globální nastavení (obecné, design obrázků, bezpečnost / změna hesla) | 12 000 |
| 4.6 | Seed dat, případné migrační nástroje (orientačně v rozsahu mapy) | 6 000 |

**Mezisoučet části 4:** **102 000 Kč**

---

## 5. Supabase — Edge Function, databáze, Storage

| Položka | Popis | Částka (Kč) |
|---------|--------|-------------|
| 5.1 | Hono API — stránky, nastavení, CORS, health | 16 000 |
| 5.2 | Vrstva KV (`kv_store_399cd496`), konzistence klíčů `page:*`, `global:settings` | 10 000 |
| 5.3 | Storage bucket, upload, signed URL, validace typů a velikosti | 14 000 |
| 5.4 | Endpoint změny hesla, seed endpoint | 6 000 |

**Mezisoučet části 5:** **46 000 Kč**

---

## 6. Integrace a komunikace

| Položka | Popis | Částka (Kč) |
|---------|--------|-------------|
| 6.1 | Parsování a vykreslení Reenio (URL, iframe, widget) podle CMS | 10 000 |
| 6.2 | Kontaktní formulář — API, Resend, výběr příjemce z obsahu / globálního nastavení | 12 000 |

**Mezisoučet části 6:** **22 000 Kč**

---

## 7. SEO, výkon a nasazení

| Položka | Popis | Částka (Kč) |
|---------|--------|-------------|
| 7.1 | `RouteSeo`, canonical, OG, napojení na globální nastavení kde dává smysl | 9 000 |
| 7.2 | Preload rout, cache (`siteDataCache`), `routeReady` pro prerender | 11 000 |
| 7.3 | Prerender (Playwright), generování HTML pro veřejné routy | 14 000 |
| 7.4 | GitHub Actions workflow, GitHub Pages, `base` path, SPA fallback (`404.html`) | 10 000 |

**Mezisoučet části 7:** **44 000 Kč**

---

## 8. Podpůrný vývoj a kvalita

| Položka | Popis | Částka (Kč) |
|---------|--------|-------------|
| 8.1 | Utility — interní odkazy, kódování textů, média (resolve URL) | 8 000 |
| 8.2 | Build (Vite), závislosti, základní testování toků (CMS, formulář, deploy) | 14 000 |
| 8.3 | Dokumentace pro tým — např. [PROJECT_MAP.md](./PROJECT_MAP.md) a související poznámky | 6 000 |

**Mezisoučet části 8:** **28 000 Kč**

---

## Souhrn částí (bez DPH)

| Část | Název | Částka (Kč) |
|------|--------|-------------|
| 1 | Analýza a architektura | 18 000 |
| 2 | Vzhled a design systém | 60 000 |
| 3 | Veřejný web | 104 000 |
| 4 | CMS a administrace | 102 000 |
| 5 | Supabase (API, KV, Storage) | 46 000 |
| 6 | Integrace (Reenio, e-mail) | 22 000 |
| 7 | SEO, prerender, CI/CD Pages | 44 000 |
| 8 | Utility, QA, dokumentace | 28 000 |

### Mezisoučet všech částí

**424 000 Kč** (bez DPH)

---

## Konečná částka

| Položka | Částka (Kč) |
|---------|-------------|
| **Celkový odhad vývoje (bez DPH)** | **424 000** |
| DPH 21 % (indikativně) | 89 040 |
| **Indikativně s DPH** | **513 040** |

> **Poznámka:** „Konečná částka“ v kontextu této kalkulace = **součet dílčích odhadů vývoje**. Reálná nabídka by závisela na hodinové sazbě, replikaci designu z Figma, rozsahu revizí obsahu a případném rozšíření (např. vícejazyčnost, platební brána, napojení na BooqMe).

---

## Provoz a služby třetích stran (mimo vývoj)

Tyto náklady **nejsou** součástí výše uvedené vývojové kalkulace; typicky měsíční nebo dle tarifu:

| Služba | Účel |
|--------|------|
| Supabase | databáze, Storage, Edge Functions |
| Resend | transakční e-maily z kontaktu |
| Reenio | rezervační systém (tarif u provozovatele) |
| GitHub | hostování repa + GitHub Pages (free tier dle plánu) |

---

*Dokument slouží jako orientační rozpočet. Čísla zaokrouhlena na tisíce Kč.*
