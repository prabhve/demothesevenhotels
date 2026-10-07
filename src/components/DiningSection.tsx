import React, { useState } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { useSEO } from '../seo/SeoContext';
import { HotelImage } from './HotelImage';
import { UtensilsCrossed, Clock, CheckCircle2, BookOpen, Phone, X, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface DiningSectionProps {
  onOpenDiningEnquiry?: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = () => {
  const { diningInfo, contactInfo } = useHotelData();
  const { t } = useSEO();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...(diningInfo.menuCategories || [])];

  const filteredItems = selectedCategory === 'All'
    ? (diningInfo.menuItems || [])
    : (diningInfo.menuItems || []).filter((item) => item.category === selectedCategory);

  return (
    <section id="dining" className="py-20 sm:py-24 bg-[#FAF8F5] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Photography of Restaurant & Meal Timings */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="up" delay={150}>
              <div className="rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-md bg-[#1C1816]">
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <img
                    src={diningInfo.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"}
                    alt="Flavours at The Seven's Restaurant Dining Hall"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/90 via-[#181412]/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F2]">
                    <span className="text-[10px] uppercase tracking-widest text-[#C89B6A] font-semibold block mb-1">
                      Flavours at The Seven's
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug">
                      Vegetarian-Friendly Dining & Room Service
                    </h3>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Meal Timings Card */}
            <ScrollReveal direction="up" delay={250}>
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9E6738] font-semibold mb-4">
                  <Clock className="w-4 h-4 text-[#C89B6A]" />
                  <span>Meal Timings & Service Hours</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {diningInfo.mealTimings.map((timing, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5]">
                      <div className="text-xs font-semibold text-[#1C1816]">{timing.meal}</div>
                      <div className="text-[11px] text-[#C89B6A] font-medium mt-0.5">{timing.time}</div>
                      <div className="text-[10px] text-[#7A7168] mt-1">{timing.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial & Menu Highlights */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left" delay={200}>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-3">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Culinary Comfort</span>
                <span aria-hidden="true">·</span>
                <span>In-House Restaurant</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight leading-[1.15] mb-4">
                {diningInfo.title}
              </h2>

              <p className="text-base text-[#5C534B] leading-relaxed mb-6">
                {diningInfo.description}
              </p>

              {/* Feature Highlights */}
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
                  className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.dining.viewMenu}</span>
                </button>

                <a
                  href={`tel:${contactInfo.primaryPhoneRaw}`}
                  className="w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-wider font-medium text-[#1C1816] bg-[#FFFFFF] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-xl transition-colors flex items-center justify-center gap-2 text-center shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9E6738]" />
                  <span>{t.dining.orderRoom}</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* In-House Menu Modal with Dish Photos */}
      {isMenuModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMenuModalOpen(false);
          }}
        >
          <div
            className="bg-[#FFFFFF] text-[#24201D] rounded-t-3xl sm:rounded-2xl max-w-3xl w-full shadow-2xl border border-[#E8DFD5] overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#1C1816] text-[#FAF7F2] p-5 sm:p-6 flex items-center justify-between border-b border-[#B47A46]/30 shrink-0">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C89B6A] font-semibold block">
                  Flavours at The Seven's
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
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
            <div className="p-3.5 sm:p-4 bg-[#F8F6F0] border-b border-[#E8DFD5] flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1C1816] text-white font-semibold shadow-xs'
                      : 'bg-white text-[#5C534B] border border-[#E3DDD4] hover:border-[#B47A46]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items Grid with Photos */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-[#E8DFD5] bg-[#FAF8F5] flex gap-3 hover:border-[#B47A46]/50 transition-colors shadow-xs"
                  >
                    {item.imageUrl && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#181412] border border-[#E8DFD5]">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1.5 mb-1">
                          <h4 className="font-serif text-sm sm:text-base text-[#1C1816] font-semibold truncate flex items-center gap-1">
                            <span className="truncate">{item.name}</span>
                            {item.isPopular && (
                              <span title="Guest Favorite" className="inline-flex shrink-0">
                                <Sparkles className="w-3 h-3 text-[#C89B6A]" />
                              </span>
                            )}
                          </h4>
                          {item.price && (
                            <span className="font-semibold text-xs sm:text-sm text-[#1C1816] tabular-nums whitespace-nowrap">
                              ₹{item.price}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#5C534B] line-clamp-2 leading-relaxed mb-1.5">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-[#E8DFD5]/60 text-[10px] text-[#7A7168]">
                        <span className="px-1.5 py-0.5 bg-[#EAE4DB] rounded text-[#4A423B] font-medium truncate">
                          {item.category}
                        </span>
                        {item.dietary && (
                          <span className="text-[#25D366] font-medium truncate">
                            • {item.dietary}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A7168] shrink-0">
              <span>*Room service available during kitchen hours. Freshly prepared to order.</span>
              <a
                href={`tel:${contactInfo.primaryPhoneRaw}`}
                className="w-full sm:w-auto px-4 py-2 bg-[#1C1816] text-white rounded-lg hover:bg-[#2A231F] transition-colors inline-flex items-center justify-center gap-1.5 font-medium"
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
