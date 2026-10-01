import React from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { HotelImage } from './HotelImage';
import { UtensilsCrossed, Phone, Clock, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface DiningSectionProps {
  onOpenDiningEnquiry?: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = () => {
  const { diningInfo, contactInfo } = useHotelData();

  return (
    <section id="dining" className="py-20 sm:py-24 bg-[#FDFCF9] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Container with HotelImage */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="right" delay={150}>
              <div className="relative rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-xs bg-[#241F1C]">
                <HotelImage
                  alt="Flavours at The Seven's Hotel Dining"
                  category="Dining"
                  title="Indoor Dining & Flavours at The Seven's"
                  aspectRatio="4:3"
                />

                {/* Quiet overlay label */}
                <div className="p-6 bg-[#FAF8F5] border-t border-[#E8DFD5]">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A7168] mb-3 font-medium">
                    {diningInfo.cuisines.map((c, i) => (
                      <React.Fragment key={i}>
                        <span>{c}</span>
                        {i < diningInfo.cuisines.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-[#4A423B]">
                    {diningInfo.mealTimings.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-[#F3EDE3] p-2.5 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-[#9E6738] shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1C1816] block">{m.meal}</span>
                          <span className="text-[11px] text-[#70665D]">{m.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Details */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left" delay={250}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Dining Experience</span>
                <span aria-hidden="true">·</span>
                <span>In-House & In-Room</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight mb-5">
                {diningInfo.title}
              </h2>

              <p className="text-base text-[#5C534B] leading-relaxed mb-6">
                {diningInfo.description}
              </p>

              {/* Feature highlights */}
              <div className="space-y-3 mb-8">
                {diningInfo.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#9E6738] shrink-0" />
                    <span className="text-sm text-[#4A423B]">{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-[#E8DFD5]">
                <a
                  href={`tel:${contactInfo.primaryPhoneRaw}`}
                  className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call for Dining Enquiries</span>
                </a>

                <a
                  href="#rooms"
                  className="w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-wider font-medium text-[#1C1816] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors text-center"
                >
                  Explore Rooms with Dining
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
