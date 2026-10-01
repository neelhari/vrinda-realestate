import React from 'react';
import { db } from '@/lib/db';
import CMSAdminClient from './CMSAdminClient';

export const revalidate = 0;

export default async function CMSAdminPage() {
  const cms = await db.fetchCMS();

  return <CMSAdminClient initialCMS={cms} />;
}
