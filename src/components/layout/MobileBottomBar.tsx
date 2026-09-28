'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

export default function MobileBottomBar() {
  const pathname = usePathname();

  // Hide on admin routes to prevent overlapping controls
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I am interested in exploring properties in Ongole.');
  const phoneUrl = buildPhoneUrl('8464882925');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-3 py-2.5">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={phoneUrl}
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-100 text-slate-800 active:bg-slate-200 transition-colors"
        >
          <Phone className="w-4 h-4 text-[#0a4ba6]" />
          <span className="text-[11px] font-semibold">Call Now</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-emerald-600 text-white active:bg-emerald-700 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>

        <a
          href="/site-visit"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#0a4ba6] text-white active:bg-[#073575] transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[11px] font-semibold">Book Visit</span>
        </a>
      </div>
    </div>
  );
}
