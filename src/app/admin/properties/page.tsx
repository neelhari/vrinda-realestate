import React from 'react';
import { db } from '@/lib/db';
import PropertiesAdminClient from './PropertiesAdminClient';

export const revalidate = 0;

export default function PropertiesAdminPage() {
  const properties = db.getProperties();

  return <PropertiesAdminClient initialProperties={properties} />;
}
