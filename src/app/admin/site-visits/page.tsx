import React from 'react';
import { db } from '@/lib/db';
import SiteVisitsAdminClient from './SiteVisitsAdminClient';

export const revalidate = 0;

export default function SiteVisitsAdminPage() {
  const visits = db.getSiteVisits();

  return <SiteVisitsAdminClient initialVisits={visits} />;
}
