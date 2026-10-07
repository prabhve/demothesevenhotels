import React from 'react';
import { Room } from '../data/hotelData';
import { useHotelData } from '../context/HotelDataContext';
import { HotelImage } from './HotelImage';
import {
  X,
  BedDouble,
  Users,
  Check,
  MessageCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface RoomDetailsModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking: (roomName: string) => void;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  room,
  isOpen,
  onClose,
  onSelectBooking,
}) => {
  const { contactInfo, bookingSettings } = useHotelData();

  // Lock body scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !room) return null;

  const handleWhatsAppEnquiry = () => {
    const message = `Hello The Seven's Hotel, I am interested in the ${room.name} (from ₹${room.basePrice.toLocaleString()}/night). Please share availability and booking details for my upcoming visit to Varanasi.`;
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-[#FFFFFF] text-[#24201D] rounded-t-3xl sm:rounded-2xl max-w-3xl w-full shadow-2xl border border-[#E8DFD5] overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="bg-[#1C1816] text-[#FAF7F2] p-4 sm:p-5 flex items-center justify-between border-b border-[#B47A46]/30 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-[#C89B6A] font-semibold">
              The Seven's Hotel Accommodations
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#D8CEBF] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Room Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          {/* Room Image Banner */}
          <div className="relative rounded-xl overflow-hidden border border-[#E8DFD5] bg-[#181412]">
            <HotelImage
              src={room.imageUrl}
              alt={`${room.name} at The Seven's Hotel Varanasi`}
              category="Rooms"
              title={room.name}
              aspectRatio="16:9"
            />
            {room.badge && (
              <div className="absolute top-3.5 right-3.5 bg-[#1C1816]/90 backdrop-blur-xs text-[#FAF7F2] text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded border border-[#B47A46]/30 shadow-md">
                {room.badge}
              </div>
            )}
          </div>

          {/* Room Overview & Pricing */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-5 border-b border-[#E8DFD5]">
            <div>
              <h3 id="room-modal-title" className="text-2xl sm:text-3xl font-serif text-[#1C1816] font-normal">
                {room.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#7A7168] mt-1.5 font-medium">
                <span className="flex items-center gap-1">
                  <BedDouble className="w-3.5 h-3.5 text-[#9E6738]" />
                  <span>{room.bedType}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#9E6738]" />
                  <span>{room.occupancy}</span>
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-[#7A7168]">Reference Base Tariff</div>
              <div className="text-2xl font-semibold text-[#1C1816] tabular-nums">
                {bookingSettings.currency}{room.basePrice.toLocaleString()}
                <span className="text-xs font-normal text-[#7A7168]"> / night*</span>
              </div>
              <div className="text-[11px] text-[#8F8375] italic font-serif">
                *{bookingSettings.rateDisclaimer}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#9E6738] font-semibold mb-2">
              Room Overview
            </h4>
            <p className="text-sm text-[#5C534B] leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Key Confirmed Features & Highlights */}
          {room.features && room.features.length > 0 && (
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8DFD5]">
              <h4 className="text-xs uppercase tracking-wider text-[#1C1816] font-semibold mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#9E6738]" />
                <span>Room Highlights</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C534B]">
                {room.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9E6738] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Confirmed Amenities Checklist */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#9E6738] font-semibold mb-3">
              Included In-Room Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {room.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8DFD5]/80 text-xs text-[#4A423B] flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5 text-[#9E6738] shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Stay Guarantee Note */}
          <div className="p-3.5 rounded-lg bg-[#F3EDE3] border border-[#E3DDD4] flex items-center gap-3 text-xs text-[#665D55]">
            <ShieldCheck className="w-4 h-4 text-[#9E6738] shrink-0" />
            <span>
              Direct reservation enquiry connects you straight to the on-site reception at Assi–Lanka Road.
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#E8DFD5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppEnquiry}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#E9E4DC] hover:bg-[#DDD5C9] rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Enquiry</span>
            </button>

            <a
              href={`tel:${contactInfo.primaryPhoneRaw}`}
              className="px-3.5 py-2.5 text-xs uppercase tracking-wider font-medium text-[#181412] bg-[#FFFFFF] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-[#9E6738]" />
              <span className="hidden sm:inline">Call Desk</span>
            </a>
          </div>

          <button
            onClick={() => {
              onClose();
              onSelectBooking(room.name);
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
