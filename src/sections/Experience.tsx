import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/ui/Card';
import { portfolioData } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Header
      gsap.from('.exp-header', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      // Animate Timeline Line
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });

      gsap.from('.experience-item', {
        y: 30,
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
    <SectionWrapper id="experience" className="bg-slate-900/30">
      <div ref={containerRef}>
        <div className="text-center mb-16 exp-header">
          <h2 className="text-accent font-medium mb-2 uppercase tracking-wider">
            Career
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Work Experience
          </h3>
        </div>

        <div className="max-w-4xl mx-auto pl-0 relative timeline-container">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800 timeline-line md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {portfolioData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`experience-item relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 w-12 h-12 -translate-x-1/2 bg-slate-950 border-4 border-slate-900 rounded-full z-10 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.3)] md:w-8 md:h-8 md:bg-slate-950 md:border-2 md:border-accent">
                  {/* Mobile dot style to match Education, desktop keeps original small dot or match? Let's match Education style roughly but keep simplicity if requested. 
                       Actually, user said "same animating line". Let's align the dot position to left-4 for mobile consistent with Education.
                   */}
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                </div>

                {/* Content */}
                <div className="ml-14 md:ml-0 md:w-1/2">
                  <div className={index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}>
                    <Card className="p-6 relative group hover:-translate-y-1 transition-all duration-300">
                      <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-black uppercase bg-accent rounded-full">
                        {exp.period}
                      </span>
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                        {exp.title}
                      </h4>
                      <h5 className="text-lg text-slate-400 mb-4 font-medium">
                        {exp.company}
                      </h5>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-slate-500"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </div>

                {/* Empty side for layout balance */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
