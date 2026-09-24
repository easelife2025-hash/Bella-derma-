'use client';

import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface DoctorVideoCardProps {
  videoSrc?: string;
  posterImage: StaticImageData;
  doctorName?: string;
  doctorSpecialty?: string;
  badgeText?: string;
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(ytRegex);
  return match
    ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&modestbranding=1&rel=0`
    : null;
}

export default function DoctorVideoCard({
  videoSrc = 'https://videotourl.com/videos/1790253495515-c12792bd-4748-4fbe-b090-76fb146c6b47.mp4',
  posterImage,
  doctorName = 'Dr. Chitra',
  doctorSpecialty = 'Consultant Dermatologist & Aesthetic Specialist',
  badgeText = "Doctor's Advice",
}: DoctorVideoCardProps) {
  const [hasFallback, setHasFallback] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const activeSrc = hasFallback ? '/videos/doctor-video.mp4' : videoSrc;
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(activeSrc);

  // Guarantee continuous auto-play and looping like a high-definition GIF
  useEffect(() => {
    const video = videoRef.current;
    if (!video || youtubeEmbedUrl) return;

    video.muted = isMuted;
    video.playsInline = true;
    video.loop = true;

    const attemptAutoplay = () => {
      video
        .play()
        .then(() => {
          setIsLoaded(true);
        })
        .catch((err) => {
          console.warn('Autoplay waiting for ready state:', err);
          // Always ensure muted for browser autoplay policies
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    };

    const handleCanPlay = () => {
      attemptAutoplay();
    };

    const handleEnded = () => {
      // Loop again immediately
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const handleError = () => {
      if (!hasFallback) {
        console.warn('Remote video stream failed, auto-falling back to local video copy');
        setHasFallback(true);
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Initial play kick-off
    attemptAutoplay();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [activeSrc, youtubeEmbedUrl, hasFallback, isMuted]);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    // Ensure it keeps playing smoothly when unmuting/muting
    videoRef.current.play().catch(() => {});
  };

  return (
    <div className="relative w-full h-full group select-none">
      {/* GIF / Looping Video Container */}
      <div 
        className="w-full h-full relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/15 bg-stone-950 border border-stone-200 cursor-pointer"
        onClick={() => toggleSound()}
        title="Tap anywhere to toggle audio"
      >
        {/* Poster / Fallback image (Smoothly fades out once video frame loads) */}
        {!youtubeEmbedUrl && (
          <div 
            className={`absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image
              src={posterImage}
              alt={`${doctorName} - ${doctorSpecialty}`}
              fill
              className="object-cover"
              placeholder="blur"
              priority
            />
            <div className="absolute inset-0 bg-stone-950/20" />
          </div>
        )}

        {/* Video Element: Continuous Auto-looping GIF Mode */}
        {youtubeEmbedUrl ? (
          <iframe
            src={youtubeEmbedUrl}
            title={`${doctorName} Looping Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full border-0 absolute inset-0 z-10 pointer-events-none"
          />
        ) : (
          <video
            ref={videoRef}
            src={activeSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover relative z-10"
          />
        )}

        {/* Top Badges (Doctor's Advice badge on left only) */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-start z-20 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/70 backdrop-blur-md text-stone-100 border border-white/15 text-[10px] md:text-xs uppercase tracking-[0.18em] font-medium shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{badgeText}</span>
          </div>
        </div>

        {/* Bottom Floating Info & Audio Toggle Only */}
        <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-transparent z-20 flex items-end justify-between">
          <div className="pointer-events-none pr-2">
            <h4 className="font-serif text-lg md:text-xl text-white tracking-wide">
              {doctorName}
            </h4>
            <p className="text-[11px] md:text-xs text-stone-300 font-light line-clamp-1">
              {doctorSpecialty}
            </p>
          </div>

          {/* Clean Audio Toggle Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={toggleSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white backdrop-blur-md border border-white/20 transition-all text-xs font-medium shadow-lg hover:scale-105 active:scale-95"
              aria-label={isMuted ? 'Turn Sound On' : 'Mute Video'}
              title={isMuted ? 'Turn Sound On' : 'Mute Video'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-300" />
                  <span className="text-[10px] text-stone-300 tracking-wider uppercase">Audio Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span className="text-[10px] text-amber-300 tracking-wider uppercase font-semibold">Audio On</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
