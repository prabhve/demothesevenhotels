import React, { useState } from 'react';
import { rooms, contactInfo, bookingSettings, Room } from '../data/hotelData';
import { X, Calendar, Users, BedDouble, MessageCircle, Phone, Mail, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoom,
}) => {
  if (!isOpen) return null;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [guests, setGuests] = useState('2 Adults');
  const [selectedRoomName, setSelectedRoomName] = useState(
    preselectedRoom || rooms[0].name
  );
  const [specialRequest, setSpecialRequest] = useState('');

  // Calculate estimated nights and price
  const calculateNights = () => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = d2.getTime() - d1.getTime();
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 1;
    } catch {
      return 1;
    }
  };

  const currentRoom = rooms.find((r) => r.name === selectedRoomName) || rooms[0];
  const nights = calculateNights();
  const estimatedTotal = currentRoom.basePrice * nights;

  const handleWhatsAppSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const message = bookingSettings.whatsappBookingMessage({
      guestName,
      checkIn,
      checkOut,
      guests,
      roomType: selectedRoomName,
      specialRequest,
    });
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Booking Enquiry - ${selectedRoomName} - The Seven's Hotel`);
    const body = encodeURIComponent(
      `Dear The Seven's Hotel Reservations,\n\nI would like to enquire about room availability.\n\nGuest Name: ${guestName || 'Not specified'}\nPhone: ${guestPhone || 'Not specified'}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nNights: ${nights}\nGuests: ${guests}\nRoom Type: ${selectedRoomName}\nSpecial Requests: ${specialRequest || 'None'}\n\nPlease confirm availability and tariff.\n\nThank you.`
    );
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] text-[#24201D] rounded-2xl max-w-xl w-full shadow-2xl border border-[#E8DFD5] overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#1C1816] text-[#FAF7F2] p-5 sm:p-6 flex items-center justify-between border-b border-[#B47A46]/30">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#C89B6A] font-semibold block">
              Reservation Desk
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal">
              Check Room Availability
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#D8CEBF] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Booking Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleWhatsAppSend} className="p-5 sm:p-7 space-y-4">
          {/* Guest Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55]">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55]">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="Phone / WhatsApp"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46]"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B47A46]" />
                Check-In Date
              </label>
              <input
                type="date"
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B47A46]" />
                Check-Out Date
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || formatDate(today)}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46]"
                required
              />
            </div>
          </div>

          {/* Guests & Room Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#B47A46]" />
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46]"
              >
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adults">2 Adults</option>
                <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                <option value="3 Adults">3 Adults</option>
                <option value="Family / Group">Family / Group</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-[#B47A46]" />
                Room Category
              </label>
              <select
                value={selectedRoomName}
                onChange={(e) => setSelectedRoomName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46]"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name} (from ₹{r.basePrice.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55]">
              Special Requests (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Ground floor / elevator proximity / late arrival"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46]"
            />
          </div>

          {/* Estimated Tariff Reference Box */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E3DDD4] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#6B6158]">
              <span>Reference Base Tariff ({nights} {nights === 1 ? 'night' : 'nights'}):</span>
              <span className="font-semibold text-[#1C1816] text-sm tabular-nums">
                ₹{estimatedTotal.toLocaleString()}*
              </span>
            </div>
            <p className="text-[11px] text-[#7A7168] italic font-serif leading-tight">
              *{bookingSettings.rateDisclaimer}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3 text-xs uppercase tracking-wider font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Enquiry via WhatsApp</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${contactInfo.primaryPhoneRaw}`}
                className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#181412] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#9E6738]" />
                <span>Call Hotel Desk</span>
              </a>

              <button
                type="button"
                onClick={handleEmailSend}
                className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#181412] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-1.5 text-center whitespace-nowrap cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#9E6738]" />
                <span>Email Enquiry</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
