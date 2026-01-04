import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { portfolioData } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Header
      gsap.from('.edu-header', {
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

      // Animate Items
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item: any, i) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          delay: i * 0.2, // Stagger effect
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="education"
      className="bg-slate-950 relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div
        ref={containerRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center mb-20 edu-header">
          <h2 className="text-accent font-medium mb-3 uppercase tracking-wider text-sm">
            Academic Background
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Education
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            My academic journey and qualifications that have laid the foundation
            for my career.
          </p>
        </div>

        <div className="timeline-container relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 timeline-line md:-translate-x-1/2" />

          <div className="space-y-12">
            {portfolioData.education.map((edu, index) => (
              <div
                key={edu.id}
                className={`timeline-item relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot/Icon */}
                <div className="absolute left-4 md:left-1/2 top-0 w-12 h-12 md:w-16 md:h-16 -translate-x-1/2 flex items-center justify-center bg-slate-950 border-4 border-slate-900 rounded-full z-10">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-accent transition-colors">
                    <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="ml-14 md:ml-0 md:w-1/2">
                  <div className={index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}>
                    <div className="bg-slate-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group hover:-translate-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full border border-accent/20">
                          <Calendar className="w-3 h-3" />
                          {edu.year}
                        </span>
                        {edu.gpa && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-slate-300 text-xs font-bold rounded-full border border-slate-700">
                            <Award className="w-3 h-3" />
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                        {edu.school}
                      </h4>
                      <h5 className="text-lg text-slate-300 font-medium mb-4">
                        {edu.degree}
                      </h5>
                      <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4 mt-4">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Empty side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Education;
