import { FloatingCard } from '../components/FloatingCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Users, Heart, Leaf, Award, Star, Shield, Zap } from 'lucide-react';
import { usePageData } from '../hooks/usePageData';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { resolveCmsImageUrl } from '../utils/media';

// Icon mapping
const iconMap: Record<string, any> = {
  Users,
  Heart,
  Leaf,
  Award,
  Star,
  Shield,
  Zap
};

export function About() {
  const { data: pageData, isLoading } = usePageData('o-nas');
  const { settings } = useGlobalSettings();
  const resolvedHeroImage = resolveCmsImageUrl(pageData?.hero?.image, settings?.heroImage);

  // Default data as fallback
  const defaultValues = [
    {
      icon: 'Heart',
      title: 'Láska ke koním',
      description: 'Koně jsou naĹˇí váĹˇní. KaĹľdý den se o ně staráme s láskou a respektem.',
    },
    {
      icon: 'Users',
      title: 'Rodinný pĹ™ístup',
      description: 'Jsme rodinná farma, kde se kaĹľdý cítí jako doma. VytváĹ™íme pĹ™átelskou atmosféru.',
    },
    {
      icon: 'Leaf',
      title: 'Ekologický chov',
      description: 'Dbáme na ekologický pĹ™ístup k hospodaĹ™ení a péÄŤi o pĹ™írodu.',
    },
    {
      icon: 'Award',
      title: 'Kvalitní výuka',
      description: 'NaĹˇi instruktoĹ™i mají dlouholeté zkuĹˇenosti a certifikace.',
    },
  ];

  const defaultTeam = [
    {
      name: 'Jana a Petr NováÄŤkovi',
      role: 'Majitelé a zakladatelé',
      description: 'Vedou farmu s láskou a zkuĹˇenostmi z dlouholeté práce s koĹmi a dětmi.',
      photo: ''
    },
    {
      name: 'Lucie Svobodová',
      role: 'Hlavní instruktorka',
      description: 'Má certifikaci od České hipologické spoleÄŤnosti a miluje práci s dětmi.',
      photo: ''
    },
    {
      name: 'TomáĹˇ Horák',
      role: 'Instruktor a správce stájí',
      description: 'Stará se o zdraví a pohodu naĹˇich koní. Vede pokroÄŤilé kurzy a vyjíĹľďky.',
      photo: ''
    },
  ];

  // Use data from CMS or fallback to defaults
  const values = pageData?.values && pageData.values.length > 0 ? pageData.values : defaultValues;
  const team = pageData?.team && pageData.team.length > 0 ? pageData.team : defaultTeam;
  const storyParagraphs = pageData?.story?.content 
    ? pageData.story.content.split('\\n\\n').filter((p: string) => p.trim())
    : [
        'Jsme malá rodinná BIO farma. Zabýváme se chovem skotu plemene Highland cattle (Skotský náhorní skot), ovcí plemene Suffolk a chovu koní pĹ™eváĹľně plnokrevných plemen a málo poÄŤetného plemene koní Achal-teke.',
        'V naĹˇem stádě najdete koníky rĹŻzných plemen, věku a povah. Děti, které k nám docházejí, pracují se vĹˇemi koĹmi. KaĹľdý kĹŻĹ je individuální a děti se uÄŤí, jak s kaĹľdým koníkem pracovat, navázat s ním kontakt, tak aby spolu mohli spolupracovat jak v terénu, tak na jízdárně.',
        'NaĹˇe stádeÄŤko je poskládáno z koní jezdeckých, chovných kobylek a staĹ™íkĹŻ, kteĹ™í si uĹľívají dĹŻchod na rozlehlých pastvinách.'
      ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={resolvedHeroImage}
            alt="O nás"
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 md:pt-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-7 drop-shadow-2xl leading-tight">
              O nás
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 drop-shadow-lg leading-relaxed max-w-2xl">
              Poznejte náĹˇ pĹ™íběh a hodnoty, které nás vedou pĹ™i práci s koĹmi a dětmi.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-[var(--farm-section-alt-bg)] -mt-[1px] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-8">
                NáĹˇ pĹ™íběh
              </h2>
              
              <div className="space-y-4 text-lg text-[var(--farm-secondary-text)] leading-relaxed">
                {storyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <FloatingCard hover={false} className="p-0 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1732302073237-f677bbc0b48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZXMlMjBncmF6aW5nJTIwZmllbGR8ZW58MXx8fHwxNzcxOTU3MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="NaĹˇe farma"
                  className="w-full aspect-[4/3] object-cover"
                />
              </FloatingCard>
            </div>
          </div>
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

