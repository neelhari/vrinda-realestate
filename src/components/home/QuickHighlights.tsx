'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag, Car, Award, ShieldCheck, Check } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

export default function QuickHighlights() {
  const cabWhatsAppUrl = buildWhatsAppUrl(
    '9959912500',
    'Hello Vrinda Real Estate, I would like to book a Free Car Pickup & Drop for a site visit in Ongole. Please share available timings and arrange the cab.'
  );

  const HIGHLIGHT_CARDS = [
    {
      id: 'budget-plots',
      metric: '₹4L – ₹5 Cr',
      number: '01',
      label: 'Plots For Every Budget',
      highlight: 'Affordable to luxury plots',
      icon: <Tag className="w-4 h-4 text-amber-600" />,
      accentColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-100',
      href: null
    },
    {
      id: 'free-car',
      metric: 'Free Car',
      number: '02',
      label: 'Pickup & Drop Service',
      highlight: 'Tap to book free cab on WhatsApp',
      icon: <Car className="w-4 h-4 text-emerald-600" />,
      accentColor: 'text-emerald-600 group-hover:text-emerald-700',
      iconBg: 'bg-emerald-50 border-emerald-100',
      href: cabWhatsAppUrl,
      isAction: true
    },
    {
      id: 'experience',
      metric: '15+ Years',
      number: '03',
      label: 'Trusted Experience',
      highlight: '5,000+ happy land buyers',
      icon: <Award className="w-4 h-4 text-[#0a4ba6]" />,
      accentColor: 'text-[#0a4ba6]',
      iconBg: 'bg-blue-50 border-blue-100',
      href: null
    },
    {
      id: 'clear-titles',
      metric: '100% Clear',
      number: '04',
      label: 'Spot Registration',
      highlight: 'Direct legal transfer',
      icon: <ShieldCheck className="w-4 h-4 text-[#ea511c]" />,
      accentColor: 'text-[#ea511c]',
      iconBg: 'bg-orange-50 border-orange-100',
      href: null
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Spacious, Stat-Driven Metric Cards (Free Car opens WhatsApp directly, No Arrow clutter) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {HIGHLIGHT_CARDS.map((card, idx) => {
            const CardWrapper = card.href ? 'a' : 'div';
            const wrapperProps = card.href
              ? {
                  href: card.href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'group flex flex-col justify-between h-full p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all duration-200 cursor-pointer'
                }
              : {
                  className: 'flex flex-col justify-between h-full p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs'
                };

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                whileHover={card.href ? { y: -3 } : undefined}
                className="h-full"
              >
                <CardWrapper {...(wrapperProps as any)}>
                  {/* Top Row: Icon + Number (No Arrow) */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${card.iconBg}`}>
                      {card.icon}
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400">
                      {card.number}
                    </span>
                  </div>

                  {/* Middle: Big Bold Crisp Modern Sans Metric & Label */}
                  <div className="py-3 space-y-1">
                    <span className={`text-xl sm:text-2xl lg:text-3xl font-sans font-black tracking-tight block ${card.accentColor} transition-colors`}>
                      {card.metric}
                    </span>
                    
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {card.label}
                    </h3>
                  </div>

                  {/* Bottom Row: Checkmark Benefit Bullet */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-emerald-700">
                    <Check className="w-3 h-3 shrink-0 text-emerald-600" />
                    <span className="truncate">{card.highlight}</span>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

