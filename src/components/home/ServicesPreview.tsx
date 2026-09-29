'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ServiceItem } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ServicesPreviewProps {
  services?: ServiceItem[];
}

export default function ServicesPreview({ services = [] }: ServicesPreviewProps) {
  const defaultServices = [
    {
      id: 'srv-1',
      title: 'Residential Open Plots',
      shortDesc: 'Verified, clear-title open plots in master-planned gated layouts in Koppolu.',
      features: [
        '100% Verified clear land titles with 30-yr EC',
        'Immediate spot registration assistance',
        '40ft & 33ft wide blacktop roads with drainage'
      ],
      ctaText: 'Explore Available Plots',
      ctaHref: '/plots'
    },
    {
      id: 'srv-2',
      title: 'Guided Site Visits',
      shortDesc: 'Complimentary on-ground tours with our local property specialists.',
      features: [
        'Flexible weekend & weekday scheduling',
        'Boundary stone & setback inspection',
        'Direct consultation with founder Ayyappa Sai'
      ],
      ctaText: 'Schedule a Free Tour',
      ctaHref: '/site-visit'
    },
    {
      id: 'srv-3',
      title: 'Legal & Registration Support',
      shortDesc: 'Seamless documentation from title check to Sub-Registrar deed.',
      features: [
        '30-year link document verification',
        'Drafting government-compliant sale deeds',
        'Sub-registrar slot booking & in-person support'
      ],
      ctaText: 'Consult Legal Team',
      ctaHref: '/consultation'
    },
    {
      id: 'srv-4',
      title: 'Luxury Villas & Houses',
      shortDesc: 'Contemporary gated community duplexes and standalone custom homes.',
      features: [
        '100% Vaastu compliant modern architecture',
        'Move-in ready & custom construction choices',
        'Prime residential enclaves in Ongole'
      ],
      ctaText: 'View Villas & Houses',
      ctaHref: '/villas'
    }
  ];

  const items = services.length > 0 ? services : defaultServices;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('.service-card')?.clientWidth || 320;
    const gap = 20;
    const targetScroll = index * (cardWidth + gap);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    scrollToIndex(prevIdx);
  };

  // Automatic horizontal scrolling one by one
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, items.length]);

  return (
    <section className="py-14 sm:py-18 bg-[#f8fafc] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header with Slide Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAPABILITIES & ADVISORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#0b1329] font-bold tracking-tight">
              Real Estate Services
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <a
              href="/services"
              className="text-xs font-bold text-[#0a4ba6] hover:text-[#ea511c] transition-colors"
            >
              View All Services →
            </a>

            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-800 bg-white text-slate-700 flex items-center justify-center transition-colors active:scale-95 shadow-2xs"
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-[#0a4ba6] hover:bg-[#073575] text-white flex items-center justify-center transition-colors active:scale-95 shadow-2xs"
                aria-label="Next Service"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Horizontal Auto-scrolling Carousel */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="relative"
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((srv, idx) => (
              <motion.div
                key={srv.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="service-card flex-none w-[280px] sm:w-[320px] md:w-[340px] snap-start bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0a4ba6]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-mono text-[#ea511c] font-bold">0{idx + 1}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Vrinda Advisory</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-slate-900 line-clamp-1">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-2">
                    {srv.shortDesc}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {srv.features?.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href={(srv as any).ctaHref || '/services'}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a4ba6] hover:text-[#ea511c] transition-colors group"
                  >
                    <span>{srv.ctaText || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-6 bg-[#0a4ba6]' : 'w-2 bg-slate-300'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
