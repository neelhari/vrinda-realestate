'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function CategoryCards() {
  const categories = [
    {
      number: '01',
      title: 'Residential Open Plots',
      tagline: 'Verified land in high-growth corridors',
      description: 'Clear-title gated ventures with 40ft blacktop roads, drainage, and spot registration in Koppolu.',
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
      description: 'Freehold residences with independent borewell, covered car portico, and peaceful living.',
      image: '/images/category-houses.jpg',
      href: '/houses',
      stats: 'Standalone Freehold'
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROPERTY PORTFOLIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#0b1329] font-bold tracking-tight">
              Explore by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm font-light">
            From verified open plots to ready move-in villas, explore our specialized developments.
          </p>
        </div>

        {/* 3 Modern Compact Architectural Cards with horizontal scroll on mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2">
          {categories.map((cat, idx) => (
            <motion.a
              key={cat.title}
              href={cat.href}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group flex-none w-[270px] sm:w-auto snap-start relative flex flex-col rounded-2xl overflow-hidden bg-[#f8fafc] border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 270px, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Number & Stat tags inside image */}
                <div className="absolute top-3 left-3 text-xs font-mono text-white/80">
                  {cat.number}
                </div>
                <div className="absolute top-3 right-3 text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  {cat.stats}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-base sm:text-lg font-bold font-serif line-clamp-1">{cat.title}</h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 flex flex-col justify-between grow space-y-3">
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold text-[#ea511c] uppercase tracking-wider">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200/80 text-xs font-bold text-[#0a4ba6] group-hover:text-[#ea511c] transition-colors">
                  <span>Explore Listings</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
