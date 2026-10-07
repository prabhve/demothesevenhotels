import React from 'react';
import { Room } from '../data/hotelData';
import { useHotelData } from '../context/HotelDataContext';
import { HotelImage } from './HotelImage';
import { MessageCircle, Phone, Check, ArrowRight, Eye, Users, BedDouble } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onSelectRoom: (roomName: string) => void;
  onViewDetails: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onSelectRoom,
  onViewDetails,
}) => {
  const { contactInfo, bookingSettings } = useHotelData();

  const handleWhatsApp = () => {
    const message = `Hello The Seven's Hotel, I am interested in booking the ${room.name} (from ₹${room.basePrice.toLocaleString()}/night). Please share availability and booking details.`;
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E8DFD5] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      {/* Room Image Container */}
      <div className="relative overflow-hidden">
        <HotelImage
          src={room.imageUrl}
          alt={`${room.name} at The Seven's Hotel Varanasi`}
          category="Rooms"
          title={room.name}
          aspectRatio="4:3"
          className="transition-transform duration-500 group-hover:scale-105"
        />

        {/* Room Badge */}
        {room.badge && (
          <div className="absolute top-3.5 right-3.5 bg-[#1C1816]/90 backdrop-blur-xs text-[#FAF7F2] text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded border border-[#B47A46]/30 shadow-sm">
            {room.badge}
          </div>
        )}
      </div>

      {/* Room Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata: Bedding & Occupancy */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#7A7168] mb-2 font-medium">
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-[#9E6738]" />
              <span>{room.bedType}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#9E6738]" />
              <span>{room.occupancy}</span>
            </span>
          </div>

          {/* Room Name */}
          <h3 className="text-xl sm:text-2xl font-serif text-[#1C1816] font-normal mb-2 group-hover:text-[#9E6738] transition-colors">
            {room.name}
          </h3>

          {/* Pricing indicator */}
          <div className="mb-4 flex items-baseline gap-1.5">
            <span className="text-xs text-[#7A7168]">From</span>
            <span className="text-2xl font-semibold text-[#1C1816] tabular-nums">
              {bookingSettings.currency}{room.basePrice.toLocaleString()}
            </span>
            <span className="text-xs text-[#7A7168]">/ night*</span>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#5C534B] leading-relaxed mb-5">
            {room.description}
          </p>

          {/* Confirmed Amenities Highlights */}
          <div className="space-y-2 mb-6 pt-4 border-t border-[#F2ECE4]">
            <span className="text-[11px] uppercase tracking-wider text-[#9E6738] font-semibold block mb-2">
              Key Confirmed Amenities
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#4A423B]">
              {room.amenities.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#9E6738] shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#F2ECE4] space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetails(room)}
              className="py-2.5 px-3 text-xs uppercase tracking-wider font-semibold text-[#1C1816] bg-[#FAF8F5] hover:bg-[#F0EAE1] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5 text-[#9E6738]" />
              <span>View Details</span>
            </button>

            <button
              onClick={() => onSelectRoom(room.name)}
              className="py-2.5 px-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>Check Rates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleWhatsApp}
              className="py-2 px-3 text-[11px] uppercase tracking-wider font-medium text-[#181412] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>

            <a
              href={`tel:${contactInfo.primaryPhoneRaw}`}
              className="py-2 px-3 text-[11px] uppercase tracking-wider font-medium text-[#181412] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
              title="Call hotel desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#9E6738]" />
              <span>Call Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
