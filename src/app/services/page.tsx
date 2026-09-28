import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinalCTA from '@/components/home/FinalCTA';
import { db } from '@/lib/db';
import { 
  MapPin, 
  Car, 
  Compass, 
  FileCheck, 
  Home, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Real Estate Services & Consultation in Ongole',
  description: 'Comprehensive property advisory: Verified open plots, guided site visit tours, Sub-Registrar registration assistance, and luxury villa consulting.',
};

export const revalidate = 0;

export default function ServicesPage() {
  const services = db.getServices();
  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I would like to know more about your services.');

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0b1329] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329] via-[#073575]/40 to-[#0b1329]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FULL-SERVICE REAL ESTATE ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Comprehensive Property Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light">
            From discovering verified plots and conducting private site tours to completing legal diligence and Sub-Registrar registration, we manage everything under one roof.
          </p>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="py-20 bg-[#f8fafc] grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map((srv, index) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column info */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ea511c] uppercase tracking-wider">
                  <span>SERVICE 0{index + 1}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {srv.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {srv.fullDesc}
                </p>

                {/* Features Checklist */}
                <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Action Card */}
              <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-center space-y-4">
                <p className="text-xs font-semibold text-slate-500">Need this service in Ongole?</p>
                <a
                  href="/consultation"
                  className="block w-full py-3 px-4 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Book a Consultation
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
