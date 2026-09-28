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
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Property Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <Image
          src={mainImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Dark subtle gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-[#0a4ba6] shadow-xs">
            {typeLabels[property.type]}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${statusColors[property.status]}`}>
            {property.status}
          </span>
        </div>

        {/* Verification Tag */}
        {(property.dtcpApproved || property.reraApproved) && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-emerald-400 text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Clear Title</span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-5 flex flex-col justify-between grow space-y-4">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#ea511c] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <a
            href={`/properties/${property.slug}`}
            className="block text-base font-serif font-bold text-slate-900 group-hover:text-[#0a4ba6] transition-colors leading-snug line-clamp-2"
          >
            {property.title}
          </a>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.area} {property.areaUnit}</span>
            </div>
            {property.facing && (
              <div className="flex items-center gap-1.5 truncate">
                <Check className="w-3.5 h-3.5 text-[#ea511c]" />
                <span className="truncate">{property.facing}</span>
              </div>
            )}
            {property.bedrooms && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing & CTAs */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-medium">Pricing</p>
            <p className="text-sm font-bold text-[#0a4ba6]">
              {property.priceLabel || 'Contact for Price'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors text-xs font-semibold"
              title="Quick WhatsApp Enquiry"
            >
              WhatsApp
            </a>

            <a
              href={`/properties/${property.slug}`}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-900 hover:bg-[#0a4ba6] text-white text-xs font-semibold transition-colors"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
