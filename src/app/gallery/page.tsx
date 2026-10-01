import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinalCTA from '@/components/home/FinalCTA';
import GalleryClient from './GalleryClient';
import { db } from '@/lib/db';
import { Camera, Image as ImageIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Project Gallery & Site Photos | Vrinda Real Estate',
  description: 'View on-ground photographs of residential plotted layouts in Koppolu, luxury villas, and independent houses in Ongole.',
};

export const revalidate = 0;

export default async function GalleryPage() {
  const gallery = await db.fetchGallery();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* 100% Bright, Pristine Gallery Photo Banner with Left-Aligned Title & Description Inside (Zero color shade) */}
      <section className="relative w-full h-56 sm:h-72 lg:h-80 flex items-end pb-6 sm:pb-8 overflow-hidden bg-slate-900">
        <Image
          src="/images/hero-luxury-villa.jpg"
          alt="Venture & Property Gallery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.9)]">
              Project Gallery
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white leading-relaxed font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)] max-w-xl">
              Real on-ground photographs showing layout progress, road connectivity, avenue plantations, and luxury residential architecture in Ongole.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Gallery */}
      <section className="py-8 sm:py-14 bg-[#f8fafc] grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryClient initialGallery={gallery} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
