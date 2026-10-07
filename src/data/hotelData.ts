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
  features?: string[];
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
  highlight?: string;
  imageUrl?: string;
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

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: number;
  dietary?: string;
  isPopular?: boolean;
  imageUrl?: string;
}

export interface DiningInfoType {
  title: string;
  subtitle: string;
  description: string;
  cuisines: string[];
  imageUrl?: string;
  mealTimings: Array<{ meal: string; time: string; note: string }>;
  features: string[];
  menuCategories?: string[];
  menuItems?: MenuItem[];
}

export const hotelInfo = {
  name: "The Seven's Hotel",
  tagline: "Comfortable Stay Near Assi Ghat, Varanasi",
  category: "Hotel Accommodation",
  address: "B.2/280, Assi - Lanka Rd, near Abhay Cinema, Anandbagh, Bhadaini, Varanasi, Uttar Pradesh 221005, India",
  shortAddress: "Assi–Lanka Road, Bhadaini, Varanasi",
  landmark: "Near Abhay Cinema, Anandbagh",
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
  rateDisclaimer: "Rates may vary based on dates, seasonal demand and availability.",
  whatsappBookingMessage: (details: {
    guestName?: string;
    phone?: string;
    email?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string | number;
    children?: string | number;
    guests?: string | number;
    roomsCount?: string | number;
    roomType?: string;
    specialRequest?: string;
  }) => {
    let msg = `Hello The Seven's Hotel,\nI would like to enquire about a room booking at your Varanasi property.\n\n`;
    if (details.guestName) msg += `Guest Name: ${details.guestName}\n`;
    if (details.phone) msg += `Mobile: ${details.phone}\n`;
    if (details.email) msg += `Email: ${details.email}\n`;
    msg += `Check-in: ${details.checkIn || 'To be confirmed'}\n`;
    msg += `Check-out: ${details.checkOut || 'To be confirmed'}\n`;
    if (details.roomsCount) msg += `Rooms: ${details.roomsCount}\n`;
    if (details.adults || details.children) {
      msg += `Guests: ${details.adults || '1'} Adults${details.children ? `, ${details.children} Children` : ''}\n`;
    } else {
      msg += `Guests: ${details.guests || '2 Adults'}\n`;
    }
    msg += `Preferred Room: ${details.roomType || 'Classic Room'}\n`;
    if (details.specialRequest) msg += `Special Request: ${details.specialRequest}\n`;
    msg += `\nPlease share availability and best tariff details.\n\nThank you!`;
    return msg;
  },
};

export const rooms: Room[] = [
  {
    id: "classic-room",
    name: "Classic Room",
    basePrice: 3500,
    badge: "Most Popular",
    description: "Comfortable contemporary accommodation designed for a convenient stay in Varanasi, ideal for solo travelers, pilgrims, and couples.",
    bedType: "Queen Bed",
    occupancy: "Up to 2 Adults",
    imageFallbackTitle: "Classic Contemporary Room",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      "Air Conditioning",
      "Free High-Speed Wi-Fi",
      "Room Service",
      "Private Bathroom",
      "24h Hot Water",
      "Daily Housekeeping",
      "Television",
      "Elevator Access",
    ],
    features: [
      "Comfortable Queen Bed",
      "Individual Climate Control AC",
      "Private En-Suite Bathroom",
      "High-Speed Wi-Fi Access",
      "Complimentary Toiletries",
    ],
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    basePrice: 4000,
    badge: "Extra Space",
    description: "Enhanced contemporary room with added floor area, work desk, sitting space, and comfortable bedding for guests seeking extra ease.",
    bedType: "King Bed or Twin Beds",
    occupancy: "Up to 3 Guests",
    imageFallbackTitle: "Deluxe Modern Room",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      "Air Conditioning",
      "Free High-Speed Wi-Fi",
      "Room Service",
      "Sitting Area & Desk",
      "Private Bathroom",
      "24h Hot Water",
      "Television",
      "Elevator Access",
    ],
    features: [
      "King Bed or Flexible Twin Beds",
      "Work Desk & Sitting Chairs",
      "Individual Climate Control AC",
      "Room Service Dining Support",
      "Electric Kettle / Hot Beverage Tray",
    ],
  },
  {
    id: "super-deluxe-room",
    name: "Super Deluxe Room",
    basePrice: 4500,
    badge: "Spacious Comfort",
    description: "Our largest accommodation with generous living space, premium king bedding, lounging furniture, and ample room for families or extended stays in Varanasi.",
    bedType: "Premium King Bed",
    occupancy: "Up to 3-4 Guests",
    imageFallbackTitle: "Super Deluxe Premium Room",
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      "Air Conditioning",
      "Free High-Speed Wi-Fi",
      "Room Service",
      "Spacious Seating Area",
      "Large Bathroom",
      "24h Hot Water",
      "Television",
      "Elevator Access",
    ],
    features: [
      "Expansive Room Floor Plan",
      "Premium King Bedding",
      "Spacious Lounging Area",
      "Large Well-Appointed Bathroom",
      "Elevator Proximity & Luggage Support",
    ],
  },
];

