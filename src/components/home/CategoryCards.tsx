'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCards() {
  const categories = [
    {
      number: '01',
      title: 'Residential Open Plots',
      tagline: 'Verified land in high-growth corridors',
      description: 'Clear-title gated ventures with 40ft blacktop roads, drainage, and instant registration in Koppolu.',
      image: '/images/category-plots.jpg',
      href: '/plots',
      stats: '150 – 400 Sq.Yds'
    },
    {
      number: '02',
      title: 'Luxury Duplex Villas',
      tagline: 'Contemporary gated community homes',
      description: 'Spacious 3BHK & 4BHK residences with double-height living, private lawns, and Vaastu alignment.',
      image: '/images/category-villas.jpg',
      href: '/villas',
      stats: '3 & 4 BHK Duplexes'
    },
    {
      number: '03',
      title: 'Independent Freehold Houses',
      tagline: 'Standalone family spaces',
      description: 'Freehold residences with independent borewell, covered car portico, and peaceful neighborhood living.',
      image: '/images/category-houses.jpg',
      href: '/houses',
      stats: 'Standalone Freehold'
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-6 border-b border-slate-200">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-[#ea511c] uppercase">
              PORTFOLIO ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0b1329] font-bold tracking-tight">
              Explore by Category
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm text-slate-600 font-light">
              From building custom homes on verified open plots to ready move-in villas, explore our specialized developments.
            </p>
          </div>
        </div>

        {/* 3 Modern Architectural Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              className="group relative flex flex-col rounded-3xl overflow-hidden bg-[#f8fafc] border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Number & Stat tags inside image */}
                <div className="absolute top-4 left-4 text-xs font-mono text-white/80">
                  {cat.number}
                </div>
                <div className="absolute top-4 right-4 text-[11px] font-mono text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  {cat.stats}
                </div>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="text-xl font-bold font-serif">{cat.title}</h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col justify-between grow space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-[#ea511c] uppercase tracking-wider">
                    {cat.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-200/80 text-xs font-bold text-[#0a4ba6] group-hover:text-[#ea511c] transition-colors">
                  <span>Explore Listings</span>
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
