'use client';

import React from 'react';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { buildWhatsAppUrl } from '@/lib/utils';

export default function FloatingWhatsApp() {
  const whatsappUrl = buildWhatsAppUrl(
    '9959912500',
    'Hello Vrinda Real Estate, I am looking for property assistance in Ongole.'
  );

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 group active:scale-95 border border-white/25"
        aria-label="Direct WhatsApp Chat"
      >
        <div className="flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6 text-white" />
        </div>
        <span className="hidden sm:inline text-xs font-semibold pr-1 tracking-wide">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
