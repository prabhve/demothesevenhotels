import React, { useState } from 'react';
import { Calendar, Users, BedDouble, MessageCircle, Search } from 'lucide-react';
import { contactInfo, rooms, bookingSettings } from '../data/hotelData';

interface QuickBookingCardProps {
  onCheckAvailability: (details: {
    checkIn: string;
    checkOut: string;
    guests: string;
    roomType: string;
  }) => void;
}

export const QuickBookingCard: React.FC<QuickBookingCardProps> = ({ onCheckAvailability }) => {
  // Today and Tomorrow formatted default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [guests, setGuests] = useState('2 Adults');
  const [roomType, setRoomType] = useState(rooms[0].name);

  const handleWhatsAppBooking = () => {
    const message = bookingSettings.whatsappBookingMessage({
      checkIn,
      checkOut,
      guests,
      roomType,
    });
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      guests,
      roomType,
    });
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12">
      <div className="bg-[#FFFFFF] text-[#24201D] rounded-xl shadow-xl border border-[#E8DFD5] p-5 sm:p-7 transition-all">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Check-In */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B47A46]" />
              Check-In Date
            </label>
            <input
              type="date"
              value={checkIn}
              min={formatDate(today)}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] focus:border-[#B47A46] text-[#24201D]"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B47A46]" />
              Check-Out Date
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || formatDate(today)}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] focus:border-[#B47A46] text-[#24201D]"
              required
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#B47A46]" />
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] focus:border-[#B47A46] text-[#24201D]"
            >
              <option value="1 Adult">1 Adult</option>
              <option value="2 Adults">2 Adults</option>
              <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
              <option value="3 Adults">3 Adults</option>
              <option value="Family / Group">Family / Group</option>
            </select>
          </div>

          {/* Room Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-[#B47A46]" />
              Room Preference
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] focus:border-[#B47A46] text-[#24201D]"
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name} (from {bookingSettings.currency}{room.basePrice.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* CTAs Row */}
          <div className="sm:col-span-2 lg:col-span-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F0EBE3]">
            <p className="text-xs text-[#7A7168] italic font-serif">
              *{bookingSettings.rateDisclaimer}
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full sm:w-auto px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#E9E4DC] hover:bg-[#DDD5C9] active:bg-[#D0C6B8] rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                title="Send booking enquiry directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Book via WhatsApp</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Check Availability</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
