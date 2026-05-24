import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { createConfettiBurst, createSparkleBurst } from '../utils/confetti';
import FloatingParticles from './FloatingParticles';

interface TwentyFiveGiftsProps {
  onContinue: () => void;
}

const GIFT_MESSAGES = [
  'Your smile can light up the darkest room ☀️',
  'You always know the exact right thing to say 💬',
  'Your laugh is genuinely contagious 😂',
  'You have the biggest heart of anyone I know 💖',
  'May this year bring you everything you deserve 🌸',
  'You are braver than you believe 🦋',
  'Your kindness changes people\'s lives 🤍',
  'You make every moment more fun just by being there 🎉',
  'May 25 be your most adventurous year yet 🌍',
  'You are more beautiful inside than you even know 🌷',
  'Your dedication and hard work inspire everyone 💪',
  'May this year overflow with love and laughter 💕',
  'You give the best advice — always 🧠',
  'The world is genuinely better with you in it 🌍',
  'May all your dreams start coming true this year 🌟',
  'You have a way of making everyone feel at home 🏡',
  'You are wildly capable of anything you set your mind to 🔥',
  'May 25 be full of beautiful surprises 🎊',
  'Your strength is quiet, deep, and incredibly powerful 🌊',
  'You deserve every good thing coming your way 🎀',
  'May this year bring you peace, joy, and clarity 🕊️',
  'You are the reason best friend is such a beautiful word 💌',
  'You make ordinary days feel like celebrations 🎈',
  'May love find you in every form this year 💞',
  '', // Special box 25 - handled separately
];

const BOX_COLORS = [
  ['#FF2D78', '#FF6B35'],
  ['#BF5FFF', '#FF2D78'],
  ['#00D4FF', '#BF5FFF'],
  ['#FF0099', '#FFD93D'],
  ['#00FFB3', '#BF5FFF'],
  ['#FF6B35', '#FFD93D'],
];

