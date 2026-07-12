'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalDetails, statistics } from '../constants/portfolioData';
import { GiBrain, GiProgression } from 'react-icons/gi';
import { FaCogs } from 'react-icons/fa';

function CountUp({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-display font-extrabold text-4xl sm:text-5xl text-gradient-cyan tracking-tight">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  } as const;

  return (
    <section id="about" className="relative py-28 overflow-hidden bg-darkBg">
      {/* Background Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] glow-orb-secondary rounded-full blur-[100px] pointer-events-none opacity-20" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] glow-orb-primary rounded-full blur-[100px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 select-none">
          <p className="font-mono-tech text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            01 // INTRODUCTION
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            About <span className="text-gradient-purple filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">Me</span>
          </h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        {/* Narrative & stats row */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Bio text block */}
          <motion.div className="flex-1 space-y-6" variants={itemVariants}>
            <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
              A software builder driven by scalability, clean design, and <span className="text-indigo-400">AI innovation</span>.
            </h3>
            
            <p className="font-sans text-slate-400 leading-relaxed text-sm sm:text-base">
              Hi, I'm <strong className="text-slate-200">Harsh Mahesh Kshirsagar</strong>, a computer engineering developer based in Akluj, Maharashtra, India. I specialize in building complete, high-performance web platforms, real-time application pipelines, and integrating generative AI tools. 
            </p>

            <p className="font-sans text-slate-400 leading-relaxed text-sm sm:text-base">
              My engineering philosophy revolves around creating robust code, establishing intuitive interfaces, and ensuring product reliability. In addition to full-stack development, I hold strong competencies in software testing and quality assurance, allowing me to build systems that stand up under pressure and perform reliably at scale.
            </p>

            <p className="font-sans text-slate-400 leading-relaxed text-sm sm:text-base">
              I am constantly exploring advanced AI integrations, including speech synthesizers and automated assistants. Whether it's crafting a Django backend, designing a modular React/Next.js app, or implementing QA scripts, I strive for coding excellence in every project.
            </p>
          </motion.div>

          {/* Stats counters grid */}
          <motion.div 
            className="flex-1 w-full grid grid-cols-2 gap-6 select-none"
            variants={itemVariants}
          >
            {statistics.map((stat, i) => (
              <div 
                key={i}
                className="glass-card border border-white/[0.04] p-6 rounded-2xl flex flex-col justify-center bg-white/[0.01] hover:bg-white/[0.03] hover:border-purple-500/25 transition-all duration-300 shadow-xl group"
              >
                <div className="mb-2">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <h4 className="font-display font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
                  {stat.label}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  {stat.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Narrative core pillars */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 select-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Objective Pillar */}
          <motion.div 
            className="glass-card p-6 rounded-2xl flex flex-col justify-between h-64 bg-white/[0.01] hover:bg-white/[0.03] hover:border-blue-500/25 border border-white/[0.04] transition-all duration-300 shadow-lg group"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
              <GiProgression className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                Career Objective
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                To engineer stable digital platforms that resolve tangible challenges. Focus is on delivering clean architecture, premium layouts, and user-centric features.
              </p>
            </div>
          </motion.div>

          {/* AI Focus Pillar */}
          <motion.div 
            className="glass-card p-6 rounded-2xl flex flex-col justify-between h-64 bg-white/[0.01] hover:bg-white/[0.03] hover:border-purple-500/25 border border-white/[0.04] transition-all duration-300 shadow-lg group"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-md">
              <GiBrain className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                AI Integrations
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Merging cutting-edge speech modeling (ElevenLabs) and voice telephony gateways (Exotel) with robust Node/React interfaces for smart automated operations.
              </p>
            </div>
          </motion.div>

          {/* Testing / Quality Pillar */}
          <motion.div 
            className="glass-card p-6 rounded-2xl flex flex-col justify-between h-64 bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/25 border border-white/[0.04] transition-all duration-300 shadow-lg group"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-md">
              <FaCogs className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                Quality Assurance
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Strict software testing principles are implemented at all design levels. Tracking bugs via Jira workflows and testing API handlers for flawless reliability.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
