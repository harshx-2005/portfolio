'use client';

import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current && e.buttons !== 1) return; // Allow click-move as well as drag
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => { isDragging.current = true; }}
      onMouseUp={() => { isDragging.current = false; }}
      className="relative w-full aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl select-none cursor-ew-resize group bg-zinc-950"
    >
      {/* Before Image (Background Layer) */}
      <img
        src={beforeImage}
        alt="Original Joinery / Shell Interior"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
        draggable={false}
      />
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-mono-tech uppercase font-bold text-slate-300 backdrop-blur-md">
        Original Shell
      </div>

      {/* After Image (Clipped Foreground Layer) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={afterImage}
          alt="Completed Luxury Joinery Interior"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}
        />
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-indigo-500/80 border border-indigo-400/30 text-[9px] font-mono-tech uppercase font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] backdrop-blur-md">
          Completed Luxury Transformation
        </div>
      </div>

      {/* Glassmorphic slider dividing slider handler line */}
      <div
        className="absolute top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-blue-500 via-indigo-400 to-purple-500 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900 border border-indigo-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] text-white hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <span className="text-xs font-bold text-indigo-300">↔</span>
        </div>
      </div>

      {/* Interactive Helper Text */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/60 border border-white/5 text-[9px] font-mono-tech text-slate-400 uppercase tracking-widest backdrop-blur-md opacity-70 group-hover:opacity-100 transition-opacity">
        Drag/Click to slide transformation
      </div>
    </div>
  );
}
