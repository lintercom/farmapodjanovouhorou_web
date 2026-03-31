// Default content for all pages - contains all current static data from the website
import { fixMojibakeDeep } from './encoding';

const defaultPageContentRaw: Record<string, any> = {
  domu: {
    id: 'domu',
    label: 'DomĹŻ',
    hero: {
      title: 'Farma pod Janovou horou',
      subtitle:
        'Rodinná farma ve Vizovicích ve Zlínském kraji — práce s dětmi a koňmi, jezdecké kroužky, tábory a vyjížďky v přírodě pod Janovou horou.',
      buttonText: 'NaĹˇe sluĹľby',
      buttonLink: '/sluzby',
      secondaryButtonText: 'Kontaktujte nĂˇs',
      secondaryButtonLink: '/kontakt',
      image: '/hero-placeholder.svg',
    },
    services: [
      {
        id: 'tabory',
        title: 'TĂˇbory',
        description: 'PrĂˇzdninovĂ© jezdeckĂ© tĂˇbory plnĂ© zĂˇbavy a dobrodruĹľstvĂ­. DÄ›ti se nauÄŤĂ­ zĂˇklady jĂ­zdy a pĂ©ÄŤe o konÄ›.',
        image: 'https://images.unsplash.com/photo-1752575382369-a290d1499d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBob3JzZSUyMGNhbXAlMjBraWRzfGVufDF8fHx8MTc3MjAyNzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        link: '/sluzby#tabory',
      },
      {
        id: 'krouzky',
        title: 'KrouĹľky',
        description: 'JezdeckĂ˝ krouĹľek je pro dÄ›ti od 7 let, kterĂ© majĂ­ rĂˇdy konÄ›, chtÄ›jĂ­ s nimi trĂˇvit ÄŤas, jezdit a peÄŤovat o nÄ›.',
        image: 'https://images.unsplash.com/photo-1766499431124-a8de024c5dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJpZGluZyUyMGhvcnNlc3xlbnwxfHx8fDE3NzIwMjc5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        link: '/sluzby#krouzky',
      },
      {
        id: 'vyjizdy',
        title: 'JĂ­zda na koni',
        description: 'NabĂ­zĂ­me jĂ­zdu na koni pro dÄ›ti i dospÄ›lĂ©, vyjĂ­ĹľÄŹky do pĹ™Ă­rody, vychĂˇzky na vedenĂ©m koni a vodÄ›nĂ­ na ponĂ­kovi.',
        image: 'https://images.unsplash.com/photo-1763130063474-1bee680a1463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHJpZGluZyUyMGxlc3NvbnxlbnwxfHx8fDE3NzIwMjc5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        link: '/sluzby#vyjizdy',
      },
      {
        id: 'akce-na-miru',
        title: 'Akce na mĂ­ru',
        description: 'NabĂ­zĂ­me speciĂˇlnĂ­ sluĹľby pro vaĹˇe akce - zapĹŻjÄŤenĂ­ konĂ­ na focenĂ­ a svatby, vozenĂ­ na oslavĂˇch a exkurze na farmÄ› pro Ĺˇkoly.',
        image: 'https://images.unsplash.com/photo-1628996084452-deb83cb04988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwc3BlY2lhbCUyMGV2ZW50cyUyMGhvcnNlJTIwcG9ueSUyMGtpZHMlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzMxMzYyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        link: '/sluzby#akce-na-miru',
      },
    ],
    horsesPreview: {
      title: 'NaĹˇi konÄ›',
      subtitle: 'Seznamte se s naĹˇimi ÄŤtyĹ™nohĂ˝mi pĹ™Ăˇteli',
      buttonText: 'Zobrazit vĹˇechny konÄ›',
      buttonLink: '/nasi-kone',
    },
    giftCard: {
      title: 'DĂˇrkovĂ˝ poukaz',
      subtitle: 'PotÄ›Ĺˇte svĂ© blĂ­zkĂ© nezapomenutelnĂ˝m zĂˇĹľitkem. DĂˇrkovĂ˝ poukaz na vyjĂ­ĹľÄŹku je ideĂˇlnĂ­ dĂˇrek pro milovnĂ­ky konĂ­ a pĹ™Ă­rody.',
      features: [
        {
          icon: 'Calendar',
          title: 'Platnost 12 mÄ›sĂ­cĹŻ',
          description: 'Dost ÄŤasu na vyuĹľitĂ­ dĂˇrku',
        },
        {
          icon: 'Heart',
          title: 'KrĂˇsnĂ© provedenĂ­',
          description: 'ZasĂ­lĂˇme poĹˇtou nebo e-mailem',
        },
        {
          icon: 'Sparkles',
          title: 'FlexibilnĂ­ hodnota',
          description: 'Vyberte si ÄŤĂˇstku dle pĹ™ĂˇnĂ­',
        },
      ],
      buttonText: 'Objednat dĂˇrkovĂ˝ poukaz',
      buttonLink: '/kontakt',
    },
    testimonials: {
      title: 'Co o nĂˇs Ĺ™Ă­kajĂ­',
      subtitle: 'PĹ™eÄŤtÄ›te si zkuĹˇenosti naĹˇich spokojenĂ˝ch klientĹŻ',
      items: [
        {
          id: '1',
          rating: 5,
          text: 'NaĹˇe dcera chodĂ­ na krouĹľek uĹľ druhĂ˝m rokem a je nadĹˇenĂˇ. InstruktoĹ™i jsou milĂ­, trpÄ›livĂ­ a hlavnÄ› majĂ­ rĂˇdi dÄ›ti i konÄ›. DÄ›kujeme!',
          authorName: 'Marie KovĂˇĹ™ovĂˇ',
          authorRole: 'Maminka ĂşÄŤastnice krouĹľku',
          authorInitials: 'MK',
        },
        {
          id: '2',
          rating: 5,
          text: 'LetnĂ­ tĂˇbor byl skvÄ›lĂ˝! Syn se nauÄŤil spoustu novĂ©ho, zĂ­skal vztah ke konĂ­m a hlavnÄ› si uĹľil spoustu zĂˇbavy s kamarĂˇdy. PĹ™Ă­ĹˇtĂ­ rok jedeme znovu!',
          authorName: 'Petr HorĂˇk',
          authorRole: 'TĂˇta ĂşÄŤastnĂ­ka tĂˇbora',
          authorInitials: 'PH',
        },
        {
          id: '3',
          rating: 5,
          text: 'KrĂˇsnĂ© prostĹ™edĂ­, milĂ­ lidĂ© a hlavnÄ› spokojenĂ© konÄ›. Dcera se tÄ›ĹˇĂ­ na kaĹľdou hodinu a doma mluvĂ­ jen o konĂ­ch. VĹ™ele doporuÄŤujeme!',
          authorName: 'Anna NovĂˇkovĂˇ',
          authorRole: 'Maminka ĂşÄŤastnice',
          authorInitials: 'AN',
        },
      ],
    },
    faq: {
      title: 'ÄŚasto kladenĂ© dotazy',
      subtitle: 'OdpovÄ›di na nejÄŤastÄ›jĹˇĂ­ otĂˇzky',
      items: [
        {
          id: '1',
          question: 'JakĂ© jsou podmĂ­nky pro rezervaci jezdeckĂ©ho tĂˇbora?',
          answer: 'TĂˇbory jsou urÄŤeny pro dÄ›ti od 8 do 15 let. PĹ™edchozĂ­ zkuĹˇenosti s koĹmi nejsou nutnĂ© â€“ mĂˇme skupiny pro zaÄŤĂˇteÄŤnĂ­ky i pokroÄŤilĂ©.',
        },
        {
          id: '2',
          question: 'Kolik dÄ›tĂ­ je v jednĂ© skupinÄ›?',
          answer: 'V krouĹľcĂ­ch i tĂˇborech pracujeme s malĂ˝mi skupinami maximĂˇlnÄ› 6 dÄ›tĂ­. To nĂˇm umoĹľĹuje vÄ›novat kaĹľdĂ©mu dĂ­tÄ›ti individuĂˇlnĂ­ pozornost.',
        },
        {
          id: '3',
          question: 'Je potĹ™eba mĂ­t vlastnĂ­ jezdeckĂ© vybavenĂ­?',
          answer: 'Ne, veĹˇkerĂ© zĂˇkladnĂ­ vybavenĂ­ vÄŤetnÄ› pĹ™ileb pĹŻjÄŤujeme. DoporuÄŤujeme pouze pohodlnĂ© obleÄŤenĂ­ a pevnou obuv.',
        },
        {
          id: '4',
          question: 'MĹŻĹľu pĹ™ijĂ­t na ukĂˇzkovou lekci?',
          answer: 'Ano, mĂˇme pravidelnĂ© dny otevĹ™enĂ˝ch dveĹ™Ă­, kde si mĹŻĹľete vyzkouĹˇet krĂˇtkou ukĂˇzkovou jĂ­zdu. Kontaktujte nĂˇs pro termĂ­ny.',
        },
        {
          id: '5',
          question: 'Jsou vyjĂ­ĹľÄŹky vhodnĂ© i pro zaÄŤĂˇteÄŤnĂ­ky?',
          answer: 'VyjĂ­ĹľÄŹky do terĂ©nu jsou urÄŤeny pouze pro pokroÄŤilĂ© jezdce, kteĹ™Ă­ zvlĂˇdajĂ­ vĹˇechny chody. Pro zaÄŤĂˇteÄŤnĂ­ky doporuÄŤujeme nejprve krouĹľky.',
        },
      ],
    },
  },
  sluzby: {
    id: 'sluzby',
    label: 'SluĹľby',
    hero: {
      title: 'NaĹˇe sluĹľby',
      subtitle: 'NabĂ­zĂ­me Ĺˇirokou ĹˇkĂˇlu aktivit pro dÄ›ti i dospÄ›lĂ©. Od jezdeckĂ˝ch krouĹľkĹŻ po letnĂ­ tĂˇbory a vĂ˝lety do pĹ™Ă­rody.',
      buttonText: 'Prozkoumat sluĹľby',
      buttonLink: '#tabory',
      secondaryButtonText: 'Kontaktujte nĂˇs',
      secondaryButtonLink: '/kontakt',
      image: '/hero-placeholder.svg',
    },
    services: [
      {
        id: 'tabory',
        title: 'JezdeckĂ© tĂˇbory',
        description: 'PrĂˇzdninovĂ© jezdeckĂ© tĂˇbory jsou ideĂˇlnĂ­ pro dÄ›ti, kterĂ© majĂ­ rĂˇdy konÄ› a pĹ™Ă­rodu. BÄ›hem tĂ˝dennĂ­ho pobytu se dÄ›ti nauÄŤĂ­ zĂˇklady jĂ­zdy, pĂ©ÄŤe o konÄ› a strĂˇvĂ­ spoustu ÄŤasu venku.',
        image: 'https://images.unsplash.com/photo-1752575382369-a290d1499d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBob3JzZSUyMGNhbXAlMjBraWRzfGVufDF8fHx8MTc3MjAyNzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        details: [
          {
            title: 'TermĂ­ny',
            description: 'ÄŚervenec a srpen, tĂ˝dennĂ­ turnusy',
          },
          {
            title: 'Pro koho',
            description: 'DÄ›ti od 8 do 15 let, zaÄŤĂˇteÄŤnĂ­ci i pokroÄŤilĂ­',
          },
          {
            title: 'Co zahrnuje',
            description: 'UbytovĂˇnĂ­, strava, dennĂ­ vĂ˝uka jĂ­zdy, pĂ©ÄŤe o konÄ›, veÄŤernĂ­ programy',
          },
        ],
        buttonText: 'Rezervovat tĂˇbor',
        buttonLink: '/kontakt?tab=tabor',
      },
      {
        id: 'krouzky',
        title: 'JezdeckĂ© krouĹľky',
        description: 'PravidelnĂ© jezdeckĂ© krouĹľky probĂ­hajĂ­ po celĂ˝ rok. DÄ›ti se uÄŤĂ­ jezdit, poznĂˇvajĂ­ konÄ› a jejich chovĂˇnĂ­, a rozvĂ­jejĂ­ zodpovÄ›dnost a vztah k pĹ™Ă­rodÄ›.',
        image: 'https://images.unsplash.com/photo-1766499431124-a8de024c5dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJpZGluZyUyMGhvcnNlc3xlbnwxfHx8fDE3NzIwMjc5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        details: [
          {
            title: 'Kdy',
            description: 'PondÄ›lĂ­ - PĂˇtek odpoledne, Sobota a nedÄ›le dopoledne',
          },
          {
            title: 'Skupiny',
            description: 'MalĂ© skupiny max. 6 dÄ›tĂ­, rozdÄ›lenĂ© dle ĂşrovnÄ›',
          },
          {
            title: 'Program',
            description: '1,5 hodiny: pĂ©ÄŤe o konÄ›, vĂ˝uka jĂ­zdy, volnĂ© jeĹľdÄ›nĂ­',
          },
        ],
        buttonText: 'Rezervovat krouĹľek',
        buttonLink: '/kontakt?tab=krouzek',
      },
      {
        id: 'vyjizdy',
        title: 'JĂ­zda na koni',
        description: 'NabĂ­zĂ­me jĂ­zdu na koni pro dÄ›ti i dospÄ›lĂ©, vyjĂ­ĹľÄŹky do pĹ™Ă­rody, vychĂˇzky na vedenĂ©m koni/ponĂ­kovi a vodÄ›nĂ­ na ponĂ­kovi pro nejmenĹˇĂ­ dÄ›ti.',
        image: 'https://images.unsplash.com/photo-1763130063474-1bee680a1463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHJpZGluZyUyMGxlc3NvbnxlbnwxfHx8fDE3NzIwMjc5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        details: [
          {
            title: 'VyjĂ­ĹľÄŹka do pĹ™Ă­rody',
            description: '60 minut - 600 KÄŤ',
          },
          {
            title: 'VychĂˇzka na vedenĂ©m koni/ponĂ­kovi',
            description: '30 minut - 350 KÄŤ\n60 minut - 600 KÄŤ',
          },
          {
            title: 'VodÄ›nĂ­ na ponĂ­kovi pro dÄ›ti',
            description: '30 minut - 350 KÄŤ',
          },
          {
            title: 'ProvoznĂ­ doba',
            description: 'PondÄ›lĂ­ aĹľ sobota (v nedÄ›li nejezdĂ­me)',
          },
          {
            title: 'DĹŻleĹľitĂ© informace',
            description: 'ProsĂ­me o pĹ™Ă­jezd 5-10 minut pĹ™edem z dĹŻvodu instrukcĂ­ a nastavenĂ­ pomĹŻcek. ÄŚas jĂ­zdy se poÄŤĂ­tĂˇ od domluvenĂ©ho ÄŤasu.',
          },
        ],
        buttonText: 'Rezervovat jĂ­zdu',
        buttonLink: '/kontakt?tab=vyjizdy',
      },
      {
        id: 'akce-na-miru',
        title: 'Akce na mĂ­ru',
        description: 'NabĂ­zĂ­me speciĂˇlnĂ­ sluĹľby ĹˇitĂ© na mĂ­ru vaĹˇim potĹ™ebĂˇm - zapĹŻjÄŤenĂ­ konĂ­ na focenĂ­ a svatby, vozenĂ­ dÄ›tĂ­ na oslavĂˇch, exkurze pro Ĺˇkoly a moĹľnost pĹ™espĂˇnĂ­ s vlastnĂ­m konÄ›m.',
        image: 'https://images.unsplash.com/photo-1628996084452-deb83cb04988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwc3BlY2lhbCUyMGV2ZW50cyUyMGhvcnNlJTIwcG9ueSUyMGtpZHMlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzMxMzYyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        details: [
          {
            title: 'ZapĹŻjÄŤenĂ­ konÄ› na focenĂ­',
            description: 'S vlastnĂ­m fotografem, u nĂˇs na farmÄ› nebo pĹ™ivezeme konÄ› k vĂˇm (doprava na mĂ­sto se pĹ™ipoÄŤĂ­tĂˇvĂˇ) - cena dohodou',
          },
          {
            title: 'ZapĹŻjÄŤenĂ­ konÄ› na svatbu',
            description: 'PĹ™Ă­jezd, focenĂ­, zapĹŻjÄŤenĂ­ konÄ› pro vĂˇĹˇ velkĂ˝ den (doprava na mĂ­sto se pĹ™ipoÄŤĂ­tĂˇvĂˇ) - cena dohodou',
          },
          {
            title: 'DÄ›tskĂ© oslavy - vozenĂ­ na ponĂ­kovi',
            description: 'PĹ™ijedeme povozit vaĹˇe dÄ›ti na oslavu (doprava se pĹ™ipoÄŤĂ­tĂˇvĂˇ) - cena dohodou',
          },
          {
            title: 'Exkurze na farmÄ› pro Ĺˇkolky a Ĺˇkoly',
            description: '80,- KÄŤ/dĂ­tÄ› (pedagogickĂ˝ doprovod zdarma). ProhlĂ­dka farmy, seznĂˇmenĂ­ s koĹmi a dalĹˇĂ­mi zvĂ­Ĺ™aty (oveÄŤky, krĂˇvy, kozy, krĂˇlĂ­ci, slepice). UkĂˇzka jak probĂ­hĂˇ den na farmÄ› a pĂ©ÄŤe o zvĂ­Ĺ™ata.',
          },
          {
            title: 'PĹ™espĂˇnĂ­ s vlastnĂ­m konÄ›m',
            description: 'PlĂˇnujete ÄŤundr s vlastnĂ­m konÄ›m v naĹˇem okolĂ­? NabĂ­zĂ­me moĹľnost vyuĹľĂ­t prostor pro pĹ™espĂˇnĂ­ a ohradu pro vaĹˇe konÄ› - cena dohodou',
          },
        ],
        buttonText: 'Kontaktujte nĂˇs',
        buttonLink: '/kontakt',
      },
    ],
  },
  blog: {
    id: 'blog',
    label: 'Blog',
    hero: {
      title: 'Blog',
      subtitle: 'ZjistÄ›te zajĂ­mavosti o farmĂˇĹ™skĂ©m ĹľivotÄ›, chovu zvĂ­Ĺ™at a pĹ™Ă­rodÄ› kolem nĂˇs.',
      image: '/hero-placeholder.svg',
    },
    events: [
      {
        id: '1',
        title: 'DomĂˇcĂ­ vejce z farmy: ProÄŤ jim dĂˇt pĹ™ednost?',
        description: 'DomĂˇcĂ­ vejce z farmy pĹ™edstavujĂ­ kvalitnĂ­ a pĹ™irozenou potravinu, kterĂˇ se vĂ˝raznÄ› liĹˇĂ­ od vajec z prĹŻmyslovĂ˝ch velkochovĹŻ. RozdĂ­l nenĂ­ jen v chuti, ale takĂ© v ÄŤerstvosti, vĂ˝ĹľivovĂ© hodnotÄ› a zpĹŻsobu chovu slepic. Pokud hledĂˇte opravdu kvalitnĂ­ vejce, kterĂˇ pochĂˇzĂ­ z ovÄ›Ĺ™enĂ©ho zdroje a jsou produktem ĹˇetrnĂ©ho hospodaĹ™enĂ­, domĂˇcĂ­ vejce z farmy jsou ideĂˇlnĂ­ volbou.',
        fullDescription: 'PĹ™irozenĂ˝ chov slepic ve volnĂ©m vĂ˝bÄ›hu\n\nNa farmĂˇch, kde jsou slepice chovĂˇny ve volnĂ©m vĂ˝bÄ›hu, majĂ­ zvĂ­Ĺ™ata mnohem pĹ™irozenÄ›jĹˇĂ­ podmĂ­nky pro Ĺľivot. Slepice majĂ­ dostatek prostoru, mohou se volnÄ› pohybovat po pastvinĂˇch a chovat se pĹ™irozenĂ˝m zpĹŻsobem.\n\nBÄ›hem dne si samy hledajĂ­ potravu â€“ zobou trĂˇvu, semena nebo drobnĂ˝ hmyz. Tento zpĹŻsob krmenĂ­ a pohybu mĂˇ velkĂ˝ vliv na kvalitu vajec. Vejce ze slepic, kterĂ© ĹľijĂ­ pĹ™irozenĂ˝m zpĹŻsobem, majĂ­ obvykle:\n\nâ€˘ TmavĹˇĂ­ a vĂ˝raznÄ›jĹˇĂ­ Ĺľloutek\nâ€˘ PevnÄ›jĹˇĂ­ skoĹ™Ăˇpku\nâ€˘ PlnÄ›jĹˇĂ­ a pĹ™irozenÄ›jĹˇĂ­ chuĹĄ\n\nPrĂˇvÄ› dĂ­ky tÄ›mto vlastnostem jsou farmĂˇĹ™skĂˇ vejce velmi cenÄ›nĂˇ mezi lidmi, kteĹ™Ă­ dbajĂ­ na kvalitnĂ­ stravu.\n\n\nÄŚerstvost, kterou v obchodÄ› ÄŤasto nenajdete\n\nJednou z nejvÄ›tĹˇĂ­ch vĂ˝hod domĂˇcĂ­ch vajec je jejich ÄŤerstvost. Vejce z farmy se ÄŤasto dostanou ke spotĹ™ebiteli bÄ›hem nÄ›kolika dnĂ­ od snesenĂ­. To znamenĂˇ, Ĺľe si zachovĂˇvajĂ­ maximĂˇlnĂ­ kvalitu i chuĹĄ.\n\nNaopak vejce z velkochovĹŻ mohou prochĂˇzet dlouhĂ˝m distribuÄŤnĂ­m Ĺ™etÄ›zcem. ÄŚasto putujĂ­ pĹ™es sklady, balĂ­rny a distribuÄŤnĂ­ centra, coĹľ mĹŻĹľe znamenat i nÄ›kolik tĂ˝dnĹŻ mezi snĹŻĹˇkou a prodejem v obchodÄ›.\n\nÄŚerstvĂˇ vejce majĂ­ nejen lepĹˇĂ­ chuĹĄ, ale takĂ© lepĹˇĂ­ vlastnosti pĹ™i vaĹ™enĂ­ nebo peÄŤenĂ­.\n\n\nVĂ˝ĹľivovĂ© hodnoty domĂˇcĂ­ch vajec\n\nDomĂˇcĂ­ vejce z volnĂ©ho chovu jsou velmi hodnotnou potravinou. DĂ­ky pĹ™irozenĂ©mu chovu slepic obsahujĂ­ ÄŤasto vĂ­ce Ĺľivin neĹľ vejce z prĹŻmyslovĂ˝ch chovĹŻ.\n\nMezi dĹŻleĹľitĂ© Ĺľiviny patĹ™Ă­ napĹ™Ă­klad:\n\nâ€˘ VitamĂ­n A, kterĂ˝ podporuje zdravĂ­ oÄŤĂ­\nâ€˘ VitamĂ­n D, dĹŻleĹľitĂ˝ pro zdravĂ© kosti\nâ€˘ VitamĂ­n E, kterĂ˝ pĹŻsobĂ­ jako silnĂ˝ antioxidant\nâ€˘ VitamĂ­ny skupiny B, kterĂ© podporujĂ­ metabolismus a energii\nâ€˘ KvalitnĂ­ bĂ­lkoviny, dĹŻleĹľitĂ© pro rĹŻst a regeneraci organismu\n\nDomĂˇcĂ­ vejce jsou takĂ© pĹ™irozenĂ˝m zdrojem omega-3 mastnĂ˝ch kyselin, kterĂ© podporujĂ­ zdravĂ­ srdce a mozku.\n\n\nLepĹˇĂ­ ĹľivotnĂ­ podmĂ­nky zvĂ­Ĺ™at\n\nVelkĂ˝ rozdĂ­l mezi farmĂˇĹ™skĂ˝mi a prĹŻmyslovĂ˝mi vejci je takĂ© v pĹ™Ă­stupu k chovu slepic. Na farmĂˇch nejsou slepice vystaveny stresu z pĹ™eplnÄ›nĂ˝ch hal nebo klecĂ­.\n\nMajĂ­ pĹ™irozenĂ˝ dennĂ­ reĹľim, pĹ™Ă­stup k venkovnĂ­mu prostĹ™edĂ­ a mohou se pohybovat tak, jak je pro nÄ› pĹ™irozenĂ©. Tyto podmĂ­nky majĂ­ pozitivnĂ­ vliv nejen na Ĺľivot zvĂ­Ĺ™at, ale takĂ© na kvalitu vajec.\n\n\nPodpora lokĂˇlnĂ­ch farmĂˇĹ™ĹŻ\n\nKdyĹľ si koupĂ­te domĂˇcĂ­ vejce z farmy, podporujete tĂ­m lokĂˇlnĂ­ zemÄ›dÄ›lstvĂ­ a menĹˇĂ­ hospodĂˇĹ™stvĂ­. PenĂ­ze zĹŻstĂˇvajĂ­ v regionu a pomĂˇhajĂ­ udrĹľovat farmy, kterĂ© hospodaĹ™Ă­ ĹˇetrnÄ›ji k pĹ™Ă­rodÄ›.\n\nDomĂˇcĂ­ vejce jsou proto ideĂˇlnĂ­ volbou pro kaĹľdĂ©ho, kdo hledĂˇ:\n\nâ€˘ KvalitnĂ­ a ÄŤerstvĂ© potraviny\nâ€˘ PĹ™irozenĂ˝ zpĹŻsob chovu zvĂ­Ĺ™at\nâ€˘ VyĹˇĹˇĂ­ vĂ˝Ĺľivovou hodnotu\nâ€˘ LepĹˇĂ­ chuĹĄ\nâ€˘ Podporu lokĂˇlnĂ­ farmy\n\nJakmile jednou ochutnĂˇte opravdu ÄŤerstvĂˇ vejce z farmy, rozdĂ­l oproti bÄ›ĹľnĂ˝m vejcĂ­m z obchodĹŻ poznĂˇte tĂ©mÄ›Ĺ™ okamĹľitÄ›.',
        image: 'https://images.unsplash.com/photo-1585355611266-f01530088d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZhcm0lMjBjaGlja2VuJTIwZWdncyUyMGJhc2tldHxlbnwxfHx8fDE3NzMxNTE1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: '2',
        title: 'HovÄ›zĂ­ maso z farmy: ChuĹĄ, kterĂˇ se poznĂˇ',
        description: 'HovÄ›zĂ­ maso z farmy se vyznaÄŤuje pĹ™edevĹˇĂ­m svou pĹ™irozenou chutĂ­, kvalitou a zpĹŻsobem chovu zvĂ­Ĺ™at. Na rozdĂ­l od prĹŻmyslovĂ© produkce jsou krĂˇvy chovĂˇny v pĹ™irozenĂ©m prostĹ™edĂ­, kde majĂ­ dostatek prostoru, pohybu a kvalitnĂ­ pastu.',
        fullDescription: 'HovÄ›zĂ­ maso z plemene Highland Cattle\n\nNa naĹˇĂ­ farmÄ› pochĂˇzĂ­ hovÄ›zĂ­ maso z plemene Highland Cattle, kterĂ© je znĂˇmĂ© svou odolnostĂ­, pomalĂ˝m rĹŻstem a vĂ˝bornou kvalitou masa.\n\nToto plemeno pochĂˇzĂ­ ze Skotska a je pĹ™izpĹŻsobeno chovu v pĹ™Ă­rodnĂ­ch podmĂ­nkĂˇch. ZvĂ­Ĺ™ata trĂˇvĂ­ vÄ›tĹˇinu roku na pastvinĂˇch, kde majĂ­ pĹ™Ă­stup k pĹ™irozenĂ© potravÄ›.\n\nTento zpĹŻsob chovu mĂˇ zĂˇsadnĂ­ vliv na chuĹĄ a strukturu masa.\n\n\nZrĂˇnĂ­ masa pro lepĹˇĂ­ chuĹĄ\n\nVelkou roli v kvalitÄ› hovÄ›zĂ­ho masa hraje takĂ© jeho zrĂˇnĂ­. Po porĂˇĹľce nechĂˇvĂˇme maso zrĂˇt pĹ™ibliĹľnÄ› 14 dnĂ­.\n\nBÄ›hem tohoto procesu dochĂˇzĂ­ k pĹ™irozenĂ©mu zmÄ›kÄŤenĂ­ svalovĂ˝ch vlĂˇken. VĂ˝sledkem je maso, kterĂ© je:\n\nâ€˘ KĹ™ehÄŤĂ­\nâ€˘ Ĺ ĹĄavnatÄ›jĹˇĂ­\nâ€˘ ChuĹĄovÄ› vĂ˝raznÄ›jĹˇĂ­\n\nZrĂˇnĂ­ masa je dĹŻleĹľitĂ˝m krokem, kterĂ˝ vĂ˝raznÄ› zvyĹˇuje jeho gastronomickou kvalitu.\n\n\nNutriÄŤnĂ­ hodnoty farmĂˇĹ™skĂ©ho hovÄ›zĂ­ho masa\n\nFarmĂˇĹ™skĂ© hovÄ›zĂ­ maso je takĂ© velmi hodnotnĂ© z hlediska vĂ˝Ĺľivy. Obsahuje napĹ™Ă­klad:\n\nâ€˘ KvalitnĂ­ bĂ­lkoviny\nâ€˘ Ĺ˝elezo dĹŻleĹľitĂ© pro tvorbu ÄŤervenĂ˝ch krvinek\nâ€˘ VitamĂ­n B12 podporujĂ­cĂ­ nervovou soustavu\nâ€˘ Zinek podporujĂ­cĂ­ imunitnĂ­ systĂ©m\nâ€˘ DalĹˇĂ­ vitamĂ­ny skupiny B\n\nTyto Ĺľiviny jsou dĹŻleĹľitĂ© pro sprĂˇvnĂ© fungovĂˇnĂ­ organismu.\n\n\nChov bez stresu a chemie\n\nDalĹˇĂ­ vĂ˝hodou farmĂˇĹ™skĂ©ho chovu je, Ĺľe zvĂ­Ĺ™ata nejsou vystavena nadmÄ›rnĂ©mu stresu. Stres totiĹľ mĹŻĹľe negativnÄ› ovlivnit kvalitu masa.\n\nKlidnĂ© prostĹ™edĂ­, pĹ™irozenĂ˝ pohyb a kvalitnĂ­ pastva majĂ­ pozitivnĂ­ vliv nejen na Ĺľivot zvĂ­Ĺ™at, ale i na vĂ˝slednou kvalitu masa.\n\n\nSmÄ›snĂ˝ balĂ­ÄŤek hovÄ›zĂ­ho masa\n\nHovÄ›zĂ­ maso nabĂ­zĂ­me ve formÄ› smÄ›snĂ©ho balĂ­ÄŤku o hmotnosti pĹ™ibliĹľnÄ› 8â€“10 kg. BalĂ­ÄŤek obsahuje rĹŻznĂ© ÄŤĂˇsti masa, aby bylo moĹľnĂ© pĹ™ipravit rĹŻznĂ© druhy jĂ­del.\n\nObvykle obsahuje napĹ™Ă­klad:\n\nâ€˘ Krk\nâ€˘ KliĹľku\nâ€˘ Ĺ˝ebro\nâ€˘ PodpleÄŤĂ­\nâ€˘ MletĂ© maso\nâ€˘ Steaky\n\nKaĹľdĂ˝ kus masa je vakuovÄ› balenĂ˝ a oznaÄŤenĂ˝. Porce jsou baleny pĹ™ibliĹľnÄ› po 500 gramech, coĹľ je ideĂˇlnĂ­ velikost pro domĂˇcĂ­ vaĹ™enĂ­ i skladovĂˇnĂ­ v mrazĂˇku.\n\nFarmĂˇĹ™skĂ© hovÄ›zĂ­ maso je skvÄ›lou volbou pro kaĹľdĂ©ho, kdo:\n\nâ€˘ Chce znĂˇt pĹŻvod svĂ©ho jĂ­dla\nâ€˘ Preferuje maso bez hormonĹŻ a antibiotik\nâ€˘ HledĂˇ kvalitnĂ­ zdroj bĂ­lkovin\nâ€˘ OcenĂ­ pĹ™irozenou chuĹĄ a kvalitu\n\nChuĹĄ hovÄ›zĂ­ho masa z farmy je vĂ˝raznÄ›jĹˇĂ­ a plnÄ›jĹˇĂ­ neĹľ u bÄ›ĹľnĂ©ho masa z velkochovĹŻ.',
        image: 'https://images.unsplash.com/photo-1764783981480-8d768384dd97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdobGFuZCUyMGNhdHRsZSUyMGZhcm0lMjBwYXN0dXJlfGVufDF8fHx8MTc3MzE1Nzg1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: '3',
        title: 'JehnÄ›ÄŤĂ­ maso z farmy: ChuĹĄ tradice a zdravĂ­',
        description: 'JehnÄ›ÄŤĂ­ maso patĹ™Ă­ mezi nejzdravÄ›jĹˇĂ­ druhy masa a mĂˇ dlouhou tradici v mnoha kuchynĂ­ch po celĂ©m svÄ›tÄ›. Je cenÄ›nĂ© pro svou jemnou chuĹĄ, vysokou vĂ˝Ĺľivovou hodnotu a snadnou stravitelnost.',
        fullDescription: 'JehnÄ›ÄŤĂ­ maso z plemene Suffolk\n\nNa naĹˇĂ­ farmÄ› pochĂˇzĂ­ jehnÄ›ÄŤĂ­ maso z plemene Suffolk, kterĂ© je znĂˇmĂ© svou kvalitou masa a dobrĂ˝mi vlastnostmi pro chov na pastvinĂˇch.\n\nJehĹata vyrĹŻstajĂ­ ve volnĂ© pĹ™Ă­rodÄ› a vÄ›tĹˇinu Ĺľivota trĂˇvĂ­ na pastvinĂˇch. MajĂ­ pĹ™irozenĂ˝ pohyb a pĹ™Ă­stup k ÄŤerstvĂ© trĂˇvÄ›.\n\nTento zpĹŻsob chovu mĂˇ zĂˇsadnĂ­ vliv na kvalitu masa.\n\n\nPĹ™irozenĂ˝ chov bez stresu\n\nZvĂ­Ĺ™ata nejsou vystavena stresu ani intenzivnĂ­mu vĂ˝krmu. DĂ­ky tomu si maso zachovĂˇvĂˇ svou pĹ™irozenou strukturu i chuĹĄ.\n\nNa farmÄ› se nepouĹľĂ­vajĂ­ rĹŻstovĂ© hormony ani preventivnĂ­ antibiotika.\n\n\nVĂ˝ĹľivovĂ© hodnoty jehnÄ›ÄŤĂ­ho masa\n\nJehnÄ›ÄŤĂ­ maso obsahuje mnoho dĹŻleĹľitĂ˝ch Ĺľivin, napĹ™Ă­klad:\n\nâ€˘ VitamĂ­ny skupiny B (zejmĂ©na B12)\nâ€˘ Ĺ˝elezo\nâ€˘ Zinek\nâ€˘ KvalitnĂ­ bĂ­lkoviny\nâ€˘ NenasycenĂ© mastnĂ© kyseliny\n\nTyto lĂˇtky podporujĂ­ sprĂˇvnou funkci organismu.\n\n\nVhodnĂ© pro dÄ›ti, sportovce i seniory\n\nDĂ­ky svĂ© vĂ˝ĹľivovĂ© hodnotÄ› je jehnÄ›ÄŤĂ­ maso vhodnĂ© pro Ĺˇirokou skupinu lidĂ­.\n\nJe ideĂˇlnĂ­ napĹ™Ă­klad pro:\n\nâ€˘ DÄ›ti\nâ€˘ Sportovce\nâ€˘ Seniory\n\nJe lehce stravitelnĂ© a dodĂˇvĂˇ tÄ›lu potĹ™ebnou energii.\n\n\nVyuĹľitĂ­ v kuchyni\n\nJehnÄ›ÄŤĂ­ maso je velmi univerzĂˇlnĂ­ a lze jej pĹ™ipravit mnoha zpĹŻsoby.\n\nOblĂ­benĂ© jsou napĹ™Ă­klad:\n\nâ€˘ PeÄŤenĂ© jehnÄ›ÄŤĂ­\nâ€˘ JehnÄ›ÄŤĂ­ kotlety\nâ€˘ Pomalu duĹˇenĂ© maso\nâ€˘ GrilovanĂ© speciality\n\nJeho jemnĂˇ chuĹĄ se skvÄ›le hodĂ­ k bylinkĂˇm, ÄŤesneku nebo koĹ™enovĂ© zeleninÄ›.\n\nVĂ˝bÄ›rem farmĂˇĹ™skĂ©ho jehnÄ›ÄŤĂ­ho masa zĂ­skĂˇte produkt, kterĂ˝ je chutnĂ˝, zdravĂ˝ a pochĂˇzĂ­ z odpovÄ›dnĂ©ho hospodaĹ™enĂ­.',
        image: 'https://images.unsplash.com/photo-1606775973044-440b3b544e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWZmb2xrJTIwc2hlZXAlMjBsYW1icyUyMGdyYXppbmclMjBwYXN0dXJlJTIwZmFybXxlbnwxfHx8fDE3NzMxNTg5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: '4',
        title: 'Highland Cattle: SkotskĂ© plemeno s vĂ˝jimeÄŤnĂ˝m masem',
        description: 'Highland Cattle patĹ™Ă­ mezi nejstarĹˇĂ­ plemena skotu na svÄ›tÄ›. Jeho historie sahĂˇ aĹľ do 6. stoletĂ­ a pĹŻvodnÄ› pochĂˇzĂ­ z drsnĂ˝ch horskĂ˝ch oblastĂ­ Skotska.',
        fullDescription: 'Highland Cattle patĹ™Ă­ mezi nejstarĹˇĂ­ plemena skotu na svÄ›tÄ›. Jeho historie sahĂˇ aĹľ do 6. stoletĂ­ a pĹŻvodnÄ› pochĂˇzĂ­ z drsnĂ˝ch horskĂ˝ch oblastĂ­ Skotska.\n\nToto plemeno si bÄ›hem staletĂ­ vybudovalo povÄ›st mimoĹ™ĂˇdnÄ› odolnĂ©ho skotu, kterĂ˝ dokĂˇĹľe pĹ™eĹľĂ­t i v nĂˇroÄŤnĂ˝ch klimatickĂ˝ch podmĂ­nkĂˇch.\n\n\nTypickĂ© znaky plemene\n\nCharakteristickĂ˝m znakem Highland krav je jejich dlouhĂˇ hustĂˇ srst a vĂ˝raznĂ© rohy.\n\nSrst chrĂˇnĂ­ zvĂ­Ĺ™ata pĹ™ed:\n\nâ€˘ VÄ›trem\nâ€˘ DeĹˇtÄ›m\nâ€˘ Zimou\n\nDĂ­ky tomu mohou bĂ˝t venku po vÄ›tĹˇinu roku.\n\n\nChov na naĹˇĂ­ farmÄ›\n\nNa naĹˇĂ­ farmÄ› chovĂˇme 13 krav tohoto plemene a plemennĂ©ho bĂ˝ka jmĂ©nem Emil.\n\nZvĂ­Ĺ™ata ĹľijĂ­ ve volnĂ©m prostĹ™edĂ­, kde majĂ­ dostatek prostoru a pĹ™Ă­stup k pĹ™irozenĂ© potravÄ›. Pasou se na pastvinĂˇch a jejich ĹľivotnĂ­ podmĂ­nky odpovĂ­dajĂ­ tomu, jakĂ˝m zpĹŻsobem toto plemeno Ĺľilo po staletĂ­.\n\n\nProÄŤ je maso Highland tak kvalitnĂ­\n\nKrĂˇvy Highland rostou pomaleji neĹľ bÄ›ĹľnĂˇ plemena chovanĂˇ v intenzivnĂ­ch velkochovech.\n\nDĂ­ky tomu mĂˇ jejich maso:\n\nâ€˘ JemnÄ›jĹˇĂ­ strukturu\nâ€˘ VĂ˝raznÄ›jĹˇĂ­ chuĹĄ\n\nMaso z Highland Cattle je cenÄ›nĂ© pĹ™edevĹˇĂ­m pro tyto vlastnosti:\n\nâ€˘ VĂ˝raznĂˇ pĹ™irozenĂˇ chuĹĄ\nâ€˘ JemnĂˇ a ĹˇĹĄavnatĂˇ struktura\nâ€˘ NiĹľĹˇĂ­ obsah tuku\nâ€˘ NiĹľĹˇĂ­ obsah cholesterolu\nâ€˘ VysokĂ˝ obsah kvalitnĂ­ch bĂ­lkovin\n\nDalĹˇĂ­ vĂ˝hodou je, Ĺľe zvĂ­Ĺ™ata nejsou vystavena nadmÄ›rnĂ©mu stresu.\n\n\nUdrĹľitelnĂ© hospodaĹ™enĂ­\n\nChov tohoto plemene je takĂ© souÄŤĂˇstĂ­ filozofie udrĹľitelnĂ©ho hospodaĹ™enĂ­.\n\nZvĂ­Ĺ™ata pomĂˇhajĂ­:\n\nâ€˘ UdrĹľovat krajinu\nâ€˘ SpĂˇsat travnĂ­ porosty\nâ€˘ Podporovat biologickou rovnovĂˇhu pastvin\n\nVĂ˝sledkem je maso, kterĂ© je nejen chutnĂ©, ale pochĂˇzĂ­ z prostĹ™edĂ­, kde jsou zvĂ­Ĺ™ata chovĂˇna s respektem k pĹ™Ă­rodÄ›.',
        image: 'https://images.unsplash.com/photo-1582726744126-a27baff8e223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdobGFuZCUyMGNhdHRsZSUyMHNjb3R0aXNoJTIwY293cyUyMHBhc3R1cmV8ZW58MXx8fHwxNzczMTU5MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: '5',
        title: 'Suffolk: Plemeno, kterĂ© dĂˇvĂˇ vĂ˝jimeÄŤnĂ© jehnÄ›ÄŤĂ­ maso',
        description: 'Plemeno Suffolk patĹ™Ă­ mezi nejznĂˇmÄ›jĹˇĂ­ plemena ovcĂ­ chovanĂ˝ch na maso. PochĂˇzĂ­ z Anglie, kde bylo vyĹˇlechtÄ›no pro svou odolnost a vysokou kvalitu jehnÄ›ÄŤĂ­ho masa.',
        fullDescription: 'Plemeno Suffolk patĹ™Ă­ mezi nejznĂˇmÄ›jĹˇĂ­ plemena ovcĂ­ chovanĂ˝ch na maso. PochĂˇzĂ­ z Anglie, kde bylo vyĹˇlechtÄ›no pro svou odolnost a vysokou kvalitu jehnÄ›ÄŤĂ­ho masa.\n\n\nTypickĂ˝ vzhled plemene\n\nOvce Suffolk jsou snadno rozpoznatelnĂ©.\n\nMajĂ­:\n\nâ€˘ SvÄ›tlĂ© tÄ›lo\nâ€˘ ÄŚernou hlavu\nâ€˘ ÄŚernĂ© nohy\n\nTento vzhled je pro plemeno velmi charakteristickĂ˝.\n\n\nChov na pastvinĂˇch\n\nOvce Suffolk jsou velmi dobĹ™e pĹ™izpĹŻsobenĂ© chovu na pastvinĂˇch. DokĂˇĹľou prospĂ­vat i v nĂˇroÄŤnÄ›jĹˇĂ­ch podmĂ­nkĂˇch.\n\nNa naĹˇĂ­ farmÄ› trĂˇvĂ­ vÄ›tĹˇinu roku venku, kde majĂ­ dostatek pohybu a pĹ™Ă­stup k ÄŤerstvĂ© trĂˇvÄ›.\n\n\nPĹ™irozenĂ˝ chov bez chemie\n\nJehĹata vyrĹŻstajĂ­ v klidnĂ©m prostĹ™edĂ­ bez zbyteÄŤnĂ©ho stresu.\n\nNepouĹľĂ­vajĂ­ se:\n\nâ€˘ RĹŻstovĂ© hormony\nâ€˘ PreventivnĂ­ antibiotika\n\nDĂ­ky tomu si maso zachovĂˇvĂˇ pĹ™irozenou chuĹĄ i vĂ˝Ĺľivovou hodnotu.\n\n\nVĂ˝ĹľivovĂ© hodnoty jehnÄ›ÄŤĂ­ho masa\n\nJehnÄ›ÄŤĂ­ maso ze Suffolk ovcĂ­ obsahuje:\n\nâ€˘ KvalitnĂ­ bĂ­lkoviny\nâ€˘ Ĺ˝elezo\nâ€˘ Zinek\nâ€˘ VitamĂ­ny skupiny B\nâ€˘ VitamĂ­n B12\n\nJehnÄ›ÄŤĂ­ maso je proto povaĹľovĂˇno za velmi zdravĂ˝ druh masa.\n\n\nVyuĹľitĂ­ v kuchyni\n\nJehnÄ›ÄŤĂ­ maso je vhodnĂ© pro mnoho pokrmĹŻ, napĹ™Ă­klad:\n\nâ€˘ Pomalu peÄŤenĂ© jehnÄ›ÄŤĂ­\nâ€˘ GrilovanĂ© kotlety\nâ€˘ DuĹˇenĂ© maso\nâ€˘ TradiÄŤnĂ­ recepty s bylinkami\n\nDĂ­ky pĹ™irozenĂ©mu chovu mĹŻĹľeme nabĂ­dnout jehnÄ›ÄŤĂ­ maso, kterĂ© je nejen chutnĂ©, ale takĂ© kvalitnĂ­ a pochĂˇzĂ­ z prostĹ™edĂ­, kde majĂ­ zvĂ­Ĺ™ata dobrĂ© ĹľivotnĂ­ podmĂ­nky.',
        image: 'https://images.unsplash.com/photo-1674295566109-ee25ccbd1216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWZmb2xrJTIwYnJlZWQlMjBzaGVlcCUyMGZhcm18ZW58MXx8fHwxNzczMTU5NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
    ],
  },
  'nasi-kone': {
    id: 'nasi-kone',
    label: 'NaĹˇi konÄ›',
    hero: {
      title: 'NaĹˇi konÄ›',
      subtitle: 'Seznamte se s naĹˇimi ĂşĹľasnĂ˝mi koĹmi. KaĹľdĂ˝ mĂˇ svou jedineÄŤnou povahu a pĹ™Ă­bÄ›h.',
      image: '/hero-placeholder.svg',
    },
    horses: [
      {
        id: '1',
        name: 'BÄ›luĹˇka',
        breed: 'Welsh Pony',
        birthDate: '2018-06-01',
        color: 'BĂ­lĂˇ',
        temperament: 'KlidnĂˇ, trpÄ›livĂˇ, laskavĂˇ',
        description: 'BÄ›luĹˇka je naĹˇe nejmilejĹˇĂ­ kobylka, kterĂˇ mĂˇ obzvlĂˇĹˇtÄ› rĂˇda dÄ›ti. Je to ideĂˇlnĂ­ kĹŻĹ pro zaÄŤĂˇteÄŤnĂ­ky dĂ­ky svĂ© klidnĂ© povaze a trpÄ›livosti.',
        specialSkills: ['VĂ˝uka zaÄŤĂˇteÄŤnĂ­kĹŻ', 'TerapeutickĂ© jeĹľdÄ›nĂ­', 'PĹ™ĂˇtelskĂˇ ke vĹˇem dÄ›tem'],
        images: [
          'https://images.unsplash.com/photo-1676039201169-0fc8aa39ac61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGhvcnNlJTIwbWVhZG93fGVufDF8fHx8MTc3MjAyNzk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '2',
        name: 'ÄŚert',
        breed: 'FrĂ­skĂ˝ kĹŻĹ',
        birthDate: '2016-06-01',
        color: 'VranĂ­k',
        temperament: 'MajestĂˇtnĂ­, klidnĂ˝, spolehlivĂ˝',
        description: 'ÄŚert je majestĂˇtnĂ­ frĂ­skĂ˝ valach s ĂşĹľasnou povahou. Navzdory svĂ©mu impozantnĂ­mu vzhledu je velmi klidnĂ˝ a spolehlivĂ˝.',
        specialSkills: ['PokroÄŤilĂˇ vĂ˝uka', 'Drezura', 'VyjĂ­ĹľÄŹky'],
        images: [
          'https://images.unsplash.com/photo-1656964353220-99aa5acc47e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvcnNlJTIwc3RhYmxlfGVufDF8fHx8MTc3MjAyNzk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '3',
        name: 'HnÄ›dĂˇk',
        breed: 'ÄŚeskĂ˝ teplokrevnĂ­k',
        birthDate: '2014-06-01',
        color: 'HnÄ›dĂˇk',
        temperament: 'EnergickĂ˝, pĹ™ĂˇtelskĂ˝, inteligentnĂ­',
        description: 'HnÄ›dĂˇk je energickĂ˝ valach, kterĂ˝ mĂˇ rĂˇd dlouhĂ© vyjĂ­ĹľÄŹky do pĹ™Ă­rody. Je vhodnĂ˝ pro pokroÄŤilejĹˇĂ­ jezdce, kteĹ™Ă­ zvlĂˇdajĂ­ vĹˇechny chody.',
        specialSkills: ['DlouhĂ© vyjĂ­ĹľÄŹky', 'TerĂ©nnĂ­ jeĹľdÄ›nĂ­', 'Cval v terĂ©nu'],
        images: [
          'https://images.unsplash.com/photo-1587778907607-d36fc21ac297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGhvcnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxOTMyNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '4',
        name: 'Zlatka',
        breed: 'Hafling',
        birthDate: '2020-06-01',
        color: 'PlavĂˇk',
        temperament: 'HravĂˇ, energickĂˇ, bystrĂˇ',
        description: 'Zlatka je mladĂˇ kobylka plemene hafling s krĂˇsnou hĹ™Ă­vou. Je hravĂˇ a energickĂˇ, ideĂˇlnĂ­ pro dÄ›ti se zkuĹˇenostmi.',
        specialSkills: ['KrouĹľky pro pokroÄŤilĂ©', 'Skoky', 'TerĂ©nnĂ­ jeĹľdÄ›nĂ­'],
        images: [
          'https://images.unsplash.com/photo-1732302073237-f677bbc0b48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZXMlMjBncmF6aW5nJTIwZmllbGR8ZW58MXx8fHwxNzcxOTU3MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '5',
        name: 'Rebel',
        breed: 'Quarter Horse',
        birthDate: '2017-06-01',
        color: 'RyzĂˇk',
        temperament: 'InteligentnĂ­, uÄŤenlivĂ˝, vyrovnanĂ˝',
        description: 'Rebel je americkĂ˝ quarter horse s vĂ˝bornou povahou. Je velmi inteligentnĂ­ a rychle se uÄŤĂ­ novĂ© vÄ›ci.',
        specialSkills: ['Western jeĹľdÄ›nĂ­', 'VĂ˝uka pokroÄŤilĂ˝ch', 'VyjĂ­ĹľÄŹky'],
        images: [
          'https://images.unsplash.com/photo-1760450994357-e84b95398be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYWN0aXZpdGllcyUyMGNoaWxkcmVufGVufDF8fHx8MTc3MjAyNzk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
      {
        id: '6',
        name: 'HvÄ›zdiÄŤka',
        breed: 'ShetlandskĂ˝ pony',
        birthDate: '2011-06-01',
        color: 'HnÄ›dĂˇk',
        temperament: 'LaskavĂˇ, pĹ™ĂˇtelskĂˇ, stabilnĂ­',
        description: 'HvÄ›zdiÄŤka je nejmenĹˇĂ­ ÄŤlen naĹˇĂ­ stĂˇje. DĂ­ky svĂ© velikosti je ideĂˇlnĂ­ pro ty nejmenĹˇĂ­ zaÄŤĂˇteÄŤnĂ­ky.',
        specialSkills: ['VĂ˝uka nejmenĹˇĂ­ch dÄ›tĂ­', 'VodÄ›nĂ­', 'PĂ©ÄŤe o ponĂ­ka'],
        images: [
          'https://images.unsplash.com/photo-1759272193695-27d07d05c15f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJuJTIwc3RhYmxlJTIwcnVyYWx8ZW58MXx8fHwxNzcyMDI4MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ],
      },
    ],
  },
  'o-nas': {
    id: 'o-nas',
    label: 'O nĂˇs',
    hero: {
      title: 'O nĂˇs',
      subtitle: 'Poznejte nĂˇĹˇ pĹ™Ă­bÄ›h a hodnoty, kterĂ© nĂˇs vedou pĹ™i prĂˇci s koĹmi a dÄ›tmi.',
    },
    story: {
      content: `Jsme malĂˇ rodinnĂˇ BIO farma. ZabĂ˝vĂˇme se chovem skotu plemene Highland cattle (SkotskĂ˝ nĂˇhornĂ­ skot), ovcĂ­ plemene Suffolk a chovu konĂ­ pĹ™evĂˇĹľnÄ› plnokrevnĂ˝ch plemen a mĂˇlo poÄŤetnĂ©ho plemene konĂ­ Achal-teke.

V naĹˇem stĂˇdÄ› najdete konĂ­ky rĹŻznĂ˝ch plemen, vÄ›ku a povah. DÄ›ti, kterĂ© k nĂˇm dochĂˇzejĂ­, pracujĂ­ se vĹˇemi koĹmi. KaĹľdĂ˝ kĹŻĹ je individuĂˇlnĂ­ a dÄ›ti se uÄŤĂ­, jak s kaĹľdĂ˝m konĂ­kem pracovat, navĂˇzat s nĂ­m kontakt, tak aby spolu mohli spolupracovat jak v terĂ©nu, tak na jĂ­zdĂˇrnÄ›.

NaĹˇe stĂˇdeÄŤko je posklĂˇdĂˇno z konĂ­ jezdeckĂ˝ch, chovnĂ˝ch kobylek a staĹ™Ă­kĹŻ, kteĹ™Ă­ si uĹľĂ­vajĂ­ dĹŻchod na rozlehlĂ˝ch pastvinĂˇch.`,
      image: 'https://images.unsplash.com/photo-1732302073237-f677bbc0b48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZXMlMjBncmF6aW5nJTIwZmllbGR8ZW58MXx8fHwxNzcxOTU3MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  },
  kontakt: {
    id: 'kontakt',
    label: 'Kontakt',
    hero: {
      title: 'Kontakt',
      subtitle: 'MĂˇte dotazy? RĂˇdi vĂˇm zodpovĂ­me. OzvÄ›te se nĂˇm a domluvĂ­me se!',
      image: '/hero-placeholder.svg',
    },
    contact: {
      phone: '+420 605 279 222',
      email: 'farmapodjanovouhorou@seznam.cz',
      address: {
        street: 'JanĹŻv dĹŻl 123',
        city: 'Janov nad Nisou',
        zip: '468 11',
      },
      openingHours: 'Po - PĂˇ: 9:00 - 18:00<br />So - Ne: 10:00 - 16:00',
      facebook: 'https://www.facebook.com/farmapodjanovouhorou',
      instagram: 'https://www.instagram.com/farmapodjanovouhorou',
    },
  },
  ochrana: {
    id: 'ochrana',
    label: 'Ochrana osobnĂ­ch ĂşdajĹŻ',
    title: 'Ochrana osobnĂ­ch ĂşdajĹŻ',
    sections: [
      {
        id: '1',
        title: 'SprĂˇvce osobnĂ­ch ĂşdajĹŻ',
        content: 'SprĂˇvcem vaĹˇich osobnĂ­ch ĂşdajĹŻ je:\n\n**Farma pod Janovou horou z.s.**\nJanova Hora 466\n763 12 Vizovice\nIÄŚ: 22644601\n\nEmail: farmapodjanovouhorou@seznam.cz\nTelefon: +420 605 279 222'
      },
      {
        id: '2',
        title: 'JakĂ© osobnĂ­ Ăşdaje zpracovĂˇvĂˇme',
        content: 'V rĂˇmci poskytovĂˇnĂ­ naĹˇich sluĹľeb mĹŻĹľeme zpracovĂˇvat nĂˇsledujĂ­cĂ­ kategorie osobnĂ­ch ĂşdajĹŻ:',
        list: [
          '**IdentifikaÄŤnĂ­ Ăşdaje:** jmĂ©no, pĹ™Ă­jmenĂ­, datum narozenĂ­',
          '**KontaktnĂ­ Ăşdaje:** adresa, email, telefonnĂ­ ÄŤĂ­slo',
          '**Ăšdaje zĂˇkonnĂ˝ch zĂˇstupcĹŻ:** u dÄ›tĂ­ mladĹˇĂ­ch 15 let',
          '**ZdravotnĂ­ Ăşdaje:** relevantnĂ­ informace pro bezpeÄŤnĂ© poskytovĂˇnĂ­ sluĹľeb (alergie, zdravotnĂ­ omezenĂ­)'
        ]
      },
      {
        id: '3',
        title: 'ĂšÄŤel zpracovĂˇnĂ­ osobnĂ­ch ĂşdajĹŻ',
        content: 'VaĹˇe osobnĂ­ Ăşdaje zpracovĂˇvĂˇme za nĂˇsledujĂ­cĂ­mi ĂşÄŤely:',
        list: [
          'PoskytovĂˇnĂ­ jezdeckĂ˝ch sluĹľeb, tĂˇborĹŻ a krouĹľkĹŻ',
          'ZajiĹˇtÄ›nĂ­ bezpeÄŤnosti ĂşÄŤastnĂ­kĹŻ',
          'Komunikace s klienty a zĂˇkonĂ˝mi zĂˇstupci',
          'VyĹ™izovĂˇnĂ­ objednĂˇvek a rezervacĂ­',
          'PlnÄ›nĂ­ zĂˇkonnĂ˝ch povinnostĂ­'
        ]
      },
      {
        id: '4',
        title: 'PrĂˇvnĂ­ zĂˇklad zpracovĂˇnĂ­',
        content: 'OsobnĂ­ Ăşdaje zpracovĂˇvĂˇme na zĂˇkladÄ›:',
        list: [
          '**PlnÄ›nĂ­ smlouvy** â€“ pro poskytovĂˇnĂ­ objednanĂ˝ch sluĹľeb',
          '**OprĂˇvnÄ›nĂ©ho zĂˇjmu** â€“ pro zajiĹˇtÄ›nĂ­ bezpeÄŤnosti a komunikaci',
          '**Souhlasu** â€“ pro marketingovou komunikaci',
          '**PlnÄ›nĂ­ prĂˇvnĂ­ povinnosti** â€“ pro ĂşÄŤetnĂ­ a daĹovĂ© ĂşÄŤely'
        ]
      },
      {
        id: '5',
        title: 'Doba uchovĂˇvĂˇnĂ­ ĂşdajĹŻ',
        content: 'OsobnĂ­ Ăşdaje uchovĂˇvĂˇme pouze po dobu nezbytnÄ› nutnou:',
        list: [
          'Po dobu trvĂˇnĂ­ smluvnĂ­ho vztahu a nĂˇslednÄ› po dobu stanovenou prĂˇvnĂ­mi pĹ™edpisy (typicky 3-10 let)',
          'MarketingovĂ© ĂşÄŤely â€“ do odvolĂˇnĂ­ souhlasu'
        ]
      },
      {
        id: '6',
        title: 'VaĹˇe prĂˇva',
        content: 'Jako subjekt ĂşdajĹŻ mĂˇte nĂˇsledujĂ­cĂ­ prĂˇva:',
        list: [
          '**PrĂˇvo na pĹ™Ă­stup** k osobnĂ­m ĂşdajĹŻm',
          '**PrĂˇvo na opravu** nepĹ™esnĂ˝ch ĂşdajĹŻ',
          '**PrĂˇvo na vĂ˝maz** ĂşdajĹŻ ("prĂˇvo bĂ˝t zapomenut")',
          '**PrĂˇvo na omezenĂ­ zpracovĂˇnĂ­**',
          '**PrĂˇvo na pĹ™enositelnost** ĂşdajĹŻ',
          '**PrĂˇvo vznĂ©st nĂˇmitku** proti zpracovĂˇnĂ­',
          '**PrĂˇvo odvolat souhlas** se zpracovĂˇnĂ­m',
          '**PrĂˇvo podat stĂ­Ĺľnost** u ĂšĹ™adu pro ochranu osobnĂ­ch ĂşdajĹŻ'
        ]
      },
      {
        id: '7',
        title: 'ZabezpeÄŤenĂ­ ĂşdajĹŻ',
        content: 'PĹ™ijĂ­mĂˇme vhodnĂˇ technickĂˇ a organizaÄŤnĂ­ opatĹ™enĂ­ k ochranÄ› vaĹˇich osobnĂ­ch ĂşdajĹŻ pĹ™ed neoprĂˇvnÄ›nĂ˝m pĹ™Ă­stupem, ztrĂˇtou nebo zniÄŤenĂ­m. PĹ™Ă­stup k osobnĂ­m ĂşdajĹŻm majĂ­ pouze oprĂˇvnÄ›nĂ© osoby, kterĂ© jsou vĂˇzĂˇny povinnostĂ­ mlÄŤenlivosti.'
      },
      {
        id: '8',
        title: 'Kontakt',
        content: 'MĂˇte-li jakĂ©koliv dotazy ohlednÄ› zpracovĂˇnĂ­ vaĹˇich osobnĂ­ch ĂşdajĹŻ nebo chcete uplatnit svĂˇ prĂˇva, kontaktujte nĂˇs:\n\nEmail: farmapodjanovouhorou@seznam.cz\nTelefon: +420 605 279 222'
      }
    ]
  },
  cookies: {
    id: 'cookies',
    label: 'Cookies',
    title: 'ZĂˇsady pouĹľĂ­vĂˇnĂ­ cookies',
    sections: [
      {
        id: '1',
        title: 'Co jsou cookies',
        content: 'Cookies jsou malĂ© textovĂ© soubory, kterĂ© jsou uklĂˇdĂˇny do vaĹˇeho zaĹ™Ă­zenĂ­ (poÄŤĂ­taÄŤ, smartphone, tablet) pĹ™i nĂˇvĹˇtÄ›vÄ› webovĂ˝ch strĂˇnek. Cookies pomĂˇhajĂ­ webovĂ˝m strĂˇnkĂˇm zapamatovat si informace o vaĹˇĂ­ nĂˇvĹˇtÄ›vÄ›, jako jsou preferovanĂ˝ jazyk a dalĹˇĂ­ nastavenĂ­.\n\nSoubory cookies mohou usnadnit vaĹˇi pĹ™Ă­ĹˇtĂ­ nĂˇvĹˇtÄ›vu a zvĂ˝Ĺˇit uĹľiteÄŤnost webu pro vĂˇs.'
      },
      {
        id: '2',
        title: 'Jak pouĹľĂ­vĂˇme cookies',
        content: 'Na naĹˇich webovĂ˝ch strĂˇnkĂˇch pouĹľĂ­vĂˇme nĂˇsledujĂ­cĂ­ kategorie cookies:',
        subsections: [
          {
            title: 'NezbytnĂ© cookies',
            content: 'Tyto cookies jsou nezbytnĂ© pro sprĂˇvnĂ© fungovĂˇnĂ­ webu. Bez tÄ›chto cookies by web nemohl fungovat sprĂˇvnÄ›.\n\n*Tyto cookies nelze vypnout.*'
          },
          {
            title: 'AnalytickĂ© cookies',
            content: 'Tyto cookies nĂˇm pomĂˇhajĂ­ porozumÄ›t tomu, jak nĂˇvĹˇtÄ›vnĂ­ci pouĹľĂ­vajĂ­ naĹˇe webovĂ© strĂˇnky, napĹ™Ă­klad kterĂ© strĂˇnky navĹˇtÄ›vujĂ­ nejÄŤastÄ›ji a zda dostĂˇvajĂ­ chybovĂ© zprĂˇvy.\n\n*Tyto cookies mĹŻĹľete odmĂ­tnout.*'
          },
          {
            title: 'MarketingovĂ© cookies',
            content: 'Tyto cookies se pouĹľĂ­vajĂ­ ke sledovĂˇnĂ­ nĂˇvĹˇtÄ›vnĂ­kĹŻ napĹ™Ă­ÄŤ webovĂ˝mi strĂˇnkami. ZĂˇmÄ›rem je zobrazovat reklamy, kterĂ© jsou relevantnĂ­ a zajĂ­mavĂ© pro jednotlivĂ© uĹľivatele.\n\n*Tyto cookies mĹŻĹľete odmĂ­tnout.*'
          }
        ]
      },
      {
        id: '3',
        title: 'PĹ™ehled pouĹľĂ­vanĂ˝ch cookies',
        list: [
          '**session_id** (NezbytnĂ©, Relace): Identifikace uĹľivatelskĂ© relace',
          '**cookie_consent** (NezbytnĂ©, 1 rok): UloĹľenĂ­ souhlasu s cookies',
          '**_ga** (AnalytickĂ©, 2 roky): Google Analytics',
          '**_fbp** (MarketingovĂ©, 3 mÄ›sĂ­ce): Facebook Pixel'
        ]
      },
      {
        id: '4',
        title: 'Jak ovlĂˇdat cookies',
        content: 'MĂˇte moĹľnost ovlĂˇdat a/nebo odstranit cookies podle svĂ©ho uvĂˇĹľenĂ­. MĹŻĹľete odstranit vĹˇechny cookies, kterĂ© jsou jiĹľ ve vaĹˇem poÄŤĂ­taÄŤi uloĹľenĂ©, a mĹŻĹľete nastavit vÄ›tĹˇinu prohlĂ­ĹľeÄŤĹŻ tak, aby jejich uklĂˇdĂˇnĂ­ bylo zakĂˇzĂˇno.\n\nPokud to udÄ›lĂˇte, pravdÄ›podobnÄ› budete muset ruÄŤnÄ› upravovat nÄ›kterĂ© pĹ™edvolby pokaĹľdĂ©, kdyĹľ navĹˇtĂ­vĂ­te web, a nÄ›kterĂ© sluĹľby a funkce nemusĂ­ fungovat.',
        subsections: [
          {
            title: 'SprĂˇva cookies v prohlĂ­ĹľeÄŤĂ­ch:',
            list: [
              '**Google Chrome:** NastavenĂ­ â†’ SoukromĂ­ a zabezpeÄŤenĂ­ â†’ Cookies a dalĹˇĂ­ data webĹŻ',
              '**Mozilla Firefox:** MoĹľnosti â†’ SoukromĂ­ a zabezpeÄŤenĂ­ â†’ Cookies a data strĂˇnek',
              '**Safari:** PĹ™edvolby â†’ SoukromĂ­ â†’ Cookies a data webovĂ˝ch strĂˇnek',
              '**Microsoft Edge:** NastavenĂ­ â†’ Cookies a oprĂˇvnÄ›nĂ­ webu â†’ SprĂˇva a odstranÄ›nĂ­ cookies'
            ]
          }
        ]
      },
      {
        id: '5',
        title: 'Cookies tĹ™etĂ­ch stran',
        content: 'Na naĹˇich webovĂ˝ch strĂˇnkĂˇch mohou bĂ˝t pouĹľity cookies tĹ™etĂ­ch stran (napĹ™. Google Analytics, Facebook). Tyto tĹ™etĂ­ strany mohou pouĹľĂ­vat cookies k analĂ˝ze pouĹľĂ­vĂˇnĂ­ webu, zobrazovĂˇnĂ­ cĂ­lenĂ© reklamy nebo poskytovĂˇnĂ­ funkcĂ­ sociĂˇlnĂ­ch mĂ©diĂ­.\n\nNemĂˇme kontrolu nad cookies tĹ™etĂ­ch stran a jejich pouĹľĂ­vĂˇnĂ­ se Ĺ™Ă­dĂ­ zĂˇsadami ochrany osobnĂ­ch ĂşdajĹŻ tÄ›chto tĹ™etĂ­ch stran.'
      },
      {
        id: '6',
        title: 'Kontakt',
        content: 'MĂˇte-li jakĂ©koliv dotazy ohlednÄ› naĹˇich zĂˇsad pouĹľĂ­vĂˇnĂ­ cookies, kontaktujte nĂˇs:\n\nEmail: farmapodjanovouhorou@seznam.cz\nTelefon: +420 605 279 222'
      }
    ]
  },
  podminky: {
    id: 'podminky',
    label: 'ObchodnĂ­ podmĂ­nky',
    title: 'ObchodnĂ­ podmĂ­nky',
    sections: [
      {
        id: '1',
        title: 'ObecnĂˇ ustanovenĂ­',
        content: 'Tyto obchodnĂ­ podmĂ­nky upravujĂ­ vztahy mezi poskytovatelem sluĹľeb a zĂˇkaznĂ­ky vyuĹľĂ­vajĂ­cĂ­mi sluĹľeb farmy.\n\n**Poskytovatel sluĹľeb:**\nFarma pod Janovou horou z.s.\nJanova Hora 466\n763 12 Vizovice\nIÄŚ: 22644601\n\nEmail: farmapodjanovouhorou@seznam.cz\nTelefon: +420 605 279 222'
      },
      {
        id: '2',
        title: 'PoskytovanĂ© sluĹľby',
        content: 'Farma poskytuje nĂˇsledujĂ­cĂ­ sluĹľby:',
        list: [
          'JezdeckĂ© krouĹľky pro dÄ›ti a mlĂˇdeĹľ',
          'LetnĂ­ jezdeckĂ© tĂˇbory',
          'VyjĂ­ĹľÄŹky do pĹ™Ă­rody',
          'IndividuĂˇlnĂ­ jezdeckĂ© lekce',
          'PĂ©ÄŤe o konÄ› a pony'
        ]
      },
      {
        id: '3',
        title: 'ObjednĂˇnĂ­ sluĹľeb',
        content: 'SluĹľby lze objednat:',
        list: [
          'Telefonicky na ÄŤĂ­sle +420 605 279 222',
          'E-mailem na adrese farmapodjanovouhorou@seznam.cz',
          'OsobnÄ› na farmÄ› po pĹ™edchozĂ­ domluvÄ›'
        ],
        subsections: [
          {
            title: 'PotvrzenĂ­ objednĂˇvky',
            content: 'ObjednĂˇvka je potvrzena aĹľ po obdrĹľenĂ­ zĂˇvaznĂ© registrace a Ăşhrady zĂˇlohy nebo celĂ© ÄŤĂˇstky dle typu sluĹľby.'
          }
        ]
      },
      {
        id: '4',
        title: 'PlatebnĂ­ podmĂ­nky',
        content: 'Ceny sluĹľeb jsou uvedeny v aktuĂˇlnĂ­m cenĂ­ku na webovĂ˝ch strĂˇnkĂˇch nebo je lze zĂ­skat na vyĹľĂˇdĂˇnĂ­.',
        subsections: [
          {
            title: 'ZpĹŻsoby platby',
            list: [
              'BankovnĂ­m pĹ™evodem na ĂşÄŤet',
              'V hotovosti pĹ™i osobnĂ­ nĂˇvĹˇtÄ›vÄ›',
              'PlatebnĂ­ kartou po domluvÄ›'
            ]
          },
          {
            title: 'Splatnost',
            content: 'U tĂˇborĹŻ je vyĹľadovĂˇna zĂˇloha 50% ceny pĹ™i registraci, doplatek nejpozdÄ›ji 14 dnĂ­ pĹ™ed zaÄŤĂˇtkem tĂˇbora.\n\nU krouĹľkĹŻ je platba mÄ›sĂ­ÄŤnĂ­, vĹľdy do 5. dne mÄ›sĂ­ce.'
          }
        ]
      },
      {
        id: '5',
        title: 'Storno podmĂ­nky',
        content: 'ZĂˇkaznĂ­k mĂˇ prĂˇvo odstoupit od smlouvy nĂˇsledovnÄ›:',
        list: [
          '**VĂ­ce neĹľ 30 dnĂ­ pĹ™ed zaÄŤĂˇtkem:** vrĂˇcenĂ­ 100% uhrazenĂ© ÄŤĂˇstky',
          '**30-14 dnĂ­ pĹ™ed zaÄŤĂˇtkem:** vrĂˇcenĂ­ 50% uhrazenĂ© ÄŤĂˇstky',
          '**MĂ©nÄ› neĹľ 14 dnĂ­ pĹ™ed zaÄŤĂˇtkem:** bez nĂˇroku na vrĂˇcenĂ­ platby',
          '**Ze zdravotnĂ­ch dĹŻvodĹŻ:** pĹ™i pĹ™edloĹľenĂ­ lĂ©kaĹ™skĂ©ho potvrzenĂ­ vrĂˇcenĂ­ 80% uhrazenĂ© ÄŤĂˇstky'
        ]
      },
      {
        id: '6',
        title: 'BezpeÄŤnost a pravidla ĂşÄŤasti',
        content: 'ĂšÄŤastnĂ­k je povinen:',
        list: [
          'DodrĹľovat pokyny instruktorĹŻ',
          'PouĹľĂ­vat ochrannĂ© pomĹŻcky (pĹ™ilba)',
          'OznĂˇmit zdravotnĂ­ omezenĂ­ a alergie',
          'U nezletilĂ˝ch mĂ­t podepsanĂ˝ souhlas zĂˇkonnĂ©ho zĂˇstupce'
        ],
        subsections: [
          {
            title: 'OdpovÄ›dnost',
            content: 'Poskytovatel sluĹľeb neodpovĂ­dĂˇ za Ăşjmu zpĹŻsobenou nedodrĹľenĂ­m bezpeÄŤnostnĂ­ch pokynĹŻ ĂşÄŤastnĂ­kem.'
          }
        ]
      },
      {
        id: '7',
        title: 'ZĂˇvÄ›reÄŤnĂˇ ustanovenĂ­',
        content: 'Tyto obchodnĂ­ podmĂ­nky nabĂ˝vajĂ­ ĂşÄŤinnosti dnem jejich zveĹ™ejnÄ›nĂ­ na webovĂ˝ch strĂˇnkĂˇch.\n\nPoskytovatel si vyhrazuje prĂˇvo tyto podmĂ­nky zmÄ›nit. ZmÄ›ny budou zveĹ™ejnÄ›ny na webovĂ˝ch strĂˇnkĂˇch.\n\nV pĹ™Ă­padÄ› sporĹŻ se strany pokusĂ­ najĂ­t smĂ­rnĂ© Ĺ™eĹˇenĂ­. NenĂ­-li to moĹľnĂ©, jsou spory Ĺ™eĹˇeny u pĹ™Ă­sluĹˇnĂ©ho soudu ÄŚeskĂ© republiky.'
      }
    ]
  },
  reklamace: {
    id: 'reklamace',
    label: 'ReklamaÄŤnĂ­ Ĺ™Ăˇd',
    title: 'ReklamaÄŤnĂ­ Ĺ™Ăˇd',
    sections: [
      {
        id: '1',
        title: 'ĂšvodnĂ­ ustanovenĂ­',
        content: 'Tento reklamaÄŤnĂ­ Ĺ™Ăˇd upravuje podmĂ­nky a postup pĹ™i reklamaci sluĹľeb poskytovanĂ˝ch Farmou pod Janovou horou.\n\n**Poskytovatel:**\nFarma pod Janovou horou z.s.\nJanova Hora 466\n763 12 Vizovice\nIÄŚ: 22644601'
      },
      {
        id: '2',
        title: 'PrĂˇva zĂˇkaznĂ­ka',
        content: 'ZĂˇkaznĂ­k mĂˇ prĂˇvo reklamovat poskytnutĂ© sluĹľby v pĹ™Ă­padÄ›, Ĺľe:',
        list: [
          'SluĹľba nebyla poskytnuta v dohodnutĂ©m rozsahu',
          'SluĹľba nebyla poskytnuta v dohodnutĂ© kvalitÄ›',
          'SluĹľba neodpovĂ­dĂˇ tomu, co bylo sjednĂˇno',
          'DoĹˇlo k poruĹˇenĂ­ bezpeÄŤnostnĂ­ch standardĹŻ'
        ]
      },
      {
        id: '3',
        title: 'Postup pĹ™i reklamaci',
        content: 'Reklamaci lze uplatnit nĂˇsledujĂ­cĂ­mi zpĹŻsoby:',
        list: [
          'E-mailem na adrese farmapodjanovouhorou@seznam.cz',
          'Telefonicky na ÄŤĂ­sle +420 605 279 222',
          'PĂ­semnÄ› na adrese poskytovatele',
          'OsobnÄ› pĹ™i nĂˇvĹˇtÄ›vÄ› farmy'
        ],
        subsections: [
          {
            title: 'LhĹŻta pro uplatnÄ›nĂ­ reklamace',
            content: 'Reklamaci je tĹ™eba uplatnit bez zbyteÄŤnĂ©ho odkladu, nejpozdÄ›ji vĹˇak do 14 dnĹŻ od poskytnutĂ­ sluĹľby nebo od zjiĹˇtÄ›nĂ­ vady.'
          },
          {
            title: 'Obsah reklamace',
            content: 'Reklamace musĂ­ obsahovat:',
            list: [
              'IdentifikaÄŤnĂ­ Ăşdaje zĂˇkaznĂ­ka',
              'Datum poskytnutĂ­ sluĹľby',
              'Popis reklamovanĂ˝ch nedostatkĹŻ',
              'NĂˇvrh zpĹŻsobu vyĹ™Ă­zenĂ­ reklamace'
            ]
          }
        ]
      },
      {
        id: '4',
        title: 'VyĹ™Ă­zenĂ­ reklamace',
        content: 'Poskytovatel se zavazuje reklamaci vyĹ™Ă­dit bez zbyteÄŤnĂ©ho odkladu, nejpozdÄ›ji do 30 dnĹŻ od jejĂ­ho uplatnÄ›nĂ­.',
        subsections: [
          {
            title: 'ZpĹŻsoby vyĹ™Ă­zenĂ­',
            list: [
              'OpÄ›tovnĂ© poskytnutĂ­ sluĹľby bez vad',
              'PoskytnutĂ­ slevy z ceny sluĹľby',
              'VrĂˇcenĂ­ uhrazenĂ© ÄŤĂˇstky',
              'ZamĂ­tnutĂ­ reklamace jako neoprĂˇvnÄ›nĂ©'
            ]
          },
          {
            title: 'OznĂˇmenĂ­ vĂ˝sledku',
            content: 'O vĂ˝sledku reklamace bude zĂˇkaznĂ­k informovĂˇn pĂ­semnÄ› nebo e-mailem na kontaktnĂ­ Ăşdaje uvedenĂ© v reklamaci.'
          }
        ]
      },
      {
        id: '5',
        title: 'NeoprĂˇvnÄ›nĂˇ reklamace',
        content: 'Reklamace nebude uznĂˇna v pĹ™Ă­padÄ›, Ĺľe:',
        list: [
          'Vada vznikla v dĹŻsledku nesprĂˇvnĂ©ho pouĹľitĂ­ sluĹľby zĂˇkaznĂ­kem',
          'ZĂˇkaznĂ­k nedodrĹľel pokyny a pravidla stanovenĂ© poskytovatelem',
          'Vada vznikla v dĹŻsledku vnÄ›jĹˇĂ­ch vlivĹŻ (poÄŤasĂ­, zdravotnĂ­ stav zĂˇkaznĂ­ka)',
          'Reklamace byla uplatnÄ›na po uplynutĂ­ reklamaÄŤnĂ­ lhĹŻty'
        ]
      },
      {
        id: '6',
        title: 'MimosoudnĂ­ Ĺ™eĹˇenĂ­ sporĹŻ',
        content: 'V pĹ™Ă­padÄ› sporu, kterĂ˝ se nepodaĹ™Ă­ vyĹ™eĹˇit vzĂˇjemnou dohodou, mĂˇ zĂˇkaznĂ­k prĂˇvo obrĂˇtit se na orgĂˇn mimosoudnĂ­ho Ĺ™eĹˇenĂ­ spotĹ™ebitelskĂ˝ch sporĹŻ:\n\n**ÄŚeskĂˇ obchodnĂ­ inspekce**\nStephĂˇnova 567/15\n120 00 Praha 2\nwww.coi.cz'
      },
      {
        id: '7',
        title: 'ZĂˇvÄ›reÄŤnĂˇ ustanovenĂ­',
        content: 'Tento reklamaÄŤnĂ­ Ĺ™Ăˇd je platnĂ˝ a ĂşÄŤinnĂ˝ od data zveĹ™ejnÄ›nĂ­ na webovĂ˝ch strĂˇnkĂˇch.\n\nPoskytovatel si vyhrazuje prĂˇvo tento Ĺ™Ăˇd zmÄ›nit, zmÄ›ny budou zveĹ™ejnÄ›ny na webovĂ˝ch strĂˇnkĂˇch.'
      }
    ]
  },
  '404': {
    id: '404',
    label: '404',
    title: 'StrĂˇnka nenalezena',
    content: 'OmlouvĂˇme se, ale hledanĂˇ strĂˇnka neexistuje.',
  },
};

export const defaultPageContent: Record<string, any> = fixMojibakeDeep(defaultPageContentRaw);
