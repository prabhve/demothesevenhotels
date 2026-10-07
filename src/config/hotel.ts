/**
 * Canonical Hotel Entity Configuration
 * Single source of truth for The Seven's Hotel, Varanasi.
 * Every component, schema, and metadata generator consumes this data.
 */

export interface HotelCoordinates {
  lat: number;
  lng: number;
}

export interface CanonicalHotel {
  brandName: string;
  legalName: string;
  tagline: string;
  subheading: string;
  category: string;
  starRating?: number; // Only if confirmed; otherwise omitted
  address: {
    street: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    countryCode: string;
    formatted: string;
    shortFormatted: string;
  };
  coordinates: HotelCoordinates;
  contacts: {
    primaryPhone: string;
    primaryPhoneRaw: string;
    alternatePhone: string;
    alternatePhoneRaw: string;
    whatsappNumber: string;
    whatsappNumberRaw: string;
    email: string;
  };
  timings: {
    checkIn: string;
    checkOut: string;
    frontDeskHours: string;
  };
  urls: {
    canonicalBase: string;
    googleMapsDirections: string;
    googleMapsPlace: string;
  };
  confirmedFacilities: string[];
  priceRange: string;
  startingPriceInr: number;
}

export const canonicalHotel: CanonicalHotel = {
  brandName: "The Seven's Hotel",
  legalName: "The Seven's Hotel",
  tagline: "Comfortable Stay Near Assi Ghat, Varanasi",
  subheading: "A convenient stay in Varanasi, close to Assi Ghat and some of the city's most loved cultural and spiritual experiences.",
  category: "Hotel",
  address: {
    street: "B.2/280, Assi - Lanka Rd, near Abhay Cinema, Anandbagh",
    landmark: "Near Abhay Cinema, Anandbagh",
    area: "Bhadaini / Assi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    postalCode: "221005",
    country: "India",
    countryCode: "IN",
    formatted: "B.2/280, Assi - Lanka Rd, near Abhay Cinema, Anandbagh, Bhadaini, Varanasi, Uttar Pradesh 221005, India",
    shortFormatted: "Assi - Lanka Rd, Bhadaini, Varanasi",
  },
  coordinates: {
    lat: 25.2893081,
    lng: 83.0037564,
  },
  contacts: {
    primaryPhone: "+91 88879 25271",
    primaryPhoneRaw: "+918887925271",
    alternatePhone: "+91 77068 76777",
    alternatePhoneRaw: "+917706876777",
    whatsappNumber: "+91 88879 25271",
    whatsappNumberRaw: "918887925271",
    email: "thesevenshotel@gmail.com",
  },
  timings: {
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
    frontDeskHours: "24 Hours / 7 Days",
  },
  urls: {
    canonicalBase: "https://thesevenshotel.com",
    googleMapsDirections: "https://www.google.com/maps/dir/?api=1&destination=25.2893081,83.0037564",
    googleMapsPlace: "https://maps.google.com/?q=25.2893081,83.0037564",
  },
  // Confirmed property facilities ONLY (No unverified claims)
  confirmedFacilities: [
    "Room Service",
    "Restaurant",
    "Car Service",
    "Doctor On Call",
    "Laundry Service",
    "Free Wi-Fi",
    "Air Conditioning",
    "Elevator Access",
    "24/7 Front Desk",
  ],
  priceRange: "₹₹",
  startingPriceInr: 3500,
};
