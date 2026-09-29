'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Property, PropertyType } from '@/lib/types';
import PropertyCard from '@/components/properties/PropertyCard';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [activeType, setActiveType] = useState<PropertyType | 'all'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const filteredProperties = properties.filter((p) => {
    if (activeType === 'all') return true;
    return p.type === activeType;
  });

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.querySelector('.prop-card-wrapper')?.clientWidth || 320;
    const gap = 24;
    const targetScroll = index * (cardWidth + gap);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (filteredProperties.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredProperties.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    if (filteredProperties.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredProperties.length) % filteredProperties.length;
    scrollToIndex(prevIdx);
  };

  // Auto-scroll one by one
  useEffect(() => {
    if (isHovered || filteredProperties.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4200);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, filteredProperties.length]);

  return (
    <section className="py-14 sm:py-18 bg-[#f8fafc] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDPICKED INVENTORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#0b1329] font-bold">
              Featured Properties
            </h2>
          </div>

          {/* Filter Pills & Slider Controls */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl">
              {(['all', 'plot', 'villa', 'house'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setActiveType(type);
                    setCurrentIndex(0);
                    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all capitalize ${
                    activeType === type
                      ? 'bg-white text-[#0a4ba6] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type === 'all' ? 'All' : `${type}s`}
                </button>
              ))}
            </div>

            {filteredProperties.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-800 bg-white text-slate-700 flex items-center justify-center transition-colors active:scale-95 shadow-2xs"
                  aria-label="Previous property"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-[#0a4ba6] hover:bg-[#073575] text-white flex items-center justify-center transition-colors active:scale-95 shadow-2xs"
                  aria-label="Next property"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Auto-scrolling Property Carousel */}
        {filteredProperties.length > 0 ? (
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            className="relative"
          >
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="prop-card-wrapper flex-none w-[290px] sm:w-[330px] md:w-[360px] snap-start"
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            {filteredProperties.length > 1 && (
              <div className="flex justify-center items-center gap-1.5 mt-2">
                {filteredProperties.slice(0, 8).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === i ? 'w-6 bg-[#0a4ba6]' : 'w-2 bg-slate-300'
                    }`}
                    aria-label={`Go to property slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 max-w-md mx-auto space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No properties in this filter</h3>
            <p className="text-xs text-slate-500">
              New developments in this category are being prepared. Contact us directly for upcoming plots & homes.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-8 text-center">
          <a
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-300 hover:border-[#0a4ba6] text-slate-800 hover:text-[#0a4ba6] rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs hover:shadow-xs transition-all group"
          >
            <span>View All Available Properties ({properties.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
