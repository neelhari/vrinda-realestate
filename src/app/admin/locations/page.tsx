import React from 'react';
import { db } from '@/lib/db';
import LocationsAdminClient from './LocationsAdminClient';

export const revalidate = 0;

export default async function LocationsAdminPage() {
  const locations = await db.fetchLocations();

  return <LocationsAdminClient initialLocations={locations} />;
}
