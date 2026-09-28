import React from 'react';
import { db } from '@/lib/db';
import TestimonialsAdminClient from './TestimonialsAdminClient';

export const revalidate = 0;

export default function TestimonialsAdminPage() {
  const testimonials = db.getTestimonials();

  return <TestimonialsAdminClient initialTestimonials={testimonials} />;
}
