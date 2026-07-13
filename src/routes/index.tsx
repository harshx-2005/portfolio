import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  Award,
  Briefcase,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  
  Phone,
  Rocket,
  Sparkles,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroPortrait from "@/assets/harsh-portrait.jpg";
import projectGraphene from "@/assets/project-graphene.png";
import projectHirepur from "@/assets/project-hirepur.png";
import projectLinkup from "@/assets/project-linkup.jpg";
import resumePdf from "@/assets/HarshResume.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: heroPortrait },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1280" },
      { property: "og:image:alt", content: "Portrait of Harsh Kshirsagar" },
      { name: "twitter:image", content: heroPortrait },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Harsh Mahesh Kshirsagar",
          jobTitle: "MERN / PERN Stack & AI Agent Developer",
          email: "mailto:theharshkshirsagar@gmail.com",
          telephone: "+91-7058412735",
          image: heroPortrait,
          url: "/",
          address: { "@type": "PostalAddress", addressLocality: "Akluj", addressRegion: "Solapur", addressCountry: "IN" },
          sameAs: [
            "https://github.com/harshx-2005",
            "https://www.linkedin.com/in/harshkshirsagar",
          ],
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

/* ============================================================================
 *  DATA
 * ========================================================================== */

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const STATS = [
  { value: "9.1", label: "Computer Science CGPA" },
  { value: "15+", label: "Technologies" },
  { value: "10+", label: "Projects" },
  { value: "5+", label: "Clients" },
];

const SKILLS: { category: string; icon: typeof Code2; items: string[] }[] = [
  {
    category: "Frontend",
    icon: Layers,
    items: ["Next.js", "React.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "React Three Fiber", "Responsive Design"],
  },
  {
    category: "Backend",
    icon: Cpu,
    items: ["Node.js", "Express.js", "PERN Stack", "REST APIs", "JWT", "Real-time APIs", "Cloudinary"],
  },
  {
    category: "Languages",
    icon: Code2,
    items: ["TypeScript", "JavaScript", "Python", "C", "C++", "Java"],
  },
  {
    category: "Database",
    icon: Database,
    items: ["MySQL", "MongoDB", "PostgreSQL", "Supabase", "Neon", "Firebase"],
  },
  {
    category: "AI & Automation",
    icon: Sparkles,
    items: ["Google Gemini AI", "OpenAI", "Claude", "Prompt Engineering", "AI Agents", "Voice Chat Agents", "n8n", "Voiceflow", "AI Automation"],
  },
  {
    category: "DevOps & Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "Vercel", "Render", "Railway", "Jira", "Linux", "Windows"],
  },
  {
    category: "Quality & SEO",
    icon: Award,
    items: ["Manual Testing", "Bug Tracking", "Technical SEO", "On-page SEO", "Performance Optimization"],
  },
  {
    category: "Frameworks",
    icon: Rocket,
    items: ["Django", "Express.js", "Next.js"],
  },
];

const PROJECTS = [
  {
    id: "graphene",
    featured: true,
    name: "Graphene Interiors Ltd",
    tagline: "Live production website for an international UK-based interior design studio.",
    description:
      "Engineered and deployed a live production website for an international UK-based interior design company. Architected localized SEO routing, developed an interactive Before/After comparison slider, integrated WhatsApp lead generation, and shipped a premium responsive production-ready UI.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: "July 2026",
    badges: ["Featured", "International Client", "Live", "Production"],
    image: projectGraphene,
    live: "https://www.grapheneinteriors.com/",
    repo: null,
    accent: "from-amber-400/30 via-primary/20 to-transparent",
  },
  {
    id: "hirepur",
    featured: false,
    name: "HirePur",
    tagline: "AI-powered recruitment platform with resume parsing & candidate matching.",
    description:
      "Resume parsing, AI candidate matching, real-time notifications, employer dashboard and a full job portal — powered by Gemini AI, Socket.IO and JWT auth.",
    tech: ["React", "Node.js", "Express", "MySQL", "Socket.IO", "Gemini AI", "Cloudinary", "JWT"],
    year: "2025",
    badges: ["AI", "Real-time"],
    image: projectHirepur,
    live: "https://hirepur.vercel.app/",
    repo: "https://github.com/harshx-2005/hirepur",
    accent: "from-primary/30 via-secondary/20 to-transparent",
  },
  {
    id: "linkup",
    featured: false,
    name: "LinkUp",
    tagline: "Real-time chat platform with audio, video calls & admin dashboard.",
    description:
      "Real-time chat, group chats, audio & video calls, admin dashboard and Cloudinary media pipeline over a Socket.IO backbone.",
    tech: ["React", "Node.js", "Express", "MySQL", "Socket.IO", "Cloudinary"],
    year: "2025",
    badges: ["Real-time", "WebRTC"],
    image: projectLinkup,
    live: "https://linkup-silk.vercel.app/login",
    repo: "https://github.com/harshx-2005/linkup",
    accent: "from-accent/30 via-primary/20 to-transparent",
  },
];

const EDUCATION = [
  { period: "Present", title: "B.Sc Computer Science", org: "Shriram Institute of Information Technology", detail: "CGPA 9.1 / 10" },
  { period: "HSC", title: "Higher Secondary Certificate", org: "Maharashtra State Board", detail: "50.17%" },
  { period: "SSC", title: "Secondary School Certificate", org: "Maharashtra State Board", detail: "82%" },
];

const EXPERIENCE = [
  {
    period: "Internship",
    role: "MERN Stack Developer & AI Automation Intern",
    company: "AutoFlow Technologies",
    bullets: [
      "Built production features on real-world APIs across the MERN stack.",
      "Integrated AI automation flows and AI agent prototypes for internal tooling.",
      "Owned end-to-end deployment and release management for production features.",
      "Shipped code through Git workflow, Agile process and Jira tracking.",
      "Owned manual testing, bug reproduction and regression cycles.",
    ],
  },
];

const CERTIFICATIONS = [
  { name: "MERN Stack Development & AI Integration", issuer: "AutoFlow Technologies", year: "2025" },
];

/* ============================================================================
 *  UTILITIES
 * ========================================================================== */

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

function useMediaHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return canHover;
}

