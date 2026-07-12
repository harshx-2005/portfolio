'use client';

import { motion } from 'framer-motion';
import { journeyTimeline } from '../constants/portfolioData';

interface JourneyItem {
  date: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
}

function TimelineItem({ item, index }: { item: JourneyItem; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row justify-between items-center w-full mb-12 select-none">
      {/* Left/Right Container on Desktop */}
      <div className={`w-full md:w-[45%] flex ${isEven ? "justify-end text-right" : "hidden md:flex"}`}>
        {isEven && (
          <motion.div 
            className="glass-card p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-purple-500/25 transition-all duration-300 shadow-lg text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-[9px] font-mono-tech uppercase font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3 shadow-sm">
              {item.date}
            </span>
            <h3 className="font-display font-extrabold text-base sm:text-lg text-white mb-2">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md text-[9px] font-mono-tech bg-white/5 border border-white/5 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Central Circle Glow */}
      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-[#030014] bg-slate-900 flex items-center justify-center z-10 shadow-lg select-none">
        <motion.div 
          className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" 
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring" }}
          style={{
            boxShadow: "0 0 10px rgba(139, 92, 246, 0.8)"
          }}
        />
      </div>

      {/* Opposite Container */}
      <div className={`w-full md:w-[45%] flex ${!isEven ? "justify-start text-left" : "hidden md:flex"} pl-14 md:pl-0`}>
        {!isEven && (
          <motion.div 
            className="glass-card p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-purple-500/25 transition-all duration-300 shadow-lg text-left"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-[9px] font-mono-tech uppercase font-bold bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-3 shadow-sm">
              {item.date}
            </span>
            <h3 className="font-display font-extrabold text-base sm:text-lg text-white mb-2">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md text-[9px] font-mono-tech bg-white/5 border border-white/5 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile Layout Fallback */}
      <div className="md:hidden w-full pl-14 mt-1">
        {isEven && (
          <motion.div 
            className="glass-card p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] transition-all duration-300 shadow-lg text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-[9px] font-mono-tech uppercase font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3">
              {item.date}
            </span>
            <h3 className="font-display font-extrabold text-base text-white mb-2">
              {item.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md text-[9px] font-mono-tech bg-white/5 border border-white/5 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="relative py-28 overflow-hidden bg-darkBg">
      {/* Background spotlights */}
      <div className="absolute top-[20%] right-[-10%] w-[380px] h-[380px] glow-orb-secondary rounded-full blur-[100px] pointer-events-none opacity-20" />
      <div className="absolute bottom-[20%] left-[-10%] w-[380px] h-[380px] glow-orb-primary rounded-full blur-[100px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-20 select-none">
          <p className="font-mono-tech text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            05 // CAREER TIMELINE
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            My <span className="text-gradient-purple filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">Journey</span>
          </h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        {/* Timeline wrapper */}
        <div className="relative w-full flex flex-col items-center">
          {/* Vertical line connector */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 transform -translate-x-1/2 w-[3px] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />

          {journeyTimeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
