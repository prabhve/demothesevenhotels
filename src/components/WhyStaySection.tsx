import React from 'react';
import { MapPin, BedDouble, HeartHandshake, Sparkles, Compass } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const WhyStaySection: React.FC = () => {
  const points = [
    {
      icon: MapPin,
      title: 'Prime Assi Ghat Location',
      description:
        'Situated on Assi–Lanka Road in Bhadaini, offering effortless access to Assi Ghat for morning Subah-e-Banaras, Ganga aartis, and riverside tranquility.',
    },
    {
      icon: BedDouble,
      title: 'Comfortable Stay',
      description:
        'Peaceful, clean guest rooms equipped with individual air conditioning, fresh linens, 24-hour hot water, television, and elevator floor connectivity.',
    },
    {
      icon: HeartHandshake,
      title: 'Warm Hospitality',
      description:
        'Attentive 24-hour front desk team dedicated to smooth check-ins, local sightseeing guidance, and warm Banarasi courtesy.',
    },
    {
      icon: Sparkles,
      title: 'Convenient Guest Services',
      description:
        'On-site restaurant dining, prompt in-room dining, doctor on call, professional laundry support, and secure luggage storage before departure.',
    },
    {
      icon: Compass,
      title: 'Easy Access to Varanasi Attractions',
      description:
        'Direct vehicle and e-rickshaw connectivity to Sankat Mochan Temple, Durga Kund, Tulsi Manas Mandir, BHU campus, and Kashi Vishwanath corridor.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FDFCF9] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hospitality Pillars</span>
              <span aria-hidden="true">·</span>
              <span>The Seven's Promise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight text-balance">
              Why Stay With Us
            </h2>
            <p className="text-sm text-[#665D55] mt-3 leading-relaxed">
              Practical hospitality crafted around comfort, cleanliness, and effortless exploration of sacred Varanasi.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={100 * (idx + 1)}>
                <div className="bg-[#FFFFFF] p-7 rounded-2xl border border-[#E8DFD5] hover:border-[#B47A46]/50 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-sm group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E3DDD4] flex items-center justify-center mb-5 text-[#9E6738] group-hover:bg-[#C89B6A] group-hover:text-[#181412] group-hover:border-[#C89B6A] transition-all duration-300">
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
                    Pillar 0{idx + 1}
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
