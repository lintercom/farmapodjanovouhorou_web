import { defaultPageContent } from './defaultContent.ts';
import * as kv from './kv_store.tsx';

// Function to seed all default page content to database
export async function seedDefaultContent() {
  const results = [];
  
  // First, seed global settings with logo
  try {
    const defaultSettings = {
      siteName: 'Farma pod Janovou horou',
      logo: 'figma:asset/b6969a5430aab58a4ea63b4f5bc380de8b7eaf5a.png',
      favicon: '',
      systemEmail: 'farmapodjanovouhorou@seznam.cz',
      phone: '+420 605 279 222',
      email: 'farmapodjanovouhorou@seznam.cz',
      address: 'Janův důl 123, 468 11 Janov nad Nisou',
      defaultMetaTitle: 'Farma pod Janovou horou',
      defaultMetaDescription:
        'Rodinná farma ve Vizovicích ve Zlínském kraji — práce s dětmi a koňmi, jezdecké kroužky, tábory a vyjížďky v přírodě pod Janovou horou.',
      ogImage: '',
      primaryColor: '#2D5016',
      secondaryColor: '#8B4513',
      font: 'Lora'
    };
    
    await kv.set('global:settings', defaultSettings);
    results.push({ pageId: 'global:settings', status: 'success' });
  } catch (error) {
    console.error('Error seeding global settings:', error);
    results.push({ pageId: 'global:settings', status: 'error', error: String(error) });
  }
  
  // Then seed all page content
  for (const [pageId, pageData] of Object.entries(defaultPageContent)) {
    try {
      await kv.set(`page:${pageId}`, pageData);
      results.push({ pageId, status: 'success' });
    } catch (error) {
      console.error(`Error seeding ${pageId}:`, error);
      results.push({ pageId, status: 'error', error: String(error) });
    }
  }
  
  return results;
}