import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';

export const AnnouncementBar: React.FC = () => {
  const { hotelInfo, contactInfo } = useHotelData();

  return (
    <div className="w-full bg-[#120F0D] text-[#D8CEBF] text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 border-b border-[#B47A46]/20 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Location & Check-In */}
        <div className="flex items-center gap-2 sm:gap-4 text-[#B8ACA0] min-w-0 flex-1 truncate">
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 truncate">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C89B6A] shrink-0" />
            <span className="truncate">{hotelInfo.shortAddress}</span>
          </div>
          <span className="hidden md:inline-block text-[#B47A46]/30" aria-hidden="true">·</span>
          <div className="hidden md:flex items-center gap-1.5 text-[#9E9285]">
            <Clock className="w-3.5 h-3.5 text-[#C89B6A] shrink-0" />
            <span>Check-in: {hotelInfo.checkInTime} / Check-out: {hotelInfo.checkOutTime}</span>
          </div>
        </div>

        {/* Right: Direct Desk Phone & Official Email */}
        <div className="flex items-center gap-2 sm:gap-5 shrink-0 text-[#D8CEBF]">
          <a
            href={`tel:${contactInfo.primaryPhoneRaw}`}
            className="flex items-center gap-1 sm:gap-1.5 hover:text-[#FAF7F2] transition-colors whitespace-nowrap font-medium"
            title="Call Hotel Front Desk"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C89B6A]" />
            <span className="text-[10px] sm:text-xs">{contactInfo.primaryPhone}</span>
          </a>

          <span className="hidden sm:inline-block text-[#B47A46]/30" aria-hidden="true">·</span>

          <a
            href={`mailto:${contactInfo.email}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-[#FAF7F2] transition-colors whitespace-nowrap text-[#B8ACA0]"
            title="Official Hotel Email"
          >
            <Mail className="w-3.5 h-3.5 text-[#C89B6A]" />
            <span>{contactInfo.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
