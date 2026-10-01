import React from 'react';
import { Phone, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';
import { ScrollReveal } from './ScrollReveal';

interface BookingCTASectionProps {
  onOpenBooking: () => void;
}

export const BookingCTASection: React.FC<BookingCTASectionProps> = ({ onOpenBooking }) => {
  const { contactInfo, hotelInfo, bookingSettings } = useHotelData();

  const handleWhatsApp = () => {
    const message = bookingSettings.whatsappBookingMessage({});
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#1C1816] text-[#FAF7F2] relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B47A46]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C89B6A]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal direction="up" delay={100}>
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-[#B47A46]/30 bg-[#28211C]/60 text-xs uppercase tracking-widest text-[#C89B6A]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Direct Hotel Enquiry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#FAF7F2] mb-4 text-balance">
            Plan Your Stay at The Seven's Hotel
          </h2>

          <p className="text-sm sm:text-base text-[#D8CEBF]/90 max-w-2xl mx-auto leading-relaxed mb-8 text-balance">
            Experience comfortable contemporary accommodations situated in the Assi–Lanka corridor of Varanasi. Connect directly with our front desk team for room availability and tailored assistance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Check Availability</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#FAF7F2] bg-[#2A231F] hover:bg-[#352D28] border border-[#B47A46]/40 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Enquire on WhatsApp</span>
            </button>

            <a
              href={`tel:${contactInfo.primaryPhoneRaw}`}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-medium text-[#FAF7F2] hover:text-[#C89B6A] border border-[#FAF7F2]/20 hover:border-[#FAF7F2]/40 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C89B6A]" />
              <span>Call Front Desk</span>
            </a>
          </div>

          <div className="mt-8 text-xs text-[#A89C8F]">
            Starting from ₹{bookingSettings.startingPrice.toLocaleString()}* / night · {hotelInfo.shortAddress}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
