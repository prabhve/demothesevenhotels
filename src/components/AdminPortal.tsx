import React, { useState, useRef } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  Building,
  BedDouble,
  Utensils,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  MapPin,
  FileText,
  Search,
  Plus,
  Trash2,
  CheckCircle,
  Video,
  Eye,
  ExternalLink,
} from 'lucide-react';
import { Room, Amenity, NearbyAttraction, Testimonial, GalleryItem } from '../data/hotelData';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const {
    hotelInfo,
    contactInfo,
    bookingSettings,
    rooms,
    amenities,
    diningInfo,
    nearbyPlaces,
    testimonials,
    galleryItems,
    hotelPolicies,
    seoSettings,
    updateHotelInfo,
    updateContactInfo,
    updateBookingSettings,
    updateRooms,
    updateAmenities,
    updateDiningInfo,
    updateNearbyPlaces,
    updateTestimonials,
    updateGalleryItems,
    updateHotelPolicies,
    updateSeoSettings,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
  } = useHotelData();

  const [activeTab, setActiveTab] = useState<
    | 'general'
    | 'rooms'
    | 'dining'
    | 'facilities'
    | 'gallery'
    | 'testimonials'
    | 'nearby'
    | 'policies'
    | 'seo'
    | 'backup'
  >('general');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!isOpen) return null;

  // Media upload helper
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          onSuccess(loadEvt.target.result as string);
          showToast(`File "${file.name}" uploaded successfully!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    const json = exportConfigJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sevens_hotel_cms_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Configuration exported as JSON!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        const success = importConfigJson(text);
        if (success) {
          showToast('Configuration imported successfully!');
        } else {
          alert('Failed to parse the imported JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#120F0E] text-[#F5F2EB] flex flex-col font-sans overflow-hidden animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-60 bg-[#25D366] text-[#120F0E] font-semibold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm border border-white/20 animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation Bar */}
      <header className="bg-[#1C1816] border-b border-[#B47A46]/30 px-6 py-4 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#C89B6A] text-[#120F0E] font-serif font-bold text-xl flex items-center justify-center">
            7
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-semibold uppercase tracking-wider">
                The Seven's Hotel — Management CMS
              </h1>
              <span className="hidden sm:inline-block text-[11px] bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 px-2.5 py-0.5 rounded-full font-medium">
                Live Sync Enabled
              </span>
            </div>
            <p className="text-xs text-[#A89C8F]">
              Direct property editor for rooms, tariffs, dining, verified amenities, photos & SEO
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleExport}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#2A231F] hover:bg-[#352D28] text-[#D8CEBF] rounded-lg border border-[#B47A46]/30 transition-colors"
            title="Export full configuration"
          >
            <Download className="w-3.5 h-3.5 text-[#C89B6A]" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => {
              onClose();
              showToast('Changes saved to live view!');
            }}
            className="px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-[#D8CEBF] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Exit CMS Portal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main CMS Layout (Sidebar + Content Workspace) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#181412] border-r border-[#B47A46]/20 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#C89B6A] font-semibold">
              Content Sections
            </div>

            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                activeTab === 'general'
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Property & Contact</span>
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                activeTab === 'rooms'
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
              }`}
            >
              <BedDouble className="w-4 h-4" />
              <span>Rooms & Tariffs ({rooms.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('dining')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                activeTab === 'dining'
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Flavours Dining</span>
            </button>

            <button
              onClick={() => setActiveTab('facilities')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                activeTab === 'facilities'
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Verified Facilities ({amenities.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                activeTab === 'gallery'
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photos & Videos ({galleryItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                activeTab === 'testimonials'
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Guest Reviews ({testimonials.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('nearby')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                activeTab === 'nearby'
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Varanasi Attractions</span>
            </button>

            <button
              onClick={() => setActiveTab('policies')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                activeTab === 'policies'
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Hotel Policies</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                activeTab === 'seo'
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>SEO & Metadata</span>
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="p-4 border-t border-[#B47A46]/20 space-y-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all CMS content to official verified property defaults?')) {
                  resetToDefaults();
                  showToast('Reset to property defaults!');
                }
              }}
              className="w-full py-2 px-3 text-[11px] uppercase tracking-wider text-[#D8CEBF] hover:text-white bg-[#251F1C] hover:bg-[#302723] rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C89B6A]" />
              <span>Reset Defaults</span>
            </button>

            <label className="w-full py-2 px-3 text-[11px] uppercase tracking-wider text-[#D8CEBF] hover:text-white bg-[#251F1C] hover:bg-[#302723] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-[#C89B6A]" />
              <span>Import Config</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>
        </aside>

        {/* Workspace Area */}
        <main className="flex-1 bg-[#151210] p-6 lg:p-10 overflow-y-auto">
          {/* TAB 1: PROPERTY & CONTACT */}
          {activeTab === 'general' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              <div>
                <h2 className="font-serif text-2xl text-[#FAF7F2]">Property & Contact Details</h2>
                <p className="text-xs text-[#A89C8F] mt-1">
                  Manage core address, Google listing phones, email and check-in timings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-[#1C1816] p-6 rounded-xl border border-[#B47A46]/20">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Hotel Name</label>
                  <input
                    type="text"
                    value={hotelInfo.name}
                    onChange={(e) => updateHotelInfo({ name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Property Category</label>
                  <input
                    type="text"
                    value={hotelInfo.category}
                    onChange={(e) => updateHotelInfo({ category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Full Address</label>
                  <textarea
                    rows={2}
                    value={hotelInfo.address}
                    onChange={(e) => updateHotelInfo({ address: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Primary Phone</label>
                  <input
                    type="text"
                    value={contactInfo.primaryPhone}
                    onChange={(e) => updateContactInfo({ primaryPhone: e.target.value, primaryPhoneRaw: e.target.value.replace(/[^0-9+]/g, '') })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Alternate Contact</label>
                  <input
                    type="text"
                    value={contactInfo.alternatePhone}
                    onChange={(e) => updateContactInfo({ alternatePhone: e.target.value, alternatePhoneRaw: e.target.value.replace(/[^0-9+]/g, '') })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Official Email</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => updateContactInfo({ email: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">WhatsApp Booking Number</label>
                  <input
                    type="text"
                    value={contactInfo.whatsappNumber}
                    onChange={(e) => updateContactInfo({ whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Check-In Time</label>
                  <input
                    type="text"
                    value={hotelInfo.checkInTime}
                    onChange={(e) => updateHotelInfo({ checkInTime: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Check-Out Time</label>
                  <input
                    type="text"
                    value={hotelInfo.checkOutTime}
                    onChange={(e) => updateHotelInfo({ checkOutTime: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROOMS & TARIFFS */}
          {activeTab === 'rooms' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#FAF7F2]">Rooms & Reference Tariffs</h2>
                  <p className="text-xs text-[#A89C8F] mt-1">
                    Upload room photos/videos, update base prices, amenities and room descriptions.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newRoom: Room = {
                      id: `room-${Date.now()}`,
                      name: 'Executive Suite Room',
                      basePrice: 5000,
                      badge: 'New Category',
                      description: 'Comfortable contemporary accommodation designed for a convenient stay in Varanasi.',
                      bedType: 'King Bed',
                      occupancy: 'Up to 3 Guests',
                      imageFallbackTitle: 'Executive Modern Room',
                      amenities: ['Air Conditioning', 'Free High-Speed Wi-Fi', 'Room Service', 'Private Bathroom', 'Elevator Access'],
                    };
                    updateRooms([...rooms, newRoom]);
                    showToast('New room category added!');
                  }}
                  className="px-4 py-2 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Room Category</span>
                </button>
              </div>

              <div className="space-y-6">
                {rooms.map((room, idx) => (
                  <div
                    key={room.id}
                    className="bg-[#1C1816] p-6 rounded-xl border border-[#B47A46]/20 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#B47A46]/15">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg text-[#FAF7F2] font-semibold">
                          #{idx + 1} {room.name}
                        </span>
                        {room.badge && (
                          <span className="text-[10px] bg-[#C89B6A]/20 text-[#C89B6A] border border-[#C89B6A]/40 px-2 py-0.5 rounded">
                            {room.badge}
                          </span>
                        )}
                      </div>

                      {rooms.length > 1 && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${room.name}?`)) {
                              updateRooms(rooms.filter((r) => r.id !== room.id));
                              showToast('Room category removed.');
                            }
                          }}
                          className="text-red-400 hover:text-red-300 p-1.5"
                          title="Delete room category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider text-[#C89B6A]">Room Name</label>
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => {
                            const updated = [...rooms];
                            updated[idx].name = e.target.value;
                            updateRooms(updated);
                          }}
                          className="w-full px-3 py-1.5 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider text-[#C89B6A]">Base Tariff (₹)</label>
                        <input
                          type="number"
                          value={room.basePrice}
                          onChange={(e) => {
                            const updated = [...rooms];
                            updated[idx].basePrice = Number(e.target.value) || 0;
                            updateRooms(updated);
                          }}
                          className="w-full px-3 py-1.5 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider text-[#C89B6A]">Highlight Tag</label>
                        <input
                          type="text"
                          value={room.badge || ''}
                          onChange={(e) => {
                            const updated = [...rooms];
                            updated[idx].badge = e.target.value;
                            updateRooms(updated);
                          }}
                          className="w-full px-3 py-1.5 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    {/* Room Media Upload */}
                    <div className="p-4 bg-[#251F1C] rounded-lg border border-[#B47A46]/15 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-[#D8CEBF] font-semibold flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-[#C89B6A]" />
                          Room Photo / Video URL or Upload
                        </span>
                        {room.imageUrl && (
                          <button
                            onClick={() => {
                              const updated = [...rooms];
                              delete updated[idx].imageUrl;
                              updateRooms(updated);
                              showToast('Custom photo removed.');
                            }}
                            className="text-xs text-red-400 hover:underline"
                          >
                            Remove Custom Photo
                          </button>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          placeholder="Paste image URL (https://...) or upload directly"
                          value={room.imageUrl || ''}
                          onChange={(e) => {
                            const updated = [...rooms];
                            updated[idx].imageUrl = e.target.value;
                            updateRooms(updated);
                          }}
                          className="flex-1 px-3 py-2 text-xs bg-[#1C1816] border border-[#B47A46]/30 rounded-lg text-white w-full"
                        />

                        <label className="px-4 py-2 text-xs bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold rounded-lg cursor-pointer whitespace-nowrap flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) =>
                              handleFileUpload(e, (dataUrl) => {
                                const updated = [...rooms];
                                updated[idx].imageUrl = dataUrl;
                                updateRooms(updated);
                              })
                            }
                            className="hidden"
                          />
                        </label>
                      </div>

                      {room.imageUrl && (
                        <div className="h-28 w-44 rounded-lg overflow-hidden border border-[#B47A46]/30 bg-black mt-2">
                          <img
                            src={room.imageUrl}
                            alt="Room Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-[#C89B6A]">Description</label>
                      <textarea
                        rows={2}
                        value={room.description}
                        onChange={(e) => {
                          const updated = [...rooms];
                          updated[idx].description = e.target.value;
                          updateRooms(updated);
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DINING & MENUS */}
          {activeTab === 'dining' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              <div>
                <h2 className="font-serif text-2xl text-[#FAF7F2]">Flavours at The Seven's (Dining CMS)</h2>
                <p className="text-xs text-[#A89C8F] mt-1">
                  Manage dining schedules, menu descriptions, cuisines and restaurant highlights.
                </p>
              </div>

              <div className="bg-[#1C1816] p-6 rounded-xl border border-[#B47A46]/20 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Dining Title</label>
                    <input
                      type="text"
                      value={diningInfo.title}
                      onChange={(e) => updateDiningInfo({ title: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Subtitle</label>
                    <input
                      type="text"
                      value={diningInfo.subtitle}
                      onChange={(e) => updateDiningInfo({ subtitle: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Description</label>
                  <textarea
                    rows={3}
                    value={diningInfo.description}
                    onChange={(e) => updateDiningInfo({ description: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                {/* Meal Timings Editor */}
                <div className="space-y-3 pt-4 border-t border-[#B47A46]/15">
                  <span className="text-xs uppercase tracking-wider text-[#C89B6A] font-semibold block">
                    Meal Timings & Services
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {diningInfo.mealTimings.map((meal, idx) => (
                      <div key={idx} className="bg-[#251F1C] p-3 rounded-lg border border-[#B47A46]/20 space-y-2">
                        <input
                          type="text"
                          value={meal.meal}
                          onChange={(e) => {
                            const updated = [...diningInfo.mealTimings];
                            updated[idx].meal = e.target.value;
                            updateDiningInfo({ mealTimings: updated });
                          }}
                          className="w-full font-semibold text-xs bg-[#1C1816] px-2 py-1 rounded text-white"
                        />
                        <input
                          type="text"
                          value={meal.time}
                          onChange={(e) => {
                            const updated = [...diningInfo.mealTimings];
                            updated[idx].time = e.target.value;
                            updateDiningInfo({ mealTimings: updated });
                          }}
                          className="w-full text-xs bg-[#1C1816] px-2 py-1 rounded text-[#D8CEBF]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FACILITIES */}
          {activeTab === 'facilities' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#FAF7F2]">Verified Facilities & Amenities</h2>
                  <p className="text-xs text-[#A89C8F] mt-1">
                    Manage real, verified property amenities available for resident guests.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newAmenity: Amenity = {
                      name: 'Hot Water Supply',
                      category: 'comfort',
                      icon: 'Wind',
                      description: '24-hour continuous hot water supply available in all guest bathrooms.',
                    };
                    updateAmenities([...amenities, newAmenity]);
                    showToast('New amenity added!');
                  }}
                  className="px-4 py-2 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Facility</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {amenities.map((item, idx) => (
                  <div key={idx} className="bg-[#1C1816] p-4 rounded-xl border border-[#B47A46]/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...amenities];
                          updated[idx].name = e.target.value;
                          updateAmenities(updated);
                        }}
                        className="font-serif text-sm font-semibold text-white bg-transparent border-b border-[#B47A46]/30 pb-1 w-full mr-2"
                      />
                      <button
                        onClick={() => {
                          updateAmenities(amenities.filter((_, i) => i !== idx));
                          showToast('Facility removed.');
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...amenities];
                        updated[idx].description = e.target.value;
                        updateAmenities(updated);
                      }}
                      className="w-full text-xs text-[#D8CEBF] bg-[#251F1C] p-2 rounded border border-[#B47A46]/20"
                    />

                    <select
                      value={item.category}
                      onChange={(e) => {
                        const updated = [...amenities];
                        updated[idx].category = e.target.value as Amenity['category'];
                        updateAmenities(updated);
                      }}
                      className="text-xs bg-[#251F1C] px-2 py-1 rounded text-[#C89B6A]"
                    >
                      <option value="comfort">Comfort</option>
                      <option value="service">Service</option>
                      <option value="connectivity">Connectivity</option>
                      <option value="convenience">Convenience</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY & MEDIA CMS */}
          {activeTab === 'gallery' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#FAF7F2]">Media Gallery & Videos</h2>
                  <p className="text-xs text-[#A89C8F] mt-1">
                    Upload photos and video clips, categorize into Exterior, Rooms, Reception, Interiors, Dining, Surroundings.
                  </p>
                </div>
                <label className="px-4 py-2 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo / Video</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) =>
                      handleFileUpload(e, (dataUrl) => {
                        const newItem: GalleryItem = {
                          id: `gal-${Date.now()}`,
                          category: 'Exterior',
                          title: 'Property Photo',
                          caption: 'Verified authentic photo from The Seven\'s Hotel.',
                          imageUrl: dataUrl,
                        };
                        updateGalleryItems([newItem, ...galleryItems]);
                      })
                    }
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {galleryItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-[#1C1816] rounded-xl overflow-hidden border border-[#B47A46]/20 flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] bg-black relative flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <ImageIcon className="w-8 h-8 text-[#C89B6A] mx-auto mb-1" />
                          <span className="text-[11px] text-[#A89C8F]">Architectural Render</span>
                        </div>
                      )}

                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => {
                            updateGalleryItems(galleryItems.filter((_, i) => i !== idx));
                            showToast('Photo removed.');
                          }}
                          className="p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <select
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...galleryItems];
                          updated[idx].category = e.target.value as GalleryItem['category'];
                          updateGalleryItems(updated);
                        }}
                        className="text-xs bg-[#251F1C] px-2 py-1 rounded text-[#C89B6A] w-full"
                      >
                        <option value="Exterior">Exterior</option>
                        <option value="Rooms">Rooms</option>
                        <option value="Reception">Reception</option>
                        <option value="Interiors">Interiors</option>
                        <option value="Dining">Dining</option>
                        <option value="Surroundings">Surroundings</option>
                      </select>

                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...galleryItems];
                          updated[idx].title = e.target.value;
                          updateGalleryItems(updated);
                        }}
                        className="w-full font-serif text-sm bg-[#251F1C] px-2 py-1 rounded text-white"
                        placeholder="Photo Title"
                      />

                      <textarea
                        rows={2}
                        value={item.caption}
                        onChange={(e) => {
                          const updated = [...galleryItems];
                          updated[idx].caption = e.target.value;
                          updateGalleryItems(updated);
                        }}
                        className="w-full text-xs text-[#D8CEBF] bg-[#251F1C] p-2 rounded border border-[#B47A46]/20"
                        placeholder="Caption"
                      />

                      <label className="text-[11px] uppercase tracking-wider text-[#C89B6A] hover:underline flex items-center gap-1 cursor-pointer pt-1">
                        <Upload className="w-3 h-3" />
                        <span>Replace Media</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={(e) =>
                            handleFileUpload(e, (dataUrl) => {
                              const updated = [...galleryItems];
                              updated[idx].imageUrl = dataUrl;
                              updateGalleryItems(updated);
                            })
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: GUEST REVIEWS */}
          {activeTab === 'testimonials' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#FAF7F2]">Guest Reviews CMS</h2>
                  <p className="text-xs text-[#A89C8F] mt-1">
                    Manage authentic verified guest feedback, ratings and observations.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newReview: Testimonial = {
                      id: `rev-${Date.now()}`,
                      author: 'Guest Reviewer',
                      stayDate: 'Recent Stay',
                      rating: 5,
                      highlight: 'Comfortable & clean room near Assi',
                      comment: 'The hotel is conveniently located with polite staff and comfortable beds.',
                      source: 'Verified Guest Review',
                    };
                    updateTestimonials([...testimonials, newReview]);
                    showToast('New review added!');
                  }}
                  className="px-4 py-2 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.map((t, idx) => (
                  <div key={t.id} className="bg-[#1C1816] p-5 rounded-xl border border-[#B47A46]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={t.author}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx].author = e.target.value;
                          updateTestimonials(updated);
                        }}
                        className="font-semibold text-sm text-white bg-transparent border-b border-[#B47A46]/30 pb-1"
                        placeholder="Guest Name"
                      />
                      <button
                        onClick={() => {
                          updateTestimonials(testimonials.filter((_, i) => i !== idx));
                          showToast('Review removed.');
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={t.stayDate}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx].stayDate = e.target.value;
                          updateTestimonials(updated);
                        }}
                        className="text-xs bg-[#251F1C] px-2 py-1 rounded text-[#D8CEBF]"
                        placeholder="Stay Type"
                      />
                      <select
                        value={t.rating}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx].rating = Number(e.target.value);
                          updateTestimonials(updated);
                        }}
                        className="text-xs bg-[#251F1C] px-2 py-1 rounded text-[#C89B6A]"
                      >
                        <option value={5}>5 Stars ★★★★★</option>
                        <option value={4}>4 Stars ★★★★☆</option>
                        <option value={3}>3 Stars ★★★☆☆</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      value={t.highlight}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[idx].highlight = e.target.value;
                        updateTestimonials(updated);
                      }}
                      className="w-full font-serif text-sm bg-[#251F1C] px-2 py-1 rounded text-white"
                      placeholder="Highlight Quote"
                    />

                    <textarea
                      rows={3}
                      value={t.comment}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[idx].comment = e.target.value;
                        updateTestimonials(updated);
                      }}
                      className="w-full text-xs text-[#D8CEBF] bg-[#251F1C] p-2 rounded border border-[#B47A46]/20"
                      placeholder="Full review text..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: NEARBY ATTRACTIONS */}
          {activeTab === 'nearby' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              <div>
                <h2 className="font-serif text-2xl text-[#FAF7F2]">Varanasi Attractions & Landmarks</h2>
                <p className="text-xs text-[#A89C8F] mt-1">
                  Manage nearby spiritual ghats and cultural destinations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nearbyPlaces.map((place, idx) => (
                  <div key={idx} className="bg-[#1C1816] p-4 rounded-xl border border-[#B47A46]/20 space-y-2">
                    <input
                      type="text"
                      value={place.name}
                      onChange={(e) => {
                        const updated = [...nearbyPlaces];
                        updated[idx].name = e.target.value;
                        updateNearbyPlaces(updated);
                      }}
                      className="font-serif text-base text-white bg-transparent border-b border-[#B47A46]/30 pb-1 w-full"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={place.type}
                        onChange={(e) => {
                          const updated = [...nearbyPlaces];
                          updated[idx].type = e.target.value;
                          updateNearbyPlaces(updated);
                        }}
                        className="text-xs bg-[#251F1C] px-2 py-1 rounded text-[#C89B6A]"
                        placeholder="Landmark Category"
                      />
                      <input
                        type="text"
                        value={place.proximityNote}
                        onChange={(e) => {
                          const updated = [...nearbyPlaces];
                          updated[idx].proximityNote = e.target.value;
                          updateNearbyPlaces(updated);
                        }}
                        className="text-xs bg-[#251F1C] px-2 py-1 rounded text-[#D8CEBF]"
                        placeholder="Proximity Note"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={place.description}
                      onChange={(e) => {
                        const updated = [...nearbyPlaces];
                        updated[idx].description = e.target.value;
                        updateNearbyPlaces(updated);
                      }}
                      className="w-full text-xs text-[#D8CEBF] bg-[#251F1C] p-2 rounded border border-[#B47A46]/20"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: POLICIES */}
          {activeTab === 'policies' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              <div>
                <h2 className="font-serif text-2xl text-[#FAF7F2]">Hotel Policies & ID Requirements</h2>
                <p className="text-xs text-[#A89C8F] mt-1">
                  Manage check-in, check-out guidelines and property rules.
                </p>
              </div>

              <div className="bg-[#1C1816] p-6 rounded-xl border border-[#B47A46]/20 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Check-In Schedule</label>
                    <input
                      type="text"
                      value={hotelPolicies.checkIn}
                      onChange={(e) => updateHotelPolicies({ ...hotelPolicies, checkIn: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Check-Out Schedule</label>
                    <input
                      type="text"
                      value={hotelPolicies.checkOut}
                      onChange={(e) => updateHotelPolicies({ ...hotelPolicies, checkOut: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#B47A46]/15">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A] font-semibold block">
                    Policy Disclaimers & Notes
                  </label>
                  {hotelPolicies.bookingNotes.map((note, idx) => (
                    <textarea
                      key={idx}
                      rows={2}
                      value={note}
                      onChange={(e) => {
                        const updated = [...hotelPolicies.bookingNotes];
                        updated[idx] = e.target.value;
                        updateHotelPolicies({ ...hotelPolicies, bookingNotes: updated });
                      }}
                      className="w-full text-xs text-[#D8CEBF] bg-[#251F1C] p-2.5 rounded-lg border border-[#B47A46]/20"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SEO & METADATA */}
          {activeTab === 'seo' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
              <div>
                <h2 className="font-serif text-2xl text-[#FAF7F2]">Search Engine Optimization (SEO) & Social Cards</h2>
                <p className="text-xs text-[#A89C8F] mt-1">
                  Optimize title, meta description, and keywords for top Google search visibility.
                </p>
              </div>

              <div className="bg-[#1C1816] p-6 rounded-xl border border-[#B47A46]/20 space-y-5">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Page Title</label>
                  <input
                    type="text"
                    value={seoSettings.title}
                    onChange={(e) => updateSeoSettings({ title: e.target.value, ogTitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoSettings.description}
                    onChange={(e) => updateSeoSettings({ description: e.target.value, ogDescription: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Target Search Keywords</label>
                  <textarea
                    rows={3}
                    value={seoSettings.keywords}
                    onChange={(e) => updateSeoSettings({ keywords: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
