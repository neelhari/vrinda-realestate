import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CategoryCards from '@/components/home/CategoryCards';
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
  const properties = db.getProperties();
  const locations = db.getLocations();
  const testimonials = db.getTestimonials();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <CategoryCards />
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
