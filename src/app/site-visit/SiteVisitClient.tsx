'use client';

import React, { useState } from 'react';
import { Property } from '@/lib/types';
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface SiteVisitClientProps {
  properties: Property[];
}

export default function SiteVisitClient({ properties }: SiteVisitClientProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(
    properties.length > 0 ? properties[0].title : 'Vrinda Green Meadows, Koppolu'
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM - 12:30 PM)');
  const [attendeesCount, setAttendeesCount] = useState('2');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !preferredDate) {
      setErrorMessage('Please fill in your Name, Phone Number, and Preferred Date.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/site-visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          whatsapp: whatsapp || phone,
          email,
          propertyName: selectedProperty,
          preferredDate,
          preferredTime,
          attendeesCount: Number(attendeesCount),
          message
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.7 }
        });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to book site visit.');
      }
    } catch {
      setErrorMessage('Network error. Please schedule via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappConfirmationUrl = buildWhatsAppUrl(
    '9959912500',
    `Hello Vrinda Real Estate, I (${name}) have requested a site visit for ${selectedProperty} on ${preferredDate} (${preferredTime}). Please confirm availability.`
  );

  if (isSuccess) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-emerald-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-slate-900">Site Visit Requested!</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you <span className="font-semibold text-slate-900">{name}</span>. We have received your request to tour <span className="font-semibold text-slate-900">{selectedProperty}</span> on <span className="font-semibold text-slate-900">{preferredDate}</span> ({preferredTime}).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left max-w-md mx-auto space-y-1">
          <p className="font-bold text-slate-900 mb-1">Appointment Summary:</p>
          <p>• Property: {selectedProperty}</p>
          <p>• Contact: {phone}</p>
          <p>• Date & Slot: {preferredDate} at {preferredTime}</p>
          <p>• Team Lead: Bejapur Ayyappa Sai / Vrinda Site Representative</p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappConfirmationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-all shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Confirm instantly via WhatsApp</span>
          </a>

          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-semibold transition-all"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
      <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Book Your Site Tour</h3>
      <p className="text-xs text-slate-500 mb-6">Select your preferred property, date, and timing. We will coordinate transport if required.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Interested Property */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Select Property or Layout *
          </label>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
          >
            {properties.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title} ({p.location})
              </option>
            ))}
            <option value="General Plotted Layouts in Koppolu">General Plotted Layouts in Koppolu</option>
            <option value="General Villa & House Inspection">General Villa & House Inspection</option>
          </select>
        </div>

        {/* Name & Phone */}
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
              placeholder="e.g. Ayyappa Rao"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9959912345"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Date & Time Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Preferred Date *
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Preferred Time Slot
            </label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            >
              <option value="Morning (09:00 AM - 11:30 AM)">Morning (09:00 AM - 11:30 AM)</option>
              <option value="Midday (11:30 AM - 02:00 PM)">Midday (11:30 AM - 02:00 PM)</option>
              <option value="Afternoon (03:00 PM - 05:30 PM)">Afternoon (03:00 PM - 05:30 PM)</option>
              <option value="Evening (05:30 PM - 07:00 PM)">Evening (05:30 PM - 07:00 PM)</option>
            </select>
          </div>
        </div>

        {/* Attendees & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Number of Attendees
            </label>
            <select
              value={attendeesCount}
              onChange={(e) => setAttendeesCount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            >
              <option value="1">1 Person</option>
              <option value="2">2 Persons (Family)</option>
              <option value="3">3 Persons</option>
              <option value="4">4+ Persons</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. mail@domain.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Message / Special requirements */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Special Notes / Specific Plot Facing Preferences (Optional)
          </label>
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Looking specifically for East-facing 200 sq.yards plots with immediate registration..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Scheduling Your Visit...</span>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Confirm Site Visit Request</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
