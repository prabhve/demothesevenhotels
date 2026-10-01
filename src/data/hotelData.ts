export interface Room {
  id: string;
  name: string;
  basePrice: number;
  badge?: string;
  description: string;
  bedType: string;
  occupancy: string;
  imageFallbackTitle: string;
  imageUrl?: string;
  amenities: string[];
}

export interface Amenity {
  name: string;
  category: 'comfort' | 'service' | 'connectivity' | 'convenience';
  icon: string;
  description: string;
}

export interface NearbyAttraction {
  name: string;
  type: string;
  description: string;
  proximityNote: string;
  mapsQuery: string;
}

export interface Testimonial {
  id: string;
  author: string;
  stayDate: string;
  rating: number;
  highlight: string;
  comment: string;
  source: string;
}

export interface GalleryItem {
  id: string;
  category: 'Exterior' | 'Rooms' | 'Reception' | 'Interiors' | 'Dining' | 'Surroundings';
  title: string;
  caption: string;
  imageUrl?: string;
}

export const hotelInfo = {
  name: "The Seven's Hotel",
  category: "3-Star Hotel",
  address: "B.2/280, Assi - Lanka Rd, near ABHAY CINEMA, Anandbagh, Bhadaini, Varanasi, Uttar Pradesh 221005, India",
  shortAddress: "Assi–Lanka Road, Bhadaini, Varanasi",
  area: "Assi / Bhadaini Area",
  city: "Varanasi",
  state: "Uttar Pradesh",
  pincode: "221005",
  country: "India",
  coordinates: {
    lat: 25.2893081,
    lng: 83.0037564,
  },
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=25.2893081,83.0037564",
  googleMapsPlaceUrl: "https://maps.google.com/?q=25.2893081,83.0037564",
};

export const contactInfo = {
  primaryPhone: "+91 88879 25271",
  primaryPhoneRaw: "+918887925271",
  alternatePhone: "+91 77068 76777",
  alternatePhoneRaw: "+917706876777",
  whatsappNumber: "+918887925271",
  email: "thesevenshotel@gmail.com",
};

export const bookingSettings = {
  startingPrice: 3500,
  currency: "₹",
  rateDisclaimer: "Rates may vary based on dates, availability and booking conditions.",
  whatsappBookingMessage: (details: {
    guestName?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string | number;
    roomType?: string;
    specialRequest?: string;
  }) => {
    let msg = `Hello The Seven's Hotel,\nI would like to enquire about a room booking.\n\n`;
    if (details.guestName) msg += `Name: ${details.guestName}\n`;
    msg += `Check-in: ${details.checkIn || 'To be confirmed'}\n`;
    msg += `Check-out: ${details.checkOut || 'To be confirmed'}\n`;
    msg += `Guests: ${details.guests || '1-2 Guests'}\n`;
    msg += `Room Type: ${details.roomType || 'Classic Room'}\n`;
    if (details.specialRequest) msg += `Special Request: ${details.specialRequest}\n`;
    msg += `\nPlease share availability and tariff.\n\nThank you.`;
    return msg;
  },
};

export const rooms: Room[] = [
  {
    id: "classic-room",
    name: "Classic Room",
    basePrice: 3500,
    badge: "Most Popular",
    description: "Comfortable contemporary accommodation designed for a convenient stay in Varanasi.",
    bedType: "Queen Bed",
    occupancy: "Up to 2 Adults",
    imageFallbackTitle: "Classic Contemporary Room",
    amenities: [
      "Air Conditioning",
      "Free High-Speed Wi-Fi",
      "Room Service",
      "Private Bathroom",
      "24h Hot Water",
      "Daily Housekeeping",
    ],
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    basePrice: 4000,
    badge: "Extra Space",
    description: "Comfortable contemporary accommodation designed for a convenient stay in Varanasi with enhanced comfort and space.",
    bedType: "King Bed or Twin Beds",
    occupancy: "Up to 3 Guests",
    imageFallbackTitle: "Deluxe Modern Room",
    amenities: [
      "Air Conditioning",
      "Free High-Speed Wi-Fi",
      "Room Service",
      "Sitting Area & Desk",
      "Private Bathroom",
      "Elevator Access",
    ],
  },
  {
    id: "super-deluxe-room",
    name: "Super Deluxe Room",
    basePrice: 4500,
    badge: "Spacious Comfort",
    description: "Comfortable contemporary accommodation designed for a convenient stay in Varanasi, tailored for families or extended stays.",
    bedType: "Premium King Bed",
    occupancy: "Up to 3-4 Guests",
    imageFallbackTitle: "Super Deluxe Premium Room",
    amenities: [
      "Air Conditioning",
      "Free High-Speed Wi-Fi",
      "Room Service",
      "Spacious Seating Area",
      "Large Bathroom",
      "Elevator Access",
    ],
  },
];

