'use client';

import React, { useState } from 'react';
import { SiteVisit, SiteVisitStatus } from '@/lib/types';
import { Calendar, Phone, MessageSquare, Clock, Trash2, CheckCircle2, User, Users } from 'lucide-react';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

interface SiteVisitsAdminClientProps {
  initialVisits: SiteVisit[];
}

export default function SiteVisitsAdminClient({ initialVisits }: SiteVisitsAdminClientProps) {
  const [visits, setVisits] = useState<SiteVisit[]>(initialVisits);

  const handleStatusChange = async (visitId: string, newStatus: SiteVisitStatus) => {
    try {
      const res = await fetch('/api/site-visits', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: visitId, status: newStatus })
      });
      if (res.ok) {
        setVisits((prev) =>
          prev.map((v) => (v.id === visitId ? { ...v, status: newStatus } : v))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (visitId: string) => {
    if (!confirm('Are you sure you want to delete this site visit booking?')) return;
    try {
      const res = await fetch(`/api/site-visits?id=${visitId}`, { method: 'DELETE' });
      if (res.ok) {
        setVisits((prev) => prev.filter((v) => v.id !== visitId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Site Visit Bookings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage scheduled property walkthroughs, attendee confirmations, and on-ground logistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Total Visits: <span className="text-[#0a4ba6] font-extrabold">{visits.length}</span>
          </span>
        </div>
      </div>

      {/* Visits Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {visits.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Visitor Name & Phone</th>
                  <th className="py-3.5 px-4">Requested Property</th>
                  <th className="py-3.5 px-4">Date & Time Slot</th>
                  <th className="py-3.5 px-4">Attendees</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Quick Contact</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visits.map((visit) => {
                  const whatsappLink = buildWhatsAppUrl(
                    visit.phone,
                    `Hello ${visit.name}, this is Bejapur Ayyappa Sai from Vrinda Real Estate confirming your site visit for ${visit.propertyName} on ${visit.preferredDate} at ${visit.preferredTime}.`
                  );
                  return (
                    <tr key={visit.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{visit.name}</p>
                        <p className="text-[11px] text-slate-500">{visit.phone}</p>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {visit.propertyName}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                          <Calendar className="w-3.5 h-3.5 text-[#ea511c]" />
                          <span>{visit.preferredDate}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{visit.preferredTime}</p>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {visit.attendeesCount || 1} Person(s)
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={visit.status}
                          onChange={(e) => handleStatusChange(visit.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-hidden ${
                            visit.status === 'Requested'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : visit.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : visit.status === 'Completed'
                              ? 'bg-blue-50 text-[#0a4ba6] border-blue-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="Requested">Requested</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Rescheduled">Rescheduled</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={buildPhoneUrl(visit.phone)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0a4ba6] hover:text-white text-slate-700 transition-colors"
                            title="Call Visitor"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 transition-colors"
                            title="Confirm via WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(visit.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 text-center py-10">No site visits scheduled.</p>
        )}
      </div>

    </div>
  );
}
