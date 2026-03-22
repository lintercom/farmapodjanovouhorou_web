import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { FloatingCard } from '../components/FloatingCard';
import { Button } from '../components/Button';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Landmark, Share2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { contactApi } from '../utils/api';
import { useContactData } from '../hooks/useContactData';
import { usePageData } from '../hooks/usePageData';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import {
  defaultContactFormContent,
  defaultContactLocation,
  defaultContactReservationTabs,
  defaultContactSection,
  extractEmbedSrc,
  getContactTabIcon,
  parseReenioEmbedConfig,
} from '../utils/contactPageConfig';
import { resolveCmsImageUrl } from '../utils/media';

export function Contact() {
  const [searchParams] = useSearchParams();
  const { contactData } = useContactData();
  const { data: pageData } = usePageData('kontakt');
  const { settings } = useGlobalSettings();
  const resolvedHeroImage = resolveCmsImageUrl(pageData?.hero?.image, settings?.heroImage);

  const reservationTabs = Array.isArray(pageData?.reservationTabs)
    ? pageData.reservationTabs
    : defaultContactReservationTabs;
  const contactSection = {
    ...defaultContactSection,
    ...(pageData?.contactSection ?? {}),
  };
  const contactFormContent = {
    ...defaultContactFormContent,
    ...(pageData?.contactForm ?? {}),
  };
  const locationContent = {
    ...defaultContactLocation,
    ...(pageData?.location ?? {}),
    directions: Array.isArray(pageData?.location?.directions)
      ? pageData.location.directions
      : defaultContactLocation.directions,
  };
  const defaultActiveTab = reservationTabs.find((tab: any) => tab.type === 'contact')?.slug ?? reservationTabs[0]?.slug ?? null;
  const [activeTab, setActiveTab] = useState<string | null>(defaultActiveTab);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Read tab from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    const isKnownTab = reservationTabs.some((item: any) => item.slug === tab);

    if (tab && isKnownTab) {
      setActiveTab(tab);
      return;
    }

    setActiveTab(defaultActiveTab);
  }, [defaultActiveTab, reservationTabs, searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Update URL without triggering scroll
    window.history.replaceState(null, '', `?tab=${tab}`);
  };

  const handleTabClick = (e: React.MouseEvent, tab: string) => {
    e.preventDefault();
    e.stopPropagation();
    handleTabChange(tab);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      await contactApi.sendMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      setSubmitStatus('success');
      setSubmitMessage(contactFormContent.successMessage);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      const message = error?.message || '';
      const isMissingEndpoint = message.includes('404');

      setSubmitStatus('error');
      setSubmitMessage(
        isMissingEndpoint
          ? 'Odesílání formuláře ještě není nasazené na serveru. Je potřeba publikovat novou verzi backendové funkce.'
          : message || 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const activeTabConfig = reservationTabs.find((tab: any) => tab.slug === activeTab) ?? null;
  const activeTabIcon = getContactTabIcon(activeTabConfig?.icon);
  const ActiveTabIcon = activeTabIcon;
  const reenioEmbedConfig = parseReenioEmbedConfig(activeTabConfig?.reenioUrl);
  const reenioWidgetHostRef = useRef<HTMLDivElement | null>(null);
  const locationParagraphs = locationContent.description
    .split(/\n{2,}/)
    .map((paragraph: string) => paragraph.trim())
    .filter(Boolean);
  const mapEmbedSrc = extractEmbedSrc(locationContent.mapEmbedUrl);
  const mapExternalLink = locationContent.mapLink?.trim() || mapEmbedSrc;
  const resolveAppHref = (href?: string) => {
    const trimmed = href?.trim() ?? '';
    if (!trimmed) {
      return '#';
    }

    if (!trimmed.startsWith('/')) {
      return trimmed;
    }

    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
    return `${basePath}${trimmed}`;
  };

  useEffect(() => {
    if (activeTabConfig?.type !== 'embed' || reenioEmbedConfig.mode !== 'widget' || !reenioWidgetHostRef.current) {
      return;
    }

    const host = reenioWidgetHostRef.current;
    host.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = reenioEmbedConfig.widgetClassName || 'reenio-iframe';
    widgetContainer.setAttribute('data-size', reenioEmbedConfig.widgetDataSize || 'auto');
    host.appendChild(widgetContainer);

    const script = document.createElement('script');
    script.src = reenioEmbedConfig.widgetScriptSrc || '';
    script.async = true;
    script.defer = true;
    host.appendChild(script);

    return () => {
      host.innerHTML = '';
    };
  }, [activeTabConfig?.type, reenioEmbedConfig]);

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
              {pageData?.hero?.title || 'Kontakt a rezervace'}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 drop-shadow-lg leading-relaxed max-w-2xl">
              {pageData?.hero?.subtitle || 'Napište nám nebo se rovnou přihlaste na naše aktivity'}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      {reservationTabs.length > 0 ? (
        <section className="py-12 bg-[var(--farm-page-bg)] relative overflow-hidden -mt-[1px]">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {reservationTabs.map((tab: any) => {
                const Icon = getContactTabIcon(tab.icon);
                const isActive = activeTab === tab.slug;

                return (
                  <button
                    key={tab.id || tab.slug}
                    type="button"
                    onClick={(e) => handleTabClick(e, tab.slug)}
                    className={`relative rounded-2xl p-6 transition-all duration-300 ${
                      isActive
                        ? 'bg-white scale-105 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
                        : 'bg-white/60 hover:bg-white/80 hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                          isActive
                            ? 'bg-[var(--farm-accent-green)] text-white'
                            : 'bg-[var(--farm-accent-green)]/10 text-[var(--farm-accent-green)]'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span
                        className={`text-center text-sm font-medium ${
                          isActive ? 'text-[var(--farm-primary-text)]' : 'text-[var(--farm-secondary-text)]'
                        }`}
                      >
                        {tab.label}
                      </span>
                    </div>
                    {isActive ? (
                      <div className="absolute bottom-0 left-1/2 h-1 w-16 -translate-x-1/2 rounded-t-full bg-[var(--farm-accent-green)]" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Tab Content */}
      <section className="py-24 bg-[var(--farm-section-alt-bg)] relative overflow-hidden">
        {/* Blurred gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--farm-page-bg)] to-transparent backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {activeTabConfig?.type === 'contact' && (
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div>
                  <FloatingCard hover={false}>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--farm-primary-text)] mb-8">
                      {contactSection.title}
                    </h2>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--farm-accent-green)]/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-[var(--farm-accent-green)]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--farm-primary-text)] mb-2">
                            {contactSection.phoneLabel}
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
                            {contactSection.emailLabel}
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
                            {contactSection.addressLabel}
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
                            {contactSection.openingHoursLabel}
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
                            {contactSection.socialTitle}
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
                              {contactSection.nonprofitTitle}
                            </h3>
                            <p className="text-[var(--farm-secondary-text)] text-sm mb-3 leading-relaxed">
                              {contactSection.nonprofitDescription}
                            </p>
                            <div>
                              <p className="text-sm font-medium text-[var(--farm-primary-text)] mb-1">
                                {contactSection.nonprofitAccountLabel}
                              </p>
                              <p className="text-lg font-bold text-[var(--farm-accent-green)]" style={{ fontFamily: 'var(--font-heading)' }}>
                                {contactSection.nonprofitAccountNumber}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </div>

                <div>
                  <FloatingCard hover={false}>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--farm-primary-text)] mb-8">
                      {contactFormContent.title}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                          {contactFormContent.nameLabel}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)] transition-all"
                          placeholder={contactFormContent.namePlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                          {contactFormContent.emailLabel}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)] transition-all"
                          placeholder={contactFormContent.emailPlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                          {contactFormContent.phoneLabel}
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)] transition-all"
                          placeholder={contactFormContent.phonePlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[var(--farm-primary-text)] mb-2">
                          {contactFormContent.messageLabel}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--farm-accent-green)] transition-all resize-none"
                          placeholder={contactFormContent.messagePlaceholder}
                        />
                      </div>

                      {submitMessage ? (
                        <div
                          className={`rounded-2xl px-4 py-3 text-sm ${
                            submitStatus === 'success'
                              ? 'border border-green-200 bg-green-50 text-green-800'
                              : submitStatus === 'error'
                                ? 'border border-red-200 bg-red-50 text-red-800'
                                : 'border border-[var(--farm-border)] bg-[var(--farm-secondary-light)] text-[var(--farm-secondary-text)]'
                          }`}
                        >
                          {submitMessage}
                        </div>
                      ) : null}

                      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                        {contactFormContent.submitLabel}
                      </Button>
                    </form>
                  </FloatingCard>
                </div>
              </div>
            </div>
          )}

          {activeTabConfig?.type === 'embed' && (
            <div className="max-w-5xl mx-auto">
              <FloatingCard hover={false}>
                <div className="py-4 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--farm-accent-green)]/10">
                    <ActiveTabIcon className="h-10 w-10 text-[var(--farm-accent-green)]" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-[var(--farm-primary-text)]">
                    {activeTabConfig.title}
                  </h2>
                  {activeTabConfig.description ? (
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--farm-secondary-text)]">
                      {activeTabConfig.description}
                    </p>
                  ) : null}
                  {reenioEmbedConfig.mode === 'widget' ? (
                    <div className="overflow-hidden rounded-3xl border border-[var(--farm-border)] bg-white p-4 shadow-[var(--farm-shadow-md)]">
                      <div ref={reenioWidgetHostRef} />
                    </div>
                  ) : reenioEmbedConfig.mode === 'iframe' ? (
                    <>
                      <div className="overflow-hidden rounded-3xl border border-[var(--farm-border)] bg-white shadow-[var(--farm-shadow-md)]">
                        <iframe
                          src={reenioEmbedConfig.iframeSrc}
                          width="100%"
                          height={String(activeTabConfig.embedHeight || 1100)}
                          style={{ border: 0 }}
                          loading="lazy"
                          title={activeTabConfig.title}
                        />
                      </div>
                      <div className="mt-6 text-center">
                        <a
                          href={reenioEmbedConfig.iframeSrc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[var(--farm-accent-green)] transition-colors hover:text-[var(--farm-primary-hover)]"
                        >
                          Otevřít formulář v novém okně
                        </a>
                      </div>
                    </>
                  ) : reenioEmbedConfig.mode === 'link' ? (
                    <div className="rounded-3xl border border-[var(--farm-border)] bg-white px-6 py-10 text-center shadow-[var(--farm-shadow-md)]">
                      <p className="mx-auto mb-6 max-w-2xl text-[var(--farm-secondary-text)]">
                        Tento rezervační formulář nejde vložit přímo do stránky jako iframe. Otevřete ho prosím v novém okně.
                      </p>
                      <a
                        href={reenioEmbedConfig.iframeSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="primary">Otevřít rezervační formulář</Button>
                      </a>
                    </div>
                  ) : (
                    <div className="text-sm text-[var(--farm-secondary-text)]">
                      {activeTabConfig.helperText || 'Zatím nás prosím kontaktujte na e-mailu nebo telefonu.'}
                    </div>
                  )}
                </div>
              </FloatingCard>
            </div>
          )}

          {activeTabConfig?.type === 'content' && (
            <div className="max-w-3xl mx-auto">
              <FloatingCard hover={false}>
                <div className="text-center py-16">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--farm-accent-green)]/10">
                    <ActiveTabIcon className="h-10 w-10 text-[var(--farm-accent-green)]" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-[var(--farm-primary-text)]">
                    {activeTabConfig.title}
                  </h2>
                  {activeTabConfig.description ? (
                    <p className="mb-8 text-lg text-[var(--farm-secondary-text)]">
                      {activeTabConfig.description}
                    </p>
                  ) : null}
                  {activeTabConfig.buttonText && activeTabConfig.buttonLink ? (
                    <a
                      href={resolveAppHref(activeTabConfig.buttonLink)}
                      target={activeTabConfig.openInNewTab ? '_blank' : undefined}
                      rel={activeTabConfig.openInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      <Button variant="primary">{activeTabConfig.buttonText}</Button>
                    </a>
                  ) : null}
                  {activeTabConfig.helperText ? (
                    <div className="mt-6 text-sm text-[var(--farm-secondary-text)]">
                      {activeTabConfig.helperText}
                    </div>
                  ) : null}
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
                {locationContent.title}
              </h2>
              
              <div className="space-y-4 text-lg text-[var(--farm-secondary-text)] leading-relaxed mb-8">
                {locationParagraphs.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-3xl p-8 shadow-lg">
                <h4 className="font-semibold text-[var(--farm-primary-text)] mb-5">
                  {locationContent.directionsTitle}
                </h4>
                <ul className="space-y-3 text-[var(--farm-secondary-text)]">
                  {locationContent.directions.map((direction: any, index: number) => (
                    <li key={direction.id || index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[var(--farm-accent-green)] mt-2 flex-shrink-0" />
                      <span>{direction.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <FloatingCard hover={false} className="p-0 overflow-hidden">
                <div className="relative w-full h-[400px] lg:h-[500px]">
                  {mapEmbedSrc ? (
                    <iframe
                      src={mapEmbedSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title={`Mapa - ${locationContent.mapCardTitle}`}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[var(--farm-secondary-light)] px-6 text-center text-[var(--farm-secondary-text)]">
                      Embed mapy zatím není vyplněný.
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pointer-events-none">
                    <p className="text-white font-semibold mb-1">
                      {locationContent.mapCardTitle}
                    </p>
                    <p className="text-white/90 text-sm mb-3">
                      {locationContent.mapCardAddress}
                    </p>
                    {mapExternalLink ? (
                      <a
                        href={mapExternalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white hover:text-[var(--farm-accent-green)] font-medium transition-colors pointer-events-auto"
                      >
                        {locationContent.mapLinkLabel} →
                      </a>
                    ) : null}
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
