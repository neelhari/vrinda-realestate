'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LocationItem } from '@/lib/types';
import { ChevronLeft, ChevronRight, ArrowUpRight, MapPin } from 'lucide-react';

interface LocationsSectionProps {
  locations?: LocationItem[];
}

export default function LocationsSection({ locations = [] }: LocationsSectionProps) {
  const defaultLocations = [
    {
      id: 'loc-1',
      name: 'Koppolu Growth Corridor',
      tagline: 'Prime Residential Expansion Node',
      description: 'Wide blacktop ring roads, master-planned ventures, and rapid development.',
      imageUrl: '/images/category-plots.jpg',
      stat: 'Fastest Appreciating Zone'
    },
    {
      id: 'loc-2',
      name: 'Ongole City Central',
      tagline: 'Established Heart & Heritage Enclaves',
      description: 'Minutes from top schools, hospitals, commercial markets, and transport hubs.',
      imageUrl: '/images/hero-luxury-villa.jpg',
      stat: 'High Living Value'
    },
    {
      id: 'loc-3',
      name: 'Singarakonda Corridor',
      tagline: 'Scenic Highway Touch Belt',
      description: 'Green surroundings and highway access, ideal for long-term land wealth.',
      imageUrl: '/images/category-houses.jpg',
      stat: 'High Capital Growth'
    },
    {
      id: 'loc-4',
      name: 'Regional Highway Link',
      tagline: 'NH-16 Connectivity Axis',
      description: 'Connecting Ongole with Guntur, Vijayawada, and key transit corridors.',
      imageUrl: '/images/category-villas.jpg',
      stat: 'Strategic Investment'
    }
  ];

  const items = locations.length > 0 ? locations : defaultLocations;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.querySelector('.loc-card')?.clientWidth || 280;
    const gap = 20;
    const targetScroll = index * (cardWidth + gap);
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      const prevIdx = (currentIndex - 1 + items.length) % items.length;
      scrollToIndex(prevIdx);
    } else {
      const nextIdx = (currentIndex + 1) % items.length;
      scrollToIndex(nextIdx);
    }
  };

  // Auto-scroll one by one
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      const nextIdx = (currentIndex + 1) % items.length;
      scrollToIndex(nextIdx);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, items.length]);

  return (
    <section className="py-14 sm:py-18 bg-[#181716] text-white relative overflow-hidden border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Nav Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>KEY INVESTMENT BELTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Strategic Locations in Ongole
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs text-stone-400 hidden sm:inline">Auto-scrolling corridors</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-8 h-8 rounded-full border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-white bg-stone-900 flex items-center justify-center transition-colors active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-8 h-8 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center transition-colors active:scale-95 shadow-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Visual Filmstrip Slider */}
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
            {items.map((loc, index) => (
              <motion.a
                key={loc.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                href={`/properties?location=${encodeURIComponent(loc.name.split(' ')[0])}`}
                className="loc-card group relative flex-none w-[260px] sm:w-[320px] md:w-[340px] h-[340px] sm:h-[380px] rounded-2xl overflow-hidden snap-start border border-stone-800 shadow-xl"
              >
                {/* Background Photography */}
                <Image
                  src={loc.imageUrl || '/images/category-plots.jpg'}
                  alt={loc.name}
                  fill
                  sizes="(max-width: 768px) 260px, 340px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Rich Charcoal Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-[#181716]/50 to-transparent" />

                {/* Index tag */}
                <div className="absolute top-4 right-4 text-[10px] font-mono text-amber-300 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10">
                  0{index + 1}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-2">
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-amber-400 uppercase">
                    {(loc as any).stat || loc.tagline}
                  </span>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight line-clamp-1">
                    {loc.name}
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed font-light line-clamp-2">
                    {loc.description}
                  </p>

                  <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-stone-200 group-hover:text-amber-400 transition-colors">
                    <span>Explore available plots</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-6 bg-amber-400' : 'w-2 bg-stone-700'
                }`}
                aria-label={`Go to location slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
