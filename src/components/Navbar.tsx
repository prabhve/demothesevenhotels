import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, ChevronDown, BedDouble, Utensils, Sparkles, MapPin, HelpCircle, Image as ImageIcon, MessageSquare, Compass, ArrowRight } from 'lucide-react';
import { useHotelData } from '../context/HotelDataContext';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { hotelInfo, contactInfo } = useHotelData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavLinks = [
    { label: 'Rooms', href: '#rooms' },
    { label: 'Dining', href: '#dining' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Experience', href: '#experience-varanasi' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ];

  const secondaryNavLinks = [
    { label: 'Guest Reviews', href: '#reviews' },
    { label: 'Stay FAQ', href: '#faq' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Hotel Policies', href: '#policies' },
  ];

  const allNavLinks = [
    { label: 'Rooms & Tariffs', href: '#rooms', icon: BedDouble },
    { label: 'Flavours Dining', href: '#dining', icon: Utensils },
    { label: 'Facilities', href: '#facilities', icon: Sparkles },
    { label: 'Experience Varanasi', href: '#experience-varanasi', icon: Compass },
    { label: 'Photo Gallery', href: '#gallery', icon: ImageIcon },
    { label: 'Location & Map', href: '#location', icon: MapPin },
    { label: 'Guest Reviews', href: '#reviews', icon: MessageSquare },
    { label: 'Stay FAQ', href: '#faq', icon: HelpCircle },
    { label: 'Contact Hotel', href: '#contact', icon: Phone },
  ];

  const handleWhatsApp = () => {
    const message = "Hello The Seven's Hotel, I would like to enquire about room availability for an upcoming visit to Varanasi.";
    const url = `https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#181412]/95 backdrop-blur-md shadow-xl border-b border-[#B47A46]/25 py-2.5 sm:py-3'
            : 'bg-[#181412]/90 backdrop-blur-sm border-b border-[#B47A46]/15 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Identity / Monogram & Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            aria-label="The Seven's Hotel Varanasi"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#D8AE7F] via-[#C89B6A] to-[#A87B4E] text-[#14100E] font-serif font-bold text-base sm:text-lg flex items-center justify-center shadow-md border border-[#FAF7F2]/20 group-hover:scale-105 transition-transform shrink-0">
              7
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-serif tracking-[0.06em] text-[#FAF7F2] group-hover:text-[#C89B6A] transition-colors whitespace-nowrap uppercase font-semibold leading-tight">
                {hotelInfo.name}
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#C89B6A] tracking-[0.2em] uppercase font-medium">
                Varanasi · Assi Ghat
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs uppercase tracking-[0.14em] font-medium text-[#D8CEBF]">
            {primaryNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#FAF7F2] relative py-1 transition-colors group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C89B6A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* "More" Dropdown Menu for Reviews, FAQ, Contact */}
            <div
              className="relative py-1"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button
                type="button"
                className="hover:text-[#FAF7F2] flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
                aria-expanded={moreDropdownOpen}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#C89B6A]' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-[#1C1816] rounded-xl border border-[#B47A46]/30 shadow-2xl py-2 z-50 animate-fadeIn">
                  {secondaryNavLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMoreDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-[#D8CEBF] hover:text-[#FAF7F2] hover:bg-[#2A231F] transition-colors tracking-wider"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Zone: Call + Book Your Stay */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Direct Call Link (Desktop) */}
            <a
              href={`tel:${contactInfo.primaryPhoneRaw}`}
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#E6DACB] hover:text-[#FAF7F2] px-3 py-2 border border-[#B47A46]/30 hover:border-[#B47A46] rounded-lg transition-all whitespace-nowrap"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-[#C89B6A]" />
              <span className="hidden xl:inline">Call Desk</span>
            </a>

            {/* Primary Action: Book Your Stay CTA */}
            <button
              onClick={onOpenBooking}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg shadow-md transition-all whitespace-nowrap cursor-pointer hover:shadow-[#C89B6A]/20 shrink-0"
            >
              Book Your Stay
            </button>

            {/* Mobile Navigation Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#D8CEBF] hover:text-white hover:bg-white/10 rounded-lg focus:outline-none transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C89B6A]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-md flex flex-col justify-end transition-opacity animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#181412] text-[#FAF7F2] border-t border-[#B47A46]/40 p-5 sm:p-7 rounded-t-3xl shadow-2xl max-h-[88vh] overflow-y-auto flex flex-col justify-between">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#B47A46]/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#C89B6A] text-[#120F0E] font-serif font-bold text-lg flex items-center justify-center">
                    7
                  </div>
                  <div>
                    <span className="font-serif text-lg text-white font-semibold uppercase tracking-wider block leading-tight">
                      {hotelInfo.name}
                    </span>
                    <span className="text-[10px] text-[#C89B6A] uppercase tracking-widest">
                      Varanasi · Near Assi Ghat
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#D8CEBF] hover:text-white hover:bg-white/10 rounded-full cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6 text-[#C89B6A]" />
                </button>
              </div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-2 gap-2.5 py-5 border-b border-[#B47A46]/15">
                {allNavLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-[#221C18] hover:bg-[#2C2420] text-xs font-medium text-[#FAF7F2] hover:text-[#C89B6A] transition-colors flex items-center gap-2.5 border border-[#B47A46]/15"
                    >
                      <Icon className="w-4 h-4 text-[#C89B6A] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-4 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 text-center text-xs uppercase tracking-widest font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Your Stay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleWhatsApp();
                  }}
                  className="py-2.5 px-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#E9E4DC] hover:bg-[#DDD5C9] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </button>

                <a
                  href={`tel:${contactInfo.primaryPhoneRaw}`}
                  className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-[#FAF7F2] bg-[#221C18] hover:bg-[#2C2420] border border-[#B47A46]/30 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C89B6A]" />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
