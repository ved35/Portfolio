import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (config = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaults = {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    };

    const vars = { ...defaults, ...config };

    gsap.fromTo(
      element,
      { y: vars.y, opacity: vars.opacity },
      {
        y: 0,
        opacity: 1,
        duration: vars.duration,
        ease: vars.ease,
        scrollTrigger: vars.scrollTrigger,
      }
    );

    return () => {
      // Cleanup if needed
      // ScrollTrigger.getAll().forEach(t => t.kill()); // Using strict mode, be careful with global kill
      // Often better to let React/GSAP handle cleanup or use gsap.context()
    };
  }, [config]);

  // Using gsap.context for better React cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations can be scoped here if we want to change approach,
      // but the simple ref approach above works for single elements too.
      // For now, let's stick to the ref-based effect but wrap in context for safety.
    }, elementRef);
    return () => ctx.revert();
  }, []);

  return elementRef;
};

// Alternative hook for staggering children
export const useStaggerAnimation = (selector: string, config = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          ...config,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, config]);

  return containerRef;
};
