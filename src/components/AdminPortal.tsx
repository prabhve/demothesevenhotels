import React, { useState } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { fileUploadService } from '../services/fileUploadService';
import {
  X,
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
  Eye,
  Copy,
  ArrowUp,
  ArrowDown,
  Check,
  Sliders,
  Camera,
  BookOpen,
  Edit3,
  Loader2,
  Menu,
} from 'lucide-react';
import { Room, Amenity, Testimonial, GalleryItem, MenuItem } from '../data/hotelData';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const standardAmenitiesList = [
  'Air Conditioning',
  'Free High-Speed Wi-Fi',
  'Room Service',
  'Private Bathroom',
  '24h Hot Water',
  'Daily Housekeeping',
  'Elevator Access',
  'Sitting Area & Desk',
  'Spacious Seating Area',
  'Large Bathroom',
  'Electric Kettle / Tea Maker',
  'Wardrobe & Luggage Rack',
];

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const {
    hotelInfo,
    contactInfo,
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
    | 'rooms'
    | 'dining'
    | 'general'
    | 'gallery'
    | 'facilities'
    | 'testimonials'
    | 'nearby'
    | 'policies'
    | 'seo'
  >('rooms');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [uploadingProgress, setUploadingProgress] = useState<number | null>(null);
  const [activeUploadSlot, setActiveUploadSlot] = useState<string | null>(null);

  // Form State for Room Modal (Add/Edit)
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Form State for Dish Modal (Add/Edit Dining Item)
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!isOpen) return null;

  // File Upload via Mock FileUpload Service
  const handleMediaUpload = async (
    file: File,
    slotId: string,
    onSuccess: (uploadedUrl: string) => void
  ) => {
    try {
      setActiveUploadSlot(slotId);
      setUploadingProgress(10);
      const mediaItem = await fileUploadService.uploadMedia(file, (percent) => {
        setUploadingProgress(percent);
      });
      onSuccess(mediaItem.url);
      showToast(`Uploaded "${mediaItem.filename}" successfully!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed.';
      alert(msg);
    } finally {
      setUploadingProgress(null);
      setActiveUploadSlot(null);
    }
  };

  // Batch Multi-Upload for Gallery
  const handleBatchGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingProgress(20);
    const newItems: GalleryItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const uploaded = await fileUploadService.uploadMedia(file);
        const rawName = file.name.replace(/\.[^/.]+$/, '');
        const cleanTitle = rawName
          .split(/[-_]/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        newItems.push({
          id: `gal-upload-${Date.now()}-${i}`,
          category: 'Exterior',
          title: cleanTitle || 'Property Visual',
          caption: `Authentic verified photo uploaded via CMS.`,
          imageUrl: uploaded.url,
        });
      } catch (err) {
        console.error('Batch upload item failed:', err);
      }
    }

    setUploadingProgress(null);
    if (newItems.length > 0) {
      updateGalleryItems([...newItems, ...galleryItems]);
      showToast(`${newItems.length} photo(s) uploaded to gallery!`);
    }
  };

  const handleExport = () => {
    const json = exportConfigJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `the_sevens_hotel_cms_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Configuration exported as JSON backup!');
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
          alert('Failed to parse the imported JSON configuration file.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Reorder helper
  const moveRoom = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= rooms.length) return;
    const newRooms = [...rooms];
    const temp = newRooms[index];
    newRooms[index] = newRooms[targetIndex];
    newRooms[targetIndex] = temp;
    updateRooms(newRooms);
    showToast('Room order updated.');
  };

  // Bulk tariff adjuster
  const adjustTariffs = (percentage: number) => {
    const updated = rooms.map((r) => ({
      ...r,
      basePrice: Math.round(r.basePrice * (1 + percentage / 100)),
    }));
    updateRooms(updated);
    showToast(`All room prices adjusted by ${percentage > 0 ? '+' : ''}${percentage}%!`);
  };

  // Save Room Modal Form
  const handleSaveRoomForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;

    const existingIndex = rooms.findIndex((r) => r.id === editingRoom.id);
    if (existingIndex !== -1) {
      const updated = [...rooms];
      updated[existingIndex] = editingRoom;
      updateRooms(updated);
      showToast(`Saved changes to "${editingRoom.name}"!`);
    } else {
      updateRooms([...rooms, editingRoom]);
      showToast(`Created room "${editingRoom.name}"!`);
    }
    setRoomModalOpen(false);
    setEditingRoom(null);
  };

  // Save Dish Modal Form
  const handleSaveDishForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish) return;

    const currentDishes = diningInfo.menuItems || [];
    const existingIndex = currentDishes.findIndex((d) => d.id === editingDish.id);

    let updatedDishes: MenuItem[];
    if (existingIndex !== -1) {
      updatedDishes = [...currentDishes];
      updatedDishes[existingIndex] = editingDish;
      showToast(`Saved menu item "${editingDish.name}"!`);
    } else {
      updatedDishes = [...currentDishes, editingDish];
      showToast(`Added "${editingDish.name}" to menu!`);
    }

    updateDiningInfo({ menuItems: updatedDishes });
    setDishModalOpen(false);
    setEditingDish(null);
  };

  const navItems = [
    { id: 'rooms', label: 'Rooms & Tariffs', count: rooms.length, icon: BedDouble },
    { id: 'dining', label: 'Dining & Menus', count: diningInfo.menuItems?.length || 0, icon: Utensils },
    { id: 'general', label: 'Property & Contacts', icon: Building },
    { id: 'gallery', label: 'Media Gallery', count: galleryItems.length, icon: ImageIcon },
    { id: 'facilities', label: 'Facilities', count: amenities.length, icon: Sparkles },
    { id: 'testimonials', label: 'Guest Reviews', count: testimonials.length, icon: MessageSquare },
    { id: 'nearby', label: 'Varanasi Attractions', icon: MapPin },
    { id: 'policies', label: 'Hotel Policies', icon: FileText },
    { id: 'seo', label: 'SEO & Metadata', icon: Search },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 bg-[#120F0E] text-[#F5F2EB] flex flex-col font-sans overflow-hidden animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-70 bg-[#25D366] text-[#120F0E] font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm border border-white/20 animate-bounce">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation Bar (Responsive on Mobile) */}
      <header className="bg-[#1C1816] border-b border-[#B47A46]/30 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#D8CEBF] hover:text-white hover:bg-white/10 rounded-lg shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#C89B6A]" />}
          </button>

          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#C89B6A] text-[#120F0E] font-serif font-bold text-base sm:text-xl flex items-center justify-center shrink-0 shadow-xs">
            7
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-sm sm:text-lg lg:text-xl text-[#FAF7F2] font-semibold uppercase tracking-wider truncate">
                The Seven's CMS
              </h1>
              <span className="hidden lg:inline-block text-[10px] bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 px-2 py-0.5 rounded-full font-medium">
                Live Sync
              </span>
            </div>
            <p className="hidden sm:block text-xs text-[#A89C8F] truncate">
              Direct property editor for rooms, menus, media & tariffs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={handleExport}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#2A231F] hover:bg-[#352D28] text-[#D8CEBF] rounded-lg border border-[#B47A46]/30 transition-colors cursor-pointer"
            title="Export full backup configuration"
          >
            <Download className="w-3.5 h-3.5 text-[#C89B6A]" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => {
              onClose();
              showToast('Changes active on live website!');
            }}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-semibold bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] rounded-lg shadow-sm transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer shrink-0"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>View Site</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-[#D8CEBF] hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Exit CMS Portal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Navigation Tabs (Quick Scrollable Bar) */}
      <div className="md:hidden bg-[#181412] border-b border-[#B47A46]/20 px-2 py-2 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 ${
                isActive
                  ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                  : 'bg-[#251F1C] text-[#D8CEBF] hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
              {'count' in item && <span className="opacity-70 text-[10px]">({item.count})</span>}
            </button>
          );
        })}
      </div>

      {/* Main CMS Layout (Sidebar + Workspace) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Sidebar / Mobile Slide-Over Drawer */}
        <aside
          className={`
            fixed md:relative inset-y-0 left-0 z-40 md:z-auto
            w-64 bg-[#181412] border-r border-[#B47A46]/20 flex flex-col justify-between shrink-0 overflow-y-auto
            transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#C89B6A] font-semibold flex items-center justify-between">
              <span>Management Suites</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden text-[#D8CEBF] hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#C89B6A] text-[#120F0E] font-semibold shadow-xs'
                      : 'text-[#D8CEBF] hover:bg-[#251F1C] hover:text-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {'count' in item && (
                    <span className="text-[11px] opacity-80 font-mono shrink-0 ml-1">{item.count}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Backup Controls */}
          <div className="p-4 border-t border-[#B47A46]/20 space-y-2 shrink-0">
            <button
              onClick={() => {
                if (window.confirm('Reset all CMS content to verified property defaults?')) {
                  resetToDefaults();
                  showToast('Reset to property defaults!');
                }
              }}
              className="w-full py-2 px-3 text-[11px] uppercase tracking-wider text-[#D8CEBF] hover:text-white bg-[#251F1C] hover:bg-[#302723] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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

        {/* Backdrop for mobile drawer */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
          />
        )}

        {/* Workspace Area (Fully Mobile-Responsive) */}
        <main className="flex-1 w-full min-w-0 bg-[#151210] p-4 sm:p-6 lg:p-10 overflow-y-auto overflow-x-hidden">
          {/* TAB 1: ROOMS & TARIFFS CRUD */}
          {activeTab === 'rooms' && (
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#FAF7F2] break-words">
                    Room Listings & Tariffs Suite
                  </h2>
                  <p className="text-xs text-[#A89C8F] mt-1">
                    Manage categories, tariffs, media uploads via Mock FileUpload service, and amenity checklists.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingRoom({
                      id: `room-${Date.now()}`,
                      name: 'Executive Suite Room',
                      basePrice: 5000,
                      badge: 'New Category',
                      description: 'Comfortable contemporary accommodation designed for a convenient stay in Varanasi.',
                      bedType: 'King Bed',
                      occupancy: 'Up to 3 Guests',
                      imageFallbackTitle: 'Executive Modern Room',
                      amenities: [
                        'Air Conditioning',
                        'Free High-Speed Wi-Fi',
                        'Room Service',
                        'Private Bathroom',
                        '24h Hot Water',
                        'Elevator Access',
                      ],
                    });
                    setRoomModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>Create Room Category</span>
                </button>
              </div>

              {/* Quick Pricing Adjuster */}
              <div className="bg-[#1C1816] p-4 rounded-xl border border-[#B47A46]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#C89B6A] shrink-0" />
                  <span className="text-xs font-semibold text-[#D8CEBF]">Quick Pricing Adjuster:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => adjustTariffs(10)}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-xs bg-[#251F1C] hover:bg-[#302723] text-[#C89B6A] border border-[#B47A46]/30 rounded-lg cursor-pointer text-center"
                  >
                    +10% Markup
                  </button>
                  <button
                    onClick={() => adjustTariffs(-10)}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-xs bg-[#251F1C] hover:bg-[#302723] text-[#C89B6A] border border-[#B47A46]/30 rounded-lg cursor-pointer text-center"
                  >
                    -10% Discount
                  </button>
                  <button
                    onClick={() => adjustTariffs(20)}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-xs bg-[#251F1C] hover:bg-[#302723] text-[#C89B6A] border border-[#B47A46]/30 rounded-lg cursor-pointer text-center"
                  >
                    +20% Peak
                  </button>
                </div>
              </div>

              {/* Rooms List */}
              <div className="space-y-6">
                {rooms.map((room, idx) => (
                  <div
                    key={room.id}
                    className="bg-[#1C1816] rounded-xl border border-[#B47A46]/25 overflow-hidden shadow-md"
                  >
                    {/* Room Header */}
                    <div className="p-4 sm:p-5 bg-[#201B18] border-b border-[#B47A46]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <span className="text-xs font-serif text-[#C89B6A] font-bold px-2 py-1 bg-[#151210] rounded border border-[#B47A46]/30 shrink-0">
                          0{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-serif text-base sm:text-lg text-[#FAF7F2] font-semibold truncate">
                            {room.name}
                          </h3>
                          <div className="text-xs text-[#A89C8F] flex flex-wrap items-center gap-2 mt-0.5">
                            <span className="font-mono font-medium text-white">₹{room.basePrice.toLocaleString()}</span>
                            <span>·</span>
                            <span>{room.bedType}</span>
                            <span>·</span>
                            <span>{room.occupancy}</span>
                            {room.imageUrl ? (
                              <span className="text-[10px] text-[#25D366] font-medium bg-[#25D366]/10 px-1.5 py-0.5 rounded border border-[#25D366]/30">
                                Custom Media
                              </span>
                            ) : (
                              <span className="text-[10px] text-[#C89B6A] bg-[#C89B6A]/10 px-1.5 py-0.5 rounded border border-[#C89B6A]/30">
                                Placeholder Slot
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                        <button
                          onClick={() => {
                            setEditingRoom({ ...room });
                            setRoomModalOpen(true);
                          }}
                          className="px-2.5 sm:px-3 py-1.5 text-xs bg-[#C89B6A]/20 hover:bg-[#C89B6A]/30 text-[#FAF7F2] border border-[#C89B6A]/40 rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#C89B6A]" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => moveRoom(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 text-[#D8CEBF] hover:text-white disabled:opacity-30 bg-[#151210] rounded border border-[#B47A46]/20 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveRoom(idx, 'down')}
                          disabled={idx === rooms.length - 1}
                          className="p-1.5 text-[#D8CEBF] hover:text-white disabled:opacity-30 bg-[#151210] rounded border border-[#B47A46]/20 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            const duplicated: Room = {
                              ...room,
                              id: `room-${Date.now()}`,
                              name: `${room.name} (Copy)`,
                            };
                            updateRooms([...rooms.slice(0, idx + 1), duplicated, ...rooms.slice(idx + 1)]);
                            showToast(`Duplicated "${room.name}"!`);
                          }}
                          className="p-1.5 text-[#D8CEBF] hover:text-[#C89B6A] bg-[#151210] rounded border border-[#B47A46]/20 cursor-pointer"
                          title="Duplicate Room"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {rooms.length > 1 && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete "${room.name}"?`)) {
                                updateRooms(rooms.filter((r) => r.id !== room.id));
                                showToast('Room deleted.');
                              }
                            }}
                            className="p-1.5 text-red-400 hover:text-red-300 bg-[#151210] rounded border border-red-900/30 cursor-pointer"
                            title="Delete Room"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Room Media Upload Section */}
                    <div className="p-4 sm:p-5 border-t border-[#B47A46]/15 bg-[#1C1816] space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
                        <div className="md:col-span-4 aspect-[4/3] rounded-lg overflow-hidden bg-black border border-[#B47A46]/30 relative flex items-center justify-center max-w-sm mx-auto w-full">
                          {room.imageUrl ? (
                            <img
                              src={room.imageUrl}
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center p-4">
                              <ImageIcon className="w-8 h-8 text-[#C89B6A] mx-auto mb-1 opacity-70" />
                              <span className="text-[10px] uppercase tracking-wider text-[#A89C8F]">
                                Illustration Placeholder
                              </span>
                            </div>
                          )}

                          {activeUploadSlot === `room-${room.id}` && uploadingProgress !== null && (
                            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-3">
                              <Loader2 className="w-6 h-6 text-[#C89B6A] animate-spin mb-2" />
                              <span className="text-xs font-mono">{uploadingProgress}% Uploading...</span>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-8 space-y-3">
                          <span className="text-xs uppercase tracking-wider text-[#C89B6A] font-semibold block">
                            Direct Photo / Video Upload (FileUpload Service)
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="w-full sm:w-auto px-4 py-2 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-xs">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Photo from Device</span>
                              <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleMediaUpload(file, `room-${room.id}`, (url) => {
                                      const updated = [...rooms];
                                      updated[idx].imageUrl = url;
                                      updateRooms(updated);
                                    });
                                  }
                                }}
                                className="hidden"
                              />
                            </label>

                            {room.imageUrl && (
                              <button
                                onClick={() => {
                                  const updated = [...rooms];
                                  delete updated[idx].imageUrl;
                                  updateRooms(updated);
                                  showToast('Reset to placeholder.');
                                }}
                                className="w-full sm:w-auto px-3 py-2 text-xs bg-[#251F1C] hover:bg-red-950 text-red-300 border border-red-900/40 rounded-lg cursor-pointer text-center"
                              >
                                Remove Custom Photo
                              </button>
                            )}
                          </div>

                          <div className="text-xs text-[#8F8375]">
                            Amenities included:{' '}
                            <span className="text-[#D8CEBF]">{room.amenities.slice(0, 4).join(', ')}...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DINING CMS & MENUS */}
          {activeTab === 'dining' && (
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#FAF7F2] break-words">
                    Flavours at The Seven's CMS & Menus
                  </h2>
                  <p className="text-xs text-[#A89C8F] mt-1">
                    Manage dining descriptions, banner imagery, service timings, and in-house restaurant menu items.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingDish({
                      id: `dish-${Date.now()}`,
                      name: 'Special Paneer Tikka',
                      category: 'North Indian Specials',
                      description: 'Marinated cottage cheese cubes grilled with capsicum and onions.',
                      price: 260,
                      dietary: 'Vegetarian',
                      isPopular: true,
                    });
                    setDishModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>Add Menu Dish</span>
                </button>
              </div>

              {/* Dining General Settings Form */}
              <div className="bg-[#1C1816] p-4 sm:p-6 rounded-xl border border-[#B47A46]/20 space-y-5">
                <h3 className="font-serif text-base sm:text-lg text-white font-semibold flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#C89B6A]" />
                  <span>Restaurant Overview & Atmosphere</span>
                </h3>

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

                {/* Banner image upload */}
                <div className="p-4 bg-[#251F1C] rounded-lg border border-[#B47A46]/20 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-20 rounded-lg bg-black overflow-hidden border border-[#B47A46]/30 shrink-0 relative flex items-center justify-center">
                    {diningInfo.imageUrl ? (
                      <img
                        src={diningInfo.imageUrl}
                        alt="Dining"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Utensils className="w-6 h-6 text-[#C89B6A] opacity-60" />
                    )}
                    {activeUploadSlot === 'dining-banner' && uploadingProgress !== null && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-[#C89B6A] animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 flex-1 text-center sm:text-left">
                    <span className="text-xs font-semibold text-[#FAF7F2] block">
                      Dining Restaurant Photo Asset
                    </span>
                    <p className="text-[11px] text-[#A89C8F]">
                      Upload an authentic photo of the indoor dining hall or buffet area.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      <label className="px-3 py-1.5 text-xs bg-[#C89B6A] text-[#120F0E] font-semibold rounded-md cursor-pointer flex items-center gap-1.5">
                        <Upload className="w-3 h-3" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleMediaUpload(file, 'dining-banner', (url) => {
                                updateDiningInfo({ imageUrl: url });
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      {diningInfo.imageUrl && (
                        <button
                          onClick={() => updateDiningInfo({ imageUrl: undefined })}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Meal Timings Editor */}
                <div className="space-y-3 pt-4 border-t border-[#B47A46]/15">
                  <span className="text-xs uppercase tracking-wider text-[#C89B6A] font-semibold block">
                    Meal Timings & Service Schedules
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

              {/* Menu Dishes List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#C89B6A]" />
                    <span>In-House Restaurant Menu Dishes</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(diningInfo.menuItems || []).map((dish) => (
                    <div
                      key={dish.id}
                      className="bg-[#1C1816] p-4 rounded-xl border border-[#B47A46]/20 flex flex-col justify-between hover:border-[#B47A46]/40 transition-colors"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-serif text-base text-white font-semibold">
                            {dish.name}
                          </h4>
                          {dish.price && (
                            <span className="font-mono text-xs font-semibold text-[#C89B6A] bg-[#251F1C] px-2 py-0.5 rounded shrink-0">
                              ₹{dish.price}
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] uppercase tracking-wider text-[#A89C8F] block mb-2">
                          {dish.category} • {dish.dietary || 'Vegetarian'}
                        </span>

                        <p className="text-xs text-[#D8CEBF] leading-relaxed mb-4">
                          {dish.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#B47A46]/15 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            setEditingDish({ ...dish });
                            setDishModalOpen(true);
                          }}
                          className="text-[#C89B6A] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Dish</span>
                        </button>

                        <button
                          onClick={() => {
                            const updated = (diningInfo.menuItems || []).filter((d) => d.id !== dish.id);
                            updateDiningInfo({ menuItems: updated });
                            showToast(`Removed "${dish.name}" from menu.`);
                          }}
                          className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROPERTY & CONTACT DETAILS */}
          {activeTab === 'general' && (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#FAF7F2] break-words">
                  Property & Contact Details Form
                </h2>
                <p className="text-xs text-[#A89C8F] mt-1">
                  Manage core address, Google listing phones, email and check-in timings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 bg-[#1C1816] p-4 sm:p-6 rounded-xl border border-[#B47A46]/20">
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
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Full Postal Address</label>
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
                    onChange={(e) =>
                      updateContactInfo({
                        primaryPhone: e.target.value,
                        primaryPhoneRaw: e.target.value.replace(/[^0-9+]/g, ''),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Alternate Contact Phone</label>
                  <input
                    type="text"
                    value={contactInfo.alternatePhone}
                    onChange={(e) =>
                      updateContactInfo({
                        alternatePhone: e.target.value,
                        alternatePhoneRaw: e.target.value.replace(/[^0-9+]/g, ''),
                      })
                    }
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

          {/* TAB 4: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#FAF7F2] break-words">
                    Media Gallery Suite
                  </h2>
                  <p className="text-xs text-[#A89C8F] mt-1">
                    Upload photos using Mock FileUpload service, organize into categories, and edit captions.
                  </p>
                </div>

                <label className="w-full sm:w-auto px-4 py-2.5 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0">
                  <Upload className="w-4 h-4" />
                  <span>Batch Upload Photos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleBatchGalleryUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Gallery Filter & Grid */}
              <div className="bg-[#1C1816] p-3 sm:p-4 rounded-xl border border-[#B47A46]/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {['All', 'Exterior', 'Rooms', 'Reception', 'Interiors', 'Dining', 'Surroundings'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryCategoryFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer shrink-0 ${
                      galleryCategoryFilter === cat
                        ? 'bg-[#C89B6A] text-[#120F0E] font-semibold'
                        : 'bg-[#251F1C] text-[#D8CEBF] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {galleryItems
                  .filter((item) => galleryCategoryFilter === 'All' || item.category === galleryCategoryFilter)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#1C1816] rounded-xl overflow-hidden border border-[#B47A46]/25 flex flex-col justify-between shadow-md"
                    >
                      <div className="aspect-[4/3] bg-black relative flex items-center justify-center overflow-hidden">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-6">
                            <ImageIcon className="w-10 h-10 text-[#C89B6A] mx-auto mb-2 opacity-60" />
                            <span className="text-xs text-[#D8CEBF] block font-serif">Illustration Slot</span>
                          </div>
                        )}

                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          <button
                            onClick={() => {
                              updateGalleryItems(galleryItems.filter((g) => g.id !== item.id));
                              showToast('Media removed.');
                            }}
                            className="p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-md transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 space-y-2.5">
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...galleryItems];
                            const realIdx = galleryItems.findIndex((g) => g.id === item.id);
                            if (realIdx !== -1) {
                              updated[realIdx].category = e.target.value as GalleryItem['category'];
                              updateGalleryItems(updated);
                            }
                          }}
                          className="w-full text-xs bg-[#251F1C] border border-[#B47A46]/30 px-2 py-1.5 rounded-lg text-[#C89B6A] font-semibold"
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
                            const realIdx = galleryItems.findIndex((g) => g.id === item.id);
                            if (realIdx !== -1) {
                              updated[realIdx].title = e.target.value;
                              updateGalleryItems(updated);
                            }
                          }}
                          className="w-full font-serif text-sm bg-[#251F1C] border border-[#B47A46]/30 px-2.5 py-1.5 rounded-lg text-white"
                          placeholder="Photo Title"
                        />

                        <label className="text-xs uppercase tracking-wider text-[#C89B6A] hover:text-[#FAF7F2] font-semibold flex items-center gap-1.5 cursor-pointer pt-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{item.imageUrl ? 'Replace Photo' : 'Upload Real Photo'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleMediaUpload(file, `gallery-${item.id}`, (url) => {
                                  const updated = [...galleryItems];
                                  const realIdx = galleryItems.findIndex((g) => g.id === item.id);
                                  if (realIdx !== -1) {
                                    updated[realIdx].imageUrl = url;
                                    updateGalleryItems(updated);
                                  }
                                });
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 5: FACILITIES */}
          {activeTab === 'facilities' && (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="font-serif text-xl sm:text-2xl text-[#FAF7F2]">Verified Facilities & Amenities</h2>
                <button
                  onClick={() => {
                    const newAmenity: Amenity = {
                      name: 'Hot Water Supply',
                      category: 'comfort',
                      icon: 'Wind',
                      description: '24-hour continuous hot water supply available in all guest bathrooms.',
                    };
                    updateAmenities([...amenities, newAmenity]);
                    showToast('New facility added!');
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
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
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="font-serif text-xl sm:text-2xl text-[#FAF7F2]">Guest Reviews CMS</h2>
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
                  className="w-full sm:w-auto px-4 py-2 bg-[#C89B6A] hover:bg-[#D8AE7F] text-[#120F0E] font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.map((t, idx) => (
                  <div key={t.id} className="bg-[#1C1816] p-4 sm:p-5 rounded-xl border border-[#B47A46]/20 space-y-3">
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
                      />
                      <button
                        onClick={() => {
                          updateTestimonials(testimonials.filter((_, i) => i !== idx));
                          showToast('Review removed.');
                        }}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: NEARBY ATTRACTIONS */}
          {activeTab === 'nearby' && (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
              <h2 className="font-serif text-xl sm:text-2xl text-[#FAF7F2]">Varanasi Attractions & Landmarks</h2>
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
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
              <h2 className="font-serif text-xl sm:text-2xl text-[#FAF7F2]">Hotel Policies & Timings</h2>
              <div className="bg-[#1C1816] p-4 sm:p-6 rounded-xl border border-[#B47A46]/20 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Check-In</label>
                    <input
                      type="text"
                      value={hotelPolicies.checkIn}
                      onChange={(e) => updateHotelPolicies({ ...hotelPolicies, checkIn: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Check-Out</label>
                    <input
                      type="text"
                      value={hotelPolicies.checkOut}
                      onChange={(e) => updateHotelPolicies({ ...hotelPolicies, checkOut: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SEO & METADATA */}
          {activeTab === 'seo' && (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
              <h2 className="font-serif text-xl sm:text-2xl text-[#FAF7F2]">Search Engine Optimization (SEO)</h2>
              <div className="bg-[#1C1816] p-4 sm:p-6 rounded-xl border border-[#B47A46]/20 space-y-4">
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
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ROOM CREATE / EDIT MODAL FORM */}
      {roomModalOpen && editingRoom && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#1C1816] text-[#FAF7F2] rounded-2xl max-w-2xl w-full border border-[#B47A46]/40 shadow-2xl overflow-hidden my-4 sm:my-6">
            <div className="bg-[#241F1C] p-4 sm:p-5 flex items-center justify-between border-b border-[#B47A46]/30">
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-white truncate">
                {rooms.some((r) => r.id === editingRoom.id) ? 'Edit Room Listing' : 'Create New Room Category'}
              </h3>
              <button
                onClick={() => {
                  setRoomModalOpen(false);
                  setEditingRoom(null);
                }}
                className="p-1.5 rounded-full text-[#D8CEBF] hover:text-white hover:bg-white/10 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoomForm} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Room Name *</label>
                  <input
                    type="text"
                    required
                    value={editingRoom.name}
                    onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Base Tariff (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingRoom.basePrice}
                    onChange={(e) => setEditingRoom({ ...editingRoom, basePrice: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Bed Type</label>
                  <input
                    type="text"
                    value={editingRoom.bedType}
                    onChange={(e) => setEditingRoom({ ...editingRoom, bedType: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Occupancy</label>
                  <input
                    type="text"
                    value={editingRoom.occupancy}
                    onChange={(e) => setEditingRoom({ ...editingRoom, occupancy: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Description</label>
                <textarea
                  rows={3}
                  value={editingRoom.description}
                  onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                />
              </div>

              {/* Amenity checklist */}
              <div className="space-y-2 pt-2 border-t border-[#B47A46]/20">
                <label className="text-xs uppercase tracking-wider text-[#C89B6A] font-semibold block">
                  Included Amenities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {standardAmenitiesList.map((amenityName) => {
                    const isIncluded = editingRoom.amenities.includes(amenityName);
                    return (
                      <button
                        type="button"
                        key={amenityName}
                        onClick={() => {
                          if (isIncluded) {
                            setEditingRoom({
                              ...editingRoom,
                              amenities: editingRoom.amenities.filter((a) => a !== amenityName),
                            });
                          } else {
                            setEditingRoom({
                              ...editingRoom,
                              amenities: [...editingRoom.amenities, amenityName],
                            });
                          }
                        }}
                        className={`px-3 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer text-left ${
                          isIncluded
                            ? 'bg-[#C89B6A]/20 text-[#FAF7F2] border border-[#C89B6A]'
                            : 'bg-[#251F1C] text-[#8F8375] border border-white/5'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] shrink-0 ${
                            isIncluded ? 'bg-[#C89B6A] text-[#120F0E]' : 'border border-[#8F8375]'
                          }`}
                        >
                          {isIncluded && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span className="truncate">{amenityName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#B47A46]/30 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRoomModalOpen(false);
                    setEditingRoom(null);
                  }}
                  className="px-4 py-2 text-xs text-[#D8CEBF] hover:text-white bg-[#251F1C] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs uppercase tracking-wider font-semibold text-[#120F0E] bg-[#C89B6A] hover:bg-[#D8AE7F] rounded-lg shadow-sm cursor-pointer"
                >
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISH CREATE / EDIT MODAL FORM */}
      {dishModalOpen && editingDish && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#1C1816] text-[#FAF7F2] rounded-2xl max-w-lg w-full border border-[#B47A46]/40 shadow-2xl overflow-hidden my-4 sm:my-6">
            <div className="bg-[#241F1C] p-4 sm:p-5 flex items-center justify-between border-b border-[#B47A46]/30">
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-white truncate">
                {diningInfo.menuItems?.some((d) => d.id === editingDish.id) ? 'Edit Menu Dish' : 'Add Dish to Menu'}
              </h3>
              <button
                onClick={() => {
                  setDishModalOpen(false);
                  setEditingDish(null);
                }}
                className="p-1.5 rounded-full text-[#D8CEBF] hover:text-white hover:bg-white/10 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDishForm} className="p-4 sm:p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={editingDish.name}
                  onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Category</label>
                  <select
                    value={editingDish.category}
                    onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                  >
                    <option value="Breakfast Sets">Breakfast Sets</option>
                    <option value="North Indian Specials">North Indian Specials</option>
                    <option value="Chinese Favorites">Chinese Favorites</option>
                    <option value="Breads & Rice">Breads & Rice</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Price (₹)</label>
                  <input
                    type="number"
                    value={editingDish.price || ''}
                    onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#C89B6A]">Description</label>
                <textarea
                  rows={2}
                  value={editingDish.description}
                  onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#251F1C] border border-[#B47A46]/30 rounded-lg text-white"
                />
              </div>

              <div className="pt-4 border-t border-[#B47A46]/30 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDishModalOpen(false);
                    setEditingDish(null);
                  }}
                  className="px-4 py-2 text-xs text-[#D8CEBF] hover:text-white bg-[#251F1C] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs uppercase tracking-wider font-semibold text-[#120F0E] bg-[#C89B6A] hover:bg-[#D8AE7F] rounded-lg shadow-sm cursor-pointer"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
