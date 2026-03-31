import { Link } from 'react-router';
import { Phone, Mail, MapPin, Facebook, Instagram, Lock } from 'lucide-react';
import logoImage from '/logo-placeholder.svg';
import { useAdmin } from '../contexts/AdminContext';
import { useContactData } from '../hooks/useContactData';
import { useGlobalSettings } from '../hooks/useGlobalSettings';

export function Footer() {
  const { isAuthenticated } = useAdmin();
  const { contactData } = useContactData();
  const { settings } = useGlobalSettings();
  const footerLogo = settings?.logo?.trim() ? settings.logo : logoImage;
  
  return (
    <footer
      id="site-footer"
      className="relative bg-gradient-to-b from-[var(--farm-neutral-900)] to-[var(--farm-neutral-800)] text-white overflow-hidden"
    >
      {/* Organic wave top transition */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] transform rotate-180" style={{ filter: 'drop-shadow(0 -20px 25px rgba(0, 0, 0, 0.08)) drop-shadow(0 -8px 10px rgba(0, 0, 0, 0.08))' }}>
        <svg className="relative block w-full h-[60px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,60 1200,40 L1200,120 L0,120 Z" fill="#fafaf9" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16 mb-12">
          {/* Logo & About */}
          <div className="text-center sm:text-left lg:col-span-1">
            <div className="inline-block bg-white rounded-2xl p-4 mb-5 mx-auto sm:mx-0 shadow-lg">
              <img 
                src={footerLogo} 
                alt="Farma pod Janovou horou" 
                className="h-14 sm:h-16 w-auto"
              />
            </div>
            <p className="text-[var(--farm-neutral-300)] leading-relaxed text-sm sm:text-base max-w-xs mx-auto sm:mx-0">
              Rodinná farma zaměĹ™ená na práci s dětmi a koĹmi v krásné pĹ™írodě.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold mb-5 text-lg sm:text-xl text-white">Rychlé odkazy</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link 
                  to="/" 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-[var(--farm-primary)] group-hover:w-4 transition-all duration-300"></span>
                  DomĹŻ
                </Link>
              </li>
              <li>
                <Link 
                  to="/sluzby" 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-[var(--farm-primary)] group-hover:w-4 transition-all duration-300"></span>
                  SluĹľby
                </Link>
              </li>
              <li>
                <Link 
                  to="/nasi-kone" 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-[var(--farm-primary)] group-hover:w-4 transition-all duration-300"></span>
                  NaĹˇi koně
                </Link>
              </li>
              <li>
                <Link 
                  to="/o-nas" 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-[var(--farm-primary)] group-hover:w-4 transition-all duration-300"></span>
                  O nás
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-[var(--farm-primary)] group-hover:w-4 transition-all duration-300"></span>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold mb-5 text-lg sm:text-xl text-white">NaĹˇe sluĹľby</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link 
                  to="/sluzby#tabory" 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-[var(--farm-primary)] group-hover:w-4 transition-all duration-300"></span>
                  Tábory
                </Link>
              </li>
              <li>
                <Link 
                  to="/sluzby#krouzky" 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-[var(--farm-primary)] group-hover:w-4 transition-all duration-300"></span>
                  KrouĹľky
                </Link>
              </li>
              <li>
                <Link 
                  to="/sluzby#vyjizdy" 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-[var(--farm-primary)] group-hover:w-4 transition-all duration-300"></span>
                  VyjíĹľďky
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold mb-5 text-lg sm:text-xl text-white">Kontakt</h3>
            <ul className="space-y-4 text-sm sm:text-base mb-6">
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <div className="w-5 h-5 mt-1 flex-shrink-0 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[var(--farm-primary)]" />
                </div>
                <a 
                  href={`tel:${contactData.phone.replace(/\s/g, '')}`} 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 mt-1"
                >
                  {contactData.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <div className="w-5 h-5 mt-1 flex-shrink-0 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[var(--farm-primary)]" />
                </div>
                <a 
                  href={`mailto:${contactData.email}`} 
                  className="text-[var(--farm-neutral-300)] hover:text-[var(--farm-primary)] transition-colors duration-300 text-left mt-1 whitespace-nowrap"
                >
                  {contactData.email}
                </a>
              </li>
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <div className="w-5 h-5 mt-1 flex-shrink-0 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[var(--farm-primary)]" />
                </div>
                <span className="text-[var(--farm-neutral-300)] text-left mt-1">
                  {contactData.address}<br />
                  {contactData.postalCode} {contactData.city}
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 justify-center sm:justify-start">
              <a
                href={contactData.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl bg-[var(--farm-neutral-700)] hover:bg-[var(--farm-primary)] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={contactData.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl bg-[var(--farm-neutral-700)] hover:bg-[var(--farm-primary)] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="relative mb-10">
          <div className="w-full border-t border-[var(--farm-neutral-700)]"></div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 order-2 lg:order-1">
            <p className="text-[var(--farm-neutral-400)] text-sm text-center lg:text-left">
              © {new Date().getFullYear()} Farma pod Janovou horou z.s. VĹˇechna práva vyhrazena.
            </p>
            <Link 
              to={isAuthenticated ? "/admin?page=domu" : "/cms-prihlaseni"}
              className="text-[var(--farm-neutral-600)] hover:text-[var(--farm-neutral-400)] transition-colors duration-300"
              aria-label={isAuthenticated ? "PĹ™ejít do administrace" : "PĹ™ihláĹˇení do administrace"}
              title={isAuthenticated ? "PĹ™ejít do administrace" : "PĹ™ihláĹˇení do administrace"}
            >
              <Lock className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm order-1 lg:order-2">
            <Link 
              to="/ochrana-osobnich-udaju" 
              className="text-[var(--farm-neutral-400)] hover:text-[var(--farm-primary)] transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-[var(--farm-neutral-700)]/30"
            >
              Ochrana osobních údajĹŻ
            </Link>
            <span className="text-[var(--farm-neutral-600)]">â€˘</span>
            <Link 
              to="/cookies" 
              className="text-[var(--farm-neutral-400)] hover:text-[var(--farm-primary)] transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-[var(--farm-neutral-700)]/30"
            >
              Cookies
            </Link>
            <span className="text-[var(--farm-neutral-600)]">â€˘</span>
            <Link 
              to="/obchodni-podminky" 
              className="text-[var(--farm-neutral-400)] hover:text-[var(--farm-primary)] transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-[var(--farm-neutral-700)]/30"
            >
              Obchodní podmínky
            </Link>
            <span className="text-[var(--farm-neutral-600)]">â€˘</span>
            <Link 
              to="/reklamacni-rad" 
              className="text-[var(--farm-neutral-400)] hover:text-[var(--farm-primary)] transition-colors duration-300 px-2 py-1 rounded-lg hover:bg-[var(--farm-neutral-700)]/30"
            >
              ReklamaÄŤní Ĺ™ád
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
