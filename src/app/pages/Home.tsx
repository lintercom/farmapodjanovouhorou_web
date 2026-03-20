import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { FloatingCard } from '../components/FloatingCard';
import { FAQ } from '../components/FAQ';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Slider from 'react-slick';
import { Calendar } from 'lucide-react';
import { Users } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { Heart } from 'lucide-react';
import { usePageData } from '../hooks/usePageData';
import { useNavigate } from 'react-router';
import { defaultPageContent } from '../utils/defaultPageContent';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { resolveCmsImageUrl } from '../utils/media';

export function Home() {
  const { data: pageData, isLoading } = usePageData('domu');
  const { data: servicesData } = usePageData('sluzby');
  const { data: horsesData } = usePageData('nasi-kone');
  const { settings } = useGlobalSettings();
  const homeFallback = defaultPageContent['domu'] || {};
  const horsesFallback = defaultPageContent['nasi-kone']?.horses || [];
  const hero = pageData?.hero || homeFallback.hero || {};
  const resolvedHeroImage = resolveCmsImageUrl(hero.image, settings?.heroImage);
  const giftCard = pageData?.giftCard || homeFallback.giftCard || {};
  const testimonials = pageData?.testimonials || homeFallback.testimonials || { items: [] };
  const faq = pageData?.faq || homeFallback.faq || { items: [] };

  // Načíst služby ze stránky Služby, fallback na výchozí data z CMS defaultů.
  const services = servicesData?.services || homeFallback.services || [];

  // Načíst koně ze stránky Naši koně, fallback na výchozí data z CMS defaultů.
  const horses = horsesData?.horses || horsesFallback;

  // Custom arrow components for carousel
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[var(--farm-primary)] hover:text-white transition-all -mr-6"
        aria-label="DalĹˇĂ­"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[var(--farm-primary)] hover:text-white transition-all -ml-6"
        aria-label="PĹ™edchozĂ­"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    lazyLoad: 'ondemand' as const,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: false,
        }
      }
    ]
  };

  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[700px] md:h-[800px] flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={resolvedHeroImage}
            alt="Farma pod Janovou horou"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
        </div>
        
        {/* Bottom shadow for levitation effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]" />
        
        {/* Organic wave transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]" style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.08)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.08))' }}>
          <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,60 1200,40 L1200,120 L0,120 Z" fill="var(--farm-page-bg)" />
          </svg>
        </div>
        
        {!isLoading && (
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 md:pt-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-7 drop-shadow-2xl leading-tight whitespace-nowrap">
                {hero.title || 'Farma pod Janovou horou'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 drop-shadow-lg leading-relaxed max-w-2xl">
                {hero.subtitle || 'Rodinná farma zaměřená na práci s dětmi a koňmi. Nabízíme jezdecké kroužky, tábory a vyjížďky v krásné přírodě.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link to={hero.buttonLink || '/sluzby'}>
                  <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-2xl">
                    {hero.buttonText || 'Naše služby'}
                    <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </Button>
                </Link>
                <Link to={hero.secondaryButtonLink || '/kontakt'}>
                  <Button variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white/15 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white hover:text-[var(--farm-primary)] shadow-xl">
                    {hero.secondaryButtonText || 'Kontaktujte nás'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Services Section - Modern Asymmetric Layout */}
      <section className="py-24 md:py-32 bg-[var(--farm-section-alt-bg)] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-6">
              Co nabízíme
            </h2>
            <p className="text-lg md:text-xl text-[var(--farm-secondary-text)] max-w-3xl mx-auto">
              Objevte naše služby zaměřené na práci s koňmi a radost dětí
            </p>
          </div>

          {/* Services Carousel */}
          <div className="relative px-8 pt-8 pb-16 mb-8 overflow-visible">
            <Slider {...sliderSettings}>
              {services.map((service, index) => (
                <div key={service.id} className="px-4 pb-4 pt-4">
                  <FloatingCard className="flex flex-col h-full md:h-[600px]">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 -mt-2 flex-shrink-0">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--farm-primary-text)] mb-4">
                      {service.title}
                    </h3>
                    <p className="text-[var(--farm-secondary-text)] leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    <Link to={`/sluzby#${service.id}`} className="mt-6 w-full px-6 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center border-2 border-[var(--farm-primary)] text-[var(--farm-primary)] hover:bg-[var(--farm-primary)] hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-center flex-shrink-0">
                      Zjistit více
                    </Link>
                  </FloatingCard>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Horses Preview Section */}
      <section className="py-24 md:py-32 bg-[var(--farm-page-bg)] relative overflow-visible">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-section-alt-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-visible">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-6">
              Naši koně
            </h2>
            <p className="text-lg md:text-xl text-[var(--farm-secondary-text)] max-w-2xl mx-auto">
              Seznamte se s našimi čtyřnohými přáteli
            </p>
          </div>

          <div className="relative px-8 pt-20 pb-16 mb-8 overflow-visible">
            <Slider {...sliderSettings}>
              {horses.slice(0, 6).map((horse, index) => (
                <div key={horse.id || horse.name || index} className="px-4 pb-4 pt-4">
                  <Link 
                    to={`/nasi-kone#${(horse.id || horse.name || '').toString().toLowerCase().replace(/\s+/g, '-')}`}
                    className="block bg-white rounded-3xl p-6 shadow-[var(--farm-shadow-lg)] border-2 border-[var(--farm-border)] hover:shadow-[var(--farm-shadow-xl)] transition-all duration-300 md:h-[520px] flex flex-col cursor-pointer hover:scale-[1.02] hover:border-[var(--farm-accent-green)]"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden mb-5 ring-2 ring-[var(--farm-primary)]/10 flex-shrink-0">
                      <ImageWithFallback
                        src={horse.image || horse.images?.[0] || 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1080&q=80'}
                        alt={horse.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="text-center flex flex-col">
                      <h3 className="text-2xl font-semibold text-[var(--farm-primary-text)] mb-2">
                        {horse.name}
                      </h3>
                      <p className="text-base text-[var(--farm-warm-brown)] font-medium mb-4">
                        {horse.breed}
                      </p>
                      <p className="text-[var(--farm-secondary-text)] leading-relaxed md:line-clamp-2">
                        {horse.description || horse.temperament}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>

          <div className="text-center">
            <Link to="/nasi-kone">
              <Button variant="primary">
                Zobrazit všechny koně
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[var(--farm-bg-tertiary)] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FloatingCard hover={false} className="p-10 md:p-14 lg:p-16 bg-white shadow-[var(--farm-shadow-xl)]">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--farm-primary-text)] mb-6 leading-tight">
              {giftCard.title || 'Dárkový poukaz'}
            </h2>
            <p className="text-lg md:text-xl text-[var(--farm-secondary-text)] mb-12 max-w-2xl mx-auto leading-relaxed">
              {giftCard.subtitle || 'Potěšte své blízké nezapomenutelným zážitkem. Dárkový poukaz na vyjížďku je ideální dárek pro milovníky koní a přírody.'}
            </p>
            
            {/* Gift Card Features */}
            <div className="flex justify-center mb-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--farm-primary-light)] flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-[var(--farm-primary)]" />
                </div>
                <p className="font-bold text-lg text-[var(--farm-primary-text)] mb-2">Platnost 6 měsíců</p>
                <p className="text-sm text-[var(--farm-secondary-text)]">Dost času na využití dárku</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt?tab=poukaz">
                <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-4">
                  Koupit poukaz
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Button>
              </Link>
            </div>
          </FloatingCard>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-[var(--farm-bg-tertiary)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-6">
              {testimonials.title || 'Co o nás říkají'}
            </h2>
            <p className="text-lg md:text-xl text-[var(--farm-secondary-text)] max-w-2xl mx-auto">
              {testimonials.subtitle || 'Přečtěte si zkušenosti našich spokojených klientů'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {(testimonials.items || []).slice(0, 3).map((item: any, idx: number) => (
              <FloatingCard key={item.id || idx}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-[var(--farm-primary-light)] flex items-center justify-center">
                    <span className="text-[var(--farm-primary)] font-semibold text-lg">
                      {item.authorInitials || item.authorName?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'FP'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--farm-primary-text)]">{item.authorName}</p>
                    <p className="text-sm text-[var(--farm-text-muted)]">{item.authorRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-[var(--farm-accent)]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[var(--farm-secondary-text)] leading-relaxed italic">"{item.text}"</p>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-[var(--farm-section-alt-bg)] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-bg-tertiary)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-6">
              {faq.title || 'Často kladené dotazy'}
            </h2>
            <p className="text-lg md:text-xl text-[var(--farm-secondary-text)]">
              {faq.subtitle || 'Odpovědi na nejčastější otázky'}
            </p>
          </div>

          <FAQ
            items={faq.items || []}
          />
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
