'use client';

import React, { useState } from 'react';
import { Lead, LeadStatus } from '@/lib/types';
import { 
  Users, 
  Phone, 
  MessageSquare, 
  Mail, 
  Trash2, 
  Filter, 
  Search, 
  Clock, 
  FileText,
  Save,
  CheckCircle2
} from 'lucide-react';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

interface LeadsAdminClientProps {
  initialLeads: Lead[];
}

export default function LeadsAdminClient({ initialLeads }: LeadsAdminClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const filteredLeads = leads.filter((lead) => {
    if (filterStatus !== 'all' && lead.status !== filterStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        (lead.interestedPropertyName && lead.interestedPropertyName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus })
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, notes: noteText })
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, notes: noteText } : l))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/leads?id=${leadId}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
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
          <h1 className="text-2xl font-serif font-bold text-slate-900">Leads & Customer CRM</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage inquiries, follow-up statuses, client notes, and instant contact.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Total Leads: <span className="text-[#0a4ba6] font-extrabold">{leads.length}</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, or property..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden"
          >
            <option value="all">All Inquiries ({leads.length})</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Interested Property</th>
                  <th className="py-3.5 px-4">Message / Requirements</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Internal Notes</th>
                  <th className="py-3.5 px-4 text-right">Quick Contact</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const whatsappLink = buildWhatsAppUrl(
                    lead.phone,
                    `Hello ${lead.name}, this is Bejapur Ayyappa Sai from Vrinda Real Estate regarding your enquiry on ${lead.interestedPropertyName || 'properties in Ongole'}.`
                  );
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      {/* Customer Details */}
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{lead.name}</p>
                        <p className="text-[11px] text-slate-500">{lead.phone}</p>
                        {lead.email && <p className="text-[10px] text-slate-400">{lead.email}</p>}
                        <span className="inline-block mt-1 text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
                          {lead.source}
                        </span>
                      </td>

                      {/* Interested Property */}
                      <td className="py-3.5 px-4 max-w-[180px]">
                        <p className="font-semibold text-slate-800 line-clamp-2">
                          {lead.interestedPropertyName || 'General Property Consultation'}
                        </p>
                      </td>

                      {/* Message */}
                      <td className="py-3.5 px-4 max-w-[220px]">
                        <p className="text-slate-600 line-clamp-3">
                          {lead.message || 'No additional message.'}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-hidden ${
                            lead.status === 'New'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : lead.status === 'Converted'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : lead.status === 'Site Visit Scheduled'
                              ? 'bg-blue-50 text-[#0a4ba6] border-blue-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                          <option value="Follow Up">Follow Up</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                      {/* Internal Notes */}
                      <td className="py-3.5 px-4 max-w-[180px]">
                        {editingNotesId === lead.id ? (
                          <div className="space-y-1">
                            <textarea
                              rows={2}
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              className="w-full p-1.5 text-[11px] rounded border border-slate-300 bg-white"
                            />
                            <button
                              onClick={() => handleSaveNotes(lead.id)}
                              className="px-2 py-0.5 bg-[#0a4ba6] text-white rounded text-[10px] font-bold flex items-center gap-1"
                            >
                              <Save className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingNotesId(lead.id);
                              setNoteText(lead.notes || '');
                            }}
                            className="cursor-pointer group p-1 rounded hover:bg-slate-100"
                            title="Click to edit notes"
                          >
                            <p className="text-[11px] text-slate-600 line-clamp-2 italic">
                              {lead.notes || '+ Click to add note'}
                            </p>
                          </div>
                        )}
                      </td>

                      {/* Quick Contact Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={buildPhoneUrl(lead.phone)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0a4ba6] hover:text-white text-slate-700 transition-colors"
                            title="Call Phone"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 transition-colors"
                            title="Direct WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-300 text-slate-700 transition-colors"
                              title="Send Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Delete Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                          title="Delete Lead"
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
          <p className="text-xs text-slate-500 text-center py-10">No matching leads found.</p>
        )}
      </div>

    </div>
  );
}
