'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Video, Share2 } from 'lucide-react';
import { InstagramIcon, YouTubeIcon } from '@/components/icons/SocialIcons';

export default function SocialSection() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea511c]/10 text-[#ea511c] text-xs font-semibold uppercase tracking-wider">
            <Share2 className="w-3.5 h-3.5" />
            <span>CONNECT WITH US</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#0b1329] font-bold">
            Follow Vrinda Real Estate
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Watch weekly on-ground layout walkthroughs and video tours of new plot launches on Instagram and YouTube.
          </p>
        </div>

        {/* 2 Big Social Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          
          {/* Instagram Card */}
          <motion.a
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            href="https://www.instagram.com/vrindarealstate_in_ongole"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-[#f8fafc] to-[#fff3ee] border border-slate-200 hover:border-[#ea511c]/40 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#ea511c] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <span className="text-[10px] font-bold text-[#ea511c] uppercase tracking-wider">Instagram Channel</span>
              <h3 className="text-base font-serif font-bold text-slate-900 mt-0.5 mb-1.5 line-clamp-1">
                @vrindarealstate_in_ongole
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                Explore real-time stories, site construction updates, plot marking videos, and client interactions.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs font-bold text-[#ea511c]">
              <span>Follow on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </motion.a>

          {/* YouTube Card */}
          <motion.a
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            href="https://www.youtube.com/@VrindaRealestate-r8f"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-[#f8fafc] to-[#e8f0fe] border border-slate-200 hover:border-[#0a4ba6]/40 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#ff0000] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <YouTubeIcon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#0a4ba6] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <span className="text-[10px] font-bold text-[#0a4ba6] uppercase tracking-wider">YouTube Channel</span>
              <h3 className="text-base font-serif font-bold text-slate-900 mt-0.5 mb-1.5 line-clamp-1">
                @VrindaRealestate-r8f
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                Watch full-length layout drone videos, road connectivity reviews, legal guidance sessions, and tours.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs font-bold text-[#0a4ba6]">
              <span>Subscribe on YouTube</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
          </motion.a>

        </div>

      </div>
    </section>
  );
}
