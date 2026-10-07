/**
 * Dynamic XML Sitemap Generator
 * Creates a compliant Google XML sitemap with reciprocal xhtml:link hreflang alternates.
 * Automatically synchronizes with the active locales registry and page routes.
 */

import { canonicalHotel } from '../config/hotel';
import { getIndexableLocales } from '../config/locales';

export interface SitemapRoute {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

export const coreRoutes: SitemapRoute[] = [
  { path: '', changefreq: 'daily', priority: 1.0 },
  { path: '/rooms', changefreq: 'weekly', priority: 0.9 },
  { path: '/rooms/classic-room', changefreq: 'weekly', priority: 0.85 },
  { path: '/rooms/deluxe-room', changefreq: 'weekly', priority: 0.85 },
  { path: '/rooms/super-deluxe-room', changefreq: 'weekly', priority: 0.85 },
  { path: '/facilities', changefreq: 'monthly', priority: 0.7 },
  { path: '/dining', changefreq: 'monthly', priority: 0.75 },
  { path: '/experience-varanasi', changefreq: 'weekly', priority: 0.8 },
  { path: '/location', changefreq: 'monthly', priority: 0.8 },
  { path: '/reviews', changefreq: 'weekly', priority: 0.75 },
  { path: '/gallery', changefreq: 'monthly', priority: 0.7 },
  { path: '/faq', changefreq: 'monthly', priority: 0.75 },
  { path: '/contact', changefreq: 'monthly', priority: 0.8 },
  { path: '/policies', changefreq: 'yearly', priority: 0.5 },
];

export const generateSitemapXml = (): string => {
  const base = canonicalHotel.urls.canonicalBase;
  const locales = getIndexableLocales();
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const route of coreRoutes) {
    for (const locale of locales) {
      const locUrl = `${base}/${locale.code}${route.path}`;

      xml += `  <url>\n`;
      xml += `    <loc>${locUrl}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority.toFixed(2)}</priority>\n`;

      // Add xhtml:link alternates for all indexable locales + x-default
      for (const alt of locales) {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.languageCode}" href="${base}/${alt.code}${route.path}" />\n`;
      }
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${base}/en${route.path}" />\n`;

      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>\n`;
  return xml;
};
