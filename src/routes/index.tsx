import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import portrait from "@/assets/harsh-portrait.jpg";
import shotGraphene from "@/assets/project-graphene.png";
import shotHirepur from "@/assets/project-hirepur.png";
import shotLinkup from "@/assets/project-linkup.jpg";
import resumePdf from "@/assets/HarshResume.pdf";
import pageCss from "../editorial.css?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: portrait },
      { property: "og:image:alt", content: "Portrait of Harsh Kshirsagar" },
      { name: "twitter:image", content: portrait },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "stylesheet", href: pageCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Harsh Mahesh Kshirsagar",
          jobTitle: "Full Stack Developer",
          email: "mailto:" + EMAIL,
          image: portrait,
          url: "/",
          address: { "@type": "PostalAddress", addressLocality: "Akluj", addressRegion: "Maharashtra", addressCountry: "IN" },
          sameAs: [GITHUB, LINKEDIN],
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

/* ---------------------------------------------------------------- data -- */

const EMAIL = "theharshkshirsagar@gmail.com";
const GITHUB = "https://github.com/harshx-2005";
const LINKEDIN = "https://www.linkedin.com/in/harsh-kshirsagar-975699338";
const WHATSAPP = "https://wa.me/917058412735";

const PROJECTS = [
  {
    id: "graphene",
    name: "Graphene Interiors",
    kind: "Client website",
    year: "2026",
    client: "Graphene Interiors Ltd, Leicester (UK)",
    role: "Freelance: design, build, deploy",
    stack: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion",
    image: shotGraphene,
    live: "https://www.grapheneinteriors.com/",
    repo: "https://github.com/harshx-2005/graphene-interiors-live",
    kicker: "A joinery brand from Leicester goes live",
    lede: "Graphene build kitchens, wardrobes and media walls across the Midlands. They needed a site that turns local searches into quote requests, and I built and shipped it on my own for a client in another country.",
    notes: [
      "Location pages with their own routes, so each Midlands town can rank on its own.",
      "A drag-to-compare before/after slider, because the transformation is the product.",
      "Quote forms that send each lead straight to the owner on WhatsApp.",
    ],
    quote: "The work is timber and stone, so the website gets out of its way.",
  },
  {
    id: "hirepur",
    name: "HirePur",
    kind: "Recruitment platform",
    year: "2025",
    client: "Side project",
    role: "Full stack",
    stack: "React, Node.js, Express, MySQL, Socket.IO, Gemini AI, Cloudinary",
    image: shotHirepur,
    live: "https://hirepur.vercel.app/",
    repo: "https://github.com/harshx-2005/hirepur",
    kicker: "Hiring, with the paperwork read for you",
    lede: "A job platform with separate sides for employers and job seekers. Gemini reads uploaded resumes and matches candidates to open roles, so nobody has to fill in the same details twice.",
    notes: [
      "Role-based JWT auth with OTP email verification for both sides.",
      "Gemini AI resume parsing and candidate-to-job matching.",
      "Real-time Socket.IO notifications plus automated email alerts.",
    ],
    quote: "Upload a CV once, and the platform does the matching.",
  },
  {
    id: "linkup",
    name: "LinkUp",
    kind: "Real-time chat",
    year: "2025",
    client: "Side project",
    role: "Full stack",
    stack: "MongoDB, Express, React, Node.js, Socket.IO, Tailwind CSS, Cloudinary",
    image: shotLinkup,
    live: "https://linkup-silk.vercel.app/",
    repo: "https://github.com/harshx-2005/linkup",
    kicker: "Messages, files and calls in one window",
    lede: "A messaging app with private and group chats, file sharing, and audio and video calls, all running over one Socket.IO connection. Admins get a dashboard to moderate content.",
    notes: [
      "Private and group chats with file sharing through Cloudinary.",
      "Audio and video calling built on top of Socket.IO signalling.",
      "An admin dashboard for moderation and content management.",
    ],
    quote: "One socket carries the chat, the files and the call.",
  },
];

const EXPERIENCE = [
  { when: "Jul 2026 — now", role: "Full Stack Developer Intern", org: "WhatBytes", what: "Next.js and Django REST features with LLM integrations, deployed on AWS (Amplify, EC2, RDS, S3, CloudFront)." },
  { when: "Nov 2025 — Jan 2026", role: "MERN Stack & AI Automation Intern", org: "AutoFlow Technologies, Pune", what: "Production MERN features, AI-driven workflows and real-time modules in an agile team on Jira." },
];

