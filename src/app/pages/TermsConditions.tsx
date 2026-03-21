import { LegalPageContent } from '../components/LegalPageContent';

export function TermsConditions() {
  const defaultContent = `
    <h2>1. Obecná ustanovení</h2>
    <p>Tyto obchodní podmínky upravují vztahy mezi poskytovatelem služeb a zákazníky využívajícími služeb farmy.</p>
    
    <p><strong>Poskytovatel služeb:</strong><br>
    Farma pod Janovou horou z.s.<br>
    Janova Hora 466<br>
    763 12 Vizovice<br>
    IČ: 22644601</p>
    
    <p>Email: <a href="mailto:farmapodjanovouhorou@seznam.cz">farmapodjanovouhorou@seznam.cz</a><br>
    Telefon: <a href="tel:+420605279222">+420 605 279 222</a></p>

    <h2>2. Poskytované služby</h2>
    <p>Farma poskytuje následující služby:</p>
    <ul>
      <li><strong>Jezdecké kroužky</strong> - pravidelné lekce pro děti od 7 let</li>
      <li><strong>Jezdecké tábory</strong> - příměstské i pobytové tábory během prázdnin</li>
      <li><strong>Jízda na koni</strong> - vyjížďky, vycházky na vedeném koni, vodění na poníkovi</li>
      <li><strong>Akce na míru</strong> - focení, svatby, oslavy, exkurze, přespání s koněm</li>
    </ul>

    <h2>3. Objednávka a rezervace</h2>
    <p>Služby je možné objednat prostřednictvím:</p>
    <ul>
      <li>Kontaktního formuláře na webových stránkách</li>
      <li>E-mailu na adresu farmapodjanovouhorou@seznam.cz</li>
      <li>Telefonicky na čísle +420 605 279 222</li>
    </ul>
    <p>Objednávka je závazná po potvrzení ze strany poskytovatele a uhrazení zálohy nebo celé částky dle aktuální nabídky.</p>

    <h2>4. Ceny a platební podmínky</h2>
    <p>Ceny služeb jsou uvedeny v aktuální nabídce na webových stránkách. Platba je možná:</p>
    <ul>
      <li>Bankovním převodem na účet poskytovatele</li>
      <li>Hotově na místě (po předchozí dohodě)</li>
    </ul>
    <p>V případě zrušení rezervace ze strany zákazníka méně než 24 hodin před termínem služby si poskytovatel vyhrazuje právo účtovat storno poplatek ve výši 50% z ceny služby.</p>

    <h2>5. Práva a povinnosti zákazníka</h2>
    <p>Zákazník je povinen:</p>
    <ul>
      <li>Dodržovat pokyny instruktora a pravidla bezpečnosti</li>
      <li>Informovat poskytovatele o zdravotních omezeních nebo alergiích</li>
      <li>U dětí mladších 15 let poskytnout kontakt na zákonného zástupce</li>
      <li>Dostavit se na službu včas (5-10 minut před sjednaným termínem)</li>
    </ul>

    <h2>6. Práva a povinnosti poskytovatele</h2>
    <p>Poskytovatel je povinen:</p>
    <ul>
      <li>Zajistit kvalitní a bezpečné poskytování služeb</li>
      <li>Zajistit odborně vyškolené instruktory</li>
      <li>Zajistit vhodné jezdecké vybavení včetně přileb</li>
      <li>Informovat zákazníka o případných změnách termínu</li>
    </ul>
    <p>Poskytovatel si vyhrazuje právo odmítnout poskytnutí služby v případě nepříznivého počasí nebo jiných okolností ohrožujících bezpečnost.</p>

    <h2>7. Odpovědnost</h2>
    <p>Poskytovatel neodpovídá za:</p>
    <ul>
      <li>Škody způsobené nedodržením pokynů instruktora</li>
      <li>Ztrátu nebo poškození osobních věcí zákazníka</li>
      <li>Zranění způsobená nesprávným chováním vůči koním</li>
    </ul>

    <h2>8. Ochrana osobních údajů</h2>
    <p>Poskytovatel zpracovává osobní údaje zákazníků v souladu se zákonem o ochraně osobních údajů a GDPR. Více informací naleznete v <a href="ochrana-osobnich-udaju">dokumentu o ochraně osobních údajů</a>.</p>

    <h2>9. Závěrečná ustanovení</h2>
    <p>Tyto obchodní podmínky nabývají účinnosti dnem jejich zveřejnění na webových stránkách. Poskytovatel si vyhrazuje právo tyto podmínky změnit.</p>
    <p>V případě sporů se strany pokusí dosáhnout dohody smírnou cestou. Není-li to možné, jsou spory řešeny u místně příslušného soudu.</p>

    <h2>10. Kontakt</h2>
    <p>Máte-li jakékoliv dotazy ohledně těchto obchodních podmínek, kontaktujte nás:</p>
    <p>Email: <a href="mailto:farmapodjanovouhorou@seznam.cz">farmapodjanovouhorou@seznam.cz</a><br>
    Telefon: <a href="tel:+420605279222">+420 605 279 222</a></p>
  `;

  return (
    <LegalPageContent
      pageId="podminky"
      defaultTitle="Obchodní podmínky"
      defaultContent={defaultContent}
    />
  );
}
