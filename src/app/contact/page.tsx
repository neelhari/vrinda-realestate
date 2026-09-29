import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactClient from './ContactClient';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Building, 
  Clock,
  ShieldCheck
} from 'lucide-react';
import { InstagramIcon, YouTubeIcon } from '@/components/icons/SocialIcons';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact Vrinda Real Estate | Ongole Office & Consultation',
  description: 'Reach out to Vrinda Real Estate in Koppolu and Ongole. Call +91 8464882925 or WhatsApp +91 9959912500 for clear-title property advisory.',
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I would like to get in touch regarding property in Ongole.');
  const phoneUrl = buildPhoneUrl('8464882925');

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* 100% Bright, Pristine Location Photo Banner with Left-Aligned Title & Description Inside (Zero color shade) */}
      <section className="relative w-full h-56 sm:h-72 lg:h-80 flex items-end pb-6 sm:pb-8 overflow-hidden bg-slate-900">
        <Image
          src="/images/category-plots.jpg"
          alt="Contact Vrinda Real Estate"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.9)]">
              Contact & Location
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white leading-relaxed font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)] max-w-xl">
              Reach founder Bejapur Ayyappa Sai and our advisory team directly for site visits, document inspection, and venture guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#f8fafc] grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Official Contact Card Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">Office & Communication</h3>
                  <p className="text-xs text-slate-500 mt-1">Founder Bejapur Ayyappa Sai & Vrinda Team</p>
                </div>

                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Primary Phone</p>
                      <a href={phoneUrl} className="text-sm font-bold text-slate-900 hover:text-[#0a4ba6]">
                        +91 8464882925
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">WhatsApp Assistance</p>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-900 hover:text-emerald-600">
                        +91 9959912500
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#ea511c]/10 text-[#ea511c] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
                      <a href="mailto:vrindarealestates0@gmail.com" className="text-sm font-bold text-slate-900 hover:text-[#ea511c]">
                        vrindarealestates0@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Founders Office Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#ea511c]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Founders Office Address</p>
                      <p className="text-sm font-semibold text-slate-900">42-106-243, FCI Rd, N. T. R Colony</p>
                      <p className="text-xs text-slate-600">Koppolu, Ongole, Andhra Pradesh 523286</p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Working Hours</p>
                      <p className="text-sm font-semibold text-slate-900">Monday – Sunday: 8:00 AM – 8:00 PM</p>
                      <p className="text-xs text-slate-500">Site visits available on all days with advance booking</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/vrindarealstate_in_ongole"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#ea511c] hover:text-white text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://www.youtube.com/@VrindaRealestate-r8f"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <YouTubeIcon className="w-4 h-4" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <ContactClient />
            </div>

          </div>

          {/* Map Embed Container */}
          <div className="mt-12 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-3 px-2">Location Map — Ongole & Koppolu Hub</h4>
            <div className="relative h-[360px] w-full rounded-2xl overflow-hidden bg-slate-100">
              <iframe
                title="Vrinda Real Estate Ongole Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61541.97914041063!2d80.010041!3d15.505723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2b45cfbc88349%3A0xe54fbcfd10787e9c!2sOngole%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
