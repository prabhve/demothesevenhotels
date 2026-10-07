/**
 * Centralized Multilingual Content & Translation Dictionaries
 * Provides natural, authentic hospitality copy for The Seven's Hotel.
 * Includes Indian languages & international languages with full fallback support.
 */

export interface TranslationDictionary {
  nav: {
    home: string;
    rooms: string;
    facilities: string;
    dining: string;
    experienceVaranasi: string;
    location: string;
    reviews: string;
    gallery: string;
    faq: string;
    contact: string;
    bookStay: string;
    call: string;
    whatsapp: string;
  };
  hero: {
    title: string;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustPills: {
      nearAssi: string;
      comfortableRooms: string;
      guestServices: string;
    };
  };
  about: {
    tagline: string;
    title: string;
    p1: string;
    p2: string;
    verifiedStandards: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    frontDeskBadge: string;
    directCall: string;
  };
  quickBooking: {
    title: string;
    subtitle: string;
    checkIn: string;
    checkOut: string;
    adults: string;
    children: string;
    rooms: string;
    preferredRoom: string;
    guestName: string;
    mobile: string;
    email: string;
    specialRequest: string;
    sendEnquiry: string;
    enquireWhatsApp: string;
    startingFrom: string;
    perNight: string;
    successMessage: string;
    disclaimer: string;
  };
  rooms: {
    title: string;
    subtitle: string;
    viewDetails: string;
    checkRates: string;
    from: string;
    perNight: string;
    compareTitle: string;
    compareSubtitle: string;
    amenitiesLabel: string;
    bedLabel: string;
    occupancyLabel: string;
  };
  whyStay: {
    badge: string;
    title: string;
    subtitle: string;
    pillars: Array<{ title: string; desc: string }>;
  };
  facilities: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{ title: string; desc: string }>;
  };
  dining: {
    badge: string;
    title: string;
    subtitle: string;
    viewMenu: string;
    orderRoom: string;
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
    exploreBtn: string;
  };
  location: {
    badge: string;
    title: string;
    subtitle: string;
    getDirections: string;
    openInMaps: string;
    addressLabel: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedGuest: string;
    readMore: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    stillHaveQuestions: string;
    chatWithUs: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    roomCategories: string;
    contactDesk: string;
    rights: string;
  };
  whatsappMessages: {
    generalEnquiry: string;
    roomEnquiry: (roomName: string) => string;
    bookingEnquiry: (details: any) => string;
  };
}

