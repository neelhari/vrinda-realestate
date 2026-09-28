'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
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
      description: 'Wide blacktop ring roads, master-planned ventures, and rapid civic development in Ongole.',
      imageUrl: '/images/category-plots.jpg',
      stat: 'Fastest Appreciating Zone'
    },
    {
      id: 'loc-2',
      name: 'Ongole City Central',
      tagline: 'Established Heart & Heritage Enclaves',
      description: 'Minutes away from top schools, multi-specialty hospitals, temples, and bustling commercial markets.',
      imageUrl: '/images/hero-luxury-villa.jpg',
      stat: 'High Rental & Living Value'
    },
    {
      id: 'loc-3',
      name: 'Singarakonda Corridor',
      tagline: 'Scenic Highway Touch Belt',
      description: 'Green surroundings and highway access, ideal for affordable open plots and long-term land wealth.',
      imageUrl: '/images/category-houses.jpg',
      stat: 'High Capital Growth'
    },
    {
      id: 'loc-4',
      name: 'Regional Highway Link',
      tagline: 'NH-16 Connectivity Axis',
      description: 'Connecting Ongole with Guntur, Vijayawada, and southern transit routes.',
      imageUrl: '/images/category-villas.jpg',
      stat: 'Strategic Investment'
    }
  ];

  const items = locations.length > 0 ? locations : defaultLocations;
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-[#0b1329] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Nav Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-[#ea511c] uppercase">
              02 — LOCATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Strategic Growth Belts
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-400 hidden sm:block">Scroll through prime sectors</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white text-white flex items-center justify-center transition-colors active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full bg-[#0a4ba6] hover:bg-[#073575] text-white flex items-center justify-center transition-colors active:scale-95 shadow-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Visual Filmstrip Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((loc, index) => (
            <a
              key={loc.id}
              href={`/properties?location=${encodeURIComponent(loc.name.split(' ')[0])}`}
              className="group relative flex-none w-[300px] sm:w-[380px] h-[460px] rounded-3xl overflow-hidden snap-start transition-transform duration-500 hover:scale-[1.01]"
            >
              {/* Background Photography */}
              <Image
                src={loc.imageUrl || '/images/category-plots.jpg'}
                alt={loc.name}
                fill
                sizes="(max-width: 768px) 300px, 380px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Edge-to-Edge Cinematic Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Number tag top right */}
              <div className="absolute top-5 right-5 text-[11px] font-mono text-white/60">
                0{index + 1}
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-[#ea511c] uppercase">
                  {(loc as any).stat || loc.tagline}
                </span>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                  {loc.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2">
                  {loc.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#ea511c] transition-colors">
                  <span>Explore available plots</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
