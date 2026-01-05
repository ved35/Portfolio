import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  MousePointerClick,
} from 'lucide-react';
import gsap from 'gsap';
import { portfolioData } from '../data/data';
import Button from '../components/ui/Button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.hero-text-reveal',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
        }
      ).fromTo(
        '.hero-btn',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      // Background animation
      gsap.to('.hero-glow', {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl hero-glow opacity-60 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl hero-glow opacity-60 mix-blend-screen animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div ref={textRef} className="space-y-6 max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <h2 className="text-accent font-medium text-lg md:text-xl mb-4 hero-text-reveal">
              Hi there, I'm
            </h2>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight hero-text-reveal">
              <span className="text-white relative z-10">
                {portfolioData.name}
              </span>
              <span className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[80px] rounded-full opacity-0 animate-pulse delay-1000" />
            </h1>
          </div>

          <div className="overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-400 hero-text-reveal">
              <span className="text-gradient hover:text-white transition-colors duration-300">
                {portfolioData.role}
              </span>
            </h2>
          </div>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed hero-text-reveal pt-4">
            {portfolioData.about.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 hero-text-reveal">
            <Button
              size="lg"
              className="group hero-btn"
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View My Work
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <a
              href={portfolioData.resumeLink}
              download="Ved_Patel_Resume.pdf"
              className="hero-btn"
            >
              <Button
                variant="outline"
                size="lg"
                className="group hover:border-accent/50 w-full"
              >
                <Download className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform text-accent" />
                Download Resume
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-12 hero-text-reveal">
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-accent transition-colors hover:scale-110 transform duration-200"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={portfolioData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-accent transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <div
              className="text-slate-400 hover:text-accent transition-colors hover:scale-110 transform duration-200 cursor-pointer"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <MousePointerClick className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-700/50 rounded-full flex justify-center p-2 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          <div className="w-1 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
