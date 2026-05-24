import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import FloatingParticles from './FloatingParticles';

interface HeartfeltMessageProps {
  onContinue: () => void;
}

const MESSAGE = `You are not just turning 25 —
you are stepping into the most beautiful, bold, and brilliant version of yourself.

Every laugh we've shared, every secret whispered, every late-night conversation that went on for hours — you make life feel extraordinary just by being in it.

You have this rare, magical ability to make everyone around you feel seen, loved, and understood. That is a gift the world doesn't deserve, but is so lucky to have.

I am so incredibly grateful — every single day — that the universe decided we should be best friends.

Here's to 25 years of YOU.
25 years of courage, kindness, laughter, and light.
And a lifetime more of all of it — together.

I love you to the moon, past the stars, and back again. 🌙✨`;

const SIGNATURE = '— Your forever bestie 💕';

const HeartfeltMessage = ({ onContinue }: HeartfeltMessageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const musicNoteRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance (fades up)
      gsap.fromTo(containerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }
      );

      // SVG entrance
      gsap.fromTo(svgRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)' }
      );

      // SVG Aura glow pulse
      gsap.to('.aura-glow', {
        scale: 1.15,
        opacity: 0.25,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'center',
      });

      // Figures breathing
      gsap.to('.message-figures', {
        scaleY: 1.025,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'bottom',
      });

      // Music note pulse
      gsap.to(musicNoteRef.current, {
        scale: 1.25,
        color: '#FFD93D',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < MESSAGE.length) {
        setDisplayedText(MESSAGE.substring(0, index + 1));
        index++;
        
        // Auto scroll text container
        if (messageRef.current) {
          messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Show signature and button after typing completes
  useEffect(() => {
    if (!typingDone) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        signatureRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.4, ease: 'back.out(2)' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [typingDone]);

  const handleContinue = useCallback(() => {
    gsap.to(containerRef.current, {
      scale: 0.9,
      rotation: -5,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: onContinue,
    });
  }, [onContinue]);

  // Regex highlights for emotional terms
  const renderMessageWithHighlights = (text: string) => {
    const wordsToHighlight = ['extraordinary', 'best friends', 'love you', 'precious person'];
    const regex = /(extraordinary|best friends|love you|precious person)/gi;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (wordsToHighlight.includes(part.toLowerCase())) {
        return (
          <span
            key={index}
            style={{
              color: '#FFD93D',
              textShadow: '0 0 10px rgba(255,217,61,0.8), 0 0 20px rgba(255,107,53,0.5)',
              fontWeight: 700,
              transition: 'text-shadow 0.3s ease',
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--grad-screen4)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 20px',
        fontFamily: 'Poppins, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating particles (Type B hearts + Type C sparkles) */}
      <FloatingParticles types={['hearts', 'sparkles']} />

      {/* SVG Illustration */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <svg
          ref={svgRef}
          viewBox="0 0 280 200"
          style={{ width: '100%', maxWidth: '260px', marginBottom: '16px', flexShrink: 0, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="balloon-blue-glow" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#A3F3FF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </radialGradient>
            <linearGradient id="body-shirt-hugging" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#80E5FF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
            <linearGradient id="body-pants-hugging" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6C7A89" />
              <stop offset="100%" stopColor="#3F4E5A" />
            </linearGradient>
            <linearGradient id="body-dress-hugging" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E1BEE7" />
              <stop offset="100%" stopColor="#BF5FFF" />
            </linearGradient>
          </defs>

          {/* Glowing Aura Behind figures */}
          <circle className="aura-glow" cx="140" cy="110" r="48" fill="#BF5FFF" opacity="0.16" filter="blur(16px)" />

          {/* Ground */}
          <ellipse cx="140" cy="185" rx="72" ry="5" fill="#0D0021" opacity="0.4" />

          {/* Figures (Boy and Girl hugging) */}
          <g className="message-figures" transform="translate(0, 5)">
            {/* Figure 1 (Boy - taller, arm around girl) */}
            <g transform="translate(125, 70)">
              {/* Hair */}
              <ellipse cx="0" cy="-14" rx="14" ry="14" fill="#4A2912" stroke="#251206" strokeWidth="2.5" />
              <rect x="-12" y="-18" width="24" height="8" rx="3" fill="#4A2912" stroke="#251206" strokeWidth="2" />
              {/* Head */}
              <ellipse cx="0" cy="-3" rx="12" ry="12" fill="#FFCBA4" stroke="#D39673" strokeWidth="2.5" />
              {/* Fringe */}
              <path d="M-12 -10 C-6 -15 6 -15 12 -10 C9 -9 7 -6 0 -8 C-7 -6 -9 -9 -12 -10 Z" fill="#4A2912" />
              {/* Face details */}
              <circle cx="-4" cy="-4" r="1.5" fill="#2E1C0C" />
              <circle cx="4" cy="-4" r="1.5" fill="#2E1C0C" />
              <ellipse cx="-7.5" cy="-1" rx="2" ry="1" fill="#FF2D78" opacity="0.3" />
              <ellipse cx="7.5" cy="-1" rx="2" ry="1" fill="#FF2D78" opacity="0.3" />
              <path d="M-2.5 2 Q0 4.5 2.5 2" stroke="#2E1C0C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* Shirt */}
              <path d="M-13 12 Q-16 48 -12 65 L12 65 Q16 48 13 12 Z" fill="url(#body-shirt-hugging)" stroke="#00A8CC" strokeWidth="2.5" />
              {/* Pants */}
              <path d="M-12 65 L12 65 L11 80 L3 80 L3 72 L-3 72 L-3 80 L-11 80 Z" fill="url(#body-pants-hugging)" stroke="#1C252C" strokeWidth="2.5" />
              {/* Legs */}
              <rect x="-8" y="80" width="5" height="15" rx="2" fill="#FFCBA4" stroke="#D39673" strokeWidth="2" />
              <rect x="2" y="80" width="5" height="15" rx="2" fill="#FFCBA4" stroke="#D39673" strokeWidth="2" />
              {/* Arm reaching around back */}
              <path d="M12 22 Q24 12 34 24" stroke="#FFCBA4" strokeWidth="5.5" fill="none" strokeLinecap="round" />
            </g>

            {/* Figure 2 (Girl - shorter) */}
            <g transform="translate(155, 82)">
              {/* Back Hair */}
              <path d="M-14 -10 Q-22 15 -18 35 Q-14 42 -10 38 Q-8 25 -8 5" fill="#1A1A2E" stroke="#05050F" strokeWidth="2" />
              <path d="M14 -10 Q22 15 18 35 Q14 42 10 38 Q8 25 8 5" fill="#1A1A2E" stroke="#05050F" strokeWidth="2" />
              {/* Head */}
              <ellipse cx="0" cy="-2" rx="11" ry="11" fill="#E8B896" stroke="#C49170" strokeWidth="2.5" />
              {/* Front hair and pink bow */}
              <path d="M-12 -9 C-8 -15 8 -15 12 -9 C11 -4 8 -5 0 -8 C-8 -5 -11 -4 -12 -9 Z" fill="#1A1A2E" stroke="#05050F" strokeWidth="2" />
              <circle cx="0" cy="-13" r="3" fill="#FF2D78" />
              <polygon points="0,-13 -6,-16 -6,-10" fill="#FF2D78" />
              <polygon points="0,-13 6,-16 6,-10" fill="#FF2D78" />
              {/* Face details */}
              <circle cx="-3.5" cy="-3" r="1.5" fill="#2E1C0C" />
              <circle cx="3.5" cy="-3" r="1.5" fill="#2E1C0C" />
              <ellipse cx="-6" cy="0" rx="1.8" ry="1" fill="#FF2D78" opacity="0.3" />
              <ellipse cx="6" cy="0" rx="1.8" ry="1" fill="#FF2D78" opacity="0.3" />
              <path d="M-2 3 Q0 5 2 3" stroke="#2E1C0C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* Dress */}
              <path d="M-13 12 Q-16 48 -12 70 L12 70 Q16 48 13 12 Z" fill="url(#body-dress-hugging)" stroke="#7C00FE" strokeWidth="2.5" />
              {/* Legs */}
              <rect x="-8" y="70" width="5" height="15" rx="2" fill="#E8B896" stroke="#C49170" strokeWidth="2" />
              <rect x="2" y="70" width="5" height="15" rx="2" fill="#E8B896" stroke="#C49170" strokeWidth="2" />
              {/* Left arm wrapping back */}
              <path d="M-11 20 Q-22 18 -26 28" stroke="#E8B896" strokeWidth="5.5" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* Decorative bits */}
          <text x="35" y="45" fill="#FF2D78" fontSize="12" opacity="0.6">♥</text>
          <text x="245" y="55" fill="#FFD93D" fontSize="11" opacity="0.6">★</text>
          <text x="70" y="25" fill="#00D4FF" fontSize="9" opacity="0.5">✦</text>
        </svg>
      </div>

      {/* Typewriter Message Container (Glassmorphic) */}
      <div
        ref={messageRef}
        className="glass-card-dark"
        style={{
          maxHeight: '44vh',
          overflowY: 'auto',
          padding: '24px',
          marginBottom: '20px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.2) transparent',
          width: '100%',
          maxWidth: '380px',
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            lineHeight: 1.8,
            color: '#FFF8F0',
            whiteSpace: 'pre-wrap',
            margin: 0,
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {renderMessageWithHighlights(displayedText)}
          {!typingDone && (
            <span
              style={{
                animation: 'blink 0.8s step-end infinite',
                fontWeight: 600,
                color: '#FFD93D',
              }}
            >
              ▌
            </span>
          )}
        </p>

        {/* Signature */}
        {typingDone && (
          <div
            ref={signatureRef}
            style={{
              fontFamily: '"Dancing Script", cursive',
              fontSize: '24px',
              fontWeight: 700,
              color: '#FFD93D',
              marginTop: '20px',
              opacity: 0,
              filter: 'drop-shadow(0 0 8px rgba(255,217,61,0.4))',
            }}
          >
            {SIGNATURE}
          </div>
        )}
      </div>

      {/* CTA Button */}
      {typingDone && (
        <button
          ref={buttonRef}
          onClick={handleContinue}
          className="glow-btn"
          style={{
            opacity: 0,
            zIndex: 2,
          }}
          aria-label="Continue to your 25 gifts"
        >
          Continue to your 25 gifts 🎁
        </button>
      )}

      {/* Music note */}
      <div
        ref={musicNoteRef}
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '25px',
          fontSize: '22px',
          color: '#FFF8F0',
          opacity: 0.6,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        ♪
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default HeartfeltMessage;
