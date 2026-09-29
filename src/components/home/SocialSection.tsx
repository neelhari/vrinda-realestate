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

        {/* 2 Social Showcase Cards in 2-Column Grid on Mobile and Desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-3xl mx-auto">
          
          {/* Instagram Card */}
          <motion.a
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            href="https://www.instagram.com/vrindarealstate_in_ongole"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-3.5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#f8fafc] to-[#fff3ee] border border-slate-200/90 hover:border-[#ea511c]/40 hover:shadow-md transition-all duration-300 active:scale-95"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#ea511c] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>

              <span className="text-[9px] sm:text-[10px] font-bold text-[#ea511c] uppercase tracking-wider block">Instagram</span>
              <h3 className="text-xs sm:text-base font-serif font-bold text-slate-900 mt-0.5 mb-1 truncate">
                @vrindarealstate
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-tight line-clamp-2 hidden sm:block">
                Site stories, plot marking videos, and customer interactions.
              </p>
            </div>

            <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-slate-200/80 flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#ea511c]">
              <span>Follow</span>
              <ArrowUpRight className="w-3 h-3" />
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
            className="group relative flex flex-col justify-between p-3.5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#f8fafc] to-[#e8f0fe] border border-slate-200/90 hover:border-[#0a4ba6]/40 hover:shadow-md transition-all duration-300 active:scale-95"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#ff0000] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#0a4ba6] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>

              <span className="text-[9px] sm:text-[10px] font-bold text-[#0a4ba6] uppercase tracking-wider block">YouTube</span>
              <h3 className="text-xs sm:text-base font-serif font-bold text-slate-900 mt-0.5 mb-1 truncate">
                @VrindaRealestate
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-tight line-clamp-2 hidden sm:block">
                Drone walkthroughs, road reviews, and property video tours.
              </p>
            </div>

            <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-slate-200/80 flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#0a4ba6]">
              <span>Subscribe</span>
              <Play className="w-3 h-3 fill-current" />
            </div>
          </motion.a>

        </div>

      </div>
    </section>
  );
}
