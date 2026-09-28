import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinalCTA from '@/components/home/FinalCTA';
import PropertyCard from '@/components/properties/PropertyCard';
import { db } from '@/lib/db';
import { Home, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Luxury Villas & Duplexes for Sale in Ongole',
  description: 'Discover contemporary luxury villas and gated community duplex residences in Ongole with modern architecture, private lawns, and 100% Vaastu compliance.',
};

export const revalidate = 0;

export default function VillasPage() {
  const villas = db.getProperties().filter((p) => p.type === 'villa' || p.type === 'house');

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-[#0b1329] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/category-villas.jpg"
            alt="Luxury Villas in Ongole"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0b1329]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCLUSIVE RESIDENCES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Contemporary Luxury Villas & Homes
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light">
            Architecturally designed 3BHK and 4BHK duplex villas offering refined living spaces, private manicured gardens, and peaceful community living in Ongole.
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <Home className="w-6 h-6 text-[#0a4ba6]" />
              <h3 className="text-sm font-bold text-slate-900">Double-Height Living & Modern Layouts</h3>
              <p className="text-xs text-slate-600">
                Spacious interiors with Italian-finish flooring, modular kitchen setups, and abundant ventilation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">100% Vaastu Aligned Architecture</h3>
              <p className="text-xs text-slate-600">
                Every entrance, kitchen, and master bedroom is planned strictly according to proven Vaastu principles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-[#ea511c]" />
              <h3 className="text-sm font-bold text-slate-900">Private Gardens & Dedicated Parking</h3>
              <p className="text-xs text-slate-600">
                Enjoy your own lawn, rooftop terrace lounge, and covered vehicle portico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Villas Grid */}
      <section className="py-16 bg-white grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Featured Villas & Homes</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore available villa developments in prime Ongole residential sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((villa) => (
              <PropertyCard key={villa.id} property={villa} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
