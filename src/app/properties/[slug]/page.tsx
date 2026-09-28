import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinalCTA from '@/components/home/FinalCTA';
import PropertyEnquiryBox from './PropertyEnquiryBox';
import { 
  MapPin, 
  Maximize2, 
  Bed, 
  Bath, 
  Compass, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  Check, 
  Share2,
  Building
} from 'lucide-react';
import { db } from '@/lib/db';
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
    title: `${property.title} | ${property.location}`,
    description: `${property.title} in ${property.location}. ${property.area} ${property.areaUnit}, ${property.priceLabel}. Verified clear-title documentation by Vrinda Real Estate.`,
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
    `Hello Vrinda Real Estate, I am interested in ${property.title} (${property.location}). Please share more details and layout drawings.`
  );

  const phoneUrl = buildPhoneUrl('8464882925');

  const typeLabels = {
    plot: 'Residential Open Plot',
    villa: 'Contemporary Luxury Villa',
    house: 'Independent Family House',
    commercial: 'Commercial Land / Space'
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Breadcrumb Header */}
      <section className="pt-28 pb-6 bg-[#0b1329] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <a href="/properties" className="hover:text-white">Properties</a>
                <span>/</span>
                <span className="text-[#ea511c] font-semibold">{typeLabels[property.type]}</span>
                <span>/</span>
                <span className="text-slate-400">{property.location}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-[#ea511c]" />
                <span>{property.address}</span>
              </div>
            </div>

            {/* Price & Status Pill */}
            <div className="bg-white/10 border border-white/15 px-5 py-3 rounded-2xl text-right backdrop-blur-md">
              <p className="text-[11px] text-slate-300 uppercase font-semibold">Pricing</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{property.priceLabel}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500 text-white">
                {property.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-10 bg-[#f8fafc] grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Gallery, Specs, Description & Amenities */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Photo Showcase Gallery */}
              <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="relative h-[340px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={property.images[0] || '/images/hero-luxury-villa.jpg'}
                    alt={property.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                  {(property.dtcpApproved || property.reraApproved) && (
                    <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verified Clear Title</span>
                    </div>
                  )}
                </div>

                {/* Additional Gallery Thumbnails */}
                {property.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {property.images.map((img, i) => (
                      <div key={i} className="relative h-24 sm:h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <Image
                          src={img}
                          alt={`${property.title} photo ${i + 1}`}
                          fill
                          sizes="260px"
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Key Specifications Grid */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Key Specifications
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[11px] text-slate-500 uppercase font-semibold">Total Area</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{property.area} {property.areaUnit}</p>
                  </div>

                  {property.dimensions && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-500 uppercase font-semibold">Dimensions</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{property.dimensions}</p>
                    </div>
                  )}

                  {property.facing && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-500 uppercase font-semibold">Facing</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5 truncate">{property.facing}</p>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[11px] text-slate-500 uppercase font-semibold">Possession</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{property.possessionDate || 'Immediate'}</p>
                  </div>

                  {property.bedrooms && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-500 uppercase font-semibold">Bedrooms</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{property.bedrooms} BHK</p>
                    </div>
                  )}

                  {property.bathrooms && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-500 uppercase font-semibold">Bathrooms</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{property.bathrooms} Baths</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description & Detailed Narrative */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Property Overview
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {property.description}
                </p>

                {/* Highlights List */}
                {property.highlights && property.highlights.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Development Highlights:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {property.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Amenities & Infrastructure
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <Check className="w-4 h-4 text-[#0a4ba6] shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification & Legal Guarantee Box */}
              <div className="bg-gradient-to-r from-[#073575] to-[#0a4ba6] text-white p-6 sm:p-8 rounded-3xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-[#ea511c] font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-white">Vrinda Legal Transparency Assurance</span>
                </div>
                <h4 className="text-lg font-serif font-bold">100% Document Verification & Spot Registration</h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                  This property has been vetted for complete ownership titles, sub-registrar revenue records, link documents, and zero encumbrances. We provide complete paperwork assistance and Sub-Registrar accompaniment.
                </p>
              </div>

            </div>

            {/* Right Column: Sticky Desktop Enquiry Box & Direct Triggers */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                
                {/* Interactive Enquiry & Schedule Card */}
                <PropertyEnquiryBox property={property} />

                {/* Direct Founder Contact Trigger */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <p className="text-xs font-bold text-slate-900">Direct Consultation</p>
                  <p className="text-xs text-slate-500">
                    Connect directly with founder Bejapur Ayyappa Sai for price negotiation or customized plot boundaries.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={phoneUrl}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-900 hover:bg-[#0a4ba6] text-white rounded-xl text-xs font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sticky Mobile Bottom Bar specifically for Property Detail */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="truncate max-w-[130px]">
          <p className="text-[10px] text-slate-500 uppercase font-bold">Price</p>
          <p className="text-xs font-bold text-[#0a4ba6] truncate">{property.priceLabel}</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`/site-visit?property=${encodeURIComponent(property.title)}`}
            className="flex items-center gap-1 px-3.5 py-2 bg-[#0a4ba6] text-white rounded-lg text-xs font-semibold shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </a>
        </div>
      </div>

      <FinalCTA />
      <Footer />
    </main>
  );
}
