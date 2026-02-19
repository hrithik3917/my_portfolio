import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, TrendingUp, Zap, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
  delay: number;
}

const StatItem = ({ icon: Icon, value, label, color, delay }: StatItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onComplete: () => {
            // Animate counter
            gsap.to({ val: 0 }, {
              val: numericValue,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                setCount(Number(this.targets()[0].val.toFixed(1)));
              }
            });
          }
        }
      );
    }, item);

    return () => ctx.revert();
  }, [delay, numericValue]);

  return (
    <div
      ref={itemRef}
      className="card-glass flex flex-col items-center p-6 text-center group"
    >
      <div 
        className="p-4 rounded-xl mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ 
          background: `${color}20`,
          boxShadow: `0 0 20px ${color}30`
        }}
      >
        <Icon className="w-8 h-8" style={{ color }} />
      </div>
      <div 
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{ color }}
      >
        {count}{suffix}
      </div>
      <p className="text-white/60 text-sm font-mono uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

  const stats = [
    { icon: GraduationCap, value: '3.9', label: 'GPA', color: '#00D9FF' },
    { icon: TrendingUp, value: '25%', label: 'Accuracy Boost', color: '#FF006E' },
    { icon: Zap, value: '60%', label: 'Efficiency Gain', color: '#38B000' },
    { icon: Calendar, value: '2+', label: 'Years Experience', color: '#FFBE0B' },
  ];

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-20 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-section font-bold text-center mb-12 text-white"
        >
          Impact <span className="gradient-text">Metrics</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              color={stat.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
