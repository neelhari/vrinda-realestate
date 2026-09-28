'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/types';
import { Filter, Eye } from 'lucide-react';

interface GalleryClientProps {
  initialGallery: GalleryItem[];
}

export default function GalleryClient({ initialGallery }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filtered = initialGallery.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'plots', label: 'Residential Plots' },
    { id: 'villas', label: 'Luxury Villas' },
    { id: 'houses', label: 'Independent Houses' },
    { id: 'developments', label: 'Developments' },
  ];

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-[#0a4ba6] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Eye className="w-8 h-8" />
              </div>
            </div>

            <div className="p-4 bg-white">
              <h4 className="text-sm font-serif font-bold text-slate-900 truncate">{item.title}</h4>
              {item.caption && (
                <p className="text-xs text-slate-500 mt-0.5 truncate">{item.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/20 p-2" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[480px] sm:h-[580px] w-full bg-black rounded-2xl overflow-hidden">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="p-4 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">{selectedPhoto.title}</h3>
                {selectedPhoto.caption && (
                  <p className="text-xs text-slate-300 mt-0.5">{selectedPhoto.caption}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
