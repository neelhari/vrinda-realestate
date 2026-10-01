import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
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

export default async function PropertiesPage() {
  const properties = await db.fetchProperties();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* 100% Bright, Pristine Landscape Photo Banner with Left-Aligned Title & Description Inside (Zero color shade) */}
      <section className="relative w-full h-56 sm:h-72 lg:h-80 flex items-end pb-6 sm:pb-8 overflow-hidden bg-slate-900">
        <Image
          src="/images/category-plots.jpg"
          alt="Properties in Ongole"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.9)]">
              Properties in Ongole
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white leading-relaxed font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)] max-w-xl">
              Explore verified residential plots, contemporary villas, and independent homes with complete legal documentation and prime road connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Client Search & Filter Section */}
      <PropertiesClient initialProperties={properties} />

      <Footer />
    </main>
  );
}
