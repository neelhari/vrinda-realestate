import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, MapPin, Building, Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Us & Founders | Vrinda Real Estate Ongole',
  description: 'Learn about Vrinda Real Estate, our founders, and our commitment to transparent, verified land and home developments in Ongole, Andhra Pradesh.',
};

export default function AboutPage() {
  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Vrinda Real Estate, I would like to consult regarding properties in Ongole.');
  const phoneUrl = buildPhoneUrl('8464882925');

  const stations = [
    {
      stationNumber: '01',
      title: '100% Legal Clearance',
      description: 'Every plot is vetted through 30-year link documents, certified nil encumbrance (EC), and official revenue sanctions.'
    },
    {
      stationNumber: '02',
      title: 'Growth Corridors',
      description: 'Handpicked ventures located strictly in expanding hubs like Koppolu Ring Road and Singarakonda.'
    },
    {
      stationNumber: '03',
      title: 'Spot Registration',
      description: 'Immediate title transfer with direct accompaniment and deed support at the Sub-Registrar office.'
    },
    {
      stationNumber: '04',
      title: 'Zero Middlemen',
      description: 'Transparent, direct pricing with founder guidance and zero commission markups.'
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* 100% Bright, Pristine Architectural Photo Banner with Left-Aligned Title & Description Inside (Zero color shade) */}
      <section className="relative w-full h-56 sm:h-72 lg:h-80 flex items-end pb-6 sm:pb-8 overflow-hidden bg-slate-900">
        <Image
          src="/images/hero-luxury-villa.jpg"
          alt="About Vrinda Real Estate"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight [text-shadow:_0_3px_12px_rgba(0,0,0,0.9)]">
              About Vrinda
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white leading-relaxed font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)] max-w-xl">
              Founded with an absolute commitment to 100% clear titles, direct founder guidance, and seamless Sub-Registrar registrations across Ongole.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Short Description About Us */}
      <section className="py-8 sm:py-10 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            Vrinda Real Estate was established with a singular objective: providing buyers with absolute clarity, zero hidden clauses, and complete legal security when investing in land and homes across Ongole, Koppolu, and Prakasam district.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold shadow-2xs active:scale-95 transition-all"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={phoneUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-[#0a4ba6] text-white rounded-xl text-xs font-semibold shadow-2xs active:scale-95 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 8464882925</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Founders (Title: Founders, Below: Image 1 || Image 2 side-by-side with no nested boxes) */}
      <section className="py-8 sm:py-12 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Founders
            </h2>
          </div>

          {/* Clean Side-by-Side Images (Image 1 || Image 2, No nested boxes underneath) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-xl mx-auto">
            <div className="relative h-44 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
              <Image
                src="/images/founder-ayyappa-sai.png"
                alt="Founder Bejapur Ayyappa Sai"
                fill
                sizes="280px"
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="relative h-44 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
              <Image
                src="/images/founder-partner.png"
                alt="Executive Partner"
                fill
                sizes="280px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pillars of Integrity (Railway Track / Connecting Station Route) */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Our 4 Pillars of Integrity
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              The continuous standard guiding every property transaction
            </p>
          </div>

          {/* Connected Railway / Metro Station Track */}
          <div className="relative pl-6 sm:pl-10 space-y-8 max-w-xl mx-auto">
            
            {/* Continuous Vertical Railway Track Line */}
            <div className="absolute left-[15px] sm:left-[23px] top-3 bottom-3 w-[3px] bg-gradient-to-b from-[#0a4ba6] via-[#ea511c] to-emerald-600 rounded-full" />

            {stations.map((st) => (
              <div key={st.stationNumber} className="relative flex items-start gap-4 sm:gap-5 group">
                
                {/* Station Node / Stop Marker */}
                <div className="w-8 h-8 rounded-full bg-white border-2 border-[#0a4ba6] flex items-center justify-center text-[11px] font-mono font-bold text-[#0a4ba6] shadow-xs shrink-0 -ml-6 sm:-ml-8 z-10 group-hover:scale-110 group-hover:border-[#ea511c] group-hover:text-[#ea511c] transition-all bg-white">
                  {st.stationNumber}
                </div>

                {/* Station Content */}
                <div className="space-y-1 pt-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {st.description}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 5. Office Addresses */}
      <section className="py-8 sm:py-12 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#0a4ba6] font-bold text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#ea511c]" />
                <span>Primary Office</span>
              </div>
              <p className="text-xs font-bold text-slate-900">Koppolu, Ongole, Andhra Pradesh</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#0a4ba6] font-bold text-xs">
                <Building className="w-3.5 h-3.5 text-[#0a4ba6]" />
                <span>City Consultation Office</span>
              </div>
              <p className="text-xs font-bold text-slate-900">32-1-28 Venugopalaswami Street, Ongole</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