const TwentyFiveGifts = ({ onContinue }: TwentyFiveGiftsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set());
  const [animatingGifts, setAnimatingGifts] = useState<Set<number>>(new Set());
  const giftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const allOpened = openedGifts.size === 25;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance
      gsap.fromTo(containerRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      // Grid entrance bounce animation
      gsap.fromTo('.gift-box-cell',
        { scale: 0, rotation: () => gsap.utils.random(-25, 25), opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          stagger: { each: 0.04, from: 'start' },
          ease: 'back.out(2)'
        }
      );

      // Star twinkles around header
      gsap.to('.gift-sparkle', {
        opacity: 0.4,
        scale: 0.8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (allOpened) {
      // Mega burst
      createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
      createSparkleBurst(window.innerWidth / 2, window.innerHeight / 2, 12);

      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2.5)', delay: 0.5 }
        );
      }
    }
  }, [allOpened]);

  const handleOpenGift = useCallback(
    (index: number) => {
      if (openedGifts.has(index) || animatingGifts.has(index)) return;

      const el = giftRefs.current[index];
      if (!el) return;

      const newAnimating = new Set(animatingGifts);
      newAnimating.add(index);
      setAnimatingGifts(newAnimating);

      const bow = el.querySelector('.gift-bow');
      const lid = el.querySelector('.gift-lid');
      const sparkle = el.querySelector('.box-sparkle');

      const tl = gsap.timeline({
        onComplete: () => {
          const newOpened = new Set(openedGifts);
          newOpened.add(index);
          setOpenedGifts(newOpened);

          const nextAnimating = new Set(animatingGifts);
          nextAnimating.delete(index);
          setAnimatingGifts(nextAnimating);
        }
      });

      // 6-step unwrap sequence
      // 1. Box wiggles
      tl.to(el, { rotation: 12, duration: 0.05, yoyo: true, repeat: 4, ease: 'sine.inOut' })
        .to(el, { rotation: 0, duration: 0.04 })
        // 2 & 3. Bow shoots up + Lid flips open
        .addLabel('open')
        .to(bow, { y: -45, opacity: 0, scale: 0.5, duration: 0.25, ease: 'power2.out' }, 'open')
        .to(lid, { y: -10, rotateX: -90, transformOrigin: 'top center', duration: 0.25, ease: 'power2.out' }, 'open');

      if (sparkle) {
        tl.to(sparkle, { opacity: 0, scale: 0, duration: 0.15 }, 'open');
      }

      // 4. Sparkle burst
      tl.call(() => {
        const rect = el.getBoundingClientRect();
        createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 6);
        createConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
      }, [], 'open+=0.1');
    },
    [openedGifts, animatingGifts]
  );

  const handleContinue = useCallback(() => {
    gsap.to(containerRef.current, {
      y: '-50px',
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.6,
      onComplete: onContinue,
    });
  }, [onContinue]);

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--grad-screen5)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        fontFamily: 'Poppins, sans-serif',
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      {/* Aurora backdrop */}
      <div className="aurora-orb aurora-orb-1" style={{ top: '5%', left: '5%', width: '300px', height: '300px', background: '#BF5FFF', opacity: 0.3 }} />
      <div className="aurora-orb aurora-orb-2" style={{ bottom: '5%', right: '5%', width: '320px', height: '320px', background: '#FF2D78', opacity: 0.25 }} />

      {/* Floating particles */}
      <FloatingParticles types={['sparkles', 'confetti']} />

      {/* Header */}
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '16px', zIndex: 1 }}>
        <h1
          className="gradient-text"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '32px',
            fontWeight: 700,
            margin: '0 0 4px 0',
            filter: 'drop-shadow(0 0 15px rgba(255,45,120,0.5))',
          }}
        >
          25 Gifts for 25 Years 🎁
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: '#FFF8F0',
            opacity: 0.9,
            margin: 0,
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          Tap each gift to unwrap it 💝
        </p>
        {/* Twinkling Header Sparkles */}
        {[
          { left: '-20px', top: '-5px' },
          { right: '-20px', top: '0px' },
          { left: '20px', top: '-12px' },
          { right: '30px', top: '-8px' },
        ].map((pos, i) => (
          <span
            key={i}
            className="gift-sparkle"
            style={{
              position: 'absolute',
              ...pos,
              fontSize: '12px',
              color: '#FFF176',
              pointerEvents: 'none',
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Gift Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
          width: '100%',
          maxWidth: '380px',
          marginBottom: '20px',
          zIndex: 1,
          perspective: '400px', // enabling 3D transforms for flip animations
        }}
      >
        {Array.from({ length: 25 }, (_, i) => {
          const isOpened = openedGifts.has(i);
          const isAnimating = animatingGifts.has(i);
          const isSpecial = i === 24;

          const colors = isSpecial ? ['#FFD93D', '#FF6B35'] : BOX_COLORS[i % BOX_COLORS.length];
          const strokeColor = isSpecial ? '#C63F0C' : colors[1];

          return (
            <div
              key={i}
              ref={(el) => { giftRefs.current[i] = el; }}
              onClick={() => handleOpenGift(i)}
              role="button"
              tabIndex={0}
              className="gift-box-cell"
              aria-label={`Gift box ${i + 1}${isOpened ? ' (opened)' : ''}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenGift(i);
                }
              }}
              style={{
                aspectRatio: '1',
                borderRadius: '16px',
                cursor: isOpened || isAnimating ? 'default' : 'pointer',
                position: 'relative',
                background: isOpened
                  ? 'linear-gradient(145deg, #FFF8F0, #FFE4F0)'
                  : 'transparent',
                border: isOpened ? '2px solid rgba(255, 45, 120, 0.25)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isOpened
                  ? 'inset 0 4px 10px rgba(255,45,120,0.1), 0 2px 5px rgba(0,0,0,0.1)'
                  : isSpecial
                    ? '0 0 16px rgba(255, 217, 61, 0.6), 0 4px 12px rgba(255,107,53,0.3)'
                    : '0 6px 16px rgba(0, 0, 0, 0.15)',
                minWidth: '44px',
                minHeight: '44px',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Gift number */}
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '6px',
                  fontSize: '9px',
                  color: isOpened ? '#FF2D78' : 'rgba(255,255,255,0.8)',
                  fontWeight: 700,
                  zIndex: 2,
                }}
              >
                {i + 1}
              </span>

              {!isOpened ? (
                // Beautiful Closed Gift Box SVG
                <svg viewBox="0 0 44 44" width="34" height="34" style={{ overflow: 'visible' }} aria-hidden="true">
                  <defs>
                    <linearGradient id={`box-base-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors[0]} />
                      <stop offset="100%" stopColor={colors[1]} />
                    </linearGradient>
                    <linearGradient id={`ribbon-grad-${i}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FFF176" />
                      <stop offset="100%" stopColor="#FFD93D" />
                    </linearGradient>
                  </defs>

                  {/* Sparkle star in corner (twinkling) */}
                  {!isAnimating && (
                    <text
                      className="box-sparkle"
                      x="2"
                      y="10"
                      fill="#FFF176"
                      fontSize="9"
                      style={{
                        animation: `blink ${1 + (i % 3) * 0.4}s step-end infinite`,
                        pointerEvents: 'none'
                      }}
                    >
                      ✦
                    </text>
                  )}

                  {/* Gift box base */}
                  <rect
                    className="gift-base"
                    x="8"
                    y="18"
                    width="28"
                    height="22"
                    rx="3"
                    fill={`url(#box-base-${i})`}
                    stroke={strokeColor}
                    strokeWidth="2"
                  />

                  {/* Vertical ribbon */}
                  <rect
                    x="19"
                    y="18"
                    width="6"
                    height="22"
                    fill={isSpecial ? '#FF2D78' : 'url(#ribbon-grad-i)'}
                    opacity="0.9"
                  />

                  {/* Gift box lid */}
                  <rect
                    className="gift-lid"
                    x="6"
                    y="11"
                    width="32"
                    height="8"
                    rx="2"
                    fill={`url(#box-base-${i})`}
                    stroke={strokeColor}
                    strokeWidth="2"
                  />

                  {/* Horizontal lid ribbon */}
                  <rect
                    x="19"
                    y="11"
                    width="6"
                    height="8"
                    fill={isSpecial ? '#FF2D78' : 'url(#ribbon-grad-i)'}
                    opacity="0.9"
                  />

                  {/* Puffy Bow */}
                  <g className="gift-bow" style={{ transformOrigin: '22px 11px', willChange: 'transform' }}>
                    {/* Left Loop */}
                    <path
                      d="M20 11 C12 2 13 14 20 12"
                      fill={isSpecial ? '#FF2D78' : 'url(#ribbon-grad-i)'}
                      stroke={isSpecial ? '#C2185B' : '#FF6B35'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Right Loop */}
                    <path
                      d="M24 11 C32 2 31 14 24 12"
                      fill={isSpecial ? '#FF2D78' : 'url(#ribbon-grad-i)'}
                      stroke={isSpecial ? '#C2185B' : '#FF6B35'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Center Knot */}
                    <circle
                      cx="22"
                      cy="11.5"
                      r="3.5"
                      fill="#FFF176"
                      stroke="#FF6B35"
                      strokeWidth="1.5"
                    />
                    {isSpecial && (
                      // Special Crown on Box 25
                      <path
                        d="M17 -4 L19 0 L22 -5 L25 0 L27 -4 L25 4 L19 4 Z"
                        fill="#FFD93D"
                        stroke="#C63F0C"
                        strokeWidth="1"
                      />
                    )}
                  </g>
                </svg>
              ) : (
                // Opened gift content (faded in)
                <div
                  className="gift-content"
                  style={{
                    padding: '4px',
                    textAlign: 'center',
                    width: '100%',
                    animation: 'zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                  }}
                >
                  {isSpecial ? (
                    <div>
                      <div
                        style={{
                          fontSize: '18px',
                          fontFamily: '"Dancing Script", cursive',
                          fontWeight: 900,
                          color: '#FF6B35',
                          textShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          marginBottom: '1px',
                        }}
                      >
                        25 👑
                      </div>
                      <p
                        style={{
                          fontFamily: '"Dancing Script", cursive',
                          fontSize: '9px',
                          fontWeight: 700,
                          color: '#7C00FE',
                          margin: 0,
                          lineHeight: 1.25,
                        }}
                      >
                        The best 25 years included YOU. The best is yet to come. 🌟
                      </p>
                    </div>
                  ) : (
                    <p
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '8px',
                        fontWeight: 600,
                        color: '#4A0030',
                        margin: 0,
                        lineHeight: 1.3,
                        wordBreak: 'break-word',
                      }}
                    >
                      {GIFT_MESSAGES[i]}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress display */}
      <p
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#FFF8F0',
          textAlign: 'center',
          marginBottom: '16px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          zIndex: 1,
        }}
      >
        {allOpened
          ? "You've unwrapped all 25 gifts! 🎊"
          : `${openedGifts.size} / 25 unwrapped 💝`}
      </p>

      {/* Continue CTA Button */}
      <button
        ref={buttonRef}
        onClick={handleContinue}
        className="glow-btn-gold"
        style={{
          opacity: 0,
          zIndex: 2,
        }}
        aria-label="See your forever message"
      >
        See your forever message →
      </button>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 1; }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.6);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default TwentyFiveGifts;
