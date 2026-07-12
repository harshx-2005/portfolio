import { 
  FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaNodeJs, FaGitAlt, FaGithub, FaDatabase, FaPython, FaJava, FaLinux, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaDocker
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiExpress, SiDjango, SiMongodb, SiMysql, SiVercel, SiRender, SiBootstrap, SiPostgresql, SiJsonwebtokens, SiCloudinary, SiNextdotjs, SiTypescript, SiDocker, SiRailway
} from 'react-icons/si';
import { 
  GiBrain, GiSmartphone, GiGraduateCap, GiArtificialIntelligence, GiProgression
} from 'react-icons/gi';
import { 
  BiCodeBlock, BiTestTube
} from 'react-icons/bi';
import { TbBrandFramerMotion } from 'react-icons/tb';

export interface Skill {
  name: string;
  level: number;
  icon: any;
  color: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  techStack: string[];
  features: string[];
  github: string;
  liveDemo: string;
  bannerBg: string;
  glowColor: string;
  badges?: string[];
  beforeImage?: string;
  afterImage?: string;
}

export const personalDetails = {
  name: "Harsh Mahesh Kshirsagar",
  roles: [
    "Senior Full Stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "AI Integration Specialist",
    "MERN Stack Developer",
    "Django Developer",
    "Software Tester & QA"
  ],
  location: "Akluj, Solapur, India",
  tagline: "Building scalable web platforms, AI-powered systems, and modern digital experiences.",
  shortIntro: "I am a results-driven MERN Stack Developer with hands-on experience building real-time and AI-powered web applications, committed to delivering high-performance, scalable solutions.",
  socials: {
    github: "https://github.com/harshx-2005",
    linkedin: "https://www.linkedin.com/in/harsh-kshirsagar-975699338/",
    instagram: "https://www.instagram.com/_paradoxx_og_?igsh=bDl6cGR5Z240eXY1",
    discord: "king_ragnar_lothbrok_",
    email: "theharshkshirsagar@gmail.com",
    phone: "+91-7058412735"
  }
};

