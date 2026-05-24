import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type ParticleType = 'orbs' | 'hearts' | 'sparkles' | 'confetti' | 'bubbles';

interface FloatingParticlesProps {
  types: ParticleType[];
  colors?: string[];
}

const DEFAULT_COLORS = ['#FF2D78', '#BF5FFF', '#FFD93D', '#00D4FF', '#FF6B35'];

function createOrbs(container: HTMLDivElement, colors: string[]) {
  const count = 8;
  const els: HTMLDivElement[] = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const size = 30 + Math.random() * 50;
    const color = colors[i % colors.length];
    el.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: ${color};
      opacity: ${0.12 + Math.random() * 0.15};
      filter: blur(${14 + Math.random() * 12}px);
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      will-change: transform;
      pointer-events: none;
    `;
    container.appendChild(el);
    els.push(el);
    gsap.to(el, {
      x: `random(-50, 50)`,
      y: `random(-50, 50)`,
      scale: `random(0.8, 1.4)`,
      duration: `random(5, 9)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.5,
    });
  }
  return els;
}

function createHearts(container: HTMLDivElement, colors: string[]) {
  const count = 12;
  const els: HTMLDivElement[] = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const size = 10 + Math.random() * 14;
    el.textContent = '♥';
    el.style.cssText = `
      position: absolute;
      font-size: ${size}px;
      color: ${colors[i % colors.length]};
      left: ${Math.random() * 100}%;
      bottom: -20px;
      opacity: 0;
      will-change: transform;
      pointer-events: none;
      user-select: none;
      filter: drop-shadow(0 0 4px ${colors[i % colors.length]}88);
    `;
    container.appendChild(el);
    els.push(el);
    gsap.fromTo(el,
      { y: 0, opacity: 0, scale: 0.5 },
      {
        y: -(window.innerHeight + 40),
        opacity: 0.7,
        scale: 0.8 + Math.random() * 0.6,
        duration: 5 + Math.random() * 4,
        repeat: -1,
        delay: Math.random() * 6,
        ease: 'none',
        onRepeat: () => {
          gsap.set(el, { left: `${Math.random() * 100}%` });
        },
      }
    );
  }
  return els;
}

function createSparkles(container: HTMLDivElement, colors: string[]) {
  const count = 15;
  const els: HTMLDivElement[] = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const size = 6 + Math.random() * 10;
    el.textContent = i % 2 === 0 ? '✦' : '✧';
    el.style.cssText = `
      position: absolute;
      font-size: ${size}px;
      color: ${colors[i % colors.length]};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: 0;
      will-change: transform;
      pointer-events: none;
      user-select: none;
    `;
    container.appendChild(el);
    els.push(el);
    gsap.to(el, {
      scale: 1.2,
      opacity: 0.9,
      duration: 0.8 + Math.random() * 1,
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 5,
      ease: 'sine.inOut',
    });
    gsap.to(el, {
      x: `random(-20, 20)`,
      y: `random(-20, 20)`,
      duration: 4 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }
  return els;
}

function createConfettiRibbons(container: HTMLDivElement, colors: string[]) {
  const count = 25;
  const els: HTMLDivElement[] = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: 3px; height: 14px;
      background: ${colors[i % colors.length]};
      border-radius: 2px;
      left: ${Math.random() * 100}%;
      top: -20px;
      opacity: 0.7;
      will-change: transform;
      pointer-events: none;
      transform: rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(el);
    els.push(el);
    gsap.to(el, {
      y: window.innerHeight + 40,
      rotation: `+=${360 + Math.random() * 360}`,
      duration: 3 + Math.random() * 3,
      repeat: -1,
      delay: Math.random() * 4,
      ease: 'none',
      onRepeat: () => {
        gsap.set(el, { left: `${Math.random() * 100}%` });
      },
    });
  }
  return els;
}

function createBubbles(container: HTMLDivElement, colors: string[]) {
  const count = 6;
  const els: HTMLDivElement[] = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const size = 30 + Math.random() * 50;
    el.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      border: 2px solid ${colors[i % colors.length]}44;
      left: ${Math.random() * 100}%;
      bottom: -${size}px;
      opacity: 0;
      will-change: transform;
      pointer-events: none;
    `;
    container.appendChild(el);
    els.push(el);
    gsap.fromTo(el,
      { y: 0, opacity: 0 },
      {
        y: -(window.innerHeight + size + 50),
        opacity: 0.4,
        scale: 1 + Math.random() * 0.3,
        duration: 7 + Math.random() * 4,
        repeat: -1,
        delay: Math.random() * 5,
        ease: 'none',
        onRepeat: () => {
          gsap.set(el, { left: `${Math.random() * 100}%` });
        },
      }
    );
  }
  return els;
}

const GENERATORS: Record<ParticleType, (c: HTMLDivElement, co: string[]) => HTMLDivElement[]> = {
  orbs: createOrbs,
  hearts: createHearts,
  sparkles: createSparkles,
  confetti: createConfettiRibbons,
  bubbles: createBubbles,
};

const FloatingParticles = ({ types, colors = DEFAULT_COLORS }: FloatingParticlesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const allEls: HTMLDivElement[] = [];

    for (const type of types) {
      const gen = GENERATORS[type];
      if (gen) {
        allEls.push(...gen(container, colors));
      }
    }

    return () => {
      allEls.forEach((el) => {
        gsap.killTweensOf(el);
        el.remove();
      });
    };
  }, [types, colors]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingParticles;
