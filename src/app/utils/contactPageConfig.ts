import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Calendar,
  Compass,
  Gift,
  Heart,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Star,
  Users,
} from 'lucide-react';

export type ContactTabType = 'contact' | 'embed' | 'content';

export interface ContactReservationTab {
  id: string;
  slug: string;
  label: string;
  title: string;
  icon: string;
  type: ContactTabType;
  description?: string;
  helperText?: string;
  reenioUrl?: string;
  embedHeight?: number;
  buttonText?: string;
  buttonLink?: string;
  openInNewTab?: boolean;
}

export const CONTACT_TAB_ICON_OPTIONS = [
  { value: 'MessageCircle', label: 'Bublina / kontakt' },
  { value: 'Calendar', label: 'Kalendář' },
  { value: 'Users', label: 'Skupina / kroužek' },
  { value: 'Compass', label: 'Kompas / vyjížďka' },
  { value: 'Gift', label: 'Dárek / poukaz' },
  { value: 'BookOpen', label: 'Kniha / informace' },
  { value: 'Heart', label: 'Srdce' },
  { value: 'Star', label: 'Hvězda' },
  { value: 'Phone', label: 'Telefon' },
  { value: 'Mail', label: 'E-mail' },
  { value: 'MapPin', label: 'Mapa' },
  { value: 'Landmark', label: 'Organizace' },
  { value: 'Share2', label: 'Sociální sítě' },
] as const;

const CONTACT_TAB_ICON_MAP: Record<string, LucideIcon> = {
  MessageCircle,
  Calendar,
  Users,
  Compass,
  Gift,
  BookOpen,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Landmark,
  Share2,
};

export function getContactTabIcon(iconName?: string): LucideIcon {
  return CONTACT_TAB_ICON_MAP[iconName ?? ''] ?? MessageCircle;
}

export function getReenioEmbedSrc(value?: string) {
  const trimmed = value?.trim() ?? '';

  if (!trimmed) {
    return '';
  }

  const iframeSrcMatch = trimmed.match(/src=(['"])(.*?)\1/i);
  if (iframeSrcMatch?.[2]) {
    return iframeSrcMatch[2];
  }

  return trimmed;
}

export const defaultContactReservationTabs: ContactReservationTab[] = [
  {
    id: 'tabor',
    slug: 'tabor',
    label: 'Rezervace tábora',
    title: 'Rezervace jezdeckého tábora',
    icon: 'Calendar',
    type: 'embed',
    description: 'Formulář pro rezervaci tábora bude brzy k dispozici.',
    helperText: 'Zatím nás prosím kontaktujte na e-mailu nebo telefonu.',
    reenioUrl: '',
    embedHeight: 1100,
  },
  {
    id: 'krouzek',
    slug: 'krouzek',
    label: 'Rezervace kroužku',
    title: 'Rezervace jezdeckého kroužku',
    icon: 'Users',
    type: 'embed',
    description: 'Formulář pro rezervaci kroužku bude brzy k dispozici.',
    helperText: 'Zatím nás prosím kontaktujte na e-mailu nebo telefonu.',
    reenioUrl: '',
    embedHeight: 1100,
  },
  {
    id: 'vyjizdy',
    slug: 'vyjizdy',
    label: 'Rezervace vyjížďky',
    title: 'Rezervace vyjížďky',
    icon: 'Compass',
    type: 'embed',
    description: 'Formulář pro rezervaci vyjížďky bude brzy k dispozici.',
    helperText: 'Zatím nás prosím kontaktujte na e-mailu nebo telefonu.',
    reenioUrl: '',
    embedHeight: 1100,
  },
  {
    id: 'poukaz',
    slug: 'poukaz',
    label: 'Poukaz',
    title: 'Poukaz',
    icon: 'Gift',
    type: 'content',
    description: 'Informace o poukazech bude brzy k dispozici.',
    helperText: 'Zatím nás prosím kontaktujte na e-mailu nebo telefonu.',
    buttonText: '',
    buttonLink: '',
    openInNewTab: false,
  },
  {
    id: 'kontakt',
    slug: 'kontakt',
    label: 'Kontakt',
    title: 'Kontakt',
    icon: 'MessageCircle',
    type: 'contact',
    description: '',
    helperText: '',
  },
];

export const defaultContactSection = {
  title: 'Kontaktujte nás',
  phoneLabel: 'Telefon',
  emailLabel: 'Email',
  addressLabel: 'Adresa',
  openingHoursLabel: 'Otevírací doba',
  socialTitle: 'Sociální sítě',
  nonprofitTitle: 'Nezisková organizace',
  nonprofitDescription:
    'Od 14. března 2025 jsme neziskovou organizací, budeme rádi za vaše příspěvky a dary. Dary spolku si můžete odečíst z daní.',
  nonprofitAccountLabel: 'Transparentní účet:',
  nonprofitAccountNumber: '2003148579/2010',
};

export const defaultContactFormContent = {
  title: 'Napište nám',
  submitLabel: 'Odeslat zprávu',
  successMessage: 'Děkujeme za vaši zprávu! Ozveme se vám co nejdříve.',
  nameLabel: 'Jméno a příjmení *',
  namePlaceholder: 'Jan Novák',
  emailLabel: 'Email *',
  emailPlaceholder: 'jan.novak@email.cz',
  phoneLabel: 'Telefon',
  phonePlaceholder: '+420 123 456 789',
  messageLabel: 'Vaše zpráva *',
  messagePlaceholder: 'Napište nám svůj dotaz nebo požadavek...',
};

export const defaultContactLocation = {
  title: 'Kde nás najdete',
  description:
    'Nacházíme se v malebné krajině na Janově Hoře u Vizovic. Okolí farmy nabízí ideální podmínky pro vyjížďky – lesy, louky a krásné výhledy.\n\nNaše adresa: Janova Hora 466, 763 12 Vizovice',
  directionsTitle: 'Jak se k nám dostat',
  directions: [
    {
      id: '1',
      text: 'Ze směru Zlín: navigace mapy.cz, cesta vede přes Zádveřice Trávník, cca 100 m za novým srubem odbočit doleva přes potok.',
    },
    {
      id: '2',
      text: 'Od Vizovic: navigace mapy.cz, ulice Lázeňská, Valašský šenk, od něj nastavit adresu Janova Hora 466 a spustit jako cyklotrasu.',
    },
  ],
  mapEmbedUrl:
    'https://en.mapy.cz/zakladni?x=17.866389&y=49.222222&z=15&source=coor&id=17.866389%2C49.222222',
  mapLink:
    'https://mapy.cz/zakladni?x=17.866389&y=49.222222&z=15&source=coor&id=17.866389%2C49.222222',
  mapCardTitle: 'Farma pod Janovou horou',
  mapCardAddress: 'Janova Hora 466, 763 12 Vizovice',
  mapLinkLabel: 'Otevřít v Mapy.cz',
};
