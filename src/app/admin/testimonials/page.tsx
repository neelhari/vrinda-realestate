import React from 'react';
import { db } from '@/lib/db';
import TestimonialsAdminClient from './TestimonialsAdminClient';

export const revalidate = 0;

export default async function TestimonialsAdminPage() {
  const testimonials = await db.fetchTestimonials();

  return <TestimonialsAdminClient initialTestimonials={testimonials} />;
}
