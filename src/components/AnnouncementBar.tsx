import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';

export const AnnouncementBar: React.FC = () => {
  const { hotelInfo, contactInfo } = useHotelData();

  return (
    <div className="bg-[#120F0D] text-[#D8CEBF] text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#B47A46]/20 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Location & Check-In */}
        <div className="flex items-center gap-3 sm:gap-4 text-[#B8ACA0] truncate">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#C89B6A] shrink-0" />
            <span className="truncate">{hotelInfo.shortAddress}</span>
          </div>
          <span className="hidden md:inline-block text-[#B47A46]/30" aria-hidden="true">·</span>
          <div className="hidden md:flex items-center gap-1.5 text-[#9E9285]">
            <Clock className="w-3.5 h-3.5 text-[#C89B6A] shrink-0" />
            <span>Check-in: {hotelInfo.checkInTime} / Check-out: {hotelInfo.checkOutTime}</span>
          </div>
        </div>

        {/* Right: Direct Desk Phone & Official Email */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-[#D8CEBF]">
          <a
            href={`tel:${contactInfo.primaryPhoneRaw}`}
            className="flex items-center gap-1.5 hover:text-[#FAF7F2] transition-colors whitespace-nowrap font-medium"
            title="Call Hotel Front Desk"
          >
            <Phone className="w-3.5 h-3.5 text-[#C89B6A]" />
            <span>{contactInfo.primaryPhone}</span>
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
