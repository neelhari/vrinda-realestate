'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  MapPin, 
  Image as ImageIcon, 
  LogOut, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

interface AdminNavShellProps {
  user: any;
  children: React.ReactNode;
}

export default function AdminNavShell({ user, children }: AdminNavShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, don't show the dashboard shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Properties', href: '/admin/properties', icon: Building2 },
    { name: 'Leads & Enquiries', href: '/admin/leads', icon: Users },
    { name: 'Site Visits', href: '/admin/site-visits', icon: Calendar },
    { name: 'CMS & Content', href: '/admin/cms', icon: FileText },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Locations', href: '/admin/locations', icon: MapPin },
    { name: 'Gallery Media', href: '/admin/gallery', icon: ImageIcon },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0b1329] text-white border-r border-slate-800 shrink-0">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="relative h-10 w-36 bg-white rounded-lg p-1">
            <Image
              src="/images/vrinda-logo.png"
              alt="Vrinda Real Estate"
              fill
              sizes="144px"
              className="object-contain"
            />
          </div>
          <p className="text-[11px] text-[#ea511c] font-bold uppercase tracking-wider mt-2">
            ADMIN PORTAL
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0a4ba6] text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </div>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">View</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col grow min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              Vrinda Real Estate Management Console
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </a>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <div className="w-8 h-8 rounded-full bg-[#0a4ba6] text-white flex items-center justify-center font-bold text-xs">
                BS
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">Bejapur Ayyappa Sai</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-64 bg-[#0b1329] text-white p-6 z-50 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="relative h-10 w-36 bg-white rounded-lg p-1 mb-6">
                  <Image
                    src="/images/vrinda-logo.png"
                    alt="Vrinda Real Estate"
                    fill
                    sizes="144px"
                    className="object-contain"
                  />
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#0a4ba6] text-white'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.name}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <a
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Public Website</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Main Content */}
        <main className="p-4 sm:p-8 grow max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