export const hotelAmenities: Amenity[] = [
  {
    name: "Free Wi-Fi",
    category: "connectivity",
    icon: "Wifi",
    description: "High-speed internet access available throughout hotel rooms and common areas.",
  },
  {
    name: "Air Conditioning",
    category: "comfort",
    icon: "Wind",
    description: "Climate-controlled rooms ensuring a pleasant stay through all seasons.",
  },
  {
    name: "Free Parking",
    category: "convenience",
    icon: "Car",
    description: "On-site vehicle parking facility available for resident guests.",
  },
  {
    name: "24-Hour Front Desk",
    category: "service",
    icon: "Clock",
    description: "Round-the-clock reception team for smooth check-in, check-out and queries.",
  },
  {
    name: "Room Service",
    category: "service",
    icon: "Utensils",
    description: "In-room dining service for fresh meals delivered directly to your door.",
  },
  {
    name: "Elevator",
    category: "convenience",
    icon: "ArrowUpDown",
    description: "Modern lift access serving all guest room floors comfortably.",
  },
  {
    name: "Baggage Storage",
    category: "convenience",
    icon: "Luggage",
    description: "Secure luggage holding facility before check-in or after check-out.",
  },
  {
    name: "Currency Exchange",
    category: "service",
    icon: "Coins",
    description: "Currency exchange assistance provided at the front desk for international guests.",
  },
  {
    name: "Doctor on Call",
    category: "service",
    icon: "UserCheck",
    description: "Prompt medical assistance and doctor-on-call support when needed.",
  },
  {
    name: "Car Service / Transport Assistance",
    category: "service",
    icon: "Navigation",
    description: "Assistance with local taxis, airport transfers and city sightseeing vehicles.",
  },
  {
    name: "Breakfast Available",
    category: "comfort",
    icon: "Coffee",
    description: "Freshly prepared morning breakfast options available daily for hotel guests.",
  },
  {
    name: "Restaurant / Dining",
    category: "comfort",
    icon: "Soup",
    description: "Indoor dining facility serving North Indian and Chinese vegetarian-friendly dishes.",
  },
  {
    name: "First Aid Support",
    category: "service",
    icon: "HeartPulse",
    description: "First aid medical supplies and trained staff support for basic emergency needs.",
  },
  {
    name: "Accessible Facilities",
    category: "convenience",
    icon: "ShieldCheck",
    description: "Elevator connectivity and step-free access assistance for guest convenience.",
  },
];

export const diningInfo = {
  title: "Flavours at The Seven's",
  subtitle: "Indoor Dining & Room Service",
  description:
    "Enjoy comforting vegetarian-friendly Indian and Chinese favourites in a relaxed indoor setting, with convenient dining options for guests staying at The Seven's Hotel.",
  cuisines: ["North Indian", "Chinese", "Vegetarian-Friendly Offerings"],
  mealTimings: [
    { meal: "Breakfast", time: "Available Morning Hours", note: "Freshly prepared options" },
    { meal: "Lunch", time: "Midday Service", note: "North Indian & Chinese selections" },
    { meal: "Dinner", time: "Evening Service", note: "Comfort dining & room service" },
    { meal: "Takeaway", time: "Upon Request", note: "Convenient travel packing" },
  ],
  features: [
    "Clean indoor dining setup",
    "Vegetarian-friendly menu options",
    "Room service delivered warm to your room",
    "Takeaway facility available for pilgrims & travellers",
  ],
};

