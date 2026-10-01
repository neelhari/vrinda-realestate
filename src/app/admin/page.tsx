import React from 'react';
import { db } from '@/lib/db';
import DashboardClient from './DashboardClient';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [properties, leads, siteVisits, cms] = await Promise.all([
    db.fetchProperties(),
    db.fetchLeads(),
    db.fetchSiteVisits(),
    db.fetchCMS()
  ]);

  return (
    <DashboardClient
      initialProperties={properties}
      initialLeads={leads}
      initialSiteVisits={siteVisits}
      cms={cms}
    />
  );
}
