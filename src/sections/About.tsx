import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/ui/Card';
import { portfolioData } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-animate', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="about">
      <div ref={sectionRef} className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image Side */}
        <div className="relative group about-animate">
          <div className="absolute -inset-1 bg-linear-to-r from-slate-700 to-slate-800 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          <div className="relative aspect-auto rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            {/* Using a placeholder if image fails or needs generation, but using data path */}
            <img
              src={portfolioData.about.image}
              alt={portfolioData.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Fallback to a gradient pattern if image missing
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/600x600/1e1e1e/FFF?text=Profile';
              }}
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-8 about-animate">
          <div>
            <h2 className="text-white font-medium mb-2 uppercase tracking-wider">
              About Me
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {portfolioData.about.headline}
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              {portfolioData.about.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center hover:-translate-y-1">
              <h4 className="text-3xl font-bold text-white mb-1">5+</h4>
              <p className="text-sm text-slate-400">Years Experience</p>
            </Card>
            <Card className="p-4 text-center hover:-translate-y-1">
              <h4 className="text-3xl font-bold text-white mb-1">50+</h4>
              <p className="text-sm text-slate-400">Projects Completed</p>
            </Card>
          </div>

          <div className="pt-4">
            <p className="text-slate-400 italic border-l-4 border-slate-700 pl-4">
              "I build things for the web. My goal is to always build products
              that provide pixel-perfect, performant experiences."
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
