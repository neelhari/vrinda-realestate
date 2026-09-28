'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck, Compass, FileCheck } from 'lucide-react';

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Discover & Match',
      tagline: 'Tailored to your budget and exact facing preference',
      description: 'Explore verified residential plots, luxury villas, or independent homes in Ongole with upfront pricing and zero hidden markups.',
      actionLabel: 'Explore Properties',
      actionHref: '/properties',
      image: '/images/category-plots.jpg',
      points: ['Budget matching', 'East/North facing options', 'Clear layout blueprints']
    },
    {
      number: '02',
      title: 'Guided Site Visit',
      tagline: 'Walk the actual layout ground with our specialists',
      description: 'Inspect physical boundary stones, 40-foot blacktop road widths, avenue plantations, and neighborhood growth firsthand.',
      actionLabel: 'Book Guided Tour',
      actionHref: '/site-visit',
      image: '/images/category-villas.jpg',
      points: ['Complimentary private tour', 'Boundary verification', 'Surrounding infra check']
    },
    {
      number: '03',
      title: 'Legal & Title Diligence',
      tagline: '100% Verified Government Revenue Records',
      description: 'Review 30-year link documents, certified encumbrance certificates (EC), DTCP/RERA sanctions with complete peace of mind.',
      actionLabel: 'Talk to Legal Advisor',
      actionHref: '/consultation',
      image: '/images/hero-luxury-villa.jpg',
      points: ['30-year link documents', 'Sub-Registrar EC verification', 'Nil-encumbrance proof']
    },
    {
      number: '04',
      title: 'Spot Registration',
      tagline: 'Direct Sub-Registrar accompaniment and deed transfer',
      description: 'Receive end-to-end assistance with sale deed drafting, stamp duty coordination, and official government registration.',
      actionLabel: 'Registration Inquiries',
      actionHref: '/contact',
      image: '/images/category-houses.jpg',
      points: ['Direct Sub-Registrar booking', 'Drafting sale agreements', 'Fast government mutation']
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-[#ea511c] uppercase">
            03 — THE BUYING JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0b1329] font-bold tracking-tight">
            From Search to Registration
          </h2>
          <p className="text-sm text-slate-600 font-light pt-1">
            A transparent 4-stage process ensuring your investment is safe, clear-titled, and effortless.
          </p>
        </div>

        {/* Interactive Split-Screen Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Step Switcher List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-start gap-4 border ${
                    isActive
                      ? 'bg-[#f8fafc] border-slate-300 shadow-xs'
                      : 'bg-transparent border-transparent hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`text-lg font-serif font-bold transition-colors ${
                      isActive ? 'text-[#0a4ba6]' : 'text-slate-400'
                    }`}
                  >
                    {step.number}
                  </span>

                  <div className="space-y-1 grow">
                    <h3
                      className={`text-base font-bold transition-colors ${
                        isActive ? 'text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal line-clamp-1">
                      {step.tagline}
                    </p>
                  </div>

                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-[#ea511c] mt-2 shrink-0 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Interactive Focal Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[440px] flex flex-col justify-end p-8 sm:p-10 shadow-xl border border-slate-800">
              
              {/* Background Image with Dynamic Crossfade */}
              <Image
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover transition-all duration-700 opacity-40 scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/70 to-transparent" />

              {/* Active Step Content */}
              <div className="relative z-10 space-y-4">
                <span className="text-[11px] font-mono text-[#ea511c] font-bold uppercase tracking-wider">
                  STAGE {steps[activeStep].number} OF 04
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {steps[activeStep].title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl font-light">
                  {steps[activeStep].description}
                </p>

                {/* Key Points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/15">
                  {steps[activeStep].points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href={steps[activeStep].actionHref}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md group"
                  >
                    <span>{steps[activeStep].actionLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
