'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, MessageSquare, Phone, MapPin, CheckCircle } from 'lucide-react';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

export default function SiteVisitCTA() {
  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I would like to schedule a property site visit in Ongole.');

  return (
    <section className="relative py-20 lg:py-28 bg-[#0b1329] text-white overflow-hidden">
      {/* Background Architectural Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/images/category-plots.jpg"
          alt="Vrinda Property Site Visit"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0b1329]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900/90 to-[#073575]/70 border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea511c]/20 border border-[#ea511c]/30 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>COMPLIMENTARY GUIDED SITE TOUR</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                See the property before you decide.
              </h2>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                Book a guided site visit and explore the location, layout, available plot dimensions, road widths, and surrounding commercial development with our on-ground specialists.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>On-ground Layout Tour</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Title Document Review</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Sales Pressure</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="/site-visit"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#ea511c] hover:bg-[#d04312] text-white rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Site Visit</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp 9959912500</span>
                </a>

                <a
                  href={buildPhoneUrl('8464882925')}
                  className="inline-flex items-center gap-2 px-4 py-3.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ea511c]" />
                  <span>Call 8464882925</span>
                </a>
              </div>
            </div>

            {/* Right Side Quick Info Box */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0a4ba6] flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Main Focus Hub</p>
                  <p className="text-sm font-bold text-white">Koppolu & Ongole, AP</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 text-xs text-slate-300 space-y-1.5">
                <p>✓ Weekday & weekend slots available</p>
                <p>✓ Meet founder Bejapur Ayyappa Sai</p>
                <p>✓ Free consultation on spot</p>
              </div>

              <div className="pt-2">
                <a
                  href="/site-visit"
                  className="block text-center w-full py-2.5 px-4 bg-white text-[#0b1329] hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors"
                >
                  Choose Date & Time
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
