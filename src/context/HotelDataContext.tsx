import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  hotelInfo as defaultHotelInfo,
  contactInfo as defaultContactInfo,
  bookingSettings as defaultBookingSettings,
  rooms as defaultRooms,
  hotelAmenities as defaultAmenities,
  diningInfo as defaultDiningInfo,
  nearbyPlaces as defaultNearbyPlaces,
  verifiedTestimonials as defaultTestimonials,
  galleryItems as defaultGalleryItems,
  hotelPolicies as defaultHotelPolicies,
  Room,
  Amenity,
  NearbyAttraction,
  Testimonial,
  GalleryItem,
} from '../data/hotelData';

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}

const defaultSeoSettings: SeoSettings = {
  title: "The Seven's Hotel Varanasi | Comfortable Stay Near Assi Ghat",
  description: "Stay at The Seven's Hotel in Bhadaini, Varanasi, near Assi Ghat. Comfortable rooms, Wi-Fi, air conditioning, parking, room service and convenient access to Varanasi's major attractions.",
  keywords: "The Seven's Hotel Varanasi, The Seven's Hotel Assi Ghat, Hotel near Assi Ghat Varanasi, Hotel in Bhadaini Varanasi, Hotels near Assi Lanka Road Varanasi, Stay near Assi Ghat, Varanasi hotel accommodation",
  ogTitle: "The Seven's Hotel Varanasi | Comfortable Stay Near Assi Ghat",
  ogDescription: "Stay at The Seven's Hotel in Bhadaini, Varanasi, near Assi Ghat. Comfortable rooms, Wi-Fi, air conditioning, parking, room service and convenient access to Varanasi's major attractions.",
};

export interface HotelDataContextType {
  hotelInfo: typeof defaultHotelInfo;
  contactInfo: typeof defaultContactInfo;
  bookingSettings: typeof defaultBookingSettings;
  rooms: Room[];
  amenities: Amenity[];
  diningInfo: typeof defaultDiningInfo;
  nearbyPlaces: NearbyAttraction[];
  testimonials: Testimonial[];
  galleryItems: GalleryItem[];
  hotelPolicies: typeof defaultHotelPolicies;
  seoSettings: SeoSettings;
  