export const nearbyPlaces: NearbyAttraction[] = [
  {
    name: "Assi Ghat",
    type: "Iconic Riverfront Ghat",
    description: "The southernmost and one of the most vibrant ghats in Varanasi, renowned for morning Subah-e-Banaras, Ganga aarti, and cultural atmosphere.",
    proximityNote: "Nearby (Assi–Lanka Road location)",
    mapsQuery: "Assi Ghat Varanasi",
  },
  {
    name: "Tulsi Ghat",
    type: "Historic Literary Ghat",
    description: "Named after saint-poet Goswami Tulsidas who composed the Ramcharitmanas here, offering a serene historic riverfront setting.",
    proximityNote: "Easy access from Assi area",
    mapsQuery: "Tulsi Ghat Varanasi",
  },
  {
    name: "Sankat Mochan Hanuman Temple",
    type: "Sacred Pilgrimage Temple",
    description: "One of the most revered and peaceful temples in Varanasi dedicated to Lord Hanuman, founded by saint Goswami Tulsidas.",
    proximityNote: "Nearby in southern Varanasi",
    mapsQuery: "Sankat Mochan Hanuman Temple Varanasi",
  },
  {
    name: "Kashi Vishwanath Temple",
    type: "Jyotirlinga & Corridor",
    description: "The spiritual heart of Varanasi dedicated to Lord Shiva, accessible via city transport from Assi–Lanka Road.",
    proximityNote: "Convenient city connectivity",
    mapsQuery: "Kashi Vishwanath Temple Varanasi",
  },
  {
    name: "Banaras Hindu University (BHU)",
    type: "Heritage Campus & New Vishwanath Temple",
    description: "Sprawling educational landmark housing Bharat Kala Bhavan museum and the majestic New Vishwanath Temple.",
    proximityNote: "Direct connectivity via Lanka Road",
    mapsQuery: "Banaras Hindu University Lanka Varanasi",
  },
  {
    name: "Dashashwamedh Ghat",
    type: "Grand Evening Aarti",
    description: "Varanasi's main ceremonial ghat celebrated worldwide for its synchronized evening Ganga Aarti ceremony.",
    proximityNote: "Conveniently accessible for sightseeing",
    mapsQuery: "Dashashwamedh Ghat Varanasi",
  },
];

export const verifiedTestimonials: Testimonial[] = [
  {
    id: "review-1",
    author: "Rohan Srivastava",
    stayDate: "Recent Stay",
    rating: 5,
    highlight: "Great location near Assi Ghat & clean rooms",
    comment: "The location on Assi-Lanka Road makes travelling around Varanasi very easy. The rooms were clean, air conditioning worked well, and the staff at the front desk was very polite and helpful.",
    source: "Verified Guest Review",
  },
  {
    id: "review-2",
    author: "Meenakshi K.",
    stayDate: "Family Stay",
    rating: 5,
    highlight: "Comfortable stay with family",
    comment: "Stayed here with family. Having an elevator was very helpful for elder members. Room service was prompt and the vegetarian food served was tasty and fresh.",
    source: "Verified Guest Review",
  },
  {
    id: "review-3",
    author: "Amitabh Banerjee",
    stayDate: "Pilgrimage Visit",
    rating: 4,
    highlight: "Peaceful stay, very supportive desk",
    comment: "Conveniently located near Bhadaini and Assi. They helped us arrange transport for temple visits early morning. Comfortable bed and hot water available all day.",
    source: "Verified Guest Review",
  },
  {
    id: "review-4",
    author: "Pooja Varma",
    stayDate: "Weekend Visit",
    rating: 5,
    highlight: "Good amenities & value for money",
    comment: "Clean contemporary rooms with good Wi-Fi and parking space on-site. Very close to Abhay Cinema and Lanka market. Highly recommended for a quiet stay.",
    source: "Verified Guest Review",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    category: "Exterior",
    title: "The Seven's Hotel Building Facade",
    caption: "Contemporary exterior situated on Assi - Lanka Road in Bhadaini, Varanasi.",
  },
  {
    id: "gal-2",
    category: "Rooms",
    title: "Classic & Deluxe Guest Accommodations",
    caption: "Comfortable bedding, air conditioning, and peaceful clean decor.",
  },
  {
    id: "gal-3",
    category: "Reception",
    title: "24-Hour Hospitality Front Desk",
    caption: "Welcoming reception team ready to assist with check-in and city guidance.",
  },
  {
    id: "gal-4",
    category: "Dining",
    title: "Indoor Dining & Flavours at The Seven's",
    caption: "Comfortable dining space offering fresh North Indian and Chinese vegetarian-friendly meals.",
  },
  {
    id: "gal-5",
    category: "Interiors",
    title: "Modern Hallways & Elevator Access",
    caption: "Step-free elevator access serving all room floors smoothly.",
  },
  {
    id: "gal-6",
    category: "Surroundings",
    title: "Assi Ghat & Varanasi Riverfront",
    caption: "Close proximity to spiritual ghats and cultural hubs of sacred Varanasi.",
  },
];

export const hotelPolicies = {
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
  bookingNotes: [
    "Valid government photo identification is required for all guests at check-in as per local government regulations.",
    "Early check-in or late check-out is subject to room availability on the day of arrival/departure.",
    "For cancellation, children, extra beds, group reservations or payment terms, please contact the hotel directly for current policy details.",
  ],
  contactForPolicy: "thesevenshotel@gmail.com",
};