const EDUCATION = [
  { when: "2026 — now", role: "Master of Computer Applications", org: "Uttaranchal University (online)" },
  { when: "2023 — 2026", role: "B.Sc. Computer Science, CGPA 9.1", org: "Shriram Institute of Information Technology, Paniv" },
];

const TOOLKIT = [
  ["Front", "Next.js, React, TypeScript, Tailwind CSS, Framer Motion"],
  ["Back", "Node.js, Express, Django REST, Socket.IO, JWT"],
  ["Data", "PostgreSQL, MySQL, MongoDB"],
  ["Cloud", "AWS (EC2, RDS, S3, CloudFront, Amplify), Vercel, Render"],
  ["AI", "Gemini and other LLM APIs inside real products"],
];

const ABOUT =
  "I'm Harsh, a full-stack developer from Akluj, Maharashtra. I take a website from the first sketch to the server it runs on, and I care most about the parts people actually touch: how it loads, how it moves, and whether it gets the client a phone call.";

/* --------------------------------------------------------------- hooks -- */

const ease = [0.16, 1, 0.3, 1] as const;
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(matchMedia("(hover: hover) and (pointer: fine)").matches), []);
  return fine;
}

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* --------------------------------------------------------------- icons -- */

const ROT = { right: 0, "up-right": -45, down: 90, up: -90 } as const;

/** One drawn arrow, rotated per direction: thin stroke, square ends, sharp corner. */
function Arrow({ dir = "right", className }: { dir?: keyof typeof ROT; className?: string }) {
  return (
    <svg className={"ed-ico " + (className ?? "")} viewBox="0 0 24 24" aria-hidden style={{ transform: `rotate(${ROT[dir]}deg)` }}>
      <path d="M3.5 12H20M13.5 5.5 20 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/** Six-spoke asterisk separator (the text asterisk glyph renders as an emoji on phones). */
function Star() {
  return (
    <svg className="ed-star" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="butt" />
    </svg>
  );
}

/* ---------------------------------------------------------- primitives -- */

function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 1 : 1100;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else { setGone(true); onDone(); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return (
    <motion.div
      className="ed-loader"
      initial={false}
      animate={gone ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
      aria-hidden
    >
      <span className="ed-mono">Harsh Kshirsagar — Portfolio</span>
      <span className="ed-loader-n">{String(n).padStart(3, "0")}</span>
      <span className="ed-mono">Issue Nº 01 · 2026</span>
    </motion.div>
  );
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [label, setLabel] = useState("");
  const [big, setBig] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let px = -100, py = -100;
    // re-read what's under the pointer; scrolling moves content under a still mouse without any pointermove
    const sync = () => {
      const hit = document.elementFromPoint(px, py);
      const el = hit?.closest<HTMLElement>("a, button, [data-cursor]");
      setBig(!!el);
      setLabel(el?.dataset.cursor ?? "");
      // black areas: contact, footer, and index rows (they fill black on hover)
      setDark(!!hit?.closest(".ed-contact, .ed-foot, .ed-index a"));
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      x.set(px);
      y.set(py);
      sync();
    };
    const leave = (e: PointerEvent) => {
      if (!e.relatedTarget) { px = py = -100; x.set(-100); y.set(-100); setBig(false); setLabel(""); }
    };
    addEventListener("pointermove", move);
    addEventListener("scroll", sync, { passive: true });
    document.addEventListener("pointerout", leave);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("scroll", sync);
      document.removeEventListener("pointerout", leave);
    };
  }, [x, y]);
  return (
    <motion.div className={"ed-cursor" + (big ? " is-big" : "") + (label ? " has-label" : "") + (dark ? " on-dark" : "")} style={{ x, y }} aria-hidden>
      <span>{label}</span>
    </motion.div>
  );
}

