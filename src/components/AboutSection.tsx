import React from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { useSEO } from '../seo/SeoContext';
import { CheckCircle2, MapPin, Phone, Shield, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const { hotelInfo, contactInfo } = useHotelData();
  const { t } = useSEO();

  return (
    <section id="about" className="py-20 sm:py-24 bg-[#FDFCF9] text-[#24201D] overflow-hidden border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Photography Collage & Monogram */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="up" delay={150}>
              <div className="relative rounded-2xl overflow-hidden border border-[#E5DFD5] shadow-lg bg-[#181412]">
                {/* Main Hero Photo */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                    alt="The Seven's Hotel Property Building"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181412]/90 via-[#181412]/30 to-transparent" />
                  
                  {/* Floating Monogram Emblem */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[#C89B6A] text-[#14100E] font-serif font-bold text-xl flex items-center justify-center shadow-lg border border-[#FAF7F2]/20">
                    7
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F2]">
                    <span className="text-[10px] uppercase tracking-widest text-[#C89B6A] font-semibold block mb-1">
                      Assi–Lanka Road · Bhadaini
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug">
                      Contemporary Rest & Comfort
                    </h3>
                  </div>
                </div>

                {/* Secondary Inset Visual Box */}
                <div className="p-6 bg-[#FFFFFF] border-t border-[#E8DFD5] space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9E6738] font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#9E6738]" />
                    <span>{t.about.verifiedStandards}</span>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#4A423B]">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9E6738] shrink-0 mt-0.5" />
                      <span>{t.about.bullet1}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9E6738] shrink-0 mt-0.5" />
                      <span>{t.about.bullet2}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#9E6738] shrink-0 mt-0.5" />
                      <span>{t.about.bullet3}</span>
                    </div>
                  </div>

                  {/* Direct Front Desk Helpline Bar */}
                  <div className="pt-2">
                    <a
                      href={`tel:${contactInfo.primaryPhoneRaw}`}
                      className="flex items-center justify-between gap-3 bg-[#1C1816] text-[#FAF7F2] py-3 px-4 rounded-xl border border-[#B47A46]/30 hover:border-[#C89B6A] transition-all group shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#C89B6A]/20 flex items-center justify-center text-[#C89B6A] group-hover:bg-[#C89B6A] group-hover:text-[#181412] transition-colors">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-[#C89B6A] font-medium">{t.about.frontDeskBadge}</div>
                          <div className="text-xs font-semibold text-white tracking-wide">{contactInfo.primaryPhone}</div>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C89B6A] font-semibold bg-[#2A231F] px-2 py-1 rounded-md border border-[#B47A46]/20">
                        {t.about.directCall}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={250}>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{t.about.tagline}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight leading-[1.15] mb-6 text-balance">
                {t.about.title}
              </h2>

              <div className="space-y-4 text-base text-[#5C534B] leading-relaxed">
                <p className="text-lg text-[#3B342E] font-normal leading-relaxed">
                  {t.about.p1}
                </p>

                <p>
                  {t.about.p2}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-[#E8DFD5] flex flex-wrap items-center gap-6 text-sm text-[#4A423B]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#9E6738]" />
                  <span className="font-medium text-[#1C1816]">{hotelInfo.shortAddress}</span>
                </div>
                <div className="text-[#D0C6B8]">·</div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#9E6738]" />
                  <span>24-Hour Front Desk Support</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
