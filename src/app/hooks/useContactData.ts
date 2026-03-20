import { useState, useEffect } from 'react';
import { pagesApi } from '../utils/api';

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

export function useContactData() {
  const [contactData, setContactData] = useState<ContactData>(defaultContactData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContactData() {
      try {
        const data = await pagesApi.get('kontakt');
        const page = data?.page;
        const fromContactData = page?.contactData;
        const fromContact = page?.contact;

        if (fromContactData) {
          setContactData({ ...defaultContactData, ...fromContactData });
          return;
        }

        // Backwards compatibility for data shape used in seeded CMS content.
        if (fromContact) {
          setContactData({
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
          });
        }
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