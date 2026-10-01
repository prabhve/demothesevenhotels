import React from 'react';
import { hotelInfo, contactInfo } from '../data/hotelData';
import { CheckCircle2, MapPin, Phone, Shield } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-[#FDFCF9] text-[#24201D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Architectural Showcase Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5DFD5] bg-[#F5F2EB] p-8 shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B47A46]/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* Hotel Monogram / Emblem */}
              <div className="w-16 h-16 rounded-full border border-[#B47A46]/30 bg-[#FAF8F5] flex items-center justify-center mb-6 shadow-xs">
                <span className="font-serif text-2xl font-bold text-[#9E6738]">7</span>
              </div>

              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9E6738] font-semibold mb-2">
                <span>{hotelInfo.category}</span>
                <span aria-hidden="true">·</span>
                <span>Varanasi</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1816] font-normal leading-snug mb-4">
                Contemporary Comfort in Varanasi
              </h3>

              <p className="text-sm text-[#5C534B] leading-relaxed mb-6">
                Situated in the Assi–Lanka corridor near Abhay Cinema, offering quiet rest, modern room amenities, on-site dining and dependable front desk assistance.
              </p>

              {/* Verified Trust Points */}
              <div className="space-y-3 pt-6 border-t border-[#E8DFD5]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#9E6738] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4A423B]">
                    Assi–Lanka Road address with convenient connectivity across Varanasi
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#9E6738] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4A423B]">
                    Elevator access to all floors & dedicated front desk service
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#9E6738] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4A423B]">
                    In-house dining serving comforting Indian & Chinese selections
                  </span>
                </div>
              </div>
            </div>

            {/* Small accent floating note */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -right-5 bg-[#1C1816] text-[#FAF7F2] py-3 px-5 rounded-xl shadow-xl border border-[#B47A46]/30">
              <Shield className="w-4 h-4 text-[#C89B6A]" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-[#C89B6A]">Direct Booking Desk</div>
                <div className="text-xs font-semibold">{contactInfo.primaryPhone}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-3">
              <span>About The Seven's</span>
              <span aria-hidden="true">·</span>
              <span>Bhadaini</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight leading-[1.15] mb-6 text-balance">
              Thoughtful Hospitality on Assi–Lanka Road
            </h2>

            <div className="space-y-4 text-base text-[#5C534B] leading-relaxed">
              <p className="text-lg text-[#3B342E] font-normal leading-relaxed">
                Welcome to The Seven's Hotel, a contemporary stay in the Assi–Bhadaini area of Varanasi. Designed for travellers seeking comfort and convenience, the hotel combines practical modern amenities with warm hospitality and easy access to the city's cultural and spiritual landmarks.
              </p>

              <p>
                Whether you are visiting sacred Kashi for morning rituals along the Ghats, exploring the temple corridors, or in town for business and academic visits near BHU, our team ensures a seamless and restful stay.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[#E8DFD5] flex flex-wrap items-center gap-6 text-sm text-[#4A423B]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9E6738]" />
                <span className="font-medium text-[#1C1816]">Bhadaini, Varanasi</span>
              </div>
              <div className="text-[#D0C6B8]">·</div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9E6738]" />
                <span>24-Hour Front Desk Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
