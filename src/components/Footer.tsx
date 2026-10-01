import React from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { Phone, Mail, MapPin, ExternalLink, ArrowUp, Settings, Lock } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const { hotelInfo, contactInfo, bookingSettings } = useHotelData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const message = bookingSettings.whatsappBookingMessage({});
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#181412] text-[#FAF7F2] border-t border-[#B47A46]/20 pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#FAF7F2]/10">
          {/* Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="font-serif text-2xl tracking-wider uppercase text-[#FAF7F2] block font-semibold">
              {hotelInfo.name}
            </a>
            <p className="text-xs uppercase tracking-widest text-[#C89B6A]">
              {hotelInfo.category} · Varanasi
            </p>
            <p className="text-sm text-[#D8CEBF]/80 leading-relaxed max-w-sm">
              Comfortable stays in the heart of Varanasi. Situated on Assi–Lanka Road in Bhadaini, offering contemporary rooms and warm city hospitality.
            </p>
            <div className="pt-2">
              <span className="text-xs text-[#8F8375] italic font-serif">
                Check-in: {hotelInfo.checkInTime} / Check-out: {hotelInfo.checkOutTime}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C89B6A] font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#D8CEBF]">
              <li>
                <a href="#" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">Rooms</a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">Facilities</a>
              </li>
              <li>
                <a href="#dining" className="hover:text-white transition-colors">Dining</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Location</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Booking & Reservations */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C89B6A] font-semibold">
              Reservations
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D8CEBF]">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#C89B6A] transition-colors text-left cursor-pointer"
                >
                  Book Your Stay
                </button>
              </li>
              <li>
                <button
                  onClick={handleWhatsApp}
                  className="hover:text-[#25D366] transition-colors text-left cursor-pointer"
                >
                  WhatsApp Booking Desk
                </button>
              </li>
              <li>
                <a href={`tel:${contactInfo.primaryPhoneRaw}`} className="hover:text-white transition-colors">
                  Call Front Desk ({contactInfo.primaryPhone})
                </a>
              </li>
              <li>
                <a
                  href={hotelInfo.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-xs text-[#C89B6A]"
                >
                  <span>Google Business Profile & Reviews</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Admin CMS Link */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C89B6A] font-semibold">
              Location & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#D8CEBF]/90">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C89B6A] shrink-0 mt-0.5" />
                <span>{hotelInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C89B6A] shrink-0" />
                <a href={`tel:${contactInfo.primaryPhoneRaw}`} className="hover:text-white">
                  {contactInfo.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C89B6A] shrink-0" />
                <a href={`tel:${contactInfo.alternatePhoneRaw}`} className="hover:text-white">
                  {contactInfo.alternatePhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C89B6A] shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white truncate">
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Prominent Admin Access Button */}
            <div className="pt-3">
              <button
                onClick={onOpenAdmin}
                className="w-full py-2.5 px-3 bg-[#241F1C] hover:bg-[#302723] text-[#C89B6A] hover:text-[#FAF7F2] border border-[#B47A46]/30 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Management CMS Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, CMS & Top scroll */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F8375]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} {hotelInfo.name}. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-[#A89C8F] hover:text-[#C89B6A] inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Login & Editor</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#FAF7F2] transition-colors cursor-pointer text-xs uppercase tracking-wider"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
