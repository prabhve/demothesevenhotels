import React, { useState } from 'react';
import { galleryItems, GalleryItem } from '../data/hotelData';
import { HotelImage } from './HotelImage';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const categories = ['All', 'Exterior', 'Rooms', 'Reception', 'Interiors', 'Dining', 'Surroundings'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedItemIndex(null);
  };

  const handleNext = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-[#F8F6F0] text-[#24201D] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Visual Showcase</span>
              <span aria-hidden="true">·</span>
              <span>The Property</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
              Property Gallery
            </h2>
            <p className="text-sm text-[#665D55] mt-2 max-w-xl">
              Glimpses of accommodations, dining facilities, and common spaces at The Seven's Hotel.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EBE5DC] rounded-lg overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-[#E8DFD5] bg-[#FFFFFF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <HotelImage
                  src={item.imageUrl}
                  alt={item.title}
                  category={item.category}
                  title={item.title}
                  aspectRatio="4:3"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#1C1816] flex items-center justify-center shadow-lg">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FFFFFF] border-t border-[#F2ECE4]">
                <div className="text-[11px] uppercase tracking-wider text-[#9E6738] font-semibold mb-1">
                  {item.category}
                </div>
                <h4 className="font-serif text-base text-[#1C1816] font-normal leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-[#7A7168] mt-1 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency note */}
        <div className="mt-8 text-center text-xs text-[#8A7F75]">
          Curated preview spaces for The Seven's Hotel. Verified official property photography will dynamically populate upon publication.
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={handleCloseLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Modal Container */}
          <div className="max-w-4xl w-full bg-[#1C1816] rounded-2xl overflow-hidden border border-[#B47A46]/30 shadow-2xl flex flex-col">
            <div className="w-full max-h-[65vh] overflow-hidden flex items-center justify-center bg-[#151210]">
              <HotelImage
                src={currentItem.imageUrl}
                alt={currentItem.title}
                category={currentItem.category}
                title={currentItem.title}
                aspectRatio="16:9"
                className="w-full h-full max-h-[65vh]"
              />
            </div>
            <div className="p-6 bg-[#1C1816] text-[#FAF7F2] flex items-center justify-between border-t border-[#B47A46]/20">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C89B6A] font-medium">
                  {currentItem.category} · {selectedItemIndex! + 1} of {filteredItems.length}
                </span>
                <h3 className="font-serif text-xl mt-0.5">{currentItem.title}</h3>
                <p className="text-xs text-[#D8CEBF]/80 mt-1">{currentItem.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
