import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code, Database, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: 'ml' | 'engineering' | 'data' | 'cloud';
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    // ML/AI - Cyan
    { name: 'Python', category: 'ml' },
    { name: 'PyTorch', category: 'ml' },
    { name: 'Scikit-Learn', category: 'ml' },
    { name: 'RAG', category: 'ml' },
    { name: 'LLMs', category: 'ml' },
    { name: 'spaCy', category: 'ml' },
    { name: 'DeepEval', category: 'ml' },
    // Engineering - Magenta
    { name: 'React', category: 'engineering' },
    { name: 'Node.js', category: 'engineering' },
    { name: 'REST APIs', category: 'engineering' },
    { name: 'Git', category: 'engineering' },
    { name: 'JavaScript', category: 'engineering' },
    // Data - Green
    { name: 'SQL', category: 'data' },
    { name: 'ChromaDB', category: 'data' },
    { name: 'LlamaIndex', category: 'data' },
    { name: 'R', category: 'data' },
    { name: 'SAS', category: 'data' },
    // Cloud - Amber
    { name: 'AWS', category: 'cloud' },
    { name: 'Docker', category: 'cloud' },
    { name: 'CI/CD', category: 'cloud' },
  ];

  const categories = [
    { id: 'ml', name: 'ML & AI', icon: Brain, color: '#00D9FF' },
    { id: 'engineering', name: 'Engineering', icon: Code, color: '#FF006E' },
    { id: 'data', name: 'Data', icon: Database, color: '#38B000' },
    { id: 'cloud', name: 'Cloud', icon: Cloud, color: '#FFBE0B' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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
    }, section);

    return () => ctx.revert();
  }, []);

  // Canvas animation for skill connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let progress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Draw subtle connecting lines between skill categories
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      
      // Draw orbital rings
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
      ctx.lineWidth = 1;
      
      [100, 150, 200].forEach((radius) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2 * Math.min(progress * 2, 1));
        ctx.stroke();
      });

      // Draw center node
      if (progress > 0.3) {
        const centerOpacity = Math.min((progress - 0.3) * 3, 1);
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${centerOpacity})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 217, 255, ${centerOpacity * 0.3})`;
        ctx.stroke();
      }

      if (progress < 1) {
        progress += 0.005;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const getSkillClass = (category: string) => {
    switch (category) {
      case 'ml': return 'skill-tag';
      case 'engineering': return 'skill-tag skill-tag-magenta';
      case 'data': return 'skill-tag skill-tag-green';
      case 'cloud': return 'skill-tag bg-amber/10 border-amber/30 text-amber hover:bg-amber/20 hover:shadow-amber/20';
      default: return 'skill-tag';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 px-4 md:px-8"
    >
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-section font-bold mb-4 text-white">
            Skills <span className="gradient-text">Constellation</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Technologies and tools I use to build intelligent systems
          </p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
              <span className="text-sm text-white/60">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Skills cloud */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <span
              key={index}
              className={`${getSkillClass(skill.category)} cursor-pointer transition-all duration-300 ${
                hoveredSkill === skill.name ? 'scale-110' : ''
              } ${hoveredSkill && hoveredSkill !== skill.name ? 'opacity-50' : ''}`}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {skill.name}
            </span>
          ))}
        </div>

        {/* Center hub text */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass">
            <Brain className="w-5 h-5 text-cyan" />
            <span className="text-white font-medium">Data Science</span>
            <span className="text-white/40">×</span>
            <Code className="w-5 h-5 text-magenta" />
            <span className="text-white font-medium">Engineering</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
