import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { hotelInfo, contactInfo } from '../data/hotelData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Rooms', href: '#rooms' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Dining', href: '#dining' },
    { label: 'Location', href: '#location' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1C1816]/95 backdrop-blur-md shadow-lg border-b border-[#B47A46]/20 py-3.5'
            : 'bg-[#1C1816]/80 backdrop-blur-sm border-b border-[#B47A46]/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark (Display Serif) */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif tracking-[0.08em] text-[#FAF7F2] hover:text-[#C89B6A] transition-colors whitespace-nowrap uppercase font-semibold"
          >
            {hotelInfo.name}
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] uppercase tracking-[0.16em] font-medium text-[#D8CEBF]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#FAF7F2] relative py-1 transition-colors group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B47A46] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`tel:${contactInfo.primaryPhoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 text-xs text-[#E6DACB] hover:text-[#FAF7F2] px-3 py-2 border border-[#B47A46]/30 hover:border-[#B47A46] rounded transition-all whitespace-nowrap"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-[#B47A46]" />
              <span>Call Front Desk</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              Book Now
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#D8CEBF] hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/70 backdrop-blur-sm flex flex-col justify-end transition-opacity">
          <div className="bg-[#1C1816] border-t border-[#B47A46]/30 p-6 rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#B47A46]/20">
              <span className="font-serif text-lg text-[#FAF7F2] tracking-wider uppercase">
                {hotelInfo.name}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#D8CEBF] hover:text-white"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base uppercase tracking-wider font-medium text-[#FAF7F2] hover:text-[#C89B6A] py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#B47A46]/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-center text-xs uppercase tracking-widest font-semibold text-[#181412] bg-[#C89B6A] rounded shadow-md"
              >
                Check Availability / Book
              </button>

              <a
                href={`tel:${contactInfo.primaryPhoneRaw}`}
                className="w-full py-2.5 text-center text-xs uppercase tracking-wider text-[#FAF7F2] border border-[#B47A46]/40 rounded flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#B47A46]" />
                <span>Call {contactInfo.primaryPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
