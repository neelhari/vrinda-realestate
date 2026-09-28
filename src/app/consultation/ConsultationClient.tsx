'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Compass, Phone } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ConsultationClient() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestArea, setInterestArea] = useState('Open Plots in Koppolu / Ongole');
  const [budget, setBudget] = useState('₹ 15 Lakhs - ₹ 35 Lakhs');
  const [timeline, setTimeline] = useState('Immediate (Within 1 Month)');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          interestedPropertyName: `Consultation: ${interestArea}`,
          propertyType: 'Consultation',
          source: 'Consultation Page',
          message: `Interest: ${interestArea} | Budget: ${budget} | Timeline: ${timeline}. ${message}`
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to request consultation.');
      }
    } catch {
      setErrorMessage('Network error. Please message us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = buildWhatsAppUrl(
    '9959912500',
    `Hello Vrinda Real Estate, I (${name}) would like to book a 1-on-1 property consultation regarding ${interestArea}.`
  );

  if (isSuccess) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-emerald-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-slate-900">Consultation Request Confirmed!</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you <span className="font-semibold text-slate-900">{name}</span>. Founder Bejapur Ayyappa Sai will personally review your investment goals and connect with you shortly.
          </p>
        </div>
        <div className="pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-all shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat directly with Founder</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
      <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Request Advisory Session</h3>
      <p className="text-xs text-slate-500 mb-6">Share your property requirements for confidential, personalized advisory.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Srinivas Rao"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Phone / WhatsApp Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9848012345"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Interest Category
            </label>
            <select
              value={interestArea}
              onChange={(e) => setInterestArea(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            >
              <option value="Open Plots in Koppolu / Ongole">Open Plots in Koppolu / Ongole</option>
              <option value="Luxury Villa Purchase">Luxury Villa Purchase</option>
              <option value="Independent Standalone House">Independent Standalone House</option>
              <option value="NRI Land Investment Advisory">NRI Land Investment Advisory</option>
              <option value="Legal & Registration Diligence">Legal & Registration Diligence</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Expected Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            >
              <option value="Under ₹ 15 Lakhs">Under ₹ 15 Lakhs</option>
              <option value="₹ 15 Lakhs - ₹ 35 Lakhs">₹ 15 Lakhs - ₹ 35 Lakhs</option>
              <option value="₹ 35 Lakhs - ₹ 70 Lakhs">₹ 35 Lakhs - ₹ 70 Lakhs</option>
              <option value="Above ₹ 70 Lakhs">Above ₹ 70 Lakhs</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Email (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. srinivas@gmail.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Your Specific Requirements / Queries
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you are looking for (e.g. looking for 200 sq.yards corner plot with East entrance)..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Sending Request...</span>
          ) : (
            <>
              <Compass className="w-4 h-4" />
              <span>Book Consultation</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
