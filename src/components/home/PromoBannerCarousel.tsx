'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Car, 
  Award, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface PromoBannerItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctaText: string;
  href: string;
  image: string;
  icon: React.ReactNode;
  gradient: string;
}

const PROMO_BANNERS: PromoBannerItem[] = [
  {
    id: 'plots-range',
    badge: 'ALL BUDGETS AVAILABLE',
    badgeColor: 'bg-amber-500 text-slate-950 font-bold',
    title: 'Plots Available from',
    highlight: '₹4 Lakhs to ₹5 Crores',
    subtitle: 'From affordable budget investments in growth belts to ultra-luxury commercial & farmland plots across Ongole.',
    ctaText: 'Explore Available Plots',
    href: '/plots',
    image: '/images/category-plots.jpg',
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    gradient: 'from-slate-950 via-slate-900/90 to-transparent'
  },
  {
    id: 'free-car-service',
    badge: 'VIP DOORSTEP SERVICE',
    badgeColor: 'bg-emerald-500 text-white font-bold',
    title: 'Site Visits Made Easy with',
    highlight: 'Free Car Pickup & Drop',
    subtitle: 'Book your personal site tour. We pick you up from your doorstep in a clean AC car and drop you back safely at zero cost.',
    ctaText: 'Book Free Site Visit',
    href: '/site-visit',
    image: '/images/category-villas.jpg',
    icon: <Car className="w-4 h-4 text-emerald-400" />,
    gradient: 'from-slate-950 via-slate-900/90 to-transparent'
  },
  {
    id: 'years-experience',
    badge: 'TRUSTED SINCE 2011',
    badgeColor: 'bg-blue-600 text-white font-bold',
    title: 'Backed by Over',
    highlight: '15+ Years of Experience',
    subtitle: 'Over 5,000+ satisfied land buyers, 100% legally verified clear titles, DTCP & RERA approved ventures.',
    ctaText: 'Discover Our Story',
    href: '/about',
    image: '/images/hero-luxury-villa.jpg',
    icon: <Award className="w-4 h-4 text-blue-400" />,
    gradient: 'from-slate-950 via-slate-900/90 to-transparent'
  },
  {
    id: 'growth-corridor',
    badge: 'HIGH ROI CORRIDORS',
    badgeColor: 'bg-[#ea511c] text-white font-bold',
    title: 'Rapid Appreciating Lands in',
    highlight: 'Koppolu & Highway Belts',
    subtitle: '40ft blacktop roads, underground electricity & drainage, instant spot registration at Ongole Sub-Registrar.',
    ctaText: 'View Hotspot Locations',
    href: '/properties',
    image: '/images/category-houses.jpg',
    icon: <TrendingUp className="w-4 h-4 text-orange-400" />,
    gradient: 'from-slate-950 via-slate-900/90 to-transparent'
  }
];

export default function PromoBannerCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-6 sm:py-8 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip with Nav Arrows */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea511c] animate-pulse" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
              Featured Highlights & Special Services
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Myntra-Style Horizontal Swipeable Cards Container */}
        <div 
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {PROMO_BANNERS.map((banner) => (
            <div
              key={banner.id}
              className="snap-start w-[85vw] sm:w-[380px] md:w-[420px] lg:w-[440px] shrink-0 group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/80 bg-slate-900 select-none flex flex-col justify-between"
            >
              {/* Background Cover Image with Zoom Effect */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 440px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.85]"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${banner.gradient} opacity-95`} />
                <div className="absolute inset-0 bg-black/35" />
              </div>

              {/* Card Content Top: Badge & Icon */}
              <div className="relative z-10 p-5 sm:p-6 pb-0 flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] tracking-wide uppercase shadow-sm ${banner.badgeColor}`}>
                  {banner.badge}
                </span>

                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  {banner.icon}
                </div>
              </div>

              {/* Card Content Middle & Bottom: Titles and CTA Button */}
              <div className="relative z-10 p-5 sm:p-6 pt-12 sm:pt-14 space-y-2 sm:space-y-3">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-300">
                    {banner.title}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight leading-tight">
                    {banner.highlight}
                  </h3>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed line-clamp-2">
                  {banner.subtitle}
                </p>

                <div className="pt-2">
                  <Link
                    href={banner.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-900 text-xs font-bold shadow-md transition-all group-hover:gap-3 cursor-pointer"
                  >
                    <span>{banner.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0a4ba6]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
