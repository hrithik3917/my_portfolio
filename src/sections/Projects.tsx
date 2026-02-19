import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
  color: string;
  index: number;
}

const ProjectCard = ({ title, description, image, tags, github, demo, color, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({ x: y * 10, y: -x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="card-glass overflow-hidden h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div 
            className="absolute inset-0 opacity-60"
            style={{ 
              background: `linear-gradient(to top, #0a0a12 0%, transparent 50%, ${color}20 100%)`
            }}
          />
          
          {/* Links overlay */}
          <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-6 h-6 text-white" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan transition-colors">
              {title}
            </h3>
            <ArrowUpRight className={`w-5 h-5 text-white/40 transition-all duration-300 ${isHovered ? 'text-cyan translate-x-1 -translate-y-1' : ''}`} />
          </div>
          
          <p className="text-white/60 text-sm mb-4 leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-mono rounded-full"
                style={{ 
                  backgroundColor: `${color}15`,
                  color,
                  border: `1px solid ${color}30`
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div 
          className="absolute bottom-0 left-0 h-1 transition-all duration-300 group-hover:w-full"
          style={{ 
            backgroundColor: color,
            width: isHovered ? '100%' : '0%'
          }}
        />
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'Amazon Review Query System',
      description: 'Semantic search over 37GB of Amazon reviews using RAG pipelines. Achieved 83% faithfulness score with ChromaDB and GPT integration.',
      image: '/project_amazon_viz.jpg',
      tags: ['Python', 'RAG', 'ChromaDB', 'GPT', 'LlamaIndex'],
      github: 'https://github.com/hritikdalvi',
      color: '#00D9FF',
    },
    {
      title: 'Netflix Catalog Recommender',
      description: 'Content-based recommendation engine for 7.8k titles using vectorized metadata and cosine similarity. Optimized for cold-start scenarios.',
      image: '/project_netflix_viz.jpg',
      tags: ['Scikit-learn', 'NLP', 'Cosine Similarity', 'Pandas'],
      github: 'https://github.com/hritikdalvi',
      color: '#FF006E',
    },
  ];

  useEffect(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-section font-bold mb-4 text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Selected work that showcases my expertise in data science and engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              index={index}
            />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <a
            href="https://github.com/hritikdalvi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan hover:text-white transition-colors font-mono text-sm"
          >
            View all projects on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
