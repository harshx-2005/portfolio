import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTimes } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
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

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Monitor scroll for header background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active link highlighting
  useEffect(() => {
    const observers = NAV_LINKS.map(link => {
      const el = document.getElementById(link.id);
      if (!el) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(link.id);
        }
      }, {
        rootMargin: "-40% 0px -40% 0px" // Trigger when item is in middle 20% of screen
      });

      observer.observe(el);
      return { observer, el };
    }).filter(Boolean);

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#030014]/75 backdrop-blur-md border-b border-white/5 py-4 shadow-xl" 
            : "bg-transparent py-6 border-b border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Brand Name */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, "home")}
            className="flex items-center gap-2 select-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white font-mono-tech shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-transform duration-300">
              H
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
              Harsh<span className="text-indigo-400 font-medium">.Kshirsagar</span>
            </span>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 select-none ${
                      activeSection === link.id ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        layoutId="activeNavIndicator"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="w-[1px] h-5 bg-white/10" />

            {/* Social handles short icons */}
            <div className="flex items-center gap-4">
              <a 
                href={personalDetails.socials.github} 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-white hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href={personalDetails.socials.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-indigo-400 hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "contact")}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-transparent transition-all duration-300 shadow-md"
              >
                Hire Me
              </a>
            </div>
          </nav>

          {/* Hamburger trigger for small screens */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes className="w-6 h-6" /> : <HiMenuAlt3 className="w-7 h-7" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile navigation side menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#030014]/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Ambient visual overlay blobs inside mobile menu */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b08_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
            <div className="absolute top-1/4 left-10 w-64 h-64 glow-orb-primary rounded-full blur-[80px] opacity-30 pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-64 h-64 glow-orb-secondary rounded-full blur-[80px] opacity-30 pointer-events-none" />

            <nav className="flex flex-col gap-6 relative z-10">
              <motion.ul 
                className="flex flex-col gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
              >
                {NAV_LINKS.map((link) => (
                  <motion.li
                    key={link.id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={`block font-display font-bold text-2xl py-2 transition-colors ${
                        activeSection === link.id 
                          ? "text-gradient-purple" 
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* Mobile Footer Area */}
            <div className="flex flex-col gap-4 relative z-10 border-t border-white/5 pt-6">
              <div className="flex items-center gap-6">
                <a
                  href={personalDetails.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href={personalDetails.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
              <p className="text-xs text-slate-500 font-mono-tech select-none">
                {personalDetails.location} &bull; MERN + Django + AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
