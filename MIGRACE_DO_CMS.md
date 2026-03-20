# Migrace statických dat do CMS

## Co bylo provedeno

Web nyní podporuje správu kontaktních údajů přes stránku Kontakt v CMS s bezpečnými fallbacky.

### ✅ Implementováno:

1. **useContactData hook** (`/src/app/hooks/useContactData.ts`)
   - Načítá kontaktní údaje z databáze (stránka Kontakt)
   - Má plně funkční fallbacky na původní hodnoty
   - Automaticky se používá v komponentách Footer a Contact

2. **ContactPageEditor** (`/src/app/pages/admin/editors/OtherPageEditors.tsx`)
   - Kompletní editor pro kontaktní údaje
   - Podporuje telefon, email, adresu, otevírací dobu, sociální sítě
   - Dostupný v PageEditor pod stránkou "Kontakt"

3. **Migrační skript** (`/src/app/utils/migrateStaticDataToCMS.ts`)
   - Bezpečně nahraje statická data do databáze
   - Neporuší existující funkcionalitu
   - Kompatibilní s existující GlobalSettings strukturou
   - Přidána podpora pro kontaktní data

4. **Quick Migration Tool** (`/src/app/utils/quickMigrate.ts`)
   - Automaticky dostupný v konzoli prohlížeče (dev mode)
   - Jednoduché spuštění: `quickMigrate()`

5. **Aktualizované komponenty:**
   - `Footer.tsx` - používá data ze stránky Kontakt přes useContactData
   - `Contact.tsx` - načítá a zobrazuje kontaktní údaje z CMS
   - `GlobalSettings.tsx` - odstraněna duplicitní pole, přidán odkaz na editor Kontaktu

### 🗃️ Data která lze spravovat v CMS:

#### Globální nastavení (`/admin/settings`):
- **Název webu** (siteName)
- **Logo a favicon** (upload přes CMS)
- **Email pro systémové zprávy** (systemEmail)
- **SEO** (meta title, meta description, OG image)
- **Design** (barvy, font)
- **Změna hesla**
- ⚠️ Kontaktní údaje jsou nyní na stránce Kontakt (viz níže)

#### Kontaktní stránka (`/admin/editor?page=kontakt`):
- **Hero sekce** (nadpis, podnadpis)
- **Telefon** (phone)
- **Email** (email)
- **Adresa** (ulice, PSČ, město)
- **Otevírací doba** (pracovní dny, víkend)
- **Sociální sítě** (Facebook URL, Instagram URL)

## Jak spustit migraci dat

### 🚀 Postup (spustit pouze jednou):

1. Otevřete web v prohlížeči
2. Otevřete konzoli (F12)
3. Spusťte příkaz:

```javascript
quickMigrate()
```

4. Počkejte na zprávu "🎉 Migrace úspěšně dokončena!"

### 📝 Po migraci:

Data můžete upravit v CMS:

1. **Globální nastavení**: `/admin/settings`
   - Název webu, logo, SEO, barvy, font
   
2. **Kontaktní údaje**: `/admin/editor?page=kontakt`
   - Telefon, email, adresa, otevírací doba, sociální sítě
   - **Tyto údaje se automaticky zobrazují i v patičce webu!**

## 🛡️ Bezpečnostní opatření:

1. **Fallbacky jsou zachovány** - pokud se data z databáze nenačtou, použijí se původní hodnoty
2. **Postupná migrace** - stávající kód funguje i bez dat v databázi
3. **Žádné breaking changes** - vše funguje zpětně kompatibilně
4. **Automatické načítání** - hooky se starají o načítání dat
5. **Jediný zdroj pravdy** - kontakty jsou pouze na stránce Kontakt, žádná duplicita

## 📊 Co se nahraje do databáze:

### Globální nastavení:
- Název webu: "Farma pod Janovou horou"
- Email pro systém: "farmapodjanovouhorou@seznam.cz"
- Meta description pro SEO
- Barvy: primární #2D5016, sekundární #8B4513
- Font: Lora

### Stránka Kontakt (pageId: "kontakt"):
```javascript
{
  hero: {
    title: "Kontakt",
    subtitle: "Máte dotazy? Rádi vám zodpovíme. Ozvěte se nám a domluvíme se!"
  },
  contactData: {
    phone: "+420 605 279 222",
    email: "farmapodjanovouhorou@seznam.cz",
    address: "Janova Hora 466",
    city: "Vizovice",
    postalCode: "763 12",
    openingHours: {
      weekdays: "Po - Pá: 14:00 - 18:00",
      weekend: "So - Ne: 9:00 - 17:00"
    },
    socialMedia: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  }
}
```

### Data ostatních stránek:
- **Domů**: Hero sekce s titulkem a popisem
- **Služby**: Hero sekce s titulkem a popisem

## ⚠️ Důležité poznámky:

- Migrační skript spusťte **pouze jednou**
- Před spuštěním na produkci otestujte na testovacím prostředí
- **Kontaktní údaje se upravují POUZE na stránce Kontakt** (`/admin/editor?page=kontakt`)
- V globálním nastavení je informační box s odkazem na editor kontaktů
- Pokud se data z databáze nenačtou, web bude fungovat s původními hodnotami
- Footer automaticky načítá kontakty ze stránky Kontakt
- Změna kontaktů v editoru se okamžitě projeví na stránce Kontakt i v patičce

## 🎯 Výhody:

1. **Jediný zdroj pravdy** - kontakty jsou pouze na jednom místě (stránka Kontakt v CMS)
2. **Žádná duplicita** - globální nastavení neobsahují duplicitní kontaktní pole
3. **Snadná správa** - všechny kontakty upravíte na jednom místě
4. **Automatická synchronizace** - změna v CMS se projeví na stránce i v patičce
5. **Bezpečné** - fallbacky zajišťují, že web vždy funguje
6. **Flexibilní** - můžete kdykoliv upravit data bez úpravy kódu

## 🔄 Jak to funguje:

1. Editujete kontaktní údaje v `/admin/editor?page=kontakt`
2. Kliknete na "Uložit změny"
3. Data se uloží do databáze pod klíčem `page:kontakt`
4. Hook `useContactData` načítá data z této stránky
5. Footer i Contact stránka používají stejný hook
6. **Výsledek**: Změna se projeví všude automaticky!