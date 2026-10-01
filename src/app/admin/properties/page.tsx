import React from 'react';
import { db } from '@/lib/db';
import PropertiesAdminClient from './PropertiesAdminClient';

export const revalidate = 0;

export default async function PropertiesAdminPage() {
  const properties = await db.fetchProperties();

  return <PropertiesAdminClient initialProperties={properties} />;
}
