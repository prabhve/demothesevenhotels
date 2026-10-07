import React from 'react';
import { ArrowRight, MapPin, Sparkles, MessageCircle, ShieldCheck, HeartHandshake, BedDouble } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';
import { ScrollReveal } from './ScrollReveal';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { hotelInfo, contactInfo } = useHotelData();

  const handleWhatsAppChat = () => {
    const message = "Hello The Seven's Hotel, I would like to enquire about room availability for an upcoming visit to Varanasi.";
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToBooking = () => {
    const el = document.getElementById('quick-booking-card') || document.getElementById('rooms');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenBooking();
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#181412] text-[#FAF7F2]">
      {/* Background Canvas with subtle Varanasi architectural ambiance */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#181412]/90 via-[#1E1916]/80 to-[#181412] z-10" />
        
        {/* Fine geometric patterned backdrop */}
        <div className="w-full h-full bg-[#201A17] flex items-center justify-center overflow-hidden">
          <svg
            className="w-full h-full opacity-15 stroke-[#C89B6A] animate-pulse duration-1000"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <defs>
              <pattern id="hero-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 30 L30 60 L0 30 Z" strokeWidth="0.75" />
                <circle cx="30" cy="30" r="12" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>

        {/* Ambient atmospheric warm sandstone glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#B47A46]/20 blur-[130px] rounded-full pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center">
        <ScrollReveal direction="down" delay={100}>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[#B47A46]/35 bg-[#2A231F]/60 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B6A]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium text-[#D8CEBF]">
              {hotelInfo.name.toUpperCase()} · BHADAINI, VARANASI
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FAF7F2] font-normal tracking-tight leading-[1.12] mb-6 text-balance max-w-4xl">
            Comfortable Stay Near Assi Ghat, Varanasi
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-[#D8CEBF]/90 max-w-2xl font-light leading-relaxed mb-8 text-balance mx-auto">
            A convenient stay in Varanasi, close to Assi Ghat and some of the city's most loved cultural and spiritual experiences.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={handleScrollToBooking}
              className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Check Availability</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleWhatsAppChat}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#FAF7F2] bg-[#251F1C] hover:bg-[#302723] border border-[#25D366]/40 hover:border-[#25D366] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={500}>
          {/* Subtle Trust Indicators Under CTA */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-[#B47A46]/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#D8CEBF]/80 font-normal">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C89B6A]" />
              <span>Near Assi Ghat</span>
            </div>
            <div className="hidden sm:block text-[#B47A46]/40" aria-hidden="true">•</div>
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-[#C89B6A]" />
              <span>Comfortable Rooms</span>
            </div>
            <div className="hidden sm:block text-[#B47A46]/40" aria-hidden="true">•</div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#C89B6A]" />
              <span>Guest Services</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