export const hotelAmenities: Amenity[] = [
  {
    name: "Room Service",
    category: "service",
    icon: "Utensils",
    description: "In-room dining service delivering freshly prepared meals and beverages directly to your door.",
  },
  {
    name: "Restaurant / Dining",
    category: "comfort",
    icon: "Soup",
    description: "Indoor dining facility serving vegetarian-friendly North Indian and Chinese selections.",
  },
  {
    name: "Car Service / Transport",
    category: "service",
    icon: "Navigation",
    description: "Front desk assistance for arranging local taxis, airport transfers, and temple sightseeing vehicles.",
  },
  {
    name: "Doctor on Call",
    category: "service",
    icon: "UserCheck",
    description: "Prompt medical assistance and doctor-on-call arrangements for traveler health and safety.",
  },
  {
    name: "Laundry Service",
    category: "service",
    icon: "Sparkles",
    description: "Convenient professional laundry and garment pressing support available for staying guests.",
  },
  {
    name: "Free High-Speed Wi-Fi",
    category: "connectivity",
    icon: "Wifi",
    description: "Complimentary wireless internet access across all guest rooms, dining area and lobby.",
  },
  {
    name: "Air Conditioning",
    category: "comfort",
    icon: "Wind",
    description: "Individual climate-controlled rooms ensuring continuous comfort through all Varanasi seasons.",
  },
  {
    name: "Free Guest Parking",
    category: "convenience",
    icon: "Car",
    description: "On-site vehicle parking facility available for resident guests.",
  },
  {
    name: "24-Hour Front Desk",
    category: "service",
    icon: "Clock",
    description: "Round-the-clock reception team for smooth check-ins, early departures, and local guidance.",
  },
  {
    name: "Elevator Access",
    category: "convenience",
    icon: "ArrowUpDown",
    description: "Modern passenger elevator connecting all guest floors comfortably and step-free.",
  },
  {
    name: "Baggage Storage",
    category: "convenience",
    icon: "Luggage",
    description: "Secure luggage holding facility before check-in or following check-out before departure.",
  },
  {
    name: "24-Hour Hot Water",
    category: "comfort",
    icon: "ShieldCheck",
    description: "Continuous hot water supply in all en-suite bathrooms for refreshing temple rituals and visits.",
  },
];

