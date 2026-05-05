# Cenova kalkulace projektu - web + CMS

Aktualizovany orientacni odhad hodnoty vyvoje podle realneho stavu projektu k 5. 5. 2026.

Jde o rekonstrukcni kalkulaci, tedy odhad, kolik by stalo podobne reseni znovu navrhnout a vyvinout. Nejde o fakturovanou castku, znalecky posudek ani garanci produkcni pripravenosti.

| Parametr | Hodnota |
|----------|---------|
| Mena | Kc bez DPH |
| Typ odhadu | realisticky hruby odhad hodnoty dodaneho reseni |
| Zaklad | aktualni kod, CMS, Supabase, staticky build, verejne stranky |
| Nezahrnuje | plny test suite, monitoring, bezpecnostni audit, vicejazycnost, platebni branu, vlastni rezervacni backend |

---

## 1. Analyza, architektura a struktura

| Polozka | Popis | Castka (Kc) |
|---------|-------|-------------|
| 1.1 | Navrh architektury SPA + CMS + Supabase, routovani, rozdeleni obsahu na `pageId` | 9 000 |
| 1.2 | Sladeni obsahu stranek, pravnich stranek, navigace a paticky | 5 000 |

**Mezisoucet casti 1:** **14 000 Kc**

---

## 2. Vzhled a design system

| Polozka | Popis | Castka (Kc) |
|---------|-------|-------------|
| 2.1 | Design tokeny, barvy, CSS promenne, zakladni vizualni system | 10 000 |
| 2.2 | Typografie, Tailwind, zakladni sada UI komponent | 14 000 |
| 2.3 | Verejny layout, navigace, paticka, cookie lista, loading stav | 14 000 |
| 2.4 | Vzhled administrace, karty, modaly, responzivni upravy CMS | 10 000 |

**Mezisoucet casti 2:** **48 000 Kc**

---

## 3. Verejny web - stranky a sablony

| Polozka | Popis | Castka (Kc) |
|---------|-------|-------------|
| 3.1 | Domu - hero, obsahove sekce, FAQ, reference, napojeni na CMS data | 22 000 |
| 3.2 | Sluzby, Blog, Nasi kone, O nas vcetne responzivnich sablon | 28 000 |
| 3.3 | Kontakt - zalozky/karty, mapa, formular, Reenio/embed/odkaz, novy typ karty Odkaz | 20 000 |
| 3.4 | Pravni stranky, 404, zakladni obsahove sablony | 10 000 |
| 3.5 | Prihlaseni do CMS, chybove stavy, zakladni responzivita | 6 000 |

**Mezisoucet casti 3:** **86 000 Kc**

---

## 4. CMS a administrace

| Polozka | Popis | Castka (Kc) |
|---------|-------|-------------|
| 4.1 | Autentizace CMS, Supabase Auth varianta, session, timeout, ochrana `/admin` | 12 000 |
| 4.2 | `PageEditor` - vyber stranek, nacteni, ulozeni, stav ukladani | 12 000 |
| 4.3 | Specializovane editory pro hlavni stranky, kontakt, kone, blog a pravni obsah | 34 000 |
| 4.4 | Sdilene admin komponenty: upload obrazku, kolekce, interni odkazy, editace karet | 16 000 |
| 4.5 | Globalni nastaveni: logo, hero obrazek, favicon, kontaktni udaje, zmena hesla | 10 000 |
| 4.6 | Seed/migracni pomocne nastroje a doplnkove admin utility | 4 000 |

**Mezisoucet casti 4:** **88 000 Kc**

---

## 5. Supabase - API, databaze, Storage

| Polozka | Popis | Castka (Kc) |
|---------|-------|-------------|
| 5.1 | Hono Edge Function API pro stranky, nastaveni, health a CORS | 13 000 |
| 5.2 | KV vrstva nad `kv_store_399cd496`, struktura klicu `page:*`, `global:settings` | 8 000 |
| 5.3 | Storage bucket, upload obrazku, validace typu/velikosti, signed URL | 12 000 |
| 5.4 | Endpointy pro zmenu hesla, seed a pomocne backend funkce | 5 000 |

