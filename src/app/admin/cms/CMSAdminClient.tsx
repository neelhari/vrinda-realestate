'use client';

import React, { useState } from 'react';
import { CMSSettings } from '@/lib/types';
import { Save, CheckCircle2, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, YouTubeIcon } from '@/components/icons/SocialIcons';

interface CMSAdminClientProps {
  initialCMS: CMSSettings;
}

export default function CMSAdminClient({ initialCMS }: CMSAdminClientProps) {
  const [cms, setCms] = useState<CMSSettings>(initialCMS);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSuccess(false);
    setErrorMessage('');

    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cms)
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        setErrorMessage('Failed to update settings.');
      }
    } catch {
      setErrorMessage('Network error.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">CMS & Website Content Editor</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Update brand text, hero headlines, phone numbers, and addresses without touching code.
        </p>
      </div>

      {isSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Website content updated successfully! Public pages are refreshed.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        
        {/* Hero Section Copy */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0a4ba6]" />
            <span>Homepage Hero Section</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Main Hero Headline
            </label>
            <input
              type="text"
              required
              value={cms.heroHeadline}
              onChange={(e) => setCms({ ...cms, heroHeadline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Hero Supporting Subheadline
            </label>
            <textarea
              rows={2}
              value={cms.heroSubheadline}
              onChange={(e) => setCms({ ...cms, heroSubheadline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
            />
          </div>
        </div>

        {/* Founder & About Story */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Founder & Brand Story
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Founder Name
              </label>
              <input
                type="text"
                required
                value={cms.founderName}
                onChange={(e) => setCms({ ...cms, founderName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Founder Title
              </label>
              <input
                type="text"
                value={cms.founderTitle}
                onChange={(e) => setCms({ ...cms, founderTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              About Vrinda Story
            </label>
            <textarea
              rows={3}
              value={cms.aboutStory}
              onChange={(e) => setCms({ ...cms, aboutStory: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#ea511c]" />
            <span>Contact & Communication Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Primary Call Phone
              </label>
              <input
                type="text"
                value={cms.primaryPhone}
                onChange={(e) => setCms({ ...cms, primaryPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                WhatsApp Phone
              </label>
              <input
                type="text"
                value={cms.whatsappNumber}
                onChange={(e) => setCms({ ...cms, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={cms.email}
                onChange={(e) => setCms({ ...cms, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Physical Location Addresses</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Business Hub Address
              </label>
              <input
                type="text"
                value={cms.businessAddress}
                onChange={(e) => setCms({ ...cms, businessAddress: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Founder Office / City Address
              </label>
              <input
                type="text"
                value={cms.founderAddress}
                onChange={(e) => setCms({ ...cms, founderAddress: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Homepage Promo Banner Cards */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0a4ba6]" />
              <span>Homepage Promo Banner Cards</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Customize the horizontal scrolling banner cards displayed right below the Hero section.
            </p>
          </div>

          <div className="space-y-4">
            {(cms.promoBanners || []).map((card, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-xs font-bold text-slate-900 uppercase">Banner Card #{idx + 1}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const updated = [...(cms.promoBanners || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setCms({ ...cms, promoBanners: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={card.subtitle}
                      onChange={(e) => {
                        const updated = [...(cms.promoBanners || [])];
                        updated[idx] = { ...updated[idx], subtitle: e.target.value };
                        setCms({ ...cms, promoBanners: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Link URL (e.g. /plots)</label>
                    <input
                      type="text"
                      value={card.href}
                      onChange={(e) => {
                        const updated = [...(cms.promoBanners || [])];
                        updated[idx] = { ...updated[idx], href: e.target.value };
                        setCms({ ...cms, promoBanners: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Background Image URL</label>
                    <input
                      type="text"
                      value={card.image}
                      onChange={(e) => {
                        const updated = [...(cms.promoBanners || [])];
                        updated[idx] = { ...updated[idx], image: e.target.value };
                        setCms({ ...cms, promoBanners: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Handles */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Social Media Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                value={cms.instagram}
                onChange={(e) => setCms({ ...cms, instagram: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                YouTube Channel Handle
              </label>
              <input
                type="text"
                value={cms.youtube}
                onChange={(e) => setCms({ ...cms, youtube: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save All Content Changes'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
