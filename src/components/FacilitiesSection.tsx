import React, { useState } from 'react';
import {
  Wifi,
  Wind,
  Car,
  Clock,
  Utensils,
  ArrowUpDown,
  Luggage,
  Coins,
  UserCheck,
  Navigation,
  Coffee,
  Soup,
  HeartPulse,
  ShieldCheck,
  LucideIcon,
} from 'lucide-react';
import { hotelAmenities } from '../data/hotelData';

const iconMap: Record<string, LucideIcon> = {
  Wifi,
  Wind,
  Car,
  Clock,
  Utensils,
  ArrowUpDown,
  Luggage,
  Coins,
  UserCheck,
  Navigation,
  Coffee,
  Soup,
  HeartPulse,
  ShieldCheck,
};

export const FacilitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'comfort' | 'service' | 'convenience'>('all');

  const filteredAmenities = activeTab === 'all'
    ? hotelAmenities
    : hotelAmenities.filter((a) => a.category === activeTab);

  return (
    <section id="facilities" className="py-20 sm:py-24 bg-[#F8F6F0] text-[#24201D] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
              <span>Hotel Services</span>
              <span aria-hidden="true">·</span>
              <span>Essential Comforts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
              Verified Facilities
            </h2>
            <p className="text-sm text-[#665D55] mt-2 max-w-xl">
              Practical, genuine amenities carefully maintained to support a seamless visit to Varanasi.
            </p>
          </div>

          {/* Interactive filter tabs (clean functional segmented control) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EBE5DC] rounded-lg overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#1C1816] text-[#FAF7F2] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#1C1816]'
              }`}
            >
              All Amenities
            </button>
            <button
              onClick={() => setActiveTab('comfort')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'comfort'
                  ? 'bg-[#1C1816] text-[#FAF7F2] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#1C1816]'
              }`}
            >
              Comfort & Dining
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'service'
                  ? 'bg-[#1C1816] text-[#FAF7F2] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#1C1816]'
              }`}
            >
              Guest Services
            </button>
            <button
              onClick={() => setActiveTab('convenience')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'convenience'
                  ? 'bg-[#1C1816] text-[#FAF7F2] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#1C1816]'
              }`}
            >
              Accessibility & Parking
            </button>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredAmenities.map((amenity, idx) => {
            const Icon = iconMap[amenity.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E8DFD5] hover:border-[#B47A46]/40 transition-colors flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E3DDD4] flex items-center justify-center text-[#9E6738] shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#1C1816] font-medium leading-snug">
                    {amenity.name}
                  </h3>
                  <p className="text-xs text-[#6B6158] mt-1 leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparency Note */}
        <div className="mt-8 text-center text-xs text-[#8A7F75]">
          All listed facilities are actively verified and maintained directly at The Seven's Hotel property.
        </div>
      </div>
    </section>
  );
};
