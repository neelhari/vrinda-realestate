'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Car, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';

const HIGHLIGHTS = [
  {
    id: 'budget-plots',
    title: '₹4L – ₹5Cr Plots',
    subtitle: 'Plots for Every Budget',
    href: '/plots',
    icon: <Tag className="w-5 h-5 text-amber-600" />,
    iconBg: 'bg-amber-50 border-amber-100',
    hoverBorder: 'hover:border-amber-400'
  },
  {
    id: 'free-car',
    title: 'Free Car Pickup & Drop',
    subtitle: 'VIP Doorstep Site Visits',
    href: '/site-visit',
    icon: <Car className="w-5 h-5 text-emerald-600" />,
    iconBg: 'bg-emerald-50 border-emerald-100',
    hoverBorder: 'hover:border-emerald-400'
  },
  {
    id: 'experience',
    title: '15+ Years Experience',
    subtitle: '5,000+ Happy Families',
    href: '/about',
    icon: <Award className="w-5 h-5 text-blue-600" />,
    iconBg: 'bg-blue-50 border-blue-100',
    hoverBorder: 'hover:border-blue-400'
  },
  {
    id: 'clear-titles',
    title: '100% Clear Titles',
    subtitle: 'Direct Spot Registration',
    href: '/properties',
    icon: <ShieldCheck className="w-5 h-5 text-orange-600" />,
    iconBg: 'bg-orange-50 border-orange-100',
    hoverBorder: 'hover:border-orange-400'
  }
];

export default function QuickHighlights() {
  return (
    <section className="py-6 sm:py-8 bg-[#f8fafc] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Compact, Clean, App-Style Highlight Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {HIGHLIGHTS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer ${item.hoverBorder}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Clean Tinted Icon Box */}
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border shrink-0 ${item.iconBg}`}>
                  {item.icon}
                </div>

                {/* Text Content */}
                <div className="min-w-0">
                  <h3 className="text-slate-900 font-bold text-xs sm:text-sm truncate group-hover:text-[#0a4ba6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-[11px] sm:text-xs truncate font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="text-slate-300 group-hover:text-[#0a4ba6] transition-colors shrink-0 ml-1">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
