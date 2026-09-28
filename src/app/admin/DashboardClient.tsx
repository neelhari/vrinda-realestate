'use client';

import React, { useState } from 'react';
import { Property, Lead, SiteVisit, CMSSettings } from '@/lib/types';
import { 
  Building2, 
  Users, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  Phone, 
  MessageSquare, 
  Mail, 
  ArrowRight,
  Layers,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

interface DashboardClientProps {
  initialProperties: Property[];
  initialLeads: Lead[];
  initialSiteVisits: SiteVisit[];
  cms: CMSSettings;
}

export default function DashboardClient({
  initialProperties,
  initialLeads,
  initialSiteVisits,
  cms
}: DashboardClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(initialSiteVisits);

  const totalProperties = initialProperties.length;
  const availablePlots = initialProperties.filter((p) => p.type === 'plot' && p.status === 'available').length;
  const availableVillas = initialProperties.filter((p) => (p.type === 'villa' || p.type === 'house') && p.status === 'available').length;
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const confirmedVisitsCount = siteVisits.filter((v) => v.status === 'Confirmed' || v.status === 'Requested').length;

  const handleStatusChange = async (leadId: string, newStatus: any) => {
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

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0b1329] to-[#073575] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#ea511c] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Welcome back, {cms.founderName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold">
            Vrinda Real Estate Executive Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Tracking verified residential plots, luxury villas, lead conversions, and site visits in Ongole.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/admin/properties"
            className="px-4 py-2.5 bg-[#ea511c] hover:bg-[#d04312] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            + Add New Property
          </a>
          <a
            href="/admin/leads"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-md transition-all border border-white/15"
          >
            Manage CRM Leads
          </a>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Properties */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Properties</p>
            <p className="text-2xl font-serif font-bold text-slate-900 mt-1">{totalProperties}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              {availablePlots} Plots • {availableVillas} Villas / Homes
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Leads */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</p>
            <p className="text-2xl font-serif font-bold text-slate-900 mt-1">{totalLeadsCount}</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">
              {newLeadsCount} New pending follow-ups
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Site Visits */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Site Visits</p>
            <p className="text-2xl font-serif font-bold text-slate-900 mt-1">{siteVisits.length}</p>
            <p className="text-[11px] text-[#0a4ba6] font-semibold mt-1">
              {confirmedVisitsCount} Active & Confirmed
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#0a4ba6]/10 text-[#0a4ba6] flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Primary Hub */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Hub</p>
            <p className="text-base font-bold text-slate-900 mt-1">Koppolu, Ongole</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Andhra Pradesh
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Grid: Recent Leads & Scheduled Site Visits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Leads CRM (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900">Recent Customer Inquiries</h2>
              <p className="text-xs text-slate-500 mt-0.5">Quick actions: 1-click Call, WhatsApp, or update lead status.</p>
            </div>
            <a
              href="/admin/leads"
              className="text-xs font-bold text-[#0a4ba6] hover:text-[#ea511c] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {leads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Interested Property</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3">
                        <p className="font-bold text-slate-900">{lead.name}</p>
                        <p className="text-[11px] text-slate-500">{lead.phone}</p>
                      </td>
                      <td className="py-3.5 px-3">
                        <p className="font-medium text-slate-800 line-clamp-1">
                          {lead.interestedPropertyName || 'General Inquiry'}
                        </p>
                        <p className="text-[10px] text-slate-400">{lead.source}</p>
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="px-2 py-1 rounded-md text-[11px] font-bold border border-slate-200 bg-white text-slate-800 focus:outline-hidden"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Site Visit Scheduled">Visit Scheduled</option>
                          <option value="Follow Up">Follow Up</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={buildPhoneUrl(lead.phone)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0a4ba6] hover:text-white text-slate-700 transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={buildWhatsAppUrl(lead.phone, `Hello ${lead.name}, this is Bejapur Ayyappa Sai from Vrinda Real Estate regarding your property inquiry.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 transition-colors"
                            title="WhatsApp Customer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-6">No inquiries recorded yet.</p>
          )}
        </div>

        {/* Right: Site Visits & Quick Shortcuts (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Site Visits Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-slate-900">Scheduled Tours</h3>
              <a href="/admin/site-visits" className="text-xs font-bold text-[#0a4ba6]">All Visits</a>
            </div>

            {siteVisits.length > 0 ? (
              <div className="space-y-3">
                {siteVisits.slice(0, 3).map((visit) => (
                  <div key={visit.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">{visit.name}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0a4ba6]">
                        {visit.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate">{visit.propertyName}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                      <Calendar className="w-3 h-3 text-[#ea511c]" />
                      <span>{visit.preferredDate} ({visit.preferredTime})</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No site visits scheduled.</p>
            )}
          </div>

          {/* Direct CMS Quick Edit Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-serif font-bold text-slate-900">Website CMS Shortcut</h3>
            <p className="text-xs text-slate-500">
              Update homepage hero text, founder story, contact numbers, or addresses instantly without developer help.
            </p>
            <a
              href="/admin/cms"
              className="block text-center py-2.5 px-4 bg-slate-900 hover:bg-[#0a4ba6] text-white rounded-xl text-xs font-bold transition-colors"
            >
              Open Content Editor
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
