import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, MapPin, Building, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Us & Founders | Vrinda Real Estate Ongole',
  description: 'Learn about Vrinda Real Estate, our founders Bejapur Ayyappa Sai & Murari Chiranjeevi, and our commitment to transparent land developments in Ongole.',
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

      {/* 1. Architectural Photo Banner */}
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

      {/* 3. Founders Section: Big Single Pictures with 3 Lines Description Each */}
      <section className="py-10 sm:py-16 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ea511c] font-semibold">
              Leadership & Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Meet Our Founders
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Direct founder accountability and transparent oversight for every property transaction.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10">
            
            {/* Founder 1: Bejapur Ayyappa Sai */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-stretch">
              {/* Open Edge-to-Edge Single Picture Touching the Card */}
              <div className="relative w-full md:w-[42%] lg:w-[40%] min-h-[340px] sm:min-h-[400px] md:min-h-[380px] shrink-0 bg-slate-100">
                <Image
                  src="/images/founder-ayyappa-sai.png"
                  alt="Bejapur Ayyappa Sai - Founder & Managing Director"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Founder 1 Info & 3 Lines */}
              <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4">
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0a4ba6]/10 text-[#0a4ba6]">
                    Founder 1
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Bejapur Ayyappa Sai
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#ea511c]">
                    Founder & Managing Director
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Leading strategic land acquisition, master plotted venture development, and market expansions across Ongole.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Enforcing 100% legal clearance, 30-year link document verification, and government regulatory compliance.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Providing direct client consultations, personalized investment advisory, and transparent Sub-Registrar registrations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder 2: Murari Chiranjeevi */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-stretch">
              {/* Open Edge-to-Edge Single Picture Touching the Card */}
              <div className="relative w-full md:w-[42%] lg:w-[40%] min-h-[340px] sm:min-h-[400px] md:min-h-[380px] shrink-0 bg-slate-100">
                <Image
                  src="/images/founder-murari-chiranjeevi.png"
                  alt="Murari Chiranjeevi - Founder & Operations Director"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Founder 2 Info & 3 Lines */}
              <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4">
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#ea511c]">
                    Founder 2
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Murari Chiranjeevi
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#0a4ba6]">
                    Founder & Operations Director
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Managing on-ground layout development, BT road infrastructure, drainage, and layout quality standards.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Guiding personalized on-site property tours, plot boundary inspections, and layout walkthroughs in Koppolu.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Coordinating end-to-end documentation handovers, spot registry assistance, and seamless buyer handover.
                    </p>
                  </div>
                </div>
              </div>
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

      {/* 5. Founders Office Address */}
      <section className="py-8 sm:py-12 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-[#ea511c] mx-auto">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Official Head Office
              </span>
              <h3 className="text-lg font-serif font-bold text-slate-900 mt-0.5">
                Founders Office Address
              </h3>
            </div>
            <p className="text-sm font-semibold text-slate-800 max-w-lg mx-auto leading-relaxed">
              42-106-243, FCI Rd, N. T. R Colony, Koppolu, Ongole, Andhra Pradesh 523286
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
              <span>Primary Phone: <strong className="text-slate-900">+91 8464882925</strong></span>
              <span>•</span>
              <span>WhatsApp: <strong className="text-slate-900">+91 9959912500</strong></span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
