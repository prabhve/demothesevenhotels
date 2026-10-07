import React, { useState } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { RoomCard } from './RoomCard';
import { RoomDetailsModal } from './RoomDetailsModal';
import { RoomComparison } from './RoomComparison';
import { ScrollReveal } from './ScrollReveal';
import { Room } from '../data/hotelData';

interface RoomsSectionProps {
  onSelectRoom: (roomName: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom }) => {
  const { rooms, bookingSettings } = useHotelData();
  const [selectedDetailsRoom, setSelectedDetailsRoom] = useState<Room | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleOpenDetails = (room: Room) => {
    setSelectedDetailsRoom(room);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedDetailsRoom(null);
  };

  return (
    <section id="rooms" className="py-20 sm:py-24 bg-[#F8F6F0] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
                <span>Accommodations</span>
                <span aria-hidden="true">·</span>
                <span>Comfort & Rest</span>
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
        </ScrollReveal>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <ScrollReveal key={room.id} direction="up" delay={150 * (idx + 1)}>
              <RoomCard
                room={room}
                onSelectRoom={onSelectRoom}
                onViewDetails={handleOpenDetails}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Room Comparison Component */}
        <div className="mt-8">
          <RoomComparison onSelectRoom={onSelectRoom} />
        </div>

        {/* Bottom Booking Guarantee & Assistance Note */}
        <ScrollReveal direction="up" delay={400}>
          <div className="mt-8 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E3DDD4] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
            <div>
              <h4 className="font-serif text-lg sm:text-xl text-[#1C1816] font-medium">
                Need assistance choosing your room category?
              </h4>
              <p className="text-xs sm:text-sm text-[#6B6158] mt-1">
                Our front desk team is on call 24 hours to help with room arrangements, elder accessibility and travel queries.
              </p>
            </div>
            <button
              onClick={() => onSelectRoom(rooms[0]?.name || 'Classic Room')}
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#E3DDD4] hover:bg-[#D5CDC2] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              Direct Reservation Assistance
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Room Details Modal */}
      <RoomDetailsModal
        room={selectedDetailsRoom}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetails}
        onSelectBooking={onSelectRoom}
      />
    </section>
  );
};
