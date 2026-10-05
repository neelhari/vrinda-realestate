'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { PromoBannerItem } from '@/lib/types';

interface PromoBannerCarouselProps {
  banners?: PromoBannerItem[];
}

const DEFAULT_PROMO_CARDS: PromoBannerItem[] = [
  {
    id: 'plots-range',
    title: '₹4 Lakhs – ₹4 Crores Plots',
    subtitle: 'Affordable to Luxury • Ongole & Highway',
    href: '/properties?type=plot&minPrice=400000&maxPrice=40000000',
    image: '/images/category-plots.jpg',
  },
  {
    id: 'free-car-service',
    title: 'Free Car Pickup & Drop',
    subtitle: 'Doorstep AC Ride for All Site Visits',
    href: '/site-visit',
    image: '/images/category-villas.jpg',
  },
  {
    id: 'years-experience',
    title: '15+ Years Experience',
    subtitle: '5,000+ Happy Families • 100% Clear Titles',
    href: '/about',
    image: '/images/hero-luxury-villa.jpg',
  },
  {
    id: 'growth-corridors',
    title: 'Prime Growth Corridors',
    subtitle: 'Koppolu & Bypass • Spot Registration',
    href: '/properties',
    image: '/images/category-houses.jpg',
  },
];

export default function PromoBannerCarousel({ banners }: PromoBannerCarouselProps) {
  const activeBanners = Array.isArray(banners) && banners.length > 0 ? banners : DEFAULT_PROMO_CARDS;

  return (
    <section className="w-full py-4 sm:py-6 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Native Mobile App Style Horizontal Scrolling Cards */}
        <div 
          className="flex items-center gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activeBanners.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative shrink-0 snap-start w-[80vw] sm:w-[340px] md:w-[380px] lg:w-[400px] h-[175px] sm:h-[205px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer select-none"
            >
              {/* 100% Crisp & Bright Photo - Zero Dark Blocking Filters */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 80vw, 400px"
                className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
              />

              {/* Minimal Ultra-Soft Bottom Text Shade (Only at bottom 45%) */}
              <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* Minimal Clean Text at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 space-y-0.5">
                <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl leading-snug drop-shadow-xs">
                  {card.title}
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm font-medium tracking-wide drop-shadow-xs">
                  {card.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
