import React from 'react';
import { Phone, MessageCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';
import { useSEO } from '../seo/SeoContext';
import { ScrollReveal } from './ScrollReveal';

interface BookingCTASectionProps {
  onOpenBooking: () => void;
}

export const BookingCTASection: React.FC<BookingCTASectionProps> = ({ onOpenBooking }) => {
  const { contactInfo, hotelInfo, bookingSettings } = useHotelData();
  const { t, formatPrice, generateWhatsAppUrl } = useSEO();

  const handleWhatsApp = () => {
    const url = generateWhatsAppUrl('general');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const startingPriceInfo = formatPrice(bookingSettings.startingPrice);

  return (
    <section className="py-20 sm:py-28 bg-[#14100E] text-[#FAF7F2] relative overflow-hidden">
      {/* Background High-Definition Varanasi Evening Aarti with Layered Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=2000&q=80"
          alt="Varanasi Ganga Aarti Evening Riverfront"
          className="w-full h-full object-cover object-center opacity-30 brightness-75 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100E] via-[#181412]/85 to-[#14100E] z-10" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B47A46]/15 blur-[120px] pointer-events-none z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <ScrollReveal direction="up" delay={100}>
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full border border-[#B47A46]/40 bg-[#1C1816]/80 text-xs uppercase tracking-widest text-[#C89B6A] backdrop-blur-sm shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C89B6A]" />
            <span>Direct Reservation & Inquiry Guarantee</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#FAF7F2] mb-4 text-balance drop-shadow-md">
            Plan Your Stay at The Seven's Hotel
          </h2>

          <p className="text-sm sm:text-base text-[#D8CEBF] max-w-2xl mx-auto leading-relaxed mb-8 text-balance">
            Experience comfortable contemporary accommodations situated in the Assi–Lanka corridor of Varanasi. Connect directly with our 24/7 reception desk for instant availability and best tariff confirmations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:shadow-[#C89B6A]/30"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#FAF7F2] bg-[#1C1816]/90 hover:bg-[#2A231F] border border-[#25D366]/40 hover:border-[#25D366] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md backdrop-blur-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{t.hero.ctaSecondary}</span>
            </button>

            <a
              href={`tel:${contactInfo.primaryPhoneRaw}`}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-medium text-[#FAF7F2] hover:text-[#C89B6A] border border-[#FAF7F2]/20 hover:border-[#B47A46] rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-xs"
            >
              <Phone className="w-4 h-4 text-[#C89B6A]" />
              <span>{t.nav.call}</span>
            </a>
          </div>

          <div className="mt-8 text-xs text-[#B8ACA0] flex items-center justify-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#C89B6A]" />
            <span>Starting from {startingPriceInfo.displayInr}* / night · {hotelInfo.shortAddress}</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
