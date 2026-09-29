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
    <div className="fixed bottom-6 right-5 sm:bottom-6 sm:right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group active:scale-95 border border-white/20"
        aria-label="Direct WhatsApp Chat"
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>
        <span className="hidden sm:inline text-xs font-semibold pr-1 tracking-wide">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
