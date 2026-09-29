import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  MapPin, 
  Maximize2, 
  Compass, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  Check, 
  ArrowLeft,
  Share2,
  Sparkles
} from 'lucide-react';
import { db } from '@/lib/db';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

interface PropertyDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = db.getPropertyBySlug(slug);

  if (!property) {
    return { title: 'Property Not Found' };
  }

  return {
    title: `${property.title} | ${property.location} - Vrinda Real Estate`,
    description: `${property.title} in ${property.location}. ${property.area} ${property.areaUnit}, verified clear-title documentation by Vrinda Real Estate Ongole.`,
    openGraph: {
      title: property.title,
      description: property.description,
      images: property.images && property.images.length > 0 ? [property.images[0]] : ['/images/hero-luxury-villa.jpg'],
    }
  };
}

export const revalidate = 0;

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { slug } = await params;
  const property = db.getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const whatsappUrl = buildWhatsAppUrl(
    '9959912500',
    `Hello Vrinda Real Estate, I am interested in ${property.title} located at ${property.location}. Please share complete details, plot map, and pricing.`
  );

  const phoneUrl = buildPhoneUrl('8464882925');

  const typeLabels = {
    plot: 'Residential Plot',
    villa: 'Luxury Villa',
    house: 'Independent House',
    commercial: 'Commercial Property'
  };

  const images = property.images && property.images.length > 0
    ? property.images
    : ['/images/hero-luxury-villa.jpg', '/images/category-plots.jpg'];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Top Back Navigation Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0a4ba6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Properties</span>
          </a>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{typeLabels[property.type]}</span>
            <span>•</span>
            <span className="text-slate-700 font-medium">{property.location}</span>
          </div>
        </div>
      </div>

      {/* Property Details Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 grow">
        
        {/* 1. DIRECT IMMERSIVE SITE IMAGES (100% Clean, pristine, zero floating badge clutter) */}
        <div className="space-y-3">
          {/* Main Visual Photo */}
          <div className="relative h-[300px] sm:h-[480px] lg:h-[520px] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-md">
            <Image
              src={images[0]}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
          </div>

          {/* Thumbnail Gallery (if more than 1 image) */}
          {images.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative h-20 sm:h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={img}
                    alt={`${property.title} thumbnail ${i + 1}`}
                    fill
                    sizes="250px"
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. MODERN EDITORIAL HEADING & PROPERTY TYPE (No pill badges, no pricing box) */}
        <div className="space-y-2 pt-1 border-b border-slate-200 pb-5">
          {/* Modern Minimal Category Tagline */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-slate-500">
            <span className="text-[#0a4ba6] font-bold">{typeLabels[property.type]}</span>
            <span className="text-slate-300">•</span>
            <span>{property.location}</span>
            {(property.dtcpApproved || property.reraApproved) && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Clear Title</span>
                </span>
              </>
            )}
          </div>

          {/* Property Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight">
            {property.title}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 pt-0.5">
            <MapPin className="w-4 h-4 text-[#ea511c] shrink-0" />
            <span>{property.address || property.location}</span>
          </div>
        </div>

        {/* 3. KEY SPECIFICATIONS (Compact, visual 2x2 or 4-col grid) */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Property Specifications
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-1">
              <p className="text-[11px] text-slate-500 uppercase font-semibold">Total Area</p>
              <p className="text-sm sm:text-base font-bold text-slate-900">{property.area} {property.areaUnit}</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-1">
              <p className="text-[11px] text-slate-500 uppercase font-semibold">Facing</p>
              <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {property.facing ? `${property.facing} Facing` : 'East / North Available'}
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-1">
              <p className="text-[11px] text-slate-500 uppercase font-semibold">Road Width</p>
              <p className="text-sm sm:text-base font-bold text-slate-900">40 ft Blacktop</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-1">
              <p className="text-[11px] text-slate-500 uppercase font-semibold">Registration</p>
              <p className="text-sm sm:text-base font-bold text-emerald-700">Immediate Spot</p>
            </div>

            {property.bedrooms && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-1">
                <p className="text-[11px] text-slate-500 uppercase font-semibold">Bedrooms</p>
                <p className="text-sm sm:text-base font-bold text-slate-900">{property.bedrooms} BHK</p>
              </div>
            )}

            {property.bathrooms && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-1">
                <p className="text-[11px] text-slate-500 uppercase font-semibold">Bathrooms</p>
                <p className="text-sm sm:text-base font-bold text-slate-900">{property.bathrooms} Baths</p>
              </div>
            )}
          </div>
        </div>

        {/* 4. SHORT DETAILS ABOUT THE PROPERTY */}
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Property Overview
          </h2>
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
              {property.description}
            </p>

            {/* Highlights if present */}
            {property.highlights && property.highlights.length > 0 && (
              <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 5. DIRECT REDIRECT TO WHATSAPP & SITE VISIT (No instant enquiry form clutter) */}
        <div className="pt-4 border-t border-slate-200">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-900">
              Interested in {property.title}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Get direct layout maps, title copy, and schedule a private on-ground site visit with our team.
            </p>

            {/* Direct Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-sm font-semibold shadow-xs hover:shadow-md active:scale-95 transition-all text-center"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href="/site-visit"
                className="flex items-center justify-center gap-2 py-3 px-5 bg-[#ea511c] hover:bg-[#d04312] text-white rounded-xl text-sm font-bold shadow-xs hover:shadow-md active:scale-95 transition-all text-center"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Book a Site Visit</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href={phoneUrl}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0a4ba6] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#0a4ba6]" />
                <span>Or Call +91 8464882925</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
