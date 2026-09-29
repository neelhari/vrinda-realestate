import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SiteVisitClient from './SiteVisitClient';
import { db } from '@/lib/db';
import { Calendar, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book a Guided Property Site Visit | Vrinda Real Estate',
  description: 'Schedule a free guided site tour in Koppolu, Ongole, or Singarakonda. Explore plot layouts, road connectivity, and verified legal records with our team.',
};

export const revalidate = 0;

export default function SiteVisitPage() {
  const properties = db.getProperties();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* 100% Bright, Pristine Site Visit Photo Banner with Left-Aligned Title & Description Inside (Zero color shade) */}
      <section className="relative w-full h-56 sm:h-72 lg:h-80 flex items-end pb-6 sm:pb-8 overflow-hidden bg-slate-900">
        <Image
          src="/images/category-plots.jpg"
          alt="Schedule a Guided Site Visit"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.9)]">
              Book a Site Visit
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white leading-relaxed font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)] max-w-xl">
              Schedule a complimentary on-ground layout tour to inspect physical boundary stones and surrounding infrastructure with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-16 bg-[#f8fafc] grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">What to Expect During Your Tour</h3>
                  <p className="text-xs text-slate-500 mt-1">Our site visits are private, transparent, and completely free of sales pressure.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center shrink-0 font-bold text-xs">1</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Physical Boundary Walkthrough</h4>
                      <p className="text-xs text-slate-600">Inspect demarcated plot boundary stones, road widths, and layout setback areas.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Original Link Document Verification</h4>
                      <p className="text-xs text-slate-600">Review government certified title records, DTCP/LP sanction copies, and EC reports.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center shrink-0 font-bold text-xs">3</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Local Infrastructure Overview</h4>
                      <p className="text-xs text-slate-600">Understand upcoming ring roads, school/hospital connectivity, and growth timeline.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0a4ba6]/5 border border-[#0a4ba6]/15 space-y-1.5">
                  <p className="text-xs font-bold text-[#0a4ba6]">Need Immediate Assistance?</p>
                  <p className="text-xs text-slate-600">Directly contact founder Bejapur Ayyappa Sai at <a href="tel:8464882925" className="font-bold underline text-slate-900">+91 8464882925</a></p>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <SiteVisitClient properties={properties} />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
