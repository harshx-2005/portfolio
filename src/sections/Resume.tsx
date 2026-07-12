'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaFileAlt } from 'react-icons/fa';
import { BiDownload, BiCheckDouble } from 'react-icons/bi';
import { resumeDetails } from '../constants/portfolioData';

export default function Resume() {
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
    <section id="resume" className="relative py-28 overflow-hidden bg-darkBg">
      {/* Background glow orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[380px] h-[380px] glow-orb-primary rounded-full blur-[100px] pointer-events-none opacity-20" />
      <div className="absolute bottom-[20%] right-[-10%] w-[380px] h-[380px] glow-orb-secondary rounded-full blur-[100px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 select-none">
          <p className="font-mono-tech text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            06 // QUALIFICATIONS DIGEST
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Professional <span className="text-gradient-purple filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">Resume</span>
          </h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        {/* Content Layout */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Left Column: Academics */}
          <motion.div className="flex-1 flex flex-col gap-8" variants={itemVariants}>
            {/* Executive Summary */}
            <div className="glass-card p-8 rounded-3xl border border-white/[0.04] bg-white/[0.01]">
              <h3 className="font-display font-extrabold text-lg text-white mb-3">
                Executive Credentials
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {resumeDetails.summary}
              </p>
            </div>

            {/* Academic history */}
            <div className="flex-grow flex flex-col gap-6">
              <div className="flex items-center gap-3 select-none">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <FaGraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  Academic Timeline
                </h3>
              </div>

              {resumeDetails.education.map((edu, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-blue-500/20 transition-all duration-300">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-200">
                      {edu.degree}
                    </h4>
                    <span className="font-mono-tech text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="font-display text-xs text-slate-400 font-medium mb-2">
                    {edu.school}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Certs & ATS Dashboard */}
          <motion.div className="flex-1 flex flex-col gap-8" variants={itemVariants}>
            {/* Certifications */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 select-none">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <FaCertificate className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  Professional Licenses
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resumeDetails.certifications.map((cert, i) => (
                  <div key={i} className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-purple-500/20 transition-all duration-300 flex flex-col justify-between h-36">
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-slate-200 leading-snug line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">
                        Issuer: {cert.issuer}
                      </p>
                    </div>
                    <span className="font-mono-tech text-[9px] font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full w-max">
                      Issued {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ATS Matcher Dashboard */}
            <div className="glass-card p-8 rounded-3xl border border-white/[0.04] bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-purple-500/25 transition-all duration-300">
              {/* Score Dial */}
              <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0 select-none">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="rgba(255, 255, 255, 0.05)" 
                    strokeWidth="8" 
                  />
                  <motion.circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="url(#purpleGradient)" 
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * 0.98) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="font-display font-black text-2xl text-white">98%</span>
                  <span className="font-mono-tech text-[8px] text-slate-500 uppercase font-bold">Match Rate</span>
                </div>
              </div>

              {/* Match info */}
              <div className="flex-grow select-none">
                <h4 className="font-display font-extrabold text-sm text-slate-200 mb-2 flex items-center gap-1.5 justify-center sm:justify-start">
                  <BiCheckDouble className="w-5 h-5 text-emerald-500" />
                  ATS-Optimized & Recruiter Ready
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed text-center sm:text-left">
                  This portfolio incorporates structural keywords targeted directly by technical screeners (MERN stack, Django backend architecture, Next.js, software quality assurance).
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3 justify-center sm:justify-start">
                  {["React", "Django", "Node", "QA", "MySQL", "Jira", "Socket.io", "Cloudinary", "Next.js", "TypeScript"].map((k) => (
                    <span key={k} className="text-[9px] font-mono-tech bg-white/5 border border-white/5 text-slate-400 px-1.5 py-0.5 rounded">
                      #{k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Resume Download Action Button */}
        <motion.div 
          className="flex justify-center mt-16 select-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="/HarshResume.pdf"
            download="HarshResume.pdf"
            className="flex items-center gap-3 px-10 py-4 rounded-xl font-bold bg-indigo-600 border border-indigo-500/20 text-white cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <FaFileAlt className="w-5 h-5" />
            Download Resume
            <BiDownload className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