/** Nav link whose text rolls up to a copy of itself on hover. */
function Roll({ href, children, ...rest }: { href: string; children: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className="ed-roll" {...rest}>
      <span data-text={children}>{children}</span>
    </a>
  );
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Each line slides up from behind a mask: when `start` turns true, or when scrolled into view if `start` is omitted. */
function MaskLines({ lines, className, start, delay = 0 }: { lines: ReactNode[]; className?: string; start?: boolean; delay?: number }) {
  return (
    // the in-view trigger sits on the wrapper: the lines themselves start clipped, so they never "intersect"
    <motion.span
      className={"ed-lines " + (className ?? "")}
      initial="hidden"
      animate={start ? "show" : undefined}
      whileInView={start === undefined ? "show" : undefined}
      viewport={{ once: true }}
    >
      {lines.map((l, i) => (
        <span key={i} className="ed-mask">
          <motion.span
            variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ---------------------------------------------------------------- hero -- */

function HeroLetter({ ch, i, progress, start }: { ch: string; i: number; progress: MotionValue<number>; start: boolean }) {
  // letters drift apart at different speeds as the hero scrolls away
  const speeds = [-60, 40, -110, 70, -30];
  const y = useTransform(progress, [0, 1], [0, speeds[i % speeds.length] * 3]);
  const r = useTransform(progress, [0, 1], [0, (i % 2 ? 1 : -1) * 6]);
  return (
    <span className="ed-mask ed-hero-l">
      <motion.span
        style={{ y, rotate: r, display: "inline-block" }}
        initial={{ y: "105%" }}
        animate={start ? { y: 0 } : undefined}
        transition={{ duration: 1.2, ease, delay: 0.05 * i }}
      >
        {ch}
      </motion.span>
    </span>
  );
}

function Hero({ start }: { start: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  // fit "HARSH" to the full content width
  useIsoLayoutEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const w = el.scrollWidth;
      const avail = el.parentElement!.clientWidth;
      el.style.fontSize = (100 * avail) / w + "px";
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement!);
    return () => ro.disconnect();
  }, []);

  return (
    <section ref={ref} className="ed-hero" id="top">
      <div className="ed-hero-meta ed-mono">
        <MaskLines start={start} delay={0.5} lines={["Full-stack developer", "Next.js · React · Node · Django"]} />
        <MaskLines start={start} delay={0.6} lines={["Based in Akluj, India", "Working worldwide"]} />
        <MaskLines start={start} delay={0.7} lines={[<><i className="ed-dot" /> Available for projects</>, "Freelance & white-label"]} />
      </div>
      <h1 ref={nameRef} className="ed-hero-name" aria-label="Harsh Kshirsagar">
        {"HARSH".split("").map((c, i) => (
          <HeroLetter key={i} ch={c} i={i} progress={scrollYProgress} start={start} />
        ))}
      </h1>
      <div className="ed-hero-row">
        <motion.figure
          className="ed-portrait"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={start ? { clipPath: "inset(0% 0 0 0)" } : undefined}
          transition={{ duration: 1.3, ease, delay: 0.35 }}
          data-cursor="Hi"
        >
          <motion.img src={portrait} alt="Harsh Kshirsagar" style={{ y: portraitY }} />
        </motion.figure>
        <div className="ed-hero-sub">
          <MaskLines start={start} delay={0.25} className="ed-serif ed-hero-surname" lines={["Kshirsagar"]} />
          <Reveal delay={0.9} className="ed-hero-lede">
            <p>
              I design and build websites that are <em>made for one business</em>, not picked from a template. Code,
              motion and the server it runs on, all by hand.
            </p>
            <a href="#index" className="ed-scroll ed-mono">Scroll to the work <Arrow dir="down" /></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ marquee -- */

function VelocityMarquee({ children, base = 40 }: { children: ReactNode; base?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const skew = useTransform(vel, [-2500, 0, 2500], [8, 0, -8], { clamp: true });
  const dir = useRef(-1);
  const trackRef = useRef<HTMLDivElement>(null);
  useAnimationFrame((_, delta) => {
    if (reduce || !trackRef.current) return;
    const v = vel.get();
    if (v < 0) dir.current = 1;
    else if (v > 0) dir.current = -1;
    const half = trackRef.current.scrollWidth / 2;
    let next = x.get() + dir.current * (base + Math.abs(v) / 12) * (delta / 1000);
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    x.set(next);
  });
  return (
    <div className="ed-marquee" aria-hidden>
      <motion.div ref={trackRef} className="ed-marquee-track" style={{ x, skewX: skew }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------------------- index -- */

function WorkIndex() {
  const fine = useFinePointer();
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 160, damping: 20, mass: 0.6 });
  const rot = useTransform(useVelocity(sx), [-1500, 1500], [-10, 10], { clamp: true });

  return (
    <section className="ed-section" id="index" onPointerMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }}>
      <header className="ed-head">
        <span className="ed-mono">Contents</span>
        <h2>Selected <em className="ed-serif">work</em></h2>
        <span className="ed-mono">2025 — 2026</span>
      </header>
      <ol className="ed-index" onPointerLeave={() => setHover(null)}>
        {PROJECTS.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: i * 0.08 }}
          >
            <a href={`#${p.id}`} onPointerEnter={() => setHover(i)} data-cursor="Read">
              <span className="ed-mono">0{i + 1}</span>
              <span className="ed-index-name">{p.name}</span>
              <span className="ed-mono ed-index-kind">{p.kind}</span>
              <span className="ed-mono">{p.year}</span>
              <Arrow dir="right" className="ed-index-arrow" />
            </a>
          </motion.li>
        ))}
      </ol>
      {fine && (
        <motion.div className="ed-peek" style={{ x: sx, y: sy, rotate: rot }} aria-hidden>
          {PROJECTS.map((p, i) => (
            <motion.img
              key={p.id}
              src={p.image}
              alt=""
              initial={false}
              animate={{ clipPath: hover === i ? "inset(0% 0% 0% 0%)" : "inset(50% 50% 50% 50%)", scale: hover === i ? 1 : 1.3 }}
              transition={{ duration: 0.6, ease }}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------ features -- */

function Shot({ src, alt, href }: { src: string; alt: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v * 1.4}% ${v}% ${v * 1.4}%)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  return (
    <motion.a ref={ref} href={href} target="_blank" rel="noopener" className="ed-shot" style={{ clipPath }} data-cursor="Visit">
      <motion.img src={src} alt={alt} style={{ scale }} loading="lazy" />
    </motion.a>
  );
}

function Feature({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  return (
    <article className={"ed-feature" + (i % 2 ? " is-flip" : "")} id={p.id}>
      <header className="ed-feature-top">
        <span className="ed-mono">Feature 0{i + 1}</span>
        <span className="ed-mono">{p.kind} · {p.year}</span>
      </header>
      <h3 className="ed-feature-title">
        <MaskLines lines={[p.name]} />
      </h3>
      <Reveal><p className="ed-serif ed-feature-kicker">{p.kicker}</p></Reveal>

      <div className="ed-feature-media">
        <Shot src={p.image} alt={`${p.name} website`} href={p.live} />
      </div>

      <div className="ed-feature-body">
        <Reveal className="ed-feature-lede"><p className="ed-dropcap">{p.lede}</p></Reveal>
        <Reveal delay={0.1}>
          <ol className="ed-notes">
            {p.notes.map((n, k) => (
              <li key={k}><span className="ed-mono">{String.fromCharCode(97 + k)}.</span>{n}</li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.2}>
          <dl className="ed-facts">
            <dt>Client</dt><dd>{p.client}</dd>
            <dt>Role</dt><dd>{p.role}</dd>
            <dt>Stack</dt><dd>{p.stack}</dd>
          </dl>
          <div className="ed-links">
            <a href={p.live} target="_blank" rel="noopener" className="ed-ulink">Live site <Arrow dir="up-right" /></a>
            <a href={p.repo} target="_blank" rel="noopener" className="ed-ulink">Source <Arrow dir="up-right" /></a>
          </div>
        </Reveal>
      </div>

      <Reveal><blockquote className="ed-serif ed-pull">“{p.quote}”</blockquote></Reveal>
    </article>
  );
}

/* --------------------------------------------------------------- about -- */

function Word({ w, range, progress }: { w: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{w} </motion.span>;
}

function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = ABOUT.split(" ");
  return (
    <section className="ed-section" id="about">
      <header className="ed-head">
        <span className="ed-mono">Masthead</span>
        <h2>About <em className="ed-serif">me</em></h2>
        <a className="ed-mono ed-ulink" href={resumePdf} download="Harsh_Kshirsagar_Resume.pdf">Résumé (PDF) <Arrow dir="down" /></a>
      </header>
      <p ref={ref} className="ed-about">
        {words.map((w, i) => (
          <Word key={i} w={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
      <div className="ed-cols">
        <Reveal>
          <h4 className="ed-mono ed-col-h">Experience</h4>
          {EXPERIENCE.map((e) => (
            <div className="ed-row" key={e.org}>
              <span className="ed-mono">{e.when}</span>
              <div><b>{e.role}</b><span className="ed-muted">{e.org}</span><p>{e.what}</p></div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <h4 className="ed-mono ed-col-h">Education</h4>
          {EDUCATION.map((e) => (
            <div className="ed-row" key={e.org}>
              <span className="ed-mono">{e.when}</span>
              <div><b>{e.role}</b><span className="ed-muted">{e.org}</span></div>
            </div>
          ))}
          <h4 className="ed-mono ed-col-h" style={{ marginTop: 48 }}>Toolkit</h4>
          {TOOLKIT.map(([k, v]) => (
            <div className="ed-row" key={k}><span className="ed-mono">{k}</span><div><p>{v}</p></div></div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- contact -- */

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "c654bbf6-3b1d-4ced-905d-f93318679415",
          name,
          email: String(data.get("email") || ""),
          message: String(data.get("message") || ""),
          subject: `New Portfolio Message from ${name}`,
        }),
      });
      const res = await response.json();
      if (res.success) { setStatus("sent"); form.reset(); } else setStatus("error");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }
  return (
    <form className="ed-form" onSubmit={onSubmit}>
      <label><span className="ed-mono">Name</span><input name="name" required autoComplete="name" /></label>
      <label><span className="ed-mono">Email</span><input name="email" type="email" required autoComplete="email" /></label>
      <label className="is-wide"><span className="ed-mono">Project</span><textarea name="message" rows={3} required /></label>
      <button type="submit" disabled={status === "sending"} className="ed-send" data-cursor="Send">
        <span>{status === "sent" ? "Sent. Talk soon." : status === "sending" ? "Sending…" : status === "error" ? "Didn't send. Try again" : "Send message"}</span>
        <Arrow dir="right" />
      </button>
      <p className="ed-mono ed-status" role="status" aria-live="polite">
        {status === "sent" ? "Thanks, I reply within a day." : status === "error" ? `Or email ${EMAIL}` : ""}
      </p>
    </form>
  );
}

function Contact() {
  return (
    <section className="ed-contact" id="contact">
      <span className="ed-mono">Back page</span>
      <h2 className="ed-contact-h">
        <MaskLines lines={["Got a project?", <em className="ed-serif" key="l">Let's talk.</em>]} />
      </h2>
      <a className="ed-contact-mail" href={`mailto:${EMAIL}`} data-cursor="Write">{EMAIL}</a>
      <div className="ed-contact-grid">
        <ContactForm />
        <ul className="ed-contact-links">
          <li><Roll href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</Roll></li>
          <li><Roll href={GITHUB} target="_blank" rel="noopener">GitHub</Roll></li>
          <li><Roll href={WHATSAPP} target="_blank" rel="noopener">WhatsApp</Roll></li>
          <li><Roll href={resumePdf} download="Harsh_Kshirsagar_Resume.pdf">Résumé</Roll></li>
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- page -- */

function PortfolioPage() {
  const [ready, setReady] = useState(false);
  const fine = useFinePointer();
  const clock = useClock();
  const done = useRef(() => setReady(true)).current;
  return (
    <div className="ed">
      <Loader onDone={done} />
      {fine && <Cursor />}
      <div className="ed-grid" aria-hidden>{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>

      <nav className="ed-nav ed-mono">
        <a href="#top" className="ed-logo">HK<sup>Nº01</sup></a>
        <div className="ed-nav-links">
          <Roll href="#index">Work</Roll>
          <Roll href="#about">About</Roll>
          <Roll href="#contact">Contact</Roll>
        </div>
        <span className="ed-nav-clock">Akluj {clock}</span>
      </nav>

      <main>
        <Hero start={ready} />
        <VelocityMarquee>
          <span>Selected work <Star /> Built by hand <Star /> No templates <Star /> Next.js <Star /> Motion <Star />&nbsp;</span>
        </VelocityMarquee>
        <WorkIndex />
        {PROJECTS.map((p, i) => <Feature key={p.id} p={p} i={i} />)}
        <VelocityMarquee base={30}>
          <span className="is-outline">Available for work <Star /> Freelance <Star /> White-label <Star />&nbsp;</span>
        </VelocityMarquee>
        <About />
        <Contact />
      </main>

      <footer className="ed-foot ed-mono">
        <span>© {new Date().getFullYear()} Harsh Kshirsagar</span>
        <span>Set in Archivo &amp; Instrument Serif. Designed and built by hand.</span>
        <a href="#top" className="ed-ulink">Back to top <Arrow dir="up" /></a>
      </footer>
    </div>
  );
}
