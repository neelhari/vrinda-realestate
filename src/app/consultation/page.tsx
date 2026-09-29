import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ConsultationClient from './ConsultationClient';
import { Compass, ShieldCheck, Phone, CheckCircle2, UserCheck } from 'lucide-react';
import { buildPhoneUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Real Estate Consultation with Founder Bejapur Ayyappa Sai',
  description: 'Book a 1-on-1 strategic property consultation in Ongole. Get honest guidance on plot values, growth corridors, and legal diligence.',
};

export default function ConsultationPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* 100% Bright, Pristine Consultation Photo Banner with Left-Aligned Title & Description Inside (Zero color shade) */}
      <section className="relative w-full h-56 sm:h-72 lg:h-80 flex items-end pb-6 sm:pb-8 overflow-hidden bg-slate-900">
        <Image
          src="/images/hero-luxury-villa.jpg"
          alt="Personal Real Estate Consultation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.9)]">
              Property Consultation
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white leading-relaxed font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)] max-w-xl">
              Direct, data-backed guidance on land valuations, upcoming growth corridors, and clear-title investments in Ongole and Andhra Pradesh.
            </p>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-16 bg-[#f8fafc] grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left Founder Profile & Advisory Topics */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src="/images/founder-ayyappa-sai.png"
                      alt="Bejapur Ayyappa Sai"
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-slate-900">Bejapur Ayyappa Sai</h3>
                    <p className="text-xs text-[#ea511c] font-semibold">Founder & Managing Director</p>
                    <p className="text-xs text-slate-500">Vrinda Real Estate, Ongole</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Consultation Topics Covered:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Budget matching & high-growth plot identification in Koppolu</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Title deed analysis & Sub-Registrar document verification</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Custom independent house vs. luxury villa feasibility</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>NRI land portfolio management & safe custody advisory</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <p className="font-bold text-slate-900">Direct Contact Hotline:</p>
                  <a href={buildPhoneUrl('8464882925')} className="text-sm font-bold text-[#0a4ba6] hover:underline mt-1 block">
                    +91 8464882925
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <ConsultationClient />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
