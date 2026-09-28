'use client';

import React from 'react';
import { Calendar, MessageSquare, Phone, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

export default function FinalCTA() {
  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I would like to schedule a discussion about purchasing property in Ongole.');
  const phoneUrl = buildPhoneUrl('8464882925');

  return (
    <section className="py-20 lg:py-28 bg-[#0b1329] text-white relative overflow-hidden">
      {/* Subtle radial glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0a4ba6]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#ea511c]"></span>
          <span>START YOUR JOURNEY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Let's find the right property for you.
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
          Whether you are looking for an open plot in Koppolu, a luxury villa in Ongole, or looking for verified real estate guidance, we are ready to assist you.
        </p>

        {/* 3 Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/site-visit"
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all group active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Site Visit</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href={phoneUrl}
            className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md transition-all"
          >
            <Phone className="w-4 h-4 text-[#ea511c]" />
            <span>Call +91 8464882925</span>
          </a>
        </div>

        {/* Footer Guarantee Note */}
        <p className="text-xs text-slate-400 pt-4">
          Direct assistance from founder Bejapur Ayyappa Sai • 100% Verified Legal Documents • No Hidden Costs
        </p>

      </div>
    </section>
  );
}
