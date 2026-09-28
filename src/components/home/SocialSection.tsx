'use client';

import React from 'react';
import { ArrowUpRight, Play, Video, Share2 } from 'lucide-react';
import { InstagramIcon, YouTubeIcon } from '@/components/icons/SocialIcons';

export default function SocialSection() {
  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea511c]/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <Share2 className="w-3.5 h-3.5" />
            <span>CONNECT WITH US</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#0b1329] font-bold">
            Follow Vrinda Real Estate
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Watch weekly on-ground layout walkthroughs, video tours of new plot launches, and real estate insights on Instagram and YouTube.
          </p>
        </div>

        {/* 2 Big Social Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/vrindarealstate_in_ongole"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-gradient-to-br from-[#f8fafc] to-[#fff3ee] border border-slate-200 hover:border-[#ea511c]/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-7 h-7" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#ea511c] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <span className="text-xs font-bold text-[#ea511c] uppercase tracking-wider">Instagram Channel</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-1 mb-2">
                @vrindarealstate_in_ongole
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore real-time stories, site construction updates, plot marking videos, and client interactions directly on Instagram.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#ea511c]">
              <span>Follow on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* YouTube Card */}
          <a
            href="https://www.youtube.com/@VrindaRealestate-r8f"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-gradient-to-br from-[#f8fafc] to-[#e8f0fe] border border-slate-200 hover:border-[#0a4ba6]/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#ff0000] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <YouTubeIcon className="w-7 h-7" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#0a4ba6] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <span className="text-xs font-bold text-[#0a4ba6] uppercase tracking-wider">YouTube Channel</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-1 mb-2">
                @VrindaRealestate-r8f
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Watch full-length layout drone videos, road connectivity reviews, legal guidance sessions, and property walkthroughs.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#0a4ba6]">
              <span>Subscribe on YouTube</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
