import React, { useState } from 'react';
import { useHotelData } from '../context/HotelDataContext';
import { HelpCircle, ChevronDown, MessageCircle, Phone, Mail } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const FAQSection: React.FC = () => {
  const { faqList, contactInfo } = useHotelData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#FDFCF9] text-[#24201D] border-t border-[#E8DFD5] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E6738] font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Guest Information</span>
              <span aria-hidden="true">·</span>
              <span>Stay Guidelines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1816] font-normal tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#665D55] mt-3 max-w-xl mx-auto">
              Essential details regarding check-in timings, amenities, parking, and reservations at The Seven's Hotel Varanasi.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={item.id || index} direction="up" delay={50 * (index % 6)}>
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E8DFD5] overflow-hidden transition-all duration-200 hover:border-[#B47A46]/40 shadow-xs">
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg text-[#1C1816] font-medium leading-snug">
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#C89B6A] text-[#181412] rotate-180' : 'bg-[#FAF8F5] text-[#7A7168] border border-[#E8DFD5]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm text-[#5C534B] leading-relaxed border-t border-[#F5EFE6] bg-[#FCFBF8] animate-fadeIn">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Have more questions banner */}
        <ScrollReveal direction="up" delay={300}>
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#1C1816] text-[#FAF7F2] border border-[#B47A46]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-md">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#C89B6A] font-semibold block mb-1">
                Direct Front Desk Support
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Have specific stay or pilgrimage queries?
              </h3>
              <p className="text-xs text-[#D8CEBF]/80 mt-1 max-w-md">
                Our reception team is available 24/7 to assist with room tariffs, custom family arrangements and temple visit transport.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <a
                href={`https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  "Hello The Seven's Hotel, I have a query regarding my upcoming stay in Varanasi."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#181412] bg-[#C89B6A] hover:bg-[#D8AE7F] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask on WhatsApp</span>
              </a>

              <a
                href={`tel:${contactInfo.primaryPhoneRaw}`}
                className="px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-[#FAF7F2] bg-[#2A231F] hover:bg-[#352D28] border border-[#B47A46]/30 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#C89B6A]" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
