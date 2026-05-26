import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STATUSES = [
  "Initializing systems...",
  "Loading graphics grid...",
  "Compiling tailwind utilities...",
  "Injecting Django backend hooks...",
  "Syncing MERN stack core...",
  "Connecting Exotel & ElevenLabs APIs...",
  "Tuning AI voice cores...",
  "Securing credentials...",
  "Harsh Mahesh Kshirsagar Portfolio ready."
];

export default function Loader({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Progress increment timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDone(true);
          setTimeout(() => {
            onFinished();
          }, 600); // Small delay to let fade-out render
          return 100;
        }
        // Varied increment speeds
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onFinished]);

  useEffect(() => {
    // Dynamic status text changer based on current progress
    const slice = 100 / (LOADING_STATUSES.length - 1);
    const index = Math.min(Math.floor(progress / slice), LOADING_STATUSES.length - 1);
    setStatusIndex(index);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          {/* Animated Ambient background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b10_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Glow spots */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] glow-orb-primary rounded-full blur-[100px] pointer-events-none opacity-40 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] glow-orb-secondary rounded-full blur-[100px] pointer-events-none opacity-40 animate-pulse" />

          <div className="flex flex-col items-center relative z-10 max-w-sm px-6 text-center">
            {/* Spinning futuristic hex structure */}
            <motion.div 
              className="relative w-24 h-24 mb-8"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 border-[3px] border-indigo-500/20 rounded-full" />
              {/* Inner Pulsing Arc */}
              <div className="absolute inset-0 border-t-[3px] border-r-[3px] border-purple-500 rounded-full filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              {/* Tech Bracket Indicator */}
              <div className="absolute inset-4 flex items-center justify-center">
                <span className="font-mono-tech text-xl text-purple-400 font-bold">&lt; / &gt;</span>
              </div>
            </motion.div>

            {/* Percentage Indicator */}
            <h1 className="font-display font-extrabold text-5xl tracking-tight text-gradient-purple mb-4">
              {progress}%
            </h1>

            {/* Status log terminal mock */}
            <div className="w-80 h-16 flex flex-col justify-center items-center bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2 backdrop-blur-md">
              <motion.p
                key={statusIndex}
                className="font-mono-tech text-xs text-slate-400 select-none"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-emerald-500 font-bold mr-1.5">&gt;</span>
                {LOADING_STATUSES[statusIndex]}
              </motion.p>
            </div>

            {/* Simulated Progress bar */}
            <div className="w-80 h-1 bg-white/5 border border-white/10 rounded-full mt-4 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" 
                style={{ width: `${progress}%` }}
                layout
              />
            </div>

            <p className="font-mono-tech text-[10px] text-slate-500 uppercase tracking-widest mt-6">
              Harsh Mahesh Kshirsagar Dev Environment v3.5
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
