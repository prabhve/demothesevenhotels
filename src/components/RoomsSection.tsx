import React from 'react';
import { rooms, bookingSettings } from '../data/hotelData';
import { RoomCard } from './RoomCard';

interface RoomsSectionProps {
  onSelectRoom: (roomName: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom }) => {
  return (
    <section id="rooms" className="py-20 sm:py-24 bg-[#F8F6F0] text-[#24201D] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
              <span>Accommodations</span>
              <span aria-hidden="true">·</span>
              <span>Comfort & Convenience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
              Contemporary Rooms
            </h2>
          </div>

          <div className="text-left md:text-right">
            <div className="text-sm font-medium text-[#1C1816]">
              Starting from {bookingSettings.currency}{bookingSettings.startingPrice.toLocaleString()}* / night
            </div>
            <p className="text-xs text-[#7A7168] italic font-serif mt-1">
              *{bookingSettings.rateDisclaimer}
            </p>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onSelectRoom={onSelectRoom}
            />
          ))}
        </div>

        {/* Bottom Booking Guarantee & Assistance Note */}
        <div className="mt-12 p-6 rounded-xl bg-[#FAF8F5] border border-[#E3DDD4] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg text-[#1C1816] font-medium">
              Need assistance selecting a room category?
            </h4>
            <p className="text-xs text-[#6B6158] mt-0.5">
              Our front desk team is on call 24 hours to help with room configurations, family stays and travel queries.
            </p>
          </div>
          <button
            onClick={() => onSelectRoom(rooms[0].name)}
            className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#E3DDD4] hover:bg-[#D5CDC2] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Direct Reservation Assistance
          </button>
        </div>
      </div>
    </section>
  );
};
