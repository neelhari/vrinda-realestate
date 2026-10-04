'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Film } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  videos?: string[];
  title: string;
}

export function isVideoUrl(url: string): boolean {
  if (!url) return false;
  return (
    /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i.test(url) ||
    url.includes('/video/upload/') ||
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('vimeo.com')
  );
}

function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  return null;
}

function getVideoPoster(url: string): string | null {
  if (!url) return null;
  // If it's Cloudinary video, Cloudinary automatically gives a JPG poster by replacing extension with .jpg
  if (url.includes('res.cloudinary.com') && url.includes('/video/upload/')) {
    return url.replace(/\.(mp4|webm|mov|m4v)$/i, '.jpg');
  }
  // If YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }
  return null;
}

export default function PropertyGallery({ images = [], videos = [], title }: PropertyGalleryProps) {
  // Combine images and videos into a single ordered media playlist
  const validImages = images.filter(Boolean);
  const validVideos = videos.filter(Boolean);

  let allMedia: string[] = [];
  
  if (validImages.length === 0 && validVideos.length === 0) {
    allMedia = ['/images/category-plots.jpg'];
  } else {
    allMedia = [...validImages, ...validVideos];
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeIndex = selectedIndex < allMedia.length ? selectedIndex : 0;
  const currentMedia = allMedia[activeIndex];
  const isCurrentVideo = isVideoUrl(currentMedia);
  const ytEmbed = isCurrentVideo ? getYoutubeEmbedUrl(currentMedia) : null;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % allMedia.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <div className="space-y-3.5">
      {/* 1. Main Stage / Hero Media Display (Supports Photos & Live Videos) */}
      <div className="group relative h-[320px] sm:h-[480px] lg:h-[530px] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-md select-none">
        
        {isCurrentVideo ? (
          <div className="w-full h-full flex items-center justify-center bg-black">
            {ytEmbed ? (
              <iframe
                src={ytEmbed}
                title={`${title} - Video Tour`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                key={currentMedia}
                src={currentMedia}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              >
                Your browser does not support playing this video.
              </video>
            )}
          </div>
        ) : (
          <Image
            src={currentMedia}
            alt={`${title} - Photo ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover transition-all duration-300 ease-out"
          />
        )}

        {/* Media Counter & Type Indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {isCurrentVideo && (
            <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
              <Film className="w-3 h-3" />
              <span>VIDEO TOUR</span>
            </span>
          )}
          {allMedia.length > 1 && (
            <div className="px-3 py-1 rounded-full bg-black/70 text-white text-xs font-semibold backdrop-blur-md">
              {activeIndex + 1} / {allMedia.length}
            </div>
          )}
        </div>

        {/* Left / Right Arrow Navigation */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous item"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg backdrop-blur-xs transition-all hover:scale-110 active:scale-95 z-10 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              type="button"
              aria-label="Next item"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg backdrop-blur-xs transition-all hover:scale-110 active:scale-95 z-10 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* 2. Interactive E-commerce Thumbnail Carousel with Video Badges */}
      {allMedia.length > 1 && (
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          {allMedia.map((mediaUrl, i) => {
            const isActive = i === activeIndex;
            const itemIsVideo = isVideoUrl(mediaUrl);
            const poster = itemIsVideo ? getVideoPoster(mediaUrl) : mediaUrl;

            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                aria-label={`View ${itemIsVideo ? 'video' : 'photo'} ${i + 1}`}
                className={`relative h-18 sm:h-24 w-24 sm:w-32 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'ring-3 ring-[#0a4ba6] ring-offset-2 ring-offset-white shadow-md opacity-100 scale-100'
                    : 'opacity-70 hover:opacity-100 border border-slate-200 hover:border-slate-400'
                }`}
              >
                {poster ? (
                  <Image
                    src={poster}
                    alt={`${title} thumbnail ${i + 1}`}
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <Film className="w-6 h-6" />
                  </div>
                )}

                {/* Video Play Badge Overlay for Thumbnails */}
                {itemIsVideo && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
