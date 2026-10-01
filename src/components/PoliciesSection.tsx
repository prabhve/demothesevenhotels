import React from 'react';
import { hotelPolicies, hotelInfo, contactInfo } from '../data/hotelData';
import { Clock, ShieldAlert, FileText, Phone } from 'lucide-react';

export const PoliciesSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#F8F6F0] text-[#24201D] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFD5] p-7 sm:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#F0EBE3] gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Guest Information</span>
              </div>
              <h3 className="font-serif text-2xl text-[#1C1816] font-normal">
                Property Policies & Timings
              </h3>
            </div>

            {/* Check-In / Check-Out Highlights */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9E6738]" />
                <div>
                  <span className="text-[11px] text-[#7A7168] block uppercase tracking-wider">Check-In</span>
                  <span className="font-semibold text-[#1C1816]">{hotelPolicies.checkIn}</span>
                </div>
              </div>
              <div className="h-8 w-px bg-[#E3DDD4]" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9E6738]" />
                <div>
                  <span className="text-[11px] text-[#7A7168] block uppercase tracking-wider">Check-Out</span>
                  <span className="font-semibold text-[#1C1816]">{hotelPolicies.checkOut}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2.5">
              {hotelPolicies.bookingNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#5C534B] leading-relaxed">
                  <span className="text-[#9E6738] font-serif font-bold">•</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>

            <div className="md:col-span-4 bg-[#FAF8F5] p-5 rounded-xl border border-[#E3DDD4] flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#9E6738] font-semibold block mb-1">
                  Policy Queries
                </span>
                <p className="text-xs text-[#5C534B]">
                  For specific policy details, cancellations, children or group bookings, please contact the hotel directly.
                </p>
              </div>
              <a
                href={`tel:${contactInfo.primaryPhoneRaw}`}
                className="mt-3 text-xs font-semibold text-[#1C1816] hover:text-[#9E6738] transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#9E6738]" />
                <span>Call {contactInfo.primaryPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
