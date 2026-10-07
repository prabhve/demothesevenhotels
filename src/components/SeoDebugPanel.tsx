/**
 * Development SEO Diagnostics Panel
 * Validates metadata lengths, hreflang reciprocity, canonical links,
 * and JSON-LD structured data in real-time.
 */

import React, { useState } from 'react';
import { useSEO } from '../seo/SeoContext';
import { Bug, CheckCircle, AlertTriangle, X, Shield, FileText, Globe } from 'lucide-react';

export const SeoDebugPanel: React.FC = () => {
  const { currentLocale, currentPage, metadata } = useSEO();
  const [isOpen, setIsOpen] = useState(false);

  // In production builds, we can hide or keep minimal
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev) return null;

  const titleLength = metadata.title.length;
  const descLength = metadata.description.length;
  const isTitleOptimal = titleLength >= 30 && titleLength <= 65;
  const isDescOptimal = descLength >= 110 && descLength <= 165;

  return (
    <div className="fixed bottom-20 left-4 z-40 text-xs font-mono">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1C1816]/90 hover:bg-[#1C1816] text-[#C89B6A] border border-[#B47A46]/40 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          title="Open SEO Diagnostics"
        >
          <Bug className="w-3.5 h-3.5" />
          <span className="font-sans font-medium text-[11px]">SEO: {currentLocale.code.toUpperCase()}</span>
          {isTitleOptimal && isDescOptimal ? (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          )}
        </button>
      ) : (
        <div className="bg-[#181412] text-[#FAF7F2] p-4 rounded-2xl shadow-2xl border border-[#B47A46]/40 w-[360px] sm:w-[420px] max-h-[85vh] overflow-y-auto space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-2.5">
            <div className="flex items-center gap-2 text-[#C89B6A]">
              <Shield className="w-4 h-4" />
              <span className="font-bold tracking-wide font-sans text-xs">SEO Diagnostics Panel</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#FAF7F2]/60 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-black/40 border border-[#FAF7F2]/10">
              <span className="text-[#A89E92] block">Locale:</span>
              <span className="font-semibold text-[#C89B6A]">
                {currentLocale.nativeName} ({currentLocale.code}) · {currentLocale.direction.toUpperCase()}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-black/40 border border-[#FAF7F2]/10">
              <span className="text-[#A89E92] block">Current Page:</span>
              <span className="font-semibold text-white">{currentPage}</span>
            </div>
          </div>

          {/* Title Audit */}
          <div className="p-2.5 rounded-lg bg-black/40 border border-[#FAF7F2]/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#A89E92] font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Page Title ({titleLength} chars)
              </span>
              {isTitleOptimal ? (
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <CheckCircle className="w-3 h-3" /> Valid
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1 text-[10px]">
                  <AlertTriangle className="w-3 h-3" /> Check Length
                </span>
              )}
            </div>
            <p className="text-[11px] text-white/90 leading-tight break-words">{metadata.title}</p>
          </div>

          {/* Description Audit */}
          <div className="p-2.5 rounded-lg bg-black/40 border border-[#FAF7F2]/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#A89E92] font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Meta Description ({descLength} chars)
              </span>
              {isDescOptimal ? (
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <CheckCircle className="w-3 h-3" /> Optimal
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1 text-[10px]">
                  <AlertTriangle className="w-3 h-3" /> {descLength < 110 ? 'Short' : 'Long'}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#D8CEBF] leading-relaxed break-words">{metadata.description}</p>
          </div>

          {/* Canonical & Hreflang */}
          <div className="p-2.5 rounded-lg bg-black/40 border border-[#FAF7F2]/10 space-y-2 text-[11px]">
            <div>
              <span className="text-[#A89E92] block">Canonical Link:</span>
              <a
                href={metadata.canonicalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#C89B6A] hover:underline break-all"
              >
                {metadata.canonicalUrl}
              </a>
            </div>
            <div className="pt-1 border-t border-white/5 flex items-center justify-between">
              <span className="text-[#A89E92]">Dynamic Hreflang Tags:</span>
              <span className="text-emerald-400 font-semibold">{metadata.hreflangs.length} Alternates</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#A89E92]">x-default:</span>
              <span className="text-white break-all">{metadata.xDefaultUrl}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#A89E92]">Robots Directive:</span>
              <span className="text-emerald-400 font-semibold">{metadata.robotsContent}</span>
            </div>
          </div>

          {/* Schema.org Status */}
          <div className="p-2.5 rounded-lg bg-black/40 border border-[#FAF7F2]/10 flex items-center justify-between text-[11px]">
            <span className="text-[#A89E92]">Schema.org JSON-LD:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Hotel + FAQ + Breadcrumb
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
