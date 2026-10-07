/**
 * Structured Data (Schema.org JSON-LD) Generators
 * Generates verified, compliant Hotel, BreadcrumbList, and FAQPage schemas.
 * Represents the SAME canonical hotel entity across all localized pages.
 */

import { canonicalHotel } from '../config/hotel';
import { PageId } from './metadata';
import { FAQItem, Room } from '../data/hotelData';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const generateHotelSchema = (localeCode: string, localizedDescription?: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${canonicalHotel.urls.canonicalBase}/#hotel`,
    "name": canonicalHotel.brandName,
    "legalName": canonicalHotel.legalName,
    "description": localizedDescription || canonicalHotel.subheading,
    "url": canonicalHotel.urls.canonicalBase,
    "telephone": [
      canonicalHotel.contacts.primaryPhoneRaw,
      canonicalHotel.contacts.alternatePhoneRaw,
    ],
    "email": canonicalHotel.contacts.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": canonicalHotel.address.street,
      "addressLocality": canonicalHotel.address.city,
      "addressRegion": canonicalHotel.address.state,
      "postalCode": canonicalHotel.address.postalCode,
      "addressCountry": canonicalHotel.address.countryCode,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": canonicalHotel.coordinates.lat,
      "longitude": canonicalHotel.coordinates.lng,
    },
    "hasMap": canonicalHotel.urls.googleMapsPlace,
    "checkinTime": "12:00:00",
    "checkoutTime": "11:00:00",
    "priceRange": canonicalHotel.priceRange,
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
    "image": [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    ],
    "amenityFeature": canonicalHotel.confirmedFacilities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true,
    })),
  };
};

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
};

export const generateFaqSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.slice(0, 10).map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
};

export const generateRoomProductSchema = (room: Room, localeCode: string) => {
  const isHi = localeCode === 'hi';
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "name": `${room.name} · ${canonicalHotel.brandName}`,
    "description": room.description,
    "bed": {
      "@type": "BedDetails",
      "typeOfBed": room.bedType,
    },
    "occupancy": {
      "@type": "QuantitativeValue",
      "value": room.occupancy,
    },
    "offers": {
      "@type": "Offer",
      "price": room.basePrice,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${canonicalHotel.urls.canonicalBase}/${localeCode}/rooms/${room.id}`,
      "validFrom": "2025-01-01",
    },
    "amenityFeature": room.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      "name": a,
      "value": true,
    })),
  };
};

export const compileStructuredData = (opts: {
  pageId: PageId;
  localeCode: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  room?: Room;
}) => {
  const schemas: any[] = [generateHotelSchema(opts.localeCode, opts.description)];

  if (opts.breadcrumbs && opts.breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(opts.breadcrumbs));
  }

  if (opts.faqs && opts.faqs.length > 0) {
    schemas.push(generateFaqSchema(opts.faqs));
  }

  if (opts.room) {
    schemas.push(generateRoomProductSchema(opts.room, opts.localeCode));
  }

  return JSON.stringify(schemas, null, 2);
};
