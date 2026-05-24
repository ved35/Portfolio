import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { createConfettiBurst, createSparkleBurst } from '../utils/confetti';
import FloatingParticles from './FloatingParticles';

const CORRECT_PIN = '2601';

interface PinLockProps {
  onSuccess: () => void;
}

const PinLock = ({ onSuccess }: PinLockProps) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance
      gsap.fromTo(containerRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
      );

      // Aurora background drift
      gsap.to('.aurora-orb-1', {
        x: 'random(-80, 80)',
        y: 'random(-80, 80)',
        scale: 'random(0.8, 1.3)',
        duration: 'random(8, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.aurora-orb-2', {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        scale: 'random(0.9, 1.4)',
        duration: 'random(9, 13)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.aurora-orb-3', {
        x: 'random(-70, 70)',
        y: 'random(-70, 70)',
        scale: 'random(0.8, 1.2)',
        duration: 'random(7, 10)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Heading slide and fade in
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.7)', delay: 0.3 }
      );

      // SVG parallax drift
      gsap.to('.parallax-stars', {
        x: 12,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.parallax-figures', {
        x: -6,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Figures breathing
      gsap.to('.breathing-figure', {
        scaleY: 1.025,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'bottom',
        stagger: 0.2,
      });

      // Independent balloon floating
      gsap.to('.balloon-1', { y: -12, rotation: -3, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.balloon-2', { y: -8, rotation: 2, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.balloon-3', { y: -14, rotation: -2, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.balloon-4', { y: -6, rotation: 4, duration: 2.0, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInput = useCallback(
    (index: number, value: string) => {
      if (!/^\d?$/.test(value)) return;

      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      setError(false);

      // Scale pop and sparkle burst on digit enter
      if (value) {
        const inputEl = inputRefs.current[index];
        if (inputEl) {
          gsap.fromTo(inputEl,
            { scale: 1 },
            { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: 'back.out(2)' }
          );
          const rect = inputEl.getBoundingClientRect();
          createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 3);
        }
      }

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      if (value && index === 3) {
        const enteredPin = newPin.join('');
        if (enteredPin === CORRECT_PIN) {
          // Confetti burst
          const rect = pinContainerRef.current?.getBoundingClientRect();
          if (rect) {
            createConfettiBurst(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2,
              16
            );
          }
          // White flash + scale exit transition
          const flash = document.createElement('div');
          flash.style.cssText = `
            position: fixed;
            inset: 0;
            background: white;
            opacity: 0;
            z-index: 10000;
            pointer-events: none;
            transition: opacity 0.15s ease-out;
          `;
          document.body.appendChild(flash);

          gsap.timeline()
            .to(containerRef.current, {
              scale: 3,
              opacity: 0,
              duration: 0.5,
              ease: 'power3.in',
            })
            .to(flash, { opacity: 1, duration: 0.25 }, '-=0.25')
            .call(() => {
              onSuccess();
              gsap.to(flash, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => flash.remove()
              });
            });
        } else {
          setError(true);
          gsap.to(pinContainerRef.current, {
            keyframes: [
              { x: -10, duration: 0.057 },
              { x: 10, duration: 0.057 },
              { x: -8, duration: 0.057 },
              { x: 8, duration: 0.057 },
              { x: -4, duration: 0.057 },
              { x: 4, duration: 0.057 },
              { x: 0, duration: 0.057 },
            ],
          });
          setTimeout(() => {
            setPin(['', '', '', '']);
            inputRefs.current[0]?.focus();
          }, 400);
          setTimeout(() => setError(false), 2000);
        }
      }
    },
    [pin, onSuccess]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !pin[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [pin]
  );

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--grad-hero)',
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
      {/* Animated Aurora background elements */}
      <div className="aurora-orb aurora-orb-1" style={{ top: '5%', left: '5%', width: '320px', height: '320px', background: '#FF2D78', opacity: 0.25 }} />
      <div className="aurora-orb aurora-orb-2" style={{ bottom: '10%', right: '5%', width: '360px', height: '360px', background: '#BF5FFF', opacity: 0.3 }} />
      <div className="aurora-orb aurora-orb-3" style={{ top: '35%', left: '40%', width: '280px', height: '280px', background: '#FFD93D', opacity: 0.2 }} />

      {/* Floating Particles Layer */}
      <FloatingParticles types={['orbs', 'sparkles']} />

      {/* SVG Illustration */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <svg
          ref={svgRef}
          viewBox="0 0 320 200"
          style={{ width: '100%', maxWidth: '300px', marginBottom: '24px', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))' }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="balloon-red" cx="30%" cy="30%" r="70%">
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

            <linearGradient id="body-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#80E5FF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
            <linearGradient id="body-pants" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6C7A89" />
              <stop offset="100%" stopColor="#3F4E5A" />
            </linearGradient>
            <linearGradient id="body-dress-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E1BEE7" />
              <stop offset="100%" stopColor="#BF5FFF" />
            </linearGradient>
          </defs>

          {/* Twinkling stars (for parallax) */}
          <g className="parallax-stars">
            <path d="M30 25 L32 28 L35 28 L33 30 L34 33 L30 31 L26 33 L27 30 L25 28 L28 28 Z" fill="#FFE066" opacity="0.7" />
            <path d="M250 20 L251.5 22 L254 22 L252 23.5 L253 26 L250 24.5 L247 26 L248 23.5 L246 22 L248.5 22 Z" fill="#FFE066" opacity="0.8" />
            <path d="M280 40 L281 41.5 L283 41.5 L281.5 42.5 L282 44 L280 43 L278 44 L278.5 42.5 L277 41.5 L279 41.5 Z" fill="#00D4FF" opacity="0.6" />
            <path d="M90 15 L91 16.5 L93 16.5 L91.5 17.5 L92 19 L90 18 L88 19 L88.5 17.5 L87 16.5 L89 16.5 Z" fill="#FFF176" opacity="0.85" />
            <path d="M150 10 L151.5 12 L154 12 L152 13.5 L153 16 L150 14.5 L147 16 L148 13.5 L146 12 L148.5 12 Z" fill="#FFE066" opacity="0.7" />
          </g>

          {/* Ground shadow */}
          <ellipse cx="150" cy="190" rx="75" ry="6" fill="#7C00FE" opacity="0.2" />

          {/* Figures (parallax group) */}
          <g className="parallax-figures">
            {/* Figure 1 (Boy) */}
            <g className="breathing-figure" transform="translate(130, 85)" style={{ transformOrigin: '0px 70px' }}>
              {/* Hair (messy/cute boy hair) */}
              <ellipse cx="0" cy="-14" rx="14" ry="14" fill="#4A2912" stroke="#251206" strokeWidth="2.5" />
              <rect x="-12" y="-18" width="24" height="8" rx="3" fill="#4A2912" stroke="#251206" strokeWidth="2" />
              {/* Head */}
              <ellipse cx="0" cy="-3" rx="12" ry="12" fill="#FFCBA4" stroke="#D39673" strokeWidth="2.5" />
              {/* Extra hair details/fringe */}
              <path d="M-12 -10 C-6 -15 6 -15 12 -10 C9 -9 7 -6 0 -8 C-7 -6 -9 -9 -12 -10 Z" fill="#4A2912" />
              {/* Eyes */}
              <circle cx="-4.5" cy="-4" r="1.5" fill="#2E1C0C" />
              <circle cx="4.5" cy="-4" r="1.5" fill="#2E1C0C" />
              {/* Blush */}
              <ellipse cx="-8" cy="-1" rx="2.5" ry="1.5" fill="#FF2D78" opacity="0.4" />
              <ellipse cx="8" cy="-1" rx="2.5" ry="1.5" fill="#FF2D78" opacity="0.4" />
              {/* Smile */}
              <path d="M-3 2 Q0 5 3 2" stroke="#2E1C0C" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* T-Shirt */}
              <path d="M-12 12 Q-14 36 -11 46 L11 46 Q14 36 12 12 Z" fill="url(#body-shirt)" stroke="#00A8CC" strokeWidth="2.5" />
              {/* Pants/Shorts */}
              <path d="M-11 46 L11 46 L10 58 L2 58 L2 50 L-2 50 L-2 58 L-10 58 Z" fill="url(#body-pants)" stroke="#1C252C" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Legs */}
              <rect x="-7" y="58" width="5" height="15" rx="2" fill="#FFCBA4" stroke="#D39673" strokeWidth="2" />
              <rect x="2" y="58" width="5" height="15" rx="2" fill="#FFCBA4" stroke="#D39673" strokeWidth="2" />
              {/* Left arm holding balloons */}
              <path d="M-11 20 Q-25 15 -35 -10" stroke="#FFCBA4" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              {/* Right arm holding hand */}
              <path d="M11 20 Q22 25 21 36" stroke="#FFCBA4" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            </g>

            {/* Figure 2 (Girl) */}
            <g className="breathing-figure" transform="translate(170, 95)" style={{ transformOrigin: '0px 62px' }}>
              {/* Back Hair (long girl hair) */}
              <path d="M-14 -10 Q-22 15 -18 35 Q-14 42 -10 38 Q-8 25 -8 5" fill="#1A1A2E" stroke="#05050F" strokeWidth="2.5" />
              <path d="M14 -10 Q22 15 18 35 Q14 42 10 38 Q8 25 8 5" fill="#1A1A2E" stroke="#05050F" strokeWidth="2.5" />
              {/* Head */}
              <ellipse cx="0" cy="-2" rx="11" ry="11" fill="#E8B896" stroke="#C49170" strokeWidth="2.5" />
              {/* Front hair (pretty bangs with pink bow) */}
              <path d="M-12 -9 C-8 -15 8 -15 12 -9 C11 -4 8 -5 0 -8 C-8 -5 -11 -4 -12 -9 Z" fill="#1A1A2E" stroke="#05050F" strokeWidth="2" />
              {/* Pink bow in hair */}
              <circle cx="0" cy="-13" r="3" fill="#FF2D78" />
              <polygon points="0,-13 -6,-16 -6,-10" fill="#FF2D78" />
              <polygon points="0,-13 6,-16 6,-10" fill="#FF2D78" />
              {/* Eyes */}
              <circle cx="-4" cy="-3" r="1.5" fill="#2E1C0C" />
              <circle cx="4" cy="-3" r="1.5" fill="#2E1C0C" />
              {/* Blush */}
              <ellipse cx="-7" cy="0" rx="2" ry="1" fill="#FF2D78" opacity="0.4" />
              <ellipse cx="7" cy="0" rx="2" ry="1" fill="#FF2D78" opacity="0.4" />
              {/* Smile */}
              <path d="M-2.5 3 Q0 5.5 2.5 3" stroke="#2E1C0C" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Dress with outline */}
              <path d="M-13 10 Q-15 44 -11 62 L11 62 Q15 44 13 10 Z" fill="url(#body-dress-2)" stroke="#7C00FE" strokeWidth="2.5" />
              {/* Legs */}
              <rect x="-7" y="62" width="5" height="16" rx="2.5" fill="#E8B896" stroke="#C49170" strokeWidth="2" />
              <rect x="2" y="62" width="5" height="16" rx="2.5" fill="#E8B896" stroke="#C49170" strokeWidth="2" />
              {/* Left arm holding hand */}
              <path d="M-11 18 Q-19 22 -19 26" stroke="#E8B896" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              {/* Right arm waving */}
              <path d="M11 18 Q22 10 28 -2" stroke="#E8B896" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* Balloons group with curved strings */}
          <g className="balloon-group">
            {/* Balloon 1 */}
            <g className="balloon-1">
              <path d="M95 75 Q90 50 80 32" stroke="#FF5E97" strokeWidth="1.5" fill="none" />
              <ellipse cx="80" cy="22" rx="12" ry="15" fill="url(#balloon-red)" stroke="#C2185B" strokeWidth="2.5" />
              <ellipse cx="76" cy="16" rx="3.5" ry="5.5" fill="white" opacity="0.5" /> {/* Shine */}
            </g>
            {/* Balloon 2 */}
            <g className="balloon-2">
              <path d="M95 75 Q85 58 68 42" stroke="#FFD93D" strokeWidth="1.5" fill="none" />
              <ellipse cx="68" cy="30" rx="11" ry="14" fill="url(#balloon-gold)" stroke="#FF6B35" strokeWidth="2.5" />
              <ellipse cx="64" cy="24" rx="3" ry="5" fill="white" opacity="0.5" />
            </g>
            {/* Balloon 3 */}
            <g className="balloon-3">
              <path d="M95 75 Q75 48 55 35" stroke="#BF5FFF" strokeWidth="1.5" fill="none" />
              <ellipse cx="55" cy="23" rx="12" ry="15" fill="url(#balloon-purple)" stroke="#7C00FE" strokeWidth="2.5" />
              <ellipse cx="51" cy="17" rx="3.5" ry="5.5" fill="white" opacity="0.5" />
            </g>
            {/* Balloon 4 */}
            <g className="balloon-4">
              <path d="M95 75 Q92 48 92 24" stroke="#00D4FF" strokeWidth="1.5" fill="none" />
              <ellipse cx="92" cy="14" rx="10" ry="13" fill="url(#balloon-blue)" stroke="#00A8CC" strokeWidth="2.5" />
              <ellipse cx="88" cy="9" rx="3" ry="4.5" fill="white" opacity="0.5" />
            </g>
          </g>
        </svg>
      </div>

      {/* Heading */}
      <h1
        ref={headingRef}
        className="gradient-text"
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: '32px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '8px',
          lineHeight: 1.3,
          filter: 'drop-shadow(0 0 20px rgba(255,93,53,0.5))',
          zIndex: 1,
        }}
      >
        Something special is waiting for you... 🎀
      </h1>

      {/* Subtext */}
      <p
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          color: '#FFF8F0',
          opacity: 0.9,
          marginBottom: '28px',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1,
        }}
      >
        Enter your birthday date 🎂
      </p>

      {/* PIN Input (Glassmorphic) */}
      <div
        ref={pinContainerRef}
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          zIndex: 1,
        }}
      >
        {pin.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            autoFocus={i === 0}
            aria-label={`PIN digit ${i + 1}`}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '20px',
              border: '2px solid rgba(255,45,120,0.4)',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '24px',
              color: '#FFF8F0',
              textAlign: 'center',
              outline: 'none',
              boxShadow: '0 8px 32px rgba(191,95,255,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
              transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.15s',
              WebkitAppearance: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#FFD93D';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,217,61,0.4), 0 8px 32px rgba(191,95,255,0.3)';
              gsap.fromTo(e.currentTarget,
                { scale: 1 },
                { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' }
              );
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,45,120,0.4)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(191,95,255,0.3), inset 0 1px 0 rgba(255,255,255,0.3)';
            }}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px',
            color: '#FFF176',
            fontWeight: 500,
            textShadow: '0 2px 4px rgba(0,0,0,0.4)',
            animation: 'fadeInOut 2s ease',
            zIndex: 1,
          }}
        >
          Hmm, try again bestie 💕
        </p>
      )}

      {/* Footer */}
      <p
        style={{
          position: 'absolute',
          bottom: '24px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '11px',
          color: '#FFF8F0',
          opacity: 0.6,
          zIndex: 1,
        }}
      >
        Made with 💕 just for you
      </p>

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(5px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PinLock;
