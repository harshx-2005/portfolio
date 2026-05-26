import { useState } from 'react';
import Loader from './components/Loader';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Journey from './sections/Journey';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* 1. Introductory Terminal Splash Loader */}
      <Loader onFinished={() => setIsLoaded(true)} />

      {/* 2. Main Page Layout (Visible once Loaded) */}
      {isLoaded && (
        <div className="relative min-h-screen bg-[#030014] text-slate-100 overflow-x-hidden">
          
          {/* Scroll progress line along page top */}
          <ScrollProgress />

          {/* Mouse tracking radial light source */}
          <CursorGlow />

          {/* Sticky transparent header */}
          <Navbar />

          {/* Sections assembly */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Services />
            <Journey />
            <Resume />
            <Contact />
          </main>

          {/* Theme-aligned footer */}
          <Footer />

          {/* Floating go-up button */}
          <BackToTop />
        </div>
      )}
    </>
  );
}