export const diningInfo: DiningInfoType = {
  title: "Flavours at The Seven's",
  subtitle: "Indoor Dining & In-Room Service",
  description:
    "Enjoy comforting vegetarian-friendly Indian and Chinese favourites in a relaxed indoor setting, with convenient dining options for guests staying at The Seven's Hotel.",
  cuisines: ["North Indian", "Chinese", "Vegetarian-Friendly Offerings", "Fresh Breakfast"],
  imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
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
  menuCategories: ["Breakfast Sets", "North Indian Specials", "Chinese Favorites", "Breads & Rice", "Beverages"],
  menuItems: [
    {
      id: "m-1",
      name: "Banarasi Poori & Aloo Bhaji",
      category: "Breakfast Sets",
      description: "Crispy freshly fried pooris served with spiced Banarasi style potato curry and pickle.",
      price: 180,
      dietary: "Vegetarian",
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m-2",
      name: "Paneer Butter Masala",
      category: "North Indian Specials",
      description: "Soft cottage cheese simmered in a creamy tomato and cashew gravy with aromatic butter.",
      price: 280,
      dietary: "Vegetarian",
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m-3",
      name: "Yellow Dal Tadka & Jeera Rice",
      category: "North Indian Specials",
      description: "Comforting yellow lentils tempered with cumin, garlic and ghee, served with fragrant basmati rice.",
      price: 220,
      dietary: "Vegetarian",
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m-4",
      name: "Veg Hakka Noodles",
      category: "Chinese Favorites",
      description: "Wok-tossed noodles with crisp seasonal bell peppers, cabbage, carrots and mild soy seasoning.",
      price: 210,
      dietary: "Vegetarian",
      imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m-5",
      name: "Veg Manchurian in Gravy",
      category: "Chinese Favorites",
      description: "Golden fried vegetable dumplings in a savory ginger, garlic and scallion sauce.",
      price: 240,
      dietary: "Vegetarian",
      isPopular: true,
      imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m-6",
      name: "Traditional Masala Chai",
      category: "Beverages",
      description: "Freshly brewed Banarasi tea with crushed cardamom, ginger and fresh milk.",
      price: 50,
      dietary: "Vegetarian",
      imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

export const nearbyPlaces: NearbyAttraction[] = [
  {
    name: "Assi Ghat",
    type: "Iconic Spiritual Ghat",
    description: "The southernmost and one of the most vibrant ghats of Varanasi, famous for morning Subah-e-Banaras, spiritual yoga, Ganga aarti, and scenic boat rides.",
    proximityNote: "~800m - 1 km (Walking & e-rickshaw access)",
    mapsQuery: "Assi Ghat Varanasi",
    highlight: "Subah-e-Banaras & Aarti",
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Tulsi Ghat",
    type: "Historic Literary Heritage",
    description: "Named in honor of saint-poet Goswami Tulsidas who composed the sacred Ramcharitmanas here; known for serene banks and spiritual tranquility.",
    proximityNote: "~1.2 km from hotel",
    mapsQuery: "Tulsi Ghat Varanasi",
    highlight: "Tulsidas Heritage",
    imageUrl: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Sankat Mochan Hanuman Temple",
    type: "Sacred Pilgrimage Temple",
    description: "One of Varanasi's most beloved temples established by Goswami Tulsidas, dedicated to Lord Hanuman and renowned for sacred prasadam and peaceful energy.",
    proximityNote: "~1.5 km (5-7 min drive)",
    mapsQuery: "Sankat Mochan Hanuman Temple Varanasi",
    highlight: "Daily Darshan",
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Durga Temple (Durga Kund)",
    type: "Historic Nagara Shrine",
    description: "An iconic 18th-century ochre-red temple dedicated to Goddess Durga, featuring classical North Indian architecture beside the historic Durga Kund tank.",
    proximityNote: "~1.2 km from Bhadaini",
    mapsQuery: "Durga Mandir Varanasi Durga Kund",
    highlight: "Sacred Kund & Temple",
    imageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Tulsi Manas Mandir",
    type: "Marble Heritage Temple",
    description: "A serene white marble temple where the verses of Shri Ramcharitmanas are engraved across its walls, set amidst peaceful landscaped gardens.",
    proximityNote: "~1.4 km from hotel",
    mapsQuery: "Tulsi Manas Mandir Varanasi",
    highlight: "Engraved Ramcharitmanas",
    imageUrl: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Kashi Vishwanath Temple",
    type: "Jyotirlinga & Grand Corridor",
    description: "The holiest pilgrimage center in Hinduism dedicated to Lord Shiva, accessible via direct city roads and e-rickshaws from Assi–Lanka Road.",
    proximityNote: "~4.5 km (Connected by city transit)",
    mapsQuery: "Kashi Vishwanath Temple Varanasi",
    highlight: "Spiritual Epicenter",
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Dashashwamedh Ghat",
    type: "Grand Ceremonial Ghat",
    description: "Varanasi's central ceremonial ghat where priests perform the world-renowned synchronized evening Maha Ganga Aarti with brass lamps.",
    proximityNote: "~3.8 km from hotel",
    mapsQuery: "Dashashwamedh Ghat Varanasi",
    highlight: "Maha Ganga Aarti",
    imageUrl: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
  },
];

export const verifiedTestimonials: Testimonial[] = [
  {
    id: "review-1",
    author: "Rohan Srivastava",
    stayDate: "Recent Stay",
    rating: 5,
    highlight: "Great location near Assi Ghat & clean rooms",
    comment: "The location on Assi-Lanka Road makes travelling around Varanasi very easy. The rooms were clean, air conditioning worked well, and the staff at the front desk was polite and helpful.",
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
    comment: "Clean contemporary rooms with good Wi-Fi and parking space on-site. Very close to Abhay Cinema and Lanka market. Recommended for a quiet stay.",
    source: "Verified Guest Review",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    category: "Exterior",
    title: "The Seven's Hotel Building Facade",
    caption: "Contemporary hotel exterior situated on Assi - Lanka Road in Bhadaini, Varanasi.",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-2",
    category: "Rooms",
    title: "Classic & Deluxe Guest Accommodations",
    caption: "Comfortable bedding, individual air conditioning, and peaceful clean decor.",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-3",
    category: "Rooms",
    title: "Super Deluxe Spacious King Suite",
    caption: "Generous floor plan with lounging space, premium king bed, and private bathroom.",
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-4",
    category: "Reception",
    title: "24-Hour Hospitality Front Desk",
    caption: "Welcoming reception team ready to assist with check-in, temple visits and city guidance.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-5",
    category: "Dining",
    title: "Indoor Dining & Flavours at The Seven's",
    caption: "Comfortable dining space offering fresh North Indian and Chinese vegetarian-friendly meals.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-6",
    category: "Interiors",
    title: "Modern Hallways & Elevator Floor Access",
    caption: "Step-free passenger elevator access serving all guest room floors smoothly.",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-7",
    category: "Surroundings",
    title: "Assi Ghat & Varanasi Riverfront",
    caption: "Close proximity to spiritual morning aarti and cultural hubs of sacred Varanasi.",
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-8",
    category: "Surroundings",
    title: "Evening Ganga Aarti at Ghats",
    caption: "World-renowned spiritual ceremony celebrated across the holy riverfront ghats.",
    imageUrl: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
  },
];

export const faqList: FAQItem[] = [
  {
    id: "faq-1",
    question: "What time is check-in?",
    answer: "Check-in time at The Seven's Hotel is 12:00 PM (Noon). Early check-in is subject to room availability upon arrival.",
  },
  {
    id: "faq-2",
    question: "What time is check-out?",
    answer: "Check-out time is 11:00 AM. Late check-out requests may be accommodated depending on room availability on the departure date.",
  },
  {
    id: "faq-3",
    question: "How can I book a room?",
    answer: "You can send an enquiry directly using the online booking form on this website, message our reservation desk on WhatsApp (+91 88879 25271), or call our front desk directly at +91 88879 25271 / +91 77068 76777.",
  },
  {
    id: "faq-4",
    question: "Is Wi-Fi available at the hotel?",
    answer: "Yes, complimentary high-speed Wi-Fi is available for all resident guests throughout guest rooms, the dining area, and the lobby.",
  },
  {
    id: "faq-5",
    question: "Is vehicle parking available?",
    answer: "Yes, on-site guest parking is available for resident visitors arriving by personal vehicle or taxi.",
  },
  {
    id: "faq-6",
    question: "Do you provide room service?",
    answer: "Yes, in-room dining is available from Flavours at The Seven's, serving freshly prepared vegetarian-friendly North Indian and Chinese meals.",
  },
  {
    id: "faq-7",
    question: "Are children allowed?",
    answer: "Yes, families with children are welcome. Please specify the number of adults and children when submitting your enquiry so we can arrange suitable bedding.",
  },
  {
    id: "faq-8",
    question: "Are pets allowed?",
    answer: "Please contact the hotel front desk directly before booking for the latest pet policy and accommodation guidelines.",
  },
  {
    id: "faq-9",
    question: "How far is Assi Ghat from the hotel?",
    answer: "The Seven's Hotel is located on Assi–Lanka Road in Bhadaini, approximately 800m to 1 km from Assi Ghat (about 3 to 5 minutes by auto/e-rickshaw or an easy stroll).",
  },
  {
    id: "faq-10",
    question: "Do you provide car services and airport transfers?",
    answer: "Yes, our front desk team can assist in arranging local sightseeing vehicles, city transfers, and airport pickup/drop-off upon request.",
  },
  {
    id: "faq-11",
    question: "What is the cancellation policy?",
    answer: "Cancellation terms may vary depending on tariff plans and booking dates. Please contact the reservation desk directly for the specific cancellation policy applicable to your dates.",
  },
  {
    id: "faq-12",
    question: "How can I contact the hotel?",
    answer: "You can reach us by phone at +91 88879 25271 or +91 77068 76777, on WhatsApp at +91 88879 25271, or by email at thesevenshotel@gmail.com.",
  },
];

export const hotelPolicies = {
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
  bookingNotes: [
    "Valid government-issued photo identification (Aadhaar, Passport, Driving License, Voter ID) is required for all adult guests at check-in as per local government regulations.",
    "Early check-in and late check-out requests are subject to room availability on the arrival/departure date.",
    "For cancellation, extra guest bedding, group reservations, or corporate tariff queries, please contact the hotel desk directly for confirmed policy terms.",
    "Property policies and tariffs are subject to confirmation at the time of reservation.",
  ],
  contactForPolicy: "thesevenshotel@gmail.com",
};
