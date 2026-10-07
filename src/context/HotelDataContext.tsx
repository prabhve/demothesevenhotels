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
  faqList as defaultFaqList,
  hotelPolicies as defaultHotelPolicies,
  Room,
  Amenity,
  NearbyAttraction,
  Testimonial,
  GalleryItem,
  FAQItem,
} from '../data/hotelData';

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}

const defaultSeoSettings: SeoSettings = {
  title: "The Seven's Hotel Varanasi | Hotel Near Assi Ghat",
  description: "Stay at The Seven's Hotel in Varanasi, conveniently located near Assi Ghat. Explore comfortable rooms, hotel facilities, local attractions and booking options.",
  keywords: "The Seven's Hotel Varanasi, Hotel near Assi Ghat Varanasi, Hotel in Bhadaini Varanasi, Stay near Assi Ghat, Assi Lanka Road Hotel, Varanasi accommodation",
  ogTitle: "The Seven's Hotel Varanasi | Hotel Near Assi Ghat",
  ogDescription: "Stay at The Seven's Hotel in Varanasi, conveniently located near Assi Ghat. Explore comfortable rooms, hotel facilities, local attractions and booking options.",
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
  faqList: FAQItem[];
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
  updateFaqList: (faqs: FAQItem[]) => void;
  updateHotelPolicies: (policies: typeof defaultHotelPolicies) => void;
  updateSeoSettings: (seo: Partial<SeoSettings>) => void;
  
  // CMS Utilities
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonString: string) => boolean;
}

const HotelDataContext = createContext<HotelDataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sevens_hotel_cms_data_v2';

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
  const [faqListState, setFaqListState] = useState<FAQItem[]>(defaultFaqList);
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
        if (parsed.faqList) setFaqListState(parsed.faqList);
        if (parsed.hotelPolicies) setHotelPolicies(parsed.hotelPolicies);
        if (parsed.seoSettings) setSeoSettings(parsed.seoSettings);
      }
    } catch (e) {
      console.error('Error loading saved CMS data from localStorage:', e);
    }
  }, []);

  // Save to LocalStorage on state changes
  const persistState = (newState: {
    hotelInfo?: typeof defaultHotelInfo;
    contactInfo?: typeof defaultContactInfo;
    bookingSettings?: typeof defaultBookingSettings;
    rooms?: Room[];
    amenities?: Amenity[];
    diningInfo?: typeof defaultDiningInfo;
    nearbyPlaces?: NearbyAttraction[];
    testimonials?: Testimonial[];
    galleryItems?: GalleryItem[];
    faqList?: FAQItem[];
    hotelPolicies?: typeof defaultHotelPolicies;
    seoSettings?: SeoSettings;
  }) => {
    try {
      const current = {
        hotelInfo,
        contactInfo,
        bookingSettings,
        rooms,
        amenities,
        diningInfo,
        nearbyPlaces,
        testimonials,
        galleryItems,
        faqList: faqListState,
        hotelPolicies,
        seoSettings,
        ...newState,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.warn('Could not persist state to localStorage:', e);
    }
  };

  const updateHotelInfo = (data: Partial<typeof defaultHotelInfo>) => {
    const updated = { ...hotelInfo, ...data };
    setHotelInfo(updated);
    persistState({ hotelInfo: updated });
  };

  const updateContactInfo = (data: Partial<typeof defaultContactInfo>) => {
    const updated = { ...contactInfo, ...data };
    setContactInfo(updated);
    persistState({ contactInfo: updated });
  };

  const updateBookingSettings = (data: Partial<typeof defaultBookingSettings>) => {
    const updated = { ...bookingSettings, ...data };
    setBookingSettings(updated);
    persistState({ bookingSettings: updated });
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
    const updated = { ...diningInfo, ...data };
    setDiningInfo(updated);
    persistState({ diningInfo: updated });
  };

  const updateNearbyPlaces = (places: NearbyAttraction[]) => {
    setNearbyPlaces(places);
    persistState({ nearbyPlaces: places });
  };

  const updateTestimonials = (items: Testimonial[]) => {
    setTestimonials(items);
    persistState({ testimonials: items });
  };

  const updateGalleryItems = (items: GalleryItem[]) => {
    setGalleryItems(items);
    persistState({ galleryItems: items });
  };

  const updateFaqList = (faqs: FAQItem[]) => {
    setFaqListState(faqs);
    persistState({ faqList: faqs });
  };

  const updateHotelPolicies = (policies: typeof defaultHotelPolicies) => {
    setHotelPolicies(policies);
    persistState({ hotelPolicies: policies });
  };

  const updateSeoSettings = (seo: Partial<SeoSettings>) => {
    const updated = { ...seoSettings, ...seo };
    setSeoSettings(updated);
    persistState({ seoSettings: updated });
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
    setFaqListState(defaultFaqList);
    setHotelPolicies(defaultHotelPolicies);
    setSeoSettings(defaultSeoSettings);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const exportConfigJson = (): string => {
    const data = {
      hotelInfo,
      contactInfo,
      bookingSettings,
      rooms,
      amenities,
      diningInfo,
      nearbyPlaces,
      testimonials,
      galleryItems,
      faqList: faqListState,
      hotelPolicies,
      seoSettings,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.hotelInfo) setHotelInfo(parsed.hotelInfo);
      if (parsed.contactInfo) setContactInfo(parsed.contactInfo);
      if (parsed.bookingSettings) setBookingSettings(parsed.bookingSettings);
      if (parsed.rooms) setRooms(parsed.rooms);
      if (parsed.amenities) setAmenities(parsed.amenities);
      if (parsed.diningInfo) setDiningInfo(parsed.diningInfo);
      if (parsed.nearbyPlaces) setNearbyPlaces(parsed.nearbyPlaces);
      if (parsed.testimonials) setTestimonials(parsed.testimonials);
      if (parsed.galleryItems) setGalleryItems(parsed.galleryItems);
      if (parsed.faqList) setFaqListState(parsed.faqList);
      if (parsed.hotelPolicies) setHotelPolicies(parsed.hotelPolicies);
      if (parsed.seoSettings) setSeoSettings(parsed.seoSettings);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      return true;
    } catch (e) {
      console.error('Failed to parse or import configuration JSON:', e);
      return false;
    }
  };

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
        faqList: faqListState,
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
        updateFaqList,
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
