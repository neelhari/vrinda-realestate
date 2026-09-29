'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/lib/types';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const published = testimonials.filter((t) => t.isPublished);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  if (published.length === 0) return null;

  const current = published[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? published.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === published.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide testimonials one by one
  useEffect(() => {
    if (isHovered || published.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, published.length]);

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="text-center space-y-1.5 mb-8">
          <span className="text-[10px] font-mono tracking-widest text-[#ea511c] uppercase font-bold">
            CLIENT EXPERIENCES
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#0b1329] font-bold">
            Trusted by Buyers in Ongole
          </h2>
        </div>

        {/* Big Editorial Quote Container */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="relative bg-[#f8fafc] rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xs"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id || currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-300 stroke-[1.5]" />
              </div>

              {/* Quote text */}
              <blockquote className="text-base sm:text-lg font-serif text-slate-900 leading-relaxed font-normal">
                "{current.comment}"
              </blockquote>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{current.name}</h3>
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
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-xs font-mono text-slate-400 mr-1">
                      0{currentIndex + 1} / 0{published.length}
                    </span>
                    <button
                      onClick={handlePrev}
                      className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-800 bg-white text-slate-700 flex items-center justify-center transition-colors active:scale-95"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-8 h-8 rounded-full bg-[#0a4ba6] hover:bg-[#073575] text-white flex items-center justify-center transition-colors active:scale-95 shadow-xs"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          {published.length > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-4 pt-2 border-t border-slate-200/40">
              {published.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-5 bg-[#0a4ba6]' : 'w-2 bg-slate-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
