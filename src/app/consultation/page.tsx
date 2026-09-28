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

      {/* Header */}
      <section className="pt-32 pb-14 bg-[#0b1329] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329] via-[#073575]/40 to-[#0b1329]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>EXPERT ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Personal Real Estate Consultation
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light">
            Direct, data-backed guidance on land valuations, upcoming growth corridors, and clear-title investments in Ongole and Andhra Pradesh.
          </p>
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
