import React from 'react';
import { db } from '@/lib/db';
import LocationsAdminClient from './LocationsAdminClient';

export const revalidate = 0;

export default function LocationsAdminPage() {
  const locations = db.getLocations();

  return <LocationsAdminClient initialLocations={locations} />;
}
