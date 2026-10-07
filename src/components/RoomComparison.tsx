import React, { useState } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { Check, SlidersHorizontal, ArrowRight, MessageCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface RoomComparisonProps {
  onSelectRoom: (roomName: string) => void;
}

export const RoomComparison: React.FC<RoomComparisonProps> = ({ onSelectRoom }) => {
  const { rooms, bookingSettings } = useHotelData();
  const [isOpen, setIsOpen] = useState(false);

  const comparisonRows = [
    { label: 'Reference Tariff', getValue: (r: typeof rooms[0]) => `${bookingSettings.currency}${r.basePrice.toLocaleString()} / night*` },
    { label: 'Bedding Configuration', getValue: (r: typeof rooms[0]) => r.bedType },
    { label: 'Confirmed Occupancy', getValue: (r: typeof rooms[0]) => r.occupancy },
    { label: 'Climate Control AC', getValue: () => 'Included (All Rooms)' },
    { label: 'High-Speed Wi-Fi', getValue: () => 'Complimentary' },
    { label: '24-Hour Hot Water', getValue: () => 'Included (En-Suite)' },
    { label: 'In-Room Dining / Service', getValue: () => 'Available Daily' },
    { label: 'Elevator Floor Access', getValue: () => 'Step-Free Connectivity' },
    { label: 'Sitting / Work Area', getValue: (r: typeof rooms[0]) => r.id === 'classic-room' ? 'Standard Seating' : r.id === 'deluxe-room' ? 'Dedicated Sitting & Desk' : 'Spacious Lounging Area' },
    { label: 'Best Suited For', getValue: (r: typeof rooms[0]) => r.id === 'classic-room' ? 'Solo Pilgrims & Couples' : r.id === 'deluxe-room' ? 'Couples & Business Visitors' : 'Families & Extended Stays' },
  ];

  return (
    <section className="py-12 bg-[#F8F6F0] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD5] shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Side-by-Side Evaluation</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1C1816] font-normal">
                Compare Room Categories
              </h3>
              <p className="text-xs sm:text-sm text-[#665D55] mt-1 max-w-xl">
                Review confirmed amenities, bedding and capacities across Classic, Deluxe, and Super Deluxe rooms.
              </p>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#EAE4DB] hover:bg-[#DDD5C9] rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>{isOpen ? 'Hide Room Comparison' : 'Show Full Comparison Table'}</span>
            </button>
          </div>
        </ScrollReveal>

        {isOpen && (
          <div className="mt-6 bg-[#FFFFFF] rounded-2xl border border-[#E8DFD5] overflow-hidden shadow-sm animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[#1C1816] text-[#FAF7F2] border-b border-[#B47A46]/30">
                    <th className="py-4 px-5 font-serif font-normal text-sm sm:text-base uppercase tracking-wider w-1/4">
                      Specification
                    </th>
                    {rooms.map((room) => (
                      <th
                        key={room.id}
                        className="py-4 px-5 font-serif font-normal text-sm sm:text-base text-[#FAF7F2] w-1/4"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{room.name}</span>
                          {room.badge && (
                            <span className="text-[10px] bg-[#C89B6A]/20 text-[#C89B6A] border border-[#C89B6A]/40 px-1.5 py-0.5 rounded font-sans">
                              {room.badge}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD5]">
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAF8F5]'}
                    >
                      <td className="py-3.5 px-5 font-semibold text-[#1C1816] text-xs uppercase tracking-wider">
                        {row.label}
                      </td>
                      {rooms.map((room) => (
                        <td key={room.id} className="py-3.5 px-5 text-[#5C534B]">
                          {row.getValue(room)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-[#FAF8F5] border-t-2 border-[#E3DDD4]">
                    <td className="py-4 px-5 font-semibold text-[#1C1816] text-xs uppercase tracking-wider">
                      Reservation Action
                    </td>
                    {rooms.map((room) => (
                      <td key={room.id} className="py-4 px-5">
                        <button
                          onClick={() => onSelectRoom(room.name)}
                          className="w-full py-2 px-3 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                        >
                          <span>Select {room.name.split(' ')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-[#FAF8F5] border-t border-[#E8DFD5] text-center text-[11px] text-[#7A7168] italic font-serif">
              *Tariffs are subject to availability and seasonal demand. Rates confirmed at booking inquiry.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
