import React from 'react';
import { db } from '@/lib/db';
import DashboardClient from './DashboardClient';

export const revalidate = 0;

export default function AdminDashboardPage() {
  const properties = db.getProperties();
  const leads = db.getLeads();
  const siteVisits = db.getSiteVisits();
  const cms = db.getCMS();

  return (
    <DashboardClient
      initialProperties={properties}
      initialLeads={leads}
      initialSiteVisits={siteVisits}
      cms={cms}
    />
  );
}
