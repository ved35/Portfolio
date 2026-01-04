import { useRef, useEffect, useState } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionWrapper from '../components/SectionWrapper';
import { portfolioData } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-header', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.project-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <SectionWrapper id="projects" className="bg-slate-950">
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-20 project-header">
          <h2 className="text-accent font-medium mb-3 uppercase tracking-wider text-sm">
            My Portfolio
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A collection of projects intended to showcase my technical skills
            and problem-solving abilities.
          </p>
        </div>

        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative rounded-2xl bg-slate-900/50 border border-white/5 overflow-hidden hover:border-white/10 transition-colors duration-300"
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight Effect */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
              />

              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://placehold.co/800x600/1e1e1e/FFF?text=${encodeURIComponent(
                        project.title
                      )}`;
                  }}
                />

                {/* Floating Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-accent text-black text-xs font-bold rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      FEATURED
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8 relative z-20">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h4>
                  <div className="flex gap-3">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                      title="View Code"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs font-medium text-slate-500 px-2.5 py-1">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Hover overlay link indicator */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-100">
                  <ArrowUpRight className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 project-header">
          <a
            href={portfolioData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
          >
            <span>View all projects on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
