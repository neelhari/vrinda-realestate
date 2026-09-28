import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinalCTA from '@/components/home/FinalCTA';
import PropertiesClient from './PropertiesClient';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Explore Properties & Open Plots in Ongole',
  description: 'Search verified residential plots, luxury villas, and independent houses across Koppolu, Ongole, and Prakasam district.',
};

export const revalidate = 0;

export default function PropertiesPage() {
  const properties = db.getProperties();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-[#0b1329] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329] via-[#073575]/40 to-[#0b1329]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <span>VERIFIED PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Available Properties in Ongole
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light">
            Discover hand-picked residential open plots, luxury villas, and standalone family houses with complete legal transparency.
          </p>
        </div>
      </section>

      {/* Interactive Client Search & Filter Section */}
      <PropertiesClient initialProperties={properties} />

      <FinalCTA />
      <Footer />
    </main>
  );
}
