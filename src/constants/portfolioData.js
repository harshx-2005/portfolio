import { 
  FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaNodeJs, FaGitAlt, FaGithub, FaLink, FaDatabase, FaShieldAlt, FaPython, FaJava, FaLinux, FaWindows, FaCloud
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiExpress, SiDjango, SiMongodb, SiMysql, SiJira, SiPostman, SiSocketdotio, SiVercel, SiRender, SiBootstrap
} from 'react-icons/si';
import { 
  GiBrain, GiSmartphone, GiArtificialIntelligence, GiGraduateCap
} from 'react-icons/gi';
import { 
  BiTestTube, BiCodeBlock, BiSupport 
} from 'react-icons/bi';

export const personalDetails = {
  name: "Harsh Mahesh Kshirsagar",
  roles: [
    "MERN Stack Developer",
    "Full Stack Developer",
    "Django Developer",
    "Software Tester",
    "Academic Projects Consultant"
  ],
  location: "Akluj, Solapur, India",
  tagline: "Building scalable web platforms, AI-powered systems, and modern digital experiences.",
  shortIntro: "I am a results-driven MERN Stack Developer with hands-on experience building real-time and AI-powered web applications, committed to delivering high-performance, scalable solutions.",
  socials: {
    github: "https://github.com/harshx-2005",
    linkedin: "www.linkedin.com/in/harsh-kshirsagar-975699338",
    twitter: "https://twitter.com",
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

export const skillsData = [
  {
    category: "Languages & Core",
    skills: [
      { name: "JavaScript", level: 90, icon: FaJsSquare, color: "text-[#f7df1e]" },
      { name: "Python", level: 88, icon: FaPython, color: "text-[#3776ab]" },
      { name: "Java", level: 82, icon: FaJava, color: "text-[#b07219]" },
      { name: "C / C++", level: 80, icon: BiCodeBlock, color: "text-[#00599c]" }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 92, icon: FaReact, color: "text-[#61dafb]" },
      { name: "Tailwind CSS", level: 93, icon: SiTailwindcss, color: "text-[#38bdf8]" },
      { name: "Bootstrap", level: 85, icon: SiBootstrap, color: "text-[#7952b3]" },
      { name: "HTML5", level: 95, icon: FaHtml5, color: "text-[#e34f26]" },
      { name: "CSS3", level: 90, icon: FaCss3Alt, color: "text-[#1572b6]" }
    ]
  },
  {
    category: "Backend & DevOps",
    skills: [
      { name: "Node.js", level: 85, icon: FaNodeJs, color: "text-[#339933]" },
      { name: "Express JS", level: 87, icon: SiExpress, color: "text-[#f3f4f6]" },
      { name: "Django", level: 89, icon: SiDjango, color: "text-[#092e20]" },
      { name: "Vercel / Render", level: 88, icon: SiVercel, color: "text-[#ffffff]" }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", level: 88, icon: SiMysql, color: "text-[#00758f]" },
      { name: "MongoDB", level: 84, icon: SiMongodb, color: "text-[#47a248]" },
      { name: "SQLite", level: 85, icon: FaDatabase, color: "text-[#003b57]" }
    ]
  },
  {
    category: "Testing & Tools",
    skills: [
      { name: "Jira (Bug Tracking)", level: 85, icon: SiJira, color: "text-[#0052cc]" },
      { name: "Manual Testing", level: 88, icon: BiTestTube, color: "text-[#10b981]" },
      { name: "Git & GitHub", level: 92, icon: FaGithub, color: "text-[#f3f4f6]" },
      { name: "Linux / Windows", level: 85, icon: FaLinux, color: "text-[#f8b500]" }
    ]
  }
];

export const projectsData = [
  {
    id: "linkup",
    title: "LinkUp – Web Chat App",
    category: "MERN/React",
    description: "Developed a real-time messaging application featuring private and group chats, file sharing, and audio/video calls.",
    techStack: ["MERN", "Tailwind CSS", "GenAI", "Socket.io", "Cloudinary"],
    features: [
      "Bidirectional instant messaging powered by Socket.io WebSockets",
      "Private chats & collaborative group chat rooms",
      "Robust file sharing integration and Cloudinary media management",
      "Low-latency audio and video calling interfaces",
      "Complete Admin Dashboard for chat channel moderation"
    ],
    github: "https://github.com/harshx-2005/linkup",
    liveDemo: "linkup-silk.vercel.app",
    bannerBg: "from-blue-600 via-indigo-600 to-indigo-800",
    glowColor: "rgba(59, 130, 246, 0.4)"
  },
  {
    id: "skillsfluxo",
    title: "SkillsFluxo – LMS Portal",
    category: "MERN/React",
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
    glowColor: "rgba(139, 92, 246, 0.4)"
  },
  {
    id: "hirepur",
    title: "HirePur – Job Portal",
    category: "Django/Python",
    description: "Developed a full-stack job portal using Django MVT to bridge the gap between employers and job seekers.",
    techStack: ["HTML", "CSS", "Javascript", "Django", "GenAI", "Django REST", "SQLite"],
    features: [
      "Secure role-based authentication and comprehensive profile management dashboards",
      "End-to-end recruitment workflows including dynamic job posting systems",
      "Advanced candidate searches with custom tag filters",
      "Resume handling & parsing with GenAI assistant modules",
      "Real-time applicant tracking systems for structured candidate management"
    ],
    github: "https://github.com/harshx-2005/hirepur-job-portal",
    liveDemo: "https://demo.com",
    bannerBg: "from-cyan-600 via-teal-700 to-blue-900",
    glowColor: "rgba(6, 182, 212, 0.4)"
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
    date: "Aug - Jan 2026",
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
    { school: "Shriram Institute of Information Technology, Paniv", degree: "B.Sc. in Computer Science", duration: "2023 - 2026", details: "Graduated with focused studies in software engineering systems, relational database models, and algorithms. GPA: 8.5/10" },
    { school: "Sadashivrao Mane Vidyalaya, Akluj", degree: "HSC (Higher Secondary Certificate)", duration: "2021 - 2023", details: "Percentage: 50.17%" },
    { school: "Sadashivrao Mane Vidyalaya, Akluj", degree: "SSC (Secondary School Certificate)", duration: "2020", details: "Percentage: 82.00%" }
  ],
  certifications: [
    { title: "MERN Stack Development and AI Integration", issuer: "Professional Training", date: "2026" }
  ],
  summary: "Results-driven MERN Stack Developer with hands-on experience building real-time and AI-powered web applications. Skilled in React, Node.js, Express, MySQL, MongoDB, Jira, Manual testing, and workflow automation. Committed to building and testing reliable, scalable systems with real-time and AI-driven capabilities and aiming to deliver scalable, high-performance solutions while continuously improving product quality and user experience."
};