/* ============================================================================
 *  PRIMITIVES
 * ========================================================================== */

function Preloader() {
  const [gone, setGone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setGone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pct = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: easeOut } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          style={{ perspective: 1200 }}
        >
          {/* aurora ambience */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
            <div className="aurora-blob left-[10%] top-[20%] h-[420px] w-[420px]" style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }} />
            <div className="aurora-blob right-[10%] bottom-[15%] h-[380px] w-[380px]" style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)", animationDelay: "-6s" }} />
          </div>
          <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            {/* 3D rotating cube monogram */}
            <div className="relative h-24 w-24" style={{ perspective: 800 }}>
              {/* orbit ring */}
              <motion.div
                className="absolute inset-[-14px] rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(99,102,241,0.6) 25%, transparent 50%, rgba(6,182,212,0.5) 75%, transparent 100%)",
                  WebkitMask: "radial-gradient(circle, transparent 58%, black 60%)",
                  mask: "radial-gradient(circle, transparent 58%, black 60%)",
                }}
              />
              <motion.div
                className="relative h-full w-full"
                animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {[
                  { t: "translateZ(48px)" },
                  { t: "rotateY(180deg) translateZ(48px)" },
                  { t: "rotateY(90deg) translateZ(48px)" },
                  { t: "rotateY(-90deg) translateZ(48px)" },
                  { t: "rotateX(90deg) translateZ(48px)" },
                  { t: "rotateX(-90deg) translateZ(48px)" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl border border-white/15 font-display text-3xl font-bold text-white"
                    style={{
                      transform: f.t,
                      background:
                        "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.35), rgba(6,182,212,0.35))",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 20px 40px -20px rgba(99,102,241,0.5)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    H
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="font-display text-sm font-semibold tracking-[0.2em] text-foreground/90">
                HARSH KSHIRSAGAR
              </div>
              <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: "var(--gradient-primary)", boxShadow: "0 0 12px rgba(99,102,241,0.6)" }}
                />
              </div>
              <div className="flex w-56 items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>Loading experience</span>
                <span>{pct.toString().padStart(3, "0")}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CustomCursor() {
  const canHover = useMediaHover();
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "hover" | "text">("default");
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [labelText, setLabelText] = useState("");

  useEffect(() => {
    if (!canHover) return;
    let raf = 0;
    let mx = 0, my = 0, ox = 0, oy = 0, ix = 0, iy = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; setHidden(false); };
    const loop = () => {
      ox += (mx - ox) * 0.18;
      oy += (my - oy) * 0.18;
      ix += (mx - ix) * 0.55;
      iy += (my - iy) * 0.55;
      if (outer.current) outer.current.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%)`;
      if (inner.current) inner.current.style.transform = `translate3d(${ix}px, ${iy}px, 0) translate(-50%, -50%)`;
      if (label.current) label.current.style.transform = `translate3d(${ox}px, ${oy + 28}px, 0) translate(-50%, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move);

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const hoverEl = t?.closest("a, button, [role='button'], [data-cursor='hover']") as HTMLElement | null;
      const textEl = t?.closest("input, textarea, [data-cursor='text']");
      if (hoverEl) {
        setVariant("hover");
        const l = hoverEl.getAttribute("data-cursor-label");
        setLabelText(l || "");
      } else if (textEl) {
        setVariant("text");
        setLabelText("");
      } else {
        setVariant("default");
        setLabelText("");
      }
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setHidden(true);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, [canHover]);

  if (!canHover) return null;

  const isHover = variant === "hover";
  const isText = variant === "text";
  const size = isHover ? 56 : 32;
  const height = isText ? 26 : size;
  const width = isText ? 3 : size;
  const scale = pressed ? 0.85 : 1;

  return (
    <>
      <div
        ref={outer}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] transition-[width,height,background-color,border-color,opacity,border-radius] duration-200 ease-out"
        style={{
          width: width * scale,
          height: height * scale,
          borderRadius: isText ? 2 : 999,
          border: isText ? "none" : `1.5px solid ${isHover ? "rgba(56,189,248,0.9)" : "rgba(255,255,255,0.55)"}`,
          background: isHover ? "rgba(56,189,248,0.15)" : isText ? "rgba(56,189,248,0.95)" : "transparent",
          opacity: hidden ? 0 : 1,
          boxShadow: isHover ? "0 0 24px rgba(56,189,248,0.35)" : "none",
        }}
      />
      <div
        ref={inner}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91] rounded-full transition-[width,height,opacity] duration-150"
        style={{
          width: isHover || isText ? 0 : 6,
          height: isHover || isText ? 0 : 6,
          background: "rgba(56,189,248,1)",
          boxShadow: "0 0 12px rgba(56,189,248,0.8)",
          opacity: hidden || isHover || isText ? 0 : 1,
        }}
      />
      {labelText ? (
        <div
          ref={label}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[92] whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur"
          style={{ opacity: hidden ? 0 : 1 }}
        >
          {labelText}
        </div>
      ) : null}
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, background: "var(--gradient-primary)", transformOrigin: "0% 50%" }}
      className="fixed left-0 top-0 z-[80] h-[2px] w-full"
    />
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 300);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="fixed inset-x-0 top-4 z-[70] flex justify-center px-4"
    >
      <nav
        className={`glass-strong flex w-full max-w-4xl items-center justify-between rounded-full px-4 py-2.5 transition-all sm:px-5 ${scrolled ? "shadow-elevated" : ""}`}
        style={scrolled ? { boxShadow: "var(--shadow-elevated)" } : undefined}
      >
        <a href="#top" className="group flex items-baseline gap-0.5" aria-label="Harsh Kshirsagar — home">
          <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">harsh</span>
          <span
            className="inline-block h-2 w-2 translate-y-[-1px] rounded-full transition-transform duration-300 group-hover:scale-125"
            style={{ background: "var(--gradient-primary)", boxShadow: "0 0 12px rgba(99,102,241,0.6)" }}
            aria-hidden
          />
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active === l.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary hidden text-xs sm:inline-flex">
            Let's talk <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="glass-strong absolute top-[70px] mx-4 w-[calc(100%-2rem)] max-w-4xl rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground/90 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
                Let's talk <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-blob left-[-10%] top-[-10%] h-[520px] w-[520px]" style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }} />
      <div className="aurora-blob right-[-10%] top-[20%] h-[420px] w-[420px]" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)", animationDelay: "-6s" }} />
      <div className="aurora-blob bottom-[-10%] left-[30%] h-[500px] w-[500px]" style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)", animationDelay: "-12s" }} />
    </div>
  );
}

