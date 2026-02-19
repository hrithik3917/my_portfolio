import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, BookOpen, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const education = [
    {
      degree: 'Master of Science - Data Science',
      school: 'University of Kentucky',
      location: 'Lexington, KY',
      period: 'Aug 2024 - May 2026',
      gpa: '3.9/4.0',
      icon: GraduationCap,
      color: '#00D9FF',
    },
    {
      degree: 'Bachelor of Technology - Computer Science',
      school: 'VIIT Pune',
      location: 'Pune, India',
      period: 'Aug 2019 - May 2023',
      gpa: '9.16/10',
      icon: BookOpen,
      color: '#FF006E',
    },
  ];

  const highlights = [
    { icon: Target, label: 'Focus', value: 'ML Systems & Data Pipelines', color: '#38B000' },
    { icon: Award, label: 'Achievement', value: '25% Accuracy Improvement', color: '#FFBE0B' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(imageRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 px-4 md:px-8 bg-cosmic"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-section font-bold mb-6 text-white">
              The Story <span className="gradient-text">So Far</span>
            </h2>
            
            <div className="space-y-4 text-white/70 leading-relaxed mb-8">
              <p>
                My journey began with a fascination for how code can solve real-world problems. 
                During my Computer Science degree at VIIT Pune, I discovered the power of 
                <span className="text-cyan font-medium"> data-driven decision making</span>.
              </p>
              <p>
                At Exaltare Technologies, I led the development of a Railway Workshop Management 
                System that digitized operations for Indian Railways, reducing paperwork and 
                improving efficiency by <span className="text-matrix font-medium">over 60%</span>.
              </p>
              <p>
                Now pursuing my Master's in Data Science at the University of Kentucky, I'm 
                diving deeper into <span className="text-magenta font-medium">machine learning systems</span>, 
                RAG pipelines, and intelligent automation.
              </p>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-4 mb-8">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg glass"
                >
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg glass group hover:border-cyan/30 transition-colors"
                >
                  <div 
                    className="p-3 rounded-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${edu.color}20` }}
                  >
                    <edu.icon className="w-6 h-6" style={{ color: edu.color }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{edu.degree}</h4>
                    <p className="text-white/60 text-sm">{edu.school} · {edu.location}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                      <span>{edu.period}</span>
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: `${edu.color}20`, color: edu.color }}>
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Orbital rings */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute inset-4 border border-cyan/20 rounded-full" />
                <div className="absolute inset-12 border border-magenta/20 rounded-full" />
                <div className="absolute inset-20 border border-matrix/20 rounded-full" />
              </div>
              
              {/* Center image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <img
                    src="/hero_portrait.jpg"
                    alt="Hritik Dalvi"
                    className="w-full h-full object-cover rounded-full border-4 border-cyan/30"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cosmic/50 to-transparent" />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-[8%] right-[8%] p-3 rounded-xl glass animate-float">
                <span className="text-cyan font-mono text-sm">Python</span>
              </div>
              <div className="absolute bottom-[14%] left-[14%] p-3 rounded-xl glass animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-magenta font-mono text-sm">PyTorch</span>
              </div>
              <div className="absolute top-1/2 right-[12%] -translate-y-1/2 p-3 rounded-xl glass animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-matrix font-mono text-sm">RAG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
