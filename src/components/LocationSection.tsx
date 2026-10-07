import React from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { MapPin, Navigation, Compass, ExternalLink, Train, Plane, Car, Footprints } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const LocationSection: React.FC = () => {
  const { hotelInfo } = useHotelData();

  return (
    <section id="location" className="py-20 sm:py-24 bg-[#F8F6F0] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Geographic Location</span>
                <span aria-hidden="true">·</span>
                <span>Assi–Lanka Road</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
                Location & Connectivity
              </h2>
              <p className="text-sm text-[#665D55] mt-2 max-w-2xl">
                Strategically positioned in Bhadaini on Assi–Lanka Road near Abhay Cinema, providing convenient arrival and departure connectivity across Varanasi.
              </p>
            </div>

            <a
              href={hotelInfo.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] active:bg-[#B47A46] rounded-lg transition-all inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto shadow-xs"
            >
              <Navigation className="w-4 h-4" />
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Embedded Map Container & Address Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          {/* Map Preview Container */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-[#E3DDD4] shadow-xs bg-[#EAE4DB] min-h-[380px] relative">
            <ScrollReveal direction="right" delay={150}>
              <iframe
                title="The Seven's Hotel Varanasi Location Map"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${hotelInfo.coordinates.lat},${hotelInfo.coordinates.lng}&hl=en&z=16&output=embed`}
              />
              <div className="absolute top-4 left-4 bg-[#1C1816]/90 backdrop-blur-md text-[#FAF7F2] py-2 px-3.5 rounded-lg border border-[#B47A46]/30 text-xs flex items-center gap-2 pointer-events-none">
                <MapPin className="w-3.5 h-3.5 text-[#C89B6A]" />
                <span>Lat: {hotelInfo.coordinates.lat}°, Lng: {hotelInfo.coordinates.lng}°</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Location Details Card */}
          <div className="lg:col-span-4 bg-[#FFFFFF] p-7 rounded-2xl border border-[#E8DFD5] flex flex-col justify-between shadow-xs">
            <ScrollReveal direction="left" delay={200}>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#9E6738] font-semibold mb-2">
                  Official Postal Address
                </div>
                <h3 className="font-serif text-2xl text-[#1C1816] font-normal mb-3">
                  {hotelInfo.name}
                </h3>
                <p className="text-sm text-[#5C534B] leading-relaxed mb-4">
                  {hotelInfo.address}
                </p>

                <div className="space-y-2.5 text-xs text-[#7A7168] pt-4 border-t border-[#F2ECE4]">
                  <div className="flex justify-between">
                    <span className="font-medium text-[#4A423B]">Landmark:</span>
                    <span>Near ABHAY CINEMA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#4A423B]">Area:</span>
                    <span>Anandbagh, Bhadaini</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#4A423B]">Pincode:</span>
                    <span>221005, Varanasi (U.P.)</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#F2ECE4] mt-6">
                <a
                  href={hotelInfo.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E3DDD4] rounded-lg transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#9E6738]" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Transit & Key Connectivity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E8DFD5]">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E3DDD4] flex items-center justify-center text-[#9E6738] mb-3">
              <Footprints className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base text-[#1C1816] font-medium">Assi Ghat Proximity</h4>
            <p className="text-xs text-[#6B6158] mt-1">
              ~800m to 1 km. A short 3–5 min e-rickshaw ride or easy walking stroll to the riverfront.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E8DFD5]">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E3DDD4] flex items-center justify-center text-[#9E6738] mb-3">
              <Train className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base text-[#1C1816] font-medium">Railway Connectivity</h4>
            <p className="text-xs text-[#6B6158] mt-1">
              Varanasi Junction (BSB / Cantt) is ~6.5 km away; Banaras Station (BSBS) is ~4.5 km away.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E8DFD5]">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E3DDD4] flex items-center justify-center text-[#9E6738] mb-3">
              <Plane className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base text-[#1C1816] font-medium">Airport Connectivity</h4>
            <p className="text-xs text-[#6B6158] mt-1">
              Lal Bahadur Shastri International Airport (VNS) is ~28 km via Babatpur Highway.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E8DFD5]">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E3DDD4] flex items-center justify-center text-[#9E6738] mb-3">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base text-[#1C1816] font-medium">Local Transport Assistance</h4>
            <p className="text-xs text-[#6B6158] mt-1">
              Taxi bookings, car service arrangements, and e-rickshaw access readily available via front desk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
