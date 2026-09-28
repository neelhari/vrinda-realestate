'use client';

import React, { useState } from 'react';
import { ServiceItem } from '@/lib/types';
import { ArrowRight, Check, Compass, FileCheck, Home, MapPin, Car } from 'lucide-react';

interface ServicesPreviewProps {
  services?: ServiceItem[];
}

export default function ServicesPreview({ services = [] }: ServicesPreviewProps) {
  const [activeTab, setActiveTab] = useState(0);

  const defaultServices = [
    {
      id: 'srv-1',
      title: 'Residential Open Plots',
      shortDesc: 'Verified, clear-title open plots in master-planned gated layouts.',
      features: [
        '100% Verified clear land titles with 30-year EC',
        'Immediate spot registration assistance',
        '40ft & 33ft wide blacktop roads with drainage',
        'High capital appreciation in Koppolu corridor'
      ],
      ctaText: 'Explore Available Plots',
      ctaHref: '/plots'
    },
    {
      id: 'srv-2',
      title: 'Guided Site Visits',
      shortDesc: 'Complimentary on-ground tours with our local property specialists.',
      features: [
        'Flexible weekend & weekday scheduling',
        'Physical boundary stone & setback inspection',
        'Neighborhood infrastructure & road connectivity review',
        'Direct consultation with founder Ayyappa Sai'
      ],
      ctaText: 'Schedule a Free Tour',
      ctaHref: '/site-visit'
    },
    {
      id: 'srv-3',
      title: 'Legal & Registration Support',
      shortDesc: 'Seamless end-to-end documentation from title check to Sub-Registrar deed.',
      features: [
        '30-year link document verification',
        'Drafting government-compliant sale deeds',
        'Sub-registrar slot booking & in-person accompaniment',
        'Post-sale revenue mutation guidance'
      ],
      ctaText: 'Consult Legal Team',
      ctaHref: '/consultation'
    },
    {
      id: 'srv-4',
      title: 'Luxury Villas & Houses',
      shortDesc: 'Contemporary gated community duplexes and standalone custom homes.',
      features: [
        '100% Vaastu compliant modern architecture',
        'Quality construction with private gardens & car porch',
        'Move-in ready & under-construction choices',
        'Prime residential enclaves in Ongole'
      ],
      ctaText: 'View Villas & Houses',
      ctaHref: '/villas'
    }
  ];

  const items = services.length > 0 ? services : defaultServices;

  return (
    <section className="py-24 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-[#ea511c] uppercase">
              04 — CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0b1329] font-bold tracking-tight">
              Real Estate Advisory & Services
            </h2>
          </div>
          <a
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a4ba6] hover:text-[#ea511c] group self-start md:self-auto"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 4-Item Clean Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.slice(0, 4).map((srv, idx) => (
            <div
              key={srv.id}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs font-mono text-[#ea511c] font-bold">0{idx + 1}</span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Vrinda Service</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {srv.shortDesc}
                </p>

                <div className="space-y-2 pt-2">
                  {srv.features?.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={(srv as any).ctaHref || '/services'}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0a4ba6] hover:text-[#ea511c] transition-colors"
                >
                  <span>{srv.ctaText || 'Learn More'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
