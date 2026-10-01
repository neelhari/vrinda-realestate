import React from 'react';
import { db } from '@/lib/db';
import LeadsAdminClient from './LeadsAdminClient';

export const revalidate = 0;

export default async function LeadsAdminPage() {
  const leads = await db.fetchLeads();

  return <LeadsAdminClient initialLeads={leads} />;
}
