import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/ui/Card';
import { portfolioData } from '../data/data';

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-category', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="skills" className="bg-slate-900/30">
      <div ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="text-white font-medium mb-2 uppercase tracking-wider">
            Expertise
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Skills & Technologies
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.skills.map((skillGroup, index) => (
            <div key={index} className="skill-category h-full">
              <Card className="h-full hover:border-neon-purple/50">
                <h4 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-slate-800">
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-300 border border-slate-700 hover:border-white hover:text-white transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
