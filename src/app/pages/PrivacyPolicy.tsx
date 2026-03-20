import { LegalPageContent } from '../components/LegalPageContent';

export function PrivacyPolicy() {
  const defaultContent = `
    <h2>1. Správce osobních údajů</h2>
    <p>Správcem vašich osobních údajů je:</p>
    <p><strong>Farma pod Janovou horou z.s.</strong><br>
    Janova Hora 466<br>
    763 12 Vizovice<br>
    IČ: 22644601</p>
    <p>Email: <a href="mailto:farmapodjanovouhorou@seznam.cz">farmapodjanovouhorou@seznam.cz</a><br>
    Telefon: <a href="tel:+420605279222">+420 605 279 222</a></p>

    <h2>2. Jaké osobní údaje zpracováváme</h2>
    <p>V rámci poskytování našich služeb můžeme zpracovávat následující kategorie osobních údajů:</p>
    <ul>
      <li><strong>Identifikační údaje:</strong> jméno, příjmení, datum narození</li>
      <li><strong>Kontaktní údaje:</strong> adresa, email, telefonní číslo</li>
      <li><strong>Údaje zákonných zástupců:</strong> u dětí mladších 15 let</li>
      <li><strong>Zdravotní údaje:</strong> relevantní informace pro bezpečné poskytování služeb (alergie, zdravotní omezení)</li>
    </ul>

    <h2>3. Účel zpracování osobních údajů</h2>
    <p>Vaše osobní údaje zpracováváme za následujícími účely:</p>
    <ul>
      <li>Poskytování jezdeckých služeb, táborů a kroužků</li>
      <li>Zajištění bezpečnosti účastníků</li>
      <li>Komunikace s klienty a zákonými zástupci</li>
      <li>Vyřizování objednávek a rezervací</li>
      <li>Plnění zákonných povinností</li>
    </ul>

    <h2>4. Právní základ zpracování</h2>
    <p>Osobní údaje zpracováváme na základě:</p>
    <ul>
      <li><strong>Plnění smlouvy</strong> – pro poskytování objednaných služeb</li>
      <li><strong>Oprávněného zájmu</strong> – pro zajištění bezpečnosti a komunikaci</li>
      <li><strong>Souhlasu</strong> – pro marketingovou komunikaci</li>
      <li><strong>Plnění právní povinnosti</strong> – pro účetní a daňové účely</li>
    </ul>

    <h2>5. Doba uchovávání údajů</h2>
    <p>Osobní údaje uchováváme pouze po dobu nezbytně nutnou:</p>
    <ul>
      <li>Po dobu trvání smluvního vztahu a následně po dobu stanovenou právními předpisy (typicky 3-10 let)</li>
      <li>Marketingové účely – do odvolání souhlasu</li>
    </ul>

    <h2>6. Vaše práva</h2>
    <p>Jako subjekt údajů máte následující práva:</p>
    <ul>
      <li><strong>Právo na přístup</strong> k osobním údajům</li>
      <li><strong>Právo na opravu</strong> nepřesných údajů</li>
      <li><strong>Právo na výmaz</strong> údajů ("právo být zapomenut")</li>
      <li><strong>Právo na omezení zpracování</strong></li>
      <li><strong>Právo na přenositelnost</strong> údajů</li>
      <li><strong>Právo vznést námitku</strong> proti zpracování</li>
      <li><strong>Právo odvolat souhlas</strong> se zpracováním</li>
      <li><strong>Právo podat stížnost</strong> u Úřadu pro ochranu osobních údajů</li>
    </ul>

    <h2>7. Zabezpečení údajů</h2>
    <p>Přijímáme vhodná technická a organizační opatření k ochraně vašich osobních údajů před neoprávněným přístupem, ztrátou nebo zničením. Přístup k osobním údajům mají pouze oprávněné osoby, které jsou vázány povinností mlčenlivosti.</p>

    <h2>8. Kontakt</h2>
    <p>Máte-li jakékoliv dotazy ohledně zpracování vašich osobních údajů nebo chcete uplatnit svá práva, kontaktujte nás:</p>
    <p>Email: <a href="mailto:farmapodjanovouhorou@seznam.cz">farmapodjanovouhorou@seznam.cz</a><br>
    Telefon: <a href="tel:+420605279222">+420 605 279 222</a></p>
  `;

  return (
    <LegalPageContent
      pageId="ochrana"
      defaultTitle="Ochrana osobních údajů"
      defaultContent={defaultContent}
    />
  );
}