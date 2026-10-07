import React, { useState, useEffect } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { useSEO } from '../seo/SeoContext';
import { X, Calendar, Users, BedDouble, MessageCircle, Phone, Mail, User, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

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
  const { rooms, contactInfo, bookingSettings } = useHotelData();
  const { formatPrice, generateWhatsAppUrl } = useSEO();

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
    preselectedRoom || rooms[0]?.name || 'Classic Room'
  );
  const [specialRequest, setSpecialRequest] = useState('');

  // Update selected room when preselectedRoom prop changes
  useEffect(() => {
    if (preselectedRoom) {
      setSelectedRoomName(preselectedRoom);
    }
  }, [preselectedRoom]);

  // Prevent background body scrolling when modal is open & handle Esc key
  useEffect(() => {
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

  if (!isOpen) return null;

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

  const currentRoom = rooms.find((r) => r.name === selectedRoomName) || rooms[0] || { basePrice: 3500 };
  const nights = calculateNights();
  const estimatedTotal = currentRoom.basePrice * nights;
  const priceInfo = formatPrice(estimatedTotal);

  const handleWhatsAppSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!guestName.trim()) {
      alert('Please enter your name.');
      return;
    }
    const url = generateWhatsAppUrl('booking', {
      guestName: guestName.trim() || undefined,
      phone: guestPhone.trim() || undefined,
      checkIn,
      checkOut,
      guests,
      roomsCount: '1',
      roomType: selectedRoomName,
      specialRequest: specialRequest.trim() || undefined,
    });
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
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-[#FFFFFF] text-[#24201D] w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl border border-[#E8DFD5] flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header Bar */}
        <div className="bg-[#1C1816] text-[#FAF7F2] px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between border-b border-[#B47A46]/30 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C89B6A] font-semibold block">
                The Seven's Hotel Desk
              </span>
            </div>
            <h3 id="booking-modal-title" className="font-serif text-lg sm:text-2xl font-normal text-white leading-tight mt-0.5">
              Check Room Availability
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#D8CEBF] hover:text-white transition-colors flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Close Booking Form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body with zero horizontal scroll */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-3.5 scrollbar-thin">
          <form id="booking-modal-form" onSubmit={handleWhatsAppSend} className="space-y-3.5">
            {/* Guest Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#B47A46]" />
                  <span>Your Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#1C1816]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B47A46]" />
                  <span>Contact Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 / +1 Contact Number"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#1C1816]"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#B47A46]" />
                  <span>Check-In Date *</span>
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={formatDate(today)}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#1C1816]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#B47A46]" />
                  <span>Check-Out Date *</span>
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || formatDate(today)}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#1C1816]"
                  required
                />
              </div>
            </div>

            {/* Guests & Room Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#B47A46]" />
                  <span>Guests</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#1C1816]"
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
                  <span>Room Category</span>
                </label>
                <select
                  value={selectedRoomName}
                  onChange={(e) => setSelectedRoomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#1C1816]"
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
                placeholder="e.g. Ground floor / elder assistance / arrival time"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#E3DDD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#1C1816]"
              />
            </div>

            {/* Estimated Tariff Reference Box */}
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DDD4] space-y-1">
              <div className="flex items-center justify-between text-xs text-[#6B6158]">
                <span>Reference Base Tariff ({nights} {nights === 1 ? 'night' : 'nights'}):</span>
                <span className="font-semibold text-[#1C1816] text-sm tabular-nums">
                  {priceInfo.displayInr}*
                </span>
              </div>
              {priceInfo.foreignEstimate && (
                <div className="text-[11px] text-[#9E6738] font-medium">
                  Approx. {priceInfo.foreignEstimate}
                </div>
              )}
              <p className="text-[10px] text-[#7A7168] italic font-serif leading-tight pt-0.5">
                *{bookingSettings.rateDisclaimer} Direct room enquiry connects to reception.
              </p>
            </div>
          </form>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#E8DFD5] space-y-2.5 shrink-0">
          <button
            type="submit"
            form="booking-modal-form"
            className="w-full py-3.5 px-4 text-xs uppercase tracking-widest font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#1DA851] rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Enquiry on WhatsApp</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${contactInfo.primaryPhoneRaw}`}
              className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#181412] bg-[#FFFFFF] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center whitespace-nowrap shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#9E6738]" />
              <span>Call Front Desk</span>
            </a>

            <button
              type="button"
              onClick={handleEmailSend}
              className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#181412] bg-[#FFFFFF] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center whitespace-nowrap cursor-pointer shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#9E6738]" />
              <span>Email Enquiry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
