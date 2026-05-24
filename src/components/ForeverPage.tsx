import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import FloatingParticles from './FloatingParticles';

interface ForeverPageProps {
  onReplay: () => void;
}

const ForeverPage = ({ onReplay }: ForeverPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      // Twinkling stars (scale-based)
      gsap.to('.twinkle-star-shape', {
        scale: 0.1,
        opacity: 0.2,
        duration: () => 1 + Math.random() * 1.5,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.1, from: 'random' },
        ease: 'sine.inOut',
      });

      // Moon glow pulse
      gsap.to('.moon-glow-ring', {
        scale: 1.15,
        opacity: 0.25,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'center',
      });

      // Silhouette aura pulse
      gsap.to('.silhouette-aura', {
        scale: 1.1,
        opacity: 0.16,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      });

      // Lantern float and perspective shrink
      gsap.to('.paper-lantern', {
        y: -180,
        scale: 0.7,
        duration: 8,
        repeat: -1,
        ease: 'power1.inOut',
      });
      // Lantern sway
      gsap.to('.paper-lantern', {
        x: '+=12',
        rotation: 8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'top center',
      });
      // Lantern glow pulse
      gsap.to('.lantern-glow', {
        opacity: 0.5,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Shooting stars spawning loop
      const spawnShootingStar = () => {
        const sky = containerRef.current;
        if (!sky) return;
        const star = document.createElement('div');
        const startX = Math.random() * 150;
        const startY = Math.random() * 80;
        star.style.cssText = `
          position: absolute;
          width: 45px;
          height: 1.5px;
          background: linear-gradient(90deg, #FFFFFF, transparent);
          top: ${startY}px;
          left: ${startX}px;
          transform: rotate(-30deg) scaleX(0);
          opacity: 0;
          pointer-events: none;
          z-index: 1;
        `;
        sky.appendChild(star);

        gsap.timeline({
          onComplete: () => star.remove()
        })
          .to(star, { opacity: 0.8, scaleX: 1, duration: 0.3, ease: 'power1.out' })
          .to(star, { x: '+=160', y: '+=90', opacity: 0, scaleX: 0.5, duration: 0.5, ease: 'power1.in' }, '-=0.1');

        // Schedule next shooting star
        setTimeout(spawnShootingStar, gsap.utils.random(5000, 10000));
      };
      
      // Initial shooting star delay
      setTimeout(spawnShootingStar, 4000);

      // Text and CTA entrance timeline
      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' }
      )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' },
          '+=0.4'
        )
        .fromTo(
          line3Ref.current,
          { opacity: 0, y: 15 },
          { opacity: 0.9, y: 0, duration: 0.6, ease: 'power2.out' },
          '+=0.4'
        )
        .fromTo(
          line4Ref.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '+=0.4'
        )
        .fromTo(
          buttonRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
          '+=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleReplay = useCallback(() => {
    gsap.timeline()
      .to(containerRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: onReplay,
      });
  }, [onReplay]);

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--grad-screen6)',
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
      {/* Star sparkle overlay */}
      <FloatingParticles types={['sparkles']} colors={['#FFF176', '#00D4FF', '#FFD93D']} />

      {/* SVG Night Scene */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <svg
          viewBox="0 0 390 300"
          style={{ width: '100%', maxWidth: '390px', marginBottom: '16px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
          aria-hidden="true"
        >
          <defs>
            {/* Soft crescent glow */}
            <filter id="crescent-glow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Silhouette glow */}
            <filter id="silhouette-glow">
              <feGaussianBlur stdDeviation="15" result="blur" />
            </filter>
          </defs>

          {/* 4-point SVG Stars */}
          <g>
            <path className="twinkle-star-shape" d="M40 30 Q45 30 45 25 Q45 30 50 30 Q45 30 45 35 Q45 30 40 30 Z" fill="#FFF176" style={{ transformOrigin: '45px 30px' }} />
            <path className="twinkle-star-shape" d="M120 45 Q123 45 123 42 Q123 45 126 45 Q123 45 123 48 Q123 45 120 45 Z" fill="#00D4FF" style={{ transformOrigin: '123px 45px' }} />
            <path className="twinkle-star-shape" d="M220 25 Q224 25 224 21 Q224 25 228 25 Q224 25 224 29 Q224 25 220 25 Z" fill="#FFD93D" style={{ transformOrigin: '224px 25px' }} />
            <path className="twinkle-star-shape" d="M80 80 Q82 80 82 78 Q82 80 84 80 Q82 80 82 82 Q82 80 80 80 Z" fill="#E1BEE7" style={{ transformOrigin: '82px 80px' }} />
            <path className="twinkle-star-shape" d="M290 85 Q293 85 293 82 Q293 85 296 85 Q293 85 293 88 Q293 85 290 85 Z" fill="#00D4FF" style={{ transformOrigin: '293px 85px' }} />
            <path className="twinkle-star-shape" d="M340 35 Q344 35 344 31 Q344 35 348 35 Q344 35 344 39 Q344 35 340 35 Z" fill="#FFF176" style={{ transformOrigin: '344px 35px' }} />
            <path className="twinkle-star-shape" d="M180 90 Q182 90 182 88 Q182 90 184 90 Q182 90 182 92 Q182 90 180 90 Z" fill="#FFD93D" style={{ transformOrigin: '182px 90px' }} />
            <path className="twinkle-star-shape" d="M60 140 Q62 140 62 138 Q62 140 64 140 Q62 140 62 142 Q62 140 60 140 Z" fill="#E1BEE7" style={{ transformOrigin: '62px 140px' }} />
            <path className="twinkle-star-shape" d="M320 130 Q323 130 323 127 Q323 130 326 130 Q323 130 323 133 Q323 130 320 130 Z" fill="#00D4FF" style={{ transformOrigin: '323px 130px' }} />
          </g>

          {/* Moon with Halo */}
          <g transform="translate(315, 50)">
            {/* Halo ring */}
            <circle className="moon-glow-ring" cx="0" cy="0" r="30" fill="#FFE066" opacity="0.16" filter="url(#crescent-glow)" />
            {/* Crescent body */}
            <path d="M-10 -15 A 18 18 0 1 0 15 10 A 13 13 0 1 1 -10 -15 Z" fill="#FFE066" filter="drop-shadow(0 0 8px #FFD93D)" />
            {/* Crater details */}
            <circle cx="-5" cy="5" r="2" fill="#EAD257" opacity="0.5" />
            <circle cx="2" cy="-5" r="1.5" fill="#EAD257" opacity="0.5" />
            <circle cx="5" cy="2" r="1" fill="#EAD257" opacity="0.5" />
            {/* Star close to moon */}
            <path d="M-22 -8 Q-20 -8 -20 -10 Q-20 -8 -18 -8 Q-20 -8 -20 -6 Q-20 -8 -22 -8 Z" fill="#FFF176" />
          </g>

          {/* Overlapping Silhouette Aura Glows */}
          <circle className="silhouette-aura" cx="170" cy="220" r="45" fill="#BF5FFF" opacity="0.12" filter="url(#silhouette-glow)" />
          <circle className="silhouette-aura" cx="210" cy="220" r="45" fill="#FF2D78" opacity="0.1" filter="url(#silhouette-glow)" />

          {/* Rolling hills (magical landscape) */}
          <path d="M0 260 Q60 230 130 250 Q200 270 260 240 Q330 210 390 245 L390 300 L0 300 Z" fill="#1C052E" />
          <path d="M0 275 Q80 255 160 270 Q240 285 320 260 Q370 245 390 265 L390 300 L0 300 Z" fill="#0D001F" />

          {/* Figures (Boy and Girl Silhouette) */}
          <g transform="translate(5, 12)">
            {/* Figure 1 (Boy silhouette, taller) */}
            <g transform="translate(175, 210)">
              {/* Hair */}
              <ellipse cx="0" cy="-15" rx="11" ry="11" fill="#0D001F" />
              <rect x="-9" y="-19" width="18" height="6" rx="2.5" fill="#0D001F" />
              {/* Head */}
              <ellipse cx="0" cy="-5" rx="9" ry="9" fill="#0D001F" />
              {/* Shirt */}
              <path d="M-10 8 Q-12 30 -9 40 L9 40 Q12 30 10 8 Z" fill="#0D001F" />
              {/* Pants */}
              <path d="M-9 40 L9 40 L8 55 L2 55 L2 47 L-2 47 L-2 55 L-8 55 Z" fill="#0D001F" />
              {/* Legs */}
              <rect x="-6" y="55" width="4" height="15" rx="1.5" fill="#0D001F" />
              <rect x="2" y="55" width="4" height="15" rx="1.5" fill="#0D001F" />
              {/* Arm holding hand */}
              <line x1="8" y1="18" x2="11" y2="22" stroke="#0D001F" strokeWidth="3.2" strokeLinecap="round" />
            </g>

            {/* Figure 2 (Girl silhouette, shorter) */}
            <g transform="translate(195, 218)">
              {/* Long Hair */}
              <path d="M-10 -7 Q-16 12 -13 28" stroke="#0D001F" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M10 -7 Q16 12 14 28" stroke="#0D001F" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <ellipse cx="0" cy="-13" rx="10" ry="11" fill="#0D001F" />
              {/* Head */}
              <ellipse cx="0" cy="-3" rx="8.5" ry="8.5" fill="#0D001F" />
              {/* Dress */}
              <path d="M-11 7 Q-13 32 -10 50 L10 50 Q13 32 11 7 Z" fill="#0D001F" />
              {/* Legs */}
              <rect x="-6" y="50" width="3.5" height="13" rx="1" fill="#0D001F" />
              <rect x="1.5" y="50" width="3.5" height="13" rx="1" fill="#0D001F" />
              {/* Arm holding hand */}
              <line x1="-7" y1="16" x2="-11" y2="14" stroke="#0D001F" strokeWidth="3.2" strokeLinecap="round" />
            </g>
          </g>

          {/* Rising Lantern */}
          <g className="paper-lantern" transform="translate(120, 210)" style={{ transformOrigin: 'center center' }}>
            {/* Glow circle */}
            <circle cx="0" cy="-6" r="16" fill="#FFD93D" opacity="0.15" filter="url(#crescent-glow)" />
            {/* Lantern body */}
            <rect className="lantern-glow" x="-7" y="-16" width="14" height="20" rx="3.5" fill="#FFE066" stroke="#FF6B35" strokeWidth="1.5" />
            <rect x="-4" y="-12" width="8" height="13" rx="2" fill="#FFFFFF" opacity="0.3" />
            {/* Top crown */}
            <polygon points="-5,-16 5,-16 3,-20 -3,-20" fill="#FF2D78" />
          </g>

          {/* Faint background heart contours */}
          <path d="M 60 120 A 4 4 0 0 1 68 120 A 4 4 0 0 1 76 120 Q 76 128 68 136 Q 60 128 60 120 Z" fill="none" stroke="#FF2D78" strokeWidth="0.5" opacity="0.08" />
          <path d="M 230 140 A 3 3 0 0 1 236 140 A 3 3 0 0 1 242 140 Q 242 146 236 152 Q 230 146 230 140 Z" fill="none" stroke="#BF5FFF" strokeWidth="0.5" opacity="0.08" />
        </svg>
      </div>

      {/* Text Lines */}
      <div
        ref={line1Ref}
        className="gradient-text"
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: '32px',
          fontWeight: 700,
          textAlign: 'center',
          opacity: 0,
          marginBottom: '12px',
          filter: 'drop-shadow(0 0 15px rgba(255,217,61,0.4))',
        }}
      >
        25 and absolutely glowing. ✨
      </div>

      <div
        ref={line2Ref}
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: '25px',
          fontWeight: 600,
          color: '#E1BEE7',
          textAlign: 'center',
          opacity: 0,
          marginBottom: '16px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {"Here's to forever, bestie."}
      </div>

      <div
        ref={line3Ref}
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          color: 'white',
          opacity: 0,
          textAlign: 'center',
          marginBottom: '8px',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        }}
      >
        🌙 Thank you for being you.
      </div>

      <div
        ref={line4Ref}
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontStyle: 'italic',
          fontSize: '12px',
          color: '#FF2D78',
          opacity: 0,
          textAlign: 'center',
          marginBottom: '28px',
        }}
      >
        — Made with all my love 💕
      </div>

      {/* Replay Button */}
      <button
        ref={buttonRef}
        onClick={handleReplay}
        className="glow-btn"
        style={{
          opacity: 0,
          background: 'transparent',
          border: '2.5px solid #FF2D78',
          color: '#FFF8F0',
          boxShadow: 'none',
          zIndex: 2,
        }}
        onPointerEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 45, 120, 0.15)';
        }}
        onPointerLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
        aria-label="Replay from the beginning"
      >
        Replay from the beginning 💕
      </button>
    </div>
  );
};

export default ForeverPage;
