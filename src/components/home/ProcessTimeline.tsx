'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    {
      number: '01',
      title: 'Discover & Match',
      tagline: 'Tailored to budget and facing preferences',
      description: 'Explore verified residential plots, luxury villas, or independent homes in Ongole.',
      actionLabel: 'Explore Properties',
      actionHref: '/properties',
      image: '/images/category-plots.jpg'
    },
    {
      number: '02',
      title: 'Guided Site Visit',
      tagline: 'Walk the actual layout ground with specialists',
      description: 'Inspect physical boundary stones, 40-foot blacktop road widths, and connectivity firsthand.',
      actionLabel: 'Book Guided Tour',
      actionHref: '/site-visit',
      image: '/images/category-villas.jpg'
    },
    {
      number: '03',
      title: 'Legal & Title Diligence',
      tagline: '100% Verified Government Revenue Records',
      description: 'Review 30-year link documents, certified encumbrance certificates (EC), and revenue sanctions.',
      actionLabel: 'Talk to Legal Advisor',
      actionHref: '/consultation',
      image: '/images/hero-luxury-villa.jpg'
    },
    {
      number: '04',
      title: 'Spot Registration',
      tagline: 'Direct Sub-Registrar accompaniment',
      description: 'End-to-end assistance with sale deed drafting, stamp duty, and government mutation.',
      actionLabel: 'Registration Inquiries',
      actionHref: '/contact',
      image: '/images/category-houses.jpg'
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
            A transparent 4-stage process ensuring your property investment is safe, clear-titled, and effortless.
          </p>
        </div>

        {/* Interactive Step Showcase */}
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
                      ? 'bg-[#f8fafc] border-[#0a4ba6]/40 shadow-xs'
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
                    <div className="w-2 h-2 rounded-full bg-[#ea511c] mt-1.5 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Unobstructed Image Card + Clean Minimal Details (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden bg-[#f8fafc] border border-slate-200 shadow-md flex flex-col">
              
              {/* Clear, Bright, Unblurred Photography */}
              <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={steps[activeStep].image}
                      alt={steps[activeStep].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 650px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Micro Stage Pill */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#0a4ba6] text-xs font-bold shadow-xs">
                  Stage {steps[activeStep].number}
                </div>
              </div>

              {/* Clean Minimal Text Section (Not covering image) */}
              <div className="p-5 sm:p-6 space-y-3 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {steps[activeStep].description}
                    </p>
                  </div>

                  <a
                    href={steps[activeStep].actionHref}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0a4ba6] hover:bg-[#073575] text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
                  >
                    <span>{steps[activeStep].actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
