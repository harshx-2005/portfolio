import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../constants/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...skillsData.map(c => c.category)];

  const getFilteredSkills = () => {
    if (activeCategory === "All") {
      return skillsData.flatMap(c => c.skills);
    }
    const found = skillsData.find(c => c.category === activeCategory);
    return found ? found.skills : [];
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section id="skills" className="relative py-28 overflow-hidden bg-[#030014]">
      {/* Background glow orbs */}
      <div className="absolute top-[30%] left-[-10%] w-[380px] h-[380px] glow-orb-primary rounded-full blur-[100px] pointer-events-none opacity-20" />
      <div className="absolute bottom-[10%] right-[-10%] w-[380px] h-[380px] glow-orb-secondary rounded-full blur-[100px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 select-none">
          <p className="font-mono-tech text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            02 // KNOWLEDGE BASE
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            My <span className="text-gradient-purple filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">Skills</span>
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

        {/* Skills grid cards list */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  className="glass-card p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] hover:border-purple-500/25 border border-white/[0.04] transition-all duration-300 shadow-lg flex flex-col justify-between h-40 select-none group"
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Skill header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:scale-108 transition-all duration-300">
                        <IconComponent className={`w-5 h-5 ${skill.color} filter drop-shadow-[0_0_4px_currentColor]`} />
                      </div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </h4>
                    </div>
                    <span className="font-mono-tech text-xs font-bold text-indigo-400">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Slider Progress loader */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono-tech uppercase mb-1.5">
                      <span>Proficiency</span>
                      <span className="group-hover:text-indigo-400 transition-colors">
                        {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : "Proficient"}
                      </span>
                    </div>
                    {/* Track Container */}
                    <div className="w-full h-1.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
