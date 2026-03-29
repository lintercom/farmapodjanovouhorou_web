// Default content for all pages - contains all current static data from the website
export const defaultPageContent: Record<string, any> = {
  domu: {
    id: 'domu',
    label: 'Domů',
    hero: {
      title: 'Farma pod Janovou horou',
      subtitle: 'Rodinná farma zaměřená na práci s dětmi a koňmi. Nabízíme jezdecké kroužky, tábory a vyjížďky v krásné přírodě.',
      buttonText: 'Naše služby',
      buttonLink: '/sluzby',
      secondaryButtonText: 'Kontaktujte nás',
      secondaryButtonLink: '/kontakt',
      image: 'figma:asset/2e3e71254bc7732e9f4a308d6897767da70c1bfd.png',
    },
    services: [
      {
        id: 'tabory',
        title: 'Tábory',
        description: 'Prázdninové jezdecké tábory plné zábavy a dobrodružství. Děti se naučí základy jízdy a péče o koně.',
        image: 'https://images.unsplash.com/photo-1752575382369-a290d1499d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBob3JzZSUyMGNhbXAlMjBraWRzfGVufDF8fHx8MTc3MjAyNzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        link: '/sluzby#tabory',
      },
      {
        id: 'krouzky',
        title: 'Jezdecké kroužky',
        description: 'Jezdecký kroužek je pro děti od 7 let, které mají rády koně, chtějí s nimi trávit čas, jezdit a pečovat o ně. Děti se naučí jak se o koně starat, ošetřovat, krmit, sedlat. Naučí se s koňmi základy práce ze země a jak se kolem nich pohybovat.',
        image: 'https://images.unsplash.com/photo-1766499431124-a8de024c5dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJpZGluZyUyMGhvcnNlc3xlbnwxfHx8fDE3NzIwMjc5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        link: '/sluzby#krouzky',
      },
      {
        id: 'vyjizdy',
        title: 'Jízda na koni',
        description: 'Nabízíme jízdu na koni pro děti i dospělé, vyjížďky do přírody, vycházky na vedeném koni/poníkovi a vodění na poníkovi pro nejmenší děti.',
        image: 'https://images.unsplash.com/photo-1763130063474-1bee680a1463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHJpZGluZyUyMGxlc3NvbnxlbnwxfHx8fDE3NzIwMjc5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        link: '/sluzby#vyjizdy',
      },
      {
        id: 'akce-na-miru',
        title: 'Akce na míru',
        description: 'Nabízíme speciální služby pro vaše akce - zapůjčení koní na focení a svatby, vození na oslavách a exkurze na farmě pro školy.',
        image: 'https://images.unsplash.com/photo-1628996084452-deb83cb04988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwc3BlY2lhbCUyMGV2ZW50cyUyMGhvcnNlJTIwcG9ueSUyMGtpZHMlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzMxMzYyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        link: '/sluzby#akce-na-miru',
      },
    ],
    horsesPreview: {
      title: 'Naši koně',
      subtitle: 'Seznamte se s našimi čtyřnohými přáteli',
      buttonText: 'Zobrazit všechny koně',
      buttonLink: '/nasi-kone',
    },
    giftCard: {
      title: 'Dárkový poukaz',
      subtitle: 'Potěšte své blízké nezapomenutelným zážitkem. Dárkový poukaz na vyjížďku je ideální dárek pro milovníky koní a přírody.',
      features: [
        {
          icon: 'Calendar',
          title: 'Platnost 12 měsíců',
          description: 'Dost času na využití dárku',
        },
        {
          icon: 'Heart',
          title: 'Krásné provedení',
          description: 'Zasíláme poštou nebo e-mailem',
        },
        {
          icon: 'Sparkles',
          title: 'Flexibilní hodnota',
          description: 'Vyberte si částku dle přání',
        },
      ],
      buttonText: 'Objednat dárkový poukaz',
      buttonLink: '/kontakt',
    },
    testimonials: {
      title: 'Co o nás říkají',
      subtitle: 'Přečtěte si zkušenosti našich spokojených klientů',
      items: [
        {
          id: '1',
          rating: 5,
          text: 'Naše dcera chodí na kroužek už druhým rokem a je nadšená. Instruktoři jsou milí, trpěliví a hlavně mají rádi děti i koně. Děkujeme!',
          authorName: 'Marie Kovářová',
          authorRole: 'Maminka účastnice kroužku',
          authorInitials: 'MK',
        },
        {
          id: '2',
          rating: 5,
          text: 'Letní tábor byl skvělý! Syn se naučil spoustu nového, získal vztah ke koním a hlavně si užil spoustu zábavy s kamarády. Příští rok jedeme znovu!',
          authorName: 'Petr Horák',
          authorRole: 'Táta účastníka tábora',
          authorInitials: 'PH',
        },
        {
          id: '3',
          rating: 5,
          text: 'Krásné prostředí, milí lidé a hlavně spokojené koně. Dcera se těší na každou hodinu a doma mluví jen o koních. Vřele doporučujeme!',
          authorName: 'Anna Nováková',
          authorRole: 'Maminka účastnice',
          authorInitials: 'AN',
        },
      ],
    },
    faq: {
      title: 'Často kladené dotazy',
      subtitle: 'Odpovědi na nejčastější otázky',
      items: [
        {
          id: '1',
          question: 'Jaké jsou podmínky pro rezervaci jezdeckého tábora?',
          answer: 'Tábory jsou určeny pro děti od 8 do 15 let. Předchozí zkušenosti s koňmi nejsou nutné – máme skupiny pro začátečníky i pokročilé.',
        },
        {
          id: '2',
          question: 'Kolik dětí je v jedné skupině?',
          answer: 'V kroužcích i táborech pracujeme s malými skupinami maximálně 6 dětí. To nám umožňuje věnovat každému dítěti individuální pozornost.',
        },
        {
          id: '3',
          question: 'Je potřeba mít vlastní jezdecké vybavení?',
          answer: 'Ne, veškeré základní vybavení včetně přileb půjčujeme. Doporučujeme pouze pohodlné oblečení a pevnou obuv.',
        },
        {
          id: '4',
          question: 'Můžu přijít na ukázkovou lekci?',
          answer: 'Ano, máme pravidelné dny otevřených dveří, kde si můžete vyzkoušet krátkou ukázkovou jízdu. Kontaktujte nás pro termíny.',
        },
        {
          id: '5',
          question: 'Jsou vyjížďky vhodné i pro začátečníky?',
          answer: 'Vyjížďky do terénu jsou určeny pouze pro pokročilé jezdce, kteří zvládají všechny chody. Pro začátečníky doporučujeme nejprve kroužky.',
        },
      ],
    },
  },
  sluzby: {
    id: 'sluzby',
    label: 'Služby',
    hero: {
      title: 'Naše služby',
      subtitle: 'Nabízíme širokou škálu aktivit pro děti i dospělé. Od jezdeckých kroužků po letní tábory a výlety do přírody.',
      buttonText: 'Prozkoumat služby',
      buttonLink: '#tabory',
      secondaryButtonText: 'Kontaktujte nás',
      secondaryButtonLink: '/kontakt',
      image: 'figma:asset/2e3e71254bc7732e9f4a308d6897767da70c1bfd.png',
    },
    services: [
      {
        id: 'tabory',
        title: 'Jezdecké tábory',
        description: 'Prázdninové jezdecké tábory jsou ideální pro děti, které mají rády koně a přírodu. Během týdenního pobytu se děti naučí základy jízdy, péči o koně a stráví spoustu času venku.',
        image: 'https://images.unsplash.com/photo-1752575382369-a290d1499d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBob3JzZSUyMGNhbXAlMjBraWRzfGVufDF8fHx8MTc3MjAyNzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        details: [
          {
            title: 'Termíny',
            description: 'Červenec a srpen, týdenní turnusy',
          },
          {
            title: 'Pro koho',
            description: 'Děti od 7 let',
          },
          {
            title: 'Co zahrnuje',
            description: 'Jízda na koni, teoretická a praktická péče o koně (ošetřování, sedlání), vyjížďky do terénu, práce s koněm ze země, seznámení se s dalšími zvířaty na farmě, tvořivá činnost, soutěže, exkurze v dostihové stáji, v případě příznivého počasí přespí děti jednu noc pod širákem',
          },
          {
            title: 'Cena',
            description: 'Příměstský tábor 4 800,- Kč\nPobytový tábor 7 700,- Kč',
          },
        ],
        buttonText: 'Rezervovat tábor',
        buttonLink: '/kontakt?tab=tabor',
      },
      {
        id: 'krouzky',
        title: 'Jezdecké kroužky',
        description: 'Jezdecký kroužek je pro děti od 7 let, které mají rády koně, chtějí s nimi trávit čas, jezdit a pečovat o ně. Děti se naučí jak se o koně starat, ošetřovat, krmit, sedlat. Naučí se s koňmi základy práce ze země a jak se kolem nich pohybovat.',
        image: 'https://images.unsplash.com/photo-1766499431124-a8de024c5dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJpZGluZyUyMGhvcnNlc3xlbnwxfHx8fDE3NzIwMjc5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        details: [
          {
            title: 'Pro koho',
            description: 'Pro děti od 7 let, které mají rády koně a chtějí s nimi trávit čas',
          },
          {
            title: 'Co se děti naučí',
            description: 'Péče o koně, ošetřování, krmení, sedlání, základy práce ze země a bezpečný pohyb kolem koní',
          },
          {
            title: 'Při nepřízni počasí',
            description: 'Teoretická výuka péče o koně, chod stáje, výstroj',
          },
          {
            title: 'Vycházky s koňmi',
            description: 'Procházky do přírody, na vodítku i v sedle',
          },
          {
            title: 'Cena',
            description: '5 250,- Kč (15 lekcí)',
          },
        ],
        buttonText: 'Rezervovat kroužek',
        buttonLink: '/kontakt?tab=krouzek',
      },
      {
        id: 'vyjizdy',
        title: 'Jízda na koni',
        description: 'Nabízíme jízdu na koni pro děti i dospělé, vyjížďky do přírody, vycházky na vedeném koni/poníkovi a vodění na poníkovi pro nejmenší děti.',
        image: 'https://images.unsplash.com/photo-1763130063474-1bee680a1463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHJpZGluZyUyMGxlc3NvbnxlbnwxfHx8fDE3NzIwMjc5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        details: [
          {
            title: 'Vyjížďka do přírody',
            description: '60 minut - 600 Kč',
          },
          {
            title: 'Vycházka na vedeném koni/poníkovi',
            description: '30 minut - 350 Kč\n60 minut - 600 Kč',
          },
          {
            title: 'Vodění na poníkovi pro děti',
            description: '30 minut - 350 Kč',
          },
          {
            title: 'Provozní doba',
            description: 'Pondělí až sobota (v neděli nejezdíme)',
          },
          {
            title: 'Důležité informace',
            description: 'Prosíme o příjezd 5-10 minut předem z důvodu instrukcí a nastavení pomůcek. Čas jízdy se počítá od domluveného času.',
          },
        ],
        buttonText: 'Rezervovat jízdu',
        buttonLink: '/kontakt?tab=vyjizdy',
      },
      {
        id: 'akce-na-miru',
        title: 'Akce na míru',
        description: 'Nabízíme speciální služby šité na míru vašim potřebám - zapůjčení koní na focení a svatby, vození dětí na oslavách, exkurze pro školy a možnost přespání s vlastním koněm.',
        image: 'https://images.unsplash.com/photo-1628996084452-deb83cb04988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwc3BlY2lhbCUyMGV2ZW50cyUyMGhvcnNlJTIwcG9ueSUyMGtpZHMlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzMxMzYyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        details: [
          {
            title: 'Zapůjčení koně na focení',
            description: 'S vlastním fotografem, u nás na farmě nebo přivezeme koně k vám (doprava na místo se připočítává) - cena dohodou',
          },
          {
            title: 'Zapůjčení koně na svatbu',
            description: 'Příjezd, focení, zapůjčení koně pro váš velký den (doprava na místo se připočítává) - cena dohodou',
          },
          {
            title: 'Dětské oslavy - vození na poníkovi',
            description: 'Přijedeme povozit vaše děti na oslavu (doprava se připočítává) - cena dohodou',
          },
          {
            title: 'Exkurze na farmě pro školky a školy',
            description: '80,- Kč/dítě (pedagogický doprovod zdarma). Prohlídka farmy, seznámení s koňmi a dalšími zvířaty (ovečky, krávy, kozy, králíci, slepice). Ukázka jak probíhá den na farmě a péče o zvířata.',
          },
          {
            title: 'Přespání s vlastním koněm',
            description: 'Plánujete čundr s vlastním koněm v našem okolí? Nabízíme možnost využít prostor pro přespání a ohradu pro vaše koně - cena dohodou',
          },
        ],
        buttonText: 'Kontaktujte nás',
        buttonLink: '/kontakt',
      },
    ],
  },
  blog: {
    id: 'blog',
    label: 'Blog',
    hero: {
      title: 'Blog',
      subtitle: 'Zjistěte zajímavosti o farmářském životě, chovu zvířat a přírodě kolem nás.',
      image: 'figma:asset/2e3e71254bc7732e9f4a308d6897767da70c1bfd.png',
    },
    events: [
      {
        id: '1',
        title: 'Domácí vejce z farmy: Proč jim dát přednost?',
        description: 'Domácí vejce z farmy představují kvalitní a přirozenou potravinu, která se výrazně liší od vajec z průmyslových velkochovů. Rozdíl není jen v chuti, ale také v čerstvosti, výživové hodnotě a způsobu chovu slepic. Pokud hledáte opravdu kvalitní vejce, která pochází z ověřeného zdroje a jsou produktem šetrného hospodaření, domácí vejce z farmy jsou ideální volbou.',
        fullDescription: 'Přirozený chov slepic ve volném výběhu\n\nNa farmách, kde jsou slepice chovány ve volném výběhu, mají zvířata mnohem přirozenější podmínky pro život. Slepice mají dostatek prostoru, mohou se volně pohybovat po pastvinách a chovat se přirozeným způsobem.\n\nBěhem dne si samy hledají potravu – zobou trávu, semena nebo drobný hmyz. Tento způsob krmení a pohybu má velký vliv na kvalitu vajec. Vejce ze slepic, které žijí přirozeným způsobem, mají obvykle:\n\n• Tmavší a výraznější žloutek\n• Pevnější skořápku\n• Plnější a přirozenější chuť\n\nPrávě díky těmto vlastnostem jsou farmářská vejce velmi ceněná mezi lidmi, kteří dbají na kvalitní stravu.\n\n\nČerstvost, kterou v obchodě často nenajdete\n\nJednou z největších výhod domácích vajec je jejich čerstvost. Vejce z farmy se často dostanou ke spotřebiteli během několika dní od snesení. To znamená, že si zachovávají maximální kvalitu i chuť.\n\nNaopak vejce z velkochovů mohou procházet dlouhým distribučním řetězcem. Často putují přes sklady, balírny a distribuční centra, což může znamenat i několik týdnů mezi snůškou a prodejem v obchodě.\n\nČerstvá vejce mají nejen lepší chuť, ale také lepší vlastnosti při vaření nebo pečení.\n\n\nVýživové hodnoty domácích vajec\n\nDomácí vejce z volného chovu jsou velmi hodnotnou potravinou. Díky přirozenému chovu slepic obsahují často více živin než vejce z průmyslových chovů.\n\nMezi důležité živiny patří například:\n\n• Vitamín A, který podporuje zdraví očí\n• Vitamín D, důležitý pro zdravé kosti\n• Vitamín E, který působí jako silný antioxidant\n• Vitamíny skupiny B, které podporují metabolismus a energii\n• Kvalitní bílkoviny, důležité pro růst a regeneraci organismu\n\nDomácí vejce jsou také přirozeným zdrojem omega-3 mastných kyselin, které podporují zdraví srdce a mozku.\n\n\nLepší životní podmínky zvířat\n\nVelký rozdíl mezi farmářskými a průmyslovými vejci je také v přístupu k chovu slepic. Na farmách nejsou slepice vystaveny stresu z přeplněných hal nebo klecí.\n\nMají přirozený denní režim, přístup k venkovnímu prostředí a mohou se pohybovat tak, jak je pro ně přirozené. Tyto podmínky mají pozitivní vliv nejen na život zvířat, ale také na kvalitu vajec.\n\n\nPodpora lokálních farmářů\n\nKdyž si koupíte domácí vejce z farmy, podporujete tím lokální zemědělství a menší hospodářství. Peníze zůstávají v regionu a pomáhají udržovat farmy, které hospodaří šetrněji k přírodě.\n\nDomácí vejce jsou proto ideální volbou pro každého, kdo hledá:\n\n• Kvalitní a čerstvé potraviny\n• Přirozený způsob chovu zvířat\n• Vyšší výživovou hodnotu\n• Lepší chuť\n• Podporu lokální farmy\n\nJakmile jednou ochutnáte opravdu čerstvá vejce z farmy, rozdíl oproti běžným vejcím z obchodů poznáte téměř okamžitě.',
        image: 'https://images.unsplash.com/photo-1585355611266-f01530088d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZhcm0lMjBjaGlja2VuJTIwZWdncyUyMGJhc2tldHxlbnwxfHx8fDE3NzMxNTE1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: '2',
        title: 'Hovězí maso z farmy: Chuť, která se pozná',
        description: 'Hovězí maso z farmy se vyznačuje především svou přirozenou chutí, kvalitou a způsobem chovu zvířat. Na rozdíl od průmyslové produkce jsou krávy chovány v přirozeném prostředí, kde mají dostatek prostoru, pohybu a kvalitní pastu.',
        fullDescription: 'Hovězí maso z plemene Highland Cattle\n\nNa naší farmě pochází hovězí maso z plemene Highland Cattle, které je známé svou odolností, pomalým růstem a výbornou kvalitou masa.\n\nToto plemeno pochází ze Skotska a je přizpůsobeno chovu v přírodních podmínkách. Zvířata tráví většinu roku na pastvinách, kde mají přístup k přirozené potravě.\n\nTento způsob chovu má zásadní vliv na chuť a strukturu masa.\n\n\nZrání masa pro lepší chuť\n\nVelkou roli v kvalitě hovězího masa hraje také jeho zrání. Po porážce necháváme maso zrát přibližně 14 dní.\n\nBěhem tohoto procesu dochází k přirozenému změkčení svalových vláken. Výsledkem je maso, které je:\n\n• Křehčí\n• Šťavnatější\n• Chuťově výraznější\n\nZrání masa je důležitým krokem, který výrazně zvyšuje jeho gastronomickou kvalitu.\n\n\nNutriční hodnoty farmářského hovězího masa\n\nFarmářské hovězí maso je také velmi hodnotné z hlediska výživy. Obsahuje například:\n\n• Kvalitní bílkoviny\n• Železo důležité pro tvorbu červených krvinek\n• Vitamín B12 podporující nervovou soustavu\n• Zinek podporující imunitní systém\n• Další vitamíny skupiny B\n\nTyto živiny jsou důležité pro správné fungování organismu.\n\n\nChov bez stresu a chemie\n\nDalší výhodou farmářského chovu je, že zvířata nejsou vystavena nadměrnému stresu. Stres totiž může negativně ovlivnit kvalitu masa.\n\nKlidné prostředí, přirozený pohyb a kvalitní pastva mají pozitivní vliv nejen na život zvířat, ale i na výslednou kvalitu masa.\n\n\nSměsný balíček hovězího masa\n\nHovězí maso nabízíme ve formě směsného balíčku o hmotnosti přibližně 8–10 kg. Balíček obsahuje různé části masa, aby bylo možné připravit různé druhy jídel.\n\nObvykle obsahuje například:\n\n• Krk\n• Kližku\n• Žebro\n• Podplečí\n• Mleté maso\n• Steaky\n\nKaždý kus masa je vakuově balený a označený. Porce jsou baleny přibližně po 500 gramech, což je ideální velikost pro domácí vaření i skladování v mrazáku.\n\nFarmářské hovězí maso je skvělou volbou pro každého, kdo:\n\n• Chce znát původ svého jídla\n• Preferuje maso bez hormonů a antibiotik\n• Hledá kvalitní zdroj bílkovin\n• Ocení přirozenou chuť a kvalitu\n\nChuť hovězího masa z farmy je výraznější a plnější než u běžného masa z velkochovů.',
        image: 'https://images.unsplash.com/photo-1764783981480-8d768384dd97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdobGFuZCUyMGNhdHRlJTIwcGFzdHVyJTIwZmFybXxlbnwxfHx8fDE3NzMxNTc4NTOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: '3',
        title: 'Jehněčí maso z farmy: Chuť tradice a zdraví',
        description: 'Jehněčí maso patří mezi nejzdravější druhy masa a má dlouhou tradici v mnoha kuchyních po celém světě. Je ceněné pro svou jemnou chuť, vysokou výživovou hodnotu a snadnou stravitelnost.',
        fullDescription: 'Jehněčí maso z plemene Suffolk\n\nNa naší farmě pochází jehněčí maso z plemene Suffolk, které je známé svou kvalitou masa a dobrými vlastnostmi pro chov na pastvinách.\n\nJehňata vyrůstají ve volné přírodě a většinu života tráví na pastvinách. Mají přirozený pohyb a přístup k čerstvé trávě.\n\nTento způsob chovu má zásadní vliv na kvalitu masa.\n\n\nPřirozený chov bez stresu\n\nZvířata nejsou vystavena stresu ani intenzivnímu výkrmu. Díky tomu si maso zachovává svou přirozenou strukturu i chuť.\n\nNa farmě se nepoužívají růstové hormony ani preventivní antibiotika.\n\n\nVýživové hodnoty jehněčího masa\n\nJehněčí maso obsahuje mnoho důležitých živin, například:\n\n• Vitamíny skupiny B (zejména B12)\n• Železo\n• Zinek\n• Kvalitní bílkoviny\n• Nenasycené mastné kyseliny\n\nTyto látky podporují správnou funkci organismu.\n\n\nVhodné pro děti, sportovce i seniory\n\nDíky své výživové hodnotě je jehněčí maso vhodný pro širokou skupinu lidí.\n\nJe ideální například pro:\n\n• Děti\n• Sportovce\n• Seniory\n\nJe lehce stravitelné a dodává tělu potřebnou energii.\n\n\nVyužití v kuchyni\n\nJehněčí maso je velmi univerzální a lze jej připravit mnoha způsoby.\n\nOblíbené jsou například:\n\n• Pečené jehněčí\n• Jehněčí kotlety\n• Pomalu dušené maso\n• Grilované speciality\n\nJeho jemná chuť se skvěle hodí k bylinkám, česneku nebo kořenové zelenině.\n\nVýběrem farmářského jehněčího masa získáte produkt, který je chutný, zdravý a pochází z odpovědného hospodaření.',
        image: 'https://images.unsplash.com/photo-1606775973044-440b3b544e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWZmb2xrJTIwc2hlZXAlMjBsYW1icyUyMGdyYXppbmclMjBwYXN0dXJlJTIwZmFybXxlbnwxfHx8fDE3NzMxNTg5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: '4',
        title: 'Highland Cattle: Skotské plemeno s výjimečným masem',
        description: 'Highland Cattle patří mezi nejstarší plemena skotu na světě. Jeho historie sahá až do 6. století a původně pochází z drsných horských oblastí Skotska.',
        fullDescription: 'Highland Cattle patří mezi nejstarší plemena skotu na světě. Jeho historie sahá až do 6. století a původně pochází z drsných horských oblastí Skotska.\n\nToto plemeno si během staletí vybudovalo pověst mimořádně odolného skotu, který dokáže přežít i v náročných klimatických podmínkách.\n\n\nTypické znaky plemene\n\nCharakteristickým znakem Highland krav je jejich dlouhá hustá srst a výrazné rohy.\n\nSrst chrání zvířata před:\n\n• Větrem\n• Deštěm\n• Zimou\n\nDíky tomu mohou být venku po většinu roku.\n\n\nChov na naší farmě\n\nNa naší farmě chováme 13 krav tohoto plemene a plemenného býka jménem Emil.\n\nZvířata žijí ve volném prostředí, kde mají dostatek prostoru a přístup k přirozené potravě. Pasou se na pastvinách a jejich životní podmínky odpovídají tomu, jakým způsobem toto plemeno žilo po staletí.\n\n\nProč je maso Highland tak kvalitní\n\nKrávy Highland rostou pomaleji než běžná plemena chovaná v intenzivních velkochovech.\n\nDíky tomu má jejich maso:\n\n• Jemnější strukturu\n• Výraznější chuť\n\nMaso z Highland Cattle je ceněné především pro tyto vlastnosti:\n\n• Výrazná přirozená chuť\n• Jemná a šťavnatá struktura\n• Nižší obsah tuku\n• Nižší obsah cholesterolu\n• Vysoký obsah kvalitních bílkovin\n\nDalší výhodou je, že zvířata nejsou vystavena nadměrnému stresu.\n\n\nUdržitelné hospodaření\n\nChov tohoto plemene je také součástí filozofie udržitelného hospodaření.\n\nZvířata pomáhají:\n\n• Udržovat krajinu\n• Spásat travní porosty\n• Podporovat biologickou rovnováhu pastvin\n\nVýsledkem je maso, které je nejen chutné, ale pochází z prostředí, kde jsou zvířata chována s respektem k přírodě.',
        image: 'https://images.unsplash.com/photo-1582726744126-a27baff8e223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdobGFuZCUyMGNhdHRlJTIwY293cyUyMHBhc3R1cmV8ZW58MXx8fHwxNzczMTU5MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: '5',
        title: 'Suffolk: Plemeno, které dává výjimečné jehněčí maso',
        description: 'Plemeno Suffolk patří mezi nejznámější plemena ovcí chovaných na maso. Pochází z Anglie, kde bylo vyšlechtěno pro svou odolnost a vysokou kvalitu jehněčího masa.',
        fullDescription: 'Plemeno Suffolk patří mezi nejznámější plemena ovcí chovaných na maso. Pochází z Anglie, kde bylo vyšlechtěno pro svou odolnost a vysokou kvalitu jehněčího masa.\n\n\nTypický vzhled plemene\n\nOvce Suffolk jsou snadno rozpoznatelné.\n\nMají:\n\n• Světlé tělo\n• Černou hlavu\n• Černé nohy\n\nTento vzhled je pro plemeno velmi charakteristický.\n\n\nChov na pastvinách\n\nOvce Suffolk jsou velmi dobře přizpůsobené chovu na pastvinách. Dokážou prospívat i v náročnějších podmínkách.\n\nNa naší farmě tráví většinu roku venku, kde mají dostatek pohybu a přístup k čerstvé trávě.\n\n\nPřirozený chov bez chemie\n\nJehňata vyrůstají v klidném prostředí bez zbytečného stresu.\n\nNepoužívají se:\n\n• Růstové hormony\n• Preventivní antibiotika\n\nDíky tomu si maso zachovává přirozenou chuť i výživovou hodnotu.\n\n\nVýživové hodnoty jehněčího masa\n\nJehněčí maso ze Suffolk ovcí obsahuje:\n\n• Kvalitní bílkoviny\n• Železo\n• Zinek\n• Vitamíny skupiny B\n• Vitamín B12\n\nJehněčí maso je proto považováno za velmi zdravý druh masa.\n\n\nVyužití v kuchyni\n\nJehněčí maso je vhodné pro mnoho pokrmů, například:\n\n• Pomalu pečené jehněčí\n• Grilované kotlety\n• Dušené maso\n• Tradiční recepty s bylinkami\n\nDíky přirozenému chovu můžeme nabídnout jehněčí maso, které je nejen chutné, ale také kvalitní a pochází z prostředí, kde mají zvířata dobré životní podmínky.',
        image: 'https://images.unsplash.com/photo-1674295566109-ee25ccbd1216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWZmb2xrJTIwYnJlZWQlMjBzaGVlcCUyMGZhcm18ZW58MXx8fHwxNzczMTU5NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
    ],
  },
  'nasi-kone': {
    id: 'nasi-kone',
    label: 'Naši koně',
    hero: {
      title: 'Naši koně',
      subtitle: 'Seznamte se s našimi úžasnými koňmi. Každý má svou jedinečnou povahu a příběh.',
      image: 'figma:asset/2e3e71254bc7732e9f4a308d6897767da70c1bfd.png',
    },
    horses: [
      {
        id: '1',
        name: 'Běluška',
        breed: 'Welsh Pony',
        birthDate: '2018-06-01',
        color: 'Bílá',
        temperament: 'Klidná, trpělivá, laskavá',
        description: 'Běluška je naše nejmilejší kobylka, která má obzvláště ráda děti. Je to ideální kůň pro začátečníky díky své klidné povaze a trpělivosti.',
        specialSkills: ['Výuka začátečníků', 'Terapeutické ježdění', 'Přátelská ke všem dětem'],
        images: [
          'https://images.unsplash.com/photo-1676039201169-0fc8aa39ac61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGhvcnNlJTIwbWVhZG93fGVufDF8fHx8MTc3MjAyNzk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '2',
        name: 'Čert',
        breed: 'Fríský kůň',
        birthDate: '2016-06-01',
        color: 'Vraník',
        temperament: 'Majestátní, klidný, spolehlivý',
        description: 'Čert je majestátní fríský valach s úžasnou povahou. Navzdory svému impozantnímu vzhledu je velmi klidný a spolehlivý.',
        specialSkills: ['Pokročilá výuka', 'Drezura', 'Vyjížďky'],
        images: [
          'https://images.unsplash.com/photo-1656964353220-99aa5acc47e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvcnNlJTIwc3RhYmxlfGVufDF8fHx8MTc3MjAyNzk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '3',
        name: 'Hnědák',
        breed: 'Český teplokrevník',
        birthDate: '2014-06-01',
        color: 'Hnědák',
        temperament: 'Energický, přátelský, inteligentní',
        description: 'Hnědák je energický valach, který má rád dlouhé vyjížďky do přírody. Je vhodný pro pokročilejší jezdce, kteří zvládají všechny chody.',
        specialSkills: ['Dlouhé vyjížďky', 'Terénní ježdění', 'Cval v terénu'],
        images: [
          'https://images.unsplash.com/photo-1587778907607-d36fc21ac297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGhvcnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxOTMyNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '4',
        name: 'Zlatka',
        breed: 'Hafling',
        birthDate: '2020-06-01',
        color: 'Plavák',
        temperament: 'Hravá, energická, bystrá',
        description: 'Zlatka je mladá kobylka plemene hafling s krásnou hřívou. Je hravá a energická, ideální pro děti se zkušenostmi.',
        specialSkills: ['Kroužky pro pokročilé', 'Skoky', 'Terénní ježdění'],
        images: [
          'https://images.unsplash.com/photo-1732302073237-f677bbc0b48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZXMlMjBncmF6aW5nJTIwZmllbGR8ZW58MXx8fHwxNzcxOTU3MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '5',
        name: 'Rebel',
        breed: 'Quarter Horse',
        birthDate: '2017-06-01',
        color: 'Ryzák',
        temperament: 'Inteligentní, učenlivý, vyrovnaný',
        description: 'Rebel je americký quarter horse s výbornou povahou. Je velmi inteligentní a rychle se učí nové věci.',
        specialSkills: ['Western ježdění', 'Výuka pokročilých', 'Vyjížďky'],
        images: [
          'https://images.unsplash.com/photo-1760450994357-e84b95398be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYWN0aXZpdGllcyUyMGNoaWxkcmVufGVufDF8fHx8MTc3MjAyNzk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '6',
        name: 'Hvězdička',
        breed: 'Shetlandský pony',
        birthDate: '2011-06-01',
        color: 'Hnědák',
        temperament: 'Laskavá, přátelská, stabilní',
        description: 'Hvězdička je nejmenší člen naší stáje. Díky své velikosti je ideální pro ty nejmenší začátečníky.',
        specialSkills: ['Výuka nejmenších dětí', 'Vodění', 'Péče o poníka'],
        images: [
          'https://images.unsplash.com/photo-1759272193695-27d07d05c15f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJuJTIwc3RhYmxlJTIwcnVyYWx8ZW58MXx8fHwxNzcyMDI4MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
    ],
  },
  'o-nas': {
    id: 'o-nas',
    label: 'O nás',
    hero: {
      title: 'O nás',
      subtitle: 'Rodinná farma se srdcem pro koně a láskou k přírodě. Objevte náš příběh a hodnoty.',
      image: 'figma:asset/2e3e71254bc7732e9f4a308d6897767da70c1bfd.png',
    },
    story: {
      title: 'Náš příběh',
      content: `Jsme malá rodinná BIO farma. Zabýváme se chovem skotu plemene Highland cattle (Skotský náhorní skot), ovcí plemene Suffolk a chovu koní převážně plnokrevných plemen a málo početného plemene koní Achal-teke.

V našem stádě najdete koníky různých plemen, věku a povah. Děti, které k nám docházejí, pracují se všemi koňmi. Každý kůň je individuální a děti se učí, jak s každým koníkem pracovat, navázat s ním kontakt, tak aby spolu mohli spolupracovat jak v terénu, tak na jízdárně.

Nae stádečko je poskládáno z koní jezdeckých, chovných kobylek a staříků, kteří si užívají důchod na rozlehlých pastvinách.`,
      image: 'https://images.unsplash.com/photo-1731273800648-560bdcae7665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZXMlMjBncmF6aW5nJTIwZ3JlZW4lMjBtZWFkb3d8ZW58MXx8fHwxNzcyMDQ0MjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      yearsExperience: '15+',
    },
    values: [
      {
        id: '1',
        icon: 'Heart',
        title: 'Láska ke koním',
        description: 'Koně jsou naší vášní. Každý den se o ně staráme s láskou a respektem.',
      },
      {
        id: '2',
        icon: 'Users',
        title: 'Rodinný přístup',
        description: 'Jsme rodinná farma, kde se každý cítí jako doma. Vytváříme přátelskou atmosféru.',
      },
      {
        id: '3',
        icon: 'Leaf',
        title: 'Ekologický chov',
        description: 'Dbáme na ekologický přístup k hospodaření a péči o přírodu.',
      },
      {
        id: '4',
        icon: 'Award',
        title: 'Kvalitní výuka',
        description: 'Naši instruktoři mají dlouholeté zkušenosti a certifikace.',
      },
    ],
  },
  kontakt: {
    id: 'kontakt',
    label: 'Kontakt',
    hero: {
      title: 'Kontakt',
      subtitle: 'Máte dotazy? Rádi vám zodpovíme. Ozvěte se nám a domluvíme se!',
      image: 'figma:asset/2e3e71254bc7732e9f4a308d6897767da70c1bfd.png',
    },
    contact: {
      phone: '+420 605 279 222',
      email: 'farmapodjanovouhorou@seznam.cz',
      address: {
        street: 'Janův důl 123',
        city: 'Janov nad Nisou',
        zip: '468 11',
      },
      openingHours: 'Po - Pá: 9:00 - 18:00<br />So - Ne: 10:00 - 16:00',
      facebook: 'https://www.facebook.com/farmapodjanovouhorou',
      instagram: 'https://www.instagram.com/farmapodjanovouhorou',
    },
  },
  ochrana: {
    id: 'ochrana',
    label: 'Ochrana osobních údajů',
    title: 'Ochrana osobních údajů',
    sections: [
      {
        id: '1',
        title: 'Správce osobních údajů',
        content: `Správcem vašich osobních údajů je:

**Farma pod Janovou horou z.s.**
Janova Hora 466
763 12 Vizovice
IČ: 22644601

Email: farmapodjanovouhorou@seznam.cz
Telefon: +420 605 279 222`,
      },
      {
        id: '2',
        title: 'Jaké osobní údaje zpracováváme',
        content: 'V rámci poskytování našich služeb můžeme zpracovávat následující kategorie osobních údajů:',
        list: [
          '**Identifikační údaje:** jméno, příjmení, datum narození',
          '**Kontaktní údaje:** adresa, email, telefonní číslo',
          '**Údaje zákonných zástupců:** u dětí mladších 15 let',
          '**Zdravotní údaje:** relevantní informace pro bezpečné poskytování služeb (alergie, zdravotní omezení)',
        ],
      },
      {
        id: '3',
        title: 'Účel zpracování osobních údajů',
        content: 'Vaše osobní údaje zpracováváme za následujícími účely:',
        list: [
          'Poskytování jezdeckých služeb, táborů a kroužků',
          'Zajištění bezpečnosti účastníků',
          'Komunikace s klienty a zákonými zástupci',
          'Vyřizování objednávek a rezervací',
          'Plnění zákonných povinností',
        ],
      },
      {
        id: '4',
        title: 'Právní základ zpracování',
        content: 'Osobní údaje zpracováváme na základě:',
        list: [
          '**Plnění smlouvy** – pro poskytování objednaných služeb',
          '**Oprávněného zájmu** – pro zajištění bezpečnosti a komunikaci',
          '**Souhlasu** – pro marketingovou komunikaci',
          '**Plnění právní povinnosti** – pro účetní a daňové účely',
        ],
      },
      {
        id: '5',
        title: 'Doba uchovávání údajů',
        content: 'Osobní údaje uchováváme pouze po dobu nezbytně nutnou:',
        list: [
          'Po dobu trvání smluvního vztahu a následně po dobu stanovenou právními předpisy (typicky 3-10 let)',
          'Marketingové účely – do odvolání souhlasu',
        ],
      },
      {
        id: '6',
        title: 'Vaše práva',
        content: 'Jako subjekt údajů máte následující práva:',
        list: [
          '**Právo na přístup** k osobním údajům',
          '**Právo na opravu** nepřesných údajů',
          '**Právo na výmaz** údajů ("právo být zapomenut")',
          '**Právo na omezení zpracování**',
          '**Právo na přenositelnost** údajů',
          '**Právo vznést námitku** proti zpracování',
          '**Právo odvolat souhlas** se zpracováním',
          '**Právo podat stížnost** u Úřadu pro ochranu osobních údajů',
        ],
      },
      {
        id: '7',
        title: 'Zabezpečení údajů',
        content: 'Přijímáme vhodná technická a organizační opatření k ochraně vašich osobních údajů před neoprávněným přístupem, ztrátou nebo zničením. Přístup k osobním údajům mají pouze oprávněné osoby, které jsou vázány povinností mlčenlivosti.',
      },
      {
        id: '8',
        title: 'Kontakt',
        content: `Máte-li jakékoliv dotazy ohledně zpracování vašich osobních údajů nebo chcete uplatnit svá práva, kontaktujte nás:

Email: farmapodjanovouhorou@seznam.cz
Telefon: +420 605 279 222`,
      },
    ],
  },
  cookies: {
    id: 'cookies',
    label: 'Cookies',
    title: 'Zásady používání cookies',
    sections: [
      {
        id: '1',
        title: 'Co jsou cookies',
        content: `Cookies jsou malé textové soubory, které jsou ukládány do vašeho zařízení (počítač, smartphone, tablet) při návštěvě webových stránek. Cookies pomáhají webovým stránkám zapamatovat si informace o vaší návštěvě, jako jsou preferovaný jazyk a další nastavení.

Soubory cookies mohou usnadnit vaši příští návštěvu a zvýšit užitečnost webu pro vás.`,
      },
      {
        id: '2',
        title: 'Jak používáme cookies',
        content: 'Na našich webových stránkách používáme následující kategorie cookies:',
        subsections: [
          {
            title: 'Nezbytné cookies',
            content: `Tyto cookies jsou nezbytné pro správné fungování webu. Bez těchto cookies by web nemohl fungovat správně.

*Tyto cookies nelze vypnout.*`,
          },
          {
            title: 'Analytické cookies',
            content: `Tyto cookies nám pomáhají porozumět tomu, jak návštěvníci používají naše webové stránky, například které stránky navštěvují nejčastěji a zda dostávají chybové zprávy.

*Tyto cookies můžete odmítnout.*`,
          },
          {
            title: 'Marketingové cookies',
            content: `Tyto cookies se používají ke sledování návštěvníků napříč webovými stránkami. Záměrem je zobrazovat reklamy, které jsou relevantní a zajímavé pro jednotlivé uživatele.

*Tyto cookies můžete odmítnout.*`,
          },
        ],
      },
      {
        id: '3',
        title: 'Přehled používaných cookies',
        list: [
          '**session_id** (Nezbytné, Relace): Identifikace uživatelské relace',
          '**cookie_consent** (Nezbytné, 1 rok): Uložení souhlasu s cookies',
          '**_ga** (Analytické, 2 roky): Google Analytics',
          '**_fbp** (Marketingové, 3 měsíce): Facebook Pixel',
        ],
      },
      {
        id: '4',
        title: 'Jak ovládat cookies',
        content: `Máte možnost ovládat a/nebo odstranit cookies podle svého uvážení. Můžete odstranit všechny cookies, které jsou již ve vašem počítači uložené, a můžete nastavit většinu prohlížečů tak, aby jejich ukládání bylo zakázáno.

Pokud to uděláte, pravděpodobně budete muset ručně upravovat některé předvolby pokaždé, když navštívíte web, a některé služby a funkce nemusí fungovat.`,
        subsections: [
          {
            title: 'Správa cookies v prohlížečích:',
            list: [
              '**Google Chrome:** Nastavení → Soukromí a zabezpečení → Cookies a další data webů',
              '**Mozilla Firefox:** Možnosti → Soukromí a zabezpečení → Cookies a data stránek',
              '**Safari:** Předvolby → Soukromí → Cookies a data webových stránek',
              '**Microsoft Edge:** Nastavení → Cookies a oprávnění webu → Správa a odstranění cookies',
            ],
          },
        ],
      },
      {
        id: '5',
        title: 'Cookies třetích stran',
        content: `Na našich webových stránkách mohou být použity cookies třetích stran (např. Google Analytics, Facebook). Tyto třetí strany mohou používat cookies k analýze používání webu, zobrazování cílené reklamy nebo poskytování funkcí sociálních médií.

Nemáme kontrolu nad cookies třetích stran a jejich používání se řídí zásadami ochrany osobních údajů těchto třetích stran.`,
      },
      {
        id: '6',
        title: 'Kontakt',
        content: `Máte-li jakékoliv dotazy ohledně našich zásad používání cookies, kontaktujte nás:

Email: farmapodjanovouhorou@seznam.cz
Telefon: +420 605 279 222`,
      },
    ],
  },
  podminky: {
    id: 'podminky',
    label: 'Obchodní podmínky',
    title: 'Obchodní podmínky',
    sections: [
      {
        id: '1',
        title: 'Obecná ustanovení',
        content: `Tyto obchodní podmínky upravují vztahy mezi poskytovatelem služeb a zákazníky využívajícími služeb farmy.

**Poskytovatel služeb:**
Farma pod Janovou horou z.s.
Janova Hora 466
763 12 Vizovice
IČ: 22644601

Email: farmapodjanovouhorou@seznam.cz
Telefon: +420 605 279 222`,
      },
      {
        id: '2',
        title: 'Poskytované služby',
        content: 'Farma poskytuje následující služby:',
        list: [
          '**Jezdecké kroužky** - pravidelné lekce pro děti od 7 let',
          '**Jezdecké tábory** - příměstské i pobytové tábory během prázdnin',
          '**Jízda na koni** - vyjížďky, vycházky na vedeném koni, vodění na poníkovi',
          '**Akce na míru** - focení, svatby, oslavy, exkurze, přespání s koněm',
        ],
      },
      {
        id: '3',
        title: 'Objednávka a rezervace',
        content: `Služby je možné objednat prostřednictvím:

Objednávka je závazná po potvrzení ze strany poskytovatele a uhrazení zálohy nebo celé částky dle aktuální nabídky.`,
        list: [
          'Kontaktního formuláře na webových stránkách',
          'E-mailu na adresu farmapodjanovouhorou@seznam.cz',
          'Telefonicky na čísle +420 605 279 222',
        ],
      },
      {
        id: '4',
        title: 'Ceny a platební podmínky',
        content: `Ceny služeb jsou uvedeny v aktuální nabídce na webových stránkách. Platba je možná bankovním převodem na účet poskytovatele nebo hotově na místě (po předchozí dohodě).

V případě zrušení rezervace ze strany zákazníka méně než 24 hodin před termínem služby si poskytovatel vyhrazuje právo účtovat storno poplatek ve výši 50% z ceny služby.`,
      },
      {
        id: '5',
        title: 'Práva a povinnosti zákazníka',
        content: 'Zákazník je povinen:',
        list: [
          'Dodržovat pokyny instruktora a pravidla bezpečnosti',
          'Informovat poskytovatele o zdravotních omezeních nebo alergiích',
          'U dětí mladších 15 let poskytnout kontakt na zákonného zástupce',
          'Dostavit se na službu včas (5-10 minut před sjednaným termínem)',
        ],
      },
      {
        id: '6',
        title: 'Práva a povinnosti poskytovatele',
        content: `Poskytovatel je povinen zajistit kvalitní a bezpečné poskytování služeb, odborně vyškolené instruktory, vhodné jezdecké vybavení včetně přileb a informovat zákazníka o případných změnách termínu.

Poskytovatel si vyhrazuje právo odmítnout poskytnutí služby v případě nepříznivého počasí nebo jiných okolností ohrožujících bezpečnost.`,
      },
      {
        id: '7',
        title: 'Odpovědnost',
        content: 'Poskytovatel neodpovídá za:',
        list: [
          'Škody způsobené nedodržením pokynů instruktora',
          'Ztrátu nebo poškození osobních věcí zákazníka',
          'Zranění způsobená nesprávným chováním vůči koním',
        ],
      },
      {
        id: '8',
        title: 'Ochrana osobních údajů',
        content: 'Poskytovatel zpracovává osobní údaje zákazníků v souladu se zákonem o ochraně osobních údajů a GDPR. Více informací naleznete v dokumentu o ochraně osobních údajů.',
      },
      {
        id: '9',
        title: 'Závěrečná ustanovení',
        content: `Tyto obchodní podmínky nabývají účinnosti dnem jejich zveřejnění na webových stránkách. Poskytovatel si vyhrazuje právo tyto podmínky změnit.

V případě sporů se strany pokusí dosáhnout dohody smírnou cestou. Není-li to možné, jsou spory řešeny u místně příslušného soudu.`,
      },
      {
        id: '10',
        title: 'Kontakt',
        content: `Máte-li jakékoliv dotazy ohledně těchto obchodních podmínek, kontaktujte nás:

Email: farmapodjanovouhorou@seznam.cz
Telefon: +420 605 279 222`,
      },
    ],
  },
  reklamace: {
    id: 'reklamace',
    label: 'Reklamační řád',
    title: 'Reklamační řád',
    sections: [
      {
        id: '1',
        title: 'Úvodní ustanovení',
        content: `Tento reklamační řád upravuje podmínky a postup při uplatňování reklamací služeb poskytovaných Farmou pod Janovou horou z.s.

**Poskytovatel služeb:**
Farma pod Janovou horou z.s.
Janova Hora 466
763 12 Vizovice
IČ: 22644601

Email: farmapodjanovouhorou@seznam.cz
Telefon: +420 605 279 222`,
      },
      {
        id: '2',
        title: 'Práva zákazníka',
        content: 'Zákazník má právo reklamovat poskytnuté služby v případě, že:',
        list: [
          'Služba nebyla poskytnuta v dohodnutém rozsahu',
          'Služba neodpovídala dohodnuté kvalitě',
          'Služba nebyla poskytnuta v dohodnutém termínu',
          'Došlo k jiným vadám nebo nedostatkům při poskytování služby',
        ],
      },
      {
        id: '3',
        title: 'Postup reklamace',
        content: 'Reklamaci lze uplatnit následujícími způsoby:',
        list: [
          '**E-mailem** na adresu: farmapodjanovouhorou@seznam.cz',
          '**Telefonicky** na čísle: +420 605 279 222',
          '**Osobně** na adrese poskytovatele',
        ],
      },
      {
        id: '4',
        title: 'Lhůta pro uplatnění reklamace',
        content: `Reklamaci je nutné uplatnit **do 14 dnů od poskytnutí služby**.

U táborů a kroužků je možné reklamaci uplatnit nejpozději do 14 dnů od ukončení akce.`,
      },
      {
        id: '5',
        title: 'Náležitosti reklamace',
        content: 'Reklamace musí obsahovat:',
        list: [
          'Identifikační údaje zákazníka (jméno, příjmení, kontakt)',
          'Datum poskytnutí služby',
          'Popis vady nebo nedostatku',
          'Požadovaný způsob vyřízení reklamace',
        ],
      },
      {
        id: '6',
        title: 'Vyřízení reklamace',
        content: `Poskytovatel vyřídí reklamaci **do 30 dnů** od jejího doručení.

O výsledku reklamace bude zákazník informován e-mailem, telefonicky nebo písemně (na žádost zákazníka).`,
      },
      {
        id: '7',
        title: 'Způsoby vyřízení reklamace',
        content: 'V případě oprávněné reklamace může poskytovatel:',
        list: [
          '**Poskytnout náhradní službu** ve stejném rozsahu a kvalitě',
          '**Poskytnout slevu** z ceny poskytnuté služby',
          '**Vrátit celou částku** zaplacenou za službu',
          '**Nabídnout jinou formu kompenzace** po dohodě se zákazníkem',
        ],
      },
      {
        id: '8',
        title: 'Neoprávněná reklamace',
        content: 'Reklamace nebude uznána jako oprávněná v případě, že:',
        list: [
          'Zákazník nedodržel pokyny instruktora',
          'Zákazník porušil pravidla bezpečnosti',
          'Zákazník se dostavil pozdě nebo se nedostavil vůbec',
          'Služba nebyla poskytnuta z důvodu nepříznivého počasí (s nabídkou náhradního termínu)',
          'Zákazník zatajil důležité zdravotní informace',
        ],
      },
      {
        id: '9',
        title: 'Mimosoudní řešení sporů',
        content: 'V případě sporu, který se nepodaří vyřešit vzájemnou dohodou, má zákazník právo obrátit se na:',
        list: [
          '**Českou obchodní inspekci** (www.coi.cz)',
          '**Subjekt mimosoudního řešení spotřebitelských sporů**',
        ],
      },
      {
        id: '10',
        title: 'Závěrečná ustanovení',
        content: `Tento reklamační řád nabývá účinnosti dnem zveřejnění na webových stránkách.

Poskytovatel si vyhrazuje právo tento reklamační řád změnit.`,
      },
      {
        id: '11',
        title: 'Kontakt',
        content: `Pro uplatnění reklamace nebo dotazy ohledně reklamačního řádu kontaktujte:

Email: farmapodjanovouhorou@seznam.cz
Telefon: +420 605 279 222`,
      },
    ],
  },
  '404': {
    id: '404',
    label: '404',
    title: 'Stránka nenalezena',
    content: 'Omlouváme se, ale hledaná stránka neexistuje.',
  },
};