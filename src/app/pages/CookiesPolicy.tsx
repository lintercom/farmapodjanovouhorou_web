import { LegalPageContent } from '../components/LegalPageContent';

export function CookiesPolicy() {
  const defaultContent = `
    <h2>1. Co jsou cookies</h2>
    <p>Cookies jsou malé textové soubory, které jsou ukládány do vašeho zařízení (počítač, smartphone, tablet) při návštěvě webových stránek. Cookies pomáhají webovým stránkám zapamatovat si informace o vaší návštěvě, jako jsou preferovaný jazyk a další nastavení.</p>
    <p>Soubory cookies mohou usnadnit vaši příští návštěvu a zvýšit užitečnost webu pro vás.</p>

    <h2>2. Jak používáme cookies</h2>
    <p>Na našich webových stránkách používáme následující kategorie cookies:</p>

    <h3>Nezbytné cookies</h3>
    <p>Tyto cookies jsou nezbytné pro správné fungování webu. Bez těchto cookies by web nemohl fungovat správně.</p>
    <p><em>Tyto cookies nelze vypnout.</em></p>

    <h3>Analytické cookies</h3>
    <p>Tyto cookies nám pomáhají porozumět tomu, jak návštěvníci používají naše webové stránky, například které stránky navštěvují nejčastěji a zda dostávají chybové zprávy.</p>
    <p><em>Tyto cookies můžete odmítnout.</em></p>

    <h3>Marketingové cookies</h3>
    <p>Tyto cookies se používají ke sledování návštěvníků napříč webovými stránkami. Záměrem je zobrazovat reklamy, které jsou relevantní a zajímavé pro jednotlivé uživatele.</p>
    <p><em>Tyto cookies můžete odmítnout.</em></p>

    <h2>3. Přehled používaných cookies</h2>
    <ul>
      <li><strong>session_id</strong> (Nezbytné, Relace): Identifikace uživatelské relace</li>
      <li><strong>cookie_consent</strong> (Nezbytné, 1 rok): Uložení souhlasu s cookies</li>
      <li><strong>_ga</strong> (Analytické, 2 roky): Google Analytics</li>
      <li><strong>_fbp</strong> (Marketingové, 3 měsíce): Facebook Pixel</li>
    </ul>

    <h2>4. Jak ovládat cookies</h2>
    <p>Máte možnost ovládat a/nebo odstranit cookies podle svého uvážení. Můžete odstranit všechny cookies, které jsou již ve vašem počítači uložené, a můžete nastavit většinu prohlížečů tak, aby jejich ukládání bylo zakázáno.</p>
    <p>Pokud to uděláte, pravděpodobně budete muset ručně upravovat některé předvolby pokaždé, když navštívíte web, a některé služby a funkce nemusí fungovat.</p>

    <h3>Správa cookies v prohlížečích:</h3>
    <ul>
      <li><strong>Google Chrome:</strong> Nastavení → Soukromí a zabezpečení → Cookies a další data webů</li>
      <li><strong>Mozilla Firefox:</strong> Možnosti → Soukromí a zabezpečení → Cookies a data stránek</li>
      <li><strong>Safari:</strong> Předvolby → Soukromí → Cookies a data webových stránek</li>
      <li><strong>Microsoft Edge:</strong> Nastavení → Cookies a oprávnění webu → Správa a odstranění cookies</li>
    </ul>

    <h2>5. Cookies třetích stran</h2>
    <p>Na našich webových stránkách mohou být použity cookies třetích stran (např. Google Analytics, Facebook). Tyto třetí strany mohou používat cookies k analýze používání webu, zobrazování cílené reklamy nebo poskytování funkcí sociálních médií.</p>
    <p>Nemáme kontrolu nad cookies třetích stran a jejich používání se řídí zásadami ochrany osobních údajů těchto třetích stran.</p>

    <h2>6. Kontakt</h2>
    <p>Máte-li jakékoliv dotazy ohledně našich zásad používání cookies, kontaktujte nás:</p>
    <p>Email: <a href="mailto:farmapodjanovouhorou@seznam.cz">farmapodjanovouhorou@seznam.cz</a><br>
    Telefon: <a href="tel:+420605279222">+420 605 279 222</a></p>
  `;

  return (
    <LegalPageContent
      pageId="cookies"
      defaultTitle="Zásady používání cookies"
      defaultContent={defaultContent}
    />
  );
}