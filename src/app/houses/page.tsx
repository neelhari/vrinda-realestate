import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinalCTA from '@/components/home/FinalCTA';
import PropertyCard from '@/components/properties/PropertyCard';
import { db } from '@/lib/db';
import { Home, ShieldCheck, Sun, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Independent Houses for Sale in Ongole',
  description: 'Explore standalone independent family homes and freehold houses in Ongole with complete clear-title ownership and peaceful residential surroundings.',
};

export const revalidate = 0;

export default function HousesPage() {
  const houses = db.getProperties().filter((p) => p.type === 'house' || p.type === 'villa');

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-[#0b1329] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/category-houses.jpg"
            alt="Independent Houses in Ongole"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0b1329]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" />
            <span>STANDALONE RESIDENCES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Spaces Designed Around the Way You Live
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light">
            Own complete freehold independent houses with private terrace space, vehicle portico, independent borewell, and peaceful neighborhood living.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#0a4ba6]" />
              <h3 className="text-sm font-bold text-slate-900">100% Freehold Ownership</h3>
              <p className="text-xs text-slate-600">
                Independent land title with no recurring apartment maintenance or association restrictions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <Sun className="w-6 h-6 text-[#ea511c]" />
              <h3 className="text-sm font-bold text-slate-900">Natural Light & Ventilation</h3>
              <p className="text-xs text-slate-600">
                Thoughtfully planned setbacks on all sides for continuous breeze and daylight.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Prime City Neighborhoods</h3>
              <p className="text-xs text-slate-600">
                Close proximity to top schools, temples, hospitals, and Ongole market centers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Houses Grid */}
      <section className="py-16 bg-white grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Available Independent Houses</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified standalone homes ready for immediate registration and handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {houses.map((house) => (
              <PropertyCard key={house.id} property={house} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
