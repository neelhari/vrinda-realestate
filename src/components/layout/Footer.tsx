import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { InstagramIcon, YouTubeIcon, WhatsAppIcon } from '@/components/icons/SocialIcons';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-[#0b1329] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-11 w-36">
              <Image
                src="/images/vrinda-logo.png"
                alt="Vrinda Real Estate"
                fill
                sizes="150px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed pr-4">
              Vrinda Real Estate is a premier real estate advisory and development firm based in Ongole, Andhra Pradesh. We specialize in verified residential open plots, custom independent houses, and contemporary villas with complete legal transparency and registration assistance.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/vrindarealstate_in_ongole"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#ea511c] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@VrindaRealestate-r8f"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#ea511c] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                aria-label="YouTube Channel"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I would like to connect regarding property in Ongole.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#25D366] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                aria-label="WhatsApp Support"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/" className="text-slate-300 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="text-slate-300 hover:text-white transition-colors">About Us & Founder</a>
              </li>
              <li>
                <a href="/properties" className="text-slate-300 hover:text-white transition-colors">All Properties</a>
              </li>
              <li>
                <a href="/site-visit" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                  <span>Book Site Visit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ea511c]" />
                </a>
              </li>
              <li>
                <a href="/consultation" className="text-slate-300 hover:text-white transition-colors">Consultation</a>
              </li>
              <li>
                <a href="/gallery" className="text-slate-300 hover:text-white transition-colors">Project Gallery</a>
              </li>
            </ul>
          </div>

          {/* Categories & Growth Areas */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Properties
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/plots" className="text-slate-300 hover:text-white transition-colors">Residential Open Plots</a>
              </li>
              <li>
                <a href="/villas" className="text-slate-300 hover:text-white transition-colors">Luxury Duplex Villas</a>
              </li>
              <li>
                <a href="/houses" className="text-slate-300 hover:text-white transition-colors">Independent Houses</a>
              </li>
              <li>
                <a href="/properties?location=Koppolu" className="text-slate-300 hover:text-white transition-colors">Koppolu Plots</a>
              </li>
              <li>
                <a href="/properties?location=Ongole" className="text-slate-300 hover:text-white transition-colors">Ongole City Properties</a>
              </li>
              <li>
                <a href="/properties?location=Singarakonda" className="text-slate-300 hover:text-white transition-colors">Singarakonda Ventures</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Get in Touch
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#ea511c] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">Business Location:</p>
                <p>Koppolu, Ongole, Andhra Pradesh, India</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#0a4ba6] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">Founder Office:</p>
                <p>32-1-28 Venugopalaswami St, Near Venugopalaswami Temple, Ongole, AP</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-[#0a4ba6] shrink-0" />
              <a href={buildPhoneUrl('8464882925')} className="hover:text-white">
                +91 8464882925
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
              <a
                href={buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I want to inquire about properties.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                +91 9959912500 (WhatsApp)
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-[#ea511c] shrink-0" />
              <a href="mailto:vrindarealestates0@gmail.com" className="hover:text-white truncate">
                vrindarealestates0@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Vrinda Real Estate. All rights reserved. Founded by Bejapur Ayyappa Sai.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/admin/login" className="text-slate-500 hover:text-slate-300 transition-colors">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
