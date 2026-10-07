import React from 'react';
import {
  MapPin,
  BedDouble,
  HeartHandshake,
  Sparkles,
  Compass,
  Utensils,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sunrise,
  CheckCircle2,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useHotelData } from '../context/HotelDataContext';
import { useSEO } from '../seo/SeoContext';

export const WhyStaySection: React.FC = () => {
  const { hotelInfo } = useHotelData();
  const { t } = useSEO();

  const handleScrollToRooms = () => {
    const el = document.getElementById('rooms');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    {
      id: 'location',
      icon: MapPin,
      badge: '~800m to Riverfront',
      title: 'Prime Assi Ghat Location',
      tagline: 'Quiet Southern Varanasi Quarter',
      description:
        'Located on Assi–Lanka Road in Bhadaini, offering peaceful residential tranquility with walking and e-rickshaw proximity to Assi Ghat for Subah-e-Banaras, yoga, and evening Ganga Aarti.',
      highlights: [
        '3–5 mins to morning Subah-e-Banaras',
        'Easy walking stroll to ghat boat rides',
        'Away from chaotic northern market congestion',
      ],
      colSpan: 'lg:col-span-7',
      isPrimary: true,
    },
    {
      id: 'comfort',
      icon: BedDouble,
      badge: 'Certified Clean Stays',
      title: 'Contemporary Rest & Comfort',
      tagline: 'Individual AC & 24h Hot Water',
      description:
        'Spotless rooms equipped with individual climate control, comfortable bedding, private en-suite bathrooms with round-the-clock hot water, television, and step-free passenger elevator connectivity.',
      highlights: [
        'Individual climate control in all rooms',
        '24-hour continuous hot water for temple rituals',
        'Smooth elevator access across all guest floors',
      ],
      colSpan: 'lg:col-span-5',
      isPrimary: false,
    },
    {
      id: 'hospitality',
      icon: HeartHandshake,
      badge: '24/7 Front Desk',
      title: 'Warm Banarasi Hospitality',
      tagline: 'Round-the-Clock Assistance',
      description:
        'Our attentive front desk team assists with early check-ins, luggage storage, temple darshan timings, taxi coordination, and local Banarasi recommendations.',
      highlights: [
        '24-Hour reception & check-in support',
        'Temple visit & morning taxi arrangements',
        'Secure baggage holding before departure',
      ],
      colSpan: 'lg:col-span-4',
      isPrimary: false,
    },
    {
      id: 'dining',
      icon: Utensils,
      badge: 'Flavours Dining',
      title: 'In-House Dining & Room Service',
      tagline: 'Freshly Prepared Meals',
      description:
        'Enjoy wholesome vegetarian-friendly North Indian and Chinese specialties in our indoor dining space or delivered warm directly to your room after a long day of sightseeing.',
      highlights: [
        'Room service delivered to your door',
        'Authentic Banarasi breakfast options',
        'Clean & hygienic indoor dining environment',
      ],
      colSpan: 'lg:col-span-4',
      isPrimary: false,
    },
    {
      id: 'connectivity',
      icon: Compass,
      badge: 'Direct Road Access',
      title: 'Effortless Varanasi Connectivity',
      tagline: 'Minutes to Sacred Temples & BHU',
      description:
        'Direct vehicle access on Assi–Lanka Road connects you smoothly to Sankat Mochan Temple, Durga Kund, Tulsi Manas Mandir, BHU campus, and Kashi Vishwanath corridor.',
      highlights: [
        'Near Sankat Mochan & Durga Mandir',
        'Direct Lanka Road connectivity to BHU',
        'Convenient e-rickshaw availability at doorstep',
      ],
      colSpan: 'lg:col-span-4',
      isPrimary: false,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] text-[#24201D] border-t border-[#E8DFD5] relative overflow-hidden">
      {/* Subtle fine geometric watermark backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#B47A46_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#9E6738] font-semibold mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Seven's Advantage</span>
                <span aria-hidden="true">·</span>
                <span>Varanasi Hospitality</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
                {t.whyStay.title}
              </h2>
              <p className="text-sm sm:text-base text-[#665D55] mt-2.5 max-w-2xl leading-relaxed">
                {t.whyStay.subtitle}
              </p>
            </div>

            {/* Direct Rooms Anchor Button */}
            <button
              onClick={handleScrollToRooms}
              className="px-5 py-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#FFFFFF] hover:bg-[#F2ECE4] border border-[#E3DDD4] hover:border-[#B47A46]/60 rounded-xl transition-all inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto shadow-xs cursor-pointer group"
            >
              <span>Explore Accommodations</span>
              <ArrowRight className="w-4 h-4 text-[#9E6738] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>

        {/* Feature Grid with Bento-Style Hierarchy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal
                key={pillar.id}
                direction="up"
                delay={80 * (idx + 1)}
                className={pillar.colSpan}
              >
                <div
                  className={`hover-lift rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full border transition-all group shadow-xs ${
                    pillar.isPrimary
                      ? 'bg-[#1C1816] text-[#FAF7F2] border-[#B47A46]/40 hover:border-[#C89B6A]'
                      : 'bg-[#FFFFFF] text-[#24201D] border-[#E8DFD5] hover:border-[#B47A46]/60'
                  }`}
                >
                  <div>
                    {/* Top Tag & Icon Row */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          pillar.isPrimary
                            ? 'bg-[#2A221E] text-[#C89B6A] border border-[#B47A46]/30 group-hover:bg-[#C89B6A] group-hover:text-[#181412]'
                            : 'bg-[#FAF8F5] text-[#9E6738] border border-[#E3DDD4] group-hover:bg-[#C89B6A] group-hover:text-[#181412] group-hover:border-[#C89B6A]'
                        }`}
                      >
                        <Icon className="w-6 h-6 stroke-[1.6]" />
                      </div>

                      <span
                        className={`text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded-full border ${
                          pillar.isPrimary
                            ? 'bg-[#2A231F] text-[#C89B6A] border-[#B47A46]/40'
                            : 'bg-[#FAF8F5] text-[#9E6738] border-[#E8DFD5]'
                        }`}
                      >
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Subtitle / Tagline */}
                    <span
                      className={`text-xs uppercase tracking-wider font-semibold block mb-1 ${
                        pillar.isPrimary ? 'text-[#C89B6A]' : 'text-[#9E6738]'
                      }`}
                    >
                      {pillar.tagline}
                    </span>

                    {/* Title */}
                    <h3
                      className={`text-2xl font-serif font-normal mb-3 ${
                        pillar.isPrimary ? 'text-[#FAF7F2]' : 'text-[#1C1816]'
                      }`}
                    >
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                        pillar.isPrimary ? 'text-[#D8CEBF]/90' : 'text-[#5C534B]'
                      }`}
                    >
                      {pillar.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div
                    className={`pt-4 border-t space-y-2 text-xs ${
                      pillar.isPrimary
                        ? 'border-[#B47A46]/20 text-[#D8CEBF]/85'
                        : 'border-[#F2ECE4] text-[#4A423B]'
                    }`}
                  >
                    {pillar.highlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${
                            pillar.isPrimary ? 'text-[#C89B6A]' : 'text-[#9E6738]'
                          }`}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <ScrollReveal direction="up" delay={500}>
          <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E3DDD4] flex items-center justify-center text-[#9E6738] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg text-[#1C1816] font-medium">
                  Direct Property Assurance
                </h4>
                <p className="text-xs text-[#7A7168]">
                  All listed amenities, distances, and services are verified on-site at {hotelInfo.address}.
                </p>
              </div>
            </div>

            <button
              onClick={handleScrollToRooms}
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-xs"
            >
              Check Room Availability
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
