import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vrinda Real Estate',
  description: 'Privacy Policy and data protection disclosures for Vrinda Real Estate Ongole.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="pt-32 pb-12 bg-[#0b1329] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: September 2026</p>
        </div>
      </section>

      <section className="py-14 bg-white grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-slate-700 leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200">
            <h2 className="text-base font-bold text-slate-900 mb-2">Our Privacy Commitment</h2>
            <p>
              At Vrinda Real Estate, we respect your privacy. When you request a site visit, property brochure, or consultation, we collect only necessary contact information (name, phone number, email) to coordinate your request directly.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">1. Information Collection</h3>
            <p>
              We collect information you provide through enquiry forms, WhatsApp conversations, or phone calls. This includes your name, contact phone number, email address, and property preferences.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">2. Use of Information</h3>
            <p>
              Your details are strictly used to schedule property site tours, send layout drawings and title documentation copies, answer queries, and coordinate Sub-Registrar registration processes. We do not sell or rent your personal data to third-party telemarketers.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">3. WhatsApp & Direct Communication</h3>
            <p>
              By submitting an enquiry with your mobile number, you consent to receive direct property updates and site visit confirmations via phone or WhatsApp from founder Bejapur Ayyappa Sai or authorized Vrinda associates.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">4. Contacting Us</h3>
            <p>
              If you have any questions regarding your data or wish to be removed from our follow-up list, please email <a href="mailto:vrindarealestates0@gmail.com" className="text-[#0a4ba6] font-semibold underline">vrindarealestates0@gmail.com</a> or call +91 8464882925.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
