'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

export default function FloatingWhatsApp() {
  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I am looking for property assistance in Ongole.');

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group active:scale-95"
        aria-label="Direct WhatsApp Chat"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>
        <span className="hidden sm:inline text-xs font-semibold pr-1 tracking-wide">
          Chat with Vrinda
        </span>
      </a>
    </div>
  );
}
