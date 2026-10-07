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
    <div className="hidden md:block fixed bottom-6 right-5 z-40">
      <button
        onClick={handleClick}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Enquire on WhatsApp"
        title="Chat with The Seven's Hotel on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <MessageCircle className="relative z-10 w-7 h-7 fill-white stroke-none" />

        {/* Desktop Hover Tooltip */}
        <span className="hidden md:group-hover:inline-block absolute right-16 top-1/2 -translate-y-1/2 bg-[#1C1816] text-[#FAF7F2] text-xs font-medium px-3.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-[#B47A46]/30 pointer-events-none transition-all">
          WhatsApp Hotel Desk
        </span>
      </button>
    </div>
  );
};
