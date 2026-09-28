'use client';

import React, { useState } from 'react';
import { Property } from '@/lib/types';
import { Send, CheckCircle2, Calendar, MessageSquare, Phone } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface PropertyEnquiryBoxProps {
  property: Property;
}

export default function PropertyEnquiryBox({ property }: PropertyEnquiryBoxProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Hi, I am interested in ${property.title} in ${property.location}. Please share the latest availability and floor plan.`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const whatsappUrl = buildWhatsAppUrl(
    '9959912500',
    `Hello Vrinda Real Estate, I am interested in ${property.title}. Please share complete details.`
  );

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
          interestedPropertyName: property.title,
          propertyType: property.type,
          source: `Property Detail: ${property.slug}`,
          message
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try WhatsApp.');
      }
    } catch {
      setErrorMessage('Network error. Please contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-md text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold font-serif text-slate-900">Enquiry Received!</h4>
        <p className="text-xs text-slate-600">
          Thank you <span className="font-semibold">{name}</span>. Founder Bejapur Ayyappa Sai or a senior advisor will contact you within 2 business hours.
        </p>
        <div className="pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect instantly on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-5">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ea511c] uppercase tracking-wider mb-1">
          <span>INSTANT ENQUIRY</span>
        </div>
        <h4 className="text-lg font-serif font-bold text-slate-900">Request Property Details</h4>
        <p className="text-xs text-slate-500 mt-1">
          Receive detailed layout blueprints, exact spot coordinates, and verified legal documentation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {errorMessage && (
          <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ramesh Reddy"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 9848012345"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. ramesh@gmail.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
            Message or Specific Questions
          </label>
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Send Enquiry</span>
            </>
          )}
        </button>
      </form>

      {/* Alternative Site Visit Trigger */}
      <div className="pt-2 border-t border-slate-100 text-center">
        <a
          href={`/site-visit?property=${encodeURIComponent(property.title)}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a4ba6] hover:text-[#ea511c] transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Prefer a guided site visit? Schedule here</span>
        </a>
      </div>
    </div>
  );
}
