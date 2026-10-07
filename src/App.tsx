import React, { useState } from 'react';
import { HotelDataProvider } from './context/HotelDataContext';
import { SeoProvider } from './seo/SeoContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { LanguageSuggestionBanner } from './components/LanguageSuggestionBanner';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickBookingCard } from './components/QuickBookingCard';
import { AboutSection } from './components/AboutSection';
import { RoomsSection } from './components/RoomsSection';
import { WhyStaySection } from './components/WhyStaySection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { DiningSection } from './components/DiningSection';
import { ExperienceVaranasiSection } from './components/ExperienceVaranasiSection';
import { LocationSection } from './components/LocationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { BookingCTASection } from './components/BookingCTASection';
import { ContactSection } from './components/ContactSection';
import { PoliciesSection } from './components/PoliciesSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AdminPortal } from './components/AdminPortal';
import { SeoDebugPanel } from './components/SeoDebugPanel';

function MainApp() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState<string | undefined>(undefined);

  const handleOpenBooking = (roomName?: string) => {
    setSelectedRoomName(roomName);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#FDFCF9] text-[#24201D] flex flex-col antialiased selection:bg-[#B47A46]/20 selection:text-[#1C1816]">
      {/* 0. Non-Intrusive Language Suggestion Banner */}
      <LanguageSuggestionBanner />

      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Premium Navigation with Multilingual Selector */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* 2.5 Semantic Navigation Breadcrumbs */}
      <Breadcrumbs crumbs={[{ label: 'Assi–Lanka Road', href: '#location' }, { label: 'Bhadaini, Varanasi' }]} />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Quick Booking & Search Card */}
        <QuickBookingCard />

        {/* 5. Introduction & About */}
        <AboutSection />

        {/* 6. Rooms Showcase & Comparison */}
        <RoomsSection onSelectRoom={(roomName) => handleOpenBooking(roomName)} />

        {/* 7. Why Stay With Us (5 Pillars) */}
        <WhyStaySection />

        {/* 8. Facilities Grid */}
        <FacilitiesSection />

        {/* 9. Dining: Flavours at The Seven's */}
        <DiningSection onOpenDiningEnquiry={() => handleOpenBooking()} />

        {/* 10. Experience Varanasi from Assi */}
        <ExperienceVaranasiSection />

        {/* 11. Location & Connectivity */}
        <LocationSection />

        {/* 12. Guest Reviews */}
        <TestimonialsSection />

        {/* 13. Property Gallery */}
        <GallerySection />

        {/* 14. Frequently Asked Questions */}
        <FAQSection />

        {/* 15. Booking CTA Banner */}
        <BookingCTASection onOpenBooking={() => handleOpenBooking()} />

        {/* 16. Contact & Reservation Guidelines */}
        <ContactSection />

        {/* 17. Property Policies & ID Rules */}
        <PoliciesSection />
      </main>

      {/* 18. Comprehensive Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Global Interactive Elements */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        preselectedRoom={selectedRoomName}
      />

      {/* Fullscreen Property Management CMS Portal */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />

      {/* Floating WhatsApp Action Trigger */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Booking Bar */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

      {/* Development SEO Diagnostics Panel */}
      <SeoDebugPanel />
    </div>
  );
}

export default function App() {
  return (
    <HotelDataProvider>
      <SeoProvider>
        <MainApp />
      </SeoProvider>
    </HotelDataProvider>
  );
}
