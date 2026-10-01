import React from 'react';
import { db } from '@/lib/db';
import GalleryAdminClient from './GalleryAdminClient';

export const revalidate = 0;

export default async function GalleryAdminPage() {
  const gallery = await db.fetchGallery();

  return <GalleryAdminClient initialGallery={gallery} />;
}
