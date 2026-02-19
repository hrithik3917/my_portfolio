import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Linkedin, Github, Mail, ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(cardRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1 },
        0.2
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.5
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      )
      .fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.9
      )
      .fromTo(ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        1.1
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_cosmic.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-cyan/20 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-magenta/15 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-matrix/10 blur-2xl animate-float" />

      {/* Main content card */}
      <div
        ref={cardRef}
        className={`relative z-10 max-w-3xl mx-4 p-8 md:p-12 rounded-2xl glass-strong transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-cyan rounded-tl-lg" />
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-magenta rounded-tr-lg" />
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-matrix rounded-bl-lg" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-amber rounded-br-lg" />

        {/* Content */}
        <div className="text-center">
          <p className="font-mono text-sm text-cyan mb-4 tracking-widest uppercase">
            Data Scientist & ML Engineer
          </p>
          
          <h1
            ref={titleRef}
            className="text-hero font-bold mb-4 gradient-text-animated"
          >
            Hritik Dalvi
          </h1>
          
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 mb-6"
          >
            Transforming Data Into Intelligence
          </p>
          
          <p
            ref={taglineRef}
            className="text-base text-white/60 max-w-xl mx-auto mb-8 leading-relaxed"
          >
            I build intelligent systems that turn complex data into actionable insights. 
            From RAG pipelines to full-stack ML applications.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary flex items-center gap-2"
            >
              View My Work
              <ArrowDown className="w-4 h-4" />
            </button>
            <a
              href="mailto:hritik.dalvi1803@gmail.com"
              className="btn-secondary"
            >
              Get In Touch
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://linkedin.com/in/hritikdalvi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-cyan hover:border-cyan/50 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/hritikdalvi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-magenta hover:border-magenta/50 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:hritik.dalvi1803@gmail.com"
              className="p-3 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-matrix hover:border-matrix/50 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('stats')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-cyan transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
