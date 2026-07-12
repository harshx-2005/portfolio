'use client';

import { 
  FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaJsSquare, FaDatabase, FaGithub 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiDjango, SiMongodb, SiMysql, SiJira, SiPostman, SiSocketdotio, SiExpress 
} from 'react-icons/si';

const MARQUEE_TECH = [
  { name: "React.js", icon: FaReact, color: "text-[#61dafb]" },
  { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
  { name: "Django", icon: SiDjango, color: "text-[#092e20]" },
  { name: "Express.js", icon: SiExpress, color: "text-[#f3f4f6]" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47a248]" },
  { name: "MySQL", icon: SiMysql, color: "text-[#00758f]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#38bdf8]" },
  { name: "HTML5", icon: FaHtml5, color: "text-[#e34f26]" },
  { name: "CSS3", icon: FaCss3Alt, color: "text-[#1572b6]" },
  { name: "JavaScript", icon: FaJsSquare, color: "text-[#f7df1e]" },
  { name: "Git", icon: FaGitAlt, color: "text-[#f05032]" },
  { name: "GitHub", icon: FaGithub, color: "text-[#f3f4f6]" },
  { name: "Postman", icon: SiPostman, color: "text-[#ff6c37]" },
  { name: "Jira", icon: SiJira, color: "text-[#0052cc]" },
  { name: "Socket.IO", icon: SiSocketdotio, color: "text-[#f3f4f6]" }
];

export default function TechMarquee() {
  const doubleTech = [...MARQUEE_TECH, ...MARQUEE_TECH, ...MARQUEE_TECH];

  return (
    <div className="relative w-full overflow-hidden py-6 bg-slate-950/20 border-y border-white/[0.03] backdrop-blur-sm select-none">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max hover:[&>div]:pause-marquee">
        <div className="flex gap-8 px-4 animate-marquee whitespace-nowrap">
          {doubleTech.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-300 group"
              >
                <Icon className={`w-5 h-5 ${tech.color} group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_4px_currentColor]`} />
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
