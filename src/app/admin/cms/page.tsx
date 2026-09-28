import React from 'react';
import { db } from '@/lib/db';
import CMSAdminClient from './CMSAdminClient';

export const revalidate = 0;

export default function CMSAdminPage() {
  const cms = db.getCMS();

  return <CMSAdminClient initialCMS={cms} />;
}
