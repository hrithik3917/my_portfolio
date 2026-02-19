import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      title: 'AI/ML Research Intern',
      company: 'University of Kentucky',
      location: 'Lexington, KY',
      date: 'May 2025 - Aug 2025',
      color: '#00D9FF',
      achievements: [
        'Built modular analysis service for AI-generated transcriptions using embedding similarity',
        'Improved agreement detection by ~25% over lexical baselines',
        'Created interactive GUIs with IPyWidgets for proofreading workflow',
        'Implemented token-level alignment for fast error triage',
      ],
    },
    {
      title: 'Software Developer',
      company: 'Exaltare Technologies',
      location: 'Pune, India',
      date: 'Oct 2022 - Jun 2024',
      color: '#FF006E',
      achievements: [
        'Built scalable Railway Workshop Management System using MERN stack',
        'Led small developer team with weekly stakeholder walkthroughs',
        'Increased inspection data-entry speed by >60% with reusable React components',
        'Deployed Node.js APIs with Nginx, PM2, and JWT authentication',
      ],
    },
    {
      title: 'Software Developer Intern',
      company: 'Exaltare Technologies',
      location: 'Pune, India',
      date: 'May 2022 - Oct 2022',
      color: '#38B000',
      achievements: [
        'Developed multi-tenant service platform for 1,000+ users',
        'Implemented OAuth-based SSO and secure session management',
        'Reduced booking conflicts by >40% with real-time scheduling',
      ],
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Timeline line animation
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Experience cards animation
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 px-4 md:px-8 bg-cosmic"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-section font-bold mb-4 text-white">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Where I've turned complex challenges into impactful solutions
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-cyan via-magenta to-matrix origin-top" />
          </div>

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-card relative md:grid md:grid-cols-2 md:gap-8 ${
                  index % 2 === 0 ? '' : 'md:text-right'
                }`}
              >
                {/* Timeline node */}
                <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div 
                    className="w-4 h-4 rounded-full border-4"
                    style={{ 
                      backgroundColor: '#050508',
                      borderColor: exp.color,
                      boxShadow: `0 0 20px ${exp.color}50`
                    }}
                  />
                </div>

                {/* Content */}
                <div className={`${index % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <div 
                    className="card-glass p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                  >
                    {/* Accent border */}
                    <div 
                      className="absolute top-0 left-0 w-full h-1"
                      style={{ backgroundColor: exp.color }}
                    />
                    
                    {/* Glow effect on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle at 50% 0%, ${exp.color}20, transparent 70%)`
                      }}
                    />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${exp.color}20` }}
                        >
                          <Briefcase className="w-5 h-5" style={{ color: exp.color }} />
                        </div>
                        <div className={index % 2 === 0 ? '' : 'md:text-right md:ml-auto'}>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-white/70">{exp.company}</p>
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className={`flex flex-wrap gap-4 mb-4 text-sm text-white/50 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.date}
                        </span>
                      </div>

                      {/* Achievements */}
                      <ul className={`space-y-2 ${index % 2 === 0 ? '' : 'md:text-left'}`}>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                            <ChevronRight 
                              className="w-4 h-4 mt-0.5 flex-shrink-0" 
                              style={{ color: exp.color }}
                            />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
