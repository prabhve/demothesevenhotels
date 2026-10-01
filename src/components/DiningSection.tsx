import React, { useState } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { HotelImage } from './HotelImage';
import { UtensilsCrossed, Phone, Clock, CheckCircle2, BookOpen, X, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface DiningSectionProps {
  onOpenDiningEnquiry?: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = () => {
  const { diningInfo, contactInfo } = useHotelData();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = diningInfo.menuCategories ? ['All', ...diningInfo.menuCategories] : ['All'];
  const menuItems = diningInfo.menuItems || [];
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter((m) => m.category === selectedCategory);

  return (
    <section id="dining" className="py-20 sm:py-24 bg-[#FDFCF9] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Container with HotelImage */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="right" delay={150}>
              <div className="relative rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-xs bg-[#241F1C]">
                <HotelImage
                  src={diningInfo.imageUrl}
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
                <button
                  onClick={() => setIsMenuModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Dining Menu</span>
                </button>

                <a
                  href={`tel:${contactInfo.primaryPhoneRaw}`}
                  className="w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-wider font-medium text-[#1C1816] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9E6738]" />
                  <span>Dining Enquiries</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* In-House Menu Modal */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FFFFFF] text-[#24201D] rounded-2xl max-w-3xl w-full shadow-2xl border border-[#E8DFD5] overflow-hidden my-8 max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#1C1816] text-[#FAF7F2] p-6 flex items-center justify-between border-b border-[#B47A46]/30 shrink-0">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C89B6A] font-semibold block">
                  Flavours at The Seven's
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  In-House & Room Service Menu
                </h3>
              </div>
              <button
                onClick={() => setIsMenuModalOpen(false)}
                className="p-1.5 rounded-full text-[#D8CEBF] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="p-4 bg-[#F8F6F0] border-b border-[#E8DFD5] flex items-center gap-2 overflow-x-auto shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1C1816] text-white font-semibold'
                      : 'bg-white text-[#5C534B] border border-[#E3DDD4] hover:border-[#B47A46]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {filteredItems.length === 0 ? (
                <div className="text-center py-10 text-[#7A7168]">
                  <UtensilsCrossed className="w-8 h-8 text-[#C89B6A] mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Please check back or contact the front desk for today's specials.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-[#E8DFD5] bg-[#FAF8F5] flex flex-col justify-between hover:border-[#B47A46]/40 transition-colors"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-serif text-base text-[#1C1816] font-semibold flex items-center gap-1.5">
                            <span>{item.name}</span>
                            {item.isPopular && (
                              <span title="Guest Favorite" className="inline-flex">
                                <Sparkles className="w-3 h-3 text-[#C89B6A]" />
                              </span>
                            )}
                          </h4>
                          {item.price && (
                            <span className="font-semibold text-sm text-[#1C1816] tabular-nums whitespace-nowrap">
                              ₹{item.price}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5C534B] leading-relaxed mb-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-[#E8DFD5]/60 text-[10px] text-[#7A7168]">
                        <span className="px-1.5 py-0.5 bg-[#EAE4DB] rounded text-[#4A423B] font-medium">
                          {item.category}
                        </span>
                        {item.dietary && (
                          <span className="text-[#25D366] font-medium">
                            • {item.dietary}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A7168] shrink-0">
              <span>*Prices subject to local taxes. Room service available during dining hours.</span>
              <a
                href={`tel:${contactInfo.primaryPhoneRaw}`}
                className="px-4 py-2 bg-[#1C1816] text-white rounded-lg hover:bg-[#2A231F] transition-colors inline-flex items-center gap-1.5 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#C89B6A]" />
                <span>Call to Order: {contactInfo.primaryPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
