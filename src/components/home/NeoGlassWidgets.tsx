'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Car, Award, ShieldCheck } from 'lucide-react';

interface NeoWidget {
  id: string;
  badge: string;
  badgeDot: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  glowColor: string;
  iconBg: string;
}

const NEO_WIDGETS: NeoWidget[] = [
  {
    id: 'budget-plots',
    badge: 'ALL BUDGETS',
    badgeDot: 'bg-amber-400 shadow-[0_0_8px_#f59e0b]',
    title: '₹4 Lakhs – ₹5 Crores',
    subtitle: 'Residential & Commercial Plots',
    href: '/plots',
    icon: <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />,
    glowColor: '#f59e0b',
    iconBg: 'bg-amber-500/15 border-amber-500/30'
  },
  {
    id: 'free-car-ride',
    badge: 'DOORSTEP VIP',
    badgeDot: 'bg-emerald-400 shadow-[0_0_8px_#10b981]',
    title: 'Free Car Pickup & Drop',
    subtitle: 'Complimentary Site Visit Ride',
    href: '/site-visit',
    icon: <Car className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />,
    glowColor: '#10b981',
    iconBg: 'bg-emerald-500/15 border-emerald-500/30'
  },
  {
    id: 'years-experience',
    badge: 'TRUSTED SINCE 2011',
    badgeDot: 'bg-blue-400 shadow-[0_0_8px_#3b82f6]',
    title: '15+ Years Experience',
    subtitle: '5,000+ Satisfied Families',
    href: '/about',
    icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />,
    glowColor: '#3b82f6',
    iconBg: 'bg-blue-500/15 border-blue-500/30'
  },
  {
    id: 'spot-registration',
    badge: 'LEGAL VERIFIED',
    badgeDot: 'bg-[#ea511c] shadow-[0_0_8px_#ea511c]',
    title: '100% Clear Titles',
    subtitle: 'Instant Spot Registration',
    href: '/properties',
    icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />,
    glowColor: '#ea511c',
    iconBg: 'bg-orange-500/15 border-orange-500/30'
  }
];

export default function NeoGlassWidgets() {
  return (
    <section className="w-full py-4 sm:py-6 bg-slate-950 border-y border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Animated Border-Beam Neo-Glass Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {NEO_WIDGETS.map((widget) => (
            <Link
              key={widget.id}
              href={widget.href}
              style={{ '--glow-color': widget.glowColor } as React.CSSProperties}
              className="group relative rounded-2xl sm:rounded-3xl p-[1.5px] overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-lg select-none cursor-pointer block"
            >
              {/* Animated Continuous Orbiting Border Beam */}
              <div 
                className="absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_45deg,var(--glow-color)_90deg,transparent_135deg)] animate-[spin_5s_linear_infinite]"
              />

              {/* Inner Neo-Glass Card Surface */}
              <div className="relative h-full rounded-[14.5px] sm:rounded-[22.5px] bg-slate-900/95 backdrop-blur-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 sm:space-y-4 border border-white/5 group-hover:bg-slate-900/90 transition-colors">
                
                {/* Top Row: Glowing Icon & Live Status Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center border ${widget.iconBg} shadow-inner`}>
                    {widget.icon}
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    <span className={`w-1.5 h-1.5 rounded-full ${widget.badgeDot}`} />
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 tracking-wider uppercase">
                      {widget.badge}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Punchy Title & Subtitle */}
                <div className="space-y-0.5">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-[17px] tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
                    {widget.title}
                  </h3>
                  <p className="text-slate-400 text-[11px] sm:text-xs font-medium tracking-wide leading-tight">
                    {widget.subtitle}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
