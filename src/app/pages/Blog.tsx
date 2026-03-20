import { useState } from 'react';
import { FloatingCard } from '../components/FloatingCard';
import { Modal } from '../components/Modal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';
import { Button } from '../components/Button';
import { usePageContent } from '../hooks/usePageContent';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { resolveCmsImageUrl } from '../utils/media';

interface Event {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
}

export function Blog() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { content, isLoading, error } = usePageContent('blog');
  const { settings } = useGlobalSettings();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--farm-secondary-text)]">NaÄŤĂ­tĂˇnĂ­...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Chyba pĹ™i naÄŤĂ­tĂˇnĂ­ dat: {error}</p>
      </div>
    );
  }

  const hero = content?.hero || { title: 'Blog', subtitle: '' };
  const resolvedHeroImage = resolveCmsImageUrl(hero.image, settings?.heroImage);
  const events: Event[] = content?.events || [];

  const handlePrevEvent = () => {
    if (selectedEvent) {
      const currentIndex = events.findIndex((e) => e.id === selectedEvent.id);
      const prevIndex = currentIndex === 0 ? events.length - 1 : currentIndex - 1;
      setSelectedEvent(events[prevIndex]);
    }
  };

  const handleNextEvent = () => {
    if (selectedEvent) {
      const currentIndex = events.findIndex((e) => e.id === selectedEvent.id);
      const nextIndex = currentIndex === events.length - 1 ? 0 : currentIndex + 1;
      setSelectedEvent(events[nextIndex]);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={resolvedHeroImage}
            alt="Blog"
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
              {hero.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 drop-shadow-lg leading-relaxed max-w-2xl">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 bg-[var(--farm-section-alt-bg)] -mt-[1px] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            {events.map((event) => (
              <FloatingCard
                key={event.id}
                className="cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image - Left Side */}
                  <div className="md:w-80 flex-shrink-0">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content - Right Side */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-semibold text-[var(--farm-primary-text)] mb-4">
                      {event.title}
                    </h3>

                    <p className="text-[var(--farm-secondary-text)] leading-relaxed mb-4">
                      {event.description}
                    </p>

                    <div className="text-sm text-[var(--farm-accent-green)] font-medium mt-auto">
                      Zobrazit detail â†’
                    </div>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-[var(--farm-secondary-text)]">
                Ĺ˝ĂˇdnĂ© pĹ™Ă­spÄ›vky nenalezeny
              </p>
            </div>
          )}
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
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
        onPrevious={handlePrevEvent}
        onNext={handleNextEvent}
      >
        {selectedEvent && (
          <div className="flex flex-col md:flex-row gap-0 h-full">
            {/* Left Side - Large Image (40%) */}
            <div className="md:w-[40%] flex-shrink-0 relative">
              <div className="h-[300px] md:h-full rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
                <ImageWithFallback
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Article Content (60%) */}
            <div className="md:w-[60%] flex flex-col overflow-hidden">
              <div className="overflow-y-auto flex-1 px-6 md:px-12 py-6 md:py-10" style={{ maxHeight: 'calc(80vh - 40px)' }}>
                {/* Main Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--farm-primary-text)] mb-8 leading-tight">
                  {selectedEvent.title}
                </h2>

                {/* Highlighted Intro/Perex */}
                <div className="bg-[var(--farm-primary-light)]/30 border-l-4 border-[var(--farm-accent-green)] rounded-r-xl p-6 mb-8">
                  <p className="text-base md:text-lg text-[var(--farm-text-primary)] italic leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Main Content */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[var(--farm-primary-text)] mb-4">
                    Obsah:
                  </h3>
                  <div className="prose prose-base max-w-none">
                    <div className="text-[var(--farm-text-primary)] leading-relaxed whitespace-pre-line">
                      {selectedEvent.fullDescription}
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
