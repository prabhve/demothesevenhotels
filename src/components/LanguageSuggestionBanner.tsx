/**
 * Non-intrusive Language Suggestion Banner
 * Detects browser language and gently suggests switching (e.g. "वेबसाइट को हिन्दी में देखें?")
 * Respects user autonomy: NEVER auto-redirects by IP or browser headers.
 */

import React, { useState, useEffect } from 'react';
import { useSEO } from '../seo/SeoContext';
import { getLocaleByCode, localesRegistry } from '../config/locales';
import { Globe, X, ArrowRight } from 'lucide-react';

export const LanguageSuggestionBanner: React.FC = () => {
  const { currentLocale, setLocale } = useSEO();
  const [suggestedLocale, setSuggestedLocale] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('sevens_hotel_lang_banner_dismissed');
      if (dismissed) return;

      const browserLang = navigator.language?.toLowerCase() || '';
      // Find matching language code
      let detectedCode: string | null = null;

      if (browserLang.startsWith('hi')) detectedCode = 'hi';
      else if (browserLang.startsWith('bn')) detectedCode = 'bn';
      else if (browserLang.startsWith('ta')) detectedCode = 'ta';
      else if (browserLang.startsWith('te')) detectedCode = 'te';
      else if (browserLang.startsWith('mr')) detectedCode = 'mr';
      else if (browserLang.startsWith('gu')) detectedCode = 'gu';
      else if (browserLang.startsWith('fr')) detectedCode = 'fr';
      else if (browserLang.startsWith('de')) detectedCode = 'de';
      else if (browserLang.startsWith('es')) detectedCode = 'es';
      else if (browserLang.startsWith('ar')) detectedCode = 'ar';
      else if (browserLang.startsWith('ja')) detectedCode = 'ja';

      if (detectedCode && detectedCode !== currentLocale.code && localesRegistry[detectedCode]) {
        setSuggestedLocale(detectedCode);
        setIsDismissed(false);
      }
    } catch {}
  }, [currentLocale.code]);

  if (isDismissed || !suggestedLocale) return null;

  const target = getLocaleByCode(suggestedLocale);

  const handleAccept = () => {
    setLocale(suggestedLocale);
    setIsDismissed(true);
    sessionStorage.setItem('sevens_hotel_lang_banner_dismissed', 'true');
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('sevens_hotel_lang_banner_dismissed', 'true');
  };

  const promptText =
    suggestedLocale === 'hi'
      ? 'क्या आप इस वेबसाइट को हिन्दी में देखना चाहते हैं?'
      : `Would you like to view this website in ${target.nativeName} (${target.englishName})?`;

  const acceptBtnText =
    suggestedLocale === 'hi'
      ? 'हाँ, हिन्दी में देखें'
      : `Switch to ${target.nativeName}`;

  return (
    <div className="bg-[#1C1816] text-[#FAF7F2] py-2 px-4 border-b border-[#B47A46]/30 text-xs shadow-md animate-fadeIn transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Globe className="w-4 h-4 text-[#C89B6A] shrink-0" />
          <span className="text-[#E5DFD5]">{promptText}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAccept}
            className="px-3 py-1 rounded-md bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#181412] font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{acceptBtnText}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 text-[#A89E92] hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss language suggestion"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
