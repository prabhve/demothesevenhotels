import React from 'react';
import { MapPin, BedDouble, HeartHandshake, Compass } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const WhyStaySection: React.FC = () => {
  const points = [
    {
      icon: MapPin,
      title: 'Convenient Location',
      description: 'Located in the Assi–Lanka area of Varanasi, near Abhay Cinema, providing easy walking and vehicle access to riverfront hubs.',
    },
    {
      icon: BedDouble,
      title: 'Comfortable Stay',
      description: 'Contemporary rooms designed for a relaxed visit, featuring air conditioning, fresh linens, clean bathrooms and elevator connectivity.',
    },
    {
      icon: HeartHandshake,
      title: 'Thoughtful Hospitality',
      description: 'Helpful 24-hour front desk, prompt room service, local transport assistance and doctor on call for peace of mind.',
    },
    {
      icon: Compass,
      title: 'Easy Connectivity',
      description: 'Convenient access to major Varanasi attractions including Assi Ghat, Tulsi Ghat, Kashi Vishwanath corridor and BHU.',
    },
  ];

  return (
    <section className="py-20 bg-[#FDFCF9] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
              <span>Guest Experience</span>
              <span aria-hidden="true">·</span>
              <span>The Seven's Stay</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1816] font-normal tracking-tight text-balance">
              Why Stay With Us
            </h2>
            <p className="text-sm text-[#665D55] mt-3">
              Practical hospitality crafted around comfort, cleanliness, and effortless exploration of Varanasi.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={120 * (idx + 1)}>
                <div className="bg-[#FFFFFF] p-7 rounded-xl border border-[#E8DFD5] hover:border-[#B47A46]/50 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-sm">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E3DDD4] flex items-center justify-center mb-5 text-[#9E6738]">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="text-xl font-serif text-[#1C1816] font-normal mb-2.5">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C534B] leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#F2ECE4] text-[11px] text-[#A69888] font-medium uppercase tracking-wider">
                    0{idx + 1}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
