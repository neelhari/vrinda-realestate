'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function WhyVrinda() {
  const trustPoints = [
    {
      metric: '100%',
      label: 'Verified Clear Titles',
      summary: 'Every plot is vetted through 30-year link records, nil encumbrance (EC), and revenue clearance before listing.',
      highlight: 'Zero legal disputes'
    },
    {
      metric: 'Spot',
      label: 'Direct Registration',
      summary: 'End-to-end support at the Sub-Registrar office with deed drafting and mutation guidance.',
      highlight: 'Immediate ownership transfer'
    },
    {
      metric: '40 ft',
      label: 'Wide Blacktop Roads',
      summary: 'Master-planned layouts in prime Koppolu and Singarakonda corridors with underground utilities.',
      highlight: 'High appreciation potential'
    },
    {
      metric: 'Direct',
      label: 'Founder Advisory',
      summary: 'Meet founder Bejapur Ayyappa Sai in person for transparent pricing and genuine guidance.',
      highlight: 'No middleman markups'
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-slate-200">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-[#ea511c] uppercase">
              01 — THE VRINDA STANDARD
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0b1329] font-bold tracking-tight">
              Real estate decisions built on absolute clarity.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              We operate with a single rule: every square yard we sell must have spotless legal documentation and genuine growth value in Prakasam district.
            </p>
          </div>
        </div>

        {/* Minimalist Architectural Stat Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {trustPoints.map((item, index) => (
            <div
              key={item.label}
              className={`py-8 md:py-0 ${index === 0 ? 'md:pr-8' : index === trustPoints.length - 1 ? 'md:pl-8' : 'md:px-8'} space-y-4 group`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-4xl sm:text-5xl font-serif font-bold text-[#0a4ba6] tracking-tight group-hover:text-[#ea511c] transition-colors">
                  {item.metric}
                </span>
                <span className="text-[10px] font-mono text-slate-400">0{index + 1}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {item.label}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
