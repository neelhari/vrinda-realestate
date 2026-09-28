import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinalCTA from '@/components/home/FinalCTA';
import { ShieldCheck, MapPin, Award, CheckCircle2, Phone, MessageSquare, Building, Users } from 'lucide-react';
import { db } from '@/lib/db';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Us & Founder Bejapur Ayyappa Sai',
  description: 'Learn about Vrinda Real Estate, our founder Bejapur Ayyappa Sai, and our commitment to transparent, verified land and home developments in Ongole, Andhra Pradesh.',
};

export default function AboutPage() {
  const cms = db.getCMS();
  const whatsappUrl = buildWhatsAppUrl('9959912500', 'Hello Bejapur Ayyappa Sai garu, I would like to consult with Vrinda Real Estate.');

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-[#0b1329] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329] via-[#073575]/40 to-[#0b1329]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>OUR STORY & HERITAGE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Building Real Estate Trust in Ongole
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light">
            Founded by Bejapur Ayyappa Sai with an unwavering commitment to 100% verified titles, spot registrations, and ethical property development.
          </p>
        </div>
      </section>

      {/* Founder Profile Section */}
      <section className="py-20 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Founder Photo Presentation */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-xl border border-slate-200 max-w-md mx-auto">
                <div className="relative h-[480px] w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/founder-ayyappa-sai.png"
                    alt="Bejapur Ayyappa Sai, Founder & Managing Director"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#ea511c]">
                      FOUNDER & MANAGING DIRECTOR
                    </p>
                    <h2 className="text-xl font-bold font-serif">Bejapur Ayyappa Sai</h2>
                    <p className="text-xs text-slate-200">Vrinda Real Estate, Ongole</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Message & Bio */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase">
                <span>FOUNDER'S VISION</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif text-[#0b1329] font-bold leading-tight">
                "Real estate isn't just about plots or concrete. It is the foundation of your family's future."
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Welcome to Vrinda Real Estate. Having spent years closely observing the property landscape in Ongole, Koppolu, and Prakasam district, I noticed a fundamental need: buyers deserved absolute clarity, zero hidden clauses, and complete legal security when investing their hard-earned life savings.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Every single residential venture we bring to market is personally vetted for DTCP/RERA approvals, clear revenue records, 30-year link documents, and on-ground infrastructure feasibility. When you partner with Vrinda, you receive my direct personal guarantee of transparency and seamless Sub-Registrar registration.
              </p>

              {/* Direct Connect Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Ayyappa Sai</span>
                </a>

                <a
                  href={buildPhoneUrl('8464882925')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-[#0a4ba6] text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 8464882925</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Leadership & Co-Founder Team */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>LEADERSHIP & PARTNERSHIP</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#0b1329] font-bold">
              Dedicated to Your Property Success
            </h2>
            <p className="text-sm text-slate-500">
              Our core leadership brings deep local insights and unmatched dedication to every venture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Founder Card */}
            <div className="bg-[#f8fafc] rounded-3xl p-6 border border-slate-200 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src="/images/founder-ayyappa-sai.png"
                  alt="Bejapur Ayyappa Sai"
                  fill
                  sizes="380px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Bejapur Ayyappa Sai</h3>
                <p className="text-xs font-semibold text-[#ea511c] uppercase tracking-wider mt-0.5">Founder & Managing Director</p>
                <p className="text-xs text-slate-600 mt-2">
                  Overseeing land acquisition, legal due diligence, venture planning, and client consultations across Ongole.
                </p>
              </div>
            </div>

            {/* Co-Founder / Associate Leadership Card */}
            <div className="bg-[#f8fafc] rounded-3xl p-6 border border-slate-200 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src="/images/founder-partner.png"
                  alt="Leadership Partner"
                  fill
                  sizes="380px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Executive Partner</h3>
                <p className="text-xs font-semibold text-[#0a4ba6] uppercase tracking-wider mt-0.5">Site Operations & Client Relations</p>
                <p className="text-xs text-slate-600 mt-2">
                  Managing on-ground site visits, customer tours, infrastructure development, and Sub-Registrar coordination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#0b1329] font-bold">
              Our 4 Pillars of Integrity
            </h2>
            <p className="text-sm text-slate-500">
              The non-negotiable standards that govern every property transaction at Vrinda Real Estate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center font-bold">01</div>
              <h3 className="text-base font-bold text-slate-900">100% Legal Transparency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete title verification, EC verification up to 30 years, and clear revenue records before opening for sale.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center font-bold">02</div>
              <h3 className="text-base font-bold text-slate-900">True Growth Corridors</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategic focus on high-appreciation sectors like Koppolu Ring Road and Singarakonda with real future utility.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center font-bold">03</div>
              <h3 className="text-base font-bold text-slate-900">Immediate Registration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No delayed possession promises. Immediate spot registration assistance with direct government record transfer.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center font-bold">04</div>
              <h3 className="text-base font-bold text-slate-900">Lifelong Client Bond</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our relationship continues long after registration with boundary maintenance, fencing, and resale advisory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office & Address Details */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-[#0a4ba6] font-bold text-sm">
                <MapPin className="w-4 h-4 text-[#ea511c]" />
                <span>Primary Business Office</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">Koppolu, Ongole</p>
              <p className="text-xs text-slate-500">Andhra Pradesh, India</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-[#0a4ba6] font-bold text-sm">
                <Building className="w-4 h-4 text-[#0a4ba6]" />
                <span>Founder Residence / City Office</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">32-1-28 Venugopalaswami Street</p>
              <p className="text-xs text-slate-500">Near Venugopalaswami Temple, Ongole, Andhra Pradesh</p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
