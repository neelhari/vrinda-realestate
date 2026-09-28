import React from 'react';
import Image from 'next/image';
import AdminNavShell from '@/components/admin/AdminNavShell';
import { getAdminSession } from '@/lib/auth';

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans text-slate-800">
      <AdminNavShell user={session}>
        {children}
      </AdminNavShell>
    </div>
  );
}
