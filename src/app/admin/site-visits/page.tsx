import React from 'react';
import { db } from '@/lib/db';
import SiteVisitsAdminClient from './SiteVisitsAdminClient';

export const revalidate = 0;

export default async function SiteVisitsAdminPage() {
  const visits = await db.fetchSiteVisits();

  return <SiteVisitsAdminClient initialVisits={visits} />;
}
