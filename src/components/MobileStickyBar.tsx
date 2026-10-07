import React from 'react';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';
import { useSEO } from '../seo/SeoContext';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  const { contactInfo } = useHotelData();
  const { t, generateWhatsAppUrl } = useSEO();

  const handleWhatsApp = () => {
    const url = generateWhatsAppUrl('general');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#1C1816]/95 border-t border-[#B47A46]/30 px-2 sm:px-3 py-2 sm:py-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-md w-full max-w-full overflow-hidden">
      <div className="flex items-center gap-1.5 sm:gap-2 max-w-md mx-auto min-w-0">
        {/* Call Button */}
        <a
          href={`tel:${contactInfo.primaryPhoneRaw}`}
          className="flex-1 min-w-0 min-h-[42px] px-1.5 sm:px-2 py-2 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#FAF7F2] bg-[#2A231F] border border-[#B47A46]/40 rounded-lg flex items-center justify-center gap-1 sm:gap-1.5 active:bg-[#352D28] whitespace-nowrap"
          title="Call Hotel"
        >
          <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C89B6A] shrink-0" />
          <span className="truncate">{t.nav.call}</span>
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex-1 min-w-0 min-h-[42px] px-1.5 sm:px-2 py-2 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-white bg-[#25D366] active:bg-[#20BA5A] rounded-lg flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer shadow-sm"
          title="WhatsApp"
        >
          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white shrink-0" />
          <span className="truncate">{t.nav.whatsapp}</span>
        </button>

        {/* Book Now Button */}
        <button
          onClick={onOpenBooking}
          className="flex-[1.3] min-w-0 min-h-[42px] px-2 sm:px-3 py-2 text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest font-semibold text-[#181412] bg-[#C89B6A] active:bg-[#B47A46] rounded-lg flex items-center justify-center gap-1 sm:gap-1.5 shadow-md whitespace-nowrap cursor-pointer"
        >
          <CalendarCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="truncate">{t.nav.bookStay}</span>
        </button>
      </div>
    </div>
  );
};
