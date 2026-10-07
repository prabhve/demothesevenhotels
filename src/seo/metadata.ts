/**
 * Dynamic Metadata, Canonical & Hreflang Generator
 * Follows Google's multilingual and multi-regional SEO guidelines:
 * - Reciprocal self-referencing canonical URLs
 * - Programmatic hreflang tags for all indexable language versions
 * - x-default fallback to global English
 * - Localized OpenGraph and Twitter cards
 */

import { canonicalHotel } from '../config/hotel';
import { getIndexableLocales, getLocaleByCode, localesRegistry } from '../config/locales';

export type PageId =
  | 'home'
  | 'rooms'
  | 'classic-room'
  | 'deluxe-room'
  | 'super-deluxe-room'
  | 'facilities'
  | 'dining'
  | 'experience'
  | 'location'
  | 'reviews'
  | 'gallery'
  | 'faq'
  | 'contact'
  | 'policies'
  | 'admin';

export interface SeoMetadataOptions {
  pageId: PageId;
  localeCode: string;
  customPath?: string;
  roomName?: string;
  roomPrice?: number;
}

export interface HreflangTag {
  hreflang: string;
  href: string;
}

export interface GeneratedMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  hreflangs: HreflangTag[];
  xDefaultUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogImage: string;
  twitterCard: 'summary_large_image';
  lang: string;
  dir: 'ltr' | 'rtl';
  isIndexable: boolean;
  robotsContent: string;
}

const DEFAULT_SHARE_IMAGE = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80";

export const getPagePath = (pageId: PageId): string => {
  switch (pageId) {
    case 'home':
      return '';
    case 'rooms':
      return '/rooms';
    case 'classic-room':
      return '/rooms/classic-room';
    case 'deluxe-room':
      return '/rooms/deluxe-room';
    case 'super-deluxe-room':
      return '/rooms/super-deluxe-room';
    case 'facilities':
      return '/facilities';
    case 'dining':
      return '/dining';
    case 'experience':
      return '/experience-varanasi';
    case 'location':
      return '/location';
    case 'reviews':
      return '/reviews';
    case 'gallery':
      return '/gallery';
    case 'faq':
      return '/faq';
    case 'contact':
      return '/contact';
    case 'policies':
      return '/policies';
    case 'admin':
      return '/admin';
    default:
      return '';
  }
};

export const generateTitle = (pageId: PageId, localeCode: string, roomName?: string): string => {
  const isHi = localeCode === 'hi';

  switch (pageId) {
    case 'home':
      return isHi
        ? "द सेवेन्स होटल वाराणसी | अस्सी घाट के पास आरामदायक होटल"
        : "The Seven's Hotel Varanasi | Hotel Near Assi Ghat";

    case 'rooms':
      return isHi
        ? "कमरे और सुइट्स | द सेवेन्स होटल वाराणसी"
        : "Rooms & Tariffs | The Seven's Hotel Varanasi";

    case 'classic-room':
      return isHi
        ? "क्लासिक रूम (₹3,500) | द सेवेन्स होटल वाराणसी"
        : "Classic Room (₹3,500) | The Seven's Hotel Varanasi";

    case 'deluxe-room':
      return isHi
        ? "डीलक्स रूम (₹4,000) | द सेवेन्स होटल वाराणसी"
        : "Deluxe Room (₹4,000) | The Seven's Hotel Varanasi";

    case 'super-deluxe-room':
      return isHi
        ? "सुपर डीलक्स रूम (₹4,500) | द सेवेन्स होटल वाराणसी"
        : "Super Deluxe Room (₹4,500) | The Seven's Hotel Varanasi";

    case 'facilities':
      return isHi
        ? "होटल सुविधाएं व सेवाएं | द सेवेन्स होटल वाराणसी"
        : "Hotel Facilities & Guest Services | The Seven's Hotel";

    case 'dining':
      return isHi
        ? "फ्लेवर्स रेस्टोरेंट व डाइनिंग | द सेवेन्स होटल वाराणसी"
        : "Flavours Restaurant & Dining | The Seven's Hotel Varanasi";

    case 'experience':
      return isHi
        ? "अस्सी से काशी दर्शन | प्रमुख मंदिर व गंगा घाट गाइड"
        : "Experience Varanasi from Assi | Ghats & Temple Guide";

    case 'location':
      return isHi
        ? "होटल का पता व दिशा-निर्देश | अस्सी-लंका रोड, वाराणसी"
        : "Location & Directions | Assi–Lanka Road, Varanasi";

    case 'reviews':
      return isHi
        ? "अतिथि समीक्षाएं और रेटिंग्स | द सेवेन्स होटल वाराणसी"
        : "Verified Guest Reviews & Ratings | The Seven's Hotel";

    case 'gallery':
      return isHi
        ? "होटल फोटो गैलरी | द सेवेन्स होटल वाराणसी"
        : "Hotel Photography Gallery | The Seven's Hotel Varanasi";

    case 'faq':
      return isHi
        ? "सामान्य प्रश्नोत्तरी (FAQ) | चेक-इन व बुकिंग जानकारी"
        : "Frequently Asked Questions & Stay Guide | The Seven's Hotel";

    case 'contact':
      return isHi
        ? "संपर्क एवं फ्रंट डेस्क हेल्पडेस्क | द सेवेन्स होटल वाराणसी"
        : "Contact & Front Desk Reservations | The Seven's Hotel";

    case 'policies':
      return isHi
        ? "होटल नीतियां एवं पहचान पत्र नियम | द सेवेन्स होटल"
        : "Hotel Policies & ID Guidelines | The Seven's Hotel Varanasi";

    case 'admin':
      return "Property Management Portal | The Seven's Hotel";

    default:
      return roomName
        ? `${roomName} | The Seven's Hotel Varanasi`
        : "The Seven's Hotel Varanasi | Hotel Near Assi Ghat";
  }
};