/* ============================================================================
 *  SECTIONS
 * ========================================================================== */

const ROLES = ["MERN / PERN Stack Developer", "AI Agent Builder", "Next.js Specialist", "Voice Chat Integrator"];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useMediaHover();
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -14;
    const ry = (px - 0.5) * 14;
    setStyle({
      transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
      transition: "transform 0.12s ease-out",
    });
  };
  const onLeave = () =>
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
    });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface noise will-change-transform"
      style={{
        ...style,
        transformStyle: "preserve-3d",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      {children}
    </div>
  );
}

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1600);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI((v) => v + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const typed = useTypewriter(ROLES);

  return (
    <section id="top" ref={containerRef} className="relative isolate overflow-hidden pb-28 pt-32 sm:pt-40">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <AuroraBackground />

      <motion.div style={{ y, opacity }} className="container-page relative">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-subtle backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Available for opportunities · Remote / Relocate
            </motion.div>

            <motion.h1 variants={fadeUp} className="hero-heading text-foreground">
              Building{" "}
              <span className="relative inline-block">
                <span className="text-gradient-primary" style={{ backgroundSize: "200% 100%", animation: "hero-shimmer 6s linear infinite" }}>
                  intelligent
                </span>
              </span>
              <br />
               AI & Web Products,{" "}
              <em className="not-italic text-gradient">end-to-end.</em>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm <span className="text-foreground font-medium">Harsh Kshirsagar</span> — a full-stack developer
              shipping real-time, AI-powered products with Next.js, React, Node.js, MongoDB and the MERN/PERN stack. I also build
              AI agents and voice chat bots. Currently engineering production experiences for international clients.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 font-mono text-sm text-accent">
              <span className="text-muted-foreground">$ role &gt;</span> {typed}
              <span className="caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent align-middle" />
            </motion.div>

            {/* KPI pills */}
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: Rocket, label: "Shipped for international clients" },
                { icon: Sparkles, label: "AI Agents & Voice Chat" },
                { icon: Zap, label: "Real-time · MERN/PERN Stack" },
                { icon: Award, label: "9.1 CGPA" },
              ].map((k) => (
                <span key={k.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-subtle">
                  <k.icon className="h-3.5 w-3.5 text-accent" /> {k.label}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary">View Projects <ArrowRight className="h-4 w-4" /></a>
              <a href="#contact" className="btn-ghost">Contact Me</a>
              <a
                href={resumePdf}
                download="Harsh_Kshirsagar_Resume.pdf"
                className="btn-ghost"
                aria-label="Download resume"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Akluj, Solapur · India</span>
              <span className="hidden h-4 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-3">
                <a data-cursor="hover" href="https://github.com/harshx-2005" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-foreground"><Github className="h-4 w-4" /></a>
                <a data-cursor="hover" href="https://www.linkedin.com/in/harshkshirsagar" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
                <a data-cursor="hover" href="mailto:theharshkshirsagar@gmail.com" aria-label="Email" className="text-muted-foreground transition-colors hover:text-foreground"><Mail className="h-4 w-4" /></a>
                <a data-cursor="hover" href="https://wa.me/917058412735?text=Hi%20Harsh%2C%20I%20saw%20your%20portfolio" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-muted-foreground transition-colors hover:text-[#25D366]"><FaWhatsapp className="h-4 w-4" /></a>
              </div>
            </motion.div>
          </div>

          {/* Portrait card — 3D tilt + animated conic border */}
          <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-sm -mt-2 sm:max-w-md sm:-mt-4 lg:-mt-8" style={{ perspective: 1200 }}>
            <div className="absolute -inset-8 rounded-[2.5rem] opacity-70 blur-3xl" style={{ background: "var(--gradient-subtle)" }} aria-hidden />

            {/* Animated conic gradient ring */}
            <div className="relative rounded-[2.2rem] p-[1.5px]" aria-hidden>
              <div
                className="absolute inset-0 rounded-[2.2rem] opacity-90"
                style={{
                  background: "conic-gradient(from 0deg, #6366F1, #8B5CF6, #06B6D4, #6366F1)",
                  animation: "hero-spin 8s linear infinite",
                }}
              />
              <div className="relative rounded-[2.15rem] bg-background">
                <TiltCard>
                  <img
                    src={heroPortrait}
                    alt="Portrait of Harsh Kshirsagar, full-stack developer"
                    width={1024}
                    height={1280}
                    className="aspect-[4/5] w-full object-cover"
                    style={{ transform: "translateZ(40px)" }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-background/5 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                    }}
                  />
                </TiltCard>
              </div>
            </div>

            {/* floating chips — visible on mobile too */}
            <motion.div
              className="glass-strong absolute -left-3 top-6 rounded-2xl px-2.5 py-1.5 text-[11px] font-medium sm:-left-6 sm:top-8 sm:px-3 sm:py-2 sm:text-xs"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="mr-1.5 rounded-full bg-primary/25 px-1.5 py-0.5 text-[9px] font-mono text-white sm:mr-2 sm:px-2 sm:text-[10px]">JS</span>
              JavaScript
            </motion.div>
            <motion.div
              className="glass-strong absolute -right-2 top-1/3 rounded-2xl px-2.5 py-1.5 text-[11px] font-medium sm:-right-4 sm:px-3 sm:py-2 sm:text-xs"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="mr-1.5 rounded-full bg-accent/25 px-1.5 py-0.5 text-[9px] font-mono text-accent sm:mr-2 sm:px-2 sm:text-[10px]">AI</span>
              AI Agents
            </motion.div>
            <motion.div
              className="glass-strong absolute -left-2 bottom-8 rounded-2xl px-2.5 py-1.5 text-[11px] font-medium sm:-left-4 sm:px-3 sm:py-2 sm:text-xs"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <span className="mr-1.5 rounded-full bg-secondary/30 px-1.5 py-0.5 text-[9px] font-mono text-white sm:mr-2 sm:px-2 sm:text-[10px]">DB</span>
              PERN Stack
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          aria-label="Scroll to about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mx-auto mt-16 hidden w-fit flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.03]"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}

const MARQUEE = [
  "Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "MySQL",
  "PostgreSQL", "PERN Stack", "Supabase", "Neon", "Firebase", "Real-time APIs", "Tailwind", "Framer Motion", "Gemini AI", "OpenAI",
  "AI Agents", "Voice Chat", "Django", "Jira",
];

function TechMarquee() {
  return (
    <section aria-label="Technologies" className="relative border-y border-white/5 bg-surface/40 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <div className="marquee-track gap-10">
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span key={i} className="whitespace-nowrap font-display text-xl font-medium text-muted-foreground sm:text-2xl">
            {item}
            <span className="mx-6 text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description?: string }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-14 max-w-3xl"
    >
      <motion.div variants={fadeUp} className="eyebrow"><span className="h-px w-8 bg-current opacity-40" />{eyebrow}</motion.div>
      <motion.h2 variants={fadeUp} className="section-heading mt-4 text-foreground">{title}</motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="mt-5 text-base text-muted-foreground sm:text-lg">{description}</motion.p>
      )}
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeader
          eyebrow="About"
          title={<>Engineer, product-thinker, <span className="text-gradient-primary">builder</span>.</>}
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="surface-card p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-subtle">
              Results-driven MERN / PERN stack developer with hands-on experience building real-time, AI-powered web
              applications and AI agents. Skilled across <span className="text-foreground font-medium">React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MySQL, MongoDB, Supabase, Neon, Firebase, SEO, AI tools, Jira,
              manual testing, and workflow automation.</span>
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              I care about scalable architecture, intelligent product surfaces, and continuously improving user
              experience, product quality and business outcomes — from a first prototype to a production deployment
              trusted by international clients.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
                  <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 content-start">
            {[
              { icon: Rocket, title: "Production-shipped", copy: "Live projects serving real international users, not just demos." },
              { icon: Sparkles, title: "AI-native workflow", copy: "Gemini, OpenAI and Claude wired into real product surfaces." },
              { icon: Award, title: "Quality obsessed", copy: "Manual testing, Jira, Agile — I own bugs I introduce." },
            ].map((c) => (
              <div key={c.title} className="glass rounded-2xl p-5 glow-hover">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-accent">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display font-semibold">{c.title}</div>
                    <div className="text-sm text-muted-foreground">{c.copy}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [active, setActive] = useState<string>("All");
  const categories = ["All", ...SKILLS.map((s) => s.category)];
  const visible = useMemo(() => (active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active)), [active]);

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeader
          eyebrow="Skills"
          title={<>A stack built for <span className="text-gradient-primary">shipping</span>.</>}
          description="From TypeScript-first frontends to real-time backends and AI-augmented workflows — organized so you can scan by category."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                active === c
                  ? "border-transparent text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.6)]"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground"
              }`}
              style={active === c ? { background: "var(--gradient-primary)" } : undefined}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => (
              <motion.div
                layout
                key={cat.category}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 12, transition: { duration: 0.25 } }}
                className="surface-card group relative overflow-hidden p-6 glow-hover"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70" style={{ background: "var(--gradient-primary)" }} />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-accent">
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {cat.items.length} skills
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">{cat.category}</h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cat.items.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-subtle">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeader
          eyebrow="Experience"
          title={<>Where I've <span className="text-gradient-primary">shipped code.</span></>}
        />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid gap-6">
          {EXPERIENCE.map((e) => (
            <motion.article
              key={e.company}
              variants={fadeUp}
              className="surface-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[220px_1fr] glow-hover"
            >
              <div>
                <div className="eyebrow"><Briefcase className="h-3.5 w-3.5" /> {e.period}</div>
                <div className="mt-3 font-display text-xl font-semibold">{e.company}</div>
                <div className="text-sm text-muted-foreground">{e.role}</div>
              </div>
              <ul className="grid gap-3">
                {e.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-subtle">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectFeatured({ p }: { p: typeof PROJECTS[number] }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="surface-card group relative overflow-hidden p-4 sm:p-6"
    >
      <div className={`pointer-events-none absolute -inset-20 opacity-40 blur-3xl bg-gradient-to-br ${p.accent}`} />
      <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <img
            src={p.image}
            alt={`${p.name} — project screenshot`}
            width={1600}
            height={1000}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-transparent" />
        </div>
        <div className="p-2 sm:p-4">
          <div className="flex flex-wrap items-center gap-2">
            {p.badges.map((b) => (
              <span key={b} className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary-foreground">
                {b}
              </span>
            ))}
          </div>
          <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{p.name}</h3>
          <div className="mt-1 text-xs text-muted-foreground font-mono">{p.year}</div>
          <p className="mt-4 text-base text-subtle">{p.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-subtle">{t}</span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary text-xs">Live site <ExternalLink className="h-3.5 w-3.5" /></a>}
            {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="btn-ghost text-xs">GitHub <Github className="h-3.5 w-3.5" /></a>}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ p }: { p: typeof PROJECTS[number] }) {
  return (
    <motion.article variants={fadeUp} className="surface-card group relative overflow-hidden glow-hover">
      <div className="relative overflow-hidden">
        <img
          src={p.image}
          alt={`${p.name} — project screenshot`}
          width={1600}
          height={1000}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-90" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {p.badges.map((b) => (
            <span key={b} className="glass rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/90">{b}</span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-semibold">{p.name}</h3>
          <span className="font-mono text-[10px] text-muted-foreground">{p.year}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.slice(0, 5).map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-subtle">{t}</span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn-ghost text-xs">Live <ExternalLink className="h-3.5 w-3.5" /></a>}
          {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="btn-ghost text-xs">Code <Github className="h-3.5 w-3.5" /></a>}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const featured = PROJECTS.find((p) => p.featured)!;
  const others = PROJECTS.filter((p) => !p.featured);
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeader
          eyebrow="Selected work"
          title={<>Projects that are <span className="text-gradient-primary">live and loved.</span></>}
          description="Case-studies of real production work — from an international interior design brand to AI-powered internal tools."
        />
        <div className="mb-8">
          <ProjectFeatured p={featured} />
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-6 md:grid-cols-2">
          {others.map((p) => <ProjectCard key={p.id} p={p} />)}
        </motion.div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="relative py-28 sm:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeader
            eyebrow="Education"
            title={<>Foundations, <span className="text-gradient-primary">not shortcuts.</span></>}
          />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="relative border-l border-white/10 pl-8">
            {EDUCATION.map((e) => (
              <motion.div key={e.title} variants={fadeUp} className="relative mb-8 last:mb-0">
                <span className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-surface">
                  <GraduationCap className="h-3 w-3 text-accent" />
                </span>
                <div className="eyebrow">{e.period}</div>
                <div className="mt-2 font-display text-lg font-semibold">{e.title}</div>
                <div className="text-sm text-muted-foreground">{e.org}</div>
                <div className="mt-1 text-sm text-accent font-mono">{e.detail}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Certifications"
            title={<>Certified & <span className="text-gradient-primary">continuously learning.</span></>}
          />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-4">
            {CERTIFICATIONS.map((c) => (
              <motion.div key={c.name} variants={fadeUp} className="surface-card group flex items-start gap-4 p-6 glow-hover">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-accent">
                  <Award className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-display text-base font-semibold">{c.name}</div>
                  <div className="text-sm text-muted-foreground">{c.issuer} · {c.year}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c654bbf6-3b1d-4ced-905d-f93318679415",
          name,
          email,
          message,
          subject: `New Portfolio Message from ${name}`,
        }),
      });

      const res = await response.json();
      if (res.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {[
        { name: "name", label: "Your name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
      ].map((f) => (
        <label key={f.name} className="group relative block">
          <input
            required={f.required}
            name={f.name}
            type={f.type}
            placeholder=" "
            className="peer w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pb-2.5 pt-5 text-sm text-foreground outline-none transition-all placeholder:text-transparent focus:border-primary/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/15"
          />
          <span className="pointer-events-none absolute left-4 top-3.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent">
            {f.label}
          </span>
        </label>
      ))}
      <label className="group relative block">
        <textarea
          required
          name="message"
          rows={5}
          placeholder=" "
          className="peer w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 pb-2.5 pt-6 text-sm text-foreground outline-none transition-all placeholder:text-transparent focus:border-primary/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/15"
        />
        <span className="pointer-events-none absolute left-4 top-3.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent">
          Tell me about the project
        </span>
      </label>
      <button type="submit" className="btn-primary self-start" disabled={status === "sending"}>
        {status === "sent" 
          ? "Message sent!" 
          : status === "sending" 
            ? "Sending..." 
            : status === "error" 
              ? "Error - try again" 
              : "Send message"}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="container-page">
        <div className="surface-card relative overflow-hidden px-4 py-6 sm:p-12 lg:p-16">
          <AuroraBackground />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="eyebrow"><span className="h-px w-8 bg-current opacity-40" />Contact</div>
              <h2 className="section-heading mt-4 text-foreground">
                Let's build something{" "}
                <span className="text-gradient-primary">worth shipping.</span>
              </h2>
              <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                Whether it's a production website, an AI agent, a voice chat bot or a real-time product —
                I'm currently taking on a small number of new engagements.
              </p>

              <div className="mt-8 grid gap-3">
                <a href="mailto:theharshkshirsagar@gmail.com" className="glass flex items-center gap-4 rounded-2xl p-4 glow-hover">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-accent"><Mail className="h-5 w-5" /></div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="truncate font-medium">theharshkshirsagar@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+917058412735" className="glass flex items-center gap-4 rounded-2xl p-4 glow-hover">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-accent"><Phone className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-medium">+91 70584 12735</div>
                  </div>
                </a>
                <a href="https://wa.me/917058412735?text=Hi%20Harsh%2C%20I%20saw%20your%20portfolio" target="_blank" rel="noreferrer" className="glass flex items-center gap-4 rounded-2xl p-4 glow-hover">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366]"><FaWhatsapp className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs text-muted-foreground">WhatsApp</div>
                    <div className="font-medium">Chat on WhatsApp</div>
                  </div>
                </a>
                <div className="glass flex items-center gap-4 rounded-2xl p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-accent"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs text-muted-foreground">Based in</div>
                    <div className="font-medium">Akluj, Solapur · India · Available worldwide</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-3xl p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-surface/30">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" aria-hidden />

      <div className="container-page relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center" aria-hidden>
                <span
                  className="absolute inset-0 rounded-full border border-white/10"
                  style={{ animation: "hero-spin 8s linear infinite" }}
                />
                <span
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{
                    top: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--gradient-primary)",
                    boxShadow: "0 0 10px rgba(6,182,212,0.8)",
                    transformOrigin: "50% 22px",
                    animation: "hero-spin 4s linear infinite",
                  }}
                />
                <span className="font-display text-lg font-bold text-foreground">H</span>
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">Harsh Kshirsagar</p>
                <p className="text-xs text-muted-foreground">MERN / PERN + AI Agents</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building intelligent, real-time web products that help teams move faster and users smile more.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Navigate</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:theharshkshirsagar@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <Mail className="h-4 w-4 text-accent" /> theharshkshirsagar@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917058412735" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <Phone className="h-4 w-4 text-accent" /> +91 70584 12735
                </a>
              </li>
              <li>
                <a href="https://wa.me/917058412735?text=Hi%20Harsh%2C%20I%20saw%20your%20portfolio" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <FaWhatsapp className="h-4 w-4 text-[#25D366]" /> WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" /> Akluj, Solapur, India
              </li>
            </ul>
          </div>

          {/* Connect + back to top */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Connect</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/harshx-2005" target="_blank" rel="noreferrer" aria-label="GitHub" className="btn-social">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/harshkshirsagar" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn-social">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://wa.me/917058412735?text=Hi%20Harsh%2C%20I%20saw%20your%20portfolio" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="btn-social">
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a href="mailto:theharshkshirsagar@gmail.com" aria-label="Email" className="btn-social">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="btn-ghost mt-2 w-full text-xs"
              aria-label="Back to top"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">© {currentYear} Harsh Kshirsagar. All rights reserved.</p>
          <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-success" style={{ boxShadow: "0 0 10px var(--success)" }} />
            Available for freelance & full-time roles
          </p>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3, ease: easeOut }}
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-[60] grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-foreground shadow-elevated backdrop-blur-xl transition-colors hover:bg-white/15 hover:text-accent focus:outline-none focus:ring-2 focus:ring-primary/50 sm:bottom-8 sm:right-8"
      style={{ boxShadow: "var(--shadow-elevated)" }}
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}

/* ============================================================================
 *  PAGE
 * ========================================================================== */

function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
