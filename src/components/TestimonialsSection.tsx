import React from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { Star, MessageSquareQuote, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, hotelInfo } = useHotelData();

  return (
    <section className="py-20 sm:py-24 bg-[#FDFCF9] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>Guest Experiences</span>
                <span aria-hidden="true">·</span>
                <span>Verified Feedback</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
                Words From Our Guests
              </h2>
              <p className="text-sm text-[#665D55] mt-2 max-w-xl">
                Authentic observations and experiences shared by travellers staying at The Seven's Hotel in Varanasi.
              </p>
            </div>

            <a
              href={hotelInfo.googleMapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-[#1C1816] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
            >
              <span>Read More Guest Reviews on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9E6738]" />
            </a>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={t.id} direction="up" delay={100 * (idx + 1)}>
              <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E8DFD5] flex flex-col justify-between hover:shadow-xs transition-shadow h-full">
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
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
                    <span className="text-[11px] text-[#7A7168] ml-1.5 font-medium tabular-nums">
                      {t.rating}.0
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
      </div>
    </section>
  );
};
