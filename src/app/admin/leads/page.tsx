import React from 'react';
import { db } from '@/lib/db';
import LeadsAdminClient from './LeadsAdminClient';

export const revalidate = 0;

export default function LeadsAdminPage() {
  const leads = db.getLeads();

  return <LeadsAdminClient initialLeads={leads} />;
}
