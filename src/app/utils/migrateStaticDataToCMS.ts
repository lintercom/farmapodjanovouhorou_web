/**
 * Migrační skript pro nahrání statických dat do CMS databáze
 * 
 * UPOZORNĚNÍ: Tento skript nahrává data do databáze.
 * Spusťte pouze jednou a ručně z konzole prohlížeče.
 * 
 * Použití:
 * 1. Otevřete konzoli prohlížeče (F12)
 * 2. Spusťte: quickMigrate()
 */

import { projectId, publicAnonKey } from '/utils/supabase/info';
import { SEO_DEFAULT_DESCRIPTION } from './seo/regional';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-399cd496`;

// Data odpovídající existující GlobalSettings struktuře
const globalSettings = {
  // Obecné
  siteName: 'Farma pod Janovou horou',
  logo: '',
  favicon: '',
  systemEmail: 'farmapodjanovouhorou@seznam.cz',
  
  // Kontaktní údaje
  phone: '+420 605 279 222',
  email: 'farmapodjanovouhorou@seznam.cz',
  address: 'Janova Hora 466\n763 12 Vizovice',
  
  // SEO
  defaultMetaTitle: 'Farma pod Janovou horou',
  defaultMetaDescription: SEO_DEFAULT_DESCRIPTION,
  ogImage: '',
  
  // Design
  primaryColor: '#2D5016',
  secondaryColor: '#8B4513',
  font: 'Lora'
};

interface PageData {
  pageId: string;
  title?: string;
  content?: string;
  hero?: {
    title: string;
    subtitle: string;
  };
  services?: any[];
  horses?: any[];
  contactData?: {
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    openingHours: {
      weekdays: string;
      weekend: string;
    };
    socialMedia: {
      facebook: string;
      instagram: string;
    };
  };
}

const pagesData: PageData[] = [
  {
    pageId: 'domu',
    hero: {
      title: 'Farma pod Janovou horou',
      subtitle: 'Rodinná farma zaměřená na práci s dětmi a koňmi. Nabízíme jezdecké kroužky, tábory a vyjížďky v krásné přírodě.',
    },
  },
  {
    pageId: 'sluzby',
    hero: {
      title: 'Naše služby',
      subtitle: 'Nabízíme širokou škálu aktivit pro děti i dospělé. Od jezdeckých kroužků po letní tábory a výlety do přírody.',
    },
  },
  {
    pageId: 'kontakt',
    contactData: {
      phone: '+420 605 279 222',
      email: 'farmapodjanovouhorou@seznam.cz',
      address: 'Janova Hora 466',
      city: 'Vizovice',
      postalCode: '763 12',
      openingHours: {
        weekdays: 'Po - Pá: 14:00 - 18:00',
        weekend: 'So - Ne: 9:00 - 17:00',
      },
      socialMedia: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
      },
    },
  },
];

async function uploadToAPI(endpoint: string, data: any) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error uploading to ${endpoint}:`, error);
    throw error;
  }
}

export async function migrateStaticDataToCMS() {
  console.log('🚀 Začínám migraci statických dat do CMS...');
  
  try {
    // 1. Nahrát globální nastavení
    console.log('📝 Nahrávám globální nastavení...');
    await uploadToAPI('/settings', { settings: globalSettings });
    console.log('✅ Globální nastavení nahráno');

    // 2. Nahrát data stránek
    console.log('📄 Nahrávám data stránek...');
    for (const pageData of pagesData) {
      console.log(`  → Nahrávám stránku: ${pageData.pageId}`);
      await uploadToAPI('/pages', pageData);
    }
    console.log('✅ Všechna data stránek nahrána');

    console.log('🎉 Migrace úspěšně dokončena!');
    console.log('');
    console.log('ℹ️ Data byla nahrána do databáze. Nyní můžete:');
    console.log('  1. Upravit data v CMS editoru na /admin/settings');
    console.log('  2. Web bude používat data z databáze s fallbacky na původní hodnoty');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Chyba při migraci:', error);
    console.log('');
    console.log('ℹ️ V případě chyby budou fallbacky fungovat nadále.');
    return { success: false, error };
  }
}

// Pro ruční spuštění z konzole
if (typeof window !== 'undefined') {
  (window as any).migrateStaticDataToCMS = migrateStaticDataToCMS;
}