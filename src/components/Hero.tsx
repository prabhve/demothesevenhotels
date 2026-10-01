import React from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { hotelInfo } from '../data/hotelData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[82vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#181412]">
      {/* Background Architectural Canvas with subtle Varanasi warm sandstone mood */}
      <div className="absolute inset-0 z-0">
        {/* Subtle geometric architectural texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#181412]/85 via-[#1E1916]/75 to-[#181412] z-10" />
        
        {/* Architectural abstract backdrop with warm lighting */}
        <div className="w-full h-full bg-[#201A17] flex items-center justify-center overflow-hidden">
          <svg
            className="w-full h-full opacity-15 stroke-[#C89B6A]"
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

        {/* Ambient atmospheric warm glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#B47A46]/15 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full border border-[#B47A46]/30 bg-[#2A231F]/50 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C89B6A]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium text-[#D8CEBF]">
            {hotelInfo.name.toUpperCase()} · VARANASI
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FAF7F2] font-normal tracking-tight leading-[1.1] mb-6 text-balance">
          Stay Close to the Soul of Varanasi
        </h1>

        {/* Supporting Line */}
        <p className="text-base sm:text-lg md:text-xl text-[#D8CEBF]/90 max-w-2xl font-light leading-relaxed mb-8 text-balance">
          Comfortable rooms, thoughtful hospitality and a convenient location near Assi Ghat.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Book Your Stay</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#rooms"
            className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm uppercase tracking-widest font-medium text-[#FAF7F2] hover:text-[#C89B6A] border border-[#B47A46]/40 hover:border-[#B47A46] rounded transition-all text-center"
          >
            Explore Rooms
          </a>
        </div>

        {/* Trust / Location line */}
        <div className="mt-10 sm:mt-12 flex items-center gap-2 text-xs sm:text-sm text-[#BDB09E] font-normal tracking-wide">
          <MapPin className="w-4 h-4 text-[#B47A46]" />
          <span>Assi–Lanka Road · Bhadaini · Varanasi</span>
        </div>
      </div>
    </section>
  );
};