export const statistics = [
  { value: 20, suffix: "+", label: "Projects Completed", description: "Production, freelance & client projects" },
  { value: 24, suffix: "+", label: "Technologies Mastered", description: "Languages, frameworks & dev tools" },
  { value: 50, suffix: "+", label: "Students Mentored", description: "For final year academic projects" },
  { value: 98, suffix: "%", label: "ATS Resume Score", description: "Highly optimized keyword layout" }
];

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", level: 92, icon: SiNextdotjs, color: "text-[#ffffff]" },
      { name: "TypeScript", level: 90, icon: SiTypescript, color: "text-[#3178c6]" },
      { name: "React.js", level: 94, icon: FaReact, color: "text-[#61dafb]" },
      { name: "Tailwind CSS", level: 93, icon: SiTailwindcss, color: "text-[#38bdf8]" },
      { name: "JavaScript", level: 92, icon: FaJsSquare, color: "text-[#f7df1e]" },
      { name: "HTML5", level: 95, icon: FaHtml5, color: "text-[#e34f26]" },
      { name: "CSS3", level: 90, icon: FaCss3Alt, color: "text-[#1572b6]" },
      { name: "Bootstrap", level: 85, icon: SiBootstrap, color: "text-[#7952b3]" }
    ]
  },
  {
    category: "Backend & Cloud",
    skills: [
      { name: "Node.js", level: 88, icon: FaNodeJs, color: "text-[#339933]" },
      { name: "Express.js", level: 87, icon: SiExpress, color: "text-[#f3f4f6]" },
      { name: "Django", level: 89, icon: SiDjango, color: "text-[#092e20]" },
      { name: "Python", level: 88, icon: FaPython, color: "text-[#3776ab]" },
      { name: "REST APIs", level: 92, icon: BiCodeBlock, color: "text-[#10b981]" },
      { name: "JWT", level: 90, icon: SiJsonwebtokens, color: "text-[#ec4899]" },
      { name: "Cloudinary", level: 85, icon: SiCloudinary, color: "text-[#f5a623]" },
      { name: "Vercel", level: 90, icon: SiVercel, color: "text-[#ffffff]" },
      { name: "Render", level: 85, icon: SiRender, color: "text-[#46c3a3]" },
      { name: "Railway", level: 82, icon: SiRailway, color: "text-[#ffffff]" }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", level: 88, icon: SiMysql, color: "text-[#00758f]" },
      { name: "PostgreSQL", level: 85, icon: SiPostgresql, color: "text-[#336791]" },
      { name: "MongoDB", level: 84, icon: SiMongodb, color: "text-[#47a248]" },
      { name: "SQLite", level: 85, icon: FaDatabase, color: "text-[#003b57]" }
    ]
  },
  {
    category: "AI & Innovation",
    skills: [
      { name: "AI Integration", level: 86, icon: GiBrain, color: "text-[#a855f7]" },
      { name: "Prompt Engineering", level: 90, icon: GiArtificialIntelligence, color: "text-[#ec4899]" },
      { name: "Animations (Framer Motion)", level: 92, icon: TbBrandFramerMotion, color: "text-[#ec4899]" },
      { name: "Responsive Design", level: 95, icon: GiSmartphone, color: "text-[#06b6d4]" }
    ]
  },
  {
    category: "Tools & Testing",
    skills: [
      { name: "Git & GitHub", level: 92, icon: FaGithub, color: "text-[#f3f4f6]" },
      { name: "Docker", level: 80, icon: SiDocker, color: "text-[#2496ed]" },
      { name: "Jira (Bug Tracking)", level: 85, icon: FaLinux, color: "text-[#0052cc]" },
      { name: "Manual Testing", level: 88, icon: BiTestTube, color: "text-[#10b981]" },
      { name: "Linux / Windows", level: 85, icon: FaLinux, color: "text-[#f8b500]" }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "graphene",
    title: "Graphene Interiors Ltd",
    category: "Next/React",
    date: "July 2026",
    description: "Engineered and deployed a live production business portfolio platform for an international (UK-based) client high-end interior design and joinery brand. Architected dynamic localized SEO page routing and service endpoints to maximize organic search engine visibility in targeted regions, developed an interactive Before/After image slider using Framer Motion to showcase luxury transformations, and integrated automated lead acquisition workflows connecting custom forms to WhatsApp APIs.",
    techStack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Git"],
    features: [
      "Dynamic localized SEO routing to improve search visibility across target UK regions",
      "Interactive Before/After image comparison slider using Framer Motion",
      "Automated lead acquisition workflows connecting custom forms directly with WhatsApp APIs",
      "Highly responsive, SEO optimized, production-ready website focused on performance, premium UX and conversion"
    ],
    github: "https://github.com/harshx-2005",
    liveDemo: "https://grapheneinteriors.co.uk", // Simulated production link
    bannerBg: "from-zinc-800 via-neutral-900 to-black",
    glowColor: "rgba(255, 255, 255, 0.15)",
    badges: ["Live Production", "International Client", "Featured"],
    beforeImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200", // High-end house interior before
    afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200" // High-end house interior after
  },
  {
    id: "hirepur",
    title: "HirePur – Job Portal",
    category: "MERN/React",
    date: "December 2025",
    description: "Developed a full-stack AI-powered recruitment platform using React and Express REST APIs with JWT-based role authentication and OTP email verification, enabling employers and job seekers to manage end-to-end hiring workflows. Integrated Google Gemini AI for intelligent resume parsing and candidate-job matching, real-time WebSocket notifications via Socket.IO, optimistic UI updates with React, and an interactive candidate pipeline with live status tracking and automated email alerts.",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL", "Socket.IO", "Gemini AI", "EmailJS", "Cloudinary"],
    features: [
      "Secure role-based authentication and comprehensive profile management dashboards with OTP validation",
      "Intelligent resume parsing and candidate-job matching utilizing Google Gemini AI integration",
      "Real-time bidirectional WebSocket notifications via Socket.IO connections",
      "Interactive recruitment pipeline with live status tracking, optimistic UI updates, and email notifications"
    ],
    github: "https://github.com/harshx-2005/hirepur-job-portal",
    liveDemo: "https://hirepur.vercel.app",
    bannerBg: "from-cyan-600 via-teal-700 to-blue-900",
    glowColor: "rgba(6, 182, 212, 0.4)",
    badges: ["AI-Powered", "MERN Stack"]
  },
  {
    id: "linkup",
    title: "LinkUp – Web Chat App",
    category: "MERN/React",
    date: "May 2025",
    description: "Developed a real-time messaging application featuring private and group chats, file sharing, and audio/video calls built with React, Node.js, Express and MySQL.",
    techStack: ["MERN", "Tailwind CSS", "GenAI", "Socket.io", "Cloudinary"],
    features: [
      "Bidirectional instant messaging powered by Socket.io WebSockets",
      "Private chats & collaborative group chat rooms",
      "Robust file sharing integration and Cloudinary media management",
      "Low-latency audio and video calling interfaces",
      "Complete Admin Dashboard for chat channel moderation"
    ],
    github: "https://github.com/harshx-2005/linkup",
    liveDemo: "https://linkup-silk.vercel.app",
    bannerBg: "from-blue-600 via-indigo-600 to-indigo-800",
    glowColor: "rgba(59, 130, 246, 0.4)",
    badges: ["Real-time", "MERN Stack"]
  },
  {
    id: "skillsfluxo",
    title: "SkillsFluxo – LMS Portal",
    category: "MERN/React",
    date: "Late 2025",
    description: "Developed a full-stack Learning Management System (LMS) with customized training and management portals.",
    techStack: ["MERN", "Tailwind CSS", "GenAI", "Cloudinary"],
    features: [
      "Role-Based Access Control (RBAC) customized for Admins, Trainers, and Students",
      "Interactive data dashboards mapping student and class performance metric logs",
      "Premium, responsive, and mobile-friendly user interface styled with Tailwind CSS",
      "Integrated Cloudinary media services for curriculum docs & video content hosting",
      "GenAI integration for automatic curriculum outlines & quiz generations"
    ],
    github: "https://github.com/harshx-2005/skillsfluxo-online-learning-platform",
    liveDemo: "https://demo.com",
    bannerBg: "from-purple-600 via-violet-700 to-indigo-900",
    glowColor: "rgba(139, 92, 246, 0.4)",
    badges: ["LMS", "MERN Stack"]
  }
];

export const servicesData = [
  {
    title: "Full Stack Web Development",
    icon: BiCodeBlock,
    description: "Architecting end-to-end web applications with modular structures, secure database integration, and high performance APIs.",
    glow: "rgba(59, 130, 246, 0.15)"
  },
  {
    title: "Final Year Academic Project Services",
    icon: GiGraduateCap,
    description: "Building production-ready MERN & Django projects for college students, complete with clean code, testing, and implementation reports.",
    glow: "rgba(251, 191, 36, 0.15)"
  },
  {
    title: "MERN Stack Development",
    icon: FaReact,
    description: "Designing modern Single Page Applications (SPAs) with state management, modular components, Express backends, and MongoDB/MySQL.",
    glow: "rgba(139, 92, 246, 0.15)"
  },
  {
    title: "Django Development",
    icon: SiDjango,
    description: "Engineered scalable, secure backends using Python/Django, robust ORM schemas, admin templates, and custom middlewares.",
    glow: "rgba(16, 185, 129, 0.15)"
  },
  {
    title: "Software Testing & QA",
    icon: BiTestTube,
    description: "Implementing test suites, manual testing, tracking defects with Jira dashboards, and validating API integrations for bulletproof products.",
    glow: "rgba(6, 182, 212, 0.15)"
  },
  {
    title: "Responsive UI/UX Development",
    icon: GiSmartphone,
    description: "Polishing interfaces using Tailwind CSS to look stunning, clean, and perfectly aligned across all mobile, tablet, and desktop viewports.",
    glow: "rgba(236, 72, 153, 0.15)"
  }
];

export const journeyTimeline = [
  {
    date: "Nov 2025 – Jan 2026",
    title: "Intern, MERN Stack Dev & AI Automation",
    description: "Worked at AutoFlow Technologies, Pune. Built production-ready MERN features (React, Node.js, Express, MySQL, MongoDB) and integrated AI workflows. Worked in a Git-based agile setup, using Jira, manual testing, and contributing to scalable APIs and real-time modules.",
    tags: ["React", "Express", "Jira", "APIs", "Agile", "Manual Testing"],
    category: "experience"
  },
  {
    date: "2025 - Present",
    title: "Freelance Academic Projects Consulting",
    description: "Consulted and developed paid final year projects for college students. Engineered custom MERN and Django portals, guided deployment (Vercel/Render), and trained students on system testing principles.",
    tags: ["React.js", "Django", "Mentorship", "Freelance"],
    category: "experience"
  },
  {
    date: "Late 2025",
    title: "Building Real-Time Chat & LMS platforms",
    description: "Shipped 'LinkUp' and 'SkillsFluxo', implementing WebSockets, Cloudinary APIs, role-based RBAC, and MySQL relational schemas.",
    tags: ["Socket.io", "MySQL", "Cloudinary", "GenAI"],
    category: "engineering"
  },
  {
    date: "Mid 2025",
    title: "Django Web Portal Engineering",
    description: "Built the 'HirePur' platform using Django MVT structures, integrating secure credentials checks and SQLite database layers.",
    tags: ["Django REST", "SQLite", "Job Portal"],
    category: "engineering"
  }
];

export const resumeDetails = {
  education: [
    { school: "Shriram Institute of Information Technology, Paniv", degree: "B.Sc. in Computer Science", duration: "2023 - 2026", details: "Graduated with focused studies in software engineering systems, relational database models, and algorithms. CGPA: 9.1" },
    { school: "Sadashivrao Mane Vidyalaya, Akluj", degree: "HSC (Higher Secondary Certificate)", duration: "2021 - 2023", details: "Percentage: 50.17%" },
    { school: "Sadashivrao Mane Vidyalaya, Akluj", degree: "SSC (Secondary School Certificate)", duration: "2020", details: "Percentage: 82.00%" }
  ],
  certifications: [
    { title: "MERN Stack Development and AI Integration", issuer: "Professional Training", date: "2026" }
  ],
  summary: "Results-driven MERN Stack Developer with hands-on experience building real-time and AI-powered web applications. Skilled in React, Node.js, Express, MySQL, MongoDB, Jira, Manual testing, and workflow automation. Committed to building and testing reliable, scalable systems with real-time and AI-driven capabilities and aiming to deliver scalable, high-performance solutions while continuously improving product quality and user experience."
};
