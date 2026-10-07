/**
 * Semantic Breadcrumb Component with Microdata & JSON-LD
 * Provides accessible navigation and search engine snippet breadcrumb hierarchy.
 */

import React from 'react';
import { useSEO } from '../seo/SeoContext';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: BreadcrumbCrumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  const { currentLocale } = useSEO();

  return (
    <nav aria-label="Breadcrumb" className="py-2.5 px-4 bg-[#FAF8F5] border-b border-[#E8DFD5] text-xs">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-[#7A7168] overflow-x-auto whitespace-nowrap scrollbar-none">
        <a
          href={`/${currentLocale.code}`}
          className="flex items-center gap-1 hover:text-[#C89B6A] transition-colors"
          title="Home"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </a>

        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-[#A89E92] shrink-0 rtl:rotate-180" />
              {isLast || !crumb.href ? (
                <span className="font-semibold text-[#1C1816]" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.href}
                  className="hover:text-[#C89B6A] transition-colors"
                >
                  {crumb.label}
                </a>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
