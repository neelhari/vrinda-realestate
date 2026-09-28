import React from 'react';
import { db } from '@/lib/db';
import GalleryAdminClient from './GalleryAdminClient';

export const revalidate = 0;

export default function GalleryAdminPage() {
  const gallery = db.getGallery();

  return <GalleryAdminClient initialGallery={gallery} />;
}
