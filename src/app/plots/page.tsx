import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinalCTA from '@/components/home/FinalCTA';
import PropertyCard from '@/components/properties/PropertyCard';
import { db } from '@/lib/db';
import { ShieldCheck, CheckCircle2, MapPin, ArrowRight, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Residential Open Plots for Sale in Ongole & Koppolu',
  description: 'Explore verified DTCP & clear-title residential open plots in Koppolu, Ongole, and Singarakonda with spot registration and high capital appreciation.',
};

export const revalidate = 0;

export default function PlotsPage() {
  const plots = db.getProperties().filter((p) => p.type === 'plot');

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-[#0b1329] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/category-plots.jpg"
            alt="Residential Open Plots in Ongole"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0b1329]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>RESIDENTIAL OPEN PLOTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Build Your Future on Verified Ground
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light">
            Gated plotted layouts in Koppolu and Ongole with wide blacktop roads, clear boundaries, underground drainage, and immediate Sub-Registrar registration.
          </p>
        </div>
      </section>

      {/* Key Benefits of Buying Plots through Vrinda */}
      <section className="py-12 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#0a4ba6]" />
              <h3 className="text-sm font-bold text-slate-900">100% Clear-Title Guarantee</h3>
              <p className="text-xs text-slate-600">
                Verified 30-year link documents, nil encumbrance (EC), and zero legal disputes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-[#ea511c]" />
              <h3 className="text-sm font-bold text-slate-900">Immediate Spot Registration</h3>
              <p className="text-xs text-slate-600">
                Direct Sub-Registrar coordination and paperwork handling without delays.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <MapPin className="w-6 h-6 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">High Growth Corridors</h3>
              <p className="text-xs text-slate-600">
                Selected in expanding hubs like Koppolu Ring Road and Singarakonda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plot Listings Grid */}
      <section className="py-16 bg-white grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Available Residential Plotted Ventures</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {plots.length} verified plotted ventures in Ongole.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plots.map((plot) => (
              <PropertyCard key={plot.id} property={plot} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
