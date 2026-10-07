/**
 * Premium Multilingual Language Selector Component
 * Displays authentic native names (no flags-only UI)
 * Organized into Primary, Indian, and International categories with instant filter.
 * Preserves current route and context seamlessly.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useSEO } from '../seo/SeoContext';
import { getLocaleList, LocaleConfig } from '../config/locales';
import { Globe, Check, Search, X, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'header' | 'mobile' | 'footer';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'header' }) => {
  const { currentLocale, setLocale } = useSEO();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const allLocales = getLocaleList();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filteredLocales = allLocales.filter(
    (l) =>
      l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const coreLanguages = filteredLocales.filter((l) => l.group === 'core');
  const indianLanguages = filteredLocales.filter((l) => l.group === 'indian');
  const internationalLanguages = filteredLocales.filter((l) => l.group === 'international');

  const handleSelect = (code: string) => {
    setLocale(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      {variant === 'mobile' ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#E8DFD5] bg-[#FFFFFF] text-[#24201D] text-xs font-medium cursor-pointer shadow-xs active:bg-[#F5EFE6]"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Select Language"
        >
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#9E6738]" />
            <span className="font-semibold text-[#1C1816]">{currentLocale.nativeName}</span>
            <span className="text-[11px] text-[#7A7168]">({currentLocale.englishName})</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-[#7A7168] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E8DFD5] hover:border-[#C89B6A] bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-xs font-medium text-[#24201D] transition-all cursor-pointer shadow-2xs group"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Select Website Language"
        >
          <Globe className="w-3.5 h-3.5 text-[#9E6738] group-hover:text-[#C89B6A] transition-colors" />
          <span className="font-semibold tracking-wide text-[#1C1816]">{currentLocale.nativeName}</span>
          <ChevronDown className={`w-3 h-3 text-[#7A7168] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* Modal / Flyout Dropdown */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Language selection"
          className="fixed inset-x-3 top-20 sm:top-auto sm:inset-x-auto sm:absolute sm:right-0 sm:mt-2 w-auto sm:w-[380px] max-h-[80vh] bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E8DFD5] z-50 overflow-hidden flex flex-col animate-fadeIn text-[#24201D]"
        >
          {/* Header */}
          <div className="p-3.5 border-b border-[#E8DFD5] bg-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#C89B6A]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1816]">
                Select Language · भाषा चुनें
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#7A7168] hover:text-[#1C1816] rounded-md hover:bg-black/5 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-3 border-b border-[#E8DFD5] bg-[#FFFFFF]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7168]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language / भाषा खोजें..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E8DFD5] rounded-lg focus:outline-none focus:border-[#C89B6A] text-[#1C1816] placeholder-[#A89E92]"
              />
            </div>
          </div>

          {/* Languages List */}
          <div className="overflow-y-auto p-2 space-y-3 max-h-[60vh] text-xs">
            {/* Core */}
            {coreLanguages.length > 0 && (
              <div>
                <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-[#9E6738] font-bold">
                  Primary Languages
                </div>
                <div className="grid grid-cols-2 gap-1 mt-0.5">
                  {coreLanguages.map((l) => (
                    <LanguageItem
                      key={l.code}
                      locale={l}
                      isSelected={l.code === currentLocale.code}
                      onSelect={() => handleSelect(l.code)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Indian Languages */}
            {indianLanguages.length > 0 && (
              <div>
                <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-[#9E6738] font-bold">
                  Indian Regional Languages (भारतीय भाषाएं)
                </div>
                <div className="grid grid-cols-2 gap-1 mt-0.5">
                  {indianLanguages.map((l) => (
                    <LanguageItem
                      key={l.code}
                      locale={l}
                      isSelected={l.code === currentLocale.code}
                      onSelect={() => handleSelect(l.code)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* International */}
            {internationalLanguages.length > 0 && (
              <div>
                <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-[#9E6738] font-bold">
                  International Languages
                </div>
                <div className="grid grid-cols-2 gap-1 mt-0.5">
                  {internationalLanguages.map((l) => (
                    <LanguageItem
                      key={l.code}
                      locale={l}
                      isSelected={l.code === currentLocale.code}
                      onSelect={() => handleSelect(l.code)}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredLocales.length === 0 && (
              <div className="p-4 text-center text-xs text-[#7A7168]">
                No languages found matching "{searchQuery}"
              </div>
            )}
          </div>

          {/* Footer Notice */}
          <div className="p-2.5 bg-[#FAF8F5] border-t border-[#E8DFD5] text-[10px] text-[#7A7168] flex items-center justify-between">
            <span>Canonical Hotel Tariffs in INR (₹)</span>
            <span className="font-medium text-[#C89B6A]">29 Languages Supported</span>
          </div>
        </div>
      )}
    </div>
  );
};

const LanguageItem: React.FC<{
  locale: LocaleConfig;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ locale, isSelected, onSelect }) => (
  <button
    onClick={onSelect}
    className={`flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
      isSelected
        ? 'bg-[#1C1816] text-[#FFFFFF]'
        : 'hover:bg-[#F5EFE6] text-[#24201D]'
    }`}
  >
    <div className="min-w-0 pr-1">
      <div className={`font-semibold text-xs truncate ${isSelected ? 'text-white' : 'text-[#1C1816]'}`}>
        {locale.nativeName}
      </div>
      <div className={`text-[10px] truncate ${isSelected ? 'text-[#C89B6A]' : 'text-[#7A7168]'}`}>
        {locale.englishName}
      </div>
    </div>
    {isSelected && <Check className="w-3.5 h-3.5 text-[#C89B6A] shrink-0" />}
  </button>
);
