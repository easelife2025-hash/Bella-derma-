'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';

interface ClinicVideoSectionProps {
  /**
   * Path to your local video inside the /public folder.
   * Example: If your file is at /public/videos/clinic-tour.mp4, set videoSrc="/videos/clinic-tour.mp4"
   */
  videoSrc?: string;
  /**
   * Optional poster image shown before the video plays or while loading
   */
  posterImage?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function ClinicVideoSection({
  videoSrc = '/videos/clinic-tour.mp4',
  posterImage = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80',
  title = 'Inside Bella Derma Clinic',
  subtitle = 'State-of-the-Art Aesthetic Facility',
  description = 'Experience our private clinical suites, cutting-edge laser technologies, and serene consultation spaces designed for your comfort and safety in Nerul, Navi Mumbai.',
}: ClinicVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.warn('Video play was prevented:', err);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-stone-700" />
            <span className="text-stone-500 tracking-[0.2em] uppercase text-xs font-medium">
              Virtual Clinic Tour
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 tracking-tight">
            {title}
          </h2>
          <p className="text-stone-400 text-sm uppercase tracking-wider mt-1">
            {subtitle}
          </p>
        </div>
        <p className="text-stone-500 font-light text-sm md:text-base max-w-md">
          {description}
        </p>
      </div>

      {/* Video Container Frame */}
      <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden bg-stone-900 shadow-2xl border border-stone-200 group">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterImage}
          playsInline
          muted={isMuted}
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* Darkened overlay when paused or before starting */}
        <div
          className={`absolute inset-0 bg-stone-950/30 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Big Center Play Button (Shown when paused or initial state) */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play clinic tour video"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 group-hover:shadow-stone-950/50"
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 fill-stone-900 translate-x-0.5" />
          </button>
        )}

        {/* Bottom Floating Control Bar */}
        <div
          className={`absolute bottom-6 inset-x-6 md:inset-x-10 p-4 rounded-2xl bg-stone-900/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-white transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Restart video"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <span className="text-xs tracking-wider uppercase text-stone-300 font-medium hidden sm:inline">
              {isPlaying ? 'Now Playing' : 'Paused'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleMute}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors text-xs"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-stone-400" />
                  <span className="text-stone-400">Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-stone-100" />
                  <span>Mute</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
