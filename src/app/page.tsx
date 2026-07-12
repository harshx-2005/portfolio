'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Services from '@/sections/Services';
import Journey from '@/sections/Journey';
import Resume from '@/sections/Resume';
import Contact from '@/sections/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Entrance terminal-themed loader */}
      <Loader onFinished={() => setIsLoaded(true)} />

      {/* Main assembly layout (rendered post-load) */}
      {isLoaded && (
        <div className="relative min-h-screen">
          <ScrollProgress />
          <Navbar />
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
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}