export const generateDescription = (pageId: PageId, localeCode: string): string => {
  const isHi = localeCode === 'hi';

  switch (pageId) {
    case 'home':
      return isHi
        ? "वाराणसी में अस्सी घाट के पास स्थित द सेवेन्स होटल। स्वच्छ वातानुकूलित कमरे, रेस्टोरेंट, लिफ्ट और 24 घंटे फ्रंट डेस्क बुकिंग सहायता।"
        : "Stay at The Seven's Hotel in Varanasi, conveniently located near Assi Ghat. Explore comfortable rooms, hotel facilities, nearby attractions and direct bookings.";

    case 'rooms':
      return isHi
        ? "क्लासिक, डीलक्स और सुपर डीलक्स कमरों के किराए और सुविधाएं देखें। अस्सी घाट के समीप परिवार व तीर्थयात्रियों के लिए शांत और सुरक्षित ठहराव।"
        : "Browse Classic, Deluxe, and Super Deluxe rooms near Assi Ghat, Varanasi. Enjoy air conditioning, high-speed Wi-Fi, elevator access, and 24/7 service.";

    case 'classic-room':
      return isHi
        ? "क्लासिक रूम (₹3,500/रात)। क्वीन बेड, एसी, टीवी, हाई-स्पीड वाई-फाई और 24 घंटे गर्म पानी की सुविधा के साथ किफायती व आरामदायक ठहराव।"
        : "Classic Room at The Seven's Hotel Varanasi from ₹3,500/night. Features Queen Bed, individual AC, high-speed Wi-Fi, modern bathroom, and room service.";

    case 'deluxe-room':
      return isHi
        ? "डीलक्स रूम (₹4,000/रात)। अतिरिक्त जगह, किंग बेड, सिटिंग एरिया, एसी और वाई-फाई के साथ वाराणसी में सुकून भरा ठहराव।"
        : "Deluxe Room from ₹4,000/night at The Seven's Hotel, Varanasi. Includes King bed, spacious sitting desk, private bathroom, and prompt room dining.";

    case 'super-deluxe-room':
      return isHi
        ? "सुपर डीलक्स रूम (₹4,500/रात)। प्रीमियम इंटीरियर, किंग साइज बेड, एसी और समर्पित कक्ष सेवाओं के साथ सर्वोत्तम अनुभव।"
        : "Super Deluxe Room from ₹4,500/night in Bhadaini, Varanasi. Enjoy premium bedding, modern comforts, elevator access, and attentive guest service.";

    case 'facilities':
      return isHi
        ? "द सेवेन्स होटल की प्रमाणित सुविधाएं: रूम सर्विस, इन-हाउस रेस्टोरेंट, कार सेवा, डॉक्टर ऑन कॉल, कपड़े धोने की व्यवस्था और मुफ्त वाई-फाई।"
        : "Confirmed guest amenities at The Seven's Hotel: Room service, in-house restaurant, car service assistance, doctor on call, laundry, and elevator.";

    case 'dining':
      return isHi
        ? "फ्लेवर्स एट द सेवेन्स रेस्टोरेंट में ताजा शाकाहारी उत्तर भारतीय व बनारसी व्यंजनों का आनंद लें। स्वादिष्ट भोजन और इन-रूम डाइनिंग सेवा उपलब्ध।"
        : "Dine at Flavours at The Seven's Hotel Varanasi. Vegetarian-friendly North Indian cuisine, freshly prepared meals, and fast room service delivery.";

    case 'experience':
      return isHi
        ? "अस्सी घाट, संकट मोचन मंदिर, तुलसी घाट और काशी विश्वनाथ धाम की दूरी और यात्रा मार्गदर्शन। द सेवेन्स होटल से काशी दर्शन को सुगम बनाएं।"
        : "Explore top Varanasi landmarks from Assi: Subah-e-Banaras, Sankat Mochan Temple, Tulsi Ghat, Durga Kund, and Kashi Vishwanath Corridor.";

    case 'location':
      return isHi
        ? "द सेवेन्स होटल का पता: बी.2/280, अस्सी-लंका रोड, अभय सिनेमा के पास, भदैनी, वाराणसी। गूगल मैप्स दिशा-निर्देश और स्टेशन कनेक्टिविटी विवरण।"
        : "Find The Seven's Hotel on Assi-Lanka Road, Bhadaini, Varanasi. Easy road connectivity to Assi Ghat, Banaras railway station, and airport.";

    case 'reviews':
      return isHi
        ? "द सेवेन्स होटल वाराणसी के वास्तविक अतिथियों की समीक्षाएं और अनुभव पढ़ें। स्वच्छ कमरे, उत्कृष्ट स्थान और आत्मीय स्टाफ की पुष्टि।"
        : "Read verified guest reviews for The Seven's Hotel near Assi Ghat, Varanasi. Real traveler feedback on clean rooms, polite staff, and location.";

    case 'faq':
      return isHi
        ? "चेक-इन (12 PM), चेक-आउट (11 AM), अस्सी घाट से दूरी (800m), पार्किंग और कमरा बुकिंग से संबंधित अक्सर पूछे जाने वाले सवालों के जवाब।"
        : "Stay FAQs for The Seven's Hotel Varanasi: Check-in & check-out times, Assi Ghat distance, elevator access, Wi-Fi, and reservation assistance.";

    case 'contact':
      return isHi
        ? "द सेवेन्स होटल वाराणसी से सीधा संपर्क करें: +91 88879 25271 या व्हाट्सएप पर 24/7 तत्काल कमरा बुकिंग व पूछताछ सहायता पाएं।"
        : "Contact The Seven's Hotel Varanasi 24/7 front desk at +91 88879 25271 or on WhatsApp for direct room enquiries and assistance.";

    default:
      return "Stay at The Seven's Hotel in Varanasi, conveniently located near Assi Ghat. Explore comfortable rooms, hotel facilities, nearby attractions and direct bookings.";
  }
};

