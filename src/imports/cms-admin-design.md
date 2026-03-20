✅ PROMPT PRO FIGMA MAKE – CMS ADMIN (podle aktuálního webu + patička)

Create a simple CMS administration interface for the current farm website.
The website already has a header navigation with these items and behavior:

Top menu items: Domů, Služby (dropdown), Akce, Naši koně, O nás, Kontakt

Dropdown under Služby contains: Všechny služby, Tábory, Kroužky, Vyjížďky

The header layout and interaction must stay consistent with the existing website style (same placement and behavior).

Admin pages should visually match the website: minimal, lots of whitespace, floating panels, muted green accent, warm brown secondary, soft shadows, rounded corners.

Admin access is via a small lock icon in the footer.

Required CMS behavior (prototype):

Login credentials for prototype: username: admin, password: admin

After login, user is redirected into the administration environment.

✅ Pages to design (Admin UI screens)
1) Admin Login Page

Keep the same top header/nav style as the current website.

Title: “Přihlášení do administrace”

Inputs: Uživatelské jméno, Heslo

Primary button: “Přihlásit se”

Secondary button: “Zpět na hlavní stránku”

Error states (invalid credentials)

Clean floating card container centered on the page.

2) Admin Dashboard / Entry Screen

A simple entry overview (not analytics):

Quick links: “Upravit Domů”, “Upravit Služby”, “Upravit Naši koně”, “Upravit Akce”, “Upravit O nás”

Status cards: last saved, draft/published state (lightweight)

“Otevřít editor stránek” button

3) Admin Page Editor (core screen)

Design a structured content editor to edit all visible website pages and their sections/parameters.

Layout:

Left sidebar: Pages list

Main center: Sections list + section editing

Optional right panel: advanced settings (spacing, background variant, visibility)

Left Sidebar – Pages list (must match current website)

Visible pages:

Domů

Služby (page)

Akce

Naši koně

O nás

Kontakt

Footer/small-link pages:

404 stránka

Ochrana osobních údajů

Cookies

Obchodní podmínky

Reklamační řád

System:

Média (media library)

SEO nastavení

Nastavení webu

✅ Page: “Služby” editing rules (IMPORTANT)

Služby is a single page.
Tábory / Kroužky / Vyjížďky are NOT separate pages in the CMS.

On the “Služby” page, create a “Services list section” which contains repeatable “Service items” cards:

Each Service item must be editable:

Název služby (text)

Krátký popis (textarea)

Obrázek (image picker)

Tlačítko text

Odkaz (optional)

Aktivní / Neaktivní toggle

Pořadí (drag & drop reorder)
Actions per item: Duplicate, Delete

Add button: “+ Přidat službu”

✅ Sections editing UI (for all pages)

Each page is composed of sections stacked vertically as floating cards:

Section name (Hero, Text, Gallery, FAQ, CTA, etc.)

Expand/collapse

Drag handle reorder

Duplicate / Delete

“Add section” button with a dropdown of available section types

Each section has editable parameters based on type:

Text fields

Image picker

Buttons (label + link)

Variant selector (dropdown)

Visibility toggles (desktop/mobile)

✅ Media Library screen

Grid view of images

Upload button

Replace / Delete

Search

Minimal clean design

✅ UX + Style requirements

Clean whitespace, calm look

Floating panels/cards (soft shadows, rounded-2xl/3xl)

Subtle micro-animations only

Accessible contrast + focus states

Responsive for mobile and desktop

Not a corporate dashboard; content editing is the focus

If possible, show the admin UI in two states:

logged-out (login page)

logged-in (page editor with “Služby” opened and service items visible)