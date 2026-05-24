import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { createConfettiBurst } from '../utils/confetti';
import FloatingParticles from './FloatingParticles';

interface CakeCuttingProps {
  onContinue: () => void;
}

const CakeCutting = ({ onContinue }: CakeCuttingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);
  const sliceMessageRef = useRef<HTMLDivElement>(null);
  const [cakeCut, setCakeCut] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer to next birthday
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const thisYear = now.getFullYear();
      let nextBirthday = new Date(thisYear, 0, 1); // Placeholder: Jan 1
      if (nextBirthday <= now) {
        nextBirthday = new Date(thisYear + 1, 0, 1);
      }
      const diff = nextBirthday.getTime() - now.getTime();
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setCountdown(calculateCountdown());
    const interval = setInterval(
      () => setCountdown(calculateCountdown()),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  // Listen to second changes for flip card animation
  const lastSecRef = useRef(countdown.seconds);
  useEffect(() => {
    if (countdown.seconds !== lastSecRef.current) {
      lastSecRef.current = countdown.seconds;
      gsap.fromTo(
        '.countdown-card',
        { rotateX: 0 },
        { rotateX: 360, duration: 0.4, ease: 'power2.out', stagger: 0.05 }
      );
    }
  }, [countdown]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance (slide in from right)
      gsap.fromTo(
        containerRef.current,
        { x: '100vw' },
        { x: 0, duration: 0.5, ease: 'power2.out' }
      );

      // Orbiting stars around 25
      gsap.to('.orbit-star', {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: 'none',
        transformOrigin: '0px 42px',
        stagger: { amount: 2 },
      });

      // Frosting drips drip entrance once
      gsap.fromTo(
        '.cake-drip',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'bounce.out',
          stagger: 0.1,
          transformOrigin: 'top',
        }
      );

      // Steam effect rising from cake
      gsap.fromTo(
        '.steam-line path',
        { y: 5, opacity: 0 },
        {
          y: -35,
          opacity: 0.4,
          duration: 2.5,
          repeat: -1,
          stagger: 0.5,
          ease: 'none',
        }
      );

      // 3-layer candle flames flicker
      gsap.to('.candle-flame-layer', {
        scaleY: 0.75,
        opacity: 0.7,
        duration: 0.15,
        repeat: -1,
        yoyo: true,
        stagger: 0.04,
        ease: 'sine.inOut',
      });

      // Button pulse glow
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          boxShadow:
            '0 8px 32px rgba(255, 45, 120, 0.8), 0 0 0 2px rgba(255, 45, 120, 0.4)',
          scale: 1.03,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCutCake = useCallback(() => {
    if (cakeCut) return;
    setCakeCut(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Step 1: Button disappears
      tl.to(buttonRef.current, { scale: 0, duration: 0.2 })
        // Step 2: Flames flicker out
        .to('.candle-flame-layer', {
          opacity: 0,
          scale: 0,
          duration: 0.25,
          stagger: 0.03,
        })
        .to('.steam-line', { opacity: 0, duration: 0.2 }, '<')
        // Step 3: Smoke rises
        .fromTo(
          '.smoke-puff',
          { opacity: 0, y: 0, scale: 0.5 },
          {
            opacity: 0.6,
            y: -20,
            scale: 1.2,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.05,
          }
        )
        .to(
          '.smoke-puff',
          { opacity: 0, y: -35, scale: 1.5, duration: 0.4, stagger: 0.05 },
          '-=0.2'
        )
        // Step 4: Knife slides in
        .fromTo(
          '.cake-knife',
          { x: 150, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        )
        // Step 5: Golden light streak
        .call(() => {
          const streak = document.createElement('div');
          streak.style.cssText = `
            position: absolute;
            width: 180px;
            height: 4px;
            background: linear-gradient(90deg, transparent, #FFD93D, transparent);
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%) scaleX(0);
            box-shadow: 0 0 15px #FFD93D;
            z-index: 10;
          `;
          containerRef.current?.appendChild(streak);
          gsap
            .timeline()
            .to(streak, { scaleX: 1, duration: 0.3, ease: 'power1.out' })
            .to(streak, {
              opacity: 0,
              duration: 0.2,
              onComplete: () => streak.remove(),
            });
        })
        // Step 6: Cake splits
        .to('.cake-left', {
          x: -14,
          rotation: -3,
          duration: 0.35,
          ease: 'power2.out',
        })
        .to(
          '.cake-right',
          { x: 14, rotation: 3, duration: 0.35, ease: 'power2.out' },
          '<'
        )
        // Step 7: Jump-up bounce physics
        .to('.cake-left, .cake-right', {
          y: -15,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        })
        .to('.cake-left, .cake-right', {
          y: 0,
          duration: 0.35,
          ease: 'bounce.out',
        })
        // Step 8: Confetti burst
        .call(() => {
          const rect = cakeRef.current?.getBoundingClientRect();
          if (rect) {
            createConfettiBurst(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2,
              45
            );
          }
        })
        // Step 9: Message + continue button
        .fromTo(
          sliceMessageRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: -20, duration: 0.5, ease: 'back.out(2)' },
          '+=0.1'
        )
        .fromTo(
          continueRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.5)' },
          '+=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [cakeCut]);

  const handleContinue = useCallback(() => {
    gsap.to(containerRef.current, {
      y: '30px',
      opacity: 0,
      duration: 0.4,
      onComplete: onContinue,
    });
  }, [onContinue]);

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--grad-screen3)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Poppins, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aurora orbs */}
      <div
        className="aurora-orb aurora-orb-1"
        style={{
          top: '10%',
          left: '5%',
          width: '280px',
          height: '280px',
          background: '#FF2D78',
          opacity: 0.3,
        }}
      />
      <div
        className="aurora-orb aurora-orb-2"
        style={{
          bottom: '15%',
          right: '5%',
          width: '320px',
          height: '320px',
          background: '#FFD93D',
          opacity: 0.25,
        }}
      />

      {/* Floating particles (orbs + bubbles) */}
      <FloatingParticles types={['orbs', 'bubbles']} />

      {/* Golden 25 with orbiting stars */}
      <div style={{ position: 'relative', marginBottom: '8px', zIndex: 1 }}>
        <div
          style={{
            fontSize: '76px',
            fontFamily: '"Dancing Script", cursive',
            fontWeight: 900,
            color: '#FFD93D',
            textShadow: '0 0 25px #FFD93DAA, 0 0 50px #FF6B3566',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          25
        </div>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="orbit-star"
            style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: `rotate(${i * 60}deg)`,
              fontSize: '12px',
              color: '#FFF176',
              transformOrigin: '0px 42px',
              willChange: 'transform',
              pointerEvents: 'none',
            }}
          >
            ★
          </span>
        ))}
      </div>

      <p
        style={{
          fontSize: '15px',
          fontWeight: 500,
          color: '#FFF8F0',
          marginBottom: '20px',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          zIndex: 1,
        }}
      >
        {"You're officially 25 & absolutely glowing ✨"}
      </p>

      {/* Birthday Cake SVG */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <svg
          ref={cakeRef}
          viewBox="0 0 280 240"
          style={{
            width: '100%',
            maxWidth: '260px',
            marginBottom: '16px',
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))',
          }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="cake-bottom-grad" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#FF85A1" />
              <stop offset="100%" stopColor="#C2185B" />
            </radialGradient>
            <radialGradient id="cake-top-grad" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#E1BEE7" />
              <stop offset="100%" stopColor="#9C27B0" />
            </radialGradient>
          </defs>

          {/* Steam lines */}
          <g className="steam-line" opacity="0.3">
            <path
              d="M120 70 Q115 50 120 30"
              stroke="#FFF8F0"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M140 70 Q145 50 140 30"
              stroke="#FFF8F0"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M160 70 Q155 50 160 30"
              stroke="#FFF8F0"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Cake stand */}
          <ellipse
            cx="140"
            cy="220"
            rx="84"
            ry="8"
            fill="#FFD93D"
            stroke="#FF6B35"
            strokeWidth="2"
          />
          <rect
            x="115"
            y="210"
            width="50"
            height="15"
            rx="4"
            fill="#FFD93D"
            stroke="#FF6B35"
            strokeWidth="2"
          />

          {/* Bottom tier left */}
          <g className="cake-left">
            <path
              d="M60 155 L140 155 L140 210 L60 210 Z"
              fill="url(#cake-bottom-grad)"
              stroke="#C2185B"
              strokeWidth="2.5"
            />
            <ellipse
              cx="70"
              cy="162"
              rx="3"
              ry="5"
              fill="white"
              opacity="0.4"
            />{' '}
            {/* shine */}
            {/* Frosting drips left */}
            <path
              className="cake-drip"
              d="M72 155 Q75 167 78 155 Z"
              fill="#FFD93D"
            />
            <path
              className="cake-drip"
              d="M86 155 Q90 172 94 155 Z"
              fill="#FFD93D"
            />
            <path
              className="cake-drip"
              d="M102 155 Q105 164 108 155 Z"
              fill="#FFD93D"
            />
            <path
              className="cake-drip"
              d="M116 155 Q120 175 124 155 Z"
              fill="#FFD93D"
            />
          </g>

          {/* Bottom tier right */}
          <g className="cake-right">
            <path
              d="M140 155 L220 155 L220 210 L140 210 Z"
              fill="url(#cake-bottom-grad)"
              stroke="#C2185B"
              strokeWidth="2.5"
            />
            <ellipse
              cx="210"
              cy="162"
              rx="3"
              ry="5"
              fill="white"
              opacity="0.4"
            />{' '}
            {/* shine */}
            {/* Frosting drips right */}
            <path
              className="cake-drip"
              d="M156 155 Q160 172 164 155 Z"
              fill="#FFD93D"
            />
            <path
              className="cake-drip"
              d="M172 155 Q175 165 178 155 Z"
              fill="#FFD93D"
            />
            <path
              className="cake-drip"
              d="M186 155 Q190 174 194 155 Z"
              fill="#FFD93D"
            />
            <path
              className="cake-drip"
              d="M202 155 Q205 163 208 155 Z"
              fill="#FFD93D"
            />
          </g>

          {/* Top tier left */}
          <g className="cake-left">
            <path
              d="M85 105 L140 105 L140 155 L85 155 Z"
              fill="url(#cake-top-grad)"
              stroke="#9C27B0"
              strokeWidth="2.5"
            />
            <ellipse
              cx="93"
              cy="112"
              rx="2.5"
              ry="4"
              fill="white"
              opacity="0.4"
            />
            {/* Rosettes */}
            <circle
              cx="95"
              cy="130"
              r="5"
              fill="#FF2D78"
              stroke="#C2185B"
              strokeWidth="1"
              opacity="0.9"
            />
            <circle
              cx="115"
              cy="125"
              r="4.5"
              fill="#FF6B35"
              stroke="#C63F0C"
              strokeWidth="1"
              opacity="0.9"
            />
          </g>

          {/* Top tier right */}
          <g className="cake-right">
            <path
              d="M140 105 L195 105 L195 155 L140 155 Z"
              fill="url(#cake-top-grad)"
              stroke="#9C27B0"
              strokeWidth="2.5"
            />
            <ellipse
              cx="187"
              cy="112"
              rx="2.5"
              ry="4"
              fill="white"
              opacity="0.4"
            />
            {/* Rosettes */}
            <circle
              cx="165"
              cy="130"
              r="5"
              fill="#FF2D78"
              stroke="#C2185B"
              strokeWidth="1"
              opacity="0.9"
            />
            <circle
              cx="180"
              cy="125"
              r="4.5"
              fill="#FF6B35"
              stroke="#C63F0C"
              strokeWidth="1"
              opacity="0.9"
            />
          </g>

          {/* 25 text layout split */}
          <g className="cake-left">
            <text
              x="135"
              y="140"
              textAnchor="end"
              fontFamily="'Dancing Script', cursive"
              fontSize="18"
              fill="#FFF8F0"
              fontWeight="700"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
            >
              2
            </text>
          </g>
          <g className="cake-right">
            <text
              x="145"
              y="140"
              textAnchor="start"
              fontFamily="'Dancing Script', cursive"
              fontSize="18"
              fill="#FFF8F0"
              fontWeight="700"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
            >
              5
            </text>
          </g>

          {/* Candles & Flames */}
          {[98, 119, 140, 161, 182].map((cx, i) => {
            const isLeft = cx < 140;
            const className = isLeft ? 'cake-left' : 'cake-right';
            return (
              <g key={i} className={className}>
                {/* Candle body */}
                <rect
                  x={cx - 3}
                  y="78"
                  width="6"
                  height="27"
                  rx="2"
                  fill="#00D4FF"
                  stroke="#00A8CC"
                  strokeWidth="1"
                />
                <rect
                  x={cx - 1.5}
                  y="78"
                  width="3"
                  height="27"
                  rx="1"
                  fill="#FFF8F0"
                  opacity="0.6"
                />
                {/* Candle flame layers */}
                <g
                  className="candle-flame-layer"
                  style={{
                    transformOrigin: `${cx}px 75px`,
                    willChange: 'transform, opacity',
                  }}
                >
                  <ellipse cx={cx} cy="70" rx="5" ry="9" fill="#FF6B35" />{' '}
                  {/* Outer glow */}
                  <ellipse
                    cx={cx}
                    cy="72"
                    rx="3.5"
                    ry="6"
                    fill="#FFD93D"
                  />{' '}
                  {/* Mid yellow */}
                  <ellipse
                    cx={cx}
                    cy="73.5"
                    rx="1.8"
                    ry="3.5"
                    fill="#FFF8F0"
                  />{' '}
                  {/* Core */}
                </g>
                {/* Smoke puff (hidden initially) */}
                <g className="smoke-puff" style={{ opacity: 0 }}>
                  <circle cx={cx} cy="65" r="4" fill="#E8B896" opacity="0.5" />
                  <circle
                    cx={cx - 3}
                    cy="60"
                    r="5"
                    fill="#E8B896"
                    opacity="0.4"
                  />
                </g>
              </g>
            );
          })}

          {/* Cake knife */}
          <g className="cake-knife" style={{ opacity: 0 }}>
            <path
              d="M125 90 L180 90 L185 95 L125 95 Z"
              fill="#E0F7FA"
              stroke="#00D4FF"
              strokeWidth="1.5"
            />
            <rect
              x="185"
              y="88"
              width="20"
              height="9"
              rx="2.5"
              fill="#6C7A89"
              stroke="#3F4E5A"
              strokeWidth="1"
            />
          </g>

          {/* Decorative elements */}
          <text x="35" y="130" fill="#FFF176" fontSize="12" opacity="0.5">
            ♥
          </text>
          <text x="245" y="120" fill="#FFD93D" fontSize="10" opacity="0.5">
            ★
          </text>
        </svg>
      </div>

      {/* Slice message */}
      <div
        ref={sliceMessageRef}
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: '22px',
          fontWeight: 700,
          color: '#FFF8F0',
          opacity: 0,
          textAlign: 'center',
          marginBottom: '8px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          zIndex: 1,
        }}
      >
        A slice of joy just for you! 🍰
      </div>

      {/* Cut the Cake Button */}
      {!cakeCut && (
        <button
          ref={buttonRef}
          onClick={handleCutCake}
          className="glow-btn"
          style={{
            marginBottom: '20px',
            zIndex: 2,
          }}
          aria-label="Cut the Cake"
        >
          Cut the Cake 🎂
        </button>
      )}

      {/* Continue Button */}
      <button
        ref={continueRef}
        onClick={handleContinue}
        className="glow-btn-gold"
        style={{
          opacity: 0,
          scale: 0,
          marginBottom: '20px',
          zIndex: 2,
        }}
        aria-label="Continue to your message"
      >
        Continue to 💌
      </button>

      {/* Countdown (Glassmorphic) */}
      <div style={{ textAlign: 'center', marginTop: '8px', zIndex: 1 }}>
        <p
          style={{
            fontSize: '13px',
            color: '#FFF8F0',
            opacity: 0.9,
            marginBottom: '12px',
            textShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        >
          Counting down to your next adventure... 🌟
        </p>
        {/* <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="countdown-card"
              style={{
                width: '56px',
                height: '66px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(124, 0, 254, 0.15)',
                willChange: 'transform',
              }}
            >
              <span
                className="gradient-text"
                style={{
                  fontFamily: '"Dancing Script", cursive',
                  fontWeight: 900,
                  fontSize: '28px',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 0 10px rgba(255,217,61,0.3))',
                }}
              >
                {String(item.value).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '9px',
                  fontWeight: 600,
                  color: '#FFF8F0',
                  opacity: 0.8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginTop: '2px',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CakeCutting;
