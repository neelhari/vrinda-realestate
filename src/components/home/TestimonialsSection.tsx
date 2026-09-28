'use client';

import React, { useState } from 'react';
import { Testimonial } from '@/lib/types';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const published = testimonials.filter((t) => t.isPublished);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (published.length === 0) return null;

  const current = published[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? published.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === published.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-[11px] font-mono tracking-widest text-[#ea511c] uppercase">
            05 — VERIFIED CLIENT EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0b1329] font-bold">
            Trusted by Land & Home Buyers in Ongole
          </h2>
        </div>

        {/* Big Editorial Quote Container */}
        <div className="relative bg-[#f8fafc] rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-xs">
          
          <div className="space-y-6">
            
            {/* Stars & Quote Icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-slate-300 stroke-[1.5]" />
            </div>

            {/* Quote text */}
            <blockquote className="text-lg sm:text-2xl font-serif text-slate-900 leading-relaxed font-normal">
              "{current.comment}"
            </blockquote>

            {/* Author Footer */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{current.name}</h3>
                <p className="text-xs text-slate-500">{current.role || current.location}</p>
                {current.propertyName && (
                  <p className="text-xs font-semibold text-[#0a4ba6] mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Buyer: {current.propertyName}</span>
                  </p>
                )}
              </div>

              {/* Slider Controls */}
              {published.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2">
                    0{currentIndex + 1} / 0{published.length}
                  </span>
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full border border-slate-300 hover:border-slate-800 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full bg-[#0a4ba6] hover:bg-[#073575] text-white flex items-center justify-center transition-colors active:scale-95 shadow-xs"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
