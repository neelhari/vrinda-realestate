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
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-[#0b1329]">
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

      {/* Main Content Container with Staggered Entrance */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl lg:max-w-3xl space-y-6"
        >
          
          {/* Refined Luxury Location / Trust Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 text-xs font-medium tracking-wide shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Verified Land & Luxury Living • Ongole</span>
          </motion.div>

          {/* Large Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.15] font-semibold tracking-tight"
          >
            {headline || 'Find a Place Worth Calling Home.'}
          </motion.h1>

          {/* Supporting Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-200/90 leading-relaxed max-w-2xl font-light"
          >
            {subheadline ||
              'Premium residential open plots, luxury villas, and independent homes in carefully selected, high-growth corridors across Ongole, Koppolu, and Andhra Pradesh.'}
          </motion.p>

          {/* Clean 2-CTA Action Cluster: Explore Properties & Direct WhatsApp */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <a
              href="/properties"
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-full text-sm font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group active:scale-95 border border-white/10"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-white/20"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp Us</span>
            </a>
          </motion.div>

          {/* Quick Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>100% Clear Title Verification</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>End-to-End Registration Support</span>
            </div>
          </motion.div>

        </motion.div>
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