  // Updates
  updateHotelInfo: (data: Partial<typeof defaultHotelInfo>) => void;
  updateContactInfo: (data: Partial<typeof defaultContactInfo>) => void;
  updateBookingSettings: (data: Partial<typeof defaultBookingSettings>) => void;
  updateRooms: (rooms: Room[]) => void;
  updateAmenities: (amenities: Amenity[]) => void;
  updateDiningInfo: (data: Partial<typeof defaultDiningInfo>) => void;
  updateNearbyPlaces: (places: NearbyAttraction[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateGalleryItems: (items: GalleryItem[]) => void;
  updateHotelPolicies: (policies: typeof defaultHotelPolicies) => void;
  updateSeoSettings: (seo: Partial<SeoSettings>) => void;
  
  // CMS Utilities
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonString: string) => boolean;
}

const HotelDataContext = createContext<HotelDataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sevens_hotel_cms_data_v1';

export const HotelDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hotelInfo, setHotelInfo] = useState(defaultHotelInfo);
  const [contactInfo, setContactInfo] = useState(defaultContactInfo);
  const [bookingSettings, setBookingSettings] = useState(defaultBookingSettings);
  const [rooms, setRooms] = useState<Room[]>(defaultRooms);
  const [amenities, setAmenities] = useState<Amenity[]>(defaultAmenities);
  const [diningInfo, setDiningInfo] = useState(defaultDiningInfo);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyAttraction[]>(defaultNearbyPlaces);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [hotelPolicies, setHotelPolicies] = useState(defaultHotelPolicies);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(defaultSeoSettings);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.hotelInfo) setHotelInfo(parsed.hotelInfo);
        if (parsed.contactInfo) setContactInfo(parsed.contactInfo);
        if (parsed.bookingSettings) setBookingSettings(parsed.bookingSettings);
        if (parsed.rooms) setRooms(parsed.rooms);
        if (parsed.amenities) setAmenities(parsed.amenities);
        if (parsed.diningInfo) setDiningInfo(parsed.diningInfo);
        if (parsed.nearbyPlaces) setNearbyPlaces(parsed.nearbyPlaces);
        if (parsed.testimonials) setTestimonials(parsed.testimonials);
        if (parsed.galleryItems) setGalleryItems(parsed.galleryItems);
        if (parsed.hotelPolicies) setHotelPolicies(parsed.hotelPolicies);
        if (parsed.seoSettings) setSeoSettings(parsed.seoSettings);
      }
    } catch (e) {
      console.error('Failed to load saved hotel CMS data:', e);
    }
  }, []);

  // Save changes to localStorage
  const persistState = (newState: Record<string, unknown>) => {
    try {
      const current = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = current ? JSON.parse(current) : {};
      const updated = { ...parsed, ...newState };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist hotel CMS data:', e);
    }
  };

  const updateHotelInfo = (data: Partial<typeof defaultHotelInfo>) => {
    setHotelInfo((prev) => {
      const next = { ...prev, ...data };
      persistState({ hotelInfo: next });
      return next;
    });
  };

  const updateContactInfo = (data: Partial<typeof defaultContactInfo>) => {
    setContactInfo((prev) => {
      const next = { ...prev, ...data };
      persistState({ contactInfo: next });
      return next;
    });
  };

  const updateBookingSettings = (data: Partial<typeof defaultBookingSettings>) => {
    setBookingSettings((prev) => {
      const next = { ...prev, ...data };
      persistState({ bookingSettings: next });
      return next;
    });
  };

  const updateRooms = (newRooms: Room[]) => {
    setRooms(newRooms);
    persistState({ rooms: newRooms });
  };

  const updateAmenities = (newAmenities: Amenity[]) => {
    setAmenities(newAmenities);
    persistState({ amenities: newAmenities });
  };

  const updateDiningInfo = (data: Partial<typeof defaultDiningInfo>) => {
    setDiningInfo((prev) => {
      const next = { ...prev, ...data };
      persistState({ diningInfo: next });
      return next;
    });
  };

  const updateNearbyPlaces = (places: NearbyAttraction[]) => {
    setNearbyPlaces(places);
    persistState({ nearbyPlaces: places });
  };

  const updateTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    persistState({ testimonials: newTestimonials });
  };

  const updateGalleryItems = (items: GalleryItem[]) => {
    setGalleryItems(items);
    persistState({ galleryItems: items });
  };

  const updateHotelPolicies = (policies: typeof defaultHotelPolicies) => {
    setHotelPolicies(policies);
    persistState({ hotelPolicies: policies });
  };

  const updateSeoSettings = (seo: Partial<SeoSettings>) => {
    setSeoSettings((prev) => {
      const next = { ...prev, ...seo };
      persistState({ seoSettings: next });
      return next;
    });
  };

  const resetToDefaults = () => {
    setHotelInfo(defaultHotelInfo);
    setContactInfo(defaultContactInfo);
    setBookingSettings(defaultBookingSettings);
    setRooms(defaultRooms);
    setAmenities(defaultAmenities);
    setDiningInfo(defaultDiningInfo);
    setNearbyPlaces(defaultNearbyPlaces);
    setTestimonials(defaultTestimonials);
    setGalleryItems(defaultGalleryItems);
    setHotelPolicies(defaultHotelPolicies);
    setSeoSettings(defaultSeoSettings);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const exportConfigJson = () => {
    const fullState = {
      hotelInfo,
      contactInfo,
      bookingSettings,
      rooms,
      amenities,
      diningInfo,
      nearbyPlaces,
      testimonials,
      galleryItems,
      hotelPolicies,
      seoSettings,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(fullState, null, 2);
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.hotelInfo) setHotelInfo(data.hotelInfo);
      if (data.contactInfo) setContactInfo(data.contactInfo);
      if (data.bookingSettings) setBookingSettings(data.bookingSettings);
      if (data.rooms) setRooms(data.rooms);
      if (data.amenities) setAmenities(data.amenities);
      if (data.diningInfo) setDiningInfo(data.diningInfo);
      if (data.nearbyPlaces) setNearbyPlaces(data.nearbyPlaces);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.galleryItems) setGalleryItems(data.galleryItems);
      if (data.hotelPolicies) setHotelPolicies(data.hotelPolicies);
      if (data.seoSettings) setSeoSettings(data.seoSettings);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Invalid JSON configuration import', e);
      return false;
    }
  };

  // Sync SEO metadata with document
  useEffect(() => {
    document.title = seoSettings.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seoSettings.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seoSettings.ogTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seoSettings.ogDescription);
  }, [seoSettings]);

  return (
    <HotelDataContext.Provider
      value={{
        hotelInfo,
        contactInfo,
        bookingSettings,
        rooms,
        amenities,
        diningInfo,
        nearbyPlaces,
        testimonials,
        galleryItems,
        hotelPolicies,
        seoSettings,
        updateHotelInfo,
        updateContactInfo,
        updateBookingSettings,
        updateRooms,
        updateAmenities,
        updateDiningInfo,
        updateNearbyPlaces,
        updateTestimonials,
        updateGalleryItems,
        updateHotelPolicies,
        updateSeoSettings,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
      }}
    >
      {children}
    </HotelDataContext.Provider>
  );
};

export const useHotelData = () => {
  const context = useContext(HotelDataContext);
  if (!context) {
    throw new Error('useHotelData must be used within a HotelDataProvider');
  }
  return context;
};
