import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FloatingParticles from './FloatingParticles';

interface HeartwarmingLetterProps {
  onContinue: () => void;
}

const HeartwarmingLetter = ({ onContinue }: HeartwarmingLetterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background fade-in
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      // Card sliding up and entering
      gsap.fromTo(cardRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)', delay: 0.15 }
      );

      // Text lines fade-in
      gsap.fromTo('.letter-text-item',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.25, ease: 'power2.out', delay: 0.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: 'linear-gradient(135deg, #3A0066 0%, #7A0A3D 50%, #C9184A 100%)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        fontFamily: 'Poppins, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aurora backdrops */}
      <div className="aurora-orb aurora-orb-1" style={{ top: '5%', left: '10%', width: '320px', height: '320px', background: '#BF5FFF', opacity: 0.25 }} />
      <div className="aurora-orb aurora-orb-2" style={{ bottom: '5%', right: '10%', width: '320px', height: '320px', background: '#FF2D78', opacity: 0.2 }} />

      {/* Floating hearts and sparkles */}
      <FloatingParticles types={['hearts', 'sparkles']} />

      {/* Letter Envelope Card */}
      <div
        ref={cardRef}
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '380px',
          padding: '32px 24px',
          minHeight: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 1,
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          border: '1.5px solid rgba(255,255,255,0.2)',
          position: 'relative',
        }}
      >
        {/* Heart Seal Accent */}
        <div 
          className="letter-text-item"
          style={{ 
            fontSize: '36px', 
            marginBottom: '16px',
            filter: 'drop-shadow(0 4px 8px rgba(255,77,109,0.4))'
          }}
        >
          💌
        </div>

        {/* Title */}
        <h2
          className="letter-text-item gradient-text"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '32px',
            fontWeight: 800,
            color: '#FFF8F0',
            margin: '0 0 16px 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Dearest Bestie 💖
        </h2>

        {/* Heartfelt Paragraph */}
        <p
          ref={textRef}
          className="letter-text-item"
          style={{
            fontSize: '13.5px',
            lineHeight: 1.7,
            color: '#FFF8F0',
            opacity: 0.95,
            margin: '0 0 20px 0',
            textAlign: 'justify',
            textJustify: 'inter-word',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          As you turn 25, I want you to know how much your presence means to me. Through every late-night conversation, every shared laugh, and every quiet moment of understanding, you have been my anchor and my greatest joy. We have grown together, supported each other through life's unpredictable seasons, and created a bond that time and distance can never fade. Thank you for your kindness, your laughter, and the beautiful light you shine into my world. I am incredibly lucky to call you my best friend, my go-to person, and my partner in crime. May this milestone year bring you all the love, magic, and happiness you deserve.
        </p>

        {/* Signature */}
        <div
          className="letter-text-item"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '22px',
            color: '#FFF8F0',
            fontWeight: 700,
            marginBottom: '24px',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          Here is to forever, bestie. 🥂✨
        </div>

        {/* CTA Button */}
        <button
          onClick={onContinue}
          className="letter-text-item glow-btn-gold"
          style={{
            padding: '12px 32px',
            fontSize: '14px',
            boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
          }}
          aria-label="See our forever sky"
        >
          See our forever sky ➔
        </button>
      </div>
    </div>
  );
};

export default HeartwarmingLetter;
