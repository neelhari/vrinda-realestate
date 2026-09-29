import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/properties/PropertyCard';
import { db } from '@/lib/db';
import { Home } from 'lucide-react';

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

      {/* 100% Bright, Pristine House Photo Banner with Left-Aligned Title & Description Inside (Zero color shade) */}
      <section className="relative w-full h-56 sm:h-72 lg:h-80 flex items-end pb-6 sm:pb-8 overflow-hidden bg-slate-900">
        <Image
          src="/images/category-houses.jpg"
          alt="Independent Houses in Ongole"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.9)]">
              Independent Houses
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white leading-relaxed font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)] max-w-xl">
              Standalone freehold family residences with complete land ownership, private portico, and independent water source in prime Ongole sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Houses Grid */}
      <section className="py-8 sm:py-12 bg-[#f8fafc] grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-0.5">
            <p>Showing <span className="font-bold text-slate-900">{houses.length}</span> verified independent homes</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {houses.map((house) => (
              <PropertyCard key={house.id} property={house} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
