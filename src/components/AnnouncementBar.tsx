import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';

export const AnnouncementBar: React.FC = () => {
  const { hotelInfo, contactInfo } = useHotelData();

  return (
    <div className="bg-[#1C1816] text-[#E8DFD5] text-xs py-2 px-4 border-b border-[#B47A46]/20 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        {/* Left: Location & Timings */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[#C9BEB2]">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B47A46]" />
            <span>{hotelInfo.shortAddress}</span>
          </span>
          <span className="hidden md:inline-block text-[#B47A46]/40">·</span>
          <span className="hidden md:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#B47A46]" />
            <span>Check-in: {hotelInfo.checkInTime} / Check-out: {hotelInfo.checkOutTime}</span>
          </span>
        </div>

        {/* Right: Direct Phone & Email */}
        <div className="flex items-center gap-4 text-[#E6DACB]">
          <a
            href={`tel:${contactInfo.primaryPhoneRaw}`}
            className="flex items-center gap-1.5 hover:text-[#C89B6A] transition-colors whitespace-nowrap font-medium"
            title="Call hotel primary desk"
          >
            <Phone className="w-3.5 h-3.5 text-[#B47A46]" />
            <span>{contactInfo.primaryPhone}</span>
          </a>
          <span className="text-[#B47A46]/40">·</span>
          <a
            href={`mailto:${contactInfo.email}`}
            className="hidden lg:flex items-center gap-1.5 hover:text-[#C89B6A] transition-colors whitespace-nowrap"
            title="Email hotel desk"
          >
            <Mail className="w-3.5 h-3.5 text-[#B47A46]" />
            <span>{contactInfo.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
