import { useState, useEffect, useMemo } from 'react';
import { FloatingCard } from '../components/FloatingCard';
import { Modal } from '../components/Modal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, Calendar, Heart } from 'lucide-react';
import { Button } from '../components/Button';
import { usePageData } from '../hooks/usePageData';
import { useLocation } from 'react-router';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { resolveCmsImageUrl } from '../utils/media';
import { horseLifeSummaryDetail, horseLifeSummaryShort } from '../utils/horseBirthDate';
import { horseGalleryImagePositionStyle } from '../utils/horseCardImage';

interface Horse {
  id?: number;
  name: string;
  breed: string;
  /** ISO YYYY-MM-DD; preferováno před legacy `age` */
  birthDate?: string;
  /** @deprecated použijte birthDate */
  age?: number | string;
  color: string;
  description: string;
  temperament?: string;
  personality?: string;
  specialSkills?: string[];
  images: string[];
  /** 0–100, ohnisko ořezu náhledu v kartě (1. fotka; duplicitně s galleryImageFocus[0]) */
  cardImageFocusX?: number;
  cardImageFocusY?: number;
  /** Ohnisko pro každou fotku galerie (modal + 1. snímek = karta) */
  galleryImageFocus?: { x: number; y: number }[];
}

export function Horses() {
  const { data: pageData, isLoading } = usePageData('nasi-kone');
  const { settings } = useGlobalSettings();
  const resolvedHeroImage = resolveCmsImageUrl(pageData?.hero?.image, settings?.heroImage);
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Default horses data (memoized to prevent recreating on every render)
  const defaultHorses: Horse[] = useMemo(() => [
    {
      id: 1,
      name: 'BěluĹˇka',
      breed: 'Welsh Pony',
      birthDate: '2018-06-01',
      color: 'Bílá',
      description: 'BěluĹˇka je naĹˇe nejmilejĹˇí kobylka, která má obzvláĹˇtě ráda děti. Je to ideální kĹŻĹ pro zaÄŤáteÄŤníky díky své klidné povaze a trpělivosti.',
      personality: 'Klidná, trpělivá, laskavá',
      specialSkills: ['Výuka zaÄŤáteÄŤníkĹŻ', 'Terapeutické jeĹľdění', 'PĹ™átelská ke vĹˇem dětem'],
      images: [
        'https://images.unsplash.com/photo-1676039201169-0fc8aa39ac61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGhvcnNlJTIwbWVhZG93fGVufDF8fHx8MTc3MjAyNzk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1080&q=80',
        'https://images.unsplash.com/photo-1598974357801-1d4d9d2f2280?w=1080&q=80',
      ],
    },
    {
      id: 2,
      name: 'Čert',
      breed: 'Fríský kĹŻĹ',
      birthDate: '2016-06-01',
      color: 'Vraník',
      description: 'Čert je majestátní fríský valach s úĹľasnou povahou. Navzdory svému impozantnímu vzhledu je velmi klidný a spolehlivý.',
      personality: 'Majestátní, klidný, spolehlivý',
      specialSkills: ['PokroÄŤilá výuka', 'Drezura', 'VyjíĹľďky'],
      images: [
        'https://images.unsplash.com/photo-1656964353220-99aa5acc47e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvcnNlJTIwc3RhYmxlfGVufDF8fHx8MTc3MjAyNzk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=1080&q=80',
        'https://images.unsplash.com/photo-1596465095054-b020b1e4a945?w=1080&q=80',
      ],
    },
    {
      id: 3,
      name: 'Hnědák',
      breed: 'Český teplokrevník',
      birthDate: '2014-06-01',
      color: 'Hnědák',
      description: 'Hnědák je energický valach, který má rád dlouhé vyjíĹľďky do pĹ™írody. Je vhodný pro pokroÄŤilejĹˇí jezdce, kteĹ™í zvládají vĹˇechny chody.',
      personality: 'Energický, pĹ™átelský, inteligentní',
      specialSkills: ['Dlouhé vyjíĹľďky', 'Terénní jeĹľdění', 'Cval v terénu'],
      images: [
        'https://images.unsplash.com/photo-1587778907607-d36fc21ac297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGhvcnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxOTMyNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1568572933382-74d440642117?w=1080&q=80',
      ],
    },
    {
      id: 4,
      name: 'Zlatka',
      breed: 'Hafling',
      birthDate: '2020-06-01',
      color: 'Plavák',
      description: 'Zlatka je mladá kobylka plemene hafling s krásnou hĹ™ívou. Je hravá a energická, ideální pro děti se zkuĹˇenostmi.',
      personality: 'Hravá, energická, bystrá',
      specialSkills: ['KrouĹľky pro pokroÄŤilé', 'Skoky', 'Terénní jeĹľdění'],
      images: [
        'https://images.unsplash.com/photo-1732302073237-f677bbc0b48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZXMlMjBncmF6aW5nJTIwZmllbGR8ZW58MXx8fHwxNzcxOTU3MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1598978546583-fea0885fca8c?w=1080&q=80',
        'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1080&q=80',
      ],
    },
    {
      id: 5,
      name: 'Rebel',
      breed: 'Quarter Horse',
      birthDate: '2017-06-01',
      color: 'Ryzák',
      description: 'Rebel je americký quarter horse s výbornou povahou. Je velmi inteligentní a rychle se uÄŤí nové věci.',
      personality: 'Inteligentní, uÄŤenlivý, vyrovnaný',
      specialSkills: ['Western jeĹľdění', 'Výuka pokroÄŤilých', 'VyjíĹľďky'],
      images: [
        'https://images.unsplash.com/photo-1760450994357-e84b95398be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYWN0aXZpdGllcyUyMGNoaWxkcmVufGVufDF8fHx8MTc3MjAyNzk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=1080&q=80',
      ],
    },
    {
      id: 6,
      name: 'HvězdiÄŤka',
      breed: 'Shetlandský pony',
      birthDate: '2011-06-01',
      color: 'Hnědák',
      description: 'HvězdiÄŤka je nejmenĹˇí ÄŤlen naĹˇí stáje. Díky své velikosti je ideální pro ty nejmenĹˇí zaÄŤáteÄŤnky.',
      personality: 'Laskavá, pĹ™átelská, stabilní',
      specialSkills: ['Výuka nejmenĹˇích dětí', 'Vodění', 'PéÄŤe o poníka'],
      images: [
        'https://images.unsplash.com/photo-1759272193695-27d07d05c15f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJuJTIwc3RhYmxlJTIwcnVyYWx8ZW58MXx8fHwxNzcyMDI4MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1591364411747-d7b3f5f7e656?w=1080&q=80',
      ],
    },
  ], []);

  // Use horses from CMS or fallback to default (memoized for stable reference)
  const horses: Horse[] = useMemo(() => {
    return pageData?.horses && pageData.horses.length > 0 
      ? pageData.horses.map((horse: any, index: number) => ({
          ...horse,
          id: horse.id || index + 1,
          images: horse.images && horse.images.length > 0 ? horse.images : ['https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1080&q=80']
        }))
      : defaultHorses;
  }, [pageData?.horses, defaultHorses]);

  const handlePrevImage = () => {
    if (selectedHorse) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : selectedHorse.images.length - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedHorse) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < selectedHorse.images.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  const handlePrevHorse = () => {
    if (selectedHorse) {
      const currentIndex = horses.findIndex((h) => h.id === selectedHorse.id);
      const prevIndex = currentIndex === 0 ? horses.length - 1 : currentIndex - 1;
      setSelectedHorse(horses[prevIndex]);
      setCurrentImageIndex(0);
    }
  };

  const handleNextHorse = () => {
    if (selectedHorse) {
      const currentIndex = horses.findIndex((h) => h.id === selectedHorse.id);
      const nextIndex = currentIndex === horses.length - 1 ? 0 : currentIndex + 1;
      setSelectedHorse(horses[nextIndex]);
      setCurrentImageIndex(0);
    }
  };

  // Automatically open modal if a horse is specified in the URL hash
  const location = useLocation();
  useEffect(() => {
    // Get hash from URL (e.g., #beluska)
    const hash = location.hash.replace('#', '');
    
    if (hash && horses.length > 0) {
      // Try to find horse by ID first (if numeric), then by name (kebab-case)
      const horse = horses.find((h) => {
        const horseIdSlug = (h.id || h.name || '').toString().toLowerCase().replace(/\s+/g, '-');
        const horseNameSlug = h.name.toLowerCase().replace(/\s+/g, '-');
        return horseIdSlug === hash || horseNameSlug === hash;
      });
      
      if (horse) {
        setSelectedHorse(horse);
        setCurrentImageIndex(0);
      }
    }
  }, [location.hash, horses]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={resolvedHeroImage}
            alt="NaĹˇi koně"
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
              NaĹˇi koně
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 drop-shadow-lg leading-relaxed max-w-2xl">
              Seznamte se s naĹˇimi úĹľasnými koĹmi a poníky, kteĹ™í jsou srdcem naĹˇí farmy.
            </p>
          </div>
        </div>
      </section>

      {/* Horses Grid */}
      <section className="py-24 md:py-28 bg-[var(--farm-section-alt-bg)] -mt-[1px] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {horses.map((horse) => (
              <FloatingCard
                key={horse.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedHorse(horse);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="aspect-[5/6] rounded-2xl overflow-hidden mb-5 -mt-2 bg-[var(--farm-section-alt-bg)] ring-1 ring-[var(--farm-border)]/40">
                  <ImageWithFallback
                    src={horse.images[0]}
                    alt={horse.name}
                    className="h-full w-full object-cover"
                    style={horseGalleryImagePositionStyle(horse, 0)}
                  />
                </div>
                
                <h3 className="text-2xl font-semibold text-[var(--farm-primary-text)] mb-2">
                  {horse.name}
                </h3>
                
                <p className="text-base text-[var(--farm-warm-brown)] mb-4">
                  {horse.breed}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-[var(--farm-secondary-text)] mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{horseLifeSummaryShort(horse)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{horse.color}</span>
                  </div>
                </div>
                
                <p className="text-[var(--farm-secondary-text)] text-sm line-clamp-2">
                  {horse.description}
                </p>
                
                <div className="relative mt-5 inline-flex w-fit text-sm font-medium text-[var(--farm-accent-green)] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">
                  Zobrazit koně
                </div>
              </FloatingCard>
            ))}
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

      {/* Modal */}
      <Modal
        isOpen={selectedHorse !== null}
        onClose={() => setSelectedHorse(null)}
        title={selectedHorse?.name}
        onPrevious={handlePrevHorse}
        onNext={handleNextHorse}
      >
        {selectedHorse && (
          <div className="flex min-h-0 min-w-0 max-w-full flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto overscroll-y-contain pb-2 md:flex-row md:gap-5 md:overflow-y-auto md:overscroll-y-contain md:pb-0 lg:gap-7">
            {/* Galerie — na mobilu bez aspect-ratio (kvůli ořezu); výška dle svh; od md pevnější box */}
            <div className="flex w-full min-h-0 min-w-0 flex-shrink-0 flex-col md:flex-[1.45] md:self-stretch">
              <div className="flex w-full max-md:flex-none flex-col items-center justify-start gap-3 md:min-h-0 md:flex-1 md:max-h-full md:justify-center">
                <div className="relative mx-auto flex w-full min-w-0 max-w-full justify-center md:min-h-0 md:flex-1 md:items-center">
                  {/* inline-block + object-contain: celý snímek vidět; rámeček obepne fotku (žádný pevný 5/6 cover-ořez) */}
                  <div className="relative inline-block max-w-full overflow-hidden rounded-2xl bg-[var(--farm-section-alt-bg)]">
                    <ImageWithFallback
                      src={selectedHorse.images[currentImageIndex]}
                      alt={selectedHorse.name}
                      className={`mx-auto block h-auto max-w-full rounded-2xl object-contain object-center max-md:max-h-[min(44svh,340px)] max-md:landscape:max-h-[min(32svh,216px)] sm:max-md:max-h-[min(46svh,360px)] sm:max-md:landscape:max-h-[min(36svh,236px)] ${
                        selectedHorse.images.length > 1
                          ? 'md:max-h-[min(460px,54dvh,calc(100dvh-16.5rem))]'
                          : 'md:max-h-[min(600px,64dvh,calc(100dvh-13.5rem))]'
                      }`}
                      style={horseGalleryImagePositionStyle(selectedHorse, currentImageIndex)}
                    />
                    {selectedHorse.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage();
                          }}
                          className="absolute left-1 top-1/2 z-[1] flex h-11 w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-white/90 text-[var(--farm-primary)] shadow-lg transition-all hover:bg-white sm:left-3 sm:h-10 sm:w-10"
                          aria-label="Předchozí fotka"
                        >
                          <ChevronLeft className="h-5 w-5 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage();
                          }}
                          className="absolute right-1 top-1/2 z-[1] flex h-11 w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-white/90 text-[var(--farm-primary)] shadow-lg transition-all hover:bg-white sm:right-3 sm:h-10 sm:w-10"
                          aria-label="Další fotka"
                        >
                          <ChevronRight className="h-5 w-5 sm:h-5 sm:w-5" />
                        </button>
                        <div className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white sm:bottom-3 sm:right-3 sm:px-3 sm:py-1.5 sm:text-sm">
                          {currentImageIndex + 1} / {selectedHorse.images.length}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {selectedHorse.images.length > 1 && (
                  <div className="flex w-full max-w-full touch-pan-x justify-center gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:thin] md:flex-shrink-0 [&::-webkit-scrollbar]:h-1.5">
                    {selectedHorse.images.map((thumbUrl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentImageIndex(i)}
                        className={`relative flex h-16 min-h-[44px] w-[4.5rem] min-w-[44px] flex-shrink-0 touch-manipulation overflow-hidden rounded-lg ring-2 transition-shadow sm:h-[4.5rem] sm:w-20 ${
                          i === currentImageIndex
                            ? 'ring-[var(--farm-primary)] ring-offset-2 ring-offset-white'
                            : 'ring-transparent opacity-80 hover:opacity-100'
                        }`}
                        aria-label={`Fotka ${i + 1} z ${selectedHorse.images.length}`}
                        aria-current={i === currentImageIndex ? 'true' : undefined}
                      >
                        <img
                          src={thumbUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Text + meta — mobil: jeden scroll s fotkou; desktop: scroll jen v textu při dlouhém obsahu */}
            <div className="flex w-full min-w-0 max-w-full flex-col max-md:flex-none md:min-h-0 md:max-w-[min(100%,22rem)] md:flex-shrink-0 md:self-stretch lg:max-w-sm">
              <div className="pr-1 md:min-h-0 md:flex-1 md:overflow-y-auto">
                <h3 className="mb-2 text-base font-semibold text-[var(--farm-primary-text)] sm:mb-3 sm:text-lg md:text-xl">
                  Informace
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-start gap-2">
                      <Heart className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--farm-accent-green)] sm:h-5 sm:w-5" />
                      <div>
                        <div className="mb-0.5 text-xs text-[var(--farm-secondary-text)]">Barva</div>
                        <div className="text-sm font-medium text-[var(--farm-primary-text)] sm:text-base">{selectedHorse.color}</div>
                      </div>
                    </div>
                    {selectedHorse.personality && (
                      <div className="flex items-start gap-2">
                        <Heart className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--farm-accent-green)] sm:h-5 sm:w-5" />
                        <div>
                          <div className="mb-0.5 text-xs text-[var(--farm-secondary-text)]">Povaha</div>
                          <div className="text-sm font-medium text-[var(--farm-primary-text)] sm:text-base">{selectedHorse.personality}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 pt-3 sm:pt-4">
                    <h4 className="mb-1.5 text-sm font-semibold text-[var(--farm-primary-text)] sm:mb-2 sm:text-base">
                      O {selectedHorse.name}
                    </h4>
                    <p className="text-xs leading-relaxed text-[var(--farm-secondary-text)] sm:text-sm">
                      {selectedHorse.description}
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-gray-200 pt-3 sm:pt-4">
                    <div className="flex items-center gap-2 rounded-xl bg-[var(--farm-section-alt-bg)] p-2.5 sm:p-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--farm-accent-green)]/10 sm:h-10 sm:w-10">
                        <Heart className="h-4 w-4 text-[var(--farm-accent-green)] sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-[var(--farm-secondary-text)] sm:text-xs">Plemeno</div>
                        <div className="truncate text-sm font-semibold text-[var(--farm-primary-text)]">{selectedHorse.breed}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-[var(--farm-section-alt-bg)] p-2.5 sm:p-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--farm-accent-green)]/10 sm:h-10 sm:w-10">
                        <Calendar className="h-4 w-4 text-[var(--farm-accent-green)] sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-[var(--farm-secondary-text)] sm:text-xs">Datum narození</div>
                        <div className="text-sm font-semibold leading-snug text-[var(--farm-primary-text)]">
                          {horseLifeSummaryDetail(selectedHorse)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
