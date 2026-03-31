import { FloatingCard } from '../components/FloatingCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { usePageData } from '../hooks/usePageData';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { resolveCmsImageUrl } from '../utils/media';

const DEFAULT_HERO_TITLE = 'O nás';
const DEFAULT_HERO_SUBTITLE =
  'Poznejte náš příběh a hodnoty, které nás vedou při práci s koňmi a dětmi.';

const DEFAULT_STORY_FALLBACK = [
  'Jsme malá rodinná BIO farma. Zabýváme se chovem skotu plemene Highland cattle (Skotský náhorní skot), ovcí plemene Suffolk a chovu koní převážně plnokrevných plemen a málo početného plemene koní Achal-teke.',
  'V našem stádě najdete koníky různých plemen, věku a povah. Děti, které k nám docházejí, pracují se všemi koňmi. Každý kůň je individuální a děti se učí, jak s každým koníkem pracovat, navázat s ním kontakt, tak aby spolu mohli spolupracovat jak v terénu, tak na jízdárně.',
  'Naše stádečko je poskládáno z koní jezdeckých, chovných kobylek a staříků, kteří si užívají důchod na rozlehlých pastvinách.',
];

const DEFAULT_STORY_IMAGE =
  'https://images.unsplash.com/photo-1732302073237-f677bbc0b48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

/** Nadpis sekce pod hero — v CMS se neupravuje, jen text a obrázek. */
const STORY_SECTION_HEADING = 'Náš příběh';

function splitStoryParagraphs(content: string | undefined): string[] {
  if (!content?.trim()) return DEFAULT_STORY_FALLBACK;
  return content
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function About() {
  const { data: pageData } = usePageData('o-nas');
  const { settings } = useGlobalSettings();
  const resolvedHeroImage = resolveCmsImageUrl(undefined, settings?.heroImage);
  const resolvedStoryImage = resolveCmsImageUrl(
    pageData?.story?.image,
    undefined,
    DEFAULT_STORY_IMAGE,
  );

  const heroTitle = pageData?.hero?.title?.trim() || DEFAULT_HERO_TITLE;
  const heroSubtitle = pageData?.hero?.subtitle?.trim() || DEFAULT_HERO_SUBTITLE;
  const storyParagraphs = splitStoryParagraphs(pageData?.story?.content);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[18rem] h-[min(88svh,31rem)] items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] md:h-[37.5rem]">
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
              {heroTitle}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 drop-shadow-lg leading-relaxed max-w-2xl">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-[var(--farm-section-alt-bg)] -mt-[1px] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-8">
                {STORY_SECTION_HEADING}
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
                  src={resolvedStoryImage}
                  alt={STORY_SECTION_HEADING}
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

