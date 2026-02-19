import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';
import './App.css';

// Components
import ParticleBackground from './components/ParticleBackground';

// Sections
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050508] text-white overflow-x-hidden">
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 15, 25, 0.95)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            color: '#fff',
          },
        }}
      />
      
      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Skills />
        <Experience />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
