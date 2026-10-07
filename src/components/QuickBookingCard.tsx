import React, { useState } from 'react';
import { Calendar, Users, BedDouble, MessageCircle, Send, CheckCircle2, Loader2, Phone, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';
import { useSEO } from '../seo/SeoContext';
import { ScrollReveal } from './ScrollReveal';

export const QuickBookingCard: React.FC = () => {
  const { rooms, contactInfo, bookingSettings } = useHotelData();
  const { t, generateWhatsAppUrl } = useSEO();

  // Today and Tomorrow default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  // Form states
  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [roomsCount, setRoomsCount] = useState('1');
  const [roomType, setRoomType] = useState(rooms[0]?.name || 'Classic Room');
  const [guestName, setGuestName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsAppEnquiry = () => {
    const url = generateWhatsAppUrl('booking', {
      guestName: guestName || undefined,
      phone: mobileNumber || undefined,
      email: email || undefined,
      checkIn,
      checkOut,
      adults,
      children: children !== '0' ? children : undefined,
      roomsCount,
      roomType,
      specialRequest: specialRequest || undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert('Please enter your full name.');
      return;
    }
    // Accept international phone formats e.g. +91, +1, +44, +971 or standard numbers
    const cleanedPhone = mobileNumber.trim();
    if (!cleanedPhone || cleanedPhone.length < 7) {
      alert('Please enter a valid contact number (with country code e.g. +91, +1, +44).');
      return;
    }

    setIsLoading(true);
    // Simulate swift dispatch
    await new Promise((resolve) => setTimeout(resolve, 350));
    setIsLoading(false);
    setIsSubmitted(true);

    // Open WhatsApp with pre-filled enquiry automatically
    handleWhatsAppEnquiry();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setGuestName('');
    setMobileNumber('');
    setEmail('');
    setSpecialRequest('');
  };

  return (
    <div id="quick-booking-card" className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14">
      <ScrollReveal direction="up" delay={200}>
        <div className="bg-[#FFFFFF] text-[#24201D] rounded-2xl shadow-2xl border border-[#E8DFD5] p-5 sm:p-8 transition-all">
          {isSubmitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1816] font-normal">
                Enquiry Ready & Sent!
              </h3>
              <p className="text-sm text-[#5C534B] max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{guestName}</strong>. Your enquiry for <strong>{roomType}</strong> ({checkIn} to {checkOut}, {adults} Adults) has been compiled. You can connect directly on WhatsApp or call our 24/7 reception desk for instant confirmation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </button>

                <a
                  href={`tel:${contactInfo.primaryPhoneRaw}`}
                  className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-4 h-4 text-[#9E6738]" />
                  <span>Call Desk: {contactInfo.primaryPhone}</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-3 text-xs text-[#7A7168] hover:text-[#1C1816] transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE3]">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#9E6738] font-semibold block">
                    Direct Reservation Desk
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1C1816] font-normal">
                    {t.quickBooking.title}
                  </h3>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs text-[#7A7168]">
                  <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                  <span>Direct Property Rate Guarantee</span>
                </div>
              </div>

              {/* Grid Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Check-In */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B47A46]" />
                    <span>{t.quickBooking.checkIn} *</span>
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={formatDate(today)}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                    required
                  />
                </div>

                {/* Check-Out */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B47A46]" />
                    <span>{t.quickBooking.checkOut} *</span>
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || formatDate(today)}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                    required
                  />
                </div>

                {/* Adults & Children */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55]">
                      {t.quickBooking.adults} *
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4+">4+ Adults</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55]">
                      {t.quickBooking.children}
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                    >
                      <option value="0">0</option>
                      <option value="1">1 Child</option>
                      <option value="2">2 Children</option>
                      <option value="3+">3+</option>
                    </select>
                  </div>
                </div>

                {/* Rooms Count & Preferred Room */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55] flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-[#B47A46]" />
                    <span>{t.quickBooking.preferredRoom} *</span>
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                  >
                    {rooms.map((room) => (
                      <option key={room.id} value={room.name}>
                        {room.name} (from {bookingSettings.currency}{room.basePrice.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55]">
                    {t.quickBooking.guestName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55]">
                    {t.quickBooking.mobile} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210 / +1..."
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55]">
                    {t.quickBooking.email}
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D55]">
                  {t.quickBooking.specialRequest}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Early check-in request / temple visit vehicle assistance"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                />
              </div>

              {/* Action Buttons & Rate Disclaimer */}
              <div className="pt-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-t border-[#F0EBE3]">
                <p className="text-xs text-[#7A7168] italic font-serif">
                  *{bookingSettings.rateDisclaimer} {t.quickBooking.disclaimer}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={handleWhatsAppEnquiry}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#E9E4DC] hover:bg-[#DDD5C9] active:bg-[#D0C6B8] rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
                    title="Enquire directly on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span>{t.quickBooking.enquireWhatsApp}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 shrink-0" />
                        <span>{t.quickBooking.sendEnquiry}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
};
