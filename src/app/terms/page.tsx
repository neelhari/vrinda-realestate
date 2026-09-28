import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Vrinda Real Estate',
  description: 'Terms and legal disclosures for property transactions and site visits with Vrinda Real Estate Ongole.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="pt-32 pb-12 bg-[#0b1329] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">Terms of Service</h1>
          <p className="text-xs text-slate-400">Vrinda Real Estate • Ongole, Andhra Pradesh</p>
        </div>
      </section>

      <section className="py-14 bg-white grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-slate-700 leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200">
            <h2 className="text-base font-bold text-slate-900 mb-2">Legal Transparency Disclosure</h2>
            <p>
              Vrinda Real Estate operates as a registered real estate advisory and development firm. All property details, dimensions, and layout plans are subject to final validation against official government revenue records and registered deeds.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">1. Property Listings & Availability</h3>
            <p>
              Property availability, plot demarcations, and prices are dynamic and verified against the current inventory entered by our administrative team. Plot reservations are confirmed only upon execution of the formal sale agreement and initial token booking advance.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">2. Registration & Title Deeds</h3>
            <p>
              All property sales are executed through the relevant Government Sub-Registrar Office in Andhra Pradesh. Stamp duty, transfer duty, and registration charges are calculated according to current Andhra Pradesh registration department rates.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">3. Site Visits</h3>
            <p>
              Guided site visits are complimentary and scheduled at mutually agreed times. Visitors are escorted by authorized Vrinda representatives for safety and accurate boundary identification.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">4. Jurisdiction</h3>
            <p>
              Any disputes arising in connection with property transactions in Prakasam district shall be subject to the exclusive jurisdiction of the competent courts in Ongole, Andhra Pradesh.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
