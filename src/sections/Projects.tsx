'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLink, FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';
import { projectsData, Project } from '../constants/portfolioData';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x / 15, y: y / 15 });
  };

  const resetMouse = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      data-project-card
      className="glass-card rounded-3xl overflow-hidden bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.03] hover:border-indigo-500/30 transition-all duration-500 shadow-xl flex flex-col justify-between select-none relative group"
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg) translateY(-5px)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background Spotlight */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x * 15 + 200}px ${mousePos.y * 15 + 100}px, rgba(99, 102, 241, 0.08), transparent 70%)`
        }}
      />

      {/* Abstract Banner Header */}
      <div className={`relative h-48 w-full bg-gradient-to-r ${project.bannerBg} flex items-center justify-center p-6 text-center select-none overflow-hidden z-10`}>
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        
        {/* Glow Spheres */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 bg-white/5 rounded-full blur-[25px] group-hover:scale-125 transition-transform duration-700" />
        </div>

        {/* Title */}
        <h3 className="relative z-10 font-display font-black text-2xl text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-[1.03] transition-transform duration-500">
          {project.title}
        </h3>

        {/* Badges Container */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
          {project.badges?.map((badge, idx) => (
            <span 
              key={idx} 
              className={`px-3 py-1 rounded-full text-[8px] font-mono-tech uppercase font-bold tracking-wider backdrop-blur-md border ${
                badge === "Featured" || badge === "Live Production"
                  ? "bg-indigo-500/20 border-indigo-400/30 text-indigo-300"
                  : "bg-black/40 border-white/10 text-slate-300"
              }`}
            >
              {badge}
            </span>
          ))}
          {!project.badges && (
            <span className="px-3 py-1 rounded-full text-[8px] font-mono-tech uppercase font-bold bg-black/40 border border-white/10 text-indigo-300 backdrop-blur-md">
              {project.category}
            </span>
          )}
        </div>

        {/* Project Date Badge */}
        <span className="absolute bottom-4 left-4 px-2.5 py-0.5 rounded bg-black/40 border border-white/5 text-[8px] font-mono-tech text-slate-400 font-bold uppercase">
          {project.date}
        </span>
      </div>

      {/* Content wrapper */}
      <div className="p-6 flex-grow flex flex-col justify-between z-10 relative bg-darkBg/30">
        <div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map((tech, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-lg text-[9px] font-mono-tech font-semibold bg-white/5 border border-white/5 text-slate-300 group-hover:bg-indigo-500/5 group-hover:border-indigo-500/20 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Accordion Toggle */}
        <div className="border-t border-white/5 pt-4">
          
          {/* Render Before/After slider ONLY if Graphene Interiors project is expanded */}
          {expanded && project.id === 'graphene' && project.beforeImage && project.afterImage && (
            <div className="mb-6 animate-fadeIn">
              <BeforeAfterSlider 
                beforeImage={project.beforeImage} 
                afterImage={project.afterImage} 
              />
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer select-none mb-3.5 py-1 transition-colors"
          >
            <span>{expanded ? "Hide Systems Architecture" : "View Systems Architecture"}</span>
            {expanded ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
          </button>

          {/* Expandable Features list */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mb-4"
              >
                <ul className="space-y-2.5 pl-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                      <span className="text-indigo-500 font-bold mt-0.5">&bull;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Links */}
          <div className="flex items-center gap-3 mt-2 select-none">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border border-white/10 text-white bg-white/[0.01] hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-300 shadow-md"
            >
              <FaGithub className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 border border-indigo-500/20 text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 shadow-md"
            >
              <FaLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Next/React", "MERN/React", "AI/Integrations"];

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 overflow-hidden bg-darkBg">
      {/* Ambient background glow orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[380px] h-[380px] glow-orb-secondary rounded-full blur-[100px] pointer-events-none opacity-20" />
      <div className="absolute bottom-[30%] left-[-10%] w-[380px] h-[380px] glow-orb-primary rounded-full blur-[100px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 select-none">
          <p className="font-mono-tech text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            03 // WORKS PORTFOLIO
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Featured <span className="text-gradient-purple filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">Projects</span>
          </h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        {/* Tab switchers row */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-12 select-none">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold font-display border cursor-pointer transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-indigo-600 border-indigo-500/25 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]"
                  : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
