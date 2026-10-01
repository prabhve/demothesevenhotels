import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickBookingCard } from './components/QuickBookingCard';
import { AboutSection } from './components/AboutSection';
import { RoomsSection } from './components/RoomsSection';
import { WhyStaySection } from './components/WhyStaySection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { DiningSection } from './components/DiningSection';
import { LocationSection } from './components/LocationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { BookingCTASection } from './components/BookingCTASection';
import { ContactSection } from './components/ContactSection';
import { PoliciesSection } from './components/PoliciesSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState<string | undefined>(undefined);

  const handleOpenBooking = (roomName?: string) => {
    setSelectedRoomName(roomName);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleQuickAvailabilityCheck = (details: {
    checkIn: string;
    checkOut: string;
    guests: string;
    roomType: string;
  }) => {
    setSelectedRoomName(details.roomType);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#24201D] flex flex-col antialiased selection:bg-[#B47A46]/20 selection:text-[#1C1816]">
      {/* 1. Announcement / Top Bar */}
      <AnnouncementBar />

      {/* 2. Premium Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-1">
        {/* 3. Sophisticated Full-Width Hero */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Quick Booking / Search Card */}
        <QuickBookingCard onCheckAvailability={handleQuickAvailabilityCheck} />

        {/* 5. Introduction & About */}
        <AboutSection />

        {/* 6. Rooms Section */}
        <RoomsSection onSelectRoom={(roomName) => handleOpenBooking(roomName)} />

        {/* 7. Why Stay With Us */}
        <WhyStaySection />

        {/* 8. Facilities (Verified Amenities Only) */}
        <FacilitiesSection />

        {/* 9. Dining: Flavours at The Seven's */}
        <DiningSection onOpenDiningEnquiry={() => handleOpenBooking()} />

        {/* 10. Varanasi / Location Experience */}
        <LocationSection />

        {/* 11. Guest Testimonials */}
        <TestimonialsSection />

        {/* 12. Property Gallery */}
        <GallerySection />

        {/* 13. Booking CTA Banner */}
        <BookingCTASection onOpenBooking={() => handleOpenBooking()} />

        {/* 14. Contact & Interactive Map */}
        <ContactSection />

        {/* 15. Property Policies & Timings */}
        <PoliciesSection />
      </main>

      {/* 16. Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Global Interactive Elements */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        preselectedRoom={selectedRoomName}
      />

      {/* Floating WhatsApp Action Trigger */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Booking Bar */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
