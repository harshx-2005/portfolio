import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLink, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { projectsData } from '../constants/portfolioData';

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="glass-card rounded-2xl overflow-hidden bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-purple-500/25 transition-all duration-300 shadow-xl flex flex-col justify-between select-none"
      layout
    >
      {/* Abstract Gradient Header Showcase */}
      <div className={`relative h-44 w-full bg-gradient-to-r ${project.bannerBg} flex items-center justify-center p-6 text-center select-none`}>
        {/* Ambient Overlay Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        
        {/* Glow Spheres */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-28 h-28 bg-white/10 rounded-full blur-[20px]" />
        </div>

        {/* Title Mock */}
        <h3 className="relative z-10 font-display font-extrabold text-xl text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
          {project.title}
        </h3>

        {/* Floating Category Badge */}
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-mono-tech uppercase font-bold bg-black/40 border border-white/10 text-indigo-300 backdrop-blur-md">
          {project.category}
        </span>
      </div>

      {/* Content description wrapper */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Brief Summary */}
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white/5 border border-white/5 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Features Accordion Trigger */}
        <div className="border-t border-white/5 pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer select-none mb-3 py-1 transition-colors"
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
                <ul className="space-y-2 pl-1 select-none">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                      <span className="text-emerald-500 font-bold mt-0.5">&bull;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action repository and link Row */}
          <div className="flex items-center gap-3 mt-2 select-none">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold border border-white/10 text-white bg-white/[0.02] hover:bg-white/[0.08] hover:border-purple-500/25 transition-all duration-300 shadow-md"
            >
              <FaGithub className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_12px_rgba(99,102,241,0.4)] transition-all duration-300 shadow-md"
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

  const categories = ["All", "MERN/React", "Django/Python", "AI/Integrations"];

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 overflow-hidden bg-[#030014]">
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
              className={`px-5 py-2.5 rounded-full text-xs font-semibold font-display border cursor-pointer transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                  : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05] hover:border-purple-500/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid cards wrapper */}
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
