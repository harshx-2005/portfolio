import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { BiBriefcase, BiDownload } from 'react-icons/bi';
import { personalDetails } from '../constants/portfolioData';
import TypingEffect from '../components/TypingEffect';
import TechMarquee from '../components/TechMarquee';

export default function Hero() {
  const handleScrollTo = (id) => {
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
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-24 overflow-hidden bg-[#030014]">
      {/* Background Ambient Orbs */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] glow-orb-primary rounded-full blur-[120px] pointer-events-none opacity-40 animate-pulse-slow" />
      <div className="absolute top-[30%] right-[5%] w-[450px] h-[450px] glow-orb-secondary rounded-full blur-[120px] pointer-events-none opacity-40 animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-1/3 w-[350px] h-[350px] glow-orb-pink rounded-full blur-[100px] pointer-events-none opacity-20 animate-pulse-slow" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col lg:flex-row items-center justify-center gap-12 py-12 relative z-10">
        
        {/* Left Side Content Column */}
        <motion.div 
          className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start select-none"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Cyber Terminal Banner Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-6 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="font-mono-tech text-[10px] font-semibold text-indigo-300 uppercase tracking-widest">
              SYSTEM ONLINE // HARSH.OS v3.5
            </span>
          </div>

          {/* Large Main Heading */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mb-4 leading-tight">
            Hi, I'm <br className="sm:hidden" />
            <span className="text-gradient-purple font-black filter drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              {personalDetails.name}
            </span>
          </h1>

          {/* Typing Roles Container */}
          <div className="h-10 sm:h-12 flex items-center mb-6">
            <span className="font-display font-medium text-lg sm:text-xl md:text-2xl text-slate-300 mr-2.5">
              I am a
            </span>
            <div className="text-lg sm:text-xl md:text-2xl">
              <TypingEffect words={personalDetails.roles} />
            </div>
          </div>

          {/* Tagline Narrative */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
            {personalDetails.tagline} {personalDetails.shortIntro}
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
            <button
              onClick={() => handleScrollTo("projects")}
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <BiBriefcase className="w-5 h-5" />
              View Projects
            </button>
            
            <button
              onClick={() => handleScrollTo("resume")}
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-white/[0.03] border border-white/10 text-white cursor-pointer hover:bg-white/[0.08] hover:border-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <BiDownload className="w-5 h-5 text-indigo-400" />
              Get Resume
            </button>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-6">
            <a 
              href={personalDetails.socials.github} 
              target="_blank" 
              rel="noreferrer" 
              className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:scale-108 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a 
              href={personalDetails.socials.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/20 hover:scale-108 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a 
              href={personalDetails.socials.twitter} 
              target="_blank" 
              rel="noreferrer" 
              className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/20 hover:scale-108 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300"
              aria-label="Twitter/X"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a 
              href={`mailto:${personalDetails.socials.email}`}
              className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/20 hover:scale-108 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all duration-300"
              aria-label="Email Harsh Mahesh Kshirsagar"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Right Side Mockup Graphic Column */}
        <motion.div 
          className="flex-1 relative w-full max-w-[450px] lg:max-w-none flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Glassmorphic Cyber Frame Container */}
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl glass-card border border-white/[0.07] p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Ambient inner card glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none" />

            {/* Simulated macOS Header Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-amber-500/50" />
                <span className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="font-mono-tech text-[10px] text-slate-500 uppercase tracking-widest">
                harsh_terminal.sh
              </span>
              <div className="w-5 h-5" /> {/* spacer */}
            </div>

            {/* Coding mock terminal lines */}
            <div className="flex-grow font-mono-tech text-left text-xs sm:text-sm text-slate-300 space-y-3.5 select-none">
              <p className="text-purple-400 font-medium">
                <span className="text-slate-500 mr-2">1</span>
                const developer = &#123;
              </p>
              <p className="pl-4 text-slate-300">
                <span className="text-slate-500 mr-2">2</span>
                name: <span className="text-emerald-400">"{personalDetails.name}"</span>,
              </p>
              <p className="pl-4 text-indigo-400">
                <span className="text-slate-500 mr-2">3</span>
                focus: [
                <span className="text-slate-300">"Scalability"</span>, 
                <span className="text-slate-300">"AI"</span>, 
                <span className="text-slate-300">"Testing"</span>
                ],
              </p>
              <p className="pl-4 text-amber-400">
                <span className="text-slate-500 mr-2">4</span>
                systems: <span className="text-slate-300">[</span>
                <span className="text-pink-400">"Django"</span>, 
                <span className="text-pink-400">"MERN"</span>
                <span className="text-slate-300">]</span>,
              </p>
              <p className="pl-4 text-sky-400">
                <span className="text-slate-500 mr-2">5</span>
                location: <span className="text-emerald-400">"India 🇮🇳"</span>
              </p>
              <p className="text-purple-400 font-medium">
                <span className="text-slate-500 mr-2">6</span>
                &#125;;
              </p>
              <p className="text-indigo-400 animate-pulse font-bold mt-2">
                <span className="text-slate-500 mr-2">7</span>
                &gt; harsh.compile() _
              </p>
            </div>

            {/* Custom Designed Developer Avatar Avatar Box */}
            <div className="relative mt-6 flex justify-end">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                HK
                <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-[#090915] flex items-center justify-center animate-pulse" />
              </div>
            </div>
          </div>

          {/* Floating independent technology nodes */}
          <motion.div 
            className="absolute -top-6 -left-6 px-4 py-2.5 rounded-2xl tech-badge text-xs font-mono-tech font-bold flex items-center gap-2 select-none pointer-events-none animate-float-slow"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#61dafb] filter drop-shadow-[0_0_4px_#61dafb]" />
            React
          </motion.div>

          <motion.div 
            className="absolute top-1/2 -right-8 px-4 py-2.5 rounded-2xl tech-badge text-xs font-mono-tech font-bold flex items-center gap-2 select-none pointer-events-none animate-float-medium"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#092e20] filter drop-shadow-[0_0_4px_#092e20]" />
            Django
          </motion.div>

          <motion.div 
            className="absolute -bottom-4 -left-2 px-4 py-2.5 rounded-2xl tech-badge text-xs font-mono-tech font-bold flex items-center gap-2 select-none pointer-events-none animate-float-fast"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#339933] filter drop-shadow-[0_0_4px_#339933]" />
            Node.js
          </motion.div>

          <motion.div 
            className="absolute -bottom-8 right-16 px-4 py-2.5 rounded-2xl tech-badge text-xs font-mono-tech font-bold flex items-center gap-2 select-none pointer-events-none animate-float-slow"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] filter drop-shadow-[0_0_4px_#10b981]" />
            QA / Test
          </motion.div>
        </motion.div>
      </div>

      {/* Down arrow anchor */}
      <div className="flex justify-center mb-8 relative z-10">
        <button
          onClick={() => handleScrollTo("about")}
          className="text-slate-400 hover:text-indigo-400 cursor-pointer animate-bounce hover:scale-110 transition-all"
          aria-label="Scroll to About Section"
        >
          <FaChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Infinite scrolling Marquee at the very bottom */}
      <TechMarquee />
    </section>
  );
}
