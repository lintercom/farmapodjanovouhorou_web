# 🌾 Farma pod Janovou horou - Projekt Guidelines

**Verze:** 1.0  
**Datum:** 11. března 2026  
**Projekt:** Webová prezentace s CMS administrací pro českou farmu

---

## 📋 Obsah

1. [Přehled projektu](#přehled-projektu)
2. [Technologický stack](#technologický-stack)
3. [Architektura](#architektura)
4. [Struktura projektu](#struktura-projektu)
5. [Design systém](#design-systém)
6. [Databáze](#databáze)
7. [API Reference](#api-reference)
8. [CMS Administrace](#cms-administrace)
9. [Routing](#routing)
10. [Deployment](#deployment)
11. [Mobilní aplikace](#mobilní-aplikace)
12. [Bezpečnost](#bezpečnost)
13. [Best Practices](#best-practices)

---

## 🎯 Přehled projektu

### **Základní informace**

- **Název:** Farma pod Janovou horou
- **Typ:** Rodinná farma zaměřená na práci s dětmi a koňmi
- **Adresa:** Janova Hora 466 763 12 Vizovice
- **Kontakt:** farmapodjanovouhorou@seznam.cz, +420 605 279 222

### **Hlavní funkce**

- ✅ **Kompletní webová prezentace** (6 hlavních stránek + 4 právní stránky)
- ✅ **Plně funkční CMS** s editací obsahu v reálném čase
- ✅ **Správa obrázků** s upload do Supabase Storage
- ✅ **Cookie consent** komponenta
- ✅ **Responsivní design** (desktop, tablet, mobil)
- ✅ **WCAG AA** přístupnost
- ✅ **SEO optimalizace**

---

## 🛠 Technologický stack

### **Frontend**

```json
{
  "framework": "React 18.3.1",
  "routing": "React Router 7.13.0",
  "styling": "Tailwind CSS 4.1.12",
  "ui": "Radix UI + Custom komponenty",
  "forms": "React Hook Form 7.55.0",
  "rich-text": "TipTap 3.20.0",
  "animations": "Motion 12.23.24",
  "icons": "Lucide React 0.487.0",
  "notifications": "Sonner 2.0.3"
}
```

### **Backend**

```json
{
  "runtime": "Deno (Supabase Edge Functions)",
  "framework": "Hono 4.x",
  "database": "PostgreSQL (Supabase)",
  "storage": "Supabase Storage",
  "architecture": "Serverless"
}
```

### **Typografie**

- **Nadpisy:** Lora (serif) - humanistická, teplá
- **Body text:** Plus Jakarta Sans (sans-serif) - moderní, čitelná

### **Barvy (odvozené z loga)**

```css
/* Primary - Zelená z loga */
--farm-primary: #7ec752;
--farm-primary-hover: #62a73a;

/* Secondary - Teplé zemité tóny */
--farm-secondary: #9d8466;

/* Accent - Zlatá sklizeň */
--farm-accent: #eba51e;

/* Background */
--farm-bg-primary: #fafaf9;
--farm-bg-secondary: #f5f1eb;
```

---

## 🏗 Architektura

### **Three-tier Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  React + React Router + Tailwind CSS                        │
│  (deployed on Hostinger)                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS API calls
                     │ Authorization: Bearer {publicAnonKey}
                     │
┌────────────────────▼────────────────────────────────────────┐
│                     API SERVER                               │
│  Hono Web Server (Deno/Supabase Edge Function)              │
│  Route prefix: /make-server-399cd496                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Supabase Client
                     │ (SERVICE_ROLE_KEY)
                     │
┌────────────────────▼────────────────────────────────────────┐
│                      DATABASE                                │
│  PostgreSQL (Supabase)                                       │
│  Table: kv_store_399cd496 (key-value store)                │
│  Bucket: make-399cd496-images (private storage)            │
└─────────────────────────────────────────────────────────────┘
```

### **Klíčové komponenty**

#### **1. Frontend (`/src/app/`)**

```
src/app/
├── App.tsx                 # Root component
├── routes.ts              # React Router config
├── pages/                 # Stránky
│   ├── Home.tsx          # Domů
│   ├── Services.tsx      # Služby
│   ├── Blog.tsx          # Blog (akce)
│   ├── Horses.tsx        # Naši koně
│   ├── About.tsx         # O nás
│   ├── Contact.tsx       # Kontakt
│   ├── PrivacyPolicy.tsx # Ochrana osobních údajů
│   ├── CookiesPolicy.tsx # Cookies
│   ├── TermsConditions.tsx # Obchodní podmínky
│   ├── ComplaintsPolicy.tsx # Reklamační řád
│   ├── CMSLogin.tsx      # CMS přihlášení
│   └── admin/            # CMS admin interface
│       ├── AdminLayout.tsx
│       ├── PageEditor.tsx
│       └── GlobalSettings.tsx
├── components/           # Komponenty
│   ├── Navigation.tsx   # Sticky header + mobile menu
│   ├── Footer.tsx       # Patička s odkazy
│   ├── Button.tsx       # Custom tlačítka
│   ├── FloatingCard.tsx # Floating panel design
│   ├── HeroSection.tsx  # Hero komponenta
│   ├── CookieConsent.tsx # Cookie consent
│   ├── RichTextEditor.tsx # TipTap editor
│   └── ui/              # Radix UI komponenty
├── contexts/
│   └── AdminContext.tsx # Auth context (30 min session)
├── hooks/
│   ├── usePageContent.ts # Hook pro načítání obsahu
│   └── useContactData.ts # Hook pro kontaktní data
└── utils/
    ├── api.ts           # API client
    └── defaultPageContent.ts # Výchozí obsah
```

#### **2. Backend (`/supabase/functions/server/`)**

```
supabase/functions/server/
├── index.tsx           # Main Hono server
├── kv_store.tsx        # KV database interface (PROTECTED)
├── seed.tsx            # Database seeding
└── defaultContent.ts   # Default page content
```

---

## 📂 Struktura projektu

### **Důležité soubory**

```
/
├── src/
│   ├── app/                    # Frontend aplikace
│   ├── styles/
│   │   ├── fonts.css          # Font imports (POUZE zde!)
│   │   ├── theme.css          # Design tokens
│   │   ├── tailwind.css       # Tailwind base
│   │   └── index.css          # Global styles
│   └── imports/               # Figma importy (SVG, assets)
├── supabase/
│   └── functions/server/      # Backend server
├── utils/
│   └── supabase/info.tsx     # Supabase config
├── package.json               # Dependencies
├── vite.config.ts            # Vite config
└── PROJEKT_GUIDELINES.md      # Tento dokument
```

### **Chráněné soubory (NEDOTÝKAT SE!)**

```
❌ /src/app/components/figma/ImageWithFallback.tsx
❌ /pnpm-lock.yaml
❌ /supabase/functions/server/kv_store.tsx
❌ /utils/supabase/info.tsx
```

---

## 🎨 Design systém

### **Design principy**

1. **Minimalistický** - hodně whitespace
2. **Floating panels** - místo flat cards
3. **Organic shapes** - zaoblené rohy, měkké stíny
4. **Natural colors** - barvy z loga farmy
5. **Family-friendly** - přátelský, přístupný
6. **Authentic** - venkovský charakter, ne corporate

### **Komponenty**

#### **Buttons**

```tsx
// Primary button
<Button variant="primary">Primární tlačítko</Button>

// Secondary button
<Button variant="secondary">Sekundární tlačítko</Button>

// Outline button
<Button variant="outline">Outline tlačítko</Button>
```

#### **FloatingCard**

```tsx
<FloatingCard>
  <h3>Obsah karty</h3>
  <p>Text s automatickým stínováním a zaoblenými rohy.</p>
</FloatingCard>
```

#### **Navigation**

- **Desktop:** Centrované logo, menu vlevo/vpravo, sticky header
- **Mobile:** Hamburger menu, fullscreen overlay
- **Dropdown:** Služby submenu s animací

### **Spacing systém**

```css
/* Použití v Tailwind */
gap-6   /* 1.5rem - small */
gap-8   /* 2rem - medium */
gap-12  /* 3rem - large */
gap-16  /* 4rem - xlarge */
```

### **Shadows**

```css
--farm-shadow-sm: soft drop shadow
--farm-shadow-md: card shadow
--farm-shadow-lg: floating effect
--farm-shadow-xl: hero elements
```

---

## 💾 Databáze

### **KV Store struktura**

```sql
CREATE TABLE kv_store_399cd496 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

### **Naming conventions (prefixy)**

```javascript
// Stránky
"page:domu"
"page:sluzby"
"page:blog"
"page:nasi-kone"
"page:o-nas"
"page:kontakt"
"page:ochrana"
"page:cookies"
"page:podminky"
"page:reklamace"
"page:404"

// Globální nastavení
"global:settings"

// Admin
"admin:password"  // ⚠️ PLAIN TEXT! (známý problém)
```

### **KV Store API**

```javascript
import * as kv from './kv_store.tsx';

// Single operations
await kv.set(key, value);        // Uložit
const value = await kv.get(key); // Načíst
await kv.del(key);               // Smazat

// Batch operations
await kv.mset([key1, key2], [val1, val2]); // Multiple set
const values = await kv.mget([key1, key2]); // Multiple get
await kv.mdel([key1, key2]);               // Multiple delete

// Prefix search
const pages = await kv.getByPrefix("page:"); // Všechny stránky
```

### **Data struktura - Stránka**

```typescript
interface PageData {
  id: string;                    // "domu", "sluzby", ...
  label: string;                 // "Domů", "Služby", ...
  category?: string;             // "main", "legal"
  lastModified: string;          // ISO timestamp
  
  // Obsah stránky (variabilní podle typu)
  hero?: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    image: string;               // figma:asset nebo URL
  };
  
  sections?: Array<{
    id: string;
    title?: string;
    content: string;             // HTML nebo plain text
    items?: any[];
  }>;
  
  // ... další vlastnosti podle stránky
}
```

### **Data struktura - Global Settings**

```typescript
interface GlobalSettings {
  siteName: string;              // "Farma pod Janovou horou"
  logo: string;                  // figma:asset URL
  favicon: string;
  systemEmail: string;
  phone: string;
  email: string;
  address: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  ogImage: string;
  primaryColor: string;          // "#2D5016"
  secondaryColor: string;        // "#8B4513"
  font: string;                  // "Lora"
}
```

### **Supabase Storage**

```javascript
// Bucket konfigurace
{
  name: "make-399cd496-images",
  public: false,                  // Private!
  fileSizeLimit: 5242880,        // 5MB
  allowedMimeTypes: [
    "image/jpeg",
    "image/png", 
    "image/gif",
    "image/webp"
  ]
}
```

---

## 🔌 API Reference

### **Base URL**

```
https://{projectId}.supabase.co/functions/v1/make-server-399cd496
```

### **Autentizace**

```javascript
Headers: {
  'Authorization': 'Bearer {publicAnonKey}',
  'Content-Type': 'application/json'
}
```

### **Endpointy**

#### **Health Check**

```http
GET /health
```

**Response:**
```json
{ "status": "ok" }
```

---

#### **Pages - Get All**

```http
GET /pages
```

**Response:**
```json
{
  "pages": [
    {
      "id": "domu",
      "label": "Domů",
      "category": "main",
      "lastModified": "2026-03-11T10:00:00Z"
    },
    // ...
  ]
}
```

---

#### **Pages - Get Specific**

```http
GET /pages/:pageId
```

**Example:** `GET /pages/domu`

**Response:**
```json
{
  "page": {
    "id": "domu",
    "label": "Domů",
    "hero": { ... },
    "services": [ ... ],
    "lastModified": "2026-03-11T10:00:00Z"
  }
}
```

---

#### **Pages - Save/Update**

```http
PUT /pages/:pageId
Content-Type: application/json
```

**Request Body:**
```json
{
  "label": "Domů",
  "hero": {
    "title": "Nový nadpis",
    "subtitle": "Nový popisek"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Page saved successfully",
  "lastModified": "2026-03-11T12:00:00Z"
}
```

---

#### **Global Settings - Get**

```http
GET /settings
```

**Response:**
```json
{
  "settings": {
    "siteName": "Farma pod Janovou horou",
    "logo": "figma:asset/...",
    "email": "farmapodjanovouhorou@seznam.cz",
    // ...
  }
}
```

---

#### **Global Settings - Save**

```http
POST /settings
Content-Type: application/json
```

**Request Body:**
```json
{
  "settings": {
    "siteName": "Nový název",
    "email": "novy@email.cz"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Settings saved successfully"
}
```

---

#### **Image Upload**

```http
POST /upload-image
Content-Type: multipart/form-data
```

**Request:**
```javascript
const formData = new FormData();
formData.append('file', imageFile);

fetch(API_URL + '/upload-image', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${publicAnonKey}`
  },
  body: formData
});
```

**Response:**
```json
{
  "success": true,
  "url": "https://...supabase.co/storage/v1/object/sign/...",
  "filename": "1234567890-abc123.jpg"
}
```

**Validace:**
- Max velikost: **5MB**
- Povolené typy: **JPEG, PNG, GIF, WebP**

---

#### **Image Delete**

```http
DELETE /images/:filename
```

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

#### **Seed Database**

```http
POST /seed
```

**Response:**
```json
{
  "success": true,
  "results": [
    { "pageId": "global:settings", "status": "success" },
    { "pageId": "domu", "status": "success" },
    // ...
  ]
}
```

**⚠️ Použití:** Pouze jednou při inicializaci!

---

#### **Change Password**

```http
POST /change-password
Content-Type: application/json
```

**Request:**
```json
{
  "oldPassword": "admin",
  "newPassword": "noveheslo123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Heslo bylo úspěšně změněno"
}
```

**Error:**
```json
{
  "error": "Staré heslo je nesprávné"
}
```

---

## 🔐 CMS Administrace

### **Přístup**

```
URL: https://vase-domena.cz/cms-prihlaseni
Výchozí přihlašovací údaje:
  - Username: admin
  - Password: admin
```

⚠️ **DŮLEŽITÉ:** Změňte heslo po prvním přihlášení!

### **Session management**

- **Timeout:** 30 minut neaktivity
- **Sledované události:** mousedown, keydown, scroll, touchstart, click
- **Storage:** localStorage (`adminAuth`, `adminLastActivity`)
- **Automatické odhlášení:** Po vypršení session

### **Funkce CMS**

#### **1. Editace stránek (`/admin`)**

- **Visual page selector** - výběr stránky k editaci
- **Rich text editor** (TipTap) - WYSIWYG editace
- **Image upload** - drag & drop nebo kliknutí
- **Live preview** - uložení a zobrazení změn
- **Last modified** tracking

**Editovatelné prvky:**
- Hero sekce (nadpis, popisek, tlačítka, obrázek)
- Services/Features (karty se službami)
- FAQ sekce (accordion)
- Blog články
- Koně (galerie)
- Kontaktní informace
- Právní texty

#### **2. Globální nastavení (`/admin/settings`)**

- Logo upload
- Kontaktní údaje (email, telefon, adresa)
- SEO metadata (title, description, OG image)
- Změna hesla

#### **3. Seed Data (`/admin` → tlačítko)**

- **"Inicializovat data z výchozího obsahu"**
- Nahraje všechny defaultní data do databáze
- Včetně loga a právních stránek
- **Použít pouze jednou!**

---

## 🗺 Routing

### **Public Routes**

```typescript
// Hlavní stránky
/                          → Home
/sluzby                    → Services
/blog                      → Blog (akce)
/nasi-kone                 → Horses
/o-nas                     → About
/kontakt                   → Contact

// Právní stránky
/ochrana-osobnich-udaju    → Privacy Policy
/cookies                   → Cookies Policy
/obchodni-podminky         → Terms & Conditions
/reklamacni-rad            → Complaints Policy

// CMS
/cms-prihlaseni            → CMS Login

// Fallback
/*                         → 404 Not Found
```

### **Admin Routes (Protected)**

```typescript
/admin                     → Page Editor
/admin/settings            → Global Settings
```

**Ochrana:**
- Vyžaduje `isAuthenticated = true` (AdminContext)
- Redirect na `/cms-prihlaseni` pokud není přihlášen
- Session timeout 30 min

---

## 🚀 Deployment

### **Frontend (Hostinger)**

```bash
# Build pro produkci
npm run build

# Vygeneruje se /dist folder
# Nahrajte obsah na Hostinger hosting
```

**Hostinger konfigurace:**
- Public folder: `/dist`
- SPA mode: **zapnuto** (pro React Router)
- Node version: **18.x** nebo vyšší

### **Backend (Supabase)**

Backend je automaticky deploynutý na Supabase Edge Functions.

**URL formát:**
```
https://{PROJECT_ID}.supabase.co/functions/v1/make-server-399cd496
```

### **Environment Variables**

**Supabase automaticky poskytuje:**
```bash
SUPABASE_URL              # Již nastaveno
SUPABASE_ANON_KEY         # Již nastaveno (public)
SUPABASE_SERVICE_ROLE_KEY # Již nastaveno (private)
SUPABASE_DB_URL           # Již nastaveno
```

**Frontend potřebuje:**
```javascript
// /utils/supabase/info.tsx
export const projectId = "zpbsjgmbvfxhmknryuos";
export const publicAnonKey = "..."; // Public key
```

### **Deployment checklist**

- [ ] 1. Kliknout na **"Inicializovat data"** v CMS adminu
- [ ] 2. Změnit výchozí heslo (`admin/admin`)
- [ ] 3. Nahrát vlastní logo (pokud není defaultní)
- [ ] 4. Zkontrolovat všechny stránky
- [ ] 5. Otestovat kontaktní formulář
- [ ] 6. Ověřit cookie consent
- [ ] 7. Testovat na mobilních zařízeních
- [ ] 8. SEO audit (meta tags, OG images)

---

## 📱 Mobilní aplikace

### **Přípojení na stejné API**

Mobilní aplikace může používat **stejné Supabase API** jako web.

**Konfigurace:**

```javascript
// React Native / Flutter / Native
const CONFIG = {
  supabaseUrl: "https://zpbsjgmbvfxhmknryuos.supabase.co",
  supabaseAnonKey: "YOUR_PUBLIC_ANON_KEY",
  apiBaseUrl: "https://zpbsjgmbvfxhmknryuos.supabase.co/functions/v1/make-server-399cd496"
};
```

### **React Native příklad**

```javascript
// api.js
const fetchPage = async (pageId) => {
  const response = await fetch(
    `${CONFIG.apiBaseUrl}/pages/${pageId}`,
    {
      headers: {
        'Authorization': `Bearer ${CONFIG.supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.json();
};

// Použití
const homeData = await fetchPage('domu');
const servicesData = await fetchPage('sluzby');
```

### **CORS**

API server má **otevřený CORS** (`origin: "*"`), takže mobilní app může volat API bez problémů.

### **Dostupné endpointy pro mobil**

```
✅ GET /pages              # Seznam všech stránek
✅ GET /pages/:pageId      # Detail stránky
✅ GET /settings           # Globální nastavení
✅ GET /health             # Health check
```

**Nedostupné (pouze web admin):**
```
❌ PUT /pages/:pageId      # Editace (pouze CMS)
❌ POST /upload-image      # Upload (pouze CMS)
❌ POST /settings          # Změna nastavení (pouze CMS)
```

---

## 🔒 Bezpečnost

### **⚠️ Známé bezpečnostní problémy**

#### **1. Plain text heslo v databázi**

```javascript
// AKTUÁLNÍ STAV (NEBEZPEČNÉ!)
await kv.set("admin:password", "admin");

// DOPORUČENÉ ŘEŠENÍ
import { hash, compare } from 'npm:bcrypt';
const hashedPassword = await hash(password, 10);
await kv.set("admin:password", hashedPassword);

// Při ověření
const isValid = await compare(inputPassword, storedHash);
```

**⚠️ TODO:** Implementovat bcrypt hashování!

#### **2. Klíče v kódu**

- `publicAnonKey` je **bezpečný** sdílet (public)
- `SERVICE_ROLE_KEY` je pouze na **serveru** (✅ správně)

### **✅ Implementovaná bezpečnost**

#### **Session Management**

```javascript
// 30 min timeout
const SESSION_TIMEOUT = 30 * 60 * 1000;

// Sledování aktivity
events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

// Automatické odhlášení
localStorage.setItem('adminSessionExpired', 'true');
```

#### **CORS Policy**

```javascript
cors({
  origin: "*",                    // Otevřený (veřejné čtení)
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
})
```

#### **File Upload Validace**

```javascript
// Max size: 5MB
if (file.size > 5242880) {
  return error;
}

// Allowed types only
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
if (!allowedTypes.includes(file.type)) {
  return error;
}
```

#### **Private Storage Bucket**

```javascript
{
  public: false,  // Signed URLs pouze!
  fileSizeLimit: 5242880
}

// 10-year signed URLs
const { data } = await supabase.storage
  .from(IMAGES_BUCKET)
  .createSignedUrl(filename, 315360000);
```

---

## ✨ Best Practices

### **Frontend**

#### **1. Component Structure**

```tsx
// ✅ DOBŘE - Vytvářet nové komponenty
// /src/app/components/ServiceCard.tsx
export function ServiceCard({ title, description, image }) {
  return <FloatingCard>...</FloatingCard>;
}

// ❌ ŠPATNĚ - Všechno v App.tsx
```

#### **2. Data Loading**

```tsx
// ✅ DOBŘE - Použít custom hooks
const { data, loading, error } = usePageContent('domu');

// ❌ ŠPATNĚ - Fetch přímo v komponentě
useEffect(() => {
  fetch(...)
}, []);
```

#### **3. Images**

```tsx
// ✅ DOBŘE - Figma assets
import logo from "figma:asset/b6969a54...png";

// ✅ DOBŘE - Unsplash pro nové obrázky
<ImageWithFallback 
  src="https://images.unsplash.com/..."
  alt="Popisek"
/>

// ❌ ŠPATNĚ - Relativní cesty pro assets
import logo from "../assets/logo.png";
```

#### **4. Styling**

```tsx
// ✅ DOBŘE - Tailwind classes
<div className="flex gap-6 p-8 rounded-lg bg-farm-bg-primary">

// ✅ DOBŘE - CSS custom properties
<div style={{ backgroundColor: 'var(--farm-primary)' }}>

// ❌ ŠPATNĚ - Inline hardcoded colors
<div style={{ backgroundColor: '#7ec752' }}>
```

#### **5. Font Imports**

```css
/* ✅ DOBŘE - Pouze v /src/styles/fonts.css */
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&display=swap');

/* ❌ ŠPATNĚ - V jiných CSS souborech */
```

### **Backend**

#### **1. Error Handling**

```typescript
// ✅ DOBŘE - Detailní chybové zprávy
try {
  await kv.set(key, value);
} catch (error) {
  console.error(`Error saving page ${pageId}:`, error);
  return c.json({ 
    error: `Failed to save page: ${error.message}` 
  }, 500);
}

// ❌ ŠPATNĚ - Generická chyba
catch (error) {
  return c.json({ error: "Error" }, 500);
}
```

#### **2. KV Store Usage**

```typescript
// ✅ DOBŘE - Prefix search pro kategorie
const pages = await kv.getByPrefix("page:");

// ✅ DOBŘE - Batch operace
await kv.mset(
  ['page:1', 'page:2'], 
  [data1, data2]
);

// ❌ ŠPATNĚ - Multiple single operations
await kv.set('page:1', data1);
await kv.set('page:2', data2);
```

#### **3. Signed URLs**

```typescript
// ✅ DOBŘE - Dlouhá expirace pro static assets
const { data } = await supabase.storage
  .from(IMAGES_BUCKET)
  .createSignedUrl(filename, 315360000); // 10 let

// ❌ ŠPATNĚ - Krátká expirace (expired links!)
.createSignedUrl(filename, 3600); // 1 hodina
```

### **Database**

#### **1. Naming Conventions**

```javascript
// ✅ DOBŘE - Prefix kategorií
"page:domu"
"global:settings"
"admin:password"

// ❌ ŠPATNĚ - Bez struktury
"domu"
"settings"
"password"
```

#### **2. Data Struktur**

```typescript
// ✅ DOBŘE - Timestamps v datech
{
  id: "domu",
  label: "Domů",
  lastModified: new Date().toISOString()
}

// ✅ DOBŘE - JSONB flexibility
{
  hero: { ... },
  sections: [ ... ],
  customField: "anything"
}
```

---

## 📚 Slovníček

| Termín | Význam |
|--------|--------|
| **KV Store** | Key-Value Store - jednoduchá databáze |
| **Signed URL** | Dočasný bezpečný odkaz na soubor |
| **Edge Function** | Serverless funkce (Supabase/Deno) |
| **Floating Card** | Design pattern - vznášející se panel |
| **TipTap** | WYSIWYG rich text editor |
| **Sticky Header** | Navigace přilepená nahoře při scrollu |
| **Hamburger Menu** | Mobilní menu (☰ ikona) |
| **WCAG AA** | Web Content Accessibility Guidelines |
| **SEO** | Search Engine Optimization |
| **OG Image** | Open Graph - náhled při sdílení |

---

## 🐛 Známé limity

1. **Password security** - Plain text (need bcrypt)
2. **No database migrations** - Pouze KV store (nelze SQL DDL)
3. **No user management** - Pouze jeden admin účet
4. **No email sending** - Kontaktní formulář není funkční
5. **No search** - Žádné fulltextové vyhledávání
6. **No analytics** - Není integrovaná Google Analytics

---

## 🔮 Budoucí rozšíření

### **Možná vylepšení:**

1. **Rezervační systém** - Booking služeb online
2. **Blog s komentáři** - Interaktivní články
3. **Newsletter** - Email marketing integrace
4. **Multi-language** - Angličtina / Němčina
5. **Social login** - Google / Facebook auth
6. **Payment gateway** - Online platby
7. **Mobile app** - React Native / Flutter
8. **Push notifications** - Notifikace o akcích

---

## 📞 Kontakt & Podpora

**Projekt:** Farma pod Janovou horou  
**Tech Stack:** React + Supabase + Hono  
**Verze:** 1.0  
**Datum:** 11. března 2026

---

## 📄 Licence

Tento projekt je vlastnictvím Farma pod Janovou horou.  
Všechna práva vyhrazena.

---

**🌾 Konec dokumentace**
