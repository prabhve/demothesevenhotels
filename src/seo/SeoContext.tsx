/**
 * SEO & Locale Context Provider
 * Manages active locale, URL synchronization, HTML lang/dir attributes,
 * dynamic document meta tags, canonical links, hreflang alternates,
 * and JSON-LD structured data.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { DEFAULT_LOCALE_CODE, getLocaleByCode, LocaleConfig, localesRegistry } from '../config/locales';
import { generateFullMetadata, PageId, SeoMetadataOptions, GeneratedMetadata } from './metadata';
import { compileStructuredData } from './schema';
import { getTranslations, TranslationDictionary } from './translations';
import { canonicalHotel } from '../config/hotel';
import { useHotelData } from '../context/HotelDataContext';

export interface SeoContextType {
  currentLocale: LocaleConfig;
  setLocale: (code: string) => void;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  metadata: GeneratedMetadata;
  t: TranslationDictionary;
  formatPrice: (inrAmount: number) => { displayInr: string; foreignEstimate?: string };
  formatDate: (date: Date | string) => string;
  generateWhatsAppUrl: (messageType: 'general' | 'room' | 'booking', payload?: any) => string;
}

const SeoContext = createContext<SeoContextType | undefined>(undefined);

// Helper to extract locale from window.location.pathname e.g. /hi, /hi/rooms, /fr
export const extractLocaleFromPath = (pathname: string): { localeCode: string; pageId: PageId } => {
  const segments = pathname.split('/').filter(Boolean);
  let localeCode = DEFAULT_LOCALE_CODE;
  let remainingSegments = [...segments];

  if (segments.length > 0 && localesRegistry[segments[0].toLowerCase()]) {
    localeCode = segments[0].toLowerCase();
    remainingSegments = segments.slice(1);
  }

  const subpath = remainingSegments.join('/');
  let pageId: PageId = 'home';

  if (!subpath || subpath === '') {
    pageId = 'home';
  } else if (subpath === 'rooms') {
    pageId = 'rooms';
  } else if (subpath === 'rooms/classic-room' || subpath === 'classic-room') {
    pageId = 'classic-room';
  } else if (subpath === 'rooms/deluxe-room' || subpath === 'deluxe-room') {
    pageId = 'deluxe-room';
  } else if (subpath === 'rooms/super-deluxe-room' || subpath === 'super-deluxe-room') {
    pageId = 'super-deluxe-room';
  } else if (subpath === 'facilities') {
    pageId = 'facilities';
  } else if (subpath === 'dining') {
    pageId = 'dining';
  } else if (subpath === 'experience-varanasi' || subpath === 'experience') {
    pageId = 'experience';
  } else if (subpath === 'location') {
    pageId = 'location';
  } else if (subpath === 'reviews') {
    pageId = 'reviews';
  } else if (subpath === 'gallery') {
    pageId = 'gallery';
  } else if (subpath === 'faq') {
    pageId = 'faq';
  } else if (subpath === 'contact') {
    pageId = 'contact';
  } else if (subpath === 'policies') {
    pageId = 'policies';
  } else if (subpath === 'admin') {
    pageId = 'admin';
  }

  return { localeCode, pageId };
};

export const SeoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { faqList, rooms } = useHotelData();

  // Initialize from URL or saved preference
  const [localeCode, setLocaleCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const { localeCode: urlLocale } = extractLocaleFromPath(window.location.pathname);
      if (urlLocale) return urlLocale;
      const saved = localStorage.getItem('sevens_hotel_user_lang');
      if (saved && localesRegistry[saved]) return saved;
    }
    return DEFAULT_LOCALE_CODE;
  });

  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      return extractLocaleFromPath(window.location.pathname).pageId;
    }
    return 'home';
  });

  const currentLocale = useMemo(() => getLocaleByCode(localeCode), [localeCode]);
  const t = useMemo(() => getTranslations(localeCode), [localeCode]);

  // Set Locale with URL preservation & pushState
  const setLocale = useCallback((newCode: string) => {
    const valid = getLocaleByCode(newCode);
    setLocaleCode(valid.code);
    try {
      localStorage.setItem('sevens_hotel_user_lang', valid.code);
    } catch {}

    // Update browser URL while preserving current hash and path
    if (typeof window !== 'undefined') {
      const currentHash = window.location.hash;
      const currentQuery = window.location.search;
      const { pageId } = extractLocaleFromPath(window.location.pathname);
      const subpath = pageId === 'home' ? '' : `/${pageId.replace('-', '/')}`;
      const newUrl = `/${valid.code}${subpath}${currentQuery}${currentHash}`;

      // Only pushState if different from current
      if (window.location.pathname !== `/${valid.code}${subpath}`) {
        window.history.pushState({ locale: valid.code, pageId }, '', newUrl);
      }
    }
  }, []);

  // Listen to popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const { localeCode: pathLocale, pageId: pathPage } = extractLocaleFromPath(window.location.pathname);
      setLocaleCode(pathLocale);
      setCurrentPage(pathPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Generate dynamic metadata
  const metadata = useMemo(() => {
    const selectedRoom = currentPage.includes('room')
      ? rooms.find((r) => r.id === currentPage)
      : undefined;

    return generateFullMetadata({
      pageId: currentPage,
      localeCode: currentLocale.code,
      roomName: selectedRoom?.name,
      roomPrice: selectedRoom?.basePrice,
    });
  }, [currentPage, currentLocale, rooms]);

  // Synchronize document <head>, html attributes & JSON-LD
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Update <title>
    document.title = metadata.title;

    // 2. Set <html lang="..." dir="...">
    document.documentElement.lang = metadata.lang;
    document.documentElement.dir = metadata.dir;

    // 3. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', metadata.description);

    // 4. Meta robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', metadata.robotsContent);

    // 5. OpenGraph tags
    const setMetaProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaProperty('og:title', metadata.ogTitle);
    setMetaProperty('og:description', metadata.ogDescription);
    setMetaProperty('og:url', metadata.ogUrl);
    setMetaProperty('og:type', metadata.ogType);
    setMetaProperty('og:locale', currentLocale.locale.replace('-', '_'));

    // 6. Twitter cards
    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaName('twitter:card', metadata.twitterCard);
    setMetaName('twitter:title', metadata.ogTitle);
    setMetaName('twitter:description', metadata.ogDescription);

    // 7. Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', metadata.canonicalUrl);

    // 8. Dynamic hreflang alternates (remove old dynamic ones first)
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][data-dynamic-hreflang="true"]');
    existingHreflangs.forEach((el) => el.remove());

    metadata.hreflangs.forEach((tag) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', tag.hreflang);
      link.setAttribute('href', tag.href);
      link.setAttribute('data-dynamic-hreflang', 'true');
      document.head.appendChild(link);
    });

    // 9. Structured Data JSON-LD
    let scriptJsonLd = document.getElementById('sevens-hotel-dynamic-jsonld');
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement('script');
      scriptJsonLd.id = 'sevens-hotel-dynamic-jsonld';
      scriptJsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptJsonLd);
    }

    const structuredDataString = compileStructuredData({
      pageId: currentPage,
      localeCode: currentLocale.code,
      description: metadata.description,
      faqs: faqList,
    });
    scriptJsonLd.textContent = structuredDataString;
  }, [metadata, currentLocale, faqList, currentPage]);

  // Price formatting helper (Canonical price in INR, approximate foreign estimation if requested)
  const formatPrice = useCallback(
    (inrAmount: number) => {
      const displayInr = `₹${inrAmount.toLocaleString('en-IN')}`;

      if (currentLocale.currency !== 'INR' && currentLocale.approxExchangeRateToInr) {
        const foreignAmount = Math.round(inrAmount / currentLocale.approxExchangeRateToInr);
        const foreignEstimate = `~${currentLocale.currencySymbol}${foreignAmount.toLocaleString()} ${currentLocale.currency}*`;
        return { displayInr, foreignEstimate };
      }

      return { displayInr };
    },
    [currentLocale]
  );

  // Date formatting helper
  const formatDate = useCallback(
    (date: Date | string) => {
      const d = typeof date === 'string' ? new Date(date) : date;
      try {
        return new Intl.DateTimeFormat(currentLocale.locale, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(d);
      } catch {
        return d.toLocaleDateString();
      }
    },
    [currentLocale]
  );

  // WhatsApp pre-filled message generator in localized language
  const generateWhatsAppUrl = useCallback(
    (messageType: 'general' | 'room' | 'booking', payload?: any) => {
      let text = t.whatsappMessages.generalEnquiry;
      if (messageType === 'room' && payload) {
        text = t.whatsappMessages.roomEnquiry(payload);
      } else if (messageType === 'booking' && payload) {
        text = t.whatsappMessages.bookingEnquiry(payload);
      }
      const rawPhone = canonicalHotel.contacts.whatsappNumberRaw;
      return `https://wa.me/${rawPhone}?text=${encodeURIComponent(text)}`;
    },
    [t]
  );

  return (
    <SeoContext.Provider
      value={{
        currentLocale,
        setLocale,
        currentPage,
        setCurrentPage,
        metadata,
        t,
        formatPrice,
        formatDate,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </SeoContext.Provider>
  );
};

export const useSEO = () => {
  const context = useContext(SeoContext);
  if (!context) {
    throw new Error('useSEO must be used within a SeoProvider');
  }
  return context;
};
