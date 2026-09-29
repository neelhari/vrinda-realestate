'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

export default function WhyVrinda() {
  const trustPoints = [
    {
      metric: '100%',
      label: 'Verified Clear Titles',
      summary: 'Every plot is vetted through 30-year link records, nil encumbrance (EC), and revenue clearance.',
      highlight: 'Zero legal disputes'
    },
    {
      metric: 'Spot',
      label: 'Direct Registration',
      summary: 'End-to-end support at the Sub-Registrar office with deed drafting and mutation guidance.',
      highlight: 'Immediate transfer'
    },
    {
      metric: '40 ft',
      label: 'Wide Blacktop Roads',
      summary: 'Master-planned layouts in prime Koppolu and Singarakonda corridors with utilities.',
      highlight: 'High appreciation'
    },
    {
      metric: 'Direct',
      label: 'Founder Advisory',
      summary: 'Meet founder Bejapur Ayyappa Sai in person for transparent pricing and genuine guidance.',
      highlight: 'Zero middleman markups'
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE VRINDA STANDARD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#0b1329] font-bold tracking-tight">
              Absolute Clarity & Legal Trust
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm font-light">
            Every square yard we represent comes with verified legal documentation in Prakasam district.
          </p>
        </div>

        {/* 2-Column Minimalist Stat Grid on Mobile / 4-Column on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {trustPoints.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#f8fafc] border border-slate-200/80 shadow-2xs hover:border-[#0a4ba6]/40 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-4xl font-serif font-bold text-[#0a4ba6] tracking-tight group-hover:text-[#ea511c] transition-colors">
                    {item.metric}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">0{index + 1}</span>
                </div>

                <h3 className="text-xs sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {item.label}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-500 leading-normal hidden sm:block">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2 sm:pt-3 mt-2 border-t border-slate-200/60 flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-700">
                <Check className="w-3 h-3 shrink-0" />
                <span className="truncate">{item.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