export const generateCanonicalUrl = (localeCode: string, path: string): string => {
  const base = canonicalHotel.urls.canonicalBase;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const prefix = localeCode === 'en' ? '/en' : `/${localeCode}`;
  return `${base}${prefix}${cleanPath === '/' ? '' : cleanPath}`;
};

export const generateHreflangTags = (path: string): HreflangTag[] => {
  const base = canonicalHotel.urls.canonicalBase;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const suffix = cleanPath === '/' ? '' : cleanPath;

  const indexable = getIndexableLocales();

  const hreflangs: HreflangTag[] = indexable.map((loc) => ({
    hreflang: loc.languageCode, // e.g. 'en', 'hi', 'bn', 'fr', 'de'
    href: `${base}/${loc.code}${suffix}`,
  }));

  // Google x-default points to default English
  hreflangs.push({
    hreflang: 'x-default',
    href: `${base}/en${suffix}`,
  });

  return hreflangs;
};

export const generateFullMetadata = (opts: SeoMetadataOptions): GeneratedMetadata => {
  const { pageId, localeCode } = opts;
  const path = opts.customPath || getPagePath(pageId);
  const locale = getLocaleByCode(localeCode);

  const title = generateTitle(pageId, localeCode, opts.roomName);
  const description = generateDescription(pageId, localeCode);
  const canonicalUrl = generateCanonicalUrl(locale.code, path);
  const hreflangs = generateHreflangTags(path);
  const xDefaultUrl = `${canonicalHotel.urls.canonicalBase}/en${path === '/' ? '' : path}`;

  const isIndexable = pageId !== 'admin' && locale.isIndexable;
  const robotsContent = isIndexable ? 'index, follow' : 'noindex, nofollow';

  return {
    title,
    description,
    canonicalUrl,
    hreflangs,
    xDefaultUrl,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonicalUrl,
    ogType: pageId === 'home' ? 'hotel' : 'website',
    ogImage: DEFAULT_SHARE_IMAGE,
    twitterCard: 'summary_large_image',
    lang: locale.languageCode,
    dir: locale.direction,
    isIndexable,
    robotsContent,
  };
};
