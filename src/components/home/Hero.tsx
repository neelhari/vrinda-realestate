'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { buildWhatsAppUrl } from '@/lib/utils';

interface HeroProps {
  headline?: string;
  subheadline?: string;
}

export default function Hero({ headline, subheadline }: HeroProps) {
  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I would like to enquire about available properties in Ongole.');

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden bg-slate-950">
      {/* 100% Pure, Bright Architectural Image (Zero dark overlays/effects) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-luxury-villa.jpg"
          alt="Vrinda Real Estate Luxury Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-4 sm:space-y-6"
        >
          {/* Large Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight font-bold tracking-tight [text-shadow:_0_3px_16px_rgba(0,0,0,0.9)]">
            {headline || 'Find a Place Worth Calling Home.'}
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-lg text-white leading-relaxed max-w-xl font-medium [text-shadow:_0_2px_10px_rgba(0,0,0,0.85)]">
            {subheadline ||
              'Premium residential open plots, luxury villas, and independent homes in prime high-growth corridors across Ongole, Koppolu, and Andhra Pradesh.'}
          </p>

          {/* Clean Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-full text-xs sm:text-sm font-semibold transition-all shadow-lg active:scale-95"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-xs sm:text-sm font-semibold transition-all shadow-lg active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Clean 2-item Micro Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/90 drop-shadow-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Clear Title Verification</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Direct Spot Registration</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
