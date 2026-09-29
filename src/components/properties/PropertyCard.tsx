'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Maximize2, Bed, Bath, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Property } from '@/lib/types';
import { buildWhatsAppUrl } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    '9959912500',
    `Hello Vrinda Real Estate, I am interested in ${property.title} located at ${property.location}. Please share complete details.`
  );

  const typeLabels = {
    plot: 'Residential Plot',
    villa: 'Luxury Villa',
    house: 'Independent House',
    commercial: 'Commercial Property'
  };

  const statusColors = {
    available: 'bg-emerald-500 text-white',
    booked: 'bg-amber-500 text-white',
    sold: 'bg-slate-700 text-white',
    upcoming: 'bg-blue-600 text-white'
  };

  const mainImage = property.images && property.images.length > 0
    ? property.images[0]
    : '/images/hero-luxury-villa.jpg';

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200/90 bg-white hover:border-[#0a4ba6]/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* 70% Visual Dominance: High-Res Image Container */}
      <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-100">
        <Image
          src={mainImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Luxury Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

        {/* Bottom subtle area tag */}
        <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
          <div className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
            {property.area} {property.areaUnit}
          </div>
        </div>
      </div>

      {/* 30% Compact Content: Minimal & Modern Editorial Info */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between grow space-y-2.5">
        <div>
          {/* Modern Editorial Eyebrow */}
          <div className="flex items-center justify-between gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            <span className="text-[#0a4ba6] font-bold">{typeLabels[property.type]}</span>
            <span className="truncate text-slate-400">{property.location}</span>
          </div>

          {/* Title */}
          <a
            href={`/properties/${property.slug}`}
            className="block text-sm sm:text-base font-serif font-bold text-slate-900 group-hover:text-[#0a4ba6] transition-colors leading-snug line-clamp-1"
          >
            {property.title}
          </a>

          {/* Compact Specs Line */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600 truncate">
            <span className="font-medium text-slate-700">{property.facing ? `${property.facing} Facing` : 'Prime Plot'}</span>
            <span className="text-slate-300">•</span>
            <span>{property.bedrooms ? `${property.bedrooms} BHK` : 'Immediate Reg.'}</span>
            {(property.dtcpApproved || property.reraApproved) && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-medium truncate">Clear Title</span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors text-xs font-semibold text-center"
            title="Quick WhatsApp Enquiry"
          >
            WhatsApp
          </a>

          <a
            href={`/properties/${property.slug}`}
            className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-[#0a4ba6] text-white text-xs font-semibold transition-colors text-center"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
