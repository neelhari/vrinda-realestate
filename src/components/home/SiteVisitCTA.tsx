'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { buildWhatsAppUrl } from '@/lib/utils';

export default function SiteVisitCTA() {
  const whatsappUrl = buildWhatsAppUrl(
    '9959912500',
    'Hello Vrinda Real Estate, I would like to schedule a property site visit in Ongole.'
  );

  return (
    <section className="py-12 sm:py-16 bg-[#f8fafc] border-b border-slate-200 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-5"
        >
          {/* Minimal Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#0a4ba6]" />
            <span>COMPLIMENTARY SITE TOUR</span>
          </div>

          {/* Clean User-Focused Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Schedule Your On-Site Layout Visit
          </h2>

          {/* 1 Short Line (70% text removed) */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-light leading-relaxed">
            Inspect verified plots, road widths, and surrounding developments in Koppolu & Ongole with our specialists.
          </p>

          {/* 2 Grid Action Buttons */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-2">
            <a
              href="/site-visit"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#ea511c] hover:bg-[#d04312] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95 text-center"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Book Visit</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-xs text-center"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0 text-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
