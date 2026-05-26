import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { personalDetails } from '../constants/portfolioData';

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Journey", id: "journey" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" }
];

export default function Footer() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-[#030014] border-t border-white/5 py-12 select-none overflow-hidden">
      {/* Decorative background ambient orb */}
      <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 w-[350px] h-[200px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Brand logo header */}
        <a 
          href="#home" 
          onClick={(e) => handleScrollTo(e, "home")}
          className="flex items-center gap-2 mb-6 group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white font-mono-tech shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-transform duration-300">
            H
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            Harsh<span className="text-indigo-400 font-medium">.Kshirsagar</span>
          </span>
        </a>

        {/* Tagline short info */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
          {personalDetails.tagline} Focused on shipping resilient web applications and integrating advanced artificial intelligence.
        </p>

        {/* Footer shortcuts shortcuts */}
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-8 max-w-2xl select-none">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Social icon link row */}
        <div className="flex items-center gap-6 mb-8">
          <a 
            href={personalDetails.socials.github} 
            target="_blank" 
            rel="noreferrer" 
            className="w-9 h-9 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a 
            href={personalDetails.socials.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="w-9 h-9 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a 
            href={personalDetails.socials.twitter} 
            target="_blank" 
            rel="noreferrer" 
            className="w-9 h-9 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/20 transition-all duration-300"
            aria-label="Twitter"
          >
            <FaTwitter className="w-4 h-4" />
          </a>
          <a 
            href={`mailto:${personalDetails.socials.email}`}
            className="w-9 h-9 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/20 transition-all duration-300"
            aria-label="Email"
          >
            <FaEnvelope className="w-4 h-4" />
          </a>
        </div>

        {/* Solid divider line */}
        <div className="w-full max-w-4xl h-[1px] bg-white/5 mb-8" />

        {/* copyright notes */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-4xl text-[10px] sm:text-xs text-slate-500 font-mono-tech select-none">
          <p>&copy; {new Date().getFullYear()} Harsh Mahesh Kshirsagar. All rights reserved.</p>
          <p className="hover:text-indigo-400 transition-colors">
            Built with React &bull; Tailwind CSS &bull; Framer Motion
          </p>
        </div>

      </div>
    </footer>
  );
}
