'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, ImageIcon } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const safeImages = images && images.length > 0 ? images : ['/images/category-plots.jpg'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeIndex = selectedIndex < safeImages.length ? selectedIndex : 0;
  const currentImage = safeImages[activeIndex];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % safeImages.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  return (
    <div className="space-y-3.5">
      {/* 1. Main Stage / Hero Image Display */}
      <div className="group relative h-[320px] sm:h-[480px] lg:h-[530px] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-md select-none">
        <Image
          src={currentImage}
          alt={`${title} - Photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1000px"
          className="object-cover transition-all duration-300 ease-out"
        />

        {/* Counter Badge */}
        {safeImages.length > 1 && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-md z-10">
            {activeIndex + 1} / {safeImages.length}
          </div>
        )}

        {/* Left / Right Arrow Navigation (Visible when > 1 image) */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg backdrop-blur-xs transition-all hover:scale-110 active:scale-95 z-10 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg backdrop-blur-xs transition-all hover:scale-110 active:scale-95 z-10 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* 2. Interactive E-commerce Thumbnail Carousel */}
      {safeImages.length > 1 && (
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          {safeImages.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                aria-label={`View photo ${i + 1}`}
                className={`relative h-18 sm:h-24 w-24 sm:w-32 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'ring-3 ring-[#0a4ba6] ring-offset-2 ring-offset-white shadow-sm opacity-100 scale-100'
                    : 'opacity-65 hover:opacity-100 border border-slate-200 hover:border-slate-400'
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${i + 1}`}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
