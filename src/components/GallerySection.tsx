import React, { useState, useEffect, useCallback } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { HotelImage } from './HotelImage';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Eye, Maximize2, Minimize2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const GallerySection: React.FC = () => {
  const { galleryItems } = useHotelData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = ['All', 'Exterior', 'Rooms', 'Interiors', 'Dining', 'Surroundings'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedItemIndex(null);
    setIsFullscreen(false);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
  }, [selectedItemIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
  }, [selectedItemIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, handleCloseLightbox, handleNext, handlePrev]);

  const currentItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-[#F8F6F0] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Visual Showcase</span>
                <span aria-hidden="true">·</span>
                <span>The Property</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
                Property Gallery
              </h2>
              <p className="text-sm text-[#665D55] mt-2 max-w-xl">
                Glimpses of guest accommodations, dining hall, reception spaces, and Varanasi surroundings.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EBE5DC] rounded-xl overflow-x-auto max-w-full scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#1C1816] text-[#FAF7F2] shadow-xs'
                      : 'text-[#5C534B] hover:text-[#1C1816]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" delay={80 * (index % 6)}>
              <div
                onClick={() => handleOpenLightbox(index)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-[#E8DFD5] bg-[#FFFFFF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-[#181412]">
                  <HotelImage
                    src={item.imageUrl}
                    alt={item.title}
                    category={item.category}
                    title={item.title}
                    aspectRatio="4:3"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-white/95 text-[#1C1816] flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-[#FFFFFF] border-t border-[#F2ECE4] flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#9E6738] font-semibold mb-1">
                      {item.category}
                    </div>
                    <h4 className="font-serif text-lg text-[#1C1816] font-normal leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#7A7168] mt-1.5 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Informative transparency note */}
        <div className="mt-8 text-center text-xs text-[#8A7F75]">
          Preview slots for The Seven's Hotel. Verified photography dynamically updates through property management.
        </div>
      </div>

      {/* Lightbox Modal with Keyboard Navigation & Fullscreen */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery Image Viewer"
        >
          {/* Top Controls Bar */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-20">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>

            <button
              onClick={handleCloseLightbox}
              className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox (Esc)"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous / Next Controls */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors z-20 cursor-pointer"
                aria-label="Previous Image (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors z-20 cursor-pointer"
                aria-label="Next Image (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Center Lightbox Card */}
          <div
            className={`w-full bg-[#1C1816] rounded-2xl overflow-hidden border border-[#B47A46]/30 shadow-2xl flex flex-col transition-all ${
              isFullscreen ? 'max-w-6xl max-h-[95vh]' : 'max-w-4xl max-h-[85vh]'
            }`}
          >
            <div className="w-full flex-1 max-h-[60vh] sm:max-h-[70vh] overflow-hidden flex items-center justify-center bg-[#120F0E]">
              <HotelImage
                src={currentItem.imageUrl}
                alt={currentItem.title}
                category={currentItem.category}
                title={currentItem.title}
                aspectRatio="16:9"
                className="w-full h-full max-h-[65vh] object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-[#1C1816] text-[#FAF7F2] flex items-center justify-between border-t border-[#B47A46]/20">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C89B6A] font-medium block">
                  {currentItem.category} · {selectedItemIndex! + 1} of {filteredItems.length}
                </span>
                <h3 className="font-serif text-lg sm:text-xl mt-0.5 text-white font-normal">{currentItem.title}</h3>
                <p className="text-xs text-[#D8CEBF]/80 mt-1">{currentItem.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
