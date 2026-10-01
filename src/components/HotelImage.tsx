import React, { useState } from 'react';
import { Building2, BedDouble, UtensilsCrossed, Sparkles, MapPin, Compass } from 'lucide-react';

interface HotelImageProps {
  src?: string;
  alt: string;
  category?: 'Exterior' | 'Rooms' | 'Reception' | 'Interiors' | 'Dining' | 'Surroundings';
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2' | '21:9';
  className?: string;
  showAdminBadge?: boolean;
}

export const HotelImage: React.FC<HotelImageProps> = ({
  src,
  alt,
  category = 'Rooms',
  title,
  aspectRatio = '4:3',
  className = '',
  showAdminBadge = false,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const aspectClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '3:2': 'aspect-[3/2]',
    '21:9': 'aspect-[21/9]',
  }[aspectRatio];

  const getCategoryIcon = () => {
    switch (category) {
      case 'Exterior':
        return <Building2 className="w-8 h-8 text-[#B47A46]/70 stroke-[1.25]" />;
      case 'Rooms':
        return <BedDouble className="w-8 h-8 text-[#B47A46]/70 stroke-[1.25]" />;
      case 'Dining':
        return <UtensilsCrossed className="w-8 h-8 text-[#B47A46]/70 stroke-[1.25]" />;
      case 'Reception':
        return <Sparkles className="w-8 h-8 text-[#B47A46]/70 stroke-[1.25]" />;
      case 'Surroundings':
        return <Compass className="w-8 h-8 text-[#B47A46]/70 stroke-[1.25]" />;
      default:
        return <MapPin className="w-8 h-8 text-[#B47A46]/70 stroke-[1.25]" />;
    }
  };

  // If a valid src is provided and hasn't errored
  if (src && !error) {
    return (
      <div className={`relative overflow-hidden bg-[#241F1C] ${aspectClasses} ${className}`}>
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!loaded && (
          <div className="absolute inset-0 bg-[#2A2420] animate-pulse flex items-center justify-center">
            <span className="text-xs uppercase tracking-widest text-[#E6DACB]/50 font-medium">
              Loading...
            </span>
          </div>
        )}
      </div>
    );
  }

  // Tasteful Architectural Illustration & Neutral Hospitality Container
  return (
    <div
      className={`relative overflow-hidden group select-none ${aspectClasses} ${className} bg-gradient-to-br from-[#27211D] via-[#211B17] to-[#181412] text-[#F5F2EB] flex flex-col justify-between p-6 border border-[#B47A46]/15`}
    >
      {/* Subtle fine geometric Indian-inspired backdrop line art */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-[#C89B6A]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <pattern id="arch-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="18" cy="18" r="17" strokeWidth="0.5" />
          <path d="M18 0v36M0 18h36" strokeWidth="0.3" strokeDasharray="1 3" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#arch-grid)" />
      </svg>

      {/* Ambient warm light accent */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#B47A46]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#C89B6A]/10 blur-3xl pointer-events-none" />

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89B6A] font-medium">
          The Seven's Hotel · {category}
        </span>
        {showAdminBadge && (
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#B47A46]/30 text-[#D8C7B4]/80 rounded">
            Official Photo Slot
          </span>
        )}
      </div>

      {/* Center Icon & Decorative Arch Motif */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-4">
        <div className="w-14 h-14 rounded-full border border-[#B47A46]/30 bg-[#2F2722]/60 flex items-center justify-center mb-3.5 backdrop-blur-sm group-hover:border-[#B47A46]/60 transition-colors duration-300">
          {getCategoryIcon()}
        </div>
        <h4 className="text-lg md:text-xl font-serif text-[#F8F6F0] tracking-wide max-w-[280px] leading-snug">
          {title || alt}
        </h4>
        <p className="text-xs text-[#D8C7B4]/70 mt-1 max-w-[260px] line-clamp-2">
          Comfortable contemporary hospitality in Varanasi
        </p>
      </div>

      {/* Bottom subtle detail */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#A69888] border-t border-[#B47A46]/15 pt-3">
        <span>Assi - Lanka Rd · Bhadaini</span>
        <span className="italic font-serif text-[#C89B6A]">3-Star Comfort</span>
      </div>
    </div>
  );
};
