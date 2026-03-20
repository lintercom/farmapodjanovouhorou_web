import { LegalPageContent } from '../components/LegalPageContent';

export function ComplaintsPolicy() {
  const defaultContent = `
    <h2>1. Úvodní ustanovení</h2>
    <p>Tento reklamační řád upravuje podmínky a postup při uplatňování reklamací služeb poskytovaných Farmou pod Janovou horou z.s.</p>

    <p><strong>Poskytovatel služeb:</strong><br>
    Farma pod Janovou horou z.s.<br>
    Janova Hora 466<br>
    763 12 Vizovice<br>
    IČ: 22644601</p>

    <p>Email: <a href="mailto:farmapodjanovouhorou@seznam.cz">farmapodjanovouhorou@seznam.cz</a><br>
    Telefon: <a href="tel:+420605279222">+420 605 279 222</a></p>

    <h2>2. Práva zákazníka</h2>
    <p>Zákazník má právo reklamovat poskytnuté služby v případě, že:</p>
    <ul>
      <li>Služba nebyla poskytnuta v dohodnutém rozsahu</li>
      <li>Služba neodpovídala dohodnuté kvalitě</li>
      <li>Služba nebyla poskytnuta v dohodnutém termínu</li>
      <li>Došlo k jiným vadám nebo nedostatkům při poskytování služby</li>
    </ul>

    <h2>3. Postup reklamace</h2>
    <p>Reklamaci lze uplatnit následujícími způsoby:</p>
    <ul>
      <li><strong>E-mailem</strong> na adresu: farmapodjanovouhorou@seznam.cz</li>
      <li><strong>Telefonicky</strong> na čísle: +420 605 279 222</li>
      <li><strong>Osobně</strong> na adrese poskytovatele</li>
    </ul>

    <h2>4. Lhůta pro uplatnění reklamace</h2>
    <p>Reklamaci je nutné uplatnit <strong>do 14 dnů od poskytnutí služby</strong>.</p>
    <p>U táborů a kroužků je možné reklamaci uplatnit nejpozději do 14 dnů od ukončení akce.</p>

    <h2>5. Náležitosti reklamace</h2>
    <p>Reklamace musí obsahovat:</p>
    <ul>
      <li>Identifikační údaje zákazníka (jméno, příjmení, kontakt)</li>
      <li>Datum poskytnutí služby</li>
      <li>Popis vady nebo nedostatku</li>
      <li>Požadovaný způsob vyřízení reklamace</li>
    </ul>

    <h2>6. Vyřízení reklamace</h2>
    <p>Poskytovatel vyřídí reklamaci <strong>do 30 dnů</strong> od jejího doručení.</p>
    <p>O výsledku reklamace bude zákazník informován:</p>
    <ul>
      <li>E-mailem</li>
      <li>Telefonicky</li>
      <li>Písemně (na žádost zákazníka)</li>
    </ul>

    <h2>7. Způsoby vyřízení reklamace</h2>
    <p>V případě oprávněné reklamace může poskytovatel:</p>
    <ul>
      <li><strong>Poskytnout náhradní službu</strong> ve stejném rozsahu a kvalitě</li>
      <li><strong>Poskytnout slevu</strong> z ceny poskytnuté služby</li>
      <li><strong>Vrátit celou částku</strong> zaplacenou za službu</li>
      <li><strong>Nabídnout jinou formu kompenzace</strong> po dohodě se zákazníkem</li>
    </ul>

    <h2>8. Neoprávněná reklamace</h2>
    <p>Reklamace nebude uznána jako oprávněná v případě, že:</p>
    <ul>
      <li>Zákazník nedodržel pokyny instruktora</li>
      <li>Zákazník porušil pravidla bezpečnosti</li>
      <li>Zákazník se dostavil pozdě nebo se nedostavil vůbec</li>
      <li>Služba nebyla poskytnuta z důvodu nepříznivého počasí (s nabídkou náhradního termínu)</li>
      <li>Zákazník zatajil důležité zdravotní informace</li>
    </ul>

    <h2>9. Mimosoudní řešení sporů</h2>
    <p>V případě sporu, který se nepodaří vyřešit vzájemnou dohodou, má zákazník právo obrátit se na:</p>
    <ul>
      <li><strong>Českou obchodní inspekci</strong> (www.coi.cz)</li>
      <li><strong>Subjekt mimosoudního řešení spotřebitelských sporů</strong></li>
    </ul>

    <h2>10. Závěrečná ustanovení</h2>
    <p>Tento reklamační řád nabývá účinnosti dnem zveřejnění na webových stránkách.</p>
    <p>Poskytovatel si vyhrazuje právo tento reklamační řád změnit.</p>

    <h2>11. Kontakt</h2>
    <p>Pro uplatnění reklamace nebo dotazy ohledně reklamačního řádu kontaktujte:</p>
    <p>Email: <a href="mailto:farmapodjanovouhorou@seznam.cz">farmapodjanovouhorou@seznam.cz</a><br>
    Telefon: <a href="tel:+420605279222">+420 605 279 222</a></p>
  `;

  return (
    <LegalPageContent
      pageId="reklamace"
      defaultTitle="Reklamační řád"
      defaultContent={defaultContent}
    />
  );
}
