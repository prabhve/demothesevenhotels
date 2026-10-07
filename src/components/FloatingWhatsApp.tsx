import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSEO } from '../seo/SeoContext';

export const FloatingWhatsApp: React.FC = () => {
  const { generateWhatsAppUrl } = useSEO();

  const handleClick = () => {
    const url = generateWhatsAppUrl('general');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40">
      <button
        onClick={handleClick}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
        aria-label="Enquire on WhatsApp"
        title="Chat with The Seven's Hotel on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />

        {/* Desktop Hover Tooltip */}
        <span className="hidden md:group-hover:inline-block absolute right-16 top-1/2 -translate-y-1/2 bg-[#1C1816] text-[#FAF7F2] text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-[#B47A46]/30 pointer-events-none">
          WhatsApp Hotel Desk
        </span>
      </button>
    </div>
  );
};
