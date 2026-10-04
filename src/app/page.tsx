import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import PromoBannerCarousel from '@/components/home/PromoBannerCarousel';
import CategoryCards from '@/components/home/CategoryCards';
import QuickHighlights from '@/components/home/QuickHighlights';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import WhyVrinda from '@/components/home/WhyVrinda';
import LocationsSection from '@/components/home/LocationsSection';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import SiteVisitCTA from '@/components/home/SiteVisitCTA';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SocialSection from '@/components/home/SocialSection';
import { db } from '@/lib/db';

export const revalidate = 0; // Ensure fresh dynamic data from the database

export default async function HomePage() {
  await Promise.all([
    db.fetchProperties(),
    db.fetchLocations(),
    db.fetchTestimonials(),
    db.fetchCMS()
  ]);

  const properties = db.getProperties();
  const locations = db.getLocations();
  const testimonials = db.getTestimonials();
  const cms = db.getCMS();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <PromoBannerCarousel banners={cms.promoBanners} />
      <CategoryCards />
      <QuickHighlights />
      <FeaturedProperties properties={properties} />
      <WhyVrinda />
      <LocationsSection locations={locations} />
      <ProcessTimeline />
      <SiteVisitCTA />
      <TestimonialsSection testimonials={testimonials} />
      <SocialSection />
      <Footer />
    </main>
  );
}
