import React, { useState } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { Phone, Mail, MapPin, Navigation, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const { hotelInfo, contactInfo } = useHotelData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const enquiry = `Hello The Seven's Hotel,\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message || 'Inquiry regarding hotel stay and room availability.'}\n\nThank you.`;
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(enquiry)}`;
    
    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    const defaultMsg = `Hello The Seven's Hotel, I would like to get in touch regarding a stay.`;
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#FDFCF9] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
              <span>Direct Communication</span>
              <span aria-hidden="true">·</span>
              <span>Always Available</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
              Contact & Location
            </h2>
            <p className="text-sm text-[#665D55] mt-2">
              Reach our reception desk directly for room queries, travel guidance or immediate bookings.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Official Contact Card */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-8 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-6">
            <ScrollReveal direction="right" delay={150}>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#9E6738] font-semibold block mb-1">
                  Property Address
                </span>
                <h3 className="font-serif text-2xl text-[#1C1816] font-normal mb-2">
                  {hotelInfo.name}
                </h3>
                <p className="text-sm text-[#5C534B] leading-relaxed">
                  {hotelInfo.address}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E8DFD5]">
                {/* Primary Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EFE9DF] flex items-center justify-center text-[#9E6738] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7A7168] block">
                      Primary Phone (Google Listed)
                    </span>
                    <a
                      href={`tel:${contactInfo.primaryPhoneRaw}`}
                      className="text-base font-semibold text-[#1C1816] hover:text-[#9E6738] transition-colors"
                    >
                      {contactInfo.primaryPhone}
                    </a>
                  </div>
                </div>

                {/* Alternate Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EFE9DF] flex items-center justify-center text-[#9E6738] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7A7168] block">
                      Alternate / Officially Published
                    </span>
                    <a
                      href={`tel:${contactInfo.alternatePhoneRaw}`}
                      className="text-base font-semibold text-[#1C1816] hover:text-[#9E6738] transition-colors"
                    >
                      {contactInfo.alternatePhone}
                    </a>
                  </div>
                </div>

                {/* Official Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EFE9DF] flex items-center justify-center text-[#9E6738] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7A7168] block">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm font-medium text-[#1C1816] hover:text-[#9E6738] transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons Grid */}
              <div className="pt-6 border-t border-[#E8DFD5] grid grid-cols-2 gap-3">
                <a
                  href={`tel:${contactInfo.primaryPhoneRaw}`}
                  className="py-2.5 px-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <button
                  onClick={handleWhatsApp}
                  className="py-2.5 px-3 text-xs uppercase tracking-wider font-semibold text-[#FAF7F2] bg-[#25D366] hover:bg-[#20BA5A] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#1C1816] bg-[#FFFFFF] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5 text-[#9E6738]" />
                  <span>Email</span>
                </a>

                <a
                  href={hotelInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#1C1816] bg-[#FFFFFF] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#9E6738]" />
                  <span>Directions</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Direct Enquiry Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-8 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <ScrollReveal direction="left" delay={200}>
              <h3 className="font-serif text-2xl text-[#1C1816] font-normal mb-2">
                Send an Instant Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#665D55] mb-6">
                Fill in your details below to directly message the reservation desk via WhatsApp or receive a prompt callback.
              </p>

              {submitted ? (
                <div className="p-6 bg-[#FAF8F5] border border-[#B47A46]/30 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" />
                  <h4 className="font-serif text-xl text-[#1C1816]">Enquiry Prepared!</h4>
                  <p className="text-xs text-[#5C534B] max-w-md mx-auto">
                    Your enquiry has been routed directly to The Seven's Hotel reservation desk. If your WhatsApp did not automatically open, click below.
                  </p>
                  <button
                    onClick={handleWhatsApp}
                    className="mt-3 px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-lg inline-flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider font-medium text-[#5C534B]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider font-medium text-[#5C534B]">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-medium text-[#5C534B]">
                      Enquiry Details or Dates
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us your travel dates, room type preference, or any special requests..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E3DDD4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B47A46] text-[#24201D]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-[#7A7168] italic font-serif">
                      *Response typically within minutes during desk hours.
                    </span>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send Message to Hotel</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
