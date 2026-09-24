'use client';

import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, Sparkles, Video, X, Link as LinkIcon } from 'lucide-react';

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
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1` : null;
}

export default function DoctorVideoCard({
  videoSrc = 'https://videotourl.com/videos/1790253495515-c12792bd-4748-4fbe-b090-76fb146c6b47.mp4',
  posterImage,
  doctorName = 'Dr. Chitra',
  doctorSpecialty = 'Consultant Dermatologist & Aesthetic Specialist',
  badgeText = "Doctor's Advice",
}: DoctorVideoCardProps) {
  const [customUrl, setCustomUrl] = useState<string | null>(null);
  const [hasFallback, setHasFallback] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  
  const activeSrc = hasFallback ? '/videos/doctor-video.mp4' : (customUrl || videoSrc);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const youtubeEmbedUrl = getYouTubeEmbedUrl(activeSrc);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || youtubeEmbedUrl) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setVideoError(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      video.currentTime = 0;
    };

    const handleError = () => {
      // If remote URL has any problem, seamlessly fall back to local file
      if (!hasFallback) {
        console.warn('Network video stream error, switching to local copy /videos/doctor-video.mp4');
        setHasFallback(true);
      } else {
        setVideoError(true);
        setIsPlaying(false);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [activeSrc, youtubeEmbedUrl, hasFallback]);

  const togglePlay = () => {
    if (youtubeEmbedUrl) {
      setHasStarted(true);
      setIsPlaying(true);
      return;
    }

    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
          setVideoError(false);
        })
        .catch(() => {
          // If browser policy requires initial muted playback
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                setHasStarted(true);
                setVideoError(false);
              })
              .catch((err) => {
                console.error('Video playback failed:', err);
                setVideoError(true);
              });
          }
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !progressRef.current || duration === 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = newPercentage * duration;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSaveCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    const url = inputUrl.trim();
    setCustomUrl(url);
    setHasFallback(false);
    setVideoError(false);
    setHasStarted(true);
    setIsPlaying(true);
    setShowConfigModal(false);
  };

  return (
    <div className="relative w-full h-full group select-none">
      {/* Container Frame */}
      <div 
        className="w-full h-full relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/15 bg-stone-950 border border-stone-200 cursor-pointer"
        onClick={togglePlay}
      >
        {/* Poster / Fallback Image (shown before starting or if video error) */}
        {(!hasStarted || videoError) && !youtubeEmbedUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={posterImage}
              alt={`${doctorName} - ${doctorSpecialty}`}
              fill
              className="object-cover"
              placeholder="blur"
              priority
            />
            {/* Subtle aesthetic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
          </div>
        )}

        {/* YouTube Embed if YouTube URL is provided */}
        {youtubeEmbedUrl && hasStarted ? (
          <iframe
            src={youtubeEmbedUrl}
            title={`${doctorName} Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0 absolute inset-0 z-10"
          />
        ) : (
          /* Standard HTML5 Video Element */
          <video
            ref={videoRef}
            src={activeSrc}
            playsInline
            muted={isMuted}
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              hasStarted && !videoError ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/75 backdrop-blur-md text-stone-100 border border-white/15 text-[10px] md:text-xs uppercase tracking-[0.18em] font-medium shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{badgeText}</span>
          </div>

          {isPlaying && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] tracking-wider uppercase font-semibold animate-pulse shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>Playing</span>
            </div>
          )}
        </div>

        {/* Big Center Play Indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-white/20 animate-ping pointer-events-none" />
              <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-white text-stone-900 flex items-center justify-center shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110 border border-stone-200">
                <Play className="w-8 h-8 fill-stone-900 translate-x-0.5 text-stone-900" />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Info & Controls Bar */}
        <div 
          className={`absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent z-20 transition-opacity duration-300 ${
            isPlaying && !youtubeEmbedUrl ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Bar (Visible for HTML5 video when started) */}
          {!youtubeEmbedUrl && duration > 0 && (
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="w-full h-1.5 bg-white/25 hover:h-2.5 rounded-full mb-3 cursor-pointer overflow-hidden transition-all"
            >
              <div
                className="h-full bg-amber-400 rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between text-white">
            <div>
              <h4 className="font-serif text-lg md:text-xl text-white tracking-wide">
                {doctorName}
              </h4>
              <p className="text-[11px] md:text-xs text-stone-300 font-light line-clamp-1">
                {doctorSpecialty}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {!youtubeEmbedUrl && (
                <>
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-stone-300" /> : <Volume2 className="w-4 h-4 text-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleRestart}
                    aria-label="Restart"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors hidden sm:inline-flex"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleFullscreen}
                    aria-label="Fullscreen"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors hidden sm:inline-flex"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Video URL Config Button */}
              <button
                type="button"
                onClick={() => setShowConfigModal(true)}
                title="Change or set video link"
                aria-label="Change or set video link"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white backdrop-blur-md transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!youtubeEmbedUrl && duration > 0 && (
            <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Video Setup / Link Modal */}
      {showConfigModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowConfigModal(false)}
        >
          <div 
            className="w-full max-w-md bg-stone-900 border border-stone-700 rounded-3xl p-6 text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-amber-300">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-white">Video Source Setup</h3>
                <p className="text-xs text-stone-400">Add or update the doctor video</p>
              </div>
            </div>

            <form onSubmit={handleSaveCustomUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-2">
                  Paste Video Link (YouTube, Vimeo, Cloudinary, or direct .mp4 URL):
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=... or .mp4 link"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-stone-800/60 border border-stone-700/60 text-xs text-stone-300 space-y-2">
                <p className="font-medium text-stone-200">How to add a local video:</p>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  If you have an MP4 file on your computer, save it as:
                  <br />
                  <code className="text-amber-300 font-mono">public/videos/doctor-video.mp4</code>
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2.5 rounded-full text-xs text-stone-400 hover:text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-white text-stone-900 text-xs font-medium uppercase tracking-wider hover:bg-stone-200 transition-colors"
                >
                  Save & Play
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
