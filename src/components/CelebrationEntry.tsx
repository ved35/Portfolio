import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import FloatingParticles from './FloatingParticles';

interface CelebrationEntryProps {
  onContinue: () => void;
}

const CelebrationEntry = ({ onContinue }: CelebrationEntryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const surpriseContainerRef = useRef<HTMLDivElement>(null);
  const happyBirthdayRef = useRef<HTMLDivElement>(null);
  const preciousRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const autoNavRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance (bursts in from scale 0.3)
      gsap.fromTo(containerRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)' }
      );

      // Aurora background drift
      gsap.to('.aurora-orb-1', {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        scale: 'random(0.9, 1.4)',
        duration: 'random(5, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.aurora-orb-2', {
        x: 'random(-80, 80)',
        y: 'random(-80, 80)',
        scale: 'random(0.8, 1.3)',
        duration: 'random(4, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Orbiting stars around 25
      gsap.utils.toArray<HTMLElement>('.orbit-star-particle').forEach((star) => {
        const radius = Number(star.dataset.radius);
        const speed = Number(star.dataset.speed);
        const startAngle = Number(star.dataset.angle);
        const obj = { angle: startAngle };
        gsap.to(obj, {
          angle: startAngle + 360,
          duration: speed,
          repeat: -1,
          ease: 'none',
          onUpdate: () => {
            const currentAngle = obj.angle;
            const rad = (currentAngle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            gsap.set(star, {
              x,
              y,
              rotation: currentAngle * 1.5,
            });
          },
        });
      });

      const tl = gsap.timeline();

      // Letters animate in one by one
      tl.to('.surprise-letter', {
        scale: 1,
        opacity: 1,
        rotation: () => gsap.utils.random(-15, 15),
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(2.5)',
      })
        // Surprise pop bounce
        .to('.surprise-letter', {
          scale: 1.25,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        })
        // Surprise exit
        .to(surpriseContainerRef.current, {
          opacity: 0,
          y: -40,
          duration: 0.4,
          delay: 0.6,
          ease: 'power2.in',
        })
        // Happy Birthday fades in
        .fromTo(
          happyBirthdayRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }
        )
        // Precious text
        .fromTo(
          preciousRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )
        // SVG party scene
        .fromTo(
          svgRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        )
        // 25 badge pop in
        .fromTo(
          badgeRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
          '-=0.2'
        )
        // Button
        .fromTo(
          buttonRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
          '-=0.1'
        );

      // Continuous balloon floating
      gsap.to('.celebration-balloon', {
        y: -10,
        rotation: 'random(-4, 4)',
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
        ease: 'sine.inOut',
      });

      // 25 badge pulse
      gsap.to(badgeRef.current, {
        scale: 1.06,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.5,
      });

      // Streamers sway
      gsap.to('.streamer', {
        skewX: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
      });
    }, containerRef);

    // Auto-navigate after 12 seconds
    autoNavRef.current = setTimeout(() => {
      handleContinue();
    }, 12000);

    return () => {
      ctx.revert();
      if (autoNavRef.current) clearTimeout(autoNavRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = useCallback(() => {
    if (autoNavRef.current) clearTimeout(autoNavRef.current);
    gsap.timeline()
      .to(containerRef.current, {
        x: '-100vw',
        duration: 0.5,
        ease: 'power2.in',
        onComplete: onContinue,
      });
  }, [onContinue]);

  const letters = 'SURPRISE!'.split('');

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--grad-screen2)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'Poppins, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aurora particles */}
      <div className="aurora-orb aurora-orb-1" style={{ top: '10%', left: '10%', width: '320px', height: '320px', background: '#FF2D78', opacity: 0.35 }} />
      <div className="aurora-orb aurora-orb-2" style={{ bottom: '10%', right: '5%', width: '360px', height: '360px', background: '#00D4FF', opacity: 0.3 }} />

      {/* Floating particles */}
      <FloatingParticles types={['hearts', 'confetti']} />

      {/* SURPRISE overlay container */}
      <div
        ref={surpriseContainerRef}
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', gap: '3px' }}>
          {letters.map((char, index) => (
            <span
              key={index}
              className="surprise-letter gradient-text-party"
              style={{
                display: 'inline-block',
                fontSize: '56px',
                fontWeight: 900,
                fontFamily: '"Dancing Script", cursive',
                opacity: 0,
                transform: 'scale(0)',
                filter: 'drop-shadow(0 0 16px rgba(255,217,61,0.6))',
                willChange: 'transform, opacity',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Happy Birthday heading */}
      <div
        ref={happyBirthdayRef}
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: '36px',
          fontWeight: 700,
          color: '#FFF176',
          textAlign: 'center',
          opacity: 0,
          marginBottom: '4px',
          filter: 'drop-shadow(0 0 12px rgba(255,241,118,0.5))',
          zIndex: 1,
        }}
      >
        Happy Birthday,
      </div>

      {/* Precious person tag */}
      <div
        ref={preciousRef}
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: '26px',
          fontWeight: 600,
          color: '#FFF8F0',
          textAlign: 'center',
          opacity: 0,
          marginBottom: '20px',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          zIndex: 1,
        }}
      >
        My Most Precious Person 💖
      </div>

      {/* Upgraded SVG celebration scene */}
      <svg
        ref={svgRef}
        viewBox="0 0 300 200"
        style={{
          width: '100%',
          maxWidth: '300px',
          opacity: 0,
          marginBottom: '16px',
          zIndex: 1,
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="balloon-pink" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF5E97" />
            <stop offset="100%" stopColor="#FF2D78" />
          </radialGradient>
          <radialGradient id="balloon-gold" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="100%" stopColor="#FFD93D" />
          </radialGradient>
          <radialGradient id="balloon-purple" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#DCA3FF" />
            <stop offset="100%" stopColor="#BF5FFF" />
          </radialGradient>
          <radialGradient id="balloon-blue" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#A3F3FF" />
            <stop offset="100%" stopColor="#00D4FF" />
          </radialGradient>
          <radialGradient id="balloon-orange" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF9C75" />
            <stop offset="100%" stopColor="#FF6B35" />
          </radialGradient>
        </defs>

        {/* Streamers */}
        <path className="streamer" d="M20 -10 Q35 20 15 50 Q-5 80 25 110" stroke="#FF2D78" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.7" />
        <path className="streamer" d="M280 -10 Q265 30 285 60 Q305 90 275 120" stroke="#FFD93D" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.7" />
        <path className="streamer" d="M150 -10 Q162 15 145 35 Q128 55 148 75" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* Upgraded Gradient Balloons */}
        <g className="celebration-balloon">
          <path d="M60 160 Q55 120 50 80" stroke="#FF5E97" strokeWidth="1.5" fill="none" />
          <ellipse cx="50" cy="70" rx="17" ry="21" fill="url(#balloon-pink)" stroke="#C2185B" strokeWidth="2.5" />
          <ellipse cx="45" cy="64" rx="4.5" ry="6" fill="white" opacity="0.5" /> {/* Shine */}
        </g>
        <g className="celebration-balloon">
          <path d="M90 150 Q92 105 85 60" stroke="#FFD93D" strokeWidth="1.5" fill="none" />
          <ellipse cx="85" cy="50" rx="15" ry="19" fill="url(#balloon-gold)" stroke="#FF6B35" strokeWidth="2.5" />
          <ellipse cx="80" cy="44" rx="4" ry="5.5" fill="white" opacity="0.5" />
        </g>
        <g className="celebration-balloon">
          <path d="M200 155 Q205 112 210 70" stroke="#BF5FFF" strokeWidth="1.5" fill="none" />
          <ellipse cx="210" cy="60" rx="16" ry="20" fill="url(#balloon-purple)" stroke="#7C00FE" strokeWidth="2.5" />
          <ellipse cx="205" cy="54" rx="4" ry="6" fill="white" opacity="0.5" />
        </g>
        <g className="celebration-balloon">
          <path d="M230 160 Q238 108 240 55" stroke="#00D4FF" strokeWidth="1.5" fill="none" />
          <ellipse cx="240" cy="45" rx="14" ry="18" fill="url(#balloon-blue)" stroke="#00A8CC" strokeWidth="2.5" />
          <ellipse cx="236" cy="39" rx="3.5" ry="5.5" fill="white" opacity="0.5" />
        </g>
        <g className="celebration-balloon">
          <path d="M140 145 Q142 98 140 50" stroke="#FF6B35" strokeWidth="1.5" fill="none" />
          <ellipse cx="140" cy="40" rx="13" ry="17" fill="url(#balloon-orange)" stroke="#C63F0C" strokeWidth="2.5" />
          <ellipse cx="136" cy="34" rx="3" ry="5" fill="white" opacity="0.5" />
        </g>

        {/* Decorative elements */}
        <text x="35" y="145" fill="#FFF176" fontSize="13" opacity="0.7">✦</text>
        <text x="265" y="135" fill="#FF2D78" fontSize="14" opacity="0.6">♥</text>
        <text x="175" y="175" fill="#00D4FF" fontSize="10" opacity="0.6">★</text>
        <text x="105" y="185" fill="#FFF176" fontSize="12" opacity="0.5">✿</text>
      </svg>

      {/* Giant 25 display with orbiters */}
      <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', zIndex: 1 }}>
        {/* Orbiting stars */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const angle = (i * 360) / 10;
          const radius = 64 + (i % 2) * 8; // Varied radius
          const speed = 4 + (i % 3) * 1.5; // Varied speed
          return (
            <span
              key={i}
              className="orbit-star-particle"
              style={{
                position: 'absolute',
                fontSize: i % 2 === 0 ? '14px' : '10px',
                color: i % 3 === 0 ? '#FFD93D' : i % 3 === 1 ? '#00D4FF' : '#FFF176',
                filter: 'drop-shadow(0 0 4px currentColor)',
                pointerEvents: 'none',
              }}
              data-radius={radius}
              data-speed={speed}
              data-angle={angle}
            >
              ✦
            </span>
          );
        })}

        <div
          ref={badgeRef}
          className="gradient-text"
          style={{
            fontSize: '120px',
            fontFamily: '"Dancing Script", cursive',
            fontWeight: 900,
            lineHeight: 1,
            filter: 'drop-shadow(0 0 25px #FFD93DAA)',
            userSelect: 'none',
            opacity: 0,
            willChange: 'transform',
          }}
        >
          25
        </div>
      </div>

      {/* Pill Style CTA Button */}
      <button
        ref={buttonRef}
        onClick={handleContinue}
        className="glow-btn"
        style={{
          opacity: 0,
          zIndex: 2,
        }}
        aria-label="Open your gift"
      >
        Open Your Gift 🎁
      </button>
    </div>
  );
};

export default CelebrationEntry;
