import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Users, Sparkles, Heart, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { FloatingCard } from '../components/FloatingCard';
import { FAQ } from '../components/FAQ';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { normalizeCmsInternalHref } from '../utils/cmsInternalLinks';
import Slider from 'react-slick';
import { usePageContent } from '../hooks/usePageContent';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { resolveCmsImageUrl } from '../utils/media';

export function HomeCMS() {
  const { content, isLoading } = usePageContent('domu');
  const { settings } = useGlobalSettings();
  const resolvedHeroImage = resolveCmsImageUrl(content?.hero?.image, settings?.heroImage);

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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--farm-accent-green)]" />
      </div>
    );
  }

  const iconMap: Record<string, any> = {
    Heart,
    Users,
    Sparkles,
    Calendar,
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={resolvedHeroImage}
            alt="Farma pod Janovou horou"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            {content?.hero?.title || 'Farma pod Janovou horou'}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md">
            {content?.hero?.subtitle || 'RodinnĂˇ farma zamÄ›Ĺ™enĂˇ na prĂˇci s dÄ›tmi a koĹmi v krĂˇsnĂ© pĹ™Ă­rodÄ› Vizovicka'}
          </p>
          <Link to={normalizeCmsInternalHref(content?.hero?.buttonLink) || '/sluzby'}>
            <Button variant="primary" size="lg" className="gap-2">
              {content?.hero?.buttonText || 'Zjistit vĂ­ce'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--farm-page-bg)] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-4">
              NaĹˇe sluĹľby
            </h2>
            <p className="text-lg text-[var(--farm-secondary-text)] max-w-2xl mx-auto">
              Objevte naĹˇi nabĂ­dku aktivit pro dÄ›ti i dospÄ›lĂ©
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {content?.services?.map((service: any) => (
              <FloatingCard key={service.id}>
                {service.image && (
                  <div className="aspect-video rounded-xl overflow-hidden mb-6">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      fallbackText={service.title}
                    />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-[var(--farm-primary-text)] mb-3">
                  {service.title}
                </h3>
                <p className="text-[var(--farm-secondary-text)] leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link to={normalizeCmsInternalHref(service.link) || '/sluzby'}>
                  <Button variant="outline" className="gap-2 w-full">
                    Zjistit vĂ­ce
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {content?.features && content.features.length > 0 && (
        <section className="py-16 sm:py-20 bg-white px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--farm-primary-text)] mb-4">
                ProÄŤ si vybrat nĂˇs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.features.map((feature: any, index: number) => {
                const Icon = iconMap[feature.icon] || Heart;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-[var(--farm-accent-green)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-[var(--farm-accent-green)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--farm-primary-text)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--farm-secondary-text)]">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-[var(--farm-page-bg)] px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--farm-primary-text)] mb-4">
              ÄŚasto kladenĂ© otĂˇzky
            </h2>
            <p className="text-lg text-[var(--farm-secondary-text)]">
              MĂˇte otĂˇzky? MoĹľnĂˇ najdete odpovÄ›ÄŹ zde
            </p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[var(--farm-primary)] text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            PĹ™ipraveni na nezapomenutelnĂ˝ zĂˇĹľitek?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Kontaktujte nĂˇs a domluvte si nĂˇvĹˇtÄ›vu naĹˇĂ­ farmy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kontakt">
              <Button variant="secondary" size="lg" className="gap-2">
                Kontaktovat nĂˇs
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/blog">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-white border-white hover:bg-white/10"
              >
                Blog
                <Calendar className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
