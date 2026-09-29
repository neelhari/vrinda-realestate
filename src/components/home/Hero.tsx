'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, CheckCircle2, Shield } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { buildWhatsAppUrl } from '@/lib/utils';

interface HeroProps {
  headline?: string;
  subheadline?: string;
}

export default function Hero({ headline, subheadline }: HeroProps) {
  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I would like to enquire about available properties in Ongole.');

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0b1329]">
      {/* Background Architectural Image with subtle gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-luxury-villa.jpg"
          alt="Vrinda Real Estate Luxury Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic Multi-stop Overlay to ensure crystal-clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/95 via-[#0b1329]/80 to-[#0b1329]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-[#0b1329]/40" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-medium tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#ea511c]"></span>
            <span>VRINDA REAL ESTATE • ONGOLE</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.15] font-semibold tracking-tight">
            {headline || 'Find a Place Worth Calling Home.'}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed max-w-2xl font-light">
            {subheadline ||
              'Premium residential open plots, luxury villas, and independent homes in carefully selected, high-growth corridors across Ongole, Koppolu, and Andhra Pradesh.'}
          </p>

          {/* CTA Action Cluster */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="/properties"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl group active:scale-95"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="/site-visit"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-100 text-[#0b1329] rounded-full text-sm font-semibold transition-all duration-200 shadow-md active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#0a4ba6]" />
              <span>Book a Site Visit</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 rounded-full text-sm font-medium backdrop-blur-md transition-all duration-200"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Quick Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ea511c]" />
              <span>100% Clear Title Verification</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>End-to-End Registration Support</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Information Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/40 backdrop-blur-md border-t border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-4 gap-4 text-center divide-x divide-white/10">
            <div className="text-white text-xs font-medium tracking-wide">
              <span className="text-[#ea511c] font-bold">01.</span> Residential Plots in Koppolu
            </div>
            <div className="text-white text-xs font-medium tracking-wide">
              <span className="text-[#ea511c] font-bold">02.</span> Luxury Villas & Houses
            </div>
            <div className="text-white text-xs font-medium tracking-wide">
              <span className="text-[#ea511c] font-bold">03.</span> Direct Founder Consultation
            </div>
            <div className="text-white text-xs font-medium tracking-wide">
              <span className="text-[#ea511c] font-bold">04.</span> Guided Site Visit Tours
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
