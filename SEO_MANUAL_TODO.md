# Ruční úkoly SEO / nasazení

Tyto kroky nelze spolehlivě odvodit jen z kódu bez znalosti produkční domény a účtů.

## URL a soubory v kořeni webu

1. **Produkční doména** — v buildu nastavte `VITE_SITE_URL` na kanonickou HTTPS adresu (bez koncového lomítka u cesty, konzistentně s `siteUrl.ts`).
2. **`public/sitemap.xml`** a **`public/robots.txt`** — řádek `Sitemap:` a všechny `<loc>` musí používat stejnou produkční základnu jako bod 1 (aktuálně jsou předvyplněné pro GitHub Pages).
3. **`public/sitemap.xml`** — po větších změnách obsahu aktualizujte `<lastmod>` (ručně nebo generátorem v CI).
4. **`llms.txt`** — po změně domény upravte poznámku o `VITE_SITE_URL`, případně doplňte finální kanonickou URL do prvního bloku.

## Vyhledávače a měření

5. **Google Search Console / Seznam Webmaster** — ověřte vlastnictví domény, odešlete sitemapu, zkontrolujte pokrytí indexu a kanonické URL.
6. **Náhledy na sociálních sítích** — v globálním nastavení CMS ověřte OG obrázek a název webu; po změně domény otestujte [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) nebo ekvivalent.

## Obsah a schema

7. **JSON-LD** — po změně struktury služeb na `/sluzby` zkontrolujte soulad pole `makesOffer` v `src/app/utils/seo/jsonLd.ts` s reálnými kotvami a názvy.
8. **Články blogu** — pokud přibyde routa detailu článku (`/blog/:slug`), doplňte pro ni `Article` / `BlogPosting` schema a vhodný `og:type` (typicky v rozšíření `applySeoMetadata` a JSON-LD).

## Právní a cookies

9. **Robots a cookies** — politiku vůči AI crawlerům v `robots.txt` přizpůsobte interním pravidlům (aktuálně je veřejný obsah pro vybrané user-agenty povolen).
