'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck, Compass, FileCheck, Sparkles } from 'lucide-react';

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    {
      number: '01',
      title: 'Discover & Match',
      tagline: 'Tailored to budget and facing preferences',
      description: 'Explore verified residential plots, luxury villas, or independent homes in Ongole with upfront pricing.',
      actionLabel: 'Explore Properties',
      actionHref: '/properties',
      image: '/images/category-plots.jpg',
      points: ['Budget matching', 'East/North facing options', 'Clear layout blueprints']
    },
    {
      number: '02',
      title: 'Guided Site Visit',
      tagline: 'Walk the actual layout ground with specialists',
      description: 'Inspect physical boundary stones, 40-foot blacktop road widths, avenue plantations, and connectivity firsthand.',
      actionLabel: 'Book Guided Tour',
      actionHref: '/site-visit',
      image: '/images/category-villas.jpg',
      points: ['Complimentary private tour', 'Boundary verification', 'Surrounding infra check']
    },
    {
      number: '03',
      title: 'Legal & Title Diligence',
      tagline: '100% Verified Government Revenue Records',
      description: 'Review 30-year link documents, certified encumbrance certificates (EC), and revenue sanctions with peace of mind.',
      actionLabel: 'Talk to Legal Advisor',
      actionHref: '/consultation',
      image: '/images/hero-luxury-villa.jpg',
      points: ['30-year link documents', 'Sub-Registrar EC verification', 'Nil-encumbrance proof']
    },
    {
      number: '04',
      title: 'Spot Registration',
      tagline: 'Direct Sub-Registrar accompaniment',
      description: 'Receive end-to-end assistance with sale deed drafting, stamp duty coordination, and official government registration.',
      actionLabel: 'Registration Inquiries',
      actionHref: '/contact',
      image: '/images/category-houses.jpg',
      points: ['Direct Sub-Registrar booking', 'Drafting sale agreements', 'Fast government mutation']
    }
  ];

  // Auto-advance step every 4s
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, steps.length]);

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE BUYING JOURNEY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#0b1329] font-bold tracking-tight">
              From Search to Registration
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm font-light">
            A transparent 4-stage process ensuring your investment is safe, clear-titled, and effortless.
          </p>
        </div>

        {/* Interactive Split-Screen Showcase */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          
          {/* Left: Step Switcher List (5 Cols) */}
          <div className="lg:col-span-5 space-y-2">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all duration-300 flex items-start gap-3 border ${
                    isActive
                      ? 'bg-[#f8fafc] border-[#0a4ba6]/30 shadow-xs'
                      : 'bg-transparent border-transparent hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`text-base font-serif font-bold transition-colors ${
                      isActive ? 'text-[#0a4ba6]' : 'text-slate-400'
                    }`}
                  >
                    {step.number}
                  </span>

                  <div className="space-y-0.5 grow">
                    <h3
                      className={`text-sm font-bold transition-colors ${
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
                    <div className="w-2 h-2 rounded-full bg-[#ea511c] mt-1.5 shrink-0 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Interactive Focal Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[340px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8 shadow-lg border border-slate-800">
              
              {/* Background Image with Dynamic Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover opacity-40"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/75 to-transparent" />

              {/* Dynamic Content */}
              <div className="relative z-10 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#ea511c] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                    Stage {steps[activeStep].number}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {steps[activeStep].tagline}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {steps[activeStep].title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light line-clamp-2">
                  {steps[activeStep].description}
                </p>

                {/* Key Points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10">
                  {steps[activeStep].points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] truncate">{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={steps[activeStep].actionHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a4ba6] hover:bg-[#073575] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                  >
                    <span>{steps[activeStep].actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-1.5">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeStep === i ? 'w-5 bg-white' : 'w-1.5 bg-white/30'
                        }`}
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
