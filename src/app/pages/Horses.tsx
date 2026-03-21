import { useState, useEffect, useMemo } from 'react';
import { FloatingCard } from '../components/FloatingCard';
import { Modal } from '../components/Modal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, X, Calendar, Heart, Award } from 'lucide-react';
import { Button } from '../components/Button';
import { usePageData } from '../hooks/usePageData';
import { useLocation } from 'react-router';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { resolveCmsImageUrl } from '../utils/media';

interface Horse {
  id?: number;
  name: string;
  breed: string;
  age?: number | string;
  color: string;
  description: string;
  temperament?: string;
  personality?: string;
  specialSkills?: string[];
  images: string[];
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
      age: 8,
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
      age: 10,
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
      age: 12,
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
      age: 6,
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
      age: 9,
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
      age: 15,
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
      <section className="py-24 bg-[var(--farm-section-alt-bg)] -mt-[1px] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {horses.map((horse) => (
              <FloatingCard
                key={horse.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedHorse(horse);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-5 -mt-2">
                  <ImageWithFallback
                    src={horse.images[0]}
                    alt={horse.name}
                    className="w-full h-full object-cover"
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
                    <span>{horse.age} let</span>
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
          <div className="flex flex-col md:flex-row gap-3 sm:gap-6 md:gap-8 h-full">
            {/* Left Side - Image & Basic Info (55% on desktop) */}
            <div className="md:w-[55%] flex flex-col gap-2 sm:gap-4">
              {/* Horse Image */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={selectedHorse.images[currentImageIndex]}
                    alt={selectedHorse.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Navigation Arrows */}
                {selectedHorse.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[var(--farm-primary)] p-1.5 sm:p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[var(--farm-primary)] p-1.5 sm:p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    {/* Image Counter */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/60 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                      {currentImageIndex + 1} / {selectedHorse.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Breed & Age Cards - Full width */}
              <div className="flex gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 bg-[var(--farm-section-alt-bg)] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex-1">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[var(--farm-accent-green)]/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-[var(--farm-accent-green)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs text-[var(--farm-secondary-text)] mb-0.5 sm:mb-1">Plemeno</div>
                    <div className="font-semibold text-sm sm:text-lg text-[var(--farm-primary-text)] truncate">{selectedHorse.breed}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 bg-[var(--farm-section-alt-bg)] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex-1">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[var(--farm-accent-green)]/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-[var(--farm-accent-green)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs text-[var(--farm-secondary-text)] mb-0.5 sm:mb-1">Věk</div>
                    <div className="font-semibold text-sm sm:text-lg text-[var(--farm-primary-text)]">{selectedHorse.age} let</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Scrollable Details (45% on desktop) */}
            <div className="md:w-[45%] flex flex-col min-h-0">
              <h3 className="text-lg sm:text-2xl font-semibold text-[var(--farm-primary-text)] mb-3 sm:mb-6">
                Informace
              </h3>
              
              <div className="overflow-y-auto flex-1 pr-1 sm:pr-2 space-y-3 sm:space-y-6" style={{ maxHeight: 'calc(80vh - 150px)' }}>
                {/* Color & Personality */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--farm-accent-green)] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm text-[var(--farm-secondary-text)] mb-0.5 sm:mb-1">Barva</div>
                      <div className="text-sm sm:text-base font-medium text-[var(--farm-primary-text)]">{selectedHorse.color}</div>
                    </div>
                  </div>
                  
                  {selectedHorse.personality && (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--farm-accent-green)] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs sm:text-sm text-[var(--farm-secondary-text)] mb-0.5 sm:mb-1">Povaha</div>
                        <div className="text-sm sm:text-base font-medium text-[var(--farm-primary-text)]">{selectedHorse.personality}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="border-t border-gray-200 pt-3 sm:pt-6">
                  <h4 className="font-semibold text-[var(--farm-primary-text)] mb-2 sm:mb-3 text-sm sm:text-base">
                    O {selectedHorse.name}
                  </h4>
                  <p className="text-[var(--farm-secondary-text)] leading-relaxed text-xs sm:text-sm">
                    {selectedHorse.description}
                  </p>
                </div>

                {/* Special Skills */}
                {selectedHorse.specialSkills && selectedHorse.specialSkills.length > 0 && (
                  <div className="border-t border-gray-200 pt-3 sm:pt-6">
                    <h4 className="font-semibold text-[var(--farm-primary-text)] mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--farm-accent-green)]" />
                      Speciální dovednosti
                    </h4>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {selectedHorse.specialSkills.map((skill, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 sm:gap-2.5 text-[var(--farm-secondary-text)] text-xs sm:text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--farm-accent-green)] flex-shrink-0" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
