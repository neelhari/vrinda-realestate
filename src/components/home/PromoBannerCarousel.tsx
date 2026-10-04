'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PromoCard {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
}

const PROMO_CARDS: PromoCard[] = [
  {
    id: 'plots-range',
    title: '₹4 Lakhs – ₹5 Crores Plots',
    subtitle: 'Affordable to Luxury • Ongole & Highway',
    href: '/plots',
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

export default function PromoBannerCarousel() {
  return (
    <section className="w-full py-3.5 sm:py-5 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Native Mobile App Style Horizontal Scrolling Cards */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1">
          {PROMO_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative shrink-0 snap-start w-[72vw] sm:w-[290px] md:w-[320px] h-[140px] sm:h-[160px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer select-none"
            >
              {/* 100% Crisp & Bright Photo - Zero Dark Blocking Filters */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 72vw, 320px"
                className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
              />

              {/* Minimal Ultra-Soft Bottom Text Shade (Only at bottom 40%) */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

              {/* Minimal Clean Text at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 z-10">
                <h3 className="text-white font-bold text-sm sm:text-[15px] leading-tight drop-shadow-xs">
                  {card.title}
                </h3>
                <p className="text-slate-200 text-[11px] sm:text-xs font-medium tracking-wide pt-0.5 drop-shadow-xs">
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
