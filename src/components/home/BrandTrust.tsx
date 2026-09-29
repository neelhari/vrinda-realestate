'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface BrandTrustProps {
  story?: string;
}

export default function BrandTrust({ story }: BrandTrustProps) {
  return (
    <section className="py-14 sm:py-18 bg-[#f8fafc] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Founder Photo Treatment */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Outer decorative border/card */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white p-2 border border-slate-200">
                <div className="relative h-[380px] sm:h-[440px] w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/founder-ayyappa-sai.png"
                    alt="Bejapur Ayyappa Sai, Founder of Vrinda Real Estate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Founder badge on photo */}
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-0.5">
                    <p className="text-[10px] font-mono tracking-widest uppercase font-semibold text-amber-400">
                      FOUNDER & LEAD ADVISOR
                    </p>
                    <h3 className="text-lg font-bold font-serif">Bejapur Ayyappa Sai</h3>
                    <p className="text-xs text-slate-300">Vrinda Real Estate • Ongole, AP</p>
                  </div>
                </div>
              </div>

              {/* Floating Verification Tag */}
              <div className="absolute -bottom-3 -right-2 sm:-right-3 bg-white p-3 rounded-xl shadow-lg border border-slate-100 max-w-[190px] hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0a4ba6]/10 flex items-center justify-center text-[#0a4ba6] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">100% Clear Titles</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Sub-Registrar verified</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Brand Story & Principles */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4 sm:space-y-5"
          >
            
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-[#ea511c] uppercase">
                HERITAGE & LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0b1329] font-bold leading-tight tracking-tight">
                Property decisions built on clarity, trust and local expertise.
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-light">
              {story ||
                'Founded by Bejapur Ayyappa Sai, Vrinda Real Estate was established with a clear mission: to bring absolute transparency, verified documentation, and genuine investment value to every homebuyer and land investor in Prakasam district.'}
            </p>

            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-light">
              We specialize in carefully hand-picked residential open plots in fast-expanding corridors like Koppolu and Singarakonda, as well as bespoke independent houses and luxury villas. We guide you personally through every milestone—from layout verification to transparent registration at the Sub-Registrar office.
            </p>

            {/* Trust Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-800 font-medium">100% Legal Clear-Title Guarantee</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-800 font-medium">Direct Founder Consultation</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-800 font-medium">Transparent Spot Registration</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-800 font-medium">Complete Sub-Registrar Coordination</span>
              </div>
            </div>

            {/* Founder Sign-off Block */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900">Bejapur Ayyappa Sai</p>
                <p className="text-xs text-slate-500">Founder & Managing Director, Vrinda Real Estate</p>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#ea511c]" />
                  <span>FCI Rd, N. T. R Colony, Koppolu, Ongole</span>
                </p>
              </div>

              <a
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a4ba6] hover:text-[#ea511c] group transition-colors"
              >
                <span>Read Founder Story</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
