import { useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import { FloatingCard } from '../components/FloatingCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Check } from 'lucide-react';
import { Button } from '../components/Button';
import { usePageData } from '../hooks/usePageData';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { resolveCmsImageUrl } from '../utils/media';
import { normalizeCmsInternalHref } from '../utils/cmsInternalLinks';

export function Services() {
  const location = useLocation();
  const { data: pageData, isLoading } = usePageData('sluzby');
  const { settings } = useGlobalSettings();
  const resolvedHeroImage = resolveCmsImageUrl(pageData?.hero?.image, settings?.heroImage);

  useEffect(() => {
    // Function to scroll to element
    const scrollToSection = () => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        console.log('Trying to scroll to:', id); // Debug
        const element = document.getElementById(id);
        
        if (element) {
          console.log('Element found:', element); // Debug
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          console.log('Element not found:', id); // Debug
        }
      } else {
        // If no hash, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Try immediately
    scrollToSection();
    
    // Also try after a delay to ensure DOM is ready
    const timer = setTimeout(scrollToSection, 100);
    
    return () => clearTimeout(timer);
  }, [location.hash, isLoading]);

  // Default services if no CMS data
  const defaultServices = [
    {
      id: 'tabory',
      title: 'JezdeckĂ© tĂˇbory',
      description: 'PrĂˇzdninovĂ© jezdeckĂ© tĂˇbory jsou ideĂˇlnĂ­ pro dÄ›ti, kterĂ© majĂ­ rĂˇdy konÄ› a pĹ™Ă­rodu. BÄ›hem tĂ˝dennĂ­ho pobytu se dÄ›ti nauÄŤĂ­ zĂˇklady jĂ­zdy, pĂ©ÄŤi o konÄ› a strĂˇvĂ­ spoustu ÄŤasu venku.',
      image: 'https://images.unsplash.com/photo-1752575382369-a290d1499d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBob3JzZSUyMGNhbXAlMjBraWRzfGVufDF8fHx8MTc3MjAyNzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      details: [
        { title: 'TermĂ­ny', description: 'ÄŚervenec a srpen, tĂ˝dennĂ­ turnusy' },
        { title: 'Pro koho', description: 'DÄ›ti od 7 let' },
        { title: 'Co zahrnuje', description: 'JĂ­zda na koni, teoretickĂˇ a praktickĂˇ pĂ©ÄŤe o konÄ› (oĹˇetĹ™ovĂˇnĂ­, sedlĂˇnĂ­), vyjĂ­ĹľÄŹky do terĂ©nu, prĂˇce s konÄ›m ze zemÄ›, seznĂˇmenĂ­ se s dalĹˇĂ­mi zvĂ­Ĺ™aty na farmÄ›, tvoĹ™ivĂˇ ÄŤinnost, soutÄ›Ĺľe, exkurze v dostihovĂ© stĂˇji, v pĹ™Ă­padÄ› pĹ™Ă­znivĂ©ho poÄŤasĂ­ pĹ™espĂ­ dÄ›ti jednu noc pod ĹˇirĂˇkem' },
        { title: 'Cena', description: 'PĹ™Ă­mÄ›stskĂ˝ tĂˇbor 4 800,- KÄŤ\nPobytovĂ˝ tĂˇbor 7 700,- KÄŤ' }
      ],
      buttonText: 'Rezervovat tĂˇbor',
      buttonLink: '/kontakt?tab=tabor'
    },
    {
      id: 'krouzky',
      title: 'JezdeckĂ© krouĹľky',
      description: 'JezdeckĂ˝ krouĹľek je pro dÄ›ti od 7 let, kterĂ© majĂ­ rĂˇdy konÄ›, chtÄ›jĂ­ s nimi trĂˇvit ÄŤas, jezdit a peÄŤovat o nÄ›. DÄ›ti se nauÄŤĂ­ jak se o konÄ› starat, oĹˇetĹ™ovat, krmit, sedlat. NauÄŤĂ­ se s koĹmi zĂˇklady prĂˇce ze zemÄ› a jak se kolem nich pohybovat.',
      image: 'https://images.unsplash.com/photo-1766499431124-a8de024c5dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJpZGluZyUyMGhvcnNlc3xlbnwxfHx8fDE3NzIwMjc5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      details: [
        { title: 'Pro koho', description: 'Pro dÄ›ti od 7 let, kterĂ© majĂ­ rĂˇdy konÄ› a chtÄ›jĂ­ s nimi trĂˇvit ÄŤas' },
        { title: 'Co se dÄ›ti nauÄŤĂ­', description: 'PĂ©ÄŤe o konÄ›, oĹˇetĹ™ovĂˇnĂ­, krmenĂ­, sedlĂˇnĂ­, zĂˇklady prĂˇce ze zemÄ› a bezpeÄŤnĂ˝ pohyb kolem konĂ­' },
        { title: 'PĹ™i nepĹ™Ă­zni poÄŤasĂ­', description: 'TeoretickĂˇ vĂ˝uka pĂ©ÄŤe o konÄ›, chod stĂˇje, vĂ˝stroj' },
        { title: 'VychĂˇzky s koĹmi', description: 'ProchĂˇzky do pĹ™Ă­rody, na vodĂ­tku i v sedle' },
        { title: 'Cena', description: '5 250,- KÄŤ (15 lekcĂ­)' }
      ],
      buttonText: 'Rezervovat krouĹľek',
      buttonLink: '/kontakt?tab=krouzek'
    },
    {
      id: 'vyjizdy',
      title: 'JĂ­zda na koni',
      description: 'NabĂ­zĂ­me jĂ­zdu na koni pro dÄ›ti i dospÄ›lĂ©, vyjĂ­ĹľÄŹky do pĹ™Ă­rody, vychĂˇzky na vedenĂ©m koni/ponĂ­kovi a vodÄ›nĂ­ na ponĂ­kovi pro nejmenĹˇĂ­ dÄ›ti.',
      image: 'https://images.unsplash.com/photo-1763130063474-1bee680a1463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHJpZGluZyUyMGxlc3NvbnxlbnwxfHx8fDE3NzIwMjc5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      details: [
        { title: 'VyjĂ­ĹľÄŹka do pĹ™Ă­rody', description: '60 minut - 600 KÄŤ' },
        { title: 'VychĂˇzka na vedenĂ©m koni/ponĂ­kovi', description: '30 minut - 350 KÄŤ\n60 minut - 600 KÄŤ' },
        { title: 'VodÄ›nĂ­ na ponĂ­kovi pro dÄ›ti', description: '30 minut - 350 KÄŤ' },
        { title: 'ProvoznĂ­ doba', description: 'PondÄ›lĂ­ aĹľ sobota (v nedÄ›li nejezdĂ­me)' },
        { title: 'DĹŻleĹľitĂ© informace', description: 'ProsĂ­me o pĹ™Ă­jezd 5-10 minut pĹ™edem z dĹŻvodu instrukcĂ­ a nastavenĂ­ pomĹŻcek. ÄŚas jĂ­zdy se poÄŤĂ­tĂˇ od domluvenĂ©ho ÄŤasu.' }
      ],
      buttonText: 'Rezervovat jĂ­zdu',
      buttonLink: '/kontakt?tab=vyjizdy'
    },
    {
      id: 'akce-na-miru',
      title: 'Akce na mĂ­ru',
      description: 'NabĂ­zĂ­me speciĂˇlnĂ­ sluĹľby ĹˇitĂ© na mĂ­ru vaĹˇim potĹ™ebĂˇm - zapĹŻjÄŤenĂ­ konĂ­ na focenĂ­ a svatby, vozenĂ­ dÄ›tĂ­ na oslavĂˇch, exkurze pro Ĺˇkoly a moĹľnost pĹ™espĂˇnĂ­ s vlastnĂ­m konÄ›m.',
      image: 'https://images.unsplash.com/photo-1628996084452-deb83cb04988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwc3BlY2lhbCUyMGV2ZW50cyUyMGhvcnNlJTIwcG9ueSUyMGtpZHMlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzMxMzYyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      details: [
        { title: 'ZapĹŻjÄŤenĂ­ konÄ› na focenĂ­', description: 'S vlastnĂ­m fotografem, u nĂˇs na farmÄ› nebo pĹ™ivezeme konÄ› k vĂˇm (doprava se pĹ™ipoÄŤĂ­tĂˇvĂˇ) - cena dohodou' },
        { title: 'ZapĹŻjÄŤenĂ­ konÄ› na svatbu', description: 'PĹ™Ă­jezd, focenĂ­, zapĹŻjÄŤenĂ­ konÄ› pro vĂˇĹˇ velkĂ˝ den (doprava se pĹ™ipoÄŤĂ­tĂˇvĂˇ) - cena dohodou' },
        { title: 'DÄ›tskĂ© oslavy - vozenĂ­ na ponĂ­kovi', description: 'PĹ™ijedeme povozit vaĹˇe dÄ›ti na oslavu (doprava se pĹ™ipoÄŤĂ­tĂˇvĂˇ) - cena dohodou' },
        { title: 'Exkurze na farmÄ› pro Ĺˇkolky a Ĺˇkoly', description: '80,- KÄŤ/dĂ­tÄ› (pedagogickĂ˝ doprovod zdarma)\nProhlĂ­dka farmy, seznĂˇmenĂ­ s koĹmi a dalĹˇĂ­mi zvĂ­Ĺ™aty (oveÄŤky, krĂˇvy, kozy, krĂˇlĂ­ci, slepice). UkĂˇzka jak probĂ­hĂˇ den na farmÄ› a pĂ©ÄŤe o zvĂ­Ĺ™ata.' },
        { title: 'PĹ™espĂˇnĂ­ s vlastnĂ­m konÄ›m', description: 'PlĂˇnujete ÄŤundr s vlastnĂ­m konÄ›m v naĹˇem okolĂ­? NabĂ­zĂ­me moĹľnost vyuĹľĂ­t prostor pro pĹ™espĂˇnĂ­ a ohradu pro vaĹˇe konÄ› - cena dohodou' }
      ],
      buttonText: 'Kontaktujte nĂˇs',
      buttonLink: '/kontakt'
    }
  ];

  const services = pageData?.services || defaultServices;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={resolvedHeroImage}
            alt="NaĹˇe sluĹľby"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
        </div>
        
        {/* Bottom shadow for levitation effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]" />
        
        {/* Organic wave transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] -mb-[1px]" style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.08)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.08))' }}>
          <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,60 1200,40 L1200,120 L0,120 Z" fill="var(--farm-page-bg)" />
          </svg>
        </div>
        
        {!isLoading && (
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 md:pt-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-7 drop-shadow-2xl leading-tight">
                {pageData?.hero?.title || 'NaĹˇe sluĹľby'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 drop-shadow-lg leading-relaxed max-w-2xl">
                {pageData?.hero?.subtitle || 'NabĂ­zĂ­me Ĺˇirokou ĹˇkĂˇlu aktivit pro dÄ›ti i dospÄ›lĂ©. Od jezdeckĂ˝ch krouĹľkĹŻ po letnĂ­ tĂˇbory a vĂ˝lety do pĹ™Ă­rody.'}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className={`py-24 md:py-32 ${index % 2 === 0 ? 'bg-[var(--farm-section-alt-bg)]' : 'bg-[var(--farm-page-bg)]'} scroll-mt-20 -mt-[1px] relative overflow-hidden`}>
          {/* Blurred gradient transition from previous section */}
          <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${index === 0 ? 'from-[var(--farm-page-bg)]' : index % 2 === 0 ? 'from-[var(--farm-page-bg)]' : 'from-[var(--farm-section-alt-bg)]'} to-transparent backdrop-blur-sm`} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={index % 2 === 0 ? "order-2 lg:order-1" : ""}>
                <h2 className="text-3xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-8">
                  {service.title}
                </h2>
                
                <p className="text-lg text-[var(--farm-secondary-text)] mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-4 mb-8">
                  {service.details?.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[var(--farm-accent-green)] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-[var(--farm-primary-text)] mb-1">{detail.title}</h4>
                        <p className="text-[var(--farm-secondary-text)] whitespace-pre-line">
                          {detail.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to={normalizeCmsInternalHref(service.buttonLink) || '/kontakt'}>
                  <Button variant="primary">
                    {service.buttonText}
                  </Button>
                </Link>
              </div>

              <div className={index % 2 === 0 ? "order-1 lg:order-2" : ""}>
                <FloatingCard hover={false} className="p-0 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </FloatingCard>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[var(--farm-bg-tertiary)] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-section-alt-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FloatingCard hover={false} className="p-12 md:p-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-6">
              MĂˇte dotazy?
            </h2>
            <p className="text-lg md:text-xl text-[var(--farm-secondary-text)] mb-10">
              RĂˇdi vĂˇm poradĂ­me, kterĂˇ sluĹľba je pro vĂˇs nejlepĹˇĂ­. NevĂˇhejte nĂˇs kontaktovat.
            </p>
            <Link to="/kontakt">
              <Button variant="primary">
                Kontaktovat nĂˇs
              </Button>
            </Link>
          </FloatingCard>
        </div>
        
        {/* Bottom shadow for levitation effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]" />
        
        {/* Organic wave transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]" style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.08)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.08))' }}>
          <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,60 1200,40 L1200,120 L0,120 Z" fill="var(--farm-page-bg)" />
          </svg>
        </div>
      </section>
    </div>
  );
}
