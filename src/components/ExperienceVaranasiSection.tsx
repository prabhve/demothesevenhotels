import React from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { HotelImage } from './HotelImage';
import { Compass, MapPin, ExternalLink, Sparkles, Navigation } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ExperienceVaranasiSection: React.FC = () => {
  const { nearbyPlaces, hotelInfo } = useHotelData();

  return (
    <section id="experience-varanasi" className="py-20 sm:py-24 bg-[#FAF8F5] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Spiritual & Cultural Heritage</span>
                <span aria-hidden="true">·</span>
                <span>Sacred Kashi</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
                Experience Varanasi from Assi
              </h2>
              <p className="text-sm sm:text-base text-[#5C534B] mt-3 max-w-2xl leading-relaxed">
                Stay in the soulful southern quarter of Varanasi, where ancient morning traditions, Ganga aartis, renowned temple shrines, and sacred river ghats are just minutes away.
              </p>
            </div>

            <a
              href={hotelInfo.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg transition-all inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto shadow-xs"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions to Property</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Featured Assi Spotlight Banner */}
        <ScrollReveal direction="up" delay={150}>
          <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-[#1C1816] text-[#FAF7F2] border border-[#B47A46]/30 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-lg">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#C89B6A] uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Southern Varanasi Gateway · Assi Ghat</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white leading-snug">
                Subah-e-Banaras, Morning Ganga Aarti & Spiritual Calm
              </h3>
              <p className="text-xs sm:text-sm text-[#D8CEBF]/85 leading-relaxed max-w-2xl">
                Unlike the crowded northern markets, the Assi–Bhadaini neighborhood offers a peaceful, culturally rich ambiance with classical music recitals, sunrise boat rides, historic ghat strolls, and revered temple routes.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="p-3.5 rounded-xl bg-[#251F1C] border border-[#B47A46]/30 text-xs">
                <span className="text-[#C89B6A] font-semibold block">Proximity from Hotel</span>
                <span className="text-white font-serif text-base font-medium block mt-0.5">~800m - 1 km</span>
                <span className="text-[11px] text-[#A89C8F]">3-5 min by e-rickshaw or scenic walk</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Assi+Ghat+Varanasi"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] rounded-lg transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>Explore Assi on Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* 7 Attraction Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyPlaces.map((place, idx) => (
            <ScrollReveal key={idx} direction="up" delay={100 * (idx + 1)}>
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFD5] hover:border-[#B47A46]/50 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-md overflow-hidden group">
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#181412]">
                  <HotelImage
                    alt={place.name}
                    category="Surroundings"
                    title={place.name}
                    aspectRatio="16:9"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  {place.highlight && (
                    <div className="absolute top-3 right-3 bg-[#1C1816]/90 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-medium tracking-wider uppercase px-2.5 py-0.5 rounded border border-[#B47A46]/30">
                      {place.highlight}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] uppercase tracking-wider text-[#9E6738] font-semibold">
                        {place.type}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl text-[#1C1816] font-normal mb-2 group-hover:text-[#9E6738] transition-colors">
                      {place.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#5C534B] leading-relaxed mb-4">
                      {place.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F2ECE4] flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-[#7A7168] truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#9E6738] shrink-0" />
                      <span className="truncate">{place.proximityNote}</span>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#9E6738] hover:text-[#7A4B23] transition-colors inline-flex items-center gap-1 shrink-0"
                      title={`View ${place.name} on Google Maps`}
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
