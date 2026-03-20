import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { FloatingCard } from '../components/FloatingCard';
import { Button } from '../components/Button';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, Calendar, Users, Compass, Gift, Landmark, Share2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useContactData } from '../hooks/useContactData';
import { usePageData } from '../hooks/usePageData';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { resolveCmsImageUrl } from '../utils/media';

type TabType = 'kontakt' | 'tabor' | 'krouzek' | 'vyjizdy' | 'poukaz';

export function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('kontakt');
  const { contactData, isLoading } = useContactData();
  const { data: pageData } = usePageData('kontakt');
  const { settings } = useGlobalSettings();
  const resolvedHeroImage = resolveCmsImageUrl(pageData?.hero?.image, settings?.heroImage);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Read tab from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab') as TabType;
    if (tab && ['kontakt', 'tabor', 'krouzek', 'vyjizdy', 'poukaz'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Update URL without triggering scroll
    window.history.replaceState(null, '', `?tab=${tab}`);
  };

  const handleTabClick = (e: React.MouseEvent, tab: TabType) => {
    e.preventDefault();
    e.stopPropagation();
    handleTabChange(tab);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Děkujeme za vaĹˇi zprávu! Ozveme se vám co nejdĹ™íve.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const tabs = [
    { id: 'tabor' as TabType, label: 'Rezervace tábora', icon: Calendar },
    { id: 'krouzek' as TabType, label: 'Rezervace krouĹľku', icon: Users },
    { id: 'vyjizdy' as TabType, label: 'Rezervace vyjíĹľďky', icon: Compass },
    { id: 'poukaz' as TabType, label: 'Poukaz', icon: Gift },
    { id: 'kontakt' as TabType, label: 'Kontakt', icon: MessageCircle },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={resolvedHeroImage}
            alt="Kontakt"
            className="w-full h-full object-cover object-center"
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 md:pt-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-7 drop-shadow-2xl leading-tight">
              Kontakt a rezervace
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 drop-shadow-lg leading-relaxed max-w-2xl">
              NapiĹˇte nám nebo se rovnou pĹ™ihlaste na naĹˇe aktivity
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-12 bg-[var(--farm-page-bg)] relative overflow-hidden -mt-[1px]">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => handleTabClick(e, tab.id)}
                  className={`relative p-6 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-105'
                      : 'bg-white/60 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isActive 
                        ? 'bg-[var(--farm-accent-green)] text-white' 
                        : 'bg-[var(--farm-accent-green)]/10 text-[var(--farm-accent-green)]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium text-center ${
                      isActive ? 'text-[var(--farm-primary-text)]' : 'text-[var(--farm-secondary-text)]'
                    }`}>
                      {tab.label}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--farm-accent-green)] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-24 bg-[var(--farm-section-alt-bg)] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Kontakt Tab */}
          {activeTab === 'kontakt' && (
            <div className="space-y-16">
              {/* Contact Info & Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left - Contact Info */}
                <div>
                  <FloatingCard hover={false}>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--farm-primary-text)] mb-8">
                      Kontaktujte nás
                    </h2>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--farm-accent-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-[var(--farm-accent-green)]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--farm-primary-text)] mb-2">
                            Telefon
                          </h3>
                          <a
                            href={`tel:${contactData.phone.replace(/\s/g, '')}`}
                            className="text-[var(--farm-secondary-text)] hover:text-[var(--farm-accent-green)] transition-colors"
                          >
                            {contactData.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--farm-accent-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-[var(--farm-accent-green)]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--farm-primary-text)] mb-2">
                            Email
                          </h3>
                          <a
                            href={`mailto:${contactData.email}`}
                            className="text-[var(--farm-secondary-text)] hover:text-[var(--farm-accent-green)] transition-colors break-all"
                          >
                            {contactData.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--farm-accent-green)]/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-[var(--farm-accent-green)]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--farm-primary-text)] mb-2">
                            Adresa
                          </h3>
                          <p className="text-[var(--farm-secondary-text)]">
                            {contactData.address}<br />
                            {contactData.postalCode} {contactData.city}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--farm-accent-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-[var(--farm-accent-green)]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--farm-primary-text)] mb-2">
                            Otevírací doba
                          </h3>
                          <div className="text-[var(--farm-secondary-text)] space-y-1">
                            <p>{contactData.openingHours.weekdays}</p>
                            <p>{contactData.openingHours.weekend}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--farm-accent-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Share2 className="w-6 h-6 text-[var(--farm-accent-green)]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--farm-primary-text)] mb-2">
                            Sociální sítě
                          </h3>
                          <div className="flex gap-3">
                            <a
                              href={contactData.socialMedia.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-[var(--farm-secondary-text)] hover:text-[var(--farm-accent-green)] transition-colors"
                            >
                              <Facebook className="w-4 h-4" />
                              Facebook
                            </a>
                            <span className="text-gray-300">|</span>
                            <a
                              href={contactData.socialMedia.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-[var(--farm-secondary-text)] hover:text-[var(--farm-accent-green)] transition-colors"
                            >
                              <Instagram className="w-4 h-4" />
                              Instagram
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[var(--farm-accent-green)]/10 flex items-center justify-center flex-shrink-0">
                            <Landmark className="w-6 h-6 text-[var(--farm-accent-green)]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[var(--farm-primary-text)] mb-2">
                              Nezisková organizace
                            </h3>
                            <p className="text-[var(--farm-secondary-text)] text-sm mb-3 leading-relaxed">
                              Od 14. bĹ™ezna 2025 jsme neziskovou organizací, budeme rádi za vaĹˇe pĹ™íspěvky a dary. Dary spolku si mĹŻĹľete odeÄŤíst z daní.
                            </p>
                            <div>
                              <p className="text-sm font-medium text-[var(--farm-primary-text)] mb-1">
                                Transparentní úÄŤet:
                              </p>
                              <p className="text-lg font-bold text-[var(--farm-accent-green)]" style={{ fontFamily: 'var(--font-heading)' }}>
                                2003148579/2010
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </div>

                {/* Right - Contact Form */}
                <div>
                  <FloatingCard hover={false}>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--farm-primary-text)] mb-8">
                      NapiĹˇte nám
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                          Jméno a pĹ™íjmení *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)] transition-all"
                          placeholder="Jan Novák"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)] transition-all"
                          placeholder="jan.novak@email.cz"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                          Telefon
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)] transition-all"
                          placeholder="+420 123 456 789"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                          VaĹˇe zpráva *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)] transition-all resize-none"
                          placeholder="NapiĹˇte nám svĹŻj dotaz nebo poĹľadavek..."
                        />
                      </div>

                      <Button type="submit" variant="primary" className="w-full">
                        Odeslat zprávu
                      </Button>
                    </form>
                  </FloatingCard>
                </div>
              </div>
            </div>
          )}

          {/* Tábor Tab */}
          {activeTab === 'tabor' && (
            <div className="max-w-3xl mx-auto">
              <FloatingCard hover={false}>
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--farm-accent-green)]/10 mx-auto mb-6 flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-[var(--farm-accent-green)]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--farm-primary-text)] mb-4">
                    Rezervace jezdeckého tábora
                  </h2>
                  <p className="text-lg text-[var(--farm-secondary-text)] mb-8">
                    FormuláĹ™ pro rezervaci tábora bude brzy k dispozici
                  </p>
                  <div className="text-sm text-[var(--farm-secondary-text)]">
                    Zatím nás prosím kontaktujte na emailu nebo telefonu
                  </div>
                </div>
              </FloatingCard>
            </div>
          )}

          {/* KrouĹľek Tab */}
          {activeTab === 'krouzek' && (
            <div className="max-w-3xl mx-auto">
              <FloatingCard hover={false}>
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--farm-accent-green)]/10 mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-10 h-10 text-[var(--farm-accent-green)]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--farm-primary-text)] mb-4">
                    Rezervace jezdeckého krouĹľku
                  </h2>
                  <p className="text-lg text-[var(--farm-secondary-text)] mb-8">
                    FormuláĹ™ pro rezervaci krouĹľku bude brzy k dispozici
                  </p>
                  <div className="text-sm text-[var(--farm-secondary-text)]">
                    Zatím nás prosím kontaktujte na emailu nebo telefonu
                  </div>
                </div>
              </FloatingCard>
            </div>
          )}

          {/* VyjíĹľďky Tab */}
          {activeTab === 'vyjizdy' && (
            <div className="max-w-3xl mx-auto">
              <FloatingCard hover={false}>
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--farm-accent-green)]/10 mx-auto mb-6 flex items-center justify-center">
                    <Compass className="w-10 h-10 text-[var(--farm-accent-green)]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--farm-primary-text)] mb-4">
                    Rezervace vyjíĹľďky
                  </h2>
                  <p className="text-lg text-[var(--farm-secondary-text)] mb-8">
                    FormuláĹ™ pro rezervaci vyjíĹľďky bude brzy k dispozici
                  </p>
                  <div className="text-sm text-[var(--farm-secondary-text)]">
                    Zatím nás prosím kontaktujte na emailu nebo telefonu
                  </div>
                </div>
              </FloatingCard>
            </div>
          )}

          {/* Poukaz Tab */}
          {activeTab === 'poukaz' && (
            <div className="max-w-3xl mx-auto">
              <FloatingCard hover={false}>
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--farm-accent-green)]/10 mx-auto mb-6 flex items-center justify-center">
                    <Gift className="w-10 h-10 text-[var(--farm-accent-green)]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--farm-primary-text)] mb-4">
                    Poukaz
                  </h2>
                  <p className="text-lg text-[var(--farm-secondary-text)] mb-8">
                    Informace o poukazech bude brzy k dispozici
                  </p>
                  <div className="text-sm text-[var(--farm-secondary-text)]">
                    Zatím nás prosím kontaktujte na emailu nebo telefonu
                  </div>
                </div>
              </FloatingCard>
            </div>
          )}

        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 md:py-32 bg-[var(--farm-page-bg)] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-section-alt-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--farm-primary-text)] mb-8">
                Kde nás najdete
              </h2>
              
              <div className="space-y-4 text-lg text-[var(--farm-secondary-text)] leading-relaxed mb-8">
                <p>
                  Nacházíme se v malebné krajině na Janova HoĹ™e u Vizovic. Okolí farmy nabízí ideální podmínky pro vyjíĹľďky – lesy, louky a krásné výhledy.
                </p>
                <p>
                  NaĹˇe adresa: Janova Hora 466, 763 12 Vizovice
                </p>
              </div>

              <div className="mt-8 bg-white rounded-3xl p-8 shadow-lg">
                <h4 className="font-semibold text-[var(--farm-primary-text)] mb-5">
                  Jak se k nám dostat
                </h4>
                <ul className="space-y-3 text-[var(--farm-secondary-text)]">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--farm-accent-green)] mt-2 flex-shrink-0" />
                    <span>Ze směru Zlín: navigace mapy.cz, cesta vede pĹ™es ZádveĹ™ice Trávník, cca 100m za novým srubem odboÄŤit doleva pĹ™es potok</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--farm-accent-green)] mt-2 flex-shrink-0" />
                    <span>Od Vizovic: navigace mapy.cz, ulice LázeĹská, ValaĹˇský Ĺˇenk, od něj nastavit adresu Janova Hora 466 a spustit jako cyklotrasu</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <FloatingCard hover={false} className="p-0 overflow-hidden">
                <div className="relative w-full h-[400px] lg:h-[500px]">
                  <iframe
                    src="https://en.mapy.cz/zakladni?x=17.866389&y=49.222222&z=15&source=coor&id=17.866389%2C49.222222"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Mapa - Farma pod Janovou horou"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pointer-events-none">
                    <p className="text-white font-semibold mb-1">
                      Farma pod Janovou horou
                    </p>
                    <p className="text-white/90 text-sm mb-3">
                      Janova Hora 466, 763 12 Vizovice
                    </p>
                    <a
                      href="https://mapy.cz/zakladni?x=17.866389&y=49.222222&z=15&source=coor&id=17.866389%2C49.222222"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-white hover:text-[var(--farm-accent-green)] font-medium transition-colors pointer-events-auto"
                    >
                      OtevĹ™ít v Mapy.cz →
                    </a>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
        
        {/* Bottom shadow for levitation effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]" />
        
        {/* Organic wave transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] -mb-[1px]" style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.08)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.08))' }}>
          <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,60 1200,40 L1200,120 L0,120 Z" fill="var(--farm-page-bg)" />
          </svg>
        </div>
      </section>
    </div>
  );
}
