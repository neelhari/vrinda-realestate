'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Plots', href: '/plots' },
    { name: 'Villas & Houses', href: '/villas' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-3.5 border-b border-slate-100'
            : 'bg-white/90 md:bg-white/80 backdrop-blur-md py-4.5 border-b border-slate-100/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with exact aspect ratio and crisp responsive sizing */}
            <a href="/" className="flex items-center gap-2 group focus:outline-hidden">
              <div className="relative h-10 sm:h-12 w-36 sm:w-44 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/images/vrinda-logo.png"
                  alt="Vrinda Real Estate Ongole"
                  fill
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                      isActive
                        ? 'text-[#0a4ba6] font-semibold'
                        : 'text-slate-700 hover:text-[#0a4ba6]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0a4ba6] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I am interested in exploring properties in Ongole.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-200"
                title="Chat on WhatsApp"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>WhatsApp</span>
              </a>

              <a
                href="/site-visit"
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0a4ba6] hover:bg-[#073575] rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Site Visit</span>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={buildPhoneUrl('8464882925')}
                className="p-2 text-slate-700 hover:text-[#0a4ba6] bg-slate-100 rounded-full"
                aria-label="Call Vrinda Real Estate"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-800 hover:text-[#0a4ba6] focus:outline-hidden bg-slate-100 rounded-full"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Luxury Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 flex flex-col pt-20 pb-6 px-6 overflow-y-auto">
            {/* Header info inside drawer */}
            <div className="border-b border-slate-100 pb-4 mb-4">
              <div className="relative h-10 w-36 mb-2">
                <Image
                  src="/images/vrinda-logo.png"
                  alt="Vrinda Real Estate"
                  fill
                  sizes="144px"
                  className="object-contain object-left"
                />
              </div>
              <p className="text-xs text-slate-500">Premium Properties & Verified Plots in Ongole</p>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col space-y-2 grow">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0a4ba6]/10 text-[#0a4ba6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                );
              })}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 space-y-2.5">
              <a
                href="/site-visit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0a4ba6] text-white rounded-xl text-sm font-semibold shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Site Visit</span>
              </a>

              <a
                href={buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I am looking for property assistance in Ongole.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#ea511c] text-white rounded-xl text-sm font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={buildPhoneUrl('8464882925')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 text-slate-800 rounded-xl text-xs font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#0a4ba6]" />
                <span>Call +91 8464882925</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
