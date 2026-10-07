import React from 'react';
import { ArrowRight, MapPin, Sparkles, MessageCircle, HeartHandshake, BedDouble } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';
import { useSEO } from '../seo/SeoContext';
import { ScrollReveal } from './ScrollReveal';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { hotelInfo } = useHotelData();
  const { t, generateWhatsAppUrl } = useSEO();

  const handleWhatsAppChat = () => {
    const url = generateWhatsAppUrl('general');
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
    <section className="relative min-h-[85vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#14100E] text-[#FAF7F2]">
      {/* High-Resolution Varanasi Assi Ghat & Ganges Riverfront Scenery - Fully Visible & Vibrant */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=2400&q=90"
          alt="Breathtaking Varanasi Ghats and Boats on Holy River Ganges at Golden Hour"
          className="w-full h-full object-cover object-center scale-100 brightness-[0.82] contrast-[1.08] saturate-110"
          referrerPolicy="no-referrer"
        />

        {/* Subtle, crystal-clear cinematic dark gradient scrim (Keeps Varanasi scenery fully visible) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100E] via-transparent to-transparent opacity-90 z-10 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-24 text-center flex flex-col items-center w-full min-w-0">
        <ScrollReveal direction="down" delay={100}>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 px-3.5 sm:px-4 py-1.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-md shadow-xl max-w-full">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5B887] shrink-0" />
            <span className="text-[9.5px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.22em] font-medium text-[#FAF7F2] truncate">
              {hotelInfo.name.toUpperCase()} · BHADAINI, VARANASI
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FFFFFF] font-normal tracking-tight leading-[1.12] mb-4 sm:mb-6 text-balance max-w-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {t.hero.title}
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-[#F5EFEB] max-w-2xl font-light leading-relaxed mb-6 sm:mb-8 text-balance mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-2">
            {t.hero.subheading}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
            <button
              onClick={handleScrollToBooking}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer hover:shadow-[#C89B6A]/30"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleWhatsAppChat}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#FAF7F2] bg-black/60 hover:bg-black/80 border border-[#25D366]/60 hover:border-[#25D366] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl backdrop-blur-md"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{t.hero.ctaSecondary}</span>
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={500}>
          {/* Subtle Trust Indicators Under CTA */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-[11px] sm:text-sm text-[#FAF7F2] font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5B887] shrink-0" />
              <span>{t.hero.trustPills.nearAssi}</span>
            </div>
            <div className="hidden sm:block text-white/40" aria-hidden="true">•</div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <BedDouble className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5B887] shrink-0" />
              <span>{t.hero.trustPills.comfortableRooms}</span>
            </div>
            <div className="hidden sm:block text-white/40" aria-hidden="true">•</div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5B887] shrink-0" />
              <span>{t.hero.trustPills.guestServices}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