export const englishTranslations: TranslationDictionary = {
  nav: {
    home: "Home",
    rooms: "Rooms",
    facilities: "Facilities",
    dining: "Dining",
    experienceVaranasi: "Experience Varanasi",
    location: "Location",
    reviews: "Reviews",
    gallery: "Gallery",
    faq: "FAQ",
    contact: "Contact",
    bookStay: "Book Your Stay",
    call: "Call",
    whatsapp: "WhatsApp",
  },
  hero: {
    title: "Comfortable Stay Near Assi Ghat, Varanasi",
    subheading: "A convenient stay in Varanasi, close to Assi Ghat and some of the city's most loved cultural and spiritual experiences.",
    ctaPrimary: "Check Availability",
    ctaSecondary: "Chat on WhatsApp",
    trustPills: {
      nearAssi: "Near Assi Ghat",
      comfortableRooms: "Comfortable AC Rooms",
      guestServices: "Warm Guest Services",
    },
  },
  about: {
    tagline: "About The Seven's · Bhadaini, Varanasi",
    title: "Thoughtful Hospitality on Assi–Lanka Road",
    p1: "Welcome to The Seven's Hotel, a contemporary stay in the peaceful Assi–Bhadaini quarter of Varanasi. Designed for pilgrims, family vacationers, and travelers seeking comfort and convenience, our hotel combines clean air-conditioned rooms with sincere Banarasi hospitality.",
    p2: "Whether you are waking up early for the spiritual Subah-e-Banaras and sunrise boat rides at Assi Ghat, visiting Sankat Mochan Temple and Kashi Vishwanath corridor, or attending academic commitments at BHU, our front desk team ensures a relaxed and memorable visit.",
    verifiedStandards: "Verified Hospitality Standards",
    bullet1: "~800m from Assi Ghat — peaceful southern Varanasi setting",
    bullet2: "Modern elevator access across all guest room floors",
    bullet3: "In-house Flavours restaurant & warm in-room dining service",
    frontDeskBadge: "24/7 Front Desk",
    directCall: "Direct Call",
  },
  quickBooking: {
    title: "Check Availability & Plan Your Stay",
    subtitle: "Send a direct booking enquiry to our 24/7 front desk for instant tariff confirmations and personalized assistance.",
    checkIn: "Check-in Date",
    checkOut: "Check-out Date",
    adults: "Adults",
    children: "Children",
    rooms: "Rooms",
    preferredRoom: "Preferred Room",
    guestName: "Full Name",
    mobile: "Mobile Number",
    email: "Email Address",
    specialRequest: "Special Requests / Arrival Notes",
    sendEnquiry: "Send Booking Enquiry",
    enquireWhatsApp: "Book / Enquire on WhatsApp",
    startingFrom: "Starting from",
    perNight: "per night",
    successMessage: "Thank you! Your enquiry has been received. Our reservations team will reach out shortly.",
    disclaimer: "No payment required now. Our front desk verifies live room availability and tariff options directly.",
  },
  rooms: {
    title: "Comfortable Guest Rooms",
    subtitle: "Choose from our cleanly appointed accommodations on Assi–Lanka Road, tailored for pilgrims, couples, and traveling families.",
    viewDetails: "View Details",
    checkRates: "Check Availability",
    from: "From",
    perNight: "/ night",
    compareTitle: "Room Comparison",
    compareSubtitle: "Side-by-side comparison of confirmed property amenities and specifications.",
    amenitiesLabel: "Amenities",
    bedLabel: "Bed Type",
    occupancyLabel: "Occupancy",
  },
  whyStay: {
    badge: "Why Choose Us",
    title: "Your Peaceful Base Near Assi Ghat",
    subtitle: "Thoughtfully situated to keep you close to the Ganges ghats while offering calm relaxation after city exploration.",
    pillars: [
      { title: "Prime Assi Ghat Location", desc: "Walking distance to Assi Ghat for sunrise boat rides, Subah-e-Banaras, and sacred evening aarti." },
      { title: "Comfortable Stay", desc: "Well-appointed air-conditioned rooms with high-speed Wi-Fi, private bathrooms, and quality bedding." },
      { title: "Warm Hospitality", desc: "Attentive front desk service dedicated to assisting guests with temple visits and travel guidance." },
      { title: "Convenient Guest Services", desc: "In-house vegetarian dining, room service, laundry assistance, car service, and doctor-on-call." },
      { title: "Easy Access to Varanasi Attractions", desc: "Convenient transit to Sankat Mochan Temple, Durga Kund, BHU campus, and Kashi Vishwanath Corridor." },
    ],
  },
  facilities: {
    badge: "Guest Amenities",
    title: "Confirmed Property Facilities",
    subtitle: "Real, confirmed services available for our staying guests in Varanasi.",
    items: [
      { title: "Room Service", desc: "Freshly prepared vegetarian meals and hot beverages served to your room." },
      { title: "Restaurant Dining", desc: "In-house dining serving clean North Indian, Banarasi, and comfort favorites." },
      { title: "Car Service Assistance", desc: "Reliable local cab assistance and station transit arrangements upon request." },
      { title: "Doctor On Call", desc: "Prompt medical consultation assistance available 24/7 for guest safety." },
      { title: "Laundry Service", desc: "Same-day laundry and pressing service for refreshed travel wear." },
      { title: "Free Wi-Fi", desc: "High-speed wireless connectivity available across all rooms and common areas." },
    ],
  },
  dining: {
    badge: "In-House Dining",
    title: "Flavours at The Seven's",
    subtitle: "Delicious, vegetarian-friendly cuisine freshly prepared for our guests.",
    viewMenu: "View Dining Menu",
    orderRoom: "Order to Room",
  },
  experience: {
    badge: "Cultural & Spiritual Hub",
    title: "Experience Varanasi from Assi",
    subtitle: "Immerse yourself in centuries of living tradition just minutes from our hotel gates.",
    exploreBtn: "View on Map",
  },
  location: {
    badge: "Location & Connectivity",
    title: "Convenient Address on Assi–Lanka Road",
    subtitle: "Situated in Bhadaini, offering hassle-free road access and peaceful surroundings.",
    getDirections: "Get Directions",
    openInMaps: "Open in Google Maps",
    addressLabel: "Hotel Address",
  },
  reviews: {
    badge: "Guest Experiences",
    title: "Verified Guest Feedback",
    subtitle: "Real testimonials shared by travelers who stayed at The Seven's Hotel.",
    verifiedGuest: "Verified Guest",
    readMore: "Read More Reviews",
  },
  faq: {
    badge: "Got Questions?",
    title: "Frequently Asked Questions",
    subtitle: "Key details about check-in, policies, location, and guest services.",
    stillHaveQuestions: "Have a specific query not covered here?",
    chatWithUs: "Chat with Front Desk",
  },
  footer: {
    tagline: "Comfortable hospitality near Assi Ghat, Varanasi.",
    quickLinks: "Quick Navigation",
    roomCategories: "Room Categories",
    contactDesk: "Front Desk & Reservations",
    rights: "All rights reserved. The Seven's Hotel, Varanasi.",
  },
  whatsappMessages: {
    generalEnquiry: "Hello The Seven's Hotel, I would like to enquire about staying at your Varanasi property.",
    roomEnquiry: (roomName: string) => `Hello The Seven's Hotel, I am interested in booking the ${roomName}. Please share availability and current tariff details.`,
    bookingEnquiry: (details: any) => `Hello The Seven's Hotel,\nI would like to enquire about a room booking at your Varanasi property.\n\nGuest Name: ${details.guestName || 'Guest'}\nPhone: ${details.phone || 'N/A'}\nCheck-in: ${details.checkIn || 'To be confirmed'}\nCheck-out: ${details.checkOut || 'To be confirmed'}\nPreferred Room: ${details.roomType || 'Classic Room'}\nGuests: ${details.guests || '2 Adults'}\n\nPlease share availability and best tariff options. Thank you!`,
  },
};

