import React from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { Star, MessageSquareQuote, ExternalLink, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, hotelInfo } = useHotelData();

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#FDFCF9] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>Guest Experiences</span>
                <span aria-hidden="true">·</span>
                <span>Verified Feedback</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
                Guest Reviews & Trust
              </h2>
              <p className="text-sm text-[#665D55] mt-2 max-w-xl">
                Authentic feedback and observations shared by travelers staying at The Seven's Hotel on Assi–Lanka Road in Varanasi.
              </p>
            </div>

            <a
              href={hotelInfo.googleMapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto shadow-xs"
            >
              <span>Read More Reviews on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9E6738]" />
            </a>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={t.id} direction="up" delay={100 * (idx + 1)}>
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8DFD5] flex flex-col justify-between hover:shadow-sm hover:border-[#B47A46]/40 transition-all duration-300 h-full">
                <div>
                  {/* Rating Stars & Source Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < t.rating
                              ? 'fill-[#C89B6A] text-[#C89B6A]'
                              : 'fill-transparent text-[#D8CEBF]'
                          }`}
                        />
                      ))}
                      <span className="text-[11px] text-[#7A7168] ml-1 font-medium tabular-nums">
                        {t.rating}.0
                      </span>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF8F5] text-[#9E6738] border border-[#E3DDD4] font-medium truncate">
                      {t.source || 'Verified Guest'}
                    </span>
                  </div>

                  <h4 className="font-serif text-base text-[#1C1816] font-medium leading-snug mb-2.5">
                    "{t.highlight}"
                  </h4>

                  <p className="text-xs text-[#5C534B] leading-relaxed mb-6">
                    {t.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE4] flex items-center justify-between text-xs text-[#7A7168]">
                  <span className="font-semibold text-[#1C1816]">{t.author}</span>
                  <span className="text-[11px] text-[#A69888]">{t.stayDate}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Authentic Trust Disclaimer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8A7F75] text-center">
          <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
          <span>Reviews reflect genuine, uncompensated feedback from verified travelers staying at The Seven's Hotel.</span>
        </div>
      </div>
    </section>
  );
};
