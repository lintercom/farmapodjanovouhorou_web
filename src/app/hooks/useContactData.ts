import { useState, useEffect } from 'react';
import { getCachedPage, hasCachedPage, preloadPage } from '../utils/siteDataCache';

export interface ContactData {
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
}

const defaultContactData: ContactData = {
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
};

function normalizeContactData(page: any): ContactData {
  const fromContactData = page?.contactData;
  const fromContact = page?.contact;

  if (fromContactData) {
    return {
      ...defaultContactData,
      ...fromContactData,
      openingHours: {
        ...defaultContactData.openingHours,
        ...(fromContactData.openingHours ?? {}),
      },
      socialMedia: {
        ...defaultContactData.socialMedia,
        ...(fromContactData.socialMedia ?? {}),
      },
    };
  }

  if (fromContact) {
    return {
      ...defaultContactData,
      phone: fromContact.phone ?? defaultContactData.phone,
      email: fromContact.email ?? defaultContactData.email,
      address: fromContact.address?.street ?? defaultContactData.address,
      city: fromContact.address?.city ?? defaultContactData.city,
      postalCode: fromContact.address?.zip ?? defaultContactData.postalCode,
      openingHours: {
        weekdays: fromContact.openingHours ?? defaultContactData.openingHours.weekdays,
        weekend: defaultContactData.openingHours.weekend,
      },
      socialMedia: {
        facebook: fromContact.facebook ?? defaultContactData.socialMedia.facebook,
        instagram: fromContact.instagram ?? defaultContactData.socialMedia.instagram,
      },
    };
  }

  return defaultContactData;
}

export function useContactData() {
  const hasCachedData = hasCachedPage('kontakt');
  const [contactData, setContactData] = useState<ContactData>(() => (
    hasCachedData ? normalizeContactData(getCachedPage('kontakt')) : defaultContactData
  ));
  const [isLoading, setIsLoading] = useState(!hasCachedData);

  useEffect(() => {
    const hasCachedData = hasCachedPage('kontakt');

    async function loadContactData() {
      if (!hasCachedData) {
        setIsLoading(true);
      }

      try {
        const page = await preloadPage('kontakt');
        setContactData(normalizeContactData(page));
      } catch (error) {
        console.error('Error loading contact data:', error);
        // Pokračujeme s defaultními hodnotami
      } finally {
        setIsLoading(false);
      }
    }

    loadContactData();
  }, []);

  return { contactData, isLoading };
}