export const hindiTranslations: TranslationDictionary = {
  nav: {
    home: "होम",
    rooms: "कमरे",
    facilities: "सुविधाएं",
    dining: "भोजन",
    experienceVaranasi: "काशी दर्शन",
    location: "स्थान",
    reviews: "समीक्षाएं",
    gallery: "तस्वीरें",
    faq: "सामान्य प्रश्न",
    contact: "संपर्क",
    bookStay: "कमरा बुक करें",
    call: "कॉल करें",
    whatsapp: "व्हाट्सएप",
  },
  hero: {
    title: "अस्सी घाट के पास आरामदायक ठहराव, वाराणसी",
    subheading: "वाराणसी में अस्सी घाट और प्रमुख सांस्कृतिक व आध्यात्मिक स्थलों के नजदीक एक शांत और सुविधाजनक होटल।",
    ctaPrimary: "उपलब्धता जांचें",
    ctaSecondary: "व्हाट्सएप पर बात करें",
    trustPills: {
      nearAssi: "अस्सी घाट के समीप",
      comfortableRooms: "आरामदायक एसी कमरे",
      guestServices: "विश्वसनीय अतिथि सेवा",
    },
  },
  about: {
    tagline: "द सेवेन्स होटल परिचय · भदैनी, वाराणसी",
    title: "अस्सी–लंका रोड पर आत्मीय बनारसी आतिथ्य",
    p1: "द सेवेन्स होटल में आपका स्वागत है। वाराणसी के शांत अस्सी-भदैनी क्षेत्र में स्थित हमारा होटल तीर्थयात्रियों, परिवारों और पर्यटकों के लिए स्वच्छ, वातानुकूलित और सुविधाजनक ठहराव प्रदान करता है।",
    p2: "चाहे आप सुबह-ए-बनारस और गंगा नौका विहार के लिए अस्सी घाट जा रहे हों, संकट मोचन मंदिर या श्री काशी विश्वनाथ कॉरिडोर के दर्शन कर रहे हों, हमारी 24 घंटे उपलब्ध टीम आपकी यात्रा को सुगम बनाती है।",
    verifiedStandards: "प्रमाणित आतिथ्य मानक",
    bullet1: "~800 मीटर अस्सी घाट से — शांत दक्षिणी वाराणसी वातावरण",
    bullet2: "सभी मंजिलों पर आधुनिक लिफ्ट (एलिवेटर) सुविधा",
    bullet3: "इन-हाउस फ्लेवर्स रेस्टोरेंट और रूम सर्विस भोजन",
    frontDeskBadge: "24/7 फ्रंट डेस्क",
    directCall: "सीधा फोन करें",
  },
  quickBooking: {
    title: "उपलब्धता जांचें और कमरा बुक करें",
    subtitle: "ताज़ा कमरा उपलब्धता और सबसे उचित किराए के लिए हमारे 24 घंटे फ्रंट डेस्क को सीधा अनुरोध भेजें।",
    checkIn: "आगमन तिथि (Check-in)",
    checkOut: "प्रस्थान तिथि (Check-out)",
    adults: "वयस्क",
    children: "बच्चे",
    rooms: "कमरों की संख्या",
    preferredRoom: "पसंदीदा कमरा",
    guestName: "अतिथि का पूरा नाम",
    mobile: "मोबाइल नंबर",
    email: "ईमेल पता",
    specialRequest: "विशेष अनुरोध / टिप्पणी",
    sendEnquiry: "बुकिंग पूछताछ भेजें",
    enquireWhatsApp: "व्हाट्सएप पर तुरंत पूछें",
    startingFrom: "शुरुआती किराया",
    perNight: "प्रति रात",
    successMessage: "धन्यवाद! आपकी पूछताछ प्राप्त हो गई है। हमारी टीम आपसे जल्द संपर्क करेगी।",
    disclaimer: "अभी किसी अग्रिम भुगतान की आवश्यकता नहीं है। हमारा फ्रंट डेस्क सीधे पुष्टि करता है।",
  },
  rooms: {
    title: "आरामदायक अतिथि कमरे",
    subtitle: "अस्सी-लंका रोड पर तीर्थयात्रियों, युगलों और परिवारों के लिए पूरी तरह सुसज्जित स्वच्छ कमरे।",
    viewDetails: "विवरण देखें",
    checkRates: "उपलब्धता जांचें",
    from: "शुरुआत",
    perNight: "/ रात",
    compareTitle: "कमरों की तुलना",
    compareSubtitle: "होटल की प्रमाणित सुविधाओं और कमरों के विनिर्देशों की आमने-सामने तुलना।",
    amenitiesLabel: "सुविधाएं",
    bedLabel: "बिस्तर प्रकार",
    occupancyLabel: "क्षमता",
  },
  whyStay: {
    badge: "हमारे साथ क्यों ठहरें",
    title: "अस्सी घाट के समीप आपका शांत ठिकाना",
    subtitle: "गंगा घाटों के निकट रहते हुए शहर भ्रमण के बाद शांत विश्राम का अनुभव।",
    pillars: [
      { title: "अस्सी घाट का मुख्य स्थान", desc: "अस्सी घाट तक पैदल दूरी, जहां आप प्रातःकालीन नौका विहार, सुबह-ए-बनारस और संध्या आरती देख सकते हैं।" },
      { title: "आरामदायक ठहराव", desc: "उच्च गति वाई-फाई, निजी बाथरूम, एयर कंडीशनिंग और आरामदायक बिस्तरों वाले सुव्यवस्थित कमरे।" },
      { title: "आत्मीय आतिथ्य", desc: "मंदिर दर्शन, स्थानीय मार्गदर्शन और यात्रा सहायता के लिए सदैव तत्पर स्टाफ।" },
      { title: "सुविधाजनक अतिथि सेवाएं", desc: "इन-हाउस शुद्ध शाकाहारी रेस्टोरेंट, रूम सर्विस, कपड़े धोने की व्यवस्था और आवश्यकता पड़ने पर डॉक्टर।" },
      { title: "वाराणसी के दर्शनीय स्थलों तक सुगम पहुंच", desc: "संकट मोचन मंदिर, दुर्गा कुंड, बीएचयू और काशी विश्वनाथ धाम तक आसान आवागमन।" },
    ],
  },
  facilities: {
    badge: "होटल सुविधाएं",
    title: "प्रमाणित संपत्ति सुविधाएं",
    subtitle: "वाराणसी में हमारे अतिथियों के लिए उपलब्ध वास्तविक और सत्यापित सेवाएं।",
    items: [
      { title: "रूम सर्विस", desc: "ताजा तैयार शाकाहारी भोजन और चाय-नाश्ता सीधे आपके कमरे में।" },
      { title: "रेस्टोरेंट भोजन", desc: "इन-हाउस स्वच्छ उत्तर भारतीय और बनारसी पसंदीदा व्यंजनों का स्वाद।" },
      { title: "कार सेवा सहायता", desc: "अनुरोध पर स्थानीय भ्रमण और रेलवे स्टेशन हेतु विश्वसनीय टैक्सी सहायता।" },
      { title: "डॉक्टर ऑन कॉल", desc: "अतिथियों के स्वास्थ्य और सुरक्षा के लिए 24 घंटे चिकित्सा परामर्श सुविधा।" },
      { title: "लॉन्ड्री सेवा", desc: "सुविधाजनक और त्वरित कपड़े धोने व प्रेस करने की सेवा।" },
      { title: "मुफ्त वाई-फाई", desc: "सभी कमरों और सार्वजनिक क्षेत्रों में हाई-स्पीड इंटरनेट कनेक्टिविटी।" },
    ],
  },
  dining: {
    badge: "इन-हाउस रेस्टोरेंट",
    title: "फ्लेवर्स एट द सेवेन्स",
    subtitle: "हमारे अतिथियों के लिए प्यार और स्वच्छता से तैयार किया गया स्वादिष्ट शाकाहारी भोजन।",
    viewMenu: "मेन्यू देखें",
    orderRoom: "कमरे में ऑर्डर करें",
  },
  experience: {
    badge: "सांस्कृतिक व आध्यात्मिक अनुभव",
    title: "अस्सी से जानिए काशी की भव्यता",
    subtitle: "होटल से कुछ ही मिनटों की दूरी पर सदियों पुरानी जीवंत परंपराओं और गंगा घाटों का संगम।",
    exploreBtn: "मानचित्र पर देखें",
  },
  location: {
    badge: "स्थान और संपर्क मार्ग",
    title: "अस्सी–लंका रोड पर सुविधाजनक पता",
    subtitle: "भदैनी में स्थित, जहां से मुख्य सड़कों और घाटों तक पहुंचना बेहद आसान है।",
    getDirections: "दिशा-निर्देश प्राप्त करें",
    openInMaps: "गूगल मैप्स पर खोलें",
    addressLabel: "होटल का पता",
  },
  reviews: {
    badge: "अतिथियों के अनुभव",
    title: "सत्यापित अतिथि समीक्षाएं",
    subtitle: "द सेवेन्स होटल में ठहरे हुए वास्तविक यात्रियों द्वारा साझा किए गए अनुभव।",
    verifiedGuest: "प्रमाणित अतिथि",
    readMore: "और समीक्षाएं पढ़ें",
  },
  faq: {
    badge: "अक्सर पूछे जाने वाले सवाल",
    title: "सामान्य प्रश्नोत्तरी (FAQ)",
    subtitle: "चेक-इन समय, होटल नीतियां, दूरी और सेवाओं से जुड़ी आवश्यक जानकारी।",
    stillHaveQuestions: "क्या आपका कोई अन्य सवाल है?",
    chatWithUs: "फ्रंट डेस्क से बात करें",
  },
  footer: {
    tagline: "अस्सी घाट, वाराणसी के पास आरामदायक व आत्मीय आतिथ्य।",
    quickLinks: "त्वरित नेविगेशन",
    roomCategories: "कमरों की श्रेणियां",
    contactDesk: "फ्रंट डेस्क व बुकिंग",
    rights: "सर्वाधिकार सुरक्षित। द सेवेन्स होटल, वाराणसी।",
  },
  whatsappMessages: {
    generalEnquiry: "नमस्ते द सेवेन्स होटल, मैं वाराणसी में आपके होटल में ठहरने के संबंध में जानकारी चाहता/चाहती हूँ।",
    roomEnquiry: (roomName: string) => `नमस्ते द सेवेन्स होटल, मैं ${roomName} बुक करने में रुचि रखता/रखती हूँ। कृपया उपलब्धता और किराया साझा करें।`,
    bookingEnquiry: (details: any) => `नमस्ते द सेवेन्स होटल,\nमैं आपके वाराणसी होटल में कमरा बुक करने के लिए पूछताछ करना चाहता हूँ।\n\nनाम: ${details.guestName || 'अतिथि'}\nफोन: ${details.phone || 'N/A'}\nआगमन तिथि: ${details.checkIn || 'निर्धारित नहीं'}\nप्रस्थान तिथि: ${details.checkOut || 'निर्धारित नहीं'}\nपसंदीदा कमरा: ${details.roomType || 'क्लासिक रूम'}\nअतिथि संख्या: ${details.guests || '2 वयस्क'}\n\nकृपया उपलब्धता और सर्वोत्तम किराया साझा करें। धन्यवाद!`,
  },
};

