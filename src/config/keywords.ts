/**
 * SEO Keyword Clusters Configuration
 * Structured search queries and intent mappings used strictly for:
 * - Dynamic metadata planning and validation
 * - Content generation and natural semantic matching
 * - SEO diagnostics and audit checks
 *
 * NOTE: DO NOT render raw keyword lists into the visual UI.
 */

export interface KeywordCluster {
  brand: string[];
  local: string[];
  attraction: string[];
  intent: {
    booking: string[];
    convenience: string[];
    pilgrimage: string[];
  };
}

export const seoKeywordClusters: Record<string, KeywordCluster> = {
  en: {
    brand: [
      "The Seven's Hotel Varanasi",
      "The Seven's Hotel Assi",
      "The Seven's Hotel booking",
      "The Seven's Hotel Bhadaini",
    ],
    local: [
      "hotel near Assi Ghat Varanasi",
      "hotel near Assi Ghat",
      "stay near Assi Ghat Varanasi",
      "hotel in Bhadaini Varanasi",
      "hotels on Assi Lanka Road Varanasi",
      "comfortable hotel in Varanasi",
    ],
    attraction: [
      "hotel near Sankat Mochan Temple Varanasi",
      "hotel near Tulsi Ghat Varanasi",
      "hotel near Kashi Vishwanath Temple",
      "hotel near Durga Temple Varanasi",
      "hotel near Subah-e-Banaras Assi Ghat",
    ],
    intent: {
      booking: [
        "Varanasi hotel room tariff",
        "book room near Assi Ghat",
        "Classic room The Sevens Hotel",
        "Deluxe room The Sevens Hotel",
        "check availability Varanasi hotel",
      ],
      convenience: [
        "Varanasi hotel with Wi-Fi and AC",
        "hotel with lift elevator in Varanasi",
        "hotel with in-house restaurant Assi",
        "24 hour front desk hotel Varanasi",
      ],
      pilgrimage: [
        "hotel for Kashi yatra near Assi",
        "family stay for Ganga aarti Varanasi",
        "peaceful hotel in Varanasi for elders",
      ],
    },
  },

  hi: {
    brand: [
      "द सेवेन्स होटल वाराणसी",
      "द सेवेन्स होटल अस्सी घाट",
      "The Seven's Hotel Varanasi",
    ],
    local: [
      "वाराणसी अस्सी घाट के पास होटल",
      "अस्सी घाट के नजदीक ठहरने की जगह",
      "भदैनी वाराणसी में होटल",
      "अस्सी लंका रोड होटल वाराणसी",
      "वाराणसी में आरामदायक कमरा",
    ],
    attraction: [
      "संकट मोचन मंदिर के पास होटल",
      "काशी विश्वनाथ मंदिर के नजदीक होटल",
      "तुलसी घाट के पास होटल",
      "दुर्गा कुंड मंदिर के पास होटल",
    ],
    intent: {
      booking: [
        "वाराणसी होटल बुकिंग",
        "अस्सी घाट होटल रूम किराया",
        "कमरे की उपलब्धता जांचें",
      ],
      convenience: [
        "एसी और वाईफाई युक्त होटल वाराणसी",
        "रेस्टोरेंट और लिफ्ट सुविधा वाला होटल",
        "24 घंटे रिसेप्शन होटल अस्सी",
      ],
      pilgrimage: [
        "काशी यात्रा के लिए उत्तम होटल",
        "गंगा आरती देखने के लिए होटल",
        "परिवार के साथ काशी दर्शन होटल",
      ],
    },
  },

  // Natural Romanized / Hinglish search intent
  hinglish: {
    brand: [
      "the sevens hotel varanasi",
      "thesevenshotel assi",
    ],
    local: [
      "assi ghat ke paas hotel",
      "varanasi me hotel",
      "assi ghat ke nazdeek hotel",
      "assi lanka road hotel varanasi",
      "bhadaini me best hotel",
    ],
    attraction: [
      "sankat mochan ke paas hotel",
      "kashi vishwanath ke paas hotel",
      "ganga aarti ke paas hotel",
    ],
    intent: {
      booking: [
        "varanasi hotel booking online",
        "assi ghat hotel contact number",
        "varanasi hotel room price",
      ],
      convenience: [
        "assi ghat hotel with restaurant",
        "lift wala hotel varanasi me",
      ],
      pilgrimage: [
        "kashi yatra ke liye hotel",
        "subah banaras assi ghat hotel",
      ],
    },
  },
};