**Mezisoucet casti 5:** **38 000 Kc**

---

## 6. Integrace a komunikace

| Polozka | Popis | Castka (Kc) |
|---------|-------|-------------|
| 6.1 | Reenio konfigurace z CMS: URL, iframe, widget snippet, fallback na odkaz | 9 000 |
| 6.2 | Kontaktni formular pres API + Resend, vyber prijemce z CMS/nastaveni | 11 000 |

**Mezisoucet casti 6:** **20 000 Kc**

---

## 7. SEO, build a nasazeni

| Polozka | Popis | Castka (Kc) |
|---------|-------|-------------|
| 7.1 | Route SEO, canonical, OG metadata, zakladni strukturovana data | 8 000 |
| 7.2 | Preload dat, cache obsahu a synchronizace `routeReady` pro prerender | 9 000 |
| 7.3 | Playwright prerender verejnych rout do statickeho HTML | 11 000 |
| 7.4 | GitHub Pages workflow, SPA fallback, Vite base path, priprava statiky pro hosting | 10 000 |

**Mezisoucet casti 7:** **38 000 Kc**

---

## 8. Podpurny vyvoj, QA a dokumentace

| Polozka | Popis | Castka (Kc) |
|---------|-------|-------------|
| 8.1 | Utility pro interni odkazy, media URL, opravy kodovani textu | 7 000 |
| 8.2 | Zakladni manualni overeni toku, build kontrola, opravy z provozniho pouziti | 7 000 |
| 8.3 | Dokumentace projektu, mapa projektu, poznamky k nasazeni | 6 000 |

**Mezisoucet casti 8:** **20 000 Kc**

---

## Souhrn casti bez DPH

| Cast | Nazev | Castka (Kc) |
|------|-------|-------------|
| 1 | Analyza a architektura | 14 000 |
| 2 | Vzhled a design system | 48 000 |
| 3 | Verejny web | 86 000 |
| 4 | CMS a administrace | 88 000 |
| 5 | Supabase API, KV, Storage | 38 000 |
| 6 | Integrace Reenio a e-mail | 20 000 |
| 7 | SEO, prerender, nasazeni | 38 000 |
| 8 | Utility, QA, dokumentace | 20 000 |

### Realisticky odhad hodnoty vyvoje

**352 000 Kc bez DPH**

---

## Konecna orientacni castka

| Polozka | Castka (Kc) |
|---------|-------------|
| Realisticky odhad vyvoje bez DPH | 352 000 |
| DPH 21 % orientacne | 73 920 |
| Orientacne s DPH | 425 920 |

---

## Korekce proti puvodnimu odhadu 424 000 Kc bez DPH

Puvodni kalkulace byla spise horni rekonstrukcni odhad. Aktualni castka je nizsi, protoze realny projekt nema plnou testovaci infrastrukturu, lint/E2E pipeline, produkcni monitoring ani bezpecnostni audit. Cast kodu je take legacy nebo podpurna a neni soucasti aktivniho uzivatelskeho toku.

Naopak zustava zapoctena realna hodnota funkcniho CMS, verejneho webu, Supabase backendu, uploadu obrazku, Reenio integrace, kontaktniho formulare, prerenderu a pripraveneho statickeho vystupu pro hosting.

---

## Provoz a sluzby tretich stran mimo vyvoj

Tyto naklady nejsou soucasti vyse uvedene vyvojove kalkulace:

| Sluzba | Ucel |
|--------|------|
| Supabase | databaze, Storage, Edge Functions |
| Resend | transakcni e-maily z kontaktniho formulare |
| Reenio | rezervacni system a jeho tarif |
| GitHub | repozitar, GitHub Pages, Actions podle planu |
| Hosting | produkcni webhosting, pokud se nepouziva GitHub Pages |

---

*Cisla jsou zaokrouhlena na tisice Kc. Dokument je orientacni a ma slouzit jako realisticky podklad pro komunikaci o hodnote projektu.*