// Generates an localized dictionary for any given language code using English as fallback
// and tailored native translations for high-value regions.
export const getTranslations = (localeCode: string): TranslationDictionary => {
  const code = localeCode.toLowerCase().trim();
  if (code === 'hi') {
    return hindiTranslations;
  }
  if (code === 'en') {
    return englishTranslations;
  }

  // Provide high-fidelity localized strings based on locale code, falling back to English
  const base = { ...englishTranslations };

  if (code === 'bn') {
    return {
      ...base,
      nav: { ...base.nav, home: "হোম", rooms: "রুম", facilities: "সুবিধাসমূহ", dining: "খাবার", experienceVaranasi: "বারাণসী দর্শন", location: "অবস্থান", contact: "যোগাযোগ", bookStay: "রুম বুক করুন" },
      hero: { ...base.hero, title: "অসি ঘাটের কাছে আরামদায়ক হোটেল, বারাণসী", ctaPrimary: "উপলব্ধতা যাচাই করুন", ctaSecondary: "হোয়াটসঅ্যাপে চ্যাট করুন" },
      footer: { ...base.footer, rights: "সর্বস্বত্ব সংরক্ষিত। দ্য সেভেনস হোটেল, বারাণসী।" },
    };
  }

  if (code === 'ta') {
    return {
      ...base,
      nav: { ...base.nav, home: "முகப்பு", rooms: "அறைகள்", facilities: "வசதிகள்", dining: "உணவு", experienceVaranasi: "வாரணாசி அனுபவம்", location: "இடம்", contact: "தொடர்பு", bookStay: "அறை முன்பதிவு" },
      hero: { ...base.hero, title: "அஸ்ஸி காட் அருகிலுள்ள வசதியான தங்குமிடம், வாரணாசி", ctaPrimary: "இருப்பு சரிபார்க்கவும்", ctaSecondary: "வாட்ஸ்அப்பில் பேசவும்" },
      footer: { ...base.footer, rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. தி செவன்ஸ் ஹோட்டல், வாரணாசி." },
    };
  }

  if (code === 'te') {
    return {
      ...base,
      nav: { ...base.nav, home: "హోమ్", rooms: "గదులు", facilities: "సౌకర్యాలు", dining: "భోజనం", experienceVaranasi: "వారణాసి అనుభవం", location: "స్థానం", contact: "సంప్రదించండి", bookStay: "గది బుక్ చేయండి" },
      hero: { ...base.hero, title: "అస్సీ ఘాట్ సమీపంలో సౌకర్యవంతమైన బస, వారణాసి", ctaPrimary: "లభ్యతను తనిఖీ చేయండి", ctaSecondary: "వాట్సాప్‌లో చాట్ చేయండి" },
    };
  }

  if (code === 'mr') {
    return {
      ...base,
      nav: { ...base.nav, home: "मुख्यपृष्ठ", rooms: "खोल्या", facilities: "सुविधा", dining: "जेवण", experienceVaranasi: "वाराणसी दर्शन", location: "स्थान", contact: "संपर्क", bookStay: "खोली बुक करा" },
      hero: { ...base.hero, title: "अस्सी घाट जवळ आरामदायक मुक्काम, वाराणसी", ctaPrimary: "उपलब्धता तपासा", ctaSecondary: "व्हॉट्सॲपवर संपर्क करा" },
    };
  }

  if (code === 'gu') {
    return {
      ...base,
      nav: { ...base.nav, home: "હોમ", rooms: "રૂમ", facilities: "સુવિધાઓ", dining: "ભોજન", experienceVaranasi: "વારાણસી દર્શન", location: "સ્થળ", contact: "સંપર્ક", bookStay: "રૂમ બુક કરો" },
      hero: { ...base.hero, title: "અસ્સી ઘાટ પાસે આરામદાયક રોકાણ, વારાણસી", ctaPrimary: "ઉપલબ્ધતા તપાસો", ctaSecondary: "વ્હોટ્સએપ પર ચેટ કરો" },
    };
  }

  if (code === 'ur') {
    return {
      ...base,
      nav: { ...base.nav, home: "ہوم", rooms: "کمرے", facilities: "سہولیات", dining: "کھانا", experienceVaranasi: "وارانسی کا تجربہ", location: "مقام", contact: "رابطہ", bookStay: "کمرہ بک کریں" },
      hero: { ...base.hero, title: "اسّی گھاٹ کے قریب آرام دہ قیام، وارانسی", ctaPrimary: "دستیابی چیک کریں", ctaSecondary: "واٹس ایپ پر رابطہ کریں" },
    };
  }

  if (code === 'fr') {
    return {
      ...base,
      nav: { ...base.nav, home: "Accueil", rooms: "Chambres", facilities: "Services", dining: "Restaurant", experienceVaranasi: "Découvrir Varanasi", location: "Emplacement", contact: "Contact", bookStay: "Réserver votre séjour" },
      hero: { ...base.hero, title: "Séjour Confortable Près d'Assi Ghat, Varanasi", subheading: "Un hébergement soigné à Varanasi, à quelques pas d'Assi Ghat et des expériences culturelles majeures.", ctaPrimary: "Vérifier la Disponibilité", ctaSecondary: "Discuter sur WhatsApp" },
    };
  }

  if (code === 'de') {
    return {
      ...base,
      nav: { ...base.nav, home: "Startseite", rooms: "Zimmer", facilities: "Ausstattung", dining: "Gastronomie", experienceVaranasi: "Varanasi Erleben", location: "Lage", contact: "Kontakt", bookStay: "Aufenthalt Buchen" },
      hero: { ...base.hero, title: "Komfortabler Aufenthalt nahe Assi Ghat, Varanasi", subheading: "Eine angenehme Unterkunft in Varanasi, in unmittelbarer Nähe zum Assi Ghat und heiligen Stätten.", ctaPrimary: "Verfügbarkeit Prüfen", ctaSecondary: "WhatsApp Kontakt" },
    };
  }

  if (code === 'es') {
    return {
      ...base,
      nav: { ...base.nav, home: "Inicio", rooms: "Habitaciones", facilities: "Servicios", dining: "Restaurante", experienceVaranasi: "Descubrir Varanasi", location: "Ubicación", contact: "Contacto", bookStay: "Reservar Estadía" },
      hero: { ...base.hero, title: "Estancia Cómoda Cerca de Assi Ghat, Varanasi", subheading: "Un alojamiento agradable en Varanasi, cerca de Assi Ghat y las principales atracciones culturales.", ctaPrimary: "Consultar Disponibilidad", ctaSecondary: "Chatear por WhatsApp" },
    };
  }

  if (code === 'ar') {
    return {
      ...base,
      nav: { ...base.nav, home: "الرئيسية", rooms: "الغرف", facilities: "المرافق", dining: "المطعم", experienceVaranasi: "اكتشف فاراناسي", location: "الموقع", contact: "اتصل بنا", bookStay: "احجز إقامتك" },
      hero: { ...base.hero, title: "إقامة مريحة بالقرب من آسي غات، فاراناسي", subheading: "إقامة عصرية متميزة في فاراناسي، بالقرب من آسي غات والمعالم الروحانية الهامة.", ctaPrimary: "تحقق من التوافر", ctaSecondary: "تواصل عبر واتساب" },
    };
  }

  if (code === 'ja') {
    return {
      ...base,
      nav: { ...base.nav, home: "ホーム", rooms: "客室", facilities: "施設", dining: "お食事", experienceVaranasi: "バラナシ観光", location: "アクセス", contact: "お問い合わせ", bookStay: "宿泊予約" },
      hero: { ...base.hero, title: "アッシ・ガート近くの快適な滞在、バラナシ", subheading: "アッシ・ガートや神聖な寺院へのアクセスに優れた、安心で清潔なホテルです。", ctaPrimary: "空室を確認", ctaSecondary: "WhatsAppでお問い合わせ" },
    };
  }

  if (code === 'zh-hans') {
    return {
      ...base,
      nav: { ...base.nav, home: "首页", rooms: "客房", facilities: "设施", dining: "餐饮", experienceVaranasi: "探索瓦拉纳西", location: "位置", contact: "联系我们", bookStay: "预订住宿" },
      hero: { ...base.hero, title: "瓦拉纳西阿西河坛附近的舒适住宿", subheading: "位于瓦拉纳西阿西-兰卡路的现代化品质酒店，靠近阿西河坛及文化景点。", ctaPrimary: "查询房态", ctaSecondary: "WhatsApp咨询" },
    };
  }

  return base;
};
