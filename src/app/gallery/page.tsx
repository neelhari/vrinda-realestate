import React from 'react';
import { Metadata } from 'next';
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

export default function GalleryPage() {
  const gallery = db.getGallery();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 bg-[#0b1329] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329] via-[#073575]/40 to-[#0b1329]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>VISUAL PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Venture & Property Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light">
            Real layout progress, avenue plantations, road widths, entrance arches, and residential architecture in Ongole.
          </p>
        </div>
      </section>

      {/* Interactive Gallery */}
      <section className="py-16 bg-[#f8fafc] grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryClient initialGallery={gallery} />
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
