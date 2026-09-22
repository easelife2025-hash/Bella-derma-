'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronsLeftRight, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface BeforeAfterCase {
  id: string;
  treatmentName: string;
  category: string;
  timeline: string;
  sessions: string;
  beforeImage: string | StaticImageData;
  afterImage: string | StaticImageData;
  beforeAlt?: string;
  afterAlt?: string;
  description: string;
  doctorNote: string;
  clinicalResults: string[];
}

interface BeforeAfterSliderProps {
  beforeImage: string | StaticImageData;
  afterImage: string | StaticImageData;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
  initialSliderPosition?: number;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  aspectRatio = 'aspect-[4/3] md:aspect-[16/10]',
  className = '',
  initialSliderPosition = 50,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialSliderPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // In case capture was already released
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div className={`relative flex flex-col select-none ${className}`}>
      {/* Slider Container */}
      <div
        ref={containerRef}
        id="before-after-slider-container"
        tabIndex={0}
        role="slider"
        aria-label="Before and after treatment comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full ${aspectRatio} rounded-2xl md:rounded-3xl overflow-hidden cursor-ew-resize touch-none shadow-xl shadow-stone-950/10 border border-stone-200/80 bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400`}
      >
        {/* "AFTER" Image (Full background layer) */}
        <div className="absolute inset-0 w-full h-full">
          {typeof afterImage === 'string' ? (
            <Image
              src={afterImage}
              alt="Treatment after result"
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />
          ) : (
            <Image
              src={afterImage}
              alt="Treatment after result"
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
              placeholder="blur"
              priority
            />
          )}
          {/* Subtle After Badge */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-none z-10">
            <span className="px-3.5 py-1.5 rounded-full text-[11px] md:text-xs uppercase tracking-[0.15em] font-medium bg-stone-900/80 text-white backdrop-blur-md border border-white/20 shadow-md">
              {afterLabel}
            </span>
          </div>
        </div>

        {/* "BEFORE" Image (Clipped layer using CSS clipPath) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {typeof beforeImage === 'string' ? (
            <Image
              src={beforeImage}
              alt="Treatment before condition"
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />
          ) : (
            <Image
              src={beforeImage}
              alt="Treatment before condition"
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
              placeholder="blur"
              priority
            />
          )}
          {/* Subtle Before Badge */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 pointer-events-none z-10">
            <span className="px-3.5 py-1.5 rounded-full text-[11px] md:text-xs uppercase tracking-[0.15em] font-medium bg-white/85 text-stone-900 backdrop-blur-md border border-stone-200 shadow-md">
              {beforeLabel}
            </span>
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.3)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Circular Grab Handle */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white text-stone-900 shadow-xl flex items-center justify-center border-2 border-stone-100 transition-transform duration-150 ${
              isDragging ? 'scale-110 shadow-2xl ring-4 ring-stone-900/10' : 'hover:scale-105'
            }`}
          >
            <ChevronsLeftRight className="w-5 h-5 text-stone-800" />
          </div>
        </div>

        {/* Interaction Hint for First-time Viewers */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 transition-opacity duration-300 ${
            isDragging ? 'opacity-0' : 'opacity-85'
          }`}
        >
          <span className="px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.18em] font-medium bg-stone-900/60 text-white/95 backdrop-blur-md border border-white/10 shadow-sm">
            Drag slider to compare
          </span>
        </div>
      </div>

      {/* Quick Jump Buttons & Slider Info */}
      <div className="flex items-center justify-between mt-4 px-1">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSliderPosition(0)}
            className={`text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all ${
              sliderPosition === 0
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
            }`}
          >
            100% After
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all ${
              Math.round(sliderPosition) === 50
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
            }`}
          >
            50 / 50 Split
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(100)}
            className={`text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all ${
              sliderPosition === 100
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
            }`}
          >
            100% Before
          </button>
        </div>

        <span className="text-xs text-stone-400 font-mono tracking-tight">
          {Math.round(sliderPosition)}% View
        </span>
      </div>
    </div>
  );
}

// Full Interactive Showcase with Clinical Case Selector
export function TreatmentResultsShowcase({
  cases,
  initialCaseId,
}: {
  cases: BeforeAfterCase[];
  initialCaseId?: string;
}) {
  const [selectedCaseId, setSelectedCaseId] = useState(
    initialCaseId || (cases[0]?.id ?? '')
  );

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  if (!activeCase) return null;

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-12 border border-stone-200 shadow-sm">
      {/* Category / Case Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-12 border-b border-stone-100 pb-6">
        <span className="text-xs uppercase tracking-[0.15em] font-medium text-stone-400 mr-2 shrink-0">
          Case Studies:
        </span>
        {cases.map((c) => {
          const isActive = c.id === activeCase.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all font-medium ${
                isActive
                  ? 'bg-stone-900 text-stone-50 shadow-md shadow-stone-900/10'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {c.treatmentName}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Comparison Slider + Case Details */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left: The Interactive Slider */}
        <div className="lg:col-span-7">
          <BeforeAfterSlider
            key={activeCase.id}
            beforeImage={activeCase.beforeImage}
            afterImage={activeCase.afterImage}
            beforeLabel="Before Treatment"
            afterLabel="After Protocol"
            aspectRatio="aspect-[4/3] md:aspect-[16/11]"
          />
        </div>

        {/* Right: Clinical Case Details */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium bg-stone-100 text-stone-700">
                {activeCase.category}
              </span>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-stone-500" />
                Verified Clinical Result
              </span>
            </div>

            <h3 className="font-serif text-3xl md:text-4xl text-stone-900 mb-3 tracking-tight">
              {activeCase.treatmentName}
            </h3>

            <p className="text-stone-500 text-sm md:text-base font-light leading-relaxed mb-6">
              {activeCase.description}
            </p>

            {/* Protocol Meta Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/70 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                  Treatment Course
                </span>
                <span className="text-xs md:text-sm font-medium text-stone-800">
                  {activeCase.sessions}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                  Follow-up Timeline
                </span>
                <span className="text-xs md:text-sm font-medium text-stone-800">
                  {activeCase.timeline}
                </span>
              </div>
            </div>

            {/* Key Clinical Improvements */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.15em] font-medium text-stone-900 block mb-3">
                Clinical Outcomes:
              </span>
              <ul className="space-y-2">
                {activeCase.clinicalResults.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-stone-600 font-light">
                    <CheckCircle2 className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Doctor Note */}
            <div className="p-4 rounded-xl bg-stone-100/70 border-l-2 border-stone-800 mb-8">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block mb-1">
                Physician Evaluation • Dr. Chitra
              </span>
              <p className="text-xs md:text-sm italic text-stone-700 leading-relaxed font-serif">
                &ldquo;{activeCase.doctorNote}&rdquo;
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-stone-900 text-stone-50 text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 transition-all shadow-md group"
          >
            <span>Book Consultation for this Protocol</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